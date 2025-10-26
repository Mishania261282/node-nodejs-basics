import { spawn } from "node:child_process";
import process from "node:process";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptFileName = "script.js";
const scriptPath = path.join(__dirname, "files", scriptFileName);
const spawnChildProcess = (args) => { 
  const child = spawn(process.execPath, [scriptPath, ...args], {
    stdio: ["pipe", "pipe", "pipe"],
    execArgv: [],
  });

  process.stdin.on("data", (chunk) => {
    console.log(`[Parent] Sending to child: ${chunk.toString().trim()}`);    
    child.stdin.write(chunk);
  });
  
  process.stdin.on("end", () => {    
    child.stdin.write(`CLOSE${require("node:os").EOL}`);    
  });
 
  child.stdout.on("data", (chunk) => {
    console.log(`[Parent] Received from child: ${chunk.toString().trim()}`);    
  });
 
  child.stderr.on("data", (chunk) => {
    console.error(`[Parent] Child stderr: ${chunk.toString().trim()}`);
  });
  
  child.on("close", (code) => {
    console.log(`[Parent] Child process exited with code ${code}`);
    process.exit(code); 
  });
  
  child.on("error", (err) => {
    console.error("[Parent] Failed to start child process:", err.message);
    process.exit(1);
  });
};

spawnChildProcess(["arg_1", "arg_2", "arg_3"]);
