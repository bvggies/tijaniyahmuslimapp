'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  VideoIcon, 
  PlayIcon,
  PauseIcon,
  Volume2Icon,
  VolumeXIcon,
  MaximizeIcon,
  RefreshCwIcon,
  ClockIcon,
  GlobeIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  CalendarIcon,
  SunIcon,
  MoonIcon,
  UsersIcon
} from 'lucide-react'

interface LiveStream {
  id: string
  title: string
  description: string
  url: string
  thumbnail: string
  viewers: number
  isLive: boolean
  startTime: Date
  duration?: string
  quality: string[]
  currentQuality: string
}

interface PrayerTime {
  name: string
  time: string
  isNext: boolean
  isActive: boolean
}

const liveStreams: LiveStream[] = [
  {
    id: '1',
    title: 'Madina Live Tv Online 24/7 | بث مباشر || قناة السنة النبوية Madinah Live Today HD',
    description: 'Live broadcast from Madinah - 24/7 HD stream from the Prophet\'s Mosque',
    url: 'https://www.youtube.com/embed/TpT8b8JFZ6E?autoplay=1&mute=0&controls=1&showinfo=0&rel=0&modestbranding=1',
    thumbnail: 'https://img.youtube.com/vi/TpT8b8JFZ6E/maxresdefault.jpg',
    viewers: 98000,
    isLive: true,
    startTime: new Date('2024-01-20T18:20:00'),
    duration: '24/7',
    quality: ['720p', '1080p'],
    currentQuality: '1080p'
  }
]

const prayerTimes: PrayerTime[] = [
  { name: 'Fajr', time: '05:30', isNext: false, isActive: false },
  { name: 'Dhuhr', time: '12:15', isNext: true, isActive: false },
  { name: 'Asr', time: '15:45', isNext: false, isActive: false },
  { name: 'Maghrib', time: '18:20', isNext: false, isActive: false },
  { name: 'Isha', time: '19:45', isNext: false, isActive: false }
]

