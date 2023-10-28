import { z } from "zod";
import { makeRouteHandler, SUCCESS_RESPONSE, BAD_REQUEST_RESPONSE } from "../../framework";
import { Incident } from "../../../model/incident"
import { Count } from "../../../model/common";
import getIncidentsByContextId from "../data/notion/get-incidents-by-context-id";


const GetIncidentsResponse = z.object({
    incidents: Incident.merge(z.object({
        /* Human Loss Aggregate */
        killed: Count,
        adult_killed: Count,
        child_killed: Count,

        maimed: Count,
        adult_maimed: Count,
        child_maimed: Count,

        injured: Count,
        adult_injured: Count,
        child_injured: Count,

        detained: Count,
        adult_detained: Count,
        child_detained: Count,

        dispossessed: Count,
        adult_dispossessed: Count,
        child_dispossessed: Count,

        victims: Count,
        adult_victims: Count,
        child_victims: Count,

        /* Civil Infrastructure Loss Aggregate */
        transportation_infrastructure_damaged: Count,
        transportation_infrastructure_destroyed: Count,

        healthcare_infrastructure_damaged: Count,
        healthcare_infrastructure_destroyed: Count,

        educational_infrastructure_damaged: Count,
        educational_infrastructure_destroyed: Count,

        emergency_services_damaged: Count,
        emergency_services_destroyed: Count,

        utilities_damaged: Count,
        utilities_destroyed: Count,

        government_and_civic_infrastructure_damaged: Count,
        government_and_civic_infrastructure_destroyed: Count,

        communication_infrastructure_damaged: Count,
        communication_infrastructure_destroyed: Count,

        commercial_and_recreational_infrastructure_damaged: Count,
        commercial_and_recreational_infrastructure_destroyed: Count,

        religious_and_cultural_infrastructure_damaged: Count,
        religious_and_cultural_infrastructure_destroyed: Count,

        residential_infrastructure_damaged: Count,
        residential_infrastructure_destroyed: Count,

        environmental_infrastructure_damaged: Count,
        environmental_infrastructure_destroyed: Count,

        civil_infrastructure_destroyed: Count,
        civil_infrastructure_damaged: Count,
        civil_infrastructure_affected: Count
    })).array()
});
type GetIncidentsResponse = z.infer<typeof GetIncidentsResponse>;


const IncidentsQuery = z.object({
    // ids: z.string().array().optional(),
    from: z.string().datetime().optional(),
    to: z.string().datetime().optional(),
});
export type IncidentsQuery = z.infer<typeof IncidentsQuery>;
export type IncidentsQueryHandler = (query: IncidentsQuery) => Incident[];

