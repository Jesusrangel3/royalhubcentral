import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, e as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-CA6elKR7.mjs";
import { I as Input, B as Button } from "./button-EGqxp0nL.mjs";
import { L as Label } from "./label-DyEaU-Ce.mjs";
import { L as LogIn } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
function LoginPage() {
  const navigate = useNavigate();
  const redirectTo = useRouterState({
    select: (state) => {
      const value = state.location.search.redirect;
      return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : "/";
    }
  });
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const {
      error: error2
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setLoading(false);
    if (error2) {
      setError(error2.message);
      return;
    }
    navigate({
      to: redirectTo
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex min-h-screen items-center justify-center bg-gradient-hero px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center leading-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold tracking-[0.3em] text-foreground", children: "ROYAL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tracking-[0.45em] text-gold", children: "TRANSPORTS" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground", children: "Operations Hub" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-5 rounded-2xl border border-gold/20 bg-card/80 p-8 shadow-gold backdrop-blur-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "text-xs uppercase tracking-[0.2em] text-gold", children: "Correo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", autoComplete: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "bg-background/60 border-gold/20" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "text-xs uppercase tracking-[0.2em] text-gold", children: "Contraseña" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", autoComplete: "current-password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "bg-background/60 border-gold/20" })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: loading, className: "w-full bg-gradient-gold text-primary-foreground shadow-gold hover:opacity-90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "mr-2 h-4 w-4" }),
        loading ? "Entrando…" : "Iniciar sesión"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-2 text-center text-[11px] tracking-wider text-muted-foreground", children: "¿Sin cuenta? Contacta al administrador." })
    ] })
  ] }) });
}
export {
  LoginPage as component
};
