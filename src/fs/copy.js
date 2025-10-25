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
    await access(copiedDirectoryPath, constants.F_OK);
    throw new Error("FS operation failed");
  } catch (error) {
    console.log(error.message);
  }

  await cp(existDirectoryPath, copiedDirectoryPath, {
    recursive: true,
  });

  console.log(
    `Папка '${existDirectory}' успешно скопирована в '${copiedDirectory}'.`
  );
  process.exit(0);
};

await copy();