export default function MakkahLivePage() {
  const [selectedStream, setSelectedStream] = useState<LiveStream | null>(liveStreams[0])
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [favorites, setFavorites] = useState<string[]>([])
  const [streamKey, setStreamKey] = useState(0) // Force re-render of iframe

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('makkah-live-favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('makkah-live-favorites', JSON.stringify(favorites))
  }, [favorites])

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Auto-play when stream changes
  const handleStreamChange = (stream: LiveStream) => {
    setSelectedStream(stream)
    setStreamKey(prev => prev + 1) // Force iframe re-render for auto-play
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const toggleFavorite = (streamId: string) => {
    setFavorites(prev => 
      prev.includes(streamId) 
        ? prev.filter(id => id !== streamId)
        : [...prev, streamId]
    )
  }

  const shareStream = (stream: LiveStream) => {
    if (navigator.share) {
      navigator.share({
        title: stream.title,
        text: stream.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const formatViewers = (viewers: number) => {
    if (viewers >= 1000000) {
      return `${(viewers / 1000000).toFixed(1)}M`
    } else if (viewers >= 1000) {
      return `${(viewers / 1000).toFixed(1)}K`
    }
    return viewers.toString()
  }

  const getCurrentPrayer = () => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTimeMinutes = currentHour * 60 + currentMinute

    for (let i = 0; i < prayerTimes.length; i++) {
      const [hours, minutes] = prayerTimes[i].time.split(':').map(Number)
      const prayerTimeMinutes = hours * 60 + minutes

      if (currentTimeMinutes >= prayerTimeMinutes) {
        if (i === prayerTimes.length - 1 || currentTimeMinutes < prayerTimes[i + 1].time.split(':').map(Number).reduce((h, m) => h * 60 + m)) {
          return prayerTimes[i]
        }
      }
    }

    return prayerTimes[0] // Default to Fajr
  }

  const currentPrayer = getCurrentPrayer()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4">
            Makkah Live
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch live streams from the Holy Kaaba and Masjid al-Haram in Mecca
          </p>
        </div>

        {/* Current Prayer Time */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary/10 to-gold-500/10 border-primary/20">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Current Prayer Time in Mecca
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {prayerTimes.map((prayer) => (
                    <div
                      key={prayer.name}
                      className={`p-4 rounded-lg text-center transition-all ${
                        prayer.isActive
                          ? 'bg-primary text-primary-foreground'
                          : prayer.isNext
                          ? 'bg-gold-500/20 text-gold-600 border-2 border-gold-500'
                          : 'bg-primary/5 text-primary'
                      }`}
                    >
                      <div className="text-lg font-semibold">{prayer.name}</div>
                      <div className="text-2xl font-bold">{prayer.time}</div>
                      {prayer.isActive && (
                        <div className="text-sm mt-1">Now</div>
                      )}
                      {prayer.isNext && (
                        <div className="text-sm mt-1">Next</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <VideoIcon className="h-6 w-6" />
                    {selectedStream?.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => selectedStream && toggleFavorite(selectedStream.id)}
                    >
                      <BookmarkIcon 
                        className={`h-4 w-4 ${
                          selectedStream && favorites.includes(selectedStream.id) 
                            ? 'fill-yellow-500 text-yellow-500' 
                            : ''
                        }`} 
                      />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => selectedStream && shareStream(selectedStream)}
                    >
                      <ShareIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{selectedStream?.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="relative">
                  {/* YouTube Video Player */}
                  <div className="relative w-full h-64 md:h-96 bg-black rounded-lg overflow-hidden">
                    {selectedStream && (
                      <iframe
                        key={streamKey}
                        src={selectedStream.url}
                        title={selectedStream.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                      />
                    )}
                    
                    {/* Live Indicator */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        LIVE
                      </div>
                    </div>

                    {/* Viewers Count */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center gap-1 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        <UsersIcon className="h-4 w-4" />
                        {selectedStream && formatViewers(selectedStream.viewers)}
                      </div>
                    </div>

                    {/* Stream Quality Indicator */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {selectedStream?.currentQuality}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Streams List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GlobeIcon className="h-6 w-6" />
                  Live Streams
                </CardTitle>
                <CardDescription>
                  Select a stream to watch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {liveStreams.map((stream) => (
                    <div
                      key={stream.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-primary/5 ${
                        selectedStream?.id === stream.id ? 'bg-primary/10 border-2 border-primary' : 'border border-input'
                      }`}
                      onClick={() => handleStreamChange(stream)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-12 bg-black rounded overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <VideoIcon className="h-6 w-6 text-white opacity-50" />
                          </div>
                          {stream.isLive && (
                            <div className="absolute top-1 left-1">
                              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{stream.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <UsersIcon className="h-3 w-3" />
                            {formatViewers(stream.viewers)}
                            {stream.duration && (
                              <>
                                <span>•</span>
                                <span>{stream.duration}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prayer Times */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClockIcon className="h-6 w-6" />
                  Prayer Times
                </CardTitle>
                <CardDescription>
                  Current prayer times in Mecca
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {prayerTimes.map((prayer) => (
                    <div
                      key={prayer.name}
                      className={`flex items-center justify-between p-2 rounded ${
                        prayer.isActive
                          ? 'bg-primary text-primary-foreground'
                          : prayer.isNext
                          ? 'bg-gold-500/20 text-gold-600'
                          : 'hover:bg-primary/5'
                      }`}
                    >
                      <span className="font-medium">{prayer.name}</span>
                      <span className="text-sm">{prayer.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Favorites */}
            {favorites.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HeartIcon className="h-6 w-6 text-red-500" />
                    Favorites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {favorites.map(streamId => {
                      const stream = liveStreams.find(s => s.id === streamId)
                      if (!stream) return null
                      
                      return (
                        <div
                          key={streamId}
                          className="p-2 rounded hover:bg-primary/5 cursor-pointer"
                          onClick={() => handleStreamChange(stream)}
                        >
                          <div className="flex items-center gap-2">
                            <VideoIcon className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium truncate">{stream.title}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">About Makkah Live</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Watch live streams from the Holy Kaaba and Masjid al-Haram in Mecca, Saudi Arabia. 
                  Experience the spiritual atmosphere of the holiest site in Islam from anywhere in the world.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
