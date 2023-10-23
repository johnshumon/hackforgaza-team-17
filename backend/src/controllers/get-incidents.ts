import { z } from "zod";
import { makeRouteHandler, NOT_FOUND_RESPONSE, SUCCESS_RESPONSE, NOT_IMPLEMENTED_RESPONSE } from "../framework";
import { Incident } from "../../model/incident"
import genocideContexts from "../data/genocide-contexts";

const GetIncidentsResponse = z.object({
    incidents: Incident.merge(z.object({
        killed: z.number().int().gte(0),
        adult_killed: z.number().int().gte(0),
        child_killed: z.number().int().gte(0),

        maimed: z.number().int().gte(0),
        adult_maimed: z.number().int().gte(0),
        child_maimed: z.number().int().gte(0),

        injured: z.number().int().gte(0),
        adult_injured: z.number().int().gte(0),
        child_injured: z.number().int().gte(0),

        detained: z.number().int().gte(0),
        adult_detained: z.number().int().gte(0),
        child_detained: z.number().int().gte(0),

        dispossessed: z.number().int().gte(0),
        adult_dispossessed: z.number().int().gte(0),
        child_dispossessed: z.number().int().gte(0),
    })).array()
});
type GetIncidentsResponse = z.infer<typeof GetIncidentsResponse>;

const IncidentsQuery = z.object({
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
            const responseData : GetIncidentsResponse = {
                incidents: result.map((r)=>({
                    ...r,
                    killed: (r.adult_male_killed ?? 0) + (r.child_male_killed ?? 0) + (r.adult_female_killed ?? 0) + (r.child_female_killed ?? 0) + (r.unidentified_killed ?? 0) + (r.adult_ungendered_killed ?? 0) + (r.child_ungendered_killed ?? 0),
                    adult_killed: (r.adult_male_killed ?? 0) + (r.adult_female_killed ?? 0) + (r.adult_ungendered_killed ?? 0),
                    child_killed: (r.child_male_killed ?? 0) + (r.child_female_killed ?? 0) + (r.child_ungendered_killed ?? 0),

                    maimed: (r.adult_male_maimed ?? 0) + (r.child_male_maimed ?? 0) + (r.adult_female_maimed ?? 0) + (r.child_female_maimed ?? 0) + (r.unidentified_maimed ?? 0) + (r.adult_ungendered_maimed ?? 0) + (r.child_ungendered_maimed ?? 0),
                    adult_maimed: (r.adult_male_maimed ?? 0) + (r.adult_female_maimed ?? 0) + (r.adult_ungendered_maimed ?? 0),
                    child_maimed: (r.child_male_maimed ?? 0) + (r.child_female_maimed ?? 0) + (r.child_ungendered_maimed ?? 0),

                    injured: (r.adult_male_injured ?? 0) + (r.child_male_injured ?? 0) + (r.adult_female_injured ?? 0) + (r.child_female_injured ?? 0) + (r.unidentified_injured ?? 0) + (r.adult_ungendered_injured ?? 0) + (r.child_ungendered_injured ?? 0),
                    adult_injured: (r.adult_male_injured ?? 0) + (r.adult_female_injured ?? 0) + (r.adult_ungendered_injured ?? 0),
                    child_injured: (r.child_male_injured ?? 0) + (r.child_female_injured ?? 0) + (r.child_ungendered_injured ?? 0),

                    detained: (r.adult_male_detained ?? 0) + (r.child_male_detained ?? 0) + (r.adult_female_detained ?? 0) + (r.child_female_detained ?? 0) + (r.unidentified_detained ?? 0) + (r.adult_ungendered_detained ?? 0) + (r.child_ungendered_detained ?? 0),
                    adult_detained: (r.adult_male_detained ?? 0) + (r.adult_female_detained ?? 0) + (r.adult_ungendered_detained ?? 0),
                    child_detained: (r.child_male_detained ?? 0) + (r.child_female_detained ?? 0) + (r.child_ungendered_detained ?? 0),                    

                    dispossessed: (r.adult_male_dispossessed ?? 0) + (r.child_male_dispossessed ?? 0) + (r.adult_female_dispossessed ?? 0) + (r.child_female_dispossessed ?? 0) + (r.unidentified_dispossessed ?? 0) + (r.adult_ungendered_dispossessed ?? 0) + (r.child_ungendered_dispossessed ?? 0),
                    adult_dispossessed: (r.adult_male_dispossessed ?? 0) + (r.adult_female_dispossessed ?? 0) + (r.adult_ungendered_dispossessed ?? 0),
                    child_dispossessed: (r.child_male_dispossessed ?? 0) + (r.child_female_dispossessed ?? 0) + (r.child_ungendered_dispossessed ?? 0),                    
                }))
            }
            return SUCCESS_RESPONSE(
                `Random incidents generated for given context: '${params.context}'`,
                responseData
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