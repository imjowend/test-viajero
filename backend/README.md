# Test Viajero — Backend

API HTTP en Go para un quiz de personalidad. Sirve las 24 preguntas (fuente de verdad
en el código), recibe las respuestas y **recalcula el perfil ganador server-side**
antes de guardar cada submission en SQLite (rechaza el perfil declarado por el cliente
si no coincide y evita nombres duplicados). Acepta feedback opcional por submission y
expone un endpoint de resultados agregados protegido por JWT, con login de admin.

## Requisitos

- **Go 1.26**
- SQLite en Go puro vía `modernc.org/sqlite` — **no requiere CGO** (se compila con
  `CGO_ENABLED=0`)
- `golang-jwt/jwt/v5` para los tokens de admin

## Variables de entorno

El backend lee estas variables (en producción se cargan vía `env_file` en
`docker-compose.yml`):

| Variable            | Requerida | Propósito                                                    |
|---------------------|-----------|--------------------------------------------------------------|
| `PORT`              | no        | Puerto HTTP de escucha (default `8080`)                      |
| `DB_PATH`           | no        | Ruta del archivo SQLite (default `./data/quiz.db`)           |
| `JWT_SECRET`        | sí        | Secreto para firmar/validar los JWT (el server aborta si falta) |
| `JWT_EXPIRY_HOURS`  | no        | Vigencia del token de admin en horas (default `72`)          |
| `ADMIN_USERNAME`    | sí        | Usuario del login de admin                                   |
| `ADMIN_PASSWORD`    | sí        | Contraseña del login de admin                                |

> `.env.example` incluye además `ALLOWED_ORIGIN`, pero **el código actual no lee esa
> variable** (CORS lo maneja Traefik en producción).
> <!-- TODO: confirmar si conviene eliminarla del .env.example -->

## Correr en local

```bash
cd backend
cp .env.example .env   # completar JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD
go run .
# Servidor en http://localhost:8080, DB en ./data/quiz.db
```

La carpeta de la DB y las migraciones se crean automáticamente al arrancar.

## Buildear / deployar

```bash
docker compose up -d --build   # desde la raíz del repo
```

En producción el enrutamiento (TLS, CORS, rate-limit) lo maneja **Traefik** vía labels
en `docker-compose.yml`; el backend solo expone HTTP plano en el puerto 8080. La DB
SQLite vive en un volumen Docker (`viajero_data`, montado en `/app/data`).

## Endpoints

| Método | Ruta          | Auth | Descripción                                            |
|--------|---------------|------|--------------------------------------------------------|
| GET    | `/health`     | —    | Health check                                           |
| GET    | `/questions`  | —    | Las 24 preguntas del quiz                              |
| POST   | `/submit`     | —    | Guardar una submission (revalida perfil y nombre único)|
| POST   | `/feedback`   | —    | Feedback opcional sobre una submission                 |
| POST   | `/auth/login` | —    | Login de admin → devuelve un JWT                       |
| GET    | `/results`    | JWT  | Resultados agregados (totales por perfil + submissions)|

## Estructura

```
main.go                      → entrypoint, carga de env, rutas
internal/
  handlers/                  → GetQuestions, Submit, Feedback, Login, Results, helpers
  auth/jwt.go, middleware.go → emisión/validación de JWT y RequireAuth
  db/db.go, migrations.go    → conexión SQLite + migraciones
  questions/questions.go     → las 24 preguntas (fuente de verdad) + lookups
  models/models.go           → tipos (Question, Option, Submission, Feedback, ...)
```
