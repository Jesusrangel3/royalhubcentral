import { createFileRoute, redirect, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/" });
  },
  component: LoginPage,
  head: () => ({ meta: [{ title: "Iniciar sesión — Royal Transports Hub" }] }),
});

function LoginPage() {
  const navigate = useNavigate();
  const redirectTo = useRouterState({
    select: (state) => {
      const value = (state.location.search as Record<string, unknown>).redirect;
      return typeof value === "string" && value.startsWith("/") && !value.startsWith("//")
        ? value
        : "/";
    },
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: redirectTo as "/" });
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-hero px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex flex-col items-center leading-none">
            <span className="text-2xl font-bold tracking-[0.3em] text-foreground">ROYAL</span>
            <span className="text-xs tracking-[0.45em] text-gold">TRANSPORTS</span>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Operations Hub
          </p>
        </div>
        <form
          onSubmit={onSubmit}
          className="space-y-5 rounded-2xl border border-gold/20 bg-card/80 p-8 shadow-gold backdrop-blur-md"
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-gold">
              Correo
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/60 border-gold/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs uppercase tracking-[0.2em] text-gold">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background/60 border-gold/20"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-gold text-primary-foreground shadow-gold hover:opacity-90"
          >
            <LogIn className="mr-2 h-4 w-4" />
            {loading ? "Entrando…" : "Iniciar sesión"}
          </Button>
          <p className="pt-2 text-center text-[11px] tracking-wider text-muted-foreground">
            ¿Sin cuenta? Contacta al administrador.
          </p>
        </form>
      </div>
    </div>
  );
}
