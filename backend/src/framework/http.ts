export const httpRequestMethod = [
    "POST",
    "GET",
    "PUT",
    "PATCH",
    "DELETE"
];

export const httpResponseStatus = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORISED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501, 
    SERVICE_UNAVAILABLE: 503,
} as const;

type HttpResponseStatusName = keyof typeof httpResponseStatus;
export type HttpResponseStatusCode = typeof httpResponseStatus[HttpResponseStatusName];
