import { z } from "zod";
import { NonEmptyText, Unknown } from "../common";
import { entity } from "./entity";

const LocationType = z.union([
    z.literal("village"),
    z.literal("town"),
    z.literal("city"),
    z.literal("refugee camp"),

    z.literal("settler colony"),
    z.literal("foreign military base"),

    Unknown
]);

const Latitude = z.union([
    z.number().gte(-90).lte(90),
    Unknown
]);

const Longitude = z.union([
    z.number().gte(-180).lte(180),
    Unknown
]);

export const Location = entity.merge(z.object({
    // location name
    name: NonEmptyText,
    // location type (optional, default is unknown)
    type: LocationType,
    // geocode
    latitude: Latitude,
    longitude: Longitude
}));

export type Location = z.infer<typeof Location>;
