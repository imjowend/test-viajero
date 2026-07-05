export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8082'

export interface SubmitAnswer {
  question_id: number
  question_text: string
  option_id: string
  option_text: string
  profile: string
}

export interface SubmitPayload {
  name: string
  profile: string
  answers: SubmitAnswer[]
}

export interface SubmitResponse {
  submission_id: number
  message: string
  profile: string
}

export async function submitQuiz(payload: SubmitPayload): Promise<SubmitResponse> {
  let res: Response
  try {
    res = await fetch(`${API_URL}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error(
      `No se pudo conectar con el servidor en ${API_URL}. ¿Está corriendo el backend?`
    )
  }

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(data?.error ?? 'No se pudo enviar el resultado')
  }
  return data as SubmitResponse
}
