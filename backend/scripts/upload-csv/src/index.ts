import {program} from "commander";
import { CSVEntry, parseCSV } from "./parse-csv";
import { IdentifiedVictim } from "../../../model/entities/identified-victim";
import { Incident } from "../../../model/entities/incident";
import { Location } from "../../../model/entities/location";
import { Killed, ResidentOf, OccuredAt } from "../../../model/relationships";
import { Neo4jAdapter } from "@parkour-ops/graph-db-port";
import { loadRequiredEnvironmentVariable } from "../../../src/utils/env";
import { uuidv4 } from "./random";

const NEO4J_URL=loadRequiredEnvironmentVariable("NEO4J_URL", "string");
const NEO4J_USERNAME=loadRequiredEnvironmentVariable("NEO4J_USERNAME", "string");
const NEO4J_PASSWORD=loadRequiredEnvironmentVariable("NEO4J_PASSWORD", "string");

const client = new Neo4jAdapter(NEO4J_URL, NEO4J_USERNAME, NEO4J_PASSWORD);

function getProp<T>(entry: CSVEntry, key: string, as: T, required: boolean) {
    const val = entry[key];
    
    if (!val && required) {
        throw new Error("Required property is missing: " + key);
    } 
    else if (!val && !required) {
        return null;
    }

    else if (val && as === "string") {
        return val as string;
    } 
    else if (val && as === "int") {
        return parseInt(val)
    }
    else if (val && as === "float") {
        return parseFloat(val);
    }
    else if (val && typeof as === "boolean") {
        const _val = val.toLowerCase();
        if (["yes", "true", "y", "t"].includes(_val)) return true;
        else return false;
    }

    else {
        throw new Error("Unimplemented type: " + as)
    }
}

function deduceProp(entry: CSVEntry, key: string, options: {options:string[], to:any}[], required: boolean) {
    const val = entry[key];

    if (!val && required) {
        throw new Error("Required property is missing: " + key);
    } 

    if (!val) {
        return null;
    }
    
    for (const opt of options) {
        const _val = val.toLowerCase();
        const _options = opt.options.map((o)=>o.toLowerCase());
        if (_options.includes(_val)) {
            return opt.to;
        }
    }

    return null;
}

function generateId(prefix?: string) {
    if (!prefix) {
        return uuidv4();
    } else {
        return `${prefix}:${uuidv4()}`;
    }
}

class Parser {
    #entries: CSVEntry[];

    identifiedVictims: IdentifiedVictim[];
    incidents: Incident[];
    locations: Location[];

    residentOf: ResidentOf[];
    occuredAt: OccuredAt[];
    killed: Killed[];

    constructor(entries: CSVEntry[]) {
        this.#entries = entries;
        this.identifiedVictims = [];
        this.incidents = [];
        this.locations = [];
        this.residentOf = [];
        this.occuredAt = [];
        this.killed = [];
    }

