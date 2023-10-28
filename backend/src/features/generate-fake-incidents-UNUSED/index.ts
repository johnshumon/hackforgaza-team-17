import { faker } from "@faker-js/faker";
import { Incident } from "../../model/incident";
import { WeightedObjectGenerator, randomInt } from "../utils/random";
import { NamedLocation } from "../../types/geocode";

export type WeightedRandomIncidentGenerator = (spec: {contextSlug: string, location: NamedLocation, dateTime: {from: Date, to: Date}}) => WeightedObjectGenerator<Incident>;

export function generateRandomIncidents(spec: {
    contextSlug: string,
    epicentres: NamedLocation[], 
    minIncidentsPerEpicentre: number, 
    maxIncidentsPerEpicentre: number, 
    radiusFromEpicentre: number,
    from: Date,
    to: Date
}, generator: WeightedRandomIncidentGenerator) : Incident[] {
    // generate random geocodes (from given epicentres) to create random incidents for
    const locations: NamedLocation[] = [];
    spec.epicentres.forEach((epicentre)=>{
        // add epicentre
        locations.push(epicentre);
        // random n of incidents to generate
        const nIncidentsForEpicentre = randomInt(spec.minIncidentsPerEpicentre, spec.maxIncidentsPerEpicentre);
        // add random coordinates around epicentre
        for (let i=0;i<nIncidentsForEpicentre; ++i) {
            const randomGeocode = faker.location.nearbyGPSCoordinate({ origin: [epicentre.geocode.lat, epicentre.geocode.lng], radius: spec.radiusFromEpicentre });
            locations.push({
                name: epicentre.name,
                geocode: {
                    lat: randomGeocode[0],
                    lng: randomGeocode[1]
                }
            })
        }
    });
    // generate incidents for each geocode in array
    const result : Incident[] = [];
    // generate incidents
    locations.forEach((location)=>{
        const item = generator({
            contextSlug: spec.contextSlug,
            location: location, 
            dateTime: {
                from: spec.from,
                to: spec.to
            }
        }).generate();
        result.push(item);
    });
    //
    return result;
}