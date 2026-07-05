package models

// Option es una de las 4 alternativas de respuesta de una pregunta.
type Option struct {
	ID      string `json:"id"`
	Text    string `json:"text"`
	Profile string `json:"profile"`
}

// Question es una de las 24 preguntas del quiz.
type Question struct {
	ID      int      `json:"id"`
	Title   string   `json:"title"`
	Text    string   `json:"text"`
	Options []Option `json:"options"`
}

// Answer es la respuesta que el usuario dio a una pregunta puntual.
type Answer struct {
	QuestionID   int    `json:"question_id"`
	QuestionText string `json:"question_text"`
	OptionID     string `json:"option_id"`
	OptionText   string `json:"option_text"`
	Profile      string `json:"profile"`
}

// SubmitRequest es el body de POST /submit.
type SubmitRequest struct {
	Name    string   `json:"name"`
	Profile string   `json:"profile"`
	Answers []Answer `json:"answers"`
}

// Submission es un registro completo de un usuario que completó el quiz.
type Submission struct {
	ID        int           `json:"id"`
	Name      string        `json:"name"`
	Profile   string        `json:"profile"`
	Answers   []Answer      `json:"answers"`
	CreatedAt string        `json:"created_at"`
	Feedback  *FeedbackData `json:"feedback"`
}

// FeedbackData es el feedback opcional asociado a una submission.
type FeedbackData struct {
	MatchesProfile bool   `json:"matches_profile"`
	Comment        string `json:"comment"`
}

// FeedbackRequest es el body de POST /feedback.
type FeedbackRequest struct {
	SubmissionID   int    `json:"submission_id"`
	MatchesProfile bool   `json:"matches_profile"`
	Comment        string `json:"comment"`
}

// LoginRequest es el body de POST /auth/login.
type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
