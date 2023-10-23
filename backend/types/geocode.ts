export type Geocode = {
    lat: number,
    lng: number
}

export type NamedLocation = {
    name: string,
    geocode: Geocode
}