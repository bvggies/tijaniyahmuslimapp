'use client'

import React, { useState, useEffect } from 'react'
import { Logo } from './logo'
import { IslamicBackground } from './islamic-background'

interface SplashScreenProps {
  onComplete?: () => void
  duration?: number
}

export function SplashScreen({ onComplete, duration = 3000 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Show content after a brief delay
    const contentTimer = setTimeout(() => {
      setShowContent(true)
    }, 500)

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, duration / 50)

    // Complete splash screen
    const completeTimer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, duration)

    return () => {
      clearTimeout(contentTimer)
      clearInterval(progressInterval)
      clearTimeout(completeTimer)
    }
  }, [duration, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden">
      <IslamicBackground variant="prayer" />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Logo with Animation */}
        <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <Logo size="xl" animated={true} showText={true} />
        </div>

        {/* App Description */}
        <div className={`mt-8 transition-all duration-1000 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-3xl md:text-4xl font-bold muslim-text-gradient mb-2">
            Your Islamic Companion
          </h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Prayer times, Quran, Duas, and spiritual guidance at your fingertips
          </p>
        </div>

        {/* Loading Progress */}
        <div className={`mt-12 w-80 max-w-sm transition-all duration-1000 delay-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Loading...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Islamic Quote */}
        <div className={`mt-8 transition-all duration-1000 delay-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <blockquote className="text-muted-foreground italic max-w-lg">
            "And whoever relies upon Allah - then He is sufficient for him"
          </blockquote>
          <cite className="text-sm text-primary mt-2 block">- Quran 65:3</cite>
        </div>
      </div>

      {/* Floating Islamic Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Crescent Moon */}
        <div className="absolute top-20 left-20 w-8 h-8 bg-secondary rounded-full animate-bounce-slow">
          <div className="w-6 h-6 bg-background rounded-full ml-1 mt-1"></div>
        </div>
        
        {/* Star */}
        <div className="absolute top-32 right-24 w-4 h-4 bg-primary transform rotate-45 animate-pulse"></div>
        
        {/* Prayer Beads */}
        <div className="absolute bottom-32 left-16 flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
