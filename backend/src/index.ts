import { startNewServer } from "./framework";
import pkg from "../package.json";
import unimplemented from "./controllers/unimplemented";

startNewServer({
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    routes: [
        {
            path: "/incidents/:contextId",
            method: "GET",
            handler: unimplemented
        },
        {
            path: "/context-info/:contextId",
            method: "GET",
            handler: unimplemented
        }
    ]
}, 3000);