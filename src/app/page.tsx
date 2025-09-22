'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
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
  MessageCircleIcon,
  MapPinIcon,
  VideoIcon,
  BotIcon,
  HeartHandshakeIcon,
  UserIcon,
  LogInIcon,
  LogOutIcon,
  ShieldIcon,
  SunIcon,
  MoonIcon,
  GraduationCapIcon
} from 'lucide-react'
import { formatTime, formatDate, getNextPrayerTime } from '@/lib/utils'
import { PrayerTime } from '@/types'
import { IslamicBackground } from '@/components/ui/islamic-background'
import { IslamicCalendar } from '@/components/ui/islamic-calendar'
import { LocationDisplay } from '@/components/ui/location-display'

// Mock prayer times data
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
    bgColor: 'bg-blue-50 dark:bg-blue-950/20'
  },
  {
    title: 'Qibla Compass',
    description: 'Find the direction of the Kaaba from anywhere',
    icon: CompassIcon,
    href: '/qibla',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950/20'
  },
  {
    title: 'Duas & Supplications',
    description: 'Comprehensive collection of Islamic prayers',
    icon: HeartIcon,
    href: '/duas',
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50 dark:bg-pink-950/20'
  },
  {
    title: 'Quran Reader',
    description: 'Read the Holy Quran with translations',
    icon: BookOpenIcon,
    href: '/quran',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20'
  },
  {
    title: 'Digital Tasbih',
    description: 'Count your dhikr with our digital tasbih',
    icon: CircleDotIcon,
    href: '/tasbih',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20'
  },
  {
    title: 'Wazifa',
    description: 'Daily Islamic practices and routines',
    icon: StarIcon,
    href: '/wazifa',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/20'
  },
  {
    title: 'Lazim Tracker',
    description: 'Track your daily Islamic commitments',
    icon: CalendarIcon,
    href: '/lazim',
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/20'
  },
  {
    title: 'Zikr Jumma',
    description: 'Special Friday prayers and dhikr',
    icon: StarIcon,
    href: '/zikr-jumma',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50 dark:bg-amber-950/20'
  },
  {
    title: 'Islamic Journal',
    description: 'Reflect on your spiritual journey',
    icon: BookOpenIcon,
    href: '/journal',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/20'
  },
  {
    title: 'Scholars',
    description: 'Learn from Islamic scholars and teachers',
    icon: GraduationCapIcon,
    href: '/scholars',
    color: 'from-violet-500 to-violet-600',
    bgColor: 'bg-violet-50 dark:bg-violet-950/20'
  },
  {
    title: 'Community',
    description: 'Connect with fellow Muslims worldwide',
    icon: MessageCircleIcon,
    href: '/community',
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/20'
  },
  {
    title: 'Mosque Locator',
    description: 'Find nearby mosques and prayer facilities',
    icon: MapPinIcon,
    href: '/mosques',
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50 dark:bg-teal-950/20'
  },
  {
    title: 'Makkah Live',
    description: 'Watch live streams from the Holy Kaaba',
    icon: VideoIcon,
    href: '/makkah-live',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950/20'
  },
  {
    title: 'AI Noor',
    description: 'AI-powered Islamic assistant',
    icon: BotIcon,
    href: '/ai-noor',
    color: 'from-slate-500 to-slate-600',
    bgColor: 'bg-slate-50 dark:bg-slate-950/20'
  },
  {
    title: 'Donate',
    description: 'Support Islamic causes',
    icon: HeartHandshakeIcon,
    href: '/donate',
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50 dark:bg-rose-950/20',
    special: true
  }
]

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Check for user authentication
    const userToken = localStorage.getItem('user-token')
    const userData = localStorage.getItem('user-data')
    const adminToken = localStorage.getItem('admin-token')
    const adminUser = localStorage.getItem('admin-user')

    if (userToken && userData) {
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

  const nextPrayer = getNextPrayerTime(mockPrayerTimes as unknown as Record<string, string>)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Islamic Background */}
      <IslamicBackground variant="default" />
      
      {/* Hero Section */}
      <section className="relative py-8 sm:py-12">
        <div className="container mx-auto px-3">
          <div className="text-center">
            {/* Welcome Message */}
            {user && (
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <UserIcon className="h-4 w-4" />
                  Welcome back, {user.name}
                </div>
              </div>
            )}

            {/* Main Title */}
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-primary mb-2">
              Tijaniyah Muslim App
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4"></div>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-md mx-auto">
              Your comprehensive Islamic companion for prayer, reflection, and spiritual growth
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" variant="islamic" className="text-base px-6 py-3">
                <span className="mr-2">🕌</span>
                Start Your Journey
              </Button>
              {!user && (
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">
                    <LogInIcon className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Current Time & Next Prayer */}
      <section className="py-6">
        <div className="container mx-auto px-3">
          <div className="max-w-2xl mx-auto">
            {/* Location Display */}
            <div className="mb-4">
              <LocationDisplay variant="compact" className="justify-center" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Current Time */}
              <Card className="muslim-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-primary text-base">
                    <ClockIcon className="h-4 w-4" />
                    Current Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                    {mounted && currentTime ? currentTime.toLocaleTimeString() : '--:--:--'}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {mounted && currentTime ? formatDate(currentTime) : 'Loading...'}
                  </div>
                </CardContent>
              </Card>

              {/* Next Prayer */}
              <Card className="muslim-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-primary text-base">
                    <StarIcon className="h-4 w-4" />
                    Next Prayer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                    {nextPrayer?.name || '--'}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {nextPrayer?.time || 'Loading...'}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Islamic Calendar */}
      <section className="py-6">
        <div className="container mx-auto px-3">
          <div className="max-w-2xl mx-auto">
            <Card className="muslim-card">
              <CardHeader>
                <CardTitle className="text-center text-primary">Islamic Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <IslamicCalendar />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-6">
        <div className="container mx-auto px-3">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-primary mb-2">Features</h2>
            <p className="text-muted-foreground">Everything you need for your Islamic journey</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Link key={feature.title} href={feature.href}>
                  <Card className={`muslim-card hover:scale-105 transition-transform duration-200 ${feature.bgColor} ${feature.special ? 'ring-2 ring-primary/20' : ''}`}>
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm text-foreground mb-1">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* User Actions */}
      {user && (
        <section className="py-6">
          <div className="container mx-auto px-3">
            <div className="max-w-md mx-auto">
              <Card className="muslim-card">
                <CardHeader>
                  <CardTitle className="text-center text-primary">Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={handleLogout}>
                      <LogOutIcon className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                    {isAdmin && (
                      <Button variant="islamic" size="sm" asChild>
                        <Link href="/admin">
                          <ShieldIcon className="h-4 w-4 mr-2" />
                          Admin
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Footer Spacing */}
      <div className="h-20"></div>
    </div>
  )
}
