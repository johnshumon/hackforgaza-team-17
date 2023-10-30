import fs from "node:fs";

export function writeJSON(filePath: string, content: string) {
    fs.writeFile(filePath, content, (err)=>{
        if (err) {
            console.info(`Failed to write file: ${filePath}`);
        } else {
            console.info(`Wrote file: ${filePath}`);
        }
    })
}
