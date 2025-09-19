'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ClockIcon, 
  CompassIcon, 
  HeartIcon, 
  BookOpenIcon,
  CircleDotIcon,
  StarIcon,
  CalendarIcon,
  UsersIcon,
  BookmarkIcon,
  GraduationCapIcon,
  MessageCircleIcon,
  MapPinIcon,
  VideoIcon,
  BotIcon,
  SettingsIcon,
  SunIcon,
  MoonIcon,
  CloudIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
  ShieldIcon
} from 'lucide-react'
import { formatTime, formatDate, getNextPrayerTime } from '@/lib/utils'
import { PrayerTime } from '@/types'
import { IslamicBackground } from '@/components/ui/islamic-background'
import { IslamicCalendar } from '@/components/ui/islamic-calendar'
import { ReviewsSection } from '@/components/ui/reviews-section'
import { LocationDisplay } from '@/components/ui/location-display'

// Mock prayer times data - in a real app, this would come from an API
const mockPrayerTimes: PrayerTime = {
  fajr: '05:30',
  dhuhr: '12:15',
  asr: '15:45',
  maghrib: '18:20',
  isha: '19:45'
}

const features = [
  {
    title: 'Prayer Times',
    description: 'Accurate prayer times based on your location',
    icon: ClockIcon,
    href: '/prayer-times',
    color: 'from-blue-500 to-blue-600',
    emoji: '🕐'
  },
  {
    title: 'Qibla Compass',
    description: 'Find the direction of the Kaaba from anywhere',
    icon: CompassIcon,
    href: '/qibla',
    color: 'from-green-500 to-green-600',
    emoji: '🧭'
  },
  {
    title: 'Duas & Supplications',
    description: 'Comprehensive collection of Islamic prayers',
    icon: HeartIcon,
    href: '/duas',
    color: 'from-pink-500 to-pink-600',
    emoji: '🤲'
  },
  {
    title: 'Quran Reader',
    description: 'Read the Holy Quran with translations',
    icon: BookOpenIcon,
    href: '/quran',
    color: 'from-purple-500 to-purple-600',
    emoji: '📖'
  },
  {
    title: 'Digital Tasbih',
    description: 'Count your dhikr with our digital tasbih',
    icon: CircleDotIcon,
    href: '/tasbih',
    color: 'from-amber-500 to-amber-600',
    emoji: '📿'
  },
  {
    title: 'Wazifa',
    description: 'Daily Islamic practices and routines',
    icon: StarIcon,
    href: '/wazifa',
    color: 'from-yellow-500 to-yellow-600',
    emoji: '⭐'
  },
  {
    title: 'Lazim Tracker',
    description: 'Track your daily Islamic commitments',
    icon: CalendarIcon,
    href: '/lazim',
    color: 'from-indigo-500 to-indigo-600',
    emoji: '🕐'
  },
  {
    title: 'Zikr Jumma',
    description: 'Special Friday prayers and dhikr',
    icon: UsersIcon,
    href: '/zikr-jumma',
    color: 'from-teal-500 to-teal-600',
    emoji: '🕌'
  },
  {
    title: 'Islamic Journal',
    description: 'Reflect on your spiritual journey',
    icon: BookmarkIcon,
    href: '/journal',
    color: 'from-orange-500 to-orange-600',
    emoji: '📔'
  },
  {
    title: 'Scholars',
    description: 'Learn from Islamic scholars and teachers',
    icon: GraduationCapIcon,
    href: '/scholars',
    color: 'from-red-500 to-red-600',
    emoji: '👨‍🏫'
  },
  {
    title: 'Community',
    description: 'Connect with fellow Muslims worldwide',
    icon: MessageCircleIcon,
    href: '/community',
    color: 'from-cyan-500 to-cyan-600',
    emoji: '👥'
  },
  {
    title: 'Mosque Locator',
    description: 'Find nearby mosques and prayer facilities',
    icon: MapPinIcon,
    href: '/mosques',
    color: 'from-emerald-500 to-emerald-600',
    emoji: '🕌'
  },
  {
    title: 'Makkah Live',
    description: 'Watch live streams from the Holy Kaaba',
    icon: VideoIcon,
    href: '/makkah-live',
    color: 'from-rose-500 to-rose-600',
    emoji: '📺'
  },
  {
    title: 'AI Noor',
    description: 'Get Islamic guidance from our AI assistant',
    icon: BotIcon,
    href: '/ai-noor',
    color: 'from-violet-500 to-violet-600',
    emoji: '🤖'
  }
]