    async parse() {
        // extract data
        for (const e of this.#entries) {
            
            // create entry for victim
            const identifiedVictimId = generateId("victim");
            const v : IdentifiedVictim = {
                id: identifiedVictimId,
                labels: ["Identified Victim"],
                properties: {
                    name: getProp(e, "name", "string", true) as string,
                    age: getProp(e, "age", "int", false) as number | null,
                    gender: deduceProp(e, "gender", [
                        {
                            options: ["M", "male"],
                            to: "male"
                        },
                        {
                            options: ["F", "female"],
                            to: "female"
                        }
                    ], false) as "male" | "female" | null,
                    government_id_number: null,
                    citizenships: (getProp(e, "citizenship", "string", true) as string).split(", "),
                    combatant: deduceProp(e, "took_part_in_the_hostilities", [
                        {
                            options: ["yes", "true"],
                            to: true
                        }
                    ], false) ?? false,
                    audit_status: "unaudited",
                    description: getProp(e, "notes", "string", false) as string | null ?? "",
                    tags: []
                }
            }
            this.identifiedVictims.push(v);

            // create location if it doesn't exist for residence
            const nameLocationResidence = getProp(e, "place_of_residence", "string", false) as string | null;
            if (nameLocationResidence && !this.locations.find(l => l.properties.name === nameLocationResidence)) {
                this.locations.push({
                    id: generateId("loc"),
                    labels: ["Location"],
                    properties: {
                        name: nameLocationResidence,
                        latitude: null,
                        longitude: null,
                        type: null,
                        description: "",
                        audit_status: "unaudited",
                        tags: []
                    }
                });
            }

            // connect victim to location
            if (nameLocationResidence) {
                const locationResidence = this.locations.find(l => l.properties.name === nameLocationResidence);
                if (!locationResidence) throw new Error("Could not find location of residence: " + locationResidence);
                this.residentOf.push({
                    id: generateId("RESIDENT_OF"),
                    label: "RESIDENT_OF",
                    properties: {},
                    source: identifiedVictimId,
                    target: locationResidence.id
                })
            }

            // create location if it doesn't exist for incident
            const nameLocationIncident = getProp(e, "event_location", "string", false) as string | null;
            if (nameLocationIncident && !this.locations.find(l => l.properties.name === nameLocationIncident)) {
                this.locations.push({
                    id: generateId("loc"),
                    labels: ["Location"],
                    properties: {
                        name: nameLocationIncident,
                        latitude: null,
                        longitude: null,
                        type: null,
                        description: "",
                        audit_status: "unaudited",
                        tags: []
                    }
                });
            }
            const locationIncident = this.locations.find(l => l.properties.name === nameLocationIncident);
            if (!locationIncident) throw new Error("Location not found: " + locationIncident);

            // create entry for incident if it doesn't exist already
            const dateOfIncident = getProp(e, "date_of_event", "string", true) as string;
            let incident = this.incidents.find((i)=>{
                const matchDate = i.properties.date === dateOfIncident;
                const matchLocation = this.occuredAt.find(o => o.target === locationIncident.id);
                return matchDate && matchLocation;
            });
            
            if (!incident) {
                const perpetrator = getProp(e, "killed_by", "string", false) as string | null;
                incident = {
                    id: generateId("inc"),
                    labels: ["Incident"],
                    properties: {
                        title: "",
                        categories: null,
                        
                        perpetrators: perpetrator ? [perpetrator] : null,
                        
                        date: dateOfIncident,

                        audit_status: "unaudited",
                        description: "",
                        tags: [],

                        /* Human Loss */
                        adult_male_killed: 0,
                        adult_male_maimed: 0,
                        adult_male_injured: 0,
                        adult_male_detained: 0,
                        adult_male_dispossessed: 0,
                        
                        adult_female_killed: 0,
                        adult_female_maimed: 0,
                        adult_female_injured: 0,
                        adult_female_detained: 0,
                        adult_female_dispossessed: 0,
                        
                        adult_ungendered_killed: 0,
                        adult_ungendered_maimed: 0,
                        adult_ungendered_injured: 0,
                        adult_ungendered_detained: 0,
                        adult_ungendered_dispossessed: 0,
                        
                        child_male_killed: 0,
                        child_male_maimed: 0,
                        child_male_injured: 0,
                        child_male_detained: 0,
                        child_male_dispossessed: 0,
                        
                        child_female_killed: 0,
                        child_female_maimed: 0,
                        child_female_injured: 0,
                        child_female_detained: 0,
                        child_female_dispossessed: 0,
                        
                        child_ungendered_killed: 0,
                        child_ungendered_maimed: 0,
                        child_ungendered_injured: 0,
                        child_ungendered_detained: 0,
                        child_ungendered_dispossessed: 0,
                        
                        unaged_male_killed: 0,
                        unaged_male_maimed: 0,
                        unaged_male_injured: 0,
                        unaged_male_detained: 0,
                        unaged_male_dispossessed: 0,

                        unaged_female_killed: 0,
                        unaged_female_maimed: 0,
                        unaged_female_injured: 0,
                        unaged_female_detained: 0,
                        unaged_female_dispossessed: 0,

                        unaged_ungendered_killed: 0,
                        unaged_ungendered_maimed: 0,
                        unaged_ungendered_injured: 0,
                        unaged_ungendered_detained: 0,
                        unaged_ungendered_dispossessed: 0,    

                        /* Civil Infrastructure Loss */
                        roads_and_streets_destroyed: 0,
                        roads_and_streets_damaged: 0,

                        bridges_and_tunnels_destroyed: 0,
                        bridges_and_tunnels_damaged: 0,

                        railways_destroyed: 0,
                        railways_damaged: 0,

                        public_transit_stops_destroyed: 0,
                        public_transit_stops_damaged: 0,

                        airports_destroyed: 0,
                        airports_damaged: 0,

                        ports_and_harbors_destroyed: 0,
                        ports_and_harbors_damaged: 0,

                        parking_facilities_destroyed: 0,
                        parking_facilities_damaged: 0,

                        cycling_infrastructure_destroyed: 0,
                        cycling_infrastructure_damaged: 0,

                        pedestrian_infrastructure_destroyed: 0,
                        pedestrian_infrastructure_damaged: 0,

                        traffic_management_destroyed: 0,
                        traffic_management_damaged: 0,

                        hospitals_destroyed: 0,
                        hospitals_damaged: 0,

                        pharmacies_destroyed: 0,
                        pharmacies_damaged: 0,

                        rehabilitation_centers_destroyed: 0,
                        rehabilitation_centers_damaged: 0,

                        schools_destroyed: 0,
                        schools_damaged: 0,

                        colleges_and_universities_destroyed: 0,
                        colleges_and_universities_damaged: 0,

                        libraries_destroyed: 0,
                        libraries_damaged: 0,

                        police_stations_destroyed: 0,
                        police_stations_damaged: 0,

                        fire_stations_destroyed: 0,
                        fire_stations_damaged: 0,

                        emergency_response_centers_destroyed: 0,
                        emergency_response_centers_damaged: 0,

                        water_supply_destroyed: 0,
                        water_supply_damaged: 0,

                        sewage_and_waste_management_destroyed: 0,
                        sewage_and_waste_management_damaged: 0,

                        electricity_destroyed: 0,
                        electricity_damaged: 0,

                        natural_gas_destroyed: 0,
                        natural_gas_damaged: 0,

                        government_buildings_destroyed: 0,
                        government_buildings_damaged: 0,

                        community_centers_destroyed: 0,
                        community_centers_damaged: 0,

                        post_offices_destroyed: 0,
                        post_offices_damaged: 0,

                        cell_towers_destroyed: 0,
                        cell_towers_damaged: 0,

                        internet_infrastructure_destroyed: 0,
                        internet_infrastructure_damaged: 0,

                        broadcasting_destroyed: 0,
                        broadcasting_damaged: 0,

                        shopping_centers_destroyed: 0,
                        shopping_centers_damaged: 0,

                        restaurants_and_eateries_destroyed: 0,
                        restaurants_and_eateries_damaged: 0,

                        entertainment_venues_destroyed: 0,
                        entertainment_venues_damaged: 0,

                        parks_and_recreational_areas_destroyed: 0,
                        parks_and_recreational_areas_damaged: 0,

                        tourist_attractions_destroyed: 0,
                        tourist_attractions_damaged: 0,

                        places_of_worship_destroyed: 0,
                        places_of_worship_damaged: 0,

                        cultural_centers_destroyed: 0,
                        cultural_centers_damaged: 0,

                        housing_destroyed: 0,
                        housing_damaged: 0,

                        residential_communities_destroyed: 0,
                        residential_communities_damaged: 0,

                        hotels_and_lodging_destroyed: 0,
                        hotels_and_lodging_damaged: 0,

                        green_spaces_destroyed: 0,
                        green_spaces_damaged: 0,

                        environmental_conservation_areas_destroyed: 0,
                        environmental_conservation_areas_damaged: 0,
                    }
                }
                this.incidents.push(incident);
                // connect incident to location
                this.occuredAt.push({
                    id: generateId("OCCURED_AT"),
                    label: 'OCCURED_AT',
                    properties: {},
                    source: incident.id,
                    target: locationIncident.id
                })                
            }

            // connect incident to victim
            this.killed.push({
                id: generateId("KILLED"),
                label: "KILLED",
                properties: {},
                source: incident.id,
                target: v.id
            })
        }

        // iterate over incidents to populate props
        for (const i of this.incidents) {
            const incidentId = i.id;
            const victimsKilledIds = this.killed.filter(k => k.source === incidentId).map(k => k.target);
            const victimsKilled = this.identifiedVictims.filter(v => victimsKilledIds.includes(v.id));
            for (const vk of victimsKilled) {
                if (vk.properties.description) {
                    i.properties.description += vk.properties.description + "\n";
                }
                
                const isAdult = ( (typeof vk.properties.age === "number" && vk.properties.age >= 18) || vk.properties.age === "adult" || vk.properties.age === "senior");
                const isChild = ( (typeof vk.properties.age === "number" && vk.properties.age < 18) || vk.properties.age === "child" || vk.properties.age === "infant");
                const noAge = !isAdult && !isChild;

                if (isAdult && vk.properties.gender === "male") {
                    i.properties.adult_male_killed += 1;
                }
                else if (isAdult && vk.properties.gender === "female") {
                    i.properties.adult_female_killed += 1;
                }
                else if (isAdult && !vk.properties.gender) {
                    i.properties.adult_ungendered_killed += 1;
                }
                else if (isChild && vk.properties.gender === "male") {
                    i.properties.child_male_killed += 1;
                }
                else if (isChild && vk.properties.gender === "female") {
                    i.properties.child_female_killed += 1;
                }
                else if (isChild && !vk.properties.gender) {
                    i.properties.child_ungendered_killed += 1;
                }
                else if (noAge && vk.properties.gender === "male") {
                    i.properties.unaged_male_killed += 1;
                }
                else if (noAge && vk.properties.gender === "female") {
                    i.properties.unaged_female_killed += 1;
                }
                else if (noAge && !vk.properties.gender) {
                    i.properties.unaged_ungendered_killed += 1;
                } else {
                    console.error(isAdult, isChild, noAge)
                    throw new Error("Unknown case: " + JSON.stringify(vk));
                }
            }
        }
    }
}


