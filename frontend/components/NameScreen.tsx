'use client'

import { useState } from 'react'

interface NameScreenProps {
  onContinue: (name: string) => void
}

export default function NameScreen({ onContinue }: NameScreenProps) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onContinue(name)
    }
  }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Mountain Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full border-4 border-amber-600 flex items-center justify-center bg-white">
            <span className="text-3xl">⛰️</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ¿Cómo te llamas?
            </h1>
            <p className="text-gray-600 text-sm">
              Así podemos armar tu perfil de viajero personalizado
            </p>
          </div>

          <input
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-6 py-3 rounded-full border-2 border-amber-600 bg-white text-gray-800 focus:outline-none focus:border-amber-700 text-center placeholder-gray-400"
          />

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-full transition-all"
          >
            ¡Vamos!
          </button>
        </form>
      </div>
    </div>
  )
}
