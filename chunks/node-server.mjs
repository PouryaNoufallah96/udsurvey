globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, createError, createApp, createRouter, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ohmyfetch';
import { createRouter as createRouter$1 } from 'radix3';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import { promises } from 'fs';
import { dirname, resolve } from 'pathe';
import { fileURLToPath } from 'url';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"API_BASE_URL":"http://localhost:3243/api/v1/","public":{"API_BASE_URL":"http://localhost:3243/api/v1/"}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
function timingMiddleware(_req, res, next) {
  const start = globalTiming.start();
  const _end = res.end;
  res.end = (data, encoding, callback) => {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!res.headersSent) {
      res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(res, data, encoding, callback);
  };
  next();
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl;
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event);
    const headers = event.res.getHeaders();
    headers.Etag = `W/"${hash(body)}"`;
    headers["Last-Modified"] = new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["Cache-Control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["Last-Modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(req, header, includes) {
  const value = req.headers[header];
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event.req, "accept", "application/json") || hasReqHeader(event.req, "user-agent", "curl/") || hasReqHeader(event.req, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Route Not Found" : "Internal Server Error");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.res.statusCode = errorObject.statusCode;
  event.res.statusMessage = errorObject.statusMessage;
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.req.url?.startsWith("/__nuxt_error");
  let html = !isErrorPage ? await $fetch(withQuery("/__nuxt_error", errorObject)).catch(() => null) : null;
  if (!html) {
    const { template } = await import('./error-500.mjs');
    html = template(errorObject);
  }
  event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
  event.res.end(html);
});

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"47e-K1c9qw79GE32cxbcIAK5TMEHXyI\"",
    "mtime": "2021-04-06T10:46:44.376Z",
    "size": 1150,
    "path": "../public/favicon.ico"
  },
  "/icon.png": {
    "type": "image/png",
    "etag": "\"5f8c-gwFI/X8t6Wi7SWz9/R8D0nVNTHU\"",
    "mtime": "2021-12-29T18:02:02.519Z",
    "size": 24460,
    "path": "../public/icon.png"
  },
  "/logo_dark.png": {
    "type": "image/png",
    "etag": "\"5f8c-gwFI/X8t6Wi7SWz9/R8D0nVNTHU\"",
    "mtime": "2020-09-22T16:29:08.041Z",
    "size": 24460,
    "path": "../public/logo_dark.png"
  },
  "/logo_light.png": {
    "type": "image/png",
    "etag": "\"3980-epC8u5QxMYwSk5ui35msp/D+ya8\"",
    "mtime": "2020-09-22T16:29:08.043Z",
    "size": 14720,
    "path": "../public/logo_light.png"
  },
  "/_nuxt/add.672132f7.js": {
    "type": "application/javascript",
    "etag": "\"2cf-K0jwfGbUtuoa6BNmx/qkDD8ij6E\"",
    "mtime": "2022-09-06T12:13:57.031Z",
    "size": 719,
    "path": "../public/_nuxt/add.672132f7.js"
  },
  "/_nuxt/add.7dd51a82.js": {
    "type": "application/javascript",
    "etag": "\"2af-brgxdLQe2jubsRDIN5RMPo9xH2Y\"",
    "mtime": "2022-09-06T12:13:57.029Z",
    "size": 687,
    "path": "../public/_nuxt/add.7dd51a82.js"
  },
  "/_nuxt/add.b7c5f563.js": {
    "type": "application/javascript",
    "etag": "\"2aa-OrkCWeUz51Jc7jaKhi4P/wUVDf4\"",
    "mtime": "2022-09-06T12:13:57.033Z",
    "size": 682,
    "path": "../public/_nuxt/add.b7c5f563.js"
  },
  "/_nuxt/add.d3513a3e.js": {
    "type": "application/javascript",
    "etag": "\"2c5-PLhYb3jZ7pxTuSDlmyzwp3F2xoA\"",
    "mtime": "2022-09-06T12:13:57.029Z",
    "size": 709,
    "path": "../public/_nuxt/add.d3513a3e.js"
  },
  "/_nuxt/add.d6a7385c.js": {
    "type": "application/javascript",
    "etag": "\"2cf-SKYn7RoVjDGFVkg6Q+DnCIa0SXc\"",
    "mtime": "2022-09-06T12:13:57.032Z",
    "size": 719,
    "path": "../public/_nuxt/add.d6a7385c.js"
  },
  "/_nuxt/add.e66568d3.js": {
    "type": "application/javascript",
    "etag": "\"202-U8XGbUE1WK4A/Lp8JfzvABzIiVM\"",
    "mtime": "2022-09-06T12:13:57.030Z",
    "size": 514,
    "path": "../public/_nuxt/add.e66568d3.js"
  },
  "/_nuxt/admin.801c0821.js": {
    "type": "application/javascript",
    "etag": "\"d3-o3gC1sOL5bCEy29hvC9ffmFSk0c\"",
    "mtime": "2022-09-06T12:13:57.034Z",
    "size": 211,
    "path": "../public/_nuxt/admin.801c0821.js"
  },
  "/_nuxt/asyncData.f0c46025.js": {
    "type": "application/javascript",
    "etag": "\"8d3-ygMPRonbBFfUZcmzx3/uYkf2Bac\"",
    "mtime": "2022-09-06T12:13:57.029Z",
    "size": 2259,
    "path": "../public/_nuxt/asyncData.f0c46025.js"
  },
  "/_nuxt/auth.31c514a7.js": {
    "type": "application/javascript",
    "etag": "\"a4-vGaJL0foLfEMaUGqYcYE96xWHwc\"",
    "mtime": "2022-09-06T12:13:57.034Z",
    "size": 164,
    "path": "../public/_nuxt/auth.31c514a7.js"
  },
  "/_nuxt/authentication.34d3d42f.js": {
    "type": "application/javascript",
    "etag": "\"2da-fctFAOR2joWzqSIEHAWoOG98cQU\"",
    "mtime": "2022-09-06T12:13:57.034Z",
    "size": 730,
    "path": "../public/_nuxt/authentication.34d3d42f.js"
  },
  "/_nuxt/BaseBadge.vue_vue_type_script_setup_true_lang.f658a354.js": {
    "type": "application/javascript",
    "etag": "\"200-c5uAylDi5p02IBxzwm2PX5xB9wc\"",
    "mtime": "2022-09-06T12:13:57.031Z",
    "size": 512,
    "path": "../public/_nuxt/BaseBadge.vue_vue_type_script_setup_true_lang.f658a354.js"
  },
  "/_nuxt/BaseCheckbox.vue_vue_type_script_setup_true_lang.8d157869.js": {
    "type": "application/javascript",
    "etag": "\"29a-XhLqwBRKb7YyGcyPpr1MZikYJUI\"",
    "mtime": "2022-09-06T12:13:57.029Z",
    "size": 666,
    "path": "../public/_nuxt/BaseCheckbox.vue_vue_type_script_setup_true_lang.8d157869.js"
  },
  "/_nuxt/BaseDropDown.vue_vue_type_script_setup_true_lang.7472083e.js": {
    "type": "application/javascript",
    "etag": "\"517-ClTdOZFMtJGW4GQ2KqxX4twvEBg\"",
    "mtime": "2022-09-06T12:13:57.029Z",
    "size": 1303,
    "path": "../public/_nuxt/BaseDropDown.vue_vue_type_script_setup_true_lang.7472083e.js"
  },
  "/_nuxt/BaseInput.vue_vue_type_script_setup_true_lang.ee0dc373.js": {
    "type": "application/javascript",
    "etag": "\"334-CHIG2QWN0jJvbISpbgusPNLCAAI\"",
    "mtime": "2022-09-06T12:13:57.029Z",
    "size": 820,
    "path": "../public/_nuxt/BaseInput.vue_vue_type_script_setup_true_lang.ee0dc373.js"
  },
  "/_nuxt/BaseTable.vue_vue_type_script_setup_true_lang.cc4c3890.js": {
    "type": "application/javascript",
    "etag": "\"15f7-KY3Gau8mtsrGo7lRB3uoSUZAseI\"",
    "mtime": "2022-09-06T12:13:57.029Z",
    "size": 5623,
    "path": "../public/_nuxt/BaseTable.vue_vue_type_script_setup_true_lang.cc4c3890.js"
  },
  "/_nuxt/color.473bc8ca.png": {
    "type": "image/png",
    "etag": "\"2873-/0xLyyIHiRspL1RO202p0t9dRc8\"",
    "mtime": "2022-09-06T12:13:57.027Z",
    "size": 10355,
    "path": "../public/_nuxt/color.473bc8ca.png"
  },
  "/_nuxt/common.0bb1eeb8.js": {
    "type": "application/javascript",
    "etag": "\"139-YDtE+bAXgp60wCIkyk3itUQRmOQ\"",
    "mtime": "2022-09-06T12:13:57.029Z",
    "size": 313,
    "path": "../public/_nuxt/common.0bb1eeb8.js"
  },
  "/_nuxt/dashboard.0ff9d9f0.js": {
    "type": "application/javascript",
    "etag": "\"95f-IQgsFvMFcrL0ksyuXoQNG++pZzo\"",
    "mtime": "2022-09-06T12:13:57.034Z",
    "size": 2399,
    "path": "../public/_nuxt/dashboard.0ff9d9f0.js"
  },
  "/_nuxt/entry.462d8207.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"31405-FbDLHKD5ogpCIhUZNRslpD2XRnc\"",
    "mtime": "2022-09-06T12:13:57.034Z",
    "size": 201733,
    "path": "../public/_nuxt/entry.462d8207.css"
  },
  "/_nuxt/entry.87f1605d.js": {
    "type": "application/javascript",
    "etag": "\"77e5c-nE5qvQOol7G7mIAeqXc+J5bWEL4\"",
    "mtime": "2022-09-06T12:13:57.034Z",
    "size": 491100,
    "path": "../public/_nuxt/entry.87f1605d.js"
  },
  "/_nuxt/error-component.503f1097.js": {
    "type": "application/javascript",
    "etag": "\"259-pU9P7yu9W3xuDA5ZdI8L2j+D8T4\"",
    "mtime": "2022-09-06T12:13:57.029Z",
    "size": 601,
    "path": "../public/_nuxt/error-component.503f1097.js"
  },
  "/_nuxt/error-component.e5ecc8f4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"108-8EKEh6YWHIxAX3KCNW0iZ9a6SPo\"",
    "mtime": "2022-09-06T12:13:57.034Z",
    "size": 264,
    "path": "../public/_nuxt/error-component.e5ecc8f4.css"
  },
  "/_nuxt/error.83dd5bf7.js": {
    "type": "application/javascript",
    "etag": "\"184-44JxJzWtZWWNokJXH46k5YOWX+o\"",
    "mtime": "2022-09-06T12:13:57.034Z",
    "size": 388,
    "path": "../public/_nuxt/error.83dd5bf7.js"
  },
  "/_nuxt/Form.d0d3b886.js": {
    "type": "application/javascript",
    "etag": "\"3dde-48asdwNoJxjxVyoLqX+6MMcMvbI\"",
    "mtime": "2022-09-06T12:13:57.029Z",
    "size": 15838,
    "path": "../public/_nuxt/Form.d0d3b886.js"
  },
  "/_nuxt/Form.vue_vue_type_script_setup_true_lang.0bd0471e.js": {
    "type": "application/javascript",
    "etag": "\"b30-lQ/f2ge6baTdpGEP08p1lwbNoFY\"",
    "mtime": "2022-09-06T12:13:57.032Z",
    "size": 2864,
    "path": "../public/_nuxt/Form.vue_vue_type_script_setup_true_lang.0bd0471e.js"
  },
  "/_nuxt/Form.vue_vue_type_script_setup_true_lang.22a0c8b3.js": {
    "type": "application/javascript",
    "etag": "\"b56-IILDqq9uwJJaAOGqaKj3I7Ngj8Y\"",
    "mtime": "2022-09-06T12:13:57.032Z",
    "size": 2902,
    "path": "../public/_nuxt/Form.vue_vue_type_script_setup_true_lang.22a0c8b3.js"
  },
  "/_nuxt/Form.vue_vue_type_script_setup_true_lang.3261fcbc.js": {
    "type": "application/javascript",
    "etag": "\"d99-2iEYS9LnFtxyIY/u658IX9yv6FI\"",
    "mtime": "2022-09-06T12:13:57.033Z",
    "size": 3481,
    "path": "../public/_nuxt/Form.vue_vue_type_script_setup_true_lang.3261fcbc.js"
  },
  "/_nuxt/Form.vue_vue_type_script_setup_true_lang.852030ce.js": {
    "type": "application/javascript",
    "etag": "\"86e-JZ2U6963I5vmbZG3bcLF/zTelAg\"",
    "mtime": "2022-09-06T12:13:57.029Z",
    "size": 2158,
    "path": "../public/_nuxt/Form.vue_vue_type_script_setup_true_lang.852030ce.js"
  },
  "/_nuxt/Form.vue_vue_type_script_setup_true_lang.977784e8.js": {
    "type": "application/javascript",
    "etag": "\"6d9-S2qs8iFvoyTCnP1yE+dqrPHX8yU\"",
    "mtime": "2022-09-06T12:13:57.031Z",
    "size": 1753,
    "path": "../public/_nuxt/Form.vue_vue_type_script_setup_true_lang.977784e8.js"
  },
  "/_nuxt/guest.13729edd.js": {
    "type": "application/javascript",
    "etag": "\"bf-qF52vSn3XX95Kp8XrSOnX0upUs0\"",
    "mtime": "2022-09-06T12:13:57.034Z",
    "size": 191,
    "path": "../public/_nuxt/guest.13729edd.js"
  },
  "/_nuxt/handle-toast.69ee9aaa.js": {
    "type": "application/javascript",
    "etag": "\"118-Lju+x97XHqhE9sYkq8QIkqSGFmc\"",
    "mtime": "2022-09-06T12:13:57.029Z",
    "size": 280,
    "path": "../public/_nuxt/handle-toast.69ee9aaa.js"
  },
  "/_nuxt/index.0d1fe794.js": {
    "type": "application/javascript",
    "etag": "\"1238-i+5HmZctmQCb1Z2Fj0waVU2tIFU\"",
    "mtime": "2022-09-06T12:13:57.031Z",
    "size": 4664,
    "path": "../public/_nuxt/index.0d1fe794.js"
  },
  "/_nuxt/index.0e4264fe.js": {
    "type": "application/javascript",
    "etag": "\"c34-prE/o+SoOHe9Alw6RdLYeRY9kIA\"",
    "mtime": "2022-09-06T12:13:57.031Z",
    "size": 3124,
    "path": "../public/_nuxt/index.0e4264fe.js"
  },
  "/_nuxt/index.5996be8a.js": {
    "type": "application/javascript",
    "etag": "\"ca3-kDNpjZlSuzJTuH2pdFs/GMwkpfw\"",
    "mtime": "2022-09-06T12:13:57.029Z",
    "size": 3235,
    "path": "../public/_nuxt/index.5996be8a.js"
  },
  "/_nuxt/index.5c19c829.js": {
    "type": "application/javascript",
    "etag": "\"716-G8ZdrGoHnZyA+U+pFg82HYC+7m0\"",
    "mtime": "2022-09-06T12:13:57.034Z",
    "size": 1814,
    "path": "../public/_nuxt/index.5c19c829.js"
  },
  "/_nuxt/index.927ee78e.js": {
    "type": "application/javascript",
    "etag": "\"ec1-BXu4H/5pWpqksM+exzcyyrmazjU\"",
    "mtime": "2022-09-06T12:13:57.033Z",
    "size": 3777,
    "path": "../public/_nuxt/index.927ee78e.js"
  },
  "/_nuxt/index.c4edfb7b.js": {
    "type": "application/javascript",
    "etag": "\"f36-TAi9Iu9DVJfyKLuQ4MjXemOM5PU\"",
    "mtime": "2022-09-06T12:13:57.031Z",
    "size": 3894,
    "path": "../public/_nuxt/index.c4edfb7b.js"
  },
  "/_nuxt/index.e08f2501.js": {
    "type": "application/javascript",
    "etag": "\"f3e-GhA9uR3+w1R9h5Eu/Whu6Bab0R0\"",
    "mtime": "2022-09-06T12:13:57.032Z",
    "size": 3902,
    "path": "../public/_nuxt/index.e08f2501.js"
  },
  "/_nuxt/login.9591e043.js": {
    "type": "application/javascript",
    "etag": "\"5ff-ZyzVRXMFQ9vkEzeEqjNlNAJsBo8\"",
    "mtime": "2022-09-06T12:13:57.034Z",
    "size": 1535,
    "path": "../public/_nuxt/login.9591e043.js"
  },
  "/_nuxt/primeicons.2ab98f70.svg": {
    "type": "image/svg+xml",
    "etag": "\"42564-Yhd1suxVX9LdFSokOQz23+7haLE\"",
    "mtime": "2022-09-06T12:13:57.034Z",
    "size": 271716,
    "path": "../public/_nuxt/primeicons.2ab98f70.svg"
  },
  "/_nuxt/primeicons.788dba0a.ttf": {
    "type": "font/ttf",
    "etag": "\"10454-5shsqQqftCgvs1Uj1W/eAOeKFBY\"",
    "mtime": "2022-09-06T12:13:57.030Z",
    "size": 66644,
    "path": "../public/_nuxt/primeicons.788dba0a.ttf"
  },
  "/_nuxt/primeicons.c9eaf535.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"10504-zPZeQGgLDt5qtGk51CHIMa5q/PQ\"",
    "mtime": "2022-09-06T12:13:57.030Z",
    "size": 66820,
    "path": "../public/_nuxt/primeicons.c9eaf535.eot"
  },
  "/_nuxt/primeicons.feb68bf6.woff": {
    "type": "font/woff",
    "etag": "\"104a0-IeR36hnhW2Y0S8wjs/uyFhCSpwc\"",
    "mtime": "2022-09-06T12:13:57.030Z",
    "size": 66720,
    "path": "../public/_nuxt/primeicons.feb68bf6.woff"
  },
  "/_nuxt/_id_.1a3842ec.js": {
    "type": "application/javascript",
    "etag": "\"3db-HT3RZDWPnCJ3wNNFHl2BoIevjfI\"",
    "mtime": "2022-09-06T12:13:57.031Z",
    "size": 987,
    "path": "../public/_nuxt/_id_.1a3842ec.js"
  },
  "/_nuxt/_id_.211355a1.js": {
    "type": "application/javascript",
    "etag": "\"458-r2gxqYj27J4JcmF0wbgj4N03iFI\"",
    "mtime": "2022-09-06T12:13:57.032Z",
    "size": 1112,
    "path": "../public/_nuxt/_id_.211355a1.js"
  },
  "/_nuxt/_id_.27185879.js": {
    "type": "application/javascript",
    "etag": "\"442-gqj2pvAt9GMEfuM69Srwe0P7da0\"",
    "mtime": "2022-09-06T12:13:57.033Z",
    "size": 1090,
    "path": "../public/_nuxt/_id_.27185879.js"
  },
  "/_nuxt/_id_.916ea63d.js": {
    "type": "application/javascript",
    "etag": "\"4a9-+m2xQWTDCekghBs1rJGHJlx219Y\"",
    "mtime": "2022-09-06T12:13:57.032Z",
    "size": 1193,
    "path": "../public/_nuxt/_id_.916ea63d.js"
  },
  "/_nuxt/_id_.996ab08b.js": {
    "type": "application/javascript",
    "etag": "\"439-o8PwTpIiHXoZC4w/R6Rdmnu7RF0\"",
    "mtime": "2022-09-06T12:13:57.029Z",
    "size": 1081,
    "path": "../public/_nuxt/_id_.996ab08b.js"
  },
  "/_nuxt/_id_.da288891.js": {
    "type": "application/javascript",
    "etag": "\"498-7ebzM4vtv5Huz3UHpwRv0/oa8ik\"",
    "mtime": "2022-09-06T12:13:57.032Z",
    "size": 1176,
    "path": "../public/_nuxt/_id_.da288891.js"
  },
  "/_nuxt/_id_.fdd8bc1c.js": {
    "type": "application/javascript",
    "etag": "\"f69-6JlWik0eiBeL/PtAhyKUTi6H4o0\"",
    "mtime": "2022-09-06T12:13:57.034Z",
    "size": 3945,
    "path": "../public/_nuxt/_id_.fdd8bc1c.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler(async (event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  const encodingHeader = String(event.req.headers["accept-encoding"] || "");
  const encodings = encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).concat([""]);
  if (encodings.length > 1) {
    event.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, id + "/index.html" + encoding]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end("Not Modified (etag)");
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end("Not Modified (mtime)");
      return;
    }
  }
  if (asset.type) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding) {
    event.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size) {
    event.res.setHeader("Content-Length", asset.size);
  }
  const contents = await readAsset(id);
  event.res.end(contents);
});

const _lazy_vksvJZ = () => import('./renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_vksvJZ, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_vksvJZ, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter();
  const routerOptions = createRouter$1({ routes: config.nitro.routes });
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    const referenceRoute = h.route.replace(/:\w+|\*\*/g, "_");
    const routeOptions = routerOptions.lookup(referenceRoute) || {};
    if (routeOptions.swr) {
      handler = cachedEventHandler(handler, {
        group: "nitro/routes"
      });
    }
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(h3App.nodeHandler);
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, nitroApp.h3App.nodeHandler) : new Server$1(nitroApp.h3App.nodeHandler);
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const hostname = process.env.NITRO_HOST || process.env.HOST || "0.0.0.0";
server.listen(port, hostname, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  console.log(`Listening on ${protocol}://${hostname}:${port}${useRuntimeConfig().app.baseURL}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { useRuntimeConfig as a, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
