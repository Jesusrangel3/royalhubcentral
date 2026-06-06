import { d as defineEventAttribute, E as EventTarget } from "./event-target-shim.mjs";
import { b as getAugmentedNamespace } from "./react.mjs";
class AbortSignal extends EventTarget {
  /**
   * AbortSignal cannot be constructed directly.
   */
  constructor() {
    super();
    throw new TypeError("AbortSignal cannot be constructed directly");
  }
  /**
   * Returns `true` if this `AbortSignal`'s `AbortController` has signaled to abort, and `false` otherwise.
   */
  get aborted() {
    const aborted = abortedFlags.get(this);
    if (typeof aborted !== "boolean") {
      throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
    }
    return aborted;
  }
}
defineEventAttribute(AbortSignal.prototype, "abort");
function createAbortSignal() {
  const signal = Object.create(AbortSignal.prototype);
  EventTarget.call(signal);
  abortedFlags.set(signal, false);
  return signal;
}
function abortSignal(signal) {
  if (abortedFlags.get(signal) !== false) {
    return;
  }
  abortedFlags.set(signal, true);
  signal.dispatchEvent({ type: "abort" });
}
const abortedFlags = /* @__PURE__ */ new WeakMap();
Object.defineProperties(AbortSignal.prototype, {
  aborted: { enumerable: true }
});
if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
  Object.defineProperty(AbortSignal.prototype, Symbol.toStringTag, {
    configurable: true,
    value: "AbortSignal"
  });
}
class AbortController {
  /**
   * Initialize this controller.
   */
  constructor() {
    signals.set(this, createAbortSignal());
  }
  /**
   * Returns the `AbortSignal` object associated with this object.
   */
  get signal() {
    return getSignal(this);
  }
  /**
   * Abort and signal to any observers that the associated activity is to be aborted.
   */
  abort() {
    abortSignal(getSignal(this));
  }
}
const signals = /* @__PURE__ */ new WeakMap();
function getSignal(controller) {
  const signal = signals.get(controller);
  if (signal == null) {
    throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${controller === null ? "null" : typeof controller}`);
  }
  return signal;
}
Object.defineProperties(AbortController.prototype, {
  signal: { enumerable: true },
  abort: { enumerable: true }
});
if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
  Object.defineProperty(AbortController.prototype, Symbol.toStringTag, {
    configurable: true,
    value: "AbortController"
  });
}
const abortController = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  AbortController,
  AbortSignal,
  default: AbortController
});
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(abortController);
export {
  require$$0 as r
};
