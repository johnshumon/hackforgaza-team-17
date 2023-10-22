import { z } from "zod";
import { makeRouteHandler, INTERNAL_SERVER_ERROR_RESPONSE } from "../framework";
import neo4j from "../libs/neo4j";
import { Incident } from "../../model/incident";

const IncidentResult = z.object({
    incident: Incident,
    testimonies:  
});

export const getIncidents = makeRouteHandler({
    description: "Lists all incidents.",
    request: z.object({}),
    response: z.object({
        result: Incident.array()
    }),
    query: z.object({
        limit: z.coerce.number().int().gt(0).optional(),
        page: z.coerce.number().int().gte(0).optional(),
    }),
    async handler(request, params, query) {
        // 1. build query
        
        // 2. fetch data from databse
        const graph = await neo4j.queryGraph({
            type: "read",
            text: `match (n:incident) return n`
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
            return INTERNAL_SERVER_ERROR_RESPONSE("Failed to parse result.");
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
    },
}) 