import { z } from "zod";
import { NonEmptyText } from "../../model/common";

export const ContextInfo = z.object({
    people: NonEmptyText,
    map: z.object({
        defaultPosition: z.object({
            latitude: z.number().gte(-90).lte(90),
            longitude: z.number().gte(-180).lte(180)
        }),
        defaultZoom: z.number().gte(0)
    })
});

export type ContextInfo = z.infer<typeof ContextInfo>;
