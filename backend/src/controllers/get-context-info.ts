import { z } from "zod";
import { NOT_FOUND_RESPONSE, SUCCESS_RESPONSE, makeRouteHandler } from "../framework";
import genocideContexts from "../data/genocide-contexts";

const GetContextInfoResponse = z.object({
    slug: z.string().min(1),
    people: z.string().min(1),
    map: z.object({
        defaultPosition: z.object({
            centre: z.object({
                lat: z.number(),
                lng: z.number()
            }),
            zoom: z.number()
        })
    })
});

export default makeRouteHandler({
    description: "Get genocide context.",
    request: z.object({}),
    response: GetContextInfoResponse,
    async handler(request, params, query) {
        const genocideContext = genocideContexts.find((gc)=>gc.slug === params.context);
        if (!genocideContext) {
            return NOT_FOUND_RESPONSE(`Given context does not exist: '${params.context}'`);
        }
        const responseData = GetContextInfoResponse.parse({
            slug: genocideContext.slug,
            people: genocideContext.people,
            map: genocideContext.map
        })
        return SUCCESS_RESPONSE("Context found.", responseData);
    }
})