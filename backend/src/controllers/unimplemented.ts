import { z } from "zod";
import { NOT_IMPLEMENTED_RESPONSE, makeRouteHandler } from "../framework";

export default makeRouteHandler({
    description: "Unimplemented endpoint.",
    request: z.object({}),
    response: z.object({}),
    async handler() {
        return NOT_IMPLEMENTED_RESPONSE("This endpoint has not been implemented.")
    },
})