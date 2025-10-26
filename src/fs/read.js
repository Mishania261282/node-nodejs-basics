import { promises, constants } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fileName = "fileToRead.txt";
const filePath = path.join(__dirname, "files", fileName);

const read = async () => {
  try {
    await promises.access(filePath, constants.F_OK);

    const content = await promises.readFile(filePath, { encoding: "utf8" });

    console.log(`Содержимое файла ${fileName}`);
    console.log(content);
  } catch (error) {
    if (error.code === "ENOENT" && error.path === filePath) {
      console.log(`Такого файла '${fileName}' не существует.`);
      console.error("FS operation failed");
    }
  }
};

read();
