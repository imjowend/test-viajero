package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/imjowend/test-viajero/backend/internal/models"
)

// sqliteTimestampLayout es el formato en el que SQLite guarda CURRENT_TIMESTAMP.
const sqliteTimestampLayout = "2006-01-02 15:04:05"

// Results maneja GET /results.
func Results(database *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := database.Query(`
			SELECT s.id, s.name, s.profile, s.answers, s.created_at,
			       f.matches_profile, f.comment
			FROM submissions s
			LEFT JOIN feedback f ON f.submission_id = s.id
			ORDER BY s.id
		`)
		if err != nil {
			log.Printf("error al consultar submissions: %v", err)
			writeError(w, http.StatusInternalServerError, "Error interno del servidor")
			return
		}
		defer rows.Close()

		byProfile := map[string]int{}
		for _, p := range ValidProfiles {
			byProfile[p] = 0
		}

		submissions := []models.Submission{}

		for rows.Next() {
			var (
				sub          models.Submission
				answersJSON  string
				createdAtRaw string
				matchesNull  sql.NullBool
				commentNull  sql.NullString
			)

			if err := rows.Scan(&sub.ID, &sub.Name, &sub.Profile, &answersJSON, &createdAtRaw, &matchesNull, &commentNull); err != nil {
				log.Printf("error al leer submission: %v", err)
				writeError(w, http.StatusInternalServerError, "Error interno del servidor")
				return
			}

			if err := json.Unmarshal([]byte(answersJSON), &sub.Answers); err != nil {
				log.Printf("error al deserializar answers: %v", err)
				writeError(w, http.StatusInternalServerError, "Error interno del servidor")
				return
			}

			sub.CreatedAt = formatTimestamp(createdAtRaw)

			if matchesNull.Valid {
				sub.Feedback = &models.FeedbackData{
					MatchesProfile: matchesNull.Bool,
					Comment:        commentNull.String,
				}
			}

			byProfile[sub.Profile]++
			submissions = append(submissions, sub)
		}

		if err := rows.Err(); err != nil {
			log.Printf("error al iterar submissions: %v", err)
			writeError(w, http.StatusInternalServerError, "Error interno del servidor")
			return
		}

		writeJSON(w, http.StatusOK, map[string]any{
			"total":       len(submissions),
			"by_profile":  byProfile,
			"submissions": submissions,
		})
	}
}

// formatTimestamp convierte el timestamp de SQLite a formato RFC3339 (UTC).
func formatTimestamp(raw string) string {
	t, err := time.Parse(sqliteTimestampLayout, raw)
	if err != nil {
		return raw
	}
	return t.UTC().Format(time.RFC3339)
}
