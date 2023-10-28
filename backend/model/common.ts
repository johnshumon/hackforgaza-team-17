import { z } from "zod";

export const NonEmptyText = z.string().min(1);
export const MaybeEmptyText = z.string();

export const Count = z.number().int().gte(0);

export const AuditStatus = z.union([
    z.literal("unaudited"),
    z.literal("audited:verified"),
    z.literal("audited:unreliable"),
    z.literal("audited:fake")
])

export const Tags = NonEmptyText.array();

export const Date = z.string().regex(/(^[0-9]{4}-[0-9]{2}-[0-9]{2}$)/); // yyyy-mm-dd

export const Boolean = z.boolean();

export const Unknown = z.null();
