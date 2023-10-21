import { startNewServer } from "./framework";
import pkg from "../package.json";
import { JsonRestApiRouteHandler } from "./framework/route-handler";
import {z} from "zod";
import { request, response } from "express";
import { Incident } from "../model/incident";
import neo4j from "./libs/neo4j";
import { INTERNAL_SERVER_ERROR_RESPONSE } from "./framework/response";

const getIncidents = new JsonRestApiRouteHandler({
    description: "Lists all incidents.",
    request: z.object({}),
    response: z.object({
        result: Incident.array()
    }),
    async handler(request, params){
        // 1. fetch data from databse
        const graph = await neo4j.queryGraph({
            type: "read",
            text: "MATCH (n:incident) RETURN n;"
        });
        const rawIncidents = graph.nodes.map((n)=>({
            id: n.id,
            title: n.properties.title,
            dateTime: n.properties.dateTime,
            location: n.properties.location,
            description: n.properties.description,
            tags: n.properties.tags
        }));
        // 2. parse
        const parseResult = Incident.array().safeParse(rawIncidents);
        if (!parseResult.success) {
            return INTERNAL_SERVER_ERROR_RESPONSE("");
        }
        const parsedIncidents = parseResult.data;
        // 3. 
        return {
            status: 200,
            userFriendlyMessage: parsedIncidents.length > 0 ? "Incidents found." : "No incidents found.",
            data: {
                result: parsedIncidents
            }
        }
    }
})

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