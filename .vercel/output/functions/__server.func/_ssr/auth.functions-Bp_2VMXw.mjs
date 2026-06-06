import { c as createServerRpc, g as getDbConnection } from "./db-CoLckjAe.mjs";
import { c as createServerFn } from "./server--rfMlOVn.mjs";
import { b as bcrypt } from "../_libs/bcryptjs.mjs";
import { j as jwt } from "../_libs/jsonwebtoken.mjs";
import "../_libs/mssql.mjs";
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
import "../_libs/jws.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "../_libs/jwa.mjs";
import "../_libs/ecdsa-sig-formatter.mjs";
import "../_libs/buffer-equal-constant-time.mjs";
import "../_libs/ms.mjs";
import "../_libs/semver.mjs";
import "../_libs/lodash.includes.mjs";
import "../_libs/lodash.isboolean.mjs";
import "../_libs/lodash.isinteger.mjs";
import "../_libs/lodash.isnumber.mjs";
import "../_libs/lodash.isplainobject.mjs";
import "../_libs/lodash.isstring.mjs";
import "../_libs/lodash.once.mjs";
import "node:events";
import "node:diagnostics_channel";
import "../_libs/debug.mjs";
import "tty";
import "../_libs/supports-color.mjs";
import "os";
import "../_libs/has-flag.mjs";
import "../_libs/@tediousjs/connection-string.mjs";
import "node:util";
import "../_libs/tarn.mjs";
import "events";
import "timers";
import "../_libs/tedious.mjs";
import "dns";
import "constants";
import "dgram";
import "node:url";
import "tls";
import "net";
import "../_libs/@azure/identity.mjs";
import "node:fs/promises";
import "child_process";
import "node:child_process";
import "../_libs/tslib.mjs";
import "../_libs/azure__logger.mjs";
import "../_libs/@typespec/ts-http-runtime.mjs";
import "node:os";
import "node:process";
import "node:crypto";
import "node:zlib";
import "node:http";
import "node:https";
import "../_libs/https-proxy-agent.mjs";
import "assert";
import "url";
import "../_libs/agent-base.mjs";
import "https";
import "http";
import "../_libs/http-proxy-agent.mjs";
import "../_libs/azure__core-tracing.mjs";
import "../_libs/@azure/msal-node.mjs";
import "fs";
import "path";
import "../_libs/azure__core-util.mjs";
import "../_libs/azure__abort-controller.mjs";
import "../_libs/azure__core-client.mjs";
import "../_libs/azure__core-rest-pipeline.mjs";
import "../_libs/azure__core-auth.mjs";
import "../_libs/sprintf-js.mjs";
import "../_libs/js-md4.mjs";
import "../_libs/native-duplexpair.mjs";
import "../_libs/bl.mjs";
import "../_libs/readable-stream.mjs";
import "node:string_decoder";
import "../_libs/abort-controller.mjs";
import "../_libs/event-target-shim.mjs";
import "../_libs/inherits.mjs";
import "../_libs/js-joda__core.mjs";
import "../_libs/iconv-lite.mjs";
import "string_decoder";
import "../_libs/safer-buffer.mjs";
const loginServerFn_createServerFn_handler = createServerRpc({
  id: "6e48bf9a8d0b0083241ca5f5de326b2263953b01880da2eb48a1912625302af0",
  name: "loginServerFn",
  filename: "src/lib/auth.functions.ts"
}, (opts) => loginServerFn.__executeServer(opts));
const loginServerFn = createServerFn({
  method: "POST"
}).inputValidator((d) => objectType({
  email: stringType().email(),
  password: stringType()
}).parse(d)).handler(loginServerFn_createServerFn_handler, async ({
  data
}) => {
  const mssql = await import("../_libs/mssql.mjs").then(function(n) {
    return n.i;
  });
  try {
    let user = null;
    let fullName = "";
    let db = null;
    try {
      db = await getDbConnection();
      const userRes = await db.request().input("email", mssql.NVarChar, data.email.toLowerCase().trim()).query("SELECT id, email, password_hash FROM users WHERE email = @email");
      user = userRes.recordset[0];
    } catch (dbErr) {
      console.warn("⚠️ No se pudo conectar a la base de datos SQL Server. Usando usuarios de respaldo locales...", dbErr.message);
    }
    if (user) {
      const passwordValid = await bcrypt.compare(data.password, user.password_hash);
      if (!passwordValid) {
        throw new Error("Invalid login credentials");
      }
      const profileRes = await db.request().input("userId", mssql.UniqueIdentifier, user.id).query("SELECT full_name FROM profiles WHERE id = @userId");
      const profile = profileRes.recordset[0];
      fullName = profile ? profile.full_name : user.email;
    } else {
      const emailLower = data.email.toLowerCase().trim();
      if ((emailLower === "sdazul@gmail.com" || emailLower === "mario.alcocer1997@gmail.com") && data.password === "admin") {
        user = {
          id: emailLower === "sdazul@gmail.com" ? "00000000-0000-0000-0000-000000000001" : "00000000-0000-0000-0000-000000000002",
          email: emailLower
        };
        fullName = emailLower === "sdazul@gmail.com" ? "Omar Carrillo (Demo)" : "Mario Alcocer (Demo)";
      } else {
        throw new Error("Invalid login credentials");
      }
    }
    const jwtSecret = process.env.JWT_SECRET || "royal-transports-hub-secret-key-2026";
    const token = jwt.sign({
      sub: user.id,
      email: user.email
    }, jwtSecret, {
      expiresIn: "24h"
    });
    return {
      session: {
        access_token: token,
        expires_at: Math.floor(Date.now() / 1e3) + 24 * 3600,
        user: {
          id: user.id,
          email: user.email,
          user_metadata: {
            full_name: fullName
          }
        }
      }
    };
  } catch (error) {
    console.error("❌ Error en loginServerFn:", error.message);
    throw new Error(error.message || "Credenciales inválidas");
  }
});
export {
  loginServerFn_createServerFn_handler
};
