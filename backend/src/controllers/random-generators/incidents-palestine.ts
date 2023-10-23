import { faker } from "@faker-js/faker";
import { GeoCoordinate } from "../../../model/geocoordinate";
import { GetIncidentResult, IncidentWithContext } from "../../controllers/incidents";
import { WeightedObjectGenerator, randomInt, randomSelection } from "../../utils/random";

const epicentreGeoCoordinates : Array<GeoCoordinate> = [
    {
        srid: 4326,
        x: 31.533998,
        y: 34.519451
    },
    {
        srid: 4326,
        x: 31.517610,
        y: 34.442890
    },
    {
        srid: 4326,
        x: 31.491558, 
        y: 34.461086
    },
    {
        srid: 4326,
        x: 31.6400239,
        y: 34.366784
    },
    {
        srid: 4326,
        x: 31.454002,
        y: 34.426786
    },
    {
        srid: 4326,
        x: 31.433756, 
        y: 34.390418
    },
    {
        srid: 4326,
        x: 31.418980, 
        y: 34.344330
    },
    {
        srid: 4326,
        x: 31.3873736,
        y: 34.2905167
    }
];

const randomDate = () => faker.date.between({
    from: "1917-01-01T00:00:00.000Z",
    to: "2023-01-01T00:00:00.000Z"
});
const randomIncidentFromLocation = (location: GeoCoordinate) => new WeightedObjectGenerator<IncidentWithContext>(
    {
        name: "IDF Raid",
        weight: 10,
        fnc: ()=>({
            incident: {
                id: faker.string.uuid(),
                title: faker.lorem.words(10),
                location: [location],
                dateTime: randomDate().toISOString(),
                description: faker.lorem.lines(),
                categories: randomSelection(["detention", "assault", "firearm assault"], 1, 3),
                tags: [faker.word.words()]
            },
            victims: {
                killed: randomInt(0, 5),
                maimed: randomInt(0, 0),
                injured: randomInt(0, 5),
                detained: randomInt(0, 5),
                dispossessed: 0,
            }
        })
    },
    {
        name: "Settler Violence",
        weight: 6,
        fnc: ()=>({
            incident: {
                id: faker.string.uuid(),
                title: faker.lorem.words(10),
                location: [location],
                dateTime: randomDate().toISOString(),
                description: faker.lorem.lines(),
                categories: randomSelection(["verbal aggression", "assault", "firearm assault"], 1, 3),
                tags: [faker.word.words()]
            },
            victims: {
                killed: randomInt(0, 3),
                maimed: randomInt(0, 2),
                injured: randomInt(0, 3),
                detained: 0,
                dispossessed: 0,
            }
        })
    },
    {
        name: "Air Strikes",
        weight: 3,
        fnc: ()=>({
            incident: {
                id: faker.string.uuid(),
                title: faker.lorem.words(10),
                location: [location],
                dateTime: randomDate().toISOString(),
                description: faker.lorem.lines(),
                categories: randomSelection(["missile strike", "bombing", "white phosphorus"], 1, 3),
                tags: [faker.word.words()]
            },
            victims: {
                killed: randomInt(0, 500),
                maimed: randomInt(0, 500),
                injured: randomInt(0, 1000),
                detained: 0,
                dispossessed: randomInt(0, 2000),
            }
        })        
    }
);

export function generateRandomIncidents(nPerEpicentre: number) : GetIncidentResult {
    const geocodes : GeoCoordinate[] = [];
    const result : GetIncidentResult = [];
    // produce list of geoocordinates to generate incidents for
    epicentreGeoCoordinates.forEach((epicentre)=>{
        // add epicentre
        geocodes.push(epicentre);
        // add random coordinates around epicentre
        for (let i=0;i<nPerEpicentre-1; ++i) {
            const randomGeocode = faker.location.nearbyGPSCoordinate({ origin: [epicentre.x, epicentre.y], radius: 1 });
            geocodes.push({
                srid: 4326,
                x: randomGeocode[0],
                y: randomGeocode[1]
            })
        }
    });
    // generate incidents
    geocodes.forEach((location)=>{
        result.push(randomIncidentFromLocation(location).generate());
    })
    //
    return result;
}