package handlers

import (
	"crypto/subtle"
	"encoding/json"
	"log"
	"net/http"

	"github.com/imjowend/test-viajero/backend/internal/auth"
	"github.com/imjowend/test-viajero/backend/internal/models"
)

// Login maneja POST /auth/login.
func Login(adminUsername, adminPassword, jwtSecret string, jwtExpiryHours int) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.LoginRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			writeError(w, http.StatusBadRequest, "Cuerpo de la petición inválido")
			return
		}

		usernameMatch := subtle.ConstantTimeCompare([]byte(req.Username), []byte(adminUsername)) == 1
		passwordMatch := subtle.ConstantTimeCompare([]byte(req.Password), []byte(adminPassword)) == 1

		if !usernameMatch || !passwordMatch {
			writeError(w, http.StatusUnauthorized, "Credenciales inválidas")
			return
		}

		token, err := auth.GenerateToken(req.Username, jwtSecret, jwtExpiryHours)
		if err != nil {
			log.Printf("error al generar token: %v", err)
			writeError(w, http.StatusInternalServerError, "Error interno del servidor")
			return
		}

		writeJSON(w, http.StatusOK, map[string]string{"token": token})
	}
}
