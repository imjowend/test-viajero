'use client'

import { useMemo, useState } from 'react'
import { submitQuiz, type SubmitAnswer } from '@/lib/api'

interface Option {
  id: string
  text: string
  profile: string
}

interface Question {
  id: number
  title: string
  text: string
  options: Option[]
}

// Espejo exacto de backend/internal/questions/questions.go — misma fuente de
// verdad, mismo texto, mismo orden de opciones. El backend valida cada
// respuesta contra este mismo contenido.
const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'El ataque de Soroche (Mal de altura)',
    text: 'Llegamos a Cusco y a la mitad del grupo le da soroche intenso. ¿Qué hacés?',
    options: [
      { id: 'A', text: 'Me tomo una pastilla rápido, no podemos atrasar el itinerario.', profile: 'llama_trekker' },
      { id: 'B', text: 'Compro hojas de coca en el mercado, es lo más barato, natural y local.', profile: 'zorro_andino' },
      { id: 'C', text: 'Pido oxígeno en la recepción del hotel y pido delivery de comida para no salir.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Aprovecho para dormir todo el día tapado hasta la cabeza, cero estrés.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 2,
    title: 'Lluvia inesperada en la montaña',
    text: 'Estamos a punto de empezar una caminata y empieza a llover a cántaros.',
    options: [
      { id: 'A', text: 'Me pongo mi poncho impermeable y subo igual, a eso vinimos.', profile: 'llama_trekker' },
      { id: 'B', text: 'Busco el techo más cercano para no mojarme, no voy a gastar en ponchos sobrevalorados.', profile: 'zorro_andino' },
      { id: 'C', text: 'Propongo cancelar y mejor nos vamos a tomar un chocolate caliente a un buen café.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Me da igual, si la mayoría sube, subo; si no, me quedo viendo la lluvia.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 3,
    title: 'Drama en la estación de tren',
    text: 'Faltan 15 minutos para que salga el tren y dos del grupo no aparecen.',
    options: [
      { id: 'A', text: 'Me subo al tren. Les aviso que los veo allá, no me voy a perder las ruinas.', profile: 'llama_trekker' },
      { id: 'B', text: 'Los llamo desesperado para que corran, ¡esos pasajes costaron caros y no hay devolución!', profile: 'zorro_andino' },
      { id: 'C', text: 'Hablo con el personal a ver si nos pueden cambiar a un tren más tarde pagando una penalidad.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Me siento a esperar, seguro llegan. Si lo perdemos, ya ni modo, fluimos.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 4,
    title: 'El dilema del equipaje de mano',
    text: 'Viajamos solo con equipaje de mano. Ves una chompa de alpaca hermosa pero gigante que ocupa media maleta.',
    options: [
      { id: 'A', text: 'No la compro, prefiero llevarme recuerdos en fotos e imanes pequeños para no cargar.', profile: 'llama_trekker' },
      { id: 'B', text: 'Busco una parecida pero más pequeña en el mercado de San Pedro.', profile: 'zorro_andino' },
      { id: 'C', text: 'La compro y pago el exceso de equipaje en el aeropuerto sin pensarlo.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Me la pongo encima de toda mi ropa para subir al avión, problema resuelto.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 5,
    title: 'La cuenta de la cena',
    text: 'Fuimos a comer los 8 juntos a un restaurante local. A la hora de pagar...',
    options: [
      { id: 'A', text: 'Divido la cuenta en 8 partes iguales rápido para seguir con el itinerario de la noche.', profile: 'llama_trekker' },
      { id: 'B', text: 'Saco la calculadora: yo solo comí una empanada y tomé agua, pago exactamente lo mío.', profile: 'zorro_andino' },
      { id: 'C', text: 'Pongo mi tarjeta de crédito para ganar los puntos/millas y que me transfieran después.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Dejo billetes de más en la mesa y que alguien más se encargue de las matemáticas.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 6,
    title: 'El guía aburrido',
    text: 'Estamos en un tour y el guía habla súper lento y aburrido.',
    options: [
      { id: 'A', text: 'Me quedo escuchando atento y tomando notas, quiero aprender la historia.', profile: 'llama_trekker' },
      { id: 'B', text: 'Me separo disimuladamente y recorro el lugar por mi cuenta usando Google Maps.', profile: 'zorro_andino' },
      { id: 'C', text: 'Le pregunto dónde hay un baño decente y me voy a la cafetería a esperar.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Me siento en una piedra a tomar el sol y descansar hasta que termine de hablar.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 7,
    title: 'Emergencia en el Valle Sagrado',
    text: 'En plena caminata por la naturaleza te urge ir al baño y solo hay campo.',
    options: [
      { id: 'A', text: 'Voy detrás de un arbusto rápido para no retrasar al grupo.', profile: 'llama_trekker' },
      { id: 'B', text: 'Uso la naturaleza feliz de la vida, así es la aventura real.', profile: 'zorro_andino' },
      { id: 'C', text: 'Me aguanto el tiempo que sea necesario hasta encontrar un restaurante con baño limpio.', profile: 'vicuna_vip' },
      { id: 'D', text: "Me frustro un poco pero lo hago, quejándome de que esto es demasiado 'salvaje'.", profile: 'oso_anteojos' },
    ],
  },
  {
    id: 8,
    title: 'Fotografía extrema',
    text: 'Hay un mirador increíble en Cusco pero hay que hacer una fila de 40 minutos para la foto grupal.',
    options: [
      { id: 'A', text: 'No hago fila, tomo una foto del paisaje general y sigo explorando.', profile: 'llama_trekker' },
      { id: 'B', text: 'Hago la fila y aprovecho para comerme un snack económico que traje en mi mochila.', profile: 'zorro_andino' },
      { id: 'C', text: 'Le pago a uno de los fotógrafos locales para saltarme la fila y tener una foto profesional.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Me siento a un lado a descansar mientras los demás hacen la fila por mí.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 9,
    title: 'La tentación callejera',
    text: 'Hay un puesto en la calle con choclo con queso que huele increíble, pero el nivel de higiene es dudoso.',
    options: [
      { id: 'A', text: 'Pruebo un poco rápido, pero prefiero no arriesgarme a enfermarme antes de los tours.', profile: 'llama_trekker' },
      { id: 'B', text: 'Compro dos porciones, es comida local y el almuerzo más barato que encontraremos.', profile: 'zorro_andino' },
      { id: 'C', text: 'Paso de largo, mejor buscamos ese mismo plato en un restaurante bonito de la ciudad.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Le pido a un amigo que compre y le robo un bocado para no quedarme con las ganas.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 10,
    title: 'La madrugada fallida',
    text: 'Quedamos a las 5:00 AM para un tour. Son las 5:15 AM y nadie más ha salido de su cama.',
    options: [
      { id: 'A', text: '¡Empiezo a tocar todas las puertas. El itinerario no se respeta solo!', profile: 'llama_trekker' },
      { id: 'B', text: 'Salgo a caminar yo solo por los alrededores para no perder mi mañana de exploración.', profile: 'zorro_andino' },
      { id: 'C', text: 'Vuelvo a mi habitación privada feliz de la vida y pido un buen desayuno más tarde.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Era mi sueño hecho realidad, mi alarma nunca sonó de todas formas.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 11,
    title: 'Choque de intereses',
    text: 'Dos amigos empiezan a discutir porque uno quiere ir a un museo y otro a comprar artesanías de plata.',
    options: [
      { id: 'A', text: 'Intervengo y busco un lugar cercano que tenga ambas cosas para no perder tiempo.', profile: 'llama_trekker' },
      { id: 'B', text: 'Los dejo discutir y me voy al mercado más barato a hacer mis propias compras.', profile: 'zorro_andino' },
      { id: 'C', text: 'Propongo separarnos: unos al museo, otros de compras, y nos vemos en la cena.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Me pongo mis audífonos y espero a que decidan sin opinar, me da igual.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 12,
    title: 'Cusco exige pulmones',
    text: 'Llevamos 3 días caminando sin parar y te duelen los pies como nunca.',
    options: [
      { id: 'A', text: 'Me pongo vendas, tomo un analgésico y sigo con nivel chasqui.', profile: 'llama_trekker' },
      { id: 'B', text: 'Me aguanto el dolor, no quiero pagar un taxi si podemos llegar caminando.', profile: 'zorro_andino' },
      { id: 'C', text: 'Mañana pago un tour privado en minivan que nos deje en la puerta de todo.', profile: 'vicuna_vip' },
      { id: 'D', text: "Declaro mañana 'día de descanso grupal' y exijo nivel relax total.", profile: 'oso_anteojos' },
    ],
  },
  {
    id: 13,
    title: 'Las señoras con llamas',
    text: 'Vemos unas mujeres locales con alpacas y llamas cobrando por tomarse fotos con ellas.',
    options: [
      { id: 'A', text: 'Tomo una foto cultural del momento desde lejos para documentar.', profile: 'llama_trekker' },
      { id: 'B', text: 'Tomo la foto rápido desde otro ángulo para no pagar, modo ahorro extremo.', profile: 'zorro_andino' },
      { id: 'C', text: 'Les doy un buen billete y me tomo una sesión completa abrazando a los animales.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Las miro de lejitos, me da pereza acercarme y negociar el precio.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 14,
    title: 'Fiesta vs. Responsabilidad',
    text: 'Son las 2:00 AM, la fiesta en la Plaza de Armas está increíble, pero mañana hay tour a las 7:00 AM.',
    options: [
      { id: 'A', text: 'Me voy a dormir inmediatamente. No voy a hacer el tour cansado.', profile: 'llama_trekker' },
      { id: 'B', text: 'Sigo en la fiesta. Mañana duermo en el bus del tour y no gasto en taxi de madrugada.', profile: 'zorro_andino' },
      { id: 'C', text: 'Me voy al hotel a descansar bien para estar presentable en las fotos de mañana.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Me quedo en la fiesta y mañana simplemente no voy al tour, estoy de vacaciones.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 15,
    title: 'Perdidos en San Blas',
    text: 'Nos perdimos buscando una calle empedrada en el barrio de San Blas de noche.',
    options: [
      { id: 'A', text: 'Saco el mapa, pregunto a los locales y lidero el camino de regreso.', profile: 'llama_trekker' },
      { id: 'B', text: 'Uso el celular y nos guío caminando para no gastar en transporte.', profile: 'zorro_andino' },
      { id: 'C', text: 'Busco un taxi seguro inmediatamente, no quiero caminar subidas de noche.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Entro al primer bar que veo, nos tomamos un pisco sour y luego averiguamos cómo volver.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 16,
    title: 'Tarde 100% libre',
    text: 'Tenemos 4 horas libres sin nada planeado antes de la cena.',
    options: [
      { id: 'A', text: 'Busco en internet qué templo arqueológico cercano podemos visitar en ese tiempo.', profile: 'llama_trekker' },
      { id: 'B', text: 'Me voy a caminar por los mercados menos turísticos para ver cómo vive la gente.', profile: 'zorro_andino' },
      { id: 'C', text: 'Busco el balcón con la mejor vista, pido algo de tomar y me relajo.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Regreso al hotel a tomar una siesta reparadora, me la merezco.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 17,
    title: 'Desconexión digital',
    text: 'El internet de todo Cusco se cae y no hay señal en los celulares por un día entero.',
    options: [
      { id: 'A', text: 'Saco mis apuntes impresos para no atrasar la logística de los tours.', profile: 'llama_trekker' },
      { id: 'B', text: '¡Genial! Desconexión total. Me voy a la plaza a conversar con otros mochileros.', profile: 'zorro_andino' },
      { id: 'C', text: 'Me frustro porque no puedo subir historias, y busco el hotel más lujoso a ver si tienen red.', profile: 'vicuna_vip' },
      { id: 'D', text: 'La excusa perfecta para no responder mensajes del trabajo y vivir el momento.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 18,
    title: 'Gastronomía intensa: El Cuy',
    text: 'Nos sirven Cuy (conejillo de indias) en un restaurante tradicional.',
    options: [
      { id: 'A', text: 'Pruebo un pedazo pequeño para conocer la cultura gastronómica y sigo.', profile: 'llama_trekker' },
      { id: 'B', text: 'Me lo como entero, es una experiencia súper local que hay que vivir al 100%.', profile: 'zorro_andino' },
      { id: 'C', text: 'No gracias, le tomo foto y pido un lomo saltado clásico.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Solo me como las papas y el choclo que lo acompañan para no hacer problema.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 19,
    title: 'El estrés del último día',
    text: 'Toca armar el equipaje de mano para regresar y la maleta no cierra por las compras.',
    options: [
      { id: 'A', text: 'Saco todo, organizo milimétricamente hasta que cierre perfecto.', profile: 'llama_trekker' },
      { id: 'B', text: 'Dejo la ropa más vieja que traje en el hostal para liberar espacio y no pagar exceso.', profile: 'zorro_andino' },
      { id: 'C', text: 'Pago la tarifa de equipaje en bodega desde el celular sin estresarme por el peso.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Le pido a un amigo que se siente encima de mi maleta mientras yo jalo el cierre a la fuerza.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 20,
    title: 'La despedida de Cusco',
    text: 'Es nuestra última noche en la ciudad y hay presupuesto sobrante. ¿Cómo cerramos el viaje?',
    options: [
      { id: 'A', text: 'Caminata final por la Plaza de Armas para absorber la energía del lugar.', profile: 'llama_trekker' },
      { id: 'B', text: 'Compramos cervezas en el supermercado y brindamos en el alojamiento.', profile: 'zorro_andino' },
      { id: 'C', text: "Si hay un 'lujito grupal', reservamos una cena increíble en el restaurante más famoso.", profile: 'vicuna_vip' },
      { id: 'D', text: 'Cenamos cualquier cosa cerca y nos vamos a dormir temprano, que el aeropuerto cansa.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 21,
    title: 'El Tesorero del Grupo',
    text: 'Hay que llevar un control de los gastos compartidos (taxis, snacks, propinas). ¿Cuál es tu rol ideal?',
    options: [
      { id: 'A', text: 'Descargo una app como Splitwise y registro los gastos al segundo para que todo sea justo.', profile: 'llama_trekker' },
      { id: 'B', text: 'Me ofrezco a llevar las cuentas de cerca para asegurarme de que nadie gaste de más.', profile: 'zorro_andino' },
      { id: 'C', text: 'Pongo mi tarjeta de crédito para los montos grandes y gano las millas/puntos.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Prefiero que otro sea el tesorero. Yo solo transfiero lo que me digan al final del día.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 22,
    title: 'Estrategia de Ahorro y Presupuesto',
    text: '¿Cómo preparaste tu billetera para este viaje a Cusco?',
    options: [
      { id: 'A', text: 'Pagué todos los tickets pesados con meses de anticipación para no pensar en dinero allá.', profile: 'llama_trekker' },
      { id: 'B', text: 'Armé un presupuesto diario estricto y mi meta es no pasarme ni un sol.', profile: 'zorro_andino' },
      { id: 'C', text: 'Ahorré un fondo extra exclusivamente para darme gustitos: masaje, restaurante top, recuerdo exclusivo.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Vi cuánto tenía en la cuenta y me mandé. Gastaré según lo que vaya surgiendo.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 23,
    title: 'El Fondo Común (La Chanchita)',
    text: 'Armamos un pozo de dinero en efectivo para pagos rápidos grupales. ¿Cómo manejás tu parte?',
    options: [
      { id: 'A', text: 'Me ofrezco a guardarlo yo para pagar rápido los tickets y taxis sin retrasar el itinerario.', profile: 'llama_trekker' },
      { id: 'B', text: 'Doy mi parte exacta, pero pido que se use estrictamente para cosas 100% grupales.', profile: 'zorro_andino' },
      { id: 'C', text: 'Pongo billetes grandes de una vez para no estar buscando sencillo a cada rato.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Me olvido de sacar efectivo. Le pido a un amigo que ponga mi parte y le transfiero desde el celular.', profile: 'oso_anteojos' },
    ],
  },
  {
    id: 24,
    title: 'El Imprevisto Financiero',
    text: 'Un paro imprevisto nos obliga a tomar una ruta alterna que cuesta el doble de lo presupuestado.',
    options: [
      { id: 'A', text: 'Lo pago sin dudar. El tiempo vale oro y no voy a dejar que un paro arruine el itinerario.', profile: 'llama_trekker' },
      { id: 'B', text: 'Busco en Google Maps si hay colectivos locales más baratos o propongo caminar un tramo.', profile: 'zorro_andino' },
      { id: 'C', text: 'Ya que cuesta más, propongo agregar un poco más y alquilar una minivan privada cómoda.', profile: 'vicuna_vip' },
      { id: 'D', text: 'Pago lo que diga la mayoría y aprovecho la demora en la carretera para dormir una siesta.', profile: 'oso_anteojos' },
    ],
  },
]

// Misma regla de desempate que el backend (ver computeWinnerProfile en
// submit.go): recorre las respuestas en orden de question_id y el ganador es
// el perfil que iguala o supera el máximo puntaje por última vez.
function computeWinnerProfile(answers: SubmitAnswer[]): string {
  const ordered = [...answers].sort((a, b) => a.question_id - b.question_id)
  const scores: Record<string, number> = {}
  let winner = ''
  let maxScore = 0
  for (const a of ordered) {
    scores[a.profile] = (scores[a.profile] ?? 0) + 1
    if (scores[a.profile] >= maxScore) {
      maxScore = scores[a.profile]
      winner = a.profile
    }
  }
  return winner
}

// Baraja las opciones para que la posición en pantalla no delate el
// perfil (backend siempre asocia A→llama_trekker, B→zorro_andino, etc.).
// La etiqueta visual (POSITION_LABELS) es puramente de UI; el option_id
// real que se envía al backend sigue siendo el de la opción baraja.
function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const POSITION_LABELS = ['A', 'B', 'C', 'D']

interface QuizScreenProps {
  onComplete: (profileId: string) => void
  playerName: string
}

export default function QuizScreen({ onComplete, playerName }: QuizScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<SubmitAnswer[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const question = QUIZ_QUESTIONS[currentQuestion]
  const shuffledOptions = useMemo(() => shuffle(question.options), [currentQuestion])

  const answerCircleColors = ['bg-amber-600', 'bg-amber-900', 'bg-rose-600', 'bg-emerald-700']

  const trySubmit = async (finalAnswers: SubmitAnswer[]) => {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const profile = computeWinnerProfile(finalAnswers)
      await submitQuiz({ name: playerName, profile, answers: finalAnswers })
      onComplete(profile)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'No se pudo enviar el resultado')
      setIsSubmitting(false)
    }
  }

  const handleAnswer = (option: Option, index: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)

    const newAnswers = [
      ...answers,
      {
        question_id: question.id,
        question_text: question.title,
        option_id: option.id,
        option_text: option.text,
        profile: option.profile,
      },
    ]
    setAnswers(newAnswers)

    setTimeout(() => {
      if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        trySubmit(newAnswers)
      }
    }, 300)
  }

  if (submitError) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
        <div className="max-w-sm text-center space-y-4">
          <p className="text-red-600 font-semibold">{submitError}</p>
          <button
            onClick={() => trySubmit(answers)}
            className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-6 rounded-full transition-all"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
        <p className="text-amber-900 font-bold text-lg">Calculando tu perfil de viajero...</p>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100

  return (
    <div className="min-h-screen bg-amber-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-amber-900">
              Pregunta {currentQuestion + 1} de {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-sm font-bold text-amber-900">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-amber-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-amber-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-amber-100 rounded-3xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-amber-900 mb-2">{question.title}</h2>
          </div>

          <div className="rounded-2xl px-4 py-3 mb-6 bg-amber-50">
            <p className="text-gray-700 text-sm font-medium">{question.text}</p>
          </div>

          {/* Answer Options */}
          <div className="space-y-4">
            {shuffledOptions.map((option, index) => {
              const isSelected = selectedAnswer === index

              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option, index)}
                  className={`w-full flex items-start gap-4 p-4 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? 'bg-white border-amber-600 shadow-md'
                      : 'bg-white border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                  }`}
                >
                  {/* Circle with Letter (posición visual, no el option_id real) */}
                  <div
                    className={`${answerCircleColors[index]} text-white font-bold rounded-full w-12 h-12 min-w-12 flex items-center justify-center text-lg shadow-md`}
                  >
                    {POSITION_LABELS[index]}
                  </div>

                  {/* Answer Text */}
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-800 text-sm leading-snug">{option.text}</p>
                  </div>

                  {/* Checkmark space, always reserved to avoid text reflow */}
                  <div
                    className={`flex-shrink-0 w-5 text-amber-600 text-xl font-bold ${
                      isSelected ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    ✓
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
