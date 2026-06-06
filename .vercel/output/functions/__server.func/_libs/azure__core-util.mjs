import { r as requireTslib } from "./tslib.mjs";
import { a as requireInternal } from "./@typespec/ts-http-runtime.mjs";
import { r as requireCommonjs$1 } from "./azure__abort-controller.mjs";
var commonjs = {};
var aborterUtils = {};
var hasRequiredAborterUtils;
function requireAborterUtils() {
  if (hasRequiredAborterUtils) return aborterUtils;
  hasRequiredAborterUtils = 1;
  Object.defineProperty(aborterUtils, "__esModule", { value: true });
  aborterUtils.cancelablePromiseRace = cancelablePromiseRace;
  async function cancelablePromiseRace(abortablePromiseBuilders, options) {
    const aborter = new AbortController();
    function abortHandler() {
      aborter.abort();
    }
    options?.abortSignal?.addEventListener("abort", abortHandler);
    try {
      return await Promise.race(abortablePromiseBuilders.map((p) => p({ abortSignal: aborter.signal })));
    } finally {
      aborter.abort();
      options?.abortSignal?.removeEventListener("abort", abortHandler);
    }
  }
  return aborterUtils;
}
var createAbortablePromise = {};
var hasRequiredCreateAbortablePromise;
function requireCreateAbortablePromise() {
  if (hasRequiredCreateAbortablePromise) return createAbortablePromise;
  hasRequiredCreateAbortablePromise = 1;
  Object.defineProperty(createAbortablePromise, "__esModule", { value: true });
  createAbortablePromise.createAbortablePromise = createAbortablePromise$1;
  const abort_controller_1 = /* @__PURE__ */ requireCommonjs$1();
  function createAbortablePromise$1(buildPromise, options) {
    const { cleanupBeforeAbort, abortSignal, abortErrorMsg } = options ?? {};
    return new Promise((resolve, reject) => {
      function rejectOnAbort() {
        reject(new abort_controller_1.AbortError(abortErrorMsg ?? "The operation was aborted."));
      }
      function removeListeners() {
        abortSignal?.removeEventListener("abort", onAbort);
      }
      function onAbort() {
        cleanupBeforeAbort?.();
        removeListeners();
        rejectOnAbort();
      }
      if (abortSignal?.aborted) {
        return rejectOnAbort();
      }
      try {
        buildPromise((x) => {
          removeListeners();
          resolve(x);
        }, (x) => {
          removeListeners();
          reject(x);
        });
      } catch (err) {
        reject(err);
      }
      abortSignal?.addEventListener("abort", onAbort);
    });
  }
  return createAbortablePromise;
}
var delay = {};
var hasRequiredDelay;
function requireDelay() {
  if (hasRequiredDelay) return delay;
  hasRequiredDelay = 1;
  Object.defineProperty(delay, "__esModule", { value: true });
  delay.delay = delay$1;
  delay.calculateRetryDelay = calculateRetryDelay;
  const createAbortablePromise_js_1 = requireCreateAbortablePromise();
  const util_1 = /* @__PURE__ */ requireInternal();
  const StandardAbortMessage = "The delay was aborted.";
  function delay$1(timeInMs, options) {
    let token;
    const { abortSignal, abortErrorMsg } = options ?? {};
    return (0, createAbortablePromise_js_1.createAbortablePromise)((resolve) => {
      token = setTimeout(resolve, timeInMs);
    }, {
      cleanupBeforeAbort: () => clearTimeout(token),
      abortSignal,
      abortErrorMsg: abortErrorMsg ?? StandardAbortMessage
    });
  }
  function calculateRetryDelay(retryAttempt, config) {
    const exponentialDelay = config.retryDelayInMs * Math.pow(2, retryAttempt);
    const clampedDelay = Math.min(config.maxRetryDelayInMs, exponentialDelay);
    const retryAfterInMs = clampedDelay / 2 + (0, util_1.getRandomIntegerInclusive)(0, clampedDelay / 2);
    return { retryAfterInMs };
  }
  return delay;
}
var error = {};
var hasRequiredError;
function requireError() {
  if (hasRequiredError) return error;
  hasRequiredError = 1;
  Object.defineProperty(error, "__esModule", { value: true });
  error.getErrorMessage = getErrorMessage;
  const util_1 = /* @__PURE__ */ requireInternal();
  function getErrorMessage(e) {
    if ((0, util_1.isError)(e)) {
      return e.message;
    } else {
      let stringified;
      try {
        if (typeof e === "object" && e) {
          stringified = JSON.stringify(e);
        } else {
          stringified = String(e);
        }
      } catch (err) {
        stringified = "[unable to stringify input]";
      }
      return `Unknown error ${stringified}`;
    }
  }
  return error;
}
var typeGuards = {};
var hasRequiredTypeGuards;
function requireTypeGuards() {
  if (hasRequiredTypeGuards) return typeGuards;
  hasRequiredTypeGuards = 1;
  Object.defineProperty(typeGuards, "__esModule", { value: true });
  typeGuards.isDefined = isDefined;
  typeGuards.isObjectWithProperties = isObjectWithProperties;
  typeGuards.objectHasProperty = objectHasProperty;
  function isDefined(thing) {
    return typeof thing !== "undefined" && thing !== null;
  }
  function isObjectWithProperties(thing, properties) {
    if (!isDefined(thing) || typeof thing !== "object") {
      return false;
    }
    for (const property of properties) {
      if (!objectHasProperty(thing, property)) {
        return false;
      }
    }
    return true;
  }
  function objectHasProperty(thing, property) {
    return isDefined(thing) && typeof thing === "object" && property in thing;
  }
  return typeGuards;
}
var hasRequiredCommonjs;
function requireCommonjs() {
  if (hasRequiredCommonjs) return commonjs;
  hasRequiredCommonjs = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isWebWorker = exports.isReactNative = exports.isNodeRuntime = exports.isNodeLike = exports.isNode = exports.isDeno = exports.isBun = exports.isBrowser = exports.objectHasProperty = exports.isObjectWithProperties = exports.isDefined = exports.getErrorMessage = exports.delay = exports.createAbortablePromise = exports.cancelablePromiseRace = void 0;
    exports.calculateRetryDelay = calculateRetryDelay;
    exports.computeSha256Hash = computeSha256Hash;
    exports.computeSha256Hmac = computeSha256Hmac;
    exports.getRandomIntegerInclusive = getRandomIntegerInclusive;
    exports.isError = isError;
    exports.isObject = isObject;
    exports.randomUUID = randomUUID;
    exports.uint8ArrayToString = uint8ArrayToString;
    exports.stringToUint8Array = stringToUint8Array;
    const tslib_1 = /* @__PURE__ */ requireTslib();
    const tspRuntime = tslib_1.__importStar(/* @__PURE__ */ requireInternal());
    var aborterUtils_js_1 = requireAborterUtils();
    Object.defineProperty(exports, "cancelablePromiseRace", { enumerable: true, get: function() {
      return aborterUtils_js_1.cancelablePromiseRace;
    } });
    var createAbortablePromise_js_1 = requireCreateAbortablePromise();
    Object.defineProperty(exports, "createAbortablePromise", { enumerable: true, get: function() {
      return createAbortablePromise_js_1.createAbortablePromise;
    } });
    var delay_js_1 = requireDelay();
    Object.defineProperty(exports, "delay", { enumerable: true, get: function() {
      return delay_js_1.delay;
    } });
    var error_js_1 = requireError();
    Object.defineProperty(exports, "getErrorMessage", { enumerable: true, get: function() {
      return error_js_1.getErrorMessage;
    } });
    var typeGuards_js_1 = requireTypeGuards();
    Object.defineProperty(exports, "isDefined", { enumerable: true, get: function() {
      return typeGuards_js_1.isDefined;
    } });
    Object.defineProperty(exports, "isObjectWithProperties", { enumerable: true, get: function() {
      return typeGuards_js_1.isObjectWithProperties;
    } });
    Object.defineProperty(exports, "objectHasProperty", { enumerable: true, get: function() {
      return typeGuards_js_1.objectHasProperty;
    } });
    function calculateRetryDelay(retryAttempt, config) {
      return tspRuntime.calculateRetryDelay(retryAttempt, config);
    }
    function computeSha256Hash(content, encoding) {
      return tspRuntime.computeSha256Hash(content, encoding);
    }
    function computeSha256Hmac(key, stringToSign, encoding) {
      return tspRuntime.computeSha256Hmac(key, stringToSign, encoding);
    }
    function getRandomIntegerInclusive(min, max) {
      return tspRuntime.getRandomIntegerInclusive(min, max);
    }
    function isError(e) {
      return tspRuntime.isError(e);
    }
    function isObject(input) {
      return tspRuntime.isObject(input);
    }
    function randomUUID() {
      return tspRuntime.randomUUID();
    }
    exports.isBrowser = tspRuntime.isBrowser;
    exports.isBun = tspRuntime.isBun;
    exports.isDeno = tspRuntime.isDeno;
    exports.isNode = tspRuntime.isNodeLike;
    exports.isNodeLike = tspRuntime.isNodeLike;
    exports.isNodeRuntime = tspRuntime.isNodeRuntime;
    exports.isReactNative = tspRuntime.isReactNative;
    exports.isWebWorker = tspRuntime.isWebWorker;
    function uint8ArrayToString(bytes, format) {
      return tspRuntime.uint8ArrayToString(bytes, format);
    }
    function stringToUint8Array(value, format) {
      return tspRuntime.stringToUint8Array(value, format);
    }
  })(commonjs);
  return commonjs;
}
export {
  requireCommonjs as r
};
