import axios from "axios";
import { loadRequiredEnvironmentVariable } from "../utils/env";


const client = () => axios.create({
    baseURL: loadRequiredEnvironmentVariable("NOTION_API_URL", "string"),
    headers: {
        'Authorization': `Bearer ${loadRequiredEnvironmentVariable("NOTION_API_KEY", "string")}`,
        'Notion-Version': loadRequiredEnvironmentVariable("NOTION_API_VERSION", "string"),
        'Content-Type': "application/json"
    }
});


export type NotionDatabaseQueryFilter = {
    property: string,
    relation?: {
        contains?: string,
        does_not_contain?: string,
        is_empty?: true,
        is_not_empty?: true
    }
}

export async function queryNotionDatabase(databaseId: string, filter?: NotionDatabaseQueryFilter) {
    function _queryNotion(databaseId: string, startCursor?: string) {
        return client().post(`databases/${databaseId}/query`, {
            page_size: 100,
            start_cursor: startCursor,
            filter
        })
    }

    let startCursor : string | undefined = undefined;
    let done : boolean = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entries : any[] = [];
    
    while (done != true) {
        const response = await _queryNotion(databaseId, startCursor);
        if (response.data.results && Array.isArray(response.data.results)) {
            entries.push(...response.data.results);
        }
        if (response.data.has_more) {
            done = false;
            startCursor = response.data.next_cursor;
        } else {
            done = true;
        }
    }
    
    // fill relation with data ("properties")
    for (const entry of entries) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const e : any = entry;
        const props = Object.entries(e.properties);
        for (const prop of props) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const propVal = prop[1] as any;
            if (propVal?.relation && Array.isArray(propVal.relation)) {
                for (let idx=0; idx<propVal.relation.length; ++idx) {
                    const relationEntryPage = await getNotionPage(propVal.relation[idx].id);
                    propVal.relation[idx] = {
                        ...propVal.relation[idx],
                        ...relationEntryPage
                    }
                }
            }
        }
    }

    return entries;
}


export async function getNotionPage(pageId: string) {
    return (await client().get(`pages/${pageId}`)).data;
}
