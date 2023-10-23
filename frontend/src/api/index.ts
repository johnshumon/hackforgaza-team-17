import type { Incident } from "@/model/incident";
import axios from "axios";
const API_ENDPOINT_BASE_URL = "http://localhost:3000"

export async function getIncidents(context?: string) {
    const result = await axios.get(`${API_ENDPOINT_BASE_URL}/incidents/${context}`, {
        params: {
            "random-data": "true"
        }
    });
    if (result.status === 200 && result?.data?.data?.incidents) {
        const incidents = result.data.data.incidents;
        return incidents.map((i: any)=>{
            const incident: Incident = {
                id: i.id,
                title: i.title,
                description: i.description,
                categories: i.categories,
                status: i.status,
                location: {
                    lat: i.location.x,
                    lng: i.location.y
                },
                dateTime: new Date(i.dateTime),
                tags: i.tags,
                adult_male_killed: i.adult_male_killed,
                adult_male_maimed: i.adult_male_maimed,
                adult_male_injured: i.adult_male_injured,
                adult_male_detained: i.adult_male_detained,
                adult_male_dispossessed: i.adult_male_dispossessed,
                
                adult_female_killed: i.adult_female_killed,
                adult_female_maimed: i.adult_female_maimed,
                adult_female_injured: i.adult_female_injured,
                adult_female_detained: i.adult_female_detained,
                adult_female_dispossessed: i.adult_female_dispossessed,
                
                adult_ungendered_killed: i.adult_ungendered_killed,
                adult_ungendered_maimed: i.adult_ungendered_maimed,
                adult_ungendered_injured: i.adult_ungendered_injured,
                adult_ungendered_detained: i.adult_ungendered_detained,
                adult_ungendered_dispossessed: i.adult_ungendered_dispossessed,
                
                child_male_killed: i.child_male_killed,
                child_male_maimed: i.child_male_maimed,
                child_male_injured: i.child_male_injured,
                child_male_detained: i.child_male_detained,
                child_male_dispossessed: i.child_male_dispossessed,
                
                child_female_killed: i.child_female_killed,
                child_female_maimed: i.child_female_maimed,
                child_female_injured: i.child_female_injured,
                child_female_detained: i.child_female_detained,
                child_female_dispossessed: i.child_female_dispossessed,
                
                child_ungendered_killed: i.child_ungendered_killed,
                child_ungendered_maimed: i.child_ungendered_maimed,
                child_ungendered_injured: i.child_ungendered_injured,
                child_ungendered_detained: i.child_ungendered_detained,
                child_ungendered_dispossessed: i.child_ungendered_dispossessed,
                
                unidentified_killed: i.unidentified_killed,
                unidentified_maimed: i.unidentified_maimed,
                unidentified_injured: i.unidentified_injured,
                unidentified_detained: i.unidentified_detained,
                unidentified_dispossessed: i.unidentified_dispossessed,
                
                killed: i.killed,
                adult_killed: i.adult_killed,
                child_killed: i.child_killed,
                
                maimed: i.maimed,
                adult_maimed: i.adult_maimed,
                child_maimed: i.child_maimed,
                
                injured: i.injured,
                adult_injured: i.adult_injured,
                child_injured: i.child_injured,
                
                detained: i.detained,
                adult_detained: i.adult_detained,
                child_detained: i.child_detained,
                
                dispossessed: i.dispossessed,
                adult_dispossessed: i.adult_dispossessed,
                child_dispossessed: i.child_dispossessed,

                /* Civil Infrastructure Loss */
                roads_and_streets_destroyed: i.roads_and_streets_destroyed,
                roads_and_streets_damaged: i.roads_and_streets_damaged,
                
                bridges_and_tunnels_destroyed: i.bridges_and_tunnels_destroyed,
                bridges_and_tunnels_damaged: i.bridges_and_tunnels_damaged,
                
                railways_destroyed: i.railways_destroyed,
                railways_damaged: i.railways_damaged,
                
                public_transit_stops_destroyed: i.public_transit_stops_destroyed,
                public_transit_stops_damaged: i.public_transit_stops_damaged,
                
                airports_destroyed: i.airports_destroyed,
                airports_damaged: i.airports_damaged,
                
                ports_and_harbors_destroyed: i.ports_and_harbors_destroyed,
                ports_and_harbors_damaged: i.ports_and_harbors_damaged,
                
                parking_facilities_destroyed: i.parking_facilities_destroyed,
                parking_facilities_damaged: i.parking_facilities_damaged,
                
                cycling_infrastructure_destroyed: i.cycling_infrastructure_destroyed,
                cycling_infrastructure_damaged: i.cycling_infrastructure_damaged,
                
                pedestrian_infrastructure_destroyed: i.pedestrian_infrastructure_destroyed,
                pedestrian_infrastructure_damaged: i.pedestrian_infrastructure_damaged,
                
                traffic_management_destroyed: i.traffic_management_destroyed,
                traffic_management_damaged: i.traffic_management_damaged,
                
                hospitals_destroyed: i.hospitals_destroyed,
                hospitals_damaged: i.hospitals_damaged,
                
                pharmacies_destroyed: i.pharmacies_destroyed,
                pharmacies_damaged: i.pharmacies_damaged,
                
                rehabilitation_centers_destroyed: i.rehabilitation_centers_destroyed,
                rehabilitation_centers_damaged: i.rehabilitation_centers_damaged,
                
                schools_destroyed: i.schools_destroyed,
                schools_damaged: i.schools_damaged,
                
                colleges_and_universities_destroyed: i.colleges_and_universities_destroyed,
                colleges_and_universities_damaged: i.colleges_and_universities_damaged,
                
                libraries_destroyed: i.libraries_destroyed,
                libraries_damaged: i.libraries_damaged,
                
                police_stations_destroyed: i.police_stations_destroyed,
                police_stations_damaged: i.police_stations_damaged,
                
                fire_stations_destroyed: i.fire_stations_destroyed,
                fire_stations_damaged: i.fire_stations_damaged,
                
                emergency_response_centers_destroyed: i.emergency_response_centers_destroyed,
                emergency_response_centers_damaged: i.emergency_response_centers_damaged,
                
                water_supply_destroyed: i.water_supply_destroyed,
                water_supply_damaged: i.water_supply_damaged,
                
                sewage_and_waste_management_destroyed: i.sewage_and_waste_management_destroyed,
                sewage_and_waste_management_damaged: i.sewage_and_waste_management_damaged,
                
                electricity_destroyed: i.electricity_destroyed,
                electricity_damaged: i.electricity_damaged,
                
                natural_gas_destroyed: i.natural_gas_destroyed,
                natural_gas_damaged: i.natural_gas_damaged,
                
                government_buildings_destroyed: i.government_buildings_destroyed,
                government_buildings_damaged: i.government_buildings_damaged,
                
                community_centers_destroyed: i.community_centers_destroyed,
                community_centers_damaged: i.community_centers_damaged,
                
                post_offices_destroyed: i.post_offices_destroyed,
                post_offices_damaged: i.post_offices_damaged,
                
                cell_towers_destroyed: i.cell_towers_destroyed,
                cell_towers_damaged: i.cell_towers_damaged,
                
                internet_infrastructure_destroyed: i.internet_infrastructure_destroyed,
                internet_infrastructure_damaged: i.internet_infrastructure_damaged,
                
                broadcasting_destroyed: i.broadcasting_destroyed,
                broadcasting_damaged: i.broadcasting_damaged,
                
                shopping_centers_destroyed: i.shopping_centers_destroyed,
                shopping_centers_damaged: i.shopping_centers_damaged,
                
                restaurants_and_eateries_destroyed: i.restaurants_and_eateries_destroyed,
                restaurants_and_eateries_damaged: i.restaurants_and_eateries_damaged,
                
                entertainment_venues_destroyed: i.entertainment_venues_destroyed,
                entertainment_venues_damaged: i.entertainment_venues_damaged,
                
                parks_and_recreational_areas_destroyed: i.parks_and_recreational_areas_destroyed,
                parks_and_recreational_areas_damaged: i.parks_and_recreational_areas_damaged,
                
                tourist_attractions_destroyed: i.tourist_attractions_destroyed,
                tourist_attractions_damaged: i.tourist_attractions_damaged,
                
                places_of_worship_destroyed: i.places_of_worship_destroyed,
                places_of_worship_damaged: i.places_of_worship_damaged,
                
                cultural_centers_destroyed: i.cultural_centers_destroyed,
                cultural_centers_damaged: i.cultural_centers_damaged,
                
                housing_destroyed: i.housing_destroyed,
                housing_damaged: i.housing_damaged,
                
                residential_communities_destroyed: i.residential_communities_destroyed,
                residential_communities_damaged: i.residential_communities_damaged,
                
                hotels_and_lodging_destroyed: i.hotels_and_lodging_destroyed,
                hotels_and_lodging_damaged: i.hotels_and_lodging_damaged,
                
                green_spaces_destroyed: i.green_spaces_destroyed,
                green_spaces_damaged: i.green_spaces_damaged,
                
                environmental_conservation_areas_destroyed: i.environmental_conservation_areas_destroyed,
                environmental_conservation_areas_damaged: i.environmental_conservation_areas_damaged,                
            }
            return incident;
        })
        // console.log(result.data.data.result);
        // return result.data.data.result.map((incidentWithContext:any)=>{
        //     console.log(incidentWithContext)
        //     return {
        //         position: {
        //             lat: incidentWithContext?.incident?.location?.[0]?.x,
        //             lng: incidentWithContext?.incident?.location?.[0]?.y
        //         }
        //     }
        // });
    }
}