import { z } from "zod";
import { BAD_REQUEST_RESPONSE, SUCCESS_RESPONSE, makeRouteHandler } from "../framework";
import { ContextInfo } from "../../data/context/context-info";
import contextMap from "../../data/context";

export default makeRouteHandler({
    description: "Get genocide context.",
    request: z.object({}),
    response: z.object({
        contextInfo: ContextInfo
    }),
    async handler(request, params, query) {
        if (!params.contextId) {
            return BAD_REQUEST_RESPONSE("A context is required.");
        }
        const context = contextMap?.[params.contextId];
        if (!context) {
            return BAD_REQUEST_RESPONSE("Context does not exist: " + params.contextId);
        }

        const responseData = {
            contextInfo: context.info
        };
        return SUCCESS_RESPONSE("Context found.", responseData);         
    }
});