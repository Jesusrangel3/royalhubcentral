import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { S as redirect, T as notFound } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-CA6elKR7.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { c as createSsrRpc } from "./createSsrRpc-PAWZTc54.mjs";
import { c as createServerFn } from "./server--rfMlOVn.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-oFiai5iF.mjs";
import { S as ShoppingCart, T as Truck, H as Heart, W as Wrench, a as ShieldCheck, M as MapPin, C as ClipboardList, b as CalendarDays, c as Thermometer, d as Snowflake } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/jsonwebtoken.mjs";
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
const appCss = "/assets/styles-BsYm50le.css";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$5 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      {
        name: "description",
        content: "Centralized operations hub for Royal Transports, launching fleet, procurement, and operator management apps."
      },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      {
        property: "og:description",
        content: "Centralized operations hub for Royal Transports, launching fleet, procurement, and operator management apps."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Lovable App" },
      {
        name: "twitter:description",
        content: "Centralized operations hub for Royal Transports, launching fleet, procurement, and operator management apps."
      },
      {
        property: "og:image",
        content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2a126eb9-6f9b-452e-902b-760abc77f1e0/id-preview-44fe517b--469c1589-c730-4157-8311-0a8f2d58b6d6.lovable.app-1778858336012.png"
      },
      {
        name: "twitter:image",
        content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2a126eb9-6f9b-452e-902b-760abc77f1e0/id-preview-44fe517b--469c1589-c730-4157-8311-0a8f2d58b6d6.lovable.app-1778858336012.png"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$5.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AuthSync, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] });
}
function AuthSync() {
  const router2 = useRouter();
  const navigate = useNavigate();
  const qc = useQueryClient();
  reactExports.useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event) => {
      if (!["SIGNED_IN", "SIGNED_OUT", "TOKEN_REFRESHED"].includes(event)) return;
      window.setTimeout(() => {
        router2.invalidate();
        qc.invalidateQueries();
      }, 0);
      if (event === "SIGNED_OUT") {
        navigate({ to: "/login" });
      }
    });
    return () => subscription.unsubscribe();
  }, [router2, qc, navigate]);
  return null;
}
const $$splitComponentImporter$4 = () => import("./login-J5mPgB8c.mjs");
const Route$4 = createFileRoute("/login")({
  beforeLoad: async () => {
    const {
      data
    } = await supabase.auth.getSession();
    if (data.session) throw redirect({
      to: "/"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  head: () => ({
    meta: [{
      title: "Iniciar sesión — Royal Transports Hub"
    }]
  })
});
function withTimeout(promise, ms = 8e3) {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error("Auth request timed out")), ms);
    promise.then((value) => {
      window.clearTimeout(timer);
      resolve(value);
    }, (error) => {
      window.clearTimeout(timer);
      reject(error);
    });
  });
}
async function clearLocalSession() {
  try {
    await supabase.auth.signOut({
      scope: "local"
    });
  } catch {
  }
}
async function ensureAuthenticatedUser() {
  const {
    data: sessionData,
    error: sessionError
  } = await withTimeout(supabase.auth.getSession());
  const session = sessionData.session;
  if (sessionError || !session) throw new Error("No active session");
  const expiresAt = session.expires_at ? session.expires_at * 1e3 : 0;
  if (expiresAt && expiresAt - Date.now() < 6e4) {
    const {
      data: refreshed,
      error: refreshError
    } = await withTimeout(supabase.auth.refreshSession());
    if (refreshError || !refreshed.session) throw new Error("Session refresh failed");
  }
  const {
    data,
    error
  } = await withTimeout(supabase.auth.getUser());
  if (error || !data.user) throw new Error("Invalid session");
  return data.user;
}
const getMe = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("2bba25d786b63121276e4c1bb70a1792bf0409c8bb9bbe2550c522e10500892a"));
const $$splitComponentImporter$3 = () => import("../_authenticated-DJDQrBot.mjs");
const Route$3 = createFileRoute("/_authenticated")({
  beforeLoad: async ({
    location
  }) => {
    if (typeof window === "undefined") return;
    try {
      await ensureAuthenticatedUser();
      return;
    } catch {
      await clearLocalSession();
    }
    throw redirect({
      to: "/login",
      search: {
        redirect: location.href
      }
    });
  },
  loader: async () => {
    if (typeof window === "undefined") return null;
    return withTimeout(getMe()).catch(() => null);
  },
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-CoPhkIhr.mjs");
const Route$2 = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [{
      title: "Royal Transports — Inteligencia Operativa Centralizada"
    }, {
      name: "description",
      content: "Hub de operaciones Royal Transports: suite de aplicaciones para flota, compras, operadores y mantenimiento con IA."
    }, {
      property: "og:title",
      content: "Royal Transports — Operations Hub"
    }, {
      property: "og:description",
      content: "Inteligencia Operativa Centralizada para flota, compras, operadores y mantenimiento."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin-DAuGXyh7.mjs");
const Route$1 = createFileRoute("/_authenticated/admin")({
  beforeLoad: async () => {
    const me = await getMe();
    if (!me.isAdmin) {
      throw redirect({
        to: "/"
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  head: () => ({
    meta: [{
      title: "Administración — Royal Transports Hub"
    }]
  })
});
const apps = [
  {
    id: "procure",
    name: "Procure to Pay (P2P)",
    shortName: "P2P",
    category: "P2P",
    Icon: ShoppingCart,
    description: "Módulo Procure to Pay para comprobación de facturas, solicitudes de vales, control de folios y presupuestos. Incluye IA para validación y portal de proveedores para carga de facturas.",
    url: "https://smart-procure-ui.lovable.app"
  },
  {
    id: "fleet",
    name: "Gemelos Digitales — Vehículo",
    shortName: "Flota",
    category: "FLOTA",
    Icon: Truck,
    description: "Gemelo digital 3D de tractocamiones integrado con Samsara. IA predictiva con códigos de falla y muestras de aceite. Clasifica unidades por riesgo y tiempo estimado de falla.",
    url: "https://gemelos-digitales.lovable.app"
  },
  {
    id: "operator",
    name: "Digital Operator Heart",
    shortName: "Operadores",
    category: "OPERADORES",
    Icon: Heart,
    description: "Gemelo digital del operador con indicadores operativos, médicos y familiares. IA predictiva para garantizar bienestar y retención del operador a largo plazo.",
    url: "https://digital-operator-heart.lovable.app"
  },
  {
    id: "maintenance",
    name: "Dashboard Órdenes de Trabajo",
    shortName: "Mantenimiento",
    category: "MANTENIMIENTO",
    Icon: Wrench,
    description: "Control de gasto en refacciones por área, programación de mantenimientos, resúmenes por mes/día, costos totales y alertas por registros incorrectos.",
    url: "https://mtto.royal-transports.com/",
    embedRisk: true
  },
  {
    id: "safety",
    name: "Indicadores de Seguridad",
    shortName: "Seguridad",
    category: "SEGURIDAD",
    Icon: ShieldCheck,
    description: "Análisis y clasificación de eventos de seguridad enviados por Samsara (somnolencia, uso de celular, sin cinturón, etc.) con indicadores por operador.",
    url: "https://indicadores-seguridad.lovable.app"
  },
  {
    id: "pemex",
    name: "Tablero PEMEX — Monitoreo de Embarques",
    shortName: "PEMEX",
    category: "CLIENTES",
    Icon: MapPin,
    description: "Plataforma dedicada al cliente PEMEX para monitoreo en tiempo real de embarques: ubicación, tiempos de carga y descarga, y estatus operativo.",
    url: "https://tablerovjs.lovable.app"
  },
  {
    id: "CDMV",
    name: "Control Digital de Mantenimiento Vehicular",
    shortName: "CDMV",
    category: "MANTENIMIENTO",
    Icon: ClipboardList,
    description: "Sistema de control digital para mantenimiento vehicular",
    url: "https://c-d-m-v.lovable.app",
    embedRisk: true
  },
  {
    id: "Gantt",
    name: "Planificación Gantt",
    shortName: "Gantt",
    category: "PROYECTOS",
    Icon: CalendarDays,
    description: "Sistema de planificación Gantt para gestión de proyectos. Visualización de tareas, dependencias y cronogramas",
    url: "https://royal-gantt-planner.vercel.app",
    embedRisk: true
  },
  {
    id: "temperature",
    name: "Monitor de Temperatura",
    shortName: "Temperatura",
    category: "CADENA DE FRÍO",
    Icon: Thermometer,
    description: "Monitoreo en tiempo real de la temperatura de la cadena de frío, alertas de sensores, bitácoras de temperatura y estatus operativo.",
    url: "https://monitor-temperatura.royal-transports.com",
    embedRisk: true
  },
  {
    id: "termos",
    name: "Termos — Cajas Refrigeradas",
    shortName: "Termos",
    category: "CADENA DE FRÍO",
    Icon: Snowflake,
    description: "Monitoreo de temperaturas de cajas refrigeradas (Termos). Alertas por desviaciones, históricos por unidad y reportes de cumplimiento.",
    url: "https://cajas-refrigeradas.royal-transports.com",
    embedRisk: true
  }
];
function getApp(id) {
  return apps.find((a) => a.id === id);
}
const $$splitNotFoundComponentImporter = () => import("./apps._appId-OFVtuC0a.mjs");
const $$splitComponentImporter = () => import("./apps._appId-BOC11yEg.mjs");
const Route = createFileRoute("/_authenticated/apps/$appId")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  loader: ({
    params
  }) => {
    const app = getApp(params.appId);
    if (!app) throw notFound();
    return {
      app
    };
  },
  head: ({
    loaderData
  }) => ({
    meta: loaderData ? [{
      title: `${loaderData.app.name} — Royal Transports Hub`
    }] : [{
      title: "Royal Transports Hub"
    }]
  })
});
const LoginRoute = Route$4.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$5
});
const AuthenticatedRoute = Route$3.update({
  id: "/_authenticated",
  getParentRoute: () => Route$5
});
const AuthenticatedIndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedAdminRoute = Route$1.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedAppsAppIdRoute = Route.update({
  id: "/apps/$appId",
  path: "/apps/$appId",
  getParentRoute: () => AuthenticatedRoute
});
const AuthenticatedRouteChildren = {
  AuthenticatedAdminRoute,
  AuthenticatedIndexRoute,
  AuthenticatedAppsAppIdRoute
};
const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren
);
const rootRouteChildren = {
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  LoginRoute
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$3 as R,
  apps as a,
  getApp as b,
  clearLocalSession as c,
  Route as d,
  ensureAuthenticatedUser as e,
  getMe as g,
  router as r,
  withTimeout as w
};
