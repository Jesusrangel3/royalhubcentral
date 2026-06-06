import { c as createServerRpc, g as getDbConnection } from "./db-CoLckjAe.mjs";
import { c as createServerFn } from "./server--rfMlOVn.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-oFiai5iF.mjs";
import "../_libs/mssql.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/jsonwebtoken.mjs";
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
import "node:events";
import "node:diagnostics_channel";
import "../_libs/debug.mjs";
import "../_libs/ms.mjs";
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
import "buffer";
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
import "../_libs/jws.mjs";
import "../_libs/safe-buffer.mjs";
import "../_libs/jwa.mjs";
import "../_libs/ecdsa-sig-formatter.mjs";
import "../_libs/buffer-equal-constant-time.mjs";
import "../_libs/semver.mjs";
import "../_libs/lodash.includes.mjs";
import "../_libs/lodash.isboolean.mjs";
import "../_libs/lodash.isinteger.mjs";
import "../_libs/lodash.isnumber.mjs";
import "../_libs/lodash.isplainobject.mjs";
import "../_libs/lodash.isstring.mjs";
import "../_libs/lodash.once.mjs";
const getMe_createServerFn_handler = createServerRpc({
  id: "2bba25d786b63121276e4c1bb70a1792bf0409c8bb9bbe2550c522e10500892a",
  name: "getMe",
  filename: "src/lib/me.functions.ts"
}, (opts) => getMe.__executeServer(opts));
const getMe = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getMe_createServerFn_handler, async ({
  context
}) => {
  const {
    userId
  } = context;
  const mssql = await import("../_libs/mssql.mjs").then(function(n) {
    return n.i;
  });
  try {
    let profile = null;
    let roleList = [];
    let appAccessList = [];
    let isAdmin = false;
    try {
      const db = await getDbConnection();
      const profileRes = await db.request().input("userId", mssql.UniqueIdentifier, userId).query("SELECT id, email, full_name FROM profiles WHERE id = @userId");
      profile = profileRes.recordset[0] || null;
      const rolesRes = await db.request().input("userId", mssql.UniqueIdentifier, userId).query("SELECT role FROM user_roles WHERE user_id = @userId");
      roleList = rolesRes.recordset.map((r) => r.role);
      const accessRes = await db.request().input("userId", mssql.UniqueIdentifier, userId).query("SELECT app FROM user_app_access WHERE user_id = @userId");
      appAccessList = accessRes.recordset.map((a) => a.app);
      const email = profile ? profile.email : "";
      isAdmin = roleList.includes("admin") || ["sdazul@gmail.com", "mario.alcocer1997@gmail.com"].includes(email.toLowerCase().trim());
    } catch (dbErr) {
      console.warn("⚠️ No se pudo conectar a SQL Server en getMe. Usando perfil de demostración...", dbErr.message);
      if (userId === "00000000-0000-0000-0000-000000000001" || userId === "00000000-0000-0000-0000-000000000002") {
        const isSdazul = userId === "00000000-0000-0000-0000-000000000001";
        profile = {
          id: userId,
          email: isSdazul ? "sdazul@gmail.com" : "mario.alcocer1997@gmail.com",
          full_name: isSdazul ? "Omar Carrillo (Demo)" : "Mario Alcocer (Demo)"
        };
        roleList = ["admin"];
        isAdmin = true;
      }
    }
    return {
      profile,
      roles: roleList,
      isAdmin,
      apps: isAdmin ? ["procure", "fleet", "operator", "maintenance", "safety", "pemex", "CDMV", "Gantt", "temperature", "termos"] : appAccessList
    };
  } catch (error) {
    console.error("❌ Error en getMe server function:", error.message);
    return {
      profile: null,
      roles: [],
      isAdmin: false,
      apps: []
    };
  }
});
export {
  getMe_createServerFn_handler
};
