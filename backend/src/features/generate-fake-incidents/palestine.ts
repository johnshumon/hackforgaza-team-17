import { faker } from "@faker-js/faker";
import { WeightedObjectGenerator, randomDate, randomInt, randomSelection } from "@/utils/random";
import { Incident } from "@m/incident";
import { IncidentsQuery, IncidentsQueryHandler } from "@/controllers/get-incidents";
import { WeightedRandomIncidentGenerator, generateRandomIncidents } from "@/features/generate-fake-incidents";


const randomIncidentGenerator : WeightedRandomIncidentGenerator = (spec) => new WeightedObjectGenerator<Incident>(
    {
        name: "IDF Raid",
        weight: 5,
        fnc: ()=>({
            id: faker.string.uuid(),
            contextSlug: spec.contextSlug,
            title: `IDF Raid in ${spec.location.name}`,
            
            description: "",
            categories: randomSelection(["military assault", "vandalism", "torture", "detention, abduction, and kidnapping", "desecration and destruction of heritage site"], 1, 4),
            
            location: {srid: 4326, x: spec.location.geocode.lat, y: spec.location.geocode.lng},
            dateTime: randomDate(spec.dateTime.from.toISOString(), spec.dateTime.to.toISOString()).toISOString(),

            adult_male_killed: randomInt(0, 3),
            adult_male_injured: randomInt(0, 3),
            adult_male_maimed: randomInt(0, 1),
            adult_female_injured: randomInt(0, 1),
            child_male_injured: randomInt(0, 3),
            child_male_detained: randomInt(0, 3),
            child_female_detained: randomInt(0, 1),

            status: "audited:fake",
            tags: []
        })
    },
    {
        name: "Settler Raid",
        weight: 10,
        fnc: ()=>({
            id: faker.string.uuid(),
            contextSlug: spec.contextSlug,
            title: `IDF Raid in ${spec.location.name}`,
            
            description: "",
            categories: randomSelection(["armed assault", "verbal and psychological aggression", "torture", "sabotage and arson", "desecration and destruction of heritage site"], 1, 3),
            
            location: {srid: 4326, x: spec.location.geocode.lat, y: spec.location.geocode.lng},
            dateTime: randomDate(spec.dateTime.from.toISOString(), spec.dateTime.to.toISOString()).toISOString(),

            adult_male_killed: randomInt(0, 3),
            adult_male_injured: randomInt(0, 3),
            adult_male_maimed: randomInt(0, 1),
            child_male_injured: randomInt(0, 3),

            status: "audited:fake",
            tags: []            
        })
    }
)


export const randomIncidentsQueryHandler : IncidentsQueryHandler = (query: IncidentsQuery) : Incident[] => {
    const from = query.from ? new Date(query.from) : new Date(1917, 1, 1);
    const to = query.to ? new Date(query.to) : new Date();
    return generateRandomIncidents({
        contextSlug: "palestinian",
        epicentres: [
            {
                name: "Jerusalem",
                geocode: {
                    lat: 31.7964379,
                    lng: 35.0927882
                }
            }
        ],
        minIncidentsPerEpicentre: 20,
        maxIncidentsPerEpicentre: 50,
        radiusFromEpicentre: 10,
        from,
        to
    }, randomIncidentGenerator);
};