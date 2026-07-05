package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"path/filepath"

	_ "modernc.org/sqlite"
)

// Connect abre (o crea) la base de datos SQLite en dbPath, creando la carpeta
// contenedora si no existe, y corre las migraciones necesarias.
func Connect(dbPath string) (*sql.DB, error) {
	dir := filepath.Dir(dbPath)
	if dir != "." && dir != "" {
		if err := os.MkdirAll(dir, 0o755); err != nil {
			return nil, fmt.Errorf("no se pudo crear el directorio de la base de datos: %w", err)
		}
	}

	conn, err := sql.Open("sqlite", dbPath)
	if err != nil {
		return nil, fmt.Errorf("no se pudo abrir la base de datos: %w", err)
	}

	if err := conn.Ping(); err != nil {
		return nil, fmt.Errorf("no se pudo conectar a la base de datos: %w", err)
	}

	if err := Migrate(conn); err != nil {
		return nil, fmt.Errorf("error al migrar la base de datos: %w", err)
	}

	log.Printf("Conectado a la base de datos en %s", dbPath)
	return conn, nil
}
