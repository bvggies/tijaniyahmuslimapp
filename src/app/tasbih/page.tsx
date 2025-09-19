'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  CircleDotIcon, 
  RotateCcwIcon,
  PlayIcon,
  PauseIcon,
  SettingsIcon,
  TargetIcon,
  TrophyIcon,
  ClockIcon,
  StarIcon,
  HeartIcon
} from 'lucide-react'

interface DhikrSession {
  id: string
  name: string
  target: number
  current: number
  completed: boolean
  startTime: Date
  endTime?: Date
  duration?: number
}

const dhikrTypes = [
  {
    id: 'subhanallah',
    name: 'Subhan Allah',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'Subhan Allah',
    translation: 'Glory be to Allah',
    target: 33
  },
  {
    id: 'alhamdulillah',
    name: 'Alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    translation: 'Praise be to Allah',
    target: 33
  },
  {
    id: 'allahuakbar',
    name: 'Allahu Akbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    translation: 'Allah is the Greatest',
    target: 33
  },
  {
    id: 'laillahaillallah',
    name: 'La Ilaha Illa Allah',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
    transliteration: 'La ilaha illa Allah',
    translation: 'There is no god but Allah',
    target: 100
  },
  {
    id: 'astaghfirullah',
    name: 'Astaghfirullah',
    arabic: 'أَسْتَغْفِرُ اللَّه',
    transliteration: 'Astaghfirullah',
    translation: 'I seek forgiveness from Allah',
    target: 100
  },
  {
    id: 'laillahaillallahwahdahulasharikalah',
    name: 'La Ilaha Illa Allah Wahdahu La Sharika Lah',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: 'La ilaha illa Allah wahdahu la sharika lah',
    translation: 'There is no god but Allah alone, without any partner',
    target: 100
  }
]

