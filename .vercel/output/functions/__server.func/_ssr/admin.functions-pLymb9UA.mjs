import { c as createServerRpc, g as getDbConnection } from "./db-CoLckjAe.mjs";
import { c as createServerFn } from "./server--rfMlOVn.mjs";
import { b as bcrypt } from "../_libs/bcryptjs.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-oFiai5iF.mjs";
import require$$1 from "crypto";
import "../_libs/mssql.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/jsonwebtoken.mjs";
import { e as enumType, o as objectType, a as arrayType, s as stringType } from "../_libs/zod.mjs";
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
const APP_IDS = ["procure", "fleet", "operator", "maintenance", "safety", "pemex", "CDMV", "Gantt", "temperature", "termos"];
const HubAppEnum = enumType(APP_IDS);
async function assertAdmin(userId) {
  if (userId === "mock-admin-id" || userId === "00000000-0000-0000-0000-000000000001" || userId === "00000000-0000-0000-0000-000000000002") return;
  try {
    const mssql = await import("../_libs/mssql.mjs").then(function(n) {
      return n.i;
    });
    const db = await getDbConnection();
    const profileRes = await db.request().input("userId", mssql.UniqueIdentifier, userId).query("SELECT email FROM profiles WHERE id = @userId");
    const profile = profileRes.recordset[0];
    const email = profile ? profile.email : "";
    const isDefaultAdmin = ["sdazul@gmail.com", "mario.alcocer1997@gmail.com"].includes(email.toLowerCase().trim());
    if (isDefaultAdmin) return;
    const roleRes = await db.request().input("userId", mssql.UniqueIdentifier, userId).query("SELECT role FROM user_roles WHERE user_id = @userId AND role = 'admin'");
    if (roleRes.recordset.length === 0) {
      throw new Error("Forbidden: admin only");
    }
  } catch (error) {
    console.error("❌ Error en assertAdmin:", error.message);
    throw new Error(error.message || "Forbidden: admin only");
  }
}
const listUsersAdmin_createServerFn_handler = createServerRpc({
  id: "64d5680bf5a0cdd01d8f20fe9b3478a204ba05a8209a6c2c2d02962ee7fc9621",
  name: "listUsersAdmin",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listUsersAdmin.__executeServer(opts));
const listUsersAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listUsersAdmin_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context.userId);
  try {
    const db = await getDbConnection();
    const profilesRes = await db.request().query("SELECT id, email, full_name, created_at FROM profiles ORDER BY created_at DESC");
    const profiles = profilesRes.recordset;
    if (profiles.length === 0) {
      return [];
    }
    const rolesRes = await db.request().query("SELECT user_id, role FROM user_roles");
    const roles = rolesRes.recordset;
    const accessRes = await db.request().query("SELECT user_id, app FROM user_app_access");
    const access = accessRes.recordset;
    return profiles.map((p) => ({
      id: p.id,
      email: p.email,
      full_name: p.full_name,
      created_at: p.created_at,
      roles: roles.filter((r) => r.user_id === p.id).map((r) => r.role),
      apps: access.filter((a) => a.user_id === p.id).map((a) => a.app)
    }));
  } catch (error) {
    console.error("❌ Error en listUsersAdmin:", error.message);
    throw new Error(error.message || "No se pudo cargar la lista de usuarios");
  }
});
const createUserAdmin_createServerFn_handler = createServerRpc({
  id: "facfe8148121e74f214ce643dc542cec4f1e17459f6b1d352ff31732f4f07a6b",
  name: "createUserAdmin",
  filename: "src/lib/admin.functions.ts"
}, (opts) => createUserAdmin.__executeServer(opts));
const createUserAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  email: stringType().email(),
  password: stringType().min(8).max(72),
  fullName: stringType().min(1).max(120),
  role: enumType(["admin", "user"]),
  apps: arrayType(HubAppEnum)
}).parse(d)).handler(createUserAdmin_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context.userId);
  const mssql = await import("../_libs/mssql.mjs").then(function(n) {
    return n.i;
  });
  const db = await getDbConnection();
  const transaction = new mssql.Transaction(db);
  try {
    await transaction.begin();
    const passwordHash = await bcrypt.hash(data.password, 10);
    const userId = require$$1.randomUUID();
    const emailNormalized = data.email.toLowerCase().trim();
    const req1 = new mssql.Request(transaction);
    await req1.input("id", mssql.UniqueIdentifier, userId).input("email", mssql.NVarChar, emailNormalized).input("passwordHash", mssql.NVarChar, passwordHash).query("INSERT INTO users (id, email, password_hash) VALUES (@id, @email, @passwordHash)");
    const req2 = new mssql.Request(transaction);
    await req2.input("id", mssql.UniqueIdentifier, userId).input("email", mssql.NVarChar, emailNormalized).input("fullName", mssql.NVarChar, data.fullName).query("INSERT INTO profiles (id, email, full_name) VALUES (@id, @email, @fullName)");
    const req3 = new mssql.Request(transaction);
    await req3.input("userId", mssql.UniqueIdentifier, userId).input("role", mssql.NVarChar, data.role).query("INSERT INTO user_roles (user_id, role) VALUES (@userId, @role)");
    if (data.apps.length > 0) {
      for (const app of data.apps) {
        const reqApp = new mssql.Request(transaction);
        await reqApp.input("userId", mssql.UniqueIdentifier, userId).input("app", mssql.NVarChar, app).query("INSERT INTO user_app_access (user_id, app) VALUES (@userId, @app)");
      }
    }
    await transaction.commit();
    return {
      id: userId
    };
  } catch (error) {
    await transaction.rollback();
    console.error("❌ Error en createUserAdmin:", error.message);
    throw new Error(error.message || "No se pudo crear el usuario");
  }
});
const updateUserAccessAdmin_createServerFn_handler = createServerRpc({
  id: "8ace63069bb314033177ada2148a31813717585659b48577363937340c0bae75",
  name: "updateUserAccessAdmin",
  filename: "src/lib/admin.functions.ts"
}, (opts) => updateUserAccessAdmin.__executeServer(opts));
const updateUserAccessAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  userId: stringType().uuid(),
  fullName: stringType().min(1).max(120),
  role: enumType(["admin", "user"]),
  apps: arrayType(HubAppEnum)
}).parse(d)).handler(updateUserAccessAdmin_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context.userId);
  const mssql = await import("../_libs/mssql.mjs").then(function(n) {
    return n.i;
  });
  const db = await getDbConnection();
  const transaction = new mssql.Transaction(db);
  try {
    await transaction.begin();
    const req1 = new mssql.Request(transaction);
    await req1.input("userId", mssql.UniqueIdentifier, data.userId).input("fullName", mssql.NVarChar, data.fullName).query("UPDATE profiles SET full_name = @fullName, updated_at = SYSDATETIMEOFFSET() WHERE id = @userId");
    const req2 = new mssql.Request(transaction);
    await req2.input("userId", mssql.UniqueIdentifier, data.userId).query("DELETE FROM user_roles WHERE user_id = @userId");
    const req3 = new mssql.Request(transaction);
    await req3.input("userId", mssql.UniqueIdentifier, data.userId).input("role", mssql.NVarChar, data.role).query("INSERT INTO user_roles (user_id, role) VALUES (@userId, @role)");
    const req4 = new mssql.Request(transaction);
    await req4.input("userId", mssql.UniqueIdentifier, data.userId).query("DELETE FROM user_app_access WHERE user_id = @userId");
    if (data.apps.length > 0) {
      for (const app of data.apps) {
        const reqApp = new mssql.Request(transaction);
        await reqApp.input("userId", mssql.UniqueIdentifier, data.userId).input("app", mssql.NVarChar, app).query("INSERT INTO user_app_access (user_id, app) VALUES (@userId, @app)");
      }
    }
    await transaction.commit();
    return {
      ok: true
    };
  } catch (error) {
    await transaction.rollback();
    console.error("❌ Error en updateUserAccessAdmin:", error.message);
    throw new Error(error.message || "No se pudo actualizar el usuario");
  }
});
const deleteUserAdmin_createServerFn_handler = createServerRpc({
  id: "0b12b7fbdad42f1cf7efa633d49729f42c2cc81a51440baa81c3dcf6297bb982",
  name: "deleteUserAdmin",
  filename: "src/lib/admin.functions.ts"
}, (opts) => deleteUserAdmin.__executeServer(opts));
const deleteUserAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  userId: stringType().uuid()
}).parse(d)).handler(deleteUserAdmin_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context.userId);
  if (data.userId === context.userId) throw new Error("Cannot delete yourself");
  try {
    const mssql = await import("../_libs/mssql.mjs").then(function(n) {
      return n.i;
    });
    const db = await getDbConnection();
    await db.request().input("userId", mssql.UniqueIdentifier, data.userId).query("DELETE FROM users WHERE id = @userId");
    return {
      ok: true
    };
  } catch (error) {
    console.error("❌ Error en deleteUserAdmin:", error.message);
    throw new Error(error.message || "No se pudo eliminar el usuario");
  }
});
const resetPasswordAdmin_createServerFn_handler = createServerRpc({
  id: "3ea0485092ad80cc90f99face6b9d323e19904fc8e35456cf9914684259de2a9",
  name: "resetPasswordAdmin",
  filename: "src/lib/admin.functions.ts"
}, (opts) => resetPasswordAdmin.__executeServer(opts));
const resetPasswordAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  userId: stringType().uuid(),
  password: stringType().min(8).max(72)
}).parse(d)).handler(resetPasswordAdmin_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context.userId);
  try {
    const mssql = await import("../_libs/mssql.mjs").then(function(n) {
      return n.i;
    });
    const db = await getDbConnection();
    const passwordHash = await bcrypt.hash(data.password, 10);
    await db.request().input("userId", mssql.UniqueIdentifier, data.userId).input("passwordHash", mssql.NVarChar, passwordHash).query("UPDATE users SET password_hash = @passwordHash WHERE id = @userId");
    return {
      ok: true
    };
  } catch (error) {
    console.error("❌ Error en resetPasswordAdmin:", error.message);
    throw new Error(error.message || "No se pudo reestablecer la contraseña");
  }
});
export {
  createUserAdmin_createServerFn_handler,
  deleteUserAdmin_createServerFn_handler,
  listUsersAdmin_createServerFn_handler,
  resetPasswordAdmin_createServerFn_handler,
  updateUserAccessAdmin_createServerFn_handler
};
