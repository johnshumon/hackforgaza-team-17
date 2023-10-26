import { z } from "zod";
import { BAD_REQUEST_RESPONSE, SUCCESS_RESPONSE, makeRouteHandler } from "../framework";
import getContextInfoByContextId from "../data/get-context-info-by-context-id";
import { ContextInfo } from "../../model/context-info";


export default makeRouteHandler({
    description: "Get genocide context.",
    request: z.object({}),
    response: z.object({
        contextInfo: ContextInfo
    }),
    async handler(request, params) {
        if (!params.contextId) {
            return BAD_REQUEST_RESPONSE(`Given context does not exist: '${params.contextId}'`);
        }
        const RouteParams = z.object({
            contextId: z.string().uuid()
        });
        if (!RouteParams.safeParse(params).success) {
            return BAD_REQUEST_RESPONSE(`Given context is invalid: '${params.contextId}'`);
        }
        
        const responseData = {
            contextInfo: await getContextInfoByContextId(params.contextId)
        };
        return SUCCESS_RESPONSE("Context found.", responseData);
    }
});
