import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as apps, b as getApp } from "./router-rPd2MqTm.mjs";
import { k as SidebarTrigger } from "./sidebar-CYJjixxa.mjs";
import { u as useAuthenticatedMe } from "./authenticated-me-CD8rrpos.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/jsonwebtoken.mjs";
import { T as Truck, F as FileText, U as Users, h as TriangleAlert, E as ExternalLink, A as ArrowRight } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "./client-CA6elKR7.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function jitter(base, spread) {
  return Math.max(0, Math.round(base + (Math.random() - 0.5) * spread));
}
function trend(base, n = 12, spread = 0.4) {
  return Array.from({ length: n }, (_, i) => base * (1 + Math.sin(i / 2 + Math.random()) * spread));
}
async function getHubStats() {
  await new Promise((r) => setTimeout(r, 120));
  return {
    globals: {
      activeShipments: jitter(237, 18),
      pendingPOs: jitter(42, 8),
      operatorsOnRoute: jitter(184, 12),
      criticalAlerts: jitter(3, 4)
    },
    apps: {
      procure: {
        live: false,
        metrics: [
          { label: "Folios abiertos", value: String(jitter(42, 6)), trend: trend(40) },
          { label: "Vales del día", value: String(jitter(118, 10)), trend: trend(110) },
          { label: "Facturas en revisión", value: String(jitter(27, 4)), trend: trend(25) }
        ]
      },
      fleet: {
        live: false,
        metrics: [
          { label: "Tractos activos", value: String(jitter(146, 6)), trend: trend(140) },
          { label: "Riesgo alto", value: String(jitter(9, 3)), trend: trend(8) },
          { label: "Salud promedio", value: `${jitter(87, 4)}%`, trend: trend(85) }
        ]
      },
      operator: {
        live: false,
        metrics: [
          { label: "Operadores activos", value: String(jitter(184, 8)), trend: trend(180) },
          { label: "Bienestar prom.", value: `${jitter(82, 5)}%`, trend: trend(80) },
          { label: "Retención YTD", value: `${jitter(91, 2)}%`, trend: trend(91) }
        ]
      },
      maintenance: {
        live: false,
        metrics: [
          { label: "OT abiertas", value: String(jitter(34, 6)), trend: trend(32) },
          { label: "Costo del mes", value: `$${jitter(1240, 80)}K`, trend: trend(1240) },
          { label: "Programadas hoy", value: String(jitter(12, 3)), trend: trend(11) }
        ]
      },
      safety: {
        live: false,
        metrics: [
          { label: "Eventos hoy", value: String(jitter(28, 6)), trend: trend(27) },
          { label: "Críticos", value: String(jitter(2, 2)), trend: trend(2) },
          { label: "Score flota", value: `${jitter(94, 3)}`, trend: trend(94) }
        ]
      },
      pemex: {
        live: false,
        metrics: [
          { label: "Embarques activos", value: String(jitter(58, 5)), trend: trend(56) },
          { label: "En carga", value: String(jitter(11, 3)), trend: trend(10) },
          { label: "En descarga", value: String(jitter(9, 3)), trend: trend(9) }
        ]
      },
      temperature: {
        live: false,
        metrics: [
          { label: "Sensores activos", value: String(jitter(120, 10)), trend: trend(118) },
          { label: "Alertas rango", value: String(jitter(1, 1)), trend: trend(1) },
          { label: "Temp promedio", value: `${jitter(-5, 2)}°C`, trend: trend(-5) }
        ]
      },
      termos: {
        live: false,
        metrics: [
          { label: "Cajas activas", value: String(jitter(94, 6)), trend: trend(92) },
          { label: "Alertas frío", value: String(jitter(2, 2)), trend: trend(2) },
          { label: "Temp prom. °C", value: String(jitter(-18, 3)), trend: trend(-18) }
        ]
      },
      CDMV: {
        live: false,
        metrics: [
          { label: "Órdenes activas", value: String(jitter(15, 3)), trend: trend(14) },
          { label: "Preventivos hoy", value: String(jitter(4, 2)), trend: trend(3) },
          { label: "En taller", value: String(jitter(8, 2)), trend: trend(7) }
        ]
      },
      Gantt: {
        live: false,
        metrics: [
          { label: "Proyectos", value: String(jitter(6, 1)), trend: trend(5) },
          { label: "Tareas atrasadas", value: String(jitter(2, 1)), trend: trend(2) },
          { label: "Hitos completados", value: `${jitter(88, 5)}%`, trend: trend(85) }
        ]
      }
    },
    activity: [
      { id: "1", time: "hace 2 min", app: "pemex", text: "Embarque PMX-4421 inició descarga en Salina Cruz" },
      { id: "2", time: "hace 7 min", app: "fleet", text: "T-118 elevó score de riesgo a Alto (códigos P0420 + P0171)" },
      { id: "3", time: "hace 12 min", app: "procure", text: "OC #4592 aprobada por Dir. Operaciones" },
      { id: "4", time: "hace 18 min", app: "safety", text: "Evento de somnolencia detectado — Operador #882" },
      { id: "5", time: "hace 25 min", app: "maintenance", text: "OT #1207 cerrada — cambio de balatas T-067" },
      { id: "6", time: "hace 31 min", app: "operator", text: "Operador #441 completó chequeo médico mensual" }
    ]
  };
}
function Sparkline({
  values
}) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 100;
  const h = 28;
  const step = w / (values.length - 1);
  const points = values.map((v, i) => `${(i * step).toFixed(1)},${(h - (v - min) / range * h).toFixed(1)}`).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: `0 0 ${w} ${h}`, className: "h-7 w-full", preserveAspectRatio: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points, fill: "none", stroke: "var(--gold)", strokeWidth: "1.4", vectorEffect: "non-scaling-stroke", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function KpiCard({
  Icon,
  label,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 12
  }, animate: {
    opacity: 1,
    y: 0
  }, transition: {
    duration: 0.4
  }, className: "relative overflow-hidden rounded-xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold tracking-[0.25em] text-muted-foreground", children: label.toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 ${accent ? "text-destructive" : "text-gold"}` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold tracking-tight text-foreground", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-gold/30 bg-gold/5 px-2 py-0.5 text-[9px] font-semibold tracking-[0.2em] text-gold", children: "DEMO" })
    ] })
  ] });
}
function LiveAppCard({
  app,
  stats,
  idx
}) {
  const {
    Icon
  } = app;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 16
  }, animate: {
    opacity: 1,
    y: 0
  }, transition: {
    duration: 0.4,
    delay: idx * 0.05
  }, className: "hover-lift group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/apps/$appId", params: {
      appId: app.id
    }, "aria-label": `Abrir ${app.name} dentro del hub`, className: "absolute inset-0 z-10 rounded-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-gold shadow-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary-foreground", strokeWidth: 2.2 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[9px] font-semibold tracking-[0.2em] text-gold", children: app.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-border px-2 py-0.5 text-[9px] font-semibold tracking-[0.2em] text-muted-foreground", children: stats?.live ? "LIVE" : "DEMO" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-base font-semibold tracking-tight text-foreground", children: app.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: app.url, target: "_blank", rel: "noopener noreferrer", "aria-label": "Abrir en pestaña nueva", className: "relative z-20 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gold/70 hover:bg-gold/10 hover:text-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: (stats?.metrics ?? []).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-background/40 p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[9px] uppercase tracking-[0.15em] text-muted-foreground", children: m.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-lg font-bold text-foreground", children: m.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkline, { values: m.trend })
    ] }, m.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex items-center justify-between pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/apps/$appId", params: {
      appId: app.id
    }, className: "relative z-20 inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform group-hover:translate-x-0.5", children: [
      "Abrir aquí",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
    ] }) })
  ] });
}
function getFriendlyName(profile) {
  const fullName = profile?.full_name?.trim();
  if (fullName && !fullName.includes("@")) return fullName.split(/\s+/)[0];
  const localPart = profile?.email?.split("@")[0]?.replace(/[._-]+/g, " ").trim();
  return localPart?.split(/\s+/)[0] || "operador";
}
function ActivityFeed({
  items
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-5 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold tracking-[0.25em] text-gold", children: "ACTIVIDAD RECIENTE" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.2em] text-muted-foreground", children: "EN VIVO" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: items.map((it) => {
      const a = getApp(it.app);
      const Icon = a?.Icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 px-5 py-3 text-sm", children: [
        Icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gold/20 bg-gold/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-gold" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate text-foreground/90", children: it.text }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-[10px] tracking-wide text-muted-foreground", children: it.time })
      ] }, it.id);
    }) })
  ] });
}
function Index() {
  const me = useAuthenticatedMe();
  const visibleApps = apps.filter((a) => me.isAdmin || me.apps.includes(a.id));
  const firstName = getFriendlyName(me.profile);
  const {
    data
  } = useQuery({
    queryKey: ["hub-stats"],
    queryFn: getHubStats,
    refetchInterval: 3e4,
    staleTime: 15e3
  });
  const [now, setNow] = reactExports.useState("");
  reactExports.useEffect(() => {
    const tick = () => setNow((/* @__PURE__ */ new Date()).toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit"
    }));
    tick();
    const id = setInterval(tick, 3e4);
    return () => clearInterval(id);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "relative z-20 border-b border-gold/15 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarTrigger, { className: "text-gold hover:bg-gold/10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col leading-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold tracking-[0.25em] text-foreground", children: "ROYAL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] tracking-[0.4em] text-gold", children: "TRANSPORTS" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden items-center gap-2 sm:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 animate-pulse rounded-full bg-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground", children: [
          "Operations Hub ·",
          " ",
          now ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: now }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "inline-block h-3 w-10 animate-pulse rounded bg-gold/15" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold tracking-[0.3em] text-gold", children: "CONTROL CENTER" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: [
          "Hola, ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold capitalize", children: firstName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Vista en vivo de la operación. Las métricas se actualizan automáticamente." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { Icon: Truck, label: "Embarques activos", value: data?.globals.activeShipments ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { Icon: FileText, label: "Facturas en revisión", value: data?.globals.pendingPOs ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { Icon: Users, label: "Operadores en ruta", value: data?.globals.operatorsOnRoute ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { Icon: TriangleAlert, label: "Alertas críticas", value: data?.globals.criticalAlerts ?? "—", accent: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 mb-6 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold tracking-[0.3em] text-gold", children: "SUITE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 text-2xl font-bold tracking-tight", children: "Aplicaciones" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden h-px flex-1 ml-8 bg-gradient-to-r from-gold/30 to-transparent sm:block" })
      ] }),
      visibleApps.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-gold/20 bg-card/60 p-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aún no tienes apps asignadas. Contacta al administrador para obtener acceso." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3", children: visibleApps.map((app, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(LiveAppCard, { app, stats: data?.apps[app.id], idx: i }, app.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityFeed, { items: data?.activity ?? [] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-center text-[10px] tracking-[0.25em] text-gold/50", children: "DEMO — DATOS SIMULADOS · CONECTAR ENDPOINTS REALES PARA MODO LIVE" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-gold/15 mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-6 py-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs tracking-wider text-gold/60", children: "© 2026 Royal Transports · Todos los derechos reservados" }) }) })
  ] });
}
export {
  Index as component
};
