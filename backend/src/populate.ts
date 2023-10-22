// import { Incident } from "../model/incident";
import neo4j from "./libs/neo4j";
import * as neo4Driver from "neo4j-driver";

(async ()=>{
    await neo4j.setNode({
        id: await neo4j.generateNodeId(),
        labels: ["incident"],
        properties: {
            title: "test title",
            dateTime: new Date().toISOString(),
            location: new neo4Driver.types.Point(
                4326,
                0.1,
                1.1,
            ),
            description: "some kind of description...",
            tags: ["sample tag"]
        }
    })
})();