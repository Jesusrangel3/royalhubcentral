import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink, Maximize2, Minimize2, RefreshCw } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { EmbeddedApp } from "@/components/embedded-app";
import { getApp, type AppId } from "@/lib/apps";
import { useAuthenticatedMe } from "@/lib/authenticated-me";

export const Route = createFileRoute("/_authenticated/apps/$appId")({
  component: AppHost,
  notFoundComponent: () => (
    <div className="flex h-full items-center justify-center p-12 text-center">
      <div>
        <h1 className="text-2xl font-semibold">App no encontrada</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          La aplicación que buscas no existe en el hub.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-gradient-gold px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  ),
  loader: ({ params }) => {
    const app = getApp(params.appId);
    if (!app) throw notFound();
    return { app };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `${loaderData.app.name} — Royal Transports Hub` }]
      : [{ title: "Royal Transports Hub" }],
  }),
});

function AppHost() {
  const { appId } = Route.useParams();
  const app = getApp(appId as AppId)!;
  const me = useAuthenticatedMe();
  const allowed = me.isAdmin || me.apps.includes(app.id);
  const [reloadKey, setReloadKey] = useState(0);
  const { setOpen, open } = useSidebar();

  if (!allowed) {
    return (
      <div className="flex h-screen items-center justify-center p-12 text-center">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Sin acceso</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            No tienes permisos para ver esta aplicación. Contacta al administrador.
          </p>
          <Link to="/" className="mt-6 inline-flex rounded-lg bg-gradient-gold px-4 py-2 text-sm font-semibold text-primary-foreground">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center gap-3 border-b border-gold/15 bg-card/40 px-4 py-2.5 backdrop-blur">
        <SidebarTrigger className="text-gold hover:bg-gold/10" />
        <div className="flex min-w-0 items-center gap-3">
          <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.2em] text-gold">
            {app.category}
          </span>
          <h1 className="truncate text-sm font-semibold text-foreground">{app.name}</h1>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <IconButton
            label="Recargar"
            onClick={() => setReloadKey((k) => k + 1)}
          >
            <RefreshCw className="h-4 w-4" />
          </IconButton>
          <IconButton
            label={open ? "Pantalla completa" : "Mostrar barra lateral"}
            onClick={() => setOpen(!open)}
          >
            {open ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </IconButton>
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-gold/30 px-3 py-1.5 text-xs font-medium text-gold hover:bg-gold/10"
            aria-label="Abrir en pestaña nueva"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Abrir externo</span>
          </a>
        </div>
      </header>
      <div className="relative flex-1 overflow-hidden">
        <EmbeddedApp app={app} reloadKey={reloadKey} />
      </div>
    </div>
  );
}

function IconButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gold hover:bg-gold/10"
    >
      {children}
    </button>
  );
}