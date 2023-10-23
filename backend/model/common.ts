import { z } from "zod";

export const NonEmptyText = z.string().min(1);
export const MaybeEmptyText = z.string();
export const Count = z.number().int().gte(0);
export const AuditStatus = z.union([
    z.literal("audited"),
    z.literal("unaudited"),
]);
export const Tags = NonEmptyText.array();
export const DateTime = z.string().datetime();