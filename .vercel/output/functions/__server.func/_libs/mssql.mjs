import require$$1 from "node:events";
import require$$0 from "node:diagnostics_channel";
import { g as getDefaultExportFromCjs } from "./react.mjs";
import { r as requireSrc } from "./debug.mjs";
import { r as requireLib } from "./@tediousjs/connection-string.mjs";
import { r as requireTarn } from "./tarn.mjs";
import require$$2 from "node:stream";
import { r as requireTedious$1 } from "./tedious.mjs";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        }
      }
    }
  }
  return Object.freeze(n);
}
var tedious = { exports: {} };
var base = { exports: {} };
var utils;
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  const IDS = /* @__PURE__ */ new WeakMap();
  const INCREMENT = {
    Connection: 1,
    ConnectionPool: 1,
    Request: 1,
    Transaction: 1,
    PreparedStatement: 1
  };
  const getPoolId = (obj) => {
    let parent = obj && obj.parent;
    while (parent && !parent.pool) {
      parent = parent.parent;
    }
    return parent ? IDS.get(parent) : void 0;
  };
  utils = {
    objectHasProperty: (object, property) => Object.prototype.hasOwnProperty.call(object, property),
    INCREMENT,
    IDS: {
      get: IDS.get.bind(IDS),
      add: (object, type, id) => {
        if (id) return IDS.set(object, id);
        IDS.set(object, INCREMENT[type]++);
      }
    },
    getPoolId
  };
  return utils;
}
var mssqlError;
var hasRequiredMssqlError;
function requireMssqlError() {
  if (hasRequiredMssqlError) return mssqlError;
  hasRequiredMssqlError = 1;
  class MSSQLError extends Error {
    /**
     * Creates a new ConnectionError.
     *
     * @param {String} message Error message.
     * @param {String} [code] Error code.
     */
    constructor(message, code) {
      if (message instanceof Error) {
        super(message.message);
        this.code = message.code || code;
        Error.captureStackTrace(this, this.constructor);
        Object.defineProperty(this, "originalError", { enumerable: true, value: message });
      } else {
        super(message);
        this.code = code;
      }
      this.name = "MSSQLError";
    }
  }
  mssqlError = MSSQLError;
  return mssqlError;
}
var connectionError;
var hasRequiredConnectionError;
function requireConnectionError() {
  if (hasRequiredConnectionError) return connectionError;
  hasRequiredConnectionError = 1;
  const MSSQLError = requireMssqlError();
  class ConnectionError extends MSSQLError {
    /**
     * Creates a new ConnectionError.
     *
     * @param {String} message Error message.
     * @param {String} [code] Error code.
     */
    constructor(message, code) {
      super(message, code);
      this.name = "ConnectionError";
    }
  }
  connectionError = ConnectionError;
  return connectionError;
}
var shared = { exports: {} };
var datatypes = { exports: {} };
var hasRequiredDatatypes;
function requireDatatypes() {
  if (hasRequiredDatatypes) return datatypes.exports;
  hasRequiredDatatypes = 1;
  (function(module) {
    const objectHasProperty = requireUtils().objectHasProperty;
    const inspect = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
    const TYPES = {
      VarChar(length) {
        return { type: TYPES.VarChar, length };
      },
      NVarChar(length) {
        return { type: TYPES.NVarChar, length };
      },
      Text() {
        return { type: TYPES.Text };
      },
      Int() {
        return { type: TYPES.Int };
      },
      BigInt() {
        return { type: TYPES.BigInt };
      },
      TinyInt() {
        return { type: TYPES.TinyInt };
      },
      SmallInt() {
        return { type: TYPES.SmallInt };
      },
      Bit() {
        return { type: TYPES.Bit };
      },
      Float() {
        return { type: TYPES.Float };
      },
      Numeric(precision, scale) {
        return { type: TYPES.Numeric, precision, scale };
      },
      Decimal(precision, scale) {
        return { type: TYPES.Decimal, precision, scale };
      },
      Real() {
        return { type: TYPES.Real };
      },
      Date() {
        return { type: TYPES.Date };
      },
      DateTime() {
        return { type: TYPES.DateTime };
      },
      DateTime2(scale) {
        return { type: TYPES.DateTime2, scale };
      },
      DateTimeOffset(scale) {
        return { type: TYPES.DateTimeOffset, scale };
      },
      SmallDateTime() {
        return { type: TYPES.SmallDateTime };
      },
      Time(scale) {
        return { type: TYPES.Time, scale };
      },
      UniqueIdentifier() {
        return { type: TYPES.UniqueIdentifier };
      },
      SmallMoney() {
        return { type: TYPES.SmallMoney };
      },
      Money() {
        return { type: TYPES.Money };
      },
      Binary(length) {
        return { type: TYPES.Binary, length };
      },
      VarBinary(length) {
        return { type: TYPES.VarBinary, length };
      },
      Image() {
        return { type: TYPES.Image };
      },
      Xml() {
        return { type: TYPES.Xml };
      },
      Char(length) {
        return { type: TYPES.Char, length };
      },
      NChar(length) {
        return { type: TYPES.NChar, length };
      },
      NText() {
        return { type: TYPES.NText };
      },
      TVP(tvpType) {
        return { type: TYPES.TVP, tvpType };
      },
      UDT() {
        return { type: TYPES.UDT };
      },
      Geography() {
        return { type: TYPES.Geography };
      },
      Geometry() {
        return { type: TYPES.Geometry };
      },
      Variant() {
        return { type: TYPES.Variant };
      }
    };
    module.exports.TYPES = TYPES;
    module.exports.DECLARATIONS = {};
    const zero = function(value, length) {
      if (length == null) length = 2;
      value = String(value);
      if (value.length < length) {
        for (let i = 1; i <= length - value.length; i++) {
          value = `0${value}`;
        }
      }
      return value;
    };
    for (const key in TYPES) {
      if (objectHasProperty(TYPES, key)) {
        const value = TYPES[key];
        value.declaration = key.toLowerCase();
        module.exports.DECLARATIONS[value.declaration] = value;
        ((key2, value2) => {
          value2[inspect] = () => `[sql.${key2}]`;
        })(key, value);
      }
    }
    module.exports.declare = (type, options) => {
      switch (type) {
        case TYPES.VarChar:
        case TYPES.VarBinary:
          return `${type.declaration} (${options.length > 8e3 ? "MAX" : options.length == null ? "MAX" : options.length})`;
        case TYPES.NVarChar:
          return `${type.declaration} (${options.length > 4e3 ? "MAX" : options.length == null ? "MAX" : options.length})`;
        case TYPES.Char:
        case TYPES.NChar:
        case TYPES.Binary:
          return `${type.declaration} (${options.length == null ? 1 : options.length})`;
        case TYPES.Decimal:
        case TYPES.Numeric:
          return `${type.declaration} (${options.precision == null ? 18 : options.precision}, ${options.scale == null ? 0 : options.scale})`;
        case TYPES.Time:
        case TYPES.DateTime2:
        case TYPES.DateTimeOffset:
          return `${type.declaration} (${options.scale == null ? 7 : options.scale})`;
        case TYPES.TVP:
          return `${options.tvpType} readonly`;
        default:
          return type.declaration;
      }
    };
    module.exports.cast = (value, type, options) => {
      if (value == null) {
        return null;
      }
      switch (typeof value) {
        case "string":
          return `N'${value.replace(/'/g, "''")}'`;
        case "number":
        case "bigint":
          return value;
        case "boolean":
          return value ? 1 : 0;
        case "object":
          if (value instanceof Date) {
            let ns = value.getUTCMilliseconds() / 1e3;
            if (value.nanosecondDelta != null) {
              ns += value.nanosecondDelta;
            }
            const scale = options.scale == null ? 7 : options.scale;
            if (scale > 0) {
              ns = String(ns).substr(1, scale + 1);
            } else {
              ns = "";
            }
            return `N'${value.getUTCFullYear()}-${zero(value.getUTCMonth() + 1)}-${zero(value.getUTCDate())} ${zero(value.getUTCHours())}:${zero(value.getUTCMinutes())}:${zero(value.getUTCSeconds())}${ns}'`;
          } else if (Buffer.isBuffer(value)) {
            return `0x${value.toString("hex")}`;
          }
          return null;
        default:
          return null;
      }
    };
  })(datatypes);
  return datatypes.exports;
}
var table;
var hasRequiredTable;
function requireTable() {
  if (hasRequiredTable) return table;
  hasRequiredTable = 1;
  const TYPES = requireDatatypes().TYPES;
  const declareType = requireDatatypes().declare;
  const objectHasProperty = requireUtils().objectHasProperty;
  const MAX = 65535;
  const JSON_COLUMN_ID = "JSON_F52E2B61-18A1-11d1-B105-00805F49916B";
  function Table(name) {
    if (name) {
      const parsed = Table.parseName(name);
      this.name = parsed.name;
      this.schema = parsed.schema;
      this.database = parsed.database;
      this.path = (this.database ? `[${this.database}].` : "") + (this.schema ? `[${this.schema}].` : "") + `[${this.name}]`;
      this.temporary = this.name.charAt(0) === "#";
    }
    this.columns = [];
    this.rows = [];
    Object.defineProperty(this.columns, "add", {
      value(name2, column, options) {
        if (column == null) {
          throw new Error("Column data type is not defined.");
        }
        if (column instanceof Function) {
          column = column();
        }
        options = options || {};
        column.name = name2;
        ["nullable", "primary", "identity", "readOnly", "length"].forEach((prop) => {
          if (objectHasProperty(options, prop)) {
            column[prop] = options[prop];
          }
        });
        return this.push(column);
      }
    });
    Object.defineProperty(
      this.rows,
      "add",
      {
        value() {
          return this.push(Array.prototype.slice.call(arguments));
        }
      }
    );
    Object.defineProperty(
      this.rows,
      "clear",
      {
        value() {
          return this.splice(0, this.length);
        }
      }
    );
  }
  Table.prototype._makeBulk = function _makeBulk() {
    for (let i = 0; i < this.columns.length; i++) {
      const col = this.columns[i];
      switch (col.type) {
        case TYPES.Date:
        case TYPES.DateTime:
        case TYPES.DateTime2:
          for (let j = 0; j < this.rows.length; j++) {
            const dateValue = this.rows[j][i];
            if (typeof dateValue === "string" || typeof dateValue === "number") {
              const date = new Date(dateValue);
              if (isNaN(date.getDate())) {
                throw new TypeError("Invalid date value passed to bulk rows");
              }
              this.rows[j][i] = date;
            }
          }
          break;
        case TYPES.Xml:
          col.type = TYPES.NVarChar(MAX).type;
          break;
        case TYPES.UDT:
        case TYPES.Geography:
        case TYPES.Geometry:
          col.type = TYPES.VarBinary(MAX).type;
          break;
      }
    }
    return this;
  };
  Table.prototype.declare = function declare() {
    const pkey = this.columns.filter((col) => col.primary === true).map((col) => `[${col.name}]`);
    const cols = this.columns.map((col) => {
      const def = [`[${col.name}] ${declareType(col.type, col)}`];
      if (col.nullable === true) {
        def.push("null");
      } else if (col.nullable === false) {
        def.push("not null");
      }
      if (col.primary === true && pkey.length === 1) {
        def.push("primary key");
      }
      return def.join(" ");
    });
    const constraint = pkey.length > 1 ? `, constraint [PK_${this.temporary ? this.name.substr(1) : this.name}] primary key (${pkey.join(", ")})` : "";
    return `create table ${this.path} (${cols.join(", ")}${constraint})`;
  };
  Table.fromRecordset = function fromRecordset(recordset, name) {
    const t = new this(name);
    for (const colName in recordset.columns) {
      if (objectHasProperty(recordset.columns, colName)) {
        const col = recordset.columns[colName];
        t.columns.add(colName, {
          type: col.type,
          length: col.length,
          scale: col.scale,
          precision: col.precision
        }, {
          nullable: col.nullable,
          identity: col.identity,
          readOnly: col.readOnly
        });
      }
    }
    if (t.columns.length === 1 && t.columns[0].name === JSON_COLUMN_ID) {
      for (let i = 0; i < recordset.length; i++) {
        t.rows.add(JSON.stringify(recordset[i]));
      }
    } else {
      for (let i = 0; i < recordset.length; i++) {
        t.rows.add.apply(t.rows, t.columns.map((col) => recordset[i][col.name]));
      }
    }
    return t;
  };
  Table.parseName = function parseName(name) {
    const length = name.length;
    let cursor = -1;
    let buffer = "";
    let escaped = false;
    const path = [];
    while (++cursor < length) {
      const char = name.charAt(cursor);
      if (char === "[") {
        if (escaped) {
          buffer += char;
        } else {
          escaped = true;
        }
      } else if (char === "]") {
        if (escaped) {
          escaped = false;
        } else {
          throw new Error("Invalid table name.");
        }
      } else if (char === ".") {
        if (escaped) {
          buffer += char;
        } else {
          path.push(buffer);
          buffer = "";
        }
      } else {
        buffer += char;
      }
    }
    if (buffer) {
      path.push(buffer);
    }
    switch (path.length) {
      case 1:
        return {
          name: path[0],
          schema: null,
          database: null
        };
      case 2:
        return {
          name: path[1],
          schema: path[0],
          database: null
        };
      case 3:
        return {
          name: path[2],
          schema: path[1],
          database: path[0]
        };
      default:
        throw new Error("Invalid table name.");
    }
  };
  table = Table;
  return table;
}
var hasRequiredShared;
function requireShared() {
  if (hasRequiredShared) return shared.exports;
  hasRequiredShared = 1;
  (function(module) {
    const { TYPES } = requireDatatypes();
    const Table = requireTable();
    let PromiseLibrary = Promise;
    const driver = {};
    const map = [];
    map.register = function(jstype, sqltype) {
      for (let index2 = 0; index2 < this.length; index2++) {
        const item = this[index2];
        if (item.js === jstype) {
          this.splice(index2, 1);
          break;
        }
      }
      this.push({
        js: jstype,
        sql: sqltype
      });
      return null;
    };
    map.register(String, TYPES.NVarChar);
    map.register(Number, TYPES.Int);
    map.register(Boolean, TYPES.Bit);
    map.register(Date, TYPES.DateTime);
    map.register(Buffer, TYPES.VarBinary);
    map.register(Table, TYPES.TVP);
    const getTypeByValue = function(value) {
      if (value === null || value === void 0) {
        return TYPES.NVarChar;
      }
      switch (typeof value) {
        case "string":
          for (const item of Array.from(map)) {
            if (item.js === String) {
              return item.sql;
            }
          }
          return TYPES.NVarChar;
        case "number":
          if (value % 1 === 0) {
            if (value < -2147483648 || value > 2147483647) {
              return TYPES.BigInt;
            } else {
              return TYPES.Int;
            }
          } else {
            return TYPES.Float;
          }
        case "bigint":
          if (value < -2147483648n || value > 2147483647n) {
            return TYPES.BigInt;
          } else {
            return TYPES.Int;
          }
        case "boolean":
          for (const item of Array.from(map)) {
            if (item.js === Boolean) {
              return item.sql;
            }
          }
          return TYPES.Bit;
        case "object":
          for (const item of Array.from(map)) {
            if (value instanceof item.js) {
              return item.sql;
            }
          }
          return TYPES.NVarChar;
        default:
          return TYPES.NVarChar;
      }
    };
    module.exports = {
      driver,
      getTypeByValue,
      map
    };
    Object.defineProperty(module.exports, "Promise", {
      get: () => {
        return PromiseLibrary;
      },
      set: (value) => {
        PromiseLibrary = value;
      }
    });
    Object.defineProperty(module.exports, "valueHandler", {
      enumerable: true,
      value: /* @__PURE__ */ new Map(),
      writable: false,
      configurable: false
    });
  })(shared);
  return shared.exports;
}
var preparedStatementError;
var hasRequiredPreparedStatementError;
function requirePreparedStatementError() {
  if (hasRequiredPreparedStatementError) return preparedStatementError;
  hasRequiredPreparedStatementError = 1;
  const MSSQLError = requireMssqlError();
  class PreparedStatementError extends MSSQLError {
    /**
     * Creates a new PreparedStatementError.
     *
     * @param {String} message Error message.
     * @param {String} [code] Error code.
     */
    constructor(message, code) {
      super(message, code);
      this.name = "PreparedStatementError";
    }
  }
  preparedStatementError = PreparedStatementError;
  return preparedStatementError;
}
var requestError;
var hasRequiredRequestError;
function requireRequestError() {
  if (hasRequiredRequestError) return requestError;
  hasRequiredRequestError = 1;
  const MSSQLError = requireMssqlError();
  class RequestError extends MSSQLError {
    /**
     * Creates a new RequestError.
     *
     * @param {String} message Error message.
     * @param {String} [code] Error code.
     */
    constructor(message, code) {
      super(message, code);
      if (message instanceof Error) {
        if (message.info) {
          this.number = message.info.number || message.code;
          this.lineNumber = message.info.lineNumber;
          this.state = message.info.state || message.sqlstate;
          this.class = message.info.class;
          this.serverName = message.info.serverName;
          this.procName = message.info.procName;
        } else {
          this.number = message.code;
          this.lineNumber = message.lineNumber;
          this.state = message.sqlstate;
          this.class = message.severity;
          this.serverName = message.serverName;
          this.procName = message.procName;
        }
      }
      this.name = "RequestError";
      const parsedMessage = /^\[Microsoft\]\[SQL Server Native Client 11\.0\](?:\[SQL Server\])?([\s\S]*)$/.exec(this.message);
      if (parsedMessage) {
        this.message = parsedMessage[1];
      }
    }
  }
  requestError = RequestError;
  return requestError;
}
var transactionError;
var hasRequiredTransactionError;
function requireTransactionError() {
  if (hasRequiredTransactionError) return transactionError;
  hasRequiredTransactionError = 1;
  const MSSQLError = requireMssqlError();
  class TransactionError extends MSSQLError {
    /**
     * Creates a new TransactionError.
     *
     * @param {String} message Error message.
     * @param {String} [code] Error code.
     */
    constructor(message, code) {
      super(message, code);
      this.name = "TransactionError";
    }
  }
  transactionError = TransactionError;
  return transactionError;
}
var error;
var hasRequiredError;
function requireError() {
  if (hasRequiredError) return error;
  hasRequiredError = 1;
  const ConnectionError = requireConnectionError();
  const MSSQLError = requireMssqlError();
  const PreparedStatementError = requirePreparedStatementError();
  const RequestError = requireRequestError();
  const TransactionError = requireTransactionError();
  error = {
    ConnectionError,
    MSSQLError,
    PreparedStatementError,
    RequestError,
    TransactionError
  };
  return error;
}
var diagnostics;
var hasRequiredDiagnostics;
function requireDiagnostics() {
  if (hasRequiredDiagnostics) return diagnostics;
  hasRequiredDiagnostics = 1;
  const dc = require$$0;
  const TRACE_QUERY = "mssql:query";
  const TRACE_BATCH = "mssql:batch";
  const TRACE_EXECUTE = "mssql:execute";
  const TRACE_BULK = "mssql:bulk";
  const TRACE_CONNECT = "mssql:connect";
  const TRACE_POOL_ACQUIRE = "mssql:pool:acquire";
  const TRACE_PREPARED_STATEMENT_PREPARE = "mssql:prepared-statement:prepare";
  const TRACE_PREPARED_STATEMENT_EXECUTE = "mssql:prepared-statement:execute";
  const CONNECTION_ACQUIRE = "mssql:connection:acquire";
  const CONNECTION_RELEASE = "mssql:connection:release";
  const CONNECTION_CREATE = "mssql:connection:create";
  const CONNECTION_DESTROY = "mssql:connection:destroy";
  const POOL_CLOSE = "mssql:pool:close";
  const TRANSACTION_BEGIN = "mssql:transaction:begin";
  const TRANSACTION_COMMIT = "mssql:transaction:commit";
  const TRANSACTION_ROLLBACK = "mssql:transaction:rollback";
  const REQUEST_CANCEL = "mssql:request:cancel";
  const PREPARED_STATEMENT_UNPREPARE = "mssql:prepared-statement:unprepare";
  const CHANNELS = Object.freeze({
    TRACE_QUERY,
    TRACE_BATCH,
    TRACE_EXECUTE,
    TRACE_BULK,
    TRACE_CONNECT,
    TRACE_POOL_ACQUIRE,
    TRACE_PREPARED_STATEMENT_PREPARE,
    TRACE_PREPARED_STATEMENT_EXECUTE,
    CONNECTION_ACQUIRE,
    CONNECTION_RELEASE,
    CONNECTION_CREATE,
    CONNECTION_DESTROY,
    POOL_CLOSE,
    TRANSACTION_BEGIN,
    TRANSACTION_COMMIT,
    TRANSACTION_ROLLBACK,
    REQUEST_CANCEL,
    PREPARED_STATEMENT_UNPREPARE
  });
  const tracingChannels = {
    [TRACE_QUERY]: dc.tracingChannel(TRACE_QUERY),
    [TRACE_BATCH]: dc.tracingChannel(TRACE_BATCH),
    [TRACE_EXECUTE]: dc.tracingChannel(TRACE_EXECUTE),
    [TRACE_BULK]: dc.tracingChannel(TRACE_BULK),
    [TRACE_CONNECT]: dc.tracingChannel(TRACE_CONNECT),
    [TRACE_POOL_ACQUIRE]: dc.tracingChannel(TRACE_POOL_ACQUIRE),
    [TRACE_PREPARED_STATEMENT_PREPARE]: dc.tracingChannel(TRACE_PREPARED_STATEMENT_PREPARE),
    [TRACE_PREPARED_STATEMENT_EXECUTE]: dc.tracingChannel(TRACE_PREPARED_STATEMENT_EXECUTE)
  };
  const pointChannels = {
    [CONNECTION_ACQUIRE]: dc.channel(CONNECTION_ACQUIRE),
    [CONNECTION_RELEASE]: dc.channel(CONNECTION_RELEASE),
    [CONNECTION_CREATE]: dc.channel(CONNECTION_CREATE),
    [CONNECTION_DESTROY]: dc.channel(CONNECTION_DESTROY),
    [POOL_CLOSE]: dc.channel(POOL_CLOSE),
    [TRANSACTION_BEGIN]: dc.channel(TRANSACTION_BEGIN),
    [TRANSACTION_COMMIT]: dc.channel(TRANSACTION_COMMIT),
    [TRANSACTION_ROLLBACK]: dc.channel(TRANSACTION_ROLLBACK),
    [REQUEST_CANCEL]: dc.channel(REQUEST_CANCEL),
    [PREPARED_STATEMENT_UNPREPARE]: dc.channel(PREPARED_STATEMENT_UNPREPARE)
  };
  function tracingChannelHasSubscribers(tc) {
    if (typeof tc.hasSubscribers === "boolean") return tc.hasSubscribers;
    return tc.start.hasSubscribers || tc.end.hasSubscribers || tc.asyncStart.hasSubscribers || tc.asyncEnd.hasSubscribers || tc.error.hasSubscribers;
  }
  function tracePromise(name, fn, contextFactory) {
    const channel = tracingChannels[name];
    if (tracingChannelHasSubscribers(channel)) {
      return channel.tracePromise(fn, contextFactory());
    }
    return fn();
  }
  function traceCallback(name, fn, position, contextFactory, thisArg, args) {
    const channel = tracingChannels[name];
    if (tracingChannelHasSubscribers(channel)) {
      return channel.traceCallback(fn, position, contextFactory(), thisArg, ...args);
    }
    return fn.apply(thisArg, args);
  }
  function publish(name, factory) {
    const channel = pointChannels[name];
    if (channel.hasSubscribers) {
      channel.publish(factory());
    }
  }
  diagnostics = {
    CHANNELS,
    tracingChannels,
    tracePromise,
    traceCallback,
    publish
  };
  return diagnostics;
}
var connectionPool$1;
var hasRequiredConnectionPool$1;
function requireConnectionPool$1() {
  if (hasRequiredConnectionPool$1) return connectionPool$1;
  hasRequiredConnectionPool$1 = 1;
  const { EventEmitter } = require$$1;
  const debug = requireSrc()("mssql:base");
  const { parse, MSSQL_SCHEMA } = requireLib();
  const tarn = requireTarn();
  const { IDS } = requireUtils();
  const ConnectionError = requireConnectionError();
  const shared2 = requireShared();
  const { MSSQLError } = requireError();
  const { CHANNELS, tracePromise, traceCallback, publish } = requireDiagnostics();
  const NODE_MSSQL_SCHEMA = {
    ...MSSQL_SCHEMA,
    useutc: { type: "boolean" },
    stream: { type: "boolean" },
    parsejson: { type: "boolean" },
    "request timeout": { type: "number" }
  };
  class ConnectionPool extends EventEmitter {
    /**
     * Create new Connection.
     *
     * @param {Object|String} config Connection configuration object or connection string.
     * @param {basicCallback} [callback] A callback which is called after connection has established, or an error has occurred.
     */
    constructor(config, callback) {
      super();
      IDS.add(this, "ConnectionPool");
      debug("pool(%d): created", IDS.get(this));
      this._connectStack = [];
      this._closeStack = [];
      this._connected = false;
      this._connecting = false;
      this._healthy = false;
      if (typeof config === "string") {
        try {
          this.config = this.constructor.parseConnectionString(config);
        } catch (ex) {
          if (typeof callback === "function") {
            return setImmediate(callback, ex);
          }
          throw ex;
        }
      } else {
        this.config = config;
      }
      this.config.port = this.config.port || 1433;
      this.config.options = this.config.options || {};
      this.config.stream = this.config.stream || false;
      this.config.parseJSON = this.config.parseJSON || false;
      this.config.arrayRowMode = this.config.arrayRowMode || false;
      this.config.validateConnection = "validateConnection" in this.config ? this.config.validateConnection : true;
      const namedServer = /^(.*)\\(.*)$/.exec(this.config.server);
      if (namedServer) {
        this.config.server = namedServer[1];
        this.config.options.instanceName = namedServer[2];
      }
      if (typeof this.config.options.useColumnNames !== "undefined" && this.config.options.useColumnNames !== true) {
        const ex = new MSSQLError("Invalid options `useColumnNames`, use `arrayRowMode` instead");
        if (typeof callback === "function") {
          return setImmediate(callback, ex);
        }
        throw ex;
      }
      if (typeof callback === "function") {
        this.connect(callback);
      }
    }
    get connected() {
      return this._connected;
    }
    get connecting() {
      return this._connecting;
    }
    get healthy() {
      return this._healthy;
    }
    static parseConnectionString(connectionString) {
      return this._parseConnectionString(connectionString);
    }
    static _parseAuthenticationType(type, entries) {
      if (!type) return "default";
      switch (type.toLowerCase()) {
        case "active directory integrated":
          if (entries.includes("token")) {
            return "azure-active-directory-access-token";
          } else if (["client id", "client secret", "tenant id"].every((entry) => entries.includes(entry))) {
            return "azure-active-directory-service-principal-secret";
          } else if (["client id", "msi endpoint", "msi secret"].every((entry) => entries.includes(entry))) {
            return "azure-active-directory-msi-app-service";
          } else if (["client id", "msi endpoint"].every((entry) => entries.includes(entry))) {
            return "azure-active-directory-msi-vm";
          }
          return "azure-active-directory-default";
        case "active directory password":
          return "azure-active-directory-password";
        case "ntlm":
          return "ntlm";
        default:
          return "default";
      }
    }
    static _parseConnectionString(connectionString) {
      const result = parse(connectionString);
      const parsed = result.toSchema(NODE_MSSQL_SCHEMA);
      for (const [key, value] of result) {
        if (!(key in parsed)) {
          parsed[key] = value;
        }
      }
      return Object.entries(parsed).reduce((config, [key, value]) => {
        switch (key) {
          case "application name":
            break;
          case "applicationintent":
            Object.assign(config.options, {
              readOnlyIntent: value === "readonly"
            });
            break;
          case "asynchronous processing":
            break;
          case "attachdbfilename":
            break;
          case "authentication":
            Object.assign(config, {
              authentication_type: this._parseAuthenticationType(value, Object.keys(parsed))
            });
            break;
          case "column encryption setting":
            break;
          case "connection timeout":
            Object.assign(config, {
              connectionTimeout: value * 1e3
            });
            break;
          case "connection lifetime":
            break;
          case "connectretrycount":
            break;
          case "connectretryinterval":
            Object.assign(config.options, {
              connectionRetryInterval: value * 1e3
            });
            break;
          case "context connection":
            break;
          case "client id":
            Object.assign(config, {
              clientId: value
            });
            break;
          case "client secret":
            Object.assign(config, {
              clientSecret: value
            });
            break;
          case "current language":
            Object.assign(config.options, {
              language: value
            });
            break;
          case "data source": {
            let server = value;
            let instanceName;
            let port = 1433;
            if (/^np:/i.test(server)) {
              throw new Error("Connection via Named Pipes is not supported.");
            }
            if (/^tcp:/i.test(server)) {
              server = server.substr(4);
            }
            const namedServerParts = /^(.*)\\(.*)$/.exec(server);
            if (namedServerParts) {
              server = namedServerParts[1].trim();
              instanceName = namedServerParts[2].trim();
            }
            const serverParts = /^(.*),(.*)$/.exec(server);
            if (serverParts) {
              server = serverParts[1].trim();
              port = parseInt(serverParts[2].trim(), 10);
            } else {
              const instanceParts = /^(.*),(.*)$/.exec(instanceName);
              if (instanceParts) {
                instanceName = instanceParts[1].trim();
                port = parseInt(instanceParts[2].trim(), 10);
              }
            }
            if (server === "." || server === "(.)" || server.toLowerCase() === "(localdb)" || server.toLowerCase() === "(local)") {
              server = "localhost";
            }
            Object.assign(config, {
              port,
              server
            });
            if (instanceName) {
              Object.assign(config.options, {
                instanceName
              });
            }
            break;
          }
          case "encrypt":
            Object.assign(config.options, {
              encrypt: !!value
            });
            break;
          case "enlist":
            break;
          case "failover partner":
            break;
          case "initial catalog":
            Object.assign(config, {
              database: value
            });
            break;
          case "integrated security":
            break;
          case "max pool size":
            Object.assign(config.pool, {
              max: value
            });
            break;
          case "min pool size":
            Object.assign(config.pool, {
              min: value
            });
            break;
          case "msi endpoint":
            Object.assign(config, {
              msiEndpoint: value
            });
            break;
          case "msi secret":
            Object.assign(config, {
              msiSecret: value
            });
            break;
          case "multipleactiveresultsets":
            break;
          case "multisubnetfailover":
            Object.assign(config.options, {
              multiSubnetFailover: value
            });
            break;
          case "network library":
            break;
          case "packet size":
            Object.assign(config.options, {
              packetSize: value
            });
            break;
          case "password":
            Object.assign(config, {
              password: value
            });
            break;
          case "persist security info":
            break;
          case "poolblockingperiod":
            break;
          case "pooling":
            break;
          case "replication":
            break;
          case "tenant id":
            Object.assign(config, {
              tenantId: value
            });
            break;
          case "token":
            Object.assign(config, {
              token: value
            });
            break;
          case "transaction binding":
            Object.assign(config.options, {
              enableImplicitTransactions: value.toLowerCase() === "implicit unbind"
            });
            break;
          case "transparentnetworkipresolution":
            break;
          case "trustservercertificate":
            Object.assign(config.options, {
              trustServerCertificate: value
            });
            break;
          case "type system version":
            break;
          case "user id": {
            let user = value;
            let domain;
            const domainUser = /^(.*)\\(.*)$/.exec(user);
            if (domainUser) {
              domain = domainUser[1];
              user = domainUser[2];
            }
            if (domain) {
              Object.assign(config, {
                domain
              });
            }
            if (user) {
              Object.assign(config, {
                user
              });
            }
            break;
          }
          case "user instance":
            break;
          case "workstation id":
            Object.assign(config.options, {
              workstationId: value
            });
            break;
          case "request timeout":
            Object.assign(config, {
              requestTimeout: parseInt(value, 10)
            });
            break;
          case "stream":
            Object.assign(config, {
              stream: !!value
            });
            break;
          case "useutc":
            Object.assign(config.options, {
              useUTC: !!value
            });
            break;
          case "parsejson":
            Object.assign(config, {
              parseJSON: !!value
            });
            break;
        }
        return config;
      }, { options: {}, pool: {} });
    }
    /**
     * Acquire connection from this connection pool.
     *
     * @param {ConnectionPool|Transaction|PreparedStatement} requester Requester.
     * @param {acquireCallback} [callback] A callback which is called after connection has been acquired, or an error has occurred. If omited, method returns Promise.
     * @return {ConnectionPool|Promise}
     */
    acquire(requester, callback) {
      const requestId = IDS.get(requester);
      const poolId = IDS.get(this);
      const acquirePromise = tracePromise(CHANNELS.TRACE_POOL_ACQUIRE, () => {
        return shared2.Promise.resolve(this._acquire()).catch((err) => {
          this.emit("error", err);
          throw err;
        }).then((connection) => {
          publish(CHANNELS.CONNECTION_ACQUIRE, () => ({
            connectionId: IDS.get(connection),
            requestId,
            poolId
          }));
          return connection;
        });
      }, () => ({
        poolId,
        requestId
      }));
      if (typeof callback === "function") {
        acquirePromise.then((connection) => callback(null, connection, this.config)).catch(callback);
        return this;
      }
      return acquirePromise;
    }
    _acquire() {
      if (!this.pool) {
        return shared2.Promise.reject(new ConnectionError("Connection not yet open.", "ENOTOPEN"));
      } else if (this.pool.destroyed) {
        return shared2.Promise.reject(new ConnectionError("Connection is closing", "ENOTOPEN"));
      }
      return this.pool.acquire().promise;
    }
    /**
     * Release connection back to the pool.
     *
     * @param {Connection} connection Previously acquired connection.
     * @return {ConnectionPool}
     */
    release(connection) {
      debug("connection(%d): released", IDS.get(connection));
      publish(CHANNELS.CONNECTION_RELEASE, () => ({
        connectionId: IDS.get(connection),
        poolId: IDS.get(this)
      }));
      if (this.pool) {
        this.pool.release(connection);
      }
      return this;
    }
    /**
     * Creates a new connection pool with one active connection. This one initial connection serves as a probe to find out whether the configuration is valid.
     *
     * @param {basicCallback} [callback] A callback which is called after connection has established, or an error has occurred. If omited, method returns Promise.
     * @return {ConnectionPool|Promise}
     */
    connect(callback) {
      if (typeof callback === "function") {
        traceCallback(CHANNELS.TRACE_CONNECT, this._connect, 0, () => ({
          server: this.config.server,
          port: this.config.port,
          database: this.config.database,
          poolId: IDS.get(this),
          poolConfig: {
            min: this.config.pool && this.config.pool.min || 0,
            max: this.config.pool && this.config.pool.max || 10
          }
        }), this, [callback]);
        return this;
      }
      return tracePromise(CHANNELS.TRACE_CONNECT, () => {
        return new shared2.Promise((resolve, reject) => {
          return this._connect((err) => {
            if (err) return reject(err);
            resolve(this);
          });
        });
      }, () => ({
        server: this.config.server,
        port: this.config.port,
        database: this.config.database,
        poolId: IDS.get(this),
        poolConfig: {
          min: this.config.pool && this.config.pool.min || 0,
          max: this.config.pool && this.config.pool.max || 10
        }
      }));
    }
    /**
     * @private
     * @param {basicCallback} callback
     */
    _connect(callback) {
      if (this._connected) {
        debug("pool(%d): already connected, executing connect callback immediately", IDS.get(this));
        return setImmediate(callback, null, this);
      }
      this._connectStack.push(callback);
      if (this._connecting) {
        return;
      }
      this._connecting = true;
      debug("pool(%d): connecting", IDS.get(this));
      this._poolCreate().then((connection) => {
        debug("pool(%d): connected", IDS.get(this));
        this._healthy = true;
        return this._poolDestroy(connection).then(() => {
          this.pool = new tarn.Pool(
            Object.assign({
              create: () => this._poolCreate().then((connection2) => {
                this._healthy = true;
                return connection2;
              }).catch((err) => {
                if (this.pool.numUsed() + this.pool.numFree() <= 0) {
                  this._healthy = false;
                }
                throw err;
              }),
              validate: this._poolValidate.bind(this),
              destroy: this._poolDestroy.bind(this),
              max: 10,
              min: 0,
              idleTimeoutMillis: 3e4,
              propagateCreateError: true
            }, this.config.pool)
          );
          this._connecting = false;
          this._connected = true;
        });
      }).then(() => {
        this._connectStack.forEach((cb) => {
          setImmediate(cb, null, this);
        });
      }).catch((err) => {
        this._connecting = false;
        this._connectStack.forEach((cb) => {
          setImmediate(cb, err);
        });
      }).then(() => {
        this._connectStack = [];
      });
    }
    get size() {
      return this.pool.numFree() + this.pool.numUsed() + this.pool.numPendingCreates();
    }
    get available() {
      return this.pool.numFree();
    }
    get pending() {
      return this.pool.numPendingAcquires();
    }
    get borrowed() {
      return this.pool.numUsed();
    }
    /**
     * Close all active connections in the pool.
     *
     * @param {basicCallback} [callback] A callback which is called after connection has closed, or an error has occurred. If omited, method returns Promise.
     * @return {ConnectionPool|Promise}
     */
    close(callback) {
      if (typeof callback === "function") {
        this._close(callback);
        return this;
      }
      return new shared2.Promise((resolve, reject) => {
        this._close((err) => {
          if (err) return reject(err);
          resolve(this);
        });
      });
    }
    /**
     * @private
     * @param {basicCallback} callback
     */
    _close(callback) {
      if (this._connecting) {
        debug("pool(%d): close called while connecting", IDS.get(this));
        setImmediate(callback, new ConnectionError("Cannot close a pool while it is connecting"));
      }
      if (!this.pool) {
        debug("pool(%d): already closed, executing close callback immediately", IDS.get(this));
        return setImmediate(callback, null);
      }
      this._closeStack.push(callback);
      if (this.pool.destroyed) return;
      this._connecting = this._connected = this._healthy = false;
      this.pool.destroy().then(() => {
        debug("pool(%d): pool closed, removing pool reference and executing close callbacks", IDS.get(this));
        publish(CHANNELS.POOL_CLOSE, () => ({
          poolId: IDS.get(this),
          reason: "closed"
        }));
        this.pool = null;
        this._closeStack.forEach((cb) => {
          setImmediate(cb, null);
        });
      }).catch((err) => {
        publish(CHANNELS.POOL_CLOSE, () => ({
          poolId: IDS.get(this),
          reason: "error",
          error: err
        }));
        this.pool = null;
        this._closeStack.forEach((cb) => {
          setImmediate(cb, err);
        });
      }).then(() => {
        this._closeStack = [];
      });
    }
    /**
     * Returns new request using this connection.
     *
     * @param {{ requestTimeout?: number }} [conf] Per-request overrides.
     * @return {Request}
     */
    request(conf) {
      return new shared2.driver.Request(this, conf);
    }
    /**
     * Returns new transaction using this connection.
     *
     * @param {{ requestTimeout?: number }} [conf] Per-transaction overrides, cascaded to child requests.
     * @return {Transaction}
     */
    transaction(conf) {
      return new shared2.driver.Transaction(this, conf);
    }
    /**
     * Creates a new query using this connection from a tagged template string.
     *
     * @variation 1
     * @param {Array} strings Array of string literals.
     * @param {...*} keys Values.
     * @return {Request}
     */
    /**
     * Execute the SQL command.
     *
     * @variation 2
     * @param {String} command T-SQL command to be executed.
     * @param {Request~requestCallback} [callback] A callback which is called after execution has completed, or an error has occurred. If omited, method returns Promise.
     * @return {Request|Promise}
     */
    query() {
      if (typeof arguments[0] === "string") {
        return new shared2.driver.Request(this).query(arguments[0], arguments[1]);
      }
      const values = Array.prototype.slice.call(arguments);
      const strings = values.shift();
      return new shared2.driver.Request(this)._template(strings, values, "query");
    }
    /**
     * Creates a new batch using this connection from a tagged template string.
     *
     * @variation 1
     * @param {Array} strings Array of string literals.
     * @param {...*} keys Values.
     * @return {Request}
     */
    /**
     * Execute the SQL command.
     *
     * @variation 2
     * @param {String} command T-SQL command to be executed.
     * @param {Request~requestCallback} [callback] A callback which is called after execution has completed, or an error has occurred. If omited, method returns Promise.
     * @return {Request|Promise}
     */
    batch() {
      if (typeof arguments[0] === "string") {
        return new shared2.driver.Request(this).batch(arguments[0], arguments[1]);
      }
      const values = Array.prototype.slice.call(arguments);
      const strings = values.shift();
      return new shared2.driver.Request(this)._template(strings, values, "batch");
    }
  }
  connectionPool$1 = ConnectionPool;
  return connectionPool$1;
}
var globalConnection = { exports: {} };
var hasRequiredGlobalConnection;
function requireGlobalConnection() {
  if (hasRequiredGlobalConnection) return globalConnection.exports;
  hasRequiredGlobalConnection = 1;
  (function(module) {
    const shared2 = requireShared();
    let globalConnection2 = null;
    const globalConnectionHandlers = {};
    function connect(config, callback) {
      if (!globalConnection2) {
        globalConnection2 = new shared2.driver.ConnectionPool(config);
        for (const event in globalConnectionHandlers) {
          for (let i = 0, l = globalConnectionHandlers[event].length; i < l; i++) {
            globalConnection2.on(event, globalConnectionHandlers[event][i]);
          }
        }
        const ogClose = globalConnection2.close;
        const globalClose = function(callback2) {
          for (const event in globalConnectionHandlers) {
            for (let i = 0, l = globalConnectionHandlers[event].length; i < l; i++) {
              this.removeListener(event, globalConnectionHandlers[event][i]);
            }
          }
          this.on("error", (err) => {
            if (globalConnectionHandlers.error) {
              for (let i = 0, l = globalConnectionHandlers.error.length; i < l; i++) {
                globalConnectionHandlers.error[i].call(this, err);
              }
            }
          });
          globalConnection2 = null;
          return ogClose.call(this, callback2);
        };
        globalConnection2.close = globalClose.bind(globalConnection2);
      }
      if (typeof callback === "function") {
        return globalConnection2.connect((err, connection) => {
          if (err) {
            globalConnection2 = null;
          }
          callback(err, connection);
        });
      }
      return globalConnection2.connect().catch((err) => {
        globalConnection2 = null;
        return shared2.Promise.reject(err);
      });
    }
    function close(callback) {
      if (globalConnection2) {
        const gc = globalConnection2;
        globalConnection2 = null;
        return gc.close(callback);
      }
      if (typeof callback === "function") {
        setImmediate(callback);
        return null;
      }
      return new shared2.Promise((resolve) => {
        resolve(globalConnection2);
      });
    }
    function on(event, handler) {
      if (!globalConnectionHandlers[event]) globalConnectionHandlers[event] = [];
      globalConnectionHandlers[event].push(handler);
      if (globalConnection2) globalConnection2.on(event, handler);
      return globalConnection2;
    }
    function removeListener(event, handler) {
      if (!globalConnectionHandlers[event]) return globalConnection2;
      const index2 = globalConnectionHandlers[event].indexOf(handler);
      if (index2 === -1) return globalConnection2;
      globalConnectionHandlers[event].splice(index2, 1);
      if (globalConnectionHandlers[event].length === 0) globalConnectionHandlers[event] = void 0;
      if (globalConnection2) globalConnection2.removeListener(event, handler);
      return globalConnection2;
    }
    function query() {
      if (typeof arguments[0] === "string") {
        return new shared2.driver.Request().query(arguments[0], arguments[1]);
      }
      const values = Array.prototype.slice.call(arguments);
      const strings = values.shift();
      return new shared2.driver.Request()._template(strings, values, "query");
    }
    function batch() {
      if (typeof arguments[0] === "string") {
        return new shared2.driver.Request().batch(arguments[0], arguments[1]);
      }
      const values = Array.prototype.slice.call(arguments);
      const strings = values.shift();
      return new shared2.driver.Request()._template(strings, values, "batch");
    }
    module.exports = {
      batch,
      close,
      connect,
      off: removeListener,
      on,
      query,
      removeListener
    };
    Object.defineProperty(module.exports, "pool", {
      get: () => {
        return globalConnection2;
      },
      set: () => {
      }
    });
  })(globalConnection);
  return globalConnection.exports;
}
var preparedStatement;
var hasRequiredPreparedStatement;
function requirePreparedStatement() {
  if (hasRequiredPreparedStatement) return preparedStatement;
  hasRequiredPreparedStatement = 1;
  const debug = requireSrc()("mssql:base");
  const { EventEmitter } = require$$1;
  const { IDS, objectHasProperty, getPoolId } = requireUtils();
  const globalConnection2 = requireGlobalConnection();
  const { TransactionError, PreparedStatementError } = requireError();
  const shared2 = requireShared();
  const { TYPES, declare } = requireDatatypes();
  const { CHANNELS, tracePromise, traceCallback, publish } = requireDiagnostics();
  class PreparedStatement extends EventEmitter {
    /**
     * Creates a new Prepared Statement.
     *
     * @param {ConnectionPool|Transaction} [parent]
     * @param {{ requestTimeout?: number }} [overrides]
     */
    constructor(parent, overrides = {}) {
      super();
      IDS.add(this, "PreparedStatement");
      debug("ps(%d): created", IDS.get(this));
      this.parent = parent || globalConnection2.pool;
      this._handle = 0;
      this.prepared = false;
      this.parameters = {};
      this.overrides = {};
      if (Number.isFinite(overrides?.requestTimeout) && overrides.requestTimeout >= 0) {
        this.overrides.requestTimeout = overrides.requestTimeout;
      }
    }
    get config() {
      return this.parent.config;
    }
    get connected() {
      return this.parent.connected;
    }
    /**
     * Acquire connection from connection pool.
     *
     * @param {Request} request Request.
     * @param {ConnectionPool~acquireCallback} [callback] A callback which is called after connection has established, or an error has occurred. If omited, method returns Promise.
     * @return {PreparedStatement|Promise}
     */
    acquire(request2, callback) {
      if (!this._acquiredConnection) {
        setImmediate(callback, new PreparedStatementError("Statement is not prepared. Call prepare() first.", "ENOTPREPARED"));
        return this;
      }
      if (this._activeRequest) {
        setImmediate(callback, new TransactionError("Can't acquire connection for the request. There is another request in progress.", "EREQINPROG"));
        return this;
      }
      this._activeRequest = request2;
      setImmediate(callback, null, this._acquiredConnection, this._acquiredConfig);
      return this;
    }
    /**
     * Release connection back to the pool.
     *
     * @param {Connection} connection Previously acquired connection.
     * @return {PreparedStatement}
     */
    release(connection) {
      if (connection === this._acquiredConnection) {
        this._activeRequest = null;
      }
      return this;
    }
    /**
     * Add an input parameter to the prepared statement.
     *
     * @param {String} name Name of the input parameter without @ char.
     * @param {*} type SQL data type of input parameter.
     * @return {PreparedStatement}
     */
    input(name, type) {
      if (/--| |\/\*|\*\/|'/.test(name)) {
        throw new PreparedStatementError(`SQL injection warning for param '${name}'`, "EINJECT");
      }
      if (arguments.length < 2) {
        throw new PreparedStatementError("Invalid number of arguments. 2 arguments expected.", "EARGS");
      }
      if (type instanceof Function) {
        type = type();
      }
      if (objectHasProperty(this.parameters, name)) {
        throw new PreparedStatementError(`The parameter name ${name} has already been declared. Parameter names must be unique`, "EDUPEPARAM");
      }
      this.parameters[name] = {
        name,
        type: type.type,
        io: 1,
        length: type.length,
        scale: type.scale,
        precision: type.precision,
        tvpType: type.tvpType
      };
      return this;
    }
    /**
     * Replace an input parameter on the request.
     *
     * @param {String} name Name of the input parameter without @ char.
     * @param {*} [type] SQL data type of input parameter. If you omit type, module automaticaly decide which SQL data type should be used based on JS data type.
     * @param {*} value Input parameter value. `undefined` and `NaN` values are automatically converted to `null` values.
     * @return {Request}
     */
    replaceInput(name, type, value) {
      delete this.parameters[name];
      return this.input(name, type, value);
    }
    /**
     * Add an output parameter to the prepared statement.
     *
     * @param {String} name Name of the output parameter without @ char.
     * @param {*} type SQL data type of output parameter.
     * @return {PreparedStatement}
     */
    output(name, type) {
      if (/--| |\/\*|\*\/|'/.test(name)) {
        throw new PreparedStatementError(`SQL injection warning for param '${name}'`, "EINJECT");
      }
      if (arguments.length < 2) {
        throw new PreparedStatementError("Invalid number of arguments. 2 arguments expected.", "EARGS");
      }
      if (type instanceof Function) type = type();
      if (objectHasProperty(this.parameters, name)) {
        throw new PreparedStatementError(`The parameter name ${name} has already been declared. Parameter names must be unique`, "EDUPEPARAM");
      }
      this.parameters[name] = {
        name,
        type: type.type,
        io: 2,
        length: type.length,
        scale: type.scale,
        precision: type.precision
      };
      return this;
    }
    /**
     * Replace an output parameter on the request.
     *
     * @param {String} name Name of the output parameter without @ char.
     * @param {*} type SQL data type of output parameter.
     * @return {PreparedStatement}
     */
    replaceOutput(name, type) {
      delete this.parameters[name];
      return this.output(name, type);
    }
    /**
     * Prepare a statement.
     *
     * @param {String} statement SQL statement to prepare.
     * @param {basicCallback} [callback] A callback which is called after preparation has completed, or an error has occurred. If omited, method returns Promise.
     * @return {PreparedStatement|Promise}
     */
    prepare(statement, callback) {
      if (typeof callback === "function") {
        traceCallback(CHANNELS.TRACE_PREPARED_STATEMENT_PREPARE, this._prepare, 1, () => ({
          statement: statement || this.statement,
          parameters: Object.keys(this.parameters),
          preparedStatementId: IDS.get(this),
          poolId: getPoolId(this)
        }), this, [statement, callback]);
        return this;
      }
      return tracePromise(CHANNELS.TRACE_PREPARED_STATEMENT_PREPARE, () => {
        return new shared2.Promise((resolve, reject) => {
          this._prepare(statement, (err) => {
            if (err) return reject(err);
            resolve(this);
          });
        });
      }, () => ({
        statement: statement || this.statement,
        parameters: Object.keys(this.parameters),
        preparedStatementId: IDS.get(this),
        poolId: getPoolId(this)
      }));
    }
    /**
     * @private
     * @param {String} statement
     * @param {basicCallback} callback
     */
    _prepare(statement, callback) {
      debug("ps(%d): prepare", IDS.get(this));
      if (typeof statement === "function") {
        callback = statement;
        statement = void 0;
      }
      if (this.prepared) {
        return setImmediate(callback, new PreparedStatementError("Statement is already prepared.", "EALREADYPREPARED"));
      }
      this.statement = statement || this.statement;
      this.parent.acquire(this, (err, connection, config) => {
        if (err) return callback(err);
        this._acquiredConnection = connection;
        this._acquiredConfig = config;
        const req = new shared2.driver.Request(this, this.overrides);
        req._internal = true;
        req.stream = false;
        req.output("handle", TYPES.Int);
        req.input("params", TYPES.NVarChar, (() => {
          const result = [];
          for (const name in this.parameters) {
            if (!objectHasProperty(this.parameters, name)) {
              continue;
            }
            const param = this.parameters[name];
            result.push(`@${name} ${declare(param.type, param)}${param.io === 2 ? " output" : ""}`);
          }
          return result;
        })().join(","));
        req.input("stmt", TYPES.NVarChar, this.statement);
        req.execute("sp_prepare", (err2, result) => {
          if (err2) {
            this.parent.release(this._acquiredConnection);
            this._acquiredConnection = null;
            this._acquiredConfig = null;
            return callback(err2);
          }
          debug("ps(%d): prepared", IDS.get(this));
          this._handle = result.output.handle;
          this.prepared = true;
          callback(null);
        });
      });
    }
    /**
     * Execute a prepared statement.
     *
     * @param {Object} values An object whose names correspond to the names of parameters that were added to the prepared statement before it was prepared.
     * @param {basicCallback} [callback] A callback which is called after execution has completed, or an error has occurred. If omited, method returns Promise.
     * @return {Request|Promise}
     */
    execute(values, callback) {
      if (this.stream || typeof callback === "function") {
        if (typeof callback !== "function") {
          return this._execute(values, callback);
        }
        return traceCallback(CHANNELS.TRACE_PREPARED_STATEMENT_EXECUTE, this._execute, 1, () => ({
          statement: this.statement,
          parameters: Object.keys(this.parameters),
          handle: this._handle,
          preparedStatementId: IDS.get(this),
          poolId: getPoolId(this)
        }), this, [values, callback]);
      }
      return tracePromise(CHANNELS.TRACE_PREPARED_STATEMENT_EXECUTE, () => {
        return new shared2.Promise((resolve, reject) => {
          this._execute(values, (err, recordset) => {
            if (err) return reject(err);
            resolve(recordset);
          });
        });
      }, () => ({
        statement: this.statement,
        parameters: Object.keys(this.parameters),
        handle: this._handle,
        preparedStatementId: IDS.get(this),
        poolId: getPoolId(this)
      }));
    }
    /**
     * @private
     * @param {Object} values
     * @param {basicCallback} callback
     */
    _execute(values, callback) {
      const req = new shared2.driver.Request(this, this.overrides);
      req._internal = true;
      req.stream = this.stream;
      req.arrayRowMode = this.arrayRowMode;
      req.input("handle", TYPES.Int, this._handle);
      for (const name in this.parameters) {
        if (!objectHasProperty(this.parameters, name)) {
          continue;
        }
        const param = this.parameters[name];
        req.parameters[name] = {
          name,
          type: param.type,
          io: param.io,
          value: values[name],
          length: param.length,
          scale: param.scale,
          precision: param.precision
        };
      }
      req.execute(
        "sp_execute",
        typeof callback === "function" ? callback : () => {
        }
      );
      return req;
    }
    /**
     * Unprepare a prepared statement.
     *
     * @param {basicCallback} [callback] A callback which is called after unpreparation has completed, or an error has occurred. If omited, method returns Promise.
     * @return {PreparedStatement|Promise}
     */
    unprepare(callback) {
      if (typeof callback === "function") {
        this._unprepare((err) => {
          if (!err) {
            publish(CHANNELS.PREPARED_STATEMENT_UNPREPARE, () => ({
              preparedStatementId: IDS.get(this),
              poolId: getPoolId(this)
            }));
          }
          callback(err);
        });
        return this;
      }
      return new shared2.Promise((resolve, reject) => {
        this._unprepare((err) => {
          if (err) return reject(err);
          publish(CHANNELS.PREPARED_STATEMENT_UNPREPARE, () => ({
            preparedStatementId: IDS.get(this),
            poolId: getPoolId(this)
          }));
          resolve();
        });
      });
    }
    /**
     * @private
     * @param {basicCallback} callback
     */
    _unprepare(callback) {
      debug("ps(%d): unprepare", IDS.get(this));
      if (!this.prepared) {
        return setImmediate(callback, new PreparedStatementError("Statement is not prepared. Call prepare() first.", "ENOTPREPARED"));
      }
      if (this._activeRequest) {
        return setImmediate(callback, new TransactionError("Can't unprepare the statement. There is a request in progress.", "EREQINPROG"));
      }
      const req = new shared2.driver.Request(this, this.overrides);
      req._internal = true;
      req.stream = false;
      req.input("handle", TYPES.Int, this._handle);
      req.execute("sp_unprepare", (err) => {
        if (err) return callback(err);
        this.parent.release(this._acquiredConnection);
        this._acquiredConnection = null;
        this._acquiredConfig = null;
        this._handle = 0;
        this.prepared = false;
        debug("ps(%d): unprepared", IDS.get(this));
        return callback(null);
      });
    }
  }
  preparedStatement = PreparedStatement;
  return preparedStatement;
}
var request$1;
var hasRequiredRequest$1;
function requireRequest$1() {
  if (hasRequiredRequest$1) return request$1;
  hasRequiredRequest$1 = 1;
  const debug = requireSrc()("mssql:base");
  const { EventEmitter } = require$$1;
  const { Readable } = require$$2;
  const { IDS, objectHasProperty, getPoolId } = requireUtils();
  const globalConnection2 = requireGlobalConnection();
  const { RequestError, ConnectionError } = requireError();
  const { TYPES } = requireDatatypes();
  const shared2 = requireShared();
  const { CHANNELS, tracePromise, traceCallback, publish } = requireDiagnostics();
  class Request extends EventEmitter {
    /**
     * Create new Request.
     *
     * @param {Connection|ConnectionPool|Transaction|PreparedStatement} [parent] If omitted, global connection is used instead.
     * @param {{ requestTimeout?: number }} [overrides]
     */
    constructor(parent, overrides = {}) {
      super();
      IDS.add(this, "Request");
      debug("request(%d): created", IDS.get(this));
      this.canceled = false;
      this._paused = false;
      this._internal = false;
      this.parent = parent || globalConnection2.pool;
      this.parameters = {};
      this.stream = null;
      this.arrayRowMode = null;
      this.overrides = {};
      if (Number.isFinite(overrides?.requestTimeout) && overrides.requestTimeout >= 0) {
        this.overrides.requestTimeout = overrides.requestTimeout;
      }
    }
    get paused() {
      return this._paused;
    }
    /**
     * Generate sql string and set input parameters from tagged template string.
     *
     * @param {Template literal} template
     * @return {String}
     */
    template() {
      const values = Array.prototype.slice.call(arguments);
      const strings = values.shift();
      return this._template(strings, values);
    }
    /**
     * Fetch request from tagged template string.
     *
     * @private
     * @param {Array} strings
     * @param {Array} values
     * @param {String} [method] If provided, method is automatically called with serialized command on this object.
     * @return {Request}
     */
    _template(strings, values, method) {
      const command = [strings[0]];
      for (let index2 = 0; index2 < values.length; index2++) {
        const value = values[index2];
        if (Array.isArray(value)) {
          for (let parameterIndex = 0; parameterIndex < value.length; parameterIndex++) {
            this.input(`param${index2 + 1}_${parameterIndex}`, value[parameterIndex]);
            command.push(`@param${index2 + 1}_${parameterIndex}`);
            if (parameterIndex < value.length - 1) {
              command.push(", ");
            }
          }
          command.push(strings[index2 + 1]);
        } else {
          this.input(`param${index2 + 1}`, value);
          command.push(`@param${index2 + 1}`, strings[index2 + 1]);
        }
      }
      if (method) {
        return this[method](command.join(""));
      } else {
        return command.join("");
      }
    }
    /**
     * Add an input parameter to the request.
     *
     * @param {String} name Name of the input parameter without @ char.
     * @param {*} [type] SQL data type of input parameter. If you omit type, module automatically decides which SQL data type should be used based on JS data type.
     * @param {*} value Input parameter value. `undefined` and `NaN` values are automatically converted to `null` values.
     * @return {Request}
     */
    input(name, type, value) {
      if (/--| |\/\*|\*\/|'/.test(name)) {
        throw new RequestError(`SQL injection warning for param '${name}'`, "EINJECT");
      }
      if (arguments.length < 2) {
        throw new RequestError("Invalid number of arguments. At least 2 arguments expected.", "EARGS");
      } else if (arguments.length === 2) {
        value = type;
        type = shared2.getTypeByValue(value);
      }
      if (value && typeof value.valueOf === "function" && !(value instanceof Date)) value = value.valueOf();
      if (value === void 0) value = null;
      if (typeof value === "number" && isNaN(value)) value = null;
      if (type instanceof Function) type = type();
      if (objectHasProperty(this.parameters, name)) {
        throw new RequestError(`The parameter name ${name} has already been declared. Parameter names must be unique`, "EDUPEPARAM");
      }
      this.parameters[name] = {
        name,
        type: type.type,
        io: 1,
        value,
        length: type.length,
        scale: type.scale,
        precision: type.precision,
        tvpType: type.tvpType
      };
      return this;
    }
    /**
     * Replace an input parameter on the request.
     *
     * @param {String} name Name of the input parameter without @ char.
     * @param {*} [type] SQL data type of input parameter. If you omit type, module automatically decides which SQL data type should be used based on JS data type.
     * @param {*} value Input parameter value. `undefined` and `NaN` values are automatically converted to `null` values.
     * @return {Request}
     */
    replaceInput(name, type, value) {
      delete this.parameters[name];
      return this.input(name, type, value);
    }
    /**
     * Add an output parameter to the request.
     *
     * @param {String} name Name of the output parameter without @ char.
     * @param {*} type SQL data type of output parameter.
     * @param {*} [value] Output parameter value initial value. `undefined` and `NaN` values are automatically converted to `null` values. Optional.
     * @return {Request}
     */
    output(name, type, value) {
      if (!type) {
        type = TYPES.NVarChar;
      }
      if (/--| |\/\*|\*\/|'/.test(name)) {
        throw new RequestError(`SQL injection warning for param '${name}'`, "EINJECT");
      }
      if (type === TYPES.Text || type === TYPES.NText || type === TYPES.Image) {
        throw new RequestError("Deprecated types (Text, NText, Image) are not supported as OUTPUT parameters.", "EDEPRECATED");
      }
      if (value && typeof value.valueOf === "function" && !(value instanceof Date)) value = value.valueOf();
      if (value === void 0) value = null;
      if (typeof value === "number" && isNaN(value)) value = null;
      if (type instanceof Function) type = type();
      if (objectHasProperty(this.parameters, name)) {
        throw new RequestError(`The parameter name ${name} has already been declared. Parameter names must be unique`, "EDUPEPARAM");
      }
      this.parameters[name] = {
        name,
        type: type.type,
        io: 2,
        value,
        length: type.length,
        scale: type.scale,
        precision: type.precision
      };
      return this;
    }
    /**
     * Replace an output parameter on the request.
     *
     * @param {String} name Name of the output parameter without @ char.
     * @param {*} type SQL data type of output parameter.
     * @param {*} [value] Output parameter value initial value. `undefined` and `NaN` values are automatically converted to `null` values. Optional.
     * @return {Request}
     */
    replaceOutput(name, type, value) {
      delete this.parameters[name];
      return this.output(name, type, value);
    }
    _getParameterNames() {
      return Object.keys(this.parameters);
    }
    _tracedPromise(channel, contextFactory, fn) {
      if (this._internal) {
        return fn();
      }
      return tracePromise(channel, fn, contextFactory);
    }
    _tracedCallback(channel, contextFactory, fn, position, args) {
      if (this._internal) {
        return fn.apply(this, args);
      }
      return traceCallback(channel, fn, position, contextFactory, this, args);
    }
    /**
     * Execute the SQL batch.
     *
     * @param {String} batch T-SQL batch to be executed.
     * @param {Request~requestCallback} [callback] A callback which is called after execution has completed, or an error has occurred. If omited, method returns Promise.
     * @return {Request|Promise}
     */
    batch(batch, callback) {
      if (this.stream === null && this.parent) this.stream = this.parent.config.stream;
      if (this.arrayRowMode === null && this.parent) this.arrayRowMode = this.parent.config.arrayRowMode;
      this.rowsAffected = 0;
      if (typeof callback === "function") {
        this._tracedCallback(CHANNELS.TRACE_BATCH, () => ({
          command: batch,
          requestId: IDS.get(this),
          poolId: getPoolId(this)
        }), this._batch, 1, [batch, (err, recordsets, output, rowsAffected) => {
          if (this.stream) {
            if (err) this.emit("error", err);
            err = null;
            this.emit("done", {
              output,
              rowsAffected
            });
          }
          if (err) return callback(err);
          callback(null, {
            recordsets,
            recordset: recordsets && recordsets[0],
            output,
            rowsAffected
          });
        }]);
        return this;
      }
      if (typeof batch === "object") {
        const values = Array.prototype.slice.call(arguments);
        const strings = values.shift();
        batch = this._template(strings, values);
      }
      const batchCommand = batch;
      return this._tracedPromise(CHANNELS.TRACE_BATCH, () => ({
        command: batchCommand,
        requestId: IDS.get(this),
        poolId: getPoolId(this)
      }), () => {
        return new shared2.Promise((resolve, reject) => {
          this._batch(batchCommand, (err, recordsets, output, rowsAffected) => {
            if (this.stream) {
              if (err) this.emit("error", err);
              err = null;
              this.emit("done", {
                output,
                rowsAffected
              });
            }
            if (err) return reject(err);
            resolve({
              recordsets,
              recordset: recordsets && recordsets[0],
              output,
              rowsAffected
            });
          });
        });
      });
    }
    /**
     * @private
     * @param {String} batch
     * @param {Request~requestCallback} callback
     */
    _batch(batch, callback) {
      if (!this.parent) {
        return setImmediate(callback, new RequestError("No connection is specified for that request.", "ENOCONN"));
      }
      if (!this.parent.connected) {
        return setImmediate(callback, new ConnectionError("Connection is closed.", "ECONNCLOSED"));
      }
      this.canceled = false;
      setImmediate(callback);
    }
    /**
     * Bulk load.
     *
     * @param {Table} table SQL table.
     * @param {object} [options] Options to be passed to the underlying driver (tedious only).
     * @param {Request~bulkCallback} [callback] A callback which is called after bulk load has completed, or an error has occurred. If omited, method returns Promise.
     * @return {Request|Promise}
     */
    bulk(table2, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      } else if (typeof options === "undefined") {
        options = {};
      }
      if (this.stream === null && this.parent) this.stream = this.parent.config.stream;
      if (this.arrayRowMode === null && this.parent) this.arrayRowMode = this.parent.config.arrayRowMode;
      if (this.stream || typeof callback === "function") {
        this._tracedCallback(CHANNELS.TRACE_BULK, () => ({
          table: table2.path || table2.name,
          rowCount: table2.rows ? table2.rows.length : 0,
          requestId: IDS.get(this),
          poolId: getPoolId(this)
        }), this._bulk, 2, [table2, options, (err, rowsAffected) => {
          if (this.stream) {
            if (err) this.emit("error", err);
            return this.emit("done", {
              rowsAffected
            });
          }
          if (err) return callback(err);
          callback(null, {
            rowsAffected
          });
        }]);
        return this;
      }
      return this._tracedPromise(CHANNELS.TRACE_BULK, () => ({
        table: table2.path || table2.name,
        rowCount: table2.rows ? table2.rows.length : 0,
        requestId: IDS.get(this),
        poolId: getPoolId(this)
      }), () => {
        return new shared2.Promise((resolve, reject) => {
          this._bulk(table2, options, (err, rowsAffected) => {
            if (err) return reject(err);
            resolve({
              rowsAffected
            });
          });
        });
      });
    }
    /**
     * @private
     * @param {Table} table
     * @param {object} options
     * @param {Request~bulkCallback} callback
     */
    _bulk(table2, options, callback) {
      if (!this.parent) {
        return setImmediate(callback, new RequestError("No connection is specified for that request.", "ENOCONN"));
      }
      if (!this.parent.connected) {
        return setImmediate(callback, new ConnectionError("Connection is closed.", "ECONNCLOSED"));
      }
      this.canceled = false;
      setImmediate(callback);
    }
    /**
     * Wrap original request in a Readable stream that supports back pressure and return.
     * It also sets request to `stream` mode and pulls all rows from all recordsets to a given stream.
     *
     * @param {Object} streamOptions - optional options to configure the readable stream with like highWaterMark
     * @return {Stream}
     */
    toReadableStream(streamOptions = {}) {
      this.stream = true;
      this.pause();
      const readableStream = new Readable({
        ...streamOptions,
        objectMode: true,
        read: () => {
          this.resume();
        }
      });
      this.on("row", (row) => {
        if (!readableStream.push(row)) {
          this.pause();
        }
      });
      this.on("error", (error2) => {
        readableStream.emit("error", error2);
      });
      this.on("done", () => {
        readableStream.push(null);
      });
      return readableStream;
    }
    /**
     * Wrap original request in a Readable stream that supports back pressure and pipe to the Writable stream.
     * It also sets request to `stream` mode and pulls all rows from all recordsets to a given stream.
     *
     * @param {Stream} stream Stream to pipe data into.
     * @return {Stream}
     */
    pipe(writableStream) {
      const readableStream = this.toReadableStream();
      return readableStream.pipe(writableStream);
    }
    /**
     * Execute the SQL command.
     *
     * @param {String} command T-SQL command to be executed.
     * @param {Request~requestCallback} [callback] A callback which is called after execution has completed, or an error has occurred. If omited, method returns Promise.
     * @return {Request|Promise}
     */
    query(command, callback) {
      if (this.stream === null && this.parent) this.stream = this.parent.config.stream;
      if (this.arrayRowMode === null && this.parent) this.arrayRowMode = this.parent.config.arrayRowMode;
      this.rowsAffected = 0;
      if (typeof callback === "function") {
        this._tracedCallback(CHANNELS.TRACE_QUERY, () => ({
          command,
          parameters: this._getParameterNames(),
          requestId: IDS.get(this),
          poolId: getPoolId(this)
        }), this._query, 1, [command, (err, recordsets, output, rowsAffected, columns) => {
          if (this.stream) {
            if (err) this.emit("error", err);
            err = null;
            this.emit("done", {
              output,
              rowsAffected
            });
          }
          if (err) return callback(err);
          const result = {
            recordsets,
            recordset: recordsets && recordsets[0],
            output,
            rowsAffected
          };
          if (this.arrayRowMode) result.columns = columns;
          callback(null, result);
        }]);
        return this;
      }
      if (typeof command === "object") {
        const values = Array.prototype.slice.call(arguments);
        const strings = values.shift();
        command = this._template(strings, values);
      }
      return this._tracedPromise(CHANNELS.TRACE_QUERY, () => ({
        command,
        parameters: this._getParameterNames(),
        requestId: IDS.get(this),
        poolId: getPoolId(this)
      }), () => {
        return new shared2.Promise((resolve, reject) => {
          this._query(command, (err, recordsets, output, rowsAffected, columns) => {
            if (this.stream) {
              if (err) this.emit("error", err);
              err = null;
              this.emit("done", {
                output,
                rowsAffected
              });
            }
            if (err) return reject(err);
            const result = {
              recordsets,
              recordset: recordsets && recordsets[0],
              output,
              rowsAffected
            };
            if (this.arrayRowMode) result.columns = columns;
            resolve(result);
          });
        });
      });
    }
    /**
     * @private
     * @param {String} command
     * @param {Request~bulkCallback} callback
     */
    _query(command, callback) {
      if (!this.parent) {
        return setImmediate(callback, new RequestError("No connection is specified for that request.", "ENOCONN"));
      }
      if (!this.parent.connected) {
        return setImmediate(callback, new ConnectionError("Connection is closed.", "ECONNCLOSED"));
      }
      this.canceled = false;
      setImmediate(callback);
    }
    /**
     * Call a stored procedure.
     *
     * @param {String} procedure Name of the stored procedure to be executed.
     * @param {Request~requestCallback} [callback] A callback which is called after execution has completed, or an error has occurred. If omited, method returns Promise.
     * @return {Request|Promise}
     */
    execute(command, callback) {
      if (this.stream === null && this.parent) this.stream = this.parent.config.stream;
      if (this.arrayRowMode === null && this.parent) this.arrayRowMode = this.parent.config.arrayRowMode;
      this.rowsAffected = 0;
      if (typeof callback === "function") {
        this._tracedCallback(CHANNELS.TRACE_EXECUTE, () => ({
          procedure: command,
          parameters: this._getParameterNames(),
          requestId: IDS.get(this),
          poolId: getPoolId(this)
        }), this._execute, 1, [command, (err, recordsets, output, returnValue, rowsAffected, columns) => {
          if (this.stream) {
            if (err) this.emit("error", err);
            err = null;
            this.emit("done", {
              output,
              rowsAffected,
              returnValue
            });
          }
          if (err) return callback(err);
          const result = {
            recordsets,
            recordset: recordsets && recordsets[0],
            output,
            rowsAffected,
            returnValue
          };
          if (this.arrayRowMode) result.columns = columns;
          callback(null, result);
        }]);
        return this;
      }
      return this._tracedPromise(CHANNELS.TRACE_EXECUTE, () => ({
        procedure: command,
        parameters: this._getParameterNames(),
        requestId: IDS.get(this),
        poolId: getPoolId(this)
      }), () => {
        return new shared2.Promise((resolve, reject) => {
          this._execute(command, (err, recordsets, output, returnValue, rowsAffected, columns) => {
            if (this.stream) {
              if (err) this.emit("error", err);
              err = null;
              this.emit("done", {
                output,
                rowsAffected,
                returnValue
              });
            }
            if (err) return reject(err);
            const result = {
              recordsets,
              recordset: recordsets && recordsets[0],
              output,
              rowsAffected,
              returnValue
            };
            if (this.arrayRowMode) result.columns = columns;
            resolve(result);
          });
        });
      });
    }
    /**
     * @private
     * @param {String} procedure
     * @param {Request~bulkCallback} callback
     */
    _execute(procedure, callback) {
      if (!this.parent) {
        return setImmediate(callback, new RequestError("No connection is specified for that request.", "ENOCONN"));
      }
      if (!this.parent.connected) {
        return setImmediate(callback, new ConnectionError("Connection is closed.", "ECONNCLOSED"));
      }
      this.canceled = false;
      setImmediate(callback);
    }
    /**
     * Cancel currently executed request.
     *
     * @return {Boolean}
     */
    cancel() {
      this._cancel();
      if (!this._internal) {
        publish(CHANNELS.REQUEST_CANCEL, () => ({
          requestId: IDS.get(this)
        }));
      }
      return true;
    }
    /**
     * @private
     */
    _cancel() {
      this.canceled = true;
    }
    pause() {
      if (this.stream) {
        this._pause();
        return true;
      }
      return false;
    }
    _pause() {
      this._paused = true;
    }
    resume() {
      if (this.stream) {
        this._resume();
        return true;
      }
      return false;
    }
    _resume() {
      this._paused = false;
    }
    _setCurrentRequest(request2) {
      this._currentRequest = request2;
      if (this._paused) {
        this.pause();
      }
      return this;
    }
  }
  request$1 = Request;
  return request$1;
}
var isolationlevel;
var hasRequiredIsolationlevel;
function requireIsolationlevel() {
  if (hasRequiredIsolationlevel) return isolationlevel;
  hasRequiredIsolationlevel = 1;
  isolationlevel = {
    READ_UNCOMMITTED: 1,
    READ_COMMITTED: 2,
    REPEATABLE_READ: 3,
    SERIALIZABLE: 4,
    SNAPSHOT: 5
  };
  return isolationlevel;
}
var transaction$1;
var hasRequiredTransaction$1;
function requireTransaction$1() {
  if (hasRequiredTransaction$1) return transaction$1;
  hasRequiredTransaction$1 = 1;
  const debug = requireSrc()("mssql:base");
  const { EventEmitter } = require$$1;
  const { IDS, getPoolId } = requireUtils();
  const globalConnection2 = requireGlobalConnection();
  const { TransactionError } = requireError();
  const shared2 = requireShared();
  const ISOLATION_LEVEL = requireIsolationlevel();
  const { CHANNELS, publish } = requireDiagnostics();
  const ISOLATION_LEVEL_NAMES = Object.fromEntries(
    Object.entries(ISOLATION_LEVEL).map(([name, value]) => [value, name])
  );
  class Transaction extends EventEmitter {
    /**
     * Create new Transaction.
     *
     * @param {Connection} [parent] If omitted, global connection is used instead.
     * @param {{ requestTimeout?: number }} [overrides]
     */
    constructor(parent, overrides = {}) {
      super();
      IDS.add(this, "Transaction");
      debug("transaction(%d): created", IDS.get(this));
      this.parent = parent || globalConnection2.pool;
      this.isolationLevel = Transaction.defaultIsolationLevel;
      this.name = "";
      this.overrides = {};
      if (Number.isFinite(overrides?.requestTimeout) && overrides.requestTimeout >= 0) {
        this.overrides.requestTimeout = overrides.requestTimeout;
      }
    }
    get config() {
      return this.parent.config;
    }
    get connected() {
      return this.parent.connected;
    }
    /**
     * Acquire connection from connection pool.
     *
     * @param {Request} request Request.
     * @param {ConnectionPool~acquireCallback} [callback] A callback which is called after connection has established, or an error has occurred. If omited, method returns Promise.
     * @return {Transaction|Promise}
     */
    acquire(request2, callback) {
      if (!this._acquiredConnection) {
        setImmediate(callback, new TransactionError("Transaction has not begun. Call begin() first.", "ENOTBEGUN"));
        return this;
      }
      if (this._activeRequest) {
        setImmediate(callback, new TransactionError("Can't acquire connection for the request. There is another request in progress.", "EREQINPROG"));
        return this;
      }
      this._activeRequest = request2;
      setImmediate(callback, null, this._acquiredConnection, this._acquiredConfig);
      return this;
    }
    /**
     * Release connection back to the pool.
     *
     * @param {Connection} connection Previously acquired connection.
     * @return {Transaction}
     */
    release(connection) {
      if (connection === this._acquiredConnection) {
        this._activeRequest = null;
      }
      return this;
    }
    /**
     * Begin a transaction.
     *
     * @param {Number} [isolationLevel] Controls the locking and row versioning behavior of TSQL statements issued by a connection.
     * @param {basicCallback} [callback] A callback which is called after transaction has began, or an error has occurred. If omited, method returns Promise.
     * @return {Transaction|Promise}
     */
    begin(isolationLevel, callback) {
      if (isolationLevel instanceof Function) {
        callback = isolationLevel;
        isolationLevel = void 0;
      }
      if (typeof callback === "function") {
        this._begin(isolationLevel, (err) => {
          if (!err) {
            publish(CHANNELS.TRANSACTION_BEGIN, () => ({
              transactionId: IDS.get(this),
              isolationLevel: this.isolationLevel,
              isolationLevelName: ISOLATION_LEVEL_NAMES[this.isolationLevel],
              poolId: getPoolId(this)
            }));
            this.emit("begin");
          }
          callback(err);
        });
        return this;
      }
      return new shared2.Promise((resolve, reject) => {
        this._begin(isolationLevel, (err) => {
          if (err) return reject(err);
          publish(CHANNELS.TRANSACTION_BEGIN, () => ({
            transactionId: IDS.get(this),
            isolationLevel: this.isolationLevel,
            isolationLevelName: ISOLATION_LEVEL_NAMES[this.isolationLevel],
            poolId: getPoolId(this)
          }));
          this.emit("begin");
          resolve(this);
        });
      });
    }
    /**
     * @private
     * @param {Number} [isolationLevel]
     * @param {basicCallback} [callback]
     * @return {Transaction}
     */
    _begin(isolationLevel, callback) {
      if (this._acquiredConnection) {
        return setImmediate(callback, new TransactionError("Transaction has already begun.", "EALREADYBEGUN"));
      }
      this._aborted = false;
      this._abortReason = null;
      this._rollbackRequested = false;
      if (isolationLevel) {
        if (Object.keys(ISOLATION_LEVEL).some((key) => {
          return ISOLATION_LEVEL[key] === isolationLevel;
        })) {
          this.isolationLevel = isolationLevel;
        } else {
          throw new TransactionError("Invalid isolation level.");
        }
      }
      setImmediate(callback);
    }
    /**
     * Commit a transaction.
     *
     * @param {basicCallback} [callback] A callback which is called after transaction has commited, or an error has occurred. If omited, method returns Promise.
     * @return {Transaction|Promise}
     */
    commit(callback) {
      if (typeof callback === "function") {
        this._commit((err) => {
          if (!err) {
            publish(CHANNELS.TRANSACTION_COMMIT, () => ({
              transactionId: IDS.get(this)
            }));
            this.emit("commit");
          }
          callback(err);
        });
        return this;
      }
      return new shared2.Promise((resolve, reject) => {
        this._commit((err) => {
          if (err) return reject(err);
          publish(CHANNELS.TRANSACTION_COMMIT, () => ({
            transactionId: IDS.get(this)
          }));
          this.emit("commit");
          resolve();
        });
      });
    }
    /**
     * Creates a TransactionError for an aborted transaction, preserving the
     * original abort reason (if any) as `originalError`.
     *
     * @private
     * @return {TransactionError}
     */
    _createAbortError() {
      const err = new TransactionError("Transaction has been aborted.", "EABORT");
      if (this._abortReason) {
        Object.defineProperty(err, "originalError", { enumerable: true, value: this._abortReason });
      }
      return err;
    }
    /**
     * @private
     * @param {basicCallback} [callback]
     * @return {Transaction}
     */
    _commit(callback) {
      if (this._aborted) {
        return setImmediate(callback, this._createAbortError());
      }
      if (!this._acquiredConnection) {
        return setImmediate(callback, new TransactionError("Transaction has not begun. Call begin() first.", "ENOTBEGUN"));
      }
      if (this._activeRequest) {
        return setImmediate(callback, new TransactionError("Can't commit transaction. There is a request in progress.", "EREQINPROG"));
      }
      setImmediate(callback);
    }
    /**
     * Returns new request using this transaction.
     *
     * @param {{ requestTimeout?: number }} [config]
     * @return {Request}
     */
    request(config) {
      const overrides = { ...this.overrides };
      if (Number.isFinite(config?.requestTimeout) && config.requestTimeout >= 0) {
        overrides.requestTimeout = config.requestTimeout;
      }
      return new shared2.driver.Request(this, overrides);
    }
    /**
     * Rollback a transaction.
     *
     * @param {basicCallback} [callback] A callback which is called after transaction has rolled back, or an error has occurred. If omited, method returns Promise.
     * @return {Transaction|Promise}
     */
    rollback(callback) {
      if (typeof callback === "function") {
        this._rollback((err) => {
          if (!err) {
            publish(CHANNELS.TRANSACTION_ROLLBACK, () => ({
              transactionId: IDS.get(this),
              aborted: this._aborted
            }));
            this.emit("rollback", this._aborted);
          }
          callback(err);
        });
        return this;
      }
      return new shared2.Promise((resolve, reject) => {
        return this._rollback((err) => {
          if (err) return reject(err);
          publish(CHANNELS.TRANSACTION_ROLLBACK, () => ({
            transactionId: IDS.get(this),
            aborted: this._aborted
          }));
          this.emit("rollback", this._aborted);
          resolve();
        });
      });
    }
    /**
     * @private
     * @param {basicCallback} [callback]
     * @return {Transaction}
     */
    _rollback(callback) {
      if (this._aborted) {
        return setImmediate(callback, this._createAbortError());
      }
      if (!this._acquiredConnection) {
        return setImmediate(callback, new TransactionError("Transaction has not begun. Call begin() first.", "ENOTBEGUN"));
      }
      if (this._activeRequest) {
        return setImmediate(callback, new TransactionError("Can't rollback transaction. There is a request in progress.", "EREQINPROG"));
      }
      this._rollbackRequested = true;
      setImmediate(callback);
    }
  }
  Transaction.defaultIsolationLevel = ISOLATION_LEVEL.READ_COMMITTED;
  transaction$1 = Transaction;
  return transaction$1;
}
var hasRequiredBase;
function requireBase() {
  if (hasRequiredBase) return base.exports;
  hasRequiredBase = 1;
  (function(module) {
    const ConnectionPool = requireConnectionPool$1();
    const PreparedStatement = requirePreparedStatement();
    const Request = requireRequest$1();
    const Transaction = requireTransaction$1();
    const { ConnectionError, TransactionError, RequestError, PreparedStatementError, MSSQLError } = requireError();
    const shared2 = requireShared();
    const Table = requireTable();
    const ISOLATION_LEVEL = requireIsolationlevel();
    const { TYPES } = requireDatatypes();
    const { connect, close, on, off, removeListener, query, batch } = requireGlobalConnection();
    const { CHANNELS } = requireDiagnostics();
    module.exports = {
      ConnectionPool,
      Transaction,
      Request,
      PreparedStatement,
      ConnectionError,
      TransactionError,
      RequestError,
      PreparedStatementError,
      MSSQLError,
      driver: shared2.driver,
      exports: {
        ConnectionError,
        TransactionError,
        RequestError,
        PreparedStatementError,
        MSSQLError,
        Table,
        ISOLATION_LEVEL,
        TYPES,
        CHANNELS,
        MAX: 65535,
        // (1 << 16) - 1
        map: shared2.map,
        getTypeByValue: shared2.getTypeByValue,
        connect,
        close,
        on,
        removeListener,
        off,
        query,
        batch
      }
    };
    Object.defineProperty(module.exports, "Promise", {
      enumerable: true,
      get: () => {
        return shared2.Promise;
      },
      set: (value) => {
        shared2.Promise = value;
      }
    });
    Object.defineProperty(module.exports, "valueHandler", {
      enumerable: true,
      value: shared2.valueHandler,
      writable: false,
      configurable: false
    });
    for (const key in TYPES) {
      const value = TYPES[key];
      module.exports.exports[key] = value;
      module.exports.exports[key.toUpperCase()] = value;
    }
  })(base);
  return base.exports;
}
var connectionPool;
var hasRequiredConnectionPool;
function requireConnectionPool() {
  if (hasRequiredConnectionPool) return connectionPool;
  hasRequiredConnectionPool = 1;
  const tds = requireTedious$1();
  const debug = requireSrc()("mssql:tedi");
  const BaseConnectionPool = requireConnectionPool$1();
  const { IDS } = requireUtils();
  const shared2 = requireShared();
  const ConnectionError = requireConnectionError();
  const { CHANNELS, publish } = requireDiagnostics();
  class ConnectionPool extends BaseConnectionPool {
    _config() {
      const cfg = {
        server: this.config.server,
        options: Object.assign({
          encrypt: typeof this.config.encrypt === "boolean" ? this.config.encrypt : true,
          trustServerCertificate: typeof this.config.trustServerCertificate === "boolean" ? this.config.trustServerCertificate : false
        }, this.config.options),
        authentication: Object.assign({
          type: this.config.domain !== void 0 ? "ntlm" : this.config.authentication_type !== void 0 ? this.config.authentication_type : "default",
          options: Object.entries({
            userName: this.config.user,
            password: this.config.password,
            domain: this.config.domain,
            clientId: this.config.clientId,
            clientSecret: this.config.clientSecret,
            tenantId: this.config.tenantId,
            token: this.config.token,
            msiEndpoint: this.config.msiEndpoint,
            msiSecret: this.config.msiSecret
          }).reduce((acc, [key, val]) => {
            if (typeof val !== "undefined") {
              return { ...acc, [key]: val };
            }
            return acc;
          }, {})
        }, this.config.authentication)
      };
      cfg.options.database = cfg.options.database || this.config.database;
      cfg.options.port = cfg.options.port || this.config.port;
      cfg.options.connectTimeout = cfg.options.connectTimeout ?? this.config.connectionTimeout ?? this.config.timeout ?? 15e3;
      cfg.options.requestTimeout = cfg.options.requestTimeout ?? this.config.requestTimeout ?? this.config.timeout ?? 15e3;
      cfg.options.tdsVersion = cfg.options.tdsVersion || "7_4";
      cfg.options.rowCollectionOnDone = cfg.options.rowCollectionOnDone || false;
      cfg.options.rowCollectionOnRequestCompletion = cfg.options.rowCollectionOnRequestCompletion || false;
      cfg.options.useColumnNames = cfg.options.useColumnNames || false;
      cfg.options.appName = cfg.options.appName || "node-mssql";
      if (cfg.options.instanceName) delete cfg.options.port;
      if (isNaN(cfg.options.requestTimeout)) cfg.options.requestTimeout = 15e3;
      if (cfg.options.requestTimeout === Infinity || cfg.options.requestTimeout < 0) cfg.options.requestTimeout = 0;
      if (!cfg.options.debug && this.config.debug) {
        cfg.options.debug = {
          packet: true,
          token: true,
          data: true,
          payload: true
        };
      }
      return cfg;
    }
    _poolCreate() {
      return new shared2.Promise((resolve, reject) => {
        const resolveOnce = (v) => {
          resolve(v);
          resolve = reject = () => {
          };
        };
        const rejectOnce = (e) => {
          reject(e);
          resolve = reject = () => {
          };
        };
        let tedious2;
        try {
          tedious2 = new tds.Connection(this._config());
        } catch (err) {
          rejectOnce(err);
          return;
        }
        tedious2.connect((err) => {
          if (err) {
            err = new ConnectionError(err);
            return rejectOnce(err);
          }
          debug("connection(%d): established", IDS.get(tedious2));
          this.collation = tedious2.databaseCollation;
          publish(CHANNELS.CONNECTION_CREATE, () => ({
            connectionId: IDS.get(tedious2),
            poolId: IDS.get(this),
            server: this.config.server,
            database: this.config.database
          }));
          resolveOnce(tedious2);
        });
        IDS.add(tedious2, "Connection");
        debug("pool(%d): connection #%d created", IDS.get(this), IDS.get(tedious2));
        debug("connection(%d): establishing", IDS.get(tedious2));
        tedious2.on("end", () => {
          const err = new ConnectionError("The connection ended without ever completing the connection");
          rejectOnce(err);
        });
        tedious2.on("error", (err) => {
          if (err.code === "ESOCKET") {
            tedious2.hasError = true;
          } else {
            this.emit("error", err);
          }
          rejectOnce(err);
        });
        if (this.config.debug) {
          tedious2.on("debug", this.emit.bind(this, "debug", tedious2));
        }
        if (typeof this.config.beforeConnect === "function") {
          this.config.beforeConnect(tedious2);
        }
      });
    }
    _poolValidate(tedious2) {
      if (!tedious2 || tedious2.closed || tedious2.hasError) {
        return false;
      }
      const mode = this.config.validateConnection;
      if (!mode) {
        return true;
      }
      if (mode === "socket") {
        if (tedious2.state !== tedious2.STATE.LOGGED_IN) {
          return false;
        }
        if (!tedious2.socket || tedious2.socket.destroyed || !tedious2.socket.writable) {
          return false;
        }
        return true;
      }
      return new shared2.Promise((resolve) => {
        const req = new tds.Request("SELECT 1;", (err) => {
          resolve(!err);
        });
        tedious2.execSql(req);
      });
    }
    _poolDestroy(tedious2) {
      return new shared2.Promise((resolve, reject) => {
        if (!tedious2) {
          resolve();
          return;
        }
        debug("connection(%d): destroying", IDS.get(tedious2));
        const connectionId = IDS.get(tedious2);
        const poolId = IDS.get(this);
        if (tedious2.closed) {
          debug("connection(%d): already closed", IDS.get(tedious2));
          resolve();
        } else {
          tedious2.once("end", () => {
            debug("connection(%d): destroyed", IDS.get(tedious2));
            publish(CHANNELS.CONNECTION_DESTROY, () => ({
              connectionId,
              poolId
            }));
            resolve();
          });
          tedious2.close();
        }
      });
    }
  }
  connectionPool = ConnectionPool;
  return connectionPool;
}
var transaction;
var hasRequiredTransaction;
function requireTransaction() {
  if (hasRequiredTransaction) return transaction;
  hasRequiredTransaction = 1;
  const debug = requireSrc()("mssql:tedi");
  const BaseTransaction = requireTransaction$1();
  const { IDS } = requireUtils();
  const TransactionError = requireTransactionError();
  const { CHANNELS, publish } = requireDiagnostics();
  class Transaction extends BaseTransaction {
    constructor(parent, overrides) {
      super(parent, overrides);
      this._abort = () => {
        if (!this._rollbackRequested) {
          const pc = this._acquiredConnection;
          setImmediate(this.parent.release.bind(this.parent), pc);
          this._acquiredConnection.removeListener("rollbackTransaction", this._abort);
          this._acquiredConnection = null;
          this._acquiredConfig = null;
          this._aborted = true;
          this._abortReason = this._abortReason || new Error("Transaction was rolled back by the server");
          publish(CHANNELS.TRANSACTION_ROLLBACK, () => ({
            transactionId: IDS.get(this),
            aborted: true
          }));
          this.emit("rollback", true);
        }
      };
    }
    _begin(isolationLevel, callback) {
      super._begin(isolationLevel, (err) => {
        if (err) return callback(err);
        debug("transaction(%d): begin", IDS.get(this));
        this.parent.acquire(this, (err2, connection, config) => {
          if (err2) return callback(err2);
          this._acquiredConnection = connection;
          this._acquiredConnection.on("rollbackTransaction", this._abort);
          this._acquiredConfig = config;
          connection.beginTransaction((err3) => {
            if (err3) err3 = new TransactionError(err3);
            debug("transaction(%d): begun", IDS.get(this));
            callback(err3);
          }, this.name, this.isolationLevel);
        });
      });
    }
    _commit(callback) {
      super._commit((err) => {
        if (err) return callback(err);
        debug("transaction(%d): commit", IDS.get(this));
        this._acquiredConnection.commitTransaction((err2) => {
          if (err2) err2 = new TransactionError(err2);
          this._acquiredConnection.removeListener("rollbackTransaction", this._abort);
          this.parent.release(this._acquiredConnection);
          this._acquiredConnection = null;
          this._acquiredConfig = null;
          if (!err2) debug("transaction(%d): commited", IDS.get(this));
          callback(err2);
        });
      });
    }
    _rollback(callback) {
      super._rollback((err) => {
        if (err) return callback(err);
        debug("transaction(%d): rollback", IDS.get(this));
        this._acquiredConnection.rollbackTransaction((err2) => {
          if (err2) err2 = new TransactionError(err2);
          this._acquiredConnection.removeListener("rollbackTransaction", this._abort);
          this.parent.release(this._acquiredConnection);
          this._acquiredConnection = null;
          this._acquiredConfig = null;
          if (!err2) debug("transaction(%d): rolled back", IDS.get(this));
          callback(err2);
        });
      });
    }
  }
  transaction = Transaction;
  return transaction;
}
var udt = {};
var hasRequiredUdt;
function requireUdt() {
  if (hasRequiredUdt) return udt;
  hasRequiredUdt = 1;
  const ensureBytes = (buffer, needed) => {
    if (buffer.position + needed > buffer.length) {
      throw new Error(`Corrupt or truncated spatial data: expected ${needed} bytes at position ${buffer.position}, but only ${buffer.length - buffer.position} bytes remain`);
    }
  };
  class Point {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.z = null;
      this.m = null;
    }
  }
  const parsePoints = (buffer, count, isGeometryPoint) => {
    const points = [];
    if (count < 1) {
      return points;
    }
    ensureBytes(buffer, count * 16);
    if (isGeometryPoint) {
      for (let i = 1; i <= count; i++) {
        const point = new Point();
        points.push(point);
        point.x = buffer.readDoubleLE(buffer.position);
        point.y = buffer.readDoubleLE(buffer.position + 8);
        buffer.position += 16;
      }
    } else {
      for (let i = 1; i <= count; i++) {
        const point = new Point();
        points.push(point);
        point.lat = buffer.readDoubleLE(buffer.position);
        point.lng = buffer.readDoubleLE(buffer.position + 8);
        point.x = point.lat;
        point.y = point.lng;
        buffer.position += 16;
      }
    }
    return points;
  };
  const parseZ = (buffer, points) => {
    if (points < 1) {
      return;
    }
    ensureBytes(buffer, points.length * 8);
    points.forEach((point) => {
      point.z = buffer.readDoubleLE(buffer.position);
      buffer.position += 8;
    });
  };
  const parseM = (buffer, points) => {
    if (points < 1) {
      return;
    }
    ensureBytes(buffer, points.length * 8);
    points.forEach((point) => {
      point.m = buffer.readDoubleLE(buffer.position);
      buffer.position += 8;
    });
  };
  const parseFigures = (buffer, count, properties) => {
    const figures = [];
    if (count < 1) {
      return figures;
    }
    if (properties.P) {
      figures.push({
        attribute: 1,
        pointOffset: 0
      });
    } else if (properties.L) {
      figures.push({
        attribute: 1,
        pointOffset: 0
      });
    } else {
      ensureBytes(buffer, count * 5);
      for (let i = 1; i <= count; i++) {
        figures.push({
          attribute: buffer.readUInt8(buffer.position),
          pointOffset: buffer.readInt32LE(buffer.position + 1)
        });
        buffer.position += 5;
      }
    }
    return figures;
  };
  const parseShapes = (buffer, count, properties) => {
    const shapes = [];
    if (count < 1) {
      return shapes;
    }
    if (properties.P) {
      shapes.push({
        parentOffset: -1,
        figureOffset: 0,
        type: 1
      });
    } else if (properties.L) {
      shapes.push({
        parentOffset: -1,
        figureOffset: 0,
        type: 2
      });
    } else {
      ensureBytes(buffer, count * 9);
      for (let i = 1; i <= count; i++) {
        shapes.push({
          parentOffset: buffer.readInt32LE(buffer.position),
          figureOffset: buffer.readInt32LE(buffer.position + 4),
          type: buffer.readUInt8(buffer.position + 8)
        });
        buffer.position += 9;
      }
    }
    return shapes;
  };
  const parseSegments = (buffer, count) => {
    const segments = [];
    if (count < 1) {
      return segments;
    }
    ensureBytes(buffer, count);
    for (let i = 1; i <= count; i++) {
      segments.push({ type: buffer.readUInt8(buffer.position) });
      buffer.position++;
    }
    return segments;
  };
  const parseGeography = (buffer, isUsingGeometryPoints) => {
    ensureBytes(buffer, 6);
    const srid = buffer.readInt32LE(0);
    if (srid === -1) {
      return null;
    }
    const value = {
      srid,
      version: buffer.readUInt8(4)
    };
    const flags = buffer.readUInt8(5);
    buffer.position = 6;
    const properties = {
      Z: (flags & 1 << 0) > 0,
      M: (flags & 1 << 1) > 0,
      P: (flags & 1 << 3) > 0,
      L: (flags & 1 << 4) > 0
    };
    if (value.version === 2) {
      properties.H = (flags & 1 << 5) > 0;
    }
    let numberOfPoints;
    if (properties.P) {
      numberOfPoints = 1;
    } else if (properties.L) {
      numberOfPoints = 2;
    } else {
      ensureBytes(buffer, 4);
      numberOfPoints = buffer.readUInt32LE(buffer.position);
      buffer.position += 4;
    }
    value.points = parsePoints(buffer, numberOfPoints, isUsingGeometryPoints);
    if (properties.Z) {
      parseZ(buffer, value.points);
    }
    if (properties.M) {
      parseM(buffer, value.points);
    }
    let numberOfFigures;
    if (properties.P) {
      numberOfFigures = 1;
    } else if (properties.L) {
      numberOfFigures = 1;
    } else {
      ensureBytes(buffer, 4);
      numberOfFigures = buffer.readUInt32LE(buffer.position);
      buffer.position += 4;
    }
    value.figures = parseFigures(buffer, numberOfFigures, properties);
    let numberOfShapes;
    if (properties.P) {
      numberOfShapes = 1;
    } else if (properties.L) {
      numberOfShapes = 1;
    } else {
      ensureBytes(buffer, 4);
      numberOfShapes = buffer.readUInt32LE(buffer.position);
      buffer.position += 4;
    }
    value.shapes = parseShapes(buffer, numberOfShapes, properties);
    if (value.version === 2 && buffer.position + 4 <= buffer.length) {
      const numberOfSegments = buffer.readUInt32LE(buffer.position);
      buffer.position += 4;
      value.segments = parseSegments(buffer, numberOfSegments);
    } else {
      value.segments = [];
    }
    return value;
  };
  udt.PARSERS = {
    geography(buffer) {
      return parseGeography(
        buffer,
        /* isUsingGeometryPoints: */
        false
      );
    },
    geometry(buffer) {
      return parseGeography(
        buffer,
        /* isUsingGeometryPoints: */
        true
      );
    }
  };
  return udt;
}
var request;
var hasRequiredRequest;
function requireRequest() {
  if (hasRequiredRequest) return request;
  hasRequiredRequest = 1;
  const tds = requireTedious$1();
  const debug = requireSrc()("mssql:tedi");
  const BaseRequest = requireRequest$1();
  const RequestError = requireRequestError();
  const { IDS, objectHasProperty } = requireUtils();
  const { TYPES, DECLARATIONS, declare, cast } = requireDatatypes();
  const Table = requireTable();
  const { PARSERS: UDT } = requireUdt();
  const { valueHandler } = requireShared();
  const JSON_COLUMN_ID = "JSON_F52E2B61-18A1-11d1-B105-00805F49916B";
  const XML_COLUMN_ID = "XML_F52E2B61-18A1-11d1-B105-00805F49916B";
  const N_TYPES = {
    BitN: 104,
    DateTimeN: 111,
    DecimalN: 106,
    FloatN: 109,
    IntN: 38,
    MoneyN: 110,
    NumericN: 108
  };
  const SchemaAwareTVP = Object.create(tds.TYPES.TVP, {
    declaration: {
      value: function(parameter) {
        const value = parameter.value;
        if (value && value.schema) {
          return value.schema + "." + value.name + " readonly";
        }
        return value.name + " readonly";
      },
      writable: true,
      configurable: true
    }
  });
  const getTediousType = function(type) {
    switch (type) {
      case TYPES.VarChar:
        return tds.TYPES.VarChar;
      case TYPES.NVarChar:
        return tds.TYPES.NVarChar;
      case TYPES.Text:
        return tds.TYPES.Text;
      case TYPES.Int:
        return tds.TYPES.Int;
      case TYPES.BigInt:
        return tds.TYPES.BigInt;
      case TYPES.TinyInt:
        return tds.TYPES.TinyInt;
      case TYPES.SmallInt:
        return tds.TYPES.SmallInt;
      case TYPES.Bit:
        return tds.TYPES.Bit;
      case TYPES.Float:
        return tds.TYPES.Float;
      case TYPES.Decimal:
        return tds.TYPES.Decimal;
      case TYPES.Numeric:
        return tds.TYPES.Numeric;
      case TYPES.Real:
        return tds.TYPES.Real;
      case TYPES.Money:
        return tds.TYPES.Money;
      case TYPES.SmallMoney:
        return tds.TYPES.SmallMoney;
      case TYPES.Time:
        return tds.TYPES.Time;
      case TYPES.Date:
        return tds.TYPES.Date;
      case TYPES.DateTime:
        return tds.TYPES.DateTime;
      case TYPES.DateTime2:
        return tds.TYPES.DateTime2;
      case TYPES.DateTimeOffset:
        return tds.TYPES.DateTimeOffset;
      case TYPES.SmallDateTime:
        return tds.TYPES.SmallDateTime;
      case TYPES.UniqueIdentifier:
        return tds.TYPES.UniqueIdentifier;
      case TYPES.Xml:
        return tds.TYPES.NVarChar;
      case TYPES.Char:
        return tds.TYPES.Char;
      case TYPES.NChar:
        return tds.TYPES.NChar;
      case TYPES.NText:
        return tds.TYPES.NVarChar;
      case TYPES.Image:
        return tds.TYPES.Image;
      case TYPES.Binary:
        return tds.TYPES.Binary;
      case TYPES.VarBinary:
        return tds.TYPES.VarBinary;
      case TYPES.UDT:
      case TYPES.Geography:
      case TYPES.Geometry:
        return tds.TYPES.UDT;
      case TYPES.TVP:
        return SchemaAwareTVP;
      case TYPES.Variant:
        return tds.TYPES.Variant;
      default:
        return type;
    }
  };
  const getMssqlType = function(type, length) {
    if (typeof type !== "object") return void 0;
    switch (type) {
      case tds.TYPES.Char:
        return TYPES.Char;
      case tds.TYPES.NChar:
        return TYPES.NChar;
      case tds.TYPES.VarChar:
        return TYPES.VarChar;
      case tds.TYPES.NVarChar:
        return TYPES.NVarChar;
      case tds.TYPES.Text:
        return TYPES.Text;
      case tds.TYPES.NText:
        return TYPES.NText;
      case tds.TYPES.Int:
        return TYPES.Int;
      case tds.TYPES.BigInt:
        return TYPES.BigInt;
      case tds.TYPES.TinyInt:
        return TYPES.TinyInt;
      case tds.TYPES.SmallInt:
        return TYPES.SmallInt;
      case tds.TYPES.Bit:
        return TYPES.Bit;
      case tds.TYPES.Float:
        return TYPES.Float;
      case tds.TYPES.Real:
        return TYPES.Real;
      case tds.TYPES.Money:
        return TYPES.Money;
      case tds.TYPES.SmallMoney:
        return TYPES.SmallMoney;
      case tds.TYPES.Numeric:
        return TYPES.Numeric;
      case tds.TYPES.Decimal:
        return TYPES.Decimal;
      case tds.TYPES.DateTime:
        return TYPES.DateTime;
      case tds.TYPES.Time:
        return TYPES.Time;
      case tds.TYPES.Date:
        return TYPES.Date;
      case tds.TYPES.DateTime2:
        return TYPES.DateTime2;
      case tds.TYPES.DateTimeOffset:
        return TYPES.DateTimeOffset;
      case tds.TYPES.SmallDateTime:
        return TYPES.SmallDateTime;
      case tds.TYPES.UniqueIdentifier:
        return TYPES.UniqueIdentifier;
      case tds.TYPES.Image:
        return TYPES.Image;
      case tds.TYPES.Binary:
        return TYPES.Binary;
      case tds.TYPES.VarBinary:
        return TYPES.VarBinary;
      case tds.TYPES.Xml:
        return TYPES.Xml;
      case tds.TYPES.UDT:
        return TYPES.UDT;
      case tds.TYPES.TVP:
        return TYPES.TVP;
      case tds.TYPES.Variant:
        return TYPES.Variant;
      default:
        switch (type.id) {
          case N_TYPES.BitN:
            return TYPES.Bit;
          case N_TYPES.NumericN:
            return TYPES.Numeric;
          case N_TYPES.DecimalN:
            return TYPES.Decimal;
          case N_TYPES.IntN:
            if (length === 8) return TYPES.BigInt;
            if (length === 4) return TYPES.Int;
            if (length === 2) return TYPES.SmallInt;
            return TYPES.TinyInt;
          case N_TYPES.FloatN:
            if (length === 8) return TYPES.Float;
            return TYPES.Real;
          case N_TYPES.MoneyN:
            if (length === 8) return TYPES.Money;
            return TYPES.SmallMoney;
          case N_TYPES.DateTimeN:
            if (length === 8) return TYPES.DateTime;
            return TYPES.SmallDateTime;
        }
    }
  };
  const createColumns = function(metadata, arrayRowMode) {
    let out = {};
    if (arrayRowMode) out = [];
    for (let index2 = 0, length = metadata.length; index2 < length; index2++) {
      const column = metadata[index2];
      const outColumn = {
        index: index2,
        name: column.colName,
        length: column.dataLength,
        type: getMssqlType(column.type, column.dataLength),
        scale: column.scale,
        precision: column.precision,
        nullable: !!(column.flags & 1),
        caseSensitive: !!(column.flags & 2),
        identity: !!(column.flags & 16),
        readOnly: !(column.flags & 12)
      };
      if (column.udtInfo) {
        outColumn.udt = {
          name: column.udtInfo.typeName,
          database: column.udtInfo.dbname,
          schema: column.udtInfo.owningSchema,
          assembly: column.udtInfo.assemblyName
        };
        if (DECLARATIONS[column.udtInfo.typeName]) {
          outColumn.type = DECLARATIONS[column.udtInfo.typeName];
        }
      }
      if (arrayRowMode) {
        out.push(outColumn);
      } else {
        out[column.colName] = outColumn;
      }
    }
    return out;
  };
  const valueCorrection = function(value, metadata) {
    const type = getMssqlType(metadata.type, metadata.dataLength);
    if (valueHandler.has(type)) {
      return valueHandler.get(type)(value);
    } else if (metadata.type === tds.TYPES.UDT && value != null) {
      if (UDT[metadata.udtInfo.typeName]) {
        return UDT[metadata.udtInfo.typeName](value);
      } else {
        return value;
      }
    } else {
      return value;
    }
  };
  const parameterCorrection = function(value) {
    if (value instanceof Table) {
      const tvp = {
        name: value.name,
        schema: value.schema,
        columns: [],
        rows: value.rows
      };
      for (const col of value.columns) {
        const tediousType = getTediousType(col.type);
        if (tediousType === tds.TYPES.Variant) {
          throw new RequestError(`Column '${col.name}' in TVP '${value.schema ? value.schema + "." : ""}${value.name}' uses sql_variant which is not supported by the tedious driver for TVP column types. Consider using a more specific data type.`, "EARGS");
        }
        tvp.columns.push({
          name: col.name,
          type: tediousType,
          length: col.length,
          scale: col.scale,
          precision: col.precision
        });
      }
      return tvp;
    } else {
      return value;
    }
  };
  class Request extends BaseRequest {
    /*
    Execute specified sql batch.
    */
    _batch(batch, callback) {
      this._isBatch = true;
      this._query(batch, callback);
    }
    /*
    Bulk load.
    */
    _bulk(table2, options, callback) {
      super._bulk(table2, options, (err) => {
        if (err) return callback(err);
        try {
          table2._makeBulk();
        } catch (e) {
          return callback(new RequestError(e, "EREQUEST"));
        }
        if (!table2.name) {
          return callback(new RequestError("Table name must be specified for bulk insert.", "ENAME"));
        }
        if (table2.name.charAt(0) === "@") {
          return callback(new RequestError("You can't use table variables for bulk insert.", "ENAME"));
        }
        const errors = [];
        const errorHandlers = {};
        let hasReturned = false;
        const handleError = (doReturn, connection, info) => {
          let err2 = new Error(info.message);
          err2.info = info;
          err2 = new RequestError(err2, "EREQUEST");
          if (this.stream) {
            this.emit("error", err2);
          } else {
            if (doReturn && !hasReturned) {
              if (connection) {
                for (const event in errorHandlers) {
                  connection.removeListener(event, errorHandlers[event]);
                }
                this.parent.release(connection);
              }
              hasReturned = true;
              callback(err2);
            }
          }
          errors.push(err2);
        };
        const handleInfo = (msg) => {
          this.emit("info", {
            message: msg.message,
            number: msg.number,
            state: msg.state,
            class: msg.class,
            lineNumber: msg.lineNumber,
            serverName: msg.serverName,
            procName: msg.procName
          });
        };
        this.parent.acquire(this, (err2, connection) => {
          const callbackWithRelease = (err3, ...args) => {
            try {
              this.parent.release(connection);
            } catch (e) {
            }
            if (this.parent._aborted) {
              const reason = err3 || errors[errors.length - 1];
              if (reason) this.parent._abortReason = reason;
            }
            callback(err3, ...args);
          };
          if (err2) return callbackWithRelease(err2);
          debug("connection(%d): borrowed to request #%d", IDS.get(connection), IDS.get(this));
          if (this.canceled) {
            debug("request(%d): canceled", IDS.get(this));
            return callbackWithRelease(new RequestError("Canceled.", "ECANCEL"));
          }
          this._cancel = () => {
            debug("request(%d): cancel", IDS.get(this));
            connection.cancel();
          };
          connection.on("infoMessage", errorHandlers.infoMessage = handleInfo);
          connection.on("errorMessage", errorHandlers.errorMessage = handleError.bind(null, false, connection));
          connection.on("error", errorHandlers.error = handleError.bind(null, true, connection));
          const done = (err3, rowCount) => {
            if (err3 && (!errors.length || errors.length && err3.message !== errors[errors.length - 1].message)) {
              err3 = new RequestError(err3, "EREQUEST");
              if (this.stream) this.emit("error", err3);
              errors.push(err3);
            }
            delete this._cancel;
            let error2;
            if (errors.length && !this.stream) {
              error2 = errors.pop();
              error2.precedingErrors = errors;
            }
            if (!hasReturned) {
              for (const event in errorHandlers) {
                connection.removeListener(event, errorHandlers[event]);
              }
              hasReturned = true;
              if (this.stream) {
                callbackWithRelease(null, rowCount);
              } else {
                callbackWithRelease(error2, rowCount);
              }
            }
          };
          const bulk = connection.newBulkLoad(table2.path, options, done);
          for (const col of table2.columns) {
            bulk.addColumn(col.name, getTediousType(col.type), { nullable: col.nullable, length: col.length, scale: col.scale, precision: col.precision });
          }
          if (table2.create) {
            const objectid = table2.temporary ? `tempdb..[${table2.name}]` : table2.path;
            const req = new tds.Request(`if object_id('${objectid.replace(/'/g, "''")}') is null ${table2.declare()}`, (err3) => {
              if (err3) return done(err3);
              connection.execBulkLoad(bulk, table2.rows);
            });
            if (typeof this.overrides.requestTimeout === "number") {
              req.setTimeout(this.overrides.requestTimeout);
            }
            this._setCurrentRequest(req);
            connection.execSqlBatch(req);
          } else {
            connection.execBulkLoad(bulk, table2.rows);
          }
        });
      });
    }
    /*
    Execute specified sql command.
    */
    _query(command, callback) {
      super._query(command, (err) => {
        if (err) return callback(err);
        const recordsets = [];
        const recordsetcolumns = [];
        const errors = [];
        const errorHandlers = {};
        const output = {};
        const rowsAffected = [];
        let columns = {};
        let recordset = [];
        let batchLastRow = null;
        let batchHasOutput = false;
        let isChunkedRecordset = false;
        let chunksBuffer = null;
        let hasReturned = false;
        const handleError = (doReturn, connection, info) => {
          let err2 = new Error(info.message);
          err2.info = info;
          err2 = new RequestError(err2, "EREQUEST");
          if (this.stream) {
            this.emit("error", err2);
          } else {
            if (doReturn && !hasReturned) {
              if (connection) {
                for (const event in errorHandlers) {
                  connection.removeListener(event, errorHandlers[event]);
                }
                this.parent.release(connection);
              }
              hasReturned = true;
              callback(err2);
            }
          }
          errors.push(err2);
        };
        const handleInfo = (msg) => {
          this.emit("info", {
            message: msg.message,
            number: msg.number,
            state: msg.state,
            class: msg.class,
            lineNumber: msg.lineNumber,
            serverName: msg.serverName,
            procName: msg.procName
          });
        };
        this.parent.acquire(this, (err2, connection, config) => {
          if (err2) return callback(err2);
          debug("connection(%d): borrowed to request #%d", IDS.get(connection), IDS.get(this));
          let row;
          if (this.canceled) {
            debug("request(%d): canceled", IDS.get(this));
            this.parent.release(connection);
            return callback(new RequestError("Canceled.", "ECANCEL"));
          }
          this._cancel = () => {
            debug("request(%d): cancel", IDS.get(this));
            connection.cancel();
          };
          connection.on("infoMessage", errorHandlers.infoMessage = handleInfo);
          connection.on("errorMessage", errorHandlers.errorMessage = handleError.bind(null, false, connection));
          connection.on("error", errorHandlers.error = handleError.bind(null, true, connection));
          debug("request(%d): query", IDS.get(this), command);
          const req = new tds.Request(command, (err3) => {
            (err3?.errors ? err3.errors : [err3]).forEach((e, i, { length }) => {
              if (e && (!errors.length || errors.length && errors.length >= length && e.message !== errors[errors.length - length + i].message)) {
                e = new RequestError(e, "EREQUEST");
                if (this.stream) this.emit("error", e);
                errors.push(e);
              }
            });
            if (batchHasOutput) {
              if (!this.stream) batchLastRow = recordsets.pop()?.[0];
              for (const name in batchLastRow) {
                const value = batchLastRow[name];
                if (name !== "___return___") {
                  output[name] = value;
                }
              }
            }
            delete this._cancel;
            let error2;
            if (errors.length && !this.stream) {
              error2 = errors.pop();
              error2.precedingErrors = errors;
            }
            if (!hasReturned) {
              for (const event in errorHandlers) {
                connection.removeListener(event, errorHandlers[event]);
              }
              this.parent.release(connection);
              if (this.parent._aborted) {
                const reason = error2 || errors[errors.length - 1];
                if (reason) this.parent._abortReason = reason;
              }
              hasReturned = true;
              if (error2) {
                debug("request(%d): failed", IDS.get(this), error2);
              } else {
                debug("request(%d): completed", IDS.get(this));
              }
              if (this.stream) {
                callback(null, null, output, rowsAffected, recordsetcolumns);
              } else {
                callback(error2, recordsets, output, rowsAffected, recordsetcolumns);
              }
            }
          });
          if (typeof this.overrides.requestTimeout === "number") {
            req.setTimeout(this.overrides.requestTimeout);
          }
          this._setCurrentRequest(req);
          req.on("columnMetadata", (metadata) => {
            columns = createColumns(metadata, this.arrayRowMode);
            isChunkedRecordset = false;
            if (metadata.length === 1 && (metadata[0].colName === JSON_COLUMN_ID || metadata[0].colName === XML_COLUMN_ID)) {
              isChunkedRecordset = true;
              chunksBuffer = [];
            }
            if (this.stream) {
              if (this._isBatch) {
                if (!columns.___return___) {
                  this.emit("recordset", columns);
                }
              } else {
                this.emit("recordset", columns);
              }
            }
            if (this.arrayRowMode) recordsetcolumns.push(columns);
          });
          const doneHandler = (rowCount, more) => {
            if (rowCount != null) {
              rowsAffected.push(rowCount);
              if (this.stream) {
                this.emit("rowsaffected", rowCount);
              }
            }
            if (Object.keys(columns).length === 0) return;
            if (isChunkedRecordset) {
              const concatenatedChunks = chunksBuffer.join("");
              if (columns[JSON_COLUMN_ID] && config.parseJSON === true) {
                try {
                  if (concatenatedChunks === "") {
                    row = null;
                  } else {
                    row = JSON.parse(concatenatedChunks);
                  }
                } catch (ex) {
                  row = null;
                  const ex2 = new RequestError(new Error(`Failed to parse incoming JSON. ${ex.message}`), "EJSON");
                  if (this.stream) this.emit("error", ex2);
                  errors.push(ex2);
                }
              } else {
                row = {};
                row[Object.keys(columns)[0]] = concatenatedChunks;
              }
              chunksBuffer = null;
              if (this.stream) {
                this.emit("row", row);
              } else {
                recordset.push(row);
              }
            }
            if (!this.stream) {
              Object.defineProperty(recordset, "columns", {
                enumerable: false,
                configurable: true,
                value: columns
              });
              Object.defineProperty(recordset, "toTable", {
                enumerable: false,
                configurable: true,
                value(name) {
                  return Table.fromRecordset(this, name);
                }
              });
              recordsets.push(recordset);
            }
            recordset = [];
            columns = {};
          };
          req.on("doneInProc", doneHandler);
          req.on("done", doneHandler);
          req.on("returnValue", (parameterName, value, metadata) => {
            output[parameterName] = value;
          });
          req.on("row", (columns2) => {
            if (!recordset) recordset = [];
            if (isChunkedRecordset) {
              return chunksBuffer.push(columns2[0].value);
            }
            if (this.arrayRowMode) {
              row = [];
            } else {
              row = {};
            }
            for (const col of columns2) {
              col.value = valueCorrection(col.value, col.metadata);
              if (this.arrayRowMode) {
                row.push(col.value);
              } else {
                const exi = row[col.metadata.colName];
                if (exi !== void 0) {
                  if (exi instanceof Array) {
                    exi.push(col.value);
                  } else {
                    row[col.metadata.colName] = [exi, col.value];
                  }
                } else {
                  row[col.metadata.colName] = col.value;
                }
              }
            }
            if (this.stream) {
              if (this._isBatch) {
                if (row.___return___) {
                  batchLastRow = row;
                } else {
                  this.emit("row", row);
                }
              } else {
                this.emit("row", row);
              }
            } else {
              recordset.push(row);
            }
          });
          if (this._isBatch) {
            if (Object.keys(this.parameters).length) {
              for (const name in this.parameters) {
                if (!objectHasProperty(this.parameters, name)) {
                  continue;
                }
                const param = this.parameters[name];
                try {
                  param.value = getTediousType(param.type).validate(param.value, this.parent.collation);
                } catch (e) {
                  e.message = `Validation failed for parameter '${name}'. ${e.message}`;
                  const err3 = new RequestError(e, "EPARAM");
                  delete this._cancel;
                  if (!hasReturned) {
                    for (const event in errorHandlers) {
                      connection.removeListener(event, errorHandlers[event]);
                    }
                    this.parent.release(connection);
                    hasReturned = true;
                    return callback(err3);
                  }
                  return;
                }
              }
              const declarations = [];
              for (const name in this.parameters) {
                if (!objectHasProperty(this.parameters, name)) {
                  continue;
                }
                const param = this.parameters[name];
                declarations.push(`@${name} ${declare(param.type, param)}`);
              }
              const assigns = [];
              for (const name in this.parameters) {
                if (!objectHasProperty(this.parameters, name)) {
                  continue;
                }
                const param = this.parameters[name];
                assigns.push(`@${name} = ${cast(param.value, param.type, param)}`);
              }
              const selects = [];
              for (const name in this.parameters) {
                if (!objectHasProperty(this.parameters, name)) {
                  continue;
                }
                const param = this.parameters[name];
                if (param.io === 2) {
                  selects.push(`@${name} as [${name}]`);
                }
              }
              batchHasOutput = selects.length > 0;
              req.sqlTextOrProcedure = `declare ${declarations.join(", ")};select ${assigns.join(", ")};${req.sqlTextOrProcedure};${batchHasOutput ? `select 1 as [___return___], ${selects.join(", ")}` : ""}`;
            }
          }
          try {
            if (!this._isBatch) {
              for (const name in this.parameters) {
                if (!objectHasProperty(this.parameters, name)) {
                  continue;
                }
                const param = this.parameters[name];
                if (param.io === 1) {
                  req.addParameter(param.name, getTediousType(param.type), parameterCorrection(param.value), { length: param.length, scale: param.scale, precision: param.precision });
                } else {
                  req.addOutputParameter(param.name, getTediousType(param.type), parameterCorrection(param.value), { length: param.length, scale: param.scale, precision: param.precision });
                }
              }
            }
            connection[this._isBatch ? "execSqlBatch" : "execSql"](req);
          } catch (error2) {
            handleError(true, connection, error2);
          }
        });
      });
    }
    /*
    Execute stored procedure with specified parameters.
    */
    _execute(procedure, callback) {
      super._execute(procedure, (err) => {
        if (err) return callback(err);
        const recordsets = [];
        const recordsetcolumns = [];
        const errors = [];
        const errorHandlers = {};
        const output = {};
        const rowsAffected = [];
        let columns = {};
        let recordset = [];
        let returnValue = 0;
        let isChunkedRecordset = false;
        let chunksBuffer = null;
        let hasReturned = false;
        const handleError = (doReturn, connection, info) => {
          let err2 = new Error(info.message);
          err2.info = info;
          err2 = new RequestError(err2, "EREQUEST");
          if (this.stream) {
            this.emit("error", err2);
          } else {
            if (doReturn && !hasReturned) {
              if (connection) {
                for (const event in errorHandlers) {
                  connection.removeListener(event, errorHandlers[event]);
                }
                this.parent.release(connection);
              }
              hasReturned = true;
              callback(err2);
            }
          }
          errors.push(err2);
        };
        const handleInfo = (msg) => {
          this.emit("info", {
            message: msg.message,
            number: msg.number,
            state: msg.state,
            class: msg.class,
            lineNumber: msg.lineNumber,
            serverName: msg.serverName,
            procName: msg.procName
          });
        };
        this.parent.acquire(this, (err2, connection, config) => {
          if (err2) return callback(err2);
          debug("connection(%d): borrowed to request #%d", IDS.get(connection), IDS.get(this));
          let row;
          if (this.canceled) {
            debug("request(%d): canceled", IDS.get(this));
            this.parent.release(connection);
            return callback(new RequestError("Canceled.", "ECANCEL"));
          }
          this._cancel = () => {
            debug("request(%d): cancel", IDS.get(this));
            connection.cancel();
          };
          connection.on("infoMessage", errorHandlers.infoMessage = handleInfo);
          connection.on("errorMessage", errorHandlers.errorMessage = handleError.bind(null, false, connection));
          connection.on("error", errorHandlers.error = handleError.bind(null, true, connection));
          if (debug.enabled) {
            const params = Object.keys(this.parameters).map((k) => this.parameters[k]);
            const logValue = (s) => typeof s === "string" && s.length > 50 ? s.substring(0, 47) + "..." : s;
            const logName = (param) => param.name + " [sql." + param.type.name + "]";
            const logParams = {};
            params.forEach((p) => {
              logParams[logName(p)] = logValue(p.value);
            });
            debug("request(%d): execute %s %O", IDS.get(this), procedure, logParams);
          }
          const req = new tds.Request(procedure, (err3) => {
            if (err3 && (!errors.length || errors.length && err3.message !== errors[errors.length - 1].message)) {
              err3 = new RequestError(err3, "EREQUEST");
              if (this.stream) this.emit("error", err3);
              errors.push(err3);
            }
            delete this._cancel;
            let error2;
            if (errors.length && !this.stream) {
              error2 = errors.pop();
              error2.precedingErrors = errors;
            }
            if (!hasReturned) {
              for (const event in errorHandlers) {
                connection.removeListener(event, errorHandlers[event]);
              }
              this.parent.release(connection);
              if (this.parent._aborted) {
                const reason = error2 || errors[errors.length - 1];
                if (reason) this.parent._abortReason = reason;
              }
              hasReturned = true;
              if (error2) {
                debug("request(%d): failed", IDS.get(this), error2);
              } else {
                debug("request(%d): complete", IDS.get(this));
              }
              if (this.stream) {
                callback(null, null, output, returnValue, rowsAffected, recordsetcolumns);
              } else {
                callback(error2, recordsets, output, returnValue, rowsAffected, recordsetcolumns);
              }
            }
          });
          if (typeof this.overrides.requestTimeout === "number") {
            req.setTimeout(this.overrides.requestTimeout);
          }
          this._setCurrentRequest(req);
          req.on("columnMetadata", (metadata) => {
            columns = createColumns(metadata, this.arrayRowMode);
            isChunkedRecordset = false;
            if (metadata.length === 1 && (metadata[0].colName === JSON_COLUMN_ID || metadata[0].colName === XML_COLUMN_ID)) {
              isChunkedRecordset = true;
              chunksBuffer = [];
            }
            if (this.stream) this.emit("recordset", columns);
            if (this.arrayRowMode) recordsetcolumns.push(columns);
          });
          req.on("row", (columns2) => {
            if (!recordset) recordset = [];
            if (isChunkedRecordset) {
              return chunksBuffer.push(columns2[0].value);
            }
            if (this.arrayRowMode) {
              row = [];
            } else {
              row = {};
            }
            for (const col of columns2) {
              col.value = valueCorrection(col.value, col.metadata);
              if (this.arrayRowMode) {
                row.push(col.value);
              } else {
                const exi = row[col.metadata.colName];
                if (exi != null) {
                  if (exi instanceof Array) {
                    exi.push(col.value);
                  } else {
                    row[col.metadata.colName] = [exi, col.value];
                  }
                } else {
                  row[col.metadata.colName] = col.value;
                }
              }
            }
            if (this.stream) {
              this.emit("row", row);
            } else {
              recordset.push(row);
            }
          });
          req.on("doneInProc", (rowCount, more) => {
            if (rowCount != null) {
              rowsAffected.push(rowCount);
              if (this.stream) {
                this.emit("rowsaffected", rowCount);
              }
            }
            if (Object.keys(columns).length === 0) return;
            if (isChunkedRecordset) {
              if (columns[JSON_COLUMN_ID] && config.parseJSON === true) {
                try {
                  if (chunksBuffer.length === 0) {
                    row = null;
                  } else {
                    row = JSON.parse(chunksBuffer.join(""));
                  }
                } catch (ex) {
                  row = null;
                  const ex2 = new RequestError(new Error(`Failed to parse incoming JSON. ${ex.message}`), "EJSON");
                  if (this.stream) this.emit("error", ex2);
                  errors.push(ex2);
                }
              } else {
                row = {};
                row[Object.keys(columns)[0]] = chunksBuffer.join("");
              }
              chunksBuffer = null;
              if (this.stream) {
                this.emit("row", row);
              } else {
                recordset.push(row);
              }
            }
            if (!this.stream) {
              Object.defineProperty(recordset, "columns", {
                enumerable: false,
                configurable: true,
                value: columns
              });
              Object.defineProperty(recordset, "toTable", {
                enumerable: false,
                configurable: true,
                value(name) {
                  return Table.fromRecordset(this, name);
                }
              });
              recordsets.push(recordset);
            }
            recordset = [];
            columns = {};
          });
          req.on("doneProc", (rowCount, more, returnStatus) => {
            returnValue = returnStatus;
          });
          req.on("returnValue", (parameterName, value, metadata) => {
            output[parameterName] = value;
          });
          try {
            for (const name in this.parameters) {
              if (!objectHasProperty(this.parameters, name)) {
                continue;
              }
              const param = this.parameters[name];
              if (param.io === 1) {
                req.addParameter(param.name, getTediousType(param.type), parameterCorrection(param.value), { length: param.length, scale: param.scale, precision: param.precision });
              } else {
                req.addOutputParameter(param.name, getTediousType(param.type), parameterCorrection(param.value), { length: param.length, scale: param.scale, precision: param.precision });
              }
            }
            connection.callProcedure(req);
          } catch (error2) {
            const err3 = error2 instanceof RequestError ? error2 : new RequestError(error2, "EREQUEST");
            delete this._cancel;
            if (!hasReturned) {
              for (const event in errorHandlers) {
                connection.removeListener(event, errorHandlers[event]);
              }
              this.parent.release(connection);
              hasReturned = true;
              callback(err3);
            }
          }
        });
      });
    }
    _pause() {
      super._pause();
      if (this._currentRequest) {
        this._currentRequest.pause();
      }
    }
    _resume() {
      super._resume();
      if (this._currentRequest) {
        this._currentRequest.resume();
      }
    }
  }
  request = Request;
  return request;
}
var hasRequiredTedious;
function requireTedious() {
  if (hasRequiredTedious) return tedious.exports;
  hasRequiredTedious = 1;
  (function(module) {
    const base2 = requireBase();
    const ConnectionPool = requireConnectionPool();
    const Transaction = requireTransaction();
    const Request = requireRequest();
    module.exports = Object.assign({
      ConnectionPool,
      Transaction,
      Request,
      PreparedStatement: base2.PreparedStatement
    }, base2.exports);
    Object.defineProperty(module.exports, "Promise", {
      enumerable: true,
      get: () => {
        return base2.Promise;
      },
      set: (value) => {
        base2.Promise = value;
      }
    });
    Object.defineProperty(module.exports, "valueHandler", {
      enumerable: true,
      value: base2.valueHandler,
      writable: false,
      configurable: false
    });
    base2.driver.name = "tedious";
    base2.driver.ConnectionPool = ConnectionPool;
    base2.driver.Transaction = Transaction;
    base2.driver.Request = Request;
  })(tedious);
  return tedious.exports;
}
var mssql$1;
var hasRequiredMssql;
function requireMssql() {
  if (hasRequiredMssql) return mssql$1;
  hasRequiredMssql = 1;
  mssql$1 = requireTedious();
  return mssql$1;
}
var mssqlExports = requireMssql();
const mssql = /* @__PURE__ */ getDefaultExportFromCjs(mssqlExports);
const index = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: mssql
}, [mssqlExports]);
export {
  index as i,
  mssql as m
};
