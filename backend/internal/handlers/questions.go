package handlers

import (
	"net/http"

	"github.com/imjowend/test-viajero/backend/internal/questions"
)

// GetQuestions maneja GET /questions.
func GetQuestions(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"questions": questions.Questions,
	})
}
