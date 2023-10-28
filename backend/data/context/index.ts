import { loadRequiredEnvironmentVariable } from "../../src/utils/env";
import { ContextInfo } from "./context-info";

type ContextMap = {
    [key: string]: {
        info: ContextInfo,
        graph: {
            url: string,
            username: string,
            password: string
        }
    }
};

const contextMap : ContextMap = {
    palestinian: {
        info: {
            people: "Palestinian",
            map: {
                defaultPosition: {
                    latitude: 31.320443,
                    longitude: 35.109374
                },
                defaultZoom: 7
            }
        },
        graph: {
            url:        loadRequiredEnvironmentVariable("NEO4J_URL", "string"),
            username:   loadRequiredEnvironmentVariable("NEO4J_USERNAME", "string"),
            password:   loadRequiredEnvironmentVariable("NEO4J_PASSWORD", "string")
        }
    }
} as const;

export default contextMap;
