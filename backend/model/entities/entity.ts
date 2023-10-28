import { z } from "zod";
import { AuditStatus, MaybeEmptyText, NonEmptyText, Tags } from "../common";

export const entity = z.object({
    // unique id of obj
    id: NonEmptyText,

    // description about obj
    description: MaybeEmptyText,

    // audit status of obj
    audit_status: AuditStatus,

    // for grouping obj
    tags: Tags,    
});
