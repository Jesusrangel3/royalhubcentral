import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getDbConnection } from "./db";
import crypto from "crypto";

const APP_IDS = ["procure", "fleet", "operator", "maintenance", "safety", "pemex", "CDMV", "Gantt", "temperature", "termos"] as const;
const HubAppEnum = z.enum(APP_IDS);

async function assertAdmin(userId: string) {
  // En local de desarrollo el ID 'mock-admin-id' y los de demo son omitidos
  if (
    userId === "mock-admin-id" ||
    userId === "00000000-0000-0000-0000-000000000001" ||
    userId === "00000000-0000-0000-0000-000000000002" ||
    userId === "00000000-0000-0000-0000-000000000003"
  ) return;

  try {
    const mssql = await import("mssql");
    const db = await getDbConnection();
    
    // Obtener el email del usuario para validar si es un admin por defecto
    const profileRes = await db.request()
      .input("userId", mssql.UniqueIdentifier, userId)
      .query("SELECT email FROM profiles WHERE id = @userId");
    
    const profile = profileRes.recordset[0];
    const email = profile ? profile.email : "";

    const isDefaultAdmin = [
      "sdazul@gmail.com",
      "mario.alcocer1997@gmail.com",
      "jesus@royaltransports.com.mx",
    ].includes(email.toLowerCase().trim());
    if (isDefaultAdmin) return;

    // Verificar en la tabla de roles si tiene el rol de admin
    const roleRes = await db.request()
      .input("userId", mssql.UniqueIdentifier, userId)
      .query("SELECT role FROM user_roles WHERE user_id = @userId AND role = 'admin'");
    
    if (roleRes.recordset.length === 0) {
      throw new Error("Forbidden: admin only");
    }
  } catch (error: any) {
    // Si no hay BD disponible y el error no es de permisos, lo dejamos pasar
    if (error.message === "Forbidden: admin only") throw error;
    console.warn("⚠️ assertAdmin: no se pudo verificar permisos en BD, permitiendo acceso de demo...", error.message);
  }
}

export const listUsersAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    
    try {
      const db = await getDbConnection();
      
      // Obtener perfiles de usuarios de SQL Server
      const profilesRes = await db.request()
        .query("SELECT id, email, full_name, created_at FROM profiles ORDER BY created_at DESC");
      
      const profiles = profilesRes.recordset;
      if (profiles.length === 0) {
        return [];
      }

      // Obtener todos los roles
      const rolesRes = await db.request()
        .query("SELECT user_id, role FROM user_roles");
      const roles = rolesRes.recordset;

      // Obtener todos los accesos de app
      const accessRes = await db.request()
        .query("SELECT user_id, app FROM user_app_access");
      const access = accessRes.recordset;

      return profiles.map((p) => ({
        id: p.id,
        email: p.email,
        full_name: p.full_name,
        created_at: p.created_at,
        roles: roles.filter((r) => r.user_id === p.id).map((r) => r.role),
        apps: access.filter((a) => a.user_id === p.id).map((a) => a.app),
      }));
    } catch (error: any) {
      console.warn("⚠️ listUsersAdmin: BD no disponible, retornando usuarios de demo...", error.message);
      // Fallback: retornar lista de usuarios de demo cuando la BD no está disponible
      return [
        {
          id: "00000000-0000-0000-0000-000000000001",
          email: "sdazul@gmail.com",
          full_name: "Omar Carrillo (Demo)",
          created_at: new Date().toISOString(),
          roles: ["admin"],
          apps: [] as string[],
        },
        {
          id: "00000000-0000-0000-0000-000000000002",
          email: "mario.alcocer1997@gmail.com",
          full_name: "Mario Alcocer (Demo)",
          created_at: new Date().toISOString(),
          roles: ["admin"],
          apps: [] as string[],
        },
        {
          id: "00000000-0000-0000-0000-000000000003",
          email: "jesus@royaltransports.com.mx",
          full_name: "Jesús Sánchez",
          created_at: new Date().toISOString(),
          roles: ["admin"],
          apps: [] as string[],
        },
      ];
    }
  });

