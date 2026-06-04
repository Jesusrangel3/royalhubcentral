import { createFileRoute, redirect } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Trash2, KeyRound, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { apps, type AppId } from "@/lib/apps";
import {
  listUsersAdmin,
  createUserAdmin,
  updateUserAccessAdmin,
  deleteUserAdmin,
  resetPasswordAdmin,
} from "@/lib/admin.functions";
import { getMe } from "@/lib/me.functions";
import { useAuthenticatedMe } from "@/lib/authenticated-me";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async () => {
    // Validate admin BEFORE rendering. Throwing redirect during render
    // re-runs the parent loader mid-token-refresh and can bounce the
    // user to /login. Doing it here is safe and immediate.
    const me = await getMe();
    if (!me.isAdmin) {
      throw redirect({ to: "/" });
    }
  },
  component: AdminPage,
  head: () => ({ meta: [{ title: "Administración — Royal Transports Hub" }] }),
});

type UserRow = Awaited<ReturnType<typeof listUsersAdmin>>[number];

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Ocurrió un error inesperado";
}

function AdminPage() {
  const me = useAuthenticatedMe();

  const list = useServerFn(listUsersAdmin);
  const create = useServerFn(createUserAdmin);
  const update = useServerFn(updateUserAccessAdmin);
  const remove = useServerFn(deleteUserAdmin);
  const reset = useServerFn(resetPasswordAdmin);

  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setUsers(await list());
    } catch (e: unknown) {
      toast.error(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [list]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-gold">ADMIN</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Gestión de usuarios
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Crea cuentas, asigna roles y elige a qué apps tiene acceso cada usuario.
          </p>
        </div>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-gold text-primary-foreground shadow-gold">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo usuario
            </Button>
          </DialogTrigger>
          <CreateUserDialog
            onCreated={() => {
              setOpenCreate(false);
              refresh();
            }}
            createFn={create}
          />
        </Dialog>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Cargando…
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((u) => (
            <UserCard
              key={u.id}
              user={u}
              isSelf={u.id === me.profile?.id}
              onSave={async (fullName, role, appsSel) => {
                try {
                  await update({ data: { userId: u.id, fullName, role, apps: appsSel } });
                  toast.success("Cambios guardados");
                  refresh();
                } catch (e: unknown) {
                  toast.error(getErrorMessage(e));
                }
              }}
              onReset={async (pw) => {
                try {
                  await reset({ data: { userId: u.id, password: pw } });
                  toast.success("Contraseña actualizada");
                } catch (e: unknown) {
                  toast.error(getErrorMessage(e));
                }
              }}
              onDelete={async () => {
                if (!confirm(`¿Eliminar a ${u.email}?`)) return;
                try {
                  await remove({ data: { userId: u.id } });
                  toast.success("Usuario eliminado");
                  refresh();
                } catch (e: unknown) {
                  toast.error(getErrorMessage(e));
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CreateUserDialog({
  createFn,
  onCreated,
}: {
  createFn: ReturnType<typeof useServerFn<typeof createUserAdmin>>;
  onCreated: () => void;
}) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "user">("user");
  const [appsSel, setAppsSel] = useState<AppId[]>([]);
  const [busy, setBusy] = useState(false);

  function toggle(id: AppId) {
    setAppsSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  async function submit() {
    setBusy(true);
    try {
      await createFn({ data: { email, fullName, password, role, apps: appsSel } });
      toast.success("Usuario creado");
      onCreated();
      setEmail("");
      setFullName("");
      setPassword("");
      setRole("user");
      setAppsSel([]);
    } catch (e: unknown) {
      toast.error(getErrorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle>Crear usuario</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Nombre completo</Label>
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Contraseña inicial (mín 8)</Label>
          <Input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
          <p className="text-[11px] text-muted-foreground">El usuario podrá cambiarla después.</p>
        </div>
        <div className="space-y-2">
          <Label>Rol</Label>
          <div className="flex gap-2">
            {(["user", "admin"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`rounded-md border px-3 py-1.5 text-sm ${role === r ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground"}`}
              >
                {r === "admin" ? "Admin" : "Usuario"}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Apps a las que tiene acceso</Label>
          <div className="grid grid-cols-2 gap-2">
            {apps.map((a) => (
              <label
                key={a.id}
                className="flex items-center gap-2 rounded-md border border-border p-2 text-sm"
              >
                <Checkbox checked={appsSel.includes(a.id)} onCheckedChange={() => toggle(a.id)} />
                <span>{a.shortName}</span>
              </label>
            ))}
          </div>
          {role === "admin" && (
            <p className="text-[11px] text-gold/80">
              Los admin ven todas las apps automáticamente.
            </p>
          )}
        </div>
      </div>
      <DialogFooter>
        <Button
          onClick={submit}
          disabled={busy || !email || !password || !fullName}
          className="bg-gradient-gold text-primary-foreground shadow-gold"
        >
          {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Crear
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function UserCard({
  user,
  isSelf,
  onSave,
  onReset,
  onDelete,
}: {
  user: UserRow;
  isSelf: boolean;
  onSave: (fullName: string, role: "admin" | "user", apps: AppId[]) => Promise<void>;
  onReset: (password: string) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const initialRole = user.roles.includes("admin") ? "admin" : "user";
  const [fullName, setFullName] = useState(user.full_name ?? "");
  const [role, setRole] = useState<"admin" | "user">(initialRole);
  const [appsSel, setAppsSel] = useState<AppId[]>(user.apps as AppId[]);
  const [pw, setPw] = useState("");
  const [showReset, setShowReset] = useState(false);

  function toggle(id: AppId) {
    setAppsSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-foreground">{user.full_name ?? user.email}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.2em] ${role === "admin" ? "border border-gold bg-gold/10 text-gold" : "border border-border text-muted-foreground"}`}
          >
            {role === "admin" ? "ADMIN" : "USUARIO"}
          </span>
          {!isSelf && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <Label className="text-[10px] uppercase tracking-[0.2em] text-gold">Nombre</Label>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nombre completo"
            className="mt-1 bg-background/60"
          />
        </div>
        <div>
          <Label className="text-[10px] uppercase tracking-[0.2em] text-gold">Rol</Label>
          <div className="mt-1 flex gap-2">
            {(["user", "admin"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`rounded-md border px-3 py-1 text-xs ${role === r ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground"}`}
              >
                {r === "admin" ? "Admin" : "Usuario"}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label className="text-[10px] uppercase tracking-[0.2em] text-gold">Acceso a apps</Label>
          <div className="mt-1 grid grid-cols-2 gap-2 md:grid-cols-3">
            {apps.map((a) => (
              <label
                key={a.id}
                className="flex items-center gap-2 rounded-md border border-border p-2 text-xs"
              >
                <Checkbox
                  checked={role === "admin" || appsSel.includes(a.id)}
                  disabled={role === "admin"}
                  onCheckedChange={() => toggle(a.id)}
                />
                <span>{a.shortName}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            disabled={!fullName.trim()}
            onClick={() => onSave(fullName.trim(), role, appsSel)}
            className="bg-gradient-gold text-primary-foreground"
          >
            <Save className="mr-2 h-4 w-4" /> Guardar
          </Button>
          <Button size="sm" variant="outline" onClick={() => setShowReset((v) => !v)}>
            <KeyRound className="mr-2 h-4 w-4" /> Cambiar contraseña
          </Button>
        </div>
        {showReset && (
          <div className="flex gap-2">
            <Input
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Nueva contraseña (mín 8)"
            />
            <Button
              size="sm"
              disabled={pw.length < 8}
              onClick={async () => {
                await onReset(pw);
                setPw("");
                setShowReset(false);
              }}
            >
              Aplicar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
