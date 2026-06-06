var commonjs = {};
var instrumenter = {};
var tracingContext = {};
var hasRequiredTracingContext;
function requireTracingContext() {
  if (hasRequiredTracingContext) return tracingContext;
  hasRequiredTracingContext = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TracingContextImpl = exports.knownContextKeys = void 0;
    exports.createTracingContext = createTracingContext;
    exports.knownContextKeys = {
      span: /* @__PURE__ */ Symbol.for("@azure/core-tracing span"),
      namespace: /* @__PURE__ */ Symbol.for("@azure/core-tracing namespace")
    };
    function createTracingContext(options = {}) {
      let context = new TracingContextImpl(options.parentContext);
      if (options.span) {
        context = context.setValue(exports.knownContextKeys.span, options.span);
      }
      if (options.namespace) {
        context = context.setValue(exports.knownContextKeys.namespace, options.namespace);
      }
      return context;
    }
    class TracingContextImpl {
      _contextMap;
      constructor(initialContext) {
        this._contextMap = initialContext instanceof TracingContextImpl ? new Map(initialContext._contextMap) : /* @__PURE__ */ new Map();
      }
      setValue(key, value) {
        const newContext = new TracingContextImpl(this);
        newContext._contextMap.set(key, value);
        return newContext;
      }
      getValue(key) {
        return this._contextMap.get(key);
      }
      deleteValue(key) {
        const newContext = new TracingContextImpl(this);
        newContext._contextMap.delete(key);
        return newContext;
      }
    }
    exports.TracingContextImpl = TracingContextImpl;
  })(tracingContext);
  return tracingContext;
}
var state = {};
var hasRequiredState;
function requireState() {
  if (hasRequiredState) return state;
  hasRequiredState = 1;
  Object.defineProperty(state, "__esModule", { value: true });
  state.state = void 0;
  state.state = {
    instrumenterImplementation: void 0
  };
  return state;
}
var hasRequiredInstrumenter;
function requireInstrumenter() {
  if (hasRequiredInstrumenter) return instrumenter;
  hasRequiredInstrumenter = 1;
  Object.defineProperty(instrumenter, "__esModule", { value: true });
  instrumenter.createDefaultTracingSpan = createDefaultTracingSpan;
  instrumenter.createDefaultInstrumenter = createDefaultInstrumenter;
  instrumenter.useInstrumenter = useInstrumenter;
  instrumenter.getInstrumenter = getInstrumenter;
  const tracingContext_js_1 = requireTracingContext();
  const state_js_1 = requireState();
  function createDefaultTracingSpan() {
    return {
      end: () => {
      },
      isRecording: () => false,
      recordException: () => {
      },
      setAttribute: () => {
      },
      setStatus: () => {
      },
      addEvent: () => {
      }
    };
  }
  function createDefaultInstrumenter() {
    return {
      createRequestHeaders: () => {
        return {};
      },
      parseTraceparentHeader: () => {
        return void 0;
      },
      startSpan: (_name, spanOptions) => {
        return {
          span: createDefaultTracingSpan(),
          tracingContext: (0, tracingContext_js_1.createTracingContext)({ parentContext: spanOptions.tracingContext })
        };
      },
      withContext(_context, callback, ...callbackArgs) {
        return callback(...callbackArgs);
      }
    };
  }
  function useInstrumenter(instrumenter2) {
    state_js_1.state.instrumenterImplementation = instrumenter2;
  }
  function getInstrumenter() {
    if (!state_js_1.state.instrumenterImplementation) {
      state_js_1.state.instrumenterImplementation = createDefaultInstrumenter();
    }
    return state_js_1.state.instrumenterImplementation;
  }
  return instrumenter;
}
var tracingClient = {};
var hasRequiredTracingClient;
function requireTracingClient() {
  if (hasRequiredTracingClient) return tracingClient;
  hasRequiredTracingClient = 1;
  Object.defineProperty(tracingClient, "__esModule", { value: true });
  tracingClient.createTracingClient = createTracingClient;
  const instrumenter_js_1 = requireInstrumenter();
  const tracingContext_js_1 = requireTracingContext();
  function createTracingClient(options) {
    const { namespace, packageName, packageVersion } = options;
    function startSpan(name, operationOptions, spanOptions) {
      const startSpanResult = (0, instrumenter_js_1.getInstrumenter)().startSpan(name, {
        ...spanOptions,
        packageName,
        packageVersion,
        tracingContext: operationOptions?.tracingOptions?.tracingContext
      });
      let tracingContext2 = startSpanResult.tracingContext;
      const span = startSpanResult.span;
      if (!tracingContext2.getValue(tracingContext_js_1.knownContextKeys.namespace)) {
        tracingContext2 = tracingContext2.setValue(tracingContext_js_1.knownContextKeys.namespace, namespace);
      }
      span.setAttribute("az.namespace", tracingContext2.getValue(tracingContext_js_1.knownContextKeys.namespace));
      const updatedOptions = Object.assign({}, operationOptions, {
        tracingOptions: { ...operationOptions?.tracingOptions, tracingContext: tracingContext2 }
      });
      return {
        span,
        updatedOptions
      };
    }
    async function withSpan(name, operationOptions, callback, spanOptions) {
      const { span, updatedOptions } = startSpan(name, operationOptions, spanOptions);
      try {
        const result = await withContext(updatedOptions.tracingOptions.tracingContext, () => Promise.resolve(callback(updatedOptions, span)));
        span.setStatus({ status: "success" });
        return result;
      } catch (err) {
        span.setStatus({ status: "error", error: err });
        throw err;
      } finally {
        span.end();
      }
    }
    function withContext(context, callback, ...callbackArgs) {
      return (0, instrumenter_js_1.getInstrumenter)().withContext(context, callback, ...callbackArgs);
    }
    function parseTraceparentHeader(traceparentHeader) {
      return (0, instrumenter_js_1.getInstrumenter)().parseTraceparentHeader(traceparentHeader);
    }
    function createRequestHeaders(tracingContext2) {
      return (0, instrumenter_js_1.getInstrumenter)().createRequestHeaders(tracingContext2);
    }
    return {
      startSpan,
      withSpan,
      withContext,
      parseTraceparentHeader,
      createRequestHeaders
    };
  }
  return tracingClient;
}
var hasRequiredCommonjs;
function requireCommonjs() {
  if (hasRequiredCommonjs) return commonjs;
  hasRequiredCommonjs = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createTracingClient = exports.useInstrumenter = void 0;
    var instrumenter_js_1 = requireInstrumenter();
    Object.defineProperty(exports, "useInstrumenter", { enumerable: true, get: function() {
      return instrumenter_js_1.useInstrumenter;
    } });
    var tracingClient_js_1 = requireTracingClient();
    Object.defineProperty(exports, "createTracingClient", { enumerable: true, get: function() {
      return tracingClient_js_1.createTracingClient;
    } });
  })(commonjs);
  return commonjs;
}
export {
  requireCommonjs as r
};
