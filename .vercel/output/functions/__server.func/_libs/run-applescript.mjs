import process from "node:process";
import { promisify } from "node:util";
import { execFile } from "node:child_process";
const execFileAsync = promisify(execFile);
async function runAppleScript(script, { humanReadableOutput = true, signal } = {}) {
  if (process.platform !== "darwin") {
    throw new Error("macOS only");
  }
  const outputArguments = humanReadableOutput ? [] : ["-ss"];
  const execOptions = {};
  if (signal) {
    execOptions.signal = signal;
  }
  const { stdout } = await execFileAsync("osascript", ["-e", script, outputArguments], execOptions);
  return stdout.trim();
}
export {
  runAppleScript as r
};
