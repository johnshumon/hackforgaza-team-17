import { z } from "zod";
import { makeRouteHandler, INTERNAL_SERVER_ERROR_RESPONSE } from "../framework";
import neo4j from "../libs/neo4j";
import { Incident } from "../../model/incident";

const IncidentResult = z.object({
    incident: Incident,
    victims: z.object({
        killed: z.number().int().gte(0),
        maimed: z.number().int().gte(0),
        injured: z.number().int().gte(0),
        detained: z.number().int().gte(0),
        dispossessed: z.number().int().gte(0),
    })
});
type IncidentResult = z.infer<typeof IncidentResult>;

export const getIncidents = makeRouteHandler({
    description: "List incidents.",
    request: z.object({}),
    response: z.object({
        result: IncidentResult.array()
    }),
    query: z.object({
        limit: z.coerce.number().int().gt(0).optional(),
        page: z.coerce.number().int().gte(0).optional(),
    }),
    async handler(request, params, query) {
        // 1. fetch data from database
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
        // 2. parse fetched data
        // - parse incidents
        const parseResult = Incident.array().safeParse(rawIncidents);
        if (!parseResult.success) {
            return INTERNAL_SERVER_ERROR_RESPONSE("Failed to parse incident.");
        }
        const parsedIncidents = parseResult.data;
        // 3. transform fetched data for result
        const aggregateResult = parsedIncidents.map((i)=>{
            const result : IncidentResult = {
                incident: i
            }
            return result
        });
        // 4. return response
        return {
            status: 200,
            userFriendlyMessage: parsedIncidents.length > 0 ? "Incidents found." : "No incidents found.",
            data: {
                result: aggregateResult
            }
        }        
    },
})