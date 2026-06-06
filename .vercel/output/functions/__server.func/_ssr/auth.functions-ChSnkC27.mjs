import { c as createSsrRpc } from "./createSsrRpc-PAWZTc54.mjs";
import { c as createServerFn } from "./server--rfMlOVn.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
const loginServerFn = createServerFn({
  method: "POST"
}).inputValidator((d) => objectType({
  email: stringType().email(),
  password: stringType()
}).parse(d)).handler(createSsrRpc("6e48bf9a8d0b0083241ca5f5de326b2263953b01880da2eb48a1912625302af0"));
export {
  loginServerFn
};
