package main

import (
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/imjowend/test-viajero/backend/internal/auth"
	"github.com/imjowend/test-viajero/backend/internal/db"
	"github.com/imjowend/test-viajero/backend/internal/handlers"
)

func main() {
	port := getEnv("PORT", "8080")
	dbPath := getEnv("DB_PATH", "./data/quiz.db")
	jwtSecret := mustGetEnv("JWT_SECRET")
	jwtExpiryHours := getEnvInt("JWT_EXPIRY_HOURS", 72)
	adminUsername := mustGetEnv("ADMIN_USERNAME")
	adminPassword := mustGetEnv("ADMIN_PASSWORD")

	conn, err := db.Connect(dbPath)
	if err != nil {
		log.Fatalf("no se pudo inicializar la base de datos: %v", err)
	}
	defer conn.Close()

	mux := http.NewServeMux()

	mux.HandleFunc("GET /health", healthCheck)
	mux.HandleFunc("GET /questions", handlers.GetQuestions)
	mux.HandleFunc("POST /submit", handlers.Submit(conn))
	mux.HandleFunc("POST /feedback", handlers.Feedback(conn))
	mux.HandleFunc("POST /auth/login", handlers.Login(adminUsername, adminPassword, jwtSecret, jwtExpiryHours))

	requireAuth := auth.RequireAuth(jwtSecret)
	mux.Handle("GET /results", requireAuth(handlers.Results(conn)))

	log.Printf("Servidor escuchando en el puerto %s", port)
	if err := http.ListenAndServe(":"+port, mux); err != nil {
		log.Fatalf("error en el servidor: %v", err)
	}
}

func healthCheck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status":"ok"}`))
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func mustGetEnv(key string) string {
	v := os.Getenv(key)
	if v == "" {
		log.Fatalf("la variable de entorno %s es requerida", key)
	}
	return v
}

func getEnvInt(key string, fallback int) int {
	v := os.Getenv(key)
	if v == "" {
		return fallback
	}
	n, err := strconv.Atoi(v)
	if err != nil {
		log.Fatalf("la variable de entorno %s debe ser un número entero", key)
	}
	return n
}
