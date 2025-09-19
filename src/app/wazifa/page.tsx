'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  StarIcon, 
  ClockIcon,
  CheckCircleIcon,
  CircleIcon,
  CalendarIcon,
  TargetIcon,
  BookOpenIcon,
  HeartIcon,
  SunIcon,
  MoonIcon,
  RotateCcwIcon,
  SettingsIcon
} from 'lucide-react'

interface Wazifa {
  id: string
  name: string
  description: string
  arabic: string
  transliteration: string
  translation: string
  count: number
  timeOfDay: 'morning' | 'evening' | 'anytime'
  category: string
  benefits: string[]
  isCompleted: boolean
  completedAt?: Date
}

const wazifas: Wazifa[] = [
  {
    id: '1',
    name: 'Morning Wazifa',
    description: 'Start your day with this powerful morning wazifa',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ',
    transliteration: 'Subhan Allah wa bihamdihi, Subhan Allahil azeem',
    translation: 'Glory be to Allah and praise be to Him, Glory be to Allah the Great',
    count: 100,
    timeOfDay: 'morning',
    category: 'Daily',
    benefits: ['Purification of heart', 'Protection from evil', 'Increase in sustenance'],
    isCompleted: false
  },
  {
    id: '2',
    name: 'Evening Protection',
    description: 'Seek protection with this evening wazifa',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    transliteration: 'A\'udhu bi kalimatillahit tammati min sharri ma khalaq',
    translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created',
    count: 3,
    timeOfDay: 'evening',
    category: 'Protection',
    benefits: ['Protection from harm', 'Safety from evil eye', 'Divine protection'],
    isCompleted: false
  },
  {
    id: '3',
    name: 'Istighfar Wazifa',
    description: 'Seek forgiveness with this powerful istighfar',
    arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
    transliteration: 'Astaghfirullahal azeem alladhi la ilaha illa huwa al-hayyul qayyum',
    translation: 'I seek forgiveness from Allah the Great, there is no god but He, the Ever-Living, the Sustainer',
    count: 70,
    timeOfDay: 'anytime',
    category: 'Forgiveness',
    benefits: ['Forgiveness of sins', 'Purification of soul', 'Divine mercy'],
    isCompleted: false
  },
  {
    id: '4',
    name: 'Durood Sharif',
    description: 'Send blessings upon the Prophet (PBUH)',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
    transliteration: 'Allahumma salli ala Muhammadin wa ala ali Muhammad',
    translation: 'O Allah, send blessings upon Muhammad and the family of Muhammad',
    count: 100,
    timeOfDay: 'anytime',
    category: 'Blessings',
    benefits: ['Intercession on Day of Judgment', 'Increase in blessings', 'Love of Prophet'],
    isCompleted: false
  },
  {
    id: '5',
    name: 'Ayatul Kursi',
    description: 'Recite the Throne Verse for protection',
    arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
    transliteration: 'Allahu la ilaha illa huwa al-hayyul qayyum',
    translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer',
    count: 1,
    timeOfDay: 'anytime',
    category: 'Protection',
    benefits: ['Protection from shaitan', 'Blessings in home', 'Divine protection'],
    isCompleted: false
  },
  {
    id: '6',
    name: 'Surah Al-Fatiha',
    description: 'The opening chapter of the Quran',
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
    transliteration: 'Bismillahir rahmanir raheem',
    translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful',
    count: 7,
    timeOfDay: 'anytime',
    category: 'Quran',
    benefits: ['Healing', 'Blessings', 'Protection'],
    isCompleted: false
  }
]

const categories = ['All', 'Daily', 'Protection', 'Forgiveness', 'Blessings', 'Quran']

