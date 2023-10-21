import { Neo4jAdapter } from "@parkour-ops/graph-db-port";
import { loadOptionalEnvironmentVariable } from "../utils/env";

const neo4j = new Neo4jAdapter(
    loadOptionalEnvironmentVariable("NEO4J_URL", "string"), 
    loadOptionalEnvironmentVariable("NEO4J_USERNAME", "string"), 
    loadOptionalEnvironmentVariable("NEO4J_PASSWORD", "string")
);

export default neo4j;