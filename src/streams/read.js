import { createReadStream } from "node:fs";
import process from "node:process";
import path from "node:path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fileName = "fileToRead.txt";
const filePath = path.join(__dirname, "files", fileName);
const readStream = createReadStream(filePath, { encoding: "utf8" });

readStream.on("data", (chunk) => {
  process.stdout.write(chunk);
});

readStream.on("close", () => {
  console.log("");
  process.exit(0);
});
