package db

import "database/sql"

const createSubmissionsTable = `
CREATE TABLE IF NOT EXISTS submissions (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    profile     TEXT NOT NULL,
    answers     TEXT NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);
`

const createFeedbackTable = `
CREATE TABLE IF NOT EXISTS feedback (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    submission_id   INTEGER NOT NULL REFERENCES submissions(id),
    matches_profile INTEGER NOT NULL,
    comment         TEXT,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);
`

// Migrate crea las tablas necesarias si todavía no existen.
func Migrate(conn *sql.DB) error {
	if _, err := conn.Exec(createSubmissionsTable); err != nil {
		return err
	}
	if _, err := conn.Exec(createFeedbackTable); err != nil {
		return err
	}
	return nil
}
