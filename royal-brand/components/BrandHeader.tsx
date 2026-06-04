import { apps, type AppId } from "../lib/apps";

type Props = {
  app: AppId;
  /** Ruta al logo Royal Transports importado en la app consumidora. */
  logoSrc?: string;
  /** Acciones opcionales a la derecha (botones, avatar, etc.) */
  actions?: React.ReactNode;
  /** Si true, embebido dentro del hub: oculta el logo (ya está en sidebar). */
  embedded?: boolean;
};

/**
 * Header de marca compartido. Coloca este componente al inicio del layout raíz
 * de cada app del ecosistema Royal Transports.
 */
export function BrandHeader({ app, logoSrc, actions, embedded }: Props) {
  const meta = apps[app];
  const Icon = meta.Icon;

  return (
    <header className="sticky top-0 z-40 border-b border-[oklch(0.78_0.13_88/0.15)] bg-[var(--navy-deep)]/85 backdrop-blur supports-[backdrop-filter]:bg-[var(--navy-deep)]/70">
      <div className="mx-auto flex h-14 w-full items-center gap-4 px-5">
        {!embedded && logoSrc && (
          <a href="/" className="flex items-center gap-2.5">
            <img src={logoSrc} alt="Royal Transports" className="h-8 w-auto" />
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--gold)] sm:inline">
              Royal Transports
            </span>
          </a>
        )}
        {!embedded && logoSrc && (
          <div className="h-6 w-px bg-[oklch(0.78_0.13_88/0.2)]" />
        )}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--gradient-gold)] shadow-[var(--shadow-gold)]">
            <Icon className="h-4 w-4 text-[var(--navy-deep)]" strokeWidth={2.4} />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
              {meta.category}
            </div>
            <div className="truncate text-sm font-semibold text-[var(--foreground)]">
              {meta.name}
            </div>
          </div>
        </div>
        {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}