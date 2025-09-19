'use client'

import React, { useState, useEffect } from 'react'
import { MapPinIcon, LoaderIcon } from 'lucide-react'

interface LocationDisplayProps {
  className?: string
  showIcon?: boolean
  variant?: 'default' | 'compact' | 'detailed'
}

export function LocationDisplay({ 
  className = '', 
  showIcon = true, 
  variant = 'default' 
}: LocationDisplayProps) {
  const [location, setLocation] = useState<{ city: string; country: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if location is already cached
    const cachedLocation = localStorage.getItem('user-location')
    if (cachedLocation) {
      setLocation(JSON.parse(cachedLocation))
      setIsLoading(false)
      return
    }

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            )
            const data = await response.json()
            const locationData = {
              city: data.city || data.locality || 'Unknown',
              country: data.countryName || 'Unknown'
            }
            setLocation(locationData)
            localStorage.setItem('user-location', JSON.stringify(locationData))
          } catch (error) {
            console.error('Error fetching location:', error)
            setLocation({ city: 'Unknown', country: 'Unknown' })
          }
          setIsLoading(false)
        },
        (error) => {
          console.error('Error getting location:', error)
          setLocation({ city: 'Unknown', country: 'Unknown' })
          setIsLoading(false)
        },
        { timeout: 10000, enableHighAccuracy: false }
      )
    } else {
      setLocation({ city: 'Unknown', country: 'Unknown' })
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 text-muted-foreground ${className}`}>
        {showIcon && <LoaderIcon className="h-4 w-4 animate-spin" />}
        <span className="text-sm">Detecting location...</span>
      </div>
    )
  }

  if (!location) {
    return null
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return 'text-xs text-muted-foreground/80'
      case 'detailed':
        return 'text-sm font-medium text-foreground'
      default:
        return 'text-sm text-muted-foreground'
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && (
        <MapPinIcon className="h-4 w-4 text-primary/70" />
      )}
      <span className={getVariantStyles()}>
        {location.city}, {location.country}
      </span>
    </div>
  )
}
