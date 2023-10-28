import { z } from "zod";
import { Count, Date, MaybeEmptyText, NonEmptyText, Unknown } from "../common";
import { defineEntity } from "./entity";
import { IncidentCategories } from "../incident-category";

const Perpetrators = z.union([
    NonEmptyText.array().min(1),
    Unknown
]);

export const Incident = defineEntity(
    "Incident",
    z.object({
        // incident title and categories (optional)
        title: MaybeEmptyText,              // default: ""
        categories: IncidentCategories,     // default: unknown
        perpetrators: Perpetrators,         // default: unknown

        // date of incident
        date: Date,

        /* Human Loss */
        adult_male_killed: Count,
        adult_male_maimed: Count,
        adult_male_injured: Count,
        adult_male_detained: Count,
        adult_male_dispossessed: Count,
        
        adult_female_killed: Count,
        adult_female_maimed: Count,
        adult_female_injured: Count,
        adult_female_detained: Count,
        adult_female_dispossessed: Count,
        
        adult_ungendered_killed: Count,
        adult_ungendered_maimed: Count,
        adult_ungendered_injured: Count,
        adult_ungendered_detained: Count,
        adult_ungendered_dispossessed: Count,
        
        child_male_killed: Count,
        child_male_maimed: Count,
        child_male_injured: Count,
        child_male_detained: Count,
        child_male_dispossessed: Count,
        
        child_female_killed: Count,
        child_female_maimed: Count,
        child_female_injured: Count,
        child_female_detained: Count,
        child_female_dispossessed: Count,
        
        child_ungendered_killed: Count,
        child_ungendered_maimed: Count,
        child_ungendered_injured: Count,
        child_ungendered_detained: Count,
        child_ungendered_dispossessed: Count,
        
        unaged_male_killed: Count,
        unaged_male_maimed: Count,
        unaged_male_injured: Count,
        unaged_male_detained: Count,
        unaged_male_dispossessed: Count,

        unaged_female_killed: Count,
        unaged_female_maimed: Count,
        unaged_female_injured: Count,
        unaged_female_detained: Count,
        unaged_female_dispossessed: Count,

        unaged_ungendered_killed: Count,
        unaged_ungendered_maimed: Count,
        unaged_ungendered_injured: Count,
        unaged_ungendered_detained: Count,
        unaged_ungendered_dispossessed: Count,    

        /* Civil Infrastructure Loss */
        roads_and_streets_destroyed: Count,
        roads_and_streets_damaged: Count,

        bridges_and_tunnels_destroyed: Count,
        bridges_and_tunnels_damaged: Count,

        railways_destroyed: Count,
        railways_damaged: Count,

        public_transit_stops_destroyed: Count,
        public_transit_stops_damaged: Count,

        airports_destroyed: Count,
        airports_damaged: Count,

        ports_and_harbors_destroyed: Count,
        ports_and_harbors_damaged: Count,

        parking_facilities_destroyed: Count,
        parking_facilities_damaged: Count,

        cycling_infrastructure_destroyed: Count,
        cycling_infrastructure_damaged: Count,

        pedestrian_infrastructure_destroyed: Count,
        pedestrian_infrastructure_damaged: Count,

        traffic_management_destroyed: Count,
        traffic_management_damaged: Count,

        hospitals_destroyed: Count,
        hospitals_damaged: Count,

        pharmacies_destroyed: Count,
        pharmacies_damaged: Count,

        rehabilitation_centers_destroyed: Count,
        rehabilitation_centers_damaged: Count,

        schools_destroyed: Count,
        schools_damaged: Count,

        colleges_and_universities_destroyed: Count,
        colleges_and_universities_damaged: Count,

        libraries_destroyed: Count,
        libraries_damaged: Count,

        police_stations_destroyed: Count,
        police_stations_damaged: Count,

        fire_stations_destroyed: Count,
        fire_stations_damaged: Count,

        emergency_response_centers_destroyed: Count,
        emergency_response_centers_damaged: Count,

        water_supply_destroyed: Count,
        water_supply_damaged: Count,

        sewage_and_waste_management_destroyed: Count,
        sewage_and_waste_management_damaged: Count,

        electricity_destroyed: Count,
        electricity_damaged: Count,

        natural_gas_destroyed: Count,
        natural_gas_damaged: Count,

        government_buildings_destroyed: Count,
        government_buildings_damaged: Count,

        community_centers_destroyed: Count,
        community_centers_damaged: Count,

        post_offices_destroyed: Count,
        post_offices_damaged: Count,

        cell_towers_destroyed: Count,
        cell_towers_damaged: Count,

        internet_infrastructure_destroyed: Count,
        internet_infrastructure_damaged: Count,

        broadcasting_destroyed: Count,
        broadcasting_damaged: Count,

        shopping_centers_destroyed: Count,
        shopping_centers_damaged: Count,

        restaurants_and_eateries_destroyed: Count,
        restaurants_and_eateries_damaged: Count,

        entertainment_venues_destroyed: Count,
        entertainment_venues_damaged: Count,

        parks_and_recreational_areas_destroyed: Count,
        parks_and_recreational_areas_damaged: Count,

        tourist_attractions_destroyed: Count,
        tourist_attractions_damaged: Count,

        places_of_worship_destroyed: Count,
        places_of_worship_damaged: Count,

        cultural_centers_destroyed: Count,
        cultural_centers_damaged: Count,

        housing_destroyed: Count,
        housing_damaged: Count,

        residential_communities_destroyed: Count,
        residential_communities_damaged: Count,

        hotels_and_lodging_destroyed: Count,
        hotels_and_lodging_damaged: Count,

        green_spaces_destroyed: Count,
        green_spaces_damaged: Count,

        environmental_conservation_areas_destroyed: Count,
        environmental_conservation_areas_damaged: Count,
    })
);

export type Incident = z.infer<typeof Incident>;
