import { c as commonjsGlobal } from "./react.mjs";
import require$$1 from "crypto";
import require$$0 from "buffer";
var md4 = { exports: {} };
var hasRequiredMd4;
function requireMd4() {
  if (hasRequiredMd4) return md4.exports;
  hasRequiredMd4 = 1;
  (function(module) {
    (function() {
      var root = typeof window === "object" ? window : {};
      var NODE_JS = !root.JS_MD4_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
      if (NODE_JS) {
        root = commonjsGlobal;
      }
      var COMMON_JS = !root.JS_MD4_NO_COMMON_JS && true && module.exports;
      var ARRAY_BUFFER = !root.JS_MD4_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
      var HEX_CHARS = "0123456789abcdef".split("");
      var EXTRA = [128, 32768, 8388608, -2147483648];
      var SHIFT = [0, 8, 16, 24];
      var OUTPUT_TYPES = ["hex", "array", "digest", "buffer", "arrayBuffer"];
      var blocks = [], buffer8;
      if (ARRAY_BUFFER) {
        var buffer = new ArrayBuffer(68);
        buffer8 = new Uint8Array(buffer);
        blocks = new Uint32Array(buffer);
      }
      var createOutputMethod = function(outputType) {
        return function(message) {
          return new Md4(true).update(message)[outputType]();
        };
      };
      var createMethod = function() {
        var method = createOutputMethod("hex");
        if (NODE_JS) {
          method = nodeWrap(method);
        }
        method.create = function() {
          return new Md4();
        };
        method.update = function(message) {
          return method.create().update(message);
        };
        for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
          var type = OUTPUT_TYPES[i];
          method[type] = createOutputMethod(type);
        }
        return method;
      };
      var nodeWrap = function(method) {
        var crypto = require$$1;
        var Buffer = require$$0.Buffer;
        var nodeMethod = function(message) {
          if (typeof message === "string") {
            return crypto.createHash("md4").update(message, "utf8").digest("hex");
          } else if (ARRAY_BUFFER && message instanceof ArrayBuffer) {
            message = new Uint8Array(message);
          } else if (message.length === void 0) {
            return method(message);
          }
          return crypto.createHash("md4").update(new Buffer(message)).digest("hex");
        };
        return nodeMethod;
      };
      function Md4(sharedMemory) {
        if (sharedMemory) {
          blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
          this.blocks = blocks;
          this.buffer8 = buffer8;
        } else {
          if (ARRAY_BUFFER) {
            var buffer2 = new ArrayBuffer(68);
            this.buffer8 = new Uint8Array(buffer2);
            this.blocks = new Uint32Array(buffer2);
          } else {
            this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          }
        }
        this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = 0;
        this.finalized = this.hashed = false;
        this.first = true;
      }
      Md4.prototype.update = function(message) {
        if (this.finalized) {
          return;
        }
        var notString = typeof message !== "string";
        if (notString && ARRAY_BUFFER && message instanceof ArrayBuffer) {
          message = new Uint8Array(message);
        }
        var code, index = 0, i, length = message.length || 0, blocks2 = this.blocks;
        var buffer82 = this.buffer8;
        while (index < length) {
          if (this.hashed) {
            this.hashed = false;
            blocks2[0] = blocks2[16];
            blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
          }
          if (notString) {
            if (ARRAY_BUFFER) {
              for (i = this.start; index < length && i < 64; ++index) {
                buffer82[i++] = message[index];
              }
            } else {
              for (i = this.start; index < length && i < 64; ++index) {
                blocks2[i >> 2] |= message[index] << SHIFT[i++ & 3];
              }
            }
          } else {
            if (ARRAY_BUFFER) {
              for (i = this.start; index < length && i < 64; ++index) {
                code = message.charCodeAt(index);
                if (code < 128) {
                  buffer82[i++] = code;
                } else if (code < 2048) {
                  buffer82[i++] = 192 | code >> 6;
                  buffer82[i++] = 128 | code & 63;
                } else if (code < 55296 || code >= 57344) {
                  buffer82[i++] = 224 | code >> 12;
                  buffer82[i++] = 128 | code >> 6 & 63;
                  buffer82[i++] = 128 | code & 63;
                } else {
                  code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
                  buffer82[i++] = 240 | code >> 18;
                  buffer82[i++] = 128 | code >> 12 & 63;
                  buffer82[i++] = 128 | code >> 6 & 63;
                  buffer82[i++] = 128 | code & 63;
                }
              }
            } else {
              for (i = this.start; index < length && i < 64; ++index) {
                code = message.charCodeAt(index);
                if (code < 128) {
                  blocks2[i >> 2] |= code << SHIFT[i++ & 3];
                } else if (code < 2048) {
                  blocks2[i >> 2] |= (192 | code >> 6) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
                } else if (code < 55296 || code >= 57344) {
                  blocks2[i >> 2] |= (224 | code >> 12) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
                } else {
                  code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
                  blocks2[i >> 2] |= (240 | code >> 18) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code >> 12 & 63) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
                  blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
                }
              }
            }
          }
          this.lastByteIndex = i;
          this.bytes += i - this.start;
          if (i >= 64) {
            this.start = i - 64;
            this.hash();
            this.hashed = true;
          } else {
            this.start = i;
          }
        }
        return this;
      };
      Md4.prototype.finalize = function() {
        if (this.finalized) {
          return;
        }
        this.finalized = true;
        var blocks2 = this.blocks, i = this.lastByteIndex;
        blocks2[i >> 2] |= EXTRA[i & 3];
        if (i >= 56) {
          if (!this.hashed) {
            this.hash();
          }
          blocks2[0] = blocks2[16];
          blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
        }
        blocks2[14] = this.bytes << 3;
        this.hash();
      };
      Md4.prototype.hash = function() {
        var a, b, c, d, ab, bc, cd, da, blocks2 = this.blocks;
        if (this.first) {
          a = blocks2[0] - 1;
          a = a << 3 | a >>> 29;
          d = (a & 4023233417 | ~a & 2562383102) + blocks2[1] + 271733878;
          d = d << 7 | d >>> 25;
          c = (d & a | ~d & 4023233417) + blocks2[2] - 1732584194;
          c = c << 11 | c >>> 21;
          b = (c & d | ~c & a) + blocks2[3] - 271733879;
          b = b << 19 | b >>> 13;
        } else {
          a = this.h0;
          b = this.h1;
          c = this.h2;
          d = this.h3;
          a += (b & c | ~b & d) + blocks2[0];
          a = a << 3 | a >>> 29;
          d += (a & b | ~a & c) + blocks2[1];
          d = d << 7 | d >>> 25;
          c += (d & a | ~d & b) + blocks2[2];
          c = c << 11 | c >>> 21;
          b += (c & d | ~c & a) + blocks2[3];
          b = b << 19 | b >>> 13;
        }
        a += (b & c | ~b & d) + blocks2[4];
        a = a << 3 | a >>> 29;
        d += (a & b | ~a & c) + blocks2[5];
        d = d << 7 | d >>> 25;
        c += (d & a | ~d & b) + blocks2[6];
        c = c << 11 | c >>> 21;
        b += (c & d | ~c & a) + blocks2[7];
        b = b << 19 | b >>> 13;
        a += (b & c | ~b & d) + blocks2[8];
        a = a << 3 | a >>> 29;
        d += (a & b | ~a & c) + blocks2[9];
        d = d << 7 | d >>> 25;
        c += (d & a | ~d & b) + blocks2[10];
        c = c << 11 | c >>> 21;
        b += (c & d | ~c & a) + blocks2[11];
        b = b << 19 | b >>> 13;
        a += (b & c | ~b & d) + blocks2[12];
        a = a << 3 | a >>> 29;
        d += (a & b | ~a & c) + blocks2[13];
        d = d << 7 | d >>> 25;
        c += (d & a | ~d & b) + blocks2[14];
        c = c << 11 | c >>> 21;
        b += (c & d | ~c & a) + blocks2[15];
        b = b << 19 | b >>> 13;
        bc = b & c;
        a += (bc | b & d | c & d) + blocks2[0] + 1518500249;
        a = a << 3 | a >>> 29;
        ab = a & b;
        d += (ab | a & c | bc) + blocks2[4] + 1518500249;
        d = d << 5 | d >>> 27;
        da = d & a;
        c += (da | d & b | ab) + blocks2[8] + 1518500249;
        c = c << 9 | c >>> 23;
        cd = c & d;
        b += (cd | c & a | da) + blocks2[12] + 1518500249;
        b = b << 13 | b >>> 19;
        bc = b & c;
        a += (bc | b & d | cd) + blocks2[1] + 1518500249;
        a = a << 3 | a >>> 29;
        ab = a & b;
        d += (ab | a & c | bc) + blocks2[5] + 1518500249;
        d = d << 5 | d >>> 27;
        da = d & a;
        c += (da | d & b | ab) + blocks2[9] + 1518500249;
        c = c << 9 | c >>> 23;
        cd = c & d;
        b += (cd | c & a | da) + blocks2[13] + 1518500249;
        b = b << 13 | b >>> 19;
        bc = b & c;
        a += (bc | b & d | cd) + blocks2[2] + 1518500249;
        a = a << 3 | a >>> 29;
        ab = a & b;
        d += (ab | a & c | bc) + blocks2[6] + 1518500249;
        d = d << 5 | d >>> 27;
        da = d & a;
        c += (da | d & b | ab) + blocks2[10] + 1518500249;
        c = c << 9 | c >>> 23;
        cd = c & d;
        b += (cd | c & a | da) + blocks2[14] + 1518500249;
        b = b << 13 | b >>> 19;
        bc = b & c;
        a += (bc | b & d | cd) + blocks2[3] + 1518500249;
        a = a << 3 | a >>> 29;
        ab = a & b;
        d += (ab | a & c | bc) + blocks2[7] + 1518500249;
        d = d << 5 | d >>> 27;
        da = d & a;
        c += (da | d & b | ab) + blocks2[11] + 1518500249;
        c = c << 9 | c >>> 23;
        b += (c & d | c & a | da) + blocks2[15] + 1518500249;
        b = b << 13 | b >>> 19;
        bc = b ^ c;
        a += (bc ^ d) + blocks2[0] + 1859775393;
        a = a << 3 | a >>> 29;
        d += (bc ^ a) + blocks2[8] + 1859775393;
        d = d << 9 | d >>> 23;
        da = d ^ a;
        c += (da ^ b) + blocks2[4] + 1859775393;
        c = c << 11 | c >>> 21;
        b += (da ^ c) + blocks2[12] + 1859775393;
        b = b << 15 | b >>> 17;
        bc = b ^ c;
        a += (bc ^ d) + blocks2[2] + 1859775393;
        a = a << 3 | a >>> 29;
        d += (bc ^ a) + blocks2[10] + 1859775393;
        d = d << 9 | d >>> 23;
        da = d ^ a;
        c += (da ^ b) + blocks2[6] + 1859775393;
        c = c << 11 | c >>> 21;
        b += (da ^ c) + blocks2[14] + 1859775393;
        b = b << 15 | b >>> 17;
        bc = b ^ c;
        a += (bc ^ d) + blocks2[1] + 1859775393;
        a = a << 3 | a >>> 29;
        d += (bc ^ a) + blocks2[9] + 1859775393;
        d = d << 9 | d >>> 23;
        da = d ^ a;
        c += (da ^ b) + blocks2[5] + 1859775393;
        c = c << 11 | c >>> 21;
        b += (da ^ c) + blocks2[13] + 1859775393;
        b = b << 15 | b >>> 17;
        bc = b ^ c;
        a += (bc ^ d) + blocks2[3] + 1859775393;
        a = a << 3 | a >>> 29;
        d += (bc ^ a) + blocks2[11] + 1859775393;
        d = d << 9 | d >>> 23;
        da = d ^ a;
        c += (da ^ b) + blocks2[7] + 1859775393;
        c = c << 11 | c >>> 21;
        b += (da ^ c) + blocks2[15] + 1859775393;
        b = b << 15 | b >>> 17;
        if (this.first) {
          this.h0 = a + 1732584193 << 0;
          this.h1 = b - 271733879 << 0;
          this.h2 = c - 1732584194 << 0;
          this.h3 = d + 271733878 << 0;
          this.first = false;
        } else {
          this.h0 = this.h0 + a << 0;
          this.h1 = this.h1 + b << 0;
          this.h2 = this.h2 + c << 0;
          this.h3 = this.h3 + d << 0;
        }
      };
      Md4.prototype.hex = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
        return HEX_CHARS[h0 >> 4 & 15] + HEX_CHARS[h0 & 15] + HEX_CHARS[h0 >> 12 & 15] + HEX_CHARS[h0 >> 8 & 15] + HEX_CHARS[h0 >> 20 & 15] + HEX_CHARS[h0 >> 16 & 15] + HEX_CHARS[h0 >> 28 & 15] + HEX_CHARS[h0 >> 24 & 15] + HEX_CHARS[h1 >> 4 & 15] + HEX_CHARS[h1 & 15] + HEX_CHARS[h1 >> 12 & 15] + HEX_CHARS[h1 >> 8 & 15] + HEX_CHARS[h1 >> 20 & 15] + HEX_CHARS[h1 >> 16 & 15] + HEX_CHARS[h1 >> 28 & 15] + HEX_CHARS[h1 >> 24 & 15] + HEX_CHARS[h2 >> 4 & 15] + HEX_CHARS[h2 & 15] + HEX_CHARS[h2 >> 12 & 15] + HEX_CHARS[h2 >> 8 & 15] + HEX_CHARS[h2 >> 20 & 15] + HEX_CHARS[h2 >> 16 & 15] + HEX_CHARS[h2 >> 28 & 15] + HEX_CHARS[h2 >> 24 & 15] + HEX_CHARS[h3 >> 4 & 15] + HEX_CHARS[h3 & 15] + HEX_CHARS[h3 >> 12 & 15] + HEX_CHARS[h3 >> 8 & 15] + HEX_CHARS[h3 >> 20 & 15] + HEX_CHARS[h3 >> 16 & 15] + HEX_CHARS[h3 >> 28 & 15] + HEX_CHARS[h3 >> 24 & 15];
      };
      Md4.prototype.toString = Md4.prototype.hex;
      Md4.prototype.digest = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
        return [
          h0 & 255,
          h0 >> 8 & 255,
          h0 >> 16 & 255,
          h0 >> 24 & 255,
          h1 & 255,
          h1 >> 8 & 255,
          h1 >> 16 & 255,
          h1 >> 24 & 255,
          h2 & 255,
          h2 >> 8 & 255,
          h2 >> 16 & 255,
          h2 >> 24 & 255,
          h3 & 255,
          h3 >> 8 & 255,
          h3 >> 16 & 255,
          h3 >> 24 & 255
        ];
      };
      Md4.prototype.array = Md4.prototype.digest;
      Md4.prototype.arrayBuffer = function() {
        this.finalize();
        var buffer2 = new ArrayBuffer(16);
        var blocks2 = new Uint32Array(buffer2);
        blocks2[0] = this.h0;
        blocks2[1] = this.h1;
        blocks2[2] = this.h2;
        blocks2[3] = this.h3;
        return buffer2;
      };
      Md4.prototype.buffer = Md4.prototype.arrayBuffer;
      var exports = createMethod();
      if (COMMON_JS) {
        module.exports = exports;
      } else {
        root.md4 = exports;
      }
    })();
  })(md4);
  return md4.exports;
}
export {
  requireMd4 as r
};