export default function TasbihPage() {
  const [currentCount, setCurrentCount] = useState(0)
  const [selectedDhikr, setSelectedDhikr] = useState(dhikrTypes[0])
  const [isActive, setIsActive] = useState(false)
  const [sessions, setSessions] = useState<DhikrSession[]>([])
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [vibrationEnabled, setVibrationEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Load sessions from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('tasbih-sessions')
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions))
    }
  }, [])

  // Save sessions to localStorage whenever sessions change
  useEffect(() => {
    localStorage.setItem('tasbih-sessions', JSON.stringify(sessions))
  }, [sessions])

  // Timer effect
  useEffect(() => {
    if (isActive && startTime) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime.getTime())
      }, 100)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, startTime])

  const handleCount = () => {
    const newCount = currentCount + 1
    setCurrentCount(newCount)

    // Vibration feedback
    if (vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate(50)
    }

    // Sound feedback (using Web Audio API)
    if (soundEnabled) {
      playClickSound()
    }

    // Check if target reached
    if (newCount >= selectedDhikr.target) {
      completeSession()
    }
  }

  const playClickSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  const startSession = () => {
    setCurrentCount(0)
    setIsActive(true)
    setStartTime(new Date())
    setElapsedTime(0)
  }

  const pauseSession = () => {
    setIsActive(false)
  }

  const resetSession = () => {
    setCurrentCount(0)
    setIsActive(false)
    setStartTime(null)
    setElapsedTime(0)
  }

  const completeSession = () => {
    const endTime = new Date()
    const duration = startTime ? endTime.getTime() - startTime.getTime() : 0
    
    const newSession: DhikrSession = {
      id: Date.now().toString(),
      name: selectedDhikr.name,
      target: selectedDhikr.target,
      current: currentCount,
      completed: true,
      startTime: startTime || new Date(),
      endTime,
      duration
    }

    setSessions(prev => [newSession, ...prev])
    setIsActive(false)
    setStartTime(null)
    setElapsedTime(0)

    // Celebration effect
    if (vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate([200, 100, 200])
    }
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = () => {
    return Math.min((currentCount / selectedDhikr.target) * 100, 100)
  }

  const getTotalSessions = () => {
    return sessions.length
  }

  const getTotalDhikr = () => {
    return sessions.reduce((total, session) => total + session.current, 0)
  }

  const getAverageTime = () => {
    const completedSessions = sessions.filter(s => s.completed && s.duration)
    if (completedSessions.length === 0) return 0
    const totalTime = completedSessions.reduce((total, session) => total + (session.duration || 0), 0)
    return totalTime / completedSessions.length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4">
            Digital Tasbih
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Count your dhikr with our digital tasbih. Track your spiritual journey and build consistent habits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tasbih Counter */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CircleDotIcon className="h-6 w-6" />
                  Digital Tasbih
                </CardTitle>
                <CardDescription>
                  Select a dhikr and start counting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Dhikr Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dhikrTypes.map((dhikr) => (
                      <Button
                        key={dhikr.id}
                        variant={selectedDhikr.id === dhikr.id ? "islamic" : "outline"}
                        className="h-auto p-4 text-left"
                        onClick={() => {
                          setSelectedDhikr(dhikr)
                          resetSession()
                        }}
                      >
                        <div>
                          <div className="font-semibold">{dhikr.name}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {dhikr.transliteration}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Target: {dhikr.target}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>

                  {/* Counter Display */}
                  <div className="text-center space-y-4">
                    <div className="text-6xl font-bold text-primary mb-4">
                      {currentCount}
                    </div>
                    
                    <div className="text-lg text-muted-foreground">
                      {selectedDhikr.arabic}
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      {selectedDhikr.translation}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-primary to-gold-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage()}%` }}
                      ></div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      {currentCount} / {selectedDhikr.target} ({getProgressPercentage().toFixed(1)}%)
                    </div>
                  </div>

                  {/* Timer */}
                  {isActive && (
                    <div className="text-center">
                      <div className="text-2xl font-mono text-primary">
                        {formatTime(elapsedTime)}
                      </div>
                      <div className="text-sm text-muted-foreground">Elapsed Time</div>
                    </div>
                  )}

                  {/* Control Buttons */}
                  <div className="flex justify-center gap-4">
                    {!isActive ? (
                      <Button
                        size="lg"
                        variant="islamic"
                        onClick={startSession}
                        className="px-8 py-4"
                      >
                        <PlayIcon className="h-5 w-5 mr-2" />
                        Start Dhikr
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={pauseSession}
                        className="px-8 py-4"
                      >
                        <PauseIcon className="h-5 w-5 mr-2" />
                        Pause
                      </Button>
                    )}
                    
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={resetSession}
                      className="px-8 py-4"
                    >
                      <RotateCcwIcon className="h-5 w-5 mr-2" />
                      Reset
                    </Button>
                  </div>

                  {/* Count Button */}
                  <div className="text-center">
                    <Button
                      size="lg"
                      variant="islamic"
                      onClick={handleCount}
                      disabled={!isActive}
                      className="w-32 h-32 rounded-full text-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                    >
                      {currentCount}
                    </Button>
                    <div className="text-sm text-muted-foreground mt-2">
                      Tap to count
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrophyIcon className="h-6 w-6" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Sessions</span>
                    <span className="font-bold text-primary">{getTotalSessions()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Dhikr</span>
                    <span className="font-bold text-primary">{getTotalDhikr()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Avg. Time</span>
                    <span className="font-bold text-primary">
                      {formatTime(getAverageTime())}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-6 w-6" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Vibration</span>
                    <Button
                      variant={vibrationEnabled ? "islamic" : "outline"}
                      size="sm"
                      onClick={() => setVibrationEnabled(!vibrationEnabled)}
                    >
                      {vibrationEnabled ? "On" : "Off"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sound</span>
                    <Button
                      variant={soundEnabled ? "islamic" : "outline"}
                      size="sm"
                      onClick={() => setSoundEnabled(!soundEnabled)}
                    >
                      {soundEnabled ? "On" : "Off"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            {sessions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClockIcon className="h-6 w-6" />
                    Recent Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sessions.slice(0, 5).map((session) => (
                      <div key={session.id} className="flex justify-between items-center p-2 bg-primary/5 rounded">
                        <div>
                          <div className="font-medium text-sm">{session.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {session.current}/{session.target}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-primary">
                            {session.completed ? '✓' : '○'}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {session.duration ? formatTime(session.duration) : '--'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
