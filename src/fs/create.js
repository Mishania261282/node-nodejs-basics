import path from "path";
import { writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";

function getFileName() {
  return fileURLToPath(import.meta.url);
}

function getDirName() {
  return dirname(getFileName());
}

const __filename = getFileName();
const __dirname = getDirName();
const filePath = path.join(__dirname, "files", "fresh.txt");
const content = "I am fresh and young";


const create = async () => {
  try {
    await writeFile(filePath, content, { flag: "wx" });
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

await create();
