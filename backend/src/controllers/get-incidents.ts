import { z } from "zod";
import { makeRouteHandler, NOT_FOUND_RESPONSE, SUCCESS_RESPONSE, NOT_IMPLEMENTED_RESPONSE } from "../framework";
import { Incident } from "../../model/incident"
import genocideContexts from "../data/genocide-contexts";

export const GetIncidentsResponse = z.object({
    incidents: Incident.array()
});

export const IncidentsQuery = z.object({
    // ids: z.string().array().optional(),
    from: z.string().datetime().optional(),
    to: z.string().datetime().optional(),
});
export type IncidentsQuery = z.infer<typeof IncidentsQuery>;

export type IncidentsQueryHandler = (query: IncidentsQuery) => Incident[];

export default makeRouteHandler({
    description: "Query incidents related to a genocide context.",
    request: z.object({}),
    response: GetIncidentsResponse,
    query: z.object({
        "random-data": z.literal("true").optional()
    }).merge(IncidentsQuery),

    async handler(request, params, query) {
        const genocideContext = genocideContexts.find((gc)=>gc.slug === params.context);
        if (!genocideContext) {
            return NOT_FOUND_RESPONSE(`Given context does not exist: '${params.context}'`);
        }
        if (query?.["random-data"] && genocideContext.test) {
            const result = genocideContext.test.incidentsQueryHandler(query);
            return SUCCESS_RESPONSE(
                `Random incidents generated for given context: '${params.context}'`,
                {
                    incidents: result
                } 
            );
        } else if (query?.["random-data"] && !genocideContext.test) {
            return NOT_IMPLEMENTED_RESPONSE("Querying fake data has not been implemented yet! Please try without 'random-data=true' query.")
        } else {
            return NOT_IMPLEMENTED_RESPONSE("Querying real data has not been implemented yet! Please try query: 'random-data=true'");
        }
    }
})

// async function getIncidentsFromDatabase() : Promise<GetIncidentResult> {
//     // 1. fetch data from database
//     const graph = await neo4j.queryGraph({
//         type: "read",
//         text: `match (n:incident) return n`
//     });
//     const rawIncidents = graph.nodes.map((n)=>({
//         id: n.id,
//         title: n.properties.title,
//         dateTime: n.properties.dateTime,
//         location: n.properties.location,
//         description: n.properties.description,
//         tags: n.properties.tags
//     }));
//     // 2. parse fetched data
//     // - parse incidents
//     const parseResult = Incident.array().safeParse(rawIncidents);
//     if (!parseResult.success) {
//         return [];
//     }
//     const parsedIncidents = parseResult.data;
//     // 3. transform fetched data for result
//     const aggregateResult = parsedIncidents.map((i)=>{
//         const result : IncidentWithContext = {
//             incident: i,
//             victims: {
//                 killed: 0,
//                 maimed: 0,
//                 injured: 0,
//                 detained: 0,
//                 dispossessed: 0
//             }
//         }
//         return result
//     });
//     return aggregateResult;