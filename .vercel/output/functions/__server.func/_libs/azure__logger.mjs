import { r as requireInternal } from "./@typespec/ts-http-runtime.mjs";
var commonjs = {};
var hasRequiredCommonjs;
function requireCommonjs() {
  if (hasRequiredCommonjs) return commonjs;
  hasRequiredCommonjs = 1;
  Object.defineProperty(commonjs, "__esModule", { value: true });
  commonjs.AzureLogger = void 0;
  commonjs.setLogLevel = setLogLevel;
  commonjs.getLogLevel = getLogLevel;
  commonjs.createClientLogger = createClientLogger;
  const logger_1 = /* @__PURE__ */ requireInternal();
  const context = (0, logger_1.createLoggerContext)({
    logLevelEnvVarName: "AZURE_LOG_LEVEL",
    namespace: "azure"
  });
  commonjs.AzureLogger = context.logger;
  function setLogLevel(level) {
    context.setLogLevel(level);
  }
  function getLogLevel() {
    return context.getLogLevel();
  }
  function createClientLogger(namespace) {
    return context.createClientLogger(namespace);
  }
  return commonjs;
}
export {
  requireCommonjs as r
};
