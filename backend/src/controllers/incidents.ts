import { z } from "zod";
import { makeRouteHandler } from "../framework";
import neo4j from "../libs/neo4j";
import { Incident } from "../../model/incident";
import { generateRandomIncidents } from "./random-generators/incidents-palestine";

export const IncidentWithContext = z.object({
    incident: Incident,
    victims: z.object({
        killed: z.number().int().gte(0),
        maimed: z.number().int().gte(0),
        injured: z.number().int().gte(0),
        detained: z.number().int().gte(0),
        dispossessed: z.number().int().gte(0),
    })
});
export type IncidentWithContext = z.infer<typeof IncidentWithContext>;

export const GetIncidentResult = IncidentWithContext.array();
export type GetIncidentResult = z.infer<typeof GetIncidentResult>;

async function getIncidentsFromDatabase() : Promise<GetIncidentResult> {
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
        return [];
    }
    const parsedIncidents = parseResult.data;
    // 3. transform fetched data for result
    const aggregateResult = parsedIncidents.map((i)=>{
        const result : IncidentWithContext = {
            incident: i,
            victims: {
                killed: 0,
                maimed: 0,
                injured: 0,
                detained: 0,
                dispossessed: 0
            }
        }
        return result
    });
    return aggregateResult;
} 

export const getIncidents = makeRouteHandler({
    description: "List incidents.",
    request: z.object({}),
    response: z.object({
        result: GetIncidentResult
    }),
    query: z.object({
        random: z.coerce.number().int().gt(0).optional(),
        limit: z.coerce.number().int().gt(0).optional(),
        page: z.coerce.number().int().gte(0).optional(),
    }),
    async handler(request, params, query) {
        let incidents : GetIncidentResult = [];
        if (query?.random) {
            incidents = generateRandomIncidents(query.random);
        } else {
            incidents = await getIncidentsFromDatabase();
        }

        return {
            status: 200,
            userFriendlyMessage: incidents.length > 0 ? "Incidents found." : "No incidents found.",
            data: {
                result: incidents
            }
        }
    }
})