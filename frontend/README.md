# Test Viajero — Frontend

App en Next.js 16 (App Router) que corre el quiz "¿qué tipo de viajero andino sos?":
pantalla de inicio, ingreso de nombre, las 24 preguntas y la pantalla de resultado con
el perfil asignado. Consume la API del backend bajo `/api`.

## Requisitos

- **Node.js 20+** (requerido por Next.js 16)
  <!-- TODO: confirmar versión exacta; no hay campo `engines` en package.json -->
- Gestor de paquetes: el repo tiene **`package-lock.json` y `pnpm-lock.yaml`** a la vez.
  <!-- TODO: confirmar cuál es el canónico (npm o pnpm) y eliminar el otro lockfile -->

## Variables de entorno

| Variable              | Requerida | Propósito                                                   |
|-----------------------|-----------|-------------------------------------------------------------|
| `NEXT_PUBLIC_API_URL` | no        | Base de las llamadas a la API. Si no se define, usa `/api` (que resuelve el rewrite de `next.config.mjs`) |

```bash
cp .env.example .env    # opcional; dejar vacío usa /api + rewrite
```

## Correr en local

```bash
npm install
npm run dev     # http://localhost:3000
```

| Comando         | Descripción             |
|-----------------|-------------------------|
| `npm run dev`   | Servidor de desarrollo  |
| `npm run build` | Build de producción     |
| `npm run start` | Servidor de producción  |
| `npm run lint`  | Linter (ESLint)         |

## Cómo pega al backend

`next.config.mjs` define un **rewrite** de `/api/:path*` →
`https://viajero-api.joaquinvasquez.com/:path*`. Notar que **el prefijo `/api` se
descarta** en el destino, alineado con los endpoints del backend (`/submit`,
`/questions`, etc., sin prefijo `/api`).

El cliente (`lib/api.ts`) usa `NEXT_PUBLIC_API_URL` o, por defecto, `/api`, de modo que
las llamadas relativas pasan por el rewrite. El destino de producción está hardcodeado
en `next.config.mjs`.

## Deploy

Deployado en **Vercel** (`test-viajero.vercel.app`). El backend de producción está
fijado en el rewrite de `next.config.mjs` (no depende de una env var de build).
