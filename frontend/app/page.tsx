'use client'

import { useState } from 'react'
import LandingScreen from '@/components/LandingScreen'
import NameScreen from '@/components/NameScreen'
import QuizScreen from '@/components/QuizScreen'
import ResultScreen from '@/components/ResultScreen'

export default function Page() {
  const [screen, setScreen] = useState<'landing' | 'name' | 'quiz' | 'result'>('landing')
  const [playerName, setPlayerName] = useState<string>('')
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)

  const handleStartQuiz = () => {
    setScreen('name')
  }

  const handleNameSubmit = (name: string) => {
    setPlayerName(name)
    setScreen('quiz')
  }

  const handleCompleteQuiz = (profileId: string) => {
    setSelectedProfile(profileId)
    setScreen('result')
  }

  const handleRetakeQuiz = () => {
    setScreen('quiz')
    setSelectedProfile(null)
  }

  return (
    <main className="min-h-screen bg-amber-50">
      {screen === 'landing' && <LandingScreen onStart={handleStartQuiz} />}
      {screen === 'name' && <NameScreen onContinue={handleNameSubmit} />}
      {screen === 'quiz' && <QuizScreen onComplete={handleCompleteQuiz} playerName={playerName} />}
      {screen === 'result' && selectedProfile && (
        <ResultScreen profileId={selectedProfile} onRetake={handleRetakeQuiz} playerName={playerName} />
      )}
    </main>
  )
}
