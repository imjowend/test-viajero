'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ResultScreenProps {
  profileId: string
  onRetake: () => void
  playerName?: string
}

const PROFILES = {
  zorro_andino: {
    title: 'El Aventurero Ahorrador',
    subtitle: 'Zorro Andino',
    character: '/zorro-andino-card.png',
    tagline: 'Mochilero audaz y calculador',
    role: 'El GPS humano y guardián de la billetera',
    description: '¿Para qué pagar un taxi si podemos caminar y conocer más el lugar?',
    pros: [
      'Ser un alma libre con Google Maps',
      'Regatear en el mercado',
      'Comer auténtico (y barato)',
    ],
    cons: [
      'Pagar "tarifa de turista"',
      'Los tours demasiado estrictos',
      'No seguir su instinto',
    ],
    stats: [
      { label: 'Resistencia "Chasqui"', value: '100% (Pulmones de acero)' },
      { label: 'Ahorro Extremo', value: '90%' },
      { label: 'Independencia', value: '100%' },
    ],
    workBest: 'Dúo imparable con la Llama Trekker para caminar por la ciudad todo el día',
    amuletItems: [
      { emoji: '💰', label: 'Monedero' },
      { emoji: '🎒', label: 'Mochila' },
    ],
  },
  llama_trekker: {
    title: 'El Explorador Cultural',
    subtitle: 'Llama Trekker',
    character: '/llama-card.png',
    tagline: 'Indiana Jones versión andina',
    role: 'El motor del equipo (y el que despierta a todos)',
    description: 'Dormir es para la vuelta, chef! Hay mucha historia por descubrir',
    pros: [
      'Alarma a las 6:00 AM',
      'Los tours llenos de historia',
      'Conocedor constante',
    ],
    cons: [
      'Itinerario atrasado',
      'Perder el tiempo en la cama',
      'Cancelar un plan',
    ],
    stats: [
      { label: 'Energía Diaria', value: '100% (Imparable)' },
      { label: 'Puntualidad', value: '90%' },
      { label: 'Nivel Madrugador', value: '100%' },
    ],
    workBest: 'Dúo imparable con el Aventurero Ahorrador para caminar por la ciudad todo el día',
    amuletItems: [
      { emoji: '🥾', label: 'Botas' },
      { emoji: '⏰', label: 'Reloj' },
    ],
  },
  oso_anteojos: {
    title: 'El Vacionista Chill',
    subtitle: 'El Oso de Anteojos',
    character: '/oso-anteojo-card.png',
    tagline: 'Maestro del Zen y del YA FUE YA',
    role: 'El supervisor de bienestar grupal',
    description: 'Si tengo que poner alarma, entonces no son vacaciones',
    pros: [
      'Despertar 10:00 AM (o más tarde)',
      'Paseos tranquilos, desayunos tarde y cenas relajadas',
      'Hospedajes súper céntricos para evitar caminar',
    ],
    cons: [
      'Las madrugadas',
      'La gente que corre y se estresa',
      'Las discusiones a la hora de pagar',
    ],
    stats: [
      { label: 'Relajación', value: '100%' },
      { label: 'Fluir con la vida', value: '90%' },
      { label: 'Energía Física', value: 'Taxi por favor' },
    ],
    workBest: 'Te llevas bien con todos. Eres el cable a tierra de la Llama, el cómplice de taxis de la Vicuña y el compañero de planes del Zorro.',
    amuletItems: [
      { emoji: '🎧', label: 'Audífonos' },
      { emoji: '😎', label: 'Lentes' },
    ],
  },
  vicuna_vip: {
    title: 'Solo Relajo y Lujo',
    subtitle: 'La Vicuña Pituca',
    character: '/vicuna-card.png',
    tagline: 'Viajero VIP y estético',
    role: 'El de las buenas experiencias y cazador de lujos',
    description: 'Estoy de viaje, no en un campo militar. Merezco un mimo y una cena joya.',
    pros: [
      'Fotitos para insta',
      'Probar la gastronomía top',
      'Darse un lujito',
    ],
    cons: [
      'Subir la montaña',
      'Tener que usar baños compartidos',
      'El estrés logístico',
    ],
    stats: [
      { label: 'Necesidad de Comodidad', value: '100%' },
      { label: 'Nivel Gourmet', value: '90%' },
      { label: 'Presupuesto Extra (Gustitos)', value: '80%' },
    ],
    workBest: 'Con la Llama Trekker: uno pone el cerebro logístico organizando el itinerario y el otro asegura que la experiencia sea de 5 estrellas.',
    amuletItems: [
      { emoji: '💳', label: 'Tarjeta' },
      { emoji: '🥂', label: 'Brindis' },
    ],
  },
}

export default function ResultScreen({
  profileId,
  onRetake,
}: ResultScreenProps) {
  const profile = PROFILES[profileId as keyof typeof PROFILES]
  const [feedback, setFeedback] = useState('')

  if (!profile) {
    return <div>Perfil no encontrado</div>
  }

  return (
    <div className="min-h-screen bg-amber-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* LEFT: Quiz Card Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <Image
                src={profile.character}
                alt={profile.subtitle}
                width={400}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* RIGHT: Feedback Section */}
          <div className="flex flex-col gap-6 lg:pl-4">
            <div className="space-y-2">
              <p className="text-emerald-600 font-bold text-sm">¡Resultado listo!</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                ¡Sos {profile.subtitle.toLowerCase()}!
              </h1>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {profile.description}
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4">
              <div>
                <h3 className="font-bold text-gray-800 mb-3">¿Te representa este perfil?</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setFeedback('yes')}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full transition-all"
                  >
                    ¡Sí, me define!
                  </button>
                  <button
                    onClick={() => setFeedback('no')}
                    className="flex-1 border-2 border-red-500 text-red-500 hover:bg-red-50 font-bold py-2 px-4 rounded-full transition-all"
                  >
                    No del todo...
                  </button>
                </div>
              </div>

              {feedback && (
                <div>
                  <textarea
                    placeholder="Contanos más (opcional)"
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 resize-none"
                    rows={4}
                  />
                </div>
              )}

              <button className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-6 rounded-full transition-all">
                Enviar feedback
              </button>
            </div>

            <button
              onClick={onRetake}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-full transition-all"
            >
              Retomar el Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
