import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "url";
import { pipeline } from "node:stream";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceFileName = "fileToCompress.txt";
const archiveFileName = "archive.gz";
const sourceFilePath = path.join(__dirname, "files", sourceFileName);
const archiveFilePath = path.join(__dirname, archiveFileName);

const compress = () => {
  const readStream = createReadStream(sourceFilePath);
  const gzipStream = createGzip();
  const writeStream = createWriteStream(archiveFilePath);

  pipeline(readStream, gzipStream, writeStream, (err) => {
    if (err) {
      console.error(`Compression failed: ${err.message}`);     
      process.exit(1);
    } else {
      console.log(
        `Successfully compressed ${sourceFileName} to ${archiveFileName}.`
      );
      process.exit(0);
    }
  });
};

compress();
