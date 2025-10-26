import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fileName = "fileToCalculateHashFor.txt";
const filePath = path.join(__dirname, "files", fileName);

const calculateHash = async () => {
  const hash = createHash("sha256");
  const readStream = createReadStream(filePath);

  readStream.on("data", (chunk) => {
    hash.update(chunk);
  });

  readStream.on("end", () => {
    const hexHash = hash.digest("hex");
    console.log(`SHA256 Hash for ${fileName}:`);
    console.log(hexHash);    
  });
};

calculateHash();
