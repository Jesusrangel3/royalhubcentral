import require$$0 from "events";
import require$$4 from "timers";
var tarn = { exports: {} };
var Pool = {};
var PendingOperation = {};
var TimeoutError = {};
var hasRequiredTimeoutError;
function requireTimeoutError() {
  if (hasRequiredTimeoutError) return TimeoutError;
  hasRequiredTimeoutError = 1;
  Object.defineProperty(TimeoutError, "__esModule", { value: true });
  let TimeoutError$1 = class TimeoutError extends Error {
  };
  TimeoutError.TimeoutError = TimeoutError$1;
  return TimeoutError;
}
var utils = {};
var PromiseInspection = {};
var hasRequiredPromiseInspection;
function requirePromiseInspection() {
  if (hasRequiredPromiseInspection) return PromiseInspection;
  hasRequiredPromiseInspection = 1;
  Object.defineProperty(PromiseInspection, "__esModule", { value: true });
  let PromiseInspection$1 = class PromiseInspection {
    constructor(args) {
      this._value = args.value;
      this._error = args.error;
    }
    value() {
      return this._value;
    }
    reason() {
      return this._error;
    }
    isRejected() {
      return !!this._error;
    }
    isFulfilled() {
      return !!this._value;
    }
  };
  PromiseInspection.PromiseInspection = PromiseInspection$1;
  return PromiseInspection;
}
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  Object.defineProperty(utils, "__esModule", { value: true });
  const PromiseInspection_1 = requirePromiseInspection();
  function defer() {
    let resolve = null;
    let reject = null;
    const promise = new Promise((resolver, rejecter) => {
      resolve = resolver;
      reject = rejecter;
    });
    return {
      promise,
      resolve,
      reject
    };
  }
  utils.defer = defer;
  function now() {
    return Date.now();
  }
  utils.now = now;
  function duration(t1, t2) {
    return Math.abs(t2 - t1);
  }
  utils.duration = duration;
  function checkOptionalTime(time) {
    if (typeof time === "undefined") {
      return true;
    }
    return checkRequiredTime(time);
  }
  utils.checkOptionalTime = checkOptionalTime;
  function checkRequiredTime(time) {
    return typeof time === "number" && time === Math.round(time) && time > 0;
  }
  utils.checkRequiredTime = checkRequiredTime;
  function delay(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis));
  }
  utils.delay = delay;
  function reflect(promise) {
    return promise.then((value) => {
      return new PromiseInspection_1.PromiseInspection({ value });
    }).catch((error) => {
      return new PromiseInspection_1.PromiseInspection({ error });
    });
  }
  utils.reflect = reflect;
  function tryPromise(cb) {
    try {
      const result = cb();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  utils.tryPromise = tryPromise;
  return utils;
}
var hasRequiredPendingOperation;
function requirePendingOperation() {
  if (hasRequiredPendingOperation) return PendingOperation;
  hasRequiredPendingOperation = 1;
  Object.defineProperty(PendingOperation, "__esModule", { value: true });
  const TimeoutError_1 = requireTimeoutError();
  const utils_1 = requireUtils();
  let PendingOperation$1 = class PendingOperation {
    constructor(timeoutMillis) {
      this.timeoutMillis = timeoutMillis;
      this.deferred = utils_1.defer();
      this.possibleTimeoutCause = null;
      this.isRejected = false;
      this.promise = timeout(this.deferred.promise, timeoutMillis).catch((err) => {
        if (err instanceof TimeoutError_1.TimeoutError) {
          if (this.possibleTimeoutCause) {
            err = new TimeoutError_1.TimeoutError(this.possibleTimeoutCause.message);
          } else {
            err = new TimeoutError_1.TimeoutError("operation timed out for an unknown reason");
          }
        }
        this.isRejected = true;
        return Promise.reject(err);
      });
    }
    abort() {
      this.reject(new Error("aborted"));
    }
    reject(err) {
      this.deferred.reject(err);
    }
    resolve(value) {
      this.deferred.resolve(value);
    }
  };
  PendingOperation.PendingOperation = PendingOperation$1;
  function timeout(promise, time) {
    return new Promise((resolve, reject) => {
      const timeoutHandle = setTimeout(() => reject(new TimeoutError_1.TimeoutError()), time);
      promise.then((result) => {
        clearTimeout(timeoutHandle);
        resolve(result);
      }).catch((err) => {
        clearTimeout(timeoutHandle);
        reject(err);
      });
    });
  }
  return PendingOperation;
}
var Resource = {};
var hasRequiredResource;
function requireResource() {
  if (hasRequiredResource) return Resource;
  hasRequiredResource = 1;
  Object.defineProperty(Resource, "__esModule", { value: true });
  const utils_1 = requireUtils();
  let Resource$1 = class Resource2 {
    constructor(resource) {
      this.resource = resource;
      this.resource = resource;
      this.timestamp = utils_1.now();
      this.deferred = utils_1.defer();
    }
    get promise() {
      return this.deferred.promise;
    }
    resolve() {
      this.deferred.resolve(void 0);
      return new Resource2(this.resource);
    }
  };
  Resource.Resource = Resource$1;
  return Resource;
}
var hasRequiredPool;
function requirePool() {
  if (hasRequiredPool) return Pool;
  hasRequiredPool = 1;
  Object.defineProperty(Pool, "__esModule", { value: true });
  const PendingOperation_1 = requirePendingOperation();
  const Resource_1 = requireResource();
  const utils_1 = requireUtils();
  const events_1 = require$$0;
  const timers_1 = require$$4;
  let Pool$1 = class Pool {
    constructor(opt) {
      this.destroyed = false;
      this.emitter = new events_1.EventEmitter();
      opt = opt || {};
      if (!opt.create) {
        throw new Error("Tarn: opt.create function most be provided");
      }
      if (!opt.destroy) {
        throw new Error("Tarn: opt.destroy function most be provided");
      }
      if (typeof opt.min !== "number" || opt.min < 0 || opt.min !== Math.round(opt.min)) {
        throw new Error("Tarn: opt.min must be an integer >= 0");
      }
      if (typeof opt.max !== "number" || opt.max <= 0 || opt.max !== Math.round(opt.max)) {
        throw new Error("Tarn: opt.max must be an integer > 0");
      }
      if (opt.min > opt.max) {
        throw new Error("Tarn: opt.max is smaller than opt.min");
      }
      if (!utils_1.checkOptionalTime(opt.acquireTimeoutMillis)) {
        throw new Error("Tarn: invalid opt.acquireTimeoutMillis " + JSON.stringify(opt.acquireTimeoutMillis));
      }
      if (!utils_1.checkOptionalTime(opt.createTimeoutMillis)) {
        throw new Error("Tarn: invalid opt.createTimeoutMillis " + JSON.stringify(opt.createTimeoutMillis));
      }
      if (!utils_1.checkOptionalTime(opt.destroyTimeoutMillis)) {
        throw new Error("Tarn: invalid opt.destroyTimeoutMillis " + JSON.stringify(opt.destroyTimeoutMillis));
      }
      if (!utils_1.checkOptionalTime(opt.idleTimeoutMillis)) {
        throw new Error("Tarn: invalid opt.idleTimeoutMillis " + JSON.stringify(opt.idleTimeoutMillis));
      }
      if (!utils_1.checkOptionalTime(opt.reapIntervalMillis)) {
        throw new Error("Tarn: invalid opt.reapIntervalMillis " + JSON.stringify(opt.reapIntervalMillis));
      }
      if (!utils_1.checkOptionalTime(opt.createRetryIntervalMillis)) {
        throw new Error("Tarn: invalid opt.createRetryIntervalMillis " + JSON.stringify(opt.createRetryIntervalMillis));
      }
      const allowedKeys = {
        create: true,
        validate: true,
        destroy: true,
        log: true,
        min: true,
        max: true,
        acquireTimeoutMillis: true,
        createTimeoutMillis: true,
        destroyTimeoutMillis: true,
        idleTimeoutMillis: true,
        reapIntervalMillis: true,
        createRetryIntervalMillis: true,
        propagateCreateError: true
      };
      for (const key of Object.keys(opt)) {
        if (!allowedKeys[key]) {
          throw new Error(`Tarn: unsupported option opt.${key}`);
        }
      }
      this.creator = opt.create;
      this.destroyer = opt.destroy;
      this.validate = typeof opt.validate === "function" ? opt.validate : () => true;
      this.log = opt.log || (() => {
      });
      this.acquireTimeoutMillis = opt.acquireTimeoutMillis || 3e4;
      this.createTimeoutMillis = opt.createTimeoutMillis || 3e4;
      this.destroyTimeoutMillis = opt.destroyTimeoutMillis || 5e3;
      this.idleTimeoutMillis = opt.idleTimeoutMillis || 3e4;
      this.reapIntervalMillis = opt.reapIntervalMillis || 1e3;
      this.createRetryIntervalMillis = opt.createRetryIntervalMillis || 200;
      this.propagateCreateError = !!opt.propagateCreateError;
      this.min = opt.min;
      this.max = opt.max;
      this.used = [];
      this.free = [];
      this.pendingCreates = [];
      this.pendingAcquires = [];
      this.pendingDestroys = [];
      this.pendingValidations = [];
      this.destroyed = false;
      this.interval = null;
      this.eventId = 1;
    }
    numUsed() {
      return this.used.length;
    }
    numFree() {
      return this.free.length;
    }
    numPendingAcquires() {
      return this.pendingAcquires.length;
    }
    numPendingValidations() {
      return this.pendingValidations.length;
    }
    numPendingCreates() {
      return this.pendingCreates.length;
    }
    acquire() {
      const eventId = this.eventId++;
      this._executeEventHandlers("acquireRequest", eventId);
      const pendingAcquire = new PendingOperation_1.PendingOperation(this.acquireTimeoutMillis);
      this.pendingAcquires.push(pendingAcquire);
      pendingAcquire.promise = pendingAcquire.promise.then((resource) => {
        this._executeEventHandlers("acquireSuccess", eventId, resource);
        return resource;
      }).catch((err) => {
        this._executeEventHandlers("acquireFail", eventId, err);
        remove(this.pendingAcquires, pendingAcquire);
        return Promise.reject(err);
      });
      this._tryAcquireOrCreate();
      return pendingAcquire;
    }
    release(resource) {
      this._executeEventHandlers("release", resource);
      for (let i = 0, l = this.used.length; i < l; ++i) {
        const used = this.used[i];
        if (used.resource === resource) {
          this.used.splice(i, 1);
          this.free.push(used.resolve());
          this._tryAcquireOrCreate();
          return true;
        }
      }
      return false;
    }
    isEmpty() {
      return [
        this.numFree(),
        this.numUsed(),
        this.numPendingAcquires(),
        this.numPendingValidations(),
        this.numPendingCreates()
      ].reduce((total, value) => total + value) === 0;
    }
    /**
     * Reaping cycle.
     */
    check() {
      const timestamp = utils_1.now();
      const newFree = [];
      const minKeep = this.min - this.used.length;
      const maxDestroy = this.free.length - minKeep;
      let numDestroyed = 0;
      this.free.forEach((free) => {
        if (utils_1.duration(timestamp, free.timestamp) >= this.idleTimeoutMillis && numDestroyed < maxDestroy) {
          numDestroyed++;
          this._destroy(free.resource);
        } else {
          newFree.push(free);
        }
      });
      this.free = newFree;
      if (this.isEmpty()) {
        this._stopReaping();
      }
    }
    destroy() {
      const eventId = this.eventId++;
      this._executeEventHandlers("poolDestroyRequest", eventId);
      this._stopReaping();
      this.destroyed = true;
      return utils_1.reflect(Promise.all(this.pendingCreates.map((create) => utils_1.reflect(create.promise))).then(() => {
        return new Promise((resolve, reject) => {
          if (this.numPendingValidations() === 0) {
            resolve();
            return;
          }
          const interval = setInterval(() => {
            if (this.numPendingValidations() === 0) {
              timers_1.clearInterval(interval);
              resolve();
            }
          }, 100);
        });
      }).then(() => {
        return Promise.all(this.used.map((used) => utils_1.reflect(used.promise)));
      }).then(() => {
        return Promise.all(this.pendingAcquires.map((acquire) => {
          acquire.abort();
          return utils_1.reflect(acquire.promise);
        }));
      }).then(() => {
        return Promise.all(this.free.map((free) => utils_1.reflect(this._destroy(free.resource))));
      }).then(() => {
        return Promise.all(this.pendingDestroys.map((pd) => pd.promise));
      }).then(() => {
        this.free = [];
        this.pendingAcquires = [];
      })).then((res) => {
        this._executeEventHandlers("poolDestroySuccess", eventId);
        this.emitter.removeAllListeners();
        return res;
      });
    }
    on(event, listener) {
      this.emitter.on(event, listener);
    }
    removeListener(event, listener) {
      this.emitter.removeListener(event, listener);
    }
    removeAllListeners(event) {
      this.emitter.removeAllListeners(event);
    }
    /**
     * The most important method that is called always when resources
     * are created / destroyed / acquired / released. In other words
     * every time when resources are moved from used to free or vice
     * versa.
     *
     * Either assigns free resources to pendingAcquires or creates new
     * resources if there is room for it in the pool.
     */
    _tryAcquireOrCreate() {
      if (this.destroyed) {
        return;
      }
      if (this._hasFreeResources()) {
        this._doAcquire();
      } else if (this._shouldCreateMoreResources()) {
        this._doCreate();
      }
    }
    _hasFreeResources() {
      return this.free.length > 0;
    }
    _doAcquire() {
      while (this._canAcquire()) {
        const pendingAcquire = this.pendingAcquires.shift();
        const free = this.free.pop();
        if (free === void 0 || pendingAcquire === void 0) {
          const errMessage = "this.free was empty while trying to acquire resource";
          this.log(`Tarn: ${errMessage}`, "warn");
          throw new Error(`Internal error, should never happen. ${errMessage}`);
        }
        this.pendingValidations.push(pendingAcquire);
        this.used.push(free);
        const abortAbleValidation = new PendingOperation_1.PendingOperation(this.acquireTimeoutMillis);
        pendingAcquire.promise.catch((err) => {
          abortAbleValidation.abort();
        });
        abortAbleValidation.promise.catch((err) => {
          this.log("Tarn: resource validator threw an exception " + err.stack, "warn");
          return false;
        }).then((validationSuccess) => {
          try {
            if (validationSuccess && !pendingAcquire.isRejected) {
              this._startReaping();
              pendingAcquire.resolve(free.resource);
            } else {
              remove(this.used, free);
              if (!validationSuccess) {
                this._destroy(free.resource);
                setTimeout(() => {
                  this._tryAcquireOrCreate();
                }, 0);
              } else {
                this.free.push(free);
              }
              if (!pendingAcquire.isRejected) {
                this.pendingAcquires.unshift(pendingAcquire);
              }
            }
          } finally {
            remove(this.pendingValidations, pendingAcquire);
          }
        });
        this._validateResource(free.resource).then((validationSuccess) => {
          abortAbleValidation.resolve(validationSuccess);
        }).catch((err) => {
          abortAbleValidation.reject(err);
        });
      }
    }
    _canAcquire() {
      return this.free.length > 0 && this.pendingAcquires.length > 0;
    }
    _validateResource(resource) {
      try {
        return Promise.resolve(this.validate(resource));
      } catch (err) {
        return Promise.reject(err);
      }
    }
    _shouldCreateMoreResources() {
      return this.used.length + this.pendingCreates.length < this.max && this.pendingCreates.length < this.pendingAcquires.length;
    }
    _doCreate() {
      const pendingAcquiresBeforeCreate = this.pendingAcquires.slice();
      const pendingCreate = this._create();
      pendingCreate.promise.then(() => {
        this._tryAcquireOrCreate();
        return null;
      }).catch((err) => {
        if (this.propagateCreateError && this.pendingAcquires.length !== 0) {
          this.pendingAcquires[0].reject(err);
        }
        pendingAcquiresBeforeCreate.forEach((pendingAcquire) => {
          pendingAcquire.possibleTimeoutCause = err;
        });
        utils_1.delay(this.createRetryIntervalMillis).then(() => this._tryAcquireOrCreate());
      });
    }
    _create() {
      const eventId = this.eventId++;
      this._executeEventHandlers("createRequest", eventId);
      const pendingCreate = new PendingOperation_1.PendingOperation(this.createTimeoutMillis);
      pendingCreate.promise = pendingCreate.promise.catch((err) => {
        if (remove(this.pendingCreates, pendingCreate)) {
          this._executeEventHandlers("createFail", eventId, err);
        }
        throw err;
      });
      this.pendingCreates.push(pendingCreate);
      callbackOrPromise(this.creator).then((resource) => {
        if (pendingCreate.isRejected) {
          this.destroyer(resource);
          return null;
        }
        remove(this.pendingCreates, pendingCreate);
        this.free.push(new Resource_1.Resource(resource));
        pendingCreate.resolve(resource);
        this._executeEventHandlers("createSuccess", eventId, resource);
        return null;
      }).catch((err) => {
        if (pendingCreate.isRejected) {
          return null;
        }
        if (remove(this.pendingCreates, pendingCreate)) {
          this._executeEventHandlers("createFail", eventId, err);
        }
        pendingCreate.reject(err);
        return null;
      });
      return pendingCreate;
    }
    _destroy(resource) {
      const eventId = this.eventId++;
      this._executeEventHandlers("destroyRequest", eventId, resource);
      const pendingDestroy = new PendingOperation_1.PendingOperation(this.destroyTimeoutMillis);
      const retVal = Promise.resolve().then(() => this.destroyer(resource));
      retVal.then(() => {
        pendingDestroy.resolve(resource);
      }).catch((err) => {
        pendingDestroy.reject(err);
      });
      this.pendingDestroys.push(pendingDestroy);
      return pendingDestroy.promise.then((res) => {
        this._executeEventHandlers("destroySuccess", eventId, resource);
        return res;
      }).catch((err) => this._logDestroyerError(eventId, resource, err)).then((res) => {
        const index = this.pendingDestroys.findIndex((pd) => pd === pendingDestroy);
        this.pendingDestroys.splice(index, 1);
        return res;
      });
    }
    _logDestroyerError(eventId, resource, err) {
      this._executeEventHandlers("destroyFail", eventId, resource, err);
      this.log("Tarn: resource destroyer threw an exception " + err.stack, "warn");
    }
    _startReaping() {
      if (!this.interval) {
        this._executeEventHandlers("startReaping");
        this.interval = setInterval(() => this.check(), this.reapIntervalMillis);
      }
    }
    _stopReaping() {
      if (this.interval !== null) {
        this._executeEventHandlers("stopReaping");
        timers_1.clearInterval(this.interval);
      }
      this.interval = null;
    }
    _executeEventHandlers(eventName, ...args) {
      const listeners = this.emitter.listeners(eventName);
      listeners.forEach((listener) => {
        try {
          listener(...args);
        } catch (err) {
          this.log(`Tarn: event handler "${eventName}" threw an exception ${err.stack}`, "warn");
        }
      });
    }
  };
  Pool.Pool = Pool$1;
  function remove(arr, item) {
    const idx = arr.indexOf(item);
    if (idx === -1) {
      return false;
    } else {
      arr.splice(idx, 1);
      return true;
    }
  }
  function callbackOrPromise(func) {
    return new Promise((resolve, reject) => {
      const callback = (err, resource) => {
        if (err) {
          reject(err);
        } else {
          resolve(resource);
        }
      };
      utils_1.tryPromise(() => func(callback)).then((res) => {
        if (res) {
          resolve(res);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }
  return Pool;
}
var hasRequiredTarn;
function requireTarn() {
  if (hasRequiredTarn) return tarn.exports;
  hasRequiredTarn = 1;
  (function(module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    const Pool_1 = requirePool();
    exports.Pool = Pool_1.Pool;
    const TimeoutError_1 = requireTimeoutError();
    exports.TimeoutError = TimeoutError_1.TimeoutError;
    module.exports = {
      Pool: Pool_1.Pool,
      TimeoutError: TimeoutError_1.TimeoutError
    };
  })(tarn, tarn.exports);
  return tarn.exports;
}
export {
  requireTarn as r
};
