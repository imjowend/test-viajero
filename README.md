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

## Estado

**Activo.** En desarrollo/uso continuo, con panel de resultados y feedback recolectando datos reales.