(async function() {
    program
    .option("-f <path>", "path to csv file", "./data.csv")
    .option("-N <num>", "number of entries to process from start", undefined)

    program.parse();
    const args = program.opts();

    const filePath = args.f;
    const N = args.N ? parseInt(args.N) : undefined;
    
    let entries = (await parseCSV(filePath)).filter((e)=> e.name !== "Name unknown to B'Tselem");
    if (N) {
        entries = entries.splice(0, N);
    }
    console.info(entries.length + " entries...");

    const parser = new Parser(entries);
    await parser.parse();


    console.log("--- VICTIMS ---")
    for (const v of parser.identifiedVictims) {
        await client.setNode(v);
        console.log(v);
    }
    
    console.log("--- INCIDENTS ---")
    for (const i of parser.incidents) {
        await client.setNode(i);
        console.log(i);
    }
    
    console.log("--- LOCATIONS ---")
    for (const loc of parser.locations) {
        await client.setNode(loc);
        console.log(loc);
    }
    
    console.log("--- LINK: INCIDENT LOCATIONS ---")
    for (const l of parser.occuredAt) {
        await client.setLink(l);
        console.log(l);
    }

    console.log("--- LINK: VICTIM LOCATIONS ---")
    for (const l of parser.residentOf) {
        await client.setLink(l);
        console.log(l);
    }

    console.log("--- LINK: VICTIMS KILLED BY INCIDENTS ---")
    for (const l of parser.killed) {
        await client.setLink(l);
        console.log(l);
    }

    console.log("DONE!");
    client.close();
})();

