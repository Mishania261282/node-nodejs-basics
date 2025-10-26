import { access } from "fs/promises";
import { constants, promises } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const oldFileName = "wrongFilename.txt";
const newFileName = "properFilename.md";

const oldFileNamePath = path.join(__dirname, "files", oldFileName);
const newFileNamePath = path.join(__dirname, "files", newFileName);

const rename = async () => {
  try {
    await access(oldFileNamePath, constants.F_OK);

    try {
      await access(newFileNamePath, constants.F_OK);

      throw new Error("FS operation failed");
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    await promises.rename(oldFileNamePath, newFileNamePath);

    console.log(
      `Файл '${oldFileName}' успешно переименован в '${newFileName}'.`
    );
    process.exit(0);
  } catch (error) {
    if (error.code === "ENOENT" && error.path === oldFileNamePath) {
      console.log(`File '${oldFileName}' does not exist.`);
      console.error("FS operation failed");
    } else if (error.message === "FS operation failed") {
      console.log(`File '${newFileName}' exists already.`);
      console.error(error.message);
    }

    process.exit(1);
  }
};

rename();
