package auth

import (
	"encoding/json"
	"net/http"
	"strings"
)

// RequireAuth protege un handler exigiendo un JWT válido en el header
// Authorization: Bearer <token>.
func RequireAuth(secret string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			header := r.Header.Get("Authorization")
			parts := strings.SplitN(header, " ", 2)
			if len(parts) != 2 || parts[0] != "Bearer" || parts[1] == "" {
				unauthorized(w)
				return
			}

			if _, err := ValidateToken(parts[1], secret); err != nil {
				unauthorized(w)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}

func unauthorized(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusUnauthorized)
	json.NewEncoder(w).Encode(map[string]string{"error": "No autorizado"})
}
