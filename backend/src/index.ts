import { startNewServer } from "./framework";
import pkg from "../package.json";
import getIncidents from "./controllers/get-incidents";
import getContextInfo from "./controllers/get-context-info";

startNewServer({
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    routes: [
        {
            path: "/incidents/:contextId",
            method: "GET",
            handler: getIncidents
        },
        {
            path: "/context-info/:contextId",
            method: "GET",
            handler: getContextInfo
        }
    ]
}, 3000);