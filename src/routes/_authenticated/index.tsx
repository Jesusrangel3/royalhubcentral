import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ExternalLink,
  Truck,
  FileText,
  Users,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { apps, getApp, type AppMeta, type AppId } from "@/lib/apps";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getHubStats, type AppStats } from "@/lib/hub-mock-stats";
import { useAuthenticatedMe } from "@/lib/authenticated-me";

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [
      { title: "Royal Transports — Inteligencia Operativa Centralizada" },
      {
        name: "description",
        content:
          "Hub de operaciones Royal Transports: suite de aplicaciones para flota, compras, operadores y mantenimiento con IA.",
      },
      { property: "og:title", content: "Royal Transports — Operations Hub" },
      {
        property: "og:description",
        content:
          "Inteligencia Operativa Centralizada para flota, compras, operadores y mantenimiento.",
      },
    ],
  }),
  component: Index,
});

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 100;
  const h = 28;
  const step = w / (values.length - 1);
  const points = values
    .map((v, i) => `${(i * step).toFixed(1)},${(h - ((v - min) / range) * h).toFixed(1)}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-7 w-full" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.4"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function KpiCard({
  Icon,
  label,
  value,
  accent,
}: {
  Icon: LucideIcon;
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-[0.25em] text-muted-foreground">
          {label.toUpperCase()}
        </span>
        <Icon className={`h-4 w-4 ${accent ? "text-destructive" : "text-gold"}`} />
      </div>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
        <span className="rounded-full border border-gold/30 bg-gold/5 px-2 py-0.5 text-[9px] font-semibold tracking-[0.2em] text-gold">
          DEMO
        </span>
      </div>
    </motion.div>
  );
}

function LiveAppCard({ app, stats, idx }: { app: AppMeta; stats?: AppStats; idx: number }) {
  const { Icon } = app;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      className="hover-lift group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
    >
      <Link
        to="/apps/$appId"
        params={{ appId: app.id }}
        aria-label={`Abrir ${app.name} dentro del hub`}
        className="absolute inset-0 z-10 rounded-2xl"
      />
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-gold shadow-gold">
          <Icon className="h-5 w-5 text-primary-foreground" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[9px] font-semibold tracking-[0.2em] text-gold">
              {app.category}
            </span>
            <span className="rounded-full border border-border px-2 py-0.5 text-[9px] font-semibold tracking-[0.2em] text-muted-foreground">
              {stats?.live ? "LIVE" : "DEMO"}
            </span>
          </div>
          <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground">
            {app.name}
          </h3>
        </div>
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir en pestaña nueva"
          className="relative z-20 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gold/70 hover:bg-gold/10 hover:text-gold"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {(stats?.metrics ?? []).map((m) => (
          <div key={m.label} className="rounded-lg border border-border bg-background/40 p-2">
            <p className="truncate text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
              {m.label}
            </p>
            <p className="mt-0.5 text-lg font-bold text-foreground">{m.value}</p>
            <Sparkline values={m.trend} />
          </div>
        ))}
      </div>

      <div className="mt-1 flex items-center justify-between pt-1">
        <Link
          to="/apps/$appId"
          params={{ appId: app.id }}
          className="relative z-20 inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform group-hover:translate-x-0.5"
        >
          Abrir aquí
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}

function getFriendlyName(profile: { email: string; full_name: string | null } | null) {
  const fullName = profile?.full_name?.trim();
  if (fullName && !fullName.includes("@")) return fullName.split(/\s+/)[0];
  const localPart = profile?.email
    ?.split("@")[0]
    ?.replace(/[._-]+/g, " ")
    .trim();
  return localPart?.split(/\s+/)[0] || "operador";
}

function ActivityFeed({
  items,
}: {
  items: { id: string; time: string; app: AppId; text: string }[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <p className="text-xs font-semibold tracking-[0.25em] text-gold">ACTIVIDAD RECIENTE</p>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
          <span className="text-[10px] tracking-[0.2em] text-muted-foreground">EN VIVO</span>
        </div>
      </div>
      <ul className="divide-y divide-border">
        {items.map((it) => {
          const a = getApp(it.app);
          const Icon = a?.Icon;
          return (
            <li key={it.id} className="flex items-center gap-3 px-5 py-3 text-sm">
              {Icon && (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gold/20 bg-gold/5">
                  <Icon className="h-3.5 w-3.5 text-gold" />
                </span>
              )}
              <span className="min-w-0 flex-1 truncate text-foreground/90">{it.text}</span>
              <span className="shrink-0 text-[10px] tracking-wide text-muted-foreground">
                {it.time}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Index() {
  const me = useAuthenticatedMe();
  const visibleApps = apps.filter((a) => me.isAdmin || me.apps.includes(a.id));
  const firstName = getFriendlyName(me.profile);

  const { data } = useQuery({
    queryKey: ["hub-stats"],
    queryFn: getHubStats,
    refetchInterval: 30_000,
    staleTime: 15_000,
  });

  // Compute only on client to avoid SSR/CSR hydration mismatch (blank screen).
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () =>
      setNow(new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="relative z-20 border-b border-gold/15 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-gold hover:bg-gold/10" />
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-[0.25em] text-foreground">ROYAL</span>
              <span className="text-[9px] tracking-[0.4em] text-gold">TRANSPORTS</span>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Operations Hub ·{" "}
              {now ? (
                <span>{now}</span>
              ) : (
                <span
                  aria-hidden
                  className="inline-block h-3 w-10 animate-pulse rounded bg-gold/15"
                />
              )}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-[0.3em] text-gold">CONTROL CENTER</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Hola, <span className="text-gold capitalize">{firstName}</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Vista en vivo de la operación. Las métricas se actualizan automáticamente.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <KpiCard
            Icon={Truck}
            label="Embarques activos"
            value={data?.globals.activeShipments ?? "—"}
          />
          <KpiCard
            Icon={FileText}
            label="Facturas en revisión"
            value={data?.globals.pendingPOs ?? "—"}
          />
          <KpiCard
            Icon={Users}
            label="Operadores en ruta"
            value={data?.globals.operatorsOnRoute ?? "—"}
          />
          <KpiCard
            Icon={AlertTriangle}
            label="Alertas críticas"
            value={data?.globals.criticalAlerts ?? "—"}
            accent
          />
        </div>

        <div className="mt-10 mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-gold">SUITE</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">Aplicaciones</h2>
          </div>
          <div className="hidden h-px flex-1 ml-8 bg-gradient-to-r from-gold/30 to-transparent sm:block" />
        </div>

        {visibleApps.length === 0 ? (
          <div className="rounded-2xl border border-gold/20 bg-card/60 p-10 text-center">
            <p className="text-sm text-muted-foreground">
              Aún no tienes apps asignadas. Contacta al administrador para obtener acceso.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {visibleApps.map((app, i) => (
              <LiveAppCard key={app.id} app={app} stats={data?.apps[app.id]} idx={i} />
            ))}
          </div>
        )}

        <div className="mt-10">
          <ActivityFeed items={data?.activity ?? []} />
        </div>

        <p className="mt-8 text-center text-[10px] tracking-[0.25em] text-gold/50">
          DEMO — DATOS SIMULADOS · CONECTAR ENDPOINTS REALES PARA MODO LIVE
        </p>
      </div>

      <footer className="border-t border-gold/15 mt-6">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center">
          <p className="text-xs tracking-wider text-gold/60">
            © 2026 Royal Transports · Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}
