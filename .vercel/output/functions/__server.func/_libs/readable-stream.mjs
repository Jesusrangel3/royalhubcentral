import require$$13 from "node:string_decoder";
import require$$0$3 from "stream";
import require$$0$1 from "buffer";
import { r as require$$0 } from "./abort-controller.mjs";
import require$$0$2 from "events";
import process$1 from "node:process";
var ours = { exports: {} };
var stream = { exports: {} };
var primordials;
var hasRequiredPrimordials;
function requirePrimordials() {
  if (hasRequiredPrimordials) return primordials;
  hasRequiredPrimordials = 1;
  class AggregateError extends Error {
    constructor(errors2) {
      if (!Array.isArray(errors2)) {
        throw new TypeError(`Expected input to be an Array, got ${typeof errors2}`);
      }
      let message = "";
      for (let i = 0; i < errors2.length; i++) {
        message += `    ${errors2[i].stack}
`;
      }
      super(message);
      this.name = "AggregateError";
      this.errors = errors2;
    }
  }
  primordials = {
    AggregateError,
    ArrayIsArray(self) {
      return Array.isArray(self);
    },
    ArrayPrototypeIncludes(self, el) {
      return self.includes(el);
    },
    ArrayPrototypeIndexOf(self, el) {
      return self.indexOf(el);
    },
    ArrayPrototypeJoin(self, sep) {
      return self.join(sep);
    },
    ArrayPrototypeMap(self, fn) {
      return self.map(fn);
    },
    ArrayPrototypePop(self, el) {
      return self.pop(el);
    },
    ArrayPrototypePush(self, el) {
      return self.push(el);
    },
    ArrayPrototypeSlice(self, start, end) {
      return self.slice(start, end);
    },
    Error,
    FunctionPrototypeCall(fn, thisArgs, ...args) {
      return fn.call(thisArgs, ...args);
    },
    FunctionPrototypeSymbolHasInstance(self, instance) {
      return Function.prototype[Symbol.hasInstance].call(self, instance);
    },
    MathFloor: Math.floor,
    Number,
    NumberIsInteger: Number.isInteger,
    NumberIsNaN: Number.isNaN,
    NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER,
    NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER,
    NumberParseInt: Number.parseInt,
    ObjectDefineProperties(self, props) {
      return Object.defineProperties(self, props);
    },
    ObjectDefineProperty(self, name, prop) {
      return Object.defineProperty(self, name, prop);
    },
    ObjectGetOwnPropertyDescriptor(self, name) {
      return Object.getOwnPropertyDescriptor(self, name);
    },
    ObjectKeys(obj) {
      return Object.keys(obj);
    },
    ObjectSetPrototypeOf(target, proto) {
      return Object.setPrototypeOf(target, proto);
    },
    Promise,
    PromisePrototypeCatch(self, fn) {
      return self.catch(fn);
    },
    PromisePrototypeThen(self, thenFn, catchFn) {
      return self.then(thenFn, catchFn);
    },
    PromiseReject(err) {
      return Promise.reject(err);
    },
    PromiseResolve(val) {
      return Promise.resolve(val);
    },
    ReflectApply: Reflect.apply,
    RegExpPrototypeTest(self, value) {
      return self.test(value);
    },
    SafeSet: Set,
    String,
    StringPrototypeSlice(self, start, end) {
      return self.slice(start, end);
    },
    StringPrototypeToLowerCase(self) {
      return self.toLowerCase();
    },
    StringPrototypeToUpperCase(self) {
      return self.toUpperCase();
    },
    StringPrototypeTrim(self) {
      return self.trim();
    },
    Symbol,
    SymbolFor: Symbol.for,
    SymbolAsyncIterator: Symbol.asyncIterator,
    SymbolHasInstance: Symbol.hasInstance,
    SymbolIterator: Symbol.iterator,
    SymbolDispose: Symbol.dispose || /* @__PURE__ */ Symbol("Symbol.dispose"),
    SymbolAsyncDispose: Symbol.asyncDispose || /* @__PURE__ */ Symbol("Symbol.asyncDispose"),
    TypedArrayPrototypeSet(self, buf, len) {
      return self.set(buf, len);
    },
    Boolean,
    Uint8Array
  };
  return primordials;
}
var util = { exports: {} };
var inspect;
var hasRequiredInspect;
function requireInspect() {
  if (hasRequiredInspect) return inspect;
  hasRequiredInspect = 1;
  inspect = {
    format(format, ...args) {
      return format.replace(/%([sdifj])/g, function(...[_unused, type]) {
        const replacement = args.shift();
        if (type === "f") {
          return replacement.toFixed(6);
        } else if (type === "j") {
          return JSON.stringify(replacement);
        } else if (type === "s" && typeof replacement === "object") {
          const ctor = replacement.constructor !== Object ? replacement.constructor.name : "";
          return `${ctor} {}`.trim();
        } else {
          return replacement.toString();
        }
      });
    },
    inspect(value) {
      switch (typeof value) {
        case "string":
          if (value.includes("'")) {
            if (!value.includes('"')) {
              return `"${value}"`;
            } else if (!value.includes("`") && !value.includes("${")) {
              return `\`${value}\``;
            }
          }
          return `'${value}'`;
        case "number":
          if (isNaN(value)) {
            return "NaN";
          } else if (Object.is(value, -0)) {
            return String(value);
          }
          return value;
        case "bigint":
          return `${String(value)}n`;
        case "boolean":
        case "undefined":
          return String(value);
        case "object":
          return "{}";
      }
    }
  };
  return inspect;
}
var errors;
var hasRequiredErrors;
function requireErrors() {
  if (hasRequiredErrors) return errors;
  hasRequiredErrors = 1;
  const { format, inspect: inspect2 } = requireInspect();
  const { AggregateError: CustomAggregateError } = requirePrimordials();
  const AggregateError = globalThis.AggregateError || CustomAggregateError;
  const kIsNodeError = /* @__PURE__ */ Symbol("kIsNodeError");
  const kTypes = [
    "string",
    "function",
    "number",
    "object",
    // Accept 'Function' and 'Object' as alternative to the lower cased version.
    "Function",
    "Object",
    "boolean",
    "bigint",
    "symbol"
  ];
  const classRegExp = /^([A-Z][a-z0-9]*)+$/;
  const nodeInternalPrefix = "__node_internal_";
  const codes = {};
  function assert(value, message) {
    if (!value) {
      throw new codes.ERR_INTERNAL_ASSERTION(message);
    }
  }
  function addNumericalSeparator(val) {
    let res = "";
    let i = val.length;
    const start = val[0] === "-" ? 1 : 0;
    for (; i >= start + 4; i -= 3) {
      res = `_${val.slice(i - 3, i)}${res}`;
    }
    return `${val.slice(0, i)}${res}`;
  }
  function getMessage(key, msg, args) {
    if (typeof msg === "function") {
      assert(
        msg.length <= args.length,
        // Default options do not count.
        `Code: ${key}; The provided arguments length (${args.length}) does not match the required ones (${msg.length}).`
      );
      return msg(...args);
    }
    const expectedLength = (msg.match(/%[dfijoOs]/g) || []).length;
    assert(
      expectedLength === args.length,
      `Code: ${key}; The provided arguments length (${args.length}) does not match the required ones (${expectedLength}).`
    );
    if (args.length === 0) {
      return msg;
    }
    return format(msg, ...args);
  }
  function E(code, message, Base) {
    if (!Base) {
      Base = Error;
    }
    class NodeError extends Base {
      constructor(...args) {
        super(getMessage(code, message, args));
      }
      toString() {
        return `${this.name} [${code}]: ${this.message}`;
      }
    }
    Object.defineProperties(NodeError.prototype, {
      name: {
        value: Base.name,
        writable: true,
        enumerable: false,
        configurable: true
      },
      toString: {
        value() {
          return `${this.name} [${code}]: ${this.message}`;
        },
        writable: true,
        enumerable: false,
        configurable: true
      }
    });
    NodeError.prototype.code = code;
    NodeError.prototype[kIsNodeError] = true;
    codes[code] = NodeError;
  }
  function hideStackFrames(fn) {
    const hidden = nodeInternalPrefix + fn.name;
    Object.defineProperty(fn, "name", {
      value: hidden
    });
    return fn;
  }
  function aggregateTwoErrors(innerError, outerError) {
    if (innerError && outerError && innerError !== outerError) {
      if (Array.isArray(outerError.errors)) {
        outerError.errors.push(innerError);
        return outerError;
      }
      const err = new AggregateError([outerError, innerError], outerError.message);
      err.code = outerError.code;
      return err;
    }
    return innerError || outerError;
  }
  class AbortError extends Error {
    constructor(message = "The operation was aborted", options = void 0) {
      if (options !== void 0 && typeof options !== "object") {
        throw new codes.ERR_INVALID_ARG_TYPE("options", "Object", options);
      }
      super(message, options);
      this.code = "ABORT_ERR";
      this.name = "AbortError";
    }
  }
  E("ERR_ASSERTION", "%s", Error);
  E(
    "ERR_INVALID_ARG_TYPE",
    (name, expected, actual) => {
      assert(typeof name === "string", "'name' must be a string");
      if (!Array.isArray(expected)) {
        expected = [expected];
      }
      let msg = "The ";
      if (name.endsWith(" argument")) {
        msg += `${name} `;
      } else {
        msg += `"${name}" ${name.includes(".") ? "property" : "argument"} `;
      }
      msg += "must be ";
      const types = [];
      const instances = [];
      const other = [];
      for (const value of expected) {
        assert(typeof value === "string", "All expected entries have to be of type string");
        if (kTypes.includes(value)) {
          types.push(value.toLowerCase());
        } else if (classRegExp.test(value)) {
          instances.push(value);
        } else {
          assert(value !== "object", 'The value "object" should be written as "Object"');
          other.push(value);
        }
      }
      if (instances.length > 0) {
        const pos = types.indexOf("object");
        if (pos !== -1) {
          types.splice(types, pos, 1);
          instances.push("Object");
        }
      }
      if (types.length > 0) {
        switch (types.length) {
          case 1:
            msg += `of type ${types[0]}`;
            break;
          case 2:
            msg += `one of type ${types[0]} or ${types[1]}`;
            break;
          default: {
            const last = types.pop();
            msg += `one of type ${types.join(", ")}, or ${last}`;
          }
        }
        if (instances.length > 0 || other.length > 0) {
          msg += " or ";
        }
      }
      if (instances.length > 0) {
        switch (instances.length) {
          case 1:
            msg += `an instance of ${instances[0]}`;
            break;
          case 2:
            msg += `an instance of ${instances[0]} or ${instances[1]}`;
            break;
          default: {
            const last = instances.pop();
            msg += `an instance of ${instances.join(", ")}, or ${last}`;
          }
        }
        if (other.length > 0) {
          msg += " or ";
        }
      }
      switch (other.length) {
        case 0:
          break;
        case 1:
          if (other[0].toLowerCase() !== other[0]) {
            msg += "an ";
          }
          msg += `${other[0]}`;
          break;
        case 2:
          msg += `one of ${other[0]} or ${other[1]}`;
          break;
        default: {
          const last = other.pop();
          msg += `one of ${other.join(", ")}, or ${last}`;
        }
      }
      if (actual == null) {
        msg += `. Received ${actual}`;
      } else if (typeof actual === "function" && actual.name) {
        msg += `. Received function ${actual.name}`;
      } else if (typeof actual === "object") {
        var _actual$constructor;
        if ((_actual$constructor = actual.constructor) !== null && _actual$constructor !== void 0 && _actual$constructor.name) {
          msg += `. Received an instance of ${actual.constructor.name}`;
        } else {
          const inspected = inspect2(actual, {
            depth: -1
          });
          msg += `. Received ${inspected}`;
        }
      } else {
        let inspected = inspect2(actual, {
          colors: false
        });
        if (inspected.length > 25) {
          inspected = `${inspected.slice(0, 25)}...`;
        }
        msg += `. Received type ${typeof actual} (${inspected})`;
      }
      return msg;
    },
    TypeError
  );
  E(
    "ERR_INVALID_ARG_VALUE",
    (name, value, reason = "is invalid") => {
      let inspected = inspect2(value);
      if (inspected.length > 128) {
        inspected = inspected.slice(0, 128) + "...";
      }
      const type = name.includes(".") ? "property" : "argument";
      return `The ${type} '${name}' ${reason}. Received ${inspected}`;
    },
    TypeError
  );
  E(
    "ERR_INVALID_RETURN_VALUE",
    (input, name, value) => {
      var _value$constructor;
      const type = value !== null && value !== void 0 && (_value$constructor = value.constructor) !== null && _value$constructor !== void 0 && _value$constructor.name ? `instance of ${value.constructor.name}` : `type ${typeof value}`;
      return `Expected ${input} to be returned from the "${name}" function but got ${type}.`;
    },
    TypeError
  );
  E(
    "ERR_MISSING_ARGS",
    (...args) => {
      assert(args.length > 0, "At least one arg needs to be specified");
      let msg;
      const len = args.length;
      args = (Array.isArray(args) ? args : [args]).map((a) => `"${a}"`).join(" or ");
      switch (len) {
        case 1:
          msg += `The ${args[0]} argument`;
          break;
        case 2:
          msg += `The ${args[0]} and ${args[1]} arguments`;
          break;
        default:
          {
            const last = args.pop();
            msg += `The ${args.join(", ")}, and ${last} arguments`;
          }
          break;
      }
      return `${msg} must be specified`;
    },
    TypeError
  );
  E(
    "ERR_OUT_OF_RANGE",
    (str, range, input) => {
      assert(range, 'Missing "range" argument');
      let received;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        const limit = BigInt(2) ** BigInt(32);
        if (input > limit || input < -limit) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      } else {
        received = inspect2(input);
      }
      return `The value of "${str}" is out of range. It must be ${range}. Received ${received}`;
    },
    RangeError
  );
  E("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error);
  E("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error);
  E("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error);
  E("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error);
  E("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error);
  E("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
  E("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error);
  E("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error);
  E("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error);
  E("ERR_STREAM_WRITE_AFTER_END", "write after end", Error);
  E("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError);
  errors = {
    AbortError,
    aggregateTwoErrors: hideStackFrames(aggregateTwoErrors),
    hideStackFrames,
    codes
  };
  return errors;
}
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util.exports;
  hasRequiredUtil = 1;
  (function(module) {
    const bufferModule = require$$0$1;
    const { format, inspect: inspect2 } = requireInspect();
    const {
      codes: { ERR_INVALID_ARG_TYPE }
    } = requireErrors();
    const { kResistStopPropagation, AggregateError, SymbolDispose } = requirePrimordials();
    const AbortSignal = globalThis.AbortSignal || require$$0.AbortSignal;
    const AbortController = globalThis.AbortController || require$$0.AbortController;
    const AsyncFunction = Object.getPrototypeOf(async function() {
    }).constructor;
    const Blob = globalThis.Blob || bufferModule.Blob;
    const isBlob = typeof Blob !== "undefined" ? function isBlob2(b) {
      return b instanceof Blob;
    } : function isBlob2(b) {
      return false;
    };
    const validateAbortSignal = (signal, name) => {
      if (signal !== void 0 && (signal === null || typeof signal !== "object" || !("aborted" in signal))) {
        throw new ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
      }
    };
    const validateFunction = (value, name) => {
      if (typeof value !== "function") {
        throw new ERR_INVALID_ARG_TYPE(name, "Function", value);
      }
    };
    module.exports = {
      AggregateError,
      kEmptyObject: Object.freeze({}),
      once(callback) {
        let called = false;
        return function(...args) {
          if (called) {
            return;
          }
          called = true;
          callback.apply(this, args);
        };
      },
      createDeferredPromise: function() {
        let resolve;
        let reject;
        const promise = new Promise((res, rej) => {
          resolve = res;
          reject = rej;
        });
        return {
          promise,
          resolve,
          reject
        };
      },
      promisify(fn) {
        return new Promise((resolve, reject) => {
          fn((err, ...args) => {
            if (err) {
              return reject(err);
            }
            return resolve(...args);
          });
        });
      },
      debuglog() {
        return function() {
        };
      },
      format,
      inspect: inspect2,
      types: {
        isAsyncFunction(fn) {
          return fn instanceof AsyncFunction;
        },
        isArrayBufferView(arr) {
          return ArrayBuffer.isView(arr);
        }
      },
      isBlob,
      deprecate(fn, message) {
        return fn;
      },
      addAbortListener: require$$0$2.addAbortListener || function addAbortListener(signal, listener) {
        if (signal === void 0) {
          throw new ERR_INVALID_ARG_TYPE("signal", "AbortSignal", signal);
        }
        validateAbortSignal(signal, "signal");
        validateFunction(listener, "listener");
        let removeEventListener;
        if (signal.aborted) {
          queueMicrotask(() => listener());
        } else {
          signal.addEventListener("abort", listener, {
            __proto__: null,
            once: true,
            [kResistStopPropagation]: true
          });
          removeEventListener = () => {
            signal.removeEventListener("abort", listener);
          };
        }
        return {
          __proto__: null,
          [SymbolDispose]() {
            var _removeEventListener;
            (_removeEventListener = removeEventListener) === null || _removeEventListener === void 0 ? void 0 : _removeEventListener();
          }
        };
      },
      AbortSignalAny: AbortSignal.any || function AbortSignalAny(signals) {
        if (signals.length === 1) {
          return signals[0];
        }
        const ac = new AbortController();
        const abort = () => ac.abort();
        signals.forEach((signal) => {
          validateAbortSignal(signal, "signals");
          signal.addEventListener("abort", abort, {
            once: true
          });
        });
        ac.signal.addEventListener(
          "abort",
          () => {
            signals.forEach((signal) => signal.removeEventListener("abort", abort));
          },
          {
            once: true
          }
        );
        return ac.signal;
      }
    };
    module.exports.promisify.custom = /* @__PURE__ */ Symbol.for("nodejs.util.promisify.custom");
  })(util);
  return util.exports;
}
var operators = {};
var validators;
var hasRequiredValidators;
function requireValidators() {
  if (hasRequiredValidators) return validators;
  hasRequiredValidators = 1;
  const {
    ArrayIsArray,
    ArrayPrototypeIncludes,
    ArrayPrototypeJoin,
    ArrayPrototypeMap,
    NumberIsInteger,
    NumberIsNaN,
    NumberMAX_SAFE_INTEGER,
    NumberMIN_SAFE_INTEGER,
    NumberParseInt,
    ObjectPrototypeHasOwnProperty,
    RegExpPrototypeExec,
    String: String2,
    StringPrototypeToUpperCase,
    StringPrototypeTrim
  } = requirePrimordials();
  const {
    hideStackFrames,
    codes: { ERR_SOCKET_BAD_PORT, ERR_INVALID_ARG_TYPE, ERR_INVALID_ARG_VALUE, ERR_OUT_OF_RANGE, ERR_UNKNOWN_SIGNAL }
  } = requireErrors();
  const { normalizeEncoding } = requireUtil();
  const { isAsyncFunction, isArrayBufferView } = requireUtil().types;
  const signals = {};
  function isInt32(value) {
    return value === (value | 0);
  }
  function isUint32(value) {
    return value === value >>> 0;
  }
  const octalReg = /^[0-7]+$/;
  const modeDesc = "must be a 32-bit unsigned integer or an octal string";
  function parseFileMode(value, name, def) {
    if (typeof value === "undefined") {
      value = def;
    }
    if (typeof value === "string") {
      if (RegExpPrototypeExec(octalReg, value) === null) {
        throw new ERR_INVALID_ARG_VALUE(name, value, modeDesc);
      }
      value = NumberParseInt(value, 8);
    }
    validateUint32(value, name);
    return value;
  }
  const validateInteger = hideStackFrames((value, name, min = NumberMIN_SAFE_INTEGER, max = NumberMAX_SAFE_INTEGER) => {
    if (typeof value !== "number") throw new ERR_INVALID_ARG_TYPE(name, "number", value);
    if (!NumberIsInteger(value)) throw new ERR_OUT_OF_RANGE(name, "an integer", value);
    if (value < min || value > max) throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
  });
  const validateInt32 = hideStackFrames((value, name, min = -2147483648, max = 2147483647) => {
    if (typeof value !== "number") {
      throw new ERR_INVALID_ARG_TYPE(name, "number", value);
    }
    if (!NumberIsInteger(value)) {
      throw new ERR_OUT_OF_RANGE(name, "an integer", value);
    }
    if (value < min || value > max) {
      throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
    }
  });
  const validateUint32 = hideStackFrames((value, name, positive = false) => {
    if (typeof value !== "number") {
      throw new ERR_INVALID_ARG_TYPE(name, "number", value);
    }
    if (!NumberIsInteger(value)) {
      throw new ERR_OUT_OF_RANGE(name, "an integer", value);
    }
    const min = positive ? 1 : 0;
    const max = 4294967295;
    if (value < min || value > max) {
      throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value);
    }
  });
  function validateString(value, name) {
    if (typeof value !== "string") throw new ERR_INVALID_ARG_TYPE(name, "string", value);
  }
  function validateNumber(value, name, min = void 0, max) {
    if (typeof value !== "number") throw new ERR_INVALID_ARG_TYPE(name, "number", value);
    if (min != null && value < min || max != null && value > max || (min != null || max != null) && NumberIsNaN(value)) {
      throw new ERR_OUT_OF_RANGE(
        name,
        `${min != null ? `>= ${min}` : ""}${min != null && max != null ? " && " : ""}${max != null ? `<= ${max}` : ""}`,
        value
      );
    }
  }
  const validateOneOf = hideStackFrames((value, name, oneOf) => {
    if (!ArrayPrototypeIncludes(oneOf, value)) {
      const allowed = ArrayPrototypeJoin(
        ArrayPrototypeMap(oneOf, (v) => typeof v === "string" ? `'${v}'` : String2(v)),
        ", "
      );
      const reason = "must be one of: " + allowed;
      throw new ERR_INVALID_ARG_VALUE(name, value, reason);
    }
  });
  function validateBoolean(value, name) {
    if (typeof value !== "boolean") throw new ERR_INVALID_ARG_TYPE(name, "boolean", value);
  }
  function getOwnPropertyValueOrDefault(options, key, defaultValue) {
    return options == null || !ObjectPrototypeHasOwnProperty(options, key) ? defaultValue : options[key];
  }
  const validateObject = hideStackFrames((value, name, options = null) => {
    const allowArray = getOwnPropertyValueOrDefault(options, "allowArray", false);
    const allowFunction = getOwnPropertyValueOrDefault(options, "allowFunction", false);
    const nullable = getOwnPropertyValueOrDefault(options, "nullable", false);
    if (!nullable && value === null || !allowArray && ArrayIsArray(value) || typeof value !== "object" && (!allowFunction || typeof value !== "function")) {
      throw new ERR_INVALID_ARG_TYPE(name, "Object", value);
    }
  });
  const validateDictionary = hideStackFrames((value, name) => {
    if (value != null && typeof value !== "object" && typeof value !== "function") {
      throw new ERR_INVALID_ARG_TYPE(name, "a dictionary", value);
    }
  });
  const validateArray = hideStackFrames((value, name, minLength = 0) => {
    if (!ArrayIsArray(value)) {
      throw new ERR_INVALID_ARG_TYPE(name, "Array", value);
    }
    if (value.length < minLength) {
      const reason = `must be longer than ${minLength}`;
      throw new ERR_INVALID_ARG_VALUE(name, value, reason);
    }
  });
  function validateStringArray(value, name) {
    validateArray(value, name);
    for (let i = 0; i < value.length; i++) {
      validateString(value[i], `${name}[${i}]`);
    }
  }
  function validateBooleanArray(value, name) {
    validateArray(value, name);
    for (let i = 0; i < value.length; i++) {
      validateBoolean(value[i], `${name}[${i}]`);
    }
  }
  function validateAbortSignalArray(value, name) {
    validateArray(value, name);
    for (let i = 0; i < value.length; i++) {
      const signal = value[i];
      const indexedName = `${name}[${i}]`;
      if (signal == null) {
        throw new ERR_INVALID_ARG_TYPE(indexedName, "AbortSignal", signal);
      }
      validateAbortSignal(signal, indexedName);
    }
  }
  function validateSignalName(signal, name = "signal") {
    validateString(signal, name);
    if (signals[signal] === void 0) {
      if (signals[StringPrototypeToUpperCase(signal)] !== void 0) {
        throw new ERR_UNKNOWN_SIGNAL(signal + " (signals must use all capital letters)");
      }
      throw new ERR_UNKNOWN_SIGNAL(signal);
    }
  }
  const validateBuffer = hideStackFrames((buffer, name = "buffer") => {
    if (!isArrayBufferView(buffer)) {
      throw new ERR_INVALID_ARG_TYPE(name, ["Buffer", "TypedArray", "DataView"], buffer);
    }
  });
  function validateEncoding(data, encoding) {
    const normalizedEncoding = normalizeEncoding(encoding);
    const length = data.length;
    if (normalizedEncoding === "hex" && length % 2 !== 0) {
      throw new ERR_INVALID_ARG_VALUE("encoding", encoding, `is invalid for data of length ${length}`);
    }
  }
  function validatePort(port, name = "Port", allowZero = true) {
    if (typeof port !== "number" && typeof port !== "string" || typeof port === "string" && StringPrototypeTrim(port).length === 0 || +port !== +port >>> 0 || port > 65535 || port === 0 && !allowZero) {
      throw new ERR_SOCKET_BAD_PORT(name, port, allowZero);
    }
    return port | 0;
  }
  const validateAbortSignal = hideStackFrames((signal, name) => {
    if (signal !== void 0 && (signal === null || typeof signal !== "object" || !("aborted" in signal))) {
      throw new ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
    }
  });
  const validateFunction = hideStackFrames((value, name) => {
    if (typeof value !== "function") throw new ERR_INVALID_ARG_TYPE(name, "Function", value);
  });
  const validatePlainFunction = hideStackFrames((value, name) => {
    if (typeof value !== "function" || isAsyncFunction(value)) throw new ERR_INVALID_ARG_TYPE(name, "Function", value);
  });
  const validateUndefined = hideStackFrames((value, name) => {
    if (value !== void 0) throw new ERR_INVALID_ARG_TYPE(name, "undefined", value);
  });
  function validateUnion(value, name, union) {
    if (!ArrayPrototypeIncludes(union, value)) {
      throw new ERR_INVALID_ARG_TYPE(name, `('${ArrayPrototypeJoin(union, "|")}')`, value);
    }
  }
  const linkValueRegExp = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
  function validateLinkHeaderFormat(value, name) {
    if (typeof value === "undefined" || !RegExpPrototypeExec(linkValueRegExp, value)) {
      throw new ERR_INVALID_ARG_VALUE(
        name,
        value,
        'must be an array or string of format "</styles.css>; rel=preload; as=style"'
      );
    }
  }
  function validateLinkHeaderValue(hints) {
    if (typeof hints === "string") {
      validateLinkHeaderFormat(hints, "hints");
      return hints;
    } else if (ArrayIsArray(hints)) {
      const hintsLength = hints.length;
      let result = "";
      if (hintsLength === 0) {
        return result;
      }
      for (let i = 0; i < hintsLength; i++) {
        const link = hints[i];
        validateLinkHeaderFormat(link, "hints");
        result += link;
        if (i !== hintsLength - 1) {
          result += ", ";
        }
      }
      return result;
    }
    throw new ERR_INVALID_ARG_VALUE(
      "hints",
      hints,
      'must be an array or string of format "</styles.css>; rel=preload; as=style"'
    );
  }
  validators = {
    isInt32,
    isUint32,
    parseFileMode,
    validateArray,
    validateStringArray,
    validateBooleanArray,
    validateAbortSignalArray,
    validateBoolean,
    validateBuffer,
    validateDictionary,
    validateEncoding,
    validateFunction,
    validateInt32,
    validateInteger,
    validateNumber,
    validateObject,
    validateOneOf,
    validatePlainFunction,
    validatePort,
    validateSignalName,
    validateString,
    validateUint32,
    validateUndefined,
    validateUnion,
    validateAbortSignal,
    validateLinkHeaderValue
  };
  return validators;
}
var endOfStream = { exports: {} };
var utils;
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  const { SymbolAsyncIterator, SymbolIterator, SymbolFor } = requirePrimordials();
  const kIsDestroyed = SymbolFor("nodejs.stream.destroyed");
  const kIsErrored = SymbolFor("nodejs.stream.errored");
  const kIsReadable = SymbolFor("nodejs.stream.readable");
  const kIsWritable = SymbolFor("nodejs.stream.writable");
  const kIsDisturbed = SymbolFor("nodejs.stream.disturbed");
  const kIsClosedPromise = SymbolFor("nodejs.webstream.isClosedPromise");
  const kControllerErrorFunction = SymbolFor("nodejs.webstream.controllerErrorFunction");
  function isReadableNodeStream(obj, strict = false) {
    var _obj$_readableState;
    return !!(obj && typeof obj.pipe === "function" && typeof obj.on === "function" && (!strict || typeof obj.pause === "function" && typeof obj.resume === "function") && (!obj._writableState || ((_obj$_readableState = obj._readableState) === null || _obj$_readableState === void 0 ? void 0 : _obj$_readableState.readable) !== false) && // Duplex
    (!obj._writableState || obj._readableState));
  }
  function isWritableNodeStream(obj) {
    var _obj$_writableState;
    return !!(obj && typeof obj.write === "function" && typeof obj.on === "function" && (!obj._readableState || ((_obj$_writableState = obj._writableState) === null || _obj$_writableState === void 0 ? void 0 : _obj$_writableState.writable) !== false));
  }
  function isDuplexNodeStream(obj) {
    return !!(obj && typeof obj.pipe === "function" && obj._readableState && typeof obj.on === "function" && typeof obj.write === "function");
  }
  function isNodeStream(obj) {
    return obj && (obj._readableState || obj._writableState || typeof obj.write === "function" && typeof obj.on === "function" || typeof obj.pipe === "function" && typeof obj.on === "function");
  }
  function isReadableStream(obj) {
    return !!(obj && !isNodeStream(obj) && typeof obj.pipeThrough === "function" && typeof obj.getReader === "function" && typeof obj.cancel === "function");
  }
  function isWritableStream(obj) {
    return !!(obj && !isNodeStream(obj) && typeof obj.getWriter === "function" && typeof obj.abort === "function");
  }
  function isTransformStream(obj) {
    return !!(obj && !isNodeStream(obj) && typeof obj.readable === "object" && typeof obj.writable === "object");
  }
  function isWebStream(obj) {
    return isReadableStream(obj) || isWritableStream(obj) || isTransformStream(obj);
  }
  function isIterable(obj, isAsync) {
    if (obj == null) return false;
    if (isAsync === true) return typeof obj[SymbolAsyncIterator] === "function";
    if (isAsync === false) return typeof obj[SymbolIterator] === "function";
    return typeof obj[SymbolAsyncIterator] === "function" || typeof obj[SymbolIterator] === "function";
  }
  function isDestroyed(stream2) {
    if (!isNodeStream(stream2)) return null;
    const wState = stream2._writableState;
    const rState = stream2._readableState;
    const state2 = wState || rState;
    return !!(stream2.destroyed || stream2[kIsDestroyed] || state2 !== null && state2 !== void 0 && state2.destroyed);
  }
  function isWritableEnded(stream2) {
    if (!isWritableNodeStream(stream2)) return null;
    if (stream2.writableEnded === true) return true;
    const wState = stream2._writableState;
    if (wState !== null && wState !== void 0 && wState.errored) return false;
    if (typeof (wState === null || wState === void 0 ? void 0 : wState.ended) !== "boolean") return null;
    return wState.ended;
  }
  function isWritableFinished(stream2, strict) {
    if (!isWritableNodeStream(stream2)) return null;
    if (stream2.writableFinished === true) return true;
    const wState = stream2._writableState;
    if (wState !== null && wState !== void 0 && wState.errored) return false;
    if (typeof (wState === null || wState === void 0 ? void 0 : wState.finished) !== "boolean") return null;
    return !!(wState.finished || strict === false && wState.ended === true && wState.length === 0);
  }
  function isReadableEnded(stream2) {
    if (!isReadableNodeStream(stream2)) return null;
    if (stream2.readableEnded === true) return true;
    const rState = stream2._readableState;
    if (!rState || rState.errored) return false;
    if (typeof (rState === null || rState === void 0 ? void 0 : rState.ended) !== "boolean") return null;
    return rState.ended;
  }
  function isReadableFinished(stream2, strict) {
    if (!isReadableNodeStream(stream2)) return null;
    const rState = stream2._readableState;
    if (rState !== null && rState !== void 0 && rState.errored) return false;
    if (typeof (rState === null || rState === void 0 ? void 0 : rState.endEmitted) !== "boolean") return null;
    return !!(rState.endEmitted || strict === false && rState.ended === true && rState.length === 0);
  }
  function isReadable(stream2) {
    if (stream2 && stream2[kIsReadable] != null) return stream2[kIsReadable];
    if (typeof (stream2 === null || stream2 === void 0 ? void 0 : stream2.readable) !== "boolean") return null;
    if (isDestroyed(stream2)) return false;
    return isReadableNodeStream(stream2) && stream2.readable && !isReadableFinished(stream2);
  }
  function isWritable(stream2) {
    if (stream2 && stream2[kIsWritable] != null) return stream2[kIsWritable];
    if (typeof (stream2 === null || stream2 === void 0 ? void 0 : stream2.writable) !== "boolean") return null;
    if (isDestroyed(stream2)) return false;
    return isWritableNodeStream(stream2) && stream2.writable && !isWritableEnded(stream2);
  }
  function isFinished(stream2, opts) {
    if (!isNodeStream(stream2)) {
      return null;
    }
    if (isDestroyed(stream2)) {
      return true;
    }
    if ((opts === null || opts === void 0 ? void 0 : opts.readable) !== false && isReadable(stream2)) {
      return false;
    }
    if ((opts === null || opts === void 0 ? void 0 : opts.writable) !== false && isWritable(stream2)) {
      return false;
    }
    return true;
  }
  function isWritableErrored(stream2) {
    var _stream$_writableStat, _stream$_writableStat2;
    if (!isNodeStream(stream2)) {
      return null;
    }
    if (stream2.writableErrored) {
      return stream2.writableErrored;
    }
    return (_stream$_writableStat = (_stream$_writableStat2 = stream2._writableState) === null || _stream$_writableStat2 === void 0 ? void 0 : _stream$_writableStat2.errored) !== null && _stream$_writableStat !== void 0 ? _stream$_writableStat : null;
  }
  function isReadableErrored(stream2) {
    var _stream$_readableStat, _stream$_readableStat2;
    if (!isNodeStream(stream2)) {
      return null;
    }
    if (stream2.readableErrored) {
      return stream2.readableErrored;
    }
    return (_stream$_readableStat = (_stream$_readableStat2 = stream2._readableState) === null || _stream$_readableStat2 === void 0 ? void 0 : _stream$_readableStat2.errored) !== null && _stream$_readableStat !== void 0 ? _stream$_readableStat : null;
  }
  function isClosed(stream2) {
    if (!isNodeStream(stream2)) {
      return null;
    }
    if (typeof stream2.closed === "boolean") {
      return stream2.closed;
    }
    const wState = stream2._writableState;
    const rState = stream2._readableState;
    if (typeof (wState === null || wState === void 0 ? void 0 : wState.closed) === "boolean" || typeof (rState === null || rState === void 0 ? void 0 : rState.closed) === "boolean") {
      return (wState === null || wState === void 0 ? void 0 : wState.closed) || (rState === null || rState === void 0 ? void 0 : rState.closed);
    }
    if (typeof stream2._closed === "boolean" && isOutgoingMessage(stream2)) {
      return stream2._closed;
    }
    return null;
  }
  function isOutgoingMessage(stream2) {
    return typeof stream2._closed === "boolean" && typeof stream2._defaultKeepAlive === "boolean" && typeof stream2._removedConnection === "boolean" && typeof stream2._removedContLen === "boolean";
  }
  function isServerResponse(stream2) {
    return typeof stream2._sent100 === "boolean" && isOutgoingMessage(stream2);
  }
  function isServerRequest(stream2) {
    var _stream$req;
    return typeof stream2._consuming === "boolean" && typeof stream2._dumped === "boolean" && ((_stream$req = stream2.req) === null || _stream$req === void 0 ? void 0 : _stream$req.upgradeOrConnect) === void 0;
  }
  function willEmitClose(stream2) {
    if (!isNodeStream(stream2)) return null;
    const wState = stream2._writableState;
    const rState = stream2._readableState;
    const state2 = wState || rState;
    return !state2 && isServerResponse(stream2) || !!(state2 && state2.autoDestroy && state2.emitClose && state2.closed === false);
  }
  function isDisturbed(stream2) {
    var _stream$kIsDisturbed;
    return !!(stream2 && ((_stream$kIsDisturbed = stream2[kIsDisturbed]) !== null && _stream$kIsDisturbed !== void 0 ? _stream$kIsDisturbed : stream2.readableDidRead || stream2.readableAborted));
  }
  function isErrored(stream2) {
    var _ref, _ref2, _ref3, _ref4, _ref5, _stream$kIsErrored, _stream$_readableStat3, _stream$_writableStat3, _stream$_readableStat4, _stream$_writableStat4;
    return !!(stream2 && ((_ref = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_stream$kIsErrored = stream2[kIsErrored]) !== null && _stream$kIsErrored !== void 0 ? _stream$kIsErrored : stream2.readableErrored) !== null && _ref5 !== void 0 ? _ref5 : stream2.writableErrored) !== null && _ref4 !== void 0 ? _ref4 : (_stream$_readableStat3 = stream2._readableState) === null || _stream$_readableStat3 === void 0 ? void 0 : _stream$_readableStat3.errorEmitted) !== null && _ref3 !== void 0 ? _ref3 : (_stream$_writableStat3 = stream2._writableState) === null || _stream$_writableStat3 === void 0 ? void 0 : _stream$_writableStat3.errorEmitted) !== null && _ref2 !== void 0 ? _ref2 : (_stream$_readableStat4 = stream2._readableState) === null || _stream$_readableStat4 === void 0 ? void 0 : _stream$_readableStat4.errored) !== null && _ref !== void 0 ? _ref : (_stream$_writableStat4 = stream2._writableState) === null || _stream$_writableStat4 === void 0 ? void 0 : _stream$_writableStat4.errored));
  }
  utils = {
    isDestroyed,
    kIsDestroyed,
    isDisturbed,
    kIsDisturbed,
    isErrored,
    kIsErrored,
    isReadable,
    kIsReadable,
    kIsClosedPromise,
    kControllerErrorFunction,
    kIsWritable,
    isClosed,
    isDuplexNodeStream,
    isFinished,
    isIterable,
    isReadableNodeStream,
    isReadableStream,
    isReadableEnded,
    isReadableFinished,
    isReadableErrored,
    isNodeStream,
    isWebStream,
    isWritable,
    isWritableNodeStream,
    isWritableStream,
    isWritableEnded,
    isWritableFinished,
    isWritableErrored,
    isServerRequest,
    isServerResponse,
    willEmitClose,
    isTransformStream
  };
  return utils;
}
var hasRequiredEndOfStream;
function requireEndOfStream() {
  if (hasRequiredEndOfStream) return endOfStream.exports;
  hasRequiredEndOfStream = 1;
  const process2 = process$1;
  const { AbortError, codes } = requireErrors();
  const { ERR_INVALID_ARG_TYPE, ERR_STREAM_PREMATURE_CLOSE } = codes;
  const { kEmptyObject, once } = requireUtil();
  const { validateAbortSignal, validateFunction, validateObject, validateBoolean } = requireValidators();
  const { Promise: Promise2, PromisePrototypeThen, SymbolDispose } = requirePrimordials();
  const {
    isClosed,
    isReadable,
    isReadableNodeStream,
    isReadableStream,
    isReadableFinished,
    isReadableErrored,
    isWritable,
    isWritableNodeStream,
    isWritableStream,
    isWritableFinished,
    isWritableErrored,
    isNodeStream,
    willEmitClose: _willEmitClose,
    kIsClosedPromise
  } = requireUtils();
  let addAbortListener;
  function isRequest(stream2) {
    return stream2.setHeader && typeof stream2.abort === "function";
  }
  const nop = () => {
  };
  function eos(stream2, options, callback) {
    var _options$readable, _options$writable;
    if (arguments.length === 2) {
      callback = options;
      options = kEmptyObject;
    } else if (options == null) {
      options = kEmptyObject;
    } else {
      validateObject(options, "options");
    }
    validateFunction(callback, "callback");
    validateAbortSignal(options.signal, "options.signal");
    callback = once(callback);
    if (isReadableStream(stream2) || isWritableStream(stream2)) {
      return eosWeb(stream2, options, callback);
    }
    if (!isNodeStream(stream2)) {
      throw new ERR_INVALID_ARG_TYPE("stream", ["ReadableStream", "WritableStream", "Stream"], stream2);
    }
    const readable2 = (_options$readable = options.readable) !== null && _options$readable !== void 0 ? _options$readable : isReadableNodeStream(stream2);
    const writable2 = (_options$writable = options.writable) !== null && _options$writable !== void 0 ? _options$writable : isWritableNodeStream(stream2);
    const wState = stream2._writableState;
    const rState = stream2._readableState;
    const onlegacyfinish = () => {
      if (!stream2.writable) {
        onfinish();
      }
    };
    let willEmitClose = _willEmitClose(stream2) && isReadableNodeStream(stream2) === readable2 && isWritableNodeStream(stream2) === writable2;
    let writableFinished = isWritableFinished(stream2, false);
    const onfinish = () => {
      writableFinished = true;
      if (stream2.destroyed) {
        willEmitClose = false;
      }
      if (willEmitClose && (!stream2.readable || readable2)) {
        return;
      }
      if (!readable2 || readableFinished) {
        callback.call(stream2);
      }
    };
    let readableFinished = isReadableFinished(stream2, false);
    const onend = () => {
      readableFinished = true;
      if (stream2.destroyed) {
        willEmitClose = false;
      }
      if (willEmitClose && (!stream2.writable || writable2)) {
        return;
      }
      if (!writable2 || writableFinished) {
        callback.call(stream2);
      }
    };
    const onerror = (err) => {
      callback.call(stream2, err);
    };
    let closed = isClosed(stream2);
    const onclose = () => {
      closed = true;
      const errored = isWritableErrored(stream2) || isReadableErrored(stream2);
      if (errored && typeof errored !== "boolean") {
        return callback.call(stream2, errored);
      }
      if (readable2 && !readableFinished && isReadableNodeStream(stream2, true)) {
        if (!isReadableFinished(stream2, false)) return callback.call(stream2, new ERR_STREAM_PREMATURE_CLOSE());
      }
      if (writable2 && !writableFinished) {
        if (!isWritableFinished(stream2, false)) return callback.call(stream2, new ERR_STREAM_PREMATURE_CLOSE());
      }
      callback.call(stream2);
    };
    const onclosed = () => {
      closed = true;
      const errored = isWritableErrored(stream2) || isReadableErrored(stream2);
      if (errored && typeof errored !== "boolean") {
        return callback.call(stream2, errored);
      }
      callback.call(stream2);
    };
    const onrequest = () => {
      stream2.req.on("finish", onfinish);
    };
    if (isRequest(stream2)) {
      stream2.on("complete", onfinish);
      if (!willEmitClose) {
        stream2.on("abort", onclose);
      }
      if (stream2.req) {
        onrequest();
      } else {
        stream2.on("request", onrequest);
      }
    } else if (writable2 && !wState) {
      stream2.on("end", onlegacyfinish);
      stream2.on("close", onlegacyfinish);
    }
    if (!willEmitClose && typeof stream2.aborted === "boolean") {
      stream2.on("aborted", onclose);
    }
    stream2.on("end", onend);
    stream2.on("finish", onfinish);
    if (options.error !== false) {
      stream2.on("error", onerror);
    }
    stream2.on("close", onclose);
    if (closed) {
      process2.nextTick(onclose);
    } else if (wState !== null && wState !== void 0 && wState.errorEmitted || rState !== null && rState !== void 0 && rState.errorEmitted) {
      if (!willEmitClose) {
        process2.nextTick(onclosed);
      }
    } else if (!readable2 && (!willEmitClose || isReadable(stream2)) && (writableFinished || isWritable(stream2) === false)) {
      process2.nextTick(onclosed);
    } else if (!writable2 && (!willEmitClose || isWritable(stream2)) && (readableFinished || isReadable(stream2) === false)) {
      process2.nextTick(onclosed);
    } else if (rState && stream2.req && stream2.aborted) {
      process2.nextTick(onclosed);
    }
    const cleanup = () => {
      callback = nop;
      stream2.removeListener("aborted", onclose);
      stream2.removeListener("complete", onfinish);
      stream2.removeListener("abort", onclose);
      stream2.removeListener("request", onrequest);
      if (stream2.req) stream2.req.removeListener("finish", onfinish);
      stream2.removeListener("end", onlegacyfinish);
      stream2.removeListener("close", onlegacyfinish);
      stream2.removeListener("finish", onfinish);
      stream2.removeListener("end", onend);
      stream2.removeListener("error", onerror);
      stream2.removeListener("close", onclose);
    };
    if (options.signal && !closed) {
      const abort = () => {
        const endCallback = callback;
        cleanup();
        endCallback.call(
          stream2,
          new AbortError(void 0, {
            cause: options.signal.reason
          })
        );
      };
      if (options.signal.aborted) {
        process2.nextTick(abort);
      } else {
        addAbortListener = addAbortListener || requireUtil().addAbortListener;
        const disposable = addAbortListener(options.signal, abort);
        const originalCallback = callback;
        callback = once((...args) => {
          disposable[SymbolDispose]();
          originalCallback.apply(stream2, args);
        });
      }
    }
    return cleanup;
  }
  function eosWeb(stream2, options, callback) {
    let isAborted = false;
    let abort = nop;
    if (options.signal) {
      abort = () => {
        isAborted = true;
        callback.call(
          stream2,
          new AbortError(void 0, {
            cause: options.signal.reason
          })
        );
      };
      if (options.signal.aborted) {
        process2.nextTick(abort);
      } else {
        addAbortListener = addAbortListener || requireUtil().addAbortListener;
        const disposable = addAbortListener(options.signal, abort);
        const originalCallback = callback;
        callback = once((...args) => {
          disposable[SymbolDispose]();
          originalCallback.apply(stream2, args);
        });
      }
    }
    const resolverFn = (...args) => {
      if (!isAborted) {
        process2.nextTick(() => callback.apply(stream2, args));
      }
    };
    PromisePrototypeThen(stream2[kIsClosedPromise].promise, resolverFn, resolverFn);
    return nop;
  }
  function finished(stream2, opts) {
    var _opts;
    let autoCleanup = false;
    if (opts === null) {
      opts = kEmptyObject;
    }
    if ((_opts = opts) !== null && _opts !== void 0 && _opts.cleanup) {
      validateBoolean(opts.cleanup, "cleanup");
      autoCleanup = opts.cleanup;
    }
    return new Promise2((resolve, reject) => {
      const cleanup = eos(stream2, opts, (err) => {
        if (autoCleanup) {
          cleanup();
        }
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  endOfStream.exports = eos;
  endOfStream.exports.finished = finished;
  return endOfStream.exports;
}
var destroy_1;
var hasRequiredDestroy;
function requireDestroy() {
  if (hasRequiredDestroy) return destroy_1;
  hasRequiredDestroy = 1;
  const process2 = process$1;
  const {
    aggregateTwoErrors,
    codes: { ERR_MULTIPLE_CALLBACK },
    AbortError
  } = requireErrors();
  const { Symbol: Symbol2 } = requirePrimordials();
  const { kIsDestroyed, isDestroyed, isFinished, isServerRequest } = requireUtils();
  const kDestroy = Symbol2("kDestroy");
  const kConstruct = Symbol2("kConstruct");
  function checkError(err, w, r) {
    if (err) {
      err.stack;
      if (w && !w.errored) {
        w.errored = err;
      }
      if (r && !r.errored) {
        r.errored = err;
      }
    }
  }
  function destroy(err, cb) {
    const r = this._readableState;
    const w = this._writableState;
    const s = w || r;
    if (w !== null && w !== void 0 && w.destroyed || r !== null && r !== void 0 && r.destroyed) {
      if (typeof cb === "function") {
        cb();
      }
      return this;
    }
    checkError(err, w, r);
    if (w) {
      w.destroyed = true;
    }
    if (r) {
      r.destroyed = true;
    }
    if (!s.constructed) {
      this.once(kDestroy, function(er) {
        _destroy(this, aggregateTwoErrors(er, err), cb);
      });
    } else {
      _destroy(this, err, cb);
    }
    return this;
  }
  function _destroy(self, err, cb) {
    let called = false;
    function onDestroy(err2) {
      if (called) {
        return;
      }
      called = true;
      const r = self._readableState;
      const w = self._writableState;
      checkError(err2, w, r);
      if (w) {
        w.closed = true;
      }
      if (r) {
        r.closed = true;
      }
      if (typeof cb === "function") {
        cb(err2);
      }
      if (err2) {
        process2.nextTick(emitErrorCloseNT, self, err2);
      } else {
        process2.nextTick(emitCloseNT, self);
      }
    }
    try {
      self._destroy(err || null, onDestroy);
    } catch (err2) {
      onDestroy(err2);
    }
  }
  function emitErrorCloseNT(self, err) {
    emitErrorNT(self, err);
    emitCloseNT(self);
  }
  function emitCloseNT(self) {
    const r = self._readableState;
    const w = self._writableState;
    if (w) {
      w.closeEmitted = true;
    }
    if (r) {
      r.closeEmitted = true;
    }
    if (w !== null && w !== void 0 && w.emitClose || r !== null && r !== void 0 && r.emitClose) {
      self.emit("close");
    }
  }
  function emitErrorNT(self, err) {
    const r = self._readableState;
    const w = self._writableState;
    if (w !== null && w !== void 0 && w.errorEmitted || r !== null && r !== void 0 && r.errorEmitted) {
      return;
    }
    if (w) {
      w.errorEmitted = true;
    }
    if (r) {
      r.errorEmitted = true;
    }
    self.emit("error", err);
  }
  function undestroy() {
    const r = this._readableState;
    const w = this._writableState;
    if (r) {
      r.constructed = true;
      r.closed = false;
      r.closeEmitted = false;
      r.destroyed = false;
      r.errored = null;
      r.errorEmitted = false;
      r.reading = false;
      r.ended = r.readable === false;
      r.endEmitted = r.readable === false;
    }
    if (w) {
      w.constructed = true;
      w.destroyed = false;
      w.closed = false;
      w.closeEmitted = false;
      w.errored = null;
      w.errorEmitted = false;
      w.finalCalled = false;
      w.prefinished = false;
      w.ended = w.writable === false;
      w.ending = w.writable === false;
      w.finished = w.writable === false;
    }
  }
  function errorOrDestroy(stream2, err, sync) {
    const r = stream2._readableState;
    const w = stream2._writableState;
    if (w !== null && w !== void 0 && w.destroyed || r !== null && r !== void 0 && r.destroyed) {
      return this;
    }
    if (r !== null && r !== void 0 && r.autoDestroy || w !== null && w !== void 0 && w.autoDestroy)
      stream2.destroy(err);
    else if (err) {
      err.stack;
      if (w && !w.errored) {
        w.errored = err;
      }
      if (r && !r.errored) {
        r.errored = err;
      }
      if (sync) {
        process2.nextTick(emitErrorNT, stream2, err);
      } else {
        emitErrorNT(stream2, err);
      }
    }
  }
  function construct(stream2, cb) {
    if (typeof stream2._construct !== "function") {
      return;
    }
    const r = stream2._readableState;
    const w = stream2._writableState;
    if (r) {
      r.constructed = false;
    }
    if (w) {
      w.constructed = false;
    }
    stream2.once(kConstruct, cb);
    if (stream2.listenerCount(kConstruct) > 1) {
      return;
    }
    process2.nextTick(constructNT, stream2);
  }
  function constructNT(stream2) {
    let called = false;
    function onConstruct(err) {
      if (called) {
        errorOrDestroy(stream2, err !== null && err !== void 0 ? err : new ERR_MULTIPLE_CALLBACK());
        return;
      }
      called = true;
      const r = stream2._readableState;
      const w = stream2._writableState;
      const s = w || r;
      if (r) {
        r.constructed = true;
      }
      if (w) {
        w.constructed = true;
      }
      if (s.destroyed) {
        stream2.emit(kDestroy, err);
      } else if (err) {
        errorOrDestroy(stream2, err, true);
      } else {
        process2.nextTick(emitConstructNT, stream2);
      }
    }
    try {
      stream2._construct((err) => {
        process2.nextTick(onConstruct, err);
      });
    } catch (err) {
      process2.nextTick(onConstruct, err);
    }
  }
  function emitConstructNT(stream2) {
    stream2.emit(kConstruct);
  }
  function isRequest(stream2) {
    return (stream2 === null || stream2 === void 0 ? void 0 : stream2.setHeader) && typeof stream2.abort === "function";
  }
  function emitCloseLegacy(stream2) {
    stream2.emit("close");
  }
  function emitErrorCloseLegacy(stream2, err) {
    stream2.emit("error", err);
    process2.nextTick(emitCloseLegacy, stream2);
  }
  function destroyer(stream2, err) {
    if (!stream2 || isDestroyed(stream2)) {
      return;
    }
    if (!err && !isFinished(stream2)) {
      err = new AbortError();
    }
    if (isServerRequest(stream2)) {
      stream2.socket = null;
      stream2.destroy(err);
    } else if (isRequest(stream2)) {
      stream2.abort();
    } else if (isRequest(stream2.req)) {
      stream2.req.abort();
    } else if (typeof stream2.destroy === "function") {
      stream2.destroy(err);
    } else if (typeof stream2.close === "function") {
      stream2.close();
    } else if (err) {
      process2.nextTick(emitErrorCloseLegacy, stream2, err);
    } else {
      process2.nextTick(emitCloseLegacy, stream2);
    }
    if (!stream2.destroyed) {
      stream2[kIsDestroyed] = true;
    }
  }
  destroy_1 = {
    construct,
    destroyer,
    destroy,
    undestroy,
    errorOrDestroy
  };
  return destroy_1;
}
var legacy;
var hasRequiredLegacy;
function requireLegacy() {
  if (hasRequiredLegacy) return legacy;
  hasRequiredLegacy = 1;
  const { ArrayIsArray, ObjectSetPrototypeOf } = requirePrimordials();
  const { EventEmitter: EE } = require$$0$2;
  function Stream(opts) {
    EE.call(this, opts);
  }
  ObjectSetPrototypeOf(Stream.prototype, EE.prototype);
  ObjectSetPrototypeOf(Stream, EE);
  Stream.prototype.pipe = function(dest, options) {
    const source = this;
    function ondata(chunk) {
      if (dest.writable && dest.write(chunk) === false && source.pause) {
        source.pause();
      }
    }
    source.on("data", ondata);
    function ondrain() {
      if (source.readable && source.resume) {
        source.resume();
      }
    }
    dest.on("drain", ondrain);
    if (!dest._isStdio && (!options || options.end !== false)) {
      source.on("end", onend);
      source.on("close", onclose);
    }
    let didOnEnd = false;
    function onend() {
      if (didOnEnd) return;
      didOnEnd = true;
      dest.end();
    }
    function onclose() {
      if (didOnEnd) return;
      didOnEnd = true;
      if (typeof dest.destroy === "function") dest.destroy();
    }
    function onerror(er) {
      cleanup();
      if (EE.listenerCount(this, "error") === 0) {
        this.emit("error", er);
      }
    }
    prependListener(source, "error", onerror);
    prependListener(dest, "error", onerror);
    function cleanup() {
      source.removeListener("data", ondata);
      dest.removeListener("drain", ondrain);
      source.removeListener("end", onend);
      source.removeListener("close", onclose);
      source.removeListener("error", onerror);
      dest.removeListener("error", onerror);
      source.removeListener("end", cleanup);
      source.removeListener("close", cleanup);
      dest.removeListener("close", cleanup);
    }
    source.on("end", cleanup);
    source.on("close", cleanup);
    dest.on("close", cleanup);
    dest.emit("pipe", source);
    return dest;
  };
  function prependListener(emitter, event, fn) {
    if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
    else if (ArrayIsArray(emitter._events[event])) emitter._events[event].unshift(fn);
    else emitter._events[event] = [fn, emitter._events[event]];
  }
  legacy = {
    Stream,
    prependListener
  };
  return legacy;
}
var addAbortSignal = { exports: {} };
var hasRequiredAddAbortSignal;
function requireAddAbortSignal() {
  if (hasRequiredAddAbortSignal) return addAbortSignal.exports;
  hasRequiredAddAbortSignal = 1;
  (function(module) {
    const { SymbolDispose } = requirePrimordials();
    const { AbortError, codes } = requireErrors();
    const { isNodeStream, isWebStream, kControllerErrorFunction } = requireUtils();
    const eos = requireEndOfStream();
    const { ERR_INVALID_ARG_TYPE } = codes;
    let addAbortListener;
    const validateAbortSignal = (signal, name) => {
      if (typeof signal !== "object" || !("aborted" in signal)) {
        throw new ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
      }
    };
    module.exports.addAbortSignal = function addAbortSignal2(signal, stream2) {
      validateAbortSignal(signal, "signal");
      if (!isNodeStream(stream2) && !isWebStream(stream2)) {
        throw new ERR_INVALID_ARG_TYPE("stream", ["ReadableStream", "WritableStream", "Stream"], stream2);
      }
      return module.exports.addAbortSignalNoValidate(signal, stream2);
    };
    module.exports.addAbortSignalNoValidate = function(signal, stream2) {
      if (typeof signal !== "object" || !("aborted" in signal)) {
        return stream2;
      }
      const onAbort = isNodeStream(stream2) ? () => {
        stream2.destroy(
          new AbortError(void 0, {
            cause: signal.reason
          })
        );
      } : () => {
        stream2[kControllerErrorFunction](
          new AbortError(void 0, {
            cause: signal.reason
          })
        );
      };
      if (signal.aborted) {
        onAbort();
      } else {
        addAbortListener = addAbortListener || requireUtil().addAbortListener;
        const disposable = addAbortListener(signal, onAbort);
        eos(stream2, disposable[SymbolDispose]);
      }
      return stream2;
    };
  })(addAbortSignal);
  return addAbortSignal.exports;
}
var buffer_list;
var hasRequiredBuffer_list;
function requireBuffer_list() {
  if (hasRequiredBuffer_list) return buffer_list;
  hasRequiredBuffer_list = 1;
  const { StringPrototypeSlice, SymbolIterator, TypedArrayPrototypeSet, Uint8Array: Uint8Array2 } = requirePrimordials();
  const { Buffer } = require$$0$1;
  const { inspect: inspect2 } = requireUtil();
  buffer_list = class BufferList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
    push(v) {
      const entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;
      else this.head = entry;
      this.tail = entry;
      ++this.length;
    }
    unshift(v) {
      const entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    }
    shift() {
      if (this.length === 0) return;
      const ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;
      else this.head = this.head.next;
      --this.length;
      return ret;
    }
    clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
    join(s) {
      if (this.length === 0) return "";
      let p = this.head;
      let ret = "" + p.data;
      while ((p = p.next) !== null) ret += s + p.data;
      return ret;
    }
    concat(n) {
      if (this.length === 0) return Buffer.alloc(0);
      const ret = Buffer.allocUnsafe(n >>> 0);
      let p = this.head;
      let i = 0;
      while (p) {
        TypedArrayPrototypeSet(ret, p.data, i);
        i += p.data.length;
        p = p.next;
      }
      return ret;
    }
    // Consumes a specified amount of bytes or characters from the buffered data.
    consume(n, hasStrings) {
      const data = this.head.data;
      if (n < data.length) {
        const slice = data.slice(0, n);
        this.head.data = data.slice(n);
        return slice;
      }
      if (n === data.length) {
        return this.shift();
      }
      return hasStrings ? this._getString(n) : this._getBuffer(n);
    }
    first() {
      return this.head.data;
    }
    *[SymbolIterator]() {
      for (let p = this.head; p; p = p.next) {
        yield p.data;
      }
    }
    // Consumes a specified amount of characters from the buffered data.
    _getString(n) {
      let ret = "";
      let p = this.head;
      let c = 0;
      do {
        const str = p.data;
        if (n > str.length) {
          ret += str;
          n -= str.length;
        } else {
          if (n === str.length) {
            ret += str;
            ++c;
            if (p.next) this.head = p.next;
            else this.head = this.tail = null;
          } else {
            ret += StringPrototypeSlice(str, 0, n);
            this.head = p;
            p.data = StringPrototypeSlice(str, n);
          }
          break;
        }
        ++c;
      } while ((p = p.next) !== null);
      this.length -= c;
      return ret;
    }
    // Consumes a specified amount of bytes from the buffered data.
    _getBuffer(n) {
      const ret = Buffer.allocUnsafe(n);
      const retLen = n;
      let p = this.head;
      let c = 0;
      do {
        const buf = p.data;
        if (n > buf.length) {
          TypedArrayPrototypeSet(ret, buf, retLen - n);
          n -= buf.length;
        } else {
          if (n === buf.length) {
            TypedArrayPrototypeSet(ret, buf, retLen - n);
            ++c;
            if (p.next) this.head = p.next;
            else this.head = this.tail = null;
          } else {
            TypedArrayPrototypeSet(ret, new Uint8Array2(buf.buffer, buf.byteOffset, n), retLen - n);
            this.head = p;
            p.data = buf.slice(n);
          }
          break;
        }
        ++c;
      } while ((p = p.next) !== null);
      this.length -= c;
      return ret;
    }
    // Make sure the linked list only shows the minimal necessary information.
    [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](_, options) {
      return inspect2(this, {
        ...options,
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      });
    }
  };
  return buffer_list;
}
var state;
var hasRequiredState;
function requireState() {
  if (hasRequiredState) return state;
  hasRequiredState = 1;
  const { MathFloor, NumberIsInteger } = requirePrimordials();
  const { validateInteger } = requireValidators();
  const { ERR_INVALID_ARG_VALUE } = requireErrors().codes;
  let defaultHighWaterMarkBytes = 16 * 1024;
  let defaultHighWaterMarkObjectMode = 16;
  function highWaterMarkFrom(options, isDuplex, duplexKey) {
    return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
  }
  function getDefaultHighWaterMark(objectMode) {
    return objectMode ? defaultHighWaterMarkObjectMode : defaultHighWaterMarkBytes;
  }
  function setDefaultHighWaterMark(objectMode, value) {
    validateInteger(value, "value", 0);
    if (objectMode) {
      defaultHighWaterMarkObjectMode = value;
    } else {
      defaultHighWaterMarkBytes = value;
    }
  }
  function getHighWaterMark(state2, options, duplexKey, isDuplex) {
    const hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
    if (hwm != null) {
      if (!NumberIsInteger(hwm) || hwm < 0) {
        const name = isDuplex ? `options.${duplexKey}` : "options.highWaterMark";
        throw new ERR_INVALID_ARG_VALUE(name, hwm);
      }
      return MathFloor(hwm);
    }
    return getDefaultHighWaterMark(state2.objectMode);
  }
  state = {
    getHighWaterMark,
    getDefaultHighWaterMark,
    setDefaultHighWaterMark
  };
  return state;
}
var from_1;
var hasRequiredFrom;
function requireFrom() {
  if (hasRequiredFrom) return from_1;
  hasRequiredFrom = 1;
  const process2 = process$1;
  const { PromisePrototypeThen, SymbolAsyncIterator, SymbolIterator } = requirePrimordials();
  const { Buffer } = require$$0$1;
  const { ERR_INVALID_ARG_TYPE, ERR_STREAM_NULL_VALUES } = requireErrors().codes;
  function from(Readable, iterable, opts) {
    let iterator;
    if (typeof iterable === "string" || iterable instanceof Buffer) {
      return new Readable({
        objectMode: true,
        ...opts,
        read() {
          this.push(iterable);
          this.push(null);
        }
      });
    }
    let isAsync;
    if (iterable && iterable[SymbolAsyncIterator]) {
      isAsync = true;
      iterator = iterable[SymbolAsyncIterator]();
    } else if (iterable && iterable[SymbolIterator]) {
      isAsync = false;
      iterator = iterable[SymbolIterator]();
    } else {
      throw new ERR_INVALID_ARG_TYPE("iterable", ["Iterable"], iterable);
    }
    const readable2 = new Readable({
      objectMode: true,
      highWaterMark: 1,
      // TODO(ronag): What options should be allowed?
      ...opts
    });
    let reading = false;
    readable2._read = function() {
      if (!reading) {
        reading = true;
        next();
      }
    };
    readable2._destroy = function(error, cb) {
      PromisePrototypeThen(
        close(error),
        () => process2.nextTick(cb, error),
        // nextTick is here in case cb throws
        (e) => process2.nextTick(cb, e || error)
      );
    };
    async function close(error) {
      const hadError = error !== void 0 && error !== null;
      const hasThrow = typeof iterator.throw === "function";
      if (hadError && hasThrow) {
        const { value, done } = await iterator.throw(error);
        await value;
        if (done) {
          return;
        }
      }
      if (typeof iterator.return === "function") {
        const { value } = await iterator.return();
        await value;
      }
    }
    async function next() {
      for (; ; ) {
        try {
          const { value, done } = isAsync ? await iterator.next() : iterator.next();
          if (done) {
            readable2.push(null);
          } else {
            const res = value && typeof value.then === "function" ? await value : value;
            if (res === null) {
              reading = false;
              throw new ERR_STREAM_NULL_VALUES();
            } else if (readable2.push(res)) {
              continue;
            } else {
              reading = false;
            }
          }
        } catch (err) {
          readable2.destroy(err);
        }
        break;
      }
    }
    return readable2;
  }
  from_1 = from;
  return from_1;
}
var readable;
var hasRequiredReadable;
function requireReadable() {
  if (hasRequiredReadable) return readable;
  hasRequiredReadable = 1;
  const process2 = process$1;
  const {
    ArrayPrototypeIndexOf,
    NumberIsInteger,
    NumberIsNaN,
    NumberParseInt,
    ObjectDefineProperties,
    ObjectKeys,
    ObjectSetPrototypeOf,
    Promise: Promise2,
    SafeSet,
    SymbolAsyncDispose,
    SymbolAsyncIterator,
    Symbol: Symbol2
  } = requirePrimordials();
  readable = Readable;
  Readable.ReadableState = ReadableState;
  const { EventEmitter: EE } = require$$0$2;
  const { Stream, prependListener } = requireLegacy();
  const { Buffer } = require$$0$1;
  const { addAbortSignal: addAbortSignal2 } = requireAddAbortSignal();
  const eos = requireEndOfStream();
  let debug = requireUtil().debuglog("stream", (fn) => {
    debug = fn;
  });
  const BufferList = requireBuffer_list();
  const destroyImpl = requireDestroy();
  const { getHighWaterMark, getDefaultHighWaterMark } = requireState();
  const {
    aggregateTwoErrors,
    codes: {
      ERR_INVALID_ARG_TYPE,
      ERR_METHOD_NOT_IMPLEMENTED,
      ERR_OUT_OF_RANGE,
      ERR_STREAM_PUSH_AFTER_EOF,
      ERR_STREAM_UNSHIFT_AFTER_END_EVENT
    },
    AbortError
  } = requireErrors();
  const { validateObject } = requireValidators();
  const kPaused = Symbol2("kPaused");
  const { StringDecoder } = require$$13;
  const from = requireFrom();
  ObjectSetPrototypeOf(Readable.prototype, Stream.prototype);
  ObjectSetPrototypeOf(Readable, Stream);
  const nop = () => {
  };
  const { errorOrDestroy } = destroyImpl;
  const kObjectMode = 1 << 0;
  const kEnded = 1 << 1;
  const kEndEmitted = 1 << 2;
  const kReading = 1 << 3;
  const kConstructed = 1 << 4;
  const kSync = 1 << 5;
  const kNeedReadable = 1 << 6;
  const kEmittedReadable = 1 << 7;
  const kReadableListening = 1 << 8;
  const kResumeScheduled = 1 << 9;
  const kErrorEmitted = 1 << 10;
  const kEmitClose = 1 << 11;
  const kAutoDestroy = 1 << 12;
  const kDestroyed = 1 << 13;
  const kClosed = 1 << 14;
  const kCloseEmitted = 1 << 15;
  const kMultiAwaitDrain = 1 << 16;
  const kReadingMore = 1 << 17;
  const kDataEmitted = 1 << 18;
  function makeBitMapDescriptor(bit) {
    return {
      enumerable: false,
      get() {
        return (this.state & bit) !== 0;
      },
      set(value) {
        if (value) this.state |= bit;
        else this.state &= ~bit;
      }
    };
  }
  ObjectDefineProperties(ReadableState.prototype, {
    objectMode: makeBitMapDescriptor(kObjectMode),
    ended: makeBitMapDescriptor(kEnded),
    endEmitted: makeBitMapDescriptor(kEndEmitted),
    reading: makeBitMapDescriptor(kReading),
    // Stream is still being constructed and cannot be
    // destroyed until construction finished or failed.
    // Async construction is opt in, therefore we start as
    // constructed.
    constructed: makeBitMapDescriptor(kConstructed),
    // A flag to be able to tell if the event 'readable'/'data' is emitted
    // immediately, or on a later tick.  We set this to true at first, because
    // any actions that shouldn't happen until "later" should generally also
    // not happen before the first read call.
    sync: makeBitMapDescriptor(kSync),
    // Whenever we return null, then we set a flag to say
    // that we're awaiting a 'readable' event emission.
    needReadable: makeBitMapDescriptor(kNeedReadable),
    emittedReadable: makeBitMapDescriptor(kEmittedReadable),
    readableListening: makeBitMapDescriptor(kReadableListening),
    resumeScheduled: makeBitMapDescriptor(kResumeScheduled),
    // True if the error was already emitted and should not be thrown again.
    errorEmitted: makeBitMapDescriptor(kErrorEmitted),
    emitClose: makeBitMapDescriptor(kEmitClose),
    autoDestroy: makeBitMapDescriptor(kAutoDestroy),
    // Has it been destroyed.
    destroyed: makeBitMapDescriptor(kDestroyed),
    // Indicates whether the stream has finished destroying.
    closed: makeBitMapDescriptor(kClosed),
    // True if close has been emitted or would have been emitted
    // depending on emitClose.
    closeEmitted: makeBitMapDescriptor(kCloseEmitted),
    multiAwaitDrain: makeBitMapDescriptor(kMultiAwaitDrain),
    // If true, a maybeReadMore has been scheduled.
    readingMore: makeBitMapDescriptor(kReadingMore),
    dataEmitted: makeBitMapDescriptor(kDataEmitted)
  });
  function ReadableState(options, stream2, isDuplex) {
    if (typeof isDuplex !== "boolean") isDuplex = stream2 instanceof requireDuplex();
    this.state = kEmitClose | kAutoDestroy | kConstructed | kSync;
    if (options && options.objectMode) this.state |= kObjectMode;
    if (isDuplex && options && options.readableObjectMode) this.state |= kObjectMode;
    this.highWaterMark = options ? getHighWaterMark(this, options, "readableHighWaterMark", isDuplex) : getDefaultHighWaterMark(false);
    this.buffer = new BufferList();
    this.length = 0;
    this.pipes = [];
    this.flowing = null;
    this[kPaused] = null;
    if (options && options.emitClose === false) this.state &= ~kEmitClose;
    if (options && options.autoDestroy === false) this.state &= ~kAutoDestroy;
    this.errored = null;
    this.defaultEncoding = options && options.defaultEncoding || "utf8";
    this.awaitDrainWriters = null;
    this.decoder = null;
    this.encoding = null;
    if (options && options.encoding) {
      this.decoder = new StringDecoder(options.encoding);
      this.encoding = options.encoding;
    }
  }
  function Readable(options) {
    if (!(this instanceof Readable)) return new Readable(options);
    const isDuplex = this instanceof requireDuplex();
    this._readableState = new ReadableState(options, this, isDuplex);
    if (options) {
      if (typeof options.read === "function") this._read = options.read;
      if (typeof options.destroy === "function") this._destroy = options.destroy;
      if (typeof options.construct === "function") this._construct = options.construct;
      if (options.signal && !isDuplex) addAbortSignal2(options.signal, this);
    }
    Stream.call(this, options);
    destroyImpl.construct(this, () => {
      if (this._readableState.needReadable) {
        maybeReadMore(this, this._readableState);
      }
    });
  }
  Readable.prototype.destroy = destroyImpl.destroy;
  Readable.prototype._undestroy = destroyImpl.undestroy;
  Readable.prototype._destroy = function(err, cb) {
    cb(err);
  };
  Readable.prototype[EE.captureRejectionSymbol] = function(err) {
    this.destroy(err);
  };
  Readable.prototype[SymbolAsyncDispose] = function() {
    let error;
    if (!this.destroyed) {
      error = this.readableEnded ? null : new AbortError();
      this.destroy(error);
    }
    return new Promise2((resolve, reject) => eos(this, (err) => err && err !== error ? reject(err) : resolve(null)));
  };
  Readable.prototype.push = function(chunk, encoding) {
    return readableAddChunk(this, chunk, encoding, false);
  };
  Readable.prototype.unshift = function(chunk, encoding) {
    return readableAddChunk(this, chunk, encoding, true);
  };
  function readableAddChunk(stream2, chunk, encoding, addToFront) {
    debug("readableAddChunk", chunk);
    const state2 = stream2._readableState;
    let err;
    if ((state2.state & kObjectMode) === 0) {
      if (typeof chunk === "string") {
        encoding = encoding || state2.defaultEncoding;
        if (state2.encoding !== encoding) {
          if (addToFront && state2.encoding) {
            chunk = Buffer.from(chunk, encoding).toString(state2.encoding);
          } else {
            chunk = Buffer.from(chunk, encoding);
            encoding = "";
          }
        }
      } else if (chunk instanceof Buffer) {
        encoding = "";
      } else if (Stream._isUint8Array(chunk)) {
        chunk = Stream._uint8ArrayToBuffer(chunk);
        encoding = "";
      } else if (chunk != null) {
        err = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
    }
    if (err) {
      errorOrDestroy(stream2, err);
    } else if (chunk === null) {
      state2.state &= ~kReading;
      onEofChunk(stream2, state2);
    } else if ((state2.state & kObjectMode) !== 0 || chunk && chunk.length > 0) {
      if (addToFront) {
        if ((state2.state & kEndEmitted) !== 0) errorOrDestroy(stream2, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
        else if (state2.destroyed || state2.errored) return false;
        else addChunk(stream2, state2, chunk, true);
      } else if (state2.ended) {
        errorOrDestroy(stream2, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state2.destroyed || state2.errored) {
        return false;
      } else {
        state2.state &= ~kReading;
        if (state2.decoder && !encoding) {
          chunk = state2.decoder.write(chunk);
          if (state2.objectMode || chunk.length !== 0) addChunk(stream2, state2, chunk, false);
          else maybeReadMore(stream2, state2);
        } else {
          addChunk(stream2, state2, chunk, false);
        }
      }
    } else if (!addToFront) {
      state2.state &= ~kReading;
      maybeReadMore(stream2, state2);
    }
    return !state2.ended && (state2.length < state2.highWaterMark || state2.length === 0);
  }
  function addChunk(stream2, state2, chunk, addToFront) {
    if (state2.flowing && state2.length === 0 && !state2.sync && stream2.listenerCount("data") > 0) {
      if ((state2.state & kMultiAwaitDrain) !== 0) {
        state2.awaitDrainWriters.clear();
      } else {
        state2.awaitDrainWriters = null;
      }
      state2.dataEmitted = true;
      stream2.emit("data", chunk);
    } else {
      state2.length += state2.objectMode ? 1 : chunk.length;
      if (addToFront) state2.buffer.unshift(chunk);
      else state2.buffer.push(chunk);
      if ((state2.state & kNeedReadable) !== 0) emitReadable(stream2);
    }
    maybeReadMore(stream2, state2);
  }
  Readable.prototype.isPaused = function() {
    const state2 = this._readableState;
    return state2[kPaused] === true || state2.flowing === false;
  };
  Readable.prototype.setEncoding = function(enc) {
    const decoder = new StringDecoder(enc);
    this._readableState.decoder = decoder;
    this._readableState.encoding = this._readableState.decoder.encoding;
    const buffer = this._readableState.buffer;
    let content = "";
    for (const data of buffer) {
      content += decoder.write(data);
    }
    buffer.clear();
    if (content !== "") buffer.push(content);
    this._readableState.length = content.length;
    return this;
  };
  const MAX_HWM = 1073741824;
  function computeNewHighWaterMark(n) {
    if (n > MAX_HWM) {
      throw new ERR_OUT_OF_RANGE("size", "<= 1GiB", n);
    } else {
      n--;
      n |= n >>> 1;
      n |= n >>> 2;
      n |= n >>> 4;
      n |= n >>> 8;
      n |= n >>> 16;
      n++;
    }
    return n;
  }
  function howMuchToRead(n, state2) {
    if (n <= 0 || state2.length === 0 && state2.ended) return 0;
    if ((state2.state & kObjectMode) !== 0) return 1;
    if (NumberIsNaN(n)) {
      if (state2.flowing && state2.length) return state2.buffer.first().length;
      return state2.length;
    }
    if (n <= state2.length) return n;
    return state2.ended ? state2.length : 0;
  }
  Readable.prototype.read = function(n) {
    debug("read", n);
    if (n === void 0) {
      n = NaN;
    } else if (!NumberIsInteger(n)) {
      n = NumberParseInt(n, 10);
    }
    const state2 = this._readableState;
    const nOrig = n;
    if (n > state2.highWaterMark) state2.highWaterMark = computeNewHighWaterMark(n);
    if (n !== 0) state2.state &= ~kEmittedReadable;
    if (n === 0 && state2.needReadable && ((state2.highWaterMark !== 0 ? state2.length >= state2.highWaterMark : state2.length > 0) || state2.ended)) {
      debug("read: emitReadable", state2.length, state2.ended);
      if (state2.length === 0 && state2.ended) endReadable(this);
      else emitReadable(this);
      return null;
    }
    n = howMuchToRead(n, state2);
    if (n === 0 && state2.ended) {
      if (state2.length === 0) endReadable(this);
      return null;
    }
    let doRead = (state2.state & kNeedReadable) !== 0;
    debug("need readable", doRead);
    if (state2.length === 0 || state2.length - n < state2.highWaterMark) {
      doRead = true;
      debug("length less than watermark", doRead);
    }
    if (state2.ended || state2.reading || state2.destroyed || state2.errored || !state2.constructed) {
      doRead = false;
      debug("reading, ended or constructing", doRead);
    } else if (doRead) {
      debug("do read");
      state2.state |= kReading | kSync;
      if (state2.length === 0) state2.state |= kNeedReadable;
      try {
        this._read(state2.highWaterMark);
      } catch (err) {
        errorOrDestroy(this, err);
      }
      state2.state &= ~kSync;
      if (!state2.reading) n = howMuchToRead(nOrig, state2);
    }
    let ret;
    if (n > 0) ret = fromList(n, state2);
    else ret = null;
    if (ret === null) {
      state2.needReadable = state2.length <= state2.highWaterMark;
      n = 0;
    } else {
      state2.length -= n;
      if (state2.multiAwaitDrain) {
        state2.awaitDrainWriters.clear();
      } else {
        state2.awaitDrainWriters = null;
      }
    }
    if (state2.length === 0) {
      if (!state2.ended) state2.needReadable = true;
      if (nOrig !== n && state2.ended) endReadable(this);
    }
    if (ret !== null && !state2.errorEmitted && !state2.closeEmitted) {
      state2.dataEmitted = true;
      this.emit("data", ret);
    }
    return ret;
  };
  function onEofChunk(stream2, state2) {
    debug("onEofChunk");
    if (state2.ended) return;
    if (state2.decoder) {
      const chunk = state2.decoder.end();
      if (chunk && chunk.length) {
        state2.buffer.push(chunk);
        state2.length += state2.objectMode ? 1 : chunk.length;
      }
    }
    state2.ended = true;
    if (state2.sync) {
      emitReadable(stream2);
    } else {
      state2.needReadable = false;
      state2.emittedReadable = true;
      emitReadable_(stream2);
    }
  }
  function emitReadable(stream2) {
    const state2 = stream2._readableState;
    debug("emitReadable", state2.needReadable, state2.emittedReadable);
    state2.needReadable = false;
    if (!state2.emittedReadable) {
      debug("emitReadable", state2.flowing);
      state2.emittedReadable = true;
      process2.nextTick(emitReadable_, stream2);
    }
  }
  function emitReadable_(stream2) {
    const state2 = stream2._readableState;
    debug("emitReadable_", state2.destroyed, state2.length, state2.ended);
    if (!state2.destroyed && !state2.errored && (state2.length || state2.ended)) {
      stream2.emit("readable");
      state2.emittedReadable = false;
    }
    state2.needReadable = !state2.flowing && !state2.ended && state2.length <= state2.highWaterMark;
    flow(stream2);
  }
  function maybeReadMore(stream2, state2) {
    if (!state2.readingMore && state2.constructed) {
      state2.readingMore = true;
      process2.nextTick(maybeReadMore_, stream2, state2);
    }
  }
  function maybeReadMore_(stream2, state2) {
    while (!state2.reading && !state2.ended && (state2.length < state2.highWaterMark || state2.flowing && state2.length === 0)) {
      const len = state2.length;
      debug("maybeReadMore read 0");
      stream2.read(0);
      if (len === state2.length)
        break;
    }
    state2.readingMore = false;
  }
  Readable.prototype._read = function(n) {
    throw new ERR_METHOD_NOT_IMPLEMENTED("_read()");
  };
  Readable.prototype.pipe = function(dest, pipeOpts) {
    const src = this;
    const state2 = this._readableState;
    if (state2.pipes.length === 1) {
      if (!state2.multiAwaitDrain) {
        state2.multiAwaitDrain = true;
        state2.awaitDrainWriters = new SafeSet(state2.awaitDrainWriters ? [state2.awaitDrainWriters] : []);
      }
    }
    state2.pipes.push(dest);
    debug("pipe count=%d opts=%j", state2.pipes.length, pipeOpts);
    const doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process2.stdout && dest !== process2.stderr;
    const endFn = doEnd ? onend : unpipe;
    if (state2.endEmitted) process2.nextTick(endFn);
    else src.once("end", endFn);
    dest.on("unpipe", onunpipe);
    function onunpipe(readable2, unpipeInfo) {
      debug("onunpipe");
      if (readable2 === src) {
        if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
          unpipeInfo.hasUnpiped = true;
          cleanup();
        }
      }
    }
    function onend() {
      debug("onend");
      dest.end();
    }
    let ondrain;
    let cleanedUp = false;
    function cleanup() {
      debug("cleanup");
      dest.removeListener("close", onclose);
      dest.removeListener("finish", onfinish);
      if (ondrain) {
        dest.removeListener("drain", ondrain);
      }
      dest.removeListener("error", onerror);
      dest.removeListener("unpipe", onunpipe);
      src.removeListener("end", onend);
      src.removeListener("end", unpipe);
      src.removeListener("data", ondata);
      cleanedUp = true;
      if (ondrain && state2.awaitDrainWriters && (!dest._writableState || dest._writableState.needDrain)) ondrain();
    }
    function pause() {
      if (!cleanedUp) {
        if (state2.pipes.length === 1 && state2.pipes[0] === dest) {
          debug("false write response, pause", 0);
          state2.awaitDrainWriters = dest;
          state2.multiAwaitDrain = false;
        } else if (state2.pipes.length > 1 && state2.pipes.includes(dest)) {
          debug("false write response, pause", state2.awaitDrainWriters.size);
          state2.awaitDrainWriters.add(dest);
        }
        src.pause();
      }
      if (!ondrain) {
        ondrain = pipeOnDrain(src, dest);
        dest.on("drain", ondrain);
      }
    }
    src.on("data", ondata);
    function ondata(chunk) {
      debug("ondata");
      const ret = dest.write(chunk);
      debug("dest.write", ret);
      if (ret === false) {
        pause();
      }
    }
    function onerror(er) {
      debug("onerror", er);
      unpipe();
      dest.removeListener("error", onerror);
      if (dest.listenerCount("error") === 0) {
        const s = dest._writableState || dest._readableState;
        if (s && !s.errorEmitted) {
          errorOrDestroy(dest, er);
        } else {
          dest.emit("error", er);
        }
      }
    }
    prependListener(dest, "error", onerror);
    function onclose() {
      dest.removeListener("finish", onfinish);
      unpipe();
    }
    dest.once("close", onclose);
    function onfinish() {
      debug("onfinish");
      dest.removeListener("close", onclose);
      unpipe();
    }
    dest.once("finish", onfinish);
    function unpipe() {
      debug("unpipe");
      src.unpipe(dest);
    }
    dest.emit("pipe", src);
    if (dest.writableNeedDrain === true) {
      pause();
    } else if (!state2.flowing) {
      debug("pipe resume");
      src.resume();
    }
    return dest;
  };
  function pipeOnDrain(src, dest) {
    return function pipeOnDrainFunctionResult() {
      const state2 = src._readableState;
      if (state2.awaitDrainWriters === dest) {
        debug("pipeOnDrain", 1);
        state2.awaitDrainWriters = null;
      } else if (state2.multiAwaitDrain) {
        debug("pipeOnDrain", state2.awaitDrainWriters.size);
        state2.awaitDrainWriters.delete(dest);
      }
      if ((!state2.awaitDrainWriters || state2.awaitDrainWriters.size === 0) && src.listenerCount("data")) {
        src.resume();
      }
    };
  }
  Readable.prototype.unpipe = function(dest) {
    const state2 = this._readableState;
    const unpipeInfo = {
      hasUnpiped: false
    };
    if (state2.pipes.length === 0) return this;
    if (!dest) {
      const dests = state2.pipes;
      state2.pipes = [];
      this.pause();
      for (let i = 0; i < dests.length; i++)
        dests[i].emit("unpipe", this, {
          hasUnpiped: false
        });
      return this;
    }
    const index = ArrayPrototypeIndexOf(state2.pipes, dest);
    if (index === -1) return this;
    state2.pipes.splice(index, 1);
    if (state2.pipes.length === 0) this.pause();
    dest.emit("unpipe", this, unpipeInfo);
    return this;
  };
  Readable.prototype.on = function(ev, fn) {
    const res = Stream.prototype.on.call(this, ev, fn);
    const state2 = this._readableState;
    if (ev === "data") {
      state2.readableListening = this.listenerCount("readable") > 0;
      if (state2.flowing !== false) this.resume();
    } else if (ev === "readable") {
      if (!state2.endEmitted && !state2.readableListening) {
        state2.readableListening = state2.needReadable = true;
        state2.flowing = false;
        state2.emittedReadable = false;
        debug("on readable", state2.length, state2.reading);
        if (state2.length) {
          emitReadable(this);
        } else if (!state2.reading) {
          process2.nextTick(nReadingNextTick, this);
        }
      }
    }
    return res;
  };
  Readable.prototype.addListener = Readable.prototype.on;
  Readable.prototype.removeListener = function(ev, fn) {
    const res = Stream.prototype.removeListener.call(this, ev, fn);
    if (ev === "readable") {
      process2.nextTick(updateReadableListening, this);
    }
    return res;
  };
  Readable.prototype.off = Readable.prototype.removeListener;
  Readable.prototype.removeAllListeners = function(ev) {
    const res = Stream.prototype.removeAllListeners.apply(this, arguments);
    if (ev === "readable" || ev === void 0) {
      process2.nextTick(updateReadableListening, this);
    }
    return res;
  };
  function updateReadableListening(self) {
    const state2 = self._readableState;
    state2.readableListening = self.listenerCount("readable") > 0;
    if (state2.resumeScheduled && state2[kPaused] === false) {
      state2.flowing = true;
    } else if (self.listenerCount("data") > 0) {
      self.resume();
    } else if (!state2.readableListening) {
      state2.flowing = null;
    }
  }
  function nReadingNextTick(self) {
    debug("readable nexttick read 0");
    self.read(0);
  }
  Readable.prototype.resume = function() {
    const state2 = this._readableState;
    if (!state2.flowing) {
      debug("resume");
      state2.flowing = !state2.readableListening;
      resume(this, state2);
    }
    state2[kPaused] = false;
    return this;
  };
  function resume(stream2, state2) {
    if (!state2.resumeScheduled) {
      state2.resumeScheduled = true;
      process2.nextTick(resume_, stream2, state2);
    }
  }
  function resume_(stream2, state2) {
    debug("resume", state2.reading);
    if (!state2.reading) {
      stream2.read(0);
    }
    state2.resumeScheduled = false;
    stream2.emit("resume");
    flow(stream2);
    if (state2.flowing && !state2.reading) stream2.read(0);
  }
  Readable.prototype.pause = function() {
    debug("call pause flowing=%j", this._readableState.flowing);
    if (this._readableState.flowing !== false) {
      debug("pause");
      this._readableState.flowing = false;
      this.emit("pause");
    }
    this._readableState[kPaused] = true;
    return this;
  };
  function flow(stream2) {
    const state2 = stream2._readableState;
    debug("flow", state2.flowing);
    while (state2.flowing && stream2.read() !== null) ;
  }
  Readable.prototype.wrap = function(stream2) {
    let paused = false;
    stream2.on("data", (chunk) => {
      if (!this.push(chunk) && stream2.pause) {
        paused = true;
        stream2.pause();
      }
    });
    stream2.on("end", () => {
      this.push(null);
    });
    stream2.on("error", (err) => {
      errorOrDestroy(this, err);
    });
    stream2.on("close", () => {
      this.destroy();
    });
    stream2.on("destroy", () => {
      this.destroy();
    });
    this._read = () => {
      if (paused && stream2.resume) {
        paused = false;
        stream2.resume();
      }
    };
    const streamKeys = ObjectKeys(stream2);
    for (let j = 1; j < streamKeys.length; j++) {
      const i = streamKeys[j];
      if (this[i] === void 0 && typeof stream2[i] === "function") {
        this[i] = stream2[i].bind(stream2);
      }
    }
    return this;
  };
  Readable.prototype[SymbolAsyncIterator] = function() {
    return streamToAsyncIterator(this);
  };
  Readable.prototype.iterator = function(options) {
    if (options !== void 0) {
      validateObject(options, "options");
    }
    return streamToAsyncIterator(this, options);
  };
  function streamToAsyncIterator(stream2, options) {
    if (typeof stream2.read !== "function") {
      stream2 = Readable.wrap(stream2, {
        objectMode: true
      });
    }
    const iter = createAsyncIterator(stream2, options);
    iter.stream = stream2;
    return iter;
  }
  async function* createAsyncIterator(stream2, options) {
    let callback = nop;
    function next(resolve) {
      if (this === stream2) {
        callback();
        callback = nop;
      } else {
        callback = resolve;
      }
    }
    stream2.on("readable", next);
    let error;
    const cleanup = eos(
      stream2,
      {
        writable: false
      },
      (err) => {
        error = err ? aggregateTwoErrors(error, err) : null;
        callback();
        callback = nop;
      }
    );
    try {
      while (true) {
        const chunk = stream2.destroyed ? null : stream2.read();
        if (chunk !== null) {
          yield chunk;
        } else if (error) {
          throw error;
        } else if (error === null) {
          return;
        } else {
          await new Promise2(next);
        }
      }
    } catch (err) {
      error = aggregateTwoErrors(error, err);
      throw error;
    } finally {
      if ((error || (options === null || options === void 0 ? void 0 : options.destroyOnReturn) !== false) && (error === void 0 || stream2._readableState.autoDestroy)) {
        destroyImpl.destroyer(stream2, null);
      } else {
        stream2.off("readable", next);
        cleanup();
      }
    }
  }
  ObjectDefineProperties(Readable.prototype, {
    readable: {
      __proto__: null,
      get() {
        const r = this._readableState;
        return !!r && r.readable !== false && !r.destroyed && !r.errorEmitted && !r.endEmitted;
      },
      set(val) {
        if (this._readableState) {
          this._readableState.readable = !!val;
        }
      }
    },
    readableDidRead: {
      __proto__: null,
      enumerable: false,
      get: function() {
        return this._readableState.dataEmitted;
      }
    },
    readableAborted: {
      __proto__: null,
      enumerable: false,
      get: function() {
        return !!(this._readableState.readable !== false && (this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted);
      }
    },
    readableHighWaterMark: {
      __proto__: null,
      enumerable: false,
      get: function() {
        return this._readableState.highWaterMark;
      }
    },
    readableBuffer: {
      __proto__: null,
      enumerable: false,
      get: function() {
        return this._readableState && this._readableState.buffer;
      }
    },
    readableFlowing: {
      __proto__: null,
      enumerable: false,
      get: function() {
        return this._readableState.flowing;
      },
      set: function(state2) {
        if (this._readableState) {
          this._readableState.flowing = state2;
        }
      }
    },
    readableLength: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._readableState.length;
      }
    },
    readableObjectMode: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._readableState ? this._readableState.objectMode : false;
      }
    },
    readableEncoding: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._readableState ? this._readableState.encoding : null;
      }
    },
    errored: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._readableState ? this._readableState.errored : null;
      }
    },
    closed: {
      __proto__: null,
      get() {
        return this._readableState ? this._readableState.closed : false;
      }
    },
    destroyed: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._readableState ? this._readableState.destroyed : false;
      },
      set(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }
    },
    readableEnded: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._readableState ? this._readableState.endEmitted : false;
      }
    }
  });
  ObjectDefineProperties(ReadableState.prototype, {
    // Legacy getter for `pipesCount`.
    pipesCount: {
      __proto__: null,
      get() {
        return this.pipes.length;
      }
    },
    // Legacy property for `paused`.
    paused: {
      __proto__: null,
      get() {
        return this[kPaused] !== false;
      },
      set(value) {
        this[kPaused] = !!value;
      }
    }
  });
  Readable._fromList = fromList;
  function fromList(n, state2) {
    if (state2.length === 0) return null;
    let ret;
    if (state2.objectMode) ret = state2.buffer.shift();
    else if (!n || n >= state2.length) {
      if (state2.decoder) ret = state2.buffer.join("");
      else if (state2.buffer.length === 1) ret = state2.buffer.first();
      else ret = state2.buffer.concat(state2.length);
      state2.buffer.clear();
    } else {
      ret = state2.buffer.consume(n, state2.decoder);
    }
    return ret;
  }
  function endReadable(stream2) {
    const state2 = stream2._readableState;
    debug("endReadable", state2.endEmitted);
    if (!state2.endEmitted) {
      state2.ended = true;
      process2.nextTick(endReadableNT, state2, stream2);
    }
  }
  function endReadableNT(state2, stream2) {
    debug("endReadableNT", state2.endEmitted, state2.length);
    if (!state2.errored && !state2.closeEmitted && !state2.endEmitted && state2.length === 0) {
      state2.endEmitted = true;
      stream2.emit("end");
      if (stream2.writable && stream2.allowHalfOpen === false) {
        process2.nextTick(endWritableNT, stream2);
      } else if (state2.autoDestroy) {
        const wState = stream2._writableState;
        const autoDestroy = !wState || wState.autoDestroy && // We don't expect the writable to ever 'finish'
        // if writable is explicitly set to false.
        (wState.finished || wState.writable === false);
        if (autoDestroy) {
          stream2.destroy();
        }
      }
    }
  }
  function endWritableNT(stream2) {
    const writable2 = stream2.writable && !stream2.writableEnded && !stream2.destroyed;
    if (writable2) {
      stream2.end();
    }
  }
  Readable.from = function(iterable, opts) {
    return from(Readable, iterable, opts);
  };
  let webStreamsAdapters;
  function lazyWebStreams() {
    if (webStreamsAdapters === void 0) webStreamsAdapters = {};
    return webStreamsAdapters;
  }
  Readable.fromWeb = function(readableStream, options) {
    return lazyWebStreams().newStreamReadableFromReadableStream(readableStream, options);
  };
  Readable.toWeb = function(streamReadable, options) {
    return lazyWebStreams().newReadableStreamFromStreamReadable(streamReadable, options);
  };
  Readable.wrap = function(src, options) {
    var _ref, _src$readableObjectMo;
    return new Readable({
      objectMode: (_ref = (_src$readableObjectMo = src.readableObjectMode) !== null && _src$readableObjectMo !== void 0 ? _src$readableObjectMo : src.objectMode) !== null && _ref !== void 0 ? _ref : true,
      ...options,
      destroy(err, callback) {
        destroyImpl.destroyer(src, err);
        callback(err);
      }
    }).wrap(src);
  };
  return readable;
}
var writable;
var hasRequiredWritable;
function requireWritable() {
  if (hasRequiredWritable) return writable;
  hasRequiredWritable = 1;
  const process2 = process$1;
  const {
    ArrayPrototypeSlice,
    Error: Error2,
    FunctionPrototypeSymbolHasInstance,
    ObjectDefineProperty,
    ObjectDefineProperties,
    ObjectSetPrototypeOf,
    StringPrototypeToLowerCase,
    Symbol: Symbol2,
    SymbolHasInstance
  } = requirePrimordials();
  writable = Writable;
  Writable.WritableState = WritableState;
  const { EventEmitter: EE } = require$$0$2;
  const Stream = requireLegacy().Stream;
  const { Buffer } = require$$0$1;
  const destroyImpl = requireDestroy();
  const { addAbortSignal: addAbortSignal2 } = requireAddAbortSignal();
  const { getHighWaterMark, getDefaultHighWaterMark } = requireState();
  const {
    ERR_INVALID_ARG_TYPE,
    ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK,
    ERR_STREAM_CANNOT_PIPE,
    ERR_STREAM_DESTROYED,
    ERR_STREAM_ALREADY_FINISHED,
    ERR_STREAM_NULL_VALUES,
    ERR_STREAM_WRITE_AFTER_END,
    ERR_UNKNOWN_ENCODING
  } = requireErrors().codes;
  const { errorOrDestroy } = destroyImpl;
  ObjectSetPrototypeOf(Writable.prototype, Stream.prototype);
  ObjectSetPrototypeOf(Writable, Stream);
  function nop() {
  }
  const kOnFinished = Symbol2("kOnFinished");
  function WritableState(options, stream2, isDuplex) {
    if (typeof isDuplex !== "boolean") isDuplex = stream2 instanceof requireDuplex();
    this.objectMode = !!(options && options.objectMode);
    if (isDuplex) this.objectMode = this.objectMode || !!(options && options.writableObjectMode);
    this.highWaterMark = options ? getHighWaterMark(this, options, "writableHighWaterMark", isDuplex) : getDefaultHighWaterMark(false);
    this.finalCalled = false;
    this.needDrain = false;
    this.ending = false;
    this.ended = false;
    this.finished = false;
    this.destroyed = false;
    const noDecode = !!(options && options.decodeStrings === false);
    this.decodeStrings = !noDecode;
    this.defaultEncoding = options && options.defaultEncoding || "utf8";
    this.length = 0;
    this.writing = false;
    this.corked = 0;
    this.sync = true;
    this.bufferProcessing = false;
    this.onwrite = onwrite.bind(void 0, stream2);
    this.writecb = null;
    this.writelen = 0;
    this.afterWriteTickInfo = null;
    resetBuffer(this);
    this.pendingcb = 0;
    this.constructed = true;
    this.prefinished = false;
    this.errorEmitted = false;
    this.emitClose = !options || options.emitClose !== false;
    this.autoDestroy = !options || options.autoDestroy !== false;
    this.errored = null;
    this.closed = false;
    this.closeEmitted = false;
    this[kOnFinished] = [];
  }
  function resetBuffer(state2) {
    state2.buffered = [];
    state2.bufferedIndex = 0;
    state2.allBuffers = true;
    state2.allNoop = true;
  }
  WritableState.prototype.getBuffer = function getBuffer() {
    return ArrayPrototypeSlice(this.buffered, this.bufferedIndex);
  };
  ObjectDefineProperty(WritableState.prototype, "bufferedRequestCount", {
    __proto__: null,
    get() {
      return this.buffered.length - this.bufferedIndex;
    }
  });
  function Writable(options) {
    const isDuplex = this instanceof requireDuplex();
    if (!isDuplex && !FunctionPrototypeSymbolHasInstance(Writable, this)) return new Writable(options);
    this._writableState = new WritableState(options, this, isDuplex);
    if (options) {
      if (typeof options.write === "function") this._write = options.write;
      if (typeof options.writev === "function") this._writev = options.writev;
      if (typeof options.destroy === "function") this._destroy = options.destroy;
      if (typeof options.final === "function") this._final = options.final;
      if (typeof options.construct === "function") this._construct = options.construct;
      if (options.signal) addAbortSignal2(options.signal, this);
    }
    Stream.call(this, options);
    destroyImpl.construct(this, () => {
      const state2 = this._writableState;
      if (!state2.writing) {
        clearBuffer(this, state2);
      }
      finishMaybe(this, state2);
    });
  }
  ObjectDefineProperty(Writable, SymbolHasInstance, {
    __proto__: null,
    value: function(object) {
      if (FunctionPrototypeSymbolHasInstance(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
  Writable.prototype.pipe = function() {
    errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
  };
  function _write(stream2, chunk, encoding, cb) {
    const state2 = stream2._writableState;
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = state2.defaultEncoding;
    } else {
      if (!encoding) encoding = state2.defaultEncoding;
      else if (encoding !== "buffer" && !Buffer.isEncoding(encoding)) throw new ERR_UNKNOWN_ENCODING(encoding);
      if (typeof cb !== "function") cb = nop;
    }
    if (chunk === null) {
      throw new ERR_STREAM_NULL_VALUES();
    } else if (!state2.objectMode) {
      if (typeof chunk === "string") {
        if (state2.decodeStrings !== false) {
          chunk = Buffer.from(chunk, encoding);
          encoding = "buffer";
        }
      } else if (chunk instanceof Buffer) {
        encoding = "buffer";
      } else if (Stream._isUint8Array(chunk)) {
        chunk = Stream._uint8ArrayToBuffer(chunk);
        encoding = "buffer";
      } else {
        throw new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
    }
    let err;
    if (state2.ending) {
      err = new ERR_STREAM_WRITE_AFTER_END();
    } else if (state2.destroyed) {
      err = new ERR_STREAM_DESTROYED("write");
    }
    if (err) {
      process2.nextTick(cb, err);
      errorOrDestroy(stream2, err, true);
      return err;
    }
    state2.pendingcb++;
    return writeOrBuffer(stream2, state2, chunk, encoding, cb);
  }
  Writable.prototype.write = function(chunk, encoding, cb) {
    return _write(this, chunk, encoding, cb) === true;
  };
  Writable.prototype.cork = function() {
    this._writableState.corked++;
  };
  Writable.prototype.uncork = function() {
    const state2 = this._writableState;
    if (state2.corked) {
      state2.corked--;
      if (!state2.writing) clearBuffer(this, state2);
    }
  };
  Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    if (typeof encoding === "string") encoding = StringPrototypeToLowerCase(encoding);
    if (!Buffer.isEncoding(encoding)) throw new ERR_UNKNOWN_ENCODING(encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
  };
  function writeOrBuffer(stream2, state2, chunk, encoding, callback) {
    const len = state2.objectMode ? 1 : chunk.length;
    state2.length += len;
    const ret = state2.length < state2.highWaterMark;
    if (!ret) state2.needDrain = true;
    if (state2.writing || state2.corked || state2.errored || !state2.constructed) {
      state2.buffered.push({
        chunk,
        encoding,
        callback
      });
      if (state2.allBuffers && encoding !== "buffer") {
        state2.allBuffers = false;
      }
      if (state2.allNoop && callback !== nop) {
        state2.allNoop = false;
      }
    } else {
      state2.writelen = len;
      state2.writecb = callback;
      state2.writing = true;
      state2.sync = true;
      stream2._write(chunk, encoding, state2.onwrite);
      state2.sync = false;
    }
    return ret && !state2.errored && !state2.destroyed;
  }
  function doWrite(stream2, state2, writev, len, chunk, encoding, cb) {
    state2.writelen = len;
    state2.writecb = cb;
    state2.writing = true;
    state2.sync = true;
    if (state2.destroyed) state2.onwrite(new ERR_STREAM_DESTROYED("write"));
    else if (writev) stream2._writev(chunk, state2.onwrite);
    else stream2._write(chunk, encoding, state2.onwrite);
    state2.sync = false;
  }
  function onwriteError(stream2, state2, er, cb) {
    --state2.pendingcb;
    cb(er);
    errorBuffer(state2);
    errorOrDestroy(stream2, er);
  }
  function onwrite(stream2, er) {
    const state2 = stream2._writableState;
    const sync = state2.sync;
    const cb = state2.writecb;
    if (typeof cb !== "function") {
      errorOrDestroy(stream2, new ERR_MULTIPLE_CALLBACK());
      return;
    }
    state2.writing = false;
    state2.writecb = null;
    state2.length -= state2.writelen;
    state2.writelen = 0;
    if (er) {
      er.stack;
      if (!state2.errored) {
        state2.errored = er;
      }
      if (stream2._readableState && !stream2._readableState.errored) {
        stream2._readableState.errored = er;
      }
      if (sync) {
        process2.nextTick(onwriteError, stream2, state2, er, cb);
      } else {
        onwriteError(stream2, state2, er, cb);
      }
    } else {
      if (state2.buffered.length > state2.bufferedIndex) {
        clearBuffer(stream2, state2);
      }
      if (sync) {
        if (state2.afterWriteTickInfo !== null && state2.afterWriteTickInfo.cb === cb) {
          state2.afterWriteTickInfo.count++;
        } else {
          state2.afterWriteTickInfo = {
            count: 1,
            cb,
            stream: stream2,
            state: state2
          };
          process2.nextTick(afterWriteTick, state2.afterWriteTickInfo);
        }
      } else {
        afterWrite(stream2, state2, 1, cb);
      }
    }
  }
  function afterWriteTick({ stream: stream2, state: state2, count, cb }) {
    state2.afterWriteTickInfo = null;
    return afterWrite(stream2, state2, count, cb);
  }
  function afterWrite(stream2, state2, count, cb) {
    const needDrain = !state2.ending && !stream2.destroyed && state2.length === 0 && state2.needDrain;
    if (needDrain) {
      state2.needDrain = false;
      stream2.emit("drain");
    }
    while (count-- > 0) {
      state2.pendingcb--;
      cb();
    }
    if (state2.destroyed) {
      errorBuffer(state2);
    }
    finishMaybe(stream2, state2);
  }
  function errorBuffer(state2) {
    if (state2.writing) {
      return;
    }
    for (let n = state2.bufferedIndex; n < state2.buffered.length; ++n) {
      var _state$errored;
      const { chunk, callback } = state2.buffered[n];
      const len = state2.objectMode ? 1 : chunk.length;
      state2.length -= len;
      callback(
        (_state$errored = state2.errored) !== null && _state$errored !== void 0 ? _state$errored : new ERR_STREAM_DESTROYED("write")
      );
    }
    const onfinishCallbacks = state2[kOnFinished].splice(0);
    for (let i = 0; i < onfinishCallbacks.length; i++) {
      var _state$errored2;
      onfinishCallbacks[i](
        (_state$errored2 = state2.errored) !== null && _state$errored2 !== void 0 ? _state$errored2 : new ERR_STREAM_DESTROYED("end")
      );
    }
    resetBuffer(state2);
  }
  function clearBuffer(stream2, state2) {
    if (state2.corked || state2.bufferProcessing || state2.destroyed || !state2.constructed) {
      return;
    }
    const { buffered, bufferedIndex, objectMode } = state2;
    const bufferedLength = buffered.length - bufferedIndex;
    if (!bufferedLength) {
      return;
    }
    let i = bufferedIndex;
    state2.bufferProcessing = true;
    if (bufferedLength > 1 && stream2._writev) {
      state2.pendingcb -= bufferedLength - 1;
      const callback = state2.allNoop ? nop : (err) => {
        for (let n = i; n < buffered.length; ++n) {
          buffered[n].callback(err);
        }
      };
      const chunks = state2.allNoop && i === 0 ? buffered : ArrayPrototypeSlice(buffered, i);
      chunks.allBuffers = state2.allBuffers;
      doWrite(stream2, state2, true, state2.length, chunks, "", callback);
      resetBuffer(state2);
    } else {
      do {
        const { chunk, encoding, callback } = buffered[i];
        buffered[i++] = null;
        const len = objectMode ? 1 : chunk.length;
        doWrite(stream2, state2, false, len, chunk, encoding, callback);
      } while (i < buffered.length && !state2.writing);
      if (i === buffered.length) {
        resetBuffer(state2);
      } else if (i > 256) {
        buffered.splice(0, i);
        state2.bufferedIndex = 0;
      } else {
        state2.bufferedIndex = i;
      }
    }
    state2.bufferProcessing = false;
  }
  Writable.prototype._write = function(chunk, encoding, cb) {
    if (this._writev) {
      this._writev(
        [
          {
            chunk,
            encoding
          }
        ],
        cb
      );
    } else {
      throw new ERR_METHOD_NOT_IMPLEMENTED("_write()");
    }
  };
  Writable.prototype._writev = null;
  Writable.prototype.end = function(chunk, encoding, cb) {
    const state2 = this._writableState;
    if (typeof chunk === "function") {
      cb = chunk;
      chunk = null;
      encoding = null;
    } else if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    let err;
    if (chunk !== null && chunk !== void 0) {
      const ret = _write(this, chunk, encoding);
      if (ret instanceof Error2) {
        err = ret;
      }
    }
    if (state2.corked) {
      state2.corked = 1;
      this.uncork();
    }
    if (err) ;
    else if (!state2.errored && !state2.ending) {
      state2.ending = true;
      finishMaybe(this, state2, true);
      state2.ended = true;
    } else if (state2.finished) {
      err = new ERR_STREAM_ALREADY_FINISHED("end");
    } else if (state2.destroyed) {
      err = new ERR_STREAM_DESTROYED("end");
    }
    if (typeof cb === "function") {
      if (err || state2.finished) {
        process2.nextTick(cb, err);
      } else {
        state2[kOnFinished].push(cb);
      }
    }
    return this;
  };
  function needFinish(state2) {
    return state2.ending && !state2.destroyed && state2.constructed && state2.length === 0 && !state2.errored && state2.buffered.length === 0 && !state2.finished && !state2.writing && !state2.errorEmitted && !state2.closeEmitted;
  }
  function callFinal(stream2, state2) {
    let called = false;
    function onFinish(err) {
      if (called) {
        errorOrDestroy(stream2, err !== null && err !== void 0 ? err : ERR_MULTIPLE_CALLBACK());
        return;
      }
      called = true;
      state2.pendingcb--;
      if (err) {
        const onfinishCallbacks = state2[kOnFinished].splice(0);
        for (let i = 0; i < onfinishCallbacks.length; i++) {
          onfinishCallbacks[i](err);
        }
        errorOrDestroy(stream2, err, state2.sync);
      } else if (needFinish(state2)) {
        state2.prefinished = true;
        stream2.emit("prefinish");
        state2.pendingcb++;
        process2.nextTick(finish, stream2, state2);
      }
    }
    state2.sync = true;
    state2.pendingcb++;
    try {
      stream2._final(onFinish);
    } catch (err) {
      onFinish(err);
    }
    state2.sync = false;
  }
  function prefinish(stream2, state2) {
    if (!state2.prefinished && !state2.finalCalled) {
      if (typeof stream2._final === "function" && !state2.destroyed) {
        state2.finalCalled = true;
        callFinal(stream2, state2);
      } else {
        state2.prefinished = true;
        stream2.emit("prefinish");
      }
    }
  }
  function finishMaybe(stream2, state2, sync) {
    if (needFinish(state2)) {
      prefinish(stream2, state2);
      if (state2.pendingcb === 0) {
        if (sync) {
          state2.pendingcb++;
          process2.nextTick(
            (stream3, state3) => {
              if (needFinish(state3)) {
                finish(stream3, state3);
              } else {
                state3.pendingcb--;
              }
            },
            stream2,
            state2
          );
        } else if (needFinish(state2)) {
          state2.pendingcb++;
          finish(stream2, state2);
        }
      }
    }
  }
  function finish(stream2, state2) {
    state2.pendingcb--;
    state2.finished = true;
    const onfinishCallbacks = state2[kOnFinished].splice(0);
    for (let i = 0; i < onfinishCallbacks.length; i++) {
      onfinishCallbacks[i]();
    }
    stream2.emit("finish");
    if (state2.autoDestroy) {
      const rState = stream2._readableState;
      const autoDestroy = !rState || rState.autoDestroy && // We don't expect the readable to ever 'end'
      // if readable is explicitly set to false.
      (rState.endEmitted || rState.readable === false);
      if (autoDestroy) {
        stream2.destroy();
      }
    }
  }
  ObjectDefineProperties(Writable.prototype, {
    closed: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.closed : false;
      }
    },
    destroyed: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.destroyed : false;
      },
      set(value) {
        if (this._writableState) {
          this._writableState.destroyed = value;
        }
      }
    },
    writable: {
      __proto__: null,
      get() {
        const w = this._writableState;
        return !!w && w.writable !== false && !w.destroyed && !w.errored && !w.ending && !w.ended;
      },
      set(val) {
        if (this._writableState) {
          this._writableState.writable = !!val;
        }
      }
    },
    writableFinished: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.finished : false;
      }
    },
    writableObjectMode: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.objectMode : false;
      }
    },
    writableBuffer: {
      __proto__: null,
      get() {
        return this._writableState && this._writableState.getBuffer();
      }
    },
    writableEnded: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.ending : false;
      }
    },
    writableNeedDrain: {
      __proto__: null,
      get() {
        const wState = this._writableState;
        if (!wState) return false;
        return !wState.destroyed && !wState.ending && wState.needDrain;
      }
    },
    writableHighWaterMark: {
      __proto__: null,
      get() {
        return this._writableState && this._writableState.highWaterMark;
      }
    },
    writableCorked: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.corked : 0;
      }
    },
    writableLength: {
      __proto__: null,
      get() {
        return this._writableState && this._writableState.length;
      }
    },
    errored: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._writableState ? this._writableState.errored : null;
      }
    },
    writableAborted: {
      __proto__: null,
      enumerable: false,
      get: function() {
        return !!(this._writableState.writable !== false && (this._writableState.destroyed || this._writableState.errored) && !this._writableState.finished);
      }
    }
  });
  const destroy = destroyImpl.destroy;
  Writable.prototype.destroy = function(err, cb) {
    const state2 = this._writableState;
    if (!state2.destroyed && (state2.bufferedIndex < state2.buffered.length || state2[kOnFinished].length)) {
      process2.nextTick(errorBuffer, state2);
    }
    destroy.call(this, err, cb);
    return this;
  };
  Writable.prototype._undestroy = destroyImpl.undestroy;
  Writable.prototype._destroy = function(err, cb) {
    cb(err);
  };
  Writable.prototype[EE.captureRejectionSymbol] = function(err) {
    this.destroy(err);
  };
  let webStreamsAdapters;
  function lazyWebStreams() {
    if (webStreamsAdapters === void 0) webStreamsAdapters = {};
    return webStreamsAdapters;
  }
  Writable.fromWeb = function(writableStream, options) {
    return lazyWebStreams().newStreamWritableFromWritableStream(writableStream, options);
  };
  Writable.toWeb = function(streamWritable) {
    return lazyWebStreams().newWritableStreamFromStreamWritable(streamWritable);
  };
  return writable;
}
var duplexify;
var hasRequiredDuplexify;
function requireDuplexify() {
  if (hasRequiredDuplexify) return duplexify;
  hasRequiredDuplexify = 1;
  const process2 = process$1;
  const bufferModule = require$$0$1;
  const {
    isReadable,
    isWritable,
    isIterable,
    isNodeStream,
    isReadableNodeStream,
    isWritableNodeStream,
    isDuplexNodeStream,
    isReadableStream,
    isWritableStream
  } = requireUtils();
  const eos = requireEndOfStream();
  const {
    AbortError,
    codes: { ERR_INVALID_ARG_TYPE, ERR_INVALID_RETURN_VALUE }
  } = requireErrors();
  const { destroyer } = requireDestroy();
  const Duplex = requireDuplex();
  const Readable = requireReadable();
  const Writable = requireWritable();
  const { createDeferredPromise } = requireUtil();
  const from = requireFrom();
  const Blob = globalThis.Blob || bufferModule.Blob;
  const isBlob = typeof Blob !== "undefined" ? function isBlob2(b) {
    return b instanceof Blob;
  } : function isBlob2(b) {
    return false;
  };
  const AbortController = globalThis.AbortController || require$$0.AbortController;
  const { FunctionPrototypeCall } = requirePrimordials();
  class Duplexify extends Duplex {
    constructor(options) {
      super(options);
      if ((options === null || options === void 0 ? void 0 : options.readable) === false) {
        this._readableState.readable = false;
        this._readableState.ended = true;
        this._readableState.endEmitted = true;
      }
      if ((options === null || options === void 0 ? void 0 : options.writable) === false) {
        this._writableState.writable = false;
        this._writableState.ending = true;
        this._writableState.ended = true;
        this._writableState.finished = true;
      }
    }
  }
  duplexify = function duplexify2(body, name) {
    if (isDuplexNodeStream(body)) {
      return body;
    }
    if (isReadableNodeStream(body)) {
      return _duplexify({
        readable: body
      });
    }
    if (isWritableNodeStream(body)) {
      return _duplexify({
        writable: body
      });
    }
    if (isNodeStream(body)) {
      return _duplexify({
        writable: false,
        readable: false
      });
    }
    if (isReadableStream(body)) {
      return _duplexify({
        readable: Readable.fromWeb(body)
      });
    }
    if (isWritableStream(body)) {
      return _duplexify({
        writable: Writable.fromWeb(body)
      });
    }
    if (typeof body === "function") {
      const { value, write, final, destroy } = fromAsyncGen(body);
      if (isIterable(value)) {
        return from(Duplexify, value, {
          // TODO (ronag): highWaterMark?
          objectMode: true,
          write,
          final,
          destroy
        });
      }
      const then2 = value === null || value === void 0 ? void 0 : value.then;
      if (typeof then2 === "function") {
        let d;
        const promise = FunctionPrototypeCall(
          then2,
          value,
          (val) => {
            if (val != null) {
              throw new ERR_INVALID_RETURN_VALUE("nully", "body", val);
            }
          },
          (err) => {
            destroyer(d, err);
          }
        );
        return d = new Duplexify({
          // TODO (ronag): highWaterMark?
          objectMode: true,
          readable: false,
          write,
          final(cb) {
            final(async () => {
              try {
                await promise;
                process2.nextTick(cb, null);
              } catch (err) {
                process2.nextTick(cb, err);
              }
            });
          },
          destroy
        });
      }
      throw new ERR_INVALID_RETURN_VALUE("Iterable, AsyncIterable or AsyncFunction", name, value);
    }
    if (isBlob(body)) {
      return duplexify2(body.arrayBuffer());
    }
    if (isIterable(body)) {
      return from(Duplexify, body, {
        // TODO (ronag): highWaterMark?
        objectMode: true,
        writable: false
      });
    }
    if (isReadableStream(body === null || body === void 0 ? void 0 : body.readable) && isWritableStream(body === null || body === void 0 ? void 0 : body.writable)) {
      return Duplexify.fromWeb(body);
    }
    if (typeof (body === null || body === void 0 ? void 0 : body.writable) === "object" || typeof (body === null || body === void 0 ? void 0 : body.readable) === "object") {
      const readable2 = body !== null && body !== void 0 && body.readable ? isReadableNodeStream(body === null || body === void 0 ? void 0 : body.readable) ? body === null || body === void 0 ? void 0 : body.readable : duplexify2(body.readable) : void 0;
      const writable2 = body !== null && body !== void 0 && body.writable ? isWritableNodeStream(body === null || body === void 0 ? void 0 : body.writable) ? body === null || body === void 0 ? void 0 : body.writable : duplexify2(body.writable) : void 0;
      return _duplexify({
        readable: readable2,
        writable: writable2
      });
    }
    const then = body === null || body === void 0 ? void 0 : body.then;
    if (typeof then === "function") {
      let d;
      FunctionPrototypeCall(
        then,
        body,
        (val) => {
          if (val != null) {
            d.push(val);
          }
          d.push(null);
        },
        (err) => {
          destroyer(d, err);
        }
      );
      return d = new Duplexify({
        objectMode: true,
        writable: false,
        read() {
        }
      });
    }
    throw new ERR_INVALID_ARG_TYPE(
      name,
      [
        "Blob",
        "ReadableStream",
        "WritableStream",
        "Stream",
        "Iterable",
        "AsyncIterable",
        "Function",
        "{ readable, writable } pair",
        "Promise"
      ],
      body
    );
  };
  function fromAsyncGen(fn) {
    let { promise, resolve } = createDeferredPromise();
    const ac = new AbortController();
    const signal = ac.signal;
    const value = fn(
      (async function* () {
        while (true) {
          const _promise = promise;
          promise = null;
          const { chunk, done, cb } = await _promise;
          process2.nextTick(cb);
          if (done) return;
          if (signal.aborted)
            throw new AbortError(void 0, {
              cause: signal.reason
            });
          ({ promise, resolve } = createDeferredPromise());
          yield chunk;
        }
      })(),
      {
        signal
      }
    );
    return {
      value,
      write(chunk, encoding, cb) {
        const _resolve = resolve;
        resolve = null;
        _resolve({
          chunk,
          done: false,
          cb
        });
      },
      final(cb) {
        const _resolve = resolve;
        resolve = null;
        _resolve({
          done: true,
          cb
        });
      },
      destroy(err, cb) {
        ac.abort();
        cb(err);
      }
    };
  }
  function _duplexify(pair) {
    const r = pair.readable && typeof pair.readable.read !== "function" ? Readable.wrap(pair.readable) : pair.readable;
    const w = pair.writable;
    let readable2 = !!isReadable(r);
    let writable2 = !!isWritable(w);
    let ondrain;
    let onfinish;
    let onreadable;
    let onclose;
    let d;
    function onfinished(err) {
      const cb = onclose;
      onclose = null;
      if (cb) {
        cb(err);
      } else if (err) {
        d.destroy(err);
      }
    }
    d = new Duplexify({
      // TODO (ronag): highWaterMark?
      readableObjectMode: !!(r !== null && r !== void 0 && r.readableObjectMode),
      writableObjectMode: !!(w !== null && w !== void 0 && w.writableObjectMode),
      readable: readable2,
      writable: writable2
    });
    if (writable2) {
      eos(w, (err) => {
        writable2 = false;
        if (err) {
          destroyer(r, err);
        }
        onfinished(err);
      });
      d._write = function(chunk, encoding, callback) {
        if (w.write(chunk, encoding)) {
          callback();
        } else {
          ondrain = callback;
        }
      };
      d._final = function(callback) {
        w.end();
        onfinish = callback;
      };
      w.on("drain", function() {
        if (ondrain) {
          const cb = ondrain;
          ondrain = null;
          cb();
        }
      });
      w.on("finish", function() {
        if (onfinish) {
          const cb = onfinish;
          onfinish = null;
          cb();
        }
      });
    }
    if (readable2) {
      eos(r, (err) => {
        readable2 = false;
        if (err) {
          destroyer(r, err);
        }
        onfinished(err);
      });
      r.on("readable", function() {
        if (onreadable) {
          const cb = onreadable;
          onreadable = null;
          cb();
        }
      });
      r.on("end", function() {
        d.push(null);
      });
      d._read = function() {
        while (true) {
          const buf = r.read();
          if (buf === null) {
            onreadable = d._read;
            return;
          }
          if (!d.push(buf)) {
            return;
          }
        }
      };
    }
    d._destroy = function(err, callback) {
      if (!err && onclose !== null) {
        err = new AbortError();
      }
      onreadable = null;
      ondrain = null;
      onfinish = null;
      if (onclose === null) {
        callback(err);
      } else {
        onclose = callback;
        destroyer(w, err);
        destroyer(r, err);
      }
    };
    return d;
  }
  return duplexify;
}
var duplex;
var hasRequiredDuplex;
function requireDuplex() {
  if (hasRequiredDuplex) return duplex;
  hasRequiredDuplex = 1;
  const {
    ObjectDefineProperties,
    ObjectGetOwnPropertyDescriptor,
    ObjectKeys,
    ObjectSetPrototypeOf
  } = requirePrimordials();
  duplex = Duplex;
  const Readable = requireReadable();
  const Writable = requireWritable();
  ObjectSetPrototypeOf(Duplex.prototype, Readable.prototype);
  ObjectSetPrototypeOf(Duplex, Readable);
  {
    const keys = ObjectKeys(Writable.prototype);
    for (let i = 0; i < keys.length; i++) {
      const method = keys[i];
      if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
    }
  }
  function Duplex(options) {
    if (!(this instanceof Duplex)) return new Duplex(options);
    Readable.call(this, options);
    Writable.call(this, options);
    if (options) {
      this.allowHalfOpen = options.allowHalfOpen !== false;
      if (options.readable === false) {
        this._readableState.readable = false;
        this._readableState.ended = true;
        this._readableState.endEmitted = true;
      }
      if (options.writable === false) {
        this._writableState.writable = false;
        this._writableState.ending = true;
        this._writableState.ended = true;
        this._writableState.finished = true;
      }
    } else {
      this.allowHalfOpen = true;
    }
  }
  ObjectDefineProperties(Duplex.prototype, {
    writable: {
      __proto__: null,
      ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writable")
    },
    writableHighWaterMark: {
      __proto__: null,
      ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableHighWaterMark")
    },
    writableObjectMode: {
      __proto__: null,
      ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableObjectMode")
    },
    writableBuffer: {
      __proto__: null,
      ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableBuffer")
    },
    writableLength: {
      __proto__: null,
      ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableLength")
    },
    writableFinished: {
      __proto__: null,
      ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableFinished")
    },
    writableCorked: {
      __proto__: null,
      ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableCorked")
    },
    writableEnded: {
      __proto__: null,
      ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableEnded")
    },
    writableNeedDrain: {
      __proto__: null,
      ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableNeedDrain")
    },
    destroyed: {
      __proto__: null,
      get() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set(value) {
        if (this._readableState && this._writableState) {
          this._readableState.destroyed = value;
          this._writableState.destroyed = value;
        }
      }
    }
  });
  let webStreamsAdapters;
  function lazyWebStreams() {
    if (webStreamsAdapters === void 0) webStreamsAdapters = {};
    return webStreamsAdapters;
  }
  Duplex.fromWeb = function(pair, options) {
    return lazyWebStreams().newStreamDuplexFromReadableWritablePair(pair, options);
  };
  Duplex.toWeb = function(duplex2) {
    return lazyWebStreams().newReadableWritablePairFromDuplex(duplex2);
  };
  let duplexify2;
  Duplex.from = function(body) {
    if (!duplexify2) {
      duplexify2 = requireDuplexify();
    }
    return duplexify2(body, "body");
  };
  return duplex;
}
var transform;
var hasRequiredTransform;
function requireTransform() {
  if (hasRequiredTransform) return transform;
  hasRequiredTransform = 1;
  const { ObjectSetPrototypeOf, Symbol: Symbol2 } = requirePrimordials();
  transform = Transform;
  const { ERR_METHOD_NOT_IMPLEMENTED } = requireErrors().codes;
  const Duplex = requireDuplex();
  const { getHighWaterMark } = requireState();
  ObjectSetPrototypeOf(Transform.prototype, Duplex.prototype);
  ObjectSetPrototypeOf(Transform, Duplex);
  const kCallback = Symbol2("kCallback");
  function Transform(options) {
    if (!(this instanceof Transform)) return new Transform(options);
    const readableHighWaterMark = options ? getHighWaterMark(this, options, "readableHighWaterMark", true) : null;
    if (readableHighWaterMark === 0) {
      options = {
        ...options,
        highWaterMark: null,
        readableHighWaterMark,
        // TODO (ronag): 0 is not optimal since we have
        // a "bug" where we check needDrain before calling _write and not after.
        // Refs: https://github.com/nodejs/node/pull/32887
        // Refs: https://github.com/nodejs/node/pull/35941
        writableHighWaterMark: options.writableHighWaterMark || 0
      };
    }
    Duplex.call(this, options);
    this._readableState.sync = false;
    this[kCallback] = null;
    if (options) {
      if (typeof options.transform === "function") this._transform = options.transform;
      if (typeof options.flush === "function") this._flush = options.flush;
    }
    this.on("prefinish", prefinish);
  }
  function final(cb) {
    if (typeof this._flush === "function" && !this.destroyed) {
      this._flush((er, data) => {
        if (er) {
          if (cb) {
            cb(er);
          } else {
            this.destroy(er);
          }
          return;
        }
        if (data != null) {
          this.push(data);
        }
        this.push(null);
        if (cb) {
          cb();
        }
      });
    } else {
      this.push(null);
      if (cb) {
        cb();
      }
    }
  }
  function prefinish() {
    if (this._final !== final) {
      final.call(this);
    }
  }
  Transform.prototype._final = final;
  Transform.prototype._transform = function(chunk, encoding, callback) {
    throw new ERR_METHOD_NOT_IMPLEMENTED("_transform()");
  };
  Transform.prototype._write = function(chunk, encoding, callback) {
    const rState = this._readableState;
    const wState = this._writableState;
    const length = rState.length;
    this._transform(chunk, encoding, (err, val) => {
      if (err) {
        callback(err);
        return;
      }
      if (val != null) {
        this.push(val);
      }
      if (wState.ended || // Backwards compat.
      length === rState.length || // Backwards compat.
      rState.length < rState.highWaterMark) {
        callback();
      } else {
        this[kCallback] = callback;
      }
    });
  };
  Transform.prototype._read = function() {
    if (this[kCallback]) {
      const callback = this[kCallback];
      this[kCallback] = null;
      callback();
    }
  };
  return transform;
}
var passthrough;
var hasRequiredPassthrough;
function requirePassthrough() {
  if (hasRequiredPassthrough) return passthrough;
  hasRequiredPassthrough = 1;
  const { ObjectSetPrototypeOf } = requirePrimordials();
  passthrough = PassThrough;
  const Transform = requireTransform();
  ObjectSetPrototypeOf(PassThrough.prototype, Transform.prototype);
  ObjectSetPrototypeOf(PassThrough, Transform);
  function PassThrough(options) {
    if (!(this instanceof PassThrough)) return new PassThrough(options);
    Transform.call(this, options);
  }
  PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
  };
  return passthrough;
}
var pipeline_1;
var hasRequiredPipeline;
function requirePipeline() {
  if (hasRequiredPipeline) return pipeline_1;
  hasRequiredPipeline = 1;
  const process2 = process$1;
  const { ArrayIsArray, Promise: Promise2, SymbolAsyncIterator, SymbolDispose } = requirePrimordials();
  const eos = requireEndOfStream();
  const { once } = requireUtil();
  const destroyImpl = requireDestroy();
  const Duplex = requireDuplex();
  const {
    aggregateTwoErrors,
    codes: {
      ERR_INVALID_ARG_TYPE,
      ERR_INVALID_RETURN_VALUE,
      ERR_MISSING_ARGS,
      ERR_STREAM_DESTROYED,
      ERR_STREAM_PREMATURE_CLOSE
    },
    AbortError
  } = requireErrors();
  const { validateFunction, validateAbortSignal } = requireValidators();
  const {
    isIterable,
    isReadable,
    isReadableNodeStream,
    isNodeStream,
    isTransformStream,
    isWebStream,
    isReadableStream,
    isReadableFinished
  } = requireUtils();
  const AbortController = globalThis.AbortController || require$$0.AbortController;
  let PassThrough;
  let Readable;
  let addAbortListener;
  function destroyer(stream2, reading, writing) {
    let finished = false;
    stream2.on("close", () => {
      finished = true;
    });
    const cleanup = eos(
      stream2,
      {
        readable: reading,
        writable: writing
      },
      (err) => {
        finished = !err;
      }
    );
    return {
      destroy: (err) => {
        if (finished) return;
        finished = true;
        destroyImpl.destroyer(stream2, err || new ERR_STREAM_DESTROYED("pipe"));
      },
      cleanup
    };
  }
  function popCallback(streams) {
    validateFunction(streams[streams.length - 1], "streams[stream.length - 1]");
    return streams.pop();
  }
  function makeAsyncIterable(val) {
    if (isIterable(val)) {
      return val;
    } else if (isReadableNodeStream(val)) {
      return fromReadable(val);
    }
    throw new ERR_INVALID_ARG_TYPE("val", ["Readable", "Iterable", "AsyncIterable"], val);
  }
  async function* fromReadable(val) {
    if (!Readable) {
      Readable = requireReadable();
    }
    yield* Readable.prototype[SymbolAsyncIterator].call(val);
  }
  async function pumpToNode(iterable, writable2, finish, { end }) {
    let error;
    let onresolve = null;
    const resume = (err) => {
      if (err) {
        error = err;
      }
      if (onresolve) {
        const callback = onresolve;
        onresolve = null;
        callback();
      }
    };
    const wait = () => new Promise2((resolve, reject) => {
      if (error) {
        reject(error);
      } else {
        onresolve = () => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        };
      }
    });
    writable2.on("drain", resume);
    const cleanup = eos(
      writable2,
      {
        readable: false
      },
      resume
    );
    try {
      if (writable2.writableNeedDrain) {
        await wait();
      }
      for await (const chunk of iterable) {
        if (!writable2.write(chunk)) {
          await wait();
        }
      }
      if (end) {
        writable2.end();
        await wait();
      }
      finish();
    } catch (err) {
      finish(error !== err ? aggregateTwoErrors(error, err) : err);
    } finally {
      cleanup();
      writable2.off("drain", resume);
    }
  }
  async function pumpToWeb(readable2, writable2, finish, { end }) {
    if (isTransformStream(writable2)) {
      writable2 = writable2.writable;
    }
    const writer = writable2.getWriter();
    try {
      for await (const chunk of readable2) {
        await writer.ready;
        writer.write(chunk).catch(() => {
        });
      }
      await writer.ready;
      if (end) {
        await writer.close();
      }
      finish();
    } catch (err) {
      try {
        await writer.abort(err);
        finish(err);
      } catch (err2) {
        finish(err2);
      }
    }
  }
  function pipeline(...streams) {
    return pipelineImpl(streams, once(popCallback(streams)));
  }
  function pipelineImpl(streams, callback, opts) {
    if (streams.length === 1 && ArrayIsArray(streams[0])) {
      streams = streams[0];
    }
    if (streams.length < 2) {
      throw new ERR_MISSING_ARGS("streams");
    }
    const ac = new AbortController();
    const signal = ac.signal;
    const outerSignal = opts === null || opts === void 0 ? void 0 : opts.signal;
    const lastStreamCleanup = [];
    validateAbortSignal(outerSignal, "options.signal");
    function abort() {
      finishImpl(new AbortError());
    }
    addAbortListener = addAbortListener || requireUtil().addAbortListener;
    let disposable;
    if (outerSignal) {
      disposable = addAbortListener(outerSignal, abort);
    }
    let error;
    let value;
    const destroys = [];
    let finishCount = 0;
    function finish(err) {
      finishImpl(err, --finishCount === 0);
    }
    function finishImpl(err, final) {
      var _disposable;
      if (err && (!error || error.code === "ERR_STREAM_PREMATURE_CLOSE")) {
        error = err;
      }
      if (!error && !final) {
        return;
      }
      while (destroys.length) {
        destroys.shift()(error);
      }
      (_disposable = disposable) === null || _disposable === void 0 ? void 0 : _disposable[SymbolDispose]();
      ac.abort();
      if (final) {
        if (!error) {
          lastStreamCleanup.forEach((fn) => fn());
        }
        process2.nextTick(callback, error, value);
      }
    }
    let ret;
    for (let i = 0; i < streams.length; i++) {
      const stream2 = streams[i];
      const reading = i < streams.length - 1;
      const writing = i > 0;
      const end = reading || (opts === null || opts === void 0 ? void 0 : opts.end) !== false;
      const isLastStream = i === streams.length - 1;
      if (isNodeStream(stream2)) {
        let onError = function(err) {
          if (err && err.name !== "AbortError" && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
            finish(err);
          }
        };
        if (end) {
          const { destroy, cleanup } = destroyer(stream2, reading, writing);
          destroys.push(destroy);
          if (isReadable(stream2) && isLastStream) {
            lastStreamCleanup.push(cleanup);
          }
        }
        stream2.on("error", onError);
        if (isReadable(stream2) && isLastStream) {
          lastStreamCleanup.push(() => {
            stream2.removeListener("error", onError);
          });
        }
      }
      if (i === 0) {
        if (typeof stream2 === "function") {
          ret = stream2({
            signal
          });
          if (!isIterable(ret)) {
            throw new ERR_INVALID_RETURN_VALUE("Iterable, AsyncIterable or Stream", "source", ret);
          }
        } else if (isIterable(stream2) || isReadableNodeStream(stream2) || isTransformStream(stream2)) {
          ret = stream2;
        } else {
          ret = Duplex.from(stream2);
        }
      } else if (typeof stream2 === "function") {
        if (isTransformStream(ret)) {
          var _ret;
          ret = makeAsyncIterable((_ret = ret) === null || _ret === void 0 ? void 0 : _ret.readable);
        } else {
          ret = makeAsyncIterable(ret);
        }
        ret = stream2(ret, {
          signal
        });
        if (reading) {
          if (!isIterable(ret, true)) {
            throw new ERR_INVALID_RETURN_VALUE("AsyncIterable", `transform[${i - 1}]`, ret);
          }
        } else {
          var _ret2;
          if (!PassThrough) {
            PassThrough = requirePassthrough();
          }
          const pt = new PassThrough({
            objectMode: true
          });
          const then = (_ret2 = ret) === null || _ret2 === void 0 ? void 0 : _ret2.then;
          if (typeof then === "function") {
            finishCount++;
            then.call(
              ret,
              (val) => {
                value = val;
                if (val != null) {
                  pt.write(val);
                }
                if (end) {
                  pt.end();
                }
                process2.nextTick(finish);
              },
              (err) => {
                pt.destroy(err);
                process2.nextTick(finish, err);
              }
            );
          } else if (isIterable(ret, true)) {
            finishCount++;
            pumpToNode(ret, pt, finish, {
              end
            });
          } else if (isReadableStream(ret) || isTransformStream(ret)) {
            const toRead = ret.readable || ret;
            finishCount++;
            pumpToNode(toRead, pt, finish, {
              end
            });
          } else {
            throw new ERR_INVALID_RETURN_VALUE("AsyncIterable or Promise", "destination", ret);
          }
          ret = pt;
          const { destroy, cleanup } = destroyer(ret, false, true);
          destroys.push(destroy);
          if (isLastStream) {
            lastStreamCleanup.push(cleanup);
          }
        }
      } else if (isNodeStream(stream2)) {
        if (isReadableNodeStream(ret)) {
          finishCount += 2;
          const cleanup = pipe(ret, stream2, finish, {
            end
          });
          if (isReadable(stream2) && isLastStream) {
            lastStreamCleanup.push(cleanup);
          }
        } else if (isTransformStream(ret) || isReadableStream(ret)) {
          const toRead = ret.readable || ret;
          finishCount++;
          pumpToNode(toRead, stream2, finish, {
            end
          });
        } else if (isIterable(ret)) {
          finishCount++;
          pumpToNode(ret, stream2, finish, {
            end
          });
        } else {
          throw new ERR_INVALID_ARG_TYPE(
            "val",
            ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"],
            ret
          );
        }
        ret = stream2;
      } else if (isWebStream(stream2)) {
        if (isReadableNodeStream(ret)) {
          finishCount++;
          pumpToWeb(makeAsyncIterable(ret), stream2, finish, {
            end
          });
        } else if (isReadableStream(ret) || isIterable(ret)) {
          finishCount++;
          pumpToWeb(ret, stream2, finish, {
            end
          });
        } else if (isTransformStream(ret)) {
          finishCount++;
          pumpToWeb(ret.readable, stream2, finish, {
            end
          });
        } else {
          throw new ERR_INVALID_ARG_TYPE(
            "val",
            ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"],
            ret
          );
        }
        ret = stream2;
      } else {
        ret = Duplex.from(stream2);
      }
    }
    if (signal !== null && signal !== void 0 && signal.aborted || outerSignal !== null && outerSignal !== void 0 && outerSignal.aborted) {
      process2.nextTick(abort);
    }
    return ret;
  }
  function pipe(src, dst, finish, { end }) {
    let ended = false;
    dst.on("close", () => {
      if (!ended) {
        finish(new ERR_STREAM_PREMATURE_CLOSE());
      }
    });
    src.pipe(dst, {
      end: false
    });
    if (end) {
      let endFn = function() {
        ended = true;
        dst.end();
      };
      if (isReadableFinished(src)) {
        process2.nextTick(endFn);
      } else {
        src.once("end", endFn);
      }
    } else {
      finish();
    }
    eos(
      src,
      {
        readable: true,
        writable: false
      },
      (err) => {
        const rState = src._readableState;
        if (err && err.code === "ERR_STREAM_PREMATURE_CLOSE" && rState && rState.ended && !rState.errored && !rState.errorEmitted) {
          src.once("end", finish).once("error", finish);
        } else {
          finish(err);
        }
      }
    );
    return eos(
      dst,
      {
        readable: false,
        writable: true
      },
      finish
    );
  }
  pipeline_1 = {
    pipelineImpl,
    pipeline
  };
  return pipeline_1;
}
var compose;
var hasRequiredCompose;
function requireCompose() {
  if (hasRequiredCompose) return compose;
  hasRequiredCompose = 1;
  const { pipeline } = requirePipeline();
  const Duplex = requireDuplex();
  const { destroyer } = requireDestroy();
  const {
    isNodeStream,
    isReadable,
    isWritable,
    isWebStream,
    isTransformStream,
    isWritableStream,
    isReadableStream
  } = requireUtils();
  const {
    AbortError,
    codes: { ERR_INVALID_ARG_VALUE, ERR_MISSING_ARGS }
  } = requireErrors();
  const eos = requireEndOfStream();
  compose = function compose2(...streams) {
    if (streams.length === 0) {
      throw new ERR_MISSING_ARGS("streams");
    }
    if (streams.length === 1) {
      return Duplex.from(streams[0]);
    }
    const orgStreams = [...streams];
    if (typeof streams[0] === "function") {
      streams[0] = Duplex.from(streams[0]);
    }
    if (typeof streams[streams.length - 1] === "function") {
      const idx = streams.length - 1;
      streams[idx] = Duplex.from(streams[idx]);
    }
    for (let n = 0; n < streams.length; ++n) {
      if (!isNodeStream(streams[n]) && !isWebStream(streams[n])) {
        continue;
      }
      if (n < streams.length - 1 && !(isReadable(streams[n]) || isReadableStream(streams[n]) || isTransformStream(streams[n]))) {
        throw new ERR_INVALID_ARG_VALUE(`streams[${n}]`, orgStreams[n], "must be readable");
      }
      if (n > 0 && !(isWritable(streams[n]) || isWritableStream(streams[n]) || isTransformStream(streams[n]))) {
        throw new ERR_INVALID_ARG_VALUE(`streams[${n}]`, orgStreams[n], "must be writable");
      }
    }
    let ondrain;
    let onfinish;
    let onreadable;
    let onclose;
    let d;
    function onfinished(err) {
      const cb = onclose;
      onclose = null;
      if (cb) {
        cb(err);
      } else if (err) {
        d.destroy(err);
      } else if (!readable2 && !writable2) {
        d.destroy();
      }
    }
    const head = streams[0];
    const tail = pipeline(streams, onfinished);
    const writable2 = !!(isWritable(head) || isWritableStream(head) || isTransformStream(head));
    const readable2 = !!(isReadable(tail) || isReadableStream(tail) || isTransformStream(tail));
    d = new Duplex({
      // TODO (ronag): highWaterMark?
      writableObjectMode: !!(head !== null && head !== void 0 && head.writableObjectMode),
      readableObjectMode: !!(tail !== null && tail !== void 0 && tail.readableObjectMode),
      writable: writable2,
      readable: readable2
    });
    if (writable2) {
      if (isNodeStream(head)) {
        d._write = function(chunk, encoding, callback) {
          if (head.write(chunk, encoding)) {
            callback();
          } else {
            ondrain = callback;
          }
        };
        d._final = function(callback) {
          head.end();
          onfinish = callback;
        };
        head.on("drain", function() {
          if (ondrain) {
            const cb = ondrain;
            ondrain = null;
            cb();
          }
        });
      } else if (isWebStream(head)) {
        const writable3 = isTransformStream(head) ? head.writable : head;
        const writer = writable3.getWriter();
        d._write = async function(chunk, encoding, callback) {
          try {
            await writer.ready;
            writer.write(chunk).catch(() => {
            });
            callback();
          } catch (err) {
            callback(err);
          }
        };
        d._final = async function(callback) {
          try {
            await writer.ready;
            writer.close().catch(() => {
            });
            onfinish = callback;
          } catch (err) {
            callback(err);
          }
        };
      }
      const toRead = isTransformStream(tail) ? tail.readable : tail;
      eos(toRead, () => {
        if (onfinish) {
          const cb = onfinish;
          onfinish = null;
          cb();
        }
      });
    }
    if (readable2) {
      if (isNodeStream(tail)) {
        tail.on("readable", function() {
          if (onreadable) {
            const cb = onreadable;
            onreadable = null;
            cb();
          }
        });
        tail.on("end", function() {
          d.push(null);
        });
        d._read = function() {
          while (true) {
            const buf = tail.read();
            if (buf === null) {
              onreadable = d._read;
              return;
            }
            if (!d.push(buf)) {
              return;
            }
          }
        };
      } else if (isWebStream(tail)) {
        const readable3 = isTransformStream(tail) ? tail.readable : tail;
        const reader = readable3.getReader();
        d._read = async function() {
          while (true) {
            try {
              const { value, done } = await reader.read();
              if (!d.push(value)) {
                return;
              }
              if (done) {
                d.push(null);
                return;
              }
            } catch {
              return;
            }
          }
        };
      }
    }
    d._destroy = function(err, callback) {
      if (!err && onclose !== null) {
        err = new AbortError();
      }
      onreadable = null;
      ondrain = null;
      onfinish = null;
      if (onclose === null) {
        callback(err);
      } else {
        onclose = callback;
        if (isNodeStream(tail)) {
          destroyer(tail, err);
        }
      }
    };
    return d;
  };
  return compose;
}
var hasRequiredOperators;
function requireOperators() {
  if (hasRequiredOperators) return operators;
  hasRequiredOperators = 1;
  const AbortController = globalThis.AbortController || require$$0.AbortController;
  const {
    codes: { ERR_INVALID_ARG_VALUE, ERR_INVALID_ARG_TYPE, ERR_MISSING_ARGS, ERR_OUT_OF_RANGE },
    AbortError
  } = requireErrors();
  const { validateAbortSignal, validateInteger, validateObject } = requireValidators();
  const kWeakHandler = requirePrimordials().Symbol("kWeak");
  const kResistStopPropagation = requirePrimordials().Symbol("kResistStopPropagation");
  const { finished } = requireEndOfStream();
  const staticCompose = requireCompose();
  const { addAbortSignalNoValidate } = requireAddAbortSignal();
  const { isWritable, isNodeStream } = requireUtils();
  const { deprecate } = requireUtil();
  const {
    ArrayPrototypePush,
    Boolean: Boolean2,
    MathFloor,
    Number: Number2,
    NumberIsNaN,
    Promise: Promise2,
    PromiseReject,
    PromiseResolve,
    PromisePrototypeThen,
    Symbol: Symbol2
  } = requirePrimordials();
  const kEmpty = Symbol2("kEmpty");
  const kEof = Symbol2("kEof");
  function compose2(stream2, options) {
    if (options != null) {
      validateObject(options, "options");
    }
    if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
      validateAbortSignal(options.signal, "options.signal");
    }
    if (isNodeStream(stream2) && !isWritable(stream2)) {
      throw new ERR_INVALID_ARG_VALUE("stream", stream2, "must be writable");
    }
    const composedStream = staticCompose(this, stream2);
    if (options !== null && options !== void 0 && options.signal) {
      addAbortSignalNoValidate(options.signal, composedStream);
    }
    return composedStream;
  }
  function map(fn, options) {
    if (typeof fn !== "function") {
      throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
    }
    if (options != null) {
      validateObject(options, "options");
    }
    if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
      validateAbortSignal(options.signal, "options.signal");
    }
    let concurrency = 1;
    if ((options === null || options === void 0 ? void 0 : options.concurrency) != null) {
      concurrency = MathFloor(options.concurrency);
    }
    let highWaterMark = concurrency - 1;
    if ((options === null || options === void 0 ? void 0 : options.highWaterMark) != null) {
      highWaterMark = MathFloor(options.highWaterMark);
    }
    validateInteger(concurrency, "options.concurrency", 1);
    validateInteger(highWaterMark, "options.highWaterMark", 0);
    highWaterMark += concurrency;
    return (async function* map2() {
      const signal = requireUtil().AbortSignalAny(
        [options === null || options === void 0 ? void 0 : options.signal].filter(Boolean2)
      );
      const stream2 = this;
      const queue = [];
      const signalOpt = {
        signal
      };
      let next;
      let resume;
      let done = false;
      let cnt = 0;
      function onCatch() {
        done = true;
        afterItemProcessed();
      }
      function afterItemProcessed() {
        cnt -= 1;
        maybeResume();
      }
      function maybeResume() {
        if (resume && !done && cnt < concurrency && queue.length < highWaterMark) {
          resume();
          resume = null;
        }
      }
      async function pump() {
        try {
          for await (let val of stream2) {
            if (done) {
              return;
            }
            if (signal.aborted) {
              throw new AbortError();
            }
            try {
              val = fn(val, signalOpt);
              if (val === kEmpty) {
                continue;
              }
              val = PromiseResolve(val);
            } catch (err) {
              val = PromiseReject(err);
            }
            cnt += 1;
            PromisePrototypeThen(val, afterItemProcessed, onCatch);
            queue.push(val);
            if (next) {
              next();
              next = null;
            }
            if (!done && (queue.length >= highWaterMark || cnt >= concurrency)) {
              await new Promise2((resolve) => {
                resume = resolve;
              });
            }
          }
          queue.push(kEof);
        } catch (err) {
          const val = PromiseReject(err);
          PromisePrototypeThen(val, afterItemProcessed, onCatch);
          queue.push(val);
        } finally {
          done = true;
          if (next) {
            next();
            next = null;
          }
        }
      }
      pump();
      try {
        while (true) {
          while (queue.length > 0) {
            const val = await queue[0];
            if (val === kEof) {
              return;
            }
            if (signal.aborted) {
              throw new AbortError();
            }
            if (val !== kEmpty) {
              yield val;
            }
            queue.shift();
            maybeResume();
          }
          await new Promise2((resolve) => {
            next = resolve;
          });
        }
      } finally {
        done = true;
        if (resume) {
          resume();
          resume = null;
        }
      }
    }).call(this);
  }
  function asIndexedPairs(options = void 0) {
    if (options != null) {
      validateObject(options, "options");
    }
    if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
      validateAbortSignal(options.signal, "options.signal");
    }
    return (async function* asIndexedPairs2() {
      let index = 0;
      for await (const val of this) {
        var _options$signal;
        if (options !== null && options !== void 0 && (_options$signal = options.signal) !== null && _options$signal !== void 0 && _options$signal.aborted) {
          throw new AbortError({
            cause: options.signal.reason
          });
        }
        yield [index++, val];
      }
    }).call(this);
  }
  async function some(fn, options = void 0) {
    for await (const unused of filter.call(this, fn, options)) {
      return true;
    }
    return false;
  }
  async function every(fn, options = void 0) {
    if (typeof fn !== "function") {
      throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
    }
    return !await some.call(
      this,
      async (...args) => {
        return !await fn(...args);
      },
      options
    );
  }
  async function find(fn, options) {
    for await (const result of filter.call(this, fn, options)) {
      return result;
    }
    return void 0;
  }
  async function forEach(fn, options) {
    if (typeof fn !== "function") {
      throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
    }
    async function forEachFn(value, options2) {
      await fn(value, options2);
      return kEmpty;
    }
    for await (const unused of map.call(this, forEachFn, options)) ;
  }
  function filter(fn, options) {
    if (typeof fn !== "function") {
      throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
    }
    async function filterFn(value, options2) {
      if (await fn(value, options2)) {
        return value;
      }
      return kEmpty;
    }
    return map.call(this, filterFn, options);
  }
  class ReduceAwareErrMissingArgs extends ERR_MISSING_ARGS {
    constructor() {
      super("reduce");
      this.message = "Reduce of an empty stream requires an initial value";
    }
  }
  async function reduce(reducer, initialValue, options) {
    var _options$signal2;
    if (typeof reducer !== "function") {
      throw new ERR_INVALID_ARG_TYPE("reducer", ["Function", "AsyncFunction"], reducer);
    }
    if (options != null) {
      validateObject(options, "options");
    }
    if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
      validateAbortSignal(options.signal, "options.signal");
    }
    let hasInitialValue = arguments.length > 1;
    if (options !== null && options !== void 0 && (_options$signal2 = options.signal) !== null && _options$signal2 !== void 0 && _options$signal2.aborted) {
      const err = new AbortError(void 0, {
        cause: options.signal.reason
      });
      this.once("error", () => {
      });
      await finished(this.destroy(err));
      throw err;
    }
    const ac = new AbortController();
    const signal = ac.signal;
    if (options !== null && options !== void 0 && options.signal) {
      const opts = {
        once: true,
        [kWeakHandler]: this,
        [kResistStopPropagation]: true
      };
      options.signal.addEventListener("abort", () => ac.abort(), opts);
    }
    let gotAnyItemFromStream = false;
    try {
      for await (const value of this) {
        var _options$signal3;
        gotAnyItemFromStream = true;
        if (options !== null && options !== void 0 && (_options$signal3 = options.signal) !== null && _options$signal3 !== void 0 && _options$signal3.aborted) {
          throw new AbortError();
        }
        if (!hasInitialValue) {
          initialValue = value;
          hasInitialValue = true;
        } else {
          initialValue = await reducer(initialValue, value, {
            signal
          });
        }
      }
      if (!gotAnyItemFromStream && !hasInitialValue) {
        throw new ReduceAwareErrMissingArgs();
      }
    } finally {
      ac.abort();
    }
    return initialValue;
  }
  async function toArray(options) {
    if (options != null) {
      validateObject(options, "options");
    }
    if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
      validateAbortSignal(options.signal, "options.signal");
    }
    const result = [];
    for await (const val of this) {
      var _options$signal4;
      if (options !== null && options !== void 0 && (_options$signal4 = options.signal) !== null && _options$signal4 !== void 0 && _options$signal4.aborted) {
        throw new AbortError(void 0, {
          cause: options.signal.reason
        });
      }
      ArrayPrototypePush(result, val);
    }
    return result;
  }
  function flatMap(fn, options) {
    const values = map.call(this, fn, options);
    return (async function* flatMap2() {
      for await (const val of values) {
        yield* val;
      }
    }).call(this);
  }
  function toIntegerOrInfinity(number) {
    number = Number2(number);
    if (NumberIsNaN(number)) {
      return 0;
    }
    if (number < 0) {
      throw new ERR_OUT_OF_RANGE("number", ">= 0", number);
    }
    return number;
  }
  function drop(number, options = void 0) {
    if (options != null) {
      validateObject(options, "options");
    }
    if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
      validateAbortSignal(options.signal, "options.signal");
    }
    number = toIntegerOrInfinity(number);
    return (async function* drop2() {
      var _options$signal5;
      if (options !== null && options !== void 0 && (_options$signal5 = options.signal) !== null && _options$signal5 !== void 0 && _options$signal5.aborted) {
        throw new AbortError();
      }
      for await (const val of this) {
        var _options$signal6;
        if (options !== null && options !== void 0 && (_options$signal6 = options.signal) !== null && _options$signal6 !== void 0 && _options$signal6.aborted) {
          throw new AbortError();
        }
        if (number-- <= 0) {
          yield val;
        }
      }
    }).call(this);
  }
  function take(number, options = void 0) {
    if (options != null) {
      validateObject(options, "options");
    }
    if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
      validateAbortSignal(options.signal, "options.signal");
    }
    number = toIntegerOrInfinity(number);
    return (async function* take2() {
      var _options$signal7;
      if (options !== null && options !== void 0 && (_options$signal7 = options.signal) !== null && _options$signal7 !== void 0 && _options$signal7.aborted) {
        throw new AbortError();
      }
      for await (const val of this) {
        var _options$signal8;
        if (options !== null && options !== void 0 && (_options$signal8 = options.signal) !== null && _options$signal8 !== void 0 && _options$signal8.aborted) {
          throw new AbortError();
        }
        if (number-- > 0) {
          yield val;
        }
        if (number <= 0) {
          return;
        }
      }
    }).call(this);
  }
  operators.streamReturningOperators = {
    asIndexedPairs: deprecate(asIndexedPairs, "readable.asIndexedPairs will be removed in a future version."),
    drop,
    filter,
    flatMap,
    map,
    take,
    compose: compose2
  };
  operators.promiseReturningOperators = {
    every,
    forEach,
    reduce,
    toArray,
    some,
    find
  };
  return operators;
}
var promises;
var hasRequiredPromises;
function requirePromises() {
  if (hasRequiredPromises) return promises;
  hasRequiredPromises = 1;
  const { ArrayPrototypePop, Promise: Promise2 } = requirePrimordials();
  const { isIterable, isNodeStream, isWebStream } = requireUtils();
  const { pipelineImpl: pl } = requirePipeline();
  const { finished } = requireEndOfStream();
  requireStream();
  function pipeline(...streams) {
    return new Promise2((resolve, reject) => {
      let signal;
      let end;
      const lastArg = streams[streams.length - 1];
      if (lastArg && typeof lastArg === "object" && !isNodeStream(lastArg) && !isIterable(lastArg) && !isWebStream(lastArg)) {
        const options = ArrayPrototypePop(streams);
        signal = options.signal;
        end = options.end;
      }
      pl(
        streams,
        (err, value) => {
          if (err) {
            reject(err);
          } else {
            resolve(value);
          }
        },
        {
          signal,
          end
        }
      );
    });
  }
  promises = {
    finished,
    pipeline
  };
  return promises;
}
var hasRequiredStream;
function requireStream() {
  if (hasRequiredStream) return stream.exports;
  hasRequiredStream = 1;
  const { Buffer } = require$$0$1;
  const { ObjectDefineProperty, ObjectKeys, ReflectApply } = requirePrimordials();
  const {
    promisify: { custom: customPromisify }
  } = requireUtil();
  const { streamReturningOperators, promiseReturningOperators } = requireOperators();
  const {
    codes: { ERR_ILLEGAL_CONSTRUCTOR }
  } = requireErrors();
  const compose2 = requireCompose();
  const { setDefaultHighWaterMark, getDefaultHighWaterMark } = requireState();
  const { pipeline } = requirePipeline();
  const { destroyer } = requireDestroy();
  const eos = requireEndOfStream();
  const promises2 = requirePromises();
  const utils2 = requireUtils();
  const Stream = stream.exports = requireLegacy().Stream;
  Stream.isDestroyed = utils2.isDestroyed;
  Stream.isDisturbed = utils2.isDisturbed;
  Stream.isErrored = utils2.isErrored;
  Stream.isReadable = utils2.isReadable;
  Stream.isWritable = utils2.isWritable;
  Stream.Readable = requireReadable();
  for (const key of ObjectKeys(streamReturningOperators)) {
    let fn = function(...args) {
      if (new.target) {
        throw ERR_ILLEGAL_CONSTRUCTOR();
      }
      return Stream.Readable.from(ReflectApply(op, this, args));
    };
    const op = streamReturningOperators[key];
    ObjectDefineProperty(fn, "name", {
      __proto__: null,
      value: op.name
    });
    ObjectDefineProperty(fn, "length", {
      __proto__: null,
      value: op.length
    });
    ObjectDefineProperty(Stream.Readable.prototype, key, {
      __proto__: null,
      value: fn,
      enumerable: false,
      configurable: true,
      writable: true
    });
  }
  for (const key of ObjectKeys(promiseReturningOperators)) {
    let fn = function(...args) {
      if (new.target) {
        throw ERR_ILLEGAL_CONSTRUCTOR();
      }
      return ReflectApply(op, this, args);
    };
    const op = promiseReturningOperators[key];
    ObjectDefineProperty(fn, "name", {
      __proto__: null,
      value: op.name
    });
    ObjectDefineProperty(fn, "length", {
      __proto__: null,
      value: op.length
    });
    ObjectDefineProperty(Stream.Readable.prototype, key, {
      __proto__: null,
      value: fn,
      enumerable: false,
      configurable: true,
      writable: true
    });
  }
  Stream.Writable = requireWritable();
  Stream.Duplex = requireDuplex();
  Stream.Transform = requireTransform();
  Stream.PassThrough = requirePassthrough();
  Stream.pipeline = pipeline;
  const { addAbortSignal: addAbortSignal2 } = requireAddAbortSignal();
  Stream.addAbortSignal = addAbortSignal2;
  Stream.finished = eos;
  Stream.destroy = destroyer;
  Stream.compose = compose2;
  Stream.setDefaultHighWaterMark = setDefaultHighWaterMark;
  Stream.getDefaultHighWaterMark = getDefaultHighWaterMark;
  ObjectDefineProperty(Stream, "promises", {
    __proto__: null,
    configurable: true,
    enumerable: true,
    get() {
      return promises2;
    }
  });
  ObjectDefineProperty(pipeline, customPromisify, {
    __proto__: null,
    enumerable: true,
    get() {
      return promises2.pipeline;
    }
  });
  ObjectDefineProperty(eos, customPromisify, {
    __proto__: null,
    enumerable: true,
    get() {
      return promises2.finished;
    }
  });
  Stream.Stream = Stream;
  Stream._isUint8Array = function isUint8Array(value) {
    return value instanceof Uint8Array;
  };
  Stream._uint8ArrayToBuffer = function _uint8ArrayToBuffer(chunk) {
    return Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
  };
  return stream.exports;
}
ours.exports;
var hasRequiredOurs;
function requireOurs() {
  if (hasRequiredOurs) return ours.exports;
  hasRequiredOurs = 1;
  (function(module) {
    const Stream = require$$0$3;
    if (Stream && process.env.READABLE_STREAM === "disable") {
      const promises2 = Stream.promises;
      module.exports._uint8ArrayToBuffer = Stream._uint8ArrayToBuffer;
      module.exports._isUint8Array = Stream._isUint8Array;
      module.exports.isDisturbed = Stream.isDisturbed;
      module.exports.isErrored = Stream.isErrored;
      module.exports.isReadable = Stream.isReadable;
      module.exports.Readable = Stream.Readable;
      module.exports.Writable = Stream.Writable;
      module.exports.Duplex = Stream.Duplex;
      module.exports.Transform = Stream.Transform;
      module.exports.PassThrough = Stream.PassThrough;
      module.exports.addAbortSignal = Stream.addAbortSignal;
      module.exports.finished = Stream.finished;
      module.exports.destroy = Stream.destroy;
      module.exports.pipeline = Stream.pipeline;
      module.exports.compose = Stream.compose;
      Object.defineProperty(Stream, "promises", {
        configurable: true,
        enumerable: true,
        get() {
          return promises2;
        }
      });
      module.exports.Stream = Stream.Stream;
    } else {
      const CustomStream = requireStream();
      const promises2 = requirePromises();
      const originalDestroy = CustomStream.Readable.destroy;
      module.exports = CustomStream.Readable;
      module.exports._uint8ArrayToBuffer = CustomStream._uint8ArrayToBuffer;
      module.exports._isUint8Array = CustomStream._isUint8Array;
      module.exports.isDisturbed = CustomStream.isDisturbed;
      module.exports.isErrored = CustomStream.isErrored;
      module.exports.isReadable = CustomStream.isReadable;
      module.exports.Readable = CustomStream.Readable;
      module.exports.Writable = CustomStream.Writable;
      module.exports.Duplex = CustomStream.Duplex;
      module.exports.Transform = CustomStream.Transform;
      module.exports.PassThrough = CustomStream.PassThrough;
      module.exports.addAbortSignal = CustomStream.addAbortSignal;
      module.exports.finished = CustomStream.finished;
      module.exports.destroy = CustomStream.destroy;
      module.exports.destroy = originalDestroy;
      module.exports.pipeline = CustomStream.pipeline;
      module.exports.compose = CustomStream.compose;
      Object.defineProperty(CustomStream, "promises", {
        configurable: true,
        enumerable: true,
        get() {
          return promises2;
        }
      });
      module.exports.Stream = CustomStream.Stream;
    }
    module.exports.default = module.exports;
  })(ours);
  return ours.exports;
}
export {
  requireOurs as r
};
