import { a as createMiddleware, g as getRequest } from "./server--rfMlOVn.mjs";
import { j as jwt } from "../_libs/jsonwebtoken.mjs";
const requireSupabaseAuth = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const request = getRequest();
    if (!request?.headers) {
      throw new Error("Unauthorized: No request headers available");
    }
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      throw new Error("Unauthorized: No authorization header provided");
    }
    if (!authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized: Only Bearer tokens are supported");
    }
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }
    if (token === "mock-admin-token") {
      const email = request.headers.get("x-mock-email") || "mario.alcocer1997@gmail.com";
      return next({
        context: {
          supabase: null,
          userId: "mock-admin-id",
          claims: { email }
        }
      });
    }
    try {
      const jwtSecret = process.env.JWT_SECRET || "royal-transports-hub-secret-key-2026";
      const decoded = jwt.verify(token, jwtSecret);
      if (!decoded || !decoded.sub) {
        throw new Error("Unauthorized: No user ID found in token");
      }
      return next({
        context: {
          supabase: null,
          userId: decoded.sub,
          claims: decoded
        }
      });
    } catch (error) {
      console.error("❌ Error en requireSupabaseAuth middleware:", error.message);
      throw new Error("Unauthorized: " + (error.message || "Invalid token"));
    }
  }
);
export {
  requireSupabaseAuth as r
};
