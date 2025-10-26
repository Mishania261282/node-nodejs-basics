import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { pipeline } from 'node:stream';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceArchiveFileName = 'archive.gz';
const decompressedFileName = 'fileToCompress.txt';
const sourceArchiveFilePath = path.join(__dirname, sourceArchiveFileName);
const decompressedFilePath = path.join(__dirname, decompressedFileName);

const decompress = () => {  
  const readStream = createReadStream(sourceArchiveFilePath);
  const gunzipStream = createGunzip();  
  const writeStream = createWriteStream(decompressedFilePath);

  pipeline(
    readStream,
    gunzipStream,
    writeStream,
    (err) => {
      if (err) {        
        process.exit(1);
      } else {
        console.log(`Successfully decompressed ${sourceArchiveFileName} to ${decompressedFileName}.`);
        process.exit(0);
      }
    }
  );
};

decompress();