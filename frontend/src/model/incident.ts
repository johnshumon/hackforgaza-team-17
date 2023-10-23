

export type Incident = {
    id: string,
    title: string,
    description: string,
    categories: string[],
    status: string,
    location: {
        lat: number,
        lng: number,
    },
    dateTime: Date,
    tags: string[]
    
    /* Human Loss */
    adult_male_killed: number | undefined,
    adult_male_maimed: number | undefined,
    adult_male_injured: number | undefined,
    adult_male_detained: number | undefined,
    adult_male_dispossessed: number | undefined,
    
    adult_female_killed: number | undefined,
    adult_female_maimed: number | undefined,
    adult_female_injured: number | undefined,
    adult_female_detained: number | undefined,
    adult_female_dispossessed: number | undefined,
    
    adult_ungendered_killed: number | undefined,
    adult_ungendered_maimed: number | undefined,
    adult_ungendered_injured: number | undefined,
    adult_ungendered_detained: number | undefined,
    adult_ungendered_dispossessed: number | undefined,
    
    child_male_killed: number | undefined,
    child_male_maimed: number | undefined,
    child_male_injured: number | undefined,
    child_male_detained: number | undefined,
    child_male_dispossessed: number | undefined,
    
    child_female_killed: number | undefined,
    child_female_maimed: number | undefined,
    child_female_injured: number | undefined,
    child_female_detained: number | undefined,
    child_female_dispossessed: number | undefined,
    
    child_ungendered_killed: number | undefined,
    child_ungendered_maimed: number | undefined,
    child_ungendered_injured: number | undefined,
    child_ungendered_detained: number | undefined,
    child_ungendered_dispossessed: number | undefined,
    
    unidentified_killed: number | undefined,
    unidentified_maimed: number | undefined,
    unidentified_injured: number | undefined,
    unidentified_detained: number | undefined,
    unidentified_dispossessed: number | undefined,    

    killed: number,
    adult_killed: number,
    child_killed: number,

    maimed: number,
    adult_maimed: number,
    child_maimed: number,

    injured: number,
    adult_injured: number,
    child_injured: number,

    detained: number,
    adult_detained: number,
    child_detained: number,

    dispossessed: number,
    adult_dispossessed: number,
    child_dispossessed: number,

    /* Civil Infrastructure Loss */
    roads_and_streets_destroyed: number | undefined,
    roads_and_streets_damaged: number | undefined,

    bridges_and_tunnels_destroyed: number | undefined,
    bridges_and_tunnels_damaged: number | undefined,

    railways_destroyed: number | undefined,
    railways_damaged: number | undefined,

    public_transit_stops_destroyed: number | undefined,
    public_transit_stops_damaged: number | undefined,

    airports_destroyed: number | undefined,
    airports_damaged: number | undefined,

    ports_and_harbors_destroyed: number | undefined,
    ports_and_harbors_damaged: number | undefined,

    parking_facilities_destroyed: number | undefined,
    parking_facilities_damaged: number | undefined,

    cycling_infrastructure_destroyed: number | undefined,
    cycling_infrastructure_damaged: number | undefined,

    pedestrian_infrastructure_destroyed: number | undefined,
    pedestrian_infrastructure_damaged: number | undefined,

    traffic_management_destroyed: number | undefined,
    traffic_management_damaged: number | undefined,

    hospitals_destroyed: number | undefined,
    hospitals_damaged: number | undefined,

    pharmacies_destroyed: number | undefined,
    pharmacies_damaged: number | undefined,

    rehabilitation_centers_destroyed: number | undefined,
    rehabilitation_centers_damaged: number | undefined,

    schools_destroyed: number | undefined,
    schools_damaged: number | undefined,

    colleges_and_universities_destroyed: number | undefined,
    colleges_and_universities_damaged: number | undefined,

    libraries_destroyed: number | undefined,
    libraries_damaged: number | undefined,

    police_stations_destroyed: number | undefined,
    police_stations_damaged: number | undefined,

    fire_stations_destroyed: number | undefined,
    fire_stations_damaged: number | undefined,

    emergency_response_centers_destroyed: number | undefined,
    emergency_response_centers_damaged: number | undefined,

    water_supply_destroyed: number | undefined,
    water_supply_damaged: number | undefined,

    sewage_and_waste_management_destroyed: number | undefined,
    sewage_and_waste_management_damaged: number | undefined,

    electricity_destroyed: number | undefined,
    electricity_damaged: number | undefined,

    natural_gas_destroyed: number | undefined,
    natural_gas_damaged: number | undefined,

    government_buildings_destroyed: number | undefined,
    government_buildings_damaged: number | undefined,

    community_centers_destroyed: number | undefined,
    community_centers_damaged: number | undefined,

    post_offices_destroyed: number | undefined,
    post_offices_damaged: number | undefined,

    cell_towers_destroyed: number | undefined,
    cell_towers_damaged: number | undefined,

    internet_infrastructure_destroyed: number | undefined,
    internet_infrastructure_damaged: number | undefined,

    broadcasting_destroyed: number | undefined,
    broadcasting_damaged: number | undefined,

    shopping_centers_destroyed: number | undefined,
    shopping_centers_damaged: number | undefined,

    restaurants_and_eateries_destroyed: number | undefined,
    restaurants_and_eateries_damaged: number | undefined,

    entertainment_venues_destroyed: number | undefined,
    entertainment_venues_damaged: number | undefined,

    parks_and_recreational_areas_destroyed: number | undefined,
    parks_and_recreational_areas_damaged: number | undefined,

    tourist_attractions_destroyed: number | undefined,
    tourist_attractions_damaged: number | undefined,

    places_of_worship_destroyed: number | undefined,
    places_of_worship_damaged: number | undefined,

    cultural_centers_destroyed: number | undefined,
    cultural_centers_damaged: number | undefined,

    housing_destroyed: number | undefined,
    housing_damaged: number | undefined,

    residential_communities_destroyed: number | undefined,
    residential_communities_damaged: number | undefined,

    hotels_and_lodging_destroyed: number | undefined,
    hotels_and_lodging_damaged: number | undefined,

    green_spaces_destroyed: number | undefined,
    green_spaces_damaged: number | undefined,

    environmental_conservation_areas_destroyed: number | undefined,
    environmental_conservation_areas_damaged: number | undefined,    
}