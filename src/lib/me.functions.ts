import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getDbConnection } from "./db";
import mssql from "mssql";

export const getMe = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId } = context;

    try {
      let profile = null;
      let roleList: string[] = [];
      let appAccessList: string[] = [];
      let isAdmin = false;

      try {
        const db = await getDbConnection();

        // 1. Consultar el perfil en SQL Server
        const profileRes = await db.request()
          .input("userId", mssql.UniqueIdentifier, userId)
          .query("SELECT id, email, full_name FROM profiles WHERE id = @userId");
        
        profile = profileRes.recordset[0] || null;

        // 2. Consultar los roles en SQL Server
        const rolesRes = await db.request()
          .input("userId", mssql.UniqueIdentifier, userId)
          .query("SELECT role FROM user_roles WHERE user_id = @userId");
        
        roleList = rolesRes.recordset.map((r) => r.role);

        // 3. Consultar las apps a las que tiene acceso
        const accessRes = await db.request()
          .input("userId", mssql.UniqueIdentifier, userId)
          .query("SELECT app FROM user_app_access WHERE user_id = @userId");
        
        appAccessList = accessRes.recordset.map((a) => a.app);
        
        const email = profile ? profile.email : "";
        isAdmin = roleList.includes("admin") || ["sdazul@gmail.com", "mario.alcocer1997@gmail.com"].includes(email.toLowerCase().trim());
      } catch (dbErr: any) {
        console.warn("⚠️ No se pudo conectar a SQL Server en getMe. Usando perfil de demostración...", dbErr.message);
        // Fallback de demo si la BD está caída o en la nube sin configurar
        if (userId === "00000000-0000-0000-0000-000000000001" || userId === "00000000-0000-0000-0000-000000000002") {
          const isSdazul = userId === "00000000-0000-0000-0000-000000000001";
          profile = {
            id: userId,
            email: isSdazul ? "sdazul@gmail.com" : "mario.alcocer1997@gmail.com",
            full_name: isSdazul ? "Omar Carrillo (Demo)" : "Mario Alcocer (Demo)",
          };
          roleList = ["admin"];
          isAdmin = true;
        }
      }

      return {
        profile: profile,
        roles: roleList,
        isAdmin,
        apps: (isAdmin
          ? ["procure", "fleet", "operator", "maintenance", "safety", "pemex", "CDMV", "Gantt", "temperature"]
          : appAccessList) as string[],
      };
    } catch (error: any) {
      console.error("❌ Error en getMe server function:", error.message);
      return {
        profile: null,
        roles: [],
        isAdmin: false,
        apps: [],
      };
    }
  });
