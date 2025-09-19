'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  UsersIcon, 
  ClockIcon,
  StarIcon,
  HeartIcon,
  BookOpenIcon,
  PlayIcon,
  PauseIcon,
  RotateCcwIcon,
  CheckCircleIcon,
  CalendarIcon,
  SunIcon,
  MoonIcon
} from 'lucide-react'

interface ZikrJumma {
  id: string
  name: string
  arabic: string
  transliteration: string
  translation: string
  count: number
  current: number
  isCompleted: boolean
  category: string
  benefits: string[]
  timeOfDay: 'morning' | 'evening' | 'anytime'
}

const zikrJummaList: ZikrJumma[] = [
  {
    id: '1',
    name: 'Durood Sharif',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
    transliteration: 'Allahumma salli ala Muhammadin wa ala ali Muhammad',
    translation: 'O Allah, send blessings upon Muhammad and the family of Muhammad',
    count: 100,
    current: 0,
    isCompleted: false,
    category: 'Blessings',
    benefits: ['Intercession on Day of Judgment', 'Increase in blessings', 'Love of Prophet'],
    timeOfDay: 'anytime'
  },
  {
    id: '2',
    name: 'Istighfar',
    arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ',
    transliteration: 'Astaghfirullahal azeem',
    translation: 'I seek forgiveness from Allah the Great',
    count: 100,
    current: 0,
    isCompleted: false,
    category: 'Forgiveness',
    benefits: ['Forgiveness of sins', 'Purification of soul', 'Divine mercy'],
    timeOfDay: 'anytime'
  },
  {
    id: '3',
    name: 'Subhan Allah',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'Subhan Allah',
    translation: 'Glory be to Allah',
    count: 100,
    current: 0,
    isCompleted: false,
    category: 'Praise',
    benefits: ['Purification of heart', 'Protection from evil', 'Increase in sustenance'],
    timeOfDay: 'anytime'
  },
  {
    id: '4',
    name: 'Alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    translation: 'Praise be to Allah',
    count: 100,
    current: 0,
    isCompleted: false,
    category: 'Praise',
    benefits: ['Gratitude to Allah', 'Increase in blessings', 'Protection from arrogance'],
    timeOfDay: 'anytime'
  },
  {
    id: '5',
    name: 'Allahu Akbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    translation: 'Allah is the Greatest',
    count: 100,
    current: 0,
    isCompleted: false,
    category: 'Praise',
    benefits: ['Recognition of Allah\'s greatness', 'Protection from shaitan', 'Increase in faith'],
    timeOfDay: 'anytime'
  },
  {
    id: '6',
    name: 'La Ilaha Illa Allah',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
    transliteration: 'La ilaha illa Allah',
    translation: 'There is no god but Allah',
    count: 100,
    current: 0,
    isCompleted: false,
    category: 'Tawheed',
    benefits: ['Declaration of faith', 'Protection from shirk', 'Foundation of Islam'],
    timeOfDay: 'anytime'
  },
  {
    id: '7',
    name: 'Ayatul Kursi',
    arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
    transliteration: 'Allahu la ilaha illa huwa al-hayyul qayyum',
    translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer',
    count: 7,
    current: 0,
    isCompleted: false,
    category: 'Protection',
    benefits: ['Protection from shaitan', 'Blessings in home', 'Divine protection'],
    timeOfDay: 'anytime'
  },
  {
    id: '8',
    name: 'Surah Al-Ikhlas',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
    transliteration: 'Qul huwa Allahu ahad',
    translation: 'Say, He is Allah, [who is] One',
    count: 3,
    current: 0,
    isCompleted: false,
    category: 'Quran',
    benefits: ['Equivalent to one-third of Quran', 'Protection from evil', 'Increase in faith'],
    timeOfDay: 'anytime'
  }
]

const categories = ['All', 'Blessings', 'Forgiveness', 'Praise', 'Tawheed', 'Protection', 'Quran']