export default function WazifaPage() {
  const [selectedWazifas, setSelectedWazifas] = useState<Wazifa[]>([])
  const [currentWazifa, setCurrentWazifa] = useState<Wazifa | null>(null)
  const [currentCount, setCurrentCount] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [completedToday, setCompletedToday] = useState<string[]>([])
  const [streak, setStreak] = useState(0)

  // Load data from localStorage
  useEffect(() => {
    const savedSelected = localStorage.getItem('wazifa-selected')
    const savedCompleted = localStorage.getItem('wazifa-completed-today')
    const savedStreak = localStorage.getItem('wazifa-streak')
    
    if (savedSelected) {
      setSelectedWazifas(JSON.parse(savedSelected))
    }
    if (savedCompleted) {
      setCompletedToday(JSON.parse(savedCompleted))
    }
    if (savedStreak) {
      setStreak(parseInt(savedStreak))
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('wazifa-selected', JSON.stringify(selectedWazifas))
  }, [selectedWazifas])

  useEffect(() => {
    localStorage.setItem('wazifa-completed-today', JSON.stringify(completedToday))
  }, [completedToday])

  useEffect(() => {
    localStorage.setItem('wazifa-streak', streak.toString())
  }, [streak])

  const filteredWazifas = wazifas.filter(wazifa => 
    selectedCategory === 'All' || wazifa.category === selectedCategory
  )

  const addToSelected = (wazifa: Wazifa) => {
    if (!selectedWazifas.find(w => w.id === wazifa.id)) {
      setSelectedWazifas([...selectedWazifas, { ...wazifa, isCompleted: false }])
    }
  }

  const removeFromSelected = (wazifaId: string) => {
    setSelectedWazifas(selectedWazifas.filter(w => w.id !== wazifaId))
  }

  const startWazifa = (wazifa: Wazifa) => {
    setCurrentWazifa(wazifa)
    setCurrentCount(0)
    setIsActive(true)
  }

  const completeWazifa = () => {
    if (currentWazifa) {
      const updatedWazifas = selectedWazifas.map(w => 
        w.id === currentWazifa.id 
          ? { ...w, isCompleted: true, completedAt: new Date() }
          : w
      )
      setSelectedWazifas(updatedWazifas)
      
      if (!completedToday.includes(currentWazifa.id)) {
        setCompletedToday([...completedToday, currentWazifa.id])
      }
      
      setCurrentWazifa(null)
      setCurrentCount(0)
      setIsActive(false)
    }
  }

  const incrementCount = () => {
    if (currentWazifa && currentCount < currentWazifa.count) {
      setCurrentCount(currentCount + 1)
      
      if (currentCount + 1 >= currentWazifa.count) {
        completeWazifa()
      }
    }
  }

  const resetWazifa = () => {
    setCurrentWazifa(null)
    setCurrentCount(0)
    setIsActive(false)
  }

  const getProgressPercentage = () => {
    if (!currentWazifa) return 0
    return (currentCount / currentWazifa.count) * 100
  }

  const getTimeOfDayIcon = (timeOfDay: string) => {
    switch (timeOfDay) {
      case 'morning':
        return <SunIcon className="h-4 w-4" />
      case 'evening':
        return <MoonIcon className="h-4 w-4" />
      default:
        return <ClockIcon className="h-4 w-4" />
    }
  }

  const getTimeOfDayColor = (timeOfDay: string) => {
    switch (timeOfDay) {
      case 'morning':
        return 'text-yellow-500'
      case 'evening':
        return 'text-blue-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4">
            Wazifa
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Daily Islamic practices and routines to strengthen your faith and spiritual connection
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{streak}</div>
              <div className="text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{completedToday.length}</div>
              <div className="text-muted-foreground">Completed Today</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{selectedWazifas.length}</div>
              <div className="text-muted-foreground">Selected Wazifas</div>
            </CardContent>
          </Card>
        </div>

        {/* Current Wazifa */}
        {currentWazifa && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <StarIcon className="h-6 w-6" />
                Current Wazifa: {currentWazifa.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {currentCount} / {currentWazifa.count}
                  </div>
                  <div className="text-lg text-muted-foreground mb-4">
                    {currentWazifa.arabic}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentWazifa.transliteration}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-primary to-gold-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center gap-4">
                  <Button
                    size="lg"
                    variant="islamic"
                    onClick={incrementCount}
                    disabled={!isActive}
                    className="px-8 py-4"
                  >
                    Count
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={resetWazifa}
                    className="px-8 py-4"
                  >
                    <RotateCcwIcon className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "islamic" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Wazifas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWazifas.map((wazifa) => {
            const isSelected = selectedWazifas.find(w => w.id === wazifa.id)
            const isCompletedToday = completedToday.includes(wazifa.id)
            
            return (
              <Card key={wazifa.id} className="relative">
                {isCompletedToday && (
                  <div className="absolute top-2 right-2">
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <StarIcon className="h-5 w-5" />
                    {wazifa.name}
                  </CardTitle>
                  <CardDescription>{wazifa.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Arabic Text */}
                    <div className="text-right text-lg font-arabic text-primary">
                      {wazifa.arabic}
                    </div>
                    
                    {/* Transliteration */}
                    <div className="text-center text-sm text-muted-foreground italic">
                      {wazifa.transliteration}
                    </div>
                    
                    {/* Translation */}
                    <div className="text-center text-sm">
                      {wazifa.translation}
                    </div>

                    {/* Time of Day */}
                    <div className={`flex items-center gap-2 text-sm ${getTimeOfDayColor(wazifa.timeOfDay)}`}>
                      {getTimeOfDayIcon(wazifa.timeOfDay)}
                      <span className="capitalize">{wazifa.timeOfDay}</span>
                    </div>

                    {/* Count */}
                    <div className="text-center text-sm text-muted-foreground">
                      Count: {wazifa.count}
                    </div>

                    {/* Benefits */}
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-muted-foreground">Benefits:</div>
                      {wazifa.benefits.map((benefit, index) => (
                        <div key={index} className="text-xs text-muted-foreground">
                          • {benefit}
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {isSelected ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromSelected(wazifa.id)}
                          className="flex-1"
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addToSelected(wazifa)}
                          className="flex-1"
                        >
                          Add to List
                        </Button>
                      )}
                      
                      {isSelected && (
                        <Button
                          variant="islamic"
                          size="sm"
                          onClick={() => startWazifa(wazifa)}
                          disabled={isActive}
                          className="flex-1"
                        >
                          Start
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Selected Wazifas */}
        {selectedWazifas.length > 0 && (
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TargetIcon className="h-6 w-6" />
                  Your Selected Wazifas
                </CardTitle>
                <CardDescription>
                  Track your daily wazifa practice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedWazifas.map((wazifa) => (
                    <div key={wazifa.id} className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        {wazifa.isCompleted ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <CircleIcon className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div>
                          <div className="font-medium">{wazifa.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {wazifa.count} times • {wazifa.timeOfDay}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromSelected(wazifa.id)}
                        >
                          Remove
                        </Button>
                        <Button
                          variant="islamic"
                          size="sm"
                          onClick={() => startWazifa(wazifa)}
                          disabled={isActive}
                        >
                          Start
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
