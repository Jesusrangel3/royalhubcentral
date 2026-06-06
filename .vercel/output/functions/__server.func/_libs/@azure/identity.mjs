import fs from "node:fs/promises";
import require$$3 from "child_process";
import childProcess from "node:child_process";
import { r as requireTslib } from "../tslib.mjs";
import { r as requireCommonjs$1 } from "../azure__logger.mjs";
import { r as requireCommonjs$2 } from "../azure__core-tracing.mjs";
import { r as requireMsalNode } from "./msal-node.mjs";
import { r as requireCommonjs$3 } from "../azure__core-util.mjs";
import { r as requireCommonjs$4 } from "../azure__abort-controller.mjs";
import { r as requireCommonjs$5 } from "../azure__core-client.mjs";
import { r as requireCommonjs$6 } from "../azure__core-rest-pipeline.mjs";
import require$$0 from "node:crypto";
var commonjs = {};
var consumer = {};
var msalPlugins = {};
var constants = {};
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  Object.defineProperty(constants, "__esModule", { value: true });
  constants.DEFAULT_TOKEN_CACHE_NAME = constants.CACHE_NON_CAE_SUFFIX = constants.CACHE_CAE_SUFFIX = constants.ALL_TENANTS = constants.DefaultAuthority = constants.DefaultAuthorityHost = constants.AzureAuthorityHosts = constants.DefaultTenantId = constants.DeveloperSignOnClientId = constants.SDK_VERSION = void 0;
  constants.SDK_VERSION = `4.13.1`;
  constants.DeveloperSignOnClientId = "04b07795-8ddb-461a-bbee-02f9e1bf7b46";
  constants.DefaultTenantId = "common";
  var AzureAuthorityHosts;
  (function(AzureAuthorityHosts2) {
    AzureAuthorityHosts2["AzureChina"] = "https://login.chinacloudapi.cn";
    AzureAuthorityHosts2["AzureGermany"] = "https://login.microsoftonline.de";
    AzureAuthorityHosts2["AzureGovernment"] = "https://login.microsoftonline.us";
    AzureAuthorityHosts2["AzurePublicCloud"] = "https://login.microsoftonline.com";
  })(AzureAuthorityHosts || (constants.AzureAuthorityHosts = AzureAuthorityHosts = {}));
  constants.DefaultAuthorityHost = AzureAuthorityHosts.AzurePublicCloud;
  constants.DefaultAuthority = "login.microsoftonline.com";
  constants.ALL_TENANTS = ["*"];
  constants.CACHE_CAE_SUFFIX = "cae";
  constants.CACHE_NON_CAE_SUFFIX = "nocae";
  constants.DEFAULT_TOKEN_CACHE_NAME = "msal.cache";
  return constants;
}
var hasRequiredMsalPlugins;
function requireMsalPlugins() {
  if (hasRequiredMsalPlugins) return msalPlugins;
  hasRequiredMsalPlugins = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.msalPlugins = exports.msalNodeFlowVSCodeCredentialControl = exports.msalNodeFlowNativeBrokerControl = exports.vsCodeBrokerInfo = exports.vsCodeAuthRecordPath = exports.nativeBrokerInfo = exports.msalNodeFlowCacheControl = exports.persistenceProvider = void 0;
    exports.hasNativeBroker = hasNativeBroker;
    exports.hasVSCodePlugin = hasVSCodePlugin;
    const constants_js_1 = requireConstants();
    exports.persistenceProvider = void 0;
    exports.msalNodeFlowCacheControl = {
      setPersistence(pluginProvider) {
        exports.persistenceProvider = pluginProvider;
      }
    };
    exports.nativeBrokerInfo = void 0;
    exports.vsCodeAuthRecordPath = void 0;
    exports.vsCodeBrokerInfo = void 0;
    function hasNativeBroker() {
      return exports.nativeBrokerInfo !== void 0;
    }
    function hasVSCodePlugin() {
      return exports.vsCodeAuthRecordPath !== void 0 && exports.vsCodeBrokerInfo !== void 0;
    }
    exports.msalNodeFlowNativeBrokerControl = {
      setNativeBroker(broker) {
        exports.nativeBrokerInfo = {
          broker
        };
      }
    };
    exports.msalNodeFlowVSCodeCredentialControl = {
      setVSCodeAuthRecordPath(path) {
        exports.vsCodeAuthRecordPath = path;
      },
      setVSCodeBroker(broker) {
        exports.vsCodeBrokerInfo = {
          broker
        };
      }
    };
    function generatePluginConfiguration(options) {
      const config = {
        cache: {},
        broker: {
          ...options.brokerOptions,
          isEnabled: options.brokerOptions?.enabled ?? false,
          enableMsaPassthrough: options.brokerOptions?.legacyEnableMsaPassthrough ?? false
        }
      };
      if (options.tokenCachePersistenceOptions?.enabled) {
        if (exports.persistenceProvider === void 0) {
          throw new Error([
            "Persistent token caching was requested, but no persistence provider was configured.",
            "You must install the identity-cache-persistence plugin package (`npm install --save @azure/identity-cache-persistence`)",
            "and enable it by importing `useIdentityPlugin` from `@azure/identity` and calling",
            "`useIdentityPlugin(cachePersistencePlugin)` before using `tokenCachePersistenceOptions`."
          ].join(" "));
        }
        const cacheBaseName = options.tokenCachePersistenceOptions.name || constants_js_1.DEFAULT_TOKEN_CACHE_NAME;
        config.cache.cachePlugin = (0, exports.persistenceProvider)({
          name: `${cacheBaseName}.${constants_js_1.CACHE_NON_CAE_SUFFIX}`,
          ...options.tokenCachePersistenceOptions
        });
        config.cache.cachePluginCae = (0, exports.persistenceProvider)({
          name: `${cacheBaseName}.${constants_js_1.CACHE_CAE_SUFFIX}`,
          ...options.tokenCachePersistenceOptions
        });
      }
      if (options.brokerOptions?.enabled) {
        config.broker.nativeBrokerPlugin = getBrokerPlugin(options.isVSCodeCredential || false);
      }
      return config;
    }
    const brokerErrorTemplates = {
      missing: (credentialName, packageName, pluginVar) => [
        `${credentialName} was requested, but no plugin was configured or no authentication record was found.`,
        `You must install the ${packageName} plugin package (npm install --save ${packageName})`,
        "and enable it by importing `useIdentityPlugin` from `@azure/identity` and calling",
        `useIdentityPlugin(${pluginVar}) before using enableBroker.`
      ].join(" "),
      unavailable: (credentialName, packageName) => [
        `${credentialName} was requested, and the plugin is configured, but the broker is unavailable.`,
        `Ensure the ${credentialName} plugin is properly installed and configured.`,
        "Check for missing native dependencies and ensure the package is properly installed.",
        `See the README for prerequisites on installing and using ${packageName}.`
      ].join(" ")
    };
    const brokerConfig = {
      vsCode: {
        credentialName: "Visual Studio Code Credential",
        packageName: "@azure/identity-vscode",
        pluginVar: "vsCodePlugin",
        get brokerInfo() {
          return exports.vsCodeBrokerInfo;
        }
      },
      native: {
        credentialName: "Broker for WAM",
        packageName: "@azure/identity-broker",
        pluginVar: "nativeBrokerPlugin",
        get brokerInfo() {
          return exports.nativeBrokerInfo;
        }
      }
    };
    function getBrokerPlugin(isVSCodePlugin) {
      const { credentialName, packageName, pluginVar, brokerInfo } = brokerConfig[isVSCodePlugin ? "vsCode" : "native"];
      if (brokerInfo === void 0) {
        throw new Error(brokerErrorTemplates.missing(credentialName, packageName, pluginVar));
      }
      if (brokerInfo.broker.isBrokerAvailable === false) {
        throw new Error(brokerErrorTemplates.unavailable(credentialName, packageName));
      }
      return brokerInfo.broker;
    }
    exports.msalPlugins = {
      generatePluginConfiguration
    };
  })(msalPlugins);
  return msalPlugins;
}
var hasRequiredConsumer;
function requireConsumer() {
  if (hasRequiredConsumer) return consumer;
  hasRequiredConsumer = 1;
  Object.defineProperty(consumer, "__esModule", { value: true });
  consumer.useIdentityPlugin = useIdentityPlugin;
  const msalPlugins_js_1 = requireMsalPlugins();
  const pluginContext = {
    cachePluginControl: msalPlugins_js_1.msalNodeFlowCacheControl,
    nativeBrokerPluginControl: msalPlugins_js_1.msalNodeFlowNativeBrokerControl,
    vsCodeCredentialControl: msalPlugins_js_1.msalNodeFlowVSCodeCredentialControl
  };
  function useIdentityPlugin(plugin) {
    plugin(pluginContext);
  }
  return consumer;
}
var defaultAzureCredential = {};
var chainedTokenCredential = {};
var errors = {};
var hasRequiredErrors;
function requireErrors() {
  if (hasRequiredErrors) return errors;
  hasRequiredErrors = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AuthenticationRequiredError = exports.AggregateAuthenticationError = exports.AggregateAuthenticationErrorName = exports.AuthenticationError = exports.AuthenticationErrorName = exports.CredentialUnavailableError = exports.CredentialUnavailableErrorName = void 0;
    function isErrorResponse(errorResponse) {
      return errorResponse && typeof errorResponse.error === "string" && typeof errorResponse.error_description === "string";
    }
    exports.CredentialUnavailableErrorName = "CredentialUnavailableError";
    class CredentialUnavailableError extends Error {
      constructor(message, options) {
        super(message, options);
        this.name = exports.CredentialUnavailableErrorName;
      }
    }
    exports.CredentialUnavailableError = CredentialUnavailableError;
    exports.AuthenticationErrorName = "AuthenticationError";
    class AuthenticationError extends Error {
      /**
       * The HTTP status code returned from the authentication request.
       */
      statusCode;
      /**
       * The error response details.
       */
      errorResponse;
      constructor(statusCode, errorBody, options) {
        let errorResponse = {
          error: "unknown",
          errorDescription: "An unknown error occurred and no additional details are available."
        };
        if (isErrorResponse(errorBody)) {
          errorResponse = convertOAuthErrorResponseToErrorResponse(errorBody);
        } else if (typeof errorBody === "string") {
          try {
            const oauthErrorResponse = JSON.parse(errorBody);
            errorResponse = convertOAuthErrorResponseToErrorResponse(oauthErrorResponse);
          } catch (e) {
            if (statusCode === 400) {
              errorResponse = {
                error: "invalid_request",
                errorDescription: `The service indicated that the request was invalid.

${errorBody}`
              };
            } else {
              errorResponse = {
                error: "unknown_error",
                errorDescription: `An unknown error has occurred. Response body:

${errorBody}`
              };
            }
          }
        } else {
          errorResponse = {
            error: "unknown_error",
            errorDescription: "An unknown error occurred and no additional details are available."
          };
        }
        super(`${errorResponse.error} Status code: ${statusCode}
More details:
${errorResponse.errorDescription},`, options);
        this.statusCode = statusCode;
        this.errorResponse = errorResponse;
        this.name = exports.AuthenticationErrorName;
      }
    }
    exports.AuthenticationError = AuthenticationError;
    exports.AggregateAuthenticationErrorName = "AggregateAuthenticationError";
    class AggregateAuthenticationError extends Error {
      /**
       * The array of error objects that were thrown while trying to authenticate
       * with the credentials in a {@link ChainedTokenCredential}.
       */
      errors;
      constructor(errors2, errorMessage) {
        const errorDetail = errors2.join("\n");
        super(`${errorMessage}
${errorDetail}`);
        this.errors = errors2;
        this.name = exports.AggregateAuthenticationErrorName;
      }
    }
    exports.AggregateAuthenticationError = AggregateAuthenticationError;
    function convertOAuthErrorResponseToErrorResponse(errorBody) {
      return {
        error: errorBody.error,
        errorDescription: errorBody.error_description,
        correlationId: errorBody.correlation_id,
        errorCodes: errorBody.error_codes,
        timestamp: errorBody.timestamp,
        traceId: errorBody.trace_id
      };
    }
    class AuthenticationRequiredError extends Error {
      /**
       * The list of scopes for which the token will have access.
       */
      scopes;
      /**
       * The options passed to the getToken request.
       */
      getTokenOptions;
      constructor(options) {
        super(options.message, options.cause ? { cause: options.cause } : void 0);
        this.scopes = options.scopes;
        this.getTokenOptions = options.getTokenOptions;
        this.name = "AuthenticationRequiredError";
      }
    }
    exports.AuthenticationRequiredError = AuthenticationRequiredError;
  })(errors);
  return errors;
}
var logging = {};
var hasRequiredLogging;
function requireLogging() {
  if (hasRequiredLogging) return logging;
  hasRequiredLogging = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.logger = void 0;
    exports.processEnvVars = processEnvVars;
    exports.logEnvVars = logEnvVars;
    exports.formatSuccess = formatSuccess;
    exports.formatError = formatError;
    exports.credentialLoggerInstance = credentialLoggerInstance;
    exports.credentialLogger = credentialLogger;
    const logger_1 = /* @__PURE__ */ requireCommonjs$1();
    exports.logger = (0, logger_1.createClientLogger)("identity");
    function processEnvVars(supportedEnvVars) {
      return supportedEnvVars.reduce((acc, envVariable) => {
        if (process.env[envVariable]) {
          acc.assigned.push(envVariable);
        } else {
          acc.missing.push(envVariable);
        }
        return acc;
      }, { missing: [], assigned: [] });
    }
    function logEnvVars(credentialName, supportedEnvVars) {
      const { assigned } = processEnvVars(supportedEnvVars);
      exports.logger.info(`${credentialName} => Found the following environment variables: ${assigned.join(", ")}`);
    }
    function formatSuccess(scope) {
      return `SUCCESS. Scopes: ${Array.isArray(scope) ? scope.join(", ") : scope}.`;
    }
    function formatError(scope, error) {
      let message = "ERROR.";
      if (scope?.length) {
        message += ` Scopes: ${Array.isArray(scope) ? scope.join(", ") : scope}.`;
      }
      return `${message} Error message: ${typeof error === "string" ? error : error.message}.`;
    }
    function credentialLoggerInstance(title, parent, log = exports.logger) {
      const fullTitle = parent ? `${parent.fullTitle} ${title}` : title;
      function info(message) {
        log.info(`${fullTitle} =>`, message);
      }
      function warning(message) {
        log.warning(`${fullTitle} =>`, message);
      }
      function verbose(message) {
        log.verbose(`${fullTitle} =>`, message);
      }
      function error(message) {
        log.error(`${fullTitle} =>`, message);
      }
      return {
        title,
        fullTitle,
        info,
        warning,
        verbose,
        error
      };
    }
    function credentialLogger(title, log = exports.logger) {
      const credLogger = credentialLoggerInstance(title, void 0, log);
      return {
        ...credLogger,
        parent: log,
        getToken: credentialLoggerInstance("=> getToken()", credLogger, log)
      };
    }
  })(logging);
  return logging;
}
var tracing = {};
var hasRequiredTracing;
function requireTracing() {
  if (hasRequiredTracing) return tracing;
  hasRequiredTracing = 1;
  Object.defineProperty(tracing, "__esModule", { value: true });
  tracing.tracingClient = void 0;
  const constants_js_1 = requireConstants();
  const core_tracing_1 = /* @__PURE__ */ requireCommonjs$2();
  tracing.tracingClient = (0, core_tracing_1.createTracingClient)({
    namespace: "Microsoft.AAD",
    packageName: "@azure/identity",
    packageVersion: constants_js_1.SDK_VERSION
  });
  return tracing;
}
var hasRequiredChainedTokenCredential;
function requireChainedTokenCredential() {
  if (hasRequiredChainedTokenCredential) return chainedTokenCredential;
  hasRequiredChainedTokenCredential = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChainedTokenCredential = exports.logger = void 0;
    const errors_js_1 = requireErrors();
    const logging_js_1 = requireLogging();
    const tracing_js_1 = requireTracing();
    exports.logger = (0, logging_js_1.credentialLogger)("ChainedTokenCredential");
    class ChainedTokenCredential {
      _sources = [];
      /**
       * Creates an instance of ChainedTokenCredential using the given credentials.
       *
       * @param sources - `TokenCredential` implementations to be tried in order.
       *
       * Example usage:
       * ```ts snippet:chained_token_credential_example
       * import { ClientSecretCredential, ChainedTokenCredential } from "@azure/identity";
       *
       * const tenantId = "<tenant-id>";
       * const clientId = "<client-id>";
       * const clientSecret = "<client-secret>";
       * const anotherClientId = "<another-client-id>";
       * const anotherSecret = "<another-client-secret>";
       *
       * const firstCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
       * const secondCredential = new ClientSecretCredential(tenantId, anotherClientId, anotherSecret);
       *
       * const credentialChain = new ChainedTokenCredential(firstCredential, secondCredential);
       * ```
       */
      constructor(...sources) {
        this._sources = sources;
      }
      /**
       * Returns the first access token returned by one of the chained
       * `TokenCredential` implementations.  Throws an {@link AggregateAuthenticationError}
       * when one or more credentials throws an {@link AuthenticationError} and
       * no credentials have returned an access token.
       *
       * This method is called automatically by Azure SDK client libraries. You may call this method
       * directly, but you must also handle token caching and token refreshing.
       *
       * @param scopes - The list of scopes for which the token will have access.
       * @param options - The options used to configure any requests this
       *                `TokenCredential` implementation might make.
       */
      async getToken(scopes, options = {}) {
        const { token } = await this.getTokenInternal(scopes, options);
        return token;
      }
      async getTokenInternal(scopes, options = {}) {
        let token = null;
        let successfulCredential;
        const errors2 = [];
        return tracing_js_1.tracingClient.withSpan("ChainedTokenCredential.getToken", options, async (updatedOptions) => {
          for (let i = 0; i < this._sources.length && token === null; i++) {
            try {
              token = await this._sources[i].getToken(scopes, updatedOptions);
              successfulCredential = this._sources[i];
            } catch (err) {
              if (err.name === "CredentialUnavailableError" || err.name === "AuthenticationRequiredError") {
                errors2.push(err);
              } else {
                exports.logger.getToken.info((0, logging_js_1.formatError)(scopes, err));
                throw err;
              }
            }
          }
          if (!token && errors2.length > 0) {
            const err = new errors_js_1.AggregateAuthenticationError(errors2, "ChainedTokenCredential authentication failed.");
            exports.logger.getToken.info((0, logging_js_1.formatError)(scopes, err));
            throw err;
          }
          exports.logger.getToken.info(`Result for ${successfulCredential.constructor.name}: ${(0, logging_js_1.formatSuccess)(scopes)}`);
          if (token === null) {
            throw new errors_js_1.CredentialUnavailableError("Failed to retrieve a valid token");
          }
          return { token, successfulCredential };
        });
      }
    }
    exports.ChainedTokenCredential = ChainedTokenCredential;
  })(chainedTokenCredential);
  return chainedTokenCredential;
}
var defaultAzureCredentialFunctions = {};
var environmentCredential = {};
var clientCertificateCredential = {};
var msalClient = {};
var utils$1 = {};
var msal = {};
var hasRequiredMsal;
function requireMsal() {
  if (hasRequiredMsal) return msal;
  hasRequiredMsal = 1;
  Object.defineProperty(msal, "__esModule", { value: true });
  msal.msalCommon = void 0;
  const tslib_1 = /* @__PURE__ */ requireTslib();
  const msalCommon = tslib_1.__importStar(requireMsalNode());
  msal.msalCommon = msalCommon;
  return msal;
}
var hasRequiredUtils$1;
function requireUtils$1() {
  if (hasRequiredUtils$1) return utils$1;
  hasRequiredUtils$1 = 1;
  Object.defineProperty(utils$1, "__esModule", { value: true });
  utils$1.defaultLoggerCallback = void 0;
  utils$1.ensureValidMsalToken = ensureValidMsalToken;
  utils$1.getAuthorityHost = getAuthorityHost;
  utils$1.getAuthority = getAuthority;
  utils$1.getKnownAuthorities = getKnownAuthorities;
  utils$1.getMSALLogLevel = getMSALLogLevel;
  utils$1.randomUUID = randomUUID;
  utils$1.handleMsalError = handleMsalError;
  utils$1.publicToMsal = publicToMsal;
  utils$1.msalToPublic = msalToPublic;
  utils$1.serializeAuthenticationRecord = serializeAuthenticationRecord;
  utils$1.deserializeAuthenticationRecord = deserializeAuthenticationRecord;
  const errors_js_1 = requireErrors();
  const logging_js_1 = requireLogging();
  const constants_js_1 = requireConstants();
  const core_util_1 = /* @__PURE__ */ requireCommonjs$3();
  const abort_controller_1 = /* @__PURE__ */ requireCommonjs$4();
  const msal_js_1 = requireMsal();
  const logger = (0, logging_js_1.credentialLogger)("IdentityUtils");
  const LatestAuthenticationRecordVersion = "1.0";
  function ensureValidMsalToken(scopes, msalToken, getTokenOptions) {
    const error = (message) => {
      logger.getToken.info(message);
      return new errors_js_1.AuthenticationRequiredError({
        scopes: Array.isArray(scopes) ? scopes : [scopes],
        getTokenOptions,
        message
      });
    };
    if (!msalToken) {
      throw error("No response");
    }
    if (!msalToken.expiresOn) {
      throw error(`Response had no "expiresOn" property.`);
    }
    if (!msalToken.accessToken) {
      throw error(`Response had no "accessToken" property.`);
    }
  }
  function getAuthorityHost(options) {
    let authorityHost = options?.authorityHost;
    if (!authorityHost && core_util_1.isNodeLike) {
      authorityHost = process.env.AZURE_AUTHORITY_HOST;
    }
    return authorityHost ?? constants_js_1.DefaultAuthorityHost;
  }
  function getAuthority(tenantId, host) {
    if (!host) {
      host = constants_js_1.DefaultAuthorityHost;
    }
    if (new RegExp(`${tenantId}/?$`).test(host)) {
      return host;
    }
    if (host.endsWith("/")) {
      return host + tenantId;
    } else {
      return `${host}/${tenantId}`;
    }
  }
  function getKnownAuthorities(tenantId, authorityHost, disableInstanceDiscovery) {
    if (tenantId === "adfs" && authorityHost || disableInstanceDiscovery) {
      return [authorityHost];
    }
    return [];
  }
  const defaultLoggerCallback = (credLogger, platform = core_util_1.isNode ? "Node" : "Browser") => (level, message, containsPii) => {
    if (containsPii) {
      return;
    }
    switch (level) {
      case msal_js_1.msalCommon.LogLevel.Error:
        credLogger.info(`MSAL ${platform} V2 error: ${message}`);
        return;
      case msal_js_1.msalCommon.LogLevel.Info:
        credLogger.info(`MSAL ${platform} V2 info message: ${message}`);
        return;
      case msal_js_1.msalCommon.LogLevel.Verbose:
        credLogger.info(`MSAL ${platform} V2 verbose message: ${message}`);
        return;
      case msal_js_1.msalCommon.LogLevel.Warning:
        credLogger.info(`MSAL ${platform} V2 warning: ${message}`);
        return;
    }
  };
  utils$1.defaultLoggerCallback = defaultLoggerCallback;
  function getMSALLogLevel(logLevel) {
    switch (logLevel) {
      case "error":
        return msal_js_1.msalCommon.LogLevel.Error;
      case "info":
        return msal_js_1.msalCommon.LogLevel.Info;
      case "verbose":
        return msal_js_1.msalCommon.LogLevel.Verbose;
      case "warning":
        return msal_js_1.msalCommon.LogLevel.Warning;
      default:
        return msal_js_1.msalCommon.LogLevel.Info;
    }
  }
  function randomUUID() {
    return (0, core_util_1.randomUUID)();
  }
  function handleMsalError(scopes, error, getTokenOptions) {
    if (error.name === "AuthError" || error.name === "ClientAuthError" || error.name === "BrowserAuthError") {
      const msalError = error;
      switch (msalError.errorCode) {
        case "endpoints_resolution_error":
          logger.info((0, logging_js_1.formatError)(scopes, error.message));
          return new errors_js_1.CredentialUnavailableError(error.message);
        case "device_code_polling_cancelled":
          return new abort_controller_1.AbortError("The authentication has been aborted by the caller.");
        case "consent_required":
        case "interaction_required":
        case "login_required":
          logger.info((0, logging_js_1.formatError)(scopes, `Authentication returned errorCode ${msalError.errorCode}`));
          break;
        default:
          logger.info((0, logging_js_1.formatError)(scopes, `Failed to acquire token: ${error.message}`));
          break;
      }
    }
    if (error.name === "ClientConfigurationError" || error.name === "BrowserConfigurationAuthError" || error.name === "AbortError" || error.name === "AuthenticationError") {
      return error;
    }
    if (error.name === "NativeAuthError") {
      logger.info((0, logging_js_1.formatError)(scopes, `Error from the native broker: ${error.message} with status code: ${error.statusCode}`));
      return error;
    }
    return new errors_js_1.AuthenticationRequiredError({ scopes, getTokenOptions, message: error.message });
  }
  function publicToMsal(account) {
    return {
      localAccountId: account.homeAccountId,
      environment: account.authority,
      username: account.username,
      homeAccountId: account.homeAccountId,
      tenantId: account.tenantId
    };
  }
  function msalToPublic(clientId, account) {
    const record = {
      authority: account.environment ?? constants_js_1.DefaultAuthority,
      homeAccountId: account.homeAccountId,
      tenantId: account.tenantId || constants_js_1.DefaultTenantId,
      username: account.username,
      clientId,
      version: LatestAuthenticationRecordVersion
    };
    return record;
  }
  function serializeAuthenticationRecord(record) {
    return JSON.stringify(record);
  }
  function deserializeAuthenticationRecord(serializedRecord) {
    const parsed = JSON.parse(serializedRecord);
    if (parsed.version && parsed.version !== LatestAuthenticationRecordVersion) {
      throw Error("Unsupported AuthenticationRecord version");
    }
    return parsed;
  }
  return utils$1;
}
var identityClient = {};
var identityTokenEndpoint = {};
var hasRequiredIdentityTokenEndpoint;
function requireIdentityTokenEndpoint() {
  if (hasRequiredIdentityTokenEndpoint) return identityTokenEndpoint;
  hasRequiredIdentityTokenEndpoint = 1;
  Object.defineProperty(identityTokenEndpoint, "__esModule", { value: true });
  identityTokenEndpoint.getIdentityTokenEndpointSuffix = getIdentityTokenEndpointSuffix;
  function getIdentityTokenEndpointSuffix(tenantId) {
    if (tenantId === "adfs") {
      return "oauth2/token";
    } else {
      return "oauth2/v2.0/token";
    }
  }
  return identityTokenEndpoint;
}
var utils = {};
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  Object.defineProperty(utils, "__esModule", { value: true });
  utils.serviceFabricErrorMessage = void 0;
  utils.mapScopesToResource = mapScopesToResource;
  utils.parseExpirationTimestamp = parseExpirationTimestamp;
  utils.parseRefreshTimestamp = parseRefreshTimestamp;
  const DefaultScopeSuffix = "/.default";
  utils.serviceFabricErrorMessage = "Specifying a `clientId` or `resourceId` is not supported by the Service Fabric managed identity environment. The managed identity configuration is determined by the Service Fabric cluster resource configuration. See https://aka.ms/servicefabricmi for more information";
  function mapScopesToResource(scopes) {
    let scope = "";
    if (Array.isArray(scopes)) {
      if (scopes.length !== 1) {
        return;
      }
      scope = scopes[0];
    } else if (typeof scopes === "string") {
      scope = scopes;
    }
    if (!scope.endsWith(DefaultScopeSuffix)) {
      return scope;
    }
    return scope.substr(0, scope.lastIndexOf(DefaultScopeSuffix));
  }
  function parseExpirationTimestamp(body) {
    if (typeof body.expires_on === "number") {
      return body.expires_on * 1e3;
    }
    if (typeof body.expires_on === "string") {
      const asNumber = +body.expires_on;
      if (!isNaN(asNumber)) {
        return asNumber * 1e3;
      }
      const asDate = Date.parse(body.expires_on);
      if (!isNaN(asDate)) {
        return asDate;
      }
    }
    if (typeof body.expires_in === "number") {
      return Date.now() + body.expires_in * 1e3;
    }
    throw new Error(`Failed to parse token expiration from body. expires_in="${body.expires_in}", expires_on="${body.expires_on}"`);
  }
  function parseRefreshTimestamp(body) {
    if (body.refresh_on) {
      if (typeof body.refresh_on === "number") {
        return body.refresh_on * 1e3;
      }
      if (typeof body.refresh_on === "string") {
        const asNumber = +body.refresh_on;
        if (!isNaN(asNumber)) {
          return asNumber * 1e3;
        }
        const asDate = Date.parse(body.refresh_on);
        if (!isNaN(asDate)) {
          return asDate;
        }
      }
      throw new Error(`Failed to parse refresh_on from body. refresh_on="${body.refresh_on}"`);
    } else {
      return void 0;
    }
  }
  return utils;
}
var hasRequiredIdentityClient;
function requireIdentityClient() {
  if (hasRequiredIdentityClient) return identityClient;
  hasRequiredIdentityClient = 1;
  Object.defineProperty(identityClient, "__esModule", { value: true });
  identityClient.IdentityClient = void 0;
  identityClient.getIdentityClientAuthorityHost = getIdentityClientAuthorityHost;
  const core_client_1 = /* @__PURE__ */ requireCommonjs$5();
  const core_util_1 = /* @__PURE__ */ requireCommonjs$3();
  const core_rest_pipeline_1 = /* @__PURE__ */ requireCommonjs$6();
  const errors_js_1 = requireErrors();
  const identityTokenEndpoint_js_1 = requireIdentityTokenEndpoint();
  const constants_js_1 = requireConstants();
  const tracing_js_1 = requireTracing();
  const logging_js_1 = requireLogging();
  const utils_js_1 = requireUtils();
  const noCorrelationId = "noCorrelationId";
  function getIdentityClientAuthorityHost(options) {
    let authorityHost = options?.authorityHost;
    if (core_util_1.isNode) {
      authorityHost = authorityHost ?? process.env.AZURE_AUTHORITY_HOST;
    }
    return authorityHost ?? constants_js_1.DefaultAuthorityHost;
  }
  class IdentityClient extends core_client_1.ServiceClient {
    authorityHost;
    allowLoggingAccountIdentifiers;
    abortControllers;
    allowInsecureConnection = false;
    // used for WorkloadIdentity
    tokenCredentialOptions;
    constructor(options) {
      const packageDetails = `azsdk-js-identity/${constants_js_1.SDK_VERSION}`;
      const userAgentPrefix = options?.userAgentOptions?.userAgentPrefix ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}` : `${packageDetails}`;
      const baseUri = getIdentityClientAuthorityHost(options);
      if (!baseUri.startsWith("https:")) {
        throw new Error("The authorityHost address must use the 'https' protocol.");
      }
      super({
        requestContentType: "application/json; charset=utf-8",
        retryOptions: {
          maxRetries: 3
        },
        ...options,
        userAgentOptions: {
          userAgentPrefix
        },
        baseUri
      });
      this.authorityHost = baseUri;
      this.abortControllers = /* @__PURE__ */ new Map();
      this.allowLoggingAccountIdentifiers = options?.loggingOptions?.allowLoggingAccountIdentifiers;
      this.tokenCredentialOptions = { ...options };
      if (options?.allowInsecureConnection) {
        this.allowInsecureConnection = options.allowInsecureConnection;
      }
    }
    async sendTokenRequest(request) {
      logging_js_1.logger.info(`IdentityClient: sending token request to [${request.url}]`);
      const response = await this.sendRequest(request);
      if (response.bodyAsText && (response.status === 200 || response.status === 201)) {
        const parsedBody = JSON.parse(response.bodyAsText);
        if (!parsedBody.access_token) {
          return null;
        }
        this.logIdentifiers(response);
        const token = {
          accessToken: {
            token: parsedBody.access_token,
            expiresOnTimestamp: (0, utils_js_1.parseExpirationTimestamp)(parsedBody),
            refreshAfterTimestamp: (0, utils_js_1.parseRefreshTimestamp)(parsedBody),
            tokenType: "Bearer"
          },
          refreshToken: parsedBody.refresh_token
        };
        logging_js_1.logger.info(`IdentityClient: [${request.url}] token acquired, expires on ${token.accessToken.expiresOnTimestamp}`);
        return token;
      } else {
        const error = new errors_js_1.AuthenticationError(response.status, response.bodyAsText);
        logging_js_1.logger.warning(`IdentityClient: authentication error. HTTP status: ${response.status}, ${error.errorResponse.errorDescription}`);
        throw error;
      }
    }
    async refreshAccessToken(tenantId, clientId, scopes, refreshToken, clientSecret, options = {}) {
      if (refreshToken === void 0) {
        return null;
      }
      logging_js_1.logger.info(`IdentityClient: refreshing access token with client ID: ${clientId}, scopes: ${scopes} started`);
      const refreshParams = {
        grant_type: "refresh_token",
        client_id: clientId,
        refresh_token: refreshToken,
        scope: scopes
      };
      if (clientSecret !== void 0) {
        refreshParams.client_secret = clientSecret;
      }
      const query = new URLSearchParams(refreshParams);
      return tracing_js_1.tracingClient.withSpan("IdentityClient.refreshAccessToken", options, async (updatedOptions) => {
        try {
          const urlSuffix = (0, identityTokenEndpoint_js_1.getIdentityTokenEndpointSuffix)(tenantId);
          const request = (0, core_rest_pipeline_1.createPipelineRequest)({
            url: `${this.authorityHost}/${tenantId}/${urlSuffix}`,
            method: "POST",
            body: query.toString(),
            abortSignal: options.abortSignal,
            headers: (0, core_rest_pipeline_1.createHttpHeaders)({
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded"
            }),
            tracingOptions: updatedOptions.tracingOptions
          });
          const response = await this.sendTokenRequest(request);
          logging_js_1.logger.info(`IdentityClient: refreshed token for client ID: ${clientId}`);
          return response;
        } catch (err) {
          if (err.name === errors_js_1.AuthenticationErrorName && err.errorResponse.error === "interaction_required") {
            logging_js_1.logger.info(`IdentityClient: interaction required for client ID: ${clientId}`);
            return null;
          } else {
            logging_js_1.logger.warning(`IdentityClient: failed refreshing token for client ID: ${clientId}: ${err}`);
            throw err;
          }
        }
      });
    }
    // Here is a custom layer that allows us to abort requests that go through MSAL,
    // since MSAL doesn't allow us to pass options all the way through.
    generateAbortSignal(correlationId) {
      const controller = new AbortController();
      const controllers = this.abortControllers.get(correlationId) || [];
      controllers.push(controller);
      this.abortControllers.set(correlationId, controllers);
      const existingOnAbort = controller.signal.onabort;
      controller.signal.onabort = (...params) => {
        this.abortControllers.set(correlationId, void 0);
        if (existingOnAbort) {
          existingOnAbort.apply(controller.signal, params);
        }
      };
      return controller.signal;
    }
    abortRequests(correlationId) {
      const key = correlationId || noCorrelationId;
      const controllers = [
        ...this.abortControllers.get(key) || [],
        // MSAL passes no correlation ID to the get requests...
        ...this.abortControllers.get(noCorrelationId) || []
      ];
      if (!controllers.length) {
        return;
      }
      for (const controller of controllers) {
        controller.abort();
      }
      this.abortControllers.set(key, void 0);
    }
    getCorrelationId(options) {
      const parameter = options?.body?.split("&").map((part) => part.split("=")).find(([key]) => key === "client-request-id");
      return parameter && parameter.length ? parameter[1] || noCorrelationId : noCorrelationId;
    }
    // The MSAL network module methods follow
    async sendGetRequestAsync(url, options) {
      const request = (0, core_rest_pipeline_1.createPipelineRequest)({
        url,
        method: "GET",
        body: options?.body,
        allowInsecureConnection: this.allowInsecureConnection,
        headers: (0, core_rest_pipeline_1.createHttpHeaders)(options?.headers),
        abortSignal: this.generateAbortSignal(noCorrelationId)
      });
      const response = await this.sendRequest(request);
      this.logIdentifiers(response);
      return {
        body: response.bodyAsText ? JSON.parse(response.bodyAsText) : void 0,
        headers: response.headers.toJSON(),
        status: response.status
      };
    }
    async sendPostRequestAsync(url, options) {
      const request = (0, core_rest_pipeline_1.createPipelineRequest)({
        url,
        method: "POST",
        body: options?.body,
        headers: (0, core_rest_pipeline_1.createHttpHeaders)(options?.headers),
        allowInsecureConnection: this.allowInsecureConnection,
        // MSAL doesn't send the correlation ID on the get requests.
        abortSignal: this.generateAbortSignal(this.getCorrelationId(options))
      });
      const response = await this.sendRequest(request);
      this.logIdentifiers(response);
      return {
        body: response.bodyAsText ? JSON.parse(response.bodyAsText) : void 0,
        headers: response.headers.toJSON(),
        status: response.status
      };
    }
    /**
     *
     * @internal
     */
    getTokenCredentialOptions() {
      return this.tokenCredentialOptions;
    }
    /**
     * If allowLoggingAccountIdentifiers was set on the constructor options
     * we try to log the account identifiers by parsing the received access token.
     *
     * The account identifiers we try to log are:
     * - `appid`: The application or Client Identifier.
     * - `upn`: User Principal Name.
     *   - It might not be available in some authentication scenarios.
     *   - If it's not available, we put a placeholder: "No User Principal Name available".
     * - `tid`: Tenant Identifier.
     * - `oid`: Object Identifier of the authenticated user.
     */
    logIdentifiers(response) {
      if (!this.allowLoggingAccountIdentifiers || !response.bodyAsText) {
        return;
      }
      const unavailableUpn = "No User Principal Name available";
      try {
        const parsed = response.parsedBody || JSON.parse(response.bodyAsText);
        const accessToken = parsed.access_token;
        if (!accessToken) {
          return;
        }
        const base64Metadata = accessToken.split(".")[1];
        const { appid, upn, tid, oid } = JSON.parse(Buffer.from(base64Metadata, "base64").toString("utf8"));
        logging_js_1.logger.info(`[Authenticated account] Client ID: ${appid}. Tenant ID: ${tid}. User Principal Name: ${upn || unavailableUpn}. Object ID (user): ${oid}`);
      } catch (e) {
        logging_js_1.logger.warning("allowLoggingAccountIdentifiers was set, but we couldn't log the account information. Error:", e.message);
      }
    }
  }
  identityClient.IdentityClient = IdentityClient;
  return identityClient;
}
var regionalAuthority = {};
var hasRequiredRegionalAuthority;
function requireRegionalAuthority() {
  if (hasRequiredRegionalAuthority) return regionalAuthority;
  hasRequiredRegionalAuthority = 1;
  Object.defineProperty(regionalAuthority, "__esModule", { value: true });
  regionalAuthority.RegionalAuthority = void 0;
  regionalAuthority.calculateRegionalAuthority = calculateRegionalAuthority;
  var RegionalAuthority;
  (function(RegionalAuthority2) {
    RegionalAuthority2["AutoDiscoverRegion"] = "AutoDiscoverRegion";
    RegionalAuthority2["USWest"] = "westus";
    RegionalAuthority2["USWest2"] = "westus2";
    RegionalAuthority2["USCentral"] = "centralus";
    RegionalAuthority2["USEast"] = "eastus";
    RegionalAuthority2["USEast2"] = "eastus2";
    RegionalAuthority2["USNorthCentral"] = "northcentralus";
    RegionalAuthority2["USSouthCentral"] = "southcentralus";
    RegionalAuthority2["USWestCentral"] = "westcentralus";
    RegionalAuthority2["CanadaCentral"] = "canadacentral";
    RegionalAuthority2["CanadaEast"] = "canadaeast";
    RegionalAuthority2["BrazilSouth"] = "brazilsouth";
    RegionalAuthority2["EuropeNorth"] = "northeurope";
    RegionalAuthority2["EuropeWest"] = "westeurope";
    RegionalAuthority2["UKSouth"] = "uksouth";
    RegionalAuthority2["UKWest"] = "ukwest";
    RegionalAuthority2["FranceCentral"] = "francecentral";
    RegionalAuthority2["FranceSouth"] = "francesouth";
    RegionalAuthority2["SwitzerlandNorth"] = "switzerlandnorth";
    RegionalAuthority2["SwitzerlandWest"] = "switzerlandwest";
    RegionalAuthority2["GermanyNorth"] = "germanynorth";
    RegionalAuthority2["GermanyWestCentral"] = "germanywestcentral";
    RegionalAuthority2["NorwayWest"] = "norwaywest";
    RegionalAuthority2["NorwayEast"] = "norwayeast";
    RegionalAuthority2["AsiaEast"] = "eastasia";
    RegionalAuthority2["AsiaSouthEast"] = "southeastasia";
    RegionalAuthority2["JapanEast"] = "japaneast";
    RegionalAuthority2["JapanWest"] = "japanwest";
    RegionalAuthority2["AustraliaEast"] = "australiaeast";
    RegionalAuthority2["AustraliaSouthEast"] = "australiasoutheast";
    RegionalAuthority2["AustraliaCentral"] = "australiacentral";
    RegionalAuthority2["AustraliaCentral2"] = "australiacentral2";
    RegionalAuthority2["IndiaCentral"] = "centralindia";
    RegionalAuthority2["IndiaSouth"] = "southindia";
    RegionalAuthority2["IndiaWest"] = "westindia";
    RegionalAuthority2["KoreaSouth"] = "koreasouth";
    RegionalAuthority2["KoreaCentral"] = "koreacentral";
    RegionalAuthority2["UAECentral"] = "uaecentral";
    RegionalAuthority2["UAENorth"] = "uaenorth";
    RegionalAuthority2["SouthAfricaNorth"] = "southafricanorth";
    RegionalAuthority2["SouthAfricaWest"] = "southafricawest";
    RegionalAuthority2["ChinaNorth"] = "chinanorth";
    RegionalAuthority2["ChinaEast"] = "chinaeast";
    RegionalAuthority2["ChinaNorth2"] = "chinanorth2";
    RegionalAuthority2["ChinaEast2"] = "chinaeast2";
    RegionalAuthority2["GermanyCentral"] = "germanycentral";
    RegionalAuthority2["GermanyNorthEast"] = "germanynortheast";
    RegionalAuthority2["GovernmentUSVirginia"] = "usgovvirginia";
    RegionalAuthority2["GovernmentUSIowa"] = "usgoviowa";
    RegionalAuthority2["GovernmentUSArizona"] = "usgovarizona";
    RegionalAuthority2["GovernmentUSTexas"] = "usgovtexas";
    RegionalAuthority2["GovernmentUSDodEast"] = "usdodeast";
    RegionalAuthority2["GovernmentUSDodCentral"] = "usdodcentral";
  })(RegionalAuthority || (regionalAuthority.RegionalAuthority = RegionalAuthority = {}));
  function calculateRegionalAuthority(regionalAuthority2) {
    let azureRegion = regionalAuthority2;
    if (azureRegion === void 0 && globalThis.process?.env?.AZURE_REGIONAL_AUTHORITY_NAME !== void 0) {
      azureRegion = process.env.AZURE_REGIONAL_AUTHORITY_NAME;
    }
    if (azureRegion === RegionalAuthority.AutoDiscoverRegion) {
      return "AUTO_DISCOVER";
    }
    return azureRegion;
  }
  return regionalAuthority;
}
var tenantIdUtils = {};
var processMultiTenantRequest = {};
var hasRequiredProcessMultiTenantRequest;
function requireProcessMultiTenantRequest() {
  if (hasRequiredProcessMultiTenantRequest) return processMultiTenantRequest;
  hasRequiredProcessMultiTenantRequest = 1;
  Object.defineProperty(processMultiTenantRequest, "__esModule", { value: true });
  processMultiTenantRequest.processMultiTenantRequest = processMultiTenantRequest$1;
  const errors_js_1 = requireErrors();
  function createConfigurationErrorMessage(tenantId) {
    return `The current credential is not configured to acquire tokens for tenant ${tenantId}. To enable acquiring tokens for this tenant add it to the AdditionallyAllowedTenants on the credential options, or add "*" to AdditionallyAllowedTenants to allow acquiring tokens for any tenant.`;
  }
  function processMultiTenantRequest$1(tenantId, getTokenOptions, additionallyAllowedTenantIds = [], logger) {
    let resolvedTenantId;
    if (process.env.AZURE_IDENTITY_DISABLE_MULTITENANTAUTH) {
      resolvedTenantId = tenantId;
    } else if (tenantId === "adfs") {
      resolvedTenantId = tenantId;
    } else {
      resolvedTenantId = getTokenOptions?.tenantId ?? tenantId;
    }
    if (tenantId && resolvedTenantId !== tenantId && !additionallyAllowedTenantIds.includes("*") && !additionallyAllowedTenantIds.some((t) => t.localeCompare(resolvedTenantId) === 0)) {
      const message = createConfigurationErrorMessage(resolvedTenantId);
      logger?.info(message);
      throw new errors_js_1.CredentialUnavailableError(message);
    }
    return resolvedTenantId;
  }
  return processMultiTenantRequest;
}
var hasRequiredTenantIdUtils;
function requireTenantIdUtils() {
  if (hasRequiredTenantIdUtils) return tenantIdUtils;
  hasRequiredTenantIdUtils = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.processMultiTenantRequest = void 0;
    exports.checkTenantId = checkTenantId;
    exports.resolveTenantId = resolveTenantId;
    exports.resolveAdditionallyAllowedTenantIds = resolveAdditionallyAllowedTenantIds;
    const constants_js_1 = requireConstants();
    const logging_js_1 = requireLogging();
    var processMultiTenantRequest_js_1 = requireProcessMultiTenantRequest();
    Object.defineProperty(exports, "processMultiTenantRequest", { enumerable: true, get: function() {
      return processMultiTenantRequest_js_1.processMultiTenantRequest;
    } });
    function checkTenantId(logger, tenantId) {
      if (!tenantId.match(/^[0-9a-zA-Z-.]+$/)) {
        const error = new Error("Invalid tenant id provided. You can locate your tenant id by following the instructions listed here: https://learn.microsoft.com/partner-center/find-ids-and-domain-names.");
        logger.info((0, logging_js_1.formatError)("", error));
        throw error;
      }
    }
    function resolveTenantId(logger, tenantId, clientId) {
      if (tenantId) {
        checkTenantId(logger, tenantId);
        return tenantId;
      }
      if (!clientId) {
        clientId = constants_js_1.DeveloperSignOnClientId;
      }
      if (clientId !== constants_js_1.DeveloperSignOnClientId) {
        return "common";
      }
      return "organizations";
    }
    function resolveAdditionallyAllowedTenantIds(additionallyAllowedTenants) {
      if (!additionallyAllowedTenants || additionallyAllowedTenants.length === 0) {
        return [];
      }
      if (additionallyAllowedTenants.includes("*")) {
        return constants_js_1.ALL_TENANTS;
      }
      return additionallyAllowedTenants;
    }
  })(tenantIdUtils);
  return tenantIdUtils;
}
var hasRequiredMsalClient;
function requireMsalClient() {
  if (hasRequiredMsalClient) return msalClient;
  hasRequiredMsalClient = 1;
  Object.defineProperty(msalClient, "__esModule", { value: true });
  msalClient.generateMsalConfiguration = generateMsalConfiguration;
  msalClient.createMsalClient = createMsalClient;
  const tslib_1 = /* @__PURE__ */ requireTslib();
  const msal2 = tslib_1.__importStar(requireMsalNode());
  const logging_js_1 = requireLogging();
  const msalPlugins_js_1 = requireMsalPlugins();
  const utils_js_1 = requireUtils$1();
  const errors_js_1 = requireErrors();
  const identityClient_js_1 = requireIdentityClient();
  const regionalAuthority_js_1 = requireRegionalAuthority();
  const logger_1 = /* @__PURE__ */ requireCommonjs$1();
  const tenantIdUtils_js_1 = requireTenantIdUtils();
  const msalLogger = (0, logging_js_1.credentialLogger)("MsalClient");
  function generateMsalConfiguration(clientId, tenantId, msalClientOptions = {}) {
    const resolvedTenant = (0, tenantIdUtils_js_1.resolveTenantId)(msalClientOptions.logger ?? msalLogger, tenantId, clientId);
    const authority = (0, utils_js_1.getAuthority)(resolvedTenant, (0, utils_js_1.getAuthorityHost)(msalClientOptions));
    const httpClient = new identityClient_js_1.IdentityClient({
      ...msalClientOptions.tokenCredentialOptions,
      authorityHost: authority,
      loggingOptions: msalClientOptions.loggingOptions
    });
    const msalConfig = {
      auth: {
        clientId,
        authority,
        knownAuthorities: (0, utils_js_1.getKnownAuthorities)(resolvedTenant, authority, msalClientOptions.disableInstanceDiscovery)
      },
      system: {
        networkClient: httpClient,
        loggerOptions: {
          loggerCallback: (0, utils_js_1.defaultLoggerCallback)(msalClientOptions.logger ?? msalLogger),
          logLevel: (0, utils_js_1.getMSALLogLevel)((0, logger_1.getLogLevel)()),
          piiLoggingEnabled: msalClientOptions.loggingOptions?.enableUnsafeSupportLogging
        }
      }
    };
    return msalConfig;
  }
  function createMsalClient(clientId, tenantId, createMsalClientOptions = {}) {
    const state = {
      msalConfig: generateMsalConfiguration(clientId, tenantId, createMsalClientOptions),
      cachedAccount: createMsalClientOptions.authenticationRecord ? (0, utils_js_1.publicToMsal)(createMsalClientOptions.authenticationRecord) : null,
      pluginConfiguration: msalPlugins_js_1.msalPlugins.generatePluginConfiguration(createMsalClientOptions),
      logger: createMsalClientOptions.logger ?? msalLogger
    };
    const publicApps = /* @__PURE__ */ new Map();
    async function getPublicApp(options = {}) {
      const appKey = options.enableCae ? "CAE" : "default";
      let publicClientApp = publicApps.get(appKey);
      if (publicClientApp) {
        state.logger.getToken.info("Existing PublicClientApplication found in cache, returning it.");
        return publicClientApp;
      }
      state.logger.getToken.info(`Creating new PublicClientApplication with CAE ${options.enableCae ? "enabled" : "disabled"}.`);
      const cachePlugin = options.enableCae ? state.pluginConfiguration.cache.cachePluginCae : state.pluginConfiguration.cache.cachePlugin;
      state.msalConfig.auth.clientCapabilities = options.enableCae ? ["cp1"] : void 0;
      publicClientApp = new msal2.PublicClientApplication({
        ...state.msalConfig,
        broker: { nativeBrokerPlugin: state.pluginConfiguration.broker.nativeBrokerPlugin },
        cache: { cachePlugin: await cachePlugin }
      });
      publicApps.set(appKey, publicClientApp);
      return publicClientApp;
    }
    const confidentialApps = /* @__PURE__ */ new Map();
    async function getConfidentialApp(options = {}) {
      const appKey = options.enableCae ? "CAE" : "default";
      let confidentialClientApp = confidentialApps.get(appKey);
      if (confidentialClientApp) {
        state.logger.getToken.info("Existing ConfidentialClientApplication found in cache, returning it.");
        return confidentialClientApp;
      }
      state.logger.getToken.info(`Creating new ConfidentialClientApplication with CAE ${options.enableCae ? "enabled" : "disabled"}.`);
      const cachePlugin = options.enableCae ? state.pluginConfiguration.cache.cachePluginCae : state.pluginConfiguration.cache.cachePlugin;
      state.msalConfig.auth.clientCapabilities = options.enableCae ? ["cp1"] : void 0;
      confidentialClientApp = new msal2.ConfidentialClientApplication({
        ...state.msalConfig,
        broker: { nativeBrokerPlugin: state.pluginConfiguration.broker.nativeBrokerPlugin },
        cache: { cachePlugin: await cachePlugin }
      });
      confidentialApps.set(appKey, confidentialClientApp);
      return confidentialClientApp;
    }
    async function getTokenSilent(app, scopes, options = {}) {
      if (state.cachedAccount === null) {
        state.logger.getToken.info("No cached account found in local state.");
        throw new errors_js_1.AuthenticationRequiredError({ scopes });
      }
      if (options.claims) {
        state.cachedClaims = options.claims;
      }
      const silentRequest = {
        account: state.cachedAccount,
        scopes,
        claims: state.cachedClaims
      };
      if (state.pluginConfiguration.broker.isEnabled) {
        silentRequest.extraQueryParameters ||= {};
        if (state.pluginConfiguration.broker.enableMsaPassthrough) {
          silentRequest.extraQueryParameters["msal_request_type"] = "consumer_passthrough";
        }
      }
      if (options.proofOfPossessionOptions) {
        silentRequest.shrNonce = options.proofOfPossessionOptions.nonce;
        silentRequest.authenticationScheme = "pop";
        silentRequest.resourceRequestMethod = options.proofOfPossessionOptions.resourceRequestMethod;
        silentRequest.resourceRequestUri = options.proofOfPossessionOptions.resourceRequestUrl;
      }
      state.logger.getToken.info("Attempting to acquire token silently");
      try {
        return await app.acquireTokenSilent(silentRequest);
      } catch (err) {
        throw (0, utils_js_1.handleMsalError)(scopes, err, options);
      }
    }
    function calculateRequestAuthority(options) {
      if (options?.tenantId) {
        return (0, utils_js_1.getAuthority)(options.tenantId, (0, utils_js_1.getAuthorityHost)(createMsalClientOptions));
      }
      return state.msalConfig.auth.authority;
    }
    async function withSilentAuthentication(msalApp, scopes, options, onAuthenticationRequired) {
      let response = null;
      try {
        response = await getTokenSilent(msalApp, scopes, options);
      } catch (e) {
        if (e.name !== "AuthenticationRequiredError") {
          throw e;
        }
        if (options.disableAutomaticAuthentication) {
          throw new errors_js_1.AuthenticationRequiredError({
            scopes,
            getTokenOptions: options,
            message: "Automatic authentication has been disabled. You may call the authentication() method."
          });
        }
      }
      if (response === null) {
        try {
          response = await onAuthenticationRequired();
        } catch (err) {
          throw (0, utils_js_1.handleMsalError)(scopes, err, options);
        }
      }
      (0, utils_js_1.ensureValidMsalToken)(scopes, response, options);
      state.cachedAccount = response?.account ?? null;
      state.logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
      return {
        token: response.accessToken,
        expiresOnTimestamp: response.expiresOn.getTime(),
        refreshAfterTimestamp: response.refreshOn?.getTime(),
        tokenType: response.tokenType
      };
    }
    async function getTokenByClientSecret(scopes, clientSecret, options = {}) {
      state.logger.getToken.info(`Attempting to acquire token using client secret`);
      state.msalConfig.auth.clientSecret = clientSecret;
      const msalApp = await getConfidentialApp(options);
      try {
        const response = await msalApp.acquireTokenByClientCredential({
          scopes,
          authority: calculateRequestAuthority(options),
          azureRegion: (0, regionalAuthority_js_1.calculateRegionalAuthority)(),
          claims: options?.claims
        });
        (0, utils_js_1.ensureValidMsalToken)(scopes, response, options);
        state.logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
        return {
          token: response.accessToken,
          expiresOnTimestamp: response.expiresOn.getTime(),
          refreshAfterTimestamp: response.refreshOn?.getTime(),
          tokenType: response.tokenType
        };
      } catch (err) {
        throw (0, utils_js_1.handleMsalError)(scopes, err, options);
      }
    }
    async function getTokenByClientAssertion(scopes, clientAssertion, options = {}) {
      state.logger.getToken.info(`Attempting to acquire token using client assertion`);
      state.msalConfig.auth.clientAssertion = clientAssertion;
      const msalApp = await getConfidentialApp(options);
      try {
        const response = await msalApp.acquireTokenByClientCredential({
          scopes,
          authority: calculateRequestAuthority(options),
          azureRegion: (0, regionalAuthority_js_1.calculateRegionalAuthority)(),
          claims: options?.claims,
          clientAssertion
        });
        (0, utils_js_1.ensureValidMsalToken)(scopes, response, options);
        state.logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
        return {
          token: response.accessToken,
          expiresOnTimestamp: response.expiresOn.getTime(),
          refreshAfterTimestamp: response.refreshOn?.getTime(),
          tokenType: response.tokenType
        };
      } catch (err) {
        throw (0, utils_js_1.handleMsalError)(scopes, err, options);
      }
    }
    async function getTokenByClientCertificate(scopes, certificate, options = {}) {
      state.logger.getToken.info(`Attempting to acquire token using client certificate`);
      state.msalConfig.auth.clientCertificate = certificate;
      const msalApp = await getConfidentialApp(options);
      try {
        const response = await msalApp.acquireTokenByClientCredential({
          scopes,
          authority: calculateRequestAuthority(options),
          azureRegion: (0, regionalAuthority_js_1.calculateRegionalAuthority)(),
          claims: options?.claims
        });
        (0, utils_js_1.ensureValidMsalToken)(scopes, response, options);
        state.logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
        return {
          token: response.accessToken,
          expiresOnTimestamp: response.expiresOn.getTime(),
          refreshAfterTimestamp: response.refreshOn?.getTime(),
          tokenType: response.tokenType
        };
      } catch (err) {
        throw (0, utils_js_1.handleMsalError)(scopes, err, options);
      }
    }
    async function getTokenByDeviceCode(scopes, deviceCodeCallback, options = {}) {
      state.logger.getToken.info(`Attempting to acquire token using device code`);
      const msalApp = await getPublicApp(options);
      return withSilentAuthentication(msalApp, scopes, options, () => {
        const requestOptions = {
          scopes,
          cancel: options?.abortSignal?.aborted ?? false,
          deviceCodeCallback,
          authority: calculateRequestAuthority(options),
          claims: options?.claims
        };
        const deviceCodeRequest = msalApp.acquireTokenByDeviceCode(requestOptions);
        if (options.abortSignal) {
          options.abortSignal.addEventListener("abort", () => {
            requestOptions.cancel = true;
          });
        }
        return deviceCodeRequest;
      });
    }
    async function getTokenByUsernamePassword(scopes, username, password, options = {}) {
      state.logger.getToken.info(`Attempting to acquire token using username and password`);
      const msalApp = await getPublicApp(options);
      return withSilentAuthentication(msalApp, scopes, options, () => {
        const requestOptions = {
          scopes,
          username,
          password,
          authority: calculateRequestAuthority(options),
          claims: options?.claims
        };
        return msalApp.acquireTokenByUsernamePassword(requestOptions);
      });
    }
    function getActiveAccount() {
      if (!state.cachedAccount) {
        return void 0;
      }
      return (0, utils_js_1.msalToPublic)(clientId, state.cachedAccount);
    }
    async function getTokenByAuthorizationCode(scopes, redirectUri, authorizationCode, clientSecret, options = {}) {
      state.logger.getToken.info(`Attempting to acquire token using authorization code`);
      let msalApp;
      if (clientSecret) {
        state.msalConfig.auth.clientSecret = clientSecret;
        msalApp = await getConfidentialApp(options);
      } else {
        msalApp = await getPublicApp(options);
      }
      return withSilentAuthentication(msalApp, scopes, options, () => {
        return msalApp.acquireTokenByCode({
          scopes,
          redirectUri,
          code: authorizationCode,
          authority: calculateRequestAuthority(options),
          claims: options?.claims
        });
      });
    }
    async function getTokenOnBehalfOf(scopes, userAssertionToken, clientCredentials, options = {}) {
      msalLogger.getToken.info(`Attempting to acquire token on behalf of another user`);
      if (typeof clientCredentials === "string") {
        msalLogger.getToken.info(`Using client secret for on behalf of flow`);
        state.msalConfig.auth.clientSecret = clientCredentials;
      } else if (typeof clientCredentials === "function") {
        msalLogger.getToken.info(`Using client assertion callback for on behalf of flow`);
        state.msalConfig.auth.clientAssertion = clientCredentials;
      } else {
        msalLogger.getToken.info(`Using client certificate for on behalf of flow`);
        state.msalConfig.auth.clientCertificate = clientCredentials;
      }
      const msalApp = await getConfidentialApp(options);
      try {
        const response = await msalApp.acquireTokenOnBehalfOf({
          scopes,
          authority: calculateRequestAuthority(options),
          claims: options.claims,
          oboAssertion: userAssertionToken
        });
        (0, utils_js_1.ensureValidMsalToken)(scopes, response, options);
        msalLogger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
        return {
          token: response.accessToken,
          expiresOnTimestamp: response.expiresOn.getTime(),
          refreshAfterTimestamp: response.refreshOn?.getTime(),
          tokenType: response.tokenType
        };
      } catch (err) {
        throw (0, utils_js_1.handleMsalError)(scopes, err, options);
      }
    }
    function createBaseInteractiveRequest(scopes, options) {
      return {
        openBrowser: async (url) => {
          const open = await import("../open.mjs");
          await open.default(url, { newInstance: true });
        },
        scopes,
        authority: calculateRequestAuthority(options),
        claims: options?.claims,
        loginHint: options?.loginHint,
        errorTemplate: options?.browserCustomizationOptions?.errorMessage,
        successTemplate: options?.browserCustomizationOptions?.successMessage,
        prompt: options?.loginHint ? "login" : "select_account"
      };
    }
    async function getBrokeredTokenInternal(scopes, useDefaultBrokerAccount, options = {}) {
      msalLogger.verbose("Authentication will resume through the broker");
      const app = await getPublicApp(options);
      const interactiveRequest = createBaseInteractiveRequest(scopes, options);
      if (state.pluginConfiguration.broker.parentWindowHandle) {
        interactiveRequest.windowHandle = Buffer.from(state.pluginConfiguration.broker.parentWindowHandle);
      } else {
        msalLogger.warning("Parent window handle is not specified for the broker. This may cause unexpected behavior. Please provide the parentWindowHandle.");
      }
      if (state.pluginConfiguration.broker.enableMsaPassthrough) {
        (interactiveRequest.extraQueryParameters ??= {})["msal_request_type"] = "consumer_passthrough";
      }
      if (useDefaultBrokerAccount) {
        interactiveRequest.prompt = "none";
        msalLogger.verbose("Attempting broker authentication using the default broker account");
      } else {
        msalLogger.verbose("Attempting broker authentication without the default broker account");
      }
      if (options.proofOfPossessionOptions) {
        interactiveRequest.shrNonce = options.proofOfPossessionOptions.nonce;
        interactiveRequest.authenticationScheme = "pop";
        interactiveRequest.resourceRequestMethod = options.proofOfPossessionOptions.resourceRequestMethod;
        interactiveRequest.resourceRequestUri = options.proofOfPossessionOptions.resourceRequestUrl;
      }
      try {
        return await app.acquireTokenInteractive(interactiveRequest);
      } catch (e) {
        msalLogger.verbose(`Failed to authenticate through the broker: ${e.message}`);
        if (options.disableAutomaticAuthentication) {
          throw new errors_js_1.AuthenticationRequiredError({
            scopes,
            getTokenOptions: options,
            message: "Cannot silently authenticate with default broker account."
          });
        }
        if (useDefaultBrokerAccount) {
          return getBrokeredTokenInternal(scopes, false, options);
        } else {
          throw e;
        }
      }
    }
    async function getBrokeredToken(scopes, useDefaultBrokerAccount, options = {}) {
      msalLogger.getToken.info(`Attempting to acquire token using brokered authentication with useDefaultBrokerAccount: ${useDefaultBrokerAccount}`);
      const response = await getBrokeredTokenInternal(scopes, useDefaultBrokerAccount, options);
      (0, utils_js_1.ensureValidMsalToken)(scopes, response, options);
      state.cachedAccount = response?.account ?? null;
      state.logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
      return {
        token: response.accessToken,
        expiresOnTimestamp: response.expiresOn.getTime(),
        refreshAfterTimestamp: response.refreshOn?.getTime(),
        tokenType: response.tokenType
      };
    }
    async function getTokenByInteractiveRequest(scopes, options = {}) {
      msalLogger.getToken.info(`Attempting to acquire token interactively`);
      const app = await getPublicApp(options);
      return withSilentAuthentication(app, scopes, options, async () => {
        const interactiveRequest = createBaseInteractiveRequest(scopes, options);
        if (state.pluginConfiguration.broker.isEnabled) {
          return getBrokeredTokenInternal(scopes, state.pluginConfiguration.broker.useDefaultBrokerAccount ?? false, options);
        }
        if (options.proofOfPossessionOptions) {
          interactiveRequest.shrNonce = options.proofOfPossessionOptions.nonce;
          interactiveRequest.authenticationScheme = "pop";
          interactiveRequest.resourceRequestMethod = options.proofOfPossessionOptions.resourceRequestMethod;
          interactiveRequest.resourceRequestUri = options.proofOfPossessionOptions.resourceRequestUrl;
        }
        return app.acquireTokenInteractive(interactiveRequest);
      });
    }
    return {
      getActiveAccount,
      getBrokeredToken,
      getTokenByClientSecret,
      getTokenByClientAssertion,
      getTokenByClientCertificate,
      getTokenByDeviceCode,
      getTokenByUsernamePassword,
      getTokenByAuthorizationCode,
      getTokenOnBehalfOf,
      getTokenByInteractiveRequest
    };
  }
  return msalClient;
}
var hasRequiredClientCertificateCredential;
function requireClientCertificateCredential() {
  if (hasRequiredClientCertificateCredential) return clientCertificateCredential;
  hasRequiredClientCertificateCredential = 1;
  Object.defineProperty(clientCertificateCredential, "__esModule", { value: true });
  clientCertificateCredential.ClientCertificateCredential = void 0;
  clientCertificateCredential.parseCertificate = parseCertificate;
  const msalClient_js_1 = requireMsalClient();
  const node_crypto_1 = require$$0;
  const tenantIdUtils_js_1 = requireTenantIdUtils();
  const logging_js_1 = requireLogging();
  const promises_1 = fs;
  const tracing_js_1 = requireTracing();
  const credentialName = "ClientCertificateCredential";
  const logger = (0, logging_js_1.credentialLogger)(credentialName);
  class ClientCertificateCredential {
    tenantId;
    additionallyAllowedTenantIds;
    certificateConfiguration;
    sendCertificateChain;
    msalClient;
    constructor(tenantId, clientId, certificatePathOrConfiguration, options = {}) {
      if (!tenantId || !clientId) {
        throw new Error(`${credentialName}: tenantId and clientId are required parameters.`);
      }
      this.tenantId = tenantId;
      this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
      this.sendCertificateChain = options.sendCertificateChain;
      this.certificateConfiguration = {
        ...typeof certificatePathOrConfiguration === "string" ? {
          certificatePath: certificatePathOrConfiguration
        } : certificatePathOrConfiguration
      };
      const certificate = this.certificateConfiguration.certificate;
      const certificatePath = this.certificateConfiguration.certificatePath;
      if (!this.certificateConfiguration || !(certificate || certificatePath)) {
        throw new Error(`${credentialName}: Provide either a PEM certificate in string form, or the path to that certificate in the filesystem. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`);
      }
      if (certificate && certificatePath) {
        throw new Error(`${credentialName}: To avoid unexpected behaviors, providing both the contents of a PEM certificate and the path to a PEM certificate is forbidden. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`);
      }
      this.msalClient = (0, msalClient_js_1.createMsalClient)(clientId, tenantId, {
        ...options,
        logger,
        tokenCredentialOptions: options
      });
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    async getToken(scopes, options = {}) {
      return tracing_js_1.tracingClient.withSpan(`${credentialName}.getToken`, options, async (newOptions) => {
        newOptions.tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, newOptions, this.additionallyAllowedTenantIds, logger);
        const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
        const certificate = await this.buildClientCertificate();
        return this.msalClient.getTokenByClientCertificate(arrayScopes, certificate, newOptions);
      });
    }
    async buildClientCertificate() {
      const parts = await parseCertificate(this.certificateConfiguration, this.sendCertificateChain ?? false);
      let privateKey;
      if (this.certificateConfiguration.certificatePassword !== void 0) {
        privateKey = (0, node_crypto_1.createPrivateKey)({
          key: parts.certificateContents,
          passphrase: this.certificateConfiguration.certificatePassword,
          format: "pem"
        }).export({
          format: "pem",
          type: "pkcs8"
        }).toString();
      } else {
        privateKey = parts.certificateContents;
      }
      return {
        thumbprint: parts.thumbprint,
        thumbprintSha256: parts.thumbprintSha256,
        privateKey,
        x5c: parts.x5c
      };
    }
  }
  clientCertificateCredential.ClientCertificateCredential = ClientCertificateCredential;
  async function parseCertificate(certificateConfiguration, sendCertificateChain) {
    const certificate = certificateConfiguration.certificate;
    const certificatePath = certificateConfiguration.certificatePath;
    const certificateContents = certificate || await (0, promises_1.readFile)(certificatePath, "utf8");
    const x5c = sendCertificateChain ? certificateContents : void 0;
    const certificatePattern = /(-+BEGIN CERTIFICATE-+)(\n\r?|\r\n?)([A-Za-z0-9+/\n\r]+=*)(\n\r?|\r\n?)(-+END CERTIFICATE-+)/g;
    const publicKeys = [];
    let match;
    do {
      match = certificatePattern.exec(certificateContents);
      if (match) {
        publicKeys.push(match[3]);
      }
    } while (match);
    if (publicKeys.length === 0) {
      throw new Error("The file at the specified path does not contain a PEM-encoded certificate.");
    }
    const thumbprint = (0, node_crypto_1.createHash)("sha1").update(Buffer.from(publicKeys[0], "base64")).digest("hex").toUpperCase();
    const thumbprintSha256 = (0, node_crypto_1.createHash)("sha256").update(Buffer.from(publicKeys[0], "base64")).digest("hex").toUpperCase();
    return {
      certificateContents,
      thumbprintSha256,
      thumbprint,
      x5c
    };
  }
  return clientCertificateCredential;
}
var clientSecretCredential = {};
var scopeUtils = {};
var hasRequiredScopeUtils;
function requireScopeUtils() {
  if (hasRequiredScopeUtils) return scopeUtils;
  hasRequiredScopeUtils = 1;
  Object.defineProperty(scopeUtils, "__esModule", { value: true });
  scopeUtils.ensureScopes = ensureScopes;
  scopeUtils.ensureValidScopeForDevTimeCreds = ensureValidScopeForDevTimeCreds;
  scopeUtils.getScopeResource = getScopeResource;
  const logging_js_1 = requireLogging();
  function ensureScopes(scopes) {
    return Array.isArray(scopes) ? scopes : [scopes];
  }
  function ensureValidScopeForDevTimeCreds(scope, logger) {
    if (!scope.match(/^[0-9a-zA-Z-_.:/]+$/)) {
      const error = new Error("Invalid scope was specified by the user or calling client");
      logger.getToken.info((0, logging_js_1.formatError)(scope, error));
      throw error;
    }
  }
  function getScopeResource(scope) {
    return scope.replace(/\/.default$/, "");
  }
  return scopeUtils;
}
var hasRequiredClientSecretCredential;
function requireClientSecretCredential() {
  if (hasRequiredClientSecretCredential) return clientSecretCredential;
  hasRequiredClientSecretCredential = 1;
  Object.defineProperty(clientSecretCredential, "__esModule", { value: true });
  clientSecretCredential.ClientSecretCredential = void 0;
  const msalClient_js_1 = requireMsalClient();
  const tenantIdUtils_js_1 = requireTenantIdUtils();
  const errors_js_1 = requireErrors();
  const logging_js_1 = requireLogging();
  const scopeUtils_js_1 = requireScopeUtils();
  const tracing_js_1 = requireTracing();
  const logger = (0, logging_js_1.credentialLogger)("ClientSecretCredential");
  class ClientSecretCredential {
    tenantId;
    additionallyAllowedTenantIds;
    msalClient;
    clientSecret;
    /**
     * Creates an instance of the ClientSecretCredential with the details
     * needed to authenticate against Microsoft Entra ID with a client
     * secret.
     *
     * @param tenantId - The Microsoft Entra tenant (directory) ID.
     * @param clientId - The client (application) ID of an App Registration in the tenant.
     * @param clientSecret - A client secret that was generated for the App Registration.
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(tenantId, clientId, clientSecret, options = {}) {
      if (!tenantId) {
        throw new errors_js_1.CredentialUnavailableError("ClientSecretCredential: tenantId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.");
      }
      if (!clientId) {
        throw new errors_js_1.CredentialUnavailableError("ClientSecretCredential: clientId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.");
      }
      if (!clientSecret) {
        throw new errors_js_1.CredentialUnavailableError("ClientSecretCredential: clientSecret is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.");
      }
      this.clientSecret = clientSecret;
      this.tenantId = tenantId;
      this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
      this.msalClient = (0, msalClient_js_1.createMsalClient)(clientId, tenantId, {
        ...options,
        logger,
        tokenCredentialOptions: options
      });
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    async getToken(scopes, options = {}) {
      return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions) => {
        newOptions.tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, newOptions, this.additionallyAllowedTenantIds, logger);
        const arrayScopes = (0, scopeUtils_js_1.ensureScopes)(scopes);
        return this.msalClient.getTokenByClientSecret(arrayScopes, this.clientSecret, newOptions);
      });
    }
  }
  clientSecretCredential.ClientSecretCredential = ClientSecretCredential;
  return clientSecretCredential;
}
var usernamePasswordCredential = {};
var hasRequiredUsernamePasswordCredential;
function requireUsernamePasswordCredential() {
  if (hasRequiredUsernamePasswordCredential) return usernamePasswordCredential;
  hasRequiredUsernamePasswordCredential = 1;
  Object.defineProperty(usernamePasswordCredential, "__esModule", { value: true });
  usernamePasswordCredential.UsernamePasswordCredential = void 0;
  const msalClient_js_1 = requireMsalClient();
  const tenantIdUtils_js_1 = requireTenantIdUtils();
  const errors_js_1 = requireErrors();
  const logging_js_1 = requireLogging();
  const scopeUtils_js_1 = requireScopeUtils();
  const tracing_js_1 = requireTracing();
  const logger = (0, logging_js_1.credentialLogger)("UsernamePasswordCredential");
  class UsernamePasswordCredential {
    tenantId;
    additionallyAllowedTenantIds;
    msalClient;
    username;
    password;
    /**
     * Creates an instance of the UsernamePasswordCredential with the details
     * needed to authenticate against Microsoft Entra ID with a username
     * and password.
     *
     * @param tenantId - The Microsoft Entra tenant (directory).
     * @param clientId - The client (application) ID of an App Registration in the tenant.
     * @param username - The user account's e-mail address (user name).
     * @param password - The user account's account password
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(tenantId, clientId, username, password, options = {}) {
      if (!tenantId) {
        throw new errors_js_1.CredentialUnavailableError("UsernamePasswordCredential: tenantId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");
      }
      if (!clientId) {
        throw new errors_js_1.CredentialUnavailableError("UsernamePasswordCredential: clientId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");
      }
      if (!username) {
        throw new errors_js_1.CredentialUnavailableError("UsernamePasswordCredential: username is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");
      }
      if (!password) {
        throw new errors_js_1.CredentialUnavailableError("UsernamePasswordCredential: password is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/usernamepasswordcredential/troubleshoot.");
      }
      this.tenantId = tenantId;
      this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
      this.username = username;
      this.password = password;
      this.msalClient = (0, msalClient_js_1.createMsalClient)(clientId, this.tenantId, {
        ...options,
        tokenCredentialOptions: options ?? {}
      });
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * If the user provided the option `disableAutomaticAuthentication`,
     * once the token can't be retrieved silently,
     * this method won't attempt to request user interaction to retrieve the token.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    async getToken(scopes, options = {}) {
      return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions) => {
        newOptions.tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, newOptions, this.additionallyAllowedTenantIds, logger);
        const arrayScopes = (0, scopeUtils_js_1.ensureScopes)(scopes);
        return this.msalClient.getTokenByUsernamePassword(arrayScopes, this.username, this.password, newOptions);
      });
    }
  }
  usernamePasswordCredential.UsernamePasswordCredential = UsernamePasswordCredential;
  return usernamePasswordCredential;
}
var hasRequiredEnvironmentCredential;
function requireEnvironmentCredential() {
  if (hasRequiredEnvironmentCredential) return environmentCredential;
  hasRequiredEnvironmentCredential = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EnvironmentCredential = exports.AllSupportedEnvironmentVariables = void 0;
    exports.getSendCertificateChain = getSendCertificateChain;
    const errors_js_1 = requireErrors();
    const logging_js_1 = requireLogging();
    const clientCertificateCredential_js_1 = requireClientCertificateCredential();
    const clientSecretCredential_js_1 = requireClientSecretCredential();
    const usernamePasswordCredential_js_1 = requireUsernamePasswordCredential();
    const tenantIdUtils_js_1 = requireTenantIdUtils();
    const tracing_js_1 = requireTracing();
    exports.AllSupportedEnvironmentVariables = [
      "AZURE_TENANT_ID",
      "AZURE_CLIENT_ID",
      "AZURE_CLIENT_SECRET",
      "AZURE_CLIENT_CERTIFICATE_PATH",
      "AZURE_CLIENT_CERTIFICATE_PASSWORD",
      "AZURE_USERNAME",
      "AZURE_PASSWORD",
      "AZURE_ADDITIONALLY_ALLOWED_TENANTS",
      "AZURE_CLIENT_SEND_CERTIFICATE_CHAIN"
    ];
    function getAdditionallyAllowedTenants() {
      const additionallyAllowedValues = process.env.AZURE_ADDITIONALLY_ALLOWED_TENANTS ?? "";
      return additionallyAllowedValues.split(";");
    }
    const credentialName = "EnvironmentCredential";
    const logger = (0, logging_js_1.credentialLogger)(credentialName);
    function getSendCertificateChain() {
      const sendCertificateChain = (process.env.AZURE_CLIENT_SEND_CERTIFICATE_CHAIN ?? "").toLowerCase();
      const result = sendCertificateChain === "true" || sendCertificateChain === "1";
      logger.verbose(`AZURE_CLIENT_SEND_CERTIFICATE_CHAIN: ${process.env.AZURE_CLIENT_SEND_CERTIFICATE_CHAIN}; sendCertificateChain: ${result}`);
      return result;
    }
    class EnvironmentCredential {
      _credential = void 0;
      /**
       * Creates an instance of the EnvironmentCredential class and decides what credential to use depending on the available environment variables.
       *
       * Required environment variables:
       * - `AZURE_TENANT_ID`: The Microsoft Entra tenant (directory) ID.
       * - `AZURE_CLIENT_ID`: The client (application) ID of an App Registration in the tenant.
       *
       * If setting the AZURE_TENANT_ID, then you can also set the additionally allowed tenants
       * - `AZURE_ADDITIONALLY_ALLOWED_TENANTS`: For multi-tenant applications, specifies additional tenants for which the credential may acquire tokens with a single semicolon delimited string. Use * to allow all tenants.
       *
       * Environment variables used for client credential authentication:
       * - `AZURE_CLIENT_SECRET`: A client secret that was generated for the App Registration.
       * - `AZURE_CLIENT_CERTIFICATE_PATH`: The path to a PEM certificate to use during the authentication, instead of the client secret.
       * - `AZURE_CLIENT_CERTIFICATE_PASSWORD`: (optional) password for the certificate file.
       * - `AZURE_CLIENT_SEND_CERTIFICATE_CHAIN`: (optional) indicates that the certificate chain should be set in x5c header to support subject name / issuer based authentication.
       *
       * Username and password authentication is deprecated, since it doesn't support multifactor authentication (MFA). See https://aka.ms/azsdk/identity/mfa for more details. Users can still provide environment variables for this authentication method:
       * - `AZURE_USERNAME`: Username to authenticate with.
       * - `AZURE_PASSWORD`: Password to authenticate with.
       *
       * If the environment variables required to perform the authentication are missing, a {@link CredentialUnavailableError} will be thrown.
       * If the authentication fails, or if there's an unknown error, an {@link AuthenticationError} will be thrown.
       *
       * @param options - Options for configuring the client which makes the authentication request.
       */
      constructor(options) {
        const assigned = (0, logging_js_1.processEnvVars)(exports.AllSupportedEnvironmentVariables).assigned.join(", ");
        logger.info(`Found the following environment variables: ${assigned}`);
        const tenantId = process.env.AZURE_TENANT_ID, clientId = process.env.AZURE_CLIENT_ID, clientSecret = process.env.AZURE_CLIENT_SECRET;
        const additionallyAllowedTenantIds = getAdditionallyAllowedTenants();
        const sendCertificateChain = getSendCertificateChain();
        const newOptions = { ...options, additionallyAllowedTenantIds, sendCertificateChain };
        if (tenantId) {
          (0, tenantIdUtils_js_1.checkTenantId)(logger, tenantId);
        }
        if (tenantId && clientId && clientSecret) {
          logger.info(`Invoking ClientSecretCredential with tenant ID: ${tenantId}, clientId: ${clientId} and clientSecret: [REDACTED]`);
          this._credential = new clientSecretCredential_js_1.ClientSecretCredential(tenantId, clientId, clientSecret, newOptions);
          return;
        }
        const certificatePath = process.env.AZURE_CLIENT_CERTIFICATE_PATH;
        const certificatePassword = process.env.AZURE_CLIENT_CERTIFICATE_PASSWORD;
        if (tenantId && clientId && certificatePath) {
          logger.info(`Invoking ClientCertificateCredential with tenant ID: ${tenantId}, clientId: ${clientId} and certificatePath: ${certificatePath}`);
          this._credential = new clientCertificateCredential_js_1.ClientCertificateCredential(tenantId, clientId, { certificatePath, certificatePassword }, newOptions);
          return;
        }
        const username = process.env.AZURE_USERNAME;
        const password = process.env.AZURE_PASSWORD;
        if (tenantId && clientId && username && password) {
          logger.info(`Invoking UsernamePasswordCredential with tenant ID: ${tenantId}, clientId: ${clientId} and username: ${username}`);
          logger.warning("Environment is configured to use username and password authentication. This authentication method is deprecated, as it doesn't support multifactor authentication (MFA). Use a more secure credential. For more details, see https://aka.ms/azsdk/identity/mfa.");
          this._credential = new usernamePasswordCredential_js_1.UsernamePasswordCredential(tenantId, clientId, username, password, newOptions);
        }
      }
      /**
       * Authenticates with Microsoft Entra ID and returns an access token if successful.
       *
       * @param scopes - The list of scopes for which the token will have access.
       * @param options - Optional parameters. See {@link GetTokenOptions}.
       */
      async getToken(scopes, options = {}) {
        return tracing_js_1.tracingClient.withSpan(`${credentialName}.getToken`, options, async (newOptions) => {
          if (this._credential) {
            try {
              const result = await this._credential.getToken(scopes, newOptions);
              logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
              return result;
            } catch (err) {
              const authenticationError = new errors_js_1.AuthenticationError(400, {
                error: `${credentialName} authentication failed. To troubleshoot, visit https://aka.ms/azsdk/js/identity/environmentcredential/troubleshoot.`,
                error_description: err.message.toString().split("More details:").join("")
              });
              logger.getToken.info((0, logging_js_1.formatError)(scopes, authenticationError));
              throw authenticationError;
            }
          }
          throw new errors_js_1.CredentialUnavailableError(`${credentialName} is unavailable. No underlying credential could be used. To troubleshoot, visit https://aka.ms/azsdk/js/identity/environmentcredential/troubleshoot.`);
        });
      }
    }
    exports.EnvironmentCredential = EnvironmentCredential;
  })(environmentCredential);
  return environmentCredential;
}
var managedIdentityCredential = {};
var imdsRetryPolicy = {};
var hasRequiredImdsRetryPolicy;
function requireImdsRetryPolicy() {
  if (hasRequiredImdsRetryPolicy) return imdsRetryPolicy;
  hasRequiredImdsRetryPolicy = 1;
  Object.defineProperty(imdsRetryPolicy, "__esModule", { value: true });
  imdsRetryPolicy.imdsRetryPolicy = imdsRetryPolicy$1;
  const core_rest_pipeline_1 = /* @__PURE__ */ requireCommonjs$6();
  const core_util_1 = /* @__PURE__ */ requireCommonjs$3();
  const DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1e3 * 64;
  const MIN_DELAY_FOR_410_MS = 3e3;
  function imdsRetryPolicy$1(msiRetryConfig) {
    return (0, core_rest_pipeline_1.retryPolicy)([
      {
        name: "imdsRetryPolicy",
        retry: ({ retryCount, response }) => {
          if (response?.status !== 404 && response?.status !== 410) {
            return { skipStrategy: true };
          }
          const initialDelayMs = response?.status === 410 ? Math.max(MIN_DELAY_FOR_410_MS, msiRetryConfig.startDelayInMs) : msiRetryConfig.startDelayInMs;
          return (0, core_util_1.calculateRetryDelay)(retryCount, {
            retryDelayInMs: initialDelayMs,
            maxRetryDelayInMs: DEFAULT_CLIENT_MAX_RETRY_INTERVAL
          });
        }
      }
    ], {
      maxRetries: msiRetryConfig.maxRetries
    });
  }
  return imdsRetryPolicy;
}
var imdsMsi = {};
var hasRequiredImdsMsi;
function requireImdsMsi() {
  if (hasRequiredImdsMsi) return imdsMsi;
  hasRequiredImdsMsi = 1;
  Object.defineProperty(imdsMsi, "__esModule", { value: true });
  imdsMsi.imdsMsi = void 0;
  const core_rest_pipeline_1 = /* @__PURE__ */ requireCommonjs$6();
  const core_util_1 = /* @__PURE__ */ requireCommonjs$3();
  const logging_js_1 = requireLogging();
  const utils_js_1 = requireUtils();
  const tracing_js_1 = requireTracing();
  const msiName = "ManagedIdentityCredential - IMDS";
  const logger = (0, logging_js_1.credentialLogger)(msiName);
  const imdsHost = "http://169.254.169.254";
  const imdsEndpointPath = "/metadata/identity/oauth2/token";
  function prepareInvalidRequestOptions(scopes) {
    const resource = (0, utils_js_1.mapScopesToResource)(scopes);
    if (!resource) {
      throw new Error(`${msiName}: Multiple scopes are not supported.`);
    }
    const url = new URL(imdsEndpointPath, process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST ?? imdsHost);
    const rawHeaders = {
      Accept: "application/json"
      // intentionally leave out the Metadata header to invoke an error from IMDS endpoint.
    };
    return {
      // intentionally not including any query
      url: `${url}`,
      method: "GET",
      headers: (0, core_rest_pipeline_1.createHttpHeaders)(rawHeaders)
    };
  }
  imdsMsi.imdsMsi = {
    name: "imdsMsi",
    async isAvailable(options) {
      const { scopes, identityClient: identityClient2, getTokenOptions } = options;
      const resource = (0, utils_js_1.mapScopesToResource)(scopes);
      if (!resource) {
        logger.info(`${msiName}: Unavailable. Multiple scopes are not supported.`);
        return false;
      }
      if (process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST) {
        return true;
      }
      if (!identityClient2) {
        throw new Error("Missing IdentityClient");
      }
      const requestOptions = prepareInvalidRequestOptions(resource);
      return tracing_js_1.tracingClient.withSpan("ManagedIdentityCredential-pingImdsEndpoint", getTokenOptions ?? {}, async (updatedOptions) => {
        requestOptions.tracingOptions = updatedOptions.tracingOptions;
        const request = (0, core_rest_pipeline_1.createPipelineRequest)(requestOptions);
        request.timeout = updatedOptions.requestOptions?.timeout || 1e3;
        request.allowInsecureConnection = true;
        let response;
        try {
          logger.info(`${msiName}: Pinging the Azure IMDS endpoint`);
          response = await identityClient2.sendRequest(request);
        } catch (err) {
          if ((0, core_util_1.isError)(err)) {
            logger.verbose(`${msiName}: Caught error ${err.name}: ${err.message}`);
          }
          logger.info(`${msiName}: The Azure IMDS endpoint is unavailable`);
          return false;
        }
        if (response.status === 403) {
          if (response.bodyAsText?.includes("unreachable")) {
            logger.info(`${msiName}: The Azure IMDS endpoint is unavailable`);
            logger.info(`${msiName}: ${response.bodyAsText}`);
            return false;
          }
        }
        logger.info(`${msiName}: The Azure IMDS endpoint is available`);
        return true;
      });
    }
  };
  return imdsMsi;
}
var tokenExchangeMsi = {};
var workloadIdentityCredential = {};
var clientAssertionCredential = {};
var hasRequiredClientAssertionCredential;
function requireClientAssertionCredential() {
  if (hasRequiredClientAssertionCredential) return clientAssertionCredential;
  hasRequiredClientAssertionCredential = 1;
  Object.defineProperty(clientAssertionCredential, "__esModule", { value: true });
  clientAssertionCredential.ClientAssertionCredential = void 0;
  const msalClient_js_1 = requireMsalClient();
  const tenantIdUtils_js_1 = requireTenantIdUtils();
  const errors_js_1 = requireErrors();
  const logging_js_1 = requireLogging();
  const tracing_js_1 = requireTracing();
  const logger = (0, logging_js_1.credentialLogger)("ClientAssertionCredential");
  class ClientAssertionCredential {
    msalClient;
    tenantId;
    additionallyAllowedTenantIds;
    getAssertion;
    options;
    /**
     * Creates an instance of the ClientAssertionCredential with the details
     * needed to authenticate against Microsoft Entra ID with a client
     * assertion provided by the developer through the `getAssertion` function parameter.
     *
     * @param tenantId - The Microsoft Entra tenant (directory) ID.
     * @param clientId - The client (application) ID of an App Registration in the tenant.
     * @param getAssertion - A function that retrieves the assertion for the credential to use.
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(tenantId, clientId, getAssertion, options = {}) {
      if (!tenantId) {
        throw new errors_js_1.CredentialUnavailableError("ClientAssertionCredential: tenantId is a required parameter.");
      }
      if (!clientId) {
        throw new errors_js_1.CredentialUnavailableError("ClientAssertionCredential: clientId is a required parameter.");
      }
      if (!getAssertion) {
        throw new errors_js_1.CredentialUnavailableError("ClientAssertionCredential: clientAssertion is a required parameter.");
      }
      this.tenantId = tenantId;
      this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
      this.options = options;
      this.getAssertion = getAssertion;
      this.msalClient = (0, msalClient_js_1.createMsalClient)(clientId, tenantId, {
        ...options,
        logger,
        tokenCredentialOptions: this.options
      });
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    async getToken(scopes, options = {}) {
      return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions) => {
        newOptions.tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, newOptions, this.additionallyAllowedTenantIds, logger);
        const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
        return this.msalClient.getTokenByClientAssertion(arrayScopes, this.getAssertion, newOptions);
      });
    }
  }
  clientAssertionCredential.ClientAssertionCredential = ClientAssertionCredential;
  return clientAssertionCredential;
}
var hasRequiredWorkloadIdentityCredential;
function requireWorkloadIdentityCredential() {
  if (hasRequiredWorkloadIdentityCredential) return workloadIdentityCredential;
  hasRequiredWorkloadIdentityCredential = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WorkloadIdentityCredential = exports.SupportedWorkloadEnvironmentVariables = void 0;
    const logging_js_1 = requireLogging();
    const clientAssertionCredential_js_1 = requireClientAssertionCredential();
    const errors_js_1 = requireErrors();
    const tenantIdUtils_js_1 = requireTenantIdUtils();
    const promises_1 = fs;
    const credentialName = "WorkloadIdentityCredential";
    exports.SupportedWorkloadEnvironmentVariables = [
      "AZURE_TENANT_ID",
      "AZURE_CLIENT_ID",
      "AZURE_FEDERATED_TOKEN_FILE"
    ];
    const logger = (0, logging_js_1.credentialLogger)(credentialName);
    class WorkloadIdentityCredential {
      client;
      azureFederatedTokenFileContent = void 0;
      cacheDate = void 0;
      federatedTokenFilePath;
      /**
       * WorkloadIdentityCredential supports Microsoft Entra Workload ID on Kubernetes.
       *
       * @param options - The identity client options to use for authentication.
       */
      constructor(options) {
        const assignedEnv = (0, logging_js_1.processEnvVars)(exports.SupportedWorkloadEnvironmentVariables).assigned.join(", ");
        logger.info(`Found the following environment variables: ${assignedEnv}`);
        const workloadIdentityCredentialOptions = options ?? {};
        const tenantId = workloadIdentityCredentialOptions.tenantId || process.env.AZURE_TENANT_ID;
        const clientId = workloadIdentityCredentialOptions.clientId || process.env.AZURE_CLIENT_ID;
        this.federatedTokenFilePath = workloadIdentityCredentialOptions.tokenFilePath || process.env.AZURE_FEDERATED_TOKEN_FILE;
        if (tenantId) {
          (0, tenantIdUtils_js_1.checkTenantId)(logger, tenantId);
        }
        if (!clientId) {
          throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. clientId is a required parameter. In DefaultAzureCredential and ManagedIdentityCredential, this can be provided as an environment variable - "AZURE_CLIENT_ID".
        See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`);
        }
        if (!tenantId) {
          throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. tenantId is a required parameter. In DefaultAzureCredential and ManagedIdentityCredential, this can be provided as an environment variable - "AZURE_TENANT_ID".
        See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`);
        }
        if (!this.federatedTokenFilePath) {
          throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. federatedTokenFilePath is a required parameter. In DefaultAzureCredential and ManagedIdentityCredential, this can be provided as an environment variable - "AZURE_FEDERATED_TOKEN_FILE".
        See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`);
        }
        logger.info(`Invoking ClientAssertionCredential with tenant ID: ${tenantId}, clientId: ${workloadIdentityCredentialOptions.clientId} and federated token path: [REDACTED]`);
        this.client = new clientAssertionCredential_js_1.ClientAssertionCredential(tenantId, clientId, this.readFileContents.bind(this), options);
      }
      /**
       * Authenticates with Microsoft Entra ID and returns an access token if successful.
       * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
       *
       * @param scopes - The list of scopes for which the token will have access.
       * @param options - The options used to configure any requests this
       *                TokenCredential implementation might make.
       */
      async getToken(scopes, options) {
        if (!this.client) {
          const errorMessage = `${credentialName}: is unavailable. tenantId, clientId, and federatedTokenFilePath are required parameters. 
      In DefaultAzureCredential and ManagedIdentityCredential, these can be provided as environment variables - 
      "AZURE_TENANT_ID",
      "AZURE_CLIENT_ID",
      "AZURE_FEDERATED_TOKEN_FILE". See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/workloadidentitycredential/troubleshoot`;
          logger.info(errorMessage);
          throw new errors_js_1.CredentialUnavailableError(errorMessage);
        }
        logger.info("Invoking getToken() of Client Assertion Credential");
        return this.client.getToken(scopes, options);
      }
      async readFileContents() {
        if (this.cacheDate !== void 0 && Date.now() - this.cacheDate >= 1e3 * 60 * 5) {
          this.azureFederatedTokenFileContent = void 0;
        }
        if (!this.federatedTokenFilePath) {
          throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. Invalid file path provided ${this.federatedTokenFilePath}.`);
        }
        if (!this.azureFederatedTokenFileContent) {
          const file = await (0, promises_1.readFile)(this.federatedTokenFilePath, "utf8");
          const value = file.trim();
          if (!value) {
            throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. No content on the file ${this.federatedTokenFilePath}.`);
          } else {
            this.azureFederatedTokenFileContent = value;
            this.cacheDate = Date.now();
          }
        }
        return this.azureFederatedTokenFileContent;
      }
    }
    exports.WorkloadIdentityCredential = WorkloadIdentityCredential;
  })(workloadIdentityCredential);
  return workloadIdentityCredential;
}
var hasRequiredTokenExchangeMsi;
function requireTokenExchangeMsi() {
  if (hasRequiredTokenExchangeMsi) return tokenExchangeMsi;
  hasRequiredTokenExchangeMsi = 1;
  Object.defineProperty(tokenExchangeMsi, "__esModule", { value: true });
  tokenExchangeMsi.tokenExchangeMsi = void 0;
  const workloadIdentityCredential_js_1 = requireWorkloadIdentityCredential();
  const logging_js_1 = requireLogging();
  const msiName = "ManagedIdentityCredential - Token Exchange";
  const logger = (0, logging_js_1.credentialLogger)(msiName);
  tokenExchangeMsi.tokenExchangeMsi = {
    name: "tokenExchangeMsi",
    async isAvailable(clientId) {
      const env = process.env;
      const result = Boolean((clientId || env.AZURE_CLIENT_ID) && env.AZURE_TENANT_ID && process.env.AZURE_FEDERATED_TOKEN_FILE);
      if (!result) {
        logger.info(`${msiName}: Unavailable. The environment variables needed are: AZURE_CLIENT_ID (or the client ID sent through the parameters), AZURE_TENANT_ID and AZURE_FEDERATED_TOKEN_FILE`);
      }
      return result;
    },
    async getToken(configuration, getTokenOptions = {}) {
      const { scopes, clientId } = configuration;
      const identityClientTokenCredentialOptions = {};
      const workloadIdentityCredential2 = new workloadIdentityCredential_js_1.WorkloadIdentityCredential({
        clientId,
        tenantId: process.env.AZURE_TENANT_ID,
        tokenFilePath: process.env.AZURE_FEDERATED_TOKEN_FILE,
        ...identityClientTokenCredentialOptions,
        disableInstanceDiscovery: true
      });
      return workloadIdentityCredential2.getToken(scopes, getTokenOptions);
    }
  };
  return tokenExchangeMsi;
}
var hasRequiredManagedIdentityCredential;
function requireManagedIdentityCredential() {
  if (hasRequiredManagedIdentityCredential) return managedIdentityCredential;
  hasRequiredManagedIdentityCredential = 1;
  Object.defineProperty(managedIdentityCredential, "__esModule", { value: true });
  managedIdentityCredential.ManagedIdentityCredential = void 0;
  const logger_1 = /* @__PURE__ */ requireCommonjs$1();
  const msal_node_1 = requireMsalNode();
  const identityClient_js_1 = requireIdentityClient();
  const errors_js_1 = requireErrors();
  const utils_js_1 = requireUtils$1();
  const imdsRetryPolicy_js_1 = requireImdsRetryPolicy();
  const logging_js_1 = requireLogging();
  const tracing_js_1 = requireTracing();
  const imdsMsi_js_1 = requireImdsMsi();
  const tokenExchangeMsi_js_1 = requireTokenExchangeMsi();
  const utils_js_2 = requireUtils();
  const logger = (0, logging_js_1.credentialLogger)("ManagedIdentityCredential");
  class ManagedIdentityCredential {
    managedIdentityApp;
    identityClient;
    clientId;
    resourceId;
    objectId;
    msiRetryConfig = {
      maxRetries: 5,
      startDelayInMs: 800,
      intervalIncrement: 2
    };
    isAvailableIdentityClient;
    sendProbeRequest;
    /**
     * @internal
     * @hidden
     */
    constructor(clientIdOrOptions, options) {
      let _options;
      if (typeof clientIdOrOptions === "string") {
        this.clientId = clientIdOrOptions;
        _options = options ?? {};
      } else {
        this.clientId = clientIdOrOptions?.clientId;
        _options = clientIdOrOptions ?? {};
      }
      this.resourceId = _options?.resourceId;
      this.objectId = _options?.objectId;
      this.sendProbeRequest = _options?.sendProbeRequest ?? false;
      const providedIds = [
        { key: "clientId", value: this.clientId },
        { key: "resourceId", value: this.resourceId },
        { key: "objectId", value: this.objectId }
      ].filter((id) => id.value);
      if (providedIds.length > 1) {
        throw new Error(`ManagedIdentityCredential: only one of 'clientId', 'resourceId', or 'objectId' can be provided. Received values: ${JSON.stringify({ clientId: this.clientId, resourceId: this.resourceId, objectId: this.objectId })}`);
      }
      _options.allowInsecureConnection = true;
      if (_options.retryOptions?.maxRetries !== void 0) {
        this.msiRetryConfig.maxRetries = _options.retryOptions.maxRetries;
      }
      this.identityClient = new identityClient_js_1.IdentityClient({
        ..._options,
        additionalPolicies: [{ policy: (0, imdsRetryPolicy_js_1.imdsRetryPolicy)(this.msiRetryConfig), position: "perCall" }]
      });
      this.managedIdentityApp = new msal_node_1.ManagedIdentityApplication({
        managedIdentityIdParams: {
          userAssignedClientId: this.clientId,
          userAssignedResourceId: this.resourceId,
          userAssignedObjectId: this.objectId
        },
        system: {
          disableInternalRetries: true,
          networkClient: this.identityClient,
          loggerOptions: {
            logLevel: (0, utils_js_1.getMSALLogLevel)((0, logger_1.getLogLevel)()),
            piiLoggingEnabled: _options.loggingOptions?.enableUnsafeSupportLogging,
            loggerCallback: (0, utils_js_1.defaultLoggerCallback)(logger)
          }
        }
      });
      this.isAvailableIdentityClient = new identityClient_js_1.IdentityClient({
        ..._options,
        retryOptions: {
          maxRetries: 0
        }
      });
      const managedIdentitySource = this.managedIdentityApp.getManagedIdentitySource();
      if (managedIdentitySource === "CloudShell") {
        if (this.clientId || this.resourceId || this.objectId) {
          logger.warning(`CloudShell MSI detected with user-provided IDs - throwing. Received values: ${JSON.stringify({
            clientId: this.clientId,
            resourceId: this.resourceId,
            objectId: this.objectId
          })}.`);
          throw new errors_js_1.CredentialUnavailableError("ManagedIdentityCredential: Specifying a user-assigned managed identity is not supported for CloudShell at runtime. When using Managed Identity in CloudShell, omit the clientId, resourceId, and objectId parameters.");
        }
      }
      if (managedIdentitySource === "ServiceFabric") {
        if (this.clientId || this.resourceId || this.objectId) {
          logger.warning(`Service Fabric detected with user-provided IDs - throwing. Received values: ${JSON.stringify({
            clientId: this.clientId,
            resourceId: this.resourceId,
            objectId: this.objectId
          })}.`);
          throw new errors_js_1.CredentialUnavailableError(`ManagedIdentityCredential: ${utils_js_2.serviceFabricErrorMessage}`);
        }
      }
      logger.info(`Using ${managedIdentitySource} managed identity.`);
      if (providedIds.length === 1) {
        const { key, value } = providedIds[0];
        logger.info(`${managedIdentitySource} with ${key}: ${value}`);
      }
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     * If an unexpected error occurs, an {@link AuthenticationError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    async getToken(scopes, options = {}) {
      logger.getToken.info("Using the MSAL provider for Managed Identity.");
      const resource = (0, utils_js_2.mapScopesToResource)(scopes);
      if (!resource) {
        throw new errors_js_1.CredentialUnavailableError(`ManagedIdentityCredential: Multiple scopes are not supported. Scopes: ${JSON.stringify(scopes)}`);
      }
      return tracing_js_1.tracingClient.withSpan("ManagedIdentityCredential.getToken", options, async () => {
        try {
          const isTokenExchangeMsi = await tokenExchangeMsi_js_1.tokenExchangeMsi.isAvailable(this.clientId);
          const identitySource = this.managedIdentityApp.getManagedIdentitySource();
          const isImdsMsi = identitySource === "DefaultToImds" || identitySource === "Imds";
          logger.getToken.info(`MSAL Identity source: ${identitySource}`);
          if (isTokenExchangeMsi) {
            logger.getToken.info("Using the token exchange managed identity.");
            const result = await tokenExchangeMsi_js_1.tokenExchangeMsi.getToken({
              scopes,
              clientId: this.clientId,
              identityClient: this.identityClient,
              retryConfig: this.msiRetryConfig,
              resourceId: this.resourceId
            });
            if (result === null) {
              throw new errors_js_1.CredentialUnavailableError("Attempted to use the token exchange managed identity, but received a null response.");
            }
            return result;
          } else if (isImdsMsi && this.sendProbeRequest) {
            logger.getToken.info("Using the IMDS endpoint to probe for availability.");
            const isAvailable = await imdsMsi_js_1.imdsMsi.isAvailable({
              scopes,
              clientId: this.clientId,
              getTokenOptions: options,
              identityClient: this.isAvailableIdentityClient,
              resourceId: this.resourceId
            });
            if (!isAvailable) {
              throw new errors_js_1.CredentialUnavailableError(`Attempted to use the IMDS endpoint, but it is not available.`);
            }
          }
          logger.getToken.info("Calling into MSAL for managed identity token.");
          const token = await this.managedIdentityApp.acquireToken({
            resource
          });
          this.ensureValidMsalToken(scopes, token, options);
          logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
          return {
            expiresOnTimestamp: token.expiresOn.getTime(),
            token: token.accessToken,
            refreshAfterTimestamp: token.refreshOn?.getTime(),
            tokenType: "Bearer"
          };
        } catch (err) {
          logger.getToken.error((0, logging_js_1.formatError)(scopes, err));
          if (err.name === "AuthenticationRequiredError") {
            throw err;
          }
          if (isNetworkError(err)) {
            throw new errors_js_1.CredentialUnavailableError(`ManagedIdentityCredential: Network unreachable. Message: ${err.message}`, { cause: err });
          }
          throw new errors_js_1.CredentialUnavailableError(`ManagedIdentityCredential: Authentication failed. Message ${err.message}`, { cause: err });
        }
      });
    }
    /**
     * Ensures the validity of the MSAL token
     */
    ensureValidMsalToken(scopes, msalToken, getTokenOptions) {
      const createError = (message) => {
        logger.getToken.info(message);
        return new errors_js_1.AuthenticationRequiredError({
          scopes: Array.isArray(scopes) ? scopes : [scopes],
          getTokenOptions,
          message
        });
      };
      if (!msalToken) {
        throw createError("No response.");
      }
      if (!msalToken.expiresOn) {
        throw createError(`Response had no "expiresOn" property.`);
      }
      if (!msalToken.accessToken) {
        throw createError(`Response had no "accessToken" property.`);
      }
    }
  }
  managedIdentityCredential.ManagedIdentityCredential = ManagedIdentityCredential;
  function isNetworkError(err) {
    if (err.errorCode === "network_error") {
      return true;
    }
    if (err.code === "ENETUNREACH" || err.code === "EHOSTUNREACH") {
      return true;
    }
    if (err.statusCode === 403 || err.code === 403) {
      if (err.message.includes("unreachable")) {
        return true;
      }
    }
    return false;
  }
  return managedIdentityCredential;
}
var azureDeveloperCliCredential = {};
var hasRequiredAzureDeveloperCliCredential;
function requireAzureDeveloperCliCredential() {
  if (hasRequiredAzureDeveloperCliCredential) return azureDeveloperCliCredential;
  hasRequiredAzureDeveloperCliCredential = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AzureDeveloperCliCredential = exports.developerCliCredentialInternals = exports.azureDeveloperCliPublicErrorMessages = void 0;
    const tslib_1 = /* @__PURE__ */ requireTslib();
    const logging_js_1 = requireLogging();
    const errors_js_1 = requireErrors();
    const child_process_1 = tslib_1.__importDefault(require$$3);
    const tenantIdUtils_js_1 = requireTenantIdUtils();
    const tracing_js_1 = requireTracing();
    const scopeUtils_js_1 = requireScopeUtils();
    const logger = (0, logging_js_1.credentialLogger)("AzureDeveloperCliCredential");
    exports.azureDeveloperCliPublicErrorMessages = {
      notInstalled: "Azure Developer CLI couldn't be found. To mitigate this issue, see the troubleshooting guidelines at https://aka.ms/azsdk/js/identity/azdevclicredential/troubleshoot.",
      login: "Please run 'azd auth login' from a command prompt to authenticate before using this credential. For more information, see the troubleshooting guidelines at https://aka.ms/azsdk/js/identity/azdevclicredential/troubleshoot.",
      unknown: "Unknown error while trying to retrieve the access token",
      claim: "This credential doesn't support claims challenges. To authenticate with the required claims, please run the following command:"
    };
    exports.developerCliCredentialInternals = {
      /**
       * @internal
       */
      getSafeWorkingDir() {
        if (process.platform === "win32") {
          let systemRoot = process.env.SystemRoot || process.env["SYSTEMROOT"];
          if (!systemRoot) {
            logger.getToken.warning("The SystemRoot environment variable is not set. This may cause issues when using the Azure Developer CLI credential.");
            systemRoot = "C:\\Windows";
          }
          return systemRoot;
        } else {
          return "/bin";
        }
      },
      /**
       * Gets the access token from Azure Developer CLI
       * @param scopes - The scopes to use when getting the token
       * @internal
       */
      async getAzdAccessToken(scopes, tenantId, timeout, claims) {
        let tenantSection = [];
        if (tenantId) {
          tenantSection = ["--tenant-id", tenantId];
        }
        let claimsSections = [];
        if (claims) {
          const encodedClaims = btoa(claims);
          claimsSections = ["--claims", encodedClaims];
        }
        return new Promise((resolve, reject) => {
          try {
            const args = [
              "auth",
              "token",
              "--output",
              "json",
              "--no-prompt",
              ...scopes.reduce((previous, current) => previous.concat("--scope", current), []),
              ...tenantSection,
              ...claimsSections
            ];
            const command = ["azd", ...args].join(" ");
            child_process_1.default.exec(command, {
              cwd: exports.developerCliCredentialInternals.getSafeWorkingDir(),
              timeout
            }, (error, stdout, stderr) => {
              resolve({ stdout, stderr, error });
            });
          } catch (err) {
            reject(err);
          }
        });
      }
    };
    class AzureDeveloperCliCredential {
      tenantId;
      additionallyAllowedTenantIds;
      timeout;
      /**
       * Creates an instance of the {@link AzureDeveloperCliCredential}.
       *
       * To use this credential, ensure that you have already logged
       * in via the 'azd' tool using the command "azd auth login" from the commandline.
       *
       * @param options - Options, to optionally allow multi-tenant requests.
       */
      constructor(options) {
        if (options?.tenantId) {
          (0, tenantIdUtils_js_1.checkTenantId)(logger, options?.tenantId);
          this.tenantId = options?.tenantId;
        }
        this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
        this.timeout = options?.processTimeoutInMs;
      }
      /**
       * Authenticates with Microsoft Entra ID and returns an access token if successful.
       * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
       *
       * @param scopes - The list of scopes for which the token will have access.
       * @param options - The options used to configure any requests this
       *                TokenCredential implementation might make.
       */
      async getToken(scopes, options = {}) {
        const tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, options, this.additionallyAllowedTenantIds);
        if (tenantId) {
          (0, tenantIdUtils_js_1.checkTenantId)(logger, tenantId);
        }
        let scopeList;
        if (typeof scopes === "string") {
          scopeList = [scopes];
        } else {
          scopeList = scopes;
        }
        logger.getToken.info(`Using the scopes ${scopes}`);
        return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async () => {
          try {
            scopeList.forEach((scope) => {
              (0, scopeUtils_js_1.ensureValidScopeForDevTimeCreds)(scope, logger);
            });
            const obj = await exports.developerCliCredentialInternals.getAzdAccessToken(scopeList, tenantId, this.timeout, options.claims);
            const isMFARequiredError = obj.stderr?.match("must use multi-factor authentication") || obj.stderr?.match("reauthentication required");
            const isNotLoggedInError = obj.stderr?.match("not logged in, run `azd login` to login") || obj.stderr?.match("not logged in, run `azd auth login` to login");
            const isNotInstallError = obj.stderr?.match("azd:(.*)not found") || obj.stderr?.startsWith("'azd' is not recognized");
            if (isNotInstallError || obj.error && obj.error.code === "ENOENT") {
              const error = new errors_js_1.CredentialUnavailableError(exports.azureDeveloperCliPublicErrorMessages.notInstalled);
              logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
              throw error;
            }
            if (isNotLoggedInError) {
              const error = new errors_js_1.CredentialUnavailableError(exports.azureDeveloperCliPublicErrorMessages.login);
              logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
              throw error;
            }
            if (isMFARequiredError) {
              const scope = scopeList.reduce((previous, current) => previous.concat("--scope", current), []).join(" ");
              const loginCmd = `azd auth login ${scope}`;
              const error = new errors_js_1.CredentialUnavailableError(`${exports.azureDeveloperCliPublicErrorMessages.claim} ${loginCmd}`);
              logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
              throw error;
            }
            try {
              const resp = JSON.parse(obj.stdout);
              logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
              return {
                token: resp.token,
                expiresOnTimestamp: new Date(resp.expiresOn).getTime(),
                tokenType: "Bearer"
              };
            } catch (e) {
              if (obj.stderr) {
                throw new errors_js_1.CredentialUnavailableError(obj.stderr);
              }
              throw e;
            }
          } catch (err) {
            const error = err.name === "CredentialUnavailableError" ? err : new errors_js_1.CredentialUnavailableError(err.message || exports.azureDeveloperCliPublicErrorMessages.unknown);
            logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
            throw error;
          }
        });
      }
    }
    exports.AzureDeveloperCliCredential = AzureDeveloperCliCredential;
  })(azureDeveloperCliCredential);
  return azureDeveloperCliCredential;
}
var azureCliCredential = {};
var subscriptionUtils = {};
var hasRequiredSubscriptionUtils;
function requireSubscriptionUtils() {
  if (hasRequiredSubscriptionUtils) return subscriptionUtils;
  hasRequiredSubscriptionUtils = 1;
  Object.defineProperty(subscriptionUtils, "__esModule", { value: true });
  subscriptionUtils.checkSubscription = checkSubscription;
  const logging_js_1 = requireLogging();
  function checkSubscription(logger, subscription) {
    if (!subscription.match(/^[0-9a-zA-Z-._ ]+$/)) {
      const error = new Error(`Subscription '${subscription}' contains invalid characters. If this is the name of a subscription, use its ID instead. You can locate your subscription by following the instructions listed here: https://learn.microsoft.com/azure/azure-portal/get-subscription-tenant-id`);
      logger.info((0, logging_js_1.formatError)("", error));
      throw error;
    }
  }
  return subscriptionUtils;
}
var hasRequiredAzureCliCredential;
function requireAzureCliCredential() {
  if (hasRequiredAzureCliCredential) return azureCliCredential;
  hasRequiredAzureCliCredential = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AzureCliCredential = exports.cliCredentialInternals = exports.azureCliPublicErrorMessages = void 0;
    const tslib_1 = /* @__PURE__ */ requireTslib();
    const tenantIdUtils_js_1 = requireTenantIdUtils();
    const logging_js_1 = requireLogging();
    const scopeUtils_js_1 = requireScopeUtils();
    const errors_js_1 = requireErrors();
    const child_process_1 = tslib_1.__importDefault(require$$3);
    const tracing_js_1 = requireTracing();
    const subscriptionUtils_js_1 = requireSubscriptionUtils();
    const logger = (0, logging_js_1.credentialLogger)("AzureCliCredential");
    exports.azureCliPublicErrorMessages = {
      claim: "This credential doesn't support claims challenges. To authenticate with the required claims, please run the following command:",
      notInstalled: "Azure CLI could not be found. Please visit https://aka.ms/azure-cli for installation instructions and then, once installed, authenticate to your Azure account using 'az login'.",
      login: "Please run 'az login' from a command prompt to authenticate before using this credential.",
      unknown: "Unknown error while trying to retrieve the access token",
      unexpectedResponse: 'Unexpected response from Azure CLI when getting token. Expected "expiresOn" to be a RFC3339 date string. Got:'
    };
    exports.cliCredentialInternals = {
      /**
       * @internal
       */
      getSafeWorkingDir() {
        if (process.platform === "win32") {
          let systemRoot = process.env.SystemRoot || process.env["SYSTEMROOT"];
          if (!systemRoot) {
            logger.getToken.warning("The SystemRoot environment variable is not set. This may cause issues when using the Azure CLI credential.");
            systemRoot = "C:\\Windows";
          }
          return systemRoot;
        } else {
          return "/bin";
        }
      },
      /**
       * Gets the access token from Azure CLI
       * @param resource - The resource to use when getting the token
       * @internal
       */
      async getAzureCliAccessToken(resource, tenantId, subscription, timeout) {
        let tenantSection = [];
        let subscriptionSection = [];
        if (tenantId) {
          tenantSection = ["--tenant", tenantId];
        }
        if (subscription) {
          subscriptionSection = ["--subscription", `"${subscription}"`];
        }
        return new Promise((resolve, reject) => {
          try {
            const args = [
              "account",
              "get-access-token",
              "--output",
              "json",
              "--resource",
              resource,
              ...tenantSection,
              ...subscriptionSection
            ];
            const command = ["az", ...args].join(" ");
            child_process_1.default.exec(command, { cwd: exports.cliCredentialInternals.getSafeWorkingDir(), timeout }, (error, stdout, stderr) => {
              resolve({ stdout, stderr, error });
            });
          } catch (err) {
            reject(err);
          }
        });
      }
    };
    class AzureCliCredential {
      tenantId;
      additionallyAllowedTenantIds;
      timeout;
      subscription;
      /**
       * Creates an instance of the {@link AzureCliCredential}.
       *
       * To use this credential, ensure that you have already logged
       * in via the 'az' tool using the command "az login" from the commandline.
       *
       * @param options - Options, to optionally allow multi-tenant requests.
       */
      constructor(options) {
        if (options?.tenantId) {
          (0, tenantIdUtils_js_1.checkTenantId)(logger, options?.tenantId);
          this.tenantId = options?.tenantId;
        }
        if (options?.subscription) {
          (0, subscriptionUtils_js_1.checkSubscription)(logger, options?.subscription);
          this.subscription = options?.subscription;
        }
        this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
        this.timeout = options?.processTimeoutInMs;
      }
      /**
       * Authenticates with Microsoft Entra ID and returns an access token if successful.
       * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
       *
       * @param scopes - The list of scopes for which the token will have access.
       * @param options - The options used to configure any requests this
       *                TokenCredential implementation might make.
       */
      async getToken(scopes, options = {}) {
        const scope = typeof scopes === "string" ? scopes : scopes[0];
        const claimsValue = options.claims;
        if (claimsValue && claimsValue.trim()) {
          const encodedClaims = btoa(claimsValue);
          let loginCmd = `az login --claims-challenge ${encodedClaims} --scope ${scope}`;
          const tenantIdFromOptions = options.tenantId;
          if (tenantIdFromOptions) {
            loginCmd += ` --tenant ${tenantIdFromOptions}`;
          }
          const error = new errors_js_1.CredentialUnavailableError(`${exports.azureCliPublicErrorMessages.claim} ${loginCmd}`);
          logger.getToken.info((0, logging_js_1.formatError)(scope, error));
          throw error;
        }
        const tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, options, this.additionallyAllowedTenantIds);
        if (tenantId) {
          (0, tenantIdUtils_js_1.checkTenantId)(logger, tenantId);
        }
        if (this.subscription) {
          (0, subscriptionUtils_js_1.checkSubscription)(logger, this.subscription);
        }
        logger.getToken.info(`Using the scope ${scope}`);
        return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async () => {
          try {
            (0, scopeUtils_js_1.ensureValidScopeForDevTimeCreds)(scope, logger);
            const resource = (0, scopeUtils_js_1.getScopeResource)(scope);
            const obj = await exports.cliCredentialInternals.getAzureCliAccessToken(resource, tenantId, this.subscription, this.timeout);
            const specificScope = obj.stderr?.match("(.*)az login --scope(.*)");
            const isLoginError = obj.stderr?.match("(.*)az login(.*)") && !specificScope;
            const isNotInstallError = obj.stderr?.match("az:(.*)not found") || obj.stderr?.startsWith("'az' is not recognized");
            if (isNotInstallError) {
              const error = new errors_js_1.CredentialUnavailableError(exports.azureCliPublicErrorMessages.notInstalled);
              logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
              throw error;
            }
            if (isLoginError) {
              const error = new errors_js_1.CredentialUnavailableError(exports.azureCliPublicErrorMessages.login);
              logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
              throw error;
            }
            try {
              const responseData = obj.stdout;
              const response = this.parseRawResponse(responseData);
              logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
              return response;
            } catch (e) {
              if (obj.stderr) {
                throw new errors_js_1.CredentialUnavailableError(obj.stderr);
              }
              throw e;
            }
          } catch (err) {
            const error = err.name === "CredentialUnavailableError" ? err : new errors_js_1.CredentialUnavailableError(err.message || exports.azureCliPublicErrorMessages.unknown);
            logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
            throw error;
          }
        });
      }
      /**
       * Parses the raw JSON response from the Azure CLI into a usable AccessToken object
       *
       * @param rawResponse - The raw JSON response from the Azure CLI
       * @returns An access token with the expiry time parsed from the raw response
       *
       * The expiryTime of the credential's access token, in milliseconds, is calculated as follows:
       *
       * When available, expires_on (introduced in Azure CLI v2.54.0) will be preferred. Otherwise falls back to expiresOn.
       */
      parseRawResponse(rawResponse) {
        const response = JSON.parse(rawResponse);
        const token = response.accessToken;
        let expiresOnTimestamp = Number.parseInt(response.expires_on, 10) * 1e3;
        if (!isNaN(expiresOnTimestamp)) {
          logger.getToken.info("expires_on is available and is valid, using it");
          return {
            token,
            expiresOnTimestamp,
            tokenType: "Bearer"
          };
        }
        expiresOnTimestamp = new Date(response.expiresOn).getTime();
        if (isNaN(expiresOnTimestamp)) {
          throw new errors_js_1.CredentialUnavailableError(`${exports.azureCliPublicErrorMessages.unexpectedResponse} "${response.expiresOn}"`);
        }
        return {
          token,
          expiresOnTimestamp,
          tokenType: "Bearer"
        };
      }
    }
    exports.AzureCliCredential = AzureCliCredential;
  })(azureCliCredential);
  return azureCliCredential;
}
var azurePowerShellCredential = {};
var processUtils = {};
var hasRequiredProcessUtils;
function requireProcessUtils() {
  if (hasRequiredProcessUtils) return processUtils;
  hasRequiredProcessUtils = 1;
  Object.defineProperty(processUtils, "__esModule", { value: true });
  processUtils.processUtils = void 0;
  const tslib_1 = /* @__PURE__ */ requireTslib();
  const node_child_process_1 = tslib_1.__importDefault(childProcess);
  processUtils.processUtils = {
    /**
     * Promisifying childProcess.execFile
     * @internal
     */
    execFile(file, params, options) {
      return new Promise((resolve, reject) => {
        node_child_process_1.default.execFile(file, params, options, (error, stdout, stderr) => {
          if (Buffer.isBuffer(stdout)) {
            stdout = stdout.toString("utf8");
          }
          if (Buffer.isBuffer(stderr)) {
            stderr = stderr.toString("utf8");
          }
          if (stderr || error) {
            reject(stderr ? new Error(stderr) : error);
          } else {
            resolve(stdout);
          }
        });
      });
    }
  };
  return processUtils;
}
var hasRequiredAzurePowerShellCredential;
function requireAzurePowerShellCredential() {
  if (hasRequiredAzurePowerShellCredential) return azurePowerShellCredential;
  hasRequiredAzurePowerShellCredential = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AzurePowerShellCredential = exports.commandStack = exports.powerShellPublicErrorMessages = exports.powerShellErrors = void 0;
    exports.formatCommand = formatCommand;
    exports.parseJsonToken = parseJsonToken;
    const tenantIdUtils_js_1 = requireTenantIdUtils();
    const logging_js_1 = requireLogging();
    const scopeUtils_js_1 = requireScopeUtils();
    const errors_js_1 = requireErrors();
    const processUtils_js_1 = requireProcessUtils();
    const tracing_js_1 = requireTracing();
    const logger = (0, logging_js_1.credentialLogger)("AzurePowerShellCredential");
    const isWindows = process.platform === "win32";
    function formatCommand(commandName) {
      if (isWindows) {
        return `${commandName}.exe`;
      } else {
        return commandName;
      }
    }
    async function runCommands(commands, timeout) {
      const results = [];
      for (const command of commands) {
        const [file, ...parameters] = command;
        const result = await processUtils_js_1.processUtils.execFile(file, parameters, {
          encoding: "utf8",
          timeout
        });
        results.push(result);
      }
      return results;
    }
    exports.powerShellErrors = {
      login: "Run Connect-AzAccount to login",
      installed: "The specified module 'Az.Accounts' with version '2.2.0' was not loaded because no valid module file was found in any module directory"
    };
    exports.powerShellPublicErrorMessages = {
      login: "Please run 'Connect-AzAccount' from PowerShell to authenticate before using this credential.",
      installed: `The 'Az.Account' module >= 2.2.0 is not installed. Install the Azure Az PowerShell module with: "Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force".`,
      claim: "This credential doesn't support claims challenges. To authenticate with the required claims, please run the following command:",
      troubleshoot: `To troubleshoot, visit https://aka.ms/azsdk/js/identity/powershellcredential/troubleshoot.`
    };
    const isLoginError = (err) => err.message.match(`(.*)${exports.powerShellErrors.login}(.*)`);
    const isNotInstalledError = (err) => err.message.match(exports.powerShellErrors.installed);
    exports.commandStack = [formatCommand("pwsh")];
    if (isWindows) {
      exports.commandStack.push(formatCommand("powershell"));
    }
    class AzurePowerShellCredential {
      tenantId;
      additionallyAllowedTenantIds;
      timeout;
      /**
       * Creates an instance of the {@link AzurePowerShellCredential}.
       *
       * To use this credential:
       * - Install the Azure Az PowerShell module with:
       *   `Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force`.
       * - You have already logged in to Azure PowerShell using the command
       * `Connect-AzAccount` from the command line.
       *
       * @param options - Options, to optionally allow multi-tenant requests.
       */
      constructor(options) {
        if (options?.tenantId) {
          (0, tenantIdUtils_js_1.checkTenantId)(logger, options?.tenantId);
          this.tenantId = options?.tenantId;
        }
        this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
        this.timeout = options?.processTimeoutInMs;
      }
      /**
       * Gets the access token from Azure PowerShell
       * @param resource - The resource to use when getting the token
       */
      async getAzurePowerShellAccessToken(resource, tenantId, timeout) {
        for (const powerShellCommand of [...exports.commandStack]) {
          try {
            await runCommands([[powerShellCommand, "/?"]], timeout);
          } catch (e) {
            exports.commandStack.shift();
            continue;
          }
          const results = await runCommands([
            [
              powerShellCommand,
              "-NoProfile",
              "-NonInteractive",
              "-Command",
              `
          $tenantId = "${tenantId ?? ""}"
          $m = Import-Module Az.Accounts -MinimumVersion 2.2.0 -PassThru
          $useSecureString = $m.Version -ge [version]'2.17.0' -and $m.Version -lt [version]'5.0.0'

          $params = @{
            ResourceUrl = "${resource}"
          }

          if ($tenantId.Length -gt 0) {
            $params["TenantId"] = $tenantId
          }

          if ($useSecureString) {
            $params["AsSecureString"] = $true
          }

          $token = Get-AzAccessToken @params

          $result = New-Object -TypeName PSObject
          $result | Add-Member -MemberType NoteProperty -Name ExpiresOn -Value $token.ExpiresOn

          if ($token.Token -is [System.Security.SecureString]) {
            if ($PSVersionTable.PSVersion.Major -lt 7) {
              $ssPtr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token.Token)
              try {
                $result | Add-Member -MemberType NoteProperty -Name Token -Value ([System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($ssPtr))
              }
              finally {
                [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ssPtr)
              }
            }
            else {
              $result | Add-Member -MemberType NoteProperty -Name Token -Value ($token.Token | ConvertFrom-SecureString -AsPlainText)
            }
          }
          else {
            $result | Add-Member -MemberType NoteProperty -Name Token -Value $token.Token
          }

          Write-Output (ConvertTo-Json $result)
          `
            ]
          ]);
          const result = results[0];
          return parseJsonToken(result);
        }
        throw new Error(`Unable to execute PowerShell. Ensure that it is installed in your system`);
      }
      /**
       * Authenticates with Microsoft Entra ID and returns an access token if successful.
       * If the authentication cannot be performed through PowerShell, a {@link CredentialUnavailableError} will be thrown.
       *
       * @param scopes - The list of scopes for which the token will have access.
       * @param options - The options used to configure any requests this TokenCredential implementation might make.
       */
      async getToken(scopes, options = {}) {
        return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async () => {
          const scope = typeof scopes === "string" ? scopes : scopes[0];
          const claimsValue = options.claims;
          if (claimsValue && claimsValue.trim()) {
            const encodedClaims = btoa(claimsValue);
            let loginCmd = `Connect-AzAccount -ClaimsChallenge ${encodedClaims}`;
            const tenantIdFromOptions = options.tenantId;
            if (tenantIdFromOptions) {
              loginCmd += ` -Tenant ${tenantIdFromOptions}`;
            }
            const error = new errors_js_1.CredentialUnavailableError(`${exports.powerShellPublicErrorMessages.claim} ${loginCmd}`);
            logger.getToken.info((0, logging_js_1.formatError)(scope, error));
            throw error;
          }
          const tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, options, this.additionallyAllowedTenantIds);
          if (tenantId) {
            (0, tenantIdUtils_js_1.checkTenantId)(logger, tenantId);
          }
          try {
            (0, scopeUtils_js_1.ensureValidScopeForDevTimeCreds)(scope, logger);
            logger.getToken.info(`Using the scope ${scope}`);
            const resource = (0, scopeUtils_js_1.getScopeResource)(scope);
            const response = await this.getAzurePowerShellAccessToken(resource, tenantId, this.timeout);
            logger.getToken.info((0, logging_js_1.formatSuccess)(scopes));
            return {
              token: response.Token,
              expiresOnTimestamp: new Date(response.ExpiresOn).getTime(),
              tokenType: "Bearer"
            };
          } catch (err) {
            if (isNotInstalledError(err)) {
              const error2 = new errors_js_1.CredentialUnavailableError(exports.powerShellPublicErrorMessages.installed);
              logger.getToken.info((0, logging_js_1.formatError)(scope, error2));
              throw error2;
            } else if (isLoginError(err)) {
              const error2 = new errors_js_1.CredentialUnavailableError(exports.powerShellPublicErrorMessages.login);
              logger.getToken.info((0, logging_js_1.formatError)(scope, error2));
              throw error2;
            }
            const error = new errors_js_1.CredentialUnavailableError(`${err}. ${exports.powerShellPublicErrorMessages.troubleshoot}`);
            logger.getToken.info((0, logging_js_1.formatError)(scope, error));
            throw error;
          }
        });
      }
    }
    exports.AzurePowerShellCredential = AzurePowerShellCredential;
    async function parseJsonToken(result) {
      const jsonRegex = /{[^{}]*}/g;
      const matches = result.match(jsonRegex);
      let resultWithoutToken = result;
      if (matches) {
        try {
          for (const item of matches) {
            try {
              const jsonContent = JSON.parse(item);
              if (jsonContent?.Token) {
                resultWithoutToken = resultWithoutToken.replace(item, "");
                if (resultWithoutToken) {
                  logger.getToken.warning(resultWithoutToken);
                }
                return jsonContent;
              }
            } catch (e) {
              continue;
            }
          }
        } catch (e) {
          throw new Error(`Unable to parse the output of PowerShell. Received output: ${result}`);
        }
      }
      throw new Error(`No access token found in the output. Received output: ${result}`);
    }
  })(azurePowerShellCredential);
  return azurePowerShellCredential;
}
var visualStudioCodeCredential = {};
var hasRequiredVisualStudioCodeCredential;
function requireVisualStudioCodeCredential() {
  if (hasRequiredVisualStudioCodeCredential) return visualStudioCodeCredential;
  hasRequiredVisualStudioCodeCredential = 1;
  Object.defineProperty(visualStudioCodeCredential, "__esModule", { value: true });
  visualStudioCodeCredential.VisualStudioCodeCredential = void 0;
  const logging_js_1 = requireLogging();
  const tenantIdUtils_js_1 = requireTenantIdUtils();
  const errors_js_1 = requireErrors();
  const tenantIdUtils_js_2 = requireTenantIdUtils();
  const msalClient_js_1 = requireMsalClient();
  const scopeUtils_js_1 = requireScopeUtils();
  const msalPlugins_js_1 = requireMsalPlugins();
  const utils_js_1 = requireUtils$1();
  const promises_1 = fs;
  const CommonTenantId = "common";
  const VSCodeClientId = "aebc6443-996d-45c2-90f0-388ff96faa56";
  const logger = (0, logging_js_1.credentialLogger)("VisualStudioCodeCredential");
  const unsupportedTenantIds = {
    adfs: "The VisualStudioCodeCredential does not support authentication with ADFS tenants."
  };
  function checkUnsupportedTenant(tenantId) {
    const unsupportedTenantError = unsupportedTenantIds[tenantId];
    if (unsupportedTenantError) {
      throw new errors_js_1.CredentialUnavailableError(unsupportedTenantError);
    }
  }
  class VisualStudioCodeCredential {
    tenantId;
    additionallyAllowedTenantIds;
    msalClient;
    options;
    /**
     * Creates an instance of VisualStudioCodeCredential to use for automatically authenticating via VSCode.
     *
     * **Note**: `VisualStudioCodeCredential` is provided by a plugin package:
     * `@azure/identity-vscode`. If this package is not installed, then authentication using
     * `VisualStudioCodeCredential` will not be available.
     *
     * @param options - Options for configuring the client which makes the authentication request.
     */
    constructor(options) {
      this.options = options || {};
      if (options && options.tenantId) {
        (0, tenantIdUtils_js_2.checkTenantId)(logger, options.tenantId);
        this.tenantId = options.tenantId;
      } else {
        this.tenantId = CommonTenantId;
      }
      this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
      checkUnsupportedTenant(this.tenantId);
    }
    /**
     * Runs preparations for any further getToken request:
     *   - Validates that the plugin is available.
     *   - Loads the authentication record from VSCode if available.
     *   - Creates the MSAL client with the loaded plugin and authentication record.
     */
    async prepare(scopes) {
      const tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, this.options, this.additionallyAllowedTenantIds, logger) || this.tenantId;
      if (!(0, msalPlugins_js_1.hasVSCodePlugin)() || !msalPlugins_js_1.vsCodeAuthRecordPath) {
        throw new errors_js_1.CredentialUnavailableError("Visual Studio Code Authentication is not available. Ensure you have have Azure Resources Extension installed in VS Code, signed into Azure via VS Code, installed the @azure/identity-vscode package, and properly configured the extension.");
      }
      const authenticationRecord = await this.loadAuthRecord(msalPlugins_js_1.vsCodeAuthRecordPath, scopes);
      this.msalClient = (0, msalClient_js_1.createMsalClient)(VSCodeClientId, tenantId, {
        ...this.options,
        isVSCodeCredential: true,
        brokerOptions: {
          enabled: true,
          parentWindowHandle: new Uint8Array(0),
          useDefaultBrokerAccount: true
        },
        authenticationRecord
      });
    }
    /**
     * The promise of the single preparation that will be executed at the first getToken request for an instance of this class.
     */
    preparePromise;
    /**
     * Runs preparations for any further getToken, but only once.
     */
    prepareOnce(scopes) {
      if (!this.preparePromise) {
        this.preparePromise = this.prepare(scopes);
      }
      return this.preparePromise;
    }
    /**
     * Returns the token found by searching VSCode's authentication cache or
     * returns null if no token could be found.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                `TokenCredential` implementation might make.
     */
    async getToken(scopes, options) {
      const scopeArray = (0, scopeUtils_js_1.ensureScopes)(scopes);
      await this.prepareOnce(scopeArray);
      if (!this.msalClient) {
        throw new errors_js_1.CredentialUnavailableError("Visual Studio Code Authentication failed to initialize. Ensure you have have Azure Resources Extension installed in VS Code, signed into Azure via VS Code, installed the @azure/identity-vscode package, and properly configured the extension.");
      }
      return this.msalClient.getTokenByInteractiveRequest(scopeArray, {
        ...options,
        disableAutomaticAuthentication: true
      });
    }
    /**
     * Loads the authentication record from the specified path.
     * @param authRecordPath - The path to the authentication record file.
     * @param scopes - The list of scopes for which the token will have access.
     * @returns The authentication record or undefined if loading fails.
     */
    async loadAuthRecord(authRecordPath, scopes) {
      try {
        const authRecordContent = await (0, promises_1.readFile)(authRecordPath, { encoding: "utf8" });
        return (0, utils_js_1.deserializeAuthenticationRecord)(authRecordContent);
      } catch (error) {
        logger.getToken.info((0, logging_js_1.formatError)(scopes, error));
        throw new errors_js_1.CredentialUnavailableError("Cannot load authentication record in Visual Studio Code. Ensure you have have Azure Resources Extension installed in VS Code, signed into Azure via VS Code, installed the @azure/identity-vscode package, and properly configured the extension.");
      }
    }
  }
  visualStudioCodeCredential.VisualStudioCodeCredential = VisualStudioCodeCredential;
  return visualStudioCodeCredential;
}
var brokerCredential = {};
var hasRequiredBrokerCredential;
function requireBrokerCredential() {
  if (hasRequiredBrokerCredential) return brokerCredential;
  hasRequiredBrokerCredential = 1;
  Object.defineProperty(brokerCredential, "__esModule", { value: true });
  brokerCredential.BrokerCredential = void 0;
  const tenantIdUtils_js_1 = requireTenantIdUtils();
  const logging_js_1 = requireLogging();
  const scopeUtils_js_1 = requireScopeUtils();
  const tracing_js_1 = requireTracing();
  const msalClient_js_1 = requireMsalClient();
  const constants_js_1 = requireConstants();
  const errors_js_1 = requireErrors();
  const logger = (0, logging_js_1.credentialLogger)("BrokerCredential");
  class BrokerCredential {
    brokerMsalClient;
    brokerTenantId;
    brokerAdditionallyAllowedTenantIds;
    /**
     * Creates an instance of BrokerCredential with the required broker options.
     *
     * This credential uses WAM (Web Account Manager) for authentication, which provides
     * better security and user experience on Windows platforms.
     *
     * @param options - Options for configuring the broker credential, including required broker options.
     */
    constructor(options) {
      this.brokerTenantId = (0, tenantIdUtils_js_1.resolveTenantId)(logger, options.tenantId);
      this.brokerAdditionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
      const msalClientOptions = {
        ...options,
        tokenCredentialOptions: options,
        logger,
        brokerOptions: {
          enabled: true,
          parentWindowHandle: new Uint8Array(0),
          useDefaultBrokerAccount: true
        }
      };
      this.brokerMsalClient = (0, msalClient_js_1.createMsalClient)(constants_js_1.DeveloperSignOnClientId, this.brokerTenantId, msalClientOptions);
    }
    /**
     * Authenticates with Microsoft Entra ID using WAM broker and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * This method extends the base getToken method to support silentAuthenticationOnly option
     * when using broker authentication.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure the token request, including silentAuthenticationOnly option.
     */
    async getToken(scopes, options = {}) {
      return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions) => {
        newOptions.tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.brokerTenantId, newOptions, this.brokerAdditionallyAllowedTenantIds, logger);
        const arrayScopes = (0, scopeUtils_js_1.ensureScopes)(scopes);
        try {
          return this.brokerMsalClient.getBrokeredToken(arrayScopes, true, {
            ...newOptions,
            disableAutomaticAuthentication: true
          });
        } catch (e) {
          logger.getToken.info((0, logging_js_1.formatError)(arrayScopes, e));
          throw new errors_js_1.CredentialUnavailableError("Failed to acquire token using broker authentication", { cause: e });
        }
      });
    }
  }
  brokerCredential.BrokerCredential = BrokerCredential;
  return brokerCredential;
}
var hasRequiredDefaultAzureCredentialFunctions;
function requireDefaultAzureCredentialFunctions() {
  if (hasRequiredDefaultAzureCredentialFunctions) return defaultAzureCredentialFunctions;
  hasRequiredDefaultAzureCredentialFunctions = 1;
  Object.defineProperty(defaultAzureCredentialFunctions, "__esModule", { value: true });
  defaultAzureCredentialFunctions.createDefaultBrokerCredential = createDefaultBrokerCredential;
  defaultAzureCredentialFunctions.createDefaultVisualStudioCodeCredential = createDefaultVisualStudioCodeCredential;
  defaultAzureCredentialFunctions.createDefaultManagedIdentityCredential = createDefaultManagedIdentityCredential;
  defaultAzureCredentialFunctions.createDefaultWorkloadIdentityCredential = createDefaultWorkloadIdentityCredential;
  defaultAzureCredentialFunctions.createDefaultAzureDeveloperCliCredential = createDefaultAzureDeveloperCliCredential;
  defaultAzureCredentialFunctions.createDefaultAzureCliCredential = createDefaultAzureCliCredential;
  defaultAzureCredentialFunctions.createDefaultAzurePowershellCredential = createDefaultAzurePowershellCredential;
  defaultAzureCredentialFunctions.createDefaultEnvironmentCredential = createDefaultEnvironmentCredential;
  const environmentCredential_js_1 = requireEnvironmentCredential();
  const index_js_1 = requireManagedIdentityCredential();
  const workloadIdentityCredential_js_1 = requireWorkloadIdentityCredential();
  const azureDeveloperCliCredential_js_1 = requireAzureDeveloperCliCredential();
  const azureCliCredential_js_1 = requireAzureCliCredential();
  const azurePowerShellCredential_js_1 = requireAzurePowerShellCredential();
  const visualStudioCodeCredential_js_1 = requireVisualStudioCodeCredential();
  const brokerCredential_js_1 = requireBrokerCredential();
  function createDefaultBrokerCredential(options = {}) {
    return new brokerCredential_js_1.BrokerCredential(options);
  }
  function createDefaultVisualStudioCodeCredential(options = {}) {
    return new visualStudioCodeCredential_js_1.VisualStudioCodeCredential(options);
  }
  function createDefaultManagedIdentityCredential(options = {}) {
    options.retryOptions ??= {
      maxRetries: 5,
      retryDelayInMs: 800
    };
    options.sendProbeRequest ??= true;
    const managedIdentityClientId = options?.managedIdentityClientId ?? process.env.AZURE_CLIENT_ID;
    const workloadIdentityClientId = options?.workloadIdentityClientId ?? managedIdentityClientId;
    const managedResourceId = options?.managedIdentityResourceId;
    const workloadFile = process.env.AZURE_FEDERATED_TOKEN_FILE;
    const tenantId = options?.tenantId ?? process.env.AZURE_TENANT_ID;
    if (managedResourceId) {
      const managedIdentityResourceIdOptions = {
        ...options,
        resourceId: managedResourceId
      };
      return new index_js_1.ManagedIdentityCredential(managedIdentityResourceIdOptions);
    }
    if (workloadFile && workloadIdentityClientId) {
      const workloadIdentityCredentialOptions = {
        ...options,
        tenantId
      };
      return new index_js_1.ManagedIdentityCredential(workloadIdentityClientId, workloadIdentityCredentialOptions);
    }
    if (managedIdentityClientId) {
      const managedIdentityClientOptions = {
        ...options,
        clientId: managedIdentityClientId
      };
      return new index_js_1.ManagedIdentityCredential(managedIdentityClientOptions);
    }
    return new index_js_1.ManagedIdentityCredential(options);
  }
  function createDefaultWorkloadIdentityCredential(options) {
    const managedIdentityClientId = options?.managedIdentityClientId ?? process.env.AZURE_CLIENT_ID;
    const workloadIdentityClientId = options?.workloadIdentityClientId ?? managedIdentityClientId;
    const workloadFile = process.env.AZURE_FEDERATED_TOKEN_FILE;
    const tenantId = options?.tenantId ?? process.env.AZURE_TENANT_ID;
    if (workloadFile && workloadIdentityClientId) {
      const workloadIdentityCredentialOptions = {
        ...options,
        tenantId,
        clientId: workloadIdentityClientId,
        tokenFilePath: workloadFile
      };
      return new workloadIdentityCredential_js_1.WorkloadIdentityCredential(workloadIdentityCredentialOptions);
    }
    if (tenantId) {
      const workloadIdentityClientTenantOptions = {
        ...options,
        tenantId
      };
      return new workloadIdentityCredential_js_1.WorkloadIdentityCredential(workloadIdentityClientTenantOptions);
    }
    return new workloadIdentityCredential_js_1.WorkloadIdentityCredential(options);
  }
  function createDefaultAzureDeveloperCliCredential(options = {}) {
    return new azureDeveloperCliCredential_js_1.AzureDeveloperCliCredential(options);
  }
  function createDefaultAzureCliCredential(options = {}) {
    return new azureCliCredential_js_1.AzureCliCredential(options);
  }
  function createDefaultAzurePowershellCredential(options = {}) {
    return new azurePowerShellCredential_js_1.AzurePowerShellCredential(options);
  }
  function createDefaultEnvironmentCredential(options = {}) {
    return new environmentCredential_js_1.EnvironmentCredential(options);
  }
  return defaultAzureCredentialFunctions;
}
var hasRequiredDefaultAzureCredential;
function requireDefaultAzureCredential() {
  if (hasRequiredDefaultAzureCredential) return defaultAzureCredential;
  hasRequiredDefaultAzureCredential = 1;
  Object.defineProperty(defaultAzureCredential, "__esModule", { value: true });
  defaultAzureCredential.DefaultAzureCredential = defaultAzureCredential.UnavailableDefaultCredential = void 0;
  const chainedTokenCredential_js_1 = requireChainedTokenCredential();
  const logging_js_1 = requireLogging();
  const defaultAzureCredentialFunctions_js_1 = requireDefaultAzureCredentialFunctions();
  const logger = (0, logging_js_1.credentialLogger)("DefaultAzureCredential");
  class UnavailableDefaultCredential {
    credentialUnavailableErrorMessage;
    credentialName;
    constructor(credentialName, message) {
      this.credentialName = credentialName;
      this.credentialUnavailableErrorMessage = message;
    }
    getToken() {
      logger.getToken.info(`Skipping ${this.credentialName}, reason: ${this.credentialUnavailableErrorMessage}`);
      return Promise.resolve(null);
    }
  }
  defaultAzureCredential.UnavailableDefaultCredential = UnavailableDefaultCredential;
  class DefaultAzureCredential extends chainedTokenCredential_js_1.ChainedTokenCredential {
    constructor(options) {
      validateRequiredEnvVars(options);
      const azureTokenCredentials = process.env.AZURE_TOKEN_CREDENTIALS ? process.env.AZURE_TOKEN_CREDENTIALS.trim().toLowerCase() : void 0;
      const devCredentialFunctions = [
        defaultAzureCredentialFunctions_js_1.createDefaultVisualStudioCodeCredential,
        defaultAzureCredentialFunctions_js_1.createDefaultAzureCliCredential,
        defaultAzureCredentialFunctions_js_1.createDefaultAzurePowershellCredential,
        defaultAzureCredentialFunctions_js_1.createDefaultAzureDeveloperCliCredential,
        defaultAzureCredentialFunctions_js_1.createDefaultBrokerCredential
      ];
      const prodCredentialFunctions = [
        defaultAzureCredentialFunctions_js_1.createDefaultEnvironmentCredential,
        defaultAzureCredentialFunctions_js_1.createDefaultWorkloadIdentityCredential,
        defaultAzureCredentialFunctions_js_1.createDefaultManagedIdentityCredential
      ];
      let credentialFunctions = [];
      const validCredentialNames = "EnvironmentCredential, WorkloadIdentityCredential, ManagedIdentityCredential, VisualStudioCodeCredential, AzureCliCredential, AzurePowerShellCredential, AzureDeveloperCliCredential";
      if (azureTokenCredentials) {
        switch (azureTokenCredentials) {
          case "dev":
            credentialFunctions = devCredentialFunctions;
            break;
          case "prod":
            credentialFunctions = prodCredentialFunctions;
            break;
          case "environmentcredential":
            credentialFunctions = [defaultAzureCredentialFunctions_js_1.createDefaultEnvironmentCredential];
            break;
          case "workloadidentitycredential":
            credentialFunctions = [defaultAzureCredentialFunctions_js_1.createDefaultWorkloadIdentityCredential];
            break;
          case "managedidentitycredential":
            credentialFunctions = [
              () => (0, defaultAzureCredentialFunctions_js_1.createDefaultManagedIdentityCredential)({ sendProbeRequest: false })
            ];
            break;
          case "visualstudiocodecredential":
            credentialFunctions = [defaultAzureCredentialFunctions_js_1.createDefaultVisualStudioCodeCredential];
            break;
          case "azureclicredential":
            credentialFunctions = [defaultAzureCredentialFunctions_js_1.createDefaultAzureCliCredential];
            break;
          case "azurepowershellcredential":
            credentialFunctions = [defaultAzureCredentialFunctions_js_1.createDefaultAzurePowershellCredential];
            break;
          case "azuredeveloperclicredential":
            credentialFunctions = [defaultAzureCredentialFunctions_js_1.createDefaultAzureDeveloperCliCredential];
            break;
          default: {
            const errorMessage = `Invalid value for AZURE_TOKEN_CREDENTIALS = ${process.env.AZURE_TOKEN_CREDENTIALS}. Valid values are 'prod' or 'dev' or any of these credentials - ${validCredentialNames}.`;
            logger.warning(errorMessage);
            throw new Error(errorMessage);
          }
        }
      } else {
        credentialFunctions = [...prodCredentialFunctions, ...devCredentialFunctions];
      }
      const credentials = credentialFunctions.map((createCredentialFn) => {
        try {
          return createCredentialFn(options ?? {});
        } catch (err) {
          logger.warning(`Skipped ${createCredentialFn.name} because of an error creating the credential: ${err}`);
          return new UnavailableDefaultCredential(createCredentialFn.name, err.message);
        }
      });
      super(...credentials);
    }
  }
  defaultAzureCredential.DefaultAzureCredential = DefaultAzureCredential;
  function validateRequiredEnvVars(options) {
    if (options?.requiredEnvVars) {
      const requiredVars = Array.isArray(options.requiredEnvVars) ? options.requiredEnvVars : [options.requiredEnvVars];
      const missing = requiredVars.filter((envVar) => !process.env[envVar]);
      if (missing.length > 0) {
        const errorMessage = `Required environment ${missing.length === 1 ? "variable" : "variables"} '${missing.join(", ")}' for DefaultAzureCredential ${missing.length === 1 ? "is" : "are"} not set or empty.`;
        logger.warning(errorMessage);
        throw new Error(errorMessage);
      }
    }
  }
  return defaultAzureCredential;
}
var interactiveBrowserCredential = {};
var hasRequiredInteractiveBrowserCredential;
function requireInteractiveBrowserCredential() {
  if (hasRequiredInteractiveBrowserCredential) return interactiveBrowserCredential;
  hasRequiredInteractiveBrowserCredential = 1;
  Object.defineProperty(interactiveBrowserCredential, "__esModule", { value: true });
  interactiveBrowserCredential.InteractiveBrowserCredential = void 0;
  const tenantIdUtils_js_1 = requireTenantIdUtils();
  const logging_js_1 = requireLogging();
  const scopeUtils_js_1 = requireScopeUtils();
  const tracing_js_1 = requireTracing();
  const msalClient_js_1 = requireMsalClient();
  const constants_js_1 = requireConstants();
  const logger = (0, logging_js_1.credentialLogger)("InteractiveBrowserCredential");
  class InteractiveBrowserCredential {
    tenantId;
    additionallyAllowedTenantIds;
    msalClient;
    disableAutomaticAuthentication;
    browserCustomizationOptions;
    loginHint;
    /**
     * Creates an instance of InteractiveBrowserCredential with the details needed.
     *
     * This credential uses the [Authorization Code Flow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow).
     * On Node.js, it will open a browser window while it listens for a redirect response from the authentication service.
     * On browsers, it authenticates via popups. The `loginStyle` optional parameter can be set to `redirect` to authenticate by redirecting the user to an Azure secure login page, which then will redirect the user back to the web application where the authentication started.
     *
     * For Node.js, if a `clientId` is provided, the Microsoft Entra application will need to be configured to have a "Mobile and desktop applications" redirect endpoint.
     * Follow our guide on [setting up Redirect URIs for Desktop apps that calls to web APIs](https://learn.microsoft.com/entra/identity-platform/scenario-desktop-app-registration#redirect-uris).
     *
     * @param options - Options for configuring the client which makes the authentication requests.
     */
    constructor(options) {
      this.tenantId = (0, tenantIdUtils_js_1.resolveTenantId)(logger, options.tenantId, options.clientId);
      this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
      const msalClientOptions = {
        ...options,
        tokenCredentialOptions: options,
        logger
      };
      const ibcNodeOptions = options;
      this.browserCustomizationOptions = ibcNodeOptions.browserCustomizationOptions;
      this.loginHint = ibcNodeOptions.loginHint;
      if (ibcNodeOptions?.brokerOptions?.enabled) {
        if (!ibcNodeOptions?.brokerOptions?.parentWindowHandle) {
          throw new Error("In order to do WAM authentication, `parentWindowHandle` under `brokerOptions` is a required parameter");
        } else {
          msalClientOptions.brokerOptions = {
            enabled: true,
            parentWindowHandle: ibcNodeOptions.brokerOptions.parentWindowHandle,
            legacyEnableMsaPassthrough: ibcNodeOptions.brokerOptions?.legacyEnableMsaPassthrough,
            useDefaultBrokerAccount: ibcNodeOptions.brokerOptions?.useDefaultBrokerAccount
          };
        }
      }
      this.msalClient = (0, msalClient_js_1.createMsalClient)(options.clientId ?? constants_js_1.DeveloperSignOnClientId, this.tenantId, msalClientOptions);
      this.disableAutomaticAuthentication = options?.disableAutomaticAuthentication;
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * If the user provided the option `disableAutomaticAuthentication`,
     * once the token can't be retrieved silently,
     * this method won't attempt to request user interaction to retrieve the token.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    async getToken(scopes, options = {}) {
      return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions) => {
        newOptions.tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, newOptions, this.additionallyAllowedTenantIds, logger);
        const arrayScopes = (0, scopeUtils_js_1.ensureScopes)(scopes);
        return this.msalClient.getTokenByInteractiveRequest(arrayScopes, {
          ...newOptions,
          disableAutomaticAuthentication: this.disableAutomaticAuthentication,
          browserCustomizationOptions: this.browserCustomizationOptions,
          loginHint: this.loginHint
        });
      });
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * If the token can't be retrieved silently, this method will always generate a challenge for the user.
     *
     * On Node.js, this credential has [Proof Key for Code Exchange (PKCE)](https://datatracker.ietf.org/doc/html/rfc7636) enabled by default.
     * PKCE is a security feature that mitigates authentication code interception attacks.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                  TokenCredential implementation might make.
     */
    async authenticate(scopes, options = {}) {
      return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.authenticate`, options, async (newOptions) => {
        const arrayScopes = (0, scopeUtils_js_1.ensureScopes)(scopes);
        await this.msalClient.getTokenByInteractiveRequest(arrayScopes, {
          ...newOptions,
          disableAutomaticAuthentication: false,
          // this method should always allow user interaction
          browserCustomizationOptions: this.browserCustomizationOptions,
          loginHint: this.loginHint
        });
        return this.msalClient.getActiveAccount();
      });
    }
  }
  interactiveBrowserCredential.InteractiveBrowserCredential = InteractiveBrowserCredential;
  return interactiveBrowserCredential;
}
var deviceCodeCredential = {};
var hasRequiredDeviceCodeCredential;
function requireDeviceCodeCredential() {
  if (hasRequiredDeviceCodeCredential) return deviceCodeCredential;
  hasRequiredDeviceCodeCredential = 1;
  Object.defineProperty(deviceCodeCredential, "__esModule", { value: true });
  deviceCodeCredential.DeviceCodeCredential = void 0;
  deviceCodeCredential.defaultDeviceCodePromptCallback = defaultDeviceCodePromptCallback;
  const tenantIdUtils_js_1 = requireTenantIdUtils();
  const logging_js_1 = requireLogging();
  const scopeUtils_js_1 = requireScopeUtils();
  const tracing_js_1 = requireTracing();
  const msalClient_js_1 = requireMsalClient();
  const constants_js_1 = requireConstants();
  const logger = (0, logging_js_1.credentialLogger)("DeviceCodeCredential");
  function defaultDeviceCodePromptCallback(deviceCodeInfo) {
    console.log(deviceCodeInfo.message);
  }
  class DeviceCodeCredential {
    tenantId;
    additionallyAllowedTenantIds;
    disableAutomaticAuthentication;
    msalClient;
    userPromptCallback;
    /**
     * Creates an instance of DeviceCodeCredential with the details needed
     * to initiate the device code authorization flow with Microsoft Entra ID.
     *
     * A message will be logged, giving users a code that they can use to authenticate once they go to https://microsoft.com/devicelogin
     *
     * Developers can configure how this message is shown by passing a custom `userPromptCallback`:
     *
     * ```ts snippet:device_code_credential_example
     * import { DeviceCodeCredential } from "@azure/identity";
     *
     * const credential = new DeviceCodeCredential({
     *   tenantId: process.env.AZURE_TENANT_ID,
     *   clientId: process.env.AZURE_CLIENT_ID,
     *   userPromptCallback: (info) => {
     *     console.log("CUSTOMIZED PROMPT CALLBACK", info.message);
     *   },
     * });
     * ```
     *
     * @param options - Options for configuring the client which makes the authentication requests.
     */
    constructor(options) {
      this.tenantId = options?.tenantId;
      this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
      const clientId = options?.clientId ?? constants_js_1.DeveloperSignOnClientId;
      const tenantId = (0, tenantIdUtils_js_1.resolveTenantId)(logger, options?.tenantId, clientId);
      this.userPromptCallback = options?.userPromptCallback ?? defaultDeviceCodePromptCallback;
      this.msalClient = (0, msalClient_js_1.createMsalClient)(clientId, tenantId, {
        ...options,
        logger,
        tokenCredentialOptions: options || {}
      });
      this.disableAutomaticAuthentication = options?.disableAutomaticAuthentication;
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * If the user provided the option `disableAutomaticAuthentication`,
     * once the token can't be retrieved silently,
     * this method won't attempt to request user interaction to retrieve the token.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    async getToken(scopes, options = {}) {
      return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions) => {
        newOptions.tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, newOptions, this.additionallyAllowedTenantIds, logger);
        const arrayScopes = (0, scopeUtils_js_1.ensureScopes)(scopes);
        return this.msalClient.getTokenByDeviceCode(arrayScopes, this.userPromptCallback, {
          ...newOptions,
          disableAutomaticAuthentication: this.disableAutomaticAuthentication
        });
      });
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * If the token can't be retrieved silently, this method will always generate a challenge for the user.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                  TokenCredential implementation might make.
     */
    async authenticate(scopes, options = {}) {
      return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.authenticate`, options, async (newOptions) => {
        const arrayScopes = Array.isArray(scopes) ? scopes : [scopes];
        await this.msalClient.getTokenByDeviceCode(arrayScopes, this.userPromptCallback, {
          ...newOptions,
          disableAutomaticAuthentication: false
          // this method should always allow user interaction
        });
        return this.msalClient.getActiveAccount();
      });
    }
  }
  deviceCodeCredential.DeviceCodeCredential = DeviceCodeCredential;
  return deviceCodeCredential;
}
var azurePipelinesCredential = {};
var hasRequiredAzurePipelinesCredential;
function requireAzurePipelinesCredential() {
  if (hasRequiredAzurePipelinesCredential) return azurePipelinesCredential;
  hasRequiredAzurePipelinesCredential = 1;
  Object.defineProperty(azurePipelinesCredential, "__esModule", { value: true });
  azurePipelinesCredential.AzurePipelinesCredential = void 0;
  azurePipelinesCredential.handleOidcResponse = handleOidcResponse;
  const errors_js_1 = requireErrors();
  const core_rest_pipeline_1 = /* @__PURE__ */ requireCommonjs$6();
  const clientAssertionCredential_js_1 = requireClientAssertionCredential();
  const identityClient_js_1 = requireIdentityClient();
  const tenantIdUtils_js_1 = requireTenantIdUtils();
  const logging_js_1 = requireLogging();
  const credentialName = "AzurePipelinesCredential";
  const logger = (0, logging_js_1.credentialLogger)(credentialName);
  const OIDC_API_VERSION = "7.1";
  class AzurePipelinesCredential {
    clientAssertionCredential;
    identityClient;
    /**
     * AzurePipelinesCredential supports Federated Identity on Azure Pipelines through Service Connections.
     * @param tenantId - tenantId associated with the service connection
     * @param clientId - clientId associated with the service connection
     * @param serviceConnectionId - Unique ID for the service connection, as found in the querystring's resourceId key
     * @param systemAccessToken - The pipeline's <see href="https://learn.microsoft.com/azure/devops/pipelines/build/variables?view=azure-devops%26tabs=yaml#systemaccesstoken">System.AccessToken</see> value.
     * @param options - The identity client options to use for authentication.
     */
    constructor(tenantId, clientId, serviceConnectionId, systemAccessToken, options = {}) {
      if (!clientId) {
        throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. clientId is a required parameter.`);
      }
      if (!tenantId) {
        throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. tenantId is a required parameter.`);
      }
      if (!serviceConnectionId) {
        throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. serviceConnectionId is a required parameter.`);
      }
      if (!systemAccessToken) {
        throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. systemAccessToken is a required parameter.`);
      }
      options.loggingOptions = {
        ...options?.loggingOptions,
        additionalAllowedHeaderNames: [
          ...options.loggingOptions?.additionalAllowedHeaderNames ?? [],
          "x-vss-e2eid",
          "x-msedge-ref"
        ]
      };
      this.identityClient = new identityClient_js_1.IdentityClient(options);
      (0, tenantIdUtils_js_1.checkTenantId)(logger, tenantId);
      logger.info(`Invoking AzurePipelinesCredential with tenant ID: ${tenantId}, client ID: ${clientId}, and service connection ID: ${serviceConnectionId}`);
      if (!process.env.SYSTEM_OIDCREQUESTURI) {
        throw new errors_js_1.CredentialUnavailableError(`${credentialName}: is unavailable. Ensure that you're running this task in an Azure Pipeline, so that following missing system variable(s) can be defined- "SYSTEM_OIDCREQUESTURI"`);
      }
      const oidcRequestUrl = `${process.env.SYSTEM_OIDCREQUESTURI}?api-version=${OIDC_API_VERSION}&serviceConnectionId=${serviceConnectionId}`;
      logger.info(`Invoking ClientAssertionCredential with tenant ID: ${tenantId}, client ID: ${clientId} and service connection ID: ${serviceConnectionId}`);
      this.clientAssertionCredential = new clientAssertionCredential_js_1.ClientAssertionCredential(tenantId, clientId, this.requestOidcToken.bind(this, oidcRequestUrl, systemAccessToken), options);
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} or {@link AuthenticationError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    async getToken(scopes, options) {
      if (!this.clientAssertionCredential) {
        const errorMessage = `${credentialName}: is unavailable. To use Federation Identity in Azure Pipelines, the following parameters are required - 
      tenantId,
      clientId,
      serviceConnectionId,
      systemAccessToken,
      "SYSTEM_OIDCREQUESTURI".      
      See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/azurepipelinescredential/troubleshoot`;
        logger.error(errorMessage);
        throw new errors_js_1.CredentialUnavailableError(errorMessage);
      }
      logger.info("Invoking getToken() of Client Assertion Credential");
      return this.clientAssertionCredential.getToken(scopes, options);
    }
    /**
     *
     * @param oidcRequestUrl - oidc request url
     * @param systemAccessToken - system access token
     * @returns OIDC token from Azure Pipelines
     */
    async requestOidcToken(oidcRequestUrl, systemAccessToken) {
      logger.info("Requesting OIDC token from Azure Pipelines...");
      logger.info(oidcRequestUrl);
      const request = (0, core_rest_pipeline_1.createPipelineRequest)({
        url: oidcRequestUrl,
        method: "POST",
        headers: (0, core_rest_pipeline_1.createHttpHeaders)({
          "Content-Type": "application/json",
          Authorization: `Bearer ${systemAccessToken}`,
          // Prevents the service from responding with a redirect HTTP status code (useful for automation).
          "X-TFS-FedAuthRedirect": "Suppress"
        })
      });
      const response = await this.identityClient.sendRequest(request);
      return handleOidcResponse(response);
    }
  }
  azurePipelinesCredential.AzurePipelinesCredential = AzurePipelinesCredential;
  function handleOidcResponse(response) {
    const text = response.bodyAsText;
    if (!text) {
      logger.error(`${credentialName}: Authentication Failed. Received null token from OIDC request. Response status- ${response.status}. Complete response - ${JSON.stringify(response)}`);
      throw new errors_js_1.AuthenticationError(response.status, {
        error: `${credentialName}: Authentication Failed. Received null token from OIDC request.`,
        error_description: `${JSON.stringify(response)}. See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/azurepipelinescredential/troubleshoot`
      });
    }
    try {
      const result = JSON.parse(text);
      if (result?.oidcToken) {
        return result.oidcToken;
      } else {
        const errorMessage = `${credentialName}: Authentication Failed. oidcToken field not detected in the response.`;
        let errorDescription = ``;
        if (response.status !== 200) {
          errorDescription = `Response body = ${text}. Response Headers ["x-vss-e2eid"] = ${response.headers.get("x-vss-e2eid")} and ["x-msedge-ref"] = ${response.headers.get("x-msedge-ref")}. See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/azurepipelinescredential/troubleshoot`;
        }
        logger.error(errorMessage);
        logger.error(errorDescription);
        throw new errors_js_1.AuthenticationError(response.status, {
          error: errorMessage,
          error_description: errorDescription
        });
      }
    } catch (e) {
      const errorDetails = `${credentialName}: Authentication Failed. oidcToken field not detected in the response.`;
      logger.error(`Response from service = ${text}, Response Headers ["x-vss-e2eid"] = ${response.headers.get("x-vss-e2eid")} 
      and ["x-msedge-ref"] = ${response.headers.get("x-msedge-ref")}, error message = ${e.message}`);
      logger.error(errorDetails);
      throw new errors_js_1.AuthenticationError(response.status, {
        error: errorDetails,
        error_description: `Response = ${text}. Response headers ["x-vss-e2eid"] = ${response.headers.get("x-vss-e2eid")} and ["x-msedge-ref"] =  ${response.headers.get("x-msedge-ref")}. See the troubleshooting guide for more information: https://aka.ms/azsdk/js/identity/azurepipelinescredential/troubleshoot`
      });
    }
  }
  return azurePipelinesCredential;
}
var authorizationCodeCredential = {};
var hasRequiredAuthorizationCodeCredential;
function requireAuthorizationCodeCredential() {
  if (hasRequiredAuthorizationCodeCredential) return authorizationCodeCredential;
  hasRequiredAuthorizationCodeCredential = 1;
  Object.defineProperty(authorizationCodeCredential, "__esModule", { value: true });
  authorizationCodeCredential.AuthorizationCodeCredential = void 0;
  const tenantIdUtils_js_1 = requireTenantIdUtils();
  const tenantIdUtils_js_2 = requireTenantIdUtils();
  const logging_js_1 = requireLogging();
  const scopeUtils_js_1 = requireScopeUtils();
  const tracing_js_1 = requireTracing();
  const msalClient_js_1 = requireMsalClient();
  const logger = (0, logging_js_1.credentialLogger)("AuthorizationCodeCredential");
  class AuthorizationCodeCredential {
    msalClient;
    disableAutomaticAuthentication;
    authorizationCode;
    redirectUri;
    tenantId;
    additionallyAllowedTenantIds;
    clientSecret;
    /**
     * @hidden
     * @internal
     */
    constructor(tenantId, clientId, clientSecretOrAuthorizationCode, authorizationCodeOrRedirectUri, redirectUriOrOptions, options) {
      (0, tenantIdUtils_js_2.checkTenantId)(logger, tenantId);
      this.clientSecret = clientSecretOrAuthorizationCode;
      if (typeof redirectUriOrOptions === "string") {
        this.authorizationCode = authorizationCodeOrRedirectUri;
        this.redirectUri = redirectUriOrOptions;
      } else {
        this.authorizationCode = clientSecretOrAuthorizationCode;
        this.redirectUri = authorizationCodeOrRedirectUri;
        this.clientSecret = void 0;
        options = redirectUriOrOptions;
      }
      this.tenantId = tenantId;
      this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(options?.additionallyAllowedTenants);
      this.msalClient = (0, msalClient_js_1.createMsalClient)(clientId, tenantId, {
        ...options,
        logger,
        tokenCredentialOptions: options ?? {}
      });
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                TokenCredential implementation might make.
     */
    async getToken(scopes, options = {}) {
      return tracing_js_1.tracingClient.withSpan(`${this.constructor.name}.getToken`, options, async (newOptions) => {
        const tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, newOptions, this.additionallyAllowedTenantIds);
        newOptions.tenantId = tenantId;
        const arrayScopes = (0, scopeUtils_js_1.ensureScopes)(scopes);
        return this.msalClient.getTokenByAuthorizationCode(arrayScopes, this.redirectUri, this.authorizationCode, this.clientSecret, {
          ...newOptions,
          disableAutomaticAuthentication: this.disableAutomaticAuthentication
        });
      });
    }
  }
  authorizationCodeCredential.AuthorizationCodeCredential = AuthorizationCodeCredential;
  return authorizationCodeCredential;
}
var onBehalfOfCredential = {};
var hasRequiredOnBehalfOfCredential;
function requireOnBehalfOfCredential() {
  if (hasRequiredOnBehalfOfCredential) return onBehalfOfCredential;
  hasRequiredOnBehalfOfCredential = 1;
  Object.defineProperty(onBehalfOfCredential, "__esModule", { value: true });
  onBehalfOfCredential.OnBehalfOfCredential = void 0;
  const msalClient_js_1 = requireMsalClient();
  const logging_js_1 = requireLogging();
  const tenantIdUtils_js_1 = requireTenantIdUtils();
  const errors_js_1 = requireErrors();
  const node_crypto_1 = require$$0;
  const scopeUtils_js_1 = requireScopeUtils();
  const promises_1 = fs;
  const tracing_js_1 = requireTracing();
  const credentialName = "OnBehalfOfCredential";
  const logger = (0, logging_js_1.credentialLogger)(credentialName);
  class OnBehalfOfCredential {
    tenantId;
    additionallyAllowedTenantIds;
    msalClient;
    sendCertificateChain;
    certificatePath;
    clientSecret;
    userAssertionToken;
    clientAssertion;
    constructor(options) {
      const { clientSecret } = options;
      const { certificatePath, sendCertificateChain } = options;
      const { getAssertion } = options;
      const { tenantId, clientId, userAssertionToken, additionallyAllowedTenants: additionallyAllowedTenantIds } = options;
      if (!tenantId) {
        throw new errors_js_1.CredentialUnavailableError(`${credentialName}: tenantId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`);
      }
      if (!clientId) {
        throw new errors_js_1.CredentialUnavailableError(`${credentialName}: clientId is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`);
      }
      if (!clientSecret && !certificatePath && !getAssertion) {
        throw new errors_js_1.CredentialUnavailableError(`${credentialName}: You must provide one of clientSecret, certificatePath, or a getAssertion callback but none were provided. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`);
      }
      if (!userAssertionToken) {
        throw new errors_js_1.CredentialUnavailableError(`${credentialName}: userAssertionToken is a required parameter. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot.`);
      }
      this.certificatePath = certificatePath;
      this.clientSecret = clientSecret;
      this.userAssertionToken = userAssertionToken;
      this.sendCertificateChain = sendCertificateChain;
      this.clientAssertion = getAssertion;
      this.tenantId = tenantId;
      this.additionallyAllowedTenantIds = (0, tenantIdUtils_js_1.resolveAdditionallyAllowedTenantIds)(additionallyAllowedTenantIds);
      this.msalClient = (0, msalClient_js_1.createMsalClient)(clientId, this.tenantId, {
        ...options,
        logger,
        tokenCredentialOptions: options
      });
    }
    /**
     * Authenticates with Microsoft Entra ID and returns an access token if successful.
     * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure the underlying network requests.
     */
    async getToken(scopes, options = {}) {
      return tracing_js_1.tracingClient.withSpan(`${credentialName}.getToken`, options, async (newOptions) => {
        newOptions.tenantId = (0, tenantIdUtils_js_1.processMultiTenantRequest)(this.tenantId, newOptions, this.additionallyAllowedTenantIds, logger);
        const arrayScopes = (0, scopeUtils_js_1.ensureScopes)(scopes);
        if (this.certificatePath) {
          const clientCertificate = await this.buildClientCertificate(this.certificatePath);
          return this.msalClient.getTokenOnBehalfOf(arrayScopes, this.userAssertionToken, clientCertificate, newOptions);
        } else if (this.clientSecret) {
          return this.msalClient.getTokenOnBehalfOf(arrayScopes, this.userAssertionToken, this.clientSecret, options);
        } else if (this.clientAssertion) {
          return this.msalClient.getTokenOnBehalfOf(arrayScopes, this.userAssertionToken, this.clientAssertion, options);
        } else {
          throw new Error("Expected either clientSecret or certificatePath or clientAssertion to be defined.");
        }
      });
    }
    async buildClientCertificate(certificatePath) {
      try {
        const parts = await this.parseCertificate({ certificatePath }, this.sendCertificateChain);
        return {
          thumbprint: parts.thumbprint,
          thumbprintSha256: parts.thumbprintSha256,
          privateKey: parts.certificateContents,
          x5c: parts.x5c
        };
      } catch (error) {
        logger.info((0, logging_js_1.formatError)("", error));
        throw error;
      }
    }
    async parseCertificate(configuration, sendCertificateChain) {
      const certificatePath = configuration.certificatePath;
      const certificateContents = await (0, promises_1.readFile)(certificatePath, "utf8");
      const x5c = sendCertificateChain ? certificateContents : void 0;
      const certificatePattern = /(-+BEGIN CERTIFICATE-+)(\n\r?|\r\n?)([A-Za-z0-9+/\n\r]+=*)(\n\r?|\r\n?)(-+END CERTIFICATE-+)/g;
      const publicKeys = [];
      let match;
      do {
        match = certificatePattern.exec(certificateContents);
        if (match) {
          publicKeys.push(match[3]);
        }
      } while (match);
      if (publicKeys.length === 0) {
        throw new Error("The file at the specified path does not contain a PEM-encoded certificate.");
      }
      const thumbprint = (0, node_crypto_1.createHash)("sha1").update(Buffer.from(publicKeys[0], "base64")).digest("hex").toUpperCase();
      const thumbprintSha256 = (0, node_crypto_1.createHash)("sha256").update(Buffer.from(publicKeys[0], "base64")).digest("hex").toUpperCase();
      return {
        certificateContents,
        thumbprintSha256,
        thumbprint,
        x5c
      };
    }
  }
  onBehalfOfCredential.OnBehalfOfCredential = OnBehalfOfCredential;
  return onBehalfOfCredential;
}
var tokenProvider = {};
var hasRequiredTokenProvider;
function requireTokenProvider() {
  if (hasRequiredTokenProvider) return tokenProvider;
  hasRequiredTokenProvider = 1;
  Object.defineProperty(tokenProvider, "__esModule", { value: true });
  tokenProvider.getBearerTokenProvider = getBearerTokenProvider;
  const core_rest_pipeline_1 = /* @__PURE__ */ requireCommonjs$6();
  function getBearerTokenProvider(credential, scopes, options) {
    const { abortSignal, tracingOptions } = options || {};
    const pipeline = (0, core_rest_pipeline_1.createEmptyPipeline)();
    pipeline.addPolicy((0, core_rest_pipeline_1.bearerTokenAuthenticationPolicy)({ credential, scopes }));
    async function getRefreshedToken() {
      const res = await pipeline.sendRequest({
        sendRequest: (request) => Promise.resolve({
          request,
          status: 200,
          headers: request.headers
        })
      }, (0, core_rest_pipeline_1.createPipelineRequest)({
        url: "https://example.com",
        abortSignal,
        tracingOptions
      }));
      const accessToken = res.headers.get("authorization")?.split(" ")[1];
      if (!accessToken) {
        throw new Error("Failed to get access token");
      }
      return accessToken;
    }
    return getRefreshedToken;
  }
  return tokenProvider;
}
var hasRequiredCommonjs;
function requireCommonjs() {
  if (hasRequiredCommonjs) return commonjs;
  hasRequiredCommonjs = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getBearerTokenProvider = exports.AzureAuthorityHosts = exports.logger = exports.WorkloadIdentityCredential = exports.OnBehalfOfCredential = exports.VisualStudioCodeCredential = exports.UsernamePasswordCredential = exports.AzurePowerShellCredential = exports.AuthorizationCodeCredential = exports.AzurePipelinesCredential = exports.DeviceCodeCredential = exports.ManagedIdentityCredential = exports.InteractiveBrowserCredential = exports.AzureDeveloperCliCredential = exports.AzureCliCredential = exports.ClientAssertionCredential = exports.ClientCertificateCredential = exports.EnvironmentCredential = exports.DefaultAzureCredential = exports.ClientSecretCredential = exports.ChainedTokenCredential = exports.deserializeAuthenticationRecord = exports.serializeAuthenticationRecord = exports.AuthenticationRequiredError = exports.CredentialUnavailableErrorName = exports.CredentialUnavailableError = exports.AggregateAuthenticationErrorName = exports.AuthenticationErrorName = exports.AggregateAuthenticationError = exports.AuthenticationError = void 0;
    exports.getDefaultAzureCredential = getDefaultAzureCredential;
    const tslib_1 = /* @__PURE__ */ requireTslib();
    tslib_1.__exportStar(requireConsumer(), exports);
    const defaultAzureCredential_js_1 = requireDefaultAzureCredential();
    var errors_js_1 = requireErrors();
    Object.defineProperty(exports, "AuthenticationError", { enumerable: true, get: function() {
      return errors_js_1.AuthenticationError;
    } });
    Object.defineProperty(exports, "AggregateAuthenticationError", { enumerable: true, get: function() {
      return errors_js_1.AggregateAuthenticationError;
    } });
    Object.defineProperty(exports, "AuthenticationErrorName", { enumerable: true, get: function() {
      return errors_js_1.AuthenticationErrorName;
    } });
    Object.defineProperty(exports, "AggregateAuthenticationErrorName", { enumerable: true, get: function() {
      return errors_js_1.AggregateAuthenticationErrorName;
    } });
    Object.defineProperty(exports, "CredentialUnavailableError", { enumerable: true, get: function() {
      return errors_js_1.CredentialUnavailableError;
    } });
    Object.defineProperty(exports, "CredentialUnavailableErrorName", { enumerable: true, get: function() {
      return errors_js_1.CredentialUnavailableErrorName;
    } });
    Object.defineProperty(exports, "AuthenticationRequiredError", { enumerable: true, get: function() {
      return errors_js_1.AuthenticationRequiredError;
    } });
    var utils_js_1 = requireUtils$1();
    Object.defineProperty(exports, "serializeAuthenticationRecord", { enumerable: true, get: function() {
      return utils_js_1.serializeAuthenticationRecord;
    } });
    Object.defineProperty(exports, "deserializeAuthenticationRecord", { enumerable: true, get: function() {
      return utils_js_1.deserializeAuthenticationRecord;
    } });
    var chainedTokenCredential_js_1 = requireChainedTokenCredential();
    Object.defineProperty(exports, "ChainedTokenCredential", { enumerable: true, get: function() {
      return chainedTokenCredential_js_1.ChainedTokenCredential;
    } });
    var clientSecretCredential_js_1 = requireClientSecretCredential();
    Object.defineProperty(exports, "ClientSecretCredential", { enumerable: true, get: function() {
      return clientSecretCredential_js_1.ClientSecretCredential;
    } });
    var defaultAzureCredential_js_2 = requireDefaultAzureCredential();
    Object.defineProperty(exports, "DefaultAzureCredential", { enumerable: true, get: function() {
      return defaultAzureCredential_js_2.DefaultAzureCredential;
    } });
    var environmentCredential_js_1 = requireEnvironmentCredential();
    Object.defineProperty(exports, "EnvironmentCredential", { enumerable: true, get: function() {
      return environmentCredential_js_1.EnvironmentCredential;
    } });
    var clientCertificateCredential_js_1 = requireClientCertificateCredential();
    Object.defineProperty(exports, "ClientCertificateCredential", { enumerable: true, get: function() {
      return clientCertificateCredential_js_1.ClientCertificateCredential;
    } });
    var clientAssertionCredential_js_1 = requireClientAssertionCredential();
    Object.defineProperty(exports, "ClientAssertionCredential", { enumerable: true, get: function() {
      return clientAssertionCredential_js_1.ClientAssertionCredential;
    } });
    var azureCliCredential_js_1 = requireAzureCliCredential();
    Object.defineProperty(exports, "AzureCliCredential", { enumerable: true, get: function() {
      return azureCliCredential_js_1.AzureCliCredential;
    } });
    var azureDeveloperCliCredential_js_1 = requireAzureDeveloperCliCredential();
    Object.defineProperty(exports, "AzureDeveloperCliCredential", { enumerable: true, get: function() {
      return azureDeveloperCliCredential_js_1.AzureDeveloperCliCredential;
    } });
    var interactiveBrowserCredential_js_1 = requireInteractiveBrowserCredential();
    Object.defineProperty(exports, "InteractiveBrowserCredential", { enumerable: true, get: function() {
      return interactiveBrowserCredential_js_1.InteractiveBrowserCredential;
    } });
    var index_js_1 = requireManagedIdentityCredential();
    Object.defineProperty(exports, "ManagedIdentityCredential", { enumerable: true, get: function() {
      return index_js_1.ManagedIdentityCredential;
    } });
    var deviceCodeCredential_js_1 = requireDeviceCodeCredential();
    Object.defineProperty(exports, "DeviceCodeCredential", { enumerable: true, get: function() {
      return deviceCodeCredential_js_1.DeviceCodeCredential;
    } });
    var azurePipelinesCredential_js_1 = requireAzurePipelinesCredential();
    Object.defineProperty(exports, "AzurePipelinesCredential", { enumerable: true, get: function() {
      return azurePipelinesCredential_js_1.AzurePipelinesCredential;
    } });
    var authorizationCodeCredential_js_1 = requireAuthorizationCodeCredential();
    Object.defineProperty(exports, "AuthorizationCodeCredential", { enumerable: true, get: function() {
      return authorizationCodeCredential_js_1.AuthorizationCodeCredential;
    } });
    var azurePowerShellCredential_js_1 = requireAzurePowerShellCredential();
    Object.defineProperty(exports, "AzurePowerShellCredential", { enumerable: true, get: function() {
      return azurePowerShellCredential_js_1.AzurePowerShellCredential;
    } });
    var usernamePasswordCredential_js_1 = requireUsernamePasswordCredential();
    Object.defineProperty(exports, "UsernamePasswordCredential", { enumerable: true, get: function() {
      return usernamePasswordCredential_js_1.UsernamePasswordCredential;
    } });
    var visualStudioCodeCredential_js_1 = requireVisualStudioCodeCredential();
    Object.defineProperty(exports, "VisualStudioCodeCredential", { enumerable: true, get: function() {
      return visualStudioCodeCredential_js_1.VisualStudioCodeCredential;
    } });
    var onBehalfOfCredential_js_1 = requireOnBehalfOfCredential();
    Object.defineProperty(exports, "OnBehalfOfCredential", { enumerable: true, get: function() {
      return onBehalfOfCredential_js_1.OnBehalfOfCredential;
    } });
    var workloadIdentityCredential_js_1 = requireWorkloadIdentityCredential();
    Object.defineProperty(exports, "WorkloadIdentityCredential", { enumerable: true, get: function() {
      return workloadIdentityCredential_js_1.WorkloadIdentityCredential;
    } });
    var logging_js_1 = requireLogging();
    Object.defineProperty(exports, "logger", { enumerable: true, get: function() {
      return logging_js_1.logger;
    } });
    var constants_js_1 = requireConstants();
    Object.defineProperty(exports, "AzureAuthorityHosts", { enumerable: true, get: function() {
      return constants_js_1.AzureAuthorityHosts;
    } });
    function getDefaultAzureCredential() {
      return new defaultAzureCredential_js_1.DefaultAzureCredential();
    }
    var tokenProvider_js_1 = requireTokenProvider();
    Object.defineProperty(exports, "getBearerTokenProvider", { enumerable: true, get: function() {
      return tokenProvider_js_1.getBearerTokenProvider;
    } });
  })(commonjs);
  return commonjs;
}
export {
  requireCommonjs as r
};
