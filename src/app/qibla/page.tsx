'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  CompassIcon, 
  MapPinIcon, 
  NavigationIcon,
  RefreshCwIcon,
  TargetIcon,
  GlobeIcon,
  ArrowUpIcon
} from 'lucide-react'

interface Location {
  latitude: number
  longitude: number
  city: string
  country: string
}

interface QiblaInfo {
  direction: number
  distance: number
  bearing: number
}

// Kaaba coordinates
const KAABA_LAT = 21.4225
const KAABA_LNG = 39.8262

// Calculate Qibla direction
const calculateQibla = (lat: number, lng: number): QiblaInfo => {
  const lat1 = (lat * Math.PI) / 180
  const lat2 = (KAABA_LAT * Math.PI) / 180
  const deltaLng = ((KAABA_LNG - lng) * Math.PI) / 180

  const y = Math.sin(deltaLng) * Math.cos(lat2)
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng)

  let bearing = Math.atan2(y, x)
  bearing = (bearing * 180) / Math.PI
  bearing = (bearing + 360) % 360

  // Calculate distance to Kaaba
  const R = 6371 // Earth's radius in kilometers
  const dLat = (KAABA_LAT - lat) * Math.PI / 180
  const dLng = (KAABA_LNG - lng) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat * Math.PI / 180) * Math.cos(KAABA_LAT * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  const distance = R * c

  return {
    direction: bearing,
    distance: distance,
    bearing: bearing
  }
}

export default function QiblaPage() {
  const [location, setLocation] = useState<Location | null>(null)
  const [qiblaInfo, setQiblaInfo] = useState<QiblaInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [compassRotation, setCompassRotation] = useState(0)
  const [deviceOrientation, setDeviceOrientation] = useState<number | null>(null)
  const compassRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Listen for device orientation changes
    const handleOrientationChange = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setDeviceOrientation(event.alpha)
      }
    }

    window.addEventListener('deviceorientation', handleOrientationChange)
    return () => window.removeEventListener('deviceorientation', handleOrientationChange)
  }, [])

  useEffect(() => {
    if (qiblaInfo && deviceOrientation !== null) {
      // Calculate the rotation needed for the compass
      const rotation = (qiblaInfo.direction - deviceOrientation + 360) % 360
      setCompassRotation(rotation)
    }
  }, [qiblaInfo, deviceOrientation])

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
      const qibla = calculateQibla(newLocation.latitude, newLocation.longitude)
      setQiblaInfo(qibla)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location')
    } finally {
      setLoading(false)
    }
  }

  const refreshLocation = async () => {
    if (location) {
      setLoading(true)
      try {
        const qibla = calculateQibla(location.latitude, location.longitude)
        setQiblaInfo(qibla)
      } catch (err) {
        setError('Failed to refresh location')
      } finally {
        setLoading(false)
      }
    }
  }

  const getDirectionText = (bearing: number): string => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    const index = Math.round(bearing / 22.5) % 16
    return directions[index]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4">
            Qibla Compass
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the direction of the Kaaba from anywhere in the world. Point your device towards the Qibla.
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
                      Get your location to find the Qibla direction
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

        {/* Qibla Compass */}
        {qiblaInfo && (
          <div className="mb-8">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CompassIcon className="h-6 w-6" />
                  Qibla Direction
                </CardTitle>
                <CardDescription>
                  Point your device towards the direction shown below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6">
                  {/* Compass */}
                  <div className="relative w-64 h-64 mx-auto">
                    <div 
                      ref={compassRef}
                      className="absolute inset-0 rounded-full border-4 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10"
                      style={{
                        transform: `rotate(${compassRotation}deg)`,
                        transition: 'transform 0.3s ease-out'
                      }}
                    >
                      {/* Compass needle */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-primary"></div>
                      
                      {/* Direction markers */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-primary font-bold text-sm">N</div>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-primary font-bold text-sm">S</div>
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary font-bold text-sm">W</div>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary font-bold text-sm">E</div>
                      
                      {/* Qibla indicator */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Center dot */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"></div>
                  </div>

                  {/* Direction Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {qiblaInfo.direction.toFixed(1)}°
                      </div>
                      <div className="text-sm text-muted-foreground">Direction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {getDirectionText(qiblaInfo.direction)}
                      </div>
                      <div className="text-sm text-muted-foreground">Bearing</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {qiblaInfo.distance.toFixed(0)} km
                      </div>
                      <div className="text-sm text-muted-foreground">Distance to Kaaba</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <NavigationIcon className="h-6 w-6" />
                How to Use
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <div>Allow location access when prompted</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <div>Hold your device flat and level</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <div>Rotate until the needle points to the red dot</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">4</div>
                  <div>You're now facing the Qibla direction</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TargetIcon className="h-6 w-6" />
                About Qibla
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p>
                  The Qibla is the direction Muslims face during prayer, pointing towards the Kaaba in Mecca, Saudi Arabia.
                </p>
                <p>
                  This compass uses your device's GPS location and orientation sensors to calculate the exact direction.
                </p>
                <p>
                  The distance shown is the straight-line distance from your location to the Kaaba.
                </p>
                <div className="flex items-center gap-2 text-primary">
                  <GlobeIcon className="h-4 w-4" />
                  <span className="font-medium">Kaaba Coordinates: 21.4225°N, 39.8262°E</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
