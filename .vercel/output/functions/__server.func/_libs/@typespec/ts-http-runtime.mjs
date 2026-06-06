import require$$0$1 from "node:os";
import process$1 from "node:process";
import require$$0$2 from "node:crypto";
import require$$2$1 from "node:zlib";
import nodeHTTP from "node:http";
import nodeHTTPS from "node:https";
import require$$2 from "node:stream";
import require$$0 from "node:util";
import require$$0$3 from "stream";
import { r as requireDist } from "../https-proxy-agent.mjs";
import { r as requireDist$1 } from "../http-proxy-agent.mjs";
var log_1;
var hasRequiredLog$1;
function requireLog$1() {
  if (hasRequiredLog$1) return log_1;
  hasRequiredLog$1 = 1;
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var log_exports = {};
  __export(log_exports, {
    log: () => log2
  });
  log_1 = __toCommonJS(log_exports);
  var import_node_os2 = require$$0$1;
  var import_node_util2 = __toESM(require$$0);
  var import_node_process2 = __toESM(process$1);
  function log2(message, ...args) {
    import_node_process2.default.stderr.write(`${import_node_util2.default.format(message, ...args)}${import_node_os2.EOL}`);
  }
  return log_1;
}
var debug;
var hasRequiredDebug;
function requireDebug() {
  if (hasRequiredDebug) return debug;
  hasRequiredDebug = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var debug_exports = {};
  __export(debug_exports, {
    default: () => debug_default
  });
  debug = __toCommonJS(debug_exports);
  var import_log = requireLog$1();
  const debugEnvVariable = typeof process !== "undefined" && process.env && process.env.DEBUG || void 0;
  let enabledString;
  let enabledNamespaces = [];
  let skippedNamespaces = [];
  const debuggers = [];
  if (debugEnvVariable) {
    enable(debugEnvVariable);
  }
  const debugObj = Object.assign(
    (namespace) => {
      return createDebugger(namespace);
    },
    {
      enable,
      enabled,
      disable,
      log: import_log.log
    }
  );
  function enable(namespaces) {
    enabledString = namespaces;
    enabledNamespaces = [];
    skippedNamespaces = [];
    const namespaceList = namespaces.split(",").map((ns) => ns.trim());
    for (const ns of namespaceList) {
      if (ns.startsWith("-")) {
        skippedNamespaces.push(ns.substring(1));
      } else {
        enabledNamespaces.push(ns);
      }
    }
    for (const instance of debuggers) {
      instance.enabled = enabled(instance.namespace);
    }
  }
  function enabled(namespace) {
    if (namespace.endsWith("*")) {
      return true;
    }
    for (const skipped of skippedNamespaces) {
      if (namespaceMatches(namespace, skipped)) {
        return false;
      }
    }
    for (const enabledNamespace of enabledNamespaces) {
      if (namespaceMatches(namespace, enabledNamespace)) {
        return true;
      }
    }
    return false;
  }
  function namespaceMatches(namespace, patternToMatch) {
    if (patternToMatch.indexOf("*") === -1) {
      return namespace === patternToMatch;
    }
    let pattern = patternToMatch;
    if (patternToMatch.indexOf("**") !== -1) {
      const patternParts = [];
      let lastCharacter = "";
      for (const character of patternToMatch) {
        if (character === "*" && lastCharacter === "*") {
          continue;
        } else {
          lastCharacter = character;
          patternParts.push(character);
        }
      }
      pattern = patternParts.join("");
    }
    let namespaceIndex = 0;
    let patternIndex = 0;
    const patternLength = pattern.length;
    const namespaceLength = namespace.length;
    let lastWildcard = -1;
    let lastWildcardNamespace = -1;
    while (namespaceIndex < namespaceLength && patternIndex < patternLength) {
      if (pattern[patternIndex] === "*") {
        lastWildcard = patternIndex;
        patternIndex++;
        if (patternIndex === patternLength) {
          return true;
        }
        while (namespace[namespaceIndex] !== pattern[patternIndex]) {
          namespaceIndex++;
          if (namespaceIndex === namespaceLength) {
            return false;
          }
        }
        lastWildcardNamespace = namespaceIndex;
        namespaceIndex++;
        patternIndex++;
        continue;
      } else if (pattern[patternIndex] === namespace[namespaceIndex]) {
        patternIndex++;
        namespaceIndex++;
      } else if (lastWildcard >= 0) {
        patternIndex = lastWildcard + 1;
        namespaceIndex = lastWildcardNamespace + 1;
        if (namespaceIndex === namespaceLength) {
          return false;
        }
        while (namespace[namespaceIndex] !== pattern[patternIndex]) {
          namespaceIndex++;
          if (namespaceIndex === namespaceLength) {
            return false;
          }
        }
        lastWildcardNamespace = namespaceIndex;
        namespaceIndex++;
        patternIndex++;
        continue;
      } else {
        return false;
      }
    }
    const namespaceDone = namespaceIndex === namespace.length;
    const patternDone = patternIndex === pattern.length;
    const trailingWildCard = patternIndex === pattern.length - 1 && pattern[patternIndex] === "*";
    return namespaceDone && (patternDone || trailingWildCard);
  }
  function disable() {
    const result = enabledString || "";
    enable("");
    return result;
  }
  function createDebugger(namespace) {
    const newDebugger = Object.assign(debug2, {
      enabled: enabled(namespace),
      destroy,
      log: debugObj.log,
      namespace,
      extend
    });
    function debug2(...args) {
      if (!newDebugger.enabled) {
        return;
      }
      if (args.length > 0) {
        args[0] = `${namespace} ${args[0]}`;
      }
      newDebugger.log(...args);
    }
    debuggers.push(newDebugger);
    return newDebugger;
  }
  function destroy() {
    const index = debuggers.indexOf(this);
    if (index >= 0) {
      debuggers.splice(index, 1);
      return true;
    }
    return false;
  }
  function extend(namespace) {
    const newDebugger = createDebugger(`${this.namespace}:${namespace}`);
    newDebugger.log = this.log;
    return newDebugger;
  }
  var debug_default = debugObj;
  return debug;
}
var logger;
var hasRequiredLogger;
function requireLogger() {
  if (hasRequiredLogger) return logger;
  hasRequiredLogger = 1;
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var logger_exports = {};
  __export(logger_exports, {
    TypeSpecRuntimeLogger: () => TypeSpecRuntimeLogger,
    createClientLogger: () => createClientLogger,
    createLoggerContext: () => createLoggerContext,
    getLogLevel: () => getLogLevel,
    setLogLevel: () => setLogLevel
  });
  logger = __toCommonJS(logger_exports);
  var import_debug = __toESM(requireDebug());
  const TYPESPEC_RUNTIME_LOG_LEVELS = ["verbose", "info", "warning", "error"];
  const levelMap = {
    verbose: 400,
    info: 300,
    warning: 200,
    error: 100
  };
  function patchLogMethod(parent, child) {
    child.log = (...args) => {
      parent.log(...args);
    };
  }
  function isTypeSpecRuntimeLogLevel(level) {
    return TYPESPEC_RUNTIME_LOG_LEVELS.includes(level);
  }
  function createLoggerContext(options) {
    const registeredLoggers = /* @__PURE__ */ new Set();
    const logLevelFromEnv = typeof process !== "undefined" && process.env && process.env[options.logLevelEnvVarName] || void 0;
    let logLevel;
    const clientLogger = (0, import_debug.default)(options.namespace);
    clientLogger.log = (...args) => {
      import_debug.default.log(...args);
    };
    function contextSetLogLevel(level) {
      if (level && !isTypeSpecRuntimeLogLevel(level)) {
        throw new Error(
          `Unknown log level '${level}'. Acceptable values: ${TYPESPEC_RUNTIME_LOG_LEVELS.join(",")}`
        );
      }
      logLevel = level;
      const enabledNamespaces = [];
      for (const logger2 of registeredLoggers) {
        if (shouldEnable(logger2)) {
          enabledNamespaces.push(logger2.namespace);
        }
      }
      import_debug.default.enable(enabledNamespaces.join(","));
    }
    if (logLevelFromEnv) {
      if (isTypeSpecRuntimeLogLevel(logLevelFromEnv)) {
        contextSetLogLevel(logLevelFromEnv);
      } else {
        console.error(
          `${options.logLevelEnvVarName} set to unknown log level '${logLevelFromEnv}'; logging is not enabled. Acceptable values: ${TYPESPEC_RUNTIME_LOG_LEVELS.join(
            ", "
          )}.`
        );
      }
    }
    function shouldEnable(logger2) {
      return Boolean(logLevel && levelMap[logger2.level] <= levelMap[logLevel]);
    }
    function createLogger(parent, level) {
      const logger2 = Object.assign(parent.extend(level), {
        level
      });
      patchLogMethod(parent, logger2);
      if (shouldEnable(logger2)) {
        const enabledNamespaces = import_debug.default.disable();
        import_debug.default.enable(enabledNamespaces + "," + logger2.namespace);
      }
      registeredLoggers.add(logger2);
      return logger2;
    }
    function contextGetLogLevel() {
      return logLevel;
    }
    function contextCreateClientLogger(namespace) {
      const clientRootLogger = clientLogger.extend(namespace);
      patchLogMethod(clientLogger, clientRootLogger);
      return {
        error: createLogger(clientRootLogger, "error"),
        warning: createLogger(clientRootLogger, "warning"),
        info: createLogger(clientRootLogger, "info"),
        verbose: createLogger(clientRootLogger, "verbose")
      };
    }
    return {
      setLogLevel: contextSetLogLevel,
      getLogLevel: contextGetLogLevel,
      createClientLogger: contextCreateClientLogger,
      logger: clientLogger
    };
  }
  const context = createLoggerContext({
    logLevelEnvVarName: "TYPESPEC_RUNTIME_LOG_LEVEL",
    namespace: "typeSpecRuntime"
  });
  const TypeSpecRuntimeLogger = context.logger;
  function setLogLevel(logLevel) {
    context.setLogLevel(logLevel);
  }
  function getLogLevel() {
    return context.getLogLevel();
  }
  function createClientLogger(namespace) {
    return context.createClientLogger(namespace);
  }
  return logger;
}
var internal$2;
var hasRequiredInternal$2;
function requireInternal$2() {
  if (hasRequiredInternal$2) return internal$2;
  hasRequiredInternal$2 = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var internal_exports = {};
  __export(internal_exports, {
    createLoggerContext: () => import_logger.createLoggerContext
  });
  internal$2 = __toCommonJS(internal_exports);
  var import_logger = requireLogger();
  return internal$2;
}
var random;
var hasRequiredRandom;
function requireRandom() {
  if (hasRequiredRandom) return random;
  hasRequiredRandom = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var random_exports = {};
  __export(random_exports, {
    getRandomIntegerInclusive: () => getRandomIntegerInclusive
  });
  random = __toCommonJS(random_exports);
  function getRandomIntegerInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const offset = Math.floor(Math.random() * (max - min + 1));
    return offset + min;
  }
  return random;
}
var delay;
var hasRequiredDelay;
function requireDelay() {
  if (hasRequiredDelay) return delay;
  hasRequiredDelay = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var delay_exports = {};
  __export(delay_exports, {
    calculateRetryDelay: () => calculateRetryDelay
  });
  delay = __toCommonJS(delay_exports);
  var import_random = requireRandom();
  function calculateRetryDelay(retryAttempt, config) {
    const exponentialDelay = config.retryDelayInMs * Math.pow(2, retryAttempt);
    const clampedDelay = Math.min(config.maxRetryDelayInMs, exponentialDelay);
    const retryAfterInMs = clampedDelay / 2 + (0, import_random.getRandomIntegerInclusive)(0, clampedDelay / 2);
    return { retryAfterInMs };
  }
  return delay;
}
var object;
var hasRequiredObject;
function requireObject() {
  if (hasRequiredObject) return object;
  hasRequiredObject = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var object_exports = {};
  __export(object_exports, {
    isObject: () => isObject
  });
  object = __toCommonJS(object_exports);
  function isObject(input) {
    return typeof input === "object" && input !== null && !Array.isArray(input) && !(input instanceof RegExp) && !(input instanceof Date);
  }
  return object;
}
var error;
var hasRequiredError;
function requireError() {
  if (hasRequiredError) return error;
  hasRequiredError = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var error_exports = {};
  __export(error_exports, {
    isError: () => isError
  });
  error = __toCommonJS(error_exports);
  var import_object = requireObject();
  function isError(e) {
    if ((0, import_object.isObject)(e)) {
      const hasName = typeof e.name === "string";
      const hasMessage = typeof e.message === "string";
      return hasName && hasMessage;
    }
    return false;
  }
  return error;
}
var sha256;
var hasRequiredSha256;
function requireSha256() {
  if (hasRequiredSha256) return sha256;
  hasRequiredSha256 = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var sha256_exports = {};
  __export(sha256_exports, {
    computeSha256Hash: () => computeSha256Hash,
    computeSha256Hmac: () => computeSha256Hmac
  });
  sha256 = __toCommonJS(sha256_exports);
  var import_node_crypto2 = require$$0$2;
  async function computeSha256Hmac(key, stringToSign, encoding) {
    const decodedKey = Buffer.from(key, "base64");
    return (0, import_node_crypto2.createHmac)("sha256", decodedKey).update(stringToSign).digest(encoding);
  }
  async function computeSha256Hash(content, encoding) {
    return (0, import_node_crypto2.createHash)("sha256").update(content).digest(encoding);
  }
  return sha256;
}
var uuidUtils;
var hasRequiredUuidUtils;
function requireUuidUtils() {
  if (hasRequiredUuidUtils) return uuidUtils;
  hasRequiredUuidUtils = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var uuidUtils_exports = {};
  __export(uuidUtils_exports, {
    randomUUID: () => randomUUID
  });
  uuidUtils = __toCommonJS(uuidUtils_exports);
  function randomUUID() {
    return crypto.randomUUID();
  }
  return uuidUtils;
}
var checkEnvironment;
var hasRequiredCheckEnvironment;
function requireCheckEnvironment() {
  if (hasRequiredCheckEnvironment) return checkEnvironment;
  hasRequiredCheckEnvironment = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var checkEnvironment_exports = {};
  __export(checkEnvironment_exports, {
    isBrowser: () => isBrowser,
    isBun: () => isBun,
    isDeno: () => isDeno,
    isNodeLike: () => isNodeLike,
    isNodeRuntime: () => isNodeRuntime,
    isReactNative: () => isReactNative,
    isWebWorker: () => isWebWorker
  });
  checkEnvironment = __toCommonJS(checkEnvironment_exports);
  const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
  const isWebWorker = typeof self === "object" && typeof self?.importScripts === "function" && (self.constructor?.name === "DedicatedWorkerGlobalScope" || self.constructor?.name === "ServiceWorkerGlobalScope" || self.constructor?.name === "SharedWorkerGlobalScope");
  const isDeno = typeof Deno !== "undefined" && typeof Deno.version !== "undefined" && typeof Deno.version.deno !== "undefined";
  const isBun = typeof Bun !== "undefined" && typeof Bun.version !== "undefined";
  const isNodeLike = typeof globalThis.process !== "undefined" && Boolean(globalThis.process.version) && Boolean(globalThis.process.versions?.node);
  const isNodeRuntime = isNodeLike && !isBun && !isDeno;
  const isReactNative = typeof navigator !== "undefined" && navigator?.product === "ReactNative";
  return checkEnvironment;
}
var bytesEncoding;
var hasRequiredBytesEncoding;
function requireBytesEncoding() {
  if (hasRequiredBytesEncoding) return bytesEncoding;
  hasRequiredBytesEncoding = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var bytesEncoding_exports = {};
  __export(bytesEncoding_exports, {
    stringToUint8Array: () => stringToUint8Array,
    uint8ArrayToString: () => uint8ArrayToString
  });
  bytesEncoding = __toCommonJS(bytesEncoding_exports);
  function uint8ArrayToString(bytes, format) {
    return Buffer.from(bytes).toString(format);
  }
  function stringToUint8Array(value, format) {
    return Buffer.from(value, format);
  }
  return bytesEncoding;
}
var sanitizer;
var hasRequiredSanitizer;
function requireSanitizer() {
  if (hasRequiredSanitizer) return sanitizer;
  hasRequiredSanitizer = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var sanitizer_exports = {};
  __export(sanitizer_exports, {
    Sanitizer: () => Sanitizer
  });
  sanitizer = __toCommonJS(sanitizer_exports);
  var import_object = requireObject();
  const RedactedString = "REDACTED";
  const defaultAllowedHeaderNames = [
    "x-ms-client-request-id",
    "x-ms-return-client-request-id",
    "x-ms-useragent",
    "x-ms-correlation-request-id",
    "x-ms-request-id",
    "client-request-id",
    "ms-cv",
    "return-client-request-id",
    "traceparent",
    "Access-Control-Allow-Credentials",
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Methods",
    "Access-Control-Allow-Origin",
    "Access-Control-Expose-Headers",
    "Access-Control-Max-Age",
    "Access-Control-Request-Headers",
    "Access-Control-Request-Method",
    "Origin",
    "Accept",
    "Accept-Encoding",
    "Cache-Control",
    "Connection",
    "Content-Length",
    "Content-Type",
    "Date",
    "ETag",
    "Expires",
    "If-Match",
    "If-Modified-Since",
    "If-None-Match",
    "If-Unmodified-Since",
    "Last-Modified",
    "Pragma",
    "Request-Id",
    "Retry-After",
    "Server",
    "Transfer-Encoding",
    "User-Agent",
    "WWW-Authenticate"
  ];
  const defaultAllowedQueryParameters = ["api-version"];
  class Sanitizer {
    allowedHeaderNames;
    allowedQueryParameters;
    constructor({
      additionalAllowedHeaderNames: allowedHeaderNames = [],
      additionalAllowedQueryParameters: allowedQueryParameters = []
    } = {}) {
      allowedHeaderNames = defaultAllowedHeaderNames.concat(allowedHeaderNames);
      allowedQueryParameters = defaultAllowedQueryParameters.concat(allowedQueryParameters);
      this.allowedHeaderNames = new Set(allowedHeaderNames.map((n) => n.toLowerCase()));
      this.allowedQueryParameters = new Set(allowedQueryParameters.map((p) => p.toLowerCase()));
    }
    /**
     * Sanitizes an object for logging.
     * @param obj - The object to sanitize
     * @returns - The sanitized object as a string
     */
    sanitize(obj) {
      const seen = /* @__PURE__ */ new Set();
      return JSON.stringify(
        obj,
        (key, value) => {
          if (value instanceof Error) {
            return {
              ...value,
              name: value.name,
              message: value.message
            };
          }
          if (key === "headers" && (0, import_object.isObject)(value)) {
            return this.sanitizeHeaders(value);
          } else if (key === "url" && typeof value === "string") {
            return this.sanitizeUrl(value);
          } else if (key === "query" && (0, import_object.isObject)(value)) {
            return this.sanitizeQuery(value);
          } else if (key === "body") {
            return void 0;
          } else if (key === "response") {
            return void 0;
          } else if (key === "operationSpec") {
            return void 0;
          } else if (Array.isArray(value) || (0, import_object.isObject)(value)) {
            if (seen.has(value)) {
              return "[Circular]";
            }
            seen.add(value);
          }
          return value;
        },
        2
      );
    }
    /**
     * Sanitizes a URL for logging.
     * @param value - The URL to sanitize
     * @returns - The sanitized URL as a string
     */
    sanitizeUrl(value) {
      if (typeof value !== "string" || value === null || value === "") {
        return value;
      }
      const url = new URL(value);
      if (!url.search) {
        return value;
      }
      for (const [key] of url.searchParams) {
        if (!this.allowedQueryParameters.has(key.toLowerCase())) {
          url.searchParams.set(key, RedactedString);
        }
      }
      return url.toString();
    }
    sanitizeHeaders(obj) {
      const sanitized = {};
      for (const key of Object.keys(obj)) {
        if (this.allowedHeaderNames.has(key.toLowerCase())) {
          sanitized[key] = obj[key];
        } else {
          sanitized[key] = RedactedString;
        }
      }
      return sanitized;
    }
    sanitizeQuery(value) {
      if (typeof value !== "object" || value === null) {
        return value;
      }
      const sanitized = {};
      for (const k of Object.keys(value)) {
        if (this.allowedQueryParameters.has(k.toLowerCase())) {
          sanitized[k] = value[k];
        } else {
          sanitized[k] = RedactedString;
        }
      }
      return sanitized;
    }
  }
  return sanitizer;
}
var internal$1;
var hasRequiredInternal$1;
function requireInternal$1() {
  if (hasRequiredInternal$1) return internal$1;
  hasRequiredInternal$1 = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var internal_exports = {};
  __export(internal_exports, {
    Sanitizer: () => import_sanitizer.Sanitizer,
    calculateRetryDelay: () => import_delay.calculateRetryDelay,
    computeSha256Hash: () => import_sha256.computeSha256Hash,
    computeSha256Hmac: () => import_sha256.computeSha256Hmac,
    getRandomIntegerInclusive: () => import_random.getRandomIntegerInclusive,
    isBrowser: () => import_checkEnvironment.isBrowser,
    isBun: () => import_checkEnvironment.isBun,
    isDeno: () => import_checkEnvironment.isDeno,
    isError: () => import_error.isError,
    isNodeLike: () => import_checkEnvironment.isNodeLike,
    isNodeRuntime: () => import_checkEnvironment.isNodeRuntime,
    isObject: () => import_object.isObject,
    isReactNative: () => import_checkEnvironment.isReactNative,
    isWebWorker: () => import_checkEnvironment.isWebWorker,
    randomUUID: () => import_uuidUtils.randomUUID,
    stringToUint8Array: () => import_bytesEncoding.stringToUint8Array,
    uint8ArrayToString: () => import_bytesEncoding.uint8ArrayToString
  });
  internal$1 = __toCommonJS(internal_exports);
  var import_delay = requireDelay();
  var import_random = requireRandom();
  var import_object = requireObject();
  var import_error = requireError();
  var import_sha256 = requireSha256();
  var import_uuidUtils = requireUuidUtils();
  var import_checkEnvironment = requireCheckEnvironment();
  var import_bytesEncoding = requireBytesEncoding();
  var import_sanitizer = requireSanitizer();
  return internal$1;
}
var AbortError_1;
var hasRequiredAbortError;
function requireAbortError() {
  if (hasRequiredAbortError) return AbortError_1;
  hasRequiredAbortError = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var AbortError_exports = {};
  __export(AbortError_exports, {
    AbortError: () => AbortError
  });
  AbortError_1 = __toCommonJS(AbortError_exports);
  class AbortError extends Error {
    constructor(message) {
      super(message);
      this.name = "AbortError";
    }
  }
  return AbortError_1;
}
var httpHeaders;
var hasRequiredHttpHeaders;
function requireHttpHeaders() {
  if (hasRequiredHttpHeaders) return httpHeaders;
  hasRequiredHttpHeaders = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var httpHeaders_exports = {};
  __export(httpHeaders_exports, {
    createHttpHeaders: () => createHttpHeaders
  });
  httpHeaders = __toCommonJS(httpHeaders_exports);
  function normalizeName(name) {
    return name.toLowerCase();
  }
  function* headerIterator(map) {
    for (const entry of map.values()) {
      yield [entry.name, entry.value];
    }
  }
  class HttpHeadersImpl {
    _headersMap;
    constructor(rawHeaders) {
      this._headersMap = /* @__PURE__ */ new Map();
      if (rawHeaders) {
        for (const headerName of Object.keys(rawHeaders)) {
          this.set(headerName, rawHeaders[headerName]);
        }
      }
    }
    /**
     * Set a header in this collection with the provided name and value. The name is
     * case-insensitive.
     * @param name - The name of the header to set. This value is case-insensitive.
     * @param value - The value of the header to set.
     */
    set(name, value) {
      this._headersMap.set(normalizeName(name), { name, value: String(value).trim() });
    }
    /**
     * Get the header value for the provided header name, or undefined if no header exists in this
     * collection with the provided name.
     * @param name - The name of the header. This value is case-insensitive.
     */
    get(name) {
      return this._headersMap.get(normalizeName(name))?.value;
    }
    /**
     * Get whether or not this header collection contains a header entry for the provided header name.
     * @param name - The name of the header to set. This value is case-insensitive.
     */
    has(name) {
      return this._headersMap.has(normalizeName(name));
    }
    /**
     * Remove the header with the provided headerName.
     * @param name - The name of the header to remove.
     */
    delete(name) {
      this._headersMap.delete(normalizeName(name));
    }
    /**
     * Get the JSON object representation of this HTTP header collection.
     */
    toJSON(options = {}) {
      const result = {};
      if (options.preserveCase) {
        for (const entry of this._headersMap.values()) {
          result[entry.name] = entry.value;
        }
      } else {
        for (const [normalizedName, entry] of this._headersMap) {
          result[normalizedName] = entry.value;
        }
      }
      return result;
    }
    /**
     * Get the string representation of this HTTP header collection.
     */
    toString() {
      return JSON.stringify(this.toJSON({ preserveCase: true }));
    }
    /**
     * Iterate over tuples of header [name, value] pairs.
     */
    [Symbol.iterator]() {
      return headerIterator(this._headersMap);
    }
  }
  function createHttpHeaders(rawHeaders) {
    return new HttpHeadersImpl(rawHeaders);
  }
  return httpHeaders;
}
var pipelineRequest;
var hasRequiredPipelineRequest;
function requirePipelineRequest() {
  if (hasRequiredPipelineRequest) return pipelineRequest;
  hasRequiredPipelineRequest = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var pipelineRequest_exports = {};
  __export(pipelineRequest_exports, {
    createPipelineRequest: () => createPipelineRequest
  });
  pipelineRequest = __toCommonJS(pipelineRequest_exports);
  var import_httpHeaders = requireHttpHeaders();
  var import_uuidUtils = requireUuidUtils();
  class PipelineRequestImpl {
    url;
    method;
    headers;
    timeout;
    withCredentials;
    body;
    multipartBody;
    formData;
    streamResponseStatusCodes;
    enableBrowserStreams;
    proxySettings;
    disableKeepAlive;
    abortSignal;
    requestId;
    allowInsecureConnection;
    onUploadProgress;
    onDownloadProgress;
    requestOverrides;
    authSchemes;
    constructor(options) {
      this.url = options.url;
      this.body = options.body;
      this.headers = options.headers ?? (0, import_httpHeaders.createHttpHeaders)();
      this.method = options.method ?? "GET";
      this.timeout = options.timeout ?? 0;
      this.multipartBody = options.multipartBody;
      this.formData = options.formData;
      this.disableKeepAlive = options.disableKeepAlive ?? false;
      this.proxySettings = options.proxySettings;
      this.streamResponseStatusCodes = options.streamResponseStatusCodes;
      this.withCredentials = options.withCredentials ?? false;
      this.abortSignal = options.abortSignal;
      this.onUploadProgress = options.onUploadProgress;
      this.onDownloadProgress = options.onDownloadProgress;
      this.requestId = options.requestId || (0, import_uuidUtils.randomUUID)();
      this.allowInsecureConnection = options.allowInsecureConnection ?? false;
      this.enableBrowserStreams = options.enableBrowserStreams ?? false;
      this.requestOverrides = options.requestOverrides;
      this.authSchemes = options.authSchemes;
    }
  }
  function createPipelineRequest(options) {
    return new PipelineRequestImpl(options);
  }
  return pipelineRequest;
}
var pipeline;
var hasRequiredPipeline;
function requirePipeline() {
  if (hasRequiredPipeline) return pipeline;
  hasRequiredPipeline = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var pipeline_exports = {};
  __export(pipeline_exports, {
    createEmptyPipeline: () => createEmptyPipeline
  });
  pipeline = __toCommonJS(pipeline_exports);
  const ValidPhaseNames = /* @__PURE__ */ new Set(["Deserialize", "Serialize", "Retry", "Sign"]);
  class HttpPipeline {
    _policies = [];
    _orderedPolicies;
    constructor(policies) {
      this._policies = policies?.slice(0) ?? [];
      this._orderedPolicies = void 0;
    }
    addPolicy(policy, options = {}) {
      if (options.phase && options.afterPhase) {
        throw new Error("Policies inside a phase cannot specify afterPhase.");
      }
      if (options.phase && !ValidPhaseNames.has(options.phase)) {
        throw new Error(`Invalid phase name: ${options.phase}`);
      }
      if (options.afterPhase && !ValidPhaseNames.has(options.afterPhase)) {
        throw new Error(`Invalid afterPhase name: ${options.afterPhase}`);
      }
      this._policies.push({
        policy,
        options
      });
      this._orderedPolicies = void 0;
    }
    removePolicy(options) {
      const removedPolicies = [];
      this._policies = this._policies.filter((policyDescriptor) => {
        if (options.name && policyDescriptor.policy.name === options.name || options.phase && policyDescriptor.options.phase === options.phase) {
          removedPolicies.push(policyDescriptor.policy);
          return false;
        } else {
          return true;
        }
      });
      this._orderedPolicies = void 0;
      return removedPolicies;
    }
    sendRequest(httpClient, request) {
      const policies = this.getOrderedPolicies();
      const pipeline2 = policies.reduceRight(
        (next, policy) => {
          return (req) => {
            return policy.sendRequest(req, next);
          };
        },
        (req) => httpClient.sendRequest(req)
      );
      return pipeline2(request);
    }
    getOrderedPolicies() {
      if (!this._orderedPolicies) {
        this._orderedPolicies = this.orderPolicies();
      }
      return this._orderedPolicies;
    }
    clone() {
      return new HttpPipeline(this._policies);
    }
    static create() {
      return new HttpPipeline();
    }
    orderPolicies() {
      const result = [];
      const policyMap = /* @__PURE__ */ new Map();
      function createPhase(name) {
        return {
          name,
          policies: /* @__PURE__ */ new Set(),
          hasRun: false,
          hasAfterPolicies: false
        };
      }
      const serializePhase = createPhase("Serialize");
      const noPhase = createPhase("None");
      const deserializePhase = createPhase("Deserialize");
      const retryPhase = createPhase("Retry");
      const signPhase = createPhase("Sign");
      const orderedPhases = [serializePhase, noPhase, deserializePhase, retryPhase, signPhase];
      function getPhase(phase) {
        if (phase === "Retry") {
          return retryPhase;
        } else if (phase === "Serialize") {
          return serializePhase;
        } else if (phase === "Deserialize") {
          return deserializePhase;
        } else if (phase === "Sign") {
          return signPhase;
        } else {
          return noPhase;
        }
      }
      for (const descriptor of this._policies) {
        const policy = descriptor.policy;
        const options = descriptor.options;
        const policyName = policy.name;
        if (policyMap.has(policyName)) {
          throw new Error("Duplicate policy names not allowed in pipeline");
        }
        const node = {
          policy,
          dependsOn: /* @__PURE__ */ new Set(),
          dependants: /* @__PURE__ */ new Set()
        };
        if (options.afterPhase) {
          node.afterPhase = getPhase(options.afterPhase);
          node.afterPhase.hasAfterPolicies = true;
        }
        policyMap.set(policyName, node);
        const phase = getPhase(options.phase);
        phase.policies.add(node);
      }
      for (const descriptor of this._policies) {
        const { policy, options } = descriptor;
        const policyName = policy.name;
        const node = policyMap.get(policyName);
        if (!node) {
          throw new Error(`Missing node for policy ${policyName}`);
        }
        if (options.afterPolicies) {
          for (const afterPolicyName of options.afterPolicies) {
            const afterNode = policyMap.get(afterPolicyName);
            if (afterNode) {
              node.dependsOn.add(afterNode);
              afterNode.dependants.add(node);
            }
          }
        }
        if (options.beforePolicies) {
          for (const beforePolicyName of options.beforePolicies) {
            const beforeNode = policyMap.get(beforePolicyName);
            if (beforeNode) {
              beforeNode.dependsOn.add(node);
              node.dependants.add(beforeNode);
            }
          }
        }
      }
      function walkPhase(phase) {
        phase.hasRun = true;
        for (const node of phase.policies) {
          if (node.afterPhase && (!node.afterPhase.hasRun || node.afterPhase.policies.size)) {
            continue;
          }
          if (node.dependsOn.size === 0) {
            result.push(node.policy);
            for (const dependant of node.dependants) {
              dependant.dependsOn.delete(node);
            }
            policyMap.delete(node.policy.name);
            phase.policies.delete(node);
          }
        }
      }
      function walkPhases() {
        for (const phase of orderedPhases) {
          walkPhase(phase);
          if (phase.policies.size > 0 && phase !== noPhase) {
            if (!noPhase.hasRun) {
              walkPhase(noPhase);
            }
            return;
          }
          if (phase.hasAfterPolicies) {
            walkPhase(noPhase);
          }
        }
      }
      let iteration = 0;
      while (policyMap.size > 0) {
        iteration++;
        const initialResultLength = result.length;
        walkPhases();
        if (result.length <= initialResultLength && iteration > 1) {
          throw new Error("Cannot satisfy policy dependencies due to requirements cycle.");
        }
      }
      return result;
    }
  }
  function createEmptyPipeline() {
    return HttpPipeline.create();
  }
  return pipeline;
}
var inspect;
var hasRequiredInspect;
function requireInspect() {
  if (hasRequiredInspect) return inspect;
  hasRequiredInspect = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var inspect_exports = {};
  __export(inspect_exports, {
    custom: () => custom
  });
  inspect = __toCommonJS(inspect_exports);
  var import_node_util2 = require$$0;
  const custom = import_node_util2.inspect.custom;
  return inspect;
}
var restError$1;
var hasRequiredRestError$1;
function requireRestError$1() {
  if (hasRequiredRestError$1) return restError$1;
  hasRequiredRestError$1 = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var restError_exports = {};
  __export(restError_exports, {
    RestError: () => RestError,
    isRestError: () => isRestError
  });
  restError$1 = __toCommonJS(restError_exports);
  var import_error = requireError();
  var import_inspect = requireInspect();
  var import_sanitizer = requireSanitizer();
  const errorSanitizer = new import_sanitizer.Sanitizer();
  class RestError extends Error {
    /**
     * Something went wrong when making the request.
     * This means the actual request failed for some reason,
     * such as a DNS issue or the connection being lost.
     */
    static REQUEST_SEND_ERROR = "REQUEST_SEND_ERROR";
    /**
     * This means that parsing the response from the server failed.
     * It may have been malformed.
     */
    static PARSE_ERROR = "PARSE_ERROR";
    /**
     * The code of the error itself (use statics on RestError if possible.)
     */
    code;
    /**
     * The HTTP status code of the request (if applicable.)
     */
    statusCode;
    /**
     * The request that was made.
     * This property is non-enumerable.
     */
    request;
    /**
     * The response received (if any.)
     * This property is non-enumerable.
     */
    response;
    /**
     * Bonus property set by the throw site.
     */
    details;
    constructor(message, options = {}) {
      super(message);
      this.name = "RestError";
      this.code = options.code;
      this.statusCode = options.statusCode;
      Object.defineProperty(this, "request", { value: options.request, enumerable: false });
      Object.defineProperty(this, "response", { value: options.response, enumerable: false });
      const agent = this.request?.agent ? {
        maxFreeSockets: this.request.agent.maxFreeSockets,
        maxSockets: this.request.agent.maxSockets
      } : void 0;
      Object.defineProperty(this, import_inspect.custom, {
        value: () => {
          return `RestError: ${this.message} 
 ${errorSanitizer.sanitize({
            ...this,
            request: { ...this.request, agent },
            response: this.response
          })}`;
        },
        enumerable: false
      });
      Object.setPrototypeOf(this, RestError.prototype);
    }
  }
  function isRestError(e) {
    if (e instanceof RestError) {
      return true;
    }
    return (0, import_error.isError)(e) && e.name === "RestError";
  }
  return restError$1;
}
var log;
var hasRequiredLog;
function requireLog() {
  if (hasRequiredLog) return log;
  hasRequiredLog = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var log_exports = {};
  __export(log_exports, {
    logger: () => logger2
  });
  log = __toCommonJS(log_exports);
  var import_logger = requireLogger();
  const logger2 = (0, import_logger.createClientLogger)("ts-http-runtime");
  return log;
}
var nodeHttpClient;
var hasRequiredNodeHttpClient;
function requireNodeHttpClient() {
  if (hasRequiredNodeHttpClient) return nodeHttpClient;
  hasRequiredNodeHttpClient = 1;
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var nodeHttpClient_exports = {};
  __export(nodeHttpClient_exports, {
    createNodeHttpClient: () => createNodeHttpClient,
    getBodyLength: () => getBodyLength
  });
  nodeHttpClient = __toCommonJS(nodeHttpClient_exports);
  var import_node_http2 = __toESM(nodeHTTP);
  var import_node_https2 = __toESM(nodeHTTPS);
  var import_node_zlib2 = __toESM(require$$2$1);
  var import_node_stream2 = require$$2;
  var import_AbortError = requireAbortError();
  var import_httpHeaders = requireHttpHeaders();
  var import_restError = requireRestError$1();
  var import_log = requireLog();
  var import_sanitizer = requireSanitizer();
  const DEFAULT_TLS_SETTINGS = {};
  function isReadableStream(body) {
    return body && typeof body.pipe === "function";
  }
  function isStreamComplete(stream) {
    if (stream.readable === false) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const handler = () => {
        resolve();
        stream.removeListener("close", handler);
        stream.removeListener("end", handler);
        stream.removeListener("error", handler);
      };
      stream.on("close", handler);
      stream.on("end", handler);
      stream.on("error", handler);
    });
  }
  function isArrayBuffer(body) {
    return body && typeof body.byteLength === "number";
  }
  class ReportTransform extends import_node_stream2.Transform {
    loadedBytes = 0;
    progressCallback;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    _transform(chunk, _encoding, callback) {
      this.push(chunk);
      this.loadedBytes += chunk.length;
      try {
        this.progressCallback({ loadedBytes: this.loadedBytes });
        callback();
      } catch (e) {
        callback(e);
      }
    }
    constructor(progressCallback) {
      super();
      this.progressCallback = progressCallback;
    }
  }
  class NodeHttpClient {
    cachedHttpAgent;
    cachedHttpsAgents = /* @__PURE__ */ new WeakMap();
    /**
     * Makes a request over an underlying transport layer and returns the response.
     * @param request - The request to be made.
     */
    async sendRequest(request) {
      const abortController = new AbortController();
      let abortListener;
      if (request.abortSignal) {
        if (request.abortSignal.aborted) {
          throw new import_AbortError.AbortError("The operation was aborted. Request has already been canceled.");
        }
        abortListener = (event) => {
          if (event.type === "abort") {
            abortController.abort();
          }
        };
        request.abortSignal.addEventListener("abort", abortListener);
      }
      let timeoutId;
      if (request.timeout > 0) {
        timeoutId = setTimeout(() => {
          const sanitizer2 = new import_sanitizer.Sanitizer();
          import_log.logger.info(`request to '${sanitizer2.sanitizeUrl(request.url)}' timed out. canceling...`);
          abortController.abort();
        }, request.timeout);
      }
      const acceptEncoding = request.headers.get("Accept-Encoding");
      const shouldDecompress = acceptEncoding?.includes("gzip") || acceptEncoding?.includes("deflate");
      let body = typeof request.body === "function" ? request.body() : request.body;
      if (body && !request.headers.has("Content-Length")) {
        const bodyLength = getBodyLength(body);
        if (bodyLength !== null) {
          request.headers.set("Content-Length", bodyLength);
        }
      }
      let responseStream;
      try {
        if (body && request.onUploadProgress) {
          const onUploadProgress = request.onUploadProgress;
          const uploadReportStream = new ReportTransform(onUploadProgress);
          uploadReportStream.on("error", (e) => {
            import_log.logger.error("Error in upload progress", e);
          });
          if (isReadableStream(body)) {
            body.pipe(uploadReportStream);
          } else {
            uploadReportStream.end(body);
          }
          body = uploadReportStream;
        }
        const res = await this.makeRequest(request, abortController, body);
        if (timeoutId !== void 0) {
          clearTimeout(timeoutId);
        }
        const headers = getResponseHeaders(res);
        const status = res.statusCode ?? 0;
        const response = {
          status,
          headers,
          request
        };
        if (request.method === "HEAD") {
          res.resume();
          return response;
        }
        responseStream = shouldDecompress ? getDecodedResponseStream(res, headers) : res;
        const onDownloadProgress = request.onDownloadProgress;
        if (onDownloadProgress) {
          const downloadReportStream = new ReportTransform(onDownloadProgress);
          downloadReportStream.on("error", (e) => {
            import_log.logger.error("Error in download progress", e);
          });
          responseStream.pipe(downloadReportStream);
          responseStream = downloadReportStream;
        }
        if (
          // Value of POSITIVE_INFINITY in streamResponseStatusCodes is considered as any status code
          request.streamResponseStatusCodes?.has(Number.POSITIVE_INFINITY) || request.streamResponseStatusCodes?.has(response.status)
        ) {
          response.readableStreamBody = responseStream;
        } else {
          response.bodyAsText = await streamToText(responseStream);
        }
        return response;
      } finally {
        if (request.abortSignal && abortListener) {
          let uploadStreamDone = Promise.resolve();
          if (isReadableStream(body)) {
            uploadStreamDone = isStreamComplete(body);
          }
          let downloadStreamDone = Promise.resolve();
          if (isReadableStream(responseStream)) {
            downloadStreamDone = isStreamComplete(responseStream);
          }
          Promise.all([uploadStreamDone, downloadStreamDone]).then(() => {
            if (abortListener) {
              request.abortSignal?.removeEventListener("abort", abortListener);
            }
          }).catch((e) => {
            import_log.logger.warning("Error when cleaning up abortListener on httpRequest", e);
          });
        }
      }
    }
    makeRequest(request, abortController, body) {
      const url = new URL(request.url);
      const isInsecure = url.protocol !== "https:";
      if (isInsecure && !request.allowInsecureConnection) {
        throw new Error(`Cannot connect to ${request.url} while allowInsecureConnection is false.`);
      }
      const agent = request.agent ?? this.getOrCreateAgent(request, isInsecure);
      const options = {
        agent,
        hostname: url.hostname,
        path: `${url.pathname}${url.search}`,
        port: url.port,
        method: request.method,
        headers: request.headers.toJSON({ preserveCase: true }),
        ...request.requestOverrides
      };
      return new Promise((resolve, reject) => {
        const req = isInsecure ? import_node_http2.default.request(options, resolve) : import_node_https2.default.request(options, resolve);
        req.once("error", (err) => {
          reject(
            new import_restError.RestError(err.message, { code: err.code ?? import_restError.RestError.REQUEST_SEND_ERROR, request })
          );
        });
        abortController.signal.addEventListener("abort", () => {
          const abortError = new import_AbortError.AbortError(
            "The operation was aborted. Rejecting from abort signal callback while making request."
          );
          req.destroy(abortError);
          reject(abortError);
        });
        if (body && isReadableStream(body)) {
          body.pipe(req);
        } else if (body) {
          if (typeof body === "string" || Buffer.isBuffer(body)) {
            req.end(body);
          } else if (isArrayBuffer(body)) {
            req.end(ArrayBuffer.isView(body) ? Buffer.from(body.buffer) : Buffer.from(body));
          } else {
            import_log.logger.error("Unrecognized body type", body);
            reject(new import_restError.RestError("Unrecognized body type"));
          }
        } else {
          req.end();
        }
      });
    }
    getOrCreateAgent(request, isInsecure) {
      const disableKeepAlive = request.disableKeepAlive;
      if (isInsecure) {
        if (disableKeepAlive) {
          return import_node_http2.default.globalAgent;
        }
        if (!this.cachedHttpAgent) {
          this.cachedHttpAgent = new import_node_http2.default.Agent({ keepAlive: true });
        }
        return this.cachedHttpAgent;
      } else {
        if (disableKeepAlive && !request.tlsSettings) {
          return import_node_https2.default.globalAgent;
        }
        const tlsSettings = request.tlsSettings ?? DEFAULT_TLS_SETTINGS;
        let agent = this.cachedHttpsAgents.get(tlsSettings);
        if (agent && agent.options.keepAlive === !disableKeepAlive) {
          return agent;
        }
        import_log.logger.info("No cached TLS Agent exist, creating a new Agent");
        agent = new import_node_https2.default.Agent({
          // keepAlive is true if disableKeepAlive is false.
          keepAlive: !disableKeepAlive,
          // Since we are spreading, if no tslSettings were provided, nothing is added to the agent options.
          ...tlsSettings
        });
        this.cachedHttpsAgents.set(tlsSettings, agent);
        return agent;
      }
    }
  }
  function getResponseHeaders(res) {
    const headers = (0, import_httpHeaders.createHttpHeaders)();
    for (const header of Object.keys(res.headers)) {
      const value = res.headers[header];
      if (Array.isArray(value)) {
        if (value.length > 0) {
          headers.set(header, value[0]);
        }
      } else if (value) {
        headers.set(header, value);
      }
    }
    return headers;
  }
  function getDecodedResponseStream(stream, headers) {
    const contentEncoding = headers.get("Content-Encoding");
    if (contentEncoding === "gzip") {
      const unzip = import_node_zlib2.default.createGunzip();
      stream.pipe(unzip);
      return unzip;
    } else if (contentEncoding === "deflate") {
      const inflate = import_node_zlib2.default.createInflate();
      stream.pipe(inflate);
      return inflate;
    }
    return stream;
  }
  function streamToText(stream) {
    return new Promise((resolve, reject) => {
      const buffer = [];
      stream.on("data", (chunk) => {
        if (Buffer.isBuffer(chunk)) {
          buffer.push(chunk);
        } else {
          buffer.push(Buffer.from(chunk));
        }
      });
      stream.on("end", () => {
        resolve(Buffer.concat(buffer).toString("utf8"));
      });
      stream.on("error", (e) => {
        if (e && e?.name === "AbortError") {
          reject(e);
        } else {
          reject(
            new import_restError.RestError(`Error reading response as text: ${e.message}`, {
              code: import_restError.RestError.PARSE_ERROR
            })
          );
        }
      });
    });
  }
  function getBodyLength(body) {
    if (!body) {
      return 0;
    } else if (Buffer.isBuffer(body)) {
      return body.length;
    } else if (isReadableStream(body)) {
      return null;
    } else if (isArrayBuffer(body)) {
      return body.byteLength;
    } else if (typeof body === "string") {
      return Buffer.from(body).length;
    } else {
      return null;
    }
  }
  function createNodeHttpClient() {
    return new NodeHttpClient();
  }
  return nodeHttpClient;
}
var defaultHttpClient;
var hasRequiredDefaultHttpClient;
function requireDefaultHttpClient() {
  if (hasRequiredDefaultHttpClient) return defaultHttpClient;
  hasRequiredDefaultHttpClient = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var defaultHttpClient_exports = {};
  __export(defaultHttpClient_exports, {
    createDefaultHttpClient: () => createDefaultHttpClient
  });
  defaultHttpClient = __toCommonJS(defaultHttpClient_exports);
  var import_nodeHttpClient = requireNodeHttpClient();
  function createDefaultHttpClient() {
    return (0, import_nodeHttpClient.createNodeHttpClient)();
  }
  return defaultHttpClient;
}
var logPolicy_1;
var hasRequiredLogPolicy;
function requireLogPolicy() {
  if (hasRequiredLogPolicy) return logPolicy_1;
  hasRequiredLogPolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var logPolicy_exports = {};
  __export(logPolicy_exports, {
    logPolicy: () => logPolicy,
    logPolicyName: () => logPolicyName
  });
  logPolicy_1 = __toCommonJS(logPolicy_exports);
  var import_log = requireLog();
  var import_sanitizer = requireSanitizer();
  const logPolicyName = "logPolicy";
  function logPolicy(options = {}) {
    const logger2 = options.logger ?? import_log.logger.info;
    const sanitizer2 = new import_sanitizer.Sanitizer({
      additionalAllowedHeaderNames: options.additionalAllowedHeaderNames,
      additionalAllowedQueryParameters: options.additionalAllowedQueryParameters
    });
    return {
      name: logPolicyName,
      async sendRequest(request, next) {
        if (!logger2.enabled) {
          return next(request);
        }
        logger2(`Request: ${sanitizer2.sanitize(request)}`);
        const response = await next(request);
        logger2(`Response status code: ${response.status}`);
        logger2(`Headers: ${sanitizer2.sanitize(response.headers)}`);
        return response;
      }
    };
  }
  return logPolicy_1;
}
var redirectPolicy_1;
var hasRequiredRedirectPolicy;
function requireRedirectPolicy() {
  if (hasRequiredRedirectPolicy) return redirectPolicy_1;
  hasRequiredRedirectPolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var redirectPolicy_exports = {};
  __export(redirectPolicy_exports, {
    redirectPolicy: () => redirectPolicy,
    redirectPolicyName: () => redirectPolicyName
  });
  redirectPolicy_1 = __toCommonJS(redirectPolicy_exports);
  var import_log = requireLog();
  const redirectPolicyName = "redirectPolicy";
  const allowedRedirect = ["GET", "HEAD"];
  function redirectPolicy(options = {}) {
    const { maxRetries = 20, allowCrossOriginRedirects = false } = options;
    return {
      name: redirectPolicyName,
      async sendRequest(request, next) {
        const response = await next(request);
        return handleRedirect(next, response, maxRetries, allowCrossOriginRedirects);
      }
    };
  }
  async function handleRedirect(next, response, maxRetries, allowCrossOriginRedirects, currentRetries = 0) {
    const { request, status, headers } = response;
    const locationHeader = headers.get("location");
    if (locationHeader && (status === 300 || status === 301 && allowedRedirect.includes(request.method) || status === 302 && allowedRedirect.includes(request.method) || status === 303 && request.method === "POST" || status === 307) && currentRetries < maxRetries) {
      const url = new URL(locationHeader, request.url);
      if (!allowCrossOriginRedirects) {
        const originalUrl = new URL(request.url);
        if (url.origin !== originalUrl.origin) {
          import_log.logger.verbose(
            `Skipping cross-origin redirect from ${originalUrl.origin} to ${url.origin}.`
          );
          return response;
        }
      }
      request.url = url.toString();
      if (status === 303) {
        request.method = "GET";
        request.headers.delete("Content-Length");
        delete request.body;
      }
      request.headers.delete("Authorization");
      const res = await next(request);
      return handleRedirect(next, res, maxRetries, allowCrossOriginRedirects, currentRetries + 1);
    }
    return response;
  }
  return redirectPolicy_1;
}
var userAgentPlatform;
var hasRequiredUserAgentPlatform;
function requireUserAgentPlatform() {
  if (hasRequiredUserAgentPlatform) return userAgentPlatform;
  hasRequiredUserAgentPlatform = 1;
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var userAgentPlatform_exports = {};
  __export(userAgentPlatform_exports, {
    getHeaderName: () => getHeaderName,
    setPlatformSpecificData: () => setPlatformSpecificData
  });
  userAgentPlatform = __toCommonJS(userAgentPlatform_exports);
  var import_node_os2 = __toESM(require$$0$1);
  var import_node_process2 = __toESM(process$1);
  function getHeaderName() {
    return "User-Agent";
  }
  async function setPlatformSpecificData(map) {
    if (import_node_process2.default && import_node_process2.default.versions) {
      const osInfo = `${import_node_os2.default.type()} ${import_node_os2.default.release()}; ${import_node_os2.default.arch()}`;
      if (import_node_process2.default.versions.bun) {
        map.set("Bun", `${import_node_process2.default.versions.bun} (${osInfo})`);
      } else if (import_node_process2.default.versions.deno) {
        map.set("Deno", `${import_node_process2.default.versions.deno} (${osInfo})`);
      } else if (import_node_process2.default.versions.node) {
        map.set("Node", `${import_node_process2.default.versions.node} (${osInfo})`);
      }
    }
  }
  return userAgentPlatform;
}
var constants;
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var constants_exports = {};
  __export(constants_exports, {
    DEFAULT_RETRY_POLICY_COUNT: () => DEFAULT_RETRY_POLICY_COUNT,
    SDK_VERSION: () => SDK_VERSION
  });
  constants = __toCommonJS(constants_exports);
  const SDK_VERSION = "0.3.5";
  const DEFAULT_RETRY_POLICY_COUNT = 3;
  return constants;
}
var userAgent;
var hasRequiredUserAgent;
function requireUserAgent() {
  if (hasRequiredUserAgent) return userAgent;
  hasRequiredUserAgent = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var userAgent_exports = {};
  __export(userAgent_exports, {
    getUserAgentHeaderName: () => getUserAgentHeaderName,
    getUserAgentValue: () => getUserAgentValue
  });
  userAgent = __toCommonJS(userAgent_exports);
  var import_userAgentPlatform = requireUserAgentPlatform();
  var import_constants = requireConstants();
  function getUserAgentString(telemetryInfo) {
    const parts = [];
    for (const [key, value] of telemetryInfo) {
      const token = value ? `${key}/${value}` : key;
      parts.push(token);
    }
    return parts.join(" ");
  }
  function getUserAgentHeaderName() {
    return (0, import_userAgentPlatform.getHeaderName)();
  }
  async function getUserAgentValue(prefix) {
    const runtimeInfo = /* @__PURE__ */ new Map();
    runtimeInfo.set("ts-http-runtime", import_constants.SDK_VERSION);
    await (0, import_userAgentPlatform.setPlatformSpecificData)(runtimeInfo);
    const defaultAgent = getUserAgentString(runtimeInfo);
    const userAgentValue = prefix ? `${prefix} ${defaultAgent}` : defaultAgent;
    return userAgentValue;
  }
  return userAgent;
}
var userAgentPolicy_1;
var hasRequiredUserAgentPolicy;
function requireUserAgentPolicy() {
  if (hasRequiredUserAgentPolicy) return userAgentPolicy_1;
  hasRequiredUserAgentPolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var userAgentPolicy_exports = {};
  __export(userAgentPolicy_exports, {
    userAgentPolicy: () => userAgentPolicy,
    userAgentPolicyName: () => userAgentPolicyName
  });
  userAgentPolicy_1 = __toCommonJS(userAgentPolicy_exports);
  var import_userAgent = requireUserAgent();
  const UserAgentHeaderName = (0, import_userAgent.getUserAgentHeaderName)();
  const userAgentPolicyName = "userAgentPolicy";
  function userAgentPolicy(options = {}) {
    const userAgentValue = (0, import_userAgent.getUserAgentValue)(options.userAgentPrefix);
    return {
      name: userAgentPolicyName,
      async sendRequest(request, next) {
        if (!request.headers.has(UserAgentHeaderName)) {
          request.headers.set(UserAgentHeaderName, await userAgentValue);
        }
        return next(request);
      }
    };
  }
  return userAgentPolicy_1;
}
var decompressResponsePolicy_1;
var hasRequiredDecompressResponsePolicy;
function requireDecompressResponsePolicy() {
  if (hasRequiredDecompressResponsePolicy) return decompressResponsePolicy_1;
  hasRequiredDecompressResponsePolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var decompressResponsePolicy_exports = {};
  __export(decompressResponsePolicy_exports, {
    decompressResponsePolicy: () => decompressResponsePolicy,
    decompressResponsePolicyName: () => decompressResponsePolicyName
  });
  decompressResponsePolicy_1 = __toCommonJS(decompressResponsePolicy_exports);
  const decompressResponsePolicyName = "decompressResponsePolicy";
  function decompressResponsePolicy() {
    return {
      name: decompressResponsePolicyName,
      async sendRequest(request, next) {
        if (request.method !== "HEAD") {
          request.headers.set("Accept-Encoding", "gzip,deflate");
        }
        return next(request);
      }
    };
  }
  return decompressResponsePolicy_1;
}
var helpers;
var hasRequiredHelpers;
function requireHelpers() {
  if (hasRequiredHelpers) return helpers;
  hasRequiredHelpers = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var helpers_exports = {};
  __export(helpers_exports, {
    delay: () => delay2,
    parseHeaderValueAsNumber: () => parseHeaderValueAsNumber
  });
  helpers = __toCommonJS(helpers_exports);
  var import_AbortError = requireAbortError();
  const StandardAbortMessage = "The operation was aborted.";
  function delay2(delayInMs, value, options) {
    return new Promise((resolve, reject) => {
      let timer = void 0;
      let onAborted = void 0;
      const rejectOnAbort = () => {
        return reject(
          new import_AbortError.AbortError(options?.abortErrorMsg ? options?.abortErrorMsg : StandardAbortMessage)
        );
      };
      const removeListeners = () => {
        if (options?.abortSignal && onAborted) {
          options.abortSignal.removeEventListener("abort", onAborted);
        }
      };
      onAborted = () => {
        if (timer) {
          clearTimeout(timer);
        }
        removeListeners();
        return rejectOnAbort();
      };
      if (options?.abortSignal && options.abortSignal.aborted) {
        return rejectOnAbort();
      }
      timer = setTimeout(() => {
        removeListeners();
        resolve(value);
      }, delayInMs);
      if (options?.abortSignal) {
        options.abortSignal.addEventListener("abort", onAborted);
      }
    });
  }
  function parseHeaderValueAsNumber(response, headerName) {
    const value = response.headers.get(headerName);
    if (!value) return;
    const valueAsNum = Number(value);
    if (Number.isNaN(valueAsNum)) return;
    return valueAsNum;
  }
  return helpers;
}
var throttlingRetryStrategy_1;
var hasRequiredThrottlingRetryStrategy;
function requireThrottlingRetryStrategy() {
  if (hasRequiredThrottlingRetryStrategy) return throttlingRetryStrategy_1;
  hasRequiredThrottlingRetryStrategy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var throttlingRetryStrategy_exports = {};
  __export(throttlingRetryStrategy_exports, {
    isThrottlingRetryResponse: () => isThrottlingRetryResponse,
    throttlingRetryStrategy: () => throttlingRetryStrategy
  });
  throttlingRetryStrategy_1 = __toCommonJS(throttlingRetryStrategy_exports);
  var import_helpers = requireHelpers();
  const RetryAfterHeader = "Retry-After";
  const AllRetryAfterHeaders = ["retry-after-ms", "x-ms-retry-after-ms", RetryAfterHeader];
  function getRetryAfterInMs(response) {
    if (!(response && [429, 503].includes(response.status))) return void 0;
    try {
      for (const header of AllRetryAfterHeaders) {
        const retryAfterValue = (0, import_helpers.parseHeaderValueAsNumber)(response, header);
        if (retryAfterValue === 0 || retryAfterValue) {
          const multiplyingFactor = header === RetryAfterHeader ? 1e3 : 1;
          return retryAfterValue * multiplyingFactor;
        }
      }
      const retryAfterHeader = response.headers.get(RetryAfterHeader);
      if (!retryAfterHeader) return;
      const date = Date.parse(retryAfterHeader);
      const diff = date - Date.now();
      return Number.isFinite(diff) ? Math.max(0, diff) : void 0;
    } catch {
      return void 0;
    }
  }
  function isThrottlingRetryResponse(response) {
    return Number.isFinite(getRetryAfterInMs(response));
  }
  function throttlingRetryStrategy() {
    return {
      name: "throttlingRetryStrategy",
      retry({ response }) {
        const retryAfterInMs = getRetryAfterInMs(response);
        if (!Number.isFinite(retryAfterInMs)) {
          return { skipStrategy: true };
        }
        return {
          retryAfterInMs
        };
      }
    };
  }
  return throttlingRetryStrategy_1;
}
var exponentialRetryStrategy_1;
var hasRequiredExponentialRetryStrategy;
function requireExponentialRetryStrategy() {
  if (hasRequiredExponentialRetryStrategy) return exponentialRetryStrategy_1;
  hasRequiredExponentialRetryStrategy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var exponentialRetryStrategy_exports = {};
  __export(exponentialRetryStrategy_exports, {
    exponentialRetryStrategy: () => exponentialRetryStrategy,
    isExponentialRetryResponse: () => isExponentialRetryResponse,
    isSystemError: () => isSystemError
  });
  exponentialRetryStrategy_1 = __toCommonJS(exponentialRetryStrategy_exports);
  var import_delay = requireDelay();
  var import_throttlingRetryStrategy = requireThrottlingRetryStrategy();
  const DEFAULT_CLIENT_RETRY_INTERVAL = 1e3;
  const DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1e3 * 64;
  function exponentialRetryStrategy(options = {}) {
    const retryInterval = options.retryDelayInMs ?? DEFAULT_CLIENT_RETRY_INTERVAL;
    const maxRetryInterval = options.maxRetryDelayInMs ?? DEFAULT_CLIENT_MAX_RETRY_INTERVAL;
    return {
      name: "exponentialRetryStrategy",
      retry({ retryCount, response, responseError }) {
        const matchedSystemError = isSystemError(responseError);
        const ignoreSystemErrors = matchedSystemError && options.ignoreSystemErrors;
        const isExponential = isExponentialRetryResponse(response);
        const ignoreExponentialResponse = isExponential && options.ignoreHttpStatusCodes;
        const unknownResponse = response && ((0, import_throttlingRetryStrategy.isThrottlingRetryResponse)(response) || !isExponential);
        if (unknownResponse || ignoreExponentialResponse || ignoreSystemErrors) {
          return { skipStrategy: true };
        }
        if (responseError && !matchedSystemError && !isExponential) {
          return { errorToThrow: responseError };
        }
        return (0, import_delay.calculateRetryDelay)(retryCount, {
          retryDelayInMs: retryInterval,
          maxRetryDelayInMs: maxRetryInterval
        });
      }
    };
  }
  function isExponentialRetryResponse(response) {
    return Boolean(
      response && response.status !== void 0 && (response.status >= 500 || response.status === 408) && response.status !== 501 && response.status !== 505
    );
  }
  function isSystemError(err) {
    if (!err) {
      return false;
    }
    return err.code === "ETIMEDOUT" || err.code === "ESOCKETTIMEDOUT" || err.code === "ECONNREFUSED" || err.code === "ECONNRESET" || err.code === "ENOENT" || err.code === "ENOTFOUND";
  }
  return exponentialRetryStrategy_1;
}
var retryPolicy_1;
var hasRequiredRetryPolicy;
function requireRetryPolicy() {
  if (hasRequiredRetryPolicy) return retryPolicy_1;
  hasRequiredRetryPolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var retryPolicy_exports = {};
  __export(retryPolicy_exports, {
    retryPolicy: () => retryPolicy
  });
  retryPolicy_1 = __toCommonJS(retryPolicy_exports);
  var import_helpers = requireHelpers();
  var import_restError = requireRestError$1();
  var import_AbortError = requireAbortError();
  var import_logger = requireLogger();
  var import_constants = requireConstants();
  const retryPolicyLogger = (0, import_logger.createClientLogger)("ts-http-runtime retryPolicy");
  const retryPolicyName = "retryPolicy";
  function retryPolicy(strategies, options = { maxRetries: import_constants.DEFAULT_RETRY_POLICY_COUNT }) {
    const logger2 = options.logger || retryPolicyLogger;
    return {
      name: retryPolicyName,
      async sendRequest(request, next) {
        let response;
        let responseError;
        let retryCount = -1;
        retryRequest: while (true) {
          retryCount += 1;
          response = void 0;
          responseError = void 0;
          try {
            logger2.info(`Retry ${retryCount}: Attempting to send request`, request.requestId);
            response = await next(request);
            logger2.info(`Retry ${retryCount}: Received a response from request`, request.requestId);
          } catch (e) {
            logger2.error(`Retry ${retryCount}: Received an error from request`, request.requestId);
            if (!(0, import_restError.isRestError)(e)) {
              throw e;
            }
            responseError = e;
            response = e.response;
          }
          if (request.abortSignal?.aborted) {
            logger2.error(`Retry ${retryCount}: Request aborted.`);
            const abortError = new import_AbortError.AbortError();
            throw abortError;
          }
          if (retryCount >= (options.maxRetries ?? import_constants.DEFAULT_RETRY_POLICY_COUNT)) {
            logger2.info(
              `Retry ${retryCount}: Maximum retries reached. Returning the last received response, or throwing the last received error.`
            );
            if (responseError) {
              throw responseError;
            } else if (response) {
              return response;
            } else {
              throw new Error("Maximum retries reached with no response or error to throw");
            }
          }
          logger2.info(`Retry ${retryCount}: Processing ${strategies.length} retry strategies.`);
          strategiesLoop: for (const strategy of strategies) {
            const strategyLogger = strategy.logger || logger2;
            strategyLogger.info(`Retry ${retryCount}: Processing retry strategy ${strategy.name}.`);
            const modifiers = strategy.retry({
              retryCount,
              response,
              responseError
            });
            if (modifiers.skipStrategy) {
              strategyLogger.info(`Retry ${retryCount}: Skipped.`);
              continue strategiesLoop;
            }
            const { errorToThrow, retryAfterInMs, redirectTo } = modifiers;
            if (errorToThrow) {
              strategyLogger.error(
                `Retry ${retryCount}: Retry strategy ${strategy.name} throws error:`,
                errorToThrow
              );
              throw errorToThrow;
            }
            if (retryAfterInMs || retryAfterInMs === 0) {
              strategyLogger.info(
                `Retry ${retryCount}: Retry strategy ${strategy.name} retries after ${retryAfterInMs}`
              );
              await (0, import_helpers.delay)(retryAfterInMs, void 0, { abortSignal: request.abortSignal });
              continue retryRequest;
            }
            if (redirectTo) {
              strategyLogger.info(
                `Retry ${retryCount}: Retry strategy ${strategy.name} redirects to ${redirectTo}`
              );
              request.url = redirectTo;
              continue retryRequest;
            }
          }
          if (responseError) {
            logger2.info(
              `None of the retry strategies could work with the received error. Throwing it.`
            );
            throw responseError;
          }
          if (response) {
            logger2.info(
              `None of the retry strategies could work with the received response. Returning it.`
            );
            return response;
          }
        }
      }
    };
  }
  return retryPolicy_1;
}
var defaultRetryPolicy_1;
var hasRequiredDefaultRetryPolicy;
function requireDefaultRetryPolicy() {
  if (hasRequiredDefaultRetryPolicy) return defaultRetryPolicy_1;
  hasRequiredDefaultRetryPolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var defaultRetryPolicy_exports = {};
  __export(defaultRetryPolicy_exports, {
    defaultRetryPolicy: () => defaultRetryPolicy,
    defaultRetryPolicyName: () => defaultRetryPolicyName
  });
  defaultRetryPolicy_1 = __toCommonJS(defaultRetryPolicy_exports);
  var import_exponentialRetryStrategy = requireExponentialRetryStrategy();
  var import_throttlingRetryStrategy = requireThrottlingRetryStrategy();
  var import_retryPolicy = requireRetryPolicy();
  var import_constants = requireConstants();
  const defaultRetryPolicyName = "defaultRetryPolicy";
  function defaultRetryPolicy(options = {}) {
    return {
      name: defaultRetryPolicyName,
      sendRequest: (0, import_retryPolicy.retryPolicy)([(0, import_throttlingRetryStrategy.throttlingRetryStrategy)(), (0, import_exponentialRetryStrategy.exponentialRetryStrategy)(options)], {
        maxRetries: options.maxRetries ?? import_constants.DEFAULT_RETRY_POLICY_COUNT
      }).sendRequest
    };
  }
  return defaultRetryPolicy_1;
}
var formDataPolicy_1;
var hasRequiredFormDataPolicy;
function requireFormDataPolicy() {
  if (hasRequiredFormDataPolicy) return formDataPolicy_1;
  hasRequiredFormDataPolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var formDataPolicy_exports = {};
  __export(formDataPolicy_exports, {
    formDataPolicy: () => formDataPolicy,
    formDataPolicyName: () => formDataPolicyName
  });
  formDataPolicy_1 = __toCommonJS(formDataPolicy_exports);
  var import_bytesEncoding = requireBytesEncoding();
  var import_checkEnvironment = requireCheckEnvironment();
  var import_httpHeaders = requireHttpHeaders();
  const formDataPolicyName = "formDataPolicy";
  function formDataToFormDataMap(formData) {
    const formDataMap = {};
    for (const [key, value] of formData.entries()) {
      formDataMap[key] ??= [];
      formDataMap[key].push(value);
    }
    return formDataMap;
  }
  function formDataPolicy() {
    return {
      name: formDataPolicyName,
      async sendRequest(request, next) {
        if (import_checkEnvironment.isNodeLike && typeof FormData !== "undefined" && request.body instanceof FormData) {
          request.formData = formDataToFormDataMap(request.body);
          request.body = void 0;
        }
        if (request.formData) {
          const contentType = request.headers.get("Content-Type");
          if (contentType && contentType.indexOf("application/x-www-form-urlencoded") !== -1) {
            request.body = wwwFormUrlEncode(request.formData);
          } else {
            await prepareFormData(request.formData, request);
          }
          request.formData = void 0;
        }
        return next(request);
      }
    };
  }
  function wwwFormUrlEncode(formData) {
    const urlSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)) {
      if (Array.isArray(value)) {
        for (const subValue of value) {
          urlSearchParams.append(key, subValue.toString());
        }
      } else {
        urlSearchParams.append(key, value.toString());
      }
    }
    return urlSearchParams.toString();
  }
  async function prepareFormData(formData, request) {
    const contentType = request.headers.get("Content-Type");
    if (contentType && !contentType.startsWith("multipart/form-data")) {
      return;
    }
    request.headers.set("Content-Type", contentType ?? "multipart/form-data");
    const parts = [];
    for (const [fieldName, values] of Object.entries(formData)) {
      for (const value of Array.isArray(values) ? values : [values]) {
        if (typeof value === "string") {
          parts.push({
            headers: (0, import_httpHeaders.createHttpHeaders)({
              "Content-Disposition": `form-data; name="${fieldName}"`
            }),
            body: (0, import_bytesEncoding.stringToUint8Array)(value, "utf-8")
          });
        } else if (value === void 0 || value === null || typeof value !== "object") {
          throw new Error(
            `Unexpected value for key ${fieldName}: ${value}. Value should be serialized to string first.`
          );
        } else {
          const fileName = value.name || "blob";
          const headers = (0, import_httpHeaders.createHttpHeaders)();
          headers.set(
            "Content-Disposition",
            `form-data; name="${fieldName}"; filename="${fileName}"`
          );
          headers.set("Content-Type", value.type || "application/octet-stream");
          parts.push({
            headers,
            body: value
          });
        }
      }
    }
    request.multipartBody = { parts };
  }
  return formDataPolicy_1;
}
var proxyPolicy_1;
var hasRequiredProxyPolicy;
function requireProxyPolicy() {
  if (hasRequiredProxyPolicy) return proxyPolicy_1;
  hasRequiredProxyPolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var proxyPolicy_exports = {};
  __export(proxyPolicy_exports, {
    getDefaultProxySettings: () => getDefaultProxySettings,
    globalNoProxyList: () => globalNoProxyList,
    loadNoProxy: () => loadNoProxy,
    proxyPolicy: () => proxyPolicy,
    proxyPolicyName: () => proxyPolicyName
  });
  proxyPolicy_1 = __toCommonJS(proxyPolicy_exports);
  var import_https_proxy_agent2 = requireDist();
  var import_http_proxy_agent2 = requireDist$1();
  var import_log = requireLog();
  const HTTPS_PROXY = "HTTPS_PROXY";
  const HTTP_PROXY = "HTTP_PROXY";
  const ALL_PROXY = "ALL_PROXY";
  const NO_PROXY = "NO_PROXY";
  const proxyPolicyName = "proxyPolicy";
  const globalNoProxyList = [];
  let noProxyListLoaded = false;
  const globalBypassedMap = /* @__PURE__ */ new Map();
  function getEnvironmentValue(name) {
    if (process.env[name]) {
      return process.env[name];
    } else if (process.env[name.toLowerCase()]) {
      return process.env[name.toLowerCase()];
    }
    return void 0;
  }
  function loadEnvironmentProxyValue() {
    if (!process) {
      return void 0;
    }
    const httpsProxy = getEnvironmentValue(HTTPS_PROXY);
    const allProxy = getEnvironmentValue(ALL_PROXY);
    const httpProxy = getEnvironmentValue(HTTP_PROXY);
    return httpsProxy || allProxy || httpProxy;
  }
  function isBypassed(uri, noProxyList, bypassedMap) {
    if (noProxyList.length === 0) {
      return false;
    }
    const host = new URL(uri).hostname;
    if (bypassedMap?.has(host)) {
      return bypassedMap.get(host);
    }
    let isBypassedFlag = false;
    for (const pattern of noProxyList) {
      if (pattern[0] === ".") {
        if (host.endsWith(pattern)) {
          isBypassedFlag = true;
        } else {
          if (host.length === pattern.length - 1 && host === pattern.slice(1)) {
            isBypassedFlag = true;
          }
        }
      } else {
        if (host === pattern) {
          isBypassedFlag = true;
        }
      }
    }
    bypassedMap?.set(host, isBypassedFlag);
    return isBypassedFlag;
  }
  function loadNoProxy() {
    const noProxy = getEnvironmentValue(NO_PROXY);
    noProxyListLoaded = true;
    if (noProxy) {
      return noProxy.split(",").map((item) => item.trim()).filter((item) => item.length);
    }
    return [];
  }
  function getDefaultProxySettings(proxyUrl) {
    if (!proxyUrl) {
      proxyUrl = loadEnvironmentProxyValue();
      if (!proxyUrl) {
        return void 0;
      }
    }
    const parsedUrl = new URL(proxyUrl);
    const schema = parsedUrl.protocol ? parsedUrl.protocol + "//" : "";
    return {
      host: schema + parsedUrl.hostname,
      port: Number.parseInt(parsedUrl.port || "80"),
      username: parsedUrl.username,
      password: parsedUrl.password
    };
  }
  function getDefaultProxySettingsInternal() {
    const envProxy = loadEnvironmentProxyValue();
    return envProxy ? new URL(envProxy) : void 0;
  }
  function getUrlFromProxySettings(settings) {
    let parsedProxyUrl;
    try {
      parsedProxyUrl = new URL(settings.host);
    } catch {
      throw new Error(
        `Expecting a valid host string in proxy settings, but found "${settings.host}".`
      );
    }
    parsedProxyUrl.port = String(settings.port);
    if (settings.username) {
      parsedProxyUrl.username = settings.username;
    }
    if (settings.password) {
      parsedProxyUrl.password = settings.password;
    }
    return parsedProxyUrl;
  }
  function setProxyAgentOnRequest(request, cachedAgents, proxyUrl) {
    if (request.agent) {
      return;
    }
    const url = new URL(request.url);
    const isInsecure = url.protocol !== "https:";
    if (request.tlsSettings) {
      import_log.logger.warning(
        "TLS settings are not supported in combination with custom Proxy, certificates provided to the client will be ignored."
      );
    }
    if (isInsecure) {
      if (!cachedAgents.httpProxyAgent) {
        cachedAgents.httpProxyAgent = new import_http_proxy_agent2.HttpProxyAgent(proxyUrl);
      }
      request.agent = cachedAgents.httpProxyAgent;
    } else {
      if (!cachedAgents.httpsProxyAgent) {
        cachedAgents.httpsProxyAgent = new import_https_proxy_agent2.HttpsProxyAgent(proxyUrl);
      }
      request.agent = cachedAgents.httpsProxyAgent;
    }
  }
  function proxyPolicy(proxySettings, options) {
    if (!noProxyListLoaded) {
      globalNoProxyList.push(...loadNoProxy());
    }
    const defaultProxy = proxySettings ? getUrlFromProxySettings(proxySettings) : getDefaultProxySettingsInternal();
    const cachedAgents = {};
    return {
      name: proxyPolicyName,
      async sendRequest(request, next) {
        if (!request.proxySettings && defaultProxy && !isBypassed(
          request.url,
          options?.customNoProxyList ?? globalNoProxyList,
          options?.customNoProxyList ? void 0 : globalBypassedMap
        )) {
          setProxyAgentOnRequest(request, cachedAgents, defaultProxy);
        } else if (request.proxySettings) {
          setProxyAgentOnRequest(
            request,
            cachedAgents,
            getUrlFromProxySettings(request.proxySettings)
          );
        }
        return next(request);
      }
    };
  }
  return proxyPolicy_1;
}
var agentPolicy_1;
var hasRequiredAgentPolicy;
function requireAgentPolicy() {
  if (hasRequiredAgentPolicy) return agentPolicy_1;
  hasRequiredAgentPolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var agentPolicy_exports = {};
  __export(agentPolicy_exports, {
    agentPolicy: () => agentPolicy,
    agentPolicyName: () => agentPolicyName
  });
  agentPolicy_1 = __toCommonJS(agentPolicy_exports);
  const agentPolicyName = "agentPolicy";
  function agentPolicy(agent) {
    return {
      name: agentPolicyName,
      sendRequest: async (req, next) => {
        if (!req.agent) {
          req.agent = agent;
        }
        return next(req);
      }
    };
  }
  return agentPolicy_1;
}
var tlsPolicy_1;
var hasRequiredTlsPolicy;
function requireTlsPolicy() {
  if (hasRequiredTlsPolicy) return tlsPolicy_1;
  hasRequiredTlsPolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var tlsPolicy_exports = {};
  __export(tlsPolicy_exports, {
    tlsPolicy: () => tlsPolicy,
    tlsPolicyName: () => tlsPolicyName
  });
  tlsPolicy_1 = __toCommonJS(tlsPolicy_exports);
  const tlsPolicyName = "tlsPolicy";
  function tlsPolicy(tlsSettings) {
    return {
      name: tlsPolicyName,
      sendRequest: async (req, next) => {
        if (!req.tlsSettings) {
          req.tlsSettings = tlsSettings;
        }
        return next(req);
      }
    };
  }
  return tlsPolicy_1;
}
var typeGuards;
var hasRequiredTypeGuards;
function requireTypeGuards() {
  if (hasRequiredTypeGuards) return typeGuards;
  hasRequiredTypeGuards = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var typeGuards_exports = {};
  __export(typeGuards_exports, {
    isBinaryBody: () => isBinaryBody,
    isBlob: () => isBlob,
    isNodeReadableStream: () => isNodeReadableStream,
    isReadableStream: () => isReadableStream,
    isWebReadableStream: () => isWebReadableStream
  });
  typeGuards = __toCommonJS(typeGuards_exports);
  function isNodeReadableStream(x) {
    return Boolean(x && typeof x["pipe"] === "function");
  }
  function isWebReadableStream(x) {
    return Boolean(
      x && typeof x.getReader === "function" && typeof x.tee === "function"
    );
  }
  function isBinaryBody(body) {
    return body !== void 0 && (body instanceof Uint8Array || isReadableStream(body) || typeof body === "function" || typeof Blob !== "undefined" && body instanceof Blob);
  }
  function isReadableStream(x) {
    return isNodeReadableStream(x) || isWebReadableStream(x);
  }
  function isBlob(x) {
    return typeof Blob !== "undefined" && x instanceof Blob;
  }
  return typeGuards;
}
var concat_1;
var hasRequiredConcat;
function requireConcat() {
  if (hasRequiredConcat) return concat_1;
  hasRequiredConcat = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var concat_exports = {};
  __export(concat_exports, {
    concat: () => concat
  });
  concat_1 = __toCommonJS(concat_exports);
  var import_stream2 = require$$0$3;
  var import_typeGuards = requireTypeGuards();
  async function* streamAsyncIterator() {
    const reader = this.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          return;
        }
        yield value;
      }
    } finally {
      reader.releaseLock();
    }
  }
  function makeAsyncIterable(webStream) {
    if (!webStream[Symbol.asyncIterator]) {
      webStream[Symbol.asyncIterator] = streamAsyncIterator.bind(webStream);
    }
    if (!webStream.values) {
      webStream.values = streamAsyncIterator.bind(webStream);
    }
  }
  function ensureNodeStream(stream) {
    if (stream instanceof ReadableStream) {
      makeAsyncIterable(stream);
      return import_stream2.Readable.fromWeb(stream);
    } else {
      return stream;
    }
  }
  function toStream(source) {
    if (source instanceof Uint8Array) {
      return import_stream2.Readable.from(Buffer.from(source));
    } else if ((0, import_typeGuards.isBlob)(source)) {
      return ensureNodeStream(source.stream());
    } else {
      return ensureNodeStream(source);
    }
  }
  async function concat(sources) {
    return function() {
      const streams = sources.map((x) => typeof x === "function" ? x() : x).map(toStream);
      return import_stream2.Readable.from(
        (async function* () {
          for (const stream of streams) {
            for await (const chunk of stream) {
              yield chunk;
            }
          }
        })()
      );
    };
  }
  return concat_1;
}
var multipartPolicy_1;
var hasRequiredMultipartPolicy;
function requireMultipartPolicy() {
  if (hasRequiredMultipartPolicy) return multipartPolicy_1;
  hasRequiredMultipartPolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var multipartPolicy_exports = {};
  __export(multipartPolicy_exports, {
    multipartPolicy: () => multipartPolicy,
    multipartPolicyName: () => multipartPolicyName
  });
  multipartPolicy_1 = __toCommonJS(multipartPolicy_exports);
  var import_bytesEncoding = requireBytesEncoding();
  var import_typeGuards = requireTypeGuards();
  var import_uuidUtils = requireUuidUtils();
  var import_concat = requireConcat();
  function generateBoundary() {
    return `----AzSDKFormBoundary${(0, import_uuidUtils.randomUUID)()}`;
  }
  function encodeHeaders(headers) {
    let result = "";
    for (const [key, value] of headers) {
      result += `${key}: ${value}\r
`;
    }
    return result;
  }
  function getLength(source) {
    if (source instanceof Uint8Array) {
      return source.byteLength;
    } else if ((0, import_typeGuards.isBlob)(source)) {
      return source.size === -1 ? void 0 : source.size;
    } else {
      return void 0;
    }
  }
  function getTotalLength(sources) {
    let total = 0;
    for (const source of sources) {
      const partLength = getLength(source);
      if (partLength === void 0) {
        return void 0;
      } else {
        total += partLength;
      }
    }
    return total;
  }
  async function buildRequestBody(request, parts, boundary) {
    const sources = [
      (0, import_bytesEncoding.stringToUint8Array)(`--${boundary}`, "utf-8"),
      ...parts.flatMap((part) => [
        (0, import_bytesEncoding.stringToUint8Array)("\r\n", "utf-8"),
        (0, import_bytesEncoding.stringToUint8Array)(encodeHeaders(part.headers), "utf-8"),
        (0, import_bytesEncoding.stringToUint8Array)("\r\n", "utf-8"),
        part.body,
        (0, import_bytesEncoding.stringToUint8Array)(`\r
--${boundary}`, "utf-8")
      ]),
      (0, import_bytesEncoding.stringToUint8Array)("--\r\n\r\n", "utf-8")
    ];
    const contentLength = getTotalLength(sources);
    if (contentLength) {
      request.headers.set("Content-Length", contentLength);
    }
    request.body = await (0, import_concat.concat)(sources);
  }
  const multipartPolicyName = "multipartPolicy";
  const maxBoundaryLength = 70;
  const validBoundaryCharacters = new Set(
    `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'()+,-./:=?`
  );
  function assertValidBoundary(boundary) {
    if (boundary.length > maxBoundaryLength) {
      throw new Error(`Multipart boundary "${boundary}" exceeds maximum length of 70 characters`);
    }
    if (Array.from(boundary).some((x) => !validBoundaryCharacters.has(x))) {
      throw new Error(`Multipart boundary "${boundary}" contains invalid characters`);
    }
  }
  function multipartPolicy() {
    return {
      name: multipartPolicyName,
      async sendRequest(request, next) {
        if (!request.multipartBody) {
          return next(request);
        }
        if (request.body) {
          throw new Error("multipartBody and regular body cannot be set at the same time");
        }
        let boundary = request.multipartBody.boundary;
        const contentTypeHeader = request.headers.get("Content-Type") ?? "multipart/mixed";
        const parsedHeader = contentTypeHeader.match(/^(multipart\/[^ ;]+)(?:; *boundary=(.+))?$/);
        if (!parsedHeader) {
          throw new Error(
            `Got multipart request body, but content-type header was not multipart: ${contentTypeHeader}`
          );
        }
        const [, contentType, parsedBoundary] = parsedHeader;
        if (parsedBoundary && boundary && parsedBoundary !== boundary) {
          throw new Error(
            `Multipart boundary was specified as ${parsedBoundary} in the header, but got ${boundary} in the request body`
          );
        }
        boundary ??= parsedBoundary;
        if (boundary) {
          assertValidBoundary(boundary);
        } else {
          boundary = generateBoundary();
        }
        request.headers.set("Content-Type", `${contentType}; boundary=${boundary}`);
        await buildRequestBody(request, request.multipartBody.parts, boundary);
        request.multipartBody = void 0;
        return next(request);
      }
    };
  }
  return multipartPolicy_1;
}
var createPipelineFromOptions_1;
var hasRequiredCreatePipelineFromOptions;
function requireCreatePipelineFromOptions() {
  if (hasRequiredCreatePipelineFromOptions) return createPipelineFromOptions_1;
  hasRequiredCreatePipelineFromOptions = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var createPipelineFromOptions_exports = {};
  __export(createPipelineFromOptions_exports, {
    createPipelineFromOptions: () => createPipelineFromOptions
  });
  createPipelineFromOptions_1 = __toCommonJS(createPipelineFromOptions_exports);
  var import_logPolicy = requireLogPolicy();
  var import_pipeline = requirePipeline();
  var import_redirectPolicy = requireRedirectPolicy();
  var import_userAgentPolicy = requireUserAgentPolicy();
  var import_decompressResponsePolicy = requireDecompressResponsePolicy();
  var import_defaultRetryPolicy = requireDefaultRetryPolicy();
  var import_formDataPolicy = requireFormDataPolicy();
  var import_checkEnvironment = requireCheckEnvironment();
  var import_proxyPolicy = requireProxyPolicy();
  var import_agentPolicy = requireAgentPolicy();
  var import_tlsPolicy = requireTlsPolicy();
  var import_multipartPolicy = requireMultipartPolicy();
  function createPipelineFromOptions(options) {
    const pipeline2 = (0, import_pipeline.createEmptyPipeline)();
    if (import_checkEnvironment.isNodeLike) {
      if (options.agent) {
        pipeline2.addPolicy((0, import_agentPolicy.agentPolicy)(options.agent));
      }
      if (options.tlsOptions) {
        pipeline2.addPolicy((0, import_tlsPolicy.tlsPolicy)(options.tlsOptions));
      }
      pipeline2.addPolicy((0, import_proxyPolicy.proxyPolicy)(options.proxyOptions));
      pipeline2.addPolicy((0, import_decompressResponsePolicy.decompressResponsePolicy)());
    }
    pipeline2.addPolicy((0, import_formDataPolicy.formDataPolicy)(), { beforePolicies: [import_multipartPolicy.multipartPolicyName] });
    pipeline2.addPolicy((0, import_userAgentPolicy.userAgentPolicy)(options.userAgentOptions));
    pipeline2.addPolicy((0, import_multipartPolicy.multipartPolicy)(), { afterPhase: "Deserialize" });
    pipeline2.addPolicy((0, import_defaultRetryPolicy.defaultRetryPolicy)(options.retryOptions), { phase: "Retry" });
    if (import_checkEnvironment.isNodeLike) {
      pipeline2.addPolicy((0, import_redirectPolicy.redirectPolicy)(options.redirectOptions), { afterPhase: "Retry" });
    }
    pipeline2.addPolicy((0, import_logPolicy.logPolicy)(options.loggingOptions), { afterPhase: "Sign" });
    return pipeline2;
  }
  return createPipelineFromOptions_1;
}
var apiVersionPolicy_1;
var hasRequiredApiVersionPolicy;
function requireApiVersionPolicy() {
  if (hasRequiredApiVersionPolicy) return apiVersionPolicy_1;
  hasRequiredApiVersionPolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var apiVersionPolicy_exports = {};
  __export(apiVersionPolicy_exports, {
    apiVersionPolicy: () => apiVersionPolicy,
    apiVersionPolicyName: () => apiVersionPolicyName
  });
  apiVersionPolicy_1 = __toCommonJS(apiVersionPolicy_exports);
  const apiVersionPolicyName = "ApiVersionPolicy";
  function apiVersionPolicy(options) {
    return {
      name: apiVersionPolicyName,
      sendRequest: (req, next) => {
        const url = new URL(req.url);
        if (!url.searchParams.get("api-version") && options.apiVersion) {
          req.url = `${req.url}${Array.from(url.searchParams.keys()).length > 0 ? "&" : "?"}api-version=${options.apiVersion}`;
        }
        return next(req);
      }
    };
  }
  return apiVersionPolicy_1;
}
var credentials;
var hasRequiredCredentials;
function requireCredentials() {
  if (hasRequiredCredentials) return credentials;
  hasRequiredCredentials = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var credentials_exports = {};
  __export(credentials_exports, {
    isApiKeyCredential: () => isApiKeyCredential,
    isBasicCredential: () => isBasicCredential,
    isBearerTokenCredential: () => isBearerTokenCredential,
    isOAuth2TokenCredential: () => isOAuth2TokenCredential
  });
  credentials = __toCommonJS(credentials_exports);
  function isOAuth2TokenCredential(credential) {
    return "getOAuth2Token" in credential;
  }
  function isBearerTokenCredential(credential) {
    return "getBearerToken" in credential;
  }
  function isBasicCredential(credential) {
    return "username" in credential && "password" in credential;
  }
  function isApiKeyCredential(credential) {
    return "key" in credential;
  }
  return credentials;
}
var checkInsecureConnection;
var hasRequiredCheckInsecureConnection;
function requireCheckInsecureConnection() {
  if (hasRequiredCheckInsecureConnection) return checkInsecureConnection;
  hasRequiredCheckInsecureConnection = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var checkInsecureConnection_exports = {};
  __export(checkInsecureConnection_exports, {
    ensureSecureConnection: () => ensureSecureConnection
  });
  checkInsecureConnection = __toCommonJS(checkInsecureConnection_exports);
  var import_log = requireLog();
  let insecureConnectionWarningEmmitted = false;
  function allowInsecureConnection(request, options) {
    if (options.allowInsecureConnection && request.allowInsecureConnection) {
      const url = new URL(request.url);
      if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
        return true;
      }
    }
    return false;
  }
  function emitInsecureConnectionWarning() {
    const warning = "Sending token over insecure transport. Assume any token issued is compromised.";
    import_log.logger.warning(warning);
    if (typeof process?.emitWarning === "function" && !insecureConnectionWarningEmmitted) {
      insecureConnectionWarningEmmitted = true;
      process.emitWarning(warning);
    }
  }
  function ensureSecureConnection(request, options) {
    if (!request.url.toLowerCase().startsWith("https://")) {
      if (allowInsecureConnection(request, options)) {
        emitInsecureConnectionWarning();
      } else {
        throw new Error(
          "Authentication is not permitted for non-TLS protected (non-https) URLs when allowInsecureConnection is false."
        );
      }
    }
  }
  return checkInsecureConnection;
}
var apiKeyAuthenticationPolicy_1;
var hasRequiredApiKeyAuthenticationPolicy;
function requireApiKeyAuthenticationPolicy() {
  if (hasRequiredApiKeyAuthenticationPolicy) return apiKeyAuthenticationPolicy_1;
  hasRequiredApiKeyAuthenticationPolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var apiKeyAuthenticationPolicy_exports = {};
  __export(apiKeyAuthenticationPolicy_exports, {
    apiKeyAuthenticationPolicy: () => apiKeyAuthenticationPolicy,
    apiKeyAuthenticationPolicyName: () => apiKeyAuthenticationPolicyName
  });
  apiKeyAuthenticationPolicy_1 = __toCommonJS(apiKeyAuthenticationPolicy_exports);
  var import_checkInsecureConnection = requireCheckInsecureConnection();
  const apiKeyAuthenticationPolicyName = "apiKeyAuthenticationPolicy";
  function apiKeyAuthenticationPolicy(options) {
    return {
      name: apiKeyAuthenticationPolicyName,
      async sendRequest(request, next) {
        (0, import_checkInsecureConnection.ensureSecureConnection)(request, options);
        const scheme = (request.authSchemes ?? options.authSchemes)?.find((x) => x.kind === "apiKey");
        if (!scheme) {
          return next(request);
        }
        if (scheme.apiKeyLocation !== "header") {
          throw new Error(`Unsupported API key location: ${scheme.apiKeyLocation}`);
        }
        request.headers.set(scheme.name, options.credential.key);
        return next(request);
      }
    };
  }
  return apiKeyAuthenticationPolicy_1;
}
var basicAuthenticationPolicy_1;
var hasRequiredBasicAuthenticationPolicy;
function requireBasicAuthenticationPolicy() {
  if (hasRequiredBasicAuthenticationPolicy) return basicAuthenticationPolicy_1;
  hasRequiredBasicAuthenticationPolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var basicAuthenticationPolicy_exports = {};
  __export(basicAuthenticationPolicy_exports, {
    basicAuthenticationPolicy: () => basicAuthenticationPolicy,
    basicAuthenticationPolicyName: () => basicAuthenticationPolicyName
  });
  basicAuthenticationPolicy_1 = __toCommonJS(basicAuthenticationPolicy_exports);
  var import_bytesEncoding = requireBytesEncoding();
  var import_checkInsecureConnection = requireCheckInsecureConnection();
  const basicAuthenticationPolicyName = "bearerAuthenticationPolicy";
  function basicAuthenticationPolicy(options) {
    return {
      name: basicAuthenticationPolicyName,
      async sendRequest(request, next) {
        (0, import_checkInsecureConnection.ensureSecureConnection)(request, options);
        const scheme = (request.authSchemes ?? options.authSchemes)?.find(
          (x) => x.kind === "http" && x.scheme === "basic"
        );
        if (!scheme) {
          return next(request);
        }
        const { username, password } = options.credential;
        const headerValue = (0, import_bytesEncoding.uint8ArrayToString)(
          (0, import_bytesEncoding.stringToUint8Array)(`${username}:${password}`, "utf-8"),
          "base64"
        );
        request.headers.set("Authorization", `Basic ${headerValue}`);
        return next(request);
      }
    };
  }
  return basicAuthenticationPolicy_1;
}
var bearerAuthenticationPolicy_1;
var hasRequiredBearerAuthenticationPolicy;
function requireBearerAuthenticationPolicy() {
  if (hasRequiredBearerAuthenticationPolicy) return bearerAuthenticationPolicy_1;
  hasRequiredBearerAuthenticationPolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var bearerAuthenticationPolicy_exports = {};
  __export(bearerAuthenticationPolicy_exports, {
    bearerAuthenticationPolicy: () => bearerAuthenticationPolicy,
    bearerAuthenticationPolicyName: () => bearerAuthenticationPolicyName
  });
  bearerAuthenticationPolicy_1 = __toCommonJS(bearerAuthenticationPolicy_exports);
  var import_checkInsecureConnection = requireCheckInsecureConnection();
  const bearerAuthenticationPolicyName = "bearerAuthenticationPolicy";
  function bearerAuthenticationPolicy(options) {
    return {
      name: bearerAuthenticationPolicyName,
      async sendRequest(request, next) {
        (0, import_checkInsecureConnection.ensureSecureConnection)(request, options);
        const scheme = (request.authSchemes ?? options.authSchemes)?.find(
          (x) => x.kind === "http" && x.scheme === "bearer"
        );
        if (!scheme) {
          return next(request);
        }
        const token = await options.credential.getBearerToken({
          abortSignal: request.abortSignal
        });
        request.headers.set("Authorization", `Bearer ${token}`);
        return next(request);
      }
    };
  }
  return bearerAuthenticationPolicy_1;
}
var oauth2AuthenticationPolicy_1;
var hasRequiredOauth2AuthenticationPolicy;
function requireOauth2AuthenticationPolicy() {
  if (hasRequiredOauth2AuthenticationPolicy) return oauth2AuthenticationPolicy_1;
  hasRequiredOauth2AuthenticationPolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var oauth2AuthenticationPolicy_exports = {};
  __export(oauth2AuthenticationPolicy_exports, {
    oauth2AuthenticationPolicy: () => oauth2AuthenticationPolicy,
    oauth2AuthenticationPolicyName: () => oauth2AuthenticationPolicyName
  });
  oauth2AuthenticationPolicy_1 = __toCommonJS(oauth2AuthenticationPolicy_exports);
  var import_checkInsecureConnection = requireCheckInsecureConnection();
  const oauth2AuthenticationPolicyName = "oauth2AuthenticationPolicy";
  function oauth2AuthenticationPolicy(options) {
    return {
      name: oauth2AuthenticationPolicyName,
      async sendRequest(request, next) {
        (0, import_checkInsecureConnection.ensureSecureConnection)(request, options);
        const scheme = (request.authSchemes ?? options.authSchemes)?.find((x) => x.kind === "oauth2");
        if (!scheme) {
          return next(request);
        }
        const token = await options.credential.getOAuth2Token(scheme.flows, {
          abortSignal: request.abortSignal
        });
        request.headers.set("Authorization", `Bearer ${token}`);
        return next(request);
      }
    };
  }
  return oauth2AuthenticationPolicy_1;
}
var clientHelpers;
var hasRequiredClientHelpers;
function requireClientHelpers() {
  if (hasRequiredClientHelpers) return clientHelpers;
  hasRequiredClientHelpers = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var clientHelpers_exports = {};
  __export(clientHelpers_exports, {
    createDefaultPipeline: () => createDefaultPipeline,
    getCachedDefaultHttpsClient: () => getCachedDefaultHttpsClient
  });
  clientHelpers = __toCommonJS(clientHelpers_exports);
  var import_defaultHttpClient = requireDefaultHttpClient();
  var import_createPipelineFromOptions = requireCreatePipelineFromOptions();
  var import_apiVersionPolicy = requireApiVersionPolicy();
  var import_credentials = requireCredentials();
  var import_apiKeyAuthenticationPolicy = requireApiKeyAuthenticationPolicy();
  var import_basicAuthenticationPolicy = requireBasicAuthenticationPolicy();
  var import_bearerAuthenticationPolicy = requireBearerAuthenticationPolicy();
  var import_oauth2AuthenticationPolicy = requireOauth2AuthenticationPolicy();
  let cachedHttpClient;
  function createDefaultPipeline(options = {}) {
    const pipeline2 = (0, import_createPipelineFromOptions.createPipelineFromOptions)(options);
    pipeline2.addPolicy((0, import_apiVersionPolicy.apiVersionPolicy)(options));
    const { credential, authSchemes, allowInsecureConnection } = options;
    if (credential) {
      if ((0, import_credentials.isApiKeyCredential)(credential)) {
        pipeline2.addPolicy(
          (0, import_apiKeyAuthenticationPolicy.apiKeyAuthenticationPolicy)({ authSchemes, credential, allowInsecureConnection })
        );
      } else if ((0, import_credentials.isBasicCredential)(credential)) {
        pipeline2.addPolicy(
          (0, import_basicAuthenticationPolicy.basicAuthenticationPolicy)({ authSchemes, credential, allowInsecureConnection })
        );
      } else if ((0, import_credentials.isBearerTokenCredential)(credential)) {
        pipeline2.addPolicy(
          (0, import_bearerAuthenticationPolicy.bearerAuthenticationPolicy)({ authSchemes, credential, allowInsecureConnection })
        );
      } else if ((0, import_credentials.isOAuth2TokenCredential)(credential)) {
        pipeline2.addPolicy(
          (0, import_oauth2AuthenticationPolicy.oauth2AuthenticationPolicy)({ authSchemes, credential, allowInsecureConnection })
        );
      }
    }
    return pipeline2;
  }
  function getCachedDefaultHttpsClient() {
    if (!cachedHttpClient) {
      cachedHttpClient = (0, import_defaultHttpClient.createDefaultHttpClient)();
    }
    return cachedHttpClient;
  }
  return clientHelpers;
}
var multipart;
var hasRequiredMultipart;
function requireMultipart() {
  if (hasRequiredMultipart) return multipart;
  hasRequiredMultipart = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var multipart_exports = {};
  __export(multipart_exports, {
    buildBodyPart: () => buildBodyPart,
    buildMultipartBody: () => buildMultipartBody
  });
  multipart = __toCommonJS(multipart_exports);
  var import_restError = requireRestError$1();
  var import_httpHeaders = requireHttpHeaders();
  var import_bytesEncoding = requireBytesEncoding();
  var import_typeGuards = requireTypeGuards();
  function getHeaderValue(descriptor, headerName) {
    if (descriptor.headers) {
      const actualHeaderName = Object.keys(descriptor.headers).find(
        (x) => x.toLowerCase() === headerName.toLowerCase()
      );
      if (actualHeaderName) {
        return descriptor.headers[actualHeaderName];
      }
    }
    return void 0;
  }
  function getPartContentType(descriptor) {
    const contentTypeHeader = getHeaderValue(descriptor, "content-type");
    if (contentTypeHeader) {
      return contentTypeHeader;
    }
    if (descriptor.contentType === null) {
      return void 0;
    }
    if (descriptor.contentType) {
      return descriptor.contentType;
    }
    const { body } = descriptor;
    if (body === null || body === void 0) {
      return void 0;
    }
    if (typeof body === "string" || typeof body === "number" || typeof body === "boolean") {
      return "text/plain; charset=UTF-8";
    }
    if (body instanceof Blob) {
      return body.type || "application/octet-stream";
    }
    if ((0, import_typeGuards.isBinaryBody)(body)) {
      return "application/octet-stream";
    }
    return "application/json";
  }
  function escapeDispositionField(value) {
    return JSON.stringify(value);
  }
  function getContentDisposition(descriptor) {
    const contentDispositionHeader = getHeaderValue(descriptor, "content-disposition");
    if (contentDispositionHeader) {
      return contentDispositionHeader;
    }
    if (descriptor.dispositionType === void 0 && descriptor.name === void 0 && descriptor.filename === void 0) {
      return void 0;
    }
    const dispositionType = descriptor.dispositionType ?? "form-data";
    let disposition = dispositionType;
    if (descriptor.name) {
      disposition += `; name=${escapeDispositionField(descriptor.name)}`;
    }
    let filename = void 0;
    if (descriptor.filename) {
      filename = descriptor.filename;
    } else if (typeof File !== "undefined" && descriptor.body instanceof File) {
      const filenameFromFile = descriptor.body.name;
      if (filenameFromFile !== "") {
        filename = filenameFromFile;
      }
    }
    if (filename) {
      disposition += `; filename=${escapeDispositionField(filename)}`;
    }
    return disposition;
  }
  function normalizeBody(body, contentType) {
    if (body === void 0) {
      return new Uint8Array([]);
    }
    if ((0, import_typeGuards.isBinaryBody)(body)) {
      return body;
    }
    if (typeof body === "string" || typeof body === "number" || typeof body === "boolean") {
      return (0, import_bytesEncoding.stringToUint8Array)(String(body), "utf-8");
    }
    if (contentType && /application\/(.+\+)?json(;.+)?/i.test(String(contentType))) {
      return (0, import_bytesEncoding.stringToUint8Array)(JSON.stringify(body), "utf-8");
    }
    throw new import_restError.RestError(`Unsupported body/content-type combination: ${body}, ${contentType}`);
  }
  function buildBodyPart(descriptor) {
    const contentType = getPartContentType(descriptor);
    const contentDisposition = getContentDisposition(descriptor);
    const headers = (0, import_httpHeaders.createHttpHeaders)(descriptor.headers ?? {});
    if (contentType) {
      headers.set("content-type", contentType);
    }
    if (contentDisposition) {
      headers.set("content-disposition", contentDisposition);
    }
    const body = normalizeBody(descriptor.body, contentType);
    return {
      headers,
      body
    };
  }
  function buildMultipartBody(parts) {
    return { parts: parts.map(buildBodyPart) };
  }
  return multipart;
}
var sendRequest_1;
var hasRequiredSendRequest;
function requireSendRequest() {
  if (hasRequiredSendRequest) return sendRequest_1;
  hasRequiredSendRequest = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var sendRequest_exports = {};
  __export(sendRequest_exports, {
    getRequestBody: () => getRequestBody,
    sendRequest: () => sendRequest
  });
  sendRequest_1 = __toCommonJS(sendRequest_exports);
  var import_restError = requireRestError$1();
  var import_httpHeaders = requireHttpHeaders();
  var import_pipelineRequest = requirePipelineRequest();
  var import_clientHelpers = requireClientHelpers();
  var import_typeGuards = requireTypeGuards();
  var import_multipart = requireMultipart();
  async function sendRequest(method, url, pipeline2, options = {}, customHttpClient) {
    const httpClient = customHttpClient ?? (0, import_clientHelpers.getCachedDefaultHttpsClient)();
    const request = buildPipelineRequest(method, url, options);
    try {
      const response = await pipeline2.sendRequest(httpClient, request);
      const headers = response.headers.toJSON();
      const stream = response.readableStreamBody ?? response.browserStreamBody;
      const parsedBody = options.responseAsStream || stream !== void 0 ? void 0 : getResponseBody(response);
      const body = stream ?? parsedBody;
      if (options?.onResponse) {
        options.onResponse({ ...response, request, rawHeaders: headers, parsedBody });
      }
      return {
        request,
        headers,
        status: `${response.status}`,
        body
      };
    } catch (e) {
      if ((0, import_restError.isRestError)(e) && e.response && options.onResponse) {
        const { response } = e;
        const rawHeaders = response.headers.toJSON();
        options?.onResponse({ ...response, request, rawHeaders }, e);
      }
      throw e;
    }
  }
  function getRequestContentType(options = {}) {
    if (options.contentType) {
      return options.contentType;
    }
    const headerContentType = options.headers?.["content-type"];
    if (typeof headerContentType === "string") {
      return headerContentType;
    }
    return getContentType(options.body);
  }
  function getContentType(body) {
    if (body === void 0) {
      return void 0;
    }
    if (ArrayBuffer.isView(body)) {
      return "application/octet-stream";
    }
    if ((0, import_typeGuards.isBlob)(body) && body.type) {
      return body.type;
    }
    if (typeof body === "string") {
      try {
        JSON.parse(body);
        return "application/json";
      } catch (error2) {
        return void 0;
      }
    }
    return "application/json";
  }
  function buildPipelineRequest(method, url, options = {}) {
    const requestContentType = getRequestContentType(options);
    const { body, multipartBody } = getRequestBody(options.body, requestContentType);
    const headers = (0, import_httpHeaders.createHttpHeaders)({
      ...options.headers ? options.headers : {},
      accept: options.accept ?? options.headers?.accept ?? "application/json",
      ...requestContentType && {
        "content-type": requestContentType
      }
    });
    return (0, import_pipelineRequest.createPipelineRequest)({
      url,
      method,
      body,
      multipartBody,
      headers,
      allowInsecureConnection: options.allowInsecureConnection,
      abortSignal: options.abortSignal,
      onUploadProgress: options.onUploadProgress,
      onDownloadProgress: options.onDownloadProgress,
      timeout: options.timeout,
      enableBrowserStreams: true,
      streamResponseStatusCodes: options.responseAsStream ? /* @__PURE__ */ new Set([Number.POSITIVE_INFINITY]) : void 0
    });
  }
  function getRequestBody(body, contentType = "") {
    if (body === void 0) {
      return { body: void 0 };
    }
    if (typeof FormData !== "undefined" && body instanceof FormData) {
      return { body };
    }
    if ((0, import_typeGuards.isBlob)(body)) {
      return { body };
    }
    if ((0, import_typeGuards.isReadableStream)(body)) {
      return { body };
    }
    if (typeof body === "function") {
      return { body };
    }
    if (ArrayBuffer.isView(body)) {
      return { body: body instanceof Uint8Array ? body : JSON.stringify(body) };
    }
    const firstType = contentType.split(";")[0];
    switch (firstType) {
      case "application/json":
        return { body: JSON.stringify(body) };
      case "multipart/form-data":
        if (Array.isArray(body)) {
          return { multipartBody: (0, import_multipart.buildMultipartBody)(body) };
        }
        return { body: JSON.stringify(body) };
      case "text/plain":
        return { body: String(body) };
      default:
        if (typeof body === "string") {
          return { body };
        }
        return { body: JSON.stringify(body) };
    }
  }
  function getResponseBody(response) {
    const contentType = response.headers.get("content-type") ?? "";
    const firstType = contentType.split(";")[0];
    const bodyToParse = response.bodyAsText ?? "";
    if (firstType === "text/plain") {
      return String(bodyToParse);
    }
    try {
      return bodyToParse ? JSON.parse(bodyToParse) : void 0;
    } catch (error2) {
      if (firstType === "application/json") {
        throw createParseError(response, error2);
      }
      return String(bodyToParse);
    }
  }
  function createParseError(response, err) {
    const msg = `Error "${err}" occurred while parsing the response body - ${response.bodyAsText}.`;
    const errCode = err.code ?? import_restError.RestError.PARSE_ERROR;
    return new import_restError.RestError(msg, {
      code: errCode,
      statusCode: response.status,
      request: response.request,
      response
    });
  }
  return sendRequest_1;
}
var urlHelpers;
var hasRequiredUrlHelpers;
function requireUrlHelpers() {
  if (hasRequiredUrlHelpers) return urlHelpers;
  hasRequiredUrlHelpers = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var urlHelpers_exports = {};
  __export(urlHelpers_exports, {
    appendQueryParams: () => appendQueryParams,
    buildBaseUrl: () => buildBaseUrl,
    buildRequestUrl: () => buildRequestUrl,
    replaceAll: () => replaceAll
  });
  urlHelpers = __toCommonJS(urlHelpers_exports);
  function isQueryParameterWithOptions(x) {
    if (typeof x !== "object" || x === null || !Object.hasOwn(x, "value")) {
      return false;
    }
    const value = x.value;
    return typeof value?.toString === "function";
  }
  function buildRequestUrl(endpoint, routePath, pathParameters, options = {}) {
    if (routePath.startsWith("https://") || routePath.startsWith("http://")) {
      return routePath;
    }
    endpoint = buildBaseUrl(endpoint, options);
    const updatedRoutePath = buildRoutePath(routePath, pathParameters, options);
    const requestUrl = appendQueryParams(appendPath(endpoint, updatedRoutePath), options);
    const url = new URL(requestUrl);
    return url.toString();
  }
  function appendPath(endpoint, pathToAppend) {
    const endpointSearchStart = endpoint.indexOf("?");
    const pathSearchStart = pathToAppend.indexOf("?");
    const endpointParts = endpointSearchStart !== -1 ? [endpoint.substring(0, endpointSearchStart), endpoint.substring(endpointSearchStart + 1)] : [endpoint, ""];
    const pathParts = pathSearchStart !== -1 ? [pathToAppend.substring(0, pathSearchStart), pathToAppend.substring(pathSearchStart + 1)] : [pathToAppend, ""];
    const combinedSearch = [endpointParts[1], pathParts[1].replaceAll("?", "&")].filter(Boolean).join("&");
    const baseEndpoint = endpointParts[0].replace(/(^[^:]+:\/\/[^/]+)\/\/+/, "$1/");
    const basePathToAppend = pathParts[0];
    let combinedUrl = baseEndpoint;
    if (!baseEndpoint.endsWith("/") && !basePathToAppend.startsWith("/") && basePathToAppend !== "") {
      combinedUrl += `/${basePathToAppend}`;
    } else if (baseEndpoint.endsWith("/") && basePathToAppend.startsWith("/")) {
      combinedUrl += basePathToAppend.substring(1);
    } else {
      combinedUrl += basePathToAppend;
    }
    if (combinedSearch) {
      combinedUrl += `?${combinedSearch}`;
    }
    return combinedUrl;
  }
  function getQueryParamValue(key, allowReserved, style, param) {
    let separator;
    if (style === "pipeDelimited") {
      separator = "|";
    } else if (style === "spaceDelimited") {
      separator = "%20";
    } else {
      separator = ",";
    }
    let paramValues;
    if (Array.isArray(param)) {
      paramValues = param;
    } else if (typeof param === "object" && param.toString === Object.prototype.toString) {
      paramValues = Object.entries(param).flat();
    } else {
      paramValues = [param];
    }
    const value = paramValues.map((p) => {
      if (p === null || p === void 0) {
        return "";
      }
      if (!p.toString || typeof p.toString !== "function") {
        throw new Error(`Query parameters must be able to be represented as string, ${key} can't`);
      }
      const rawValue = p.toISOString !== void 0 ? p.toISOString() : p.toString();
      return allowReserved ? rawValue : encodeURIComponent(rawValue);
    }).join(separator);
    return `${allowReserved ? key : encodeURIComponent(key)}=${value}`;
  }
  function simpleParseQueryParams(queryString) {
    const result = /* @__PURE__ */ new Map();
    if (!queryString || queryString[0] !== "?") {
      return result;
    }
    queryString = queryString.slice(1);
    const pairs = queryString.split("&");
    for (const pair of pairs) {
      const eqIndex = pair.indexOf("=");
      const name = eqIndex === -1 ? pair : pair.substring(0, eqIndex);
      const value = eqIndex === -1 ? "" : pair.substring(eqIndex + 1);
      const existingValue = result.get(name);
      if (existingValue !== void 0) {
        if (Array.isArray(existingValue)) {
          existingValue.push(value);
        } else {
          result.set(name, [existingValue, value]);
        }
      } else {
        result.set(name, value);
      }
    }
    return result;
  }
  function appendQueryParams(url, options = {}) {
    if (!options.queryParameters) {
      return url;
    }
    const parsedUrl = new URL(url);
    const queryParams = options.queryParameters;
    const existingParams = simpleParseQueryParams(parsedUrl.search);
    const newParamStrings = [];
    for (const key of Object.keys(queryParams)) {
      const param = queryParams[key];
      if (param === void 0 || param === null) {
        continue;
      }
      const hasMetadata = isQueryParameterWithOptions(param);
      const rawValue = hasMetadata ? param.value : param;
      const explode = hasMetadata ? param.explode ?? false : false;
      const style = hasMetadata && param.style ? param.style : "form";
      if (explode) {
        if (Array.isArray(rawValue)) {
          for (const item of rawValue) {
            newParamStrings.push(
              getQueryParamValue(key, options.skipUrlEncoding ?? false, style, item)
            );
          }
        } else if (rawValue !== null && typeof rawValue === "object") {
          for (const [actualKey, value] of Object.entries(rawValue)) {
            newParamStrings.push(
              getQueryParamValue(actualKey, options.skipUrlEncoding ?? false, style, value)
            );
          }
        } else {
          throw new Error("explode can only be set to true for objects and arrays");
        }
      } else {
        newParamStrings.push(
          getQueryParamValue(key, options.skipUrlEncoding ?? false, style, rawValue)
        );
      }
    }
    for (const paramString of newParamStrings) {
      const eqIndex = paramString.indexOf("=");
      const name = paramString.substring(0, eqIndex);
      const value = paramString.substring(eqIndex + 1);
      const existingValue = existingParams.get(name);
      if (existingValue !== void 0) {
        if (Array.isArray(existingValue)) {
          if (!existingValue.includes(value)) {
            existingValue.push(value);
          }
        } else if (existingValue !== value) {
          existingParams.set(name, [existingValue, value]);
        }
      } else {
        existingParams.set(name, value);
      }
    }
    const searchPieces = [];
    for (const [name, value] of existingParams) {
      if (Array.isArray(value)) {
        for (const subValue of value) {
          searchPieces.push(`${name}=${subValue}`);
        }
      } else {
        searchPieces.push(`${name}=${value}`);
      }
    }
    parsedUrl.search = searchPieces.length ? `?${searchPieces.join("&")}` : "";
    return parsedUrl.toString();
  }
  function buildBaseUrl(endpoint, options) {
    if (!options.pathParameters) {
      return endpoint;
    }
    const pathParams = options.pathParameters;
    for (const [key, param] of Object.entries(pathParams)) {
      if (param === void 0 || param === null) {
        throw new Error(`Path parameters ${key} must not be undefined or null`);
      }
      if (!param.toString || typeof param.toString !== "function") {
        throw new Error(`Path parameters must be able to be represented as string, ${key} can't`);
      }
      let value = param.toISOString !== void 0 ? param.toISOString() : String(param);
      if (!options.skipUrlEncoding) {
        value = encodeURIComponent(param);
      }
      endpoint = replaceAll(endpoint, `{${key}}`, value) ?? "";
    }
    return endpoint;
  }
  function buildRoutePath(routePath, pathParameters, options = {}) {
    for (const pathParam of pathParameters) {
      const allowReserved = typeof pathParam === "object" && (pathParam.allowReserved ?? false);
      let value = typeof pathParam === "object" ? pathParam.value : pathParam;
      if (!options.skipUrlEncoding && !allowReserved) {
        value = encodeURIComponent(value);
      }
      routePath = routePath.replace(/\{[\w-]+\}/, String(value));
    }
    return routePath;
  }
  function replaceAll(value, searchValue, replaceValue) {
    return !value || !searchValue ? value : value.split(searchValue).join(replaceValue || "");
  }
  return urlHelpers;
}
var getClient_1;
var hasRequiredGetClient;
function requireGetClient() {
  if (hasRequiredGetClient) return getClient_1;
  hasRequiredGetClient = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var getClient_exports = {};
  __export(getClient_exports, {
    getClient: () => getClient
  });
  getClient_1 = __toCommonJS(getClient_exports);
  var import_clientHelpers = requireClientHelpers();
  var import_sendRequest = requireSendRequest();
  var import_urlHelpers = requireUrlHelpers();
  var import_checkEnvironment = requireCheckEnvironment();
  function getClient(endpoint, clientOptions = {}) {
    const pipeline2 = clientOptions.pipeline ?? (0, import_clientHelpers.createDefaultPipeline)(clientOptions);
    if (clientOptions.additionalPolicies?.length) {
      for (const { policy, position } of clientOptions.additionalPolicies) {
        const afterPhase = position === "perRetry" ? "Sign" : void 0;
        pipeline2.addPolicy(policy, {
          afterPhase
        });
      }
    }
    const { allowInsecureConnection, httpClient } = clientOptions;
    const endpointUrl = clientOptions.endpoint ?? endpoint;
    const client = (path, ...args) => {
      const getUrl = (requestOptions) => (0, import_urlHelpers.buildRequestUrl)(endpointUrl, path, args, { allowInsecureConnection, ...requestOptions });
      return {
        get: (requestOptions = {}) => {
          return buildOperation(
            "GET",
            getUrl(requestOptions),
            pipeline2,
            requestOptions,
            allowInsecureConnection,
            httpClient
          );
        },
        post: (requestOptions = {}) => {
          return buildOperation(
            "POST",
            getUrl(requestOptions),
            pipeline2,
            requestOptions,
            allowInsecureConnection,
            httpClient
          );
        },
        put: (requestOptions = {}) => {
          return buildOperation(
            "PUT",
            getUrl(requestOptions),
            pipeline2,
            requestOptions,
            allowInsecureConnection,
            httpClient
          );
        },
        patch: (requestOptions = {}) => {
          return buildOperation(
            "PATCH",
            getUrl(requestOptions),
            pipeline2,
            requestOptions,
            allowInsecureConnection,
            httpClient
          );
        },
        delete: (requestOptions = {}) => {
          return buildOperation(
            "DELETE",
            getUrl(requestOptions),
            pipeline2,
            requestOptions,
            allowInsecureConnection,
            httpClient
          );
        },
        head: (requestOptions = {}) => {
          return buildOperation(
            "HEAD",
            getUrl(requestOptions),
            pipeline2,
            requestOptions,
            allowInsecureConnection,
            httpClient
          );
        },
        options: (requestOptions = {}) => {
          return buildOperation(
            "OPTIONS",
            getUrl(requestOptions),
            pipeline2,
            requestOptions,
            allowInsecureConnection,
            httpClient
          );
        },
        trace: (requestOptions = {}) => {
          return buildOperation(
            "TRACE",
            getUrl(requestOptions),
            pipeline2,
            requestOptions,
            allowInsecureConnection,
            httpClient
          );
        }
      };
    };
    return {
      path: client,
      pathUnchecked: client,
      pipeline: pipeline2
    };
  }
  function buildOperation(method, url, pipeline2, options, allowInsecureConnection, httpClient) {
    allowInsecureConnection = options.allowInsecureConnection ?? allowInsecureConnection;
    return {
      then: function(onFulfilled, onrejected) {
        return (0, import_sendRequest.sendRequest)(
          method,
          url,
          pipeline2,
          { ...options, allowInsecureConnection },
          httpClient
        ).then(onFulfilled, onrejected);
      },
      async asBrowserStream() {
        if (import_checkEnvironment.isNodeLike) {
          throw new Error(
            "`asBrowserStream` is supported only in the browser environment. Use `asNodeStream` instead to obtain the response body stream. If you require a Web stream of the response in Node, consider using `Readable.toWeb` on the result of `asNodeStream`."
          );
        } else {
          return (0, import_sendRequest.sendRequest)(
            method,
            url,
            pipeline2,
            { ...options, allowInsecureConnection, responseAsStream: true },
            httpClient
          );
        }
      },
      async asNodeStream() {
        if (import_checkEnvironment.isNodeLike) {
          return (0, import_sendRequest.sendRequest)(
            method,
            url,
            pipeline2,
            { ...options, allowInsecureConnection, responseAsStream: true },
            httpClient
          );
        } else {
          throw new Error(
            "`isNodeStream` is not supported in the browser environment. Use `asBrowserStream` to obtain the response body stream."
          );
        }
      }
    };
  }
  return getClient_1;
}
var operationOptionHelpers;
var hasRequiredOperationOptionHelpers;
function requireOperationOptionHelpers() {
  if (hasRequiredOperationOptionHelpers) return operationOptionHelpers;
  hasRequiredOperationOptionHelpers = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var operationOptionHelpers_exports = {};
  __export(operationOptionHelpers_exports, {
    operationOptionsToRequestParameters: () => operationOptionsToRequestParameters
  });
  operationOptionHelpers = __toCommonJS(operationOptionHelpers_exports);
  function operationOptionsToRequestParameters(options) {
    return {
      allowInsecureConnection: options.requestOptions?.allowInsecureConnection,
      timeout: options.requestOptions?.timeout,
      skipUrlEncoding: options.requestOptions?.skipUrlEncoding,
      abortSignal: options.abortSignal,
      onUploadProgress: options.requestOptions?.onUploadProgress,
      onDownloadProgress: options.requestOptions?.onDownloadProgress,
      headers: { ...options.requestOptions?.headers },
      onResponse: options.onResponse
    };
  }
  return operationOptionHelpers;
}
var restError;
var hasRequiredRestError;
function requireRestError() {
  if (hasRequiredRestError) return restError;
  hasRequiredRestError = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var restError_exports = {};
  __export(restError_exports, {
    createRestError: () => createRestError
  });
  restError = __toCommonJS(restError_exports);
  var import_restError = requireRestError$1();
  var import_httpHeaders = requireHttpHeaders();
  function createRestError(messageOrResponse, response) {
    const resp = typeof messageOrResponse === "string" ? response : messageOrResponse;
    const internalError = resp.body?.error ?? resp.body;
    const message = typeof messageOrResponse === "string" ? messageOrResponse : internalError?.message ?? `Unexpected status code: ${resp.status}`;
    return new import_restError.RestError(message, {
      statusCode: statusCodeToNumber(resp.status),
      code: internalError?.code,
      request: resp.request,
      response: toPipelineResponse(resp)
    });
  }
  function toPipelineResponse(response) {
    return {
      headers: (0, import_httpHeaders.createHttpHeaders)(response.headers),
      request: response.request,
      status: statusCodeToNumber(response.status) ?? -1
    };
  }
  function statusCodeToNumber(statusCode) {
    const status = Number.parseInt(statusCode);
    return Number.isNaN(status) ? void 0 : status;
  }
  return restError;
}
var commonjs;
var hasRequiredCommonjs;
function requireCommonjs() {
  if (hasRequiredCommonjs) return commonjs;
  hasRequiredCommonjs = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var src_exports = {};
  __export(src_exports, {
    AbortError: () => import_AbortError.AbortError,
    RestError: () => import_restError.RestError,
    TypeSpecRuntimeLogger: () => import_logger.TypeSpecRuntimeLogger,
    createClientLogger: () => import_logger.createClientLogger,
    createDefaultHttpClient: () => import_defaultHttpClient.createDefaultHttpClient,
    createEmptyPipeline: () => import_pipeline.createEmptyPipeline,
    createHttpHeaders: () => import_httpHeaders.createHttpHeaders,
    createPipelineRequest: () => import_pipelineRequest.createPipelineRequest,
    createRestError: () => import_restError2.createRestError,
    getClient: () => import_getClient.getClient,
    getLogLevel: () => import_logger.getLogLevel,
    isRestError: () => import_restError.isRestError,
    operationOptionsToRequestParameters: () => import_operationOptionHelpers.operationOptionsToRequestParameters,
    setLogLevel: () => import_logger.setLogLevel,
    stringToUint8Array: () => import_bytesEncoding.stringToUint8Array,
    uint8ArrayToString: () => import_bytesEncoding.uint8ArrayToString
  });
  commonjs = __toCommonJS(src_exports);
  var import_AbortError = requireAbortError();
  var import_logger = requireLogger();
  var import_httpHeaders = requireHttpHeaders();
  var import_pipelineRequest = requirePipelineRequest();
  var import_pipeline = requirePipeline();
  var import_restError = requireRestError$1();
  var import_bytesEncoding = requireBytesEncoding();
  var import_defaultHttpClient = requireDefaultHttpClient();
  var import_getClient = requireGetClient();
  var import_operationOptionHelpers = requireOperationOptionHelpers();
  var import_restError2 = requireRestError();
  return commonjs;
}
var exponentialRetryPolicy_1;
var hasRequiredExponentialRetryPolicy;
function requireExponentialRetryPolicy() {
  if (hasRequiredExponentialRetryPolicy) return exponentialRetryPolicy_1;
  hasRequiredExponentialRetryPolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var exponentialRetryPolicy_exports = {};
  __export(exponentialRetryPolicy_exports, {
    exponentialRetryPolicy: () => exponentialRetryPolicy,
    exponentialRetryPolicyName: () => exponentialRetryPolicyName
  });
  exponentialRetryPolicy_1 = __toCommonJS(exponentialRetryPolicy_exports);
  var import_exponentialRetryStrategy = requireExponentialRetryStrategy();
  var import_retryPolicy = requireRetryPolicy();
  var import_constants = requireConstants();
  const exponentialRetryPolicyName = "exponentialRetryPolicy";
  function exponentialRetryPolicy(options = {}) {
    return (0, import_retryPolicy.retryPolicy)(
      [
        (0, import_exponentialRetryStrategy.exponentialRetryStrategy)({
          ...options,
          ignoreSystemErrors: true
        })
      ],
      {
        maxRetries: options.maxRetries ?? import_constants.DEFAULT_RETRY_POLICY_COUNT
      }
    );
  }
  return exponentialRetryPolicy_1;
}
var systemErrorRetryPolicy_1;
var hasRequiredSystemErrorRetryPolicy;
function requireSystemErrorRetryPolicy() {
  if (hasRequiredSystemErrorRetryPolicy) return systemErrorRetryPolicy_1;
  hasRequiredSystemErrorRetryPolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var systemErrorRetryPolicy_exports = {};
  __export(systemErrorRetryPolicy_exports, {
    systemErrorRetryPolicy: () => systemErrorRetryPolicy,
    systemErrorRetryPolicyName: () => systemErrorRetryPolicyName
  });
  systemErrorRetryPolicy_1 = __toCommonJS(systemErrorRetryPolicy_exports);
  var import_exponentialRetryStrategy = requireExponentialRetryStrategy();
  var import_retryPolicy = requireRetryPolicy();
  var import_constants = requireConstants();
  const systemErrorRetryPolicyName = "systemErrorRetryPolicy";
  function systemErrorRetryPolicy(options = {}) {
    return {
      name: systemErrorRetryPolicyName,
      sendRequest: (0, import_retryPolicy.retryPolicy)(
        [
          (0, import_exponentialRetryStrategy.exponentialRetryStrategy)({
            ...options,
            ignoreHttpStatusCodes: true
          })
        ],
        {
          maxRetries: options.maxRetries ?? import_constants.DEFAULT_RETRY_POLICY_COUNT
        }
      ).sendRequest
    };
  }
  return systemErrorRetryPolicy_1;
}
var throttlingRetryPolicy_1;
var hasRequiredThrottlingRetryPolicy;
function requireThrottlingRetryPolicy() {
  if (hasRequiredThrottlingRetryPolicy) return throttlingRetryPolicy_1;
  hasRequiredThrottlingRetryPolicy = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var throttlingRetryPolicy_exports = {};
  __export(throttlingRetryPolicy_exports, {
    throttlingRetryPolicy: () => throttlingRetryPolicy,
    throttlingRetryPolicyName: () => throttlingRetryPolicyName
  });
  throttlingRetryPolicy_1 = __toCommonJS(throttlingRetryPolicy_exports);
  var import_throttlingRetryStrategy = requireThrottlingRetryStrategy();
  var import_retryPolicy = requireRetryPolicy();
  var import_constants = requireConstants();
  const throttlingRetryPolicyName = "throttlingRetryPolicy";
  function throttlingRetryPolicy(options = {}) {
    return {
      name: throttlingRetryPolicyName,
      sendRequest: (0, import_retryPolicy.retryPolicy)([(0, import_throttlingRetryStrategy.throttlingRetryStrategy)()], {
        maxRetries: options.maxRetries ?? import_constants.DEFAULT_RETRY_POLICY_COUNT
      }).sendRequest
    };
  }
  return throttlingRetryPolicy_1;
}
var internal;
var hasRequiredInternal;
function requireInternal() {
  if (hasRequiredInternal) return internal;
  hasRequiredInternal = 1;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var internal_exports = {};
  __export(internal_exports, {
    agentPolicy: () => import_agentPolicy.agentPolicy,
    agentPolicyName: () => import_agentPolicy.agentPolicyName,
    decompressResponsePolicy: () => import_decompressResponsePolicy.decompressResponsePolicy,
    decompressResponsePolicyName: () => import_decompressResponsePolicy.decompressResponsePolicyName,
    defaultRetryPolicy: () => import_defaultRetryPolicy.defaultRetryPolicy,
    defaultRetryPolicyName: () => import_defaultRetryPolicy.defaultRetryPolicyName,
    exponentialRetryPolicy: () => import_exponentialRetryPolicy.exponentialRetryPolicy,
    exponentialRetryPolicyName: () => import_exponentialRetryPolicy.exponentialRetryPolicyName,
    formDataPolicy: () => import_formDataPolicy.formDataPolicy,
    formDataPolicyName: () => import_formDataPolicy.formDataPolicyName,
    getDefaultProxySettings: () => import_proxyPolicy.getDefaultProxySettings,
    logPolicy: () => import_logPolicy.logPolicy,
    logPolicyName: () => import_logPolicy.logPolicyName,
    multipartPolicy: () => import_multipartPolicy.multipartPolicy,
    multipartPolicyName: () => import_multipartPolicy.multipartPolicyName,
    proxyPolicy: () => import_proxyPolicy.proxyPolicy,
    proxyPolicyName: () => import_proxyPolicy.proxyPolicyName,
    redirectPolicy: () => import_redirectPolicy.redirectPolicy,
    redirectPolicyName: () => import_redirectPolicy.redirectPolicyName,
    retryPolicy: () => import_retryPolicy.retryPolicy,
    systemErrorRetryPolicy: () => import_systemErrorRetryPolicy.systemErrorRetryPolicy,
    systemErrorRetryPolicyName: () => import_systemErrorRetryPolicy.systemErrorRetryPolicyName,
    throttlingRetryPolicy: () => import_throttlingRetryPolicy.throttlingRetryPolicy,
    throttlingRetryPolicyName: () => import_throttlingRetryPolicy.throttlingRetryPolicyName,
    tlsPolicy: () => import_tlsPolicy.tlsPolicy,
    tlsPolicyName: () => import_tlsPolicy.tlsPolicyName,
    userAgentPolicy: () => import_userAgentPolicy.userAgentPolicy,
    userAgentPolicyName: () => import_userAgentPolicy.userAgentPolicyName
  });
  internal = __toCommonJS(internal_exports);
  var import_agentPolicy = requireAgentPolicy();
  var import_decompressResponsePolicy = requireDecompressResponsePolicy();
  var import_defaultRetryPolicy = requireDefaultRetryPolicy();
  var import_exponentialRetryPolicy = requireExponentialRetryPolicy();
  var import_retryPolicy = requireRetryPolicy();
  var import_systemErrorRetryPolicy = requireSystemErrorRetryPolicy();
  var import_throttlingRetryPolicy = requireThrottlingRetryPolicy();
  var import_formDataPolicy = requireFormDataPolicy();
  var import_logPolicy = requireLogPolicy();
  var import_multipartPolicy = requireMultipartPolicy();
  var import_proxyPolicy = requireProxyPolicy();
  var import_redirectPolicy = requireRedirectPolicy();
  var import_tlsPolicy = requireTlsPolicy();
  var import_userAgentPolicy = requireUserAgentPolicy();
  return internal;
}
export {
  requireInternal$1 as a,
  requireCommonjs as b,
  requireInternal as c,
  requireInternal$2 as r
};
