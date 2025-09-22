'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ClockIcon, 
  MapPinIcon, 
  SunIcon, 
  MoonIcon,
  CloudIcon,
  SettingsIcon,
  RefreshCwIcon,
  CalendarIcon,
  StarIcon
} from 'lucide-react'
import { formatTime, formatDate, getNextPrayerTime } from '@/lib/utils'
import { PrayerTime, Location } from '@/types'

// Mock prayer times API
const getPrayerTimes = async (location: Location): Promise<PrayerTime> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const baseTimes = {
    fajr: '05:30',
    dhuhr: '12:15',
    asr: '15:45',
    maghrib: '18:20',
    isha: '19:45'
  }
  
  const latVariation = Math.sin(location.latitude * Math.PI / 180) * 30
  const lngVariation = Math.sin(location.longitude * Math.PI / 180) * 15
  
  return {
    fajr: adjustTime(baseTimes.fajr, latVariation + lngVariation),
    dhuhr: adjustTime(baseTimes.dhuhr, lngVariation),
    asr: adjustTime(baseTimes.asr, latVariation),
    maghrib: adjustTime(baseTimes.maghrib, -latVariation + lngVariation),
    isha: adjustTime(baseTimes.isha, -latVariation - lngVariation)
  }
}

const adjustTime = (time: string, minutes: number): string => {
  const [hours, mins] = time.split(':').map(Number)
  const totalMinutes = hours * 60 + mins + Math.round(minutes)
  const newHours = Math.floor(totalMinutes / 60) % 24
  const newMins = totalMinutes % 60
  return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`
}

const prayerNames = {
  fajr: 'Fajr',
  dhuhr: 'Dhuhr',
  asr: 'Asr',
  maghrib: 'Maghrib',
  isha: 'Isha'
}

const prayerIcons = {
  fajr: SunIcon,
  dhuhr: SunIcon,
  asr: SunIcon,
  maghrib: MoonIcon,
  isha: MoonIcon
}

const prayerColors = {
  fajr: 'from-blue-500 to-blue-600',
  dhuhr: 'from-yellow-500 to-orange-500',
  asr: 'from-orange-500 to-red-500',
  maghrib: 'from-red-500 to-pink-500',
  isha: 'from-purple-500 to-indigo-500'
}

export default function PrayerTimesPage() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime | null>(null)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [location, setLocation] = useState<Location | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            city: 'Current Location',
            country: 'Unknown'
          }
          setLocation(newLocation)
          loadPrayerTimes(newLocation)
        },
        () => {
          // Fallback to default location
          const defaultLocation = {
            latitude: 51.5074,
            longitude: -0.1278,
            city: 'London',
            country: 'UK'
          }
          setLocation(defaultLocation)
          loadPrayerTimes(defaultLocation)
        }
      )
    } else {
      const defaultLocation = {
        latitude: 51.5074,
        longitude: -0.1278,
        city: 'London',
        country: 'UK'
      }
      setLocation(defaultLocation)
      loadPrayerTimes(defaultLocation)
    }

    return () => clearInterval(timer)
  }, [])

  const loadPrayerTimes = async (loc: Location) => {
    try {
      setIsLoading(true)
      const times = await getPrayerTimes(loc)
      setPrayerTimes(times)
    } catch (error) {
      console.error('Error loading prayer times:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    if (location) {
      loadPrayerTimes(location)
    }
  }

  const nextPrayer = prayerTimes ? getNextPrayerTime(prayerTimes as unknown as Record<string, string>) : null

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-4">
      <div className="container mx-auto px-3">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary mb-2">Prayer Times</h1>
          {location && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPinIcon className="h-4 w-4" />
              <span>{location.city}, {location.country}</span>
            </div>
          )}
        </div>

        {/* Current Time & Next Prayer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Current Time */}
          <Card className="muslim-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-primary text-base">
                <ClockIcon className="h-4 w-4" />
                Current Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary mb-1">
                {currentTime ? currentTime.toLocaleTimeString() : '--:--:--'}
              </div>
              <div className="text-muted-foreground text-sm">
                {currentTime ? formatDate(currentTime) : 'Loading...'}
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
              <div className="text-2xl font-bold text-primary mb-1">
                {nextPrayer ? nextPrayer.name : '--'}
              </div>
              <div className="text-muted-foreground text-sm">
                {nextPrayer ? nextPrayer.time : 'Loading...'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prayer Times Grid */}
        {isLoading ? (
          <Card className="muslim-card">
            <CardContent className="py-12">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading prayer times...</p>
              </div>
            </CardContent>
          </Card>
        ) : prayerTimes ? (
          <div className="space-y-3">
            {Object.entries(prayerTimes).map(([key, time]) => {
              const Icon = prayerIcons[key as keyof typeof prayerIcons]
              const name = prayerNames[key as keyof typeof prayerNames]
              const color = prayerColors[key as keyof typeof prayerColors]
              const isNext = nextPrayer?.name === name
              
              return (
                <Card key={key} className={`muslim-card ${isNext ? 'ring-2 ring-primary/50 bg-primary/5' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {key === 'fajr' ? 'Dawn' : 
                             key === 'dhuhr' ? 'Midday' :
                             key === 'asr' ? 'Afternoon' :
                             key === 'maghrib' ? 'Sunset' : 'Night'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">{time}</div>
                        {isNext && (
                          <div className="text-xs text-primary font-medium">Next</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="muslim-card">
            <CardContent className="py-12">
              <div className="text-center">
                <CloudIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Unable to load prayer times</p>
                <Button onClick={handleRefresh} variant="outline">
                  <RefreshCwIcon className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="mt-6 flex gap-3 justify-center">
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <SettingsIcon className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