export default function Home() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; remaining: string } | null>(null)
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [loadingFeature, setLoadingFeature] = useState<string | null>(null)
  const router = useRouter()

  const handleFeatureClick = (feature: any) => {
    setLoadingFeature(feature.title)
    // Add a small delay to show loading state
    setTimeout(() => {
      router.push(feature.href)
      setLoadingFeature(null)
    }, 100)
  }

  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())
    
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Calculate next prayer time
    const next = getNextPrayerTime(mockPrayerTimes)
    setNextPrayer(next)

    // Check user authentication
    const userToken = localStorage.getItem('user-token')
    const userData = localStorage.getItem('user-data')
    const adminToken = localStorage.getItem('admin-token')
    const adminUser = localStorage.getItem('admin-user')

    if (userData) {
      setUser(JSON.parse(userData))
    }
    if (adminToken && adminUser) {
      setIsAdmin(true)
    }


    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user-token')
    localStorage.removeItem('user-data')
    localStorage.removeItem('admin-token')
    localStorage.removeItem('admin-user')
    setUser(null)
    setIsAdmin(false)
    window.location.reload()
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Islamic Background */}
      <IslamicBackground variant="default" />
      
      {/* Header */}
      <header className="relative bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-3 mobile-padding">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 islamic-gradient rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">🕌</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-primary font-display">Tijaniyah Muslim App</span>
              </div>
              <div className="block sm:hidden">
                <span className="text-lg font-bold text-primary font-display">Tijaniyah</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="hidden sm:block text-sm">
                      <div className="font-medium text-primary">{user.name}</div>
                    </div>
                  </div>
                  {isAdmin && (
                    <Link href="/admin/dashboard">
                      <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                        <ShieldIcon className="h-3 w-3" />
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" size="sm" onClick={handleLogout} className="text-xs px-2 py-1">
                    <LogOutIcon className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="outline" size="sm" className="text-xs px-3 py-1">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="islamic" size="sm" className="text-xs px-3 py-1">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Islamic Calendar - Right under location */}
      <section className="py-6 relative">
        <div className="container mx-auto px-4 mobile-padding">
          <div className="max-w-4xl mx-auto">
            <IslamicCalendar />
          </div>
        </div>
      </section>

      {/* Hero Section - Muslim Pro Inspired */}
      <section className="relative py-12 md:py-16">
        <div className="relative container mx-auto px-4 mobile-padding">
          <div className="max-w-6xl mx-auto">
            {/* Location Header */}
            <div className="flex items-center justify-center mb-6">
              <LocationDisplay variant="detailed" className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20" />
            </div>
            
            {/* Main Content */}
            <div className="text-center mb-8">
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-primary mb-4 animate-fade-in">
                <span className="block">Tijaniyah</span>
                <span className="block text-3xl sm:text-5xl md:text-6xl text-secondary/90">Muslim App</span>
            </h1>
              <div className="w-32 h-1 islamic-gradient mx-auto rounded-full mb-6"></div>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 animate-slide-up max-w-2xl mx-auto">
              Your comprehensive Islamic companion for prayer, reflection, and spiritual growth
            </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button size="lg" variant="islamic" className="text-lg px-8 py-4 islamic-glow shadow-xl">
                <span className="mr-2">🕌</span>
                Start Your Journey
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-primary/30 hover:bg-primary/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Current Time & Next Prayer - Muslim Pro Style */}
      <section className="py-8 relative">
        <div className="container mx-auto px-4 mobile-padding">
          <div className="max-w-4xl mx-auto">
            {/* Location Display */}
            <div className="mb-6">
              <LocationDisplay variant="compact" className="justify-center" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="muslim-card muslim-pro-glow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-primary text-lg">
                    <ClockIcon className="h-5 w-5" />
                  Current Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">
                    {mounted && currentTime ? currentTime.toLocaleTimeString() : '--:--:--'}
                </div>
                  <div className="text-muted-foreground text-sm">
                    {mounted && currentTime ? formatDate(currentTime) : 'Loading...'}
                </div>
              </CardContent>
            </Card>

            {nextPrayer && (
                <Card className="muslim-card muslim-pro-glow">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-secondary text-lg">
                      <SunIcon className="h-5 w-5" />
                    Next Prayer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl sm:text-4xl font-bold text-secondary mb-1">
                    {nextPrayer.name}
                  </div>
                    <div className="text-muted-foreground text-sm mb-1">
                    {formatTime(nextPrayer.time)}
                  </div>
                    <div className="text-xs text-muted-foreground/70">
                    In {nextPrayer.remaining}
                  </div>
                </CardContent>
              </Card>
            )}
            </div>

            {/* Today's Prayer Times - Right after Current Time & Next Prayer */}
            <div className="mt-8">
              <div className="text-center mb-6">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary mb-2">
                  Today's Prayer Times
                </h2>
                <p className="text-muted-foreground text-sm">
                  Stay connected with your daily prayers
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
                {Object.entries(mockPrayerTimes).map(([prayer, time], index) => (
                  <Card key={prayer} className="muslim-card card-hover text-center">
                    <CardContent className="p-4">
                      <div className="text-xs font-medium text-muted-foreground mb-2 capitalize">
                        {prayer}
                      </div>
                      <div className="text-xl font-bold text-primary mb-1">
                        {formatTime(time)}
                      </div>
                      <div className="w-8 h-1 bg-gradient-to-r from-primary/20 to-primary/60 mx-auto rounded-full"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-20 relative">
        <IslamicBackground variant="gradient" />
        <div className="container mx-auto px-4 mobile-padding">
          <div className="text-center mb-12 mobile-gap-4">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 mobile-text-xl">
              Islamic Features
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mobile-text-lg">
              Discover all the tools and resources you need for your spiritual journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mobile-grid-1">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title} 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  onClick={() => handleFeatureClick(feature)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleFeatureClick(feature)
                    }
                  }}
                >
                  <Card className={`muslim-card card-hover h-full ${loadingFeature === feature.title ? 'opacity-75' : ''}`}>
                  <CardHeader className="text-center p-4 mobile-padding">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {loadingFeature === feature.title ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                      ) : (
                        feature.emoji
                      )}
                    </div>
                    <CardTitle className="text-base sm:text-lg font-semibold group-hover:text-primary transition-colors mobile-text-lg">
                      {loadingFeature === feature.title ? 'Loading...' : feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 mobile-padding">
                    <CardDescription className="text-center text-xs sm:text-sm text-muted-foreground mobile-text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </section>


      {/* Reviews Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 mobile-padding">
          <div className="max-w-4xl mx-auto">
            <ReviewsSection 
              isLoggedIn={!!user} 
              userId={user?.id} 
              userName={user?.name} 
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 relative">
        <IslamicBackground variant="quran" />
        <div className="container mx-auto px-4 text-center mobile-padding">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary mb-6 mobile-text-xl">
              Join Our Community
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 mobile-text-lg">
              Connect with millions of Muslims worldwide and strengthen your faith together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mobile-gap-4">
              <Button size="lg" variant="islamic" className="text-lg px-8 py-4 islamic-glow mobile-text-lg">
                <span className="mr-2">🕌</span>
                Get Started Now
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 mobile-text-lg">
                Download App
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
