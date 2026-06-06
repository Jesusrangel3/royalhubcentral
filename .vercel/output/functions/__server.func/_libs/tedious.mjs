import require$$0$4 from "dns";
import require$$5$2 from "constants";
import require$$0$2 from "dgram";
import require$$2 from "node:url";
import require$$0$1 from "events";
import require$$0 from "stream";
import require$$1 from "crypto";
import require$$0$6 from "os";
import require$$1$1 from "tls";
import require$$0$3 from "net";
import { r as requireCommonjs$1 } from "./@azure/identity.mjs";
import { r as requireCommonjs } from "./azure__core-auth.mjs";
import require$$5 from "util";
import { r as requireSprintf } from "./sprintf-js.mjs";
import { r as requireMd4 } from "./js-md4.mjs";
import { r as requireNativeDuplexpair } from "./native-duplexpair.mjs";
import { r as requireBl } from "./bl.mjs";
import { r as require$$0$5 } from "./js-joda__core.mjs";
import { r as requireLib } from "./iconv-lite.mjs";
import { c as commonjsGlobal } from "./react.mjs";
import require$$5$1 from "url";
var tedious = {};
var bulkLoad = { exports: {} };
var writableTrackingBuffer = { exports: {} };
var hasRequiredWritableTrackingBuffer;
function requireWritableTrackingBuffer() {
  if (hasRequiredWritableTrackingBuffer) return writableTrackingBuffer.exports;
  hasRequiredWritableTrackingBuffer = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const SHIFT_LEFT_32 = (1 << 16) * (1 << 16);
    const SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;
    const UNKNOWN_PLP_LEN = Buffer.from([254, 255, 255, 255, 255, 255, 255, 255]);
    const ZERO_LENGTH_BUFFER = Buffer.alloc(0);
    class WritableTrackingBuffer {
      constructor(initialSize, encoding, doubleSizeGrowth) {
        this.initialSize = initialSize;
        this.encoding = encoding || "ucs2";
        this.doubleSizeGrowth = doubleSizeGrowth || false;
        this.buffer = Buffer.alloc(this.initialSize, 0);
        this.compositeBuffer = ZERO_LENGTH_BUFFER;
        this.position = 0;
      }
      get data() {
        this.newBuffer(0);
        return this.compositeBuffer;
      }
      copyFrom(buffer) {
        const length = buffer.length;
        this.makeRoomFor(length);
        buffer.copy(this.buffer, this.position);
        this.position += length;
      }
      makeRoomFor(requiredLength) {
        if (this.buffer.length - this.position < requiredLength) {
          if (this.doubleSizeGrowth) {
            let size = Math.max(128, this.buffer.length * 2);
            while (size < requiredLength) {
              size *= 2;
            }
            this.newBuffer(size);
          } else {
            this.newBuffer(requiredLength);
          }
        }
      }
      newBuffer(size) {
        const buffer = this.buffer.slice(0, this.position);
        this.compositeBuffer = Buffer.concat([this.compositeBuffer, buffer]);
        this.buffer = size === 0 ? ZERO_LENGTH_BUFFER : Buffer.alloc(size, 0);
        this.position = 0;
      }
      writeUInt8(value) {
        const length = 1;
        this.makeRoomFor(length);
        this.buffer.writeUInt8(value, this.position);
        this.position += length;
      }
      writeUInt16LE(value) {
        const length = 2;
        this.makeRoomFor(length);
        this.buffer.writeUInt16LE(value, this.position);
        this.position += length;
      }
      writeUShort(value) {
        this.writeUInt16LE(value);
      }
      writeUInt16BE(value) {
        const length = 2;
        this.makeRoomFor(length);
        this.buffer.writeUInt16BE(value, this.position);
        this.position += length;
      }
      writeUInt24LE(value) {
        const length = 3;
        this.makeRoomFor(length);
        this.buffer[this.position + 2] = value >>> 16 & 255;
        this.buffer[this.position + 1] = value >>> 8 & 255;
        this.buffer[this.position] = value & 255;
        this.position += length;
      }
      writeUInt32LE(value) {
        const length = 4;
        this.makeRoomFor(length);
        this.buffer.writeUInt32LE(value, this.position);
        this.position += length;
      }
      writeBigInt64LE(value) {
        const length = 8;
        this.makeRoomFor(length);
        this.buffer.writeBigInt64LE(value, this.position);
        this.position += length;
      }
      writeInt64LE(value) {
        this.writeBigInt64LE(BigInt(value));
      }
      writeUInt64LE(value) {
        this.writeBigUInt64LE(BigInt(value));
      }
      writeBigUInt64LE(value) {
        const length = 8;
        this.makeRoomFor(length);
        this.buffer.writeBigUInt64LE(value, this.position);
        this.position += length;
      }
      writeUInt32BE(value) {
        const length = 4;
        this.makeRoomFor(length);
        this.buffer.writeUInt32BE(value, this.position);
        this.position += length;
      }
      writeUInt40LE(value) {
        this.writeInt32LE(value & -1);
        this.writeUInt8(Math.floor(value * SHIFT_RIGHT_32));
      }
      writeInt8(value) {
        const length = 1;
        this.makeRoomFor(length);
        this.buffer.writeInt8(value, this.position);
        this.position += length;
      }
      writeInt16LE(value) {
        const length = 2;
        this.makeRoomFor(length);
        this.buffer.writeInt16LE(value, this.position);
        this.position += length;
      }
      writeInt16BE(value) {
        const length = 2;
        this.makeRoomFor(length);
        this.buffer.writeInt16BE(value, this.position);
        this.position += length;
      }
      writeInt32LE(value) {
        const length = 4;
        this.makeRoomFor(length);
        this.buffer.writeInt32LE(value, this.position);
        this.position += length;
      }
      writeInt32BE(value) {
        const length = 4;
        this.makeRoomFor(length);
        this.buffer.writeInt32BE(value, this.position);
        this.position += length;
      }
      writeFloatLE(value) {
        const length = 4;
        this.makeRoomFor(length);
        this.buffer.writeFloatLE(value, this.position);
        this.position += length;
      }
      writeDoubleLE(value) {
        const length = 8;
        this.makeRoomFor(length);
        this.buffer.writeDoubleLE(value, this.position);
        this.position += length;
      }
      writeString(value, encoding) {
        if (encoding == null) {
          encoding = this.encoding;
        }
        const length = Buffer.byteLength(value, encoding);
        this.makeRoomFor(length);
        this.buffer.write(value, this.position, encoding);
        this.position += length;
      }
      writeBVarchar(value, encoding) {
        this.writeUInt8(value.length);
        this.writeString(value, encoding);
      }
      writeUsVarchar(value, encoding) {
        this.writeUInt16LE(value.length);
        this.writeString(value, encoding);
      }
      // TODO: Figure out what types are passed in other than `Buffer`
      writeUsVarbyte(value, encoding) {
        if (encoding == null) {
          encoding = this.encoding;
        }
        let length;
        if (value instanceof Buffer) {
          length = value.length;
        } else {
          value = value.toString();
          length = Buffer.byteLength(value, encoding);
        }
        this.writeUInt16LE(length);
        if (value instanceof Buffer) {
          this.writeBuffer(value);
        } else {
          this.makeRoomFor(length);
          this.buffer.write(value, this.position, encoding);
          this.position += length;
        }
      }
      writePLPBody(value, encoding) {
        if (encoding == null) {
          encoding = this.encoding;
        }
        let length;
        if (value instanceof Buffer) {
          length = value.length;
        } else {
          value = value.toString();
          length = Buffer.byteLength(value, encoding);
        }
        this.writeBuffer(UNKNOWN_PLP_LEN);
        if (length > 0) {
          this.writeUInt32LE(length);
          if (value instanceof Buffer) {
            this.writeBuffer(value);
          } else {
            this.makeRoomFor(length);
            this.buffer.write(value, this.position, encoding);
            this.position += length;
          }
        }
        this.writeUInt32LE(0);
      }
      writeBuffer(value) {
        const length = value.length;
        this.makeRoomFor(length);
        value.copy(this.buffer, this.position);
        this.position += length;
      }
      writeMoney(value) {
        this.writeInt32LE(Math.floor(value * SHIFT_RIGHT_32));
        this.writeInt32LE(value & -1);
      }
    }
    exports.default = WritableTrackingBuffer;
    module.exports = WritableTrackingBuffer;
  })(writableTrackingBuffer, writableTrackingBuffer.exports);
  return writableTrackingBuffer.exports;
}
var token = {};
var hasRequiredToken;
function requireToken() {
  if (hasRequiredToken) return token;
  hasRequiredToken = 1;
  Object.defineProperty(token, "__esModule", {
    value: true
  });
  token.Token = token.TYPE = token.SSPIToken = token.RowToken = token.RoutingEnvChangeToken = token.RollbackTransactionEnvChangeToken = token.ReturnValueToken = token.ReturnStatusToken = token.ResetConnectionEnvChangeToken = token.PacketSizeEnvChangeToken = token.OrderToken = token.NBCRowToken = token.LoginAckToken = token.LanguageEnvChangeToken = token.InfoMessageToken = token.FedAuthInfoToken = token.FeatureExtAckToken = token.ErrorMessageToken = token.DoneToken = token.DoneProcToken = token.DoneInProcToken = token.DatabaseMirroringPartnerEnvChangeToken = token.DatabaseEnvChangeToken = token.CommitTransactionEnvChangeToken = token.CollationChangeToken = token.ColMetadataToken = token.CharsetEnvChangeToken = token.BeginTransactionEnvChangeToken = void 0;
  token.TYPE = {
    ALTMETADATA: 136,
    ALTROW: 211,
    COLMETADATA: 129,
    COLINFO: 165,
    DONE: 253,
    DONEPROC: 254,
    DONEINPROC: 255,
    ENVCHANGE: 227,
    ERROR: 170,
    FEATUREEXTACK: 174,
    FEDAUTHINFO: 238,
    INFO: 171,
    LOGINACK: 173,
    NBCROW: 210,
    OFFSET: 120,
    ORDER: 169,
    RETURNSTATUS: 121,
    RETURNVALUE: 172,
    ROW: 209,
    SSPI: 237,
    TABNAME: 164
  };
  class Token {
    constructor(name, handlerName) {
      this.name = name;
      this.handlerName = handlerName;
    }
  }
  token.Token = Token;
  class ColMetadataToken extends Token {
    constructor(columns) {
      super("COLMETADATA", "onColMetadata");
      this.columns = columns;
    }
  }
  token.ColMetadataToken = ColMetadataToken;
  class DoneToken extends Token {
    constructor({
      more,
      sqlError,
      attention,
      serverError,
      rowCount,
      curCmd
    }) {
      super("DONE", "onDone");
      this.more = more;
      this.sqlError = sqlError;
      this.attention = attention;
      this.serverError = serverError;
      this.rowCount = rowCount;
      this.curCmd = curCmd;
    }
  }
  token.DoneToken = DoneToken;
  class DoneInProcToken extends Token {
    constructor({
      more,
      sqlError,
      attention,
      serverError,
      rowCount,
      curCmd
    }) {
      super("DONEINPROC", "onDoneInProc");
      this.more = more;
      this.sqlError = sqlError;
      this.attention = attention;
      this.serverError = serverError;
      this.rowCount = rowCount;
      this.curCmd = curCmd;
    }
  }
  token.DoneInProcToken = DoneInProcToken;
  class DoneProcToken extends Token {
    constructor({
      more,
      sqlError,
      attention,
      serverError,
      rowCount,
      curCmd
    }) {
      super("DONEPROC", "onDoneProc");
      this.more = more;
      this.sqlError = sqlError;
      this.attention = attention;
      this.serverError = serverError;
      this.rowCount = rowCount;
      this.curCmd = curCmd;
    }
  }
  token.DoneProcToken = DoneProcToken;
  class DatabaseEnvChangeToken extends Token {
    constructor(newValue, oldValue) {
      super("ENVCHANGE", "onDatabaseChange");
      this.type = "DATABASE";
      this.newValue = newValue;
      this.oldValue = oldValue;
    }
  }
  token.DatabaseEnvChangeToken = DatabaseEnvChangeToken;
  class LanguageEnvChangeToken extends Token {
    constructor(newValue, oldValue) {
      super("ENVCHANGE", "onLanguageChange");
      this.type = "LANGUAGE";
      this.newValue = newValue;
      this.oldValue = oldValue;
    }
  }
  token.LanguageEnvChangeToken = LanguageEnvChangeToken;
  class CharsetEnvChangeToken extends Token {
    constructor(newValue, oldValue) {
      super("ENVCHANGE", "onCharsetChange");
      this.type = "CHARSET";
      this.newValue = newValue;
      this.oldValue = oldValue;
    }
  }
  token.CharsetEnvChangeToken = CharsetEnvChangeToken;
  class PacketSizeEnvChangeToken extends Token {
    constructor(newValue, oldValue) {
      super("ENVCHANGE", "onPacketSizeChange");
      this.type = "PACKET_SIZE";
      this.newValue = newValue;
      this.oldValue = oldValue;
    }
  }
  token.PacketSizeEnvChangeToken = PacketSizeEnvChangeToken;
  class BeginTransactionEnvChangeToken extends Token {
    constructor(newValue, oldValue) {
      super("ENVCHANGE", "onBeginTransaction");
      this.type = "BEGIN_TXN";
      this.newValue = newValue;
      this.oldValue = oldValue;
    }
  }
  token.BeginTransactionEnvChangeToken = BeginTransactionEnvChangeToken;
  class CommitTransactionEnvChangeToken extends Token {
    constructor(newValue, oldValue) {
      super("ENVCHANGE", "onCommitTransaction");
      this.type = "COMMIT_TXN";
      this.newValue = newValue;
      this.oldValue = oldValue;
    }
  }
  token.CommitTransactionEnvChangeToken = CommitTransactionEnvChangeToken;
  class RollbackTransactionEnvChangeToken extends Token {
    constructor(newValue, oldValue) {
      super("ENVCHANGE", "onRollbackTransaction");
      this.type = "ROLLBACK_TXN";
      this.newValue = newValue;
      this.oldValue = oldValue;
    }
  }
  token.RollbackTransactionEnvChangeToken = RollbackTransactionEnvChangeToken;
  class DatabaseMirroringPartnerEnvChangeToken extends Token {
    constructor(newValue, oldValue) {
      super("ENVCHANGE", "onDatabaseMirroringPartner");
      this.type = "DATABASE_MIRRORING_PARTNER";
      this.newValue = newValue;
      this.oldValue = oldValue;
    }
  }
  token.DatabaseMirroringPartnerEnvChangeToken = DatabaseMirroringPartnerEnvChangeToken;
  class ResetConnectionEnvChangeToken extends Token {
    constructor(newValue, oldValue) {
      super("ENVCHANGE", "onResetConnection");
      this.type = "RESET_CONNECTION";
      this.newValue = newValue;
      this.oldValue = oldValue;
    }
  }
  token.ResetConnectionEnvChangeToken = ResetConnectionEnvChangeToken;
  class CollationChangeToken extends Token {
    constructor(newValue, oldValue) {
      super("ENVCHANGE", "onSqlCollationChange");
      this.type = "SQL_COLLATION";
      this.newValue = newValue;
      this.oldValue = oldValue;
    }
  }
  token.CollationChangeToken = CollationChangeToken;
  class RoutingEnvChangeToken extends Token {
    constructor(newValue, oldValue) {
      super("ENVCHANGE", "onRoutingChange");
      this.type = "ROUTING_CHANGE";
      this.newValue = newValue;
      this.oldValue = oldValue;
    }
  }
  token.RoutingEnvChangeToken = RoutingEnvChangeToken;
  class FeatureExtAckToken extends Token {
    /** Value of UTF8_SUPPORT acknowledgement.
     *
     * undefined when UTF8_SUPPORT not included in token. */
    constructor(fedAuth, utf8Support) {
      super("FEATUREEXTACK", "onFeatureExtAck");
      this.fedAuth = fedAuth;
      this.utf8Support = utf8Support;
    }
  }
  token.FeatureExtAckToken = FeatureExtAckToken;
  class FedAuthInfoToken extends Token {
    constructor(spn, stsurl) {
      super("FEDAUTHINFO", "onFedAuthInfo");
      this.spn = spn;
      this.stsurl = stsurl;
    }
  }
  token.FedAuthInfoToken = FedAuthInfoToken;
  class InfoMessageToken extends Token {
    constructor({
      number,
      state,
      class: clazz,
      message: message2,
      serverName,
      procName,
      lineNumber
    }) {
      super("INFO", "onInfoMessage");
      this.number = number;
      this.state = state;
      this.class = clazz;
      this.message = message2;
      this.serverName = serverName;
      this.procName = procName;
      this.lineNumber = lineNumber;
    }
  }
  token.InfoMessageToken = InfoMessageToken;
  class ErrorMessageToken extends Token {
    constructor({
      number,
      state,
      class: clazz,
      message: message2,
      serverName,
      procName,
      lineNumber
    }) {
      super("ERROR", "onErrorMessage");
      this.number = number;
      this.state = state;
      this.class = clazz;
      this.message = message2;
      this.serverName = serverName;
      this.procName = procName;
      this.lineNumber = lineNumber;
    }
  }
  token.ErrorMessageToken = ErrorMessageToken;
  class LoginAckToken extends Token {
    constructor({
      interface: interfaze,
      tdsVersion,
      progName,
      progVersion
    }) {
      super("LOGINACK", "onLoginAck");
      this.interface = interfaze;
      this.tdsVersion = tdsVersion;
      this.progName = progName;
      this.progVersion = progVersion;
    }
  }
  token.LoginAckToken = LoginAckToken;
  class NBCRowToken extends Token {
    constructor(columns) {
      super("NBCROW", "onRow");
      this.columns = columns;
    }
  }
  token.NBCRowToken = NBCRowToken;
  class OrderToken extends Token {
    constructor(orderColumns) {
      super("ORDER", "onOrder");
      this.orderColumns = orderColumns;
    }
  }
  token.OrderToken = OrderToken;
  class ReturnStatusToken extends Token {
    constructor(value) {
      super("RETURNSTATUS", "onReturnStatus");
      this.value = value;
    }
  }
  token.ReturnStatusToken = ReturnStatusToken;
  class ReturnValueToken extends Token {
    constructor({
      paramOrdinal,
      paramName,
      metadata,
      value
    }) {
      super("RETURNVALUE", "onReturnValue");
      this.paramOrdinal = paramOrdinal;
      this.paramName = paramName;
      this.metadata = metadata;
      this.value = value;
    }
  }
  token.ReturnValueToken = ReturnValueToken;
  class RowToken extends Token {
    constructor(columns) {
      super("ROW", "onRow");
      this.columns = columns;
    }
  }
  token.RowToken = RowToken;
  class SSPIToken extends Token {
    constructor(ntlmpacket, ntlmpacketBuffer) {
      super("SSPICHALLENGE", "onSSPI");
      this.ntlmpacket = ntlmpacket;
      this.ntlmpacketBuffer = ntlmpacketBuffer;
    }
  }
  token.SSPIToken = SSPIToken;
  return token;
}
var hasRequiredBulkLoad;
function requireBulkLoad() {
  if (hasRequiredBulkLoad) return bulkLoad.exports;
  hasRequiredBulkLoad = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _events = require$$0$1;
    var _writableTrackingBuffer = _interopRequireDefault(requireWritableTrackingBuffer());
    var _stream = require$$0;
    var _token = requireToken();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const FLAGS = {
      nullable: 1 << 0,
      updateableReadWrite: 1 << 2,
      // introduced in TDS 7.2
      nullableUnknown: 1 << 15
      // introduced in TDS 7.2
    };
    const DONE_STATUS = {
      FINAL: 0
    };
    const rowTokenBuffer = Buffer.from([_token.TYPE.ROW]);
    const textPointerAndTimestampBuffer = Buffer.from([
      // TextPointer length
      16,
      // TextPointer
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // Timestamp
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ]);
    const textPointerNullBuffer = Buffer.from([0]);
    class RowTransform extends _stream.Transform {
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      constructor(bulkLoad2) {
        super({
          writableObjectMode: true
        });
        this.bulkLoad = bulkLoad2;
        this.mainOptions = bulkLoad2.options;
        this.columns = bulkLoad2.columns;
        this.columnMetadataWritten = false;
      }
      /**
       * @private
       */
      _transform(row, _encoding, callback) {
        if (!this.columnMetadataWritten) {
          this.push(this.bulkLoad.getColMetaData());
          this.columnMetadataWritten = true;
        }
        this.push(rowTokenBuffer);
        for (let i = 0; i < this.columns.length; i++) {
          const c = this.columns[i];
          let value = Array.isArray(row) ? row[i] : row[c.objName];
          if (!this.bulkLoad.firstRowWritten) {
            try {
              value = c.type.validate(value, c.collation);
            } catch (error) {
              return callback(error);
            }
          }
          const parameter = {
            length: c.length,
            scale: c.scale,
            precision: c.precision,
            value
          };
          if (c.type.name === "Text" || c.type.name === "Image" || c.type.name === "NText") {
            if (value == null) {
              this.push(textPointerNullBuffer);
              continue;
            }
            this.push(textPointerAndTimestampBuffer);
          }
          try {
            this.push(c.type.generateParameterLength(parameter, this.mainOptions));
            for (const chunk of c.type.generateParameterData(parameter, this.mainOptions)) {
              this.push(chunk);
            }
          } catch (error) {
            return callback(error);
          }
        }
        process.nextTick(callback);
      }
      /**
       * @private
       */
      _flush(callback) {
        this.push(this.bulkLoad.createDoneToken());
        process.nextTick(callback);
      }
    }
    class BulkLoad extends _events.EventEmitter {
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      constructor(table, collation2, connectionOptions, {
        checkConstraints = false,
        fireTriggers = false,
        keepNulls = false,
        lockTable = false,
        order = {}
      }, callback) {
        if (typeof checkConstraints !== "boolean") {
          throw new TypeError('The "options.checkConstraints" property must be of type boolean.');
        }
        if (typeof fireTriggers !== "boolean") {
          throw new TypeError('The "options.fireTriggers" property must be of type boolean.');
        }
        if (typeof keepNulls !== "boolean") {
          throw new TypeError('The "options.keepNulls" property must be of type boolean.');
        }
        if (typeof lockTable !== "boolean") {
          throw new TypeError('The "options.lockTable" property must be of type boolean.');
        }
        if (typeof order !== "object" || order === null) {
          throw new TypeError('The "options.order" property must be of type object.');
        }
        for (const [column, direction] of Object.entries(order)) {
          if (direction !== "ASC" && direction !== "DESC") {
            throw new TypeError('The value of the "' + column + '" key in the "options.order" object must be either "ASC" or "DESC".');
          }
        }
        super();
        this.error = void 0;
        this.canceled = false;
        this.executionStarted = false;
        this.collation = collation2;
        this.table = table;
        this.options = connectionOptions;
        this.callback = callback;
        this.columns = [];
        this.columnsByName = {};
        this.firstRowWritten = false;
        this.streamingMode = false;
        this.rowToPacketTransform = new RowTransform(this);
        this.bulkOptions = {
          checkConstraints,
          fireTriggers,
          keepNulls,
          lockTable,
          order
        };
      }
      /**
       * Adds a column to the bulk load.
       *
       * The column definitions should match the table you are trying to insert into.
       * Attempting to call addColumn after the first row has been added will throw an exception.
       *
       * ```js
       * bulkLoad.addColumn('MyIntColumn', TYPES.Int, { nullable: false });
       * ```
       *
       * @param name The name of the column.
       * @param type One of the supported `data types`.
       * @param __namedParameters Additional column type information. At a minimum, `nullable` must be set to true or false.
       * @param length For VarChar, NVarChar, VarBinary. Use length as `Infinity` for VarChar(max), NVarChar(max) and VarBinary(max).
       * @param nullable Indicates whether the column accepts NULL values.
       * @param objName If the name of the column is different from the name of the property found on `rowObj` arguments passed to [[addRow]] or [[Connection.execBulkLoad]], then you can use this option to specify the property name.
       * @param precision For Numeric, Decimal.
       * @param scale For Numeric, Decimal, Time, DateTime2, DateTimeOffset.
      */
      addColumn(name, type, {
        output = false,
        length,
        precision,
        scale,
        objName = name,
        nullable = true
      }) {
        if (this.firstRowWritten) {
          throw new Error("Columns cannot be added to bulk insert after the first row has been written.");
        }
        if (this.executionStarted) {
          throw new Error("Columns cannot be added to bulk insert after execution has started.");
        }
        const column = {
          type,
          name,
          value: null,
          output,
          length,
          precision,
          scale,
          objName,
          nullable,
          collation: this.collation
        };
        if ((type.id & 48) === 32) {
          if (column.length == null && type.resolveLength) {
            column.length = type.resolveLength(column);
          }
        }
        if (type.resolvePrecision && column.precision == null) {
          column.precision = type.resolvePrecision(column);
        }
        if (type.resolveScale && column.scale == null) {
          column.scale = type.resolveScale(column);
        }
        this.columns.push(column);
        this.columnsByName[name] = column;
      }
      /**
       * @private
       */
      getOptionsSql() {
        const addOptions = [];
        if (this.bulkOptions.checkConstraints) {
          addOptions.push("CHECK_CONSTRAINTS");
        }
        if (this.bulkOptions.fireTriggers) {
          addOptions.push("FIRE_TRIGGERS");
        }
        if (this.bulkOptions.keepNulls) {
          addOptions.push("KEEP_NULLS");
        }
        if (this.bulkOptions.lockTable) {
          addOptions.push("TABLOCK");
        }
        if (this.bulkOptions.order) {
          const orderColumns = [];
          for (const [column, direction] of Object.entries(this.bulkOptions.order)) {
            orderColumns.push(`${column} ${direction}`);
          }
          if (orderColumns.length) {
            addOptions.push(`ORDER (${orderColumns.join(", ")})`);
          }
        }
        if (addOptions.length > 0) {
          return ` WITH (${addOptions.join(",")})`;
        } else {
          return "";
        }
      }
      /**
       * @private
       */
      getBulkInsertSql() {
        let sql = "insert bulk " + this.table + "(";
        for (let i = 0, len = this.columns.length; i < len; i++) {
          const c = this.columns[i];
          if (i !== 0) {
            sql += ", ";
          }
          sql += "[" + c.name + "] " + c.type.declaration(c);
        }
        sql += ")";
        sql += this.getOptionsSql();
        return sql;
      }
      /**
       * This is simply a helper utility function which returns a `CREATE TABLE SQL` statement based on the columns added to the bulkLoad object.
       * This may be particularly handy when you want to insert into a temporary table (a table which starts with `#`).
       *
       * ```js
       * var sql = bulkLoad.getTableCreationSql();
       * ```
       *
       * A side note on bulk inserting into temporary tables: if you want to access a local temporary table after executing the bulk load,
       * you'll need to use the same connection and execute your requests using [[Connection.execSqlBatch]] instead of [[Connection.execSql]]
       */
      getTableCreationSql() {
        let sql = "CREATE TABLE " + this.table + "(\n";
        for (let i = 0, len = this.columns.length; i < len; i++) {
          const c = this.columns[i];
          if (i !== 0) {
            sql += ",\n";
          }
          sql += "[" + c.name + "] " + c.type.declaration(c);
          if (c.nullable !== void 0) {
            sql += " " + (c.nullable ? "NULL" : "NOT NULL");
          }
        }
        sql += "\n)";
        return sql;
      }
      /**
       * @private
       */
      getColMetaData() {
        const tBuf = new _writableTrackingBuffer.default(100, null, true);
        tBuf.writeUInt8(_token.TYPE.COLMETADATA);
        tBuf.writeUInt16LE(this.columns.length);
        for (let j = 0, len = this.columns.length; j < len; j++) {
          const c = this.columns[j];
          if (this.options.tdsVersion < "7_2") {
            tBuf.writeUInt16LE(0);
          } else {
            tBuf.writeUInt32LE(0);
          }
          let flags = FLAGS.updateableReadWrite;
          if (c.nullable) {
            flags |= FLAGS.nullable;
          } else if (c.nullable === void 0 && this.options.tdsVersion >= "7_2") {
            flags |= FLAGS.nullableUnknown;
          }
          tBuf.writeUInt16LE(flags);
          tBuf.writeBuffer(c.type.generateTypeInfo(c, this.options));
          if (c.type.hasTableName) {
            tBuf.writeUsVarchar(this.table, "ucs2");
          }
          tBuf.writeBVarchar(c.name, "ucs2");
        }
        return tBuf.data;
      }
      /**
       * Sets a timeout for this bulk load.
       *
       * ```js
       * bulkLoad.setTimeout(timeout);
       * ```
       *
       * @param timeout The number of milliseconds before the bulk load is considered failed, or 0 for no timeout.
       *   When no timeout is set for the bulk load, the [[ConnectionOptions.requestTimeout]] of the Connection is used.
       */
      setTimeout(timeout) {
        this.timeout = timeout;
      }
      /**
       * @private
       */
      createDoneToken() {
        const tBuf = new _writableTrackingBuffer.default(this.options.tdsVersion < "7_2" ? 9 : 13);
        tBuf.writeUInt8(_token.TYPE.DONE);
        const status = DONE_STATUS.FINAL;
        tBuf.writeUInt16LE(status);
        tBuf.writeUInt16LE(0);
        tBuf.writeUInt32LE(0);
        if (this.options.tdsVersion >= "7_2") {
          tBuf.writeUInt32LE(0);
        }
        return tBuf.data;
      }
      /**
       * @private
       */
      cancel() {
        if (this.canceled) {
          return;
        }
        this.canceled = true;
        this.emit("cancel");
      }
    }
    exports.default = BulkLoad;
    module.exports = BulkLoad;
  })(bulkLoad, bulkLoad.exports);
  return bulkLoad.exports;
}
var connection = { exports: {} };
var debug = { exports: {} };
var hasRequiredDebug;
function requireDebug() {
  if (hasRequiredDebug) return debug.exports;
  hasRequiredDebug = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _events = require$$0$1;
    var util = _interopRequireWildcard(require$$5);
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, default: e2 };
        if (null === e2 || "object" != typeof e2 && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (const t3 in e2) "default" !== t3 && {}.hasOwnProperty.call(e2, t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, t3)) && (i.get || i.set) ? o(f, t3, i) : f[t3] = e2[t3]);
        return f;
      })(e, t);
    }
    class Debug extends _events.EventEmitter {
      /*
        @options    Which debug details should be sent.
                    data    - dump of packet data
                    payload - details of decoded payload
      */
      constructor({
        data = false,
        payload = false,
        packet: packet2 = false,
        token: token2 = false
      } = {}) {
        super();
        this.options = {
          data,
          payload,
          packet: packet2,
          token: token2
        };
        this.indent = "  ";
      }
      packet(direction, packet2) {
        if (this.haveListeners() && this.options.packet) {
          this.log("");
          this.log(direction);
          this.log(packet2.headerToString(this.indent));
        }
      }
      data(packet2) {
        if (this.haveListeners() && this.options.data) {
          this.log(packet2.dataToString(this.indent));
        }
      }
      payload(generatePayloadText) {
        if (this.haveListeners() && this.options.payload) {
          this.log(generatePayloadText());
        }
      }
      token(token2) {
        if (this.haveListeners() && this.options.token) {
          this.log(util.inspect(token2, {
            showHidden: false,
            depth: 5,
            colors: true
          }));
        }
      }
      haveListeners() {
        return this.listeners("debug").length > 0;
      }
      log(text2) {
        this.emit("debug", text2);
      }
    }
    exports.default = Debug;
    module.exports = Debug;
  })(debug, debug.exports);
  return debug.exports;
}
var instanceLookup = {};
var sender = {};
var hasRequiredSender;
function requireSender() {
  if (hasRequiredSender) return sender;
  hasRequiredSender = 1;
  Object.defineProperty(sender, "__esModule", {
    value: true
  });
  sender.sendInParallel = sendInParallel;
  sender.sendMessage = sendMessage;
  var _dgram = _interopRequireDefault(require$$0$2);
  var _net = _interopRequireDefault(require$$0$3);
  var _nodeUrl = _interopRequireDefault(require$$2);
  function _interopRequireDefault(e) {
    return e && e.__esModule ? e : { default: e };
  }
  async function sendInParallel(addresses, port, request2, signal) {
    signal.throwIfAborted();
    return await new Promise((resolve, reject) => {
      const sockets = [];
      let errorCount = 0;
      const onError = (err) => {
        errorCount++;
        if (errorCount === addresses.length) {
          signal.removeEventListener("abort", onAbort);
          clearSockets();
          reject(err);
        }
      };
      const onMessage = (message2) => {
        signal.removeEventListener("abort", onAbort);
        clearSockets();
        resolve(message2);
      };
      const onAbort = () => {
        clearSockets();
        reject(signal.reason);
      };
      const clearSockets = () => {
        for (const socket of sockets) {
          socket.removeListener("error", onError);
          socket.removeListener("message", onMessage);
          socket.close();
        }
      };
      signal.addEventListener("abort", onAbort, {
        once: true
      });
      for (let j = 0; j < addresses.length; j++) {
        const udpType = addresses[j].family === 6 ? "udp6" : "udp4";
        const socket = _dgram.default.createSocket(udpType);
        sockets.push(socket);
        socket.on("error", onError);
        socket.on("message", onMessage);
        socket.send(request2, 0, request2.length, port, addresses[j].address);
      }
    });
  }
  async function sendMessage(host, port, lookup, signal, request2) {
    signal.throwIfAborted();
    let addresses;
    if (_net.default.isIP(host)) {
      addresses = [{
        address: host,
        family: _net.default.isIPv6(host) ? 6 : 4
      }];
    } else {
      addresses = await new Promise((resolve, reject) => {
        const onAbort = () => {
          reject(signal.reason);
        };
        const domainInASCII = _nodeUrl.default.domainToASCII(host);
        lookup(domainInASCII === "" ? host : domainInASCII, {
          all: true
        }, (err, addresses2) => {
          signal.removeEventListener("abort", onAbort);
          err ? reject(err) : resolve(addresses2);
        });
      });
    }
    return await sendInParallel(addresses, port, request2, signal);
  }
  return sender;
}
var hasRequiredInstanceLookup;
function requireInstanceLookup() {
  if (hasRequiredInstanceLookup) return instanceLookup;
  hasRequiredInstanceLookup = 1;
  Object.defineProperty(instanceLookup, "__esModule", {
    value: true
  });
  instanceLookup.instanceLookup = instanceLookup$1;
  instanceLookup.parseBrowserResponse = parseBrowserResponse;
  var _dns = _interopRequireDefault(require$$0$4);
  var _sender = requireSender();
  function _interopRequireDefault(e) {
    return e && e.__esModule ? e : { default: e };
  }
  const SQL_SERVER_BROWSER_PORT = 1434;
  const TIMEOUT = 2 * 1e3;
  const RETRIES = 3;
  const MYSTERY_HEADER_LENGTH = 3;
  async function instanceLookup$1(options) {
    const server = options.server;
    if (typeof server !== "string") {
      throw new TypeError('Invalid arguments: "server" must be a string');
    }
    const instanceName = options.instanceName;
    if (typeof instanceName !== "string") {
      throw new TypeError('Invalid arguments: "instanceName" must be a string');
    }
    const timeout = options.timeout === void 0 ? TIMEOUT : options.timeout;
    if (typeof timeout !== "number") {
      throw new TypeError('Invalid arguments: "timeout" must be a number');
    }
    const retries = options.retries === void 0 ? RETRIES : options.retries;
    if (typeof retries !== "number") {
      throw new TypeError('Invalid arguments: "retries" must be a number');
    }
    if (options.lookup !== void 0 && typeof options.lookup !== "function") {
      throw new TypeError('Invalid arguments: "lookup" must be a function');
    }
    const lookup = options.lookup ?? _dns.default.lookup;
    if (options.port !== void 0 && typeof options.port !== "number") {
      throw new TypeError('Invalid arguments: "port" must be a number');
    }
    const port = options.port ?? SQL_SERVER_BROWSER_PORT;
    const signal = options.signal;
    signal.throwIfAborted();
    let response;
    const request2 = Buffer.from([2]);
    for (let i = 0; i <= retries; i++) {
      const timeoutSignal = AbortSignal.timeout(timeout);
      try {
        response = await (0, _sender.sendMessage)(options.server, port, lookup, AbortSignal.any([signal, timeoutSignal]), request2);
      } catch (err) {
        if (timeoutSignal.aborted) {
          continue;
        }
        throw err;
      }
    }
    if (!response) {
      throw new Error("Failed to get response from SQL Server Browser on " + server);
    }
    const message2 = response.toString("ascii", MYSTERY_HEADER_LENGTH);
    const foundPort = parseBrowserResponse(message2, instanceName);
    if (!foundPort) {
      throw new Error("Port for " + instanceName + " not found in " + options.server);
    }
    return foundPort;
  }
  function parseBrowserResponse(response, instanceName) {
    let getPort;
    const instances = response.split(";;");
    for (let i = 0, len = instances.length; i < len; i++) {
      const instance = instances[i];
      const parts = instance.split(";");
      for (let p = 0, partsLen = parts.length; p < partsLen; p += 2) {
        const name = parts[p];
        const value = parts[p + 1];
        if (name === "tcp" && getPort) {
          const port = parseInt(value, 10);
          return port;
        }
        if (name === "InstanceName") {
          if (value.toUpperCase() === instanceName.toUpperCase()) {
            getPort = true;
          } else {
            getPort = false;
          }
        }
      }
    }
  }
  return instanceLookup;
}
var transientErrorLookup = {};
var hasRequiredTransientErrorLookup;
function requireTransientErrorLookup() {
  if (hasRequiredTransientErrorLookup) return transientErrorLookup;
  hasRequiredTransientErrorLookup = 1;
  Object.defineProperty(transientErrorLookup, "__esModule", {
    value: true
  });
  transientErrorLookup.TransientErrorLookup = void 0;
  class TransientErrorLookup {
    isTransientError(error) {
      const transientErrors = [4060, 10928, 10929, 40197, 40501, 40613];
      return transientErrors.indexOf(error) !== -1;
    }
  }
  transientErrorLookup.TransientErrorLookup = TransientErrorLookup;
  return transientErrorLookup;
}
var packet = {};
var hasRequiredPacket;
function requirePacket() {
  if (hasRequiredPacket) return packet;
  hasRequiredPacket = 1;
  Object.defineProperty(packet, "__esModule", {
    value: true
  });
  packet.TYPE = packet.Packet = packet.OFFSET = packet.HEADER_LENGTH = void 0;
  packet.isPacketComplete = isPacketComplete;
  packet.packetLength = packetLength;
  var _sprintfJs = requireSprintf();
  const HEADER_LENGTH = packet.HEADER_LENGTH = 8;
  const TYPE = packet.TYPE = {
    SQL_BATCH: 1,
    RPC_REQUEST: 3,
    TABULAR_RESULT: 4,
    ATTENTION: 6,
    BULK_LOAD: 7,
    TRANSACTION_MANAGER: 14,
    LOGIN7: 16,
    NTLMAUTH_PKT: 17,
    PRELOGIN: 18,
    FEDAUTH_TOKEN: 8
  };
  const typeByValue = {};
  for (const name in TYPE) {
    typeByValue[TYPE[name]] = name;
  }
  const STATUS = {
    NORMAL: 0,
    EOM: 1,
    IGNORE: 2,
    RESETCONNECTION: 8,
    RESETCONNECTIONSKIPTRAN: 16
  };
  const OFFSET = packet.OFFSET = {
    Type: 0,
    Status: 1,
    Length: 2,
    SPID: 4,
    PacketID: 6,
    Window: 7
  };
  const DEFAULT_SPID = 0;
  const DEFAULT_PACKETID = 1;
  const DEFAULT_WINDOW = 0;
  const NL = "\n";
  class Packet {
    constructor(typeOrBuffer) {
      if (typeOrBuffer instanceof Buffer) {
        this.buffer = typeOrBuffer;
      } else {
        const type = typeOrBuffer;
        this.buffer = Buffer.alloc(HEADER_LENGTH, 0);
        this.buffer.writeUInt8(type, OFFSET.Type);
        this.buffer.writeUInt8(STATUS.NORMAL, OFFSET.Status);
        this.buffer.writeUInt16BE(DEFAULT_SPID, OFFSET.SPID);
        this.buffer.writeUInt8(DEFAULT_PACKETID, OFFSET.PacketID);
        this.buffer.writeUInt8(DEFAULT_WINDOW, OFFSET.Window);
        this.setLength();
      }
    }
    setLength() {
      this.buffer.writeUInt16BE(this.buffer.length, OFFSET.Length);
    }
    length() {
      return this.buffer.readUInt16BE(OFFSET.Length);
    }
    resetConnection(reset) {
      let status = this.buffer.readUInt8(OFFSET.Status);
      if (reset) {
        status |= STATUS.RESETCONNECTION;
      } else {
        status &= 255 - STATUS.RESETCONNECTION;
      }
      this.buffer.writeUInt8(status, OFFSET.Status);
    }
    last(last) {
      let status = this.buffer.readUInt8(OFFSET.Status);
      if (arguments.length > 0) {
        if (last) {
          status |= STATUS.EOM;
        } else {
          status &= 255 - STATUS.EOM;
        }
        this.buffer.writeUInt8(status, OFFSET.Status);
      }
      return this.isLast();
    }
    ignore(last) {
      let status = this.buffer.readUInt8(OFFSET.Status);
      if (last) {
        status |= STATUS.IGNORE;
      } else {
        status &= 255 - STATUS.IGNORE;
      }
      this.buffer.writeUInt8(status, OFFSET.Status);
    }
    isLast() {
      return !!(this.buffer.readUInt8(OFFSET.Status) & STATUS.EOM);
    }
    packetId(packetId) {
      if (packetId) {
        this.buffer.writeUInt8(packetId % 256, OFFSET.PacketID);
      }
      return this.buffer.readUInt8(OFFSET.PacketID);
    }
    addData(data) {
      this.buffer = Buffer.concat([this.buffer, data]);
      this.setLength();
      return this;
    }
    data() {
      return this.buffer.slice(HEADER_LENGTH);
    }
    type() {
      return this.buffer.readUInt8(OFFSET.Type);
    }
    statusAsString() {
      const status = this.buffer.readUInt8(OFFSET.Status);
      const statuses = [];
      for (const name in STATUS) {
        const value = STATUS[name];
        if (status & value) {
          statuses.push(name);
        } else {
          statuses.push(void 0);
        }
      }
      return statuses.join(" ").trim();
    }
    headerToString(indent = "") {
      const text2 = (0, _sprintfJs.sprintf)("type:0x%02X(%s), status:0x%02X(%s), length:0x%04X, spid:0x%04X, packetId:0x%02X, window:0x%02X", this.buffer.readUInt8(OFFSET.Type), typeByValue[this.buffer.readUInt8(OFFSET.Type)], this.buffer.readUInt8(OFFSET.Status), this.statusAsString(), this.buffer.readUInt16BE(OFFSET.Length), this.buffer.readUInt16BE(OFFSET.SPID), this.buffer.readUInt8(OFFSET.PacketID), this.buffer.readUInt8(OFFSET.Window));
      return indent + text2;
    }
    dataToString(indent = "") {
      const BYTES_PER_GROUP = 4;
      const CHARS_PER_GROUP = 8;
      const BYTES_PER_LINE = 32;
      const data = this.data();
      let dataDump = "";
      let chars = "";
      for (let offset = 0; offset < data.length; offset++) {
        if (offset % BYTES_PER_LINE === 0) {
          dataDump += indent;
          dataDump += (0, _sprintfJs.sprintf)("%04X  ", offset);
        }
        if (data[offset] < 32 || data[offset] > 126) {
          chars += ".";
          if ((offset + 1) % CHARS_PER_GROUP === 0 && !((offset + 1) % BYTES_PER_LINE === 0)) {
            chars += " ";
          }
        } else {
          chars += String.fromCharCode(data[offset]);
        }
        if (data[offset] != null) {
          dataDump += (0, _sprintfJs.sprintf)("%02X", data[offset]);
        }
        if ((offset + 1) % BYTES_PER_GROUP === 0 && !((offset + 1) % BYTES_PER_LINE === 0)) {
          dataDump += " ";
        }
        if ((offset + 1) % BYTES_PER_LINE === 0) {
          dataDump += "  " + chars;
          chars = "";
          if (offset < data.length - 1) {
            dataDump += NL;
          }
        }
      }
      if (chars.length) {
        dataDump += "  " + chars;
      }
      return dataDump;
    }
    toString(indent = "") {
      return this.headerToString(indent) + "\n" + this.dataToString(indent + indent);
    }
    payloadString() {
      return "";
    }
  }
  packet.Packet = Packet;
  function isPacketComplete(potentialPacketBuffer) {
    if (potentialPacketBuffer.length < HEADER_LENGTH) {
      return false;
    } else {
      return potentialPacketBuffer.length >= potentialPacketBuffer.readUInt16BE(OFFSET.Length);
    }
  }
  function packetLength(potentialPacketBuffer) {
    return potentialPacketBuffer.readUInt16BE(OFFSET.Length);
  }
  return packet;
}
var preloginPayload = { exports: {} };
var hasRequiredPreloginPayload;
function requirePreloginPayload() {
  if (hasRequiredPreloginPayload) return preloginPayload.exports;
  hasRequiredPreloginPayload = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _sprintfJs = requireSprintf();
    var _writableTrackingBuffer = _interopRequireDefault(requireWritableTrackingBuffer());
    var _crypto = require$$1;
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const optionBufferSize = 20;
    const traceIdSize = 36;
    const TOKEN = {
      VERSION: 0,
      ENCRYPTION: 1,
      INSTOPT: 2,
      THREADID: 3,
      MARS: 4,
      TRACEID: 5,
      FEDAUTHREQUIRED: 6,
      TERMINATOR: 255
    };
    const ENCRYPT = {
      OFF: 0,
      ON: 1,
      NOT_SUP: 2,
      REQ: 3
    };
    const encryptByValue = {};
    for (const name in ENCRYPT) {
      const value = ENCRYPT[name];
      encryptByValue[value] = name;
    }
    const MARS = {
      OFF: 0,
      ON: 1
    };
    const marsByValue = {};
    for (const name in MARS) {
      const value = MARS[name];
      marsByValue[value] = name;
    }
    class PreloginPayload {
      constructor(bufferOrOptions = {
        encrypt: false,
        version: {
          major: 0,
          minor: 0,
          build: 0,
          subbuild: 0
        }
      }) {
        if (bufferOrOptions instanceof Buffer) {
          this.data = bufferOrOptions;
          this.options = {
            encrypt: false,
            version: {
              major: 0,
              minor: 0,
              build: 0,
              subbuild: 0
            }
          };
        } else {
          this.options = bufferOrOptions;
          this.createOptions();
        }
        this.extractOptions();
      }
      createOptions() {
        const options = [this.createVersionOption(), this.createEncryptionOption(), this.createInstanceOption(), this.createThreadIdOption(), this.createMarsOption(), this.createTraceIdOption(), this.createFedAuthOption()];
        let length = 0;
        for (let i = 0, len = options.length; i < len; i++) {
          const option = options[i];
          length += 5 + option.data.length;
        }
        length++;
        this.data = Buffer.alloc(length, 0);
        let optionOffset = 0;
        let optionDataOffset = 5 * options.length + 1;
        for (let j = 0, len = options.length; j < len; j++) {
          const option = options[j];
          this.data.writeUInt8(option.token, optionOffset + 0);
          this.data.writeUInt16BE(optionDataOffset, optionOffset + 1);
          this.data.writeUInt16BE(option.data.length, optionOffset + 3);
          optionOffset += 5;
          option.data.copy(this.data, optionDataOffset);
          optionDataOffset += option.data.length;
        }
        this.data.writeUInt8(TOKEN.TERMINATOR, optionOffset);
      }
      createVersionOption() {
        const buffer = new _writableTrackingBuffer.default(optionBufferSize);
        buffer.writeUInt8(this.options.version.major);
        buffer.writeUInt8(this.options.version.minor);
        buffer.writeUInt16BE(this.options.version.build);
        buffer.writeUInt16BE(this.options.version.subbuild);
        return {
          token: TOKEN.VERSION,
          data: buffer.data
        };
      }
      createEncryptionOption() {
        const buffer = new _writableTrackingBuffer.default(optionBufferSize);
        if (this.options.encrypt) {
          buffer.writeUInt8(ENCRYPT.ON);
        } else {
          buffer.writeUInt8(ENCRYPT.NOT_SUP);
        }
        return {
          token: TOKEN.ENCRYPTION,
          data: buffer.data
        };
      }
      createInstanceOption() {
        const buffer = new _writableTrackingBuffer.default(optionBufferSize);
        buffer.writeUInt8(0);
        return {
          token: TOKEN.INSTOPT,
          data: buffer.data
        };
      }
      createThreadIdOption() {
        const buffer = new _writableTrackingBuffer.default(optionBufferSize);
        buffer.writeUInt32BE(0);
        return {
          token: TOKEN.THREADID,
          data: buffer.data
        };
      }
      createMarsOption() {
        const buffer = new _writableTrackingBuffer.default(optionBufferSize);
        buffer.writeUInt8(MARS.OFF);
        return {
          token: TOKEN.MARS,
          data: buffer.data
        };
      }
      createTraceIdOption() {
        const buffer = new _writableTrackingBuffer.default(traceIdSize);
        buffer.writeBuffer((0, _crypto.randomBytes)(traceIdSize));
        return {
          token: TOKEN.TRACEID,
          data: buffer.data
        };
      }
      createFedAuthOption() {
        const buffer = new _writableTrackingBuffer.default(optionBufferSize);
        buffer.writeUInt8(1);
        return {
          token: TOKEN.FEDAUTHREQUIRED,
          data: buffer.data
        };
      }
      extractOptions() {
        let offset = 0;
        while (this.data[offset] !== TOKEN.TERMINATOR) {
          let dataOffset = this.data.readUInt16BE(offset + 1);
          const dataLength = this.data.readUInt16BE(offset + 3);
          switch (this.data[offset]) {
            case TOKEN.VERSION:
              this.extractVersion(dataOffset);
              break;
            case TOKEN.ENCRYPTION:
              this.extractEncryption(dataOffset);
              break;
            case TOKEN.INSTOPT:
              this.extractInstance(dataOffset);
              break;
            case TOKEN.THREADID:
              if (dataLength > 0) {
                this.extractThreadId(dataOffset);
              }
              break;
            case TOKEN.MARS:
              this.extractMars(dataOffset);
              break;
            case TOKEN.TRACEID:
              this.extractTraceId(dataOffset);
              break;
            case TOKEN.FEDAUTHREQUIRED:
              this.extractFedAuth(dataOffset);
              break;
          }
          offset += 5;
          dataOffset += dataLength;
        }
      }
      extractVersion(offset) {
        this.version = {
          major: this.data.readUInt8(offset + 0),
          minor: this.data.readUInt8(offset + 1),
          build: this.data.readUInt16BE(offset + 2),
          subbuild: this.data.readUInt16BE(offset + 4)
        };
      }
      extractEncryption(offset) {
        this.encryption = this.data.readUInt8(offset);
        this.encryptionString = encryptByValue[this.encryption];
      }
      extractInstance(offset) {
        this.instance = this.data.readUInt8(offset);
      }
      extractThreadId(offset) {
        this.threadId = this.data.readUInt32BE(offset);
      }
      extractMars(offset) {
        this.mars = this.data.readUInt8(offset);
        this.marsString = marsByValue[this.mars];
      }
      extractTraceId(offset) {
        this.traceId = this.data.subarray(offset, offset + traceIdSize);
      }
      extractFedAuth(offset) {
        this.fedAuthRequired = this.data.readUInt8(offset);
      }
      toString(indent = "") {
        return indent + "PreLogin - " + (0, _sprintfJs.sprintf)("version:%d.%d.%d.%d, encryption:0x%02X(%s), instopt:0x%02X, threadId:0x%08X, mars:0x%02X(%s), traceId:%s", this.version.major, this.version.minor, this.version.build, this.version.subbuild, this.encryption ? this.encryption : 0, this.encryptionString ? this.encryptionString : "", this.instance ? this.instance : 0, this.threadId ? this.threadId : 0, this.mars ? this.mars : 0, this.marsString ? this.marsString : "", this.traceId ? this.traceId.toString("hex") : "");
      }
    }
    exports.default = PreloginPayload;
    module.exports = PreloginPayload;
  })(preloginPayload, preloginPayload.exports);
  return preloginPayload.exports;
}
var login7Payload = { exports: {} };
var tdsVersions = {};
var hasRequiredTdsVersions;
function requireTdsVersions() {
  if (hasRequiredTdsVersions) return tdsVersions;
  hasRequiredTdsVersions = 1;
  Object.defineProperty(tdsVersions, "__esModule", {
    value: true
  });
  tdsVersions.versionsByValue = tdsVersions.versions = void 0;
  const versions = tdsVersions.versions = {
    "7_1": 1895825409,
    "7_2": 1913192450,
    "7_3_A": 1930035203,
    "7_3_B": 1930100739,
    "7_4": 1946157060,
    "8_0": 134217728
  };
  const versionsByValue = tdsVersions.versionsByValue = {};
  for (const name in versions) {
    versionsByValue[versions[name]] = name;
  }
  return tdsVersions;
}
var hasRequiredLogin7Payload;
function requireLogin7Payload() {
  if (hasRequiredLogin7Payload) return login7Payload.exports;
  hasRequiredLogin7Payload = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _sprintfJs = requireSprintf();
    var _tdsVersions = requireTdsVersions();
    const FLAGS_1 = {
      ENDIAN_LITTLE: 0,
      CHARSET_ASCII: 0,
      FLOAT_IEEE_754: 0,
      BCP_DUMPLOAD_OFF: 16,
      USE_DB_OFF: 32,
      INIT_DB_WARN: 0,
      INIT_DB_FATAL: 64,
      SET_LANG_WARN_ON: 128
    };
    const FLAGS_2 = {
      INIT_LANG_WARN: 0,
      ODBC_OFF: 0,
      USER_NORMAL: 0,
      INTEGRATED_SECURITY_OFF: 0,
      INTEGRATED_SECURITY_ON: 128
    };
    const TYPE_FLAGS = {
      SQL_DFLT: 0,
      OLEDB_OFF: 0,
      READ_WRITE_INTENT: 0,
      READ_ONLY_INTENT: 32
    };
    const FLAGS_3 = {
      CHANGE_PASSWORD_NO: 0,
      UNKNOWN_COLLATION_HANDLING: 8,
      EXTENSION_USED: 16
    };
    const FEDAUTH_OPTIONS = {
      FEATURE_ID: 2,
      LIBRARY_SECURITYTOKEN: 1,
      LIBRARY_ADAL: 2,
      FEDAUTH_YES_ECHO: 1,
      FEDAUTH_NO_ECHO: 0,
      ADAL_WORKFLOW_USER_PASS: 1
    };
    const FEATURE_EXT_TERMINATOR = 255;
    class Login7Payload {
      constructor({
        tdsVersion,
        packetSize,
        clientProgVer,
        clientPid,
        connectionId,
        clientTimeZone,
        clientLcid
      }) {
        this.tdsVersion = tdsVersion;
        this.packetSize = packetSize;
        this.clientProgVer = clientProgVer;
        this.clientPid = clientPid;
        this.connectionId = connectionId;
        this.clientTimeZone = clientTimeZone;
        this.clientLcid = clientLcid;
        this.readOnlyIntent = false;
        this.initDbFatal = false;
        this.fedAuth = void 0;
        this.userName = void 0;
        this.password = void 0;
        this.serverName = void 0;
        this.appName = void 0;
        this.hostname = void 0;
        this.libraryName = void 0;
        this.language = void 0;
        this.database = void 0;
        this.clientId = void 0;
        this.sspi = void 0;
        this.attachDbFile = void 0;
        this.changePassword = void 0;
      }
      toBuffer() {
        const fixedData = Buffer.alloc(94);
        const buffers = [fixedData];
        let offset = 0;
        let dataOffset = fixedData.length;
        offset = fixedData.writeUInt32LE(0, offset);
        offset = fixedData.writeUInt32LE(this.tdsVersion, offset);
        offset = fixedData.writeUInt32LE(this.packetSize, offset);
        offset = fixedData.writeUInt32LE(this.clientProgVer, offset);
        offset = fixedData.writeUInt32LE(this.clientPid, offset);
        offset = fixedData.writeUInt32LE(this.connectionId, offset);
        offset = fixedData.writeUInt8(this.buildOptionFlags1(), offset);
        offset = fixedData.writeUInt8(this.buildOptionFlags2(), offset);
        offset = fixedData.writeUInt8(this.buildTypeFlags(), offset);
        offset = fixedData.writeUInt8(this.buildOptionFlags3(), offset);
        offset = fixedData.writeInt32LE(this.clientTimeZone, offset);
        offset = fixedData.writeUInt32LE(this.clientLcid, offset);
        offset = fixedData.writeUInt16LE(dataOffset, offset);
        if (this.hostname) {
          const buffer = Buffer.from(this.hostname, "ucs2");
          offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
          dataOffset += buffer.length;
          buffers.push(buffer);
        } else {
          offset = fixedData.writeUInt16LE(dataOffset, offset);
        }
        offset = fixedData.writeUInt16LE(dataOffset, offset);
        if (this.userName) {
          const buffer = Buffer.from(this.userName, "ucs2");
          offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
          dataOffset += buffer.length;
          buffers.push(buffer);
        } else {
          offset = fixedData.writeUInt16LE(0, offset);
        }
        offset = fixedData.writeUInt16LE(dataOffset, offset);
        if (this.password) {
          const buffer = Buffer.from(this.password, "ucs2");
          offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
          dataOffset += buffer.length;
          buffers.push(this.scramblePassword(buffer));
        } else {
          offset = fixedData.writeUInt16LE(0, offset);
        }
        offset = fixedData.writeUInt16LE(dataOffset, offset);
        if (this.appName) {
          const buffer = Buffer.from(this.appName, "ucs2");
          offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
          dataOffset += buffer.length;
          buffers.push(buffer);
        } else {
          offset = fixedData.writeUInt16LE(0, offset);
        }
        offset = fixedData.writeUInt16LE(dataOffset, offset);
        if (this.serverName) {
          const buffer = Buffer.from(this.serverName, "ucs2");
          offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
          dataOffset += buffer.length;
          buffers.push(buffer);
        } else {
          offset = fixedData.writeUInt16LE(0, offset);
        }
        offset = fixedData.writeUInt16LE(dataOffset, offset);
        let featureExtData;
        let extensionOffsetBuffer;
        if (this.tdsVersion >= _tdsVersions.versions["7_4"]) {
          featureExtData = this.buildFeatureExt();
          offset = fixedData.writeUInt16LE(4, offset);
          extensionOffsetBuffer = Buffer.alloc(4);
          buffers.push(extensionOffsetBuffer);
          dataOffset += 4;
        } else {
          offset = fixedData.writeUInt16LE(0, offset);
        }
        offset = fixedData.writeUInt16LE(dataOffset, offset);
        if (this.libraryName) {
          const buffer = Buffer.from(this.libraryName, "ucs2");
          offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
          dataOffset += buffer.length;
          buffers.push(buffer);
        } else {
          offset = fixedData.writeUInt16LE(0, offset);
        }
        offset = fixedData.writeUInt16LE(dataOffset, offset);
        if (this.language) {
          const buffer = Buffer.from(this.language, "ucs2");
          offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
          dataOffset += buffer.length;
          buffers.push(buffer);
        } else {
          offset = fixedData.writeUInt16LE(0, offset);
        }
        offset = fixedData.writeUInt16LE(dataOffset, offset);
        if (this.database) {
          const buffer = Buffer.from(this.database, "ucs2");
          offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
          dataOffset += buffer.length;
          buffers.push(buffer);
        } else {
          offset = fixedData.writeUInt16LE(0, offset);
        }
        if (this.clientId) {
          this.clientId.copy(fixedData, offset, 0, 6);
        }
        offset += 6;
        offset = fixedData.writeUInt16LE(dataOffset, offset);
        if (this.sspi) {
          if (this.sspi.length > 65535) {
            offset = fixedData.writeUInt16LE(65535, offset);
          } else {
            offset = fixedData.writeUInt16LE(this.sspi.length, offset);
          }
          buffers.push(this.sspi);
          dataOffset += this.sspi.length;
        } else {
          offset = fixedData.writeUInt16LE(0, offset);
        }
        offset = fixedData.writeUInt16LE(dataOffset, offset);
        if (this.attachDbFile) {
          const buffer = Buffer.from(this.attachDbFile, "ucs2");
          offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
          dataOffset += buffer.length;
          buffers.push(buffer);
        } else {
          offset = fixedData.writeUInt16LE(0, offset);
        }
        offset = fixedData.writeUInt16LE(dataOffset, offset);
        if (this.changePassword) {
          const buffer = Buffer.from(this.changePassword, "ucs2");
          offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
          dataOffset += buffer.length;
          buffers.push(buffer);
        } else {
          offset = fixedData.writeUInt16LE(0, offset);
        }
        if (this.sspi && this.sspi.length > 65535) {
          fixedData.writeUInt32LE(this.sspi.length, offset);
        } else {
          fixedData.writeUInt32LE(0, offset);
        }
        if (featureExtData && extensionOffsetBuffer) {
          extensionOffsetBuffer.writeUInt32LE(dataOffset, 0);
          buffers.push(featureExtData);
        }
        const data = Buffer.concat(buffers);
        data.writeUInt32LE(data.length, 0);
        return data;
      }
      buildOptionFlags1() {
        let flags1 = FLAGS_1.ENDIAN_LITTLE | FLAGS_1.CHARSET_ASCII | FLAGS_1.FLOAT_IEEE_754 | FLAGS_1.BCP_DUMPLOAD_OFF | FLAGS_1.USE_DB_OFF | FLAGS_1.SET_LANG_WARN_ON;
        if (this.initDbFatal) {
          flags1 |= FLAGS_1.INIT_DB_FATAL;
        } else {
          flags1 |= FLAGS_1.INIT_DB_WARN;
        }
        return flags1;
      }
      buildFeatureExt() {
        const buffers = [];
        const fedAuth = this.fedAuth;
        if (fedAuth) {
          switch (fedAuth.type) {
            case "ADAL":
              const buffer = Buffer.alloc(7);
              buffer.writeUInt8(FEDAUTH_OPTIONS.FEATURE_ID, 0);
              buffer.writeUInt32LE(2, 1);
              buffer.writeUInt8(FEDAUTH_OPTIONS.LIBRARY_ADAL << 1 | (fedAuth.echo ? FEDAUTH_OPTIONS.FEDAUTH_YES_ECHO : FEDAUTH_OPTIONS.FEDAUTH_NO_ECHO), 5);
              buffer.writeUInt8(fedAuth.workflow === "integrated" ? 2 : FEDAUTH_OPTIONS.ADAL_WORKFLOW_USER_PASS, 6);
              buffers.push(buffer);
              break;
            case "SECURITYTOKEN":
              const token2 = Buffer.from(fedAuth.fedAuthToken, "ucs2");
              const buf2 = Buffer.alloc(10);
              let offset = 0;
              offset = buf2.writeUInt8(FEDAUTH_OPTIONS.FEATURE_ID, offset);
              offset = buf2.writeUInt32LE(token2.length + 4 + 1, offset);
              offset = buf2.writeUInt8(FEDAUTH_OPTIONS.LIBRARY_SECURITYTOKEN << 1 | (fedAuth.echo ? FEDAUTH_OPTIONS.FEDAUTH_YES_ECHO : FEDAUTH_OPTIONS.FEDAUTH_NO_ECHO), offset);
              buf2.writeInt32LE(token2.length, offset);
              buffers.push(buf2);
              buffers.push(token2);
              break;
          }
        }
        const UTF8_SUPPORT_FEATURE_ID = 10;
        const UTF8_SUPPORT_CLIENT_SUPPORTS_UTF8 = 1;
        const buf = Buffer.alloc(6);
        buf.writeUInt8(UTF8_SUPPORT_FEATURE_ID, 0);
        buf.writeUInt32LE(1, 1);
        buf.writeUInt8(UTF8_SUPPORT_CLIENT_SUPPORTS_UTF8, 5);
        buffers.push(buf);
        buffers.push(Buffer.from([FEATURE_EXT_TERMINATOR]));
        return Buffer.concat(buffers);
      }
      buildOptionFlags2() {
        let flags2 = FLAGS_2.INIT_LANG_WARN | FLAGS_2.ODBC_OFF | FLAGS_2.USER_NORMAL;
        if (this.sspi) {
          flags2 |= FLAGS_2.INTEGRATED_SECURITY_ON;
        } else {
          flags2 |= FLAGS_2.INTEGRATED_SECURITY_OFF;
        }
        return flags2;
      }
      buildTypeFlags() {
        let typeFlags = TYPE_FLAGS.SQL_DFLT | TYPE_FLAGS.OLEDB_OFF;
        if (this.readOnlyIntent) {
          typeFlags |= TYPE_FLAGS.READ_ONLY_INTENT;
        } else {
          typeFlags |= TYPE_FLAGS.READ_WRITE_INTENT;
        }
        return typeFlags;
      }
      buildOptionFlags3() {
        return FLAGS_3.CHANGE_PASSWORD_NO | FLAGS_3.UNKNOWN_COLLATION_HANDLING | FLAGS_3.EXTENSION_USED;
      }
      scramblePassword(password) {
        for (let b = 0, len = password.length; b < len; b++) {
          let byte = password[b];
          const lowNibble = byte & 15;
          const highNibble = byte >> 4;
          byte = lowNibble << 4 | highNibble;
          byte = byte ^ 165;
          password[b] = byte;
        }
        return password;
      }
      toString(indent = "") {
        return indent + "Login7 - " + (0, _sprintfJs.sprintf)("TDS:0x%08X, PacketSize:0x%08X, ClientProgVer:0x%08X, ClientPID:0x%08X, ConnectionID:0x%08X", this.tdsVersion, this.packetSize, this.clientProgVer, this.clientPid, this.connectionId) + "\n" + indent + "         " + (0, _sprintfJs.sprintf)("Flags1:0x%02X, Flags2:0x%02X, TypeFlags:0x%02X, Flags3:0x%02X, ClientTimezone:%d, ClientLCID:0x%08X", this.buildOptionFlags1(), this.buildOptionFlags2(), this.buildTypeFlags(), this.buildOptionFlags3(), this.clientTimeZone, this.clientLcid) + "\n" + indent + "         " + (0, _sprintfJs.sprintf)("Hostname:'%s', Username:'%s', Password:'%s', AppName:'%s', ServerName:'%s', LibraryName:'%s'", this.hostname, this.userName, this.password, this.appName, this.serverName, this.libraryName) + "\n" + indent + "         " + (0, _sprintfJs.sprintf)("Language:'%s', Database:'%s', SSPI:'%s', AttachDbFile:'%s', ChangePassword:'%s'", this.language, this.database, this.sspi, this.attachDbFile, this.changePassword);
      }
    }
    exports.default = Login7Payload;
    module.exports = Login7Payload;
  })(login7Payload, login7Payload.exports);
  return login7Payload.exports;
}
var ntlmPayload = { exports: {} };
var hasRequiredNtlmPayload;
function requireNtlmPayload() {
  if (hasRequiredNtlmPayload) return ntlmPayload.exports;
  hasRequiredNtlmPayload = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _writableTrackingBuffer = _interopRequireDefault(requireWritableTrackingBuffer());
    var crypto = _interopRequireWildcard(require$$1);
    var _jsMd = _interopRequireDefault(requireMd4());
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, default: e2 };
        if (null === e2 || "object" != typeof e2 && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (const t3 in e2) "default" !== t3 && {}.hasOwnProperty.call(e2, t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, t3)) && (i.get || i.set) ? o(f, t3, i) : f[t3] = e2[t3]);
        return f;
      })(e, t);
    }
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    class NTLMResponsePayload {
      constructor(loginData) {
        this.data = this.createResponse(loginData);
      }
      toString(indent = "") {
        return indent + "NTLM Auth";
      }
      createResponse(challenge) {
        const client_nonce = this.createClientNonce();
        const lmv2len = 24;
        const ntlmv2len = 16;
        const domain = challenge.domain;
        const username = challenge.userName;
        const password = challenge.password;
        const ntlmData = challenge.ntlmpacket;
        const server_data = ntlmData.target;
        const server_nonce = ntlmData.nonce;
        const bufferLength = 64 + domain.length * 2 + username.length * 2 + lmv2len + ntlmv2len + 8 + 8 + 8 + 4 + server_data.length + 4;
        const data = new _writableTrackingBuffer.default(bufferLength);
        data.position = 0;
        data.writeString("NTLMSSP\0", "utf8");
        data.writeUInt32LE(3);
        const baseIdx = 64;
        const dnIdx = baseIdx;
        const unIdx = dnIdx + domain.length * 2;
        const l2Idx = unIdx + username.length * 2;
        const ntIdx = l2Idx + lmv2len;
        data.writeUInt16LE(lmv2len);
        data.writeUInt16LE(lmv2len);
        data.writeUInt32LE(l2Idx);
        data.writeUInt16LE(ntlmv2len);
        data.writeUInt16LE(ntlmv2len);
        data.writeUInt32LE(ntIdx);
        data.writeUInt16LE(domain.length * 2);
        data.writeUInt16LE(domain.length * 2);
        data.writeUInt32LE(dnIdx);
        data.writeUInt16LE(username.length * 2);
        data.writeUInt16LE(username.length * 2);
        data.writeUInt32LE(unIdx);
        data.writeUInt16LE(0);
        data.writeUInt16LE(0);
        data.writeUInt32LE(baseIdx);
        data.writeUInt16LE(0);
        data.writeUInt16LE(0);
        data.writeUInt32LE(baseIdx);
        data.writeUInt16LE(33281);
        data.writeUInt16LE(8);
        data.writeString(domain, "ucs2");
        data.writeString(username, "ucs2");
        const lmv2Data = this.lmv2Response(domain, username, password, server_nonce, client_nonce);
        data.copyFrom(lmv2Data);
        const genTime = (/* @__PURE__ */ new Date()).getTime();
        const ntlmDataBuffer = this.ntlmv2Response(domain, username, password, server_nonce, server_data, client_nonce, genTime);
        data.copyFrom(ntlmDataBuffer);
        data.writeUInt32LE(257);
        data.writeUInt32LE(0);
        const timestamp = this.createTimestamp(genTime);
        data.copyFrom(timestamp);
        data.copyFrom(client_nonce);
        data.writeUInt32LE(0);
        data.copyFrom(server_data);
        data.writeUInt32LE(0);
        return data.data;
      }
      createClientNonce() {
        const client_nonce = Buffer.alloc(8, 0);
        let nidx = 0;
        while (nidx < 8) {
          client_nonce.writeUInt8(Math.ceil(Math.random() * 255), nidx);
          nidx++;
        }
        return client_nonce;
      }
      ntlmv2Response(domain, user, password, serverNonce, targetInfo, clientNonce, mytime) {
        const timestamp = this.createTimestamp(mytime);
        const hash = this.ntv2Hash(domain, user, password);
        const dataLength = 40 + targetInfo.length;
        const data = Buffer.alloc(dataLength, 0);
        serverNonce.copy(data, 0, 0, 8);
        data.writeUInt32LE(257, 8);
        data.writeUInt32LE(0, 12);
        timestamp.copy(data, 16, 0, 8);
        clientNonce.copy(data, 24, 0, 8);
        data.writeUInt32LE(0, 32);
        targetInfo.copy(data, 36, 0, targetInfo.length);
        data.writeUInt32LE(0, 36 + targetInfo.length);
        return this.hmacMD5(data, hash);
      }
      createTimestamp(time2) {
        const tenthsOfAMicrosecond = (BigInt(time2) + BigInt(11644473600)) * BigInt(1e7);
        const lo = Number(tenthsOfAMicrosecond & BigInt(4294967295));
        const hi = Number(tenthsOfAMicrosecond >> BigInt(32) & BigInt(4294967295));
        const result = Buffer.alloc(8);
        result.writeUInt32LE(lo, 0);
        result.writeUInt32LE(hi, 4);
        return result;
      }
      lmv2Response(domain, user, password, serverNonce, clientNonce) {
        const hash = this.ntv2Hash(domain, user, password);
        const data = Buffer.alloc(serverNonce.length + clientNonce.length, 0);
        serverNonce.copy(data);
        clientNonce.copy(data, serverNonce.length, 0, clientNonce.length);
        const newhash = this.hmacMD5(data, hash);
        const response = Buffer.alloc(newhash.length + clientNonce.length, 0);
        newhash.copy(response);
        clientNonce.copy(response, newhash.length, 0, clientNonce.length);
        return response;
      }
      ntv2Hash(domain, user, password) {
        const hash = this.ntHash(password);
        const identity = Buffer.from(user.toUpperCase() + domain.toUpperCase(), "ucs2");
        return this.hmacMD5(identity, hash);
      }
      ntHash(text2) {
        const unicodeString = Buffer.from(text2, "ucs2");
        return Buffer.from(_jsMd.default.arrayBuffer(unicodeString));
      }
      hmacMD5(data, key) {
        return crypto.createHmac("MD5", key).update(data).digest();
      }
    }
    exports.default = NTLMResponsePayload;
    module.exports = NTLMResponsePayload;
  })(ntlmPayload, ntlmPayload.exports);
  return ntlmPayload.exports;
}
var request = { exports: {} };
var errors = {};
var hasRequiredErrors;
function requireErrors() {
  if (hasRequiredErrors) return errors;
  hasRequiredErrors = 1;
  Object.defineProperty(errors, "__esModule", {
    value: true
  });
  errors.RequestError = errors.InputError = errors.ConnectionError = void 0;
  class ConnectionError extends Error {
    constructor(message2, code, options) {
      super(message2, options);
      this.code = code;
    }
  }
  errors.ConnectionError = ConnectionError;
  class RequestError extends Error {
    constructor(message2, code, options) {
      super(message2, options);
      this.code = code;
    }
  }
  errors.RequestError = RequestError;
  class InputError extends TypeError {
  }
  errors.InputError = InputError;
  return errors;
}
var types = {};
var hasRequiredTypes;
function requireTypes() {
  if (hasRequiredTypes) return types;
  hasRequiredTypes = 1;
  Object.defineProperty(types, "__esModule", {
    value: true
  });
  types.SQLServerStatementColumnEncryptionSetting = types.SQLServerEncryptionType = types.DescribeParameterEncryptionResultSet2 = types.DescribeParameterEncryptionResultSet1 = void 0;
  types.SQLServerEncryptionType = /* @__PURE__ */ (function(SQLServerEncryptionType) {
    SQLServerEncryptionType[SQLServerEncryptionType["Deterministic"] = 1] = "Deterministic";
    SQLServerEncryptionType[SQLServerEncryptionType["Randomized"] = 2] = "Randomized";
    SQLServerEncryptionType[SQLServerEncryptionType["PlainText"] = 0] = "PlainText";
    return SQLServerEncryptionType;
  })({});
  types.DescribeParameterEncryptionResultSet1 = /* @__PURE__ */ (function(DescribeParameterEncryptionResultSet1) {
    DescribeParameterEncryptionResultSet1[DescribeParameterEncryptionResultSet1["KeyOrdinal"] = 0] = "KeyOrdinal";
    DescribeParameterEncryptionResultSet1[DescribeParameterEncryptionResultSet1["DbId"] = 1] = "DbId";
    DescribeParameterEncryptionResultSet1[DescribeParameterEncryptionResultSet1["KeyId"] = 2] = "KeyId";
    DescribeParameterEncryptionResultSet1[DescribeParameterEncryptionResultSet1["KeyVersion"] = 3] = "KeyVersion";
    DescribeParameterEncryptionResultSet1[DescribeParameterEncryptionResultSet1["KeyMdVersion"] = 4] = "KeyMdVersion";
    DescribeParameterEncryptionResultSet1[DescribeParameterEncryptionResultSet1["EncryptedKey"] = 5] = "EncryptedKey";
    DescribeParameterEncryptionResultSet1[DescribeParameterEncryptionResultSet1["ProviderName"] = 6] = "ProviderName";
    DescribeParameterEncryptionResultSet1[DescribeParameterEncryptionResultSet1["KeyPath"] = 7] = "KeyPath";
    DescribeParameterEncryptionResultSet1[DescribeParameterEncryptionResultSet1["KeyEncryptionAlgorithm"] = 8] = "KeyEncryptionAlgorithm";
    return DescribeParameterEncryptionResultSet1;
  })({});
  types.DescribeParameterEncryptionResultSet2 = /* @__PURE__ */ (function(DescribeParameterEncryptionResultSet2) {
    DescribeParameterEncryptionResultSet2[DescribeParameterEncryptionResultSet2["ParameterOrdinal"] = 0] = "ParameterOrdinal";
    DescribeParameterEncryptionResultSet2[DescribeParameterEncryptionResultSet2["ParameterName"] = 1] = "ParameterName";
    DescribeParameterEncryptionResultSet2[DescribeParameterEncryptionResultSet2["ColumnEncryptionAlgorithm"] = 2] = "ColumnEncryptionAlgorithm";
    DescribeParameterEncryptionResultSet2[DescribeParameterEncryptionResultSet2["ColumnEncrytionType"] = 3] = "ColumnEncrytionType";
    DescribeParameterEncryptionResultSet2[DescribeParameterEncryptionResultSet2["ColumnEncryptionKeyOrdinal"] = 4] = "ColumnEncryptionKeyOrdinal";
    DescribeParameterEncryptionResultSet2[DescribeParameterEncryptionResultSet2["NormalizationRuleVersion"] = 5] = "NormalizationRuleVersion";
    return DescribeParameterEncryptionResultSet2;
  })({});
  types.SQLServerStatementColumnEncryptionSetting = /* @__PURE__ */ (function(SQLServerStatementColumnEncryptionSetting) {
    SQLServerStatementColumnEncryptionSetting[SQLServerStatementColumnEncryptionSetting["UseConnectionSetting"] = 0] = "UseConnectionSetting";
    SQLServerStatementColumnEncryptionSetting[SQLServerStatementColumnEncryptionSetting["Enabled"] = 1] = "Enabled";
    SQLServerStatementColumnEncryptionSetting[SQLServerStatementColumnEncryptionSetting["ResultSetOnly"] = 2] = "ResultSetOnly";
    SQLServerStatementColumnEncryptionSetting[SQLServerStatementColumnEncryptionSetting["Disabled"] = 3] = "Disabled";
    return SQLServerStatementColumnEncryptionSetting;
  })({});
  return types;
}
var hasRequiredRequest;
function requireRequest() {
  if (hasRequiredRequest) return request.exports;
  hasRequiredRequest = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _events = require$$0$1;
    var _errors = requireErrors();
    var _types = requireTypes();
    class Request extends _events.EventEmitter {
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * This event, describing result set columns, will be emitted before row
       * events are emitted. This event may be emitted multiple times when more
       * than one recordset is produced by the statement.
       *
       * An array like object, where the columns can be accessed either by index
       * or name. Columns with a name that is an integer are not accessible by name,
       * as it would be interpreted as an array index.
       */
      /**
       * The request has been prepared and can be used in subsequent calls to execute and unprepare.
       */
      /**
       * The request encountered an error and has not been prepared.
       */
      /**
       * A row resulting from execution of the SQL statement.
       */
      /**
       * All rows from a result set have been provided (through `row` events).
       *
       * This token is used to indicate the completion of a SQL statement.
       * As multiple SQL statements can be sent to the server in a single SQL batch, multiple `done` can be generated.
       * An `done` event is emitted for each SQL statement in the SQL batch except variable declarations.
       * For execution of SQL statements within stored procedures, `doneProc` and `doneInProc` events are used in place of `done`.
       *
       * If you are using [[Connection.execSql]] then SQL server may treat the multiple calls with the same query as a stored procedure.
       * When this occurs, the `doneProc` and `doneInProc` events may be emitted instead. You must handle both events to ensure complete coverage.
       */
      /**
       * `request.on('doneInProc', function (rowCount, more, rows) { });`
       *
       * Indicates the completion status of a SQL statement within a stored procedure. All rows from a statement
       * in a stored procedure have been provided (through `row` events).
       *
       * This event may also occur when executing multiple calls with the same query using [[execSql]].
       */
      /**
       * Indicates the completion status of a stored procedure. This is also generated for stored procedures
       * executed through SQL statements.\
       * This event may also occur when executing multiple calls with the same query using [[execSql]].
       */
      /**
       * A value for an output parameter (that was added to the request with [[addOutputParameter]]).
       * See also `Using Parameters`.
       */
      /**
       * This event gives the columns by which data is ordered, if `ORDER BY` clause is executed in SQL Server.
       */
      on(event, listener) {
        return super.on(event, listener);
      }
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      emit(event, ...args) {
        return super.emit(event, ...args);
      }
      /**
       * @param sqlTextOrProcedure
       *   The SQL statement to be executed
       *
       * @param callback
       *   The callback to execute once the request has been fully completed.
       */
      constructor(sqlTextOrProcedure, callback, options) {
        super();
        this.sqlTextOrProcedure = sqlTextOrProcedure;
        this.parameters = [];
        this.parametersByName = {};
        this.preparing = false;
        this.handle = void 0;
        this.canceled = false;
        this.paused = false;
        this.error = void 0;
        this.connection = void 0;
        this.timeout = void 0;
        this.userCallback = callback;
        this.statementColumnEncryptionSetting = options && options.statementColumnEncryptionSetting || _types.SQLServerStatementColumnEncryptionSetting.UseConnectionSetting;
        this.cryptoMetadataLoaded = false;
        this.callback = function(err, rowCount, rows) {
          if (this.preparing) {
            this.preparing = false;
            if (err) {
              this.emit("error", err);
            } else {
              this.emit("prepared");
            }
          } else {
            this.userCallback(err, rowCount, rows);
            this.emit("requestCompleted");
          }
        };
      }
      /**
       * @param name
       *   The parameter name. This should correspond to a parameter in the SQL,
       *   or a parameter that a called procedure expects. The name should not start with `@`.
       *
       * @param type
       *   One of the supported data types.
       *
       * @param value
       *   The value that the parameter is to be given. The Javascript type of the
       *   argument should match that documented for data types.
       *
       * @param options
       *   Additional type options. Optional.
       */
      // TODO: `type` must be a valid TDS value type
      addParameter(name, type, value, options) {
        const {
          output = false,
          length,
          precision,
          scale
        } = options ?? {};
        const parameter = {
          type,
          name,
          value,
          output,
          length,
          precision,
          scale
        };
        this.parameters.push(parameter);
        this.parametersByName[name] = parameter;
      }
      /**
       * @param name
       *   The parameter name. This should correspond to a parameter in the SQL,
       *   or a parameter that a called procedure expects.
       *
       * @param type
       *   One of the supported data types.
       *
       * @param value
       *   The value that the parameter is to be given. The Javascript type of the
       *   argument should match that documented for data types
       *
       * @param options
       *   Additional type options. Optional.
       */
      addOutputParameter(name, type, value, options) {
        this.addParameter(name, type, value, {
          ...options,
          output: true
        });
      }
      /**
       * @private
       */
      makeParamsParameter(parameters) {
        let paramsParameter = "";
        for (let i = 0, len = parameters.length; i < len; i++) {
          const parameter = parameters[i];
          if (paramsParameter.length > 0) {
            paramsParameter += ", ";
          }
          paramsParameter += "@" + parameter.name + " ";
          paramsParameter += parameter.type.declaration(parameter);
          if (parameter.output) {
            paramsParameter += " OUTPUT";
          }
        }
        return paramsParameter;
      }
      /**
       * @private
       */
      validateParameters(collation2) {
        for (let i = 0, len = this.parameters.length; i < len; i++) {
          const parameter = this.parameters[i];
          try {
            parameter.value = parameter.type.validate(parameter.value, collation2);
          } catch (error) {
            throw new _errors.RequestError("Validation failed for parameter '" + parameter.name + "'. " + error.message, "EPARAM", {
              cause: error
            });
          }
        }
      }
      /**
       * Temporarily suspends the flow of data from the database. No more `row` events will be emitted until [[resume] is called.
       * If this request is already in a paused state, calling [[pause]] has no effect.
       */
      pause() {
        if (this.paused) {
          return;
        }
        this.emit("pause");
        this.paused = true;
      }
      /**
       * Resumes the flow of data from the database.
       * If this request is not in a paused state, calling [[resume]] has no effect.
       */
      resume() {
        if (!this.paused) {
          return;
        }
        this.paused = false;
        this.emit("resume");
      }
      /**
       * Cancels a request while waiting for a server response.
       */
      cancel() {
        if (this.canceled) {
          return;
        }
        this.canceled = true;
        this.emit("cancel");
      }
      /**
       * Sets a timeout for this request.
       *
       * @param timeout
       *   The number of milliseconds before the request is considered failed,
       *   or `0` for no timeout. When no timeout is set for the request,
       *   the [[ConnectionOptions.requestTimeout]] of the [[Connection]] is used.
       */
      setTimeout(timeout) {
        this.timeout = timeout;
      }
    }
    exports.default = Request;
    module.exports = Request;
  })(request, request.exports);
  return request.exports;
}
var rpcrequestPayload = { exports: {} };
var allHeaders = {};
var hasRequiredAllHeaders;
function requireAllHeaders() {
  if (hasRequiredAllHeaders) return allHeaders;
  hasRequiredAllHeaders = 1;
  Object.defineProperty(allHeaders, "__esModule", {
    value: true
  });
  allHeaders.writeToTrackingBuffer = writeToTrackingBuffer;
  const TYPE = {
    TXN_DESCRIPTOR: 2
  };
  const TXNDESCRIPTOR_HEADER_DATA_LEN = 4 + 8;
  const TXNDESCRIPTOR_HEADER_LEN = 4 + 2 + TXNDESCRIPTOR_HEADER_DATA_LEN;
  function writeToTrackingBuffer(buffer, txnDescriptor, outstandingRequestCount) {
    buffer.writeUInt32LE(0);
    buffer.writeUInt32LE(TXNDESCRIPTOR_HEADER_LEN);
    buffer.writeUInt16LE(TYPE.TXN_DESCRIPTOR);
    buffer.writeBuffer(txnDescriptor);
    buffer.writeUInt32LE(outstandingRequestCount);
    const data = buffer.data;
    data.writeUInt32LE(data.length, 0);
    return buffer;
  }
  return allHeaders;
}
var hasRequiredRpcrequestPayload;
function requireRpcrequestPayload() {
  if (hasRequiredRpcrequestPayload) return rpcrequestPayload.exports;
  hasRequiredRpcrequestPayload = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _writableTrackingBuffer = _interopRequireDefault(requireWritableTrackingBuffer());
    var _allHeaders = requireAllHeaders();
    var _errors = requireErrors();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const STATUS = {
      BY_REF_VALUE: 1
    };
    class RpcRequestPayload {
      constructor(procedure, parameters, txnDescriptor, options, collation2) {
        this.procedure = procedure;
        this.parameters = parameters;
        this.options = options;
        this.txnDescriptor = txnDescriptor;
        this.collation = collation2;
      }
      [Symbol.iterator]() {
        return this.generateData();
      }
      *generateData() {
        const buffer = new _writableTrackingBuffer.default(500);
        if (this.options.tdsVersion >= "7_2") {
          const outstandingRequestCount = 1;
          (0, _allHeaders.writeToTrackingBuffer)(buffer, this.txnDescriptor, outstandingRequestCount);
        }
        if (typeof this.procedure === "string") {
          buffer.writeUsVarchar(this.procedure);
        } else {
          buffer.writeUShort(65535);
          buffer.writeUShort(this.procedure);
        }
        const optionFlags = 0;
        buffer.writeUInt16LE(optionFlags);
        yield buffer.data;
        const parametersLength = this.parameters.length;
        for (let i = 0; i < parametersLength; i++) {
          yield* this.generateParameterData(this.parameters[i]);
        }
      }
      toString(indent = "") {
        return indent + ("RPC Request - " + this.procedure);
      }
      *generateParameterData(parameter) {
        const buffer = new _writableTrackingBuffer.default(1 + 2 + Buffer.byteLength(parameter.name, "ucs-2") + 1);
        if (parameter.name) {
          buffer.writeBVarchar("@" + parameter.name);
        } else {
          buffer.writeBVarchar("");
        }
        let statusFlags = 0;
        if (parameter.output) {
          statusFlags |= STATUS.BY_REF_VALUE;
        }
        buffer.writeUInt8(statusFlags);
        yield buffer.data;
        const param = {
          value: parameter.value
        };
        const type = parameter.type;
        if ((type.id & 48) === 32) {
          if (parameter.length) {
            param.length = parameter.length;
          } else if (type.resolveLength) {
            param.length = type.resolveLength(parameter);
          }
        }
        if (parameter.precision) {
          param.precision = parameter.precision;
        } else if (type.resolvePrecision) {
          param.precision = type.resolvePrecision(parameter);
        }
        if (parameter.scale) {
          param.scale = parameter.scale;
        } else if (type.resolveScale) {
          param.scale = type.resolveScale(parameter);
        }
        if (this.collation) {
          param.collation = this.collation;
        }
        yield type.generateTypeInfo(param, this.options);
        yield type.generateParameterLength(param, this.options);
        try {
          yield* type.generateParameterData(param, this.options);
        } catch (error) {
          throw new _errors.InputError(`Input parameter '${parameter.name}' could not be validated`, {
            cause: error
          });
        }
      }
    }
    exports.default = RpcRequestPayload;
    module.exports = RpcRequestPayload;
  })(rpcrequestPayload, rpcrequestPayload.exports);
  return rpcrequestPayload.exports;
}
var sqlbatchPayload = { exports: {} };
var hasRequiredSqlbatchPayload;
function requireSqlbatchPayload() {
  if (hasRequiredSqlbatchPayload) return sqlbatchPayload.exports;
  hasRequiredSqlbatchPayload = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _writableTrackingBuffer = _interopRequireDefault(requireWritableTrackingBuffer());
    var _allHeaders = requireAllHeaders();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    class SqlBatchPayload {
      constructor(sqlText, txnDescriptor, options) {
        this.sqlText = sqlText;
        this.txnDescriptor = txnDescriptor;
        this.options = options;
      }
      *[Symbol.iterator]() {
        if (this.options.tdsVersion >= "7_2") {
          const buffer = new _writableTrackingBuffer.default(18, "ucs2");
          const outstandingRequestCount = 1;
          (0, _allHeaders.writeToTrackingBuffer)(buffer, this.txnDescriptor, outstandingRequestCount);
          yield buffer.data;
        }
        yield Buffer.from(this.sqlText, "ucs2");
      }
      toString(indent = "") {
        return indent + ("SQL Batch - " + this.sqlText);
      }
    }
    exports.default = SqlBatchPayload;
    module.exports = SqlBatchPayload;
  })(sqlbatchPayload, sqlbatchPayload.exports);
  return sqlbatchPayload.exports;
}
var messageIo = { exports: {} };
var message = { exports: {} };
var hasRequiredMessage;
function requireMessage() {
  if (hasRequiredMessage) return message.exports;
  hasRequiredMessage = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _stream = require$$0;
    class Message extends _stream.PassThrough {
      constructor({
        type,
        resetConnection = false
      }) {
        super();
        this.type = type;
        this.resetConnection = resetConnection;
        this.ignore = false;
      }
    }
    exports.default = Message;
    module.exports = Message;
  })(message, message.exports);
  return message.exports;
}
var incomingMessageStream = { exports: {} };
var hasRequiredIncomingMessageStream;
function requireIncomingMessageStream() {
  if (hasRequiredIncomingMessageStream) return incomingMessageStream.exports;
  hasRequiredIncomingMessageStream = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _bl = _interopRequireDefault(requireBl());
    var _stream = require$$0;
    var _message = _interopRequireDefault(requireMessage());
    var _packet = requirePacket();
    var _errors = requireErrors();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    class IncomingMessageStream extends _stream.Transform {
      constructor(debug2) {
        super({
          readableObjectMode: true
        });
        this.debug = debug2;
        this.currentMessage = void 0;
        this.bl = new _bl.default();
      }
      pause() {
        super.pause();
        if (this.currentMessage) {
          this.currentMessage.pause();
        }
        return this;
      }
      resume() {
        super.resume();
        if (this.currentMessage) {
          this.currentMessage.resume();
        }
        return this;
      }
      processBufferedData(callback) {
        while (this.bl.length >= _packet.HEADER_LENGTH) {
          const length = this.bl.readUInt16BE(2);
          if (length < _packet.HEADER_LENGTH) {
            return callback(new _errors.ConnectionError("Unable to process incoming packet"));
          }
          if (this.bl.length >= length) {
            const data = this.bl.slice(0, length);
            this.bl.consume(length);
            const packet2 = new _packet.Packet(data);
            this.debug.packet("Received", packet2);
            this.debug.data(packet2);
            let message2 = this.currentMessage;
            if (message2 === void 0) {
              this.currentMessage = message2 = new _message.default({
                type: packet2.type(),
                resetConnection: false
              });
              this.push(message2);
            }
            if (packet2.isLast()) {
              message2.once("end", () => {
                this.currentMessage = void 0;
                this.processBufferedData(callback);
              });
              message2.end(packet2.data());
              return;
            } else if (!message2.write(packet2.data())) {
              message2.once("drain", () => {
                this.processBufferedData(callback);
              });
              return;
            }
          } else {
            break;
          }
        }
        callback();
      }
      _transform(chunk, _encoding, callback) {
        this.bl.append(chunk);
        this.processBufferedData(callback);
      }
    }
    exports.default = IncomingMessageStream;
    module.exports = IncomingMessageStream;
  })(incomingMessageStream, incomingMessageStream.exports);
  return incomingMessageStream.exports;
}
var outgoingMessageStream = { exports: {} };
var hasRequiredOutgoingMessageStream;
function requireOutgoingMessageStream() {
  if (hasRequiredOutgoingMessageStream) return outgoingMessageStream.exports;
  hasRequiredOutgoingMessageStream = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _bl = _interopRequireDefault(requireBl());
    var _stream = require$$0;
    var _packet = requirePacket();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    class OutgoingMessageStream extends _stream.Duplex {
      constructor(debug2, {
        packetSize
      }) {
        super({
          writableObjectMode: true
        });
        this.packetSize = packetSize;
        this.debug = debug2;
        this.bl = new _bl.default();
        this.on("finish", () => {
          this.push(null);
        });
      }
      _write(message2, _encoding, callback) {
        const length = this.packetSize - _packet.HEADER_LENGTH;
        let packetNumber = 0;
        this.currentMessage = message2;
        this.currentMessage.on("data", (data) => {
          if (message2.ignore) {
            return;
          }
          this.bl.append(data);
          while (this.bl.length > length) {
            const data2 = this.bl.slice(0, length);
            this.bl.consume(length);
            const packet2 = new _packet.Packet(message2.type);
            packet2.packetId(packetNumber += 1);
            packet2.resetConnection(message2.resetConnection);
            packet2.addData(data2);
            this.debug.packet("Sent", packet2);
            this.debug.data(packet2);
            if (this.push(packet2.buffer) === false) {
              message2.pause();
            }
          }
        });
        this.currentMessage.on("end", () => {
          const data = this.bl.slice();
          this.bl.consume(data.length);
          const packet2 = new _packet.Packet(message2.type);
          packet2.packetId(packetNumber += 1);
          packet2.resetConnection(message2.resetConnection);
          packet2.last(true);
          packet2.ignore(message2.ignore);
          packet2.addData(data);
          this.debug.packet("Sent", packet2);
          this.debug.data(packet2);
          this.push(packet2.buffer);
          this.currentMessage = void 0;
          callback();
        });
      }
      _read(_size) {
        if (this.currentMessage) {
          this.currentMessage.resume();
        }
      }
    }
    exports.default = OutgoingMessageStream;
    module.exports = OutgoingMessageStream;
  })(outgoingMessageStream, outgoingMessageStream.exports);
  return outgoingMessageStream.exports;
}
var hasRequiredMessageIo;
function requireMessageIo() {
  if (hasRequiredMessageIo) return messageIo.exports;
  hasRequiredMessageIo = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _nativeDuplexpair = _interopRequireDefault(requireNativeDuplexpair());
    var tls = _interopRequireWildcard(require$$1$1);
    var _events = require$$0$1;
    var _message = _interopRequireDefault(requireMessage());
    var _packet = requirePacket();
    var _incomingMessageStream = _interopRequireDefault(requireIncomingMessageStream());
    var _outgoingMessageStream = _interopRequireDefault(requireOutgoingMessageStream());
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, default: e2 };
        if (null === e2 || "object" != typeof e2 && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (const t3 in e2) "default" !== t3 && {}.hasOwnProperty.call(e2, t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, t3)) && (i.get || i.set) ? o(f, t3, i) : f[t3] = e2[t3]);
        return f;
      })(e, t);
    }
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    class MessageIO extends _events.EventEmitter {
      constructor(socket, packetSize, debug2) {
        super();
        this.socket = socket;
        this.debug = debug2;
        this.tlsNegotiationComplete = false;
        this.incomingMessageStream = new _incomingMessageStream.default(this.debug);
        this.incomingMessageIterator = this.incomingMessageStream[Symbol.asyncIterator]();
        this.outgoingMessageStream = new _outgoingMessageStream.default(this.debug, {
          packetSize
        });
        this.socket.pipe(this.incomingMessageStream);
        this.outgoingMessageStream.pipe(this.socket);
      }
      packetSize(...args) {
        if (args.length > 0) {
          const packetSize = args[0];
          this.debug.log("Packet size changed from " + this.outgoingMessageStream.packetSize + " to " + packetSize);
          this.outgoingMessageStream.packetSize = packetSize;
        }
        if (this.securePair) {
          this.securePair.cleartext.setMaxSendFragment(this.outgoingMessageStream.packetSize);
        }
        return this.outgoingMessageStream.packetSize;
      }
      // Negotiate TLS encryption.
      startTls(credentialsDetails, hostname, trustServerCertificate) {
        if (!credentialsDetails.maxVersion || !["TLSv1.2", "TLSv1.1", "TLSv1"].includes(credentialsDetails.maxVersion)) {
          credentialsDetails.maxVersion = "TLSv1.2";
        }
        const secureContext = tls.createSecureContext(credentialsDetails);
        return new Promise((resolve, reject) => {
          const duplexpair = new _nativeDuplexpair.default();
          const securePair = this.securePair = {
            cleartext: tls.connect({
              socket: duplexpair.socket1,
              servername: hostname,
              secureContext,
              rejectUnauthorized: !trustServerCertificate
            }),
            encrypted: duplexpair.socket2
          };
          const onSecureConnect = () => {
            securePair.encrypted.removeListener("readable", onReadable);
            securePair.cleartext.removeListener("error", onError);
            securePair.cleartext.removeListener("secureConnect", onSecureConnect);
            securePair.cleartext.once("error", (err) => {
              this.socket.destroy(err);
            });
            const cipher = securePair.cleartext.getCipher();
            if (cipher) {
              this.debug.log("TLS negotiated (" + cipher.name + ", " + cipher.version + ")");
            }
            this.emit("secure", securePair.cleartext);
            securePair.cleartext.setMaxSendFragment(this.outgoingMessageStream.packetSize);
            this.outgoingMessageStream.unpipe(this.socket);
            this.socket.unpipe(this.incomingMessageStream);
            this.socket.pipe(securePair.encrypted);
            securePair.encrypted.pipe(this.socket);
            securePair.cleartext.pipe(this.incomingMessageStream);
            this.outgoingMessageStream.pipe(securePair.cleartext);
            this.tlsNegotiationComplete = true;
            resolve();
          };
          const onError = (err) => {
            securePair.encrypted.removeListener("readable", onReadable);
            securePair.cleartext.removeListener("error", onError);
            securePair.cleartext.removeListener("secureConnect", onSecureConnect);
            securePair.cleartext.destroy();
            securePair.encrypted.destroy();
            reject(err);
          };
          const onReadable = () => {
            const message2 = new _message.default({
              type: _packet.TYPE.PRELOGIN,
              resetConnection: false
            });
            let chunk;
            while (chunk = securePair.encrypted.read()) {
              message2.write(chunk);
            }
            this.outgoingMessageStream.write(message2);
            message2.end();
            this.readMessage().then(async (response) => {
              securePair.encrypted.once("readable", onReadable);
              for await (const data of response) {
                securePair.encrypted.write(data);
              }
            }).catch(onError);
          };
          securePair.cleartext.once("error", onError);
          securePair.cleartext.once("secureConnect", onSecureConnect);
          securePair.encrypted.once("readable", onReadable);
        });
      }
      // TODO listen for 'drain' event when socket.write returns false.
      // TODO implement incomplete request cancelation (2.2.1.6)
      sendMessage(packetType, data, resetConnection) {
        const message2 = new _message.default({
          type: packetType,
          resetConnection
        });
        message2.end(data);
        this.outgoingMessageStream.write(message2);
        return message2;
      }
      /**
       * Read the next incoming message from the socket.
       */
      async readMessage() {
        const result = await this.incomingMessageIterator.next();
        if (result.done) {
          throw new Error("unexpected end of message stream");
        }
        return result.value;
      }
    }
    exports.default = MessageIO;
    module.exports = MessageIO;
  })(messageIo, messageIo.exports);
  return messageIo.exports;
}
var tokenStreamParser = {};
var streamParser = { exports: {} };
var colmetadataTokenParser = { exports: {} };
var metadataParser = { exports: {} };
var collation = {};
var hasRequiredCollation;
function requireCollation() {
  if (hasRequiredCollation) return collation;
  hasRequiredCollation = 1;
  Object.defineProperty(collation, "__esModule", {
    value: true
  });
  collation.codepageBySortId = collation.codepageByLanguageId = collation.Flags = collation.Collation = void 0;
  const codepageByLanguageId = collation.codepageByLanguageId = {
    // Arabic_*
    [1025]: "CP1256",
    // Chinese_Taiwan_Stroke_*
    // Chinese_Traditional_Stroke_Count_*
    // Chinese_Taiwan_Bopomofo_*
    // Chinese_Traditional_Bopomofo_*
    [1028]: "CP950",
    // Czech_*
    [1029]: "CP1250",
    // Danish_Greenlandic_*
    // Danish_Norwegian_*
    [1030]: "CP1252",
    // Greek_*
    [1032]: "CP1253",
    // Latin1_General_*
    [1033]: "CP1252",
    // Traditional_Spanish_*
    [1034]: "CP1252",
    // Finnish_Swedish_*
    [1035]: "CP1252",
    // French_*
    [1036]: "CP1252",
    // Hebrew_*
    [1037]: "CP1255",
    // Hungarian_*
    // Hungarian_Technical_*
    [1038]: "CP1250",
    // Icelandic_*
    [1039]: "CP1252",
    // Japanese_*
    // Japanese_XJIS_*
    // Japanese_Unicode_*
    // Japanese_Bushu_Kakusu_*
    [1041]: "CP932",
    // Korean_*
    // Korean_Wansung_*
    [1042]: "CP949",
    // Norwegian_*
    [1044]: "CP1252",
    // Polish_*
    [1045]: "CP1250",
    // Romansh_*
    [1047]: "CP1252",
    // Romanian_*
    [1048]: "CP1250",
    // Cyrillic_*
    [1049]: "CP1251",
    // Croatian_*
    [1050]: "CP1250",
    // Slovak_*
    [1051]: "CP1250",
    // Albanian_*
    [1052]: "CP1250",
    // Thai_*
    [1054]: "CP874",
    // Turkish_*
    [1055]: "CP1254",
    // Urdu_*
    [1056]: "CP1256",
    // Ukrainian_*
    [1058]: "CP1251",
    // Slovenian_*
    [1060]: "CP1250",
    // Estonian_*
    [1061]: "CP1257",
    // Latvian_*
    [1062]: "CP1257",
    // Lithuanian_*
    [1063]: "CP1257",
    // Persian_*
    [1065]: "CP1256",
    // Vietnamese_*
    [1066]: "CP1258",
    // Azeri_Latin_*
    [1068]: "CP1254",
    // Upper_Sorbian_*
    [1070]: "CP1252",
    // Macedonian_FYROM_*
    [1071]: "CP1251",
    // Sami_Norway_*
    [1083]: "CP1252",
    // Kazakh_*
    [1087]: "CP1251",
    // Turkmen_*
    [1090]: "CP1250",
    // Uzbek_Latin_*
    [1091]: "CP1254",
    // Tatar_*
    [1092]: "CP1251",
    // Welsh_*
    [1106]: "CP1252",
    // Frisian_*
    [1122]: "CP1252",
    // Bashkir_*
    [1133]: "CP1251",
    // Mapudungan_*
    [1146]: "CP1252",
    // Mohawk_*
    [1148]: "CP1252",
    // Breton_*
    [1150]: "CP1252",
    // Uighur_*
    [1152]: "CP1256",
    // Corsican_*
    [1155]: "CP1252",
    // Yakut_*
    [1157]: "CP1251",
    // Dari_*
    [1164]: "CP1256",
    // Chinese_PRC_*
    // Chinese_Simplified_Pinyin_*
    // Chinese_PRC_Stroke_*
    // Chinese_Simplified_Stroke_Order_*
    [2052]: "CP936",
    // Serbian_Latin_*
    [2074]: "CP1250",
    // Azeri_Cyrillic_*
    [2092]: "CP1251",
    // Sami_Sweden_Finland_*
    [2107]: "CP1252",
    // Tamazight_*
    [2143]: "CP1252",
    // Chinese_Hong_Kong_Stroke_*
    [3076]: "CP950",
    // Modern_Spanish_*
    [3082]: "CP1252",
    // Serbian_Cyrillic_*
    [3098]: "CP1251",
    // Chinese_Traditional_Pinyin_*
    // Chinese_Traditional_Stroke_Order_*
    [5124]: "CP950",
    // Bosnian_Latin_*
    [5146]: "CP1250",
    // Bosnian_Cyrillic_*
    [8218]: "CP1251",
    // German
    // German_PhoneBook_*
    [1031]: "CP1252",
    // Georgian_Modern_Sort_*
    [1079]: "CP1252"
  };
  const codepageBySortId = collation.codepageBySortId = {
    [30]: "CP437",
    // SQL_Latin1_General_CP437_BIN
    [31]: "CP437",
    // SQL_Latin1_General_CP437_CS_AS
    [32]: "CP437",
    // SQL_Latin1_General_CP437_CI_AS
    [33]: "CP437",
    // SQL_Latin1_General_Pref_CP437_CI_AS
    [34]: "CP437",
    // SQL_Latin1_General_CP437_CI_AI
    [40]: "CP850",
    // SQL_Latin1_General_CP850_BIN
    [41]: "CP850",
    // SQL_Latin1_General_CP850_CS_AS
    [42]: "CP850",
    // SQL_Latin1_General_CP850_CI_AS
    [43]: "CP850",
    // SQL_Latin1_General_Pref_CP850_CI_AS
    [44]: "CP850",
    // SQL_Latin1_General_CP850_CI_AI
    [49]: "CP850",
    // SQL_1xCompat_CP850_CI_AS
    [51]: "CP1252",
    // SQL_Latin1_General_Cp1_CS_AS_KI_WI
    [52]: "CP1252",
    // SQL_Latin1_General_Cp1_CI_AS_KI_WI
    [53]: "CP1252",
    // SQL_Latin1_General_Pref_Cp1_CI_AS_KI_WI
    [54]: "CP1252",
    // SQL_Latin1_General_Cp1_CI_AI_KI_WI
    [55]: "CP850",
    // SQL_AltDiction_CP850_CS_AS
    [56]: "CP850",
    // SQL_AltDiction_Pref_CP850_CI_AS
    [57]: "CP850",
    // SQL_AltDiction_CP850_CI_AI
    [58]: "CP850",
    // SQL_Scandinavian_Pref_CP850_CI_AS
    [59]: "CP850",
    // SQL_Scandinavian_CP850_CS_AS
    [60]: "CP850",
    // SQL_Scandinavian_CP850_CI_AS
    [61]: "CP850",
    // SQL_AltDiction_CP850_CI_AS
    [80]: "CP1250",
    // SQL_Latin1_General_1250_BIN
    [81]: "CP1250",
    // SQL_Latin1_General_CP1250_CS_AS
    [82]: "CP1250",
    // SQL_Latin1_General_Cp1250_CI_AS_KI_WI
    [83]: "CP1250",
    // SQL_Czech_Cp1250_CS_AS_KI_WI
    [84]: "CP1250",
    // SQL_Czech_Cp1250_CI_AS_KI_WI
    [85]: "CP1250",
    // SQL_Hungarian_Cp1250_CS_AS_KI_WI
    [86]: "CP1250",
    // SQL_Hungarian_Cp1250_CI_AS_KI_WI
    [87]: "CP1250",
    // SQL_Polish_Cp1250_CS_AS_KI_WI
    [88]: "CP1250",
    // SQL_Polish_Cp1250_CI_AS_KI_WI
    [89]: "CP1250",
    // SQL_Romanian_Cp1250_CS_AS_KI_WI
    [90]: "CP1250",
    // SQL_Romanian_Cp1250_CI_AS_KI_WI
    [91]: "CP1250",
    // SQL_Croatian_Cp1250_CS_AS_KI_WI
    [92]: "CP1250",
    // SQL_Croatian_Cp1250_CI_AS_KI_WI
    [93]: "CP1250",
    // SQL_Slovak_Cp1250_CS_AS_KI_WI
    [94]: "CP1250",
    // SQL_Slovak_Cp1250_CI_AS_KI_WI
    [95]: "CP1250",
    // SQL_Slovenian_Cp1250_CS_AS_KI_WI
    [96]: "CP1250",
    // SQL_Slovenian_Cp1250_CI_AS_KI_WI
    [104]: "CP1251",
    // SQL_Latin1_General_1251_BIN
    [105]: "CP1251",
    // SQL_Latin1_General_CP1251_CS_AS
    [106]: "CP1251",
    // SQL_Latin1_General_CP1251_CI_AS
    [107]: "CP1251",
    // SQL_Ukrainian_Cp1251_CS_AS_KI_WI
    [108]: "CP1251",
    // SQL_Ukrainian_Cp1251_CI_AS_KI_WI
    [112]: "CP1253",
    // SQL_Latin1_General_1253_BIN
    [113]: "CP1253",
    // SQL_Latin1_General_CP1253_CS_AS
    [114]: "CP1253",
    // SQL_Latin1_General_CP1253_CI_AS
    [120]: "CP1253",
    // SQL_MixDiction_CP1253_CS_AS
    [121]: "CP1253",
    // SQL_AltDiction_CP1253_CS_AS
    [122]: "CP1253",
    // SQL_AltDiction2_CP1253_CS_AS
    [124]: "CP1253",
    // SQL_Latin1_General_CP1253_CI_AI
    [128]: "CP1254",
    // SQL_Latin1_General_1254_BIN
    [129]: "CP1254",
    // SQL_Latin1_General_Cp1254_CS_AS_KI_WI
    [130]: "CP1254",
    // SQL_Latin1_General_Cp1254_CI_AS_KI_WI
    [136]: "CP1255",
    // SQL_Latin1_General_1255_BIN
    [137]: "CP1255",
    // SQL_Latin1_General_CP1255_CS_AS
    [138]: "CP1255",
    // SQL_Latin1_General_CP1255_CI_AS
    [144]: "CP1256",
    // SQL_Latin1_General_1256_BIN
    [145]: "CP1256",
    // SQL_Latin1_General_CP1256_CS_AS
    [146]: "CP1256",
    // SQL_Latin1_General_CP1256_CI_AS
    [152]: "CP1257",
    // SQL_Latin1_General_1257_BIN
    [153]: "CP1257",
    // SQL_Latin1_General_CP1257_CS_AS
    [154]: "CP1257",
    // SQL_Latin1_General_CP1257_CI_AS
    [155]: "CP1257",
    // SQL_Estonian_Cp1257_CS_AS_KI_WI
    [156]: "CP1257",
    // SQL_Estonian_Cp1257_CI_AS_KI_WI
    [157]: "CP1257",
    // SQL_Latvian_Cp1257_CS_AS_KI_WI
    [158]: "CP1257",
    // SQL_Latvian_Cp1257_CI_AS_KI_WI
    [159]: "CP1257",
    // SQL_Lithuanian_Cp1257_CS_AS_KI_WI
    [160]: "CP1257",
    // SQL_Lithuanian_Cp1257_CI_AS_KI_WI
    [183]: "CP1252",
    // SQL_Danish_Pref_Cp1_CI_AS_KI_WI
    [184]: "CP1252",
    // SQL_SwedishPhone_Pref_Cp1_CI_AS_KI_WI
    [185]: "CP1252",
    // SQL_SwedishStd_Pref_Cp1_CI_AS_KI_WI
    [186]: "CP1252"
    // SQL_Icelandic_Pref_Cp1_CI_AS_KI_WI
  };
  const Flags = collation.Flags = {
    IGNORE_CASE: 1 << 0,
    IGNORE_ACCENT: 1 << 1,
    IGNORE_KANA: 1 << 2,
    IGNORE_WIDTH: 1 << 3,
    BINARY: 1 << 4,
    BINARY2: 1 << 5,
    UTF8: 1 << 6
  };
  class Collation {
    static fromBuffer(buffer, offset = 0) {
      let lcid = (buffer[offset + 2] & 15) << 16;
      lcid |= buffer[offset + 1] << 8;
      lcid |= buffer[offset + 0];
      let flags = (buffer[offset + 3] & 15) << 4;
      flags |= (buffer[offset + 2] & 240) >>> 4;
      const version2 = (buffer[offset + 3] & 240) >>> 4;
      const sortId = buffer[offset + 4];
      return new this(lcid, flags, version2, sortId);
    }
    constructor(lcid, flags, version2, sortId) {
      this.buffer = void 0;
      this.lcid = lcid;
      this.flags = flags;
      this.version = version2;
      this.sortId = sortId;
      if (this.flags & Flags.UTF8) {
        this.codepage = "utf-8";
      } else if (this.sortId) {
        this.codepage = codepageBySortId[this.sortId];
      } else {
        const languageId = this.lcid & 65535;
        this.codepage = codepageByLanguageId[languageId];
      }
    }
    toBuffer() {
      if (this.buffer) {
        return this.buffer;
      }
      this.buffer = Buffer.alloc(5);
      this.buffer[0] = this.lcid & 255;
      this.buffer[1] = this.lcid >>> 8 & 255;
      this.buffer[2] = this.lcid >>> 16 & 15 | (this.flags & 15) << 4;
      this.buffer[3] = (this.flags & 240) >>> 4 | (this.version & 15) << 4;
      this.buffer[4] = this.sortId & 255;
      return this.buffer;
    }
  }
  collation.Collation = Collation;
  return collation;
}
var dataType = {};
var _null = { exports: {} };
var hasRequired_null;
function require_null() {
  if (hasRequired_null) return _null.exports;
  hasRequired_null = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const Null = {
      id: 31,
      type: "NULL",
      name: "Null",
      declaration() {
        throw new Error("not implemented");
      },
      generateTypeInfo() {
        throw new Error("not implemented");
      },
      generateParameterLength() {
        throw new Error("not implemented");
      },
      generateParameterData() {
        throw new Error("not implemented");
      },
      validate() {
        throw new Error("not implemented");
      }
    };
    exports.default = Null;
    module.exports = Null;
  })(_null, _null.exports);
  return _null.exports;
}
var tinyint = { exports: {} };
var intn = { exports: {} };
var hasRequiredIntn;
function requireIntn() {
  if (hasRequiredIntn) return intn.exports;
  hasRequiredIntn = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const IntN = {
      id: 38,
      type: "INTN",
      name: "IntN",
      declaration() {
        throw new Error("not implemented");
      },
      generateTypeInfo() {
        throw new Error("not implemented");
      },
      generateParameterLength() {
        throw new Error("not implemented");
      },
      generateParameterData() {
        throw new Error("not implemented");
      },
      validate() {
        throw new Error("not implemented");
      }
    };
    exports.default = IntN;
    module.exports = IntN;
  })(intn, intn.exports);
  return intn.exports;
}
var hasRequiredTinyint;
function requireTinyint() {
  if (hasRequiredTinyint) return tinyint.exports;
  hasRequiredTinyint = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _intn = _interopRequireDefault(requireIntn());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const DATA_LENGTH = Buffer.from([1]);
    const NULL_LENGTH = Buffer.from([0]);
    const TinyInt = {
      id: 48,
      type: "INT1",
      name: "TinyInt",
      declaration: function() {
        return "tinyint";
      },
      generateTypeInfo() {
        return Buffer.from([_intn.default.id, 1]);
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        return DATA_LENGTH;
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        const buffer = Buffer.alloc(1);
        buffer.writeUInt8(Number(parameter.value), 0);
        yield buffer;
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        if (typeof value !== "number") {
          value = Number(value);
        }
        if (isNaN(value)) {
          throw new TypeError("Invalid number.");
        }
        if (value < 0 || value > 255) {
          throw new TypeError("Value must be between 0 and 255, inclusive.");
        }
        return value | 0;
      }
    };
    exports.default = TinyInt;
    module.exports = TinyInt;
  })(tinyint, tinyint.exports);
  return tinyint.exports;
}
var bit = { exports: {} };
var bitn = { exports: {} };
var hasRequiredBitn;
function requireBitn() {
  if (hasRequiredBitn) return bitn.exports;
  hasRequiredBitn = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const BitN = {
      id: 104,
      type: "BITN",
      name: "BitN",
      declaration() {
        throw new Error("not implemented");
      },
      generateTypeInfo() {
        throw new Error("not implemented");
      },
      generateParameterLength() {
        throw new Error("not implemented");
      },
      *generateParameterData() {
        throw new Error("not implemented");
      },
      validate() {
        throw new Error("not implemented");
      }
    };
    exports.default = BitN;
    module.exports = BitN;
  })(bitn, bitn.exports);
  return bitn.exports;
}
var hasRequiredBit;
function requireBit() {
  if (hasRequiredBit) return bit.exports;
  hasRequiredBit = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _bitn = _interopRequireDefault(requireBitn());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const DATA_LENGTH = Buffer.from([1]);
    const NULL_LENGTH = Buffer.from([0]);
    const Bit = {
      id: 50,
      type: "BIT",
      name: "Bit",
      declaration: function() {
        return "bit";
      },
      generateTypeInfo() {
        return Buffer.from([_bitn.default.id, 1]);
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        return DATA_LENGTH;
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        yield parameter.value ? Buffer.from([1]) : Buffer.from([0]);
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        if (value) {
          return true;
        } else {
          return false;
        }
      }
    };
    exports.default = Bit;
    module.exports = Bit;
  })(bit, bit.exports);
  return bit.exports;
}
var smallint = { exports: {} };
var hasRequiredSmallint;
function requireSmallint() {
  if (hasRequiredSmallint) return smallint.exports;
  hasRequiredSmallint = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _intn = _interopRequireDefault(requireIntn());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const DATA_LENGTH = Buffer.from([2]);
    const NULL_LENGTH = Buffer.from([0]);
    const SmallInt = {
      id: 52,
      type: "INT2",
      name: "SmallInt",
      declaration: function() {
        return "smallint";
      },
      generateTypeInfo() {
        return Buffer.from([_intn.default.id, 2]);
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        return DATA_LENGTH;
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        const buffer = Buffer.alloc(2);
        buffer.writeInt16LE(Number(parameter.value), 0);
        yield buffer;
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        if (typeof value !== "number") {
          value = Number(value);
        }
        if (isNaN(value)) {
          throw new TypeError("Invalid number.");
        }
        if (value < -32768 || value > 32767) {
          throw new TypeError("Value must be between -32768 and 32767, inclusive.");
        }
        return value | 0;
      }
    };
    exports.default = SmallInt;
    module.exports = SmallInt;
  })(smallint, smallint.exports);
  return smallint.exports;
}
var int = { exports: {} };
var hasRequiredInt;
function requireInt() {
  if (hasRequiredInt) return int.exports;
  hasRequiredInt = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _intn = _interopRequireDefault(requireIntn());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const NULL_LENGTH = Buffer.from([0]);
    const DATA_LENGTH = Buffer.from([4]);
    const Int = {
      id: 56,
      type: "INT4",
      name: "Int",
      declaration: function() {
        return "int";
      },
      generateTypeInfo() {
        return Buffer.from([_intn.default.id, 4]);
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        return DATA_LENGTH;
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        const buffer = Buffer.alloc(4);
        buffer.writeInt32LE(Number(parameter.value), 0);
        yield buffer;
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        if (typeof value !== "number") {
          value = Number(value);
        }
        if (isNaN(value)) {
          throw new TypeError("Invalid number.");
        }
        if (value < -2147483648 || value > 2147483647) {
          throw new TypeError("Value must be between -2147483648 and 2147483647, inclusive.");
        }
        return value | 0;
      }
    };
    exports.default = Int;
    module.exports = Int;
  })(int, int.exports);
  return int.exports;
}
var smalldatetime = { exports: {} };
var datetimen = { exports: {} };
var hasRequiredDatetimen;
function requireDatetimen() {
  if (hasRequiredDatetimen) return datetimen.exports;
  hasRequiredDatetimen = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const DateTimeN = {
      id: 111,
      type: "DATETIMN",
      name: "DateTimeN",
      declaration() {
        throw new Error("not implemented");
      },
      generateTypeInfo() {
        throw new Error("not implemented");
      },
      generateParameterLength() {
        throw new Error("not implemented");
      },
      generateParameterData() {
        throw new Error("not implemented");
      },
      validate() {
        throw new Error("not implemented");
      }
    };
    exports.default = DateTimeN;
    module.exports = DateTimeN;
  })(datetimen, datetimen.exports);
  return datetimen.exports;
}
var hasRequiredSmalldatetime;
function requireSmalldatetime() {
  if (hasRequiredSmalldatetime) return smalldatetime.exports;
  hasRequiredSmalldatetime = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _datetimen = _interopRequireDefault(requireDatetimen());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const EPOCH_DATE = new Date(1900, 0, 1);
    const UTC_EPOCH_DATE = new Date(Date.UTC(1900, 0, 1));
    const DATA_LENGTH = Buffer.from([4]);
    const NULL_LENGTH = Buffer.from([0]);
    const SmallDateTime = {
      id: 58,
      type: "DATETIM4",
      name: "SmallDateTime",
      declaration: function() {
        return "smalldatetime";
      },
      generateTypeInfo() {
        return Buffer.from([_datetimen.default.id, 4]);
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        return DATA_LENGTH;
      },
      generateParameterData: function* (parameter, options) {
        if (parameter.value == null) {
          return;
        }
        const buffer = Buffer.alloc(4);
        let days, dstDiff, minutes;
        if (options.useUTC) {
          days = Math.floor((parameter.value.getTime() - UTC_EPOCH_DATE.getTime()) / (1e3 * 60 * 60 * 24));
          minutes = parameter.value.getUTCHours() * 60 + parameter.value.getUTCMinutes();
        } else {
          dstDiff = -(parameter.value.getTimezoneOffset() - EPOCH_DATE.getTimezoneOffset()) * 60 * 1e3;
          days = Math.floor((parameter.value.getTime() - EPOCH_DATE.getTime() + dstDiff) / (1e3 * 60 * 60 * 24));
          minutes = parameter.value.getHours() * 60 + parameter.value.getMinutes();
        }
        buffer.writeUInt16LE(days, 0);
        buffer.writeUInt16LE(minutes, 2);
        yield buffer;
      },
      validate: function(value, collation2, options) {
        if (value == null) {
          return null;
        }
        if (!(value instanceof Date)) {
          value = new Date(Date.parse(value));
        }
        value = value;
        let year, month, date2;
        if (options && options.useUTC) {
          year = value.getUTCFullYear();
          month = value.getUTCMonth();
          date2 = value.getUTCDate();
        } else {
          year = value.getFullYear();
          month = value.getMonth();
          date2 = value.getDate();
        }
        if (year < 1900 || year > 2079) {
          throw new TypeError("Out of range.");
        }
        if (year === 2079) {
          if (month > 5 || month === 5 && date2 > 6) {
            throw new TypeError("Out of range.");
          }
        }
        if (isNaN(value)) {
          throw new TypeError("Invalid date.");
        }
        return value;
      }
    };
    exports.default = SmallDateTime;
    module.exports = SmallDateTime;
  })(smalldatetime, smalldatetime.exports);
  return smalldatetime.exports;
}
var real = { exports: {} };
var floatn = { exports: {} };
var hasRequiredFloatn;
function requireFloatn() {
  if (hasRequiredFloatn) return floatn.exports;
  hasRequiredFloatn = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const FloatN = {
      id: 109,
      type: "FLTN",
      name: "FloatN",
      declaration() {
        throw new Error("not implemented");
      },
      generateTypeInfo() {
        throw new Error("not implemented");
      },
      generateParameterLength() {
        throw new Error("not implemented");
      },
      generateParameterData() {
        throw new Error("not implemented");
      },
      validate() {
        throw new Error("not implemented");
      }
    };
    exports.default = FloatN;
    module.exports = FloatN;
  })(floatn, floatn.exports);
  return floatn.exports;
}
var hasRequiredReal;
function requireReal() {
  if (hasRequiredReal) return real.exports;
  hasRequiredReal = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _floatn = _interopRequireDefault(requireFloatn());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const NULL_LENGTH = Buffer.from([0]);
    const DATA_LENGTH = Buffer.from([4]);
    const Real = {
      id: 59,
      type: "FLT4",
      name: "Real",
      declaration: function() {
        return "real";
      },
      generateTypeInfo() {
        return Buffer.from([_floatn.default.id, 4]);
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        return DATA_LENGTH;
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        const buffer = Buffer.alloc(4);
        buffer.writeFloatLE(parseFloat(parameter.value), 0);
        yield buffer;
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        value = parseFloat(value);
        if (isNaN(value)) {
          throw new TypeError("Invalid number.");
        }
        return value;
      }
    };
    exports.default = Real;
    module.exports = Real;
  })(real, real.exports);
  return real.exports;
}
var money = { exports: {} };
var moneyn = { exports: {} };
var hasRequiredMoneyn;
function requireMoneyn() {
  if (hasRequiredMoneyn) return moneyn.exports;
  hasRequiredMoneyn = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const MoneyN = {
      id: 110,
      type: "MONEYN",
      name: "MoneyN",
      declaration() {
        throw new Error("not implemented");
      },
      generateTypeInfo() {
        throw new Error("not implemented");
      },
      generateParameterLength() {
        throw new Error("not implemented");
      },
      generateParameterData() {
        throw new Error("not implemented");
      },
      validate() {
        throw new Error("not implemented");
      }
    };
    exports.default = MoneyN;
    module.exports = MoneyN;
  })(moneyn, moneyn.exports);
  return moneyn.exports;
}
var hasRequiredMoney;
function requireMoney() {
  if (hasRequiredMoney) return money.exports;
  hasRequiredMoney = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _moneyn = _interopRequireDefault(requireMoneyn());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const SHIFT_LEFT_32 = (1 << 16) * (1 << 16);
    const SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;
    const NULL_LENGTH = Buffer.from([0]);
    const DATA_LENGTH = Buffer.from([8]);
    const Money = {
      id: 60,
      type: "MONEY",
      name: "Money",
      declaration: function() {
        return "money";
      },
      generateTypeInfo: function() {
        return Buffer.from([_moneyn.default.id, 8]);
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        return DATA_LENGTH;
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        const value = parameter.value * 1e4;
        const buffer = Buffer.alloc(8);
        buffer.writeInt32LE(Math.floor(value * SHIFT_RIGHT_32), 0);
        buffer.writeInt32LE(value & -1, 4);
        yield buffer;
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        value = parseFloat(value);
        if (isNaN(value)) {
          throw new TypeError("Invalid number.");
        }
        if (value < -9223372036854776e-1 || value > 9223372036854776e-1) {
          throw new TypeError("Value must be between -922337203685477.5808 and 922337203685477.5807, inclusive.");
        }
        return value;
      }
    };
    exports.default = Money;
    module.exports = Money;
  })(money, money.exports);
  return money.exports;
}
var datetime = { exports: {} };
var hasRequiredDatetime;
function requireDatetime() {
  if (hasRequiredDatetime) return datetime.exports;
  hasRequiredDatetime = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _datetimen = _interopRequireDefault(requireDatetimen());
    var _core = require$$0$5;
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const EPOCH_DATE = _core.LocalDate.ofYearDay(1900, 1);
    const NULL_LENGTH = Buffer.from([0]);
    const DATA_LENGTH = Buffer.from([8]);
    const DateTime = {
      id: 61,
      type: "DATETIME",
      name: "DateTime",
      declaration: function() {
        return "datetime";
      },
      generateTypeInfo() {
        return Buffer.from([_datetimen.default.id, 8]);
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        return DATA_LENGTH;
      },
      generateParameterData: function* (parameter, options) {
        if (parameter.value == null) {
          return;
        }
        const value = parameter.value;
        let date2;
        if (options.useUTC) {
          date2 = _core.LocalDate.of(value.getUTCFullYear(), value.getUTCMonth() + 1, value.getUTCDate());
        } else {
          date2 = _core.LocalDate.of(value.getFullYear(), value.getMonth() + 1, value.getDate());
        }
        let days = EPOCH_DATE.until(date2, _core.ChronoUnit.DAYS);
        let milliseconds, threeHundredthsOfSecond;
        if (options.useUTC) {
          let seconds = value.getUTCHours() * 60 * 60;
          seconds += value.getUTCMinutes() * 60;
          seconds += value.getUTCSeconds();
          milliseconds = seconds * 1e3 + value.getUTCMilliseconds();
        } else {
          let seconds = value.getHours() * 60 * 60;
          seconds += value.getMinutes() * 60;
          seconds += value.getSeconds();
          milliseconds = seconds * 1e3 + value.getMilliseconds();
        }
        threeHundredthsOfSecond = milliseconds / (3 + 1 / 3);
        threeHundredthsOfSecond = Math.round(threeHundredthsOfSecond);
        if (threeHundredthsOfSecond === 2592e4) {
          days += 1;
          threeHundredthsOfSecond = 0;
        }
        const buffer = Buffer.alloc(8);
        buffer.writeInt32LE(days, 0);
        buffer.writeUInt32LE(threeHundredthsOfSecond, 4);
        yield buffer;
      },
      // TODO: type 'any' needs to be revisited.
      validate: function(value, collation2, options) {
        if (value == null) {
          return null;
        }
        if (!(value instanceof Date)) {
          value = new Date(Date.parse(value));
        }
        value = value;
        let year;
        if (options && options.useUTC) {
          year = value.getUTCFullYear();
        } else {
          year = value.getFullYear();
        }
        if (year < 1753 || year > 9999) {
          throw new TypeError("Out of range.");
        }
        if (isNaN(value)) {
          throw new TypeError("Invalid date.");
        }
        return value;
      }
    };
    exports.default = DateTime;
    module.exports = DateTime;
  })(datetime, datetime.exports);
  return datetime.exports;
}
var float = { exports: {} };
var hasRequiredFloat;
function requireFloat() {
  if (hasRequiredFloat) return float.exports;
  hasRequiredFloat = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _floatn = _interopRequireDefault(requireFloatn());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const NULL_LENGTH = Buffer.from([0]);
    const Float = {
      id: 62,
      type: "FLT8",
      name: "Float",
      declaration: function() {
        return "float";
      },
      generateTypeInfo() {
        return Buffer.from([_floatn.default.id, 8]);
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        return Buffer.from([8]);
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        const buffer = Buffer.alloc(8);
        buffer.writeDoubleLE(parseFloat(parameter.value), 0);
        yield buffer;
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        value = parseFloat(value);
        if (isNaN(value)) {
          throw new TypeError("Invalid number.");
        }
        return value;
      }
    };
    exports.default = Float;
    module.exports = Float;
  })(float, float.exports);
  return float.exports;
}
var decimal = { exports: {} };
var decimaln = { exports: {} };
var hasRequiredDecimaln;
function requireDecimaln() {
  if (hasRequiredDecimaln) return decimaln.exports;
  hasRequiredDecimaln = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const DecimalN = {
      id: 106,
      type: "DECIMALN",
      name: "DecimalN",
      declaration() {
        throw new Error("not implemented");
      },
      generateTypeInfo() {
        throw new Error("not implemented");
      },
      generateParameterLength() {
        throw new Error("not implemented");
      },
      generateParameterData() {
        throw new Error("not implemented");
      },
      validate() {
        throw new Error("not implemented");
      }
    };
    exports.default = DecimalN;
    module.exports = DecimalN;
  })(decimaln, decimaln.exports);
  return decimaln.exports;
}
var hasRequiredDecimal;
function requireDecimal() {
  if (hasRequiredDecimal) return decimal.exports;
  hasRequiredDecimal = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _decimaln = _interopRequireDefault(requireDecimaln());
    var _writableTrackingBuffer = _interopRequireDefault(requireWritableTrackingBuffer());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const NULL_LENGTH = Buffer.from([0]);
    const Decimal = {
      id: 55,
      type: "DECIMAL",
      name: "Decimal",
      declaration: function(parameter) {
        return "decimal(" + this.resolvePrecision(parameter) + ", " + this.resolveScale(parameter) + ")";
      },
      resolvePrecision: function(parameter) {
        if (parameter.precision != null) {
          return parameter.precision;
        } else if (parameter.value === null) {
          return 1;
        } else {
          return 18;
        }
      },
      resolveScale: function(parameter) {
        if (parameter.scale != null) {
          return parameter.scale;
        } else {
          return 0;
        }
      },
      generateTypeInfo(parameter, _options) {
        let precision;
        if (parameter.precision <= 9) {
          precision = 5;
        } else if (parameter.precision <= 19) {
          precision = 9;
        } else if (parameter.precision <= 28) {
          precision = 13;
        } else {
          precision = 17;
        }
        return Buffer.from([_decimaln.default.id, precision, parameter.precision, parameter.scale]);
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        const precision = parameter.precision;
        if (precision <= 9) {
          return Buffer.from([5]);
        } else if (precision <= 19) {
          return Buffer.from([9]);
        } else if (precision <= 28) {
          return Buffer.from([13]);
        } else {
          return Buffer.from([17]);
        }
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        const sign = parameter.value < 0 ? 0 : 1;
        const value = Math.round(Math.abs(parameter.value * Math.pow(10, parameter.scale)));
        const precision = parameter.precision;
        if (precision <= 9) {
          const buffer = Buffer.alloc(5);
          buffer.writeUInt8(sign, 0);
          buffer.writeUInt32LE(value, 1);
          yield buffer;
        } else if (precision <= 19) {
          const buffer = new _writableTrackingBuffer.default(9);
          buffer.writeUInt8(sign);
          buffer.writeUInt64LE(value);
          yield buffer.data;
        } else if (precision <= 28) {
          const buffer = new _writableTrackingBuffer.default(13);
          buffer.writeUInt8(sign);
          buffer.writeUInt64LE(value);
          buffer.writeUInt32LE(0);
          yield buffer.data;
        } else {
          const buffer = new _writableTrackingBuffer.default(17);
          buffer.writeUInt8(sign);
          buffer.writeUInt64LE(value);
          buffer.writeUInt32LE(0);
          buffer.writeUInt32LE(0);
          yield buffer.data;
        }
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        value = parseFloat(value);
        if (isNaN(value)) {
          throw new TypeError("Invalid number.");
        }
        return value;
      }
    };
    exports.default = Decimal;
    module.exports = Decimal;
  })(decimal, decimal.exports);
  return decimal.exports;
}
var numeric = { exports: {} };
var numericn = { exports: {} };
var hasRequiredNumericn;
function requireNumericn() {
  if (hasRequiredNumericn) return numericn.exports;
  hasRequiredNumericn = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const NumericN = {
      id: 108,
      type: "NUMERICN",
      name: "NumericN",
      declaration() {
        throw new Error("not implemented");
      },
      generateTypeInfo() {
        throw new Error("not implemented");
      },
      generateParameterLength() {
        throw new Error("not implemented");
      },
      generateParameterData() {
        throw new Error("not implemented");
      },
      validate() {
        throw new Error("not implemented");
      }
    };
    exports.default = NumericN;
    module.exports = NumericN;
  })(numericn, numericn.exports);
  return numericn.exports;
}
var hasRequiredNumeric;
function requireNumeric() {
  if (hasRequiredNumeric) return numeric.exports;
  hasRequiredNumeric = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _numericn = _interopRequireDefault(requireNumericn());
    var _writableTrackingBuffer = _interopRequireDefault(requireWritableTrackingBuffer());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const NULL_LENGTH = Buffer.from([0]);
    const Numeric = {
      id: 63,
      type: "NUMERIC",
      name: "Numeric",
      declaration: function(parameter) {
        return "numeric(" + this.resolvePrecision(parameter) + ", " + this.resolveScale(parameter) + ")";
      },
      resolvePrecision: function(parameter) {
        if (parameter.precision != null) {
          return parameter.precision;
        } else if (parameter.value === null) {
          return 1;
        } else {
          return 18;
        }
      },
      resolveScale: function(parameter) {
        if (parameter.scale != null) {
          return parameter.scale;
        } else {
          return 0;
        }
      },
      generateTypeInfo(parameter) {
        let precision;
        if (parameter.precision <= 9) {
          precision = 5;
        } else if (parameter.precision <= 19) {
          precision = 9;
        } else if (parameter.precision <= 28) {
          precision = 13;
        } else {
          precision = 17;
        }
        return Buffer.from([_numericn.default.id, precision, parameter.precision, parameter.scale]);
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        const precision = parameter.precision;
        if (precision <= 9) {
          return Buffer.from([5]);
        } else if (precision <= 19) {
          return Buffer.from([9]);
        } else if (precision <= 28) {
          return Buffer.from([13]);
        } else {
          return Buffer.from([17]);
        }
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        const sign = parameter.value < 0 ? 0 : 1;
        const value = Math.round(Math.abs(parameter.value * Math.pow(10, parameter.scale)));
        if (parameter.precision <= 9) {
          const buffer = Buffer.alloc(5);
          buffer.writeUInt8(sign, 0);
          buffer.writeUInt32LE(value, 1);
          yield buffer;
        } else if (parameter.precision <= 19) {
          const buffer = new _writableTrackingBuffer.default(10);
          buffer.writeUInt8(sign);
          buffer.writeUInt64LE(value);
          yield buffer.data;
        } else if (parameter.precision <= 28) {
          const buffer = new _writableTrackingBuffer.default(14);
          buffer.writeUInt8(sign);
          buffer.writeUInt64LE(value);
          buffer.writeUInt32LE(0);
          yield buffer.data;
        } else {
          const buffer = new _writableTrackingBuffer.default(18);
          buffer.writeUInt8(sign);
          buffer.writeUInt64LE(value);
          buffer.writeUInt32LE(0);
          buffer.writeUInt32LE(0);
          yield buffer.data;
        }
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        value = parseFloat(value);
        if (isNaN(value)) {
          throw new TypeError("Invalid number.");
        }
        return value;
      }
    };
    exports.default = Numeric;
    module.exports = Numeric;
  })(numeric, numeric.exports);
  return numeric.exports;
}
var smallmoney = { exports: {} };
var hasRequiredSmallmoney;
function requireSmallmoney() {
  if (hasRequiredSmallmoney) return smallmoney.exports;
  hasRequiredSmallmoney = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _moneyn = _interopRequireDefault(requireMoneyn());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const DATA_LENGTH = Buffer.from([4]);
    const NULL_LENGTH = Buffer.from([0]);
    const SmallMoney = {
      id: 122,
      type: "MONEY4",
      name: "SmallMoney",
      declaration: function() {
        return "smallmoney";
      },
      generateTypeInfo: function() {
        return Buffer.from([_moneyn.default.id, 4]);
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        return DATA_LENGTH;
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        const buffer = Buffer.alloc(4);
        buffer.writeInt32LE(parameter.value * 1e4, 0);
        yield buffer;
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        value = parseFloat(value);
        if (isNaN(value)) {
          throw new TypeError("Invalid number.");
        }
        if (value < -214748.3648 || value > 214748.3647) {
          throw new TypeError("Value must be between -214748.3648 and 214748.3647.");
        }
        return value;
      }
    };
    exports.default = SmallMoney;
    module.exports = SmallMoney;
  })(smallmoney, smallmoney.exports);
  return smallmoney.exports;
}
var bigint = { exports: {} };
var hasRequiredBigint;
function requireBigint() {
  if (hasRequiredBigint) return bigint.exports;
  hasRequiredBigint = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _intn = _interopRequireDefault(requireIntn());
    var _writableTrackingBuffer = _interopRequireDefault(requireWritableTrackingBuffer());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const DATA_LENGTH = Buffer.from([8]);
    const NULL_LENGTH = Buffer.from([0]);
    const MAX_SAFE_BIGINT = 9223372036854775807n;
    const MIN_SAFE_BIGINT = -9223372036854775808n;
    const BigInt2 = {
      id: 127,
      type: "INT8",
      name: "BigInt",
      declaration: function() {
        return "bigint";
      },
      generateTypeInfo() {
        return Buffer.from([_intn.default.id, 8]);
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        return DATA_LENGTH;
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        const buffer = new _writableTrackingBuffer.default(8);
        buffer.writeBigInt64LE(typeof parameter.value === "bigint" ? parameter.value : globalThis.BigInt(parameter.value));
        yield buffer.data;
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        if (typeof value !== "bigint") {
          value = globalThis.BigInt(value);
        }
        if (value < MIN_SAFE_BIGINT || value > MAX_SAFE_BIGINT) {
          throw new TypeError(`Value must be between ${MIN_SAFE_BIGINT} and ${MAX_SAFE_BIGINT}, inclusive.`);
        }
        return value;
      }
    };
    exports.default = BigInt2;
    module.exports = BigInt2;
  })(bigint, bigint.exports);
  return bigint.exports;
}
var image = { exports: {} };
var hasRequiredImage;
function requireImage() {
  if (hasRequiredImage) return image.exports;
  hasRequiredImage = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const NULL_LENGTH = Buffer.from([255, 255, 255, 255]);
    const Image = {
      id: 34,
      type: "IMAGE",
      name: "Image",
      hasTableName: true,
      declaration: function() {
        return "image";
      },
      resolveLength: function(parameter) {
        if (parameter.value != null) {
          const value = parameter.value;
          return value.length;
        } else {
          return -1;
        }
      },
      generateTypeInfo(parameter) {
        const buffer = Buffer.alloc(5);
        buffer.writeUInt8(this.id, 0);
        buffer.writeInt32LE(parameter.length, 1);
        return buffer;
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        const buffer = Buffer.alloc(4);
        buffer.writeInt32LE(parameter.value.length, 0);
        return buffer;
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        yield parameter.value;
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        if (!Buffer.isBuffer(value)) {
          throw new TypeError("Invalid buffer.");
        }
        return value;
      }
    };
    exports.default = Image;
    module.exports = Image;
  })(image, image.exports);
  return image.exports;
}
var text = { exports: {} };
var hasRequiredText;
function requireText() {
  if (hasRequiredText) return text.exports;
  hasRequiredText = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _iconvLite = _interopRequireDefault(requireLib());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const NULL_LENGTH = Buffer.from([255, 255, 255, 255]);
    const Text = {
      id: 35,
      type: "TEXT",
      name: "Text",
      hasTableName: true,
      declaration: function() {
        return "text";
      },
      resolveLength: function(parameter) {
        const value = parameter.value;
        if (value != null) {
          return value.length;
        } else {
          return -1;
        }
      },
      generateTypeInfo(parameter, _options) {
        const buffer = Buffer.alloc(10);
        buffer.writeUInt8(this.id, 0);
        buffer.writeInt32LE(parameter.length, 1);
        if (parameter.collation) {
          parameter.collation.toBuffer().copy(buffer, 5, 0, 5);
        }
        return buffer;
      },
      generateParameterLength(parameter, options) {
        const value = parameter.value;
        if (value == null) {
          return NULL_LENGTH;
        }
        const buffer = Buffer.alloc(4);
        buffer.writeInt32LE(value.length, 0);
        return buffer;
      },
      generateParameterData: function* (parameter, options) {
        const value = parameter.value;
        if (value == null) {
          return;
        }
        yield value;
      },
      validate: function(value, collation2) {
        if (value == null) {
          return null;
        }
        if (typeof value !== "string") {
          throw new TypeError("Invalid string.");
        }
        if (!collation2) {
          throw new Error("No collation was set by the server for the current connection.");
        }
        if (!collation2.codepage) {
          throw new Error("The collation set by the server has no associated encoding.");
        }
        return _iconvLite.default.encode(value, collation2.codepage);
      }
    };
    exports.default = Text;
    module.exports = Text;
  })(text, text.exports);
  return text.exports;
}
var uniqueidentifier = { exports: {} };
var guidParser = {};
var hasRequiredGuidParser;
function requireGuidParser() {
  if (hasRequiredGuidParser) return guidParser;
  hasRequiredGuidParser = 1;
  Object.defineProperty(guidParser, "__esModule", {
    value: true
  });
  guidParser.bufferToLowerCaseGuid = bufferToLowerCaseGuid;
  guidParser.bufferToUpperCaseGuid = bufferToUpperCaseGuid;
  guidParser.guidToArray = guidToArray;
  const UPPER_CASE_MAP = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A", "0B", "0C", "0D", "0E", "0F", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1A", "1B", "1C", "1D", "1E", "1F", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "2B", "2C", "2D", "2E", "2F", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3A", "3B", "3C", "3D", "3E", "3F", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4A", "4B", "4C", "4D", "4E", "4F", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5A", "5B", "5C", "5D", "5E", "5F", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6A", "6B", "6C", "6D", "6E", "6F", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7A", "7B", "7C", "7D", "7E", "7F", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8A", "8B", "8C", "8D", "8E", "8F", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9A", "9B", "9C", "9D", "9E", "9F", "A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "AA", "AB", "AC", "AD", "AE", "AF", "B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "BA", "BB", "BC", "BD", "BE", "BF", "C0", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "CA", "CB", "CC", "CD", "CE", "CF", "D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "DA", "DB", "DC", "DD", "DE", "DF", "E0", "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "EA", "EB", "EC", "ED", "EE", "EF", "F0", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "FA", "FB", "FC", "FD", "FE", "FF"];
  const LOWER_CASE_MAP = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
  function bufferToUpperCaseGuid(buffer) {
    return UPPER_CASE_MAP[buffer[3]] + UPPER_CASE_MAP[buffer[2]] + UPPER_CASE_MAP[buffer[1]] + UPPER_CASE_MAP[buffer[0]] + "-" + UPPER_CASE_MAP[buffer[5]] + UPPER_CASE_MAP[buffer[4]] + "-" + UPPER_CASE_MAP[buffer[7]] + UPPER_CASE_MAP[buffer[6]] + "-" + UPPER_CASE_MAP[buffer[8]] + UPPER_CASE_MAP[buffer[9]] + "-" + UPPER_CASE_MAP[buffer[10]] + UPPER_CASE_MAP[buffer[11]] + UPPER_CASE_MAP[buffer[12]] + UPPER_CASE_MAP[buffer[13]] + UPPER_CASE_MAP[buffer[14]] + UPPER_CASE_MAP[buffer[15]];
  }
  function bufferToLowerCaseGuid(buffer) {
    return LOWER_CASE_MAP[buffer[3]] + LOWER_CASE_MAP[buffer[2]] + LOWER_CASE_MAP[buffer[1]] + LOWER_CASE_MAP[buffer[0]] + "-" + LOWER_CASE_MAP[buffer[5]] + LOWER_CASE_MAP[buffer[4]] + "-" + LOWER_CASE_MAP[buffer[7]] + LOWER_CASE_MAP[buffer[6]] + "-" + LOWER_CASE_MAP[buffer[8]] + LOWER_CASE_MAP[buffer[9]] + "-" + LOWER_CASE_MAP[buffer[10]] + LOWER_CASE_MAP[buffer[11]] + LOWER_CASE_MAP[buffer[12]] + LOWER_CASE_MAP[buffer[13]] + LOWER_CASE_MAP[buffer[14]] + LOWER_CASE_MAP[buffer[15]];
  }
  const CHARCODEMAP = {};
  const hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F"].map((d) => d.charCodeAt(0));
  for (let i = 0; i < hexDigits.length; i++) {
    const map = CHARCODEMAP[hexDigits[i]] = {};
    for (let j = 0; j < hexDigits.length; j++) {
      const hex = String.fromCharCode(hexDigits[i], hexDigits[j]);
      const value = parseInt(hex, 16);
      map[hexDigits[j]] = value;
    }
  }
  function guidToArray(guid) {
    return [CHARCODEMAP[guid.charCodeAt(6)][guid.charCodeAt(7)], CHARCODEMAP[guid.charCodeAt(4)][guid.charCodeAt(5)], CHARCODEMAP[guid.charCodeAt(2)][guid.charCodeAt(3)], CHARCODEMAP[guid.charCodeAt(0)][guid.charCodeAt(1)], CHARCODEMAP[guid.charCodeAt(11)][guid.charCodeAt(12)], CHARCODEMAP[guid.charCodeAt(9)][guid.charCodeAt(10)], CHARCODEMAP[guid.charCodeAt(16)][guid.charCodeAt(17)], CHARCODEMAP[guid.charCodeAt(14)][guid.charCodeAt(15)], CHARCODEMAP[guid.charCodeAt(19)][guid.charCodeAt(20)], CHARCODEMAP[guid.charCodeAt(21)][guid.charCodeAt(22)], CHARCODEMAP[guid.charCodeAt(24)][guid.charCodeAt(25)], CHARCODEMAP[guid.charCodeAt(26)][guid.charCodeAt(27)], CHARCODEMAP[guid.charCodeAt(28)][guid.charCodeAt(29)], CHARCODEMAP[guid.charCodeAt(30)][guid.charCodeAt(31)], CHARCODEMAP[guid.charCodeAt(32)][guid.charCodeAt(33)], CHARCODEMAP[guid.charCodeAt(34)][guid.charCodeAt(35)]];
  }
  return guidParser;
}
var hasRequiredUniqueidentifier;
function requireUniqueidentifier() {
  if (hasRequiredUniqueidentifier) return uniqueidentifier.exports;
  hasRequiredUniqueidentifier = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _guidParser = requireGuidParser();
    const NULL_LENGTH = Buffer.from([0]);
    const DATA_LENGTH = Buffer.from([16]);
    const UniqueIdentifier = {
      id: 36,
      type: "GUIDN",
      name: "UniqueIdentifier",
      declaration: function() {
        return "uniqueidentifier";
      },
      resolveLength: function() {
        return 16;
      },
      generateTypeInfo() {
        return Buffer.from([this.id, 16]);
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        return DATA_LENGTH;
      },
      generateParameterData: function* (parameter, options) {
        if (parameter.value == null) {
          return;
        }
        yield Buffer.from((0, _guidParser.guidToArray)(parameter.value));
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        if (typeof value !== "string") {
          throw new TypeError("Invalid string.");
        }
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) {
          throw new TypeError("Invalid GUID.");
        }
        return value;
      }
    };
    exports.default = UniqueIdentifier;
    module.exports = UniqueIdentifier;
  })(uniqueidentifier, uniqueidentifier.exports);
  return uniqueidentifier.exports;
}
var ntext = { exports: {} };
var hasRequiredNtext;
function requireNtext() {
  if (hasRequiredNtext) return ntext.exports;
  hasRequiredNtext = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const NULL_LENGTH = Buffer.from([255, 255, 255, 255]);
    const NText = {
      id: 99,
      type: "NTEXT",
      name: "NText",
      hasTableName: true,
      declaration: function() {
        return "ntext";
      },
      resolveLength: function(parameter) {
        const value = parameter.value;
        if (value != null) {
          return value.length;
        } else {
          return -1;
        }
      },
      generateTypeInfo(parameter, _options) {
        const buffer = Buffer.alloc(10);
        buffer.writeUInt8(this.id, 0);
        buffer.writeInt32LE(parameter.length, 1);
        if (parameter.collation) {
          parameter.collation.toBuffer().copy(buffer, 5, 0, 5);
        }
        return buffer;
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        const buffer = Buffer.alloc(4);
        buffer.writeInt32LE(Buffer.byteLength(parameter.value, "ucs2"), 0);
        return buffer;
      },
      generateParameterData: function* (parameter, options) {
        if (parameter.value == null) {
          return;
        }
        yield Buffer.from(parameter.value.toString(), "ucs2");
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        if (typeof value !== "string") {
          throw new TypeError("Invalid string.");
        }
        return value;
      }
    };
    exports.default = NText;
    module.exports = NText;
  })(ntext, ntext.exports);
  return ntext.exports;
}
var varbinary = { exports: {} };
var hasRequiredVarbinary;
function requireVarbinary() {
  if (hasRequiredVarbinary) return varbinary.exports;
  hasRequiredVarbinary = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const MAX = (1 << 16) - 1;
    const UNKNOWN_PLP_LEN = Buffer.from([254, 255, 255, 255, 255, 255, 255, 255]);
    const PLP_TERMINATOR = Buffer.from([0, 0, 0, 0]);
    const NULL_LENGTH = Buffer.from([255, 255]);
    const MAX_NULL_LENGTH = Buffer.from([255, 255, 255, 255, 255, 255, 255, 255]);
    const VarBinary = {
      id: 165,
      type: "BIGVARBIN",
      name: "VarBinary",
      maximumLength: 8e3,
      declaration: function(parameter) {
        const value = parameter.value;
        let length;
        if (parameter.length) {
          length = parameter.length;
        } else if (value != null) {
          length = value.length || 1;
        } else if (value === null && !parameter.output) {
          length = 1;
        } else {
          length = this.maximumLength;
        }
        if (length <= this.maximumLength) {
          return "varbinary(" + length + ")";
        } else {
          return "varbinary(max)";
        }
      },
      resolveLength: function(parameter) {
        const value = parameter.value;
        if (parameter.length != null) {
          return parameter.length;
        } else if (value != null) {
          return value.length;
        } else {
          return this.maximumLength;
        }
      },
      generateTypeInfo: function(parameter) {
        const buffer = Buffer.alloc(3);
        buffer.writeUInt8(this.id, 0);
        if (parameter.length <= this.maximumLength) {
          buffer.writeUInt16LE(parameter.length, 1);
        } else {
          buffer.writeUInt16LE(MAX, 1);
        }
        return buffer;
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          if (parameter.length <= this.maximumLength) {
            return NULL_LENGTH;
          } else {
            return MAX_NULL_LENGTH;
          }
        }
        let value = parameter.value;
        if (!Buffer.isBuffer(value)) {
          value = value.toString();
        }
        const length = Buffer.byteLength(value, "ucs2");
        if (parameter.length <= this.maximumLength) {
          const buffer = Buffer.alloc(2);
          buffer.writeUInt16LE(length, 0);
          return buffer;
        } else {
          return UNKNOWN_PLP_LEN;
        }
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        let value = parameter.value;
        if (parameter.length <= this.maximumLength) {
          if (Buffer.isBuffer(value)) {
            yield value;
          } else {
            yield Buffer.from(value.toString(), "ucs2");
          }
        } else {
          if (!Buffer.isBuffer(value)) {
            value = value.toString();
          }
          const length = Buffer.byteLength(value, "ucs2");
          if (length > 0) {
            const buffer = Buffer.alloc(4);
            buffer.writeUInt32LE(length, 0);
            yield buffer;
            if (Buffer.isBuffer(value)) {
              yield value;
            } else {
              yield Buffer.from(value, "ucs2");
            }
          }
          yield PLP_TERMINATOR;
        }
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        if (!Buffer.isBuffer(value)) {
          throw new TypeError("Invalid buffer.");
        }
        return value;
      }
    };
    exports.default = VarBinary;
    module.exports = VarBinary;
  })(varbinary, varbinary.exports);
  return varbinary.exports;
}
var varchar = { exports: {} };
var hasRequiredVarchar;
function requireVarchar() {
  if (hasRequiredVarchar) return varchar.exports;
  hasRequiredVarchar = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _iconvLite = _interopRequireDefault(requireLib());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const MAX = (1 << 16) - 1;
    const UNKNOWN_PLP_LEN = Buffer.from([254, 255, 255, 255, 255, 255, 255, 255]);
    const PLP_TERMINATOR = Buffer.from([0, 0, 0, 0]);
    const NULL_LENGTH = Buffer.from([255, 255]);
    const MAX_NULL_LENGTH = Buffer.from([255, 255, 255, 255, 255, 255, 255, 255]);
    const VarChar = {
      id: 167,
      type: "BIGVARCHR",
      name: "VarChar",
      maximumLength: 8e3,
      declaration: function(parameter) {
        const value = parameter.value;
        let length;
        if (parameter.length) {
          length = parameter.length;
        } else if (value != null) {
          length = value.length || 1;
        } else if (value === null && !parameter.output) {
          length = 1;
        } else {
          length = this.maximumLength;
        }
        if (length <= this.maximumLength) {
          return "varchar(" + length + ")";
        } else {
          return "varchar(max)";
        }
      },
      resolveLength: function(parameter) {
        const value = parameter.value;
        if (parameter.length != null) {
          return parameter.length;
        } else if (value != null) {
          return value.length || 1;
        } else {
          return this.maximumLength;
        }
      },
      generateTypeInfo(parameter) {
        const buffer = Buffer.alloc(8);
        buffer.writeUInt8(this.id, 0);
        if (parameter.length <= this.maximumLength) {
          buffer.writeUInt16LE(parameter.length, 1);
        } else {
          buffer.writeUInt16LE(MAX, 1);
        }
        if (parameter.collation) {
          parameter.collation.toBuffer().copy(buffer, 3, 0, 5);
        }
        return buffer;
      },
      generateParameterLength(parameter, options) {
        const value = parameter.value;
        if (value == null) {
          if (parameter.length <= this.maximumLength) {
            return NULL_LENGTH;
          } else {
            return MAX_NULL_LENGTH;
          }
        }
        if (parameter.length <= this.maximumLength) {
          const buffer = Buffer.alloc(2);
          buffer.writeUInt16LE(value.length, 0);
          return buffer;
        } else {
          return UNKNOWN_PLP_LEN;
        }
      },
      *generateParameterData(parameter, options) {
        const value = parameter.value;
        if (value == null) {
          return;
        }
        if (parameter.length <= this.maximumLength) {
          yield value;
        } else {
          if (value.length > 0) {
            const buffer = Buffer.alloc(4);
            buffer.writeUInt32LE(value.length, 0);
            yield buffer;
            yield value;
          }
          yield PLP_TERMINATOR;
        }
      },
      validate: function(value, collation2) {
        if (value == null) {
          return null;
        }
        if (typeof value !== "string") {
          throw new TypeError("Invalid string.");
        }
        if (!collation2) {
          throw new Error("No collation was set by the server for the current connection.");
        }
        if (!collation2.codepage) {
          throw new Error("The collation set by the server has no associated encoding.");
        }
        return _iconvLite.default.encode(value, collation2.codepage);
      }
    };
    exports.default = VarChar;
    module.exports = VarChar;
  })(varchar, varchar.exports);
  return varchar.exports;
}
var binary = { exports: {} };
var hasRequiredBinary;
function requireBinary() {
  if (hasRequiredBinary) return binary.exports;
  hasRequiredBinary = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const NULL_LENGTH = Buffer.from([255, 255]);
    const Binary = {
      id: 173,
      type: "BIGBinary",
      name: "Binary",
      maximumLength: 8e3,
      declaration: function(parameter) {
        const value = parameter.value;
        let length;
        if (parameter.length) {
          length = parameter.length;
        } else if (value != null) {
          length = value.length || 1;
        } else if (value === null && !parameter.output) {
          length = 1;
        } else {
          length = this.maximumLength;
        }
        return "binary(" + length + ")";
      },
      resolveLength: function(parameter) {
        const value = parameter.value;
        if (value != null) {
          return value.length;
        } else {
          return this.maximumLength;
        }
      },
      generateTypeInfo(parameter) {
        const buffer = Buffer.alloc(3);
        buffer.writeUInt8(this.id, 0);
        buffer.writeUInt16LE(parameter.length, 1);
        return buffer;
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        const buffer = Buffer.alloc(2);
        buffer.writeUInt16LE(parameter.length, 0);
        return buffer;
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        yield parameter.value.slice(0, parameter.length !== void 0 ? Math.min(parameter.length, this.maximumLength) : this.maximumLength);
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        if (!Buffer.isBuffer(value)) {
          throw new TypeError("Invalid buffer.");
        }
        return value;
      }
    };
    exports.default = Binary;
    module.exports = Binary;
  })(binary, binary.exports);
  return binary.exports;
}
var char = { exports: {} };
var hasRequiredChar;
function requireChar() {
  if (hasRequiredChar) return char.exports;
  hasRequiredChar = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _iconvLite = _interopRequireDefault(requireLib());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const NULL_LENGTH = Buffer.from([255, 255]);
    const Char = {
      id: 175,
      type: "BIGCHAR",
      name: "Char",
      maximumLength: 8e3,
      declaration: function(parameter) {
        const value = parameter.value;
        let length;
        if (parameter.length) {
          length = parameter.length;
        } else if (value != null) {
          length = value.length || 1;
        } else if (value === null && !parameter.output) {
          length = 1;
        } else {
          length = this.maximumLength;
        }
        if (length < this.maximumLength) {
          return "char(" + length + ")";
        } else {
          return "char(" + this.maximumLength + ")";
        }
      },
      // ParameterData<any> is temporary solution. TODO: need to understand what type ParameterData<...> can be.
      resolveLength: function(parameter) {
        const value = parameter.value;
        if (parameter.length != null) {
          return parameter.length;
        } else if (value != null) {
          return value.length || 1;
        } else {
          return this.maximumLength;
        }
      },
      generateTypeInfo(parameter) {
        const buffer = Buffer.alloc(8);
        buffer.writeUInt8(this.id, 0);
        buffer.writeUInt16LE(parameter.length, 1);
        if (parameter.collation) {
          parameter.collation.toBuffer().copy(buffer, 3, 0, 5);
        }
        return buffer;
      },
      generateParameterLength(parameter, options) {
        const value = parameter.value;
        if (value == null) {
          return NULL_LENGTH;
        }
        const buffer = Buffer.alloc(2);
        buffer.writeUInt16LE(value.length, 0);
        return buffer;
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        yield Buffer.from(parameter.value, "ascii");
      },
      validate: function(value, collation2) {
        if (value == null) {
          return null;
        }
        if (typeof value !== "string") {
          throw new TypeError("Invalid string.");
        }
        if (!collation2) {
          throw new Error("No collation was set by the server for the current connection.");
        }
        if (!collation2.codepage) {
          throw new Error("The collation set by the server has no associated encoding.");
        }
        return _iconvLite.default.encode(value, collation2.codepage);
      }
    };
    exports.default = Char;
    module.exports = Char;
  })(char, char.exports);
  return char.exports;
}
var nvarchar = { exports: {} };
var hasRequiredNvarchar;
function requireNvarchar() {
  if (hasRequiredNvarchar) return nvarchar.exports;
  hasRequiredNvarchar = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const MAX = (1 << 16) - 1;
    const UNKNOWN_PLP_LEN = Buffer.from([254, 255, 255, 255, 255, 255, 255, 255]);
    const PLP_TERMINATOR = Buffer.from([0, 0, 0, 0]);
    const NULL_LENGTH = Buffer.from([255, 255]);
    const MAX_NULL_LENGTH = Buffer.from([255, 255, 255, 255, 255, 255, 255, 255]);
    const NVarChar = {
      id: 231,
      type: "NVARCHAR",
      name: "NVarChar",
      maximumLength: 4e3,
      declaration: function(parameter) {
        const value = parameter.value;
        let length;
        if (parameter.length) {
          length = parameter.length;
        } else if (value != null) {
          length = value.toString().length || 1;
        } else if (value === null && !parameter.output) {
          length = 1;
        } else {
          length = this.maximumLength;
        }
        if (length <= this.maximumLength) {
          return "nvarchar(" + length + ")";
        } else {
          return "nvarchar(max)";
        }
      },
      resolveLength: function(parameter) {
        const value = parameter.value;
        if (parameter.length != null) {
          return parameter.length;
        } else if (value != null) {
          if (Buffer.isBuffer(value)) {
            return value.length / 2 || 1;
          } else {
            return value.toString().length || 1;
          }
        } else {
          return this.maximumLength;
        }
      },
      generateTypeInfo(parameter) {
        const buffer = Buffer.alloc(8);
        buffer.writeUInt8(this.id, 0);
        if (parameter.length <= this.maximumLength) {
          buffer.writeUInt16LE(parameter.length * 2, 1);
        } else {
          buffer.writeUInt16LE(MAX, 1);
        }
        if (parameter.collation) {
          parameter.collation.toBuffer().copy(buffer, 3, 0, 5);
        }
        return buffer;
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          if (parameter.length <= this.maximumLength) {
            return NULL_LENGTH;
          } else {
            return MAX_NULL_LENGTH;
          }
        }
        let value = parameter.value;
        if (parameter.length <= this.maximumLength) {
          let length;
          if (value instanceof Buffer) {
            length = value.length;
          } else {
            value = value.toString();
            length = Buffer.byteLength(value, "ucs2");
          }
          const buffer = Buffer.alloc(2);
          buffer.writeUInt16LE(length, 0);
          return buffer;
        } else {
          return UNKNOWN_PLP_LEN;
        }
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        let value = parameter.value;
        if (parameter.length <= this.maximumLength) {
          if (value instanceof Buffer) {
            yield value;
          } else {
            value = value.toString();
            yield Buffer.from(value, "ucs2");
          }
        } else {
          if (value instanceof Buffer) {
            const length = value.length;
            if (length > 0) {
              const buffer = Buffer.alloc(4);
              buffer.writeUInt32LE(length, 0);
              yield buffer;
              yield value;
            }
          } else {
            value = value.toString();
            const length = Buffer.byteLength(value, "ucs2");
            if (length > 0) {
              const buffer = Buffer.alloc(4);
              buffer.writeUInt32LE(length, 0);
              yield buffer;
              yield Buffer.from(value, "ucs2");
            }
          }
          yield PLP_TERMINATOR;
        }
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        if (typeof value !== "string") {
          throw new TypeError("Invalid string.");
        }
        return value;
      }
    };
    exports.default = NVarChar;
    module.exports = NVarChar;
  })(nvarchar, nvarchar.exports);
  return nvarchar.exports;
}
var nchar = { exports: {} };
var hasRequiredNchar;
function requireNchar() {
  if (hasRequiredNchar) return nchar.exports;
  hasRequiredNchar = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const NULL_LENGTH = Buffer.from([255, 255]);
    const NChar = {
      id: 239,
      type: "NCHAR",
      name: "NChar",
      maximumLength: 4e3,
      declaration: function(parameter) {
        const value = parameter.value;
        let length;
        if (parameter.length) {
          length = parameter.length;
        } else if (parameter.value != null) {
          length = value.toString().length || 1;
        } else if (parameter.value === null && !parameter.output) {
          length = 1;
        } else {
          length = this.maximumLength;
        }
        if (length < this.maximumLength) {
          return "nchar(" + length + ")";
        } else {
          return "nchar(" + this.maximumLength + ")";
        }
      },
      resolveLength: function(parameter) {
        const value = parameter.value;
        if (parameter.length != null) {
          return parameter.length;
        } else if (parameter.value != null) {
          if (Buffer.isBuffer(parameter.value)) {
            return parameter.value.length / 2 || 1;
          } else {
            return value.toString().length || 1;
          }
        } else {
          return this.maximumLength;
        }
      },
      generateTypeInfo: function(parameter) {
        const buffer = Buffer.alloc(8);
        buffer.writeUInt8(this.id, 0);
        buffer.writeUInt16LE(parameter.length * 2, 1);
        if (parameter.collation) {
          parameter.collation.toBuffer().copy(buffer, 3, 0, 5);
        }
        return buffer;
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        const {
          value
        } = parameter;
        if (value instanceof Buffer) {
          const length = value.length;
          const buffer = Buffer.alloc(2);
          buffer.writeUInt16LE(length, 0);
          return buffer;
        } else {
          const length = Buffer.byteLength(value.toString(), "ucs2");
          const buffer = Buffer.alloc(2);
          buffer.writeUInt16LE(length, 0);
          return buffer;
        }
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        const value = parameter.value;
        if (value instanceof Buffer) {
          yield value;
        } else {
          yield Buffer.from(value, "ucs2");
        }
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        if (typeof value !== "string") {
          throw new TypeError("Invalid string.");
        }
        return value;
      }
    };
    exports.default = NChar;
    module.exports = NChar;
  })(nchar, nchar.exports);
  return nchar.exports;
}
var xml = { exports: {} };
var hasRequiredXml;
function requireXml() {
  if (hasRequiredXml) return xml.exports;
  hasRequiredXml = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const XML = {
      id: 241,
      type: "XML",
      name: "Xml",
      declaration() {
        throw new Error("not implemented");
      },
      generateTypeInfo() {
        throw new Error("not implemented");
      },
      generateParameterLength() {
        throw new Error("not implemented");
      },
      generateParameterData() {
        throw new Error("not implemented");
      },
      validate() {
        throw new Error("not implemented");
      }
    };
    exports.default = XML;
    module.exports = XML;
  })(xml, xml.exports);
  return xml.exports;
}
var time = { exports: {} };
var hasRequiredTime;
function requireTime() {
  if (hasRequiredTime) return time.exports;
  hasRequiredTime = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _writableTrackingBuffer = _interopRequireDefault(requireWritableTrackingBuffer());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const NULL_LENGTH = Buffer.from([0]);
    const Time = {
      id: 41,
      type: "TIMEN",
      name: "Time",
      declaration: function(parameter) {
        return "time(" + this.resolveScale(parameter) + ")";
      },
      resolveScale: function(parameter) {
        if (parameter.scale != null) {
          return parameter.scale;
        } else if (parameter.value === null) {
          return 0;
        } else {
          return 7;
        }
      },
      generateTypeInfo(parameter) {
        return Buffer.from([this.id, parameter.scale]);
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        switch (parameter.scale) {
          case 0:
          case 1:
          case 2:
            return Buffer.from([3]);
          case 3:
          case 4:
            return Buffer.from([4]);
          case 5:
          case 6:
          case 7:
            return Buffer.from([5]);
          default:
            throw new Error("invalid scale");
        }
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        const buffer = new _writableTrackingBuffer.default(16);
        const time2 = parameter.value;
        let timestamp;
        if (options.useUTC) {
          timestamp = ((time2.getUTCHours() * 60 + time2.getUTCMinutes()) * 60 + time2.getUTCSeconds()) * 1e3 + time2.getUTCMilliseconds();
        } else {
          timestamp = ((time2.getHours() * 60 + time2.getMinutes()) * 60 + time2.getSeconds()) * 1e3 + time2.getMilliseconds();
        }
        timestamp = timestamp * Math.pow(10, parameter.scale - 3);
        timestamp += (parameter.value.nanosecondDelta != null ? parameter.value.nanosecondDelta : 0) * Math.pow(10, parameter.scale);
        timestamp = Math.round(timestamp);
        switch (parameter.scale) {
          case 0:
          case 1:
          case 2:
            buffer.writeUInt24LE(timestamp);
            break;
          case 3:
          case 4:
            buffer.writeUInt32LE(timestamp);
            break;
          case 5:
          case 6:
          case 7:
            buffer.writeUInt40LE(timestamp);
        }
        yield buffer.data;
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        if (!(value instanceof Date)) {
          value = new Date(Date.parse(value));
        }
        if (isNaN(value)) {
          throw new TypeError("Invalid time.");
        }
        return value;
      }
    };
    exports.default = Time;
    module.exports = Time;
  })(time, time.exports);
  return time.exports;
}
var date = { exports: {} };
var hasRequiredDate;
function requireDate() {
  if (hasRequiredDate) return date.exports;
  hasRequiredDate = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _core = require$$0$5;
    const globalDate = commonjsGlobal.Date;
    const EPOCH_DATE = _core.LocalDate.ofYearDay(1, 1);
    const NULL_LENGTH = Buffer.from([0]);
    const DATA_LENGTH = Buffer.from([3]);
    const Date2 = {
      id: 40,
      type: "DATEN",
      name: "Date",
      declaration: function() {
        return "date";
      },
      generateTypeInfo: function() {
        return Buffer.from([this.id]);
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        return DATA_LENGTH;
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        const value = parameter.value;
        let date2;
        if (options.useUTC) {
          date2 = _core.LocalDate.of(value.getUTCFullYear(), value.getUTCMonth() + 1, value.getUTCDate());
        } else {
          date2 = _core.LocalDate.of(value.getFullYear(), value.getMonth() + 1, value.getDate());
        }
        const days = EPOCH_DATE.until(date2, _core.ChronoUnit.DAYS);
        const buffer = Buffer.alloc(3);
        buffer.writeUIntLE(days, 0, 3);
        yield buffer;
      },
      // TODO: value is technically of type 'unknown'.
      validate: function(value, collation2, options) {
        if (value == null) {
          return null;
        }
        if (!(value instanceof globalDate)) {
          value = new globalDate(globalDate.parse(value));
        }
        value = value;
        let year;
        if (options && options.useUTC) {
          year = value.getUTCFullYear();
        } else {
          year = value.getFullYear();
        }
        if (year < 1 || year > 9999) {
          throw new TypeError("Out of range.");
        }
        if (isNaN(value)) {
          throw new TypeError("Invalid date.");
        }
        return value;
      }
    };
    exports.default = Date2;
    module.exports = Date2;
  })(date, date.exports);
  return date.exports;
}
var datetime2 = { exports: {} };
var hasRequiredDatetime2;
function requireDatetime2() {
  if (hasRequiredDatetime2) return datetime2.exports;
  hasRequiredDatetime2 = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _core = require$$0$5;
    var _writableTrackingBuffer = _interopRequireDefault(requireWritableTrackingBuffer());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const EPOCH_DATE = _core.LocalDate.ofYearDay(1, 1);
    const NULL_LENGTH = Buffer.from([0]);
    const DateTime2 = {
      id: 42,
      type: "DATETIME2N",
      name: "DateTime2",
      declaration: function(parameter) {
        return "datetime2(" + this.resolveScale(parameter) + ")";
      },
      resolveScale: function(parameter) {
        if (parameter.scale != null) {
          return parameter.scale;
        } else if (parameter.value === null) {
          return 0;
        } else {
          return 7;
        }
      },
      generateTypeInfo(parameter, _options) {
        return Buffer.from([this.id, parameter.scale]);
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        switch (parameter.scale) {
          case 0:
          case 1:
          case 2:
            return Buffer.from([6]);
          case 3:
          case 4:
            return Buffer.from([7]);
          case 5:
          case 6:
          case 7:
            return Buffer.from([8]);
          default:
            throw new Error("invalid scale");
        }
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        const value = parameter.value;
        let scale = parameter.scale;
        const buffer = new _writableTrackingBuffer.default(16);
        scale = scale;
        let timestamp;
        if (options.useUTC) {
          timestamp = ((value.getUTCHours() * 60 + value.getUTCMinutes()) * 60 + value.getUTCSeconds()) * 1e3 + value.getUTCMilliseconds();
        } else {
          timestamp = ((value.getHours() * 60 + value.getMinutes()) * 60 + value.getSeconds()) * 1e3 + value.getMilliseconds();
        }
        timestamp = timestamp * Math.pow(10, scale - 3);
        timestamp += (value.nanosecondDelta != null ? value.nanosecondDelta : 0) * Math.pow(10, scale);
        timestamp = Math.round(timestamp);
        switch (scale) {
          case 0:
          case 1:
          case 2:
            buffer.writeUInt24LE(timestamp);
            break;
          case 3:
          case 4:
            buffer.writeUInt32LE(timestamp);
            break;
          case 5:
          case 6:
          case 7:
            buffer.writeUInt40LE(timestamp);
        }
        let date2;
        if (options.useUTC) {
          date2 = _core.LocalDate.of(value.getUTCFullYear(), value.getUTCMonth() + 1, value.getUTCDate());
        } else {
          date2 = _core.LocalDate.of(value.getFullYear(), value.getMonth() + 1, value.getDate());
        }
        const days = EPOCH_DATE.until(date2, _core.ChronoUnit.DAYS);
        buffer.writeUInt24LE(days);
        yield buffer.data;
      },
      validate: function(value, collation2, options) {
        if (value == null) {
          return null;
        }
        if (!(value instanceof Date)) {
          value = new Date(Date.parse(value));
        }
        value = value;
        let year;
        if (options && options.useUTC) {
          year = value.getUTCFullYear();
        } else {
          year = value.getFullYear();
        }
        if (year < 1 || year > 9999) {
          throw new TypeError("Out of range.");
        }
        if (isNaN(value)) {
          throw new TypeError("Invalid date.");
        }
        return value;
      }
    };
    exports.default = DateTime2;
    module.exports = DateTime2;
  })(datetime2, datetime2.exports);
  return datetime2.exports;
}
var datetimeoffset = { exports: {} };
var hasRequiredDatetimeoffset;
function requireDatetimeoffset() {
  if (hasRequiredDatetimeoffset) return datetimeoffset.exports;
  hasRequiredDatetimeoffset = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _core = require$$0$5;
    var _writableTrackingBuffer = _interopRequireDefault(requireWritableTrackingBuffer());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const EPOCH_DATE = _core.LocalDate.ofYearDay(1, 1);
    const NULL_LENGTH = Buffer.from([0]);
    const DateTimeOffset = {
      id: 43,
      type: "DATETIMEOFFSETN",
      name: "DateTimeOffset",
      declaration: function(parameter) {
        return "datetimeoffset(" + this.resolveScale(parameter) + ")";
      },
      resolveScale: function(parameter) {
        if (parameter.scale != null) {
          return parameter.scale;
        } else if (parameter.value === null) {
          return 0;
        } else {
          return 7;
        }
      },
      generateTypeInfo(parameter) {
        return Buffer.from([this.id, parameter.scale]);
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        switch (parameter.scale) {
          case 0:
          case 1:
          case 2:
            return Buffer.from([8]);
          case 3:
          case 4:
            return Buffer.from([9]);
          case 5:
          case 6:
          case 7:
            return Buffer.from([10]);
          default:
            throw new Error("invalid scale");
        }
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          return;
        }
        const value = parameter.value;
        let scale = parameter.scale;
        const buffer = new _writableTrackingBuffer.default(16);
        scale = scale;
        let timestamp;
        timestamp = ((value.getUTCHours() * 60 + value.getUTCMinutes()) * 60 + value.getUTCSeconds()) * 1e3 + value.getMilliseconds();
        timestamp = timestamp * Math.pow(10, scale - 3);
        timestamp += (value.nanosecondDelta != null ? value.nanosecondDelta : 0) * Math.pow(10, scale);
        timestamp = Math.round(timestamp);
        switch (scale) {
          case 0:
          case 1:
          case 2:
            buffer.writeUInt24LE(timestamp);
            break;
          case 3:
          case 4:
            buffer.writeUInt32LE(timestamp);
            break;
          case 5:
          case 6:
          case 7:
            buffer.writeUInt40LE(timestamp);
        }
        const date2 = _core.LocalDate.of(value.getUTCFullYear(), value.getUTCMonth() + 1, value.getUTCDate());
        const days = EPOCH_DATE.until(date2, _core.ChronoUnit.DAYS);
        buffer.writeUInt24LE(days);
        const offset = -value.getTimezoneOffset();
        buffer.writeInt16LE(offset);
        yield buffer.data;
      },
      validate: function(value, collation2, options) {
        if (value == null) {
          return null;
        }
        if (!(value instanceof Date)) {
          value = new Date(Date.parse(value));
        }
        value = value;
        let year;
        if (options && options.useUTC) {
          year = value.getUTCFullYear();
        } else {
          year = value.getFullYear();
        }
        if (year < 1 || year > 9999) {
          throw new TypeError("Out of range.");
        }
        if (isNaN(value)) {
          throw new TypeError("Invalid date.");
        }
        return value;
      }
    };
    exports.default = DateTimeOffset;
    module.exports = DateTimeOffset;
  })(datetimeoffset, datetimeoffset.exports);
  return datetimeoffset.exports;
}
var udt = { exports: {} };
var hasRequiredUdt;
function requireUdt() {
  if (hasRequiredUdt) return udt.exports;
  hasRequiredUdt = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const UDT = {
      id: 240,
      type: "UDTTYPE",
      name: "UDT",
      declaration() {
        throw new Error("not implemented");
      },
      generateTypeInfo() {
        throw new Error("not implemented");
      },
      generateParameterLength() {
        throw new Error("not implemented");
      },
      generateParameterData() {
        throw new Error("not implemented");
      },
      validate() {
        throw new Error("not implemented");
      }
    };
    exports.default = UDT;
    module.exports = UDT;
  })(udt, udt.exports);
  return udt.exports;
}
var tvp = { exports: {} };
var hasRequiredTvp;
function requireTvp() {
  if (hasRequiredTvp) return tvp.exports;
  hasRequiredTvp = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _errors = requireErrors();
    var _writableTrackingBuffer = _interopRequireDefault(requireWritableTrackingBuffer());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const TVP_ROW_TOKEN = Buffer.from([1]);
    const TVP_END_TOKEN = Buffer.from([0]);
    const NULL_LENGTH = Buffer.from([255, 255]);
    const TVP = {
      id: 243,
      type: "TVPTYPE",
      name: "TVP",
      declaration: function(parameter) {
        const value = parameter.value;
        return value.name + " readonly";
      },
      generateTypeInfo(parameter) {
        const databaseName = "";
        const schema = parameter.value?.schema ?? "";
        const typeName = parameter.value?.name ?? "";
        const bufferLength = 1 + 1 + Buffer.byteLength(databaseName, "ucs2") + 1 + Buffer.byteLength(schema, "ucs2") + 1 + Buffer.byteLength(typeName, "ucs2");
        const buffer = new _writableTrackingBuffer.default(bufferLength, "ucs2");
        buffer.writeUInt8(this.id);
        buffer.writeBVarchar(databaseName);
        buffer.writeBVarchar(schema);
        buffer.writeBVarchar(typeName);
        return buffer.data;
      },
      generateParameterLength(parameter, options) {
        if (parameter.value == null) {
          return NULL_LENGTH;
        }
        const {
          columns
        } = parameter.value;
        const buffer = Buffer.alloc(2);
        buffer.writeUInt16LE(columns.length, 0);
        return buffer;
      },
      *generateParameterData(parameter, options) {
        if (parameter.value == null) {
          yield TVP_END_TOKEN;
          yield TVP_END_TOKEN;
          return;
        }
        const {
          columns,
          rows
        } = parameter.value;
        for (let i = 0, len = columns.length; i < len; i++) {
          const column = columns[i];
          const buff = Buffer.alloc(6);
          buff.writeUInt32LE(0, 0);
          buff.writeUInt16LE(0, 4);
          yield buff;
          yield column.type.generateTypeInfo(column);
          yield Buffer.from([0]);
        }
        yield TVP_END_TOKEN;
        for (let i = 0, length = rows.length; i < length; i++) {
          yield TVP_ROW_TOKEN;
          const row = rows[i];
          for (let k = 0, len2 = row.length; k < len2; k++) {
            const column = columns[k];
            const value = row[k];
            let paramValue;
            try {
              paramValue = column.type.validate(value, parameter.collation);
            } catch (error) {
              throw new _errors.InputError(`TVP column '${column.name}' has invalid data at row index ${i}`, {
                cause: error
              });
            }
            const param = {
              value: paramValue,
              length: column.length,
              scale: column.scale,
              precision: column.precision
            };
            yield column.type.generateParameterLength(param, options);
            yield* column.type.generateParameterData(param, options);
          }
        }
        yield TVP_END_TOKEN;
      },
      validate: function(value) {
        if (value == null) {
          return null;
        }
        if (typeof value !== "object") {
          throw new TypeError("Invalid table.");
        }
        if (!Array.isArray(value.columns)) {
          throw new TypeError("Invalid table.");
        }
        if (!Array.isArray(value.rows)) {
          throw new TypeError("Invalid table.");
        }
        return value;
      }
    };
    exports.default = TVP;
    module.exports = TVP;
  })(tvp, tvp.exports);
  return tvp.exports;
}
var sqlVariant = { exports: {} };
var hasRequiredSqlVariant;
function requireSqlVariant() {
  if (hasRequiredSqlVariant) return sqlVariant.exports;
  hasRequiredSqlVariant = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const Variant = {
      id: 98,
      type: "SSVARIANTTYPE",
      name: "Variant",
      declaration: function() {
        return "sql_variant";
      },
      generateTypeInfo() {
        throw new Error("not implemented");
      },
      generateParameterLength() {
        throw new Error("not implemented");
      },
      generateParameterData() {
        throw new Error("not implemented");
      },
      validate() {
        throw new Error("not implemented");
      }
    };
    exports.default = Variant;
    module.exports = Variant;
  })(sqlVariant, sqlVariant.exports);
  return sqlVariant.exports;
}
var hasRequiredDataType;
function requireDataType() {
  if (hasRequiredDataType) return dataType;
  hasRequiredDataType = 1;
  Object.defineProperty(dataType, "__esModule", {
    value: true
  });
  dataType.typeByName = dataType.TYPES = dataType.TYPE = void 0;
  var _null2 = _interopRequireDefault(require_null());
  var _tinyint = _interopRequireDefault(requireTinyint());
  var _bit = _interopRequireDefault(requireBit());
  var _smallint = _interopRequireDefault(requireSmallint());
  var _int = _interopRequireDefault(requireInt());
  var _smalldatetime = _interopRequireDefault(requireSmalldatetime());
  var _real = _interopRequireDefault(requireReal());
  var _money = _interopRequireDefault(requireMoney());
  var _datetime = _interopRequireDefault(requireDatetime());
  var _float = _interopRequireDefault(requireFloat());
  var _decimal = _interopRequireDefault(requireDecimal());
  var _numeric = _interopRequireDefault(requireNumeric());
  var _smallmoney = _interopRequireDefault(requireSmallmoney());
  var _bigint = _interopRequireDefault(requireBigint());
  var _image = _interopRequireDefault(requireImage());
  var _text = _interopRequireDefault(requireText());
  var _uniqueidentifier = _interopRequireDefault(requireUniqueidentifier());
  var _intn = _interopRequireDefault(requireIntn());
  var _ntext = _interopRequireDefault(requireNtext());
  var _bitn = _interopRequireDefault(requireBitn());
  var _decimaln = _interopRequireDefault(requireDecimaln());
  var _numericn = _interopRequireDefault(requireNumericn());
  var _floatn = _interopRequireDefault(requireFloatn());
  var _moneyn = _interopRequireDefault(requireMoneyn());
  var _datetimen = _interopRequireDefault(requireDatetimen());
  var _varbinary = _interopRequireDefault(requireVarbinary());
  var _varchar = _interopRequireDefault(requireVarchar());
  var _binary = _interopRequireDefault(requireBinary());
  var _char = _interopRequireDefault(requireChar());
  var _nvarchar = _interopRequireDefault(requireNvarchar());
  var _nchar = _interopRequireDefault(requireNchar());
  var _xml = _interopRequireDefault(requireXml());
  var _time = _interopRequireDefault(requireTime());
  var _date = _interopRequireDefault(requireDate());
  var _datetime2 = _interopRequireDefault(requireDatetime2());
  var _datetimeoffset = _interopRequireDefault(requireDatetimeoffset());
  var _udt = _interopRequireDefault(requireUdt());
  var _tvp = _interopRequireDefault(requireTvp());
  var _sqlVariant = _interopRequireDefault(requireSqlVariant());
  function _interopRequireDefault(e) {
    return e && e.__esModule ? e : { default: e };
  }
  dataType.TYPE = {
    [_null2.default.id]: _null2.default,
    [_tinyint.default.id]: _tinyint.default,
    [_bit.default.id]: _bit.default,
    [_smallint.default.id]: _smallint.default,
    [_int.default.id]: _int.default,
    [_smalldatetime.default.id]: _smalldatetime.default,
    [_real.default.id]: _real.default,
    [_money.default.id]: _money.default,
    [_datetime.default.id]: _datetime.default,
    [_float.default.id]: _float.default,
    [_decimal.default.id]: _decimal.default,
    [_numeric.default.id]: _numeric.default,
    [_smallmoney.default.id]: _smallmoney.default,
    [_bigint.default.id]: _bigint.default,
    [_image.default.id]: _image.default,
    [_text.default.id]: _text.default,
    [_uniqueidentifier.default.id]: _uniqueidentifier.default,
    [_intn.default.id]: _intn.default,
    [_ntext.default.id]: _ntext.default,
    [_bitn.default.id]: _bitn.default,
    [_decimaln.default.id]: _decimaln.default,
    [_numericn.default.id]: _numericn.default,
    [_floatn.default.id]: _floatn.default,
    [_moneyn.default.id]: _moneyn.default,
    [_datetimen.default.id]: _datetimen.default,
    [_varbinary.default.id]: _varbinary.default,
    [_varchar.default.id]: _varchar.default,
    [_binary.default.id]: _binary.default,
    [_char.default.id]: _char.default,
    [_nvarchar.default.id]: _nvarchar.default,
    [_nchar.default.id]: _nchar.default,
    [_xml.default.id]: _xml.default,
    [_time.default.id]: _time.default,
    [_date.default.id]: _date.default,
    [_datetime2.default.id]: _datetime2.default,
    [_datetimeoffset.default.id]: _datetimeoffset.default,
    [_udt.default.id]: _udt.default,
    [_tvp.default.id]: _tvp.default,
    [_sqlVariant.default.id]: _sqlVariant.default
  };
  const TYPES = dataType.TYPES = {
    TinyInt: _tinyint.default,
    Bit: _bit.default,
    SmallInt: _smallint.default,
    Int: _int.default,
    SmallDateTime: _smalldatetime.default,
    Real: _real.default,
    Money: _money.default,
    DateTime: _datetime.default,
    Float: _float.default,
    Decimal: _decimal.default,
    Numeric: _numeric.default,
    SmallMoney: _smallmoney.default,
    BigInt: _bigint.default,
    Image: _image.default,
    Text: _text.default,
    UniqueIdentifier: _uniqueidentifier.default,
    NText: _ntext.default,
    VarBinary: _varbinary.default,
    VarChar: _varchar.default,
    Binary: _binary.default,
    Char: _char.default,
    NVarChar: _nvarchar.default,
    NChar: _nchar.default,
    Xml: _xml.default,
    Time: _time.default,
    Date: _date.default,
    DateTime2: _datetime2.default,
    DateTimeOffset: _datetimeoffset.default,
    UDT: _udt.default,
    TVP: _tvp.default,
    Variant: _sqlVariant.default
  };
  dataType.typeByName = TYPES;
  return dataType;
}
var helpers = {};
var hasRequiredHelpers;
function requireHelpers() {
  if (hasRequiredHelpers) return helpers;
  hasRequiredHelpers = 1;
  Object.defineProperty(helpers, "__esModule", {
    value: true
  });
  helpers.Result = helpers.NotEnoughDataError = void 0;
  helpers.readBVarByte = readBVarByte;
  helpers.readBVarChar = readBVarChar;
  helpers.readBigInt64LE = readBigInt64LE;
  helpers.readBigUInt64LE = readBigUInt64LE;
  helpers.readDoubleLE = readDoubleLE;
  helpers.readFloatLE = readFloatLE;
  helpers.readInt16LE = readInt16LE;
  helpers.readInt32LE = readInt32LE;
  helpers.readUInt16LE = readUInt16LE;
  helpers.readUInt24LE = readUInt24LE;
  helpers.readUInt32BE = readUInt32BE;
  helpers.readUInt32LE = readUInt32LE;
  helpers.readUInt40LE = readUInt40LE;
  helpers.readUInt8 = readUInt8;
  helpers.readUNumeric128LE = readUNumeric128LE;
  helpers.readUNumeric64LE = readUNumeric64LE;
  helpers.readUNumeric96LE = readUNumeric96LE;
  helpers.readUsVarByte = readUsVarByte;
  helpers.readUsVarChar = readUsVarChar;
  class Result {
    constructor(value, offset) {
      this.value = value;
      this.offset = offset;
    }
  }
  helpers.Result = Result;
  class NotEnoughDataError extends Error {
    byteCount;
    constructor(byteCount) {
      super();
      this.byteCount = byteCount;
    }
  }
  helpers.NotEnoughDataError = NotEnoughDataError;
  function readUInt8(buf, offset) {
    offset = +offset;
    if (buf.length < offset + 1) {
      throw new NotEnoughDataError(offset + 1);
    }
    return new Result(buf.readUInt8(offset), offset + 1);
  }
  function readUInt16LE(buf, offset) {
    offset = +offset;
    if (buf.length < offset + 2) {
      throw new NotEnoughDataError(offset + 2);
    }
    return new Result(buf.readUInt16LE(offset), offset + 2);
  }
  function readInt16LE(buf, offset) {
    offset = +offset;
    if (buf.length < offset + 2) {
      throw new NotEnoughDataError(offset + 2);
    }
    return new Result(buf.readInt16LE(offset), offset + 2);
  }
  function readUInt24LE(buf, offset) {
    offset = +offset;
    if (buf.length < offset + 3) {
      throw new NotEnoughDataError(offset + 3);
    }
    return new Result(buf.readUIntLE(offset, 3), offset + 3);
  }
  function readUInt32LE(buf, offset) {
    offset = +offset;
    if (buf.length < offset + 4) {
      throw new NotEnoughDataError(offset + 4);
    }
    return new Result(buf.readUInt32LE(offset), offset + 4);
  }
  function readUInt32BE(buf, offset) {
    offset = +offset;
    if (buf.length < offset + 4) {
      throw new NotEnoughDataError(offset + 4);
    }
    return new Result(buf.readUInt32BE(offset), offset + 4);
  }
  function readUInt40LE(buf, offset) {
    offset = +offset;
    if (buf.length < offset + 5) {
      throw new NotEnoughDataError(offset + 5);
    }
    return new Result(buf.readUIntLE(offset, 5), offset + 5);
  }
  function readInt32LE(buf, offset) {
    offset = +offset;
    if (buf.length < offset + 4) {
      throw new NotEnoughDataError(offset + 4);
    }
    return new Result(buf.readInt32LE(offset), offset + 4);
  }
  function readBigUInt64LE(buf, offset) {
    offset = +offset;
    if (buf.length < offset + 8) {
      throw new NotEnoughDataError(offset + 8);
    }
    return new Result(buf.readBigUInt64LE(offset), offset + 8);
  }
  function readBigInt64LE(buf, offset) {
    offset = +offset;
    if (buf.length < offset + 8) {
      throw new NotEnoughDataError(offset + 8);
    }
    return new Result(buf.readBigInt64LE(offset), offset + 8);
  }
  function readFloatLE(buf, offset) {
    offset = +offset;
    if (buf.length < offset + 4) {
      throw new NotEnoughDataError(offset + 4);
    }
    return new Result(buf.readFloatLE(offset), offset + 4);
  }
  function readDoubleLE(buf, offset) {
    offset = +offset;
    if (buf.length < offset + 8) {
      throw new NotEnoughDataError(offset + 8);
    }
    return new Result(buf.readDoubleLE(offset), offset + 8);
  }
  function readBVarChar(buf, offset) {
    offset = +offset;
    let charCount;
    ({
      offset,
      value: charCount
    } = readUInt8(buf, offset));
    const byteLength = charCount * 2;
    if (buf.length < offset + byteLength) {
      throw new NotEnoughDataError(offset + byteLength);
    }
    return new Result(buf.toString("ucs2", offset, offset + byteLength), offset + byteLength);
  }
  function readBVarByte(buf, offset) {
    offset = +offset;
    let byteLength;
    ({
      offset,
      value: byteLength
    } = readUInt8(buf, offset));
    if (buf.length < offset + byteLength) {
      throw new NotEnoughDataError(offset + byteLength);
    }
    return new Result(buf.slice(offset, offset + byteLength), offset + byteLength);
  }
  function readUsVarChar(buf, offset) {
    offset = +offset;
    let charCount;
    ({
      offset,
      value: charCount
    } = readUInt16LE(buf, offset));
    const byteLength = charCount * 2;
    if (buf.length < offset + byteLength) {
      throw new NotEnoughDataError(offset + byteLength);
    }
    return new Result(buf.toString("ucs2", offset, offset + byteLength), offset + byteLength);
  }
  function readUsVarByte(buf, offset) {
    offset = +offset;
    let byteLength;
    ({
      offset,
      value: byteLength
    } = readUInt16LE(buf, offset));
    if (buf.length < offset + byteLength) {
      throw new NotEnoughDataError(offset + byteLength);
    }
    return new Result(buf.slice(offset, offset + byteLength), offset + byteLength);
  }
  function readUNumeric64LE(buf, offset) {
    offset = +offset;
    if (buf.length < offset + 8) {
      throw new NotEnoughDataError(offset + 8);
    }
    const low = buf.readUInt32LE(offset);
    const high = buf.readUInt32LE(offset + 4);
    return new Result(4294967296 * high + low, offset + 8);
  }
  function readUNumeric96LE(buf, offset) {
    offset = +offset;
    if (buf.length < offset + 12) {
      throw new NotEnoughDataError(offset + 12);
    }
    const dword1 = buf.readUInt32LE(offset);
    const dword2 = buf.readUInt32LE(offset + 4);
    const dword3 = buf.readUInt32LE(offset + 8);
    return new Result(dword1 + 4294967296 * dword2 + 4294967296 * 4294967296 * dword3, offset + 12);
  }
  function readUNumeric128LE(buf, offset) {
    offset = +offset;
    if (buf.length < offset + 16) {
      throw new NotEnoughDataError(offset + 16);
    }
    const dword1 = buf.readUInt32LE(offset);
    const dword2 = buf.readUInt32LE(offset + 4);
    const dword3 = buf.readUInt32LE(offset + 8);
    const dword4 = buf.readUInt32LE(offset + 12);
    return new Result(dword1 + 4294967296 * dword2 + 4294967296 * 4294967296 * dword3 + 4294967296 * 4294967296 * 4294967296 * dword4, offset + 16);
  }
  return helpers;
}
var hasRequiredMetadataParser;
function requireMetadataParser() {
  if (hasRequiredMetadataParser) return metadataParser.exports;
  hasRequiredMetadataParser = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    exports.readCollation = readCollation;
    exports.readMetadata = readMetadata;
    var _collation = requireCollation();
    var _dataType = requireDataType();
    var _sprintfJs = requireSprintf();
    var _helpers = requireHelpers();
    function readCollation(buf, offset) {
      offset = +offset;
      if (buf.length < offset + 5) {
        throw new _helpers.NotEnoughDataError(offset + 5);
      }
      const collation2 = _collation.Collation.fromBuffer(buf.slice(offset, offset + 5));
      return new _helpers.Result(collation2, offset + 5);
    }
    function readSchema(buf, offset) {
      offset = +offset;
      let schemaPresent;
      ({
        offset,
        value: schemaPresent
      } = (0, _helpers.readUInt8)(buf, offset));
      if (schemaPresent !== 1) {
        return new _helpers.Result(void 0, offset);
      }
      let dbname;
      ({
        offset,
        value: dbname
      } = (0, _helpers.readBVarChar)(buf, offset));
      let owningSchema;
      ({
        offset,
        value: owningSchema
      } = (0, _helpers.readBVarChar)(buf, offset));
      let xmlSchemaCollection;
      ({
        offset,
        value: xmlSchemaCollection
      } = (0, _helpers.readUsVarChar)(buf, offset));
      return new _helpers.Result({
        dbname,
        owningSchema,
        xmlSchemaCollection
      }, offset);
    }
    function readUDTInfo(buf, offset) {
      let maxByteSize;
      ({
        offset,
        value: maxByteSize
      } = (0, _helpers.readUInt16LE)(buf, offset));
      let dbname;
      ({
        offset,
        value: dbname
      } = (0, _helpers.readBVarChar)(buf, offset));
      let owningSchema;
      ({
        offset,
        value: owningSchema
      } = (0, _helpers.readBVarChar)(buf, offset));
      let typeName;
      ({
        offset,
        value: typeName
      } = (0, _helpers.readBVarChar)(buf, offset));
      let assemblyName;
      ({
        offset,
        value: assemblyName
      } = (0, _helpers.readUsVarChar)(buf, offset));
      return new _helpers.Result({
        maxByteSize,
        dbname,
        owningSchema,
        typeName,
        assemblyName
      }, offset);
    }
    function readMetadata(buf, offset, options) {
      let userType;
      ({
        offset,
        value: userType
      } = (options.tdsVersion < "7_2" ? _helpers.readUInt16LE : _helpers.readUInt32LE)(buf, offset));
      let flags;
      ({
        offset,
        value: flags
      } = (0, _helpers.readUInt16LE)(buf, offset));
      let typeNumber;
      ({
        offset,
        value: typeNumber
      } = (0, _helpers.readUInt8)(buf, offset));
      const type = _dataType.TYPE[typeNumber];
      if (!type) {
        throw new Error((0, _sprintfJs.sprintf)("Unrecognised data type 0x%02X", typeNumber));
      }
      switch (type.name) {
        case "Null":
        case "TinyInt":
        case "SmallInt":
        case "Int":
        case "BigInt":
        case "Real":
        case "Float":
        case "SmallMoney":
        case "Money":
        case "Bit":
        case "SmallDateTime":
        case "DateTime":
        case "Date":
          return new _helpers.Result({
            userType,
            flags,
            type,
            collation: void 0,
            precision: void 0,
            scale: void 0,
            dataLength: void 0,
            schema: void 0,
            udtInfo: void 0
          }, offset);
        case "IntN":
        case "FloatN":
        case "MoneyN":
        case "BitN":
        case "UniqueIdentifier":
        case "DateTimeN": {
          let dataLength;
          ({
            offset,
            value: dataLength
          } = (0, _helpers.readUInt8)(buf, offset));
          return new _helpers.Result({
            userType,
            flags,
            type,
            collation: void 0,
            precision: void 0,
            scale: void 0,
            dataLength,
            schema: void 0,
            udtInfo: void 0
          }, offset);
        }
        case "Variant": {
          let dataLength;
          ({
            offset,
            value: dataLength
          } = (0, _helpers.readUInt32LE)(buf, offset));
          return new _helpers.Result({
            userType,
            flags,
            type,
            collation: void 0,
            precision: void 0,
            scale: void 0,
            dataLength,
            schema: void 0,
            udtInfo: void 0
          }, offset);
        }
        case "VarChar":
        case "Char":
        case "NVarChar":
        case "NChar": {
          let dataLength;
          ({
            offset,
            value: dataLength
          } = (0, _helpers.readUInt16LE)(buf, offset));
          let collation2;
          ({
            offset,
            value: collation2
          } = readCollation(buf, offset));
          return new _helpers.Result({
            userType,
            flags,
            type,
            collation: collation2,
            precision: void 0,
            scale: void 0,
            dataLength,
            schema: void 0,
            udtInfo: void 0
          }, offset);
        }
        case "Text":
        case "NText": {
          let dataLength;
          ({
            offset,
            value: dataLength
          } = (0, _helpers.readUInt32LE)(buf, offset));
          let collation2;
          ({
            offset,
            value: collation2
          } = readCollation(buf, offset));
          return new _helpers.Result({
            userType,
            flags,
            type,
            collation: collation2,
            precision: void 0,
            scale: void 0,
            dataLength,
            schema: void 0,
            udtInfo: void 0
          }, offset);
        }
        case "VarBinary":
        case "Binary": {
          let dataLength;
          ({
            offset,
            value: dataLength
          } = (0, _helpers.readUInt16LE)(buf, offset));
          return new _helpers.Result({
            userType,
            flags,
            type,
            collation: void 0,
            precision: void 0,
            scale: void 0,
            dataLength,
            schema: void 0,
            udtInfo: void 0
          }, offset);
        }
        case "Image": {
          let dataLength;
          ({
            offset,
            value: dataLength
          } = (0, _helpers.readUInt32LE)(buf, offset));
          return new _helpers.Result({
            userType,
            flags,
            type,
            collation: void 0,
            precision: void 0,
            scale: void 0,
            dataLength,
            schema: void 0,
            udtInfo: void 0
          }, offset);
        }
        case "Xml": {
          let schema;
          ({
            offset,
            value: schema
          } = readSchema(buf, offset));
          return new _helpers.Result({
            userType,
            flags,
            type,
            collation: void 0,
            precision: void 0,
            scale: void 0,
            dataLength: void 0,
            schema,
            udtInfo: void 0
          }, offset);
        }
        case "Time":
        case "DateTime2":
        case "DateTimeOffset": {
          let scale;
          ({
            offset,
            value: scale
          } = (0, _helpers.readUInt8)(buf, offset));
          return new _helpers.Result({
            userType,
            flags,
            type,
            collation: void 0,
            precision: void 0,
            scale,
            dataLength: void 0,
            schema: void 0,
            udtInfo: void 0
          }, offset);
        }
        case "NumericN":
        case "DecimalN": {
          let dataLength;
          ({
            offset,
            value: dataLength
          } = (0, _helpers.readUInt8)(buf, offset));
          let precision;
          ({
            offset,
            value: precision
          } = (0, _helpers.readUInt8)(buf, offset));
          let scale;
          ({
            offset,
            value: scale
          } = (0, _helpers.readUInt8)(buf, offset));
          return new _helpers.Result({
            userType,
            flags,
            type,
            collation: void 0,
            precision,
            scale,
            dataLength,
            schema: void 0,
            udtInfo: void 0
          }, offset);
        }
        case "UDT": {
          let udtInfo;
          ({
            offset,
            value: udtInfo
          } = readUDTInfo(buf, offset));
          return new _helpers.Result({
            userType,
            flags,
            type,
            collation: void 0,
            precision: void 0,
            scale: void 0,
            dataLength: void 0,
            schema: void 0,
            udtInfo
          }, offset);
        }
        default:
          throw new Error((0, _sprintfJs.sprintf)("Unrecognised type %s", type.name));
      }
    }
    function metadataParse(parser, options, callback) {
      (async () => {
        while (true) {
          let result;
          try {
            result = readMetadata(parser.buffer, parser.position, options);
          } catch (err) {
            if (err instanceof _helpers.NotEnoughDataError) {
              await parser.waitForChunk();
              continue;
            }
            throw err;
          }
          parser.position = result.offset;
          return callback(result.value);
        }
      })();
    }
    exports.default = metadataParse;
    module.exports = metadataParse;
    module.exports.readCollation = readCollation;
    module.exports.readMetadata = readMetadata;
  })(metadataParser, metadataParser.exports);
  return metadataParser.exports;
}
var hasRequiredColmetadataTokenParser;
function requireColmetadataTokenParser() {
  if (hasRequiredColmetadataTokenParser) return colmetadataTokenParser.exports;
  hasRequiredColmetadataTokenParser = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _metadataParser = requireMetadataParser();
    var _token = requireToken();
    var _helpers = requireHelpers();
    function readTableName(buf, offset, metadata, options) {
      if (!metadata.type.hasTableName) {
        return new _helpers.Result(void 0, offset);
      }
      if (options.tdsVersion < "7_2") {
        return (0, _helpers.readUsVarChar)(buf, offset);
      }
      let numberOfTableNameParts;
      ({
        offset,
        value: numberOfTableNameParts
      } = (0, _helpers.readUInt8)(buf, offset));
      const tableName = [];
      for (let i = 0; i < numberOfTableNameParts; i++) {
        let tableNamePart;
        ({
          offset,
          value: tableNamePart
        } = (0, _helpers.readUsVarChar)(buf, offset));
        tableName.push(tableNamePart);
      }
      return new _helpers.Result(tableName, offset);
    }
    function readColumnName(buf, offset, index, metadata, options) {
      let colName;
      ({
        offset,
        value: colName
      } = (0, _helpers.readBVarChar)(buf, offset));
      if (options.columnNameReplacer) {
        return new _helpers.Result(options.columnNameReplacer(colName, index, metadata), offset);
      } else if (options.camelCaseColumns) {
        return new _helpers.Result(colName.replace(/^[A-Z]/, function(s) {
          return s.toLowerCase();
        }), offset);
      } else {
        return new _helpers.Result(colName, offset);
      }
    }
    function readColumn(buf, offset, options, index) {
      let metadata;
      ({
        offset,
        value: metadata
      } = (0, _metadataParser.readMetadata)(buf, offset, options));
      let tableName;
      ({
        offset,
        value: tableName
      } = readTableName(buf, offset, metadata, options));
      let colName;
      ({
        offset,
        value: colName
      } = readColumnName(buf, offset, index, metadata, options));
      return new _helpers.Result({
        userType: metadata.userType,
        flags: metadata.flags,
        type: metadata.type,
        collation: metadata.collation,
        precision: metadata.precision,
        scale: metadata.scale,
        udtInfo: metadata.udtInfo,
        dataLength: metadata.dataLength,
        schema: metadata.schema,
        colName,
        tableName
      }, offset);
    }
    async function colMetadataParser(parser) {
      let columnCount;
      while (true) {
        let offset;
        try {
          ({
            offset,
            value: columnCount
          } = (0, _helpers.readUInt16LE)(parser.buffer, parser.position));
        } catch (err) {
          if (err instanceof _helpers.NotEnoughDataError) {
            await parser.waitForChunk();
            continue;
          }
          throw err;
        }
        parser.position = offset;
        break;
      }
      const columns = [];
      for (let i = 0; i < columnCount; i++) {
        while (true) {
          let column;
          let offset;
          try {
            ({
              offset,
              value: column
            } = readColumn(parser.buffer, parser.position, parser.options, i));
          } catch (err) {
            if (err instanceof _helpers.NotEnoughDataError) {
              await parser.waitForChunk();
              continue;
            }
            throw err;
          }
          parser.position = offset;
          columns.push(column);
          break;
        }
      }
      return new _token.ColMetadataToken(columns);
    }
    exports.default = colMetadataParser;
    module.exports = colMetadataParser;
  })(colmetadataTokenParser, colmetadataTokenParser.exports);
  return colmetadataTokenParser.exports;
}
var doneTokenParser = {};
var hasRequiredDoneTokenParser;
function requireDoneTokenParser() {
  if (hasRequiredDoneTokenParser) return doneTokenParser;
  hasRequiredDoneTokenParser = 1;
  Object.defineProperty(doneTokenParser, "__esModule", {
    value: true
  });
  doneTokenParser.doneInProcParser = doneInProcParser;
  doneTokenParser.doneParser = doneParser;
  doneTokenParser.doneProcParser = doneProcParser;
  var _token = requireToken();
  var _helpers = requireHelpers();
  const STATUS = {
    MORE: 1,
    ERROR: 2,
    COUNT: 16,
    ATTN: 32,
    SRVERROR: 256
  };
  function readToken(buf, offset, options) {
    let status;
    ({
      offset,
      value: status
    } = (0, _helpers.readUInt16LE)(buf, offset));
    const more = !!(status & STATUS.MORE);
    const sqlError = !!(status & STATUS.ERROR);
    const rowCountValid = !!(status & STATUS.COUNT);
    const attention = !!(status & STATUS.ATTN);
    const serverError = !!(status & STATUS.SRVERROR);
    let curCmd;
    ({
      offset,
      value: curCmd
    } = (0, _helpers.readUInt16LE)(buf, offset));
    let rowCount;
    ({
      offset,
      value: rowCount
    } = (options.tdsVersion < "7_2" ? _helpers.readUInt32LE : _helpers.readBigUInt64LE)(buf, offset));
    return new _helpers.Result({
      more,
      sqlError,
      attention,
      serverError,
      rowCount: rowCountValid ? Number(rowCount) : void 0,
      curCmd
    }, offset);
  }
  function doneParser(buf, offset, options) {
    let value;
    ({
      offset,
      value
    } = readToken(buf, offset, options));
    return new _helpers.Result(new _token.DoneToken(value), offset);
  }
  function doneInProcParser(buf, offset, options) {
    let value;
    ({
      offset,
      value
    } = readToken(buf, offset, options));
    return new _helpers.Result(new _token.DoneInProcToken(value), offset);
  }
  function doneProcParser(buf, offset, options) {
    let value;
    ({
      offset,
      value
    } = readToken(buf, offset, options));
    return new _helpers.Result(new _token.DoneProcToken(value), offset);
  }
  return doneTokenParser;
}
var envChangeTokenParser = { exports: {} };
var hasRequiredEnvChangeTokenParser;
function requireEnvChangeTokenParser() {
  if (hasRequiredEnvChangeTokenParser) return envChangeTokenParser.exports;
  hasRequiredEnvChangeTokenParser = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _collation = requireCollation();
    var _token = requireToken();
    var _helpers = requireHelpers();
    const types2 = {
      1: {
        name: "DATABASE",
        event: "databaseChange"
      },
      2: {
        name: "LANGUAGE",
        event: "languageChange"
      },
      3: {
        name: "CHARSET",
        event: "charsetChange"
      },
      4: {
        name: "PACKET_SIZE",
        event: "packetSizeChange"
      },
      7: {
        name: "SQL_COLLATION",
        event: "sqlCollationChange"
      },
      8: {
        name: "BEGIN_TXN",
        event: "beginTransaction"
      },
      9: {
        name: "COMMIT_TXN",
        event: "commitTransaction"
      },
      10: {
        name: "ROLLBACK_TXN",
        event: "rollbackTransaction"
      },
      13: {
        name: "DATABASE_MIRRORING_PARTNER",
        event: "partnerNode"
      },
      17: {
        name: "TXN_ENDED"
      },
      18: {
        name: "RESET_CONNECTION",
        event: "resetConnection"
      },
      20: {
        name: "ROUTING_CHANGE",
        event: "routingChange"
      }
    };
    function _readNewAndOldValue(buf, offset, length, type) {
      switch (type.name) {
        case "DATABASE":
        case "LANGUAGE":
        case "CHARSET":
        case "PACKET_SIZE":
        case "DATABASE_MIRRORING_PARTNER": {
          let newValue;
          ({
            offset,
            value: newValue
          } = (0, _helpers.readBVarChar)(buf, offset));
          let oldValue;
          ({
            offset,
            value: oldValue
          } = (0, _helpers.readBVarChar)(buf, offset));
          switch (type.name) {
            case "PACKET_SIZE":
              return new _helpers.Result(new _token.PacketSizeEnvChangeToken(parseInt(newValue), parseInt(oldValue)), offset);
            case "DATABASE":
              return new _helpers.Result(new _token.DatabaseEnvChangeToken(newValue, oldValue), offset);
            case "LANGUAGE":
              return new _helpers.Result(new _token.LanguageEnvChangeToken(newValue, oldValue), offset);
            case "CHARSET":
              return new _helpers.Result(new _token.CharsetEnvChangeToken(newValue, oldValue), offset);
            case "DATABASE_MIRRORING_PARTNER":
              return new _helpers.Result(new _token.DatabaseMirroringPartnerEnvChangeToken(newValue, oldValue), offset);
          }
          throw new Error("unreachable");
        }
        case "SQL_COLLATION":
        case "BEGIN_TXN":
        case "COMMIT_TXN":
        case "ROLLBACK_TXN":
        case "RESET_CONNECTION": {
          let newValue;
          ({
            offset,
            value: newValue
          } = (0, _helpers.readBVarByte)(buf, offset));
          let oldValue;
          ({
            offset,
            value: oldValue
          } = (0, _helpers.readBVarByte)(buf, offset));
          switch (type.name) {
            case "SQL_COLLATION": {
              const newCollation = newValue.length ? _collation.Collation.fromBuffer(newValue) : void 0;
              const oldCollation = oldValue.length ? _collation.Collation.fromBuffer(oldValue) : void 0;
              return new _helpers.Result(new _token.CollationChangeToken(newCollation, oldCollation), offset);
            }
            case "BEGIN_TXN":
              return new _helpers.Result(new _token.BeginTransactionEnvChangeToken(newValue, oldValue), offset);
            case "COMMIT_TXN":
              return new _helpers.Result(new _token.CommitTransactionEnvChangeToken(newValue, oldValue), offset);
            case "ROLLBACK_TXN":
              return new _helpers.Result(new _token.RollbackTransactionEnvChangeToken(newValue, oldValue), offset);
            case "RESET_CONNECTION":
              return new _helpers.Result(new _token.ResetConnectionEnvChangeToken(newValue, oldValue), offset);
          }
          throw new Error("unreachable");
        }
        case "ROUTING_CHANGE": {
          let routePacket;
          ({
            offset,
            value: routePacket
          } = (0, _helpers.readUsVarByte)(buf, offset));
          let oldValue;
          ({
            offset,
            value: oldValue
          } = (0, _helpers.readUsVarByte)(buf, offset));
          const protocol = routePacket.readUInt8(0);
          if (protocol !== 0) {
            throw new Error("Unknown protocol byte in routing change event");
          }
          const port = routePacket.readUInt16LE(1);
          const serverLen = routePacket.readUInt16LE(3);
          const server = routePacket.toString("ucs2", 5, 5 + serverLen * 2);
          const newValue = {
            protocol,
            port,
            server
          };
          return new _helpers.Result(new _token.RoutingEnvChangeToken(newValue, oldValue), offset);
        }
        default: {
          console.error("Tedious > Unsupported ENVCHANGE type " + type.name);
          return new _helpers.Result(void 0, offset + length - 1);
        }
      }
    }
    function envChangeParser(buf, offset, _options) {
      let tokenLength;
      ({
        offset,
        value: tokenLength
      } = (0, _helpers.readUInt16LE)(buf, offset));
      if (buf.length < offset + tokenLength) {
        throw new _helpers.NotEnoughDataError(offset + tokenLength);
      }
      let typeNumber;
      ({
        offset,
        value: typeNumber
      } = (0, _helpers.readUInt8)(buf, offset));
      const type = types2[typeNumber];
      if (!type) {
        console.error("Tedious > Unsupported ENVCHANGE type " + typeNumber);
        return new _helpers.Result(void 0, offset + tokenLength - 1);
      }
      return _readNewAndOldValue(buf, offset, tokenLength, type);
    }
    exports.default = envChangeParser;
    module.exports = envChangeParser;
  })(envChangeTokenParser, envChangeTokenParser.exports);
  return envChangeTokenParser.exports;
}
var infoerrorTokenParser = {};
var hasRequiredInfoerrorTokenParser;
function requireInfoerrorTokenParser() {
  if (hasRequiredInfoerrorTokenParser) return infoerrorTokenParser;
  hasRequiredInfoerrorTokenParser = 1;
  Object.defineProperty(infoerrorTokenParser, "__esModule", {
    value: true
  });
  infoerrorTokenParser.errorParser = errorParser;
  infoerrorTokenParser.infoParser = infoParser;
  var _helpers = requireHelpers();
  var _token = requireToken();
  function readToken(buf, offset, options) {
    let tokenLength;
    ({
      offset,
      value: tokenLength
    } = (0, _helpers.readUInt16LE)(buf, offset));
    if (buf.length < tokenLength + offset) {
      throw new _helpers.NotEnoughDataError(tokenLength + offset);
    }
    let number;
    ({
      offset,
      value: number
    } = (0, _helpers.readUInt32LE)(buf, offset));
    let state;
    ({
      offset,
      value: state
    } = (0, _helpers.readUInt8)(buf, offset));
    let clazz;
    ({
      offset,
      value: clazz
    } = (0, _helpers.readUInt8)(buf, offset));
    let message2;
    ({
      offset,
      value: message2
    } = (0, _helpers.readUsVarChar)(buf, offset));
    let serverName;
    ({
      offset,
      value: serverName
    } = (0, _helpers.readBVarChar)(buf, offset));
    let procName;
    ({
      offset,
      value: procName
    } = (0, _helpers.readBVarChar)(buf, offset));
    let lineNumber;
    ({
      offset,
      value: lineNumber
    } = options.tdsVersion < "7_2" ? (0, _helpers.readUInt16LE)(buf, offset) : (0, _helpers.readUInt32LE)(buf, offset));
    return new _helpers.Result({
      "number": number,
      "state": state,
      "class": clazz,
      "message": message2,
      "serverName": serverName,
      "procName": procName,
      "lineNumber": lineNumber
    }, offset);
  }
  function infoParser(buf, offset, options) {
    let data;
    ({
      offset,
      value: data
    } = readToken(buf, offset, options));
    return new _helpers.Result(new _token.InfoMessageToken(data), offset);
  }
  function errorParser(buf, offset, options) {
    let data;
    ({
      offset,
      value: data
    } = readToken(buf, offset, options));
    return new _helpers.Result(new _token.ErrorMessageToken(data), offset);
  }
  return infoerrorTokenParser;
}
var fedauthInfoParser = { exports: {} };
var hasRequiredFedauthInfoParser;
function requireFedauthInfoParser() {
  if (hasRequiredFedauthInfoParser) return fedauthInfoParser.exports;
  hasRequiredFedauthInfoParser = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _helpers = requireHelpers();
    var _token = requireToken();
    const FEDAUTHINFOID = {
      STSURL: 1,
      SPN: 2
    };
    function readFedAuthInfo(data) {
      let offset = 0;
      let spn, stsurl;
      const countOfInfoIDs = data.readUInt32LE(offset);
      offset += 4;
      for (let i = 0; i < countOfInfoIDs; i++) {
        const fedauthInfoID = data.readUInt8(offset);
        offset += 1;
        const fedAuthInfoDataLen = data.readUInt32LE(offset);
        offset += 4;
        const fedAuthInfoDataOffset = data.readUInt32LE(offset);
        offset += 4;
        switch (fedauthInfoID) {
          case FEDAUTHINFOID.SPN:
            spn = data.toString("ucs2", fedAuthInfoDataOffset, fedAuthInfoDataOffset + fedAuthInfoDataLen);
            break;
          case FEDAUTHINFOID.STSURL:
            stsurl = data.toString("ucs2", fedAuthInfoDataOffset, fedAuthInfoDataOffset + fedAuthInfoDataLen);
            break;
        }
      }
      return {
        spn,
        stsurl
      };
    }
    function fedAuthInfoParser(buf, offset, _options) {
      let tokenLength;
      ({
        offset,
        value: tokenLength
      } = (0, _helpers.readUInt32LE)(buf, offset));
      if (buf.length < offset + tokenLength) {
        throw new _helpers.NotEnoughDataError(offset + tokenLength);
      }
      const data = buf.slice(offset, offset + tokenLength);
      offset += tokenLength;
      const {
        spn,
        stsurl
      } = readFedAuthInfo(data);
      return new _helpers.Result(new _token.FedAuthInfoToken(spn, stsurl), offset);
    }
    exports.default = fedAuthInfoParser;
    module.exports = fedAuthInfoParser;
  })(fedauthInfoParser, fedauthInfoParser.exports);
  return fedauthInfoParser.exports;
}
var featureExtAckParser = { exports: {} };
var hasRequiredFeatureExtAckParser;
function requireFeatureExtAckParser() {
  if (hasRequiredFeatureExtAckParser) return featureExtAckParser.exports;
  hasRequiredFeatureExtAckParser = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _helpers = requireHelpers();
    var _token = requireToken();
    const FEATURE_ID = {
      FEDAUTH: 2,
      UTF8_SUPPORT: 10,
      TERMINATOR: 255
    };
    function featureExtAckParser2(buf, offset, _options) {
      let fedAuth;
      let utf8Support;
      while (true) {
        let featureId;
        ({
          value: featureId,
          offset
        } = (0, _helpers.readUInt8)(buf, offset));
        if (featureId === FEATURE_ID.TERMINATOR) {
          return new _helpers.Result(new _token.FeatureExtAckToken(fedAuth, utf8Support), offset);
        }
        let featureAckDataLen;
        ({
          value: featureAckDataLen,
          offset
        } = (0, _helpers.readUInt32LE)(buf, offset));
        if (buf.length < offset + featureAckDataLen) {
          throw new _helpers.NotEnoughDataError(offset + featureAckDataLen);
        }
        const featureData = buf.slice(offset, offset + featureAckDataLen);
        offset += featureAckDataLen;
        switch (featureId) {
          case FEATURE_ID.FEDAUTH:
            fedAuth = featureData;
            break;
          case FEATURE_ID.UTF8_SUPPORT:
            utf8Support = !!featureData[0];
            break;
        }
      }
    }
    exports.default = featureExtAckParser2;
    module.exports = featureExtAckParser2;
  })(featureExtAckParser, featureExtAckParser.exports);
  return featureExtAckParser.exports;
}
var loginackTokenParser = { exports: {} };
var hasRequiredLoginackTokenParser;
function requireLoginackTokenParser() {
  if (hasRequiredLoginackTokenParser) return loginackTokenParser.exports;
  hasRequiredLoginackTokenParser = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _token = requireToken();
    var _tdsVersions = requireTdsVersions();
    var _helpers = requireHelpers();
    const interfaceTypes = {
      0: "SQL_DFLT",
      1: "SQL_TSQL"
    };
    function loginAckParser(buf, offset, _options) {
      let tokenLength;
      ({
        offset,
        value: tokenLength
      } = (0, _helpers.readUInt16LE)(buf, offset));
      if (buf.length < tokenLength + offset) {
        throw new _helpers.NotEnoughDataError(tokenLength + offset);
      }
      let interfaceNumber;
      ({
        offset,
        value: interfaceNumber
      } = (0, _helpers.readUInt8)(buf, offset));
      const interfaceType = interfaceTypes[interfaceNumber];
      let tdsVersionNumber;
      ({
        offset,
        value: tdsVersionNumber
      } = (0, _helpers.readUInt32BE)(buf, offset));
      const tdsVersion = _tdsVersions.versionsByValue[tdsVersionNumber];
      let progName;
      ({
        offset,
        value: progName
      } = (0, _helpers.readBVarChar)(buf, offset));
      let major;
      ({
        offset,
        value: major
      } = (0, _helpers.readUInt8)(buf, offset));
      let minor;
      ({
        offset,
        value: minor
      } = (0, _helpers.readUInt8)(buf, offset));
      let buildNumHi;
      ({
        offset,
        value: buildNumHi
      } = (0, _helpers.readUInt8)(buf, offset));
      let buildNumLow;
      ({
        offset,
        value: buildNumLow
      } = (0, _helpers.readUInt8)(buf, offset));
      return new _helpers.Result(new _token.LoginAckToken({
        interface: interfaceType,
        tdsVersion,
        progName,
        progVersion: {
          major,
          minor,
          buildNumHi,
          buildNumLow
        }
      }), offset);
    }
    exports.default = loginAckParser;
    module.exports = loginAckParser;
  })(loginackTokenParser, loginackTokenParser.exports);
  return loginackTokenParser.exports;
}
var orderTokenParser = { exports: {} };
var hasRequiredOrderTokenParser;
function requireOrderTokenParser() {
  if (hasRequiredOrderTokenParser) return orderTokenParser.exports;
  hasRequiredOrderTokenParser = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _token = requireToken();
    var _helpers = requireHelpers();
    function orderParser(buf, offset, _options) {
      let tokenLength;
      ({
        offset,
        value: tokenLength
      } = (0, _helpers.readUInt16LE)(buf, offset));
      if (buf.length < offset + tokenLength) {
        throw new _helpers.NotEnoughDataError(offset + tokenLength);
      }
      const orderColumns = [];
      for (let i = 0; i < tokenLength; i += 2) {
        let column;
        ({
          offset,
          value: column
        } = (0, _helpers.readUInt16LE)(buf, offset));
        orderColumns.push(column);
      }
      return new _helpers.Result(new _token.OrderToken(orderColumns), offset);
    }
    exports.default = orderParser;
    module.exports = orderParser;
  })(orderTokenParser, orderTokenParser.exports);
  return orderTokenParser.exports;
}
var returnstatusTokenParser = { exports: {} };
var hasRequiredReturnstatusTokenParser;
function requireReturnstatusTokenParser() {
  if (hasRequiredReturnstatusTokenParser) return returnstatusTokenParser.exports;
  hasRequiredReturnstatusTokenParser = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _helpers = requireHelpers();
    var _token = requireToken();
    function returnStatusParser(buf, offset, _options) {
      let value;
      ({
        value,
        offset
      } = (0, _helpers.readInt32LE)(buf, offset));
      return new _helpers.Result(new _token.ReturnStatusToken(value), offset);
    }
    exports.default = returnStatusParser;
    module.exports = returnStatusParser;
  })(returnstatusTokenParser, returnstatusTokenParser.exports);
  return returnstatusTokenParser.exports;
}
var returnvalueTokenParser = { exports: {} };
var valueParser = {};
var hasRequiredValueParser;
function requireValueParser() {
  if (hasRequiredValueParser) return valueParser;
  hasRequiredValueParser = 1;
  Object.defineProperty(valueParser, "__esModule", {
    value: true
  });
  valueParser.isPLPStream = isPLPStream;
  valueParser.readPLPStream = readPLPStream;
  valueParser.readValue = readValue;
  var _metadataParser = requireMetadataParser();
  var _dataType = requireDataType();
  var _iconvLite = _interopRequireDefault(requireLib());
  var _sprintfJs = requireSprintf();
  var _guidParser = requireGuidParser();
  var _helpers = requireHelpers();
  function _interopRequireDefault(e) {
    return e && e.__esModule ? e : { default: e };
  }
  const NULL = (1 << 16) - 1;
  const MAX = (1 << 16) - 1;
  const THREE_AND_A_THIRD = 3 + 1 / 3;
  const MONEY_DIVISOR = 1e4;
  const PLP_NULL = 0xFFFFFFFFFFFFFFFFn;
  const UNKNOWN_PLP_LEN = 0xFFFFFFFFFFFFFFFEn;
  const DEFAULT_ENCODING = "utf8";
  function readTinyInt(buf, offset) {
    return (0, _helpers.readUInt8)(buf, offset);
  }
  function readSmallInt(buf, offset) {
    return (0, _helpers.readInt16LE)(buf, offset);
  }
  function readInt(buf, offset) {
    return (0, _helpers.readInt32LE)(buf, offset);
  }
  function readBigInt(buf, offset) {
    let value;
    ({
      offset,
      value
    } = (0, _helpers.readBigInt64LE)(buf, offset));
    return new _helpers.Result(value.toString(), offset);
  }
  function readReal(buf, offset) {
    return (0, _helpers.readFloatLE)(buf, offset);
  }
  function readFloat(buf, offset) {
    return (0, _helpers.readDoubleLE)(buf, offset);
  }
  function readSmallMoney(buf, offset) {
    let value;
    ({
      offset,
      value
    } = (0, _helpers.readInt32LE)(buf, offset));
    return new _helpers.Result(value / MONEY_DIVISOR, offset);
  }
  function readMoney(buf, offset) {
    let high;
    ({
      offset,
      value: high
    } = (0, _helpers.readInt32LE)(buf, offset));
    let low;
    ({
      offset,
      value: low
    } = (0, _helpers.readUInt32LE)(buf, offset));
    return new _helpers.Result((low + 4294967296 * high) / MONEY_DIVISOR, offset);
  }
  function readBit(buf, offset) {
    let value;
    ({
      offset,
      value
    } = (0, _helpers.readUInt8)(buf, offset));
    return new _helpers.Result(!!value, offset);
  }
  function readValue(buf, offset, metadata, options) {
    const type = metadata.type;
    switch (type.name) {
      case "Null":
        return new _helpers.Result(null, offset);
      case "TinyInt": {
        return readTinyInt(buf, offset);
      }
      case "SmallInt": {
        return readSmallInt(buf, offset);
      }
      case "Int": {
        return readInt(buf, offset);
      }
      case "BigInt": {
        return readBigInt(buf, offset);
      }
      case "IntN": {
        let dataLength;
        ({
          offset,
          value: dataLength
        } = (0, _helpers.readUInt8)(buf, offset));
        switch (dataLength) {
          case 0:
            return new _helpers.Result(null, offset);
          case 1:
            return readTinyInt(buf, offset);
          case 2:
            return readSmallInt(buf, offset);
          case 4:
            return readInt(buf, offset);
          case 8:
            return readBigInt(buf, offset);
          default:
            throw new Error("Unsupported dataLength " + dataLength + " for IntN");
        }
      }
      case "Real": {
        return readReal(buf, offset);
      }
      case "Float": {
        return readFloat(buf, offset);
      }
      case "FloatN": {
        let dataLength;
        ({
          offset,
          value: dataLength
        } = (0, _helpers.readUInt8)(buf, offset));
        switch (dataLength) {
          case 0:
            return new _helpers.Result(null, offset);
          case 4:
            return readReal(buf, offset);
          case 8:
            return readFloat(buf, offset);
          default:
            throw new Error("Unsupported dataLength " + dataLength + " for FloatN");
        }
      }
      case "SmallMoney": {
        return readSmallMoney(buf, offset);
      }
      case "Money":
        return readMoney(buf, offset);
      case "MoneyN": {
        let dataLength;
        ({
          offset,
          value: dataLength
        } = (0, _helpers.readUInt8)(buf, offset));
        switch (dataLength) {
          case 0:
            return new _helpers.Result(null, offset);
          case 4:
            return readSmallMoney(buf, offset);
          case 8:
            return readMoney(buf, offset);
          default:
            throw new Error("Unsupported dataLength " + dataLength + " for MoneyN");
        }
      }
      case "Bit": {
        return readBit(buf, offset);
      }
      case "BitN": {
        let dataLength;
        ({
          offset,
          value: dataLength
        } = (0, _helpers.readUInt8)(buf, offset));
        switch (dataLength) {
          case 0:
            return new _helpers.Result(null, offset);
          case 1:
            return readBit(buf, offset);
          default:
            throw new Error("Unsupported dataLength " + dataLength + " for BitN");
        }
      }
      case "VarChar":
      case "Char": {
        const codepage = metadata.collation.codepage;
        let dataLength;
        ({
          offset,
          value: dataLength
        } = (0, _helpers.readUInt16LE)(buf, offset));
        if (dataLength === NULL) {
          return new _helpers.Result(null, offset);
        }
        return readChars(buf, offset, dataLength, codepage);
      }
      case "NVarChar":
      case "NChar": {
        let dataLength;
        ({
          offset,
          value: dataLength
        } = (0, _helpers.readUInt16LE)(buf, offset));
        if (dataLength === NULL) {
          return new _helpers.Result(null, offset);
        }
        return readNChars(buf, offset, dataLength);
      }
      case "VarBinary":
      case "Binary": {
        let dataLength;
        ({
          offset,
          value: dataLength
        } = (0, _helpers.readUInt16LE)(buf, offset));
        if (dataLength === NULL) {
          return new _helpers.Result(null, offset);
        }
        return readBinary(buf, offset, dataLength);
      }
      case "Text": {
        let textPointerLength;
        ({
          offset,
          value: textPointerLength
        } = (0, _helpers.readUInt8)(buf, offset));
        if (textPointerLength === 0) {
          return new _helpers.Result(null, offset);
        }
        ({
          offset
        } = readBinary(buf, offset, textPointerLength));
        ({
          offset
        } = readBinary(buf, offset, 8));
        let dataLength;
        ({
          offset,
          value: dataLength
        } = (0, _helpers.readUInt32LE)(buf, offset));
        return readChars(buf, offset, dataLength, metadata.collation.codepage);
      }
      case "NText": {
        let textPointerLength;
        ({
          offset,
          value: textPointerLength
        } = (0, _helpers.readUInt8)(buf, offset));
        if (textPointerLength === 0) {
          return new _helpers.Result(null, offset);
        }
        ({
          offset
        } = readBinary(buf, offset, textPointerLength));
        ({
          offset
        } = readBinary(buf, offset, 8));
        let dataLength;
        ({
          offset,
          value: dataLength
        } = (0, _helpers.readUInt32LE)(buf, offset));
        return readNChars(buf, offset, dataLength);
      }
      case "Image": {
        let textPointerLength;
        ({
          offset,
          value: textPointerLength
        } = (0, _helpers.readUInt8)(buf, offset));
        if (textPointerLength === 0) {
          return new _helpers.Result(null, offset);
        }
        ({
          offset
        } = readBinary(buf, offset, textPointerLength));
        ({
          offset
        } = readBinary(buf, offset, 8));
        let dataLength;
        ({
          offset,
          value: dataLength
        } = (0, _helpers.readUInt32LE)(buf, offset));
        return readBinary(buf, offset, dataLength);
      }
      case "SmallDateTime": {
        return readSmallDateTime(buf, offset, options.useUTC);
      }
      case "DateTime": {
        return readDateTime(buf, offset, options.useUTC);
      }
      case "DateTimeN": {
        let dataLength;
        ({
          offset,
          value: dataLength
        } = (0, _helpers.readUInt8)(buf, offset));
        switch (dataLength) {
          case 0:
            return new _helpers.Result(null, offset);
          case 4:
            return readSmallDateTime(buf, offset, options.useUTC);
          case 8:
            return readDateTime(buf, offset, options.useUTC);
          default:
            throw new Error("Unsupported dataLength " + dataLength + " for DateTimeN");
        }
      }
      case "Time": {
        let dataLength;
        ({
          offset,
          value: dataLength
        } = (0, _helpers.readUInt8)(buf, offset));
        if (dataLength === 0) {
          return new _helpers.Result(null, offset);
        }
        return readTime(buf, offset, dataLength, metadata.scale, options.useUTC);
      }
      case "Date": {
        let dataLength;
        ({
          offset,
          value: dataLength
        } = (0, _helpers.readUInt8)(buf, offset));
        if (dataLength === 0) {
          return new _helpers.Result(null, offset);
        }
        return readDate(buf, offset, options.useUTC);
      }
      case "DateTime2": {
        let dataLength;
        ({
          offset,
          value: dataLength
        } = (0, _helpers.readUInt8)(buf, offset));
        if (dataLength === 0) {
          return new _helpers.Result(null, offset);
        }
        return readDateTime2(buf, offset, dataLength, metadata.scale, options.useUTC);
      }
      case "DateTimeOffset": {
        let dataLength;
        ({
          offset,
          value: dataLength
        } = (0, _helpers.readUInt8)(buf, offset));
        if (dataLength === 0) {
          return new _helpers.Result(null, offset);
        }
        return readDateTimeOffset(buf, offset, dataLength, metadata.scale);
      }
      case "NumericN":
      case "DecimalN": {
        let dataLength;
        ({
          offset,
          value: dataLength
        } = (0, _helpers.readUInt8)(buf, offset));
        if (dataLength === 0) {
          return new _helpers.Result(null, offset);
        }
        return readNumeric(buf, offset, dataLength, metadata.precision, metadata.scale);
      }
      case "UniqueIdentifier": {
        let dataLength;
        ({
          offset,
          value: dataLength
        } = (0, _helpers.readUInt8)(buf, offset));
        switch (dataLength) {
          case 0:
            return new _helpers.Result(null, offset);
          case 16:
            return readUniqueIdentifier(buf, offset, options);
          default:
            throw new Error((0, _sprintfJs.sprintf)("Unsupported guid size %d", dataLength - 1));
        }
      }
      case "Variant": {
        let dataLength;
        ({
          offset,
          value: dataLength
        } = (0, _helpers.readUInt32LE)(buf, offset));
        if (dataLength === 0) {
          return new _helpers.Result(null, offset);
        }
        return readVariant(buf, offset, options, dataLength);
      }
      default: {
        throw new Error("Invalid type!");
      }
    }
  }
  function isPLPStream(metadata) {
    switch (metadata.type.name) {
      case "VarChar":
      case "NVarChar":
      case "VarBinary": {
        return metadata.dataLength === MAX;
      }
      case "Xml": {
        return true;
      }
      case "UDT": {
        return true;
      }
    }
  }
  function readUniqueIdentifier(buf, offset, options) {
    let data;
    ({
      value: data,
      offset
    } = readBinary(buf, offset, 16));
    return new _helpers.Result(options.lowerCaseGuids ? (0, _guidParser.bufferToLowerCaseGuid)(data) : (0, _guidParser.bufferToUpperCaseGuid)(data), offset);
  }
  function readNumeric(buf, offset, dataLength, _precision, scale) {
    let sign;
    ({
      offset,
      value: sign
    } = (0, _helpers.readUInt8)(buf, offset));
    sign = sign === 1 ? 1 : -1;
    let value;
    if (dataLength === 5) {
      ({
        offset,
        value
      } = (0, _helpers.readUInt32LE)(buf, offset));
    } else if (dataLength === 9) {
      ({
        offset,
        value
      } = (0, _helpers.readUNumeric64LE)(buf, offset));
    } else if (dataLength === 13) {
      ({
        offset,
        value
      } = (0, _helpers.readUNumeric96LE)(buf, offset));
    } else if (dataLength === 17) {
      ({
        offset,
        value
      } = (0, _helpers.readUNumeric128LE)(buf, offset));
    } else {
      throw new Error((0, _sprintfJs.sprintf)("Unsupported numeric dataLength %d", dataLength));
    }
    return new _helpers.Result(value * sign / Math.pow(10, scale), offset);
  }
  function readVariant(buf, offset, options, dataLength) {
    let baseType;
    ({
      value: baseType,
      offset
    } = (0, _helpers.readUInt8)(buf, offset));
    const type = _dataType.TYPE[baseType];
    let propBytes;
    ({
      value: propBytes,
      offset
    } = (0, _helpers.readUInt8)(buf, offset));
    dataLength = dataLength - propBytes - 2;
    switch (type.name) {
      case "UniqueIdentifier":
        return readUniqueIdentifier(buf, offset, options);
      case "Bit":
        return readBit(buf, offset);
      case "TinyInt":
        return readTinyInt(buf, offset);
      case "SmallInt":
        return readSmallInt(buf, offset);
      case "Int":
        return readInt(buf, offset);
      case "BigInt":
        return readBigInt(buf, offset);
      case "SmallDateTime":
        return readSmallDateTime(buf, offset, options.useUTC);
      case "DateTime":
        return readDateTime(buf, offset, options.useUTC);
      case "Real":
        return readReal(buf, offset);
      case "Float":
        return readFloat(buf, offset);
      case "SmallMoney":
        return readSmallMoney(buf, offset);
      case "Money":
        return readMoney(buf, offset);
      case "Date":
        return readDate(buf, offset, options.useUTC);
      case "Time": {
        let scale;
        ({
          value: scale,
          offset
        } = (0, _helpers.readUInt8)(buf, offset));
        return readTime(buf, offset, dataLength, scale, options.useUTC);
      }
      case "DateTime2": {
        let scale;
        ({
          value: scale,
          offset
        } = (0, _helpers.readUInt8)(buf, offset));
        return readDateTime2(buf, offset, dataLength, scale, options.useUTC);
      }
      case "DateTimeOffset": {
        let scale;
        ({
          value: scale,
          offset
        } = (0, _helpers.readUInt8)(buf, offset));
        return readDateTimeOffset(buf, offset, dataLength, scale);
      }
      case "VarBinary":
      case "Binary": {
        ({
          offset
        } = (0, _helpers.readUInt16LE)(buf, offset));
        return readBinary(buf, offset, dataLength);
      }
      case "NumericN":
      case "DecimalN": {
        let precision;
        ({
          value: precision,
          offset
        } = (0, _helpers.readUInt8)(buf, offset));
        let scale;
        ({
          value: scale,
          offset
        } = (0, _helpers.readUInt8)(buf, offset));
        return readNumeric(buf, offset, dataLength, precision, scale);
      }
      case "VarChar":
      case "Char": {
        ({
          offset
        } = (0, _helpers.readUInt16LE)(buf, offset));
        let collation2;
        ({
          value: collation2,
          offset
        } = (0, _metadataParser.readCollation)(buf, offset));
        return readChars(buf, offset, dataLength, collation2.codepage);
      }
      case "NVarChar":
      case "NChar": {
        ({
          offset
        } = (0, _helpers.readUInt16LE)(buf, offset));
        ({
          offset
        } = (0, _metadataParser.readCollation)(buf, offset));
        return readNChars(buf, offset, dataLength);
      }
      default:
        throw new Error("Invalid type!");
    }
  }
  function readBinary(buf, offset, dataLength) {
    if (buf.length < offset + dataLength) {
      throw new _helpers.NotEnoughDataError(offset + dataLength);
    }
    return new _helpers.Result(buf.slice(offset, offset + dataLength), offset + dataLength);
  }
  function readChars(buf, offset, dataLength, codepage) {
    if (buf.length < offset + dataLength) {
      throw new _helpers.NotEnoughDataError(offset + dataLength);
    }
    return new _helpers.Result(_iconvLite.default.decode(buf.slice(offset, offset + dataLength), codepage ?? DEFAULT_ENCODING), offset + dataLength);
  }
  function readNChars(buf, offset, dataLength) {
    if (buf.length < offset + dataLength) {
      throw new _helpers.NotEnoughDataError(offset + dataLength);
    }
    return new _helpers.Result(buf.toString("ucs2", offset, offset + dataLength), offset + dataLength);
  }
  async function readPLPStream(parser) {
    while (parser.buffer.length < parser.position + 8) {
      await parser.waitForChunk();
    }
    const expectedLength = parser.buffer.readBigUInt64LE(parser.position);
    parser.position += 8;
    if (expectedLength === PLP_NULL) {
      return null;
    }
    const chunks = [];
    let currentLength = 0;
    while (true) {
      while (parser.buffer.length < parser.position + 4) {
        await parser.waitForChunk();
      }
      const chunkLength = parser.buffer.readUInt32LE(parser.position);
      parser.position += 4;
      if (!chunkLength) {
        break;
      }
      while (parser.buffer.length < parser.position + chunkLength) {
        await parser.waitForChunk();
      }
      chunks.push(parser.buffer.slice(parser.position, parser.position + chunkLength));
      parser.position += chunkLength;
      currentLength += chunkLength;
    }
    if (expectedLength !== UNKNOWN_PLP_LEN) {
      if (currentLength !== Number(expectedLength)) {
        throw new Error("Partially Length-prefixed Bytes unmatched lengths : expected " + expectedLength + ", but got " + currentLength + " bytes");
      }
    }
    return chunks;
  }
  function readSmallDateTime(buf, offset, useUTC) {
    let days;
    ({
      offset,
      value: days
    } = (0, _helpers.readUInt16LE)(buf, offset));
    let minutes;
    ({
      offset,
      value: minutes
    } = (0, _helpers.readUInt16LE)(buf, offset));
    let value;
    if (useUTC) {
      value = new Date(Date.UTC(1900, 0, 1 + days, 0, minutes));
    } else {
      value = new Date(1900, 0, 1 + days, 0, minutes);
    }
    return new _helpers.Result(value, offset);
  }
  function readDateTime(buf, offset, useUTC) {
    let days;
    ({
      offset,
      value: days
    } = (0, _helpers.readInt32LE)(buf, offset));
    let threeHundredthsOfSecond;
    ({
      offset,
      value: threeHundredthsOfSecond
    } = (0, _helpers.readInt32LE)(buf, offset));
    const milliseconds = Math.round(threeHundredthsOfSecond * THREE_AND_A_THIRD);
    let value;
    if (useUTC) {
      value = new Date(Date.UTC(1900, 0, 1 + days, 0, 0, 0, milliseconds));
    } else {
      value = new Date(1900, 0, 1 + days, 0, 0, 0, milliseconds);
    }
    return new _helpers.Result(value, offset);
  }
  function readTime(buf, offset, dataLength, scale, useUTC) {
    let value;
    switch (dataLength) {
      case 3: {
        ({
          value,
          offset
        } = (0, _helpers.readUInt24LE)(buf, offset));
        break;
      }
      case 4: {
        ({
          value,
          offset
        } = (0, _helpers.readUInt32LE)(buf, offset));
        break;
      }
      case 5: {
        ({
          value,
          offset
        } = (0, _helpers.readUInt40LE)(buf, offset));
        break;
      }
      default: {
        throw new Error("unreachable");
      }
    }
    if (scale < 7) {
      for (let i = scale; i < 7; i++) {
        value *= 10;
      }
    }
    let date2;
    if (useUTC) {
      date2 = new Date(Date.UTC(1970, 0, 1, 0, 0, 0, value / 1e4));
    } else {
      date2 = new Date(1970, 0, 1, 0, 0, 0, value / 1e4);
    }
    Object.defineProperty(date2, "nanosecondsDelta", {
      enumerable: false,
      value: value % 1e4 / Math.pow(10, 7)
    });
    return new _helpers.Result(date2, offset);
  }
  function readDate(buf, offset, useUTC) {
    let days;
    ({
      offset,
      value: days
    } = (0, _helpers.readUInt24LE)(buf, offset));
    if (useUTC) {
      return new _helpers.Result(new Date(Date.UTC(2e3, 0, days - 730118)), offset);
    } else {
      return new _helpers.Result(new Date(2e3, 0, days - 730118), offset);
    }
  }
  function readDateTime2(buf, offset, dataLength, scale, useUTC) {
    let time2;
    ({
      offset,
      value: time2
    } = readTime(buf, offset, dataLength - 3, scale, useUTC));
    let days;
    ({
      offset,
      value: days
    } = (0, _helpers.readUInt24LE)(buf, offset));
    let date2;
    if (useUTC) {
      date2 = new Date(Date.UTC(2e3, 0, days - 730118, 0, 0, 0, +time2));
    } else {
      date2 = new Date(2e3, 0, days - 730118, time2.getHours(), time2.getMinutes(), time2.getSeconds(), time2.getMilliseconds());
    }
    Object.defineProperty(date2, "nanosecondsDelta", {
      enumerable: false,
      value: time2.nanosecondsDelta
    });
    return new _helpers.Result(date2, offset);
  }
  function readDateTimeOffset(buf, offset, dataLength, scale) {
    let time2;
    ({
      offset,
      value: time2
    } = readTime(buf, offset, dataLength - 5, scale, true));
    let days;
    ({
      offset,
      value: days
    } = (0, _helpers.readUInt24LE)(buf, offset));
    ({
      offset
    } = (0, _helpers.readUInt16LE)(buf, offset));
    const date2 = new Date(Date.UTC(2e3, 0, days - 730118, 0, 0, 0, +time2));
    Object.defineProperty(date2, "nanosecondsDelta", {
      enumerable: false,
      value: time2.nanosecondsDelta
    });
    return new _helpers.Result(date2, offset);
  }
  valueParser.readValue = readValue;
  valueParser.isPLPStream = isPLPStream;
  valueParser.readPLPStream = readPLPStream;
  return valueParser;
}
var hasRequiredReturnvalueTokenParser;
function requireReturnvalueTokenParser() {
  if (hasRequiredReturnvalueTokenParser) return returnvalueTokenParser.exports;
  hasRequiredReturnvalueTokenParser = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _token = requireToken();
    var _metadataParser = requireMetadataParser();
    var _valueParser = requireValueParser();
    var _helpers = requireHelpers();
    var iconv = _interopRequireWildcard(requireLib());
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, default: e2 };
        if (null === e2 || "object" != typeof e2 && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (const t3 in e2) "default" !== t3 && {}.hasOwnProperty.call(e2, t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, t3)) && (i.get || i.set) ? o(f, t3, i) : f[t3] = e2[t3]);
        return f;
      })(e, t);
    }
    async function returnParser(parser) {
      let paramName;
      let paramOrdinal;
      let metadata;
      while (true) {
        const buf = parser.buffer;
        let offset = parser.position;
        try {
          ({
            offset,
            value: paramOrdinal
          } = (0, _helpers.readUInt16LE)(buf, offset));
          ({
            offset,
            value: paramName
          } = (0, _helpers.readBVarChar)(buf, offset));
          ({
            offset
          } = (0, _helpers.readUInt8)(buf, offset));
          ({
            offset,
            value: metadata
          } = (0, _metadataParser.readMetadata)(buf, offset, parser.options));
          if (paramName.charAt(0) === "@") {
            paramName = paramName.slice(1);
          }
        } catch (err) {
          if (err instanceof _helpers.NotEnoughDataError) {
            await parser.waitForChunk();
            continue;
          }
          throw err;
        }
        parser.position = offset;
        break;
      }
      let value;
      while (true) {
        const buf = parser.buffer;
        let offset = parser.position;
        if ((0, _valueParser.isPLPStream)(metadata)) {
          const chunks = await (0, _valueParser.readPLPStream)(parser);
          if (chunks === null) {
            value = chunks;
          } else if (metadata.type.name === "NVarChar" || metadata.type.name === "Xml") {
            value = Buffer.concat(chunks).toString("ucs2");
          } else if (metadata.type.name === "VarChar") {
            value = iconv.decode(Buffer.concat(chunks), metadata.collation?.codepage ?? "utf8");
          } else if (metadata.type.name === "VarBinary" || metadata.type.name === "UDT") {
            value = Buffer.concat(chunks);
          }
        } else {
          try {
            ({
              value,
              offset
            } = (0, _valueParser.readValue)(buf, offset, metadata, parser.options));
          } catch (err) {
            if (err instanceof _helpers.NotEnoughDataError) {
              await parser.waitForChunk();
              continue;
            }
            throw err;
          }
          parser.position = offset;
        }
        break;
      }
      return new _token.ReturnValueToken({
        paramOrdinal,
        paramName,
        metadata,
        value
      });
    }
    exports.default = returnParser;
    module.exports = returnParser;
  })(returnvalueTokenParser, returnvalueTokenParser.exports);
  return returnvalueTokenParser.exports;
}
var rowTokenParser = { exports: {} };
var hasRequiredRowTokenParser;
function requireRowTokenParser() {
  if (hasRequiredRowTokenParser) return rowTokenParser.exports;
  hasRequiredRowTokenParser = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _token = requireToken();
    var iconv = _interopRequireWildcard(requireLib());
    var _valueParser = requireValueParser();
    var _helpers = requireHelpers();
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, default: e2 };
        if (null === e2 || "object" != typeof e2 && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (const t3 in e2) "default" !== t3 && {}.hasOwnProperty.call(e2, t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, t3)) && (i.get || i.set) ? o(f, t3, i) : f[t3] = e2[t3]);
        return f;
      })(e, t);
    }
    async function rowParser(parser) {
      const columns = [];
      for (const metadata of parser.colMetadata) {
        while (true) {
          if ((0, _valueParser.isPLPStream)(metadata)) {
            const chunks = await (0, _valueParser.readPLPStream)(parser);
            if (chunks === null) {
              columns.push({
                value: chunks,
                metadata
              });
            } else if (metadata.type.name === "NVarChar" || metadata.type.name === "Xml") {
              columns.push({
                value: Buffer.concat(chunks).toString("ucs2"),
                metadata
              });
            } else if (metadata.type.name === "VarChar") {
              columns.push({
                value: iconv.decode(Buffer.concat(chunks), metadata.collation?.codepage ?? "utf8"),
                metadata
              });
            } else if (metadata.type.name === "VarBinary" || metadata.type.name === "UDT") {
              columns.push({
                value: Buffer.concat(chunks),
                metadata
              });
            }
          } else {
            let result;
            try {
              result = (0, _valueParser.readValue)(parser.buffer, parser.position, metadata, parser.options);
            } catch (err) {
              if (err instanceof _helpers.NotEnoughDataError) {
                await parser.waitForChunk();
                continue;
              }
              throw err;
            }
            parser.position = result.offset;
            columns.push({
              value: result.value,
              metadata
            });
          }
          break;
        }
      }
      if (parser.options.useColumnNames) {
        const columnsMap = /* @__PURE__ */ Object.create(null);
        columns.forEach((column) => {
          const colName = column.metadata.colName;
          if (columnsMap[colName] == null) {
            columnsMap[colName] = column;
          }
        });
        return new _token.RowToken(columnsMap);
      } else {
        return new _token.RowToken(columns);
      }
    }
    exports.default = rowParser;
    module.exports = rowParser;
  })(rowTokenParser, rowTokenParser.exports);
  return rowTokenParser.exports;
}
var nbcrowTokenParser = { exports: {} };
var hasRequiredNbcrowTokenParser;
function requireNbcrowTokenParser() {
  if (hasRequiredNbcrowTokenParser) return nbcrowTokenParser.exports;
  hasRequiredNbcrowTokenParser = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _token = requireToken();
    var iconv = _interopRequireWildcard(requireLib());
    var _valueParser = requireValueParser();
    var _helpers = requireHelpers();
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, default: e2 };
        if (null === e2 || "object" != typeof e2 && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (const t3 in e2) "default" !== t3 && {}.hasOwnProperty.call(e2, t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, t3)) && (i.get || i.set) ? o(f, t3, i) : f[t3] = e2[t3]);
        return f;
      })(e, t);
    }
    async function nbcRowParser(parser) {
      const colMetadata = parser.colMetadata;
      const columns = [];
      const bitmap = [];
      const bitmapByteLength = Math.ceil(colMetadata.length / 8);
      while (parser.buffer.length - parser.position < bitmapByteLength) {
        await parser.waitForChunk();
      }
      const bytes = parser.buffer.slice(parser.position, parser.position + bitmapByteLength);
      parser.position += bitmapByteLength;
      for (let i = 0, len = bytes.length; i < len; i++) {
        const byte = bytes[i];
        bitmap.push(byte & 1 ? true : false);
        bitmap.push(byte & 2 ? true : false);
        bitmap.push(byte & 4 ? true : false);
        bitmap.push(byte & 8 ? true : false);
        bitmap.push(byte & 16 ? true : false);
        bitmap.push(byte & 32 ? true : false);
        bitmap.push(byte & 64 ? true : false);
        bitmap.push(byte & 128 ? true : false);
      }
      for (let i = 0; i < colMetadata.length; i++) {
        const metadata = colMetadata[i];
        if (bitmap[i]) {
          columns.push({
            value: null,
            metadata
          });
          continue;
        }
        while (true) {
          if ((0, _valueParser.isPLPStream)(metadata)) {
            const chunks = await (0, _valueParser.readPLPStream)(parser);
            if (chunks === null) {
              columns.push({
                value: chunks,
                metadata
              });
            } else if (metadata.type.name === "NVarChar" || metadata.type.name === "Xml") {
              columns.push({
                value: Buffer.concat(chunks).toString("ucs2"),
                metadata
              });
            } else if (metadata.type.name === "VarChar") {
              columns.push({
                value: iconv.decode(Buffer.concat(chunks), metadata.collation?.codepage ?? "utf8"),
                metadata
              });
            } else if (metadata.type.name === "VarBinary" || metadata.type.name === "UDT") {
              columns.push({
                value: Buffer.concat(chunks),
                metadata
              });
            }
          } else {
            let result;
            try {
              result = (0, _valueParser.readValue)(parser.buffer, parser.position, metadata, parser.options);
            } catch (err) {
              if (err instanceof _helpers.NotEnoughDataError) {
                await parser.waitForChunk();
                continue;
              }
              throw err;
            }
            parser.position = result.offset;
            columns.push({
              value: result.value,
              metadata
            });
          }
          break;
        }
      }
      if (parser.options.useColumnNames) {
        const columnsMap = /* @__PURE__ */ Object.create(null);
        columns.forEach((column) => {
          const colName = column.metadata.colName;
          if (columnsMap[colName] == null) {
            columnsMap[colName] = column;
          }
        });
        return new _token.NBCRowToken(columnsMap);
      } else {
        return new _token.NBCRowToken(columns);
      }
    }
    exports.default = nbcRowParser;
    module.exports = nbcRowParser;
  })(nbcrowTokenParser, nbcrowTokenParser.exports);
  return nbcrowTokenParser.exports;
}
var sspiTokenParser = { exports: {} };
var hasRequiredSspiTokenParser;
function requireSspiTokenParser() {
  if (hasRequiredSspiTokenParser) return sspiTokenParser.exports;
  hasRequiredSspiTokenParser = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _helpers = requireHelpers();
    var _token = requireToken();
    function parseChallenge(buffer) {
      const challenge = {};
      challenge.magic = buffer.slice(0, 8).toString("utf8");
      challenge.type = buffer.readInt32LE(8);
      challenge.domainLen = buffer.readInt16LE(12);
      challenge.domainMax = buffer.readInt16LE(14);
      challenge.domainOffset = buffer.readInt32LE(16);
      challenge.flags = buffer.readInt32LE(20);
      challenge.nonce = buffer.slice(24, 32);
      challenge.zeroes = buffer.slice(32, 40);
      challenge.targetLen = buffer.readInt16LE(40);
      challenge.targetMax = buffer.readInt16LE(42);
      challenge.targetOffset = buffer.readInt32LE(44);
      challenge.oddData = buffer.slice(48, 56);
      challenge.domain = buffer.slice(56, 56 + challenge.domainLen).toString("ucs2");
      challenge.target = buffer.slice(56 + challenge.domainLen, 56 + challenge.domainLen + challenge.targetLen);
      return challenge;
    }
    function sspiParser(buf, offset, _options) {
      let tokenLength;
      ({
        offset,
        value: tokenLength
      } = (0, _helpers.readUInt16LE)(buf, offset));
      if (buf.length < offset + tokenLength) {
        throw new _helpers.NotEnoughDataError(offset + tokenLength);
      }
      const data = buf.slice(offset, offset + tokenLength);
      offset += tokenLength;
      return new _helpers.Result(new _token.SSPIToken(parseChallenge(data), data), offset);
    }
    exports.default = sspiParser;
    module.exports = sspiParser;
  })(sspiTokenParser, sspiTokenParser.exports);
  return sspiTokenParser.exports;
}
var hasRequiredStreamParser;
function requireStreamParser() {
  if (hasRequiredStreamParser) return streamParser.exports;
  hasRequiredStreamParser = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _token = requireToken();
    var _colmetadataTokenParser = _interopRequireDefault(requireColmetadataTokenParser());
    var _doneTokenParser = requireDoneTokenParser();
    var _envChangeTokenParser = _interopRequireDefault(requireEnvChangeTokenParser());
    var _infoerrorTokenParser = requireInfoerrorTokenParser();
    var _fedauthInfoParser = _interopRequireDefault(requireFedauthInfoParser());
    var _featureExtAckParser = _interopRequireDefault(requireFeatureExtAckParser());
    var _loginackTokenParser = _interopRequireDefault(requireLoginackTokenParser());
    var _orderTokenParser = _interopRequireDefault(requireOrderTokenParser());
    var _returnstatusTokenParser = _interopRequireDefault(requireReturnstatusTokenParser());
    var _returnvalueTokenParser = _interopRequireDefault(requireReturnvalueTokenParser());
    var _rowTokenParser = _interopRequireDefault(requireRowTokenParser());
    var _nbcrowTokenParser = _interopRequireDefault(requireNbcrowTokenParser());
    var _sspiTokenParser = _interopRequireDefault(requireSspiTokenParser());
    var _helpers = requireHelpers();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    class Parser {
      debug;
      colMetadata;
      options;
      iterator;
      buffer;
      position;
      static async *parseTokens(iterable, debug2, options, colMetadata = []) {
        const parser = new Parser(iterable, debug2, options);
        parser.colMetadata = colMetadata;
        while (true) {
          try {
            await parser.waitForChunk();
          } catch (err) {
            if (parser.position === parser.buffer.length) {
              return;
            }
            throw err;
          }
          while (parser.buffer.length >= parser.position + 1) {
            const type = parser.buffer.readUInt8(parser.position);
            parser.position += 1;
            const token2 = parser.readToken(type);
            if (token2 !== void 0) {
              yield token2;
            }
          }
        }
      }
      readToken(type) {
        switch (type) {
          case _token.TYPE.DONE: {
            return this.readDoneToken();
          }
          case _token.TYPE.DONEPROC: {
            return this.readDoneProcToken();
          }
          case _token.TYPE.DONEINPROC: {
            return this.readDoneInProcToken();
          }
          case _token.TYPE.ERROR: {
            return this.readErrorToken();
          }
          case _token.TYPE.INFO: {
            return this.readInfoToken();
          }
          case _token.TYPE.ENVCHANGE: {
            return this.readEnvChangeToken();
          }
          case _token.TYPE.LOGINACK: {
            return this.readLoginAckToken();
          }
          case _token.TYPE.RETURNSTATUS: {
            return this.readReturnStatusToken();
          }
          case _token.TYPE.ORDER: {
            return this.readOrderToken();
          }
          case _token.TYPE.FEDAUTHINFO: {
            return this.readFedAuthInfoToken();
          }
          case _token.TYPE.SSPI: {
            return this.readSSPIToken();
          }
          case _token.TYPE.COLMETADATA: {
            return this.readColMetadataToken();
          }
          case _token.TYPE.RETURNVALUE: {
            return this.readReturnValueToken();
          }
          case _token.TYPE.ROW: {
            return this.readRowToken();
          }
          case _token.TYPE.NBCROW: {
            return this.readNbcRowToken();
          }
          case _token.TYPE.FEATUREEXTACK: {
            return this.readFeatureExtAckToken();
          }
          default: {
            throw new Error("Unknown type: " + type);
          }
        }
      }
      readFeatureExtAckToken() {
        let result;
        try {
          result = (0, _featureExtAckParser.default)(this.buffer, this.position, this.options);
        } catch (err) {
          if (err instanceof _helpers.NotEnoughDataError) {
            return this.waitForChunk().then(() => {
              return this.readFeatureExtAckToken();
            });
          }
          throw err;
        }
        this.position = result.offset;
        return result.value;
      }
      async readNbcRowToken() {
        return await (0, _nbcrowTokenParser.default)(this);
      }
      async readReturnValueToken() {
        return await (0, _returnvalueTokenParser.default)(this);
      }
      async readColMetadataToken() {
        const token2 = await (0, _colmetadataTokenParser.default)(this);
        this.colMetadata = token2.columns;
        return token2;
      }
      readSSPIToken() {
        let result;
        try {
          result = (0, _sspiTokenParser.default)(this.buffer, this.position, this.options);
        } catch (err) {
          if (err instanceof _helpers.NotEnoughDataError) {
            return this.waitForChunk().then(() => {
              return this.readSSPIToken();
            });
          }
          throw err;
        }
        this.position = result.offset;
        return result.value;
      }
      readFedAuthInfoToken() {
        let result;
        try {
          result = (0, _fedauthInfoParser.default)(this.buffer, this.position, this.options);
        } catch (err) {
          if (err instanceof _helpers.NotEnoughDataError) {
            return this.waitForChunk().then(() => {
              return this.readFedAuthInfoToken();
            });
          }
          throw err;
        }
        this.position = result.offset;
        return result.value;
      }
      readOrderToken() {
        let result;
        try {
          result = (0, _orderTokenParser.default)(this.buffer, this.position, this.options);
        } catch (err) {
          if (err instanceof _helpers.NotEnoughDataError) {
            return this.waitForChunk().then(() => {
              return this.readOrderToken();
            });
          }
          throw err;
        }
        this.position = result.offset;
        return result.value;
      }
      readReturnStatusToken() {
        let result;
        try {
          result = (0, _returnstatusTokenParser.default)(this.buffer, this.position, this.options);
        } catch (err) {
          if (err instanceof _helpers.NotEnoughDataError) {
            return this.waitForChunk().then(() => {
              return this.readReturnStatusToken();
            });
          }
          throw err;
        }
        this.position = result.offset;
        return result.value;
      }
      readLoginAckToken() {
        let result;
        try {
          result = (0, _loginackTokenParser.default)(this.buffer, this.position, this.options);
        } catch (err) {
          if (err instanceof _helpers.NotEnoughDataError) {
            return this.waitForChunk().then(() => {
              return this.readLoginAckToken();
            });
          }
          throw err;
        }
        this.position = result.offset;
        return result.value;
      }
      readEnvChangeToken() {
        let result;
        try {
          result = (0, _envChangeTokenParser.default)(this.buffer, this.position, this.options);
        } catch (err) {
          if (err instanceof _helpers.NotEnoughDataError) {
            return this.waitForChunk().then(() => {
              return this.readEnvChangeToken();
            });
          }
          throw err;
        }
        this.position = result.offset;
        return result.value;
      }
      readRowToken() {
        return (0, _rowTokenParser.default)(this);
      }
      readInfoToken() {
        let result;
        try {
          result = (0, _infoerrorTokenParser.infoParser)(this.buffer, this.position, this.options);
        } catch (err) {
          if (err instanceof _helpers.NotEnoughDataError) {
            return this.waitForChunk().then(() => {
              return this.readInfoToken();
            });
          }
          throw err;
        }
        this.position = result.offset;
        return result.value;
      }
      readErrorToken() {
        let result;
        try {
          result = (0, _infoerrorTokenParser.errorParser)(this.buffer, this.position, this.options);
        } catch (err) {
          if (err instanceof _helpers.NotEnoughDataError) {
            return this.waitForChunk().then(() => {
              return this.readErrorToken();
            });
          }
          throw err;
        }
        this.position = result.offset;
        return result.value;
      }
      readDoneInProcToken() {
        let result;
        try {
          result = (0, _doneTokenParser.doneInProcParser)(this.buffer, this.position, this.options);
        } catch (err) {
          if (err instanceof _helpers.NotEnoughDataError) {
            return this.waitForChunk().then(() => {
              return this.readDoneInProcToken();
            });
          }
          throw err;
        }
        this.position = result.offset;
        return result.value;
      }
      readDoneProcToken() {
        let result;
        try {
          result = (0, _doneTokenParser.doneProcParser)(this.buffer, this.position, this.options);
        } catch (err) {
          if (err instanceof _helpers.NotEnoughDataError) {
            return this.waitForChunk().then(() => {
              return this.readDoneProcToken();
            });
          }
          throw err;
        }
        this.position = result.offset;
        return result.value;
      }
      readDoneToken() {
        let result;
        try {
          result = (0, _doneTokenParser.doneParser)(this.buffer, this.position, this.options);
        } catch (err) {
          if (err instanceof _helpers.NotEnoughDataError) {
            return this.waitForChunk().then(() => {
              return this.readDoneToken();
            });
          }
          throw err;
        }
        this.position = result.offset;
        return result.value;
      }
      constructor(iterable, debug2, options) {
        this.debug = debug2;
        this.colMetadata = [];
        this.options = options;
        this.iterator = (iterable[Symbol.asyncIterator] || iterable[Symbol.iterator]).call(iterable);
        this.buffer = Buffer.alloc(0);
        this.position = 0;
      }
      async waitForChunk() {
        const result = await this.iterator.next();
        if (result.done) {
          throw new Error("unexpected end of data");
        }
        if (this.position === this.buffer.length) {
          this.buffer = result.value;
        } else {
          this.buffer = Buffer.concat([this.buffer.slice(this.position), result.value]);
        }
        this.position = 0;
      }
    }
    exports.default = Parser;
    module.exports = Parser;
  })(streamParser, streamParser.exports);
  return streamParser.exports;
}
var hasRequiredTokenStreamParser;
function requireTokenStreamParser() {
  if (hasRequiredTokenStreamParser) return tokenStreamParser;
  hasRequiredTokenStreamParser = 1;
  Object.defineProperty(tokenStreamParser, "__esModule", {
    value: true
  });
  tokenStreamParser.Parser = void 0;
  var _events = require$$0$1;
  var _streamParser = _interopRequireDefault(requireStreamParser());
  var _stream = require$$0;
  function _interopRequireDefault(e) {
    return e && e.__esModule ? e : { default: e };
  }
  class Parser extends _events.EventEmitter {
    constructor(message2, debug2, handler2, options) {
      super();
      this.debug = debug2;
      this.options = options;
      this.parser = _stream.Readable.from(_streamParser.default.parseTokens(message2, this.debug, this.options));
      this.parser.on("data", (token2) => {
        debug2.token(token2);
        handler2[token2.handlerName](token2);
      });
      this.parser.on("drain", () => {
        this.emit("drain");
      });
      this.parser.on("end", () => {
        this.emit("end");
      });
    }
    pause() {
      return this.parser.pause();
    }
    resume() {
      return this.parser.resume();
    }
  }
  tokenStreamParser.Parser = Parser;
  return tokenStreamParser;
}
var transaction = {};
var hasRequiredTransaction;
function requireTransaction() {
  if (hasRequiredTransaction) return transaction;
  hasRequiredTransaction = 1;
  Object.defineProperty(transaction, "__esModule", {
    value: true
  });
  transaction.Transaction = transaction.OPERATION_TYPE = transaction.ISOLATION_LEVEL = void 0;
  transaction.assertValidIsolationLevel = assertValidIsolationLevel;
  transaction.isolationLevelByValue = void 0;
  var _writableTrackingBuffer = _interopRequireDefault(requireWritableTrackingBuffer());
  var _allHeaders = requireAllHeaders();
  function _interopRequireDefault(e) {
    return e && e.__esModule ? e : { default: e };
  }
  const OPERATION_TYPE = transaction.OPERATION_TYPE = {
    TM_GET_DTC_ADDRESS: 0,
    TM_PROPAGATE_XACT: 1,
    TM_BEGIN_XACT: 5,
    TM_PROMOTE_XACT: 6,
    TM_COMMIT_XACT: 7,
    TM_ROLLBACK_XACT: 8,
    TM_SAVE_XACT: 9
  };
  const ISOLATION_LEVEL = transaction.ISOLATION_LEVEL = {
    NO_CHANGE: 0,
    READ_UNCOMMITTED: 1,
    READ_COMMITTED: 2,
    REPEATABLE_READ: 3,
    SERIALIZABLE: 4,
    SNAPSHOT: 5
  };
  const isolationLevelByValue = transaction.isolationLevelByValue = {};
  for (const name in ISOLATION_LEVEL) {
    const value = ISOLATION_LEVEL[name];
    isolationLevelByValue[value] = name;
  }
  function assertValidIsolationLevel(isolationLevel, name) {
    if (typeof isolationLevel !== "number") {
      throw new TypeError(`The "${name}" ${name.includes(".") ? "property" : "argument"} must be of type number. Received type ${typeof isolationLevel} (${isolationLevel})`);
    }
    if (!Number.isInteger(isolationLevel)) {
      throw new RangeError(`The value of "${name}" is out of range. It must be an integer. Received: ${isolationLevel}`);
    }
    if (!(isolationLevel >= 0 && isolationLevel <= 5)) {
      throw new RangeError(`The value of "${name}" is out of range. It must be >= 0 && <= 5. Received: ${isolationLevel}`);
    }
  }
  class Transaction {
    constructor(name, isolationLevel = ISOLATION_LEVEL.NO_CHANGE) {
      this.name = name;
      this.isolationLevel = isolationLevel;
      this.outstandingRequestCount = 1;
    }
    beginPayload(txnDescriptor) {
      const buffer = new _writableTrackingBuffer.default(100, "ucs2");
      (0, _allHeaders.writeToTrackingBuffer)(buffer, txnDescriptor, this.outstandingRequestCount);
      buffer.writeUShort(OPERATION_TYPE.TM_BEGIN_XACT);
      buffer.writeUInt8(this.isolationLevel);
      buffer.writeUInt8(this.name.length * 2);
      buffer.writeString(this.name, "ucs2");
      return {
        *[Symbol.iterator]() {
          yield buffer.data;
        },
        toString: () => {
          return "Begin Transaction: name=" + this.name + ", isolationLevel=" + isolationLevelByValue[this.isolationLevel];
        }
      };
    }
    commitPayload(txnDescriptor) {
      const buffer = new _writableTrackingBuffer.default(100, "ascii");
      (0, _allHeaders.writeToTrackingBuffer)(buffer, txnDescriptor, this.outstandingRequestCount);
      buffer.writeUShort(OPERATION_TYPE.TM_COMMIT_XACT);
      buffer.writeUInt8(this.name.length * 2);
      buffer.writeString(this.name, "ucs2");
      buffer.writeUInt8(0);
      return {
        *[Symbol.iterator]() {
          yield buffer.data;
        },
        toString: () => {
          return "Commit Transaction: name=" + this.name;
        }
      };
    }
    rollbackPayload(txnDescriptor) {
      const buffer = new _writableTrackingBuffer.default(100, "ascii");
      (0, _allHeaders.writeToTrackingBuffer)(buffer, txnDescriptor, this.outstandingRequestCount);
      buffer.writeUShort(OPERATION_TYPE.TM_ROLLBACK_XACT);
      buffer.writeUInt8(this.name.length * 2);
      buffer.writeString(this.name, "ucs2");
      buffer.writeUInt8(0);
      return {
        *[Symbol.iterator]() {
          yield buffer.data;
        },
        toString: () => {
          return "Rollback Transaction: name=" + this.name;
        }
      };
    }
    savePayload(txnDescriptor) {
      const buffer = new _writableTrackingBuffer.default(100, "ascii");
      (0, _allHeaders.writeToTrackingBuffer)(buffer, txnDescriptor, this.outstandingRequestCount);
      buffer.writeUShort(OPERATION_TYPE.TM_SAVE_XACT);
      buffer.writeUInt8(this.name.length * 2);
      buffer.writeString(this.name, "ucs2");
      return {
        *[Symbol.iterator]() {
          yield buffer.data;
        },
        toString: () => {
          return "Save Transaction: name=" + this.name;
        }
      };
    }
    isolationLevelToTSQL() {
      switch (this.isolationLevel) {
        case ISOLATION_LEVEL.READ_UNCOMMITTED:
          return "READ UNCOMMITTED";
        case ISOLATION_LEVEL.READ_COMMITTED:
          return "READ COMMITTED";
        case ISOLATION_LEVEL.REPEATABLE_READ:
          return "REPEATABLE READ";
        case ISOLATION_LEVEL.SERIALIZABLE:
          return "SERIALIZABLE";
        case ISOLATION_LEVEL.SNAPSHOT:
          return "SNAPSHOT";
      }
      return "";
    }
  }
  transaction.Transaction = Transaction;
  return transaction;
}
var connector = {};
var hasRequiredConnector;
function requireConnector() {
  if (hasRequiredConnector) return connector;
  hasRequiredConnector = 1;
  Object.defineProperty(connector, "__esModule", {
    value: true
  });
  connector.connectInParallel = connectInParallel;
  connector.connectInSequence = connectInSequence;
  connector.lookupAllAddresses = lookupAllAddresses;
  var _net = _interopRequireDefault(require$$0$3);
  var _nodeUrl = _interopRequireDefault(require$$2);
  function _interopRequireDefault(e) {
    return e && e.__esModule ? e : { default: e };
  }
  async function connectInParallel(options, lookup, signal) {
    signal.throwIfAborted();
    const addresses = await lookupAllAddresses(options.host, lookup, signal);
    return await new Promise((resolve, reject) => {
      const sockets = new Array(addresses.length);
      const errors2 = [];
      function onError(err) {
        errors2.push(err);
        this.removeListener("error", onError);
        this.removeListener("connect", onConnect);
        this.destroy();
        if (errors2.length === addresses.length) {
          signal.removeEventListener("abort", onAbort);
          reject(new AggregateError(errors2, "Could not connect (parallel)"));
        }
      }
      function onConnect() {
        signal.removeEventListener("abort", onAbort);
        for (let j = 0; j < sockets.length; j++) {
          const socket = sockets[j];
          if (this === socket) {
            continue;
          }
          socket.removeListener("error", onError);
          socket.removeListener("connect", onConnect);
          socket.destroy();
        }
        resolve(this);
      }
      const onAbort = () => {
        for (let j = 0; j < sockets.length; j++) {
          const socket = sockets[j];
          socket.removeListener("error", onError);
          socket.removeListener("connect", onConnect);
          socket.destroy();
        }
        reject(signal.reason);
      };
      for (let i = 0, len = addresses.length; i < len; i++) {
        const socket = sockets[i] = _net.default.connect({
          ...options,
          host: addresses[i].address,
          family: addresses[i].family
        });
        socket.on("error", onError);
        socket.on("connect", onConnect);
      }
      signal.addEventListener("abort", onAbort, {
        once: true
      });
    });
  }
  async function connectInSequence(options, lookup, signal) {
    signal.throwIfAborted();
    const errors2 = [];
    const addresses = await lookupAllAddresses(options.host, lookup, signal);
    for (const address of addresses) {
      try {
        return await new Promise((resolve, reject) => {
          const socket = _net.default.connect({
            ...options,
            host: address.address,
            family: address.family
          });
          const onAbort = () => {
            socket.removeListener("error", onError);
            socket.removeListener("connect", onConnect);
            socket.destroy();
            reject(signal.reason);
          };
          const onError = (err) => {
            signal.removeEventListener("abort", onAbort);
            socket.removeListener("error", onError);
            socket.removeListener("connect", onConnect);
            socket.destroy();
            reject(err);
          };
          const onConnect = () => {
            signal.removeEventListener("abort", onAbort);
            socket.removeListener("error", onError);
            socket.removeListener("connect", onConnect);
            resolve(socket);
          };
          signal.addEventListener("abort", onAbort, {
            once: true
          });
          socket.on("error", onError);
          socket.on("connect", onConnect);
        });
      } catch (err) {
        signal.throwIfAborted();
        errors2.push(err);
        continue;
      }
    }
    throw new AggregateError(errors2, "Could not connect (sequence)");
  }
  async function lookupAllAddresses(host, lookup, signal) {
    signal.throwIfAborted();
    if (_net.default.isIPv6(host)) {
      return [{
        address: host,
        family: 6
      }];
    } else if (_net.default.isIPv4(host)) {
      return [{
        address: host,
        family: 4
      }];
    } else {
      return await new Promise((resolve, reject) => {
        const onAbort = () => {
          reject(signal.reason);
        };
        signal.addEventListener("abort", onAbort);
        const domainInASCII = _nodeUrl.default.domainToASCII(host);
        lookup(domainInASCII === "" ? host : domainInASCII, {
          all: true
        }, (err, addresses) => {
          signal.removeEventListener("abort", onAbort);
          err ? reject(err) : resolve(addresses);
        });
      });
    }
  }
  return connector;
}
var library = {};
var hasRequiredLibrary;
function requireLibrary() {
  if (hasRequiredLibrary) return library;
  hasRequiredLibrary = 1;
  Object.defineProperty(library, "__esModule", {
    value: true
  });
  library.name = void 0;
  library.name = "Tedious";
  return library;
}
var ntlm = {};
var hasRequiredNtlm;
function requireNtlm() {
  if (hasRequiredNtlm) return ntlm;
  hasRequiredNtlm = 1;
  Object.defineProperty(ntlm, "__esModule", {
    value: true
  });
  ntlm.createNTLMRequest = createNTLMRequest;
  const NTLMFlags = {
    NTLM_NegotiateUnicode: 1,
    NTLM_NegotiateOEM: 2,
    NTLM_RequestTarget: 4,
    NTLM_NegotiateNTLM: 512,
    NTLM_NegotiateOemDomainSupplied: 4096,
    NTLM_NegotiateOemWorkstationSupplied: 8192,
    NTLM_NegotiateAlwaysSign: 32768,
    NTLM_NegotiateExtendedSecurity: 524288,
    NTLM_NegotiateVersion: 33554432,
    NTLM_Negotiate128: 536870912,
    NTLM_Negotiate56: 2147483648
  };
  function createNTLMRequest(options) {
    const domain = escape(options.domain.toUpperCase());
    const workstation = options.workstation ? escape(options.workstation.toUpperCase()) : "";
    let type1flags = NTLMFlags.NTLM_NegotiateUnicode + NTLMFlags.NTLM_NegotiateOEM + NTLMFlags.NTLM_RequestTarget + NTLMFlags.NTLM_NegotiateNTLM + NTLMFlags.NTLM_NegotiateOemDomainSupplied + NTLMFlags.NTLM_NegotiateOemWorkstationSupplied + NTLMFlags.NTLM_NegotiateAlwaysSign + NTLMFlags.NTLM_NegotiateVersion + NTLMFlags.NTLM_NegotiateExtendedSecurity + NTLMFlags.NTLM_Negotiate128 + NTLMFlags.NTLM_Negotiate56;
    if (workstation === "") {
      type1flags -= NTLMFlags.NTLM_NegotiateOemWorkstationSupplied;
    }
    const fixedData = Buffer.alloc(40);
    const buffers = [fixedData];
    let offset = 0;
    offset += fixedData.write("NTLMSSP", offset, 7, "ascii");
    offset = fixedData.writeUInt8(0, offset);
    offset = fixedData.writeUInt32LE(1, offset);
    offset = fixedData.writeUInt32LE(type1flags, offset);
    offset = fixedData.writeUInt16LE(domain.length, offset);
    offset = fixedData.writeUInt16LE(domain.length, offset);
    offset = fixedData.writeUInt32LE(fixedData.length + workstation.length, offset);
    offset = fixedData.writeUInt16LE(workstation.length, offset);
    offset = fixedData.writeUInt16LE(workstation.length, offset);
    offset = fixedData.writeUInt32LE(fixedData.length, offset);
    offset = fixedData.writeUInt8(5, offset);
    offset = fixedData.writeUInt8(0, offset);
    offset = fixedData.writeUInt16LE(2195, offset);
    offset = fixedData.writeUInt8(0, offset);
    offset = fixedData.writeUInt8(0, offset);
    offset = fixedData.writeUInt8(0, offset);
    fixedData.writeUInt8(15, offset);
    buffers.push(Buffer.from(workstation, "ascii"));
    buffers.push(Buffer.from(domain, "ascii"));
    return Buffer.concat(buffers);
  }
  return ntlm;
}
var bulkLoadPayload = {};
var hasRequiredBulkLoadPayload;
function requireBulkLoadPayload() {
  if (hasRequiredBulkLoadPayload) return bulkLoadPayload;
  hasRequiredBulkLoadPayload = 1;
  Object.defineProperty(bulkLoadPayload, "__esModule", {
    value: true
  });
  bulkLoadPayload.BulkLoadPayload = void 0;
  class BulkLoadPayload {
    constructor(bulkLoad2) {
      this.bulkLoad = bulkLoad2;
      this.iterator = this.bulkLoad.rowToPacketTransform[Symbol.asyncIterator]();
    }
    [Symbol.asyncIterator]() {
      return this.iterator;
    }
    toString(indent = "") {
      return indent + "BulkLoad";
    }
  }
  bulkLoadPayload.BulkLoadPayload = BulkLoadPayload;
  return bulkLoadPayload;
}
var specialStoredProcedure = { exports: {} };
var hasRequiredSpecialStoredProcedure;
function requireSpecialStoredProcedure() {
  if (hasRequiredSpecialStoredProcedure) return specialStoredProcedure.exports;
  hasRequiredSpecialStoredProcedure = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    const procedures = {
      Sp_Cursor: 1,
      Sp_CursorOpen: 2,
      Sp_CursorPrepare: 3,
      Sp_CursorExecute: 4,
      Sp_CursorPrepExec: 5,
      Sp_CursorUnprepare: 6,
      Sp_CursorFetch: 7,
      Sp_CursorOption: 8,
      Sp_CursorClose: 9,
      Sp_ExecuteSql: 10,
      Sp_Prepare: 11,
      Sp_Execute: 12,
      Sp_PrepExec: 13,
      Sp_PrepExecRpc: 14,
      Sp_Unprepare: 15
    };
    exports.default = procedures;
    module.exports = procedures;
  })(specialStoredProcedure, specialStoredProcedure.exports);
  return specialStoredProcedure.exports;
}
const version = "19.2.1";
const require$$33 = {
  version
};
var handler = {};
var hasRequiredHandler;
function requireHandler() {
  if (hasRequiredHandler) return handler;
  hasRequiredHandler = 1;
  Object.defineProperty(handler, "__esModule", {
    value: true
  });
  handler.UnexpectedTokenError = handler.TokenHandler = handler.RequestTokenHandler = handler.Login7TokenHandler = handler.InitialSqlTokenHandler = handler.AttentionTokenHandler = void 0;
  var _request = _interopRequireDefault(requireRequest());
  var _errors = requireErrors();
  function _interopRequireDefault(e) {
    return e && e.__esModule ? e : { default: e };
  }
  class UnexpectedTokenError extends Error {
    constructor(handler2, token2) {
      super("Unexpected token `" + token2.name + "` in `" + handler2.constructor.name + "`");
    }
  }
  handler.UnexpectedTokenError = UnexpectedTokenError;
  class TokenHandler {
    onInfoMessage(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onErrorMessage(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onSSPI(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onDatabaseChange(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onLanguageChange(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onCharsetChange(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onSqlCollationChange(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onRoutingChange(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onPacketSizeChange(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onResetConnection(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onBeginTransaction(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onCommitTransaction(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onRollbackTransaction(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onFedAuthInfo(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onFeatureExtAck(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onLoginAck(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onColMetadata(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onOrder(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onRow(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onReturnStatus(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onReturnValue(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onDoneProc(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onDoneInProc(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onDone(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
    onDatabaseMirroringPartner(token2) {
      throw new UnexpectedTokenError(this, token2);
    }
  }
  handler.TokenHandler = TokenHandler;
  class InitialSqlTokenHandler extends TokenHandler {
    constructor(connection2) {
      super();
      this.connection = connection2;
    }
    onInfoMessage(token2) {
      this.connection.emit("infoMessage", token2);
    }
    onErrorMessage(token2) {
      this.connection.emit("errorMessage", token2);
    }
    onDatabaseChange(token2) {
      this.connection.emit("databaseChange", token2.newValue);
    }
    onLanguageChange(token2) {
      this.connection.emit("languageChange", token2.newValue);
    }
    onCharsetChange(token2) {
      this.connection.emit("charsetChange", token2.newValue);
    }
    onSqlCollationChange(token2) {
      this.connection.databaseCollation = token2.newValue;
    }
    onPacketSizeChange(token2) {
      this.connection.messageIo.packetSize(token2.newValue);
    }
    onBeginTransaction(token2) {
      this.connection.transactionDescriptors.push(token2.newValue);
      this.connection.inTransaction = true;
    }
    onCommitTransaction(token2) {
      this.connection.transactionDescriptors.length = 1;
      this.connection.inTransaction = false;
    }
    onRollbackTransaction(token2) {
      this.connection.transactionDescriptors.length = 1;
      this.connection.inTransaction = false;
      this.connection.emit("rollbackTransaction");
    }
    onColMetadata(token2) {
      this.connection.emit("error", new Error("Received 'columnMetadata' when no sqlRequest is in progress"));
      this.connection.close();
    }
    onOrder(token2) {
      this.connection.emit("error", new Error("Received 'order' when no sqlRequest is in progress"));
      this.connection.close();
    }
    onRow(token2) {
      this.connection.emit("error", new Error("Received 'row' when no sqlRequest is in progress"));
      this.connection.close();
    }
    onReturnStatus(token2) {
    }
    onReturnValue(token2) {
    }
    onDoneProc(token2) {
    }
    onDoneInProc(token2) {
    }
    onDone(token2) {
    }
    onResetConnection(token2) {
      this.connection.emit("resetConnection");
    }
  }
  handler.InitialSqlTokenHandler = InitialSqlTokenHandler;
  class Login7TokenHandler extends TokenHandler {
    constructor(connection2) {
      super();
      this.loginAckReceived = false;
      this.connection = connection2;
    }
    onInfoMessage(token2) {
      this.connection.emit("infoMessage", token2);
    }
    onErrorMessage(token2) {
      this.connection.emit("errorMessage", token2);
      const error = new _errors.ConnectionError(token2.message, "ELOGIN");
      const isLoginErrorTransient = this.connection.transientErrorLookup.isTransientError(token2.number);
      if (isLoginErrorTransient && this.connection.curTransientRetryCount !== this.connection.config.options.maxRetriesOnTransientErrors) {
        error.isTransient = true;
      }
      this.connection.loginError = error;
    }
    onSSPI(token2) {
      if (token2.ntlmpacket) {
        this.connection.ntlmpacket = token2.ntlmpacket;
        this.connection.ntlmpacketBuffer = token2.ntlmpacketBuffer;
      }
    }
    onDatabaseChange(token2) {
      this.connection.emit("databaseChange", token2.newValue);
    }
    onDatabaseMirroringPartner(token2) {
      this.connection.emit("databaseMirroringPartner", token2.newValue);
    }
    onLanguageChange(token2) {
      this.connection.emit("languageChange", token2.newValue);
    }
    onCharsetChange(token2) {
      this.connection.emit("charsetChange", token2.newValue);
    }
    onSqlCollationChange(token2) {
      this.connection.databaseCollation = token2.newValue;
    }
    onFedAuthInfo(token2) {
      this.fedAuthInfoToken = token2;
    }
    onFeatureExtAck(token2) {
      const {
        authentication
      } = this.connection.config;
      if (authentication.type === "azure-active-directory-password" || authentication.type === "azure-active-directory-access-token" || authentication.type === "azure-active-directory-msi-vm" || authentication.type === "azure-active-directory-msi-app-service" || authentication.type === "azure-active-directory-service-principal-secret" || authentication.type === "azure-active-directory-default") {
        if (token2.fedAuth === void 0) {
          this.connection.loginError = new _errors.ConnectionError("Did not receive Active Directory authentication acknowledgement");
        } else if (token2.fedAuth.length !== 0) {
          this.connection.loginError = new _errors.ConnectionError(`Active Directory authentication acknowledgment for ${authentication.type} authentication method includes extra data`);
        }
      } else if (token2.fedAuth === void 0 && token2.utf8Support === void 0) {
        this.connection.loginError = new _errors.ConnectionError("Received acknowledgement for unknown feature");
      } else if (token2.fedAuth) {
        this.connection.loginError = new _errors.ConnectionError("Did not request Active Directory authentication, but received the acknowledgment");
      }
    }
    onLoginAck(token2) {
      if (!token2.tdsVersion) {
        this.connection.loginError = new _errors.ConnectionError("Server responded with unknown TDS version.", "ETDS");
        return;
      }
      if (!token2.interface) {
        this.connection.loginError = new _errors.ConnectionError("Server responded with unsupported interface.", "EINTERFACENOTSUPP");
        return;
      }
      this.connection.config.options.tdsVersion = token2.tdsVersion;
      this.loginAckReceived = true;
    }
    onRoutingChange(token2) {
      const [server, instance] = token2.newValue.server.split("\\");
      this.routingData = {
        server,
        port: token2.newValue.port,
        instance
      };
    }
    onDoneInProc(token2) {
    }
    onDone(token2) {
    }
    onPacketSizeChange(token2) {
      this.connection.messageIo.packetSize(token2.newValue);
    }
  }
  handler.Login7TokenHandler = Login7TokenHandler;
  class RequestTokenHandler extends TokenHandler {
    constructor(connection2, request2) {
      super();
      this.connection = connection2;
      this.request = request2;
      this.errors = [];
    }
    onInfoMessage(token2) {
      this.connection.emit("infoMessage", token2);
    }
    onErrorMessage(token2) {
      this.connection.emit("errorMessage", token2);
      if (!this.request.canceled) {
        const error = new _errors.RequestError(token2.message, "EREQUEST");
        error.number = token2.number;
        error.state = token2.state;
        error.class = token2.class;
        error.serverName = token2.serverName;
        error.procName = token2.procName;
        error.lineNumber = token2.lineNumber;
        this.errors.push(error);
        this.request.error = error;
        if (this.request instanceof _request.default && this.errors.length > 1) {
          this.request.error = new AggregateError(this.errors);
        }
      }
    }
    onDatabaseChange(token2) {
      this.connection.emit("databaseChange", token2.newValue);
    }
    onLanguageChange(token2) {
      this.connection.emit("languageChange", token2.newValue);
    }
    onCharsetChange(token2) {
      this.connection.emit("charsetChange", token2.newValue);
    }
    onSqlCollationChange(token2) {
      this.connection.databaseCollation = token2.newValue;
    }
    onPacketSizeChange(token2) {
      this.connection.messageIo.packetSize(token2.newValue);
    }
    onBeginTransaction(token2) {
      this.connection.transactionDescriptors.push(token2.newValue);
      this.connection.inTransaction = true;
    }
    onCommitTransaction(token2) {
      this.connection.transactionDescriptors.length = 1;
      this.connection.inTransaction = false;
    }
    onRollbackTransaction(token2) {
      this.connection.transactionDescriptors.length = 1;
      this.connection.inTransaction = false;
      this.connection.emit("rollbackTransaction");
    }
    onColMetadata(token2) {
      if (!this.request.canceled) {
        if (this.connection.config.options.useColumnNames) {
          const columns = /* @__PURE__ */ Object.create(null);
          for (let j = 0, len = token2.columns.length; j < len; j++) {
            const col = token2.columns[j];
            if (columns[col.colName] == null) {
              columns[col.colName] = col;
            }
          }
          this.request.emit("columnMetadata", columns);
        } else {
          this.request.emit("columnMetadata", token2.columns);
        }
      }
    }
    onOrder(token2) {
      if (!this.request.canceled) {
        this.request.emit("order", token2.orderColumns);
      }
    }
    onRow(token2) {
      if (!this.request.canceled) {
        if (this.connection.config.options.rowCollectionOnRequestCompletion) {
          this.request.rows.push(token2.columns);
        }
        if (this.connection.config.options.rowCollectionOnDone) {
          this.request.rst.push(token2.columns);
        }
        this.request.emit("row", token2.columns);
      }
    }
    onReturnStatus(token2) {
      if (!this.request.canceled) {
        this.connection.procReturnStatusValue = token2.value;
      }
    }
    onReturnValue(token2) {
      if (!this.request.canceled) {
        this.request.emit("returnValue", token2.paramName, token2.value, token2.metadata);
      }
    }
    onDoneProc(token2) {
      if (!this.request.canceled) {
        if (token2.sqlError && !this.request.error) {
          this.request.error = new _errors.RequestError("An unknown error has occurred.", "UNKNOWN");
        }
        this.request.emit("doneProc", token2.rowCount, token2.more, this.connection.procReturnStatusValue, this.request.rst);
        this.connection.procReturnStatusValue = void 0;
        if (token2.rowCount !== void 0) {
          this.request.rowCount += token2.rowCount;
        }
        if (this.connection.config.options.rowCollectionOnDone) {
          this.request.rst = [];
        }
      }
    }
    onDoneInProc(token2) {
      if (!this.request.canceled) {
        this.request.emit("doneInProc", token2.rowCount, token2.more, this.request.rst);
        if (token2.rowCount !== void 0) {
          this.request.rowCount += token2.rowCount;
        }
        if (this.connection.config.options.rowCollectionOnDone) {
          this.request.rst = [];
        }
      }
    }
    onDone(token2) {
      if (!this.request.canceled) {
        if (token2.sqlError && !this.request.error) {
          this.request.error = new _errors.RequestError("An unknown error has occurred.", "UNKNOWN");
        }
        this.request.emit("done", token2.rowCount, token2.more, this.request.rst);
        if (token2.rowCount !== void 0) {
          this.request.rowCount += token2.rowCount;
        }
        if (this.connection.config.options.rowCollectionOnDone) {
          this.request.rst = [];
        }
      }
    }
    onResetConnection(token2) {
      this.connection.emit("resetConnection");
    }
  }
  handler.RequestTokenHandler = RequestTokenHandler;
  class AttentionTokenHandler extends TokenHandler {
    /**
     * Returns whether an attention acknowledgement was received.
     */
    constructor(connection2, request2) {
      super();
      this.connection = connection2;
      this.request = request2;
      this.attentionReceived = false;
    }
    onDone(token2) {
      if (token2.attention) {
        this.attentionReceived = true;
      }
    }
  }
  handler.AttentionTokenHandler = AttentionTokenHandler;
  return handler;
}
var hasRequiredConnection;
function requireConnection() {
  if (hasRequiredConnection) return connection.exports;
  hasRequiredConnection = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require$$1);
    var _os = _interopRequireDefault(require$$0$6);
    var tls = _interopRequireWildcard(require$$1$1);
    var net = _interopRequireWildcard(require$$0$3);
    var _dns = _interopRequireDefault(require$$0$4);
    var _constants = _interopRequireDefault(require$$5$2);
    var _stream = require$$0;
    var _identity = /* @__PURE__ */ requireCommonjs$1();
    var _coreAuth = /* @__PURE__ */ requireCommonjs();
    var _bulkLoad = _interopRequireDefault(requireBulkLoad());
    var _debug = _interopRequireDefault(requireDebug());
    var _events = require$$0$1;
    var _instanceLookup = requireInstanceLookup();
    var _transientErrorLookup = requireTransientErrorLookup();
    var _packet = requirePacket();
    var _preloginPayload = _interopRequireDefault(requirePreloginPayload());
    var _login7Payload = _interopRequireDefault(requireLogin7Payload());
    var _ntlmPayload = _interopRequireDefault(requireNtlmPayload());
    var _request = _interopRequireDefault(requireRequest());
    var _rpcrequestPayload = _interopRequireDefault(requireRpcrequestPayload());
    var _sqlbatchPayload = _interopRequireDefault(requireSqlbatchPayload());
    var _messageIo = _interopRequireDefault(requireMessageIo());
    var _tokenStreamParser = requireTokenStreamParser();
    var _transaction = requireTransaction();
    var _errors = requireErrors();
    var _connector = requireConnector();
    var _library = requireLibrary();
    var _tdsVersions = requireTdsVersions();
    var _message = _interopRequireDefault(requireMessage());
    var _ntlm = requireNtlm();
    var _dataType = requireDataType();
    var _bulkLoadPayload = requireBulkLoadPayload();
    var _specialStoredProcedure = _interopRequireDefault(requireSpecialStoredProcedure());
    var _package = require$$33;
    var _url = require$$5$1;
    var _handler = requireHandler();
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, default: e2 };
        if (null === e2 || "object" != typeof e2 && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (const t3 in e2) "default" !== t3 && {}.hasOwnProperty.call(e2, t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, t3)) && (i.get || i.set) ? o(f, t3, i) : f[t3] = e2[t3]);
        return f;
      })(e, t);
    }
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    const KEEP_ALIVE_INITIAL_DELAY = 30 * 1e3;
    const DEFAULT_CONNECT_TIMEOUT = 15 * 1e3;
    const DEFAULT_CLIENT_REQUEST_TIMEOUT = 15 * 1e3;
    const DEFAULT_CANCEL_TIMEOUT = 5 * 1e3;
    const DEFAULT_CONNECT_RETRY_INTERVAL = 500;
    const DEFAULT_PACKET_SIZE = 4 * 1024;
    const DEFAULT_TEXTSIZE = 2147483647;
    const DEFAULT_DATEFIRST = 7;
    const DEFAULT_PORT = 1433;
    const DEFAULT_TDS_VERSION = "7_4";
    const DEFAULT_LANGUAGE = "us_english";
    const DEFAULT_DATEFORMAT = "mdy";
    function withResolvers() {
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
    }
    class Connection extends _events.EventEmitter {
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * Note: be aware of the different options field:
       * 1. config.authentication.options
       * 2. config.options
       *
       * ```js
       * const { Connection } = require('tedious');
       *
       * const config = {
       *  "authentication": {
       *    ...,
       *    "options": {...}
       *  },
       *  "options": {...}
       * };
       *
       * const connection = new Connection(config);
       * ```
       *
       * @param config
       */
      constructor(config) {
        super();
        if (typeof config !== "object" || config === null) {
          throw new TypeError('The "config" argument is required and must be of type Object.');
        }
        if (typeof config.server !== "string") {
          throw new TypeError('The "config.server" property is required and must be of type string.');
        }
        this.fedAuthRequired = false;
        let authentication;
        if (config.authentication !== void 0) {
          if (typeof config.authentication !== "object" || config.authentication === null) {
            throw new TypeError('The "config.authentication" property must be of type Object.');
          }
          const type = config.authentication.type;
          const options = config.authentication.options === void 0 ? {} : config.authentication.options;
          if (typeof type !== "string") {
            throw new TypeError('The "config.authentication.type" property must be of type string.');
          }
          if (type !== "default" && type !== "ntlm" && type !== "token-credential" && type !== "azure-active-directory-password" && type !== "azure-active-directory-access-token" && type !== "azure-active-directory-msi-vm" && type !== "azure-active-directory-msi-app-service" && type !== "azure-active-directory-service-principal-secret" && type !== "azure-active-directory-default") {
            throw new TypeError('The "type" property must one of "default", "ntlm", "token-credential", "azure-active-directory-password", "azure-active-directory-access-token", "azure-active-directory-default", "azure-active-directory-msi-vm" or "azure-active-directory-msi-app-service" or "azure-active-directory-service-principal-secret".');
          }
          if (typeof options !== "object" || options === null) {
            throw new TypeError('The "config.authentication.options" property must be of type object.');
          }
          if (type === "ntlm") {
            if (typeof options.domain !== "string") {
              throw new TypeError('The "config.authentication.options.domain" property must be of type string.');
            }
            if (options.userName !== void 0 && typeof options.userName !== "string") {
              throw new TypeError('The "config.authentication.options.userName" property must be of type string.');
            }
            if (options.password !== void 0 && typeof options.password !== "string") {
              throw new TypeError('The "config.authentication.options.password" property must be of type string.');
            }
            authentication = {
              type: "ntlm",
              options: {
                userName: options.userName,
                password: options.password,
                domain: options.domain && options.domain.toUpperCase()
              }
            };
          } else if (type === "token-credential") {
            if (!(0, _coreAuth.isTokenCredential)(options.credential)) {
              throw new TypeError('The "config.authentication.options.credential" property must be an instance of the token credential class.');
            }
            authentication = {
              type: "token-credential",
              options: {
                credential: options.credential
              }
            };
          } else if (type === "azure-active-directory-password") {
            if (typeof options.clientId !== "string") {
              throw new TypeError('The "config.authentication.options.clientId" property must be of type string.');
            }
            if (options.userName !== void 0 && typeof options.userName !== "string") {
              throw new TypeError('The "config.authentication.options.userName" property must be of type string.');
            }
            if (options.password !== void 0 && typeof options.password !== "string") {
              throw new TypeError('The "config.authentication.options.password" property must be of type string.');
            }
            if (options.tenantId !== void 0 && typeof options.tenantId !== "string") {
              throw new TypeError('The "config.authentication.options.tenantId" property must be of type string.');
            }
            authentication = {
              type: "azure-active-directory-password",
              options: {
                userName: options.userName,
                password: options.password,
                tenantId: options.tenantId,
                clientId: options.clientId
              }
            };
          } else if (type === "azure-active-directory-access-token") {
            if (typeof options.token !== "string") {
              throw new TypeError('The "config.authentication.options.token" property must be of type string.');
            }
            authentication = {
              type: "azure-active-directory-access-token",
              options: {
                token: options.token
              }
            };
          } else if (type === "azure-active-directory-msi-vm") {
            if (options.clientId !== void 0 && typeof options.clientId !== "string") {
              throw new TypeError('The "config.authentication.options.clientId" property must be of type string.');
            }
            authentication = {
              type: "azure-active-directory-msi-vm",
              options: {
                clientId: options.clientId
              }
            };
          } else if (type === "azure-active-directory-default") {
            if (options.clientId !== void 0 && typeof options.clientId !== "string") {
              throw new TypeError('The "config.authentication.options.clientId" property must be of type string.');
            }
            authentication = {
              type: "azure-active-directory-default",
              options: {
                clientId: options.clientId
              }
            };
          } else if (type === "azure-active-directory-msi-app-service") {
            if (options.clientId !== void 0 && typeof options.clientId !== "string") {
              throw new TypeError('The "config.authentication.options.clientId" property must be of type string.');
            }
            authentication = {
              type: "azure-active-directory-msi-app-service",
              options: {
                clientId: options.clientId
              }
            };
          } else if (type === "azure-active-directory-service-principal-secret") {
            if (typeof options.clientId !== "string") {
              throw new TypeError('The "config.authentication.options.clientId" property must be of type string.');
            }
            if (typeof options.clientSecret !== "string") {
              throw new TypeError('The "config.authentication.options.clientSecret" property must be of type string.');
            }
            if (typeof options.tenantId !== "string") {
              throw new TypeError('The "config.authentication.options.tenantId" property must be of type string.');
            }
            authentication = {
              type: "azure-active-directory-service-principal-secret",
              options: {
                clientId: options.clientId,
                clientSecret: options.clientSecret,
                tenantId: options.tenantId
              }
            };
          } else {
            if (options.userName !== void 0 && typeof options.userName !== "string") {
              throw new TypeError('The "config.authentication.options.userName" property must be of type string.');
            }
            if (options.password !== void 0 && typeof options.password !== "string") {
              throw new TypeError('The "config.authentication.options.password" property must be of type string.');
            }
            authentication = {
              type: "default",
              options: {
                userName: options.userName,
                password: options.password
              }
            };
          }
        } else {
          authentication = {
            type: "default",
            options: {
              userName: void 0,
              password: void 0
            }
          };
        }
        this.config = {
          server: config.server,
          authentication,
          options: {
            abortTransactionOnError: false,
            appName: void 0,
            camelCaseColumns: false,
            cancelTimeout: DEFAULT_CANCEL_TIMEOUT,
            columnEncryptionKeyCacheTTL: 2 * 60 * 60 * 1e3,
            // Units: milliseconds
            columnEncryptionSetting: false,
            columnNameReplacer: void 0,
            connectionRetryInterval: DEFAULT_CONNECT_RETRY_INTERVAL,
            connectTimeout: DEFAULT_CONNECT_TIMEOUT,
            connector: void 0,
            connectionIsolationLevel: _transaction.ISOLATION_LEVEL.READ_COMMITTED,
            cryptoCredentialsDetails: {},
            database: void 0,
            datefirst: DEFAULT_DATEFIRST,
            dateFormat: DEFAULT_DATEFORMAT,
            debug: {
              data: false,
              packet: false,
              payload: false,
              token: false
            },
            enableAnsiNull: true,
            enableAnsiNullDefault: true,
            enableAnsiPadding: true,
            enableAnsiWarnings: true,
            enableArithAbort: true,
            enableConcatNullYieldsNull: true,
            enableCursorCloseOnCommit: null,
            enableImplicitTransactions: false,
            enableNumericRoundabort: false,
            enableQuotedIdentifier: true,
            encrypt: true,
            fallbackToDefaultDb: false,
            encryptionKeyStoreProviders: void 0,
            instanceName: void 0,
            isolationLevel: _transaction.ISOLATION_LEVEL.READ_COMMITTED,
            language: DEFAULT_LANGUAGE,
            localAddress: void 0,
            maxRetriesOnTransientErrors: 3,
            multiSubnetFailover: false,
            packetSize: DEFAULT_PACKET_SIZE,
            port: DEFAULT_PORT,
            readOnlyIntent: false,
            requestTimeout: DEFAULT_CLIENT_REQUEST_TIMEOUT,
            rowCollectionOnDone: false,
            rowCollectionOnRequestCompletion: false,
            serverName: void 0,
            serverSupportsColumnEncryption: false,
            tdsVersion: DEFAULT_TDS_VERSION,
            textsize: DEFAULT_TEXTSIZE,
            trustedServerNameAE: void 0,
            trustServerCertificate: false,
            useColumnNames: false,
            useUTC: true,
            workstationId: void 0,
            lowerCaseGuids: false
          }
        };
        if (config.options) {
          if (config.options.port && config.options.instanceName) {
            throw new Error("Port and instanceName are mutually exclusive, but " + config.options.port + " and " + config.options.instanceName + " provided");
          }
          if (config.options.abortTransactionOnError !== void 0) {
            if (typeof config.options.abortTransactionOnError !== "boolean" && config.options.abortTransactionOnError !== null) {
              throw new TypeError('The "config.options.abortTransactionOnError" property must be of type string or null.');
            }
            this.config.options.abortTransactionOnError = config.options.abortTransactionOnError;
          }
          if (config.options.appName !== void 0) {
            if (typeof config.options.appName !== "string") {
              throw new TypeError('The "config.options.appName" property must be of type string.');
            }
            this.config.options.appName = config.options.appName;
          }
          if (config.options.camelCaseColumns !== void 0) {
            if (typeof config.options.camelCaseColumns !== "boolean") {
              throw new TypeError('The "config.options.camelCaseColumns" property must be of type boolean.');
            }
            this.config.options.camelCaseColumns = config.options.camelCaseColumns;
          }
          if (config.options.cancelTimeout !== void 0) {
            if (typeof config.options.cancelTimeout !== "number") {
              throw new TypeError('The "config.options.cancelTimeout" property must be of type number.');
            }
            this.config.options.cancelTimeout = config.options.cancelTimeout;
          }
          if (config.options.columnNameReplacer) {
            if (typeof config.options.columnNameReplacer !== "function") {
              throw new TypeError('The "config.options.cancelTimeout" property must be of type function.');
            }
            this.config.options.columnNameReplacer = config.options.columnNameReplacer;
          }
          if (config.options.connectionIsolationLevel !== void 0) {
            (0, _transaction.assertValidIsolationLevel)(config.options.connectionIsolationLevel, "config.options.connectionIsolationLevel");
            this.config.options.connectionIsolationLevel = config.options.connectionIsolationLevel;
          }
          if (config.options.connectTimeout !== void 0) {
            if (typeof config.options.connectTimeout !== "number") {
              throw new TypeError('The "config.options.connectTimeout" property must be of type number.');
            }
            this.config.options.connectTimeout = config.options.connectTimeout;
          }
          if (config.options.connector !== void 0) {
            if (typeof config.options.connector !== "function") {
              throw new TypeError('The "config.options.connector" property must be a function.');
            }
            this.config.options.connector = config.options.connector;
          }
          if (config.options.cryptoCredentialsDetails !== void 0) {
            if (typeof config.options.cryptoCredentialsDetails !== "object" || config.options.cryptoCredentialsDetails === null) {
              throw new TypeError('The "config.options.cryptoCredentialsDetails" property must be of type Object.');
            }
            this.config.options.cryptoCredentialsDetails = config.options.cryptoCredentialsDetails;
          }
          if (config.options.database !== void 0) {
            if (typeof config.options.database !== "string") {
              throw new TypeError('The "config.options.database" property must be of type string.');
            }
            this.config.options.database = config.options.database;
          }
          if (config.options.datefirst !== void 0) {
            if (typeof config.options.datefirst !== "number" && config.options.datefirst !== null) {
              throw new TypeError('The "config.options.datefirst" property must be of type number.');
            }
            if (config.options.datefirst !== null && (config.options.datefirst < 1 || config.options.datefirst > 7)) {
              throw new RangeError('The "config.options.datefirst" property must be >= 1 and <= 7');
            }
            this.config.options.datefirst = config.options.datefirst;
          }
          if (config.options.dateFormat !== void 0) {
            if (typeof config.options.dateFormat !== "string" && config.options.dateFormat !== null) {
              throw new TypeError('The "config.options.dateFormat" property must be of type string or null.');
            }
            this.config.options.dateFormat = config.options.dateFormat;
          }
          if (config.options.debug) {
            if (config.options.debug.data !== void 0) {
              if (typeof config.options.debug.data !== "boolean") {
                throw new TypeError('The "config.options.debug.data" property must be of type boolean.');
              }
              this.config.options.debug.data = config.options.debug.data;
            }
            if (config.options.debug.packet !== void 0) {
              if (typeof config.options.debug.packet !== "boolean") {
                throw new TypeError('The "config.options.debug.packet" property must be of type boolean.');
              }
              this.config.options.debug.packet = config.options.debug.packet;
            }
            if (config.options.debug.payload !== void 0) {
              if (typeof config.options.debug.payload !== "boolean") {
                throw new TypeError('The "config.options.debug.payload" property must be of type boolean.');
              }
              this.config.options.debug.payload = config.options.debug.payload;
            }
            if (config.options.debug.token !== void 0) {
              if (typeof config.options.debug.token !== "boolean") {
                throw new TypeError('The "config.options.debug.token" property must be of type boolean.');
              }
              this.config.options.debug.token = config.options.debug.token;
            }
          }
          if (config.options.enableAnsiNull !== void 0) {
            if (typeof config.options.enableAnsiNull !== "boolean" && config.options.enableAnsiNull !== null) {
              throw new TypeError('The "config.options.enableAnsiNull" property must be of type boolean or null.');
            }
            this.config.options.enableAnsiNull = config.options.enableAnsiNull;
          }
          if (config.options.enableAnsiNullDefault !== void 0) {
            if (typeof config.options.enableAnsiNullDefault !== "boolean" && config.options.enableAnsiNullDefault !== null) {
              throw new TypeError('The "config.options.enableAnsiNullDefault" property must be of type boolean or null.');
            }
            this.config.options.enableAnsiNullDefault = config.options.enableAnsiNullDefault;
          }
          if (config.options.enableAnsiPadding !== void 0) {
            if (typeof config.options.enableAnsiPadding !== "boolean" && config.options.enableAnsiPadding !== null) {
              throw new TypeError('The "config.options.enableAnsiPadding" property must be of type boolean or null.');
            }
            this.config.options.enableAnsiPadding = config.options.enableAnsiPadding;
          }
          if (config.options.enableAnsiWarnings !== void 0) {
            if (typeof config.options.enableAnsiWarnings !== "boolean" && config.options.enableAnsiWarnings !== null) {
              throw new TypeError('The "config.options.enableAnsiWarnings" property must be of type boolean or null.');
            }
            this.config.options.enableAnsiWarnings = config.options.enableAnsiWarnings;
          }
          if (config.options.enableArithAbort !== void 0) {
            if (typeof config.options.enableArithAbort !== "boolean" && config.options.enableArithAbort !== null) {
              throw new TypeError('The "config.options.enableArithAbort" property must be of type boolean or null.');
            }
            this.config.options.enableArithAbort = config.options.enableArithAbort;
          }
          if (config.options.enableConcatNullYieldsNull !== void 0) {
            if (typeof config.options.enableConcatNullYieldsNull !== "boolean" && config.options.enableConcatNullYieldsNull !== null) {
              throw new TypeError('The "config.options.enableConcatNullYieldsNull" property must be of type boolean or null.');
            }
            this.config.options.enableConcatNullYieldsNull = config.options.enableConcatNullYieldsNull;
          }
          if (config.options.enableCursorCloseOnCommit !== void 0) {
            if (typeof config.options.enableCursorCloseOnCommit !== "boolean" && config.options.enableCursorCloseOnCommit !== null) {
              throw new TypeError('The "config.options.enableCursorCloseOnCommit" property must be of type boolean or null.');
            }
            this.config.options.enableCursorCloseOnCommit = config.options.enableCursorCloseOnCommit;
          }
          if (config.options.enableImplicitTransactions !== void 0) {
            if (typeof config.options.enableImplicitTransactions !== "boolean" && config.options.enableImplicitTransactions !== null) {
              throw new TypeError('The "config.options.enableImplicitTransactions" property must be of type boolean or null.');
            }
            this.config.options.enableImplicitTransactions = config.options.enableImplicitTransactions;
          }
          if (config.options.enableNumericRoundabort !== void 0) {
            if (typeof config.options.enableNumericRoundabort !== "boolean" && config.options.enableNumericRoundabort !== null) {
              throw new TypeError('The "config.options.enableNumericRoundabort" property must be of type boolean or null.');
            }
            this.config.options.enableNumericRoundabort = config.options.enableNumericRoundabort;
          }
          if (config.options.enableQuotedIdentifier !== void 0) {
            if (typeof config.options.enableQuotedIdentifier !== "boolean" && config.options.enableQuotedIdentifier !== null) {
              throw new TypeError('The "config.options.enableQuotedIdentifier" property must be of type boolean or null.');
            }
            this.config.options.enableQuotedIdentifier = config.options.enableQuotedIdentifier;
          }
          if (config.options.encrypt !== void 0) {
            if (typeof config.options.encrypt !== "boolean") {
              if (config.options.encrypt !== "strict") {
                throw new TypeError('The "encrypt" property must be set to "strict", or of type boolean.');
              }
            }
            this.config.options.encrypt = config.options.encrypt;
          }
          if (config.options.fallbackToDefaultDb !== void 0) {
            if (typeof config.options.fallbackToDefaultDb !== "boolean") {
              throw new TypeError('The "config.options.fallbackToDefaultDb" property must be of type boolean.');
            }
            this.config.options.fallbackToDefaultDb = config.options.fallbackToDefaultDb;
          }
          if (config.options.instanceName !== void 0) {
            if (typeof config.options.instanceName !== "string") {
              throw new TypeError('The "config.options.instanceName" property must be of type string.');
            }
            this.config.options.instanceName = config.options.instanceName;
            this.config.options.port = void 0;
          }
          if (config.options.isolationLevel !== void 0) {
            (0, _transaction.assertValidIsolationLevel)(config.options.isolationLevel, "config.options.isolationLevel");
            this.config.options.isolationLevel = config.options.isolationLevel;
          }
          if (config.options.language !== void 0) {
            if (typeof config.options.language !== "string" && config.options.language !== null) {
              throw new TypeError('The "config.options.language" property must be of type string or null.');
            }
            this.config.options.language = config.options.language;
          }
          if (config.options.localAddress !== void 0) {
            if (typeof config.options.localAddress !== "string") {
              throw new TypeError('The "config.options.localAddress" property must be of type string.');
            }
            this.config.options.localAddress = config.options.localAddress;
          }
          if (config.options.multiSubnetFailover !== void 0) {
            if (typeof config.options.multiSubnetFailover !== "boolean") {
              throw new TypeError('The "config.options.multiSubnetFailover" property must be of type boolean.');
            }
            this.config.options.multiSubnetFailover = config.options.multiSubnetFailover;
          }
          if (config.options.packetSize !== void 0) {
            if (typeof config.options.packetSize !== "number") {
              throw new TypeError('The "config.options.packetSize" property must be of type number.');
            }
            this.config.options.packetSize = config.options.packetSize;
          }
          if (config.options.port !== void 0) {
            if (typeof config.options.port !== "number") {
              throw new TypeError('The "config.options.port" property must be of type number.');
            }
            if (config.options.port <= 0 || config.options.port >= 65536) {
              throw new RangeError('The "config.options.port" property must be > 0 and < 65536');
            }
            this.config.options.port = config.options.port;
            this.config.options.instanceName = void 0;
          }
          if (config.options.readOnlyIntent !== void 0) {
            if (typeof config.options.readOnlyIntent !== "boolean") {
              throw new TypeError('The "config.options.readOnlyIntent" property must be of type boolean.');
            }
            this.config.options.readOnlyIntent = config.options.readOnlyIntent;
          }
          if (config.options.requestTimeout !== void 0) {
            if (typeof config.options.requestTimeout !== "number") {
              throw new TypeError('The "config.options.requestTimeout" property must be of type number.');
            }
            this.config.options.requestTimeout = config.options.requestTimeout;
          }
          if (config.options.maxRetriesOnTransientErrors !== void 0) {
            if (typeof config.options.maxRetriesOnTransientErrors !== "number") {
              throw new TypeError('The "config.options.maxRetriesOnTransientErrors" property must be of type number.');
            }
            if (config.options.maxRetriesOnTransientErrors < 0) {
              throw new TypeError('The "config.options.maxRetriesOnTransientErrors" property must be equal or greater than 0.');
            }
            this.config.options.maxRetriesOnTransientErrors = config.options.maxRetriesOnTransientErrors;
          }
          if (config.options.connectionRetryInterval !== void 0) {
            if (typeof config.options.connectionRetryInterval !== "number") {
              throw new TypeError('The "config.options.connectionRetryInterval" property must be of type number.');
            }
            if (config.options.connectionRetryInterval <= 0) {
              throw new TypeError('The "config.options.connectionRetryInterval" property must be greater than 0.');
            }
            this.config.options.connectionRetryInterval = config.options.connectionRetryInterval;
          }
          if (config.options.rowCollectionOnDone !== void 0) {
            if (typeof config.options.rowCollectionOnDone !== "boolean") {
              throw new TypeError('The "config.options.rowCollectionOnDone" property must be of type boolean.');
            }
            this.config.options.rowCollectionOnDone = config.options.rowCollectionOnDone;
          }
          if (config.options.rowCollectionOnRequestCompletion !== void 0) {
            if (typeof config.options.rowCollectionOnRequestCompletion !== "boolean") {
              throw new TypeError('The "config.options.rowCollectionOnRequestCompletion" property must be of type boolean.');
            }
            this.config.options.rowCollectionOnRequestCompletion = config.options.rowCollectionOnRequestCompletion;
          }
          if (config.options.tdsVersion !== void 0) {
            if (typeof config.options.tdsVersion !== "string") {
              throw new TypeError('The "config.options.tdsVersion" property must be of type string.');
            }
            this.config.options.tdsVersion = config.options.tdsVersion;
          }
          if (config.options.textsize !== void 0) {
            if (typeof config.options.textsize !== "number" && config.options.textsize !== null) {
              throw new TypeError('The "config.options.textsize" property must be of type number or null.');
            }
            if (config.options.textsize > 2147483647) {
              throw new TypeError(`The "config.options.textsize" can't be greater than 2147483647.`);
            } else if (config.options.textsize < -1) {
              throw new TypeError(`The "config.options.textsize" can't be smaller than -1.`);
            }
            this.config.options.textsize = config.options.textsize | 0;
          }
          if (config.options.trustServerCertificate !== void 0) {
            if (typeof config.options.trustServerCertificate !== "boolean") {
              throw new TypeError('The "config.options.trustServerCertificate" property must be of type boolean.');
            }
            this.config.options.trustServerCertificate = config.options.trustServerCertificate;
          }
          if (config.options.serverName !== void 0) {
            if (typeof config.options.serverName !== "string") {
              throw new TypeError('The "config.options.serverName" property must be of type string.');
            }
            this.config.options.serverName = config.options.serverName;
          }
          if (config.options.useColumnNames !== void 0) {
            if (typeof config.options.useColumnNames !== "boolean") {
              throw new TypeError('The "config.options.useColumnNames" property must be of type boolean.');
            }
            this.config.options.useColumnNames = config.options.useColumnNames;
          }
          if (config.options.useUTC !== void 0) {
            if (typeof config.options.useUTC !== "boolean") {
              throw new TypeError('The "config.options.useUTC" property must be of type boolean.');
            }
            this.config.options.useUTC = config.options.useUTC;
          }
          if (config.options.workstationId !== void 0) {
            if (typeof config.options.workstationId !== "string") {
              throw new TypeError('The "config.options.workstationId" property must be of type string.');
            }
            this.config.options.workstationId = config.options.workstationId;
          }
          if (config.options.lowerCaseGuids !== void 0) {
            if (typeof config.options.lowerCaseGuids !== "boolean") {
              throw new TypeError('The "config.options.lowerCaseGuids" property must be of type boolean.');
            }
            this.config.options.lowerCaseGuids = config.options.lowerCaseGuids;
          }
        }
        this.secureContextOptions = this.config.options.cryptoCredentialsDetails;
        if (this.secureContextOptions.secureOptions === void 0) {
          this.secureContextOptions = Object.create(this.secureContextOptions, {
            secureOptions: {
              value: _constants.default.SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS
            }
          });
        }
        this.debug = this.createDebug();
        this.inTransaction = false;
        this.transactionDescriptors = [Buffer.from([0, 0, 0, 0, 0, 0, 0, 0])];
        this.transactionDepth = 0;
        this.isSqlBatch = false;
        this.closed = false;
        this.messageBuffer = Buffer.alloc(0);
        this.curTransientRetryCount = 0;
        this.transientErrorLookup = new _transientErrorLookup.TransientErrorLookup();
        this.state = this.STATE.INITIALIZED;
        this._cancelAfterRequestSent = () => {
          this.messageIo.sendMessage(_packet.TYPE.ATTENTION);
          this.createCancelTimer();
        };
        this._onSocketClose = () => {
          this.socketClose();
        };
        this._onSocketEnd = () => {
          this.socketEnd();
        };
        this._onSocketError = (error) => {
          this.dispatchEvent("socketError", error);
          process.nextTick(() => {
            this.emit("error", this.wrapSocketError(error));
          });
        };
      }
      connect(connectListener) {
        if (this.state !== this.STATE.INITIALIZED) {
          throw new _errors.ConnectionError("`.connect` can not be called on a Connection in `" + this.state.name + "` state.");
        }
        if (connectListener) {
          const onConnect = (err) => {
            this.removeListener("error", onError);
            connectListener(err);
          };
          const onError = (err) => {
            this.removeListener("connect", onConnect);
            connectListener(err);
          };
          this.once("connect", onConnect);
          this.once("error", onError);
        }
        this.transitionTo(this.STATE.CONNECTING);
        this.initialiseConnection().then(() => {
          process.nextTick(() => {
            this.emit("connect");
          });
        }, (err) => {
          this.transitionTo(this.STATE.FINAL);
          this.closed = true;
          process.nextTick(() => {
            this.emit("connect", err);
          });
          process.nextTick(() => {
            this.emit("end");
          });
        });
      }
      /**
       * The server has reported that the charset has changed.
       */
      /**
       * The attempt to connect and validate has completed.
       */
      /**
       * The server has reported that the active database has changed.
       * This may be as a result of a successful login, or a `use` statement.
       */
      /**
       * A debug message is available. It may be logged or ignored.
       */
      /**
       * Internal error occurs.
       */
      /**
       * The server has issued an error message.
       */
      /**
       * The connection has ended.
       *
       * This may be as a result of the client calling [[close]], the server
       * closing the connection, or a network error.
       */
      /**
       * The server has issued an information message.
       */
      /**
       * The server has reported that the language has changed.
       */
      /**
       * The connection was reset.
       */
      /**
       * A secure connection has been established.
       */
      on(event, listener) {
        return super.on(event, listener);
      }
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      /**
       * @private
       */
      emit(event, ...args) {
        return super.emit(event, ...args);
      }
      /**
       * Closes the connection to the database.
       *
       * The [[Event_end]] will be emitted once the connection has been closed.
       */
      close() {
        this.transitionTo(this.STATE.FINAL);
        this.cleanupConnection();
      }
      /**
       * @private
       */
      async initialiseConnection() {
        const timeoutController = new AbortController();
        const connectTimer = setTimeout(() => {
          const hostPostfix = this.config.options.port ? `:${this.config.options.port}` : `\\${this.config.options.instanceName}`;
          const server = this.routingData ? this.routingData.server : this.config.server;
          const port = this.routingData ? `:${this.routingData.port}` : hostPostfix;
          const routingMessage = this.routingData ? ` (redirected from ${this.config.server}${hostPostfix})` : "";
          const message2 = `Failed to connect to ${server}${port}${routingMessage} in ${this.config.options.connectTimeout}ms`;
          this.debug.log(message2);
          timeoutController.abort(new _errors.ConnectionError(message2, "ETIMEOUT"));
        }, this.config.options.connectTimeout);
        try {
          let signal = timeoutController.signal;
          let port = this.config.options.port;
          if (!port) {
            try {
              port = await (0, _instanceLookup.instanceLookup)({
                server: this.config.server,
                instanceName: this.config.options.instanceName,
                timeout: this.config.options.connectTimeout,
                signal
              });
            } catch (err) {
              signal.throwIfAborted();
              throw new _errors.ConnectionError(err.message, "EINSTLOOKUP", {
                cause: err
              });
            }
          }
          let socket;
          try {
            socket = await this.connectOnPort(port, this.config.options.multiSubnetFailover, signal, this.config.options.connector);
          } catch (err) {
            signal.throwIfAborted();
            throw this.wrapSocketError(err);
          }
          try {
            const controller = new AbortController();
            const onError = (err) => {
              controller.abort(this.wrapSocketError(err));
            };
            const onClose = () => {
              this.debug.log("connection to " + this.config.server + ":" + this.config.options.port + " closed");
            };
            const onEnd = () => {
              this.debug.log("socket ended");
              const error = new Error("socket hang up");
              error.code = "ECONNRESET";
              controller.abort(this.wrapSocketError(error));
            };
            socket.once("error", onError);
            socket.once("close", onClose);
            socket.once("end", onEnd);
            try {
              signal = AbortSignal.any([signal, controller.signal]);
              socket.setKeepAlive(true, KEEP_ALIVE_INITIAL_DELAY);
              this.messageIo = new _messageIo.default(socket, this.config.options.packetSize, this.debug);
              this.messageIo.on("secure", (cleartext) => {
                this.emit("secure", cleartext);
              });
              this.socket = socket;
              this.closed = false;
              this.debug.log("connected to " + this.config.server + ":" + this.config.options.port);
              this.sendPreLogin();
              this.transitionTo(this.STATE.SENT_PRELOGIN);
              const preloginResponse = await this.readPreloginResponse(signal);
              await this.performTlsNegotiation(preloginResponse, signal);
              this.sendLogin7Packet();
              try {
                const {
                  authentication
                } = this.config;
                switch (authentication.type) {
                  case "token-credential":
                  case "azure-active-directory-password":
                  case "azure-active-directory-msi-vm":
                  case "azure-active-directory-msi-app-service":
                  case "azure-active-directory-service-principal-secret":
                  case "azure-active-directory-default":
                    this.transitionTo(this.STATE.SENT_LOGIN7_WITH_FEDAUTH);
                    this.routingData = await this.performSentLogin7WithFedAuth(signal);
                    break;
                  case "ntlm":
                    this.transitionTo(this.STATE.SENT_LOGIN7_WITH_NTLM);
                    this.routingData = await this.performSentLogin7WithNTLMLogin(signal);
                    break;
                  default:
                    this.transitionTo(this.STATE.SENT_LOGIN7_WITH_STANDARD_LOGIN);
                    this.routingData = await this.performSentLogin7WithStandardLogin(signal);
                    break;
                }
              } catch (err) {
                if (isTransientError(err)) {
                  this.debug.log("Initiating retry on transient error");
                  this.transitionTo(this.STATE.TRANSIENT_FAILURE_RETRY);
                  return await this.performTransientFailureRetry();
                }
                throw err;
              }
              if (this.routingData) {
                this.transitionTo(this.STATE.REROUTING);
                return await this.performReRouting();
              }
              this.transitionTo(this.STATE.LOGGED_IN_SENDING_INITIAL_SQL);
              await this.performLoggedInSendingInitialSql(signal);
            } finally {
              socket.removeListener("error", onError);
              socket.removeListener("close", onClose);
              socket.removeListener("end", onEnd);
            }
          } catch (err) {
            socket.destroy();
            throw err;
          }
          socket.on("error", this._onSocketError);
          socket.on("close", this._onSocketClose);
          socket.on("end", this._onSocketEnd);
          this.transitionTo(this.STATE.LOGGED_IN);
        } finally {
          clearTimeout(connectTimer);
        }
      }
      /**
       * @private
       */
      cleanupConnection() {
        if (!this.closed) {
          this.clearRequestTimer();
          this.closeConnection();
          process.nextTick(() => {
            this.emit("end");
          });
          const request2 = this.request;
          if (request2) {
            const err = new _errors.RequestError("Connection closed before request completed.", "ECLOSE");
            request2.callback(err);
            this.request = void 0;
          }
          this.closed = true;
        }
      }
      /**
       * @private
       */
      createDebug() {
        const debug2 = new _debug.default(this.config.options.debug);
        debug2.on("debug", (message2) => {
          this.emit("debug", message2);
        });
        return debug2;
      }
      /**
       * @private
       */
      createTokenStreamParser(message2, handler2) {
        return new _tokenStreamParser.Parser(message2, this.debug, handler2, this.config.options);
      }
      async wrapWithTls(socket, signal) {
        signal.throwIfAborted();
        const secureContext = tls.createSecureContext(this.secureContextOptions);
        const serverName = !net.isIP(this.config.server) ? this.config.server : "";
        const encryptOptions = {
          host: this.config.server,
          socket,
          ALPNProtocols: ["tds/8.0"],
          secureContext,
          servername: this.config.options.serverName ? this.config.options.serverName : serverName
        };
        const {
          promise,
          resolve,
          reject
        } = withResolvers();
        const encryptsocket = tls.connect(encryptOptions);
        try {
          const onAbort = () => {
            reject(signal.reason);
          };
          signal.addEventListener("abort", onAbort, {
            once: true
          });
          try {
            const onError = reject;
            const onConnect = () => {
              resolve(encryptsocket);
            };
            encryptsocket.once("error", onError);
            encryptsocket.once("secureConnect", onConnect);
            try {
              return await promise;
            } finally {
              encryptsocket.removeListener("error", onError);
              encryptsocket.removeListener("connect", onConnect);
            }
          } finally {
            signal.removeEventListener("abort", onAbort);
          }
        } catch (err) {
          encryptsocket.destroy();
          throw err;
        }
      }
      async connectOnPort(port, multiSubnetFailover, signal, customConnector) {
        const connectOpts = {
          host: this.routingData ? this.routingData.server : this.config.server,
          port: this.routingData ? this.routingData.port : port,
          localAddress: this.config.options.localAddress
        };
        const connect = customConnector || (multiSubnetFailover ? _connector.connectInParallel : _connector.connectInSequence);
        let socket = await connect(connectOpts, _dns.default.lookup, signal);
        if (this.config.options.encrypt === "strict") {
          try {
            socket = await this.wrapWithTls(socket, signal);
          } catch (err) {
            socket.end();
            throw err;
          }
        }
        return socket;
      }
      /**
       * @private
       */
      closeConnection() {
        if (this.socket) {
          this.socket.destroy();
        }
      }
      /**
       * @private
       */
      createCancelTimer() {
        this.clearCancelTimer();
        const timeout = this.config.options.cancelTimeout;
        if (timeout > 0) {
          this.cancelTimer = setTimeout(() => {
            this.cancelTimeout();
          }, timeout);
        }
      }
      /**
       * @private
       */
      createRequestTimer() {
        this.clearRequestTimer();
        const request2 = this.request;
        const timeout = request2.timeout !== void 0 ? request2.timeout : this.config.options.requestTimeout;
        if (timeout) {
          this.requestTimer = setTimeout(() => {
            this.requestTimeout();
          }, timeout);
        }
      }
      /**
       * @private
       */
      cancelTimeout() {
        const message2 = `Failed to cancel request in ${this.config.options.cancelTimeout}ms`;
        this.debug.log(message2);
        this.dispatchEvent("socketError", new _errors.ConnectionError(message2, "ETIMEOUT"));
      }
      /**
       * @private
       */
      requestTimeout() {
        this.requestTimer = void 0;
        const request2 = this.request;
        request2.cancel();
        const timeout = request2.timeout !== void 0 ? request2.timeout : this.config.options.requestTimeout;
        const message2 = "Timeout: Request failed to complete in " + timeout + "ms";
        request2.error = new _errors.RequestError(message2, "ETIMEOUT");
      }
      /**
       * @private
       */
      clearCancelTimer() {
        if (this.cancelTimer) {
          clearTimeout(this.cancelTimer);
          this.cancelTimer = void 0;
        }
      }
      /**
       * @private
       */
      clearRequestTimer() {
        if (this.requestTimer) {
          clearTimeout(this.requestTimer);
          this.requestTimer = void 0;
        }
      }
      /**
       * @private
       */
      transitionTo(newState) {
        if (this.state === newState) {
          this.debug.log("State is already " + newState.name);
          return;
        }
        if (this.state && this.state.exit) {
          this.state.exit.call(this, newState);
        }
        this.debug.log("State change: " + (this.state ? this.state.name : "undefined") + " -> " + newState.name);
        this.state = newState;
        if (this.state.enter) {
          this.state.enter.apply(this);
        }
      }
      /**
       * @private
       */
      getEventHandler(eventName) {
        const handler2 = this.state.events[eventName];
        if (!handler2) {
          throw new Error(`No event '${eventName}' in state '${this.state.name}'`);
        }
        return handler2;
      }
      /**
       * @private
       */
      dispatchEvent(eventName, ...args) {
        const handler2 = this.state.events[eventName];
        if (handler2) {
          handler2.apply(this, args);
        } else {
          this.emit("error", new Error(`No event '${eventName}' in state '${this.state.name}'`));
          this.close();
        }
      }
      /**
       * @private
       */
      wrapSocketError(error) {
        if (this.state === this.STATE.CONNECTING || this.state === this.STATE.SENT_TLSSSLNEGOTIATION) {
          const hostPostfix = this.config.options.port ? `:${this.config.options.port}` : `\\${this.config.options.instanceName}`;
          const server = this.routingData ? this.routingData.server : this.config.server;
          const port = this.routingData ? `:${this.routingData.port}` : hostPostfix;
          const routingMessage = this.routingData ? ` (redirected from ${this.config.server}${hostPostfix})` : "";
          const message2 = `Failed to connect to ${server}${port}${routingMessage} - ${error.message}`;
          return new _errors.ConnectionError(message2, "ESOCKET", {
            cause: error
          });
        } else {
          const message2 = `Connection lost - ${error.message}`;
          return new _errors.ConnectionError(message2, "ESOCKET", {
            cause: error
          });
        }
      }
      /**
       * @private
       */
      socketEnd() {
        this.debug.log("socket ended");
        if (this.state !== this.STATE.FINAL) {
          const error = new Error("socket hang up");
          error.code = "ECONNRESET";
          this.dispatchEvent("socketError", error);
          process.nextTick(() => {
            this.emit("error", this.wrapSocketError(error));
          });
        }
      }
      /**
       * @private
       */
      socketClose() {
        this.debug.log("connection to " + this.config.server + ":" + this.config.options.port + " closed");
        this.transitionTo(this.STATE.FINAL);
        this.cleanupConnection();
      }
      /**
       * @private
       */
      sendPreLogin() {
        const [, major, minor, build] = /^(\d+)\.(\d+)\.(\d+)/.exec(_package.version) ?? ["0.0.0", "0", "0", "0"];
        const payload = new _preloginPayload.default({
          // If encrypt setting is set to 'strict', then we should have already done the encryption before calling
          // this function. Therefore, the encrypt will be set to false here.
          // Otherwise, we will set encrypt here based on the encrypt Boolean value from the configuration.
          encrypt: typeof this.config.options.encrypt === "boolean" && this.config.options.encrypt,
          version: {
            major: Number(major),
            minor: Number(minor),
            build: Number(build),
            subbuild: 0
          }
        });
        this.messageIo.sendMessage(_packet.TYPE.PRELOGIN, payload.data);
        this.debug.payload(function() {
          return payload.toString("  ");
        });
      }
      /**
       * @private
       */
      sendLogin7Packet() {
        const payload = new _login7Payload.default({
          tdsVersion: _tdsVersions.versions[this.config.options.tdsVersion],
          packetSize: this.config.options.packetSize,
          clientProgVer: 0,
          clientPid: process.pid,
          connectionId: 0,
          clientTimeZone: (/* @__PURE__ */ new Date()).getTimezoneOffset(),
          clientLcid: 1033
        });
        const {
          authentication
        } = this.config;
        switch (authentication.type) {
          case "azure-active-directory-password":
            payload.fedAuth = {
              type: "ADAL",
              echo: this.fedAuthRequired,
              workflow: "default"
            };
            break;
          case "azure-active-directory-access-token":
            payload.fedAuth = {
              type: "SECURITYTOKEN",
              echo: this.fedAuthRequired,
              fedAuthToken: authentication.options.token
            };
            break;
          case "token-credential":
          case "azure-active-directory-msi-vm":
          case "azure-active-directory-default":
          case "azure-active-directory-msi-app-service":
          case "azure-active-directory-service-principal-secret":
            payload.fedAuth = {
              type: "ADAL",
              echo: this.fedAuthRequired,
              workflow: "integrated"
            };
            break;
          case "ntlm":
            payload.sspi = (0, _ntlm.createNTLMRequest)({
              domain: authentication.options.domain
            });
            break;
          default:
            payload.userName = authentication.options.userName;
            payload.password = authentication.options.password;
        }
        payload.hostname = this.config.options.workstationId || _os.default.hostname();
        payload.serverName = this.routingData ? `${this.routingData.server}${this.routingData.instance ? "\\" + this.routingData.instance : ""}` : this.config.server;
        payload.appName = this.config.options.appName || "Tedious";
        payload.libraryName = _library.name;
        payload.language = this.config.options.language;
        payload.database = this.config.options.database;
        payload.clientId = Buffer.from([1, 2, 3, 4, 5, 6]);
        payload.readOnlyIntent = this.config.options.readOnlyIntent;
        payload.initDbFatal = !this.config.options.fallbackToDefaultDb;
        this.routingData = void 0;
        this.messageIo.sendMessage(_packet.TYPE.LOGIN7, payload.toBuffer());
        this.debug.payload(function() {
          return payload.toString("  ");
        });
      }
      /**
       * @private
       */
      sendFedAuthTokenMessage(token2) {
        const accessTokenLen = Buffer.byteLength(token2, "ucs2");
        const data = Buffer.alloc(8 + accessTokenLen);
        let offset = 0;
        offset = data.writeUInt32LE(accessTokenLen + 4, offset);
        offset = data.writeUInt32LE(accessTokenLen, offset);
        data.write(token2, offset, "ucs2");
        this.messageIo.sendMessage(_packet.TYPE.FEDAUTH_TOKEN, data);
      }
      /**
       * @private
       */
      sendInitialSql() {
        const payload = new _sqlbatchPayload.default(this.getInitialSql(), this.currentTransactionDescriptor(), this.config.options);
        const message2 = new _message.default({
          type: _packet.TYPE.SQL_BATCH
        });
        this.messageIo.outgoingMessageStream.write(message2);
        _stream.Readable.from(payload).pipe(message2);
      }
      /**
       * @private
       */
      getInitialSql() {
        const options = [];
        if (this.config.options.enableAnsiNull === true) {
          options.push("set ansi_nulls on");
        } else if (this.config.options.enableAnsiNull === false) {
          options.push("set ansi_nulls off");
        }
        if (this.config.options.enableAnsiNullDefault === true) {
          options.push("set ansi_null_dflt_on on");
        } else if (this.config.options.enableAnsiNullDefault === false) {
          options.push("set ansi_null_dflt_on off");
        }
        if (this.config.options.enableAnsiPadding === true) {
          options.push("set ansi_padding on");
        } else if (this.config.options.enableAnsiPadding === false) {
          options.push("set ansi_padding off");
        }
        if (this.config.options.enableAnsiWarnings === true) {
          options.push("set ansi_warnings on");
        } else if (this.config.options.enableAnsiWarnings === false) {
          options.push("set ansi_warnings off");
        }
        if (this.config.options.enableArithAbort === true) {
          options.push("set arithabort on");
        } else if (this.config.options.enableArithAbort === false) {
          options.push("set arithabort off");
        }
        if (this.config.options.enableConcatNullYieldsNull === true) {
          options.push("set concat_null_yields_null on");
        } else if (this.config.options.enableConcatNullYieldsNull === false) {
          options.push("set concat_null_yields_null off");
        }
        if (this.config.options.enableCursorCloseOnCommit === true) {
          options.push("set cursor_close_on_commit on");
        } else if (this.config.options.enableCursorCloseOnCommit === false) {
          options.push("set cursor_close_on_commit off");
        }
        if (this.config.options.datefirst !== null) {
          options.push(`set datefirst ${this.config.options.datefirst}`);
        }
        if (this.config.options.dateFormat !== null) {
          options.push(`set dateformat ${this.config.options.dateFormat}`);
        }
        if (this.config.options.enableImplicitTransactions === true) {
          options.push("set implicit_transactions on");
        } else if (this.config.options.enableImplicitTransactions === false) {
          options.push("set implicit_transactions off");
        }
        if (this.config.options.language !== null) {
          options.push(`set language ${this.config.options.language}`);
        }
        if (this.config.options.enableNumericRoundabort === true) {
          options.push("set numeric_roundabort on");
        } else if (this.config.options.enableNumericRoundabort === false) {
          options.push("set numeric_roundabort off");
        }
        if (this.config.options.enableQuotedIdentifier === true) {
          options.push("set quoted_identifier on");
        } else if (this.config.options.enableQuotedIdentifier === false) {
          options.push("set quoted_identifier off");
        }
        if (this.config.options.textsize !== null) {
          options.push(`set textsize ${this.config.options.textsize}`);
        }
        if (this.config.options.connectionIsolationLevel !== null) {
          options.push(`set transaction isolation level ${this.getIsolationLevelText(this.config.options.connectionIsolationLevel)}`);
        }
        if (this.config.options.abortTransactionOnError === true) {
          options.push("set xact_abort on");
        } else if (this.config.options.abortTransactionOnError === false) {
          options.push("set xact_abort off");
        }
        return options.join("\n");
      }
      /**
       * Execute the SQL batch represented by [[Request]].
       * There is no param support, and unlike [[Request.execSql]],
       * it is not likely that SQL Server will reuse the execution plan it generates for the SQL.
       *
       * In almost all cases, [[Request.execSql]] will be a better choice.
       *
       * @param request A [[Request]] object representing the request.
       */
      execSqlBatch(request2) {
        this.makeRequest(request2, _packet.TYPE.SQL_BATCH, new _sqlbatchPayload.default(request2.sqlTextOrProcedure, this.currentTransactionDescriptor(), this.config.options));
      }
      /**
       *  Execute the SQL represented by [[Request]].
       *
       * As `sp_executesql` is used to execute the SQL, if the same SQL is executed multiples times
       * using this function, the SQL Server query optimizer is likely to reuse the execution plan it generates
       * for the first execution. This may also result in SQL server treating the request like a stored procedure
       * which can result in the [[Event_doneInProc]] or [[Event_doneProc]] events being emitted instead of the
       * [[Event_done]] event you might expect. Using [[execSqlBatch]] will prevent this from occurring but may have a negative performance impact.
       *
       * Beware of the way that scoping rules apply, and how they may [affect local temp tables](http://weblogs.sqlteam.com/mladenp/archive/2006/11/03/17197.aspx)
       * If you're running in to scoping issues, then [[execSqlBatch]] may be a better choice.
       * See also [issue #24](https://github.com/pekim/tedious/issues/24)
       *
       * @param request A [[Request]] object representing the request.
       */
      execSql(request2) {
        try {
          request2.validateParameters(this.databaseCollation);
        } catch (error) {
          request2.error = error;
          process.nextTick(() => {
            this.debug.log(error.message);
            request2.callback(error);
          });
          return;
        }
        const parameters = [];
        parameters.push({
          type: _dataType.TYPES.NVarChar,
          name: "statement",
          value: request2.sqlTextOrProcedure,
          output: false,
          length: void 0,
          precision: void 0,
          scale: void 0
        });
        if (request2.parameters.length) {
          parameters.push({
            type: _dataType.TYPES.NVarChar,
            name: "params",
            value: request2.makeParamsParameter(request2.parameters),
            output: false,
            length: void 0,
            precision: void 0,
            scale: void 0
          });
          parameters.push(...request2.parameters);
        }
        this.makeRequest(request2, _packet.TYPE.RPC_REQUEST, new _rpcrequestPayload.default(_specialStoredProcedure.default.Sp_ExecuteSql, parameters, this.currentTransactionDescriptor(), this.config.options, this.databaseCollation));
      }
      /**
       * Creates a new BulkLoad instance.
       *
       * @param table The name of the table to bulk-insert into.
       * @param options A set of bulk load options.
       */
      newBulkLoad(table, callbackOrOptions, callback) {
        let options;
        if (callback === void 0) {
          callback = callbackOrOptions;
          options = {};
        } else {
          options = callbackOrOptions;
        }
        if (typeof options !== "object") {
          throw new TypeError('"options" argument must be an object');
        }
        return new _bulkLoad.default(table, this.databaseCollation, this.config.options, options, callback);
      }
      /**
       * Execute a [[BulkLoad]].
       *
       * ```js
       * // We want to perform a bulk load into a table with the following format:
       * // CREATE TABLE employees (first_name nvarchar(255), last_name nvarchar(255), day_of_birth date);
       *
       * const bulkLoad = connection.newBulkLoad('employees', (err, rowCount) => {
       *   // ...
       * });
       *
       * // First, we need to specify the columns that we want to write to,
       * // and their definitions. These definitions must match the actual table,
       * // otherwise the bulk load will fail.
       * bulkLoad.addColumn('first_name', TYPES.NVarchar, { nullable: false });
       * bulkLoad.addColumn('last_name', TYPES.NVarchar, { nullable: false });
       * bulkLoad.addColumn('date_of_birth', TYPES.Date, { nullable: false });
       *
       * // Execute a bulk load with a predefined list of rows.
       * //
       * // Note that these rows are held in memory until the
       * // bulk load was performed, so if you need to write a large
       * // number of rows (e.g. by reading from a CSV file),
       * // passing an `AsyncIterable` is advisable to keep memory usage low.
       * connection.execBulkLoad(bulkLoad, [
       *   { 'first_name': 'Steve', 'last_name': 'Jobs', 'day_of_birth': new Date('02-24-1955') },
       *   { 'first_name': 'Bill', 'last_name': 'Gates', 'day_of_birth': new Date('10-28-1955') }
       * ]);
       * ```
       *
       * @param bulkLoad A previously created [[BulkLoad]].
       * @param rows A [[Iterable]] or [[AsyncIterable]] that contains the rows that should be bulk loaded.
       */
      execBulkLoad(bulkLoad2, rows) {
        bulkLoad2.executionStarted = true;
        if (rows) {
          if (bulkLoad2.streamingMode) {
            throw new Error("Connection.execBulkLoad can't be called with a BulkLoad that was put in streaming mode.");
          }
          if (bulkLoad2.firstRowWritten) {
            throw new Error("Connection.execBulkLoad can't be called with a BulkLoad that already has rows written to it.");
          }
          const rowStream = _stream.Readable.from(rows);
          rowStream.on("error", (err) => {
            bulkLoad2.rowToPacketTransform.destroy(err);
          });
          bulkLoad2.rowToPacketTransform.on("error", (err) => {
            rowStream.destroy(err);
          });
          rowStream.pipe(bulkLoad2.rowToPacketTransform);
        } else if (!bulkLoad2.streamingMode) {
          bulkLoad2.rowToPacketTransform.end();
        }
        const onCancel = () => {
          request2.cancel();
        };
        const payload = new _bulkLoadPayload.BulkLoadPayload(bulkLoad2);
        const request2 = new _request.default(bulkLoad2.getBulkInsertSql(), (error) => {
          bulkLoad2.removeListener("cancel", onCancel);
          if (error) {
            if (error.code === "UNKNOWN") {
              error.message += " This is likely because the schema of the BulkLoad does not match the schema of the table you are attempting to insert into.";
            }
            bulkLoad2.error = error;
            bulkLoad2.callback(error);
            return;
          }
          this.makeRequest(bulkLoad2, _packet.TYPE.BULK_LOAD, payload);
        });
        bulkLoad2.once("cancel", onCancel);
        this.execSqlBatch(request2);
      }
      /**
       * Prepare the SQL represented by the request.
       *
       * The request can then be used in subsequent calls to
       * [[execute]] and [[unprepare]]
       *
       * @param request A [[Request]] object representing the request.
       *   Parameters only require a name and type. Parameter values are ignored.
       */
      prepare(request2) {
        const parameters = [];
        parameters.push({
          type: _dataType.TYPES.Int,
          name: "handle",
          value: void 0,
          output: true,
          length: void 0,
          precision: void 0,
          scale: void 0
        });
        parameters.push({
          type: _dataType.TYPES.NVarChar,
          name: "params",
          value: request2.parameters.length ? request2.makeParamsParameter(request2.parameters) : null,
          output: false,
          length: void 0,
          precision: void 0,
          scale: void 0
        });
        parameters.push({
          type: _dataType.TYPES.NVarChar,
          name: "stmt",
          value: request2.sqlTextOrProcedure,
          output: false,
          length: void 0,
          precision: void 0,
          scale: void 0
        });
        request2.preparing = true;
        request2.on("returnValue", (name, value) => {
          if (name === "handle") {
            request2.handle = value;
          } else {
            request2.error = new _errors.RequestError(`Tedious > Unexpected output parameter ${name} from sp_prepare`);
          }
        });
        this.makeRequest(request2, _packet.TYPE.RPC_REQUEST, new _rpcrequestPayload.default(_specialStoredProcedure.default.Sp_Prepare, parameters, this.currentTransactionDescriptor(), this.config.options, this.databaseCollation));
      }
      /**
       * Release the SQL Server resources associated with a previously prepared request.
       *
       * @param request A [[Request]] object representing the request.
       *   Parameters only require a name and type.
       *   Parameter values are ignored.
       */
      unprepare(request2) {
        const parameters = [];
        parameters.push({
          type: _dataType.TYPES.Int,
          name: "handle",
          // TODO: Abort if `request.handle` is not set
          value: request2.handle,
          output: false,
          length: void 0,
          precision: void 0,
          scale: void 0
        });
        this.makeRequest(request2, _packet.TYPE.RPC_REQUEST, new _rpcrequestPayload.default(_specialStoredProcedure.default.Sp_Unprepare, parameters, this.currentTransactionDescriptor(), this.config.options, this.databaseCollation));
      }
      /**
       * Execute previously prepared SQL, using the supplied parameters.
       *
       * @param request A previously prepared [[Request]].
       * @param parameters  An object whose names correspond to the names of
       *   parameters that were added to the [[Request]] before it was prepared.
       *   The object's values are passed as the parameters' values when the
       *   request is executed.
       */
      execute(request2, parameters) {
        const executeParameters = [];
        executeParameters.push({
          type: _dataType.TYPES.Int,
          name: "",
          // TODO: Abort if `request.handle` is not set
          value: request2.handle,
          output: false,
          length: void 0,
          precision: void 0,
          scale: void 0
        });
        try {
          for (let i = 0, len = request2.parameters.length; i < len; i++) {
            const parameter = request2.parameters[i];
            executeParameters.push({
              ...parameter,
              value: parameter.type.validate(parameters ? parameters[parameter.name] : null, this.databaseCollation)
            });
          }
        } catch (error) {
          request2.error = error;
          process.nextTick(() => {
            this.debug.log(error.message);
            request2.callback(error);
          });
          return;
        }
        this.makeRequest(request2, _packet.TYPE.RPC_REQUEST, new _rpcrequestPayload.default(_specialStoredProcedure.default.Sp_Execute, executeParameters, this.currentTransactionDescriptor(), this.config.options, this.databaseCollation));
      }
      /**
       * Call a stored procedure represented by [[Request]].
       *
       * @param request A [[Request]] object representing the request.
       */
      callProcedure(request2) {
        try {
          request2.validateParameters(this.databaseCollation);
        } catch (error) {
          request2.error = error;
          process.nextTick(() => {
            this.debug.log(error.message);
            request2.callback(error);
          });
          return;
        }
        this.makeRequest(request2, _packet.TYPE.RPC_REQUEST, new _rpcrequestPayload.default(request2.sqlTextOrProcedure, request2.parameters, this.currentTransactionDescriptor(), this.config.options, this.databaseCollation));
      }
      /**
       * Start a transaction.
       *
       * @param callback
       * @param name A string representing a name to associate with the transaction.
       *   Optional, and defaults to an empty string. Required when `isolationLevel`
       *   is present.
       * @param isolationLevel The isolation level that the transaction is to be run with.
       *
       *   The isolation levels are available from `require('tedious').ISOLATION_LEVEL`.
       *   * `READ_UNCOMMITTED`
       *   * `READ_COMMITTED`
       *   * `REPEATABLE_READ`
       *   * `SERIALIZABLE`
       *   * `SNAPSHOT`
       *
       *   Optional, and defaults to the Connection's isolation level.
       */
      beginTransaction(callback, name = "", isolationLevel = this.config.options.isolationLevel) {
        (0, _transaction.assertValidIsolationLevel)(isolationLevel, "isolationLevel");
        const transaction2 = new _transaction.Transaction(name, isolationLevel);
        if (this.config.options.tdsVersion < "7_2") {
          return this.execSqlBatch(new _request.default("SET TRANSACTION ISOLATION LEVEL " + transaction2.isolationLevelToTSQL() + ";BEGIN TRAN " + transaction2.name, (err) => {
            this.transactionDepth++;
            if (this.transactionDepth === 1) {
              this.inTransaction = true;
            }
            callback(err);
          }));
        }
        const request2 = new _request.default(void 0, (err) => {
          return callback(err, this.currentTransactionDescriptor());
        });
        return this.makeRequest(request2, _packet.TYPE.TRANSACTION_MANAGER, transaction2.beginPayload(this.currentTransactionDescriptor()));
      }
      /**
       * Commit a transaction.
       *
       * There should be an active transaction - that is, [[beginTransaction]]
       * should have been previously called.
       *
       * @param callback
       * @param name A string representing a name to associate with the transaction.
       *   Optional, and defaults to an empty string. Required when `isolationLevel`is present.
       */
      commitTransaction(callback, name = "") {
        const transaction2 = new _transaction.Transaction(name);
        if (this.config.options.tdsVersion < "7_2") {
          return this.execSqlBatch(new _request.default("COMMIT TRAN " + transaction2.name, (err) => {
            this.transactionDepth--;
            if (this.transactionDepth === 0) {
              this.inTransaction = false;
            }
            callback(err);
          }));
        }
        const request2 = new _request.default(void 0, callback);
        return this.makeRequest(request2, _packet.TYPE.TRANSACTION_MANAGER, transaction2.commitPayload(this.currentTransactionDescriptor()));
      }
      /**
       * Rollback a transaction.
       *
       * There should be an active transaction - that is, [[beginTransaction]]
       * should have been previously called.
       *
       * @param callback
       * @param name A string representing a name to associate with the transaction.
       *   Optional, and defaults to an empty string.
       *   Required when `isolationLevel` is present.
       */
      rollbackTransaction(callback, name = "") {
        const transaction2 = new _transaction.Transaction(name);
        if (this.config.options.tdsVersion < "7_2") {
          return this.execSqlBatch(new _request.default("ROLLBACK TRAN " + transaction2.name, (err) => {
            this.transactionDepth--;
            if (this.transactionDepth === 0) {
              this.inTransaction = false;
            }
            callback(err);
          }));
        }
        const request2 = new _request.default(void 0, callback);
        return this.makeRequest(request2, _packet.TYPE.TRANSACTION_MANAGER, transaction2.rollbackPayload(this.currentTransactionDescriptor()));
      }
      /**
       * Set a savepoint within a transaction.
       *
       * There should be an active transaction - that is, [[beginTransaction]]
       * should have been previously called.
       *
       * @param callback
       * @param name A string representing a name to associate with the transaction.\
       *   Optional, and defaults to an empty string.
       *   Required when `isolationLevel` is present.
       */
      saveTransaction(callback, name) {
        const transaction2 = new _transaction.Transaction(name);
        if (this.config.options.tdsVersion < "7_2") {
          return this.execSqlBatch(new _request.default("SAVE TRAN " + transaction2.name, (err) => {
            this.transactionDepth++;
            callback(err);
          }));
        }
        const request2 = new _request.default(void 0, callback);
        return this.makeRequest(request2, _packet.TYPE.TRANSACTION_MANAGER, transaction2.savePayload(this.currentTransactionDescriptor()));
      }
      /**
       * Run the given callback after starting a transaction, and commit or
       * rollback the transaction afterwards.
       *
       * This is a helper that employs [[beginTransaction]], [[commitTransaction]],
       * [[rollbackTransaction]], and [[saveTransaction]] to greatly simplify the
       * use of database transactions and automatically handle transaction nesting.
       *
       * @param cb
       * @param isolationLevel
       *   The isolation level that the transaction is to be run with.
       *
       *   The isolation levels are available from `require('tedious').ISOLATION_LEVEL`.
       *   * `READ_UNCOMMITTED`
       *   * `READ_COMMITTED`
       *   * `REPEATABLE_READ`
       *   * `SERIALIZABLE`
       *   * `SNAPSHOT`
       *
       *   Optional, and defaults to the Connection's isolation level.
       */
      transaction(cb, isolationLevel) {
        if (typeof cb !== "function") {
          throw new TypeError("`cb` must be a function");
        }
        const useSavepoint = this.inTransaction;
        const name = "_tedious_" + _crypto.default.randomBytes(10).toString("hex");
        const txDone = (err, done, ...args) => {
          if (err) {
            if (this.inTransaction && this.state === this.STATE.LOGGED_IN) {
              this.rollbackTransaction((txErr) => {
                done(txErr || err, ...args);
              }, name);
            } else {
              done(err, ...args);
            }
          } else if (useSavepoint) {
            if (this.config.options.tdsVersion < "7_2") {
              this.transactionDepth--;
            }
            done(null, ...args);
          } else {
            this.commitTransaction((txErr) => {
              done(txErr, ...args);
            }, name);
          }
        };
        if (useSavepoint) {
          return this.saveTransaction((err) => {
            if (err) {
              return cb(err);
            }
            if (isolationLevel) {
              return this.execSqlBatch(new _request.default("SET transaction isolation level " + this.getIsolationLevelText(isolationLevel), (err2) => {
                return cb(err2, txDone);
              }));
            } else {
              return cb(null, txDone);
            }
          }, name);
        } else {
          return this.beginTransaction((err) => {
            if (err) {
              return cb(err);
            }
            return cb(null, txDone);
          }, name, isolationLevel);
        }
      }
      /**
       * @private
       */
      makeRequest(request2, packetType, payload) {
        if (this.state !== this.STATE.LOGGED_IN) {
          const message2 = "Requests can only be made in the " + this.STATE.LOGGED_IN.name + " state, not the " + this.state.name + " state";
          this.debug.log(message2);
          request2.callback(new _errors.RequestError(message2, "EINVALIDSTATE"));
        } else if (request2.canceled) {
          process.nextTick(() => {
            request2.callback(new _errors.RequestError("Canceled.", "ECANCEL"));
          });
        } else {
          if (packetType === _packet.TYPE.SQL_BATCH) {
            this.isSqlBatch = true;
          } else {
            this.isSqlBatch = false;
          }
          this.request = request2;
          request2.connection = this;
          request2.rowCount = 0;
          request2.rows = [];
          request2.rst = [];
          const onCancel = () => {
            payloadStream.unpipe(message2);
            payloadStream.destroy(new _errors.RequestError("Canceled.", "ECANCEL"));
            message2.ignore = true;
            message2.end();
            if (request2 instanceof _request.default && request2.paused) {
              request2.resume();
            }
          };
          request2.once("cancel", onCancel);
          this.createRequestTimer();
          const message2 = new _message.default({
            type: packetType,
            resetConnection: this.resetConnectionOnNextRequest
          });
          this.messageIo.outgoingMessageStream.write(message2);
          this.transitionTo(this.STATE.SENT_CLIENT_REQUEST);
          message2.once("finish", () => {
            request2.removeListener("cancel", onCancel);
            request2.once("cancel", this._cancelAfterRequestSent);
            this.resetConnectionOnNextRequest = false;
            this.debug.payload(function() {
              return payload.toString("  ");
            });
          });
          const payloadStream = _stream.Readable.from(payload);
          payloadStream.once("error", (error) => {
            payloadStream.unpipe(message2);
            request2.error ??= error;
            message2.ignore = true;
            message2.end();
          });
          payloadStream.pipe(message2);
        }
      }
      /**
       * Cancel currently executed request.
       */
      cancel() {
        if (!this.request) {
          return false;
        }
        if (this.request.canceled) {
          return false;
        }
        this.request.cancel();
        return true;
      }
      /**
       * Reset the connection to its initial state.
       * Can be useful for connection pool implementations.
       *
       * @param callback
       */
      reset(callback) {
        const request2 = new _request.default(this.getInitialSql(), (err) => {
          if (this.config.options.tdsVersion < "7_2") {
            this.inTransaction = false;
          }
          callback(err);
        });
        this.resetConnectionOnNextRequest = true;
        this.execSqlBatch(request2);
      }
      /**
       * @private
       */
      currentTransactionDescriptor() {
        return this.transactionDescriptors[this.transactionDescriptors.length - 1];
      }
      /**
       * @private
       */
      getIsolationLevelText(isolationLevel) {
        switch (isolationLevel) {
          case _transaction.ISOLATION_LEVEL.READ_UNCOMMITTED:
            return "read uncommitted";
          case _transaction.ISOLATION_LEVEL.REPEATABLE_READ:
            return "repeatable read";
          case _transaction.ISOLATION_LEVEL.SERIALIZABLE:
            return "serializable";
          case _transaction.ISOLATION_LEVEL.SNAPSHOT:
            return "snapshot";
          default:
            return "read committed";
        }
      }
      /**
       * @private
       */
      async performTlsNegotiation(preloginPayload2, signal) {
        signal.throwIfAborted();
        const {
          promise: signalAborted,
          reject
        } = withResolvers();
        const onAbort = () => {
          reject(signal.reason);
        };
        signal.addEventListener("abort", onAbort, {
          once: true
        });
        try {
          if (preloginPayload2.fedAuthRequired === 1) {
            this.fedAuthRequired = true;
          }
          if ("strict" !== this.config.options.encrypt && (preloginPayload2.encryptionString === "ON" || preloginPayload2.encryptionString === "REQ")) {
            if (!this.config.options.encrypt) {
              throw new _errors.ConnectionError("Server requires encryption, set 'encrypt' config option to true.", "EENCRYPT");
            }
            this.transitionTo(this.STATE.SENT_TLSSSLNEGOTIATION);
            await Promise.race([this.messageIo.startTls(this.secureContextOptions, this.config.options.serverName ? this.config.options.serverName : this.routingData?.server ?? this.config.server, this.config.options.trustServerCertificate).catch((err) => {
              throw this.wrapSocketError(err);
            }), signalAborted]);
          }
        } finally {
          signal.removeEventListener("abort", onAbort);
        }
      }
      async readPreloginResponse(signal) {
        signal.throwIfAborted();
        let messageBuffer = Buffer.alloc(0);
        const {
          promise: signalAborted,
          reject
        } = withResolvers();
        const onAbort = () => {
          reject(signal.reason);
        };
        signal.addEventListener("abort", onAbort, {
          once: true
        });
        try {
          const message2 = await Promise.race([this.messageIo.readMessage().catch((err) => {
            throw this.wrapSocketError(err);
          }), signalAborted]);
          const iterator = message2[Symbol.asyncIterator]();
          try {
            while (true) {
              const {
                done,
                value
              } = await Promise.race([iterator.next(), signalAborted]);
              if (done) {
                break;
              }
              messageBuffer = Buffer.concat([messageBuffer, value]);
            }
          } finally {
            if (iterator.return) {
              await iterator.return();
            }
          }
        } finally {
          signal.removeEventListener("abort", onAbort);
        }
        const preloginPayload2 = new _preloginPayload.default(messageBuffer);
        this.debug.payload(function() {
          return preloginPayload2.toString("  ");
        });
        return preloginPayload2;
      }
      /**
       * @private
       */
      async performReRouting() {
        this.socket.removeListener("error", this._onSocketError);
        this.socket.removeListener("close", this._onSocketClose);
        this.socket.removeListener("end", this._onSocketEnd);
        this.socket.destroy();
        this.debug.log("connection to " + this.config.server + ":" + this.config.options.port + " closed");
        this.emit("rerouting");
        this.debug.log("Rerouting to " + this.routingData.server + ":" + this.routingData.port);
        this.transitionTo(this.STATE.CONNECTING);
        await this.initialiseConnection();
      }
      /**
       * @private
       */
      async performTransientFailureRetry() {
        this.curTransientRetryCount++;
        this.socket.removeListener("error", this._onSocketError);
        this.socket.removeListener("close", this._onSocketClose);
        this.socket.removeListener("end", this._onSocketEnd);
        this.socket.destroy();
        this.debug.log("connection to " + this.config.server + ":" + this.config.options.port + " closed");
        const server = this.routingData ? this.routingData.server : this.config.server;
        const port = this.routingData ? this.routingData.port : this.config.options.port;
        this.debug.log("Retry after transient failure connecting to " + server + ":" + port);
        const {
          promise,
          resolve
        } = withResolvers();
        setTimeout(resolve, this.config.options.connectionRetryInterval);
        await promise;
        this.emit("retry");
        this.transitionTo(this.STATE.CONNECTING);
        await this.initialiseConnection();
      }
      /**
       * @private
       */
      async performSentLogin7WithStandardLogin(signal) {
        signal.throwIfAborted();
        const {
          promise: signalAborted,
          reject
        } = withResolvers();
        const onAbort = () => {
          reject(signal.reason);
        };
        signal.addEventListener("abort", onAbort, {
          once: true
        });
        try {
          const message2 = await Promise.race([this.messageIo.readMessage().catch((err) => {
            throw this.wrapSocketError(err);
          }), signalAborted]);
          const handler2 = new _handler.Login7TokenHandler(this);
          const tokenStreamParser2 = this.createTokenStreamParser(message2, handler2);
          await (0, _events.once)(tokenStreamParser2, "end");
          if (handler2.loginAckReceived) {
            return handler2.routingData;
          } else if (this.loginError) {
            throw this.loginError;
          } else {
            throw new _errors.ConnectionError("Login failed.", "ELOGIN");
          }
        } finally {
          this.loginError = void 0;
          signal.removeEventListener("abort", onAbort);
        }
      }
      /**
       * @private
       */
      async performSentLogin7WithNTLMLogin(signal) {
        signal.throwIfAborted();
        const {
          promise: signalAborted,
          reject
        } = withResolvers();
        const onAbort = () => {
          reject(signal.reason);
        };
        signal.addEventListener("abort", onAbort, {
          once: true
        });
        try {
          while (true) {
            const message2 = await Promise.race([this.messageIo.readMessage().catch((err) => {
              throw this.wrapSocketError(err);
            }), signalAborted]);
            const handler2 = new _handler.Login7TokenHandler(this);
            const tokenStreamParser2 = this.createTokenStreamParser(message2, handler2);
            await Promise.race([(0, _events.once)(tokenStreamParser2, "end"), signalAborted]);
            if (handler2.loginAckReceived) {
              return handler2.routingData;
            } else if (this.ntlmpacket) {
              const authentication = this.config.authentication;
              const payload = new _ntlmPayload.default({
                domain: authentication.options.domain,
                userName: authentication.options.userName,
                password: authentication.options.password,
                ntlmpacket: this.ntlmpacket
              });
              this.messageIo.sendMessage(_packet.TYPE.NTLMAUTH_PKT, payload.data);
              this.debug.payload(function() {
                return payload.toString("  ");
              });
              this.ntlmpacket = void 0;
            } else if (this.loginError) {
              throw this.loginError;
            } else {
              throw new _errors.ConnectionError("Login failed.", "ELOGIN");
            }
          }
        } finally {
          this.loginError = void 0;
          signal.removeEventListener("abort", onAbort);
        }
      }
      /**
       * @private
       */
      async performSentLogin7WithFedAuth(signal) {
        signal.throwIfAborted();
        const {
          promise: signalAborted,
          reject
        } = withResolvers();
        const onAbort = () => {
          reject(signal.reason);
        };
        signal.addEventListener("abort", onAbort, {
          once: true
        });
        try {
          const message2 = await Promise.race([this.messageIo.readMessage().catch((err) => {
            throw this.wrapSocketError(err);
          }), signalAborted]);
          const handler2 = new _handler.Login7TokenHandler(this);
          const tokenStreamParser2 = this.createTokenStreamParser(message2, handler2);
          await Promise.race([(0, _events.once)(tokenStreamParser2, "end"), signalAborted]);
          if (handler2.loginAckReceived) {
            return handler2.routingData;
          }
          const fedAuthInfoToken = handler2.fedAuthInfoToken;
          if (fedAuthInfoToken && fedAuthInfoToken.stsurl && fedAuthInfoToken.spn) {
            const authentication = this.config.authentication;
            const tokenScope = new _url.URL("/.default", fedAuthInfoToken.spn).toString();
            let credentials;
            switch (authentication.type) {
              case "token-credential":
                credentials = authentication.options.credential;
                break;
              case "azure-active-directory-password":
                credentials = new _identity.UsernamePasswordCredential(authentication.options.tenantId ?? "common", authentication.options.clientId, authentication.options.userName, authentication.options.password);
                break;
              case "azure-active-directory-msi-vm":
              case "azure-active-directory-msi-app-service":
                const msiArgs = authentication.options.clientId ? [authentication.options.clientId, {}] : [{}];
                credentials = new _identity.ManagedIdentityCredential(...msiArgs);
                break;
              case "azure-active-directory-default":
                const args = authentication.options.clientId ? {
                  managedIdentityClientId: authentication.options.clientId
                } : {};
                credentials = new _identity.DefaultAzureCredential(args);
                break;
              case "azure-active-directory-service-principal-secret":
                credentials = new _identity.ClientSecretCredential(authentication.options.tenantId, authentication.options.clientId, authentication.options.clientSecret);
                break;
            }
            let tokenResponse;
            try {
              tokenResponse = await Promise.race([credentials.getToken(tokenScope), signalAborted]);
            } catch (err) {
              signal.throwIfAborted();
              throw new AggregateError([new _errors.ConnectionError("Security token could not be authenticated or authorized.", "EFEDAUTH"), err]);
            }
            if (tokenResponse === null) {
              throw new AggregateError([new _errors.ConnectionError("Security token could not be authenticated or authorized.", "EFEDAUTH")]);
            }
            this.sendFedAuthTokenMessage(tokenResponse.token);
            this.transitionTo(this.STATE.SENT_LOGIN7_WITH_STANDARD_LOGIN);
            return await this.performSentLogin7WithStandardLogin(signal);
          } else if (this.loginError) {
            throw this.loginError;
          } else {
            throw new _errors.ConnectionError("Login failed.", "ELOGIN");
          }
        } finally {
          this.loginError = void 0;
          signal.removeEventListener("abort", onAbort);
        }
      }
      /**
       * @private
       */
      async performLoggedInSendingInitialSql(signal) {
        signal.throwIfAborted();
        const {
          promise: signalAborted,
          reject
        } = withResolvers();
        const onAbort = () => {
          reject(signal.reason);
        };
        signal.addEventListener("abort", onAbort, {
          once: true
        });
        try {
          this.sendInitialSql();
          const message2 = await Promise.race([this.messageIo.readMessage().catch((err) => {
            throw this.wrapSocketError(err);
          }), signalAborted]);
          const tokenStreamParser2 = this.createTokenStreamParser(message2, new _handler.InitialSqlTokenHandler(this));
          await Promise.race([(0, _events.once)(tokenStreamParser2, "end"), signalAborted]);
        } finally {
          signal.removeEventListener("abort", onAbort);
        }
      }
    }
    function isTransientError(error) {
      if (error instanceof AggregateError) {
        error = error.errors[0];
      }
      return error instanceof _errors.ConnectionError && !!error.isTransient;
    }
    exports.default = Connection;
    module.exports = Connection;
    Connection.prototype.STATE = {
      INITIALIZED: {
        name: "Initialized",
        events: {}
      },
      CONNECTING: {
        name: "Connecting",
        events: {}
      },
      SENT_PRELOGIN: {
        name: "SentPrelogin",
        events: {}
      },
      REROUTING: {
        name: "ReRouting",
        events: {}
      },
      TRANSIENT_FAILURE_RETRY: {
        name: "TRANSIENT_FAILURE_RETRY",
        events: {}
      },
      SENT_TLSSSLNEGOTIATION: {
        name: "SentTLSSSLNegotiation",
        events: {}
      },
      SENT_LOGIN7_WITH_STANDARD_LOGIN: {
        name: "SentLogin7WithStandardLogin",
        events: {}
      },
      SENT_LOGIN7_WITH_NTLM: {
        name: "SentLogin7WithNTLMLogin",
        events: {}
      },
      SENT_LOGIN7_WITH_FEDAUTH: {
        name: "SentLogin7WithFedauth",
        events: {}
      },
      LOGGED_IN_SENDING_INITIAL_SQL: {
        name: "LoggedInSendingInitialSql",
        events: {}
      },
      LOGGED_IN: {
        name: "LoggedIn",
        events: {
          socketError: function() {
            this.transitionTo(this.STATE.FINAL);
            this.cleanupConnection();
          }
        }
      },
      SENT_CLIENT_REQUEST: {
        name: "SentClientRequest",
        enter: function() {
          (async () => {
            let message2;
            try {
              message2 = await this.messageIo.readMessage();
            } catch (err) {
              this.dispatchEvent("socketError", err);
              process.nextTick(() => {
                this.emit("error", this.wrapSocketError(err));
              });
              return;
            }
            this.clearRequestTimer();
            const tokenStreamParser2 = this.createTokenStreamParser(message2, new _handler.RequestTokenHandler(this, this.request));
            if (this.request?.canceled && this.cancelTimer) {
              return this.transitionTo(this.STATE.SENT_ATTENTION);
            }
            const onResume = () => {
              tokenStreamParser2.resume();
            };
            const onPause = () => {
              tokenStreamParser2.pause();
              this.request?.once("resume", onResume);
            };
            this.request?.on("pause", onPause);
            if (this.request instanceof _request.default && this.request.paused) {
              onPause();
            }
            const onCancel = () => {
              tokenStreamParser2.removeListener("end", onEndOfMessage);
              if (this.request instanceof _request.default && this.request.paused) {
                this.request.resume();
              }
              this.request?.removeListener("pause", onPause);
              this.request?.removeListener("resume", onResume);
              this.transitionTo(this.STATE.SENT_ATTENTION);
            };
            const onEndOfMessage = () => {
              this.request?.removeListener("cancel", this._cancelAfterRequestSent);
              this.request?.removeListener("cancel", onCancel);
              this.request?.removeListener("pause", onPause);
              this.request?.removeListener("resume", onResume);
              this.transitionTo(this.STATE.LOGGED_IN);
              const sqlRequest = this.request;
              this.request = void 0;
              if (this.config.options.tdsVersion < "7_2" && sqlRequest.error && this.isSqlBatch) {
                this.inTransaction = false;
              }
              sqlRequest.callback(sqlRequest.error, sqlRequest.rowCount, sqlRequest.rows);
            };
            tokenStreamParser2.once("end", onEndOfMessage);
            this.request?.once("cancel", onCancel);
          })();
        },
        exit: function(nextState) {
          this.clearRequestTimer();
        },
        events: {
          socketError: function(err) {
            const sqlRequest = this.request;
            this.request = void 0;
            this.transitionTo(this.STATE.FINAL);
            this.cleanupConnection();
            sqlRequest.callback(err);
          }
        }
      },
      SENT_ATTENTION: {
        name: "SentAttention",
        enter: function() {
          (async () => {
            let message2;
            try {
              message2 = await this.messageIo.readMessage();
            } catch (err) {
              this.dispatchEvent("socketError", err);
              process.nextTick(() => {
                this.emit("error", this.wrapSocketError(err));
              });
              return;
            }
            const handler2 = new _handler.AttentionTokenHandler(this, this.request);
            const tokenStreamParser2 = this.createTokenStreamParser(message2, handler2);
            await (0, _events.once)(tokenStreamParser2, "end");
            if (handler2.attentionReceived) {
              this.clearCancelTimer();
              const sqlRequest = this.request;
              this.request = void 0;
              this.transitionTo(this.STATE.LOGGED_IN);
              if (sqlRequest.error && sqlRequest.error instanceof _errors.RequestError && sqlRequest.error.code === "ETIMEOUT") {
                sqlRequest.callback(sqlRequest.error);
              } else {
                sqlRequest.callback(new _errors.RequestError("Canceled.", "ECANCEL"));
              }
            }
          })().catch((err) => {
            process.nextTick(() => {
              throw err;
            });
          });
        },
        events: {
          socketError: function(err) {
            const sqlRequest = this.request;
            this.request = void 0;
            this.transitionTo(this.STATE.FINAL);
            this.cleanupConnection();
            sqlRequest.callback(err);
          }
        }
      },
      FINAL: {
        name: "Final",
        events: {}
      }
    };
  })(connection, connection.exports);
  return connection.exports;
}
var hasRequiredTedious;
function requireTedious() {
  if (hasRequiredTedious) return tedious;
  hasRequiredTedious = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "BulkLoad", {
      enumerable: true,
      get: function() {
        return _bulkLoad.default;
      }
    });
    Object.defineProperty(exports, "Connection", {
      enumerable: true,
      get: function() {
        return _connection.default;
      }
    });
    Object.defineProperty(exports, "ConnectionError", {
      enumerable: true,
      get: function() {
        return _errors.ConnectionError;
      }
    });
    Object.defineProperty(exports, "ISOLATION_LEVEL", {
      enumerable: true,
      get: function() {
        return _transaction.ISOLATION_LEVEL;
      }
    });
    Object.defineProperty(exports, "Request", {
      enumerable: true,
      get: function() {
        return _request.default;
      }
    });
    Object.defineProperty(exports, "RequestError", {
      enumerable: true,
      get: function() {
        return _errors.RequestError;
      }
    });
    Object.defineProperty(exports, "TDS_VERSION", {
      enumerable: true,
      get: function() {
        return _tdsVersions.versions;
      }
    });
    Object.defineProperty(exports, "TYPES", {
      enumerable: true,
      get: function() {
        return _dataType.TYPES;
      }
    });
    exports.connect = connect;
    exports.library = void 0;
    var _bulkLoad = _interopRequireDefault(requireBulkLoad());
    var _connection = _interopRequireDefault(requireConnection());
    var _request = _interopRequireDefault(requireRequest());
    var _library = requireLibrary();
    var _errors = requireErrors();
    var _dataType = requireDataType();
    var _transaction = requireTransaction();
    var _tdsVersions = requireTdsVersions();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    exports.library = {
      name: _library.name
    };
    function connect(config, connectListener) {
      const connection2 = new _connection.default(config);
      connection2.connect(connectListener);
      return connection2;
    }
  })(tedious);
  return tedious;
}
export {
  requireTedious as r
};
