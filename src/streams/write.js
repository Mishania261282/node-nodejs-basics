import { createWriteStream } from "node:fs";
import process from "node:process";
import path from "node:path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fileName = "fileToWrite.txt";
const filePath = path.join(__dirname, "files", fileName);

const write = () => {
  const writeStream = createWriteStream(filePath, {
    encoding: "utf8",
    autoClose: true,
    emitClose: true,
  });

  writeStream.on("close", () => {
    console.log("");
  });

  process.stdin.pipe(writeStream);
};

console.log(
  `Please type your text and press Enter and then Ctrl+C when done.`
);
write();
