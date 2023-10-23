import { z } from "zod";

// this represents a 2-dimensional WGS84 geocoordinate
export const GeoCoordinate = z.object({
    srid: z.literal(4326),
    x: z.number(),
    y: z.number()
});

export type GeoCoordinate = z.infer<typeof GeoCoordinate>;