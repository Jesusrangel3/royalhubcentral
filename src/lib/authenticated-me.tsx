import { createContext, useContext } from "react";
import type { getMe } from "@/lib/me.functions";

export type AuthenticatedMe = Awaited<ReturnType<typeof getMe>>;

export const AuthenticatedMeContext = createContext<AuthenticatedMe | null>(null);

export function useAuthenticatedMe() {
  const me = useContext(AuthenticatedMeContext);
  if (!me) throw new Error("Authenticated user data is not ready");
  return me;
}