import process from "node:process";
import require$$0 from "node:os";
import fs from "node:fs";
import { i as isInsideContainer } from "./is-inside-container.mjs";
const isWsl = () => {
  if (process.platform !== "linux") {
    return false;
  }
  if (require$$0.release().toLowerCase().includes("microsoft")) {
    if (isInsideContainer()) {
      return false;
    }
    return true;
  }
  try {
    if (fs.readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft")) {
      return !isInsideContainer();
    }
  } catch {
  }
  if (fs.existsSync("/proc/sys/fs/binfmt_misc/WSLInterop") || fs.existsSync("/run/WSL")) {
    return !isInsideContainer();
  }
  return false;
};
const isWsl$1 = process.env.__IS_WSL_TEST__ ? isWsl : isWsl();
export {
  isWsl$1 as i
};
