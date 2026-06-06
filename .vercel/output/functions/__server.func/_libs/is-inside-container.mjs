import fs from "node:fs";
import { i as isDocker } from "./is-docker.mjs";
let cachedResult;
const hasContainerEnv = () => {
  try {
    fs.statSync("/run/.containerenv");
    return true;
  } catch {
    return false;
  }
};
function isInsideContainer() {
  if (cachedResult === void 0) {
    cachedResult = hasContainerEnv() || isDocker();
  }
  return cachedResult;
}
export {
  isInsideContainer as i
};
