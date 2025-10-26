import { access, cp } from "fs/promises";
import { constants } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const existDirectory = "files";
const copiedDirectory = "files_copy";

const existDirectoryPath = path.join(__dirname, existDirectory);
const copiedDirectoryPath = path.join(__dirname, copiedDirectory);

const copy = async () => {
  try {
    await access(existDirectoryPath, constants.F_OK);
    await access(copiedDirectoryPath, constants.F_OK);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.code === "ENOENT" && error.path === existDirectoryPath) {
      console.log("Папки files не существует.");
      console.error("FS operation failed");
    } else if (error.message === "FS operation failed") {
      console.log("Папка files_copy уже существует.");
      console.error(error.message);
    } else if (error.code === "ENOENT" && error.path === copiedDirectoryPath) {
      await cp(existDirectoryPath, copiedDirectoryPath, {
        recursive: true,
      });
      console.log(
        `Содержимое папки '${existDirectory}' успешно скопировано в папку'${copiedDirectory}'.`
      );
      process.exit(0);
    }
  }
};

await copy();
