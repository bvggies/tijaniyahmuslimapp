'use client'

import React, { useEffect, useState } from 'react'
import { SimpleLogo } from '@/components/ui/simple-logo'

interface LogoPreloaderProps {
  onComplete: () => void
  duration?: number
}

export function LogoPreloader({ onComplete, duration = 1500 }: LogoPreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const startTime = Date.now()
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const progressPercent = Math.min((elapsed / duration) * 100, 100)
      setProgress(progressPercent)
      
      if (progressPercent >= 100) {
        // Start fade out
        setIsVisible(false)
        setTimeout(() => {
          onComplete()
        }, 300) // Fade out duration
      } else {
        requestAnimationFrame(updateProgress)
      }
    }
    
    requestAnimationFrame(updateProgress)
  }, [duration, onComplete])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30 flex items-center justify-center">
      <div className="text-center">
        {/* Logo with animation */}
        <div className="mb-8">
          <SimpleLogo 
            size="xl" 
            animated={true} 
            showText={true}
            className="animate-pulse"
          />
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Loading text */}
        <p className="mt-4 text-sm text-muted-foreground font-medium">
          Loading...
        </p>
      </div>
    </div>
  )
}
