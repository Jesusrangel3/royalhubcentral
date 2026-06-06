var commonjs = {};
var AbortError = {};
var hasRequiredAbortError;
function requireAbortError() {
  if (hasRequiredAbortError) return AbortError;
  hasRequiredAbortError = 1;
  Object.defineProperty(AbortError, "__esModule", { value: true });
  AbortError.AbortError = void 0;
  let AbortError$1 = class AbortError extends Error {
    constructor(message) {
      super(message);
      this.name = "AbortError";
    }
  };
  AbortError.AbortError = AbortError$1;
  return AbortError;
}
var hasRequiredCommonjs;
function requireCommonjs() {
  if (hasRequiredCommonjs) return commonjs;
  hasRequiredCommonjs = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbortError = void 0;
    var AbortError_js_1 = requireAbortError();
    Object.defineProperty(exports, "AbortError", { enumerable: true, get: function() {
      return AbortError_js_1.AbortError;
    } });
  })(commonjs);
  return commonjs;
}
export {
  requireCommonjs as r
};
