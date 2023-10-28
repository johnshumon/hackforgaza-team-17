import { z } from "zod";
import { NonEmptyText } from "../common";

export function defineRelationship<TLabel extends string>(label: TLabel) {
    return z.object({
        id: NonEmptyText,
        label: z.literal(label),
        properties: z.object({}),
        source: z.string(),
        target: z.string()
    });
}