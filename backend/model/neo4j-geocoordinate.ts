import { z } from "zod";

// this represents a 2-dimensional WGS84 geocoordinate
export const Neo4jGeocode = z.object({
    srid: z.literal(4326),
    x: z.number(),
    y: z.number()
});

export type Neo4jGeocode = z.infer<typeof Neo4jGeocode>;
