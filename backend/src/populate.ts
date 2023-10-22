// import { Incident } from "../model/incident";
// import neo4j from "./libs/neo4j";
// import * as neo4Driver from "neo4j-driver";

// (async ()=>{
//     await neo4j.setNode({
//         id: await neo4j.generateNodeId(),
//         labels: ["incident"],
//         properties: {
//             title: "test title",
//             dateTime: new Date().toISOString(),
//             location: new neo4Driver.types.Point(
//                 4326,
//                 0.1,
//                 1.1,
//             ),
//             description: "some kind of description...",
//             tags: ["sample tag"]
//         }
//     })
// })();

import { faker } from '@faker-js/faker';

interface DataObj {
  id: string;
  title: string;
  dateTime: Date;
  location: Array<{srid: number, lat: number, long: number}>;
  description: string;
  tags: string[];
}

const latLong = faker.location.nearbyGPSCoordinate({ origin: [31.434243, 34.398990] })

function createRandomData(): DataObj {
  return {
    id: faker.string.uuid(),
    title: faker.company.buzzPhrase(),
    dateTime: faker.defaultRefDate(),
    location: [{
      srid: 4326,
      lat: latLong[0],
      long: latLong[1]
    }],
    description: faker.lorem.lines(),
    tags: [faker.word.words()],
  };
}

// const randomData = createRandomData()
// console.log("randomData: ", randomData)

/// Create an array to store the generated data
const randomDataArray: DataObj[] = [];

// Generate random data and append it to the array 10 times
for (let i = 0; i < 10; i++) {
  randomDataArray.push(createRandomData());
}

// Log the array of random data
console.log(randomDataArray);
