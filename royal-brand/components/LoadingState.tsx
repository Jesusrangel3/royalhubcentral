type Props = { label?: string };

/**
 * Spinner gold consistente con el hub. Úsalo en estados de carga full-screen
 * o secciones grandes para que el "tono visual" sea el mismo entre apps.
 */
export function LoadingState({ label = "Cargando…" }: Props) {
  return (
    <div className="flex h-full min-h-[280px] w-full flex-col items-center justify-center gap-4 bg-[var(--background)]">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[oklch(0.78_0.13_88/0.2)] border-t-[var(--gold)]" />
      <p className="text-xs uppercase tracking-[0.25em] text-[oklch(0.78_0.13_88/0.7)]">
        {label}
      </p>
    </div>
  );
}