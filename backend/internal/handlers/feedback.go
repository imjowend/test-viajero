package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"unicode/utf8"

	"github.com/imjowend/test-viajero/backend/internal/models"
)

// Feedback maneja POST /feedback.
func Feedback(database *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.FeedbackRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			writeError(w, http.StatusBadRequest, "Cuerpo de la petición inválido")
			return
		}

		if utf8.RuneCountInString(req.Comment) > 500 {
			writeError(w, http.StatusBadRequest, "El campo comment no puede superar los 500 caracteres")
			return
		}

		var submissionExists int
		err := database.QueryRow(
			"SELECT COUNT(*) FROM submissions WHERE id = ?", req.SubmissionID,
		).Scan(&submissionExists)
		if err != nil {
			log.Printf("error al verificar submission: %v", err)
			writeError(w, http.StatusInternalServerError, "Error interno del servidor")
			return
		}
		if submissionExists == 0 {
			writeError(w, http.StatusNotFound, "La submission indicada no existe")
			return
		}

		var feedbackExists int
		err = database.QueryRow(
			"SELECT COUNT(*) FROM feedback WHERE submission_id = ?", req.SubmissionID,
		).Scan(&feedbackExists)
		if err != nil {
			log.Printf("error al verificar feedback existente: %v", err)
			writeError(w, http.StatusInternalServerError, "Error interno del servidor")
			return
		}
		if feedbackExists > 0 {
			writeError(w, http.StatusConflict, "Ya existe un feedback para esta submission")
			return
		}

		_, err = database.Exec(
			"INSERT INTO feedback (submission_id, matches_profile, comment) VALUES (?, ?, ?)",
			req.SubmissionID, req.MatchesProfile, req.Comment,
		)
		if err != nil {
			log.Printf("error al insertar feedback: %v", err)
			writeError(w, http.StatusInternalServerError, "Error interno del servidor")
			return
		}

		writeJSON(w, http.StatusCreated, map[string]string{
			"message": "Feedback guardado, ¡gracias!",
		})
	}
}
