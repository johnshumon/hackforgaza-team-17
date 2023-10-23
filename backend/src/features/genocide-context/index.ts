import { IncidentsQueryHandler } from "../../controllers/get-incidents"

export type GenocideContext = {
    slug: string,
    people: string,
    map: {
        defaultPosition: {
            centre: {
                lat: number,
                lng: number,
            },
            zoom: number
        }
    },    
    test?: {
        incidentsQueryHandler: IncidentsQueryHandler 
    }
}

