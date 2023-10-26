import { Neo4jAdapter } from "@parkour-ops/graph-db-port";
import { loadRequiredEnvironmentVariable } from "../utils/env";

const neo4j = new Neo4jAdapter(
    loadRequiredEnvironmentVariable("NEO4J_URL", "string"), 
    loadRequiredEnvironmentVariable("NEO4J_USERNAME", "string"), 
    loadRequiredEnvironmentVariable("NEO4J_PASSWORD", "string")
);

export default neo4j;