import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDbConnection } from "./db";

export const loginServerFn = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        email: z.string().email(),
        password: z.string(),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const mssql = await import("mssql");
    try {
      let user = null;
      let fullName = "";
      let db = null;

      try {
        db = await getDbConnection();
        
        // 1. Buscar al usuario en la tabla 'users' de SQL Server
        const userRes = await db.request()
          .input("email", mssql.NVarChar, data.email.toLowerCase().trim())
          .query("SELECT id, email, password_hash FROM users WHERE email = @email");
        
        user = userRes.recordset[0];
      } catch (dbErr: any) {
        console.warn("⚠️ No se pudo conectar a la base de datos SQL Server. Usando usuarios de respaldo locales...", dbErr.message);
      }

      if (user) {
        // 2. Comparar la contraseña ingresada con el hash encriptado
        const passwordValid = await bcrypt.compare(data.password, user.password_hash);
        if (!passwordValid) {
          throw new Error("Invalid login credentials");
        }

        // 3. Obtener el perfil del usuario para sacar su nombre completo
        const profileRes = await db.request()
          .input("userId", mssql.UniqueIdentifier, user.id)
          .query("SELECT full_name FROM profiles WHERE id = @userId");
        
        const profile = profileRes.recordset[0];
        fullName = profile ? profile.full_name : user.email;
      } else {
        // Fallback de demo si la base de datos no está disponible (ej. en Vercel sin base de datos en la nube configurada)
        const emailLower = data.email.toLowerCase().trim();
        if (
          (emailLower === "sdazul@gmail.com" || emailLower === "mario.alcocer1997@gmail.com") &&
          data.password === "admin"
        ) {
          user = {
            id: emailLower === "sdazul@gmail.com" ? "00000000-0000-0000-0000-000000000001" : "00000000-0000-0000-0000-000000000002",
            email: emailLower,
          };
          fullName = emailLower === "sdazul@gmail.com" ? "Omar Carrillo (Demo)" : "Mario Alcocer (Demo)";
        } else {
          throw new Error("Invalid login credentials");
        }
      }

      // 4. Firmar el token JWT propio usando el JWT_SECRET
      const jwtSecret = process.env.JWT_SECRET || "royal-transports-hub-secret-key-2026";
      const token = jwt.sign(
        { sub: user.id, email: user.email },
        jwtSecret,
        { expiresIn: "24h" }
      );

      // 5. Devolver el formato de respuesta compatible con el frontend
      return {
        session: {
          access_token: token,
          expires_at: Math.floor(Date.now() / 1000) + 24 * 3600,
          user: {
            id: user.id,
            email: user.email,
            user_metadata: { full_name: fullName }
          }
        }
      };
    } catch (error: any) {
      console.error("❌ Error en loginServerFn:", error.message);
      throw new Error(error.message || "Credenciales inválidas");
    }
  });
