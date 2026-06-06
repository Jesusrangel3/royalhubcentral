import { r as requireCommonjs$1 } from "./azure__core-util.mjs";
var commonjs = {};
var azureKeyCredential = {};
var hasRequiredAzureKeyCredential;
function requireAzureKeyCredential() {
  if (hasRequiredAzureKeyCredential) return azureKeyCredential;
  hasRequiredAzureKeyCredential = 1;
  Object.defineProperty(azureKeyCredential, "__esModule", { value: true });
  azureKeyCredential.AzureKeyCredential = void 0;
  class AzureKeyCredential {
    _key;
    /**
     * The value of the key to be used in authentication
     */
    get key() {
      return this._key;
    }
    /**
     * Create an instance of an AzureKeyCredential for use
     * with a service client.
     *
     * @param key - The initial value of the key to use in authentication
     */
    constructor(key) {
      if (!key) {
        throw new Error("key must be a non-empty string");
      }
      this._key = key;
    }
    /**
     * Change the value of the key.
     *
     * Updates will take effect upon the next request after
     * updating the key value.
     *
     * @param newKey - The new key value to be used
     */
    update(newKey) {
      this._key = newKey;
    }
  }
  azureKeyCredential.AzureKeyCredential = AzureKeyCredential;
  return azureKeyCredential;
}
var keyCredential = {};
var hasRequiredKeyCredential;
function requireKeyCredential() {
  if (hasRequiredKeyCredential) return keyCredential;
  hasRequiredKeyCredential = 1;
  Object.defineProperty(keyCredential, "__esModule", { value: true });
  keyCredential.isKeyCredential = isKeyCredential;
  const core_util_1 = /* @__PURE__ */ requireCommonjs$1();
  function isKeyCredential(credential) {
    return (0, core_util_1.isObjectWithProperties)(credential, ["key"]) && typeof credential.key === "string";
  }
  return keyCredential;
}
var azureNamedKeyCredential = {};
var hasRequiredAzureNamedKeyCredential;
function requireAzureNamedKeyCredential() {
  if (hasRequiredAzureNamedKeyCredential) return azureNamedKeyCredential;
  hasRequiredAzureNamedKeyCredential = 1;
  Object.defineProperty(azureNamedKeyCredential, "__esModule", { value: true });
  azureNamedKeyCredential.AzureNamedKeyCredential = void 0;
  azureNamedKeyCredential.isNamedKeyCredential = isNamedKeyCredential;
  const core_util_1 = /* @__PURE__ */ requireCommonjs$1();
  class AzureNamedKeyCredential {
    _key;
    _name;
    /**
     * The value of the key to be used in authentication.
     */
    get key() {
      return this._key;
    }
    /**
     * The value of the name to be used in authentication.
     */
    get name() {
      return this._name;
    }
    /**
     * Create an instance of an AzureNamedKeyCredential for use
     * with a service client.
     *
     * @param name - The initial value of the name to use in authentication.
     * @param key - The initial value of the key to use in authentication.
     */
    constructor(name, key) {
      if (!name || !key) {
        throw new TypeError("name and key must be non-empty strings");
      }
      this._name = name;
      this._key = key;
    }
    /**
     * Change the value of the key.
     *
     * Updates will take effect upon the next request after
     * updating the key value.
     *
     * @param newName - The new name value to be used.
     * @param newKey - The new key value to be used.
     */
    update(newName, newKey) {
      if (!newName || !newKey) {
        throw new TypeError("newName and newKey must be non-empty strings");
      }
      this._name = newName;
      this._key = newKey;
    }
  }
  azureNamedKeyCredential.AzureNamedKeyCredential = AzureNamedKeyCredential;
  function isNamedKeyCredential(credential) {
    return (0, core_util_1.isObjectWithProperties)(credential, ["name", "key"]) && typeof credential.key === "string" && typeof credential.name === "string";
  }
  return azureNamedKeyCredential;
}
var azureSASCredential = {};
var hasRequiredAzureSASCredential;
function requireAzureSASCredential() {
  if (hasRequiredAzureSASCredential) return azureSASCredential;
  hasRequiredAzureSASCredential = 1;
  Object.defineProperty(azureSASCredential, "__esModule", { value: true });
  azureSASCredential.AzureSASCredential = void 0;
  azureSASCredential.isSASCredential = isSASCredential;
  const core_util_1 = /* @__PURE__ */ requireCommonjs$1();
  class AzureSASCredential {
    _signature;
    /**
     * The value of the shared access signature to be used in authentication
     */
    get signature() {
      return this._signature;
    }
    /**
     * Create an instance of an AzureSASCredential for use
     * with a service client.
     *
     * @param signature - The initial value of the shared access signature to use in authentication
     */
    constructor(signature) {
      if (!signature) {
        throw new Error("shared access signature must be a non-empty string");
      }
      this._signature = signature;
    }
    /**
     * Change the value of the signature.
     *
     * Updates will take effect upon the next request after
     * updating the signature value.
     *
     * @param newSignature - The new shared access signature value to be used
     */
    update(newSignature) {
      if (!newSignature) {
        throw new Error("shared access signature must be a non-empty string");
      }
      this._signature = newSignature;
    }
  }
  azureSASCredential.AzureSASCredential = AzureSASCredential;
  function isSASCredential(credential) {
    return (0, core_util_1.isObjectWithProperties)(credential, ["signature"]) && typeof credential.signature === "string";
  }
  return azureSASCredential;
}
var tokenCredential = {};
var hasRequiredTokenCredential;
function requireTokenCredential() {
  if (hasRequiredTokenCredential) return tokenCredential;
  hasRequiredTokenCredential = 1;
  Object.defineProperty(tokenCredential, "__esModule", { value: true });
  tokenCredential.isBearerToken = isBearerToken;
  tokenCredential.isPopToken = isPopToken;
  tokenCredential.isTokenCredential = isTokenCredential;
  function isBearerToken(accessToken) {
    return !accessToken.tokenType || accessToken.tokenType === "Bearer";
  }
  function isPopToken(accessToken) {
    return accessToken.tokenType === "pop";
  }
  function isTokenCredential(credential) {
    const castCredential = credential;
    return castCredential && typeof castCredential.getToken === "function" && (castCredential.signRequest === void 0 || castCredential.getToken.length > 0);
  }
  return tokenCredential;
}
var hasRequiredCommonjs;
function requireCommonjs() {
  if (hasRequiredCommonjs) return commonjs;
  hasRequiredCommonjs = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isTokenCredential = exports.isSASCredential = exports.AzureSASCredential = exports.isNamedKeyCredential = exports.AzureNamedKeyCredential = exports.isKeyCredential = exports.AzureKeyCredential = void 0;
    var azureKeyCredential_js_1 = requireAzureKeyCredential();
    Object.defineProperty(exports, "AzureKeyCredential", { enumerable: true, get: function() {
      return azureKeyCredential_js_1.AzureKeyCredential;
    } });
    var keyCredential_js_1 = requireKeyCredential();
    Object.defineProperty(exports, "isKeyCredential", { enumerable: true, get: function() {
      return keyCredential_js_1.isKeyCredential;
    } });
    var azureNamedKeyCredential_js_1 = requireAzureNamedKeyCredential();
    Object.defineProperty(exports, "AzureNamedKeyCredential", { enumerable: true, get: function() {
      return azureNamedKeyCredential_js_1.AzureNamedKeyCredential;
    } });
    Object.defineProperty(exports, "isNamedKeyCredential", { enumerable: true, get: function() {
      return azureNamedKeyCredential_js_1.isNamedKeyCredential;
    } });
    var azureSASCredential_js_1 = requireAzureSASCredential();
    Object.defineProperty(exports, "AzureSASCredential", { enumerable: true, get: function() {
      return azureSASCredential_js_1.AzureSASCredential;
    } });
    Object.defineProperty(exports, "isSASCredential", { enumerable: true, get: function() {
      return azureSASCredential_js_1.isSASCredential;
    } });
    var tokenCredential_js_1 = requireTokenCredential();
    Object.defineProperty(exports, "isTokenCredential", { enumerable: true, get: function() {
      return tokenCredential_js_1.isTokenCredential;
    } });
  })(commonjs);
  return commonjs;
}
export {
  requireCommonjs as r
};
