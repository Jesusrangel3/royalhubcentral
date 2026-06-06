import { useEffect, useRef, useState } from "react";
import { ExternalLink, RefreshCw, ShieldAlert } from "lucide-react";
import type { AppMeta } from "@/lib/apps";

type Props = {
  app: AppMeta;
  reloadKey: number;
};

/** Lee las credenciales de sesión del localStorage y las devuelve si existen */
function getStoredCredentials(): { email: string; password: string } | null {
  try {
    const raw = localStorage.getItem("royal_hub_creds");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function EmbeddedApp({ app, reloadKey }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setLoaded(false);
    setBlocked(false);
  }, [app.id, reloadKey]);

  /** Cuando el iframe termina de cargar, enviamos las credenciales via postMessage
   *  para que el sub-sistema pueda hacer el login automático (SSO) */
  function handleIframeLoad() {
    setLoaded(true);
    const creds = getStoredCredentials();
    if (creds && iframeRef.current?.contentWindow) {
      // Esperamos 800ms para que el sub-sistema inicialice su app antes de enviar el mensaje
      setTimeout(() => {
        try {
          iframeRef.current?.contentWindow?.postMessage(
            {
              type: "ROYAL_HUB_SSO",
              email: creds.email,
              password: creds.password,
            },
            "*"
          );
        } catch {
          // Si falla el postMessage (cross-origin bloqueado), lo ignoramos silenciosamente
        }
      }, 800);
    }
  }

  if (blocked) {
    const Icon = app.Icon;
    return (
      <div className="flex h-full w-full items-center justify-center bg-background p-8">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-gold shadow-gold">
            <Icon className="h-8 w-8 text-primary-foreground" strokeWidth={2.2} />
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-medium text-gold">
            <ShieldAlert className="h-3.5 w-3.5" />
            EMBEBIDO BLOQUEADO
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">{app.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Esta aplicación no permite ser embebida dentro del hub por su política de seguridad.
            Puedes abrirla en una pestaña nueva sin perder tu sesión aquí.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Abrir en pestaña nueva
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              onClick={() => {
                setBlocked(false);
                setLoaded(false);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-gold/30 px-4 py-2.5 text-sm text-gold hover:bg-gold/10"
            >
              <RefreshCw className="h-4 w-4" />
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-background">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
          <p className="text-xs uppercase tracking-[0.25em] text-gold/70">
            Cargando {app.shortName}…
          </p>
        </div>
      )}
      <iframe
        ref={iframeRef}
        key={`${app.id}-${reloadKey}`}
        src={app.url}
        title={app.name}
        className="h-full w-full border-0"
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        allow="clipboard-read; clipboard-write; fullscreen; camera; microphone; geolocation"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads allow-modals allow-popups-to-escape-sandbox"
        onLoad={handleIframeLoad}
      />
    </div>
  );
}