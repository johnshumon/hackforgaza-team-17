import { z } from "zod";

export const NonEmptyText = z.string().min(1);
export const MaybeEmptyText = z.string();
export const Count = z.number().int().gte(0);
export const AuditStatus = z.union([
    z.literal("Audited:Verified"),
    z.literal("Audited:Unreliable"),
    z.literal("Audited:Fake"),
]).nullable();
export const Tags = NonEmptyText.array();
export const DateTime = z.string().datetime();
export const Geocode = z.object({
    latitude: z.number(),
    longitude: z.number()
});
export const NamedLocation = z.object({
    name: NonEmptyText,
    geocode: Geocode
});
