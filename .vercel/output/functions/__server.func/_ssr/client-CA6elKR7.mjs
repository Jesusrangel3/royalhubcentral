import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
const callbacks = /* @__PURE__ */ new Set();
function createSupabaseClient() {
  const SUPABASE_URL = "https://jnfwigxbzzycvcmjfcfh.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuZndpZ3hienp5Y3ZjbWpmY2ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDYyOTAsImV4cCI6MjA5NDM4MjI5MH0.BmyHx3DBTCeTyZf9MB77qVKXvsCqtELHwhJ0j-OdUe8";
  const client = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
  if (typeof window !== "undefined") {
    const originalGetSession = client.auth.getSession.bind(client.auth);
    client.auth.getSession = async () => {
      if (localStorage.getItem("mock_session") === "true") {
        const mockEmail = localStorage.getItem("mock_email") || "mario.alcocer1997@gmail.com";
        const mockName = localStorage.getItem("mock_name") || "Mario Alcocer (Mock Admin)";
        const mockToken = localStorage.getItem("mock_token") || "mock-admin-token";
        const mockUserId = localStorage.getItem("mock_user_id") || "mock-admin-id";
        return {
          data: {
            session: {
              access_token: mockToken,
              expires_at: Math.floor(Date.now() / 1e3) + 24 * 3600,
              user: {
                id: mockUserId,
                email: mockEmail,
                user_metadata: { full_name: mockName }
              }
            }
          },
          error: null
        };
      }
      return originalGetSession();
    };
    const originalGetUser = client.auth.getUser.bind(client.auth);
    client.auth.getUser = async (jwt) => {
      const mockToken = localStorage.getItem("mock_token") || "mock-admin-token";
      if (localStorage.getItem("mock_session") === "true" || jwt === mockToken || jwt === "mock-admin-token") {
        const mockEmail = localStorage.getItem("mock_email") || "mario.alcocer1997@gmail.com";
        const mockName = localStorage.getItem("mock_name") || "Mario Alcocer (Mock Admin)";
        const mockUserId = localStorage.getItem("mock_user_id") || "mock-admin-id";
        return {
          data: {
            user: {
              id: mockUserId,
              email: mockEmail,
              user_metadata: { full_name: mockName }
            }
          },
          error: null
        };
      }
      return originalGetUser(jwt);
    };
    client.auth.signInWithPassword = async (credentials) => {
      try {
        const { loginServerFn } = await import("./auth.functions-ChSnkC27.mjs");
        const res = await loginServerFn({
          data: {
            email: credentials.email,
            password: credentials.password
          }
        });
        if (!res || !res.session) {
          throw new Error("No session returned from server");
        }
        const { access_token, user } = res.session;
        localStorage.setItem("mock_session", "true");
        localStorage.setItem("mock_token", access_token);
        localStorage.setItem("mock_email", user.email);
        localStorage.setItem("mock_name", user.user_metadata.full_name);
        localStorage.setItem("mock_user_id", user.id);
        setTimeout(() => {
          for (const cb of callbacks) {
            cb("SIGNED_IN", res.session);
          }
        }, 0);
        return {
          data: {
            user,
            session: res.session
          },
          error: null
        };
      } catch (err) {
        console.error("❌ Login error:", err.message);
        return {
          data: { user: null, session: null },
          error: { message: err.message || "Credenciales inválidas" }
        };
      }
    };
    const originalSignOut = client.auth.signOut.bind(client.auth);
    client.auth.signOut = async (options) => {
      if (localStorage.getItem("mock_session") === "true") {
        localStorage.removeItem("mock_session");
        localStorage.removeItem("mock_token");
        localStorage.removeItem("mock_email");
        localStorage.removeItem("mock_name");
        localStorage.removeItem("mock_user_id");
        setTimeout(() => {
          for (const cb of callbacks) {
            cb("SIGNED_OUT", null);
          }
        }, 0);
        return { error: null };
      }
      return originalSignOut(options);
    };
    const originalOnAuthStateChange = client.auth.onAuthStateChange.bind(client.auth);
    client.auth.onAuthStateChange = (callback) => {
      callbacks.add(callback);
      const sub = originalOnAuthStateChange(callback);
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              callbacks.delete(callback);
              sub.data.subscription.unsubscribe();
            }
          }
        }
      };
    };
  }
  return client;
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
export {
  supabase as s
};
