# Royal Brand — Design system compartido

Paquete de branding para el ecosistema **Royal Transports** (Hub + 3 apps de Lovable).
Su objetivo es que las apps embebidas dentro del hub se vean como **secciones del mismo producto**: misma paleta navy + gold, misma tipografía Inter, mismos headers y footers, mismos estados de carga.

> Estrategia actual: **copia controlada** (Plan A). Los archivos viven aquí en el hub y se copian manualmente a cada app. Cuando el sistema madure, migramos a paquete npm `@royal/brand` (Plan C).

## Contenido

```
royal-brand/
├── tokens.css                 ← Variables :root navy/gold + utilidades (text-gold, bg-gradient-gold, hover-lift…)
├── fonts.css                  ← Inter via Google Fonts + reset tipográfico
├── lib/apps.ts                ← Metadata canónica de las 4 apps (id, nombre, categoría, url, icono)
└── components/
    ├── BrandHeader.tsx        ← Header navy con logo + badge categoría + nombre app
    ├── BrandFooter.tsx        ← Footer con copyright unificado
    └── LoadingState.tsx       ← Spinner gold consistente
```

## Aplicarlo en una app de Lovable (paso a paso)

Repite estos pasos en **Smart Procure**, **Royal Fleet Twin** y **Operator Twin Hub** (una a la vez, validando dentro del hub embebido).

### 1. Copiar archivos

Crea en la app destino la carpeta `src/brand/` con la misma estructura:

```
src/brand/
├── tokens.css
├── fonts.css
├── lib/apps.ts
└── components/{BrandHeader,BrandFooter,LoadingState}.tsx
```

Pega el contenido tal cual desde este `royal-brand/`.

### 2. Importar tokens y fuentes en el CSS raíz

En `src/styles.css` (o `src/index.css` si la app es Vite clásico), **al inicio del archivo**, antes de cualquier otra regla:

```css
@import "./brand/fonts.css";
@import "./brand/tokens.css";
```

Después, **borra el bloque `:root` antiguo** de la app (las variables de color que ya tenía). El bloque `:root` de `tokens.css` lo reemplaza completo.

> Si la app usa Tailwind v4 con `@theme inline`, déjalo tal cual — solo se sustituyen los valores que esas variables resuelven.
> Si la app usa modo `.dark` por defecto, asegúrate de que `<html>` o `<body>` **no** tenga la clase `.dark` (la marca Royal ya es oscura por diseño).

### 3. Agregar el logo

Coloca `royal-transports-logo.png` en `src/assets/` de la app (mismo archivo que usa el hub).

### 4. Envolver el layout raíz

En el componente raíz de la app (típicamente `App.tsx`, `__root.tsx` o `RootLayout`):

```tsx
import logo from "@/assets/royal-transports-logo.png";
import { BrandHeader } from "@/brand/components/BrandHeader";
import { BrandFooter } from "@/brand/components/BrandFooter";

export default function RootLayout({ children }) {
  // Detecta si está embebida en el hub (iframe). Oculta el logo cuando sí.
  const embedded = typeof window !== "undefined" && window.self !== window.top;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <BrandHeader app="procure" logoSrc={logo} embedded={embedded} />
      <main className="flex-1">{children}</main>
      <BrandFooter />
    </div>
  );
}
```

Cambia `app="procure"` por `"fleet"` o `"operator"` según la app.

### 5. Estados de carga

Donde la app muestre un spinner full-screen o una sección "cargando…", reemplaza por:

```tsx
import { LoadingState } from "@/brand/components/LoadingState";

<LoadingState label="Cargando órdenes…" />
```

### 6. Verificar componentes shadcn

Una vez aplicados los tokens, los componentes shadcn (Button, Card, Badge, Input…) **automáticamente** adoptan los nuevos colores porque consumen las variables `--primary`, `--card`, `--border`, etc.

Cosas a revisar:

- Botones primarios → deben verse gold con texto navy. Si la app usa `<Button variant="default">`, ya queda.
- Cards → fondo navy, borde gold a 15% de opacidad.
- Badges de categoría → preferir `bg-[var(--gold)]/10 border-[var(--gold)]/30 text-[var(--gold)]`.

### 7. Validar dentro del hub

Abre el hub, navega al sidebar correspondiente y revisa que:

- Header de la app embebida tiene la misma altura/estilo que el topbar del hub.
- No hay franjas blancas (la app antigua probablemente tenía background blanco).
- Tipografía Inter coincide.

## Mantenimiento

Cuando se cambie cualquier archivo en `royal-brand/` (nuevo color, ajuste de header, etc.), **repite el paso 1** en cada app y republica. Esto es la fricción del Plan A; el Plan C (npm) la elimina.

## Migración futura a `@royal/brand` (npm)

Cuando estabilices el sistema:

1. Mueve `royal-brand/` a un repo propio (`royal-brand` en GitHub).
2. Agrega `package.json` con `"name": "@royal/brand"`, `"exports"` para `./tokens.css`, `./fonts.css`, `./components/*`.
3. Publica en GitHub Packages (privado) o npm.
4. En cada app: `bun add @royal/brand` y reemplaza `@/brand/...` por `@royal/brand/...`.

---

© 2026 Royal Transports