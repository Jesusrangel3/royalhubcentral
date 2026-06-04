import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getMe = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [{ data: profile }, { data: roles }, { data: access }] = await Promise.all([
      supabase.from("profiles").select("id, email, full_name").eq("id", userId).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", userId),
      supabase.from("user_app_access").select("app").eq("user_id", userId),
    ]);
    const roleList = (roles ?? []).map((r) => r.role);
    const isAdmin = roleList.includes("admin");
    return {
      profile: profile ?? null,
      roles: roleList,
      isAdmin,
      apps: (isAdmin
        ? ["procure","fleet","operator","maintenance","safety","pemex","temperature"]
        : (access ?? []).map((a) => a.app)) as string[],
    };
  });
