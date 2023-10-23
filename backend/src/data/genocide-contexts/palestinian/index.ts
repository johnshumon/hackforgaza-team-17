import { GenocideContext } from "../../../features/genocide-context";
import { randomIncidentsQueryHandler } from "./random-incidents";

const palestinianGenocideContext : GenocideContext = {
    slug: "palestinian",
    people: "Palestinian",
    map: {
        defaultPosition: {
            centre: {
                lat: 31.320443,
                lng: 35.109374
            },
            zoom: 7
        }
    },
    test: {
        incidentsQueryHandler: randomIncidentsQueryHandler
    }
}

export default palestinianGenocideContext;