export default makeRouteHandler({
    description: "Query incidents related to a genocide context.",
    request: z.object({}),
    response: GetIncidentsResponse,
    query: z.object({
        "random-data": z.literal("true").optional()
    }).merge(IncidentsQuery),

    async handler(request, params) {
        if (!params.contextId) {
            return BAD_REQUEST_RESPONSE(`Given context does not exist: '${params.contextId}'`);
        }
        const RouteParams = z.object({
            contextId: z.string()
        })
        if (!RouteParams.safeParse(params).success) {
            return BAD_REQUEST_RESPONSE(`Given context is invalid: '${params.contextId}'`);
        }

        const incidents = await getIncidentsByContextId(params.contextId);
        const responseData : GetIncidentsResponse = {
            incidents: incidents.map((r)=>{
                /* Human Loss Aggregate */
                const killed = r.adult_male_killed + r.child_male_killed + r.adult_female_killed + r.child_female_killed + r.adult_ungendered_killed + r.child_ungendered_killed + r.unaged_male_killed + r.unaged_female_killed + r.unaged_ungendered_killed;
                const adult_killed = r.adult_male_killed  + r.adult_female_killed  + r.adult_ungendered_killed;
                const child_killed = r.child_male_killed  + r.child_female_killed  + r.child_ungendered_killed;

                const maimed = r.adult_male_maimed + r.child_male_maimed + r.adult_female_maimed  + r.child_female_maimed + r.adult_ungendered_maimed  + r.child_ungendered_maimed + r.unaged_male_maimed + r.unaged_female_maimed + r.unaged_ungendered_maimed
                const adult_maimed = r.adult_male_maimed  + r.adult_female_maimed  + r.adult_ungendered_maimed;
                const child_maimed = r.child_male_maimed  + r.child_female_maimed  + r.child_ungendered_maimed;

                const injured = r.adult_male_injured  + r.child_male_injured  + r.adult_female_injured  + r.child_female_injured  + r.adult_ungendered_injured  + r.child_ungendered_injured + r.unaged_male_injured + r.unaged_female_injured + r.unaged_ungendered_injured;
                const adult_injured = r.adult_male_injured  + r.adult_female_injured  + r.adult_ungendered_injured;
                const child_injured = r.child_male_injured  + r.child_female_injured  + r.child_ungendered_injured;

                const detained = r.adult_male_detained  + r.child_male_detained  + r.adult_female_detained  + r.child_female_detained + r.adult_ungendered_detained  + r.child_ungendered_detained + r.unaged_male_detained + r.unaged_female_detained + r.unaged_ungendered_detained;
                const adult_detained = r.adult_male_detained  + r.adult_female_detained  + r.adult_ungendered_detained;
                const child_detained = r.child_male_detained  + r.child_female_detained  + r.child_ungendered_detained;                    

                const dispossessed = r.adult_male_dispossessed  + r.child_male_dispossessed  + r.adult_female_dispossessed  + r.child_female_dispossessed + r.adult_ungendered_dispossessed  + r.child_ungendered_dispossessed + r.unaged_male_dispossessed + r.unaged_female_dispossessed + r.unaged_ungendered_dispossessed;
                const adult_dispossessed = r.adult_male_dispossessed  + r.adult_female_dispossessed  + r.adult_ungendered_dispossessed;
                const child_dispossessed = r.child_male_dispossessed  + r.child_female_dispossessed  + r.child_ungendered_dispossessed;                    

                const victims = killed + maimed + injured;
                const adult_victims = adult_killed + adult_maimed + adult_injured + adult_detained + adult_dispossessed;
                const child_victims = child_killed + child_maimed + child_injured + child_detained + child_dispossessed;

                /* Civil Infrastructure Loss Aggregate */
                const transportation_infrastructure_damaged = r.roads_and_streets_damaged + r.bridges_and_tunnels_damaged + r.railways_damaged + r.public_transit_stops_damaged + r.airports_damaged + r.ports_and_harbors_damaged + r.parking_facilities_damaged + r.cycling_infrastructure_damaged + r.pedestrian_infrastructure_damaged + r.traffic_management_damaged;
                const transportation_infrastructure_destroyed = r.roads_and_streets_destroyed + r.bridges_and_tunnels_destroyed + r.railways_destroyed + r.public_transit_stops_destroyed + r.airports_destroyed + r.ports_and_harbors_destroyed + r.parking_facilities_destroyed + r.cycling_infrastructure_destroyed + r.pedestrian_infrastructure_destroyed + r.traffic_management_destroyed;

                const healthcare_infrastructure_damaged = r.hospitals_damaged + r.pharmacies_damaged + r.rehabilitation_centers_damaged;
                const healthcare_infrastructure_destroyed = r.hospitals_destroyed + r.pharmacies_destroyed + r.rehabilitation_centers_destroyed;

                const educational_infrastructure_damaged = r.schools_damaged + r.colleges_and_universities_damaged + r.libraries_damaged;
                const educational_infrastructure_destroyed = r.schools_destroyed + r.colleges_and_universities_destroyed + r.libraries_destroyed;

                const emergency_services_damaged = r.police_stations_damaged + r.fire_stations_damaged + r.emergency_response_centers_damaged;
                const emergency_services_destroyed = r.police_stations_destroyed + r.fire_stations_destroyed + r.emergency_response_centers_destroyed;

                const utilities_damaged = r.water_supply_damaged + r.sewage_and_waste_management_damaged + r.electricity_damaged + r.natural_gas_damaged;
                const utilities_destroyed = r.water_supply_destroyed + r.sewage_and_waste_management_destroyed + r.electricity_destroyed + r.natural_gas_destroyed;

                const government_and_civic_infrastructure_damaged = r.government_buildings_damaged + r.community_centers_damaged + r.post_offices_damaged;
                const government_and_civic_infrastructure_destroyed = r.government_buildings_destroyed + r.community_centers_destroyed + r.post_offices_destroyed;

                const communication_infrastructure_damaged = r.cell_towers_damaged + r.internet_infrastructure_damaged + r.broadcasting_damaged;
                const communication_infrastructure_destroyed = r.cell_towers_destroyed + r.internet_infrastructure_destroyed + r.broadcasting_destroyed;

                const commercial_and_recreational_infrastructure_damaged = r.shopping_centers_damaged + r.restaurants_and_eateries_damaged + r.entertainment_venues_damaged + r.parks_and_recreational_areas_damaged + r.tourist_attractions_damaged;
                const commercial_and_recreational_infrastructure_destroyed = r.shopping_centers_destroyed + r.restaurants_and_eateries_destroyed + r.entertainment_venues_destroyed + r.parks_and_recreational_areas_destroyed + r.tourist_attractions_destroyed;

                const religious_and_cultural_infrastructure_damaged = r.places_of_worship_damaged + r.cultural_centers_damaged;
                const religious_and_cultural_infrastructure_destroyed = r.places_of_worship_destroyed + r.cultural_centers_destroyed;

                const residential_infrastructure_damaged = r.housing_damaged + r.residential_communities_damaged + r.hotels_and_lodging_damaged;
                const residential_infrastructure_destroyed = r.housing_destroyed + r.residential_communities_destroyed + r.hotels_and_lodging_destroyed;

                const environmental_infrastructure_damaged = r.green_spaces_damaged + r.environmental_conservation_areas_damaged;
                const environmental_infrastructure_destroyed = r.green_spaces_destroyed + r.environmental_conservation_areas_destroyed;

                const civil_infrastructure_damaged = transportation_infrastructure_damaged + healthcare_infrastructure_damaged + educational_infrastructure_damaged + emergency_services_damaged + utilities_damaged + government_and_civic_infrastructure_damaged + communication_infrastructure_damaged + commercial_and_recreational_infrastructure_damaged + religious_and_cultural_infrastructure_damaged + residential_infrastructure_damaged + environmental_infrastructure_damaged;
                const civil_infrastructure_destroyed = transportation_infrastructure_destroyed + healthcare_infrastructure_destroyed + educational_infrastructure_destroyed + emergency_services_destroyed + utilities_destroyed + government_and_civic_infrastructure_destroyed + communication_infrastructure_destroyed + commercial_and_recreational_infrastructure_destroyed + religious_and_cultural_infrastructure_destroyed + residential_infrastructure_destroyed + environmental_infrastructure_destroyed;
                const civil_infrastructure_affected = civil_infrastructure_damaged + civil_infrastructure_destroyed;

                return {
                    ...r,
                    /* Human Loss Aggregate */
                    killed,
                    adult_killed,
                    child_killed,
        
                    maimed,
                    adult_maimed,
                    child_maimed,
        
                    injured,
                    adult_injured,
                    child_injured,
        
                    detained,
                    adult_detained,
                    child_detained,
        
                    dispossessed,
                    adult_dispossessed,
                    child_dispossessed,
        
                    victims,
                    adult_victims,
                    child_victims,
        
                    /* Civil Infrastructure Loss Aggregate */
                    transportation_infrastructure_damaged,
                    transportation_infrastructure_destroyed,
                                    
                    healthcare_infrastructure_damaged,
                    healthcare_infrastructure_destroyed,
                                    
                    educational_infrastructure_damaged,
                    educational_infrastructure_destroyed,
                                    
                    emergency_services_damaged,
                    emergency_services_destroyed,
                                    
                    utilities_damaged,
                    utilities_destroyed,
                                    
                    government_and_civic_infrastructure_damaged,
                    government_and_civic_infrastructure_destroyed,
                                    
                    communication_infrastructure_damaged,
                    communication_infrastructure_destroyed,
                                    
                    commercial_and_recreational_infrastructure_damaged,
                    commercial_and_recreational_infrastructure_destroyed,
                                    
                    religious_and_cultural_infrastructure_damaged,
                    religious_and_cultural_infrastructure_destroyed,
                                    
                    residential_infrastructure_damaged,
                    residential_infrastructure_destroyed,
                                    
                    environmental_infrastructure_damaged,
                    environmental_infrastructure_destroyed,
                                    
                    civil_infrastructure_destroyed,
                    civil_infrastructure_damaged,
                    civil_infrastructure_affected,
                };
            })
        };


        return SUCCESS_RESPONSE(
            responseData.incidents.length > 0 ? "Incidents found." : "No incidents found.", 
            responseData
        );
    }
});
