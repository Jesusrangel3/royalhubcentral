import { createFileRoute, redirect, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getMe } from "@/lib/me.functions";
import { AuthenticatedMeContext, type AuthenticatedMe } from "@/lib/authenticated-me";

type Me = AuthenticatedMe;

function withTimeout<T>(promise: PromiseLike<T>, ms = 8_000): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error("Auth request timed out")), ms);
    promise.then(
      (value) => {
        window.clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        window.clearTimeout(timer);
        reject(error);
      },
    );
  });
}

async function clearLocalSession() {
  try {
    await supabase.auth.signOut({ scope: "local" });
  } catch {
    /* noop */
  }
}

async function ensureAuthenticatedUser() {
  const { data: sessionData, error: sessionError } = await withTimeout(supabase.auth.getSession());
  const session = sessionData.session;
  if (sessionError || !session) throw new Error("No active session");

  const expiresAt = session.expires_at ? session.expires_at * 1000 : 0;
  if (expiresAt && expiresAt - Date.now() < 60_000) {
    const { data: refreshed, error: refreshError } = await withTimeout(
      supabase.auth.refreshSession(),
    );
    if (refreshError || !refreshed.session) throw new Error("Session refresh failed");
  }

  const { data, error } = await withTimeout(supabase.auth.getUser());
  if (error || !data.user) throw new Error("Invalid session");
  return data.user;
}

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    if (typeof window === "undefined") return;
    try {
      await ensureAuthenticatedUser();
      return;
    } catch {
      await clearLocalSession();
    }
    throw redirect({ to: "/login", search: { redirect: location.href } });
  },
  loader: async () => {
    if (typeof window === "undefined") return null;
    return withTimeout(getMe()).catch(() => null);
  },
  component: AuthedLayout,
});

function AuthedLayout() {
  const initial = Route.useLoaderData() as Me | null;
  const [me, setMe] = useState<Me | null>(initial);
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (me) return;
    let cancelled = false;
    (async () => {
      try {
        await ensureAuthenticatedUser();
        const freshMe = await withTimeout(getMe());
        if (!cancelled) {
          setMe(freshMe);
          setAttempts(0);
        }
      } catch {
        if (cancelled) return;
        if (attempts >= 2) {
          await clearLocalSession();
          navigate({ to: "/login" });
          return;
        }
        setTimeout(() => {
          if (!cancelled) setAttempts((n) => n + 1);
        }, 800);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [me, attempts, navigate]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, s) => {
      if (event === "SIGNED_OUT") {
        navigate({ to: "/login" });
        return;
      }
      if (event === "SIGNED_IN" && s) {
        setAttempts(0);
        window.setTimeout(() => {
          void withTimeout(getMe()).then(setMe).catch(() => setMe(null));
        }, 0);
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!me) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
          <p className="text-xs uppercase tracking-[0.25em] text-gold/70">Reconectando sesión…</p>
        </div>
      </div>
    );
  }

  return (
    <AuthenticatedMeContext.Provider value={me}>
      <SidebarProvider defaultOpen>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar me={me} />
          <main className="relative flex min-h-screen flex-1 flex-col">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </AuthenticatedMeContext.Provider>
  );
}
