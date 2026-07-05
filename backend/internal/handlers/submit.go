package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"sort"
	"strings"
	"unicode/utf8"

	"github.com/imjowend/test-viajero/backend/internal/models"
	"github.com/imjowend/test-viajero/backend/internal/questions"
)

// Submit maneja POST /submit.
func Submit(database *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req models.SubmitRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			writeError(w, http.StatusBadRequest, "Cuerpo de la petición inválido")
			return
		}

		name := strings.TrimSpace(req.Name)
		if name == "" {
			writeError(w, http.StatusBadRequest, "El campo name es requerido")
			return
		}
		if utf8.RuneCountInString(name) > 100 {
			writeError(w, http.StatusBadRequest, "El campo name no puede superar los 100 caracteres")
			return
		}

		if !isValidProfile(req.Profile) {
			writeError(w, http.StatusBadRequest, "El campo profile no es un perfil válido")
			return
		}

		if len(req.Answers) != 24 {
			writeError(w, http.StatusBadRequest, "answers debe tener exactamente 24 elementos")
			return
		}

		resolvedAnswers := make([]models.Answer, len(req.Answers))
		for i, a := range req.Answers {
			q := questions.FindByID(a.QuestionID)
			if q == nil {
				writeError(w, http.StatusBadRequest, "question_id inválido en answers")
				return
			}
			opt := questions.FindOption(q, a.OptionID)
			if opt == nil {
				writeError(w, http.StatusBadRequest, "option_id inválido en answers")
				return
			}
			resolved := a
			resolved.Profile = opt.Profile // fuente de verdad: ignora el profile que mande el cliente
			resolvedAnswers[i] = resolved
		}

		winner := computeWinnerProfile(resolvedAnswers)
		if winner != req.Profile {
			writeError(w, http.StatusBadRequest, "El profile declarado no coincide con el resultado del conteo")
			return
		}

		var existing int
		err := database.QueryRow(
			"SELECT COUNT(*) FROM submissions WHERE LOWER(name) = LOWER(?)", name,
		).Scan(&existing)
		if err != nil {
			log.Printf("error al verificar name duplicado: %v", err)
			writeError(w, http.StatusInternalServerError, "Error interno del servidor")
			return
		}
		if existing > 0 {
			writeError(w, http.StatusConflict, "Ya existe una submission con ese name")
			return
		}

		answersJSON, err := json.Marshal(resolvedAnswers)
		if err != nil {
			log.Printf("error al serializar answers: %v", err)
			writeError(w, http.StatusInternalServerError, "Error interno del servidor")
			return
		}

		result, err := database.Exec(
			"INSERT INTO submissions (name, profile, answers) VALUES (?, ?, ?)",
			name, req.Profile, string(answersJSON),
		)
		if err != nil {
			log.Printf("error al insertar submission: %v", err)
			writeError(w, http.StatusInternalServerError, "Error interno del servidor")
			return
		}

		id, err := result.LastInsertId()
		if err != nil {
			log.Printf("error al obtener submission_id: %v", err)
			writeError(w, http.StatusInternalServerError, "Error interno del servidor")
			return
		}

		writeJSON(w, http.StatusCreated, map[string]any{
			"submission_id": id,
			"message":       "Respuestas guardadas correctamente",
			"profile":       req.Profile,
		})
	}
}

// computeWinnerProfile suma los puntos de cada answer por perfil, recorriendo
// las respuestas en orden (question_id 1 -> 24), y devuelve el perfil que haya
// alcanzado el puntaje máximo por última vez. En caso de empate, gana el
// perfil que iguala o supera el máximo más recientemente.
// answers debe venir con el profile ya resuelto contra el source of truth.
func computeWinnerProfile(answers []models.Answer) string {
	ordered := make([]models.Answer, len(answers))
	copy(ordered, answers)
	sort.Slice(ordered, func(i, j int) bool {
		return ordered[i].QuestionID < ordered[j].QuestionID
	})

	scores := map[string]int{}
	winner := ""
	maxScore := 0

	for _, a := range ordered {
		scores[a.Profile]++
		if scores[a.Profile] >= maxScore {
			maxScore = scores[a.Profile]
			winner = a.Profile
		}
	}

	return winner
}
