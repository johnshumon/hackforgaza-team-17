import { Incident } from "../../model/incident";
import { queryNotionDatabase } from "../../src/libs/notion";
import { loadRequiredEnvironmentVariable } from "../../src/utils/env";

export const IncidentParseError = new Error("Failed to parse incident from database.");

async function getIncidentsByContextId(contextId: string) {
    const raw = await queryNotionDatabase(loadRequiredEnvironmentVariable("NOTION_INCIDENTS_DATABASE_ID", "string"), {
        property: "Context",
        relation: {
            contains: contextId
        }
    });

    const incidents : Incident[] = raw.map((r)=>{
        const incident : Incident = {
            id: r?.id,
            publicId: r?.properties?.["Public ID"]?.unique_id?.prefix + "-" + r?.properties?.["Public ID"]?.unique_id?.number,
            title: r?.properties?.Title?.title?.[0]?.plain_text ?? "",
            description: r?.properties?.Description?.rich_text?.[0]?.plain_text ?? "",
            categories: r?.properties?.Categories?.multi_select?.map((item: any)=>item?.name) ?? [],
            auditStatus: r?.properties?.["Audit Status"]?.select?.name ?? null,
            tags: r?.properties?.Tags?.multi_select?.map((item: any)=>item?.name) ?? [],
            
            location: (r?.properties?.Location?.relation?.[0]?.properties?.Name?.title?.[0]?.plain_text && r?.properties?.Location?.relation?.[0]?.properties?.Latitude?.number && r?.properties?.Location?.relation?.[0]?.properties?.Longitude?.number) ? {
                name: r.properties.Location.relation[0].properties.Name.title[0].plain_text,
                geocode: {
                    latitude: r.properties.Location.relation[0].properties.Latitude.number,
                    longitude: r.properties.Location.relation[0].properties.Longitude.number
                }
            } : null,

            dateTime: r?.properties?.["Date and Time"]?.date?.start ? new Date(r.properties["Date and Time"].date.start).toISOString() : null,

            /* Human Loss */
            adult_male_killed: r?.properties["Adult Male Killed"]?.number ?? 0,
            adult_male_maimed: r?.properties["Adult Male Maimed"]?.number ?? 0,
            adult_male_injured: r?.properties["Adult Male Injured"]?.number ?? 0,
            adult_male_detained: r?.properties["Adult Male Detained"]?.number ?? 0,
            adult_male_dispossessed: r?.properties["Adult Male Dispossessed"]?.number ?? 0,
            
            adult_female_killed: r?.properties["Adult Female Killed"]?.number ?? 0,
            adult_female_maimed: r?.properties["Adult Female Maimed"]?.number ?? 0,
            adult_female_injured: r?.properties["Adult Female Injured"]?.number ?? 0,
            adult_female_detained: r?.properties["Adult Female Detained"]?.number ?? 0,
            adult_female_dispossessed: r?.properties["Adult Female Dispossessed"]?.number ?? 0,
            
            adult_ungendered_killed: r?.properties["Adult Ungendered Killed"]?.number ?? 0,
            adult_ungendered_maimed: r?.properties["Adult Ungendered Maimed"]?.number ?? 0,
            adult_ungendered_injured: r?.properties["Adult Ungendered Injured"]?.number ?? 0,
            adult_ungendered_detained: r?.properties["Adult Ungendered Detained"]?.number ?? 0,
            adult_ungendered_dispossessed: r?.properties["Adult Ungendered Dispossessed"]?.number ?? 0,
            
            child_male_killed: r?.properties["Child Male Killed"]?.number ?? 0,
            child_male_maimed: r?.properties["Child Male Maimed"]?.number ?? 0,
            child_male_injured: r?.properties["Child Male Injured"]?.number ?? 0,
            child_male_detained: r?.properties["Child Male Detained"]?.number ?? 0,
            child_male_dispossessed: r?.properties["Child Male Dispossessed"]?.number ?? 0,
            
            child_female_killed: r?.properties["Child Female Killed"]?.number ?? 0,
            child_female_maimed: r?.properties["Child Female Maimed"]?.number ?? 0,
            child_female_injured: r?.properties["Child Female Injured"]?.number ?? 0,
            child_female_detained: r?.properties["Child Female Detained"]?.number ?? 0,
            child_female_dispossessed: r?.properties["Child Female Dispossessed"]?.number ?? 0,
            
            child_ungendered_killed: r?.properties["Child Ungendered Killed"]?.number ?? 0,
            child_ungendered_maimed: r?.properties["Child Ungendered Maimed"]?.number ?? 0,
            child_ungendered_injured: r?.properties["Child Ungendered Injured"]?.number ?? 0,
            child_ungendered_detained: r?.properties["Child Ungendered Detained"]?.number ?? 0,
            child_ungendered_dispossessed: r?.properties["Child Ungendered Dispossessed"]?.number ?? 0,
            
            unaged_male_killed: r?.properties["Unaged Male Killed"]?.number ?? 0,
            unaged_male_maimed: r?.properties["Unaged Male Maimed"]?.number ?? 0,
            unaged_male_injured: r?.properties["Unaged Male Injured"]?.number ?? 0,
            unaged_male_detained: r?.properties["Unaged Male Detained"]?.number ?? 0,
            unaged_male_dispossessed: r?.properties["Unaged Male Dispossessed"]?.number ?? 0,
        
            unaged_female_killed: r?.properties["Unaged Female Killed"]?.number ?? 0,
            unaged_female_maimed: r?.properties["Unaged Female Maimed"]?.number ?? 0,
            unaged_female_injured: r?.properties["Unaged Female Injured"]?.number ?? 0,
            unaged_female_detained: r?.properties["Unaged Female Detained"]?.number ?? 0,
            unaged_female_dispossessed: r?.properties["Unaged Female Dispossessed"]?.number ?? 0,

            unaged_ungendered_killed: r?.properties["Unaged Ungendered Killed"]?.number ?? 0,
            unaged_ungendered_maimed: r?.properties["Unaged Ungendered Maimed"]?.number ?? 0,
            unaged_ungendered_injured: r?.properties["Unaged Ungendered Injured"]?.number ?? 0,
            unaged_ungendered_detained: r?.properties["Unaged Ungendered Detained"]?.number ?? 0,
            unaged_ungendered_dispossessed: r?.properties["Unaged Ungendered Dispossessed"]?.number ?? 0,

            /* Civil Infrastructure Loss */
            roads_and_streets_destroyed: r?.properties["Roads and Streets Destroyed"]?.number ?? 0,
            roads_and_streets_damaged: r?.properties["Roads and Streets Damaged"]?.number ?? 0,

            bridges_and_tunnels_destroyed: r?.properties["Bridges and Tunnels Destroyed"]?.number ?? 0,
            bridges_and_tunnels_damaged: r?.properties["Bridges and Tunnels Damaged"]?.number ?? 0,

            railways_destroyed: r?.properties["Railways Destroyed"]?.number ?? 0,
            railways_damaged: r?.properties["Railways Damaged"]?.number ?? 0,

            public_transit_stops_destroyed: r?.properties["Public Transit Stops Destroyed"]?.number ?? 0,
            public_transit_stops_damaged: r?.properties["Public Transit Stops Damaged"]?.number ?? 0,

            airports_destroyed: r?.properties["Airports Destroyed"]?.number ?? 0,
            airports_damaged: r?.properties["Airports Damaged"]?.number ?? 0,

            ports_and_harbors_destroyed: r?.properties["Ports and Harbors Destroyed"]?.number ?? 0,
            ports_and_harbors_damaged: r?.properties["Ports and Harbors Damaged"]?.number ?? 0,

            parking_facilities_destroyed: r?.properties["Parking Facilities Destroyed"]?.number ?? 0,
            parking_facilities_damaged: r?.properties["Parking Facilities Damaged"]?.number ?? 0,

            cycling_infrastructure_destroyed: r?.properties["Cycling Infrastructure Destroyed"]?.number ?? 0,
            cycling_infrastructure_damaged: r?.properties["Cycling Infrastructure Damaged"]?.number ?? 0,

            pedestrian_infrastructure_destroyed: r?.properties["Pedestrian Infrastructure Destroyed"]?.number ?? 0,
            pedestrian_infrastructure_damaged: r?.properties["Pedestrian Infrastructure Damaged"]?.number ?? 0,

            traffic_management_destroyed: r?.properties["Traffic Management Destroyed"]?.number ?? 0,
            traffic_management_damaged: r?.properties["Traffic Management Damaged"]?.number ?? 0,

            hospitals_destroyed: r?.properties["Hospitals Destroyed"]?.number ?? 0,
            hospitals_damaged: r?.properties["Hospitals Damaged"]?.number ?? 0,

            pharmacies_destroyed: r?.properties["Pharmacies Destroyed"]?.number ?? 0,
            pharmacies_damaged: r?.properties["Pharmacies Damaged"]?.number ?? 0,

            rehabilitation_centers_destroyed: r?.properties["Rehabilitation Centers Destroyed"]?.number ?? 0,
            rehabilitation_centers_damaged: r?.properties["Rehabilitation Centers Damaged"]?.number ?? 0,

            schools_destroyed: r?.properties["Schools Destroyed"]?.number ?? 0,
            schools_damaged: r?.properties["Schools Damaged"]?.number ?? 0,

            colleges_and_universities_destroyed: r?.properties["Colleges and Universities Destroyed"]?.number ?? 0,
            colleges_and_universities_damaged: r?.properties["Colleges and Universities Damaged"]?.number ?? 0,

            libraries_destroyed: r?.properties["Libraries Destroyed"]?.number ?? 0,
            libraries_damaged: r?.properties["Libraries Damaged"]?.number ?? 0,

            police_stations_destroyed: r?.properties["Police Stations Destroyed"]?.number ?? 0,
            police_stations_damaged: r?.properties["Police Stations Damaged"]?.number ?? 0,

            fire_stations_destroyed: r?.properties["Fire Stations Destroyed"]?.number ?? 0,
            fire_stations_damaged: r?.properties["Fire Stations Damaged"]?.number ?? 0,

            emergency_response_centers_destroyed: r?.properties["Emergency Response Centers Destroyed"]?.number ?? 0,
            emergency_response_centers_damaged: r?.properties["Emergency Response Centers Damaged"]?.number ?? 0,

            water_supply_destroyed: r?.properties["Water Supply Destroyed"]?.number ?? 0,
            water_supply_damaged: r?.properties["Water Supply Damaged"]?.number ?? 0,

            sewage_and_waste_management_destroyed: r?.properties["Sewage and Waste Management Destroyed"]?.number ?? 0,
            sewage_and_waste_management_damaged: r?.properties["Sewage and Waste Management Damaged"]?.number ?? 0,

            electricity_destroyed: r?.properties["Electricity Destroyed"]?.number ?? 0,
            electricity_damaged: r?.properties["Electricity Damaged"]?.number ?? 0,

            natural_gas_destroyed: r?.properties["Natural Gas Destroyed"]?.number ?? 0,
            natural_gas_damaged: r?.properties["Natural Gas Damaged"]?.number ?? 0,

            government_buildings_destroyed: r?.properties["Government Buildings Destroyed"]?.number ?? 0,
            government_buildings_damaged: r?.properties["Government Buildings Damaged"]?.number ?? 0,

            community_centers_destroyed: r?.properties["Community Centers Destroyed"]?.number ?? 0,
            community_centers_damaged: r?.properties["Community Centers Damaged"]?.number ?? 0,

            post_offices_destroyed: r?.properties["Post Offices Destroyed"]?.number ?? 0,
            post_offices_damaged: r?.properties["Post Offices Damaged"]?.number ?? 0,

            cell_towers_destroyed: r?.properties["Cell Towers Destroyed"]?.number ?? 0,
            cell_towers_damaged: r?.properties["Cell Towers Damaged"]?.number ?? 0,

            internet_infrastructure_destroyed: r?.properties["Internet Infrastructure Destroyed"]?.number ?? 0,
            internet_infrastructure_damaged: r?.properties["Internet Infrastructure Damaged"]?.number ?? 0,

            broadcasting_destroyed: r?.properties["Broadcasting Destroyed"]?.number ?? 0,
            broadcasting_damaged: r?.properties["Broadcasting Damaged"]?.number ?? 0,

            shopping_centers_destroyed: r?.properties["Shopping Centers Destroyed"]?.number ?? 0,
            shopping_centers_damaged: r?.properties["Shopping Centers Damaged"]?.number ?? 0,

            restaurants_and_eateries_destroyed: r?.properties["Restaurants and Eateries Destroyed"]?.number ?? 0,
            restaurants_and_eateries_damaged: r?.properties["Restaurants and Eateries Damaged"]?.number ?? 0,

            entertainment_venues_destroyed: r?.properties["Entertainment Venues Destroyed"]?.number ?? 0,
            entertainment_venues_damaged: r?.properties["Entertainment Venues Damaged"]?.number ?? 0,

            parks_and_recreational_areas_destroyed: r?.properties["Parks and Recreational Areas Destroyed"]?.number ?? 0,
            parks_and_recreational_areas_damaged: r?.properties["Parks and Recreational Areas Damaged"]?.number ?? 0,

            tourist_attractions_destroyed: r?.properties["Tourist Attractions Destroyed"]?.number ?? 0,
            tourist_attractions_damaged: r?.properties["Tourist Attractions Damaged"]?.number ?? 0,

            places_of_worship_destroyed: r?.properties["Places of Worship Destroyed"]?.number ?? 0,
            places_of_worship_damaged: r?.properties["Places of Worship Damaged"]?.number ?? 0,

            cultural_centers_destroyed: r?.properties["Cultural Centers Destroyed"]?.number ?? 0,
            cultural_centers_damaged: r?.properties["Cultural Centers Damaged"]?.number ?? 0,

            housing_destroyed: r?.properties["Housing Destroyed"]?.number ?? 0,
            housing_damaged: r?.properties["Housing Damaged"]?.number ?? 0,

            residential_communities_destroyed: r?.properties["Residential Communities Destroyed"]?.number ?? 0,
            residential_communities_damaged: r?.properties["Residential Communities Damaged"]?.number ?? 0,

            hotels_and_lodging_destroyed: r?.properties["Hotels and Lodging Destroyed"]?.number ?? 0,
            hotels_and_lodging_damaged: r?.properties["Hotels and Lodging Damaged"]?.number ?? 0,

            green_spaces_destroyed: r?.properties["Green Spaces Destroyed"]?.number ?? 0,
            green_spaces_damaged: r?.properties["Green Spaces Damaged"]?.number ?? 0,

            environmental_conservation_areas_destroyed: r?.properties["Environmental Conservation Areas Destroyed"]?.number ?? 0,
            environmental_conservation_areas_damaged: r?.properties["Environmental Conservation Areas Damaged"]?.number ?? 0,            
        }

        const parseResult = Incident.safeParse(incident);
        if (!parseResult.success) {
            console.error(parseResult.error);
            throw IncidentParseError;
        } else {
            return parseResult.data;
        }
    });

    return incidents;
}

export default getIncidentsByContextId;