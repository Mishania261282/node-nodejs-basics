import path from "node:path";
import os from "node:os";
import { createServer as createServerHttp } from "node:http";
import "./files/c.cjs";
import bJsonData from './files/b.json' assert { type: 'json' };
import aJsonData from './files/a.json' assert { type: 'json' };

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const random = Math.random();

let unknownObject;
if (random > 0.5) {
  unknownObject = bJsonData;
} else {
  unknownObject = aJsonData;
}

console.log(`Release ${os.release()}`);
console.log(`Version ${os.version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export const unknownObjectExported = unknownObject;
