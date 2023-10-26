import { z } from "zod";
import { MaybeEmptyText, NonEmptyText } from "./common";

export const ContextInfo = z.object({
    id: NonEmptyText,
    publicId: NonEmptyText,
    people: MaybeEmptyText,

    map: z.object({
        defaultPosition: z.object({
            latitude: z.number().gte(-90).lte(90),
            longitude: z.number().gte(-180).lte(180)
        }).nullable(),
        defaultZoom: z.number().gte(0)
    })
});

export type ContextInfo = z.infer<typeof ContextInfo>;
