import require$$0 from "stream";
var nativeDuplexpair;
var hasRequiredNativeDuplexpair;
function requireNativeDuplexpair() {
  if (hasRequiredNativeDuplexpair) return nativeDuplexpair;
  hasRequiredNativeDuplexpair = 1;
  const Duplex = require$$0.Duplex;
  const kCallback = /* @__PURE__ */ Symbol("Callback");
  const kOtherSide = /* @__PURE__ */ Symbol("Other");
  class DuplexSocket extends Duplex {
    constructor(options) {
      super(options);
      this[kCallback] = null;
      this[kOtherSide] = null;
    }
    _read() {
      const callback = this[kCallback];
      if (callback) {
        this[kCallback] = null;
        callback();
      }
    }
    _write(chunk, encoding, callback) {
      this[kOtherSide][kCallback] = callback;
      this[kOtherSide].push(chunk);
    }
    _final(callback) {
      this[kOtherSide].on("end", callback);
      this[kOtherSide].push(null);
    }
  }
  class DuplexPair {
    constructor(options) {
      this.socket1 = new DuplexSocket(options);
      this.socket2 = new DuplexSocket(options);
      this.socket1[kOtherSide] = this.socket2;
      this.socket2[kOtherSide] = this.socket1;
    }
  }
  nativeDuplexpair = DuplexPair;
  return nativeDuplexpair;
}
export {
  requireNativeDuplexpair as r
};
