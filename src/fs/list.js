import { promises, constants } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const folderName = "files";
const folderPath = path.join(__dirname, folderName);

const list = async () => {
  try {
    await promises.access(folderPath, constants.F_OK);
    const filesAndDirs = await promises.readdir(folderPath);
    console.log("Содержимое папки 'files':");
    console.log(filesAndDirs);
  } catch (error) {
    if (error.code === "ENOENT" && error.path === folderPath) {
      console.log("Папки 'files' не существует.");
      console.error("FS operation failed");
    }
  }
};

list();
