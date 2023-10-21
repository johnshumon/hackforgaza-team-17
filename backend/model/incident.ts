import { z } from "zod";

export const GeoCoordinate = z.object({
    srid: z.literal("4326"),
    x: z.string(),
    y: z.string()
});

export const GeoCoordinates = GeoCoordinate.array();

export const Incident = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    dateTime: z.string().datetime(),
    // location: GeoCoordinates,
    description: z.string(),
    tags: z.string().array()
});

export type Incident = z.infer<typeof Incident>;