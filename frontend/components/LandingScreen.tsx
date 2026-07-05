import Image from 'next/image'

interface LandingScreenProps {
  onStart: () => void
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-amber-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl text-center">
        <div className="mb-8 inline-block">
          <span className="text-xs font-bold tracking-widest text-amber-700 bg-amber-100 px-4 py-2 rounded-full border border-amber-300">
            QUIZ DE VIAJERO
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          ¿Qué tipo de viajero sos?
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Respondé 24 preguntas y descubrí tu perfil viajero
        </p>

        <div className="mb-12 flex justify-center">
          <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-lg border-8 border-amber-50 transform -rotate-1">
            <Image
              src="/hero-group.jpg"
              alt="Personajes viajeros de Cusco"
              width={400}
              height={250}
              priority
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <button
          onClick={onStart}
          className="bg-amber-700 hover:bg-amber-800 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
        >
          ¡Empezar el quiz!
        </button>

        <div className="mt-12 flex justify-center gap-8 flex-wrap">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image
                src="/llama.png"
                alt="La Llama Trekker"
                width={64}
                height={64}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <p className="text-xs font-bold text-gray-700">La Llama Trekker</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image
                src="/zorro-andino.png"
                alt="El Zorro Andino"
                width={64}
                height={64}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <p className="text-xs font-bold text-gray-700">El Zorro Andino</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image
                src="/oso-anteojo.png"
                alt="El Oso de Anteojos"
                width={64}
                height={64}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <p className="text-xs font-bold text-gray-700">El Oso Chill</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image
                src="/vicuna.png"
                alt="La Vicuña Pituca"
                width={64}
                height={64}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <p className="text-xs font-bold text-gray-700">La Vicuña Pituca</p>
          </div>
        </div>
      </div>
    </div>
  )
}