export default function ZikrJummaPage() {
  const [zikrList, setZikrList] = useState<ZikrJumma[]>(zikrJummaList)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentZikr, setCurrentZikr] = useState<ZikrJumma | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [completedToday, setCompletedToday] = useState<string[]>([])
  const [totalCompleted, setTotalCompleted] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)

  // Load data from localStorage
  useEffect(() => {
    const savedZikr = localStorage.getItem('zikr-jumma')
    const savedCompleted = localStorage.getItem('zikr-jumma-completed')
    const savedTotal = localStorage.getItem('zikr-jumma-total')
    const savedStreak = localStorage.getItem('zikr-jumma-streak')
    
    if (savedZikr) {
      setZikrList(JSON.parse(savedZikr))
    }
    if (savedCompleted) {
      setCompletedToday(JSON.parse(savedCompleted))
    }
    if (savedTotal) {
      setTotalCompleted(parseInt(savedTotal))
    }
    if (savedStreak) {
      setCurrentStreak(parseInt(savedStreak))
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('zikr-jumma', JSON.stringify(zikrList))
  }, [zikrList])

  useEffect(() => {
    localStorage.setItem('zikr-jumma-completed', JSON.stringify(completedToday))
  }, [completedToday])

  useEffect(() => {
    localStorage.setItem('zikr-jumma-total', totalCompleted.toString())
  }, [totalCompleted])

  useEffect(() => {
    localStorage.setItem('zikr-jumma-streak', currentStreak.toString())
  }, [currentStreak])

  // Reset daily progress at midnight
  useEffect(() => {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime()
    
    const timer = setTimeout(() => {
      resetDailyProgress()
    }, timeUntilMidnight)

    return () => clearTimeout(timer)
  }, [])

  const resetDailyProgress = () => {
    setZikrList(prevZikr => 
      prevZikr.map(zikr => ({ ...zikr, current: 0, isCompleted: false }))
    )
    setCompletedToday([])
  }

  const filteredZikr = zikrList.filter(zikr => 
    selectedCategory === 'All' || zikr.category === selectedCategory
  )

  const startZikr = (zikr: ZikrJumma) => {
    setCurrentZikr(zikr)
    setIsActive(true)
  }

  const incrementZikr = () => {
    if (currentZikr && currentZikr.current < currentZikr.count) {
      const newCurrent = currentZikr.current + 1
      const isCompleted = newCurrent >= currentZikr.count
      
      setZikrList(prevZikr => 
        prevZikr.map(zikr => 
          zikr.id === currentZikr.id 
            ? { ...zikr, current: newCurrent, isCompleted }
            : zikr
        )
      )
      
      if (isCompleted && !completedToday.includes(currentZikr.id)) {
        setCompletedToday([...completedToday, currentZikr.id])
        setTotalCompleted(prev => prev + 1)
      }
      
      if (isCompleted) {
        setCurrentZikr(null)
        setIsActive(false)
      }
    }
  }

  const pauseZikr = () => {
    setIsActive(false)
  }

  const resetZikr = () => {
    if (currentZikr) {
      setZikrList(prevZikr => 
        prevZikr.map(zikr => 
          zikr.id === currentZikr.id 
            ? { ...zikr, current: 0, isCompleted: false }
            : zikr
        )
      )
    }
    setCurrentZikr(null)
    setIsActive(false)
  }

  const getProgressPercentage = (zikr: ZikrJumma) => {
    return (zikr.current / zikr.count) * 100
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
            Zikr Jumma
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Special Friday prayers and dhikr to strengthen your spiritual connection
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{completedToday.length}</div>
              <div className="text-muted-foreground">Completed Today</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{totalCompleted}</div>
              <div className="text-muted-foreground">Total Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{currentStreak}</div>
              <div className="text-muted-foreground">Current Streak</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{zikrList.length}</div>
              <div className="text-muted-foreground">Total Zikr</div>
            </CardContent>
          </Card>
        </div>

        {/* Current Zikr */}
        {currentZikr && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartIcon className="h-6 w-6" />
                Current Zikr: {currentZikr.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {currentZikr.current} / {currentZikr.count}
                  </div>
                  <div className="text-lg text-muted-foreground mb-4">
                    {currentZikr.arabic}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentZikr.transliteration}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-primary to-gold-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage(currentZikr)}%` }}
                  ></div>
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center gap-4">
                  {isActive ? (
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={pauseZikr}
                      className="px-8 py-4"
                    >
                      <PauseIcon className="h-5 w-5 mr-2" />
                      Pause
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      variant="islamic"
                      onClick={incrementZikr}
                      className="px-8 py-4"
                    >
                      <PlayIcon className="h-5 w-5 mr-2" />
                      Continue
                    </Button>
                  )}
                  
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={resetZikr}
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

        {/* Zikr List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredZikr.map((zikr) => {
            const isCompletedToday = completedToday.includes(zikr.id)
            const progress = getProgressPercentage(zikr)
            
            return (
              <Card key={zikr.id} className="relative hover:shadow-md transition-shadow">
                {isCompletedToday && (
                  <div className="absolute top-2 right-2">
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HeartIcon className="h-5 w-5" />
                    {zikr.name}
                  </CardTitle>
                  <CardDescription>{zikr.category}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Arabic Text */}
                    <div className="text-right text-lg font-arabic text-primary">
                      {zikr.arabic}
                    </div>
                    
                    {/* Transliteration */}
                    <div className="text-center text-sm text-muted-foreground italic">
                      {zikr.transliteration}
                    </div>
                    
                    {/* Translation */}
                    <div className="text-center text-sm">
                      {zikr.translation}
                    </div>

                    {/* Time of Day */}
                    <div className={`flex items-center gap-2 text-sm ${getTimeOfDayColor(zikr.timeOfDay)}`}>
                      {getTimeOfDayIcon(zikr.timeOfDay)}
                      <span className="capitalize">{zikr.timeOfDay}</span>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{zikr.current}/{zikr.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-gold-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-muted-foreground">Benefits:</div>
                      {zikr.benefits.slice(0, 2).map((benefit, index) => (
                        <div key={index} className="text-xs text-muted-foreground">
                          • {benefit}
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button
                      variant={zikr.isCompleted ? "outline" : "islamic"}
                      size="sm"
                      onClick={() => startZikr(zikr)}
                      disabled={isActive && currentZikr?.id !== zikr.id}
                      className="w-full"
                    >
                      {zikr.isCompleted ? 'Completed' : 'Start Zikr'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Friday Special Message */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-primary/10 to-gold-500/10 border-primary/20">
            <CardContent className="text-center p-8">
              <UsersIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-4">
                Friday - The Best Day of the Week
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Friday is a special day in Islam. It's the day when Allah created Adam (AS) and the day when the Hour will be established. 
                Make the most of this blessed day by engaging in extra dhikr, prayers, and good deeds.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
