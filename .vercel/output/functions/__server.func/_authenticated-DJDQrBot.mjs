import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { R as Route$3, e as ensureAuthenticatedUser, w as withTimeout, g as getMe, c as clearLocalSession, a as apps } from "./_ssr/router-rPd2MqTm.mjs";
import { d as useNavigate, O as Outlet, e as useRouterState, L as Link } from "./_libs/tanstack__react-router.mjs";
import { s as supabase } from "./_ssr/client-CA6elKR7.mjs";
import { S as SidebarProvider, u as useSidebar, a as Sidebar, b as SidebarHeader, c as SidebarContent, d as SidebarGroup, e as SidebarGroupLabel, f as SidebarGroupContent, g as SidebarMenu, h as SidebarMenuItem, i as SidebarMenuButton, j as SidebarFooter } from "./_ssr/sidebar-CYJjixxa.mjs";
import { A as AuthenticatedMeContext } from "./_ssr/authenticated-me-CD8rrpos.mjs";
import "./_libs/sonner.mjs";
import "./_libs/seroval.mjs";
import "./_libs/jsonwebtoken.mjs";
import { e as LayoutDashboard, f as Shield, g as LogOut } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_ssr/createSsrRpc-PAWZTc54.mjs";
import "./_ssr/server--rfMlOVn.mjs";
import "node:async_hooks";
import "./_libs/h3-v2.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
import "./_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "./_libs/isbot.mjs";
import "./_ssr/auth-middleware-oFiai5iF.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
import "./_libs/jws.mjs";
import "./_libs/safe-buffer.mjs";
import "buffer";
import "./_libs/jwa.mjs";
import "./_libs/ecdsa-sig-formatter.mjs";
import "./_libs/buffer-equal-constant-time.mjs";
import "./_libs/ms.mjs";
import "./_libs/semver.mjs";
import "./_libs/lodash.includes.mjs";
import "./_libs/lodash.isboolean.mjs";
import "./_libs/lodash.isinteger.mjs";
import "./_libs/lodash.isnumber.mjs";
import "./_libs/lodash.isplainobject.mjs";
import "./_libs/lodash.isstring.mjs";
import "./_libs/lodash.once.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/clsx.mjs";
import "./_ssr/button-EGqxp0nL.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-separator.mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/radix-ui__react-dialog.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "./_libs/radix-ui__react-focus-scope.mjs";
import "./_libs/radix-ui__react-portal.mjs";
import "./_libs/radix-ui__react-presence.mjs";
import "./_libs/radix-ui__react-focus-guards.mjs";
import "./_libs/react-remove-scroll.mjs";
import "./_libs/react-remove-scroll-bar.mjs";
import "./_libs/react-style-singleton.mjs";
import "./_libs/get-nonce.mjs";
import "./_libs/use-sidecar.mjs";
import "./_libs/use-callback-ref.mjs";
import "./_libs/aria-hidden.mjs";
import "./_libs/radix-ui__react-tooltip.mjs";
import "./_libs/radix-ui__react-popper.mjs";
import "./_libs/floating-ui__react-dom.mjs";
import "./_libs/floating-ui__dom.mjs";
import "./_libs/floating-ui__core.mjs";
import "./_libs/floating-ui__utils.mjs";
import "./_libs/radix-ui__react-arrow.mjs";
import "./_libs/radix-ui__react-use-size.mjs";
import "./_libs/@radix-ui/react-visually-hidden+[...].mjs";
function AppSidebar({ me }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const visibleApps = apps.filter((a) => me.isAdmin || me.apps.includes(a.id));
  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Sidebar, { collapsible: "icon", className: "border-r border-gold/15", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarHeader, { className: "border-b border-gold/15 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "flex w-full items-center gap-2 rounded-lg border border-gold/20 bg-card/60 px-3 py-2 text-left",
        children: collapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold tracking-[0.2em] text-gold", children: "R" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col leading-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold tracking-[0.25em] text-foreground", children: "ROYAL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] tracking-[0.35em] text-gold", children: "TRANSPORTS" })
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupLabel, { className: "text-gold/70", children: "Hub" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: pathname === "/", tooltip: "Inicio", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-4 w-4 text-gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Inicio" })
          ] }) }) }),
          me.isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SidebarMenuButton,
            {
              asChild: true,
              isActive: pathname === "/admin",
              tooltip: "Administración",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 text-gold" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Administración" })
              ] })
            }
          ) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupLabel, { className: "text-gold/70", children: "Aplicaciones" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenu, { children: [
          visibleApps.length === 0 && !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 py-1 text-[11px] text-muted-foreground", children: "Sin apps asignadas. Contacta al administrador." }),
          visibleApps.map((app) => {
            const active = pathname === `/apps/${app.id}`;
            const Icon = app.Icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: active, tooltip: app.name, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/apps/$appId", params: { appId: app.id }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-gold" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: app.shortName })
            ] }) }) }, app.id);
          })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarFooter, { className: "border-t border-gold/15 p-2", children: [
      !collapsed && me.profile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs font-medium text-foreground", children: me.profile.full_name ?? me.profile.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[10px] text-muted-foreground", children: me.profile.email })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: signOut,
          className: "flex items-center gap-2 rounded-md px-2 py-2 text-xs text-gold/80 hover:bg-gold/10 hover:text-gold",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Cerrar sesión" })
          ]
        }
      )
    ] })
  ] });
}
function AuthedLayout() {
  const initial = Route$3.useLoaderData();
  const [me, setMe] = reactExports.useState(initial);
  const [attempts, setAttempts] = reactExports.useState(0);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
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
          navigate({
            to: "/login"
          });
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
  reactExports.useEffect(() => {
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, s) => {
      if (event === "SIGNED_OUT") {
        navigate({
          to: "/login"
        });
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 animate-spin rounded-full border-2 border-gold/20 border-t-gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.25em] text-gold/70", children: "Reconectando sesión…" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthenticatedMeContext.Provider, { value: me, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarProvider, { defaultOpen: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen w-full bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppSidebar, { me }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative flex min-h-screen flex-1 flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] }) }) });
}
export {
  AuthedLayout as component
};
