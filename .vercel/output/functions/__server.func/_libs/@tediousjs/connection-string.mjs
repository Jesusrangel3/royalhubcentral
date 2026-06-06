import require$$0 from "node:util";
var lib = {};
var connectionString = {};
var connectionStringParser = {};
var hasRequiredConnectionStringParser;
function requireConnectionStringParser() {
  if (hasRequiredConnectionStringParser) return connectionStringParser;
  hasRequiredConnectionStringParser = 1;
  Object.defineProperty(connectionStringParser, "__esModule", { value: true });
  connectionStringParser.default = connectionStringParser$1;
  var CollectionMode;
  (function(CollectionMode2) {
    CollectionMode2[CollectionMode2["key"] = 0] = "key";
    CollectionMode2[CollectionMode2["value"] = 1] = "value";
  })(CollectionMode || (CollectionMode = {}));
  const CONFIG = Object.freeze({
    key: {
      terminator: "=",
      quotes: {}
    },
    value: {
      terminator: ";",
      quotes: {
        '"': '"',
        "'": "'",
        "{": "}"
      }
    }
  });
  function connectionStringParser$1(connectionString2, parserConfig = CONFIG) {
    const parsed = {};
    let collectionMode = CollectionMode.key;
    let started = false;
    let finished = false;
    let quoted = false;
    let quote = "";
    let buffer = "";
    let currentKey = "";
    let pointer = 0;
    function start() {
      started = true;
    }
    function finish() {
      finished = true;
    }
    function reset() {
      started = false;
      finished = false;
      quoted = false;
      quote = "";
      buffer = "";
    }
    function config() {
      return collectionMode === CollectionMode.key ? parserConfig.key : parserConfig.value;
    }
    function isTerminator(char) {
      return config().terminator === char;
    }
    function isStartQuote(char) {
      return Object.keys(config().quotes).some((val) => char === val);
    }
    function isEndQuote(char) {
      return quoted && char === config().quotes[quote];
    }
    function push(char) {
      buffer += char;
    }
    function collect() {
      if (!quoted) {
        buffer = buffer.trim();
      }
      switch (collectionMode) {
        case CollectionMode.key:
          currentKey = buffer.toLowerCase();
          collectionMode = CollectionMode.value;
          break;
        case CollectionMode.value:
          collectionMode = CollectionMode.key;
          parsed[currentKey] = buffer;
          currentKey = "";
          break;
      }
      reset();
    }
    while (pointer < connectionString2.length) {
      const current = connectionString2.charAt(pointer);
      if (!finished) {
        if (!started) {
          if (current.trim()) {
            start();
            if (isStartQuote(current)) {
              quoted = true;
              quote = current;
            } else {
              push(current);
            }
          }
        } else {
          if (quoted && isEndQuote(current)) {
            const next = connectionString2.charAt(pointer + 1);
            if (current === next) {
              push(current);
              pointer++;
            } else {
              finish();
            }
          } else if (!quoted && isTerminator(current)) {
            const next = connectionString2.charAt(pointer + 1);
            if (current === next) {
              push(current);
              pointer++;
            } else {
              collect();
            }
          } else {
            push(current);
          }
        }
      } else if (isTerminator(current)) {
        collect();
      } else if (current.trim()) {
        throw new Error("Malformed connection string");
      }
      pointer++;
    }
    if (quoted && !finished) {
      throw new Error("Connection string terminated unexpectedly");
    } else {
      collect();
    }
    return parsed;
  }
  return connectionStringParser;
}
var hasRequiredConnectionString;
function requireConnectionString() {
  if (hasRequiredConnectionString) return connectionString;
  hasRequiredConnectionString = 1;
  var __importDefault = connectionString && connectionString.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(connectionString, "__esModule", { value: true });
  connectionString.ConnectionString = void 0;
  const node_util_1 = require$$0;
  const connection_string_parser_1 = __importDefault(requireConnectionStringParser());
  class ConnectionString {
    #connectionString;
    #parsed;
    constructor(connectionString2) {
      this.#connectionString = connectionString2.toString();
      const parsed = (0, connection_string_parser_1.default)(this.#connectionString);
      this.#parsed = new Map(Object.entries(parsed));
    }
    [node_util_1.inspect.custom]() {
      return this.#parsed;
    }
    get size() {
      return this.#parsed.size;
    }
    // it would be really nice to be able to make this a generice (eg: get<string>) and that would then coerce the value
    // see typia library for an example of something similar
    get(key, coerceType) {
      const val = this.#parsed.get(key.toLowerCase());
      const actualType = coerceType ?? "string";
      if (typeof val === "undefined" || actualType === "string") {
        return val;
      }
      switch (actualType) {
        case "boolean":
          return ["false", "no", "0"].includes(val.toLowerCase()) ? false : !!val;
        case "number":
          return parseInt(val, 10);
        default:
          throw new TypeError("Coerce type not supported");
      }
    }
    keys() {
      return this.#parsed.keys();
    }
    values() {
      return this.#parsed.values();
    }
    [Symbol.iterator]() {
      return this.#parsed[Symbol.iterator]();
    }
    entries() {
      return this.#parsed.entries();
    }
    toString() {
      return this.#connectionString;
    }
    has(key) {
      return this.#parsed.has(key.toLowerCase());
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    forEach(callbackfn, thisArg) {
      this.#parsed.forEach((value, key) => {
        callbackfn.call(thisArg ?? this, value, key, this);
      });
    }
    // a way to extract a formatted object from the connection string
    toSchema(schema, { includeMissing } = {}) {
      return Object.fromEntries(Object.entries(schema).reduce((props, [key, { type, default: defaultValue, aliases }]) => {
        const prop = [key, ...aliases ?? []].find((k) => this.has(k));
        if (prop || includeMissing) {
          props.push([key, prop ? this.get(prop.toLowerCase(), type) : defaultValue]);
        }
        return props;
      }, []));
    }
  }
  connectionString.ConnectionString = ConnectionString;
  return connectionString;
}
var builder = {};
var hasRequiredBuilder;
function requireBuilder() {
  if (hasRequiredBuilder) return builder;
  hasRequiredBuilder = 1;
  Object.defineProperty(builder, "__esModule", { value: true });
  builder.build = build;
  function isQuoted(val) {
    if (val[0] !== "{") {
      return false;
    }
    for (let i = 1; i < val.length; i++) {
      if (val[i] === "}") {
        if (i + 1 === val.length) {
          return true;
        } else if (val[i + 1] !== "}") {
          return false;
        } else {
          i++;
        }
      }
    }
    return false;
  }
  function needsQuotes(val) {
    return !isQuoted(val) && !!val.match(/\[|]|{|}|\|\(|\)|,|;|\?|\*|=|!|@/)?.length;
  }
  function encodeTuple(key, value) {
    if (value === null || value === void 0) {
      return [key, ""];
    }
    switch (typeof value) {
      case "boolean":
        return [key, value ? "Yes" : "No"];
      default: {
        const strVal = value.toString();
        if (needsQuotes(strVal)) {
          return [key, `{${strVal.replace(/}/g, "}}")}}`];
        }
        return [key, strVal];
      }
    }
  }
  function build(data) {
    return Object.entries(data).map(([key, value]) => {
      return encodeTuple(key.trim(), value).join("=");
    }).join(";");
  }
  return builder;
}
var mssqlSchema = {};
var hasRequiredMssqlSchema;
function requireMssqlSchema() {
  if (hasRequiredMssqlSchema) return mssqlSchema;
  hasRequiredMssqlSchema = 1;
  Object.defineProperty(mssqlSchema, "__esModule", { value: true });
  const mssqlSchema$1 = {
    "application name": {
      type: "string",
      aliases: ["app"]
    },
    "applicationintent": {
      type: "string",
      default: "ReadWrite"
    },
    "asynchronous processing": {
      type: "boolean",
      default: false,
      aliases: ["Async"]
    },
    "attachdbfilename": {
      type: "string",
      aliases: ["extended properties", "initial file name"]
    },
    "authentication": {
      type: "string"
    },
    "column encryption setting": {
      type: "string"
    },
    "connection timeout": {
      type: "number",
      aliases: ["connect timeout", "timeout"],
      default: 15
    },
    "connection lifetime": {
      type: "number",
      aliases: ["load balance timeout"],
      default: 0
    },
    "connectretrycount": {
      type: "number",
      default: 1
    },
    "connectretryinterval": {
      type: "number",
      default: 10
    },
    "context connection": {
      type: "boolean",
      default: false
    },
    "current language": {
      aliases: ["language"],
      type: "string"
    },
    "data source": {
      aliases: ["addr", "address", "server", "network address"],
      type: "string"
    },
    "encrypt": {
      type: "boolean",
      default: false
    },
    "enlist": {
      type: "boolean",
      default: true
    },
    "failover partner": {
      type: "string"
    },
    "initial catalog": {
      type: "string",
      aliases: ["database"]
    },
    "integrated security": {
      type: "boolean",
      aliases: ["trusted_connection"]
    },
    "max pool size": {
      type: "number",
      default: 100
    },
    "min pool size": {
      type: "number",
      default: 0
    },
    "multipleactiveresultsets": {
      type: "boolean",
      default: false
    },
    "multisubnetfailover": {
      type: "boolean",
      default: false
    },
    "network library": {
      type: "string",
      aliases: ["network", "net"]
    },
    "packet size": {
      type: "number",
      default: 8e3
    },
    "password": {
      type: "string",
      aliases: ["pwd"]
    },
    "persist security info": {
      type: "boolean",
      aliases: ["persistsecurityinfo"],
      default: false
    },
    "poolblockingperiod": {
      type: "number",
      default: 0
    },
    "pooling": {
      type: "boolean",
      default: true
    },
    "replication": {
      type: "boolean",
      default: false
    },
    "transaction binding": {
      type: "string",
      default: "Implicit Unbind"
    },
    "transparentnetworkipresolution": {
      type: "boolean",
      default: true
    },
    "trustservercertificate": {
      type: "boolean",
      default: false
    },
    "type system version": {
      type: "string"
    },
    "user id": {
      type: "string",
      aliases: ["uid"]
    },
    "user instance": {
      type: "boolean",
      default: false
    },
    "workstation id": {
      type: "string",
      aliases: ["wsid"]
    }
  };
  mssqlSchema.default = mssqlSchema$1;
  return mssqlSchema;
}
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  (function(exports) {
    var __importDefault = lib && lib.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MSSQL_SCHEMA = exports.build = void 0;
    exports.parse = parse;
    const connection_string_1 = requireConnectionString();
    const builder_1 = requireBuilder();
    Object.defineProperty(exports, "build", { enumerable: true, get: function() {
      return builder_1.build;
    } });
    const mssql_schema_1 = __importDefault(requireMssqlSchema());
    exports.MSSQL_SCHEMA = mssql_schema_1.default;
    function parse(connectionString2) {
      return Object.freeze(new connection_string_1.ConnectionString(connectionString2));
    }
  })(lib);
  return lib;
}
export {
  requireLib as r
};
