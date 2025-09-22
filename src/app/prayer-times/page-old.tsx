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
  CalendarIcon
} from 'lucide-react'
import { formatTime, formatDate, getNextPrayerTime } from '@/lib/utils'
import { PrayerTime, Location } from '@/types'

// Mock prayer times API - in a real app, this would call an actual API
const getPrayerTimes = async (location: Location): Promise<PrayerTime> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock prayer times based on location
  const baseTimes = {
    fajr: '05:30',
    dhuhr: '12:15',
    asr: '15:45',
    maghrib: '18:20',
    isha: '19:45'
  }
  
  // Add some variation based on location
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

const prayerDescriptions = {
  fajr: 'Dawn prayer - the first prayer of the day',
  dhuhr: 'Midday prayer - when the sun is at its highest',
  asr: 'Afternoon prayer - in the late afternoon',
  maghrib: 'Sunset prayer - just after sunset',
  isha: 'Night prayer - the last prayer of the day'
}

const prayerIcons = {
  fajr: MoonIcon,
  dhuhr: SunIcon,
  asr: CloudIcon,
  maghrib: SunIcon,
  isha: MoonIcon
}

export default function PrayerTimesPage() {
  const [location, setLocation] = useState<Location | null>(null)
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; remaining: string } | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (prayerTimes) {
      const next = getNextPrayerTime(prayerTimes as unknown as Record<string, string>)
      setNextPrayer(next)
    }
  }, [prayerTimes])

  const getCurrentLocation = async () => {
    setLoading(true)
    setError(null)

    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser')
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        })
      })

      const newLocation: Location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        city: 'Current Location', // In a real app, you'd reverse geocode this
        country: 'Unknown'
      }

      setLocation(newLocation)
      const times = await getPrayerTimes(newLocation)
      setPrayerTimes(times)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location')
    } finally {
      setLoading(false)
    }
  }

  const refreshPrayerTimes = async () => {
    if (location) {
      setLoading(true)
      try {
        const times = await getPrayerTimes(location)
        setPrayerTimes(times)
      } catch (err) {
        setError('Failed to refresh prayer times')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4">
            Prayer Times
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay connected with your daily prayers. Get accurate prayer times based on your location.
          </p>
        </div>

        {/* Location and Controls */}
        <div className="mb-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPinIcon className="h-6 w-6" />
                Location & Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {location ? (
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                    <div>
                      <div className="font-medium text-primary">{location.city}</div>
                      <div className="text-sm text-muted-foreground">
                        {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={getCurrentLocation}
                      disabled={loading}
                    >
                      <RefreshCwIcon className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                      Update
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPinIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Get prayer times for your current location
                    </p>
                    <Button
                      onClick={getCurrentLocation}
                      disabled={loading}
                      variant="islamic"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <RefreshCwIcon className="h-4 w-4 mr-2 animate-spin" />
                          Getting Location...
                        </>
                      ) : (
                        <>
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          Get My Location
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Time and Next Prayer */}
        {prayerTimes && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="prayer-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary-foreground">
                  <ClockIcon className="h-6 w-6" />
                  Current Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary-foreground mb-2">
                  {currentTime.toLocaleTimeString()}
                </div>
                <div className="text-primary-foreground/80">
                  {formatDate(currentTime)}
                </div>
              </CardContent>
            </Card>

            {nextPrayer && (
              <Card className="prayer-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary-foreground">
                    <SunIcon className="h-6 w-6" />
                    Next Prayer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary-foreground mb-2">
                    {nextPrayer.name}
                  </div>
                  <div className="text-primary-foreground/80 mb-2">
                    {formatTime(nextPrayer.time)}
                  </div>
                  <div className="text-sm text-primary-foreground/60">
                    In {nextPrayer.remaining}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Prayer Times Grid */}
        {prayerTimes && (
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="font-display text-3xl font-bold text-primary mb-2">
                Today's Prayer Times
              </h2>
              <p className="text-muted-foreground">
                {formatDate(currentTime)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {Object.entries(prayerTimes).map(([prayer, time]) => {
                const Icon = prayerIcons[prayer as keyof typeof prayerIcons]
                const isActive = nextPrayer?.name === prayerNames[prayer as keyof typeof prayerNames]
                
                return (
                  <Card 
                    key={prayer} 
                    className={`text-center transition-all duration-300 hover:shadow-lg ${
                      isActive ? 'ring-2 ring-primary shadow-lg scale-105' : ''
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                        isActive 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-primary/10 text-primary'
                      }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">
                        {prayerNames[prayer as keyof typeof prayerNames]}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary mb-2">
                        {formatTime(time)}
                      </div>
                      <CardDescription className="text-xs">
                        {prayerDescriptions[prayer as keyof typeof prayerDescriptions]}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-6 w-6" />
                Prayer Times Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Calculation Method:</span>
                  <span className="font-medium">Islamic Society of North America (ISNA)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Asr Method:</span>
                  <span className="font-medium">Hanafi</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">High Latitude:</span>
                  <span className="font-medium">Angle-based</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timezone:</span>
                  <span className="font-medium">Auto-detect</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-6 w-6" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={refreshPrayerTimes}
                  disabled={loading || !location}
                >
                  <RefreshCwIcon className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh Prayer Times
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  Prayer Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
