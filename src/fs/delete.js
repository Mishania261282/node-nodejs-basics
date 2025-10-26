import { promises, constants } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fileName = "fileToRemove.txt";
const filePath = path.join(__dirname, "files", fileName);

const remove = async () => {
  try {
    await promises.access(filePath, constants.F_OK);
    await promises.unlink(filePath);
    console.log(`Файл '${fileName}' успешно удален.`);
    process.exit(0);
  } catch (error) {
    if (error.code === "ENOENT" && error.path === filePath) {
      console.log(`Такого файла '${fileName}' не существует.`);
      console.error("FS operation failed");
    }
    process.exit(1);
  }
};

remove();
