package handlers

import (
	"encoding/json"
	"net/http"
)

// writeJSON escribe una respuesta JSON con el status code indicado.
func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(payload)
}

// writeError escribe una respuesta de error JSON con el status code indicado.
func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{"error": message})
}

// ValidProfiles son los únicos 4 slugs de perfil válidos en toda la aplicación.
var ValidProfiles = []string{
	"llama_trekker",
	"zorro_andino",
	"vicuna_vip",
	"oso_anteojos",
}

// isValidProfile indica si profile es uno de los 4 slugs válidos.
func isValidProfile(profile string) bool {
	for _, p := range ValidProfiles {
		if p == profile {
			return true
		}
	}
	return false
}
