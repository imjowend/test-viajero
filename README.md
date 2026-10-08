# Test Viajero

Quiz de personalidad "¿qué tipo de viajero andino sos?": 24 preguntas de situaciones de
viaje que clasifican a la persona en uno de cuatro perfiles (Llama Trekker, Zorro
Andino, Vicuña VIP, Oso de Anteojos) y guardan cada resultado para verlos después.

## Stack

- **Backend:** Go (stdlib `net/http`) + SQLite + JWT
- **Frontend:** Next.js 16 + React 19 + TypeScript + Tailwind CSS
- **Deploy:** VPS propio (Traefik) + Vercel

## Estructura del repo

Cada subcarpeta tiene su propio README con el detalle técnico:

- [`backend/`](./backend/README.md) — API del quiz en Go (preguntas, submissions,
  resultados con panel admin protegido por JWT)
- [`frontend/`](./frontend/README.md) — interfaz web del quiz en Next.js

## Deploy

- **Backend:** VPS propio, enrutado vía Traefik en `viajero-api.joaquinvasquez.com`
- **Frontend:** Vercel en `test-viajero.vercel.app`

## Hooks de git

`.githooks/pre-push` (versionado) frena el push si:

- hay marcadores de conflicto (`<<<<<<<` / `>>>>>>>`) en archivos trackeados,
- `go build ./...` falla en `backend/`,
- tsc --noEmit en frontend/ (aparte del build, porque next.config.mjs tiene ignoreBuildErrors) encuentra errores de tipos.

Tarda unos segundos (la primera vez puede bajar módulos de Go). Requiere
`frontend/node_modules` instalado (`pnpm install --frozen-lockfile`). Chequea el
working tree, no los commits a pushear.

Activarlo una vez por clon:

```bash
git config core.hooksPath .githooks
```

Para saltearlo en una emergencia: `git push --no-verify`.

## Estado

**Activo.** En desarrollo/uso continuo, con panel de resultados y feedback recolectando datos reales.
