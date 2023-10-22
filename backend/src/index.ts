import { startNewServer } from "./framework";
import pkg from "../package.json";
import { getIncidents } from "./controllers/incidents";


startNewServer({
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    routes: [
        {
            path: "/incidents",
            method: "GET",
            handler: getIncidents
        }
    ]
}, 3000);