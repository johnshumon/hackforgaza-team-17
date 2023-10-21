import { UnknownKeysParam, ZodObject, ZodRawShape, ZodTypeAny } from "zod";
import express from "express";
import expressCore from "express-serve-static-core";
import { BAD_REQUEST_RESPONSE, JsonRestApiResponse, ResponseSchema, makeResponder } from "./response";

type Request = express.Request;
type Response = express.Response;
type RouteParameters = expressCore.ParamsDictionary;

export type QuerySchema<
    A extends ZodRawShape,
    B extends UnknownKeysParam,
    C extends ZodTypeAny,
    D,
> = ZodObject<A,B,C,D,D>;

export type RequestSchema<
    A extends ZodRawShape,
    B extends UnknownKeysParam,
    C extends ZodTypeAny,
    D,
> = ZodObject<A,B,C,D,D>;

/**
 * Describes the route in terms of;
 * - input (request schema)
 * - output (response schema),
 * - how to handle it (with middleware functs and handler funct)
 * 
 * @class JsonRestApiRoute
 */
export class JsonRestApiRouteHandler<
    A extends ZodRawShape,
    B extends UnknownKeysParam,
    C extends ZodTypeAny,
    D,
    F extends ZodRawShape,
    G extends UnknownKeysParam,
    H extends ZodTypeAny,
    I,
    J extends ZodRawShape,
    K extends UnknownKeysParam,
    L extends ZodTypeAny,
    M,
> {
    readonly description
    readonly requestDataSchema
    readonly responseDataSchema
    readonly querySchema
    readonly handler
    constructor(args: {
        description: string,
        request: RequestSchema<A,B,C,D>, 
        response: ResponseSchema<F,G,H,I>, 
        query?: QuerySchema<J,K,L,M>
        handler: (request: D, params: RouteParameters, query?: M) => Promise<JsonRestApiResponse<I>>
    }){
        this.description = args.description;
        this.requestDataSchema = args.request;
        this.responseDataSchema = args.response;
        this.querySchema = args.query;
        this.handler = args.handler;
    }
    async handle(request: Request, response: Response) {
        console.log(request.params);
        const rawRequest : Request | undefined = request;
        const responder = makeResponder<I|undefined>(response);
        // 1. parse request body
        const parseRequestBodyResult = this.requestDataSchema.safeParse(rawRequest.body);
        if (!parseRequestBodyResult.success) {
            return responder.respond(BAD_REQUEST_RESPONSE("Request does not match schema. Please see OPTIONS response."));
        }
        // 2. parse request query, but only if present in request
        let query : M | undefined;
        if (Object.keys(request.query).length > 0 && this.querySchema) {
            const parseRequestQueryResult = this.querySchema.safeParse(request.query);
            if (parseRequestQueryResult.success) {
                query = parseRequestQueryResult.data;
            } else {
                return responder.respond(BAD_REQUEST_RESPONSE("Query does not match schema. Please see OPTIONS response."));
            }
        } else if (Object.keys(request.query).length > 0 && !this.querySchema) {
            return responder.respond(BAD_REQUEST_RESPONSE("This route does not accept queries. Please see OPTIONS response."));
        }
        // run the handler
        const result = await this.handler(parseRequestBodyResult.data, request.params, query);
        // TODO: parse response here
        // produce response
        return responder.respond(result);
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonRestApiRouteHandlerAny<TReq = any, TRes = any, TQry = any> = JsonRestApiRouteHandler<ZodRawShape, UnknownKeysParam, ZodTypeAny, TReq, ZodRawShape, UnknownKeysParam, ZodTypeAny, TRes, ZodRawShape, UnknownKeysParam, ZodTypeAny, TQry>;

export function makeRouteHandler<
    A extends ZodRawShape,
    B extends UnknownKeysParam,
    C extends ZodTypeAny,
    D,
    F extends ZodRawShape,
    G extends UnknownKeysParam,
    H extends ZodTypeAny,
    I,
    J extends ZodRawShape,
    K extends UnknownKeysParam,
    L extends ZodTypeAny,
    M    
>(...args: ConstructorParameters<typeof JsonRestApiRouteHandler<A,B,C,D,F,G,H,I,J,K,L,M>>) {
    return new JsonRestApiRouteHandler(...args);
}
