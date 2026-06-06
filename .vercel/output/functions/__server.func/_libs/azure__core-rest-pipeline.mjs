import { b as requireCommonjs$1, c as requireInternal, a as requireInternal$1 } from "./@typespec/ts-http-runtime.mjs";
import { r as requireCommonjs$2 } from "./azure__logger.mjs";
import require$$0 from "node:os";
import process from "node:process";
import { r as requireCommonjs$3 } from "./azure__core-util.mjs";
import { r as requireCommonjs$4 } from "./azure__core-tracing.mjs";
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
  var import_ts_http_runtime2 = /* @__PURE__ */ requireCommonjs$1();
  function createEmptyPipeline() {
    return (0, import_ts_http_runtime2.createEmptyPipeline)();
  }
  return pipeline;
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
    logger: () => logger
  });
  log = __toCommonJS(log_exports);
  var import_logger = /* @__PURE__ */ requireCommonjs$2();
  const logger = (0, import_logger.createClientLogger)("core-rest-pipeline");
  return log;
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
  var import_policies = /* @__PURE__ */ requireInternal();
  const logPolicyName = import_policies.logPolicyName;
  function logPolicy(options = {}) {
    return (0, import_policies.logPolicy)({
      logger: import_log.logger.info,
      ...options
    });
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
  var import_policies = /* @__PURE__ */ requireInternal();
  const redirectPolicyName = import_policies.redirectPolicyName;
  function redirectPolicy(options = {}) {
    return (0, import_policies.redirectPolicy)(options);
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
  var import_node_os2 = __toESM(require$$0);
  var import_node_process2 = __toESM(process);
  function getHeaderName() {
    return "User-Agent";
  }
  async function setPlatformSpecificData(map) {
    if (import_node_process2.default && import_node_process2.default.versions) {
      const osInfo = `${import_node_os2.default.type()} ${import_node_os2.default.release()}; ${import_node_os2.default.arch()}`;
      const versions = import_node_process2.default.versions;
      if (versions.bun) {
        map.set("Bun", `${versions.bun} (${osInfo})`);
      } else if (versions.deno) {
        map.set("Deno", `${versions.deno} (${osInfo})`);
      } else if (versions.node) {
        map.set("Node", `${versions.node} (${osInfo})`);
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
  const SDK_VERSION = "1.22.3";
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
    runtimeInfo.set("core-rest-pipeline", import_constants.SDK_VERSION);
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
var file;
var hasRequiredFile;
function requireFile() {
  if (hasRequiredFile) return file;
  hasRequiredFile = 1;
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
  var file_exports = {};
  __export(file_exports, {
    createFile: () => createFile,
    createFileFromStream: () => createFileFromStream,
    getRawContent: () => getRawContent,
    hasRawContent: () => hasRawContent
  });
  file = __toCommonJS(file_exports);
  var import_core_util = /* @__PURE__ */ requireCommonjs$3();
  function isNodeReadableStream(x) {
    return Boolean(x && typeof x["pipe"] === "function");
  }
  const unimplementedMethods = {
    arrayBuffer: () => {
      throw new Error("Not implemented");
    },
    bytes: () => {
      throw new Error("Not implemented");
    },
    slice: () => {
      throw new Error("Not implemented");
    },
    text: () => {
      throw new Error("Not implemented");
    }
  };
  const rawContent = /* @__PURE__ */ Symbol("rawContent");
  function hasRawContent(x) {
    return typeof x[rawContent] === "function";
  }
  function getRawContent(blob) {
    if (hasRawContent(blob)) {
      return blob[rawContent]();
    } else {
      return blob;
    }
  }
  function createFileFromStream(stream, name, options = {}) {
    return {
      ...unimplementedMethods,
      type: options.type ?? "",
      lastModified: options.lastModified ?? (/* @__PURE__ */ new Date()).getTime(),
      webkitRelativePath: options.webkitRelativePath ?? "",
      size: options.size ?? -1,
      name,
      stream: () => {
        const s = stream();
        if (isNodeReadableStream(s)) {
          throw new Error(
            "Not supported: a Node stream was provided as input to createFileFromStream."
          );
        }
        return s;
      },
      [rawContent]: stream
    };
  }
  function createFile(content, name, options = {}) {
    if (import_core_util.isNodeLike) {
      return {
        ...unimplementedMethods,
        type: options.type ?? "",
        lastModified: options.lastModified ?? (/* @__PURE__ */ new Date()).getTime(),
        webkitRelativePath: options.webkitRelativePath ?? "",
        size: content.byteLength,
        name,
        arrayBuffer: async () => content.buffer,
        stream: () => new Blob([toArrayBuffer(content)]).stream(),
        [rawContent]: () => content
      };
    } else {
      return new File([toArrayBuffer(content)], name, options);
    }
  }
  function toArrayBuffer(source) {
    if ("resize" in source.buffer) {
      return source;
    }
    return source.map((x) => x);
  }
  return file;
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
  var import_policies = /* @__PURE__ */ requireInternal();
  var import_file = requireFile();
  const multipartPolicyName = import_policies.multipartPolicyName;
  function multipartPolicy() {
    const tspPolicy = (0, import_policies.multipartPolicy)();
    return {
      name: multipartPolicyName,
      sendRequest: async (request, next) => {
        if (request.multipartBody) {
          for (const part of request.multipartBody.parts) {
            if ((0, import_file.hasRawContent)(part.body)) {
              part.body = (0, import_file.getRawContent)(part.body);
            }
          }
        }
        return tspPolicy.sendRequest(request, next);
      }
    };
  }
  return multipartPolicy_1;
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
  var import_policies = /* @__PURE__ */ requireInternal();
  const decompressResponsePolicyName = import_policies.decompressResponsePolicyName;
  function decompressResponsePolicy() {
    return (0, import_policies.decompressResponsePolicy)();
  }
  return decompressResponsePolicy_1;
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
  var import_policies = /* @__PURE__ */ requireInternal();
  const defaultRetryPolicyName = import_policies.defaultRetryPolicyName;
  function defaultRetryPolicy(options = {}) {
    return (0, import_policies.defaultRetryPolicy)(options);
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
  var import_policies = /* @__PURE__ */ requireInternal();
  const formDataPolicyName = import_policies.formDataPolicyName;
  function formDataPolicy() {
    return (0, import_policies.formDataPolicy)();
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
    proxyPolicy: () => proxyPolicy,
    proxyPolicyName: () => proxyPolicyName
  });
  proxyPolicy_1 = __toCommonJS(proxyPolicy_exports);
  var import_policies = /* @__PURE__ */ requireInternal();
  const proxyPolicyName = import_policies.proxyPolicyName;
  function getDefaultProxySettings(proxyUrl) {
    return (0, import_policies.getDefaultProxySettings)(proxyUrl);
  }
  function proxyPolicy(proxySettings, options) {
    return (0, import_policies.proxyPolicy)(proxySettings, options);
  }
  return proxyPolicy_1;
}
var setClientRequestIdPolicy_1;
var hasRequiredSetClientRequestIdPolicy;
function requireSetClientRequestIdPolicy() {
  if (hasRequiredSetClientRequestIdPolicy) return setClientRequestIdPolicy_1;
  hasRequiredSetClientRequestIdPolicy = 1;
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
  var setClientRequestIdPolicy_exports = {};
  __export(setClientRequestIdPolicy_exports, {
    setClientRequestIdPolicy: () => setClientRequestIdPolicy,
    setClientRequestIdPolicyName: () => setClientRequestIdPolicyName
  });
  setClientRequestIdPolicy_1 = __toCommonJS(setClientRequestIdPolicy_exports);
  const setClientRequestIdPolicyName = "setClientRequestIdPolicy";
  function setClientRequestIdPolicy(requestIdHeaderName = "x-ms-client-request-id") {
    return {
      name: setClientRequestIdPolicyName,
      async sendRequest(request, next) {
        if (!request.headers.has(requestIdHeaderName)) {
          request.headers.set(requestIdHeaderName, request.requestId);
        }
        return next(request);
      }
    };
  }
  return setClientRequestIdPolicy_1;
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
  var import_policies = /* @__PURE__ */ requireInternal();
  const agentPolicyName = import_policies.agentPolicyName;
  function agentPolicy(agent) {
    return (0, import_policies.agentPolicy)(agent);
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
  var import_policies = /* @__PURE__ */ requireInternal();
  const tlsPolicyName = import_policies.tlsPolicyName;
  function tlsPolicy(tlsSettings) {
    return (0, import_policies.tlsPolicy)(tlsSettings);
  }
  return tlsPolicy_1;
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
    RestError: () => RestError,
    isRestError: () => isRestError
  });
  restError = __toCommonJS(restError_exports);
  var import_ts_http_runtime2 = /* @__PURE__ */ requireCommonjs$1();
  const RestError = import_ts_http_runtime2.RestError;
  function isRestError(e) {
    return (0, import_ts_http_runtime2.isRestError)(e);
  }
  return restError;
}
var tracingPolicy_1;
var hasRequiredTracingPolicy;
function requireTracingPolicy() {
  if (hasRequiredTracingPolicy) return tracingPolicy_1;
  hasRequiredTracingPolicy = 1;
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
  var tracingPolicy_exports = {};
  __export(tracingPolicy_exports, {
    tracingPolicy: () => tracingPolicy,
    tracingPolicyName: () => tracingPolicyName
  });
  tracingPolicy_1 = __toCommonJS(tracingPolicy_exports);
  var import_core_tracing = /* @__PURE__ */ requireCommonjs$4();
  var import_constants = requireConstants();
  var import_userAgent = requireUserAgent();
  var import_log = requireLog();
  var import_core_util = /* @__PURE__ */ requireCommonjs$3();
  var import_restError = requireRestError();
  var import_util = /* @__PURE__ */ requireInternal$1();
  const tracingPolicyName = "tracingPolicy";
  function tracingPolicy(options = {}) {
    const userAgentPromise = (0, import_userAgent.getUserAgentValue)(options.userAgentPrefix);
    const sanitizer = new import_util.Sanitizer({
      additionalAllowedQueryParameters: options.additionalAllowedQueryParameters
    });
    const tracingClient = tryCreateTracingClient();
    return {
      name: tracingPolicyName,
      async sendRequest(request, next) {
        if (!tracingClient) {
          return next(request);
        }
        const userAgent2 = await userAgentPromise;
        const spanAttributes = {
          "http.url": sanitizer.sanitizeUrl(request.url),
          "http.method": request.method,
          "http.user_agent": userAgent2,
          requestId: request.requestId
        };
        if (userAgent2) {
          spanAttributes["http.user_agent"] = userAgent2;
        }
        const { span, tracingContext } = tryCreateSpan(tracingClient, request, spanAttributes) ?? {};
        if (!span || !tracingContext) {
          return next(request);
        }
        try {
          const response = await tracingClient.withContext(tracingContext, next, request);
          tryProcessResponse(span, response);
          return response;
        } catch (err) {
          tryProcessError(span, err);
          throw err;
        }
      }
    };
  }
  function tryCreateTracingClient() {
    try {
      return (0, import_core_tracing.createTracingClient)({
        namespace: "",
        packageName: "@azure/core-rest-pipeline",
        packageVersion: import_constants.SDK_VERSION
      });
    } catch (e) {
      import_log.logger.warning(`Error when creating the TracingClient: ${(0, import_core_util.getErrorMessage)(e)}`);
      return void 0;
    }
  }
  function tryCreateSpan(tracingClient, request, spanAttributes) {
    try {
      const { span, updatedOptions } = tracingClient.startSpan(
        `HTTP ${request.method}`,
        { tracingOptions: request.tracingOptions },
        {
          spanKind: "client",
          spanAttributes
        }
      );
      if (!span.isRecording()) {
        span.end();
        return void 0;
      }
      const headers = tracingClient.createRequestHeaders(
        updatedOptions.tracingOptions.tracingContext
      );
      for (const [key, value] of Object.entries(headers)) {
        request.headers.set(key, value);
      }
      return { span, tracingContext: updatedOptions.tracingOptions.tracingContext };
    } catch (e) {
      import_log.logger.warning(`Skipping creating a tracing span due to an error: ${(0, import_core_util.getErrorMessage)(e)}`);
      return void 0;
    }
  }
  function tryProcessError(span, error) {
    try {
      span.setStatus({
        status: "error",
        error: (0, import_core_util.isError)(error) ? error : void 0
      });
      if ((0, import_restError.isRestError)(error) && error.statusCode) {
        span.setAttribute("http.status_code", error.statusCode);
      }
      span.end();
    } catch (e) {
      import_log.logger.warning(`Skipping tracing span processing due to an error: ${(0, import_core_util.getErrorMessage)(e)}`);
    }
  }
  function tryProcessResponse(span, response) {
    try {
      span.setAttribute("http.status_code", response.status);
      const serviceRequestId = response.headers.get("x-ms-request-id");
      if (serviceRequestId) {
        span.setAttribute("serviceRequestId", serviceRequestId);
      }
      if (response.status >= 400) {
        span.setStatus({
          status: "error"
        });
      }
      span.end();
    } catch (e) {
      import_log.logger.warning(`Skipping tracing span processing due to an error: ${(0, import_core_util.getErrorMessage)(e)}`);
    }
  }
  return tracingPolicy_1;
}
var wrapAbortSignal;
var hasRequiredWrapAbortSignal;
function requireWrapAbortSignal() {
  if (hasRequiredWrapAbortSignal) return wrapAbortSignal;
  hasRequiredWrapAbortSignal = 1;
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
  var wrapAbortSignal_exports = {};
  __export(wrapAbortSignal_exports, {
    wrapAbortSignalLike: () => wrapAbortSignalLike
  });
  wrapAbortSignal = __toCommonJS(wrapAbortSignal_exports);
  function wrapAbortSignalLike(abortSignalLike) {
    if (abortSignalLike instanceof AbortSignal) {
      return { abortSignal: abortSignalLike };
    }
    if (abortSignalLike.aborted) {
      return { abortSignal: AbortSignal.abort(abortSignalLike.reason) };
    }
    const controller = new AbortController();
    let needsCleanup = true;
    function cleanup() {
      if (needsCleanup) {
        abortSignalLike.removeEventListener("abort", listener);
        needsCleanup = false;
      }
    }
    function listener() {
      controller.abort(abortSignalLike.reason);
      cleanup();
    }
    abortSignalLike.addEventListener("abort", listener);
    return { abortSignal: controller.signal, cleanup };
  }
  return wrapAbortSignal;
}
var wrapAbortSignalLikePolicy_1;
var hasRequiredWrapAbortSignalLikePolicy;
function requireWrapAbortSignalLikePolicy() {
  if (hasRequiredWrapAbortSignalLikePolicy) return wrapAbortSignalLikePolicy_1;
  hasRequiredWrapAbortSignalLikePolicy = 1;
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
  var wrapAbortSignalLikePolicy_exports = {};
  __export(wrapAbortSignalLikePolicy_exports, {
    wrapAbortSignalLikePolicy: () => wrapAbortSignalLikePolicy,
    wrapAbortSignalLikePolicyName: () => wrapAbortSignalLikePolicyName
  });
  wrapAbortSignalLikePolicy_1 = __toCommonJS(wrapAbortSignalLikePolicy_exports);
  var import_wrapAbortSignal = requireWrapAbortSignal();
  const wrapAbortSignalLikePolicyName = "wrapAbortSignalLikePolicy";
  function wrapAbortSignalLikePolicy() {
    return {
      name: wrapAbortSignalLikePolicyName,
      sendRequest: async (request, next) => {
        if (!request.abortSignal) {
          return next(request);
        }
        const { abortSignal, cleanup } = (0, import_wrapAbortSignal.wrapAbortSignalLike)(request.abortSignal);
        request.abortSignal = abortSignal;
        try {
          return await next(request);
        } finally {
          cleanup?.();
        }
      }
    };
  }
  return wrapAbortSignalLikePolicy_1;
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
  var import_multipartPolicy = requireMultipartPolicy();
  var import_decompressResponsePolicy = requireDecompressResponsePolicy();
  var import_defaultRetryPolicy = requireDefaultRetryPolicy();
  var import_formDataPolicy = requireFormDataPolicy();
  var import_core_util = /* @__PURE__ */ requireCommonjs$3();
  var import_proxyPolicy = requireProxyPolicy();
  var import_setClientRequestIdPolicy = requireSetClientRequestIdPolicy();
  var import_agentPolicy = requireAgentPolicy();
  var import_tlsPolicy = requireTlsPolicy();
  var import_tracingPolicy = requireTracingPolicy();
  var import_wrapAbortSignalLikePolicy = requireWrapAbortSignalLikePolicy();
  function createPipelineFromOptions(options) {
    const pipeline2 = (0, import_pipeline.createEmptyPipeline)();
    if (import_core_util.isNodeLike) {
      if (options.agent) {
        pipeline2.addPolicy((0, import_agentPolicy.agentPolicy)(options.agent));
      }
      if (options.tlsOptions) {
        pipeline2.addPolicy((0, import_tlsPolicy.tlsPolicy)(options.tlsOptions));
      }
      pipeline2.addPolicy((0, import_proxyPolicy.proxyPolicy)(options.proxyOptions));
      pipeline2.addPolicy((0, import_decompressResponsePolicy.decompressResponsePolicy)());
    }
    pipeline2.addPolicy((0, import_wrapAbortSignalLikePolicy.wrapAbortSignalLikePolicy)());
    pipeline2.addPolicy((0, import_formDataPolicy.formDataPolicy)(), { beforePolicies: [import_multipartPolicy.multipartPolicyName] });
    pipeline2.addPolicy((0, import_userAgentPolicy.userAgentPolicy)(options.userAgentOptions));
    pipeline2.addPolicy((0, import_setClientRequestIdPolicy.setClientRequestIdPolicy)(options.telemetryOptions?.clientRequestIdHeaderName));
    pipeline2.addPolicy((0, import_multipartPolicy.multipartPolicy)(), { afterPhase: "Deserialize" });
    pipeline2.addPolicy((0, import_defaultRetryPolicy.defaultRetryPolicy)(options.retryOptions), { phase: "Retry" });
    pipeline2.addPolicy((0, import_tracingPolicy.tracingPolicy)({ ...options.userAgentOptions, ...options.loggingOptions }), {
      afterPhase: "Retry"
    });
    if (import_core_util.isNodeLike) {
      pipeline2.addPolicy((0, import_redirectPolicy.redirectPolicy)(options.redirectOptions), { afterPhase: "Retry" });
    }
    pipeline2.addPolicy((0, import_logPolicy.logPolicy)(options.loggingOptions), { afterPhase: "Sign" });
    return pipeline2;
  }
  return createPipelineFromOptions_1;
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
  var import_ts_http_runtime2 = /* @__PURE__ */ requireCommonjs$1();
  var import_wrapAbortSignal = requireWrapAbortSignal();
  function createDefaultHttpClient() {
    const client = (0, import_ts_http_runtime2.createDefaultHttpClient)();
    return {
      async sendRequest(request) {
        const { abortSignal, cleanup } = request.abortSignal ? (0, import_wrapAbortSignal.wrapAbortSignalLike)(request.abortSignal) : {};
        try {
          request.abortSignal = abortSignal;
          return await client.sendRequest(request);
        } finally {
          cleanup?.();
        }
      }
    };
  }
  return defaultHttpClient;
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
  var import_ts_http_runtime2 = /* @__PURE__ */ requireCommonjs$1();
  function createHttpHeaders(rawHeaders) {
    return (0, import_ts_http_runtime2.createHttpHeaders)(rawHeaders);
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
  var import_ts_http_runtime2 = /* @__PURE__ */ requireCommonjs$1();
  function createPipelineRequest(options) {
    return (0, import_ts_http_runtime2.createPipelineRequest)(options);
  }
  return pipelineRequest;
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
  var import_policies = /* @__PURE__ */ requireInternal();
  const exponentialRetryPolicyName = import_policies.exponentialRetryPolicyName;
  function exponentialRetryPolicy(options = {}) {
    return (0, import_policies.exponentialRetryPolicy)(options);
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
  var import_policies = /* @__PURE__ */ requireInternal();
  const systemErrorRetryPolicyName = import_policies.systemErrorRetryPolicyName;
  function systemErrorRetryPolicy(options = {}) {
    return (0, import_policies.systemErrorRetryPolicy)(options);
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
  var import_policies = /* @__PURE__ */ requireInternal();
  const throttlingRetryPolicyName = import_policies.throttlingRetryPolicyName;
  function throttlingRetryPolicy(options = {}) {
    return (0, import_policies.throttlingRetryPolicy)(options);
  }
  return throttlingRetryPolicy_1;
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
  var import_logger = /* @__PURE__ */ requireCommonjs$2();
  var import_constants = requireConstants();
  var import_policies = /* @__PURE__ */ requireInternal();
  const retryPolicyLogger = (0, import_logger.createClientLogger)("core-rest-pipeline retryPolicy");
  function retryPolicy(strategies, options = { maxRetries: import_constants.DEFAULT_RETRY_POLICY_COUNT }) {
    return (0, import_policies.retryPolicy)(strategies, {
      logger: retryPolicyLogger,
      ...options
    });
  }
  return retryPolicy_1;
}
var tokenCycler;
var hasRequiredTokenCycler;
function requireTokenCycler() {
  if (hasRequiredTokenCycler) return tokenCycler;
  hasRequiredTokenCycler = 1;
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
  var tokenCycler_exports = {};
  __export(tokenCycler_exports, {
    DEFAULT_CYCLER_OPTIONS: () => DEFAULT_CYCLER_OPTIONS,
    createTokenCycler: () => createTokenCycler
  });
  tokenCycler = __toCommonJS(tokenCycler_exports);
  var import_core_util = /* @__PURE__ */ requireCommonjs$3();
  const DEFAULT_CYCLER_OPTIONS = {
    forcedRefreshWindowInMs: 1e3,
    // Force waiting for a refresh 1s before the token expires
    retryIntervalInMs: 3e3,
    // Allow refresh attempts every 3s
    refreshWindowInMs: 1e3 * 60 * 2
    // Start refreshing 2m before expiry
  };
  async function beginRefresh(getAccessToken, retryIntervalInMs, refreshTimeout) {
    async function tryGetAccessToken() {
      if (Date.now() < refreshTimeout) {
        try {
          return await getAccessToken();
        } catch {
          return null;
        }
      } else {
        const finalToken = await getAccessToken();
        if (finalToken === null) {
          throw new Error("Failed to refresh access token.");
        }
        return finalToken;
      }
    }
    let token = await tryGetAccessToken();
    while (token === null) {
      await (0, import_core_util.delay)(retryIntervalInMs);
      token = await tryGetAccessToken();
    }
    return token;
  }
  function createTokenCycler(credential, tokenCyclerOptions) {
    let refreshWorker = null;
    let token = null;
    let tenantId;
    const options = {
      ...DEFAULT_CYCLER_OPTIONS,
      ...tokenCyclerOptions
    };
    const cycler = {
      /**
       * Produces true if a refresh job is currently in progress.
       */
      get isRefreshing() {
        return refreshWorker !== null;
      },
      /**
       * Produces true if the cycler SHOULD refresh (we are within the refresh
       * window and not already refreshing)
       */
      get shouldRefresh() {
        if (cycler.isRefreshing) {
          return false;
        }
        if (token?.refreshAfterTimestamp && token.refreshAfterTimestamp < Date.now()) {
          return true;
        }
        return (token?.expiresOnTimestamp ?? 0) - options.refreshWindowInMs < Date.now();
      },
      /**
       * Produces true if the cycler MUST refresh (null or nearly-expired
       * token).
       */
      get mustRefresh() {
        return token === null || token.expiresOnTimestamp - options.forcedRefreshWindowInMs < Date.now();
      }
    };
    function refresh(scopes, getTokenOptions) {
      if (!cycler.isRefreshing) {
        const tryGetAccessToken = () => credential.getToken(scopes, getTokenOptions);
        refreshWorker = beginRefresh(
          tryGetAccessToken,
          options.retryIntervalInMs,
          // If we don't have a token, then we should timeout immediately
          token?.expiresOnTimestamp ?? Date.now()
        ).then((_token) => {
          refreshWorker = null;
          token = _token;
          tenantId = getTokenOptions.tenantId;
          return token;
        }).catch((reason) => {
          refreshWorker = null;
          token = null;
          tenantId = void 0;
          throw reason;
        });
      }
      return refreshWorker;
    }
    return async (scopes, tokenOptions) => {
      const hasClaimChallenge = Boolean(tokenOptions.claims);
      const tenantIdChanged = tenantId !== tokenOptions.tenantId;
      if (hasClaimChallenge) {
        token = null;
      }
      const mustRefresh = tenantIdChanged || hasClaimChallenge || cycler.mustRefresh;
      if (mustRefresh) {
        return refresh(scopes, tokenOptions);
      }
      if (cycler.shouldRefresh) {
        refresh(scopes, tokenOptions);
      }
      return token;
    };
  }
  return tokenCycler;
}
var bearerTokenAuthenticationPolicy_1;
var hasRequiredBearerTokenAuthenticationPolicy;
function requireBearerTokenAuthenticationPolicy() {
  if (hasRequiredBearerTokenAuthenticationPolicy) return bearerTokenAuthenticationPolicy_1;
  hasRequiredBearerTokenAuthenticationPolicy = 1;
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
  var bearerTokenAuthenticationPolicy_exports = {};
  __export(bearerTokenAuthenticationPolicy_exports, {
    bearerTokenAuthenticationPolicy: () => bearerTokenAuthenticationPolicy,
    bearerTokenAuthenticationPolicyName: () => bearerTokenAuthenticationPolicyName,
    parseChallenges: () => parseChallenges
  });
  bearerTokenAuthenticationPolicy_1 = __toCommonJS(bearerTokenAuthenticationPolicy_exports);
  var import_tokenCycler = requireTokenCycler();
  var import_log = requireLog();
  var import_restError = requireRestError();
  const bearerTokenAuthenticationPolicyName = "bearerTokenAuthenticationPolicy";
  async function trySendRequest(request, next) {
    try {
      return [await next(request), void 0];
    } catch (e) {
      if ((0, import_restError.isRestError)(e) && e.response) {
        return [e.response, e];
      } else {
        throw e;
      }
    }
  }
  async function defaultAuthorizeRequest(options) {
    const { scopes, getAccessToken, request } = options;
    const getTokenOptions = {
      abortSignal: request.abortSignal,
      tracingOptions: request.tracingOptions,
      enableCae: true
    };
    const accessToken = await getAccessToken(scopes, getTokenOptions);
    if (accessToken) {
      options.request.headers.set("Authorization", `Bearer ${accessToken.token}`);
    }
  }
  function isChallengeResponse(response) {
    return response.status === 401 && response.headers.has("WWW-Authenticate");
  }
  async function authorizeRequestOnCaeChallenge(onChallengeOptions, caeClaims) {
    const { scopes } = onChallengeOptions;
    const accessToken = await onChallengeOptions.getAccessToken(scopes, {
      enableCae: true,
      claims: caeClaims
    });
    if (!accessToken) {
      return false;
    }
    onChallengeOptions.request.headers.set(
      "Authorization",
      `${accessToken.tokenType ?? "Bearer"} ${accessToken.token}`
    );
    return true;
  }
  function bearerTokenAuthenticationPolicy(options) {
    const { credential, scopes, challengeCallbacks } = options;
    const logger = options.logger || import_log.logger;
    const callbacks = {
      authorizeRequest: challengeCallbacks?.authorizeRequest?.bind(challengeCallbacks) ?? defaultAuthorizeRequest,
      authorizeRequestOnChallenge: challengeCallbacks?.authorizeRequestOnChallenge?.bind(challengeCallbacks)
    };
    const getAccessToken = credential ? (0, import_tokenCycler.createTokenCycler)(
      credential
      /* , options */
    ) : () => Promise.resolve(null);
    return {
      name: bearerTokenAuthenticationPolicyName,
      /**
       * If there's no challenge parameter:
       * - It will try to retrieve the token using the cache, or the credential's getToken.
       * - Then it will try the next policy with or without the retrieved token.
       *
       * It uses the challenge parameters to:
       * - Skip a first attempt to get the token from the credential if there's no cached token,
       *   since it expects the token to be retrievable only after the challenge.
       * - Prepare the outgoing request if the `prepareRequest` method has been provided.
       * - Send an initial request to receive the challenge if it fails.
       * - Process a challenge if the response contains it.
       * - Retrieve a token with the challenge information, then re-send the request.
       */
      async sendRequest(request, next) {
        if (!request.url.toLowerCase().startsWith("https://")) {
          throw new Error(
            "Bearer token authentication is not permitted for non-TLS protected (non-https) URLs."
          );
        }
        await callbacks.authorizeRequest({
          scopes: Array.isArray(scopes) ? scopes : [scopes],
          request,
          getAccessToken,
          logger
        });
        let response;
        let error;
        let shouldSendRequest;
        [response, error] = await trySendRequest(request, next);
        if (isChallengeResponse(response)) {
          let claims = getCaeChallengeClaims(response.headers.get("WWW-Authenticate"));
          if (claims) {
            let parsedClaim;
            try {
              parsedClaim = atob(claims);
            } catch (e) {
              logger.warning(
                `The WWW-Authenticate header contains "claims" that cannot be parsed. Unable to perform the Continuous Access Evaluation authentication flow. Unparsable claims: ${claims}`
              );
              return response;
            }
            shouldSendRequest = await authorizeRequestOnCaeChallenge(
              {
                scopes: Array.isArray(scopes) ? scopes : [scopes],
                response,
                request,
                getAccessToken,
                logger
              },
              parsedClaim
            );
            if (shouldSendRequest) {
              [response, error] = await trySendRequest(request, next);
            }
          } else if (callbacks.authorizeRequestOnChallenge) {
            shouldSendRequest = await callbacks.authorizeRequestOnChallenge({
              scopes: Array.isArray(scopes) ? scopes : [scopes],
              request,
              response,
              getAccessToken,
              logger
            });
            if (shouldSendRequest) {
              [response, error] = await trySendRequest(request, next);
            }
            if (isChallengeResponse(response)) {
              claims = getCaeChallengeClaims(response.headers.get("WWW-Authenticate"));
              if (claims) {
                let parsedClaim;
                try {
                  parsedClaim = atob(claims);
                } catch (e) {
                  logger.warning(
                    `The WWW-Authenticate header contains "claims" that cannot be parsed. Unable to perform the Continuous Access Evaluation authentication flow. Unparsable claims: ${claims}`
                  );
                  return response;
                }
                shouldSendRequest = await authorizeRequestOnCaeChallenge(
                  {
                    scopes: Array.isArray(scopes) ? scopes : [scopes],
                    response,
                    request,
                    getAccessToken,
                    logger
                  },
                  parsedClaim
                );
                if (shouldSendRequest) {
                  [response, error] = await trySendRequest(request, next);
                }
              }
            }
          }
        }
        if (error) {
          throw error;
        } else {
          return response;
        }
      }
    };
  }
  function parseChallenges(challenges) {
    const challengeRegex = /(\w+)\s+((?:\w+=(?:"[^"]*"|[^,]*),?\s*)+)/g;
    const paramRegex = /(\w+)="([^"]*)"/g;
    const parsedChallenges = [];
    let match;
    while ((match = challengeRegex.exec(challenges)) !== null) {
      const scheme = match[1];
      const paramsString = match[2];
      const params = {};
      let paramMatch;
      while ((paramMatch = paramRegex.exec(paramsString)) !== null) {
        params[paramMatch[1]] = paramMatch[2];
      }
      parsedChallenges.push({ scheme, params });
    }
    return parsedChallenges;
  }
  function getCaeChallengeClaims(challenges) {
    if (!challenges) {
      return;
    }
    const parsedChallenges = parseChallenges(challenges);
    return parsedChallenges.find(
      (x) => x.scheme === "Bearer" && x.params.claims && x.params.error === "insufficient_claims"
    )?.params.claims;
  }
  return bearerTokenAuthenticationPolicy_1;
}
var ndJsonPolicy_1;
var hasRequiredNdJsonPolicy;
function requireNdJsonPolicy() {
  if (hasRequiredNdJsonPolicy) return ndJsonPolicy_1;
  hasRequiredNdJsonPolicy = 1;
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
  var ndJsonPolicy_exports = {};
  __export(ndJsonPolicy_exports, {
    ndJsonPolicy: () => ndJsonPolicy,
    ndJsonPolicyName: () => ndJsonPolicyName
  });
  ndJsonPolicy_1 = __toCommonJS(ndJsonPolicy_exports);
  const ndJsonPolicyName = "ndJsonPolicy";
  function ndJsonPolicy() {
    return {
      name: ndJsonPolicyName,
      async sendRequest(request, next) {
        if (typeof request.body === "string" && request.body.startsWith("[")) {
          const body = JSON.parse(request.body);
          if (Array.isArray(body)) {
            request.body = body.map((item) => JSON.stringify(item) + "\n").join("");
          }
        }
        return next(request);
      }
    };
  }
  return ndJsonPolicy_1;
}
var auxiliaryAuthenticationHeaderPolicy_1;
var hasRequiredAuxiliaryAuthenticationHeaderPolicy;
function requireAuxiliaryAuthenticationHeaderPolicy() {
  if (hasRequiredAuxiliaryAuthenticationHeaderPolicy) return auxiliaryAuthenticationHeaderPolicy_1;
  hasRequiredAuxiliaryAuthenticationHeaderPolicy = 1;
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
  var auxiliaryAuthenticationHeaderPolicy_exports = {};
  __export(auxiliaryAuthenticationHeaderPolicy_exports, {
    auxiliaryAuthenticationHeaderPolicy: () => auxiliaryAuthenticationHeaderPolicy,
    auxiliaryAuthenticationHeaderPolicyName: () => auxiliaryAuthenticationHeaderPolicyName
  });
  auxiliaryAuthenticationHeaderPolicy_1 = __toCommonJS(auxiliaryAuthenticationHeaderPolicy_exports);
  var import_tokenCycler = requireTokenCycler();
  var import_log = requireLog();
  const auxiliaryAuthenticationHeaderPolicyName = "auxiliaryAuthenticationHeaderPolicy";
  const AUTHORIZATION_AUXILIARY_HEADER = "x-ms-authorization-auxiliary";
  async function sendAuthorizeRequest(options) {
    const { scopes, getAccessToken, request } = options;
    const getTokenOptions = {
      abortSignal: request.abortSignal,
      tracingOptions: request.tracingOptions
    };
    return (await getAccessToken(scopes, getTokenOptions))?.token ?? "";
  }
  function auxiliaryAuthenticationHeaderPolicy(options) {
    const { credentials, scopes } = options;
    const logger = options.logger || import_log.logger;
    const tokenCyclerMap = /* @__PURE__ */ new WeakMap();
    return {
      name: auxiliaryAuthenticationHeaderPolicyName,
      async sendRequest(request, next) {
        if (!request.url.toLowerCase().startsWith("https://")) {
          throw new Error(
            "Bearer token authentication for auxiliary header is not permitted for non-TLS protected (non-https) URLs."
          );
        }
        if (!credentials || credentials.length === 0) {
          logger.info(
            `${auxiliaryAuthenticationHeaderPolicyName} header will not be set due to empty credentials.`
          );
          return next(request);
        }
        const tokenPromises = [];
        for (const credential of credentials) {
          let getAccessToken = tokenCyclerMap.get(credential);
          if (!getAccessToken) {
            getAccessToken = (0, import_tokenCycler.createTokenCycler)(credential);
            tokenCyclerMap.set(credential, getAccessToken);
          }
          tokenPromises.push(
            sendAuthorizeRequest({
              scopes: Array.isArray(scopes) ? scopes : [scopes],
              request,
              getAccessToken
            })
          );
        }
        const auxiliaryTokens = (await Promise.all(tokenPromises)).filter((token) => Boolean(token));
        if (auxiliaryTokens.length === 0) {
          logger.warning(
            `None of the auxiliary tokens are valid. ${AUTHORIZATION_AUXILIARY_HEADER} header will not be set.`
          );
          return next(request);
        }
        request.headers.set(
          AUTHORIZATION_AUXILIARY_HEADER,
          auxiliaryTokens.map((token) => `Bearer ${token}`).join(", ")
        );
        return next(request);
      }
    };
  }
  return auxiliaryAuthenticationHeaderPolicy_1;
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
    RestError: () => import_restError.RestError,
    agentPolicy: () => import_agentPolicy.agentPolicy,
    agentPolicyName: () => import_agentPolicy.agentPolicyName,
    auxiliaryAuthenticationHeaderPolicy: () => import_auxiliaryAuthenticationHeaderPolicy.auxiliaryAuthenticationHeaderPolicy,
    auxiliaryAuthenticationHeaderPolicyName: () => import_auxiliaryAuthenticationHeaderPolicy.auxiliaryAuthenticationHeaderPolicyName,
    bearerTokenAuthenticationPolicy: () => import_bearerTokenAuthenticationPolicy.bearerTokenAuthenticationPolicy,
    bearerTokenAuthenticationPolicyName: () => import_bearerTokenAuthenticationPolicy.bearerTokenAuthenticationPolicyName,
    createDefaultHttpClient: () => import_defaultHttpClient.createDefaultHttpClient,
    createEmptyPipeline: () => import_pipeline.createEmptyPipeline,
    createFile: () => import_file.createFile,
    createFileFromStream: () => import_file.createFileFromStream,
    createHttpHeaders: () => import_httpHeaders.createHttpHeaders,
    createPipelineFromOptions: () => import_createPipelineFromOptions.createPipelineFromOptions,
    createPipelineRequest: () => import_pipelineRequest.createPipelineRequest,
    decompressResponsePolicy: () => import_decompressResponsePolicy.decompressResponsePolicy,
    decompressResponsePolicyName: () => import_decompressResponsePolicy.decompressResponsePolicyName,
    defaultRetryPolicy: () => import_defaultRetryPolicy.defaultRetryPolicy,
    exponentialRetryPolicy: () => import_exponentialRetryPolicy.exponentialRetryPolicy,
    exponentialRetryPolicyName: () => import_exponentialRetryPolicy.exponentialRetryPolicyName,
    formDataPolicy: () => import_formDataPolicy.formDataPolicy,
    formDataPolicyName: () => import_formDataPolicy.formDataPolicyName,
    getDefaultProxySettings: () => import_proxyPolicy.getDefaultProxySettings,
    isRestError: () => import_restError.isRestError,
    logPolicy: () => import_logPolicy.logPolicy,
    logPolicyName: () => import_logPolicy.logPolicyName,
    multipartPolicy: () => import_multipartPolicy.multipartPolicy,
    multipartPolicyName: () => import_multipartPolicy.multipartPolicyName,
    ndJsonPolicy: () => import_ndJsonPolicy.ndJsonPolicy,
    ndJsonPolicyName: () => import_ndJsonPolicy.ndJsonPolicyName,
    proxyPolicy: () => import_proxyPolicy.proxyPolicy,
    proxyPolicyName: () => import_proxyPolicy.proxyPolicyName,
    redirectPolicy: () => import_redirectPolicy.redirectPolicy,
    redirectPolicyName: () => import_redirectPolicy.redirectPolicyName,
    retryPolicy: () => import_retryPolicy.retryPolicy,
    setClientRequestIdPolicy: () => import_setClientRequestIdPolicy.setClientRequestIdPolicy,
    setClientRequestIdPolicyName: () => import_setClientRequestIdPolicy.setClientRequestIdPolicyName,
    systemErrorRetryPolicy: () => import_systemErrorRetryPolicy.systemErrorRetryPolicy,
    systemErrorRetryPolicyName: () => import_systemErrorRetryPolicy.systemErrorRetryPolicyName,
    throttlingRetryPolicy: () => import_throttlingRetryPolicy.throttlingRetryPolicy,
    throttlingRetryPolicyName: () => import_throttlingRetryPolicy.throttlingRetryPolicyName,
    tlsPolicy: () => import_tlsPolicy.tlsPolicy,
    tlsPolicyName: () => import_tlsPolicy.tlsPolicyName,
    tracingPolicy: () => import_tracingPolicy.tracingPolicy,
    tracingPolicyName: () => import_tracingPolicy.tracingPolicyName,
    userAgentPolicy: () => import_userAgentPolicy.userAgentPolicy,
    userAgentPolicyName: () => import_userAgentPolicy.userAgentPolicyName
  });
  commonjs = __toCommonJS(src_exports);
  var import_pipeline = requirePipeline();
  var import_createPipelineFromOptions = requireCreatePipelineFromOptions();
  var import_defaultHttpClient = requireDefaultHttpClient();
  var import_httpHeaders = requireHttpHeaders();
  var import_pipelineRequest = requirePipelineRequest();
  var import_restError = requireRestError();
  var import_decompressResponsePolicy = requireDecompressResponsePolicy();
  var import_exponentialRetryPolicy = requireExponentialRetryPolicy();
  var import_setClientRequestIdPolicy = requireSetClientRequestIdPolicy();
  var import_logPolicy = requireLogPolicy();
  var import_multipartPolicy = requireMultipartPolicy();
  var import_proxyPolicy = requireProxyPolicy();
  var import_redirectPolicy = requireRedirectPolicy();
  var import_systemErrorRetryPolicy = requireSystemErrorRetryPolicy();
  var import_throttlingRetryPolicy = requireThrottlingRetryPolicy();
  var import_retryPolicy = requireRetryPolicy();
  var import_tracingPolicy = requireTracingPolicy();
  var import_defaultRetryPolicy = requireDefaultRetryPolicy();
  var import_userAgentPolicy = requireUserAgentPolicy();
  var import_tlsPolicy = requireTlsPolicy();
  var import_formDataPolicy = requireFormDataPolicy();
  var import_bearerTokenAuthenticationPolicy = requireBearerTokenAuthenticationPolicy();
  var import_ndJsonPolicy = requireNdJsonPolicy();
  var import_auxiliaryAuthenticationHeaderPolicy = requireAuxiliaryAuthenticationHeaderPolicy();
  var import_agentPolicy = requireAgentPolicy();
  var import_file = requireFile();
  return commonjs;
}
export {
  requireCommonjs as r
};
