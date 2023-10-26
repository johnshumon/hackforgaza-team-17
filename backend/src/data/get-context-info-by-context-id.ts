import { ContextInfo } from "../../model/context-info";
import { getNotionPage } from "../libs/notion";

export const ContextInfoParseError = new Error("Failed to parse context information from database.");

async function getContextInfoByContextId(contextId: string) : Promise<ContextInfo> {
    const r = await getNotionPage(contextId);
    
    const ctxInfo : ContextInfo = {
        id: r?.id,
        publicId: r?.properties?.["Public ID"]?.unique_id?.prefix + "-" + r?.properties?.["Public ID"]?.unique_id?.number,
        people: r?.properties?.People?.title?.[0]?.plain_text ?? "",
        map: {
            defaultPosition: (r?.properties?.["Default Map Latitude"]?.number && r?.properties?.["Default Map Longitude"]?.number) ? {
                latitude: r.properties["Default Map Latitude"].number,
                longitude: r.properties["Default Map Longitude"].number,
            } : null,
            defaultZoom: r?.properties?.["Default Map Zoom"]?.number ?? 0
        }
    }

    const parseResult = ContextInfo.safeParse(ctxInfo);
    if (!parseResult.success) {
        console.error(parseResult.error);
        throw ContextInfoParseError;
    } else {
        return ctxInfo;
    }
}

export default getContextInfoByContextId;