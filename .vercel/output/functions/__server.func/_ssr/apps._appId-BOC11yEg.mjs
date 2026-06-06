import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useSidebar, k as SidebarTrigger } from "./sidebar-CYJjixxa.mjs";
import { d as Route, b as getApp } from "./router-rPd2MqTm.mjs";
import { u as useAuthenticatedMe } from "./authenticated-me-CD8rrpos.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/jsonwebtoken.mjs";
import { R as RefreshCw, m as Maximize2, n as Minimize2, E as ExternalLink, o as ShieldAlert } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./button-EGqxp0nL.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./client-CA6elKR7.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./createSsrRpc-PAWZTc54.mjs";
import "./server--rfMlOVn.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-oFiai5iF.mjs";
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
function EmbeddedApp({ app, reloadKey }) {
  const [loaded, setLoaded] = reactExports.useState(false);
  const [blocked, setBlocked] = reactExports.useState(false);
  const iframeRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setLoaded(false);
    setBlocked(false);
  }, [app.id, reloadKey]);
  if (blocked) {
    const Icon = app.Icon;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-background p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-gold shadow-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-8 w-8 text-primary-foreground", strokeWidth: 2.2 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-medium text-gold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-3.5 w-3.5" }),
        "EMBEBIDO BLOQUEADO"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-2xl font-semibold tracking-tight", children: app.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed text-muted-foreground", children: "Esta aplicación no permite ser embebida dentro del hub por su política de seguridad. Puedes abrirla en una pestaña nueva sin perder tu sesión aquí." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: app.url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground",
            children: [
              "Abrir en pestaña nueva",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              setBlocked(false);
              setLoaded(false);
            },
            className: "inline-flex items-center gap-2 rounded-lg border border-gold/30 px-4 py-2.5 text-sm text-gold hover:bg-gold/10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
              "Reintentar"
            ]
          }
        )
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full w-full bg-background", children: [
    !loaded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 animate-spin rounded-full border-2 border-gold/20 border-t-gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.25em] text-gold/70", children: [
        "Cargando ",
        app.shortName,
        "…"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "iframe",
      {
        ref: iframeRef,
        src: app.url,
        title: app.name,
        className: "h-full w-full border-0",
        loading: "eager",
        referrerPolicy: "no-referrer-when-downgrade",
        allow: "clipboard-read; clipboard-write; fullscreen; camera; microphone; geolocation",
        sandbox: "allow-same-origin allow-scripts allow-forms allow-popups allow-downloads allow-modals allow-popups-to-escape-sandbox",
        onLoad: () => setLoaded(true)
      },
      `${app.id}-${reloadKey}`
    )
  ] });
}
function AppHost() {
  const {
    appId
  } = Route.useParams();
  const app = getApp(appId);
  const me = useAuthenticatedMe();
  const allowed = me.isAdmin || me.apps.includes(app.id);
  const [reloadKey, setReloadKey] = reactExports.useState(0);
  const {
    setOpen,
    open
  } = useSidebar();
  if (!allowed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-screen items-center justify-center p-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-foreground", children: "Sin acceso" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "No tienes permisos para ver esta aplicación. Contacta al administrador." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-6 inline-flex rounded-lg bg-gradient-gold px-4 py-2 text-sm font-semibold text-primary-foreground", children: "Volver al inicio" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-3 border-b border-gold/15 bg-card/40 px-4 py-2.5 backdrop-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarTrigger, { className: "text-gold hover:bg-gold/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.2em] text-gold", children: app.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "truncate text-sm font-semibold text-foreground", children: app.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { label: "Recargar", onClick: () => setReloadKey((k) => k + 1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { label: open ? "Pantalla completa" : "Mostrar barra lateral", onClick: () => setOpen(!open), children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize2, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: app.url, target: "_blank", rel: "noopener noreferrer", className: "ml-1 inline-flex items-center gap-1.5 rounded-md border border-gold/30 px-3 py-1.5 text-xs font-medium text-gold hover:bg-gold/10", "aria-label": "Abrir en pestaña nueva", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Abrir externo" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmbeddedApp, { app, reloadKey }) })
  ] });
}
function IconButton({
  children,
  label,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick, "aria-label": label, title: label, className: "inline-flex h-8 w-8 items-center justify-center rounded-md text-gold hover:bg-gold/10", children });
}
export {
  AppHost as component
};
