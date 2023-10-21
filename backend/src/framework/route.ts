import { UnknownKeysParam, ZodRawShape, ZodTypeAny } from "zod";
import { JsonRestApiRouteHandler } from "./route-handler";

export type JsonRestApiRoute<
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
> = {
    method: string,
    path: string,
    handler: JsonRestApiRouteHandler<A, B, C, D, F, G, H, I, J, K, L, M>
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonRestApiRouteAny<TReq = any, TRes = any, TQry = any> = JsonRestApiRoute<ZodRawShape, UnknownKeysParam, ZodTypeAny, TReq, ZodRawShape, UnknownKeysParam, ZodTypeAny, TRes, ZodRawShape, UnknownKeysParam, ZodTypeAny, TQry>;
