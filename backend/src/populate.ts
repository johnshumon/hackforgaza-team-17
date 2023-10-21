// import { Incident } from "../model/incident";
import neo4j from "./libs/neo4j";
import { Point } from "neo4j-driver";

(async ()=>{
    await neo4j.setNode({
        id: await neo4j.generateNodeId(),
        labels: ["incident"],
        properties: {
            title: "test title",
            dateTime: new Date().toISOString(),
            // location: new Point(
            //     4326,
            //     1.1,
            //     3.53
            // ),
            description: "some kind of description...",
            tags: ["sample tag"]
        }
    })
})();