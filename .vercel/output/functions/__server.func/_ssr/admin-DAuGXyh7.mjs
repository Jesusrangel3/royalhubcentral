import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { m as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button, I as Input, c as cn } from "./button-EGqxp0nL.mjs";
import { L as Label } from "./label-DyEaU-Ce.mjs";
import { C as Checkbox$1, a as CheckboxIndicator } from "../_libs/radix-ui__react-checkbox.mjs";
import { R as Root, T as Trigger, P as Portal, C as Content, a as Close, b as Title, O as Overlay, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { a as apps } from "./router-rPd2MqTm.mjs";
import { c as createSsrRpc } from "./createSsrRpc-PAWZTc54.mjs";
import { c as createServerFn } from "./server--rfMlOVn.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-oFiai5iF.mjs";
import { u as useAuthenticatedMe } from "./authenticated-me-CD8rrpos.mjs";
import "../_libs/seroval.mjs";
import "../_libs/jsonwebtoken.mjs";
import { P as Plus, i as LoaderCircle, j as Trash2, k as Save, K as KeyRound, X, l as Check } from "../_libs/lucide-react.mjs";
import { o as objectType, a as arrayType, e as enumType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
const Checkbox = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Checkbox$1,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxIndicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = Checkbox$1.displayName;
const Dialog = Root;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const APP_IDS = ["procure", "fleet", "operator", "maintenance", "safety", "pemex", "CDMV", "Gantt", "temperature", "termos"];
const HubAppEnum = enumType(APP_IDS);
const listUsersAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("64d5680bf5a0cdd01d8f20fe9b3478a204ba05a8209a6c2c2d02962ee7fc9621"));
const createUserAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  email: stringType().email(),
  password: stringType().min(8).max(72),
  fullName: stringType().min(1).max(120),
  role: enumType(["admin", "user"]),
  apps: arrayType(HubAppEnum)
}).parse(d)).handler(createSsrRpc("facfe8148121e74f214ce643dc542cec4f1e17459f6b1d352ff31732f4f07a6b"));
const updateUserAccessAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  userId: stringType().uuid(),
  fullName: stringType().min(1).max(120),
  role: enumType(["admin", "user"]),
  apps: arrayType(HubAppEnum)
}).parse(d)).handler(createSsrRpc("8ace63069bb314033177ada2148a31813717585659b48577363937340c0bae75"));
const deleteUserAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  userId: stringType().uuid()
}).parse(d)).handler(createSsrRpc("0b12b7fbdad42f1cf7efa633d49729f42c2cc81a51440baa81c3dcf6297bb982"));
const resetPasswordAdmin = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  userId: stringType().uuid(),
  password: stringType().min(8).max(72)
}).parse(d)).handler(createSsrRpc("3ea0485092ad80cc90f99face6b9d323e19904fc8e35456cf9914684259de2a9"));
function getErrorMessage(error) {
  return error instanceof Error ? error.message : "Ocurrió un error inesperado";
}
function AdminPage() {
  const me = useAuthenticatedMe();
  const list = useServerFn(listUsersAdmin);
  const create = useServerFn(createUserAdmin);
  const update = useServerFn(updateUserAccessAdmin);
  const remove = useServerFn(deleteUserAdmin);
  const reset = useServerFn(resetPasswordAdmin);
  const [users, setUsers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [openCreate, setOpenCreate] = reactExports.useState(false);
  const refresh = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      setUsers(await list());
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [list]);
  reactExports.useEffect(() => {
    refresh();
  }, [refresh]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-6xl px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold tracking-[0.3em] text-gold", children: "ADMIN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-3xl font-bold tracking-tight text-foreground", children: "Gestión de usuarios" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Crea cuentas, asigna roles y elige a qué apps tiene acceso cada usuario." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: openCreate, onOpenChange: setOpenCreate, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-gradient-gold text-primary-foreground shadow-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Nuevo usuario"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CreateUserDialog, { onCreated: () => {
          setOpenCreate(false);
          refresh();
        }, createFn: create })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-16 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-5 w-5 animate-spin" }),
      " Cargando…"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: users.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(UserCard, { user: u, isSelf: u.id === me.profile?.id, onSave: async (fullName, role, appsSel) => {
      try {
        await update({
          data: {
            userId: u.id,
            fullName,
            role,
            apps: appsSel
          }
        });
        toast.success("Cambios guardados");
        refresh();
      } catch (e) {
        toast.error(getErrorMessage(e));
      }
    }, onReset: async (pw) => {
      try {
        await reset({
          data: {
            userId: u.id,
            password: pw
          }
        });
        toast.success("Contraseña actualizada");
      } catch (e) {
        toast.error(getErrorMessage(e));
      }
    }, onDelete: async () => {
      if (!confirm(`¿Eliminar a ${u.email}?`)) return;
      try {
        await remove({
          data: {
            userId: u.id
          }
        });
        toast.success("Usuario eliminado");
        refresh();
      } catch (e) {
        toast.error(getErrorMessage(e));
      }
    } }, u.id)) })
  ] });
}
function CreateUserDialog({
  createFn,
  onCreated
}) {
  const [email, setEmail] = reactExports.useState("");
  const [fullName, setFullName] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("user");
  const [appsSel, setAppsSel] = reactExports.useState([]);
  const [busy, setBusy] = reactExports.useState(false);
  function toggle(id) {
    setAppsSel((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  }
  async function submit() {
    setBusy(true);
    try {
      await createFn({
        data: {
          email,
          fullName,
          password,
          role,
          apps: appsSel
        }
      });
      toast.success("Usuario creado");
      onCreated();
      setEmail("");
      setFullName("");
      setPassword("");
      setRole("user");
      setAppsSel([]);
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Crear usuario" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nombre completo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: fullName, onChange: (e) => setFullName(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Contraseña inicial (mín 8)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "text", value: password, onChange: (e) => setPassword(e.target.value) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "El usuario podrá cambiarla después." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Rol" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["user", "admin"].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setRole(r), className: `rounded-md border px-3 py-1.5 text-sm ${role === r ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground"}`, children: r === "admin" ? "Admin" : "Usuario" }, r)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Apps a las que tiene acceso" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: apps.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 rounded-md border border-border p-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: appsSel.includes(a.id), onCheckedChange: () => toggle(a.id) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: a.shortName })
        ] }, a.id)) }),
        role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-gold/80", children: "Los admin ven todas las apps automáticamente." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: submit, disabled: busy || !email || !password || !fullName, className: "bg-gradient-gold text-primary-foreground shadow-gold", children: [
      busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
      "Crear"
    ] }) })
  ] });
}
function UserCard({
  user,
  isSelf,
  onSave,
  onReset,
  onDelete
}) {
  const initialRole = user.roles.includes("admin") ? "admin" : "user";
  const [fullName, setFullName] = reactExports.useState(user.full_name ?? "");
  const [role, setRole] = reactExports.useState(initialRole);
  const [appsSel, setAppsSel] = reactExports.useState(user.apps);
  const [pw, setPw] = reactExports.useState("");
  const [showReset, setShowReset] = reactExports.useState(false);
  function toggle(id) {
    setAppsSel((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: user.full_name ?? user.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: user.email })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.2em] ${role === "admin" ? "border border-gold bg-gold/10 text-gold" : "border border-border text-muted-foreground"}`, children: role === "admin" ? "ADMIN" : "USUARIO" }),
        !isSelf && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: onDelete, className: "text-destructive hover:bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-[0.2em] text-gold", children: "Nombre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: fullName, onChange: (e) => setFullName(e.target.value), placeholder: "Nombre completo", className: "mt-1 bg-background/60" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-[0.2em] text-gold", children: "Rol" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex gap-2", children: ["user", "admin"].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setRole(r), className: `rounded-md border px-3 py-1 text-xs ${role === r ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground"}`, children: r === "admin" ? "Admin" : "Usuario" }, r)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-[0.2em] text-gold", children: "Acceso a apps" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 grid grid-cols-2 gap-2 md:grid-cols-3", children: apps.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 rounded-md border border-border p-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: role === "admin" || appsSel.includes(a.id), disabled: role === "admin", onCheckedChange: () => toggle(a.id) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: a.shortName })
        ] }, a.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", disabled: !fullName.trim(), onClick: () => onSave(fullName.trim(), role, appsSel), className: "bg-gradient-gold text-primary-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
          " Guardar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => setShowReset((v) => !v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "mr-2 h-4 w-4" }),
          " Cambiar contraseña"
        ] })
      ] }),
      showReset && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: pw, onChange: (e) => setPw(e.target.value), placeholder: "Nueva contraseña (mín 8)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", disabled: pw.length < 8, onClick: async () => {
          await onReset(pw);
          setPw("");
          setShowReset(false);
        }, children: "Aplicar" })
      ] })
    ] })
  ] });
}
export {
  AdminPage as component
};
