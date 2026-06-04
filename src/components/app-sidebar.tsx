import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, LogOut, Shield } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { apps, type AppId } from "@/lib/apps";
import { supabase } from "@/integrations/supabase/client";

type Me = {
  profile: { email: string; full_name: string | null } | null;
  isAdmin: boolean;
  apps: string[];
};

export function AppSidebar({ me }: { me: Me }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  const visibleApps = apps.filter((a) => me.isAdmin || me.apps.includes(a.id));

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-gold/15">
      <SidebarHeader className="border-b border-gold/15 p-3">
        <Link
          to="/"
          className="flex w-full items-center gap-2 rounded-lg border border-gold/20 bg-card/60 px-3 py-2 text-left"
        >
          {collapsed ? (
            <span className="text-sm font-bold tracking-[0.2em] text-gold">R</span>
          ) : (
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-[0.25em] text-foreground">ROYAL</span>
              <span className="text-[9px] tracking-[0.35em] text-gold">TRANSPORTS</span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gold/70">Hub</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"} tooltip="Inicio">
                    <Link to="/">
                    <LayoutDashboard className="h-4 w-4 text-gold" />
                    <span>Inicio</span>
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {me.isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === "/admin"}
                    tooltip="Administración"
                  >
                    <Link to="/admin">
                      <Shield className="h-4 w-4 text-gold" />
                      <span>Administración</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gold/70">Aplicaciones</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleApps.length === 0 && !collapsed && (
                <p className="px-2 py-1 text-[11px] text-muted-foreground">
                  Sin apps asignadas. Contacta al administrador.
                </p>
              )}
              {visibleApps.map((app) => {
                const active = pathname === `/apps/${app.id}`;
                const Icon = app.Icon;
                return (
                  <SidebarMenuItem key={app.id}>
                    <SidebarMenuButton asChild isActive={active} tooltip={app.name}>
                      <Link to="/apps/$appId" params={{ appId: app.id }}>
                        <Icon className="h-4 w-4 text-gold" />
                        <span className="truncate">{app.shortName}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gold/15 p-2">
        {!collapsed && me.profile && (
          <div className="px-2 pb-2">
            <p className="truncate text-xs font-medium text-foreground">
              {me.profile.full_name ?? me.profile.email}
            </p>
            <p className="truncate text-[10px] text-muted-foreground">{me.profile.email}</p>
          </div>
        )}
        <button
          onClick={signOut}
          className="flex items-center gap-2 rounded-md px-2 py-2 text-xs text-gold/80 hover:bg-gold/10 hover:text-gold"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
