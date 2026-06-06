import { r as reactExports } from "../_libs/react.mjs";
const AuthenticatedMeContext = reactExports.createContext(null);
function useAuthenticatedMe() {
  const me = reactExports.useContext(AuthenticatedMeContext);
  if (!me) throw new Error("Authenticated user data is not ready");
  return me;
}
export {
  AuthenticatedMeContext as A,
  useAuthenticatedMe as u
};
