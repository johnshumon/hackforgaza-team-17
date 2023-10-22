import { z } from "zod";
import { GeoCoordinateArray } from "./geocoordinate";

export const IncidentCategory = z.union([
    z.literal('verbal aggression'),
    z.literal('detention'),
    z.literal('assault'),
    z.literal('torture'),
    z.literal('firearm assault'),
    z.literal('missile strike'),
    z.literal('bombing'),
    z.literal('white phosphorus'),
    z.literal('depleted uranium'),
    z.literal('dispossession'),
]);

export const Incident = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    dateTime: z.string().datetime(),
    location: GeoCoordinateArray,
    categories: IncidentCategory.array(),
    description: z.string(),
    tags: z.string().array()
});

export type Incident = z.infer<typeof Incident>;
export type IncidentCategory = z.infer<typeof IncidentCategory>;

export const incidentCategories : IncidentCategory[] = [
    'verbal aggression',
    'detention',
    'assault',
    'torture',
    'firearm assault',
    'missile strike',
    'bombing',
    'white phosphorus',
    'depleted uranium',
    'dispossession',    
]