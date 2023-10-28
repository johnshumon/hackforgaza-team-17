import { ZodObject, z } from "zod";
import { AuditStatus, MaybeEmptyText, NonEmptyText, Tags } from "../common";

export function defineEntity<
    TLabel extends string,
    A extends z.ZodRawShape,
    B extends z.UnknownKeysParam,
    C extends z.ZodTypeAny,
    D extends { [x: string]: any; }
>(label: TLabel, schema: ZodObject<A, B, C, D, D>) {
    const entityProps = z.object({
        // description about obj
        description: MaybeEmptyText,

        // audit status of obj
        audit_status: AuditStatus,

        // for grouping obj
        tags: Tags,    
    });

    return z.object({
        // unique id of obj
        id: NonEmptyText,
    
        labels: z.tuple([
            z.literal(label)
        ]),
    
        properties: entityProps.merge(schema)
    });
}