export const createUserAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        email: z.string().email(),
        password: z.string().min(8).max(72),
        fullName: z.string().min(1).max(120),
        role: z.enum(["admin", "user"]),
        apps: z.array(HubAppEnum),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const mssql = await import("mssql");
    const db = await getDbConnection();
    const transaction = new mssql.Transaction(db);
    
    try {
      await transaction.begin();
      
      // 1. Encriptar la contraseña con bcrypt
      const passwordHash = await bcrypt.hash(data.password, 10);
      const userId = crypto.randomUUID();
      const emailNormalized = data.email.toLowerCase().trim();

      // 2. Insertar en tabla 'users'
      const req1 = new mssql.Request(transaction);
      await req1
        .input("id", mssql.UniqueIdentifier, userId)
        .input("email", mssql.NVarChar, emailNormalized)
        .input("passwordHash", mssql.NVarChar, passwordHash)
        .query("INSERT INTO users (id, email, password_hash) VALUES (@id, @email, @passwordHash)");

      // 3. Insertar en tabla 'profiles'
      const req2 = new mssql.Request(transaction);
      await req2
        .input("id", mssql.UniqueIdentifier, userId)
        .input("email", mssql.NVarChar, emailNormalized)
        .input("fullName", mssql.NVarChar, data.fullName)
        .query("INSERT INTO profiles (id, email, full_name) VALUES (@id, @email, @fullName)");

      // 4. Insertar en tabla 'user_roles'
      const req3 = new mssql.Request(transaction);
      await req3
        .input("userId", mssql.UniqueIdentifier, userId)
        .input("role", mssql.NVarChar, data.role)
        .query("INSERT INTO user_roles (user_id, role) VALUES (@userId, @role)");

      // 5. Insertar en tabla 'user_app_access'
      if (data.apps.length > 0) {
        for (const app of data.apps) {
          const reqApp = new mssql.Request(transaction);
          await reqApp
            .input("userId", mssql.UniqueIdentifier, userId)
            .input("app", mssql.NVarChar, app)
            .query("INSERT INTO user_app_access (user_id, app) VALUES (@userId, @app)");
        }
      }

      await transaction.commit();
      return { id: userId };
    } catch (error: any) {
      await transaction.rollback();
      console.error("❌ Error en createUserAdmin:", error.message);
      throw new Error(error.message || "No se pudo crear el usuario");
    }
  });

export const updateUserAccessAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        userId: z.string().uuid(),
        fullName: z.string().min(1).max(120),
        role: z.enum(["admin", "user"]),
        apps: z.array(HubAppEnum),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const mssql = await import("mssql");
    const db = await getDbConnection();
    const transaction = new mssql.Transaction(db);
    
    try {
      await transaction.begin();

      // 1. Actualizar perfil
      const req1 = new mssql.Request(transaction);
      await req1
        .input("userId", mssql.UniqueIdentifier, data.userId)
        .input("fullName", mssql.NVarChar, data.fullName)
        .query("UPDATE profiles SET full_name = @fullName, updated_at = SYSDATETIMEOFFSET() WHERE id = @userId");

      // 2. Actualizar rol (Borrar antiguos e insertar el nuevo)
      const req2 = new mssql.Request(transaction);
      await req2.input("userId", mssql.UniqueIdentifier, data.userId).query("DELETE FROM user_roles WHERE user_id = @userId");
      const req3 = new mssql.Request(transaction);
      await req3
        .input("userId", mssql.UniqueIdentifier, data.userId)
        .input("role", mssql.NVarChar, data.role)
        .query("INSERT INTO user_roles (user_id, role) VALUES (@userId, @role)");

      // 3. Actualizar accesos de app (Borrar antiguos e insertar los nuevos)
      const req4 = new mssql.Request(transaction);
      await req4.input("userId", mssql.UniqueIdentifier, data.userId).query("DELETE FROM user_app_access WHERE user_id = @userId");
      
      if (data.apps.length > 0) {
        for (const app of data.apps) {
          const reqApp = new mssql.Request(transaction);
          await reqApp
            .input("userId", mssql.UniqueIdentifier, data.userId)
            .input("app", mssql.NVarChar, app)
            .query("INSERT INTO user_app_access (user_id, app) VALUES (@userId, @app)");
        }
      }

      await transaction.commit();
      return { ok: true };
    } catch (error: any) {
      await transaction.rollback();
      console.error("❌ Error en updateUserAccessAdmin:", error.message);
      throw new Error(error.message || "No se pudo actualizar el usuario");
    }
  });

export const deleteUserAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ userId: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    if (data.userId === context.userId) throw new Error("Cannot delete yourself");
    
    try {
      const mssql = await import("mssql");
      const db = await getDbConnection();
      
      // Borrar de 'users', cascada borrará perfil, roles y accesos
      await db.request()
        .input("userId", mssql.UniqueIdentifier, data.userId)
        .query("DELETE FROM users WHERE id = @userId");
      
      return { ok: true };
    } catch (error: any) {
      console.error("❌ Error en deleteUserAdmin:", error.message);
      throw new Error(error.message || "No se pudo eliminar el usuario");
    }
  });

export const resetPasswordAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        userId: z.string().uuid(),
        password: z.string().min(8).max(72),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    
    try {
      const mssql = await import("mssql");
      const db = await getDbConnection();
      const passwordHash = await bcrypt.hash(data.password, 10);

      await db.request()
        .input("userId", mssql.UniqueIdentifier, data.userId)
        .input("passwordHash", mssql.NVarChar, passwordHash)
        .query("UPDATE users SET password_hash = @passwordHash WHERE id = @userId");
      
      return { ok: true };
    } catch (error: any) {
      console.error("❌ Error en resetPasswordAdmin:", error.message);
      throw new Error(error.message || "No se pudo reestablecer la contraseña");
    }
  });
