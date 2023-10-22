import { z } from "zod";

// this represents a 2-dimensional WGS84 geocoordinate
export const GeoCoordinate = z.object({
    srid: z.literal(4326),
    x: z.number(),
    y: z.number()
});

export const GeoCoordinates = GeoCoordinate.array();

export const Incident = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    dateTime: z.string().datetime(),
    location: GeoCoordinates,
    description: z.string(),
    tags: z.string().array()
});

export type Incident = z.infer<typeof Incident>;