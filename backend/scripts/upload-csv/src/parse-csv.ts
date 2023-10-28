import csv from "csv-parser";
import fs from "node:fs";

export type CSVEntry = Record<string, string | undefined>;

export async function parseCSV(filePath: string) {
    return new Promise<Array<CSVEntry>>((resolve) => {
        const entries : Array<CSVEntry> = [];
        const stream = fs.createReadStream(filePath);
        stream
        .pipe(csv())
        .on("data", (data)=>entries.push(data))
        .on("end", ()=>{
            resolve(entries);
        })
    });
}