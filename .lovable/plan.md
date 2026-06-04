## Diagnóstico honesto

Lo que ya cambié (volver a `<Link>` + guard tolerante) resuelve la causa más probable: cada clic recargaba la página, re-inicializaba Supabase y, ante cualquier hipo del refresh token, te mandaba a `/login`. Pero al revisar el código en frío encuentro **3 huecos** que pueden seguir reproduciendo el problema:

1. **El guard `_authenticated` ahora deja pasar a cualquiera con un token en `localStorage`, aunque sea inválido.** Si `getMe()` devuelve 401, el `.catch(() => null)` deja `me = null` y se queda con el spinner *"Reconectando sesión…"* **para siempre**. Eso es peor que botar al login.
2. **No reaccionamos a `SIGNED_OUT` de Supabase.** Si el SDK detecta que el refresh token quedó inservible (caso del log: `refresh_token_not_found`), emite `SIGNED_OUT` pero nadie redirige al login → la app queda zombie.
3. **El log raro `refresh_token: "h7feodeo7vgy"` (12 chars)** indica que en algún momento el storage se quedó con basura. Necesitamos limpiar y forzar logout limpio cuando eso pase, no quedarnos en bucle.

Además hay ruido: `src/hooks/use-auth.tsx` no se usa pero suscribe otro listener — mejor borrarlo para no tener dudas.

## Plan

### 1. Guard `_authenticated.tsx` — endurecer
- En `beforeLoad`: usar `supabase.auth.getUser()` (que **valida** el token contra el servidor) en vez de solo `getSession()` (que solo lee storage). Si falla, hacer `signOut()` para limpiar storage corrupto y redirigir a `/login`.
- En el componente: si `me` queda `null` después de 2 reintentos, llamar `signOut()` y redirigir a `/login` en lugar del spinner infinito.

### 2. Reaccionar a `SIGNED_OUT`
- En `__root.tsx` (`AuthSync`): cuando el evento sea `SIGNED_OUT`, además de invalidar queries, navegar explícitamente a `/login`.
- En `_authenticated.tsx`: lo mismo, por redundancia.

### 3. Limpieza
- Borrar `src/hooks/use-auth.tsx` (código muerto, suscriptor extra).
- Confirmar que solo hay 2 listeners de `onAuthStateChange` activos: `__root.tsx` y `_authenticated.tsx`.

### 4. Verificación
- Probar 3 flujos manualmente con la consola/red abierta:
  a. Login → clic en sidebar → clic en una app → volver a Inicio. No debe salir del SPA en ningún clic.
  b. Forzar token vencido (borrar `sb-*-auth-token` en DevTools) y recargar. Debe ir limpio a `/login`, sin spinner infinito.
  c. Click rápido entre 3 módulos seguidos. No debe haber 401 ni redirects.

## Detalles técnicos clave

- `supabase.auth.getUser()` hace una llamada de red y revalida; `getSession()` solo lee storage local. Para el guard nos conviene el primero.
- `supabase.auth.signOut({ scope: 'local' })` limpia el storage sin pegarle al servidor (más rápido y resiliente cuando ya hay tokens basura).
- TanStack `redirect()` debe lanzarse (no llamarse) para que `beforeLoad` lo procese.

## Lo que NO voy a tocar

- `client.ts`, `auth-middleware.ts`, `auth-attacher.ts` (autogenerados).
- La estructura de rutas ni los componentes visuales.
- El esquema de la base ni RLS.
