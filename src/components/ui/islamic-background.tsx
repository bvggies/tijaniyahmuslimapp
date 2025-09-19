'use client'

import React, { useState, useEffect } from 'react'

interface IslamicBackgroundProps {
  variant?: 'default' | 'prayer' | 'quran' | 'mosque' | 'gradient'
  className?: string
}

export function IslamicBackground({ variant = 'default', className = '' }: IslamicBackgroundProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getBackgroundContent = () => {
    switch (variant) {
      case 'prayer':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {/* Crescent Moon */}
            <div className="absolute top-10 right-10 w-16 h-16 crescent-moon">
              <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-400 opacity-40">
                <path d="M50 20 A30 30 0 0 1 50 80 A20 20 0 0 0 50 20 Z" fill="currentColor" />
              </svg>
            </div>
            
            {/* Prayer Dots Pattern */}
            <div className="absolute inset-0 opacity-30">
              {Array.from({ length: 50 }).map((_, i) => {
                // Use consistent values for SSR, random for client
                const left = isClient ? Math.random() * 100 : (i * 2) % 100
                const top = isClient ? Math.random() * 100 : (i * 3) % 100
                const delay = isClient ? Math.random() * 3 : (i * 0.1) % 3
                
                return (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-secondary rounded-full"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      animationName: 'prayerPulse',
                      animationDuration: '4s',
                      animationTimingFunction: 'ease-in-out',
                      animationIterationCount: 'infinite',
                      animationDelay: `${delay}s`
                    }}
                  />
                )
              })}
            </div>
            
            {/* Islamic Geometric Pattern */}
            <div className="absolute bottom-0 left-0 w-full h-32 opacity-10">
              <svg viewBox="0 0 400 100" className="w-full h-full">
                <defs>
                  <pattern id="islamic-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="2" fill="currentColor" />
                    <path d="M10 10 L30 10 L20 30 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
              </svg>
            </div>
          </div>
        )
        
      case 'quran':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {/* Arabic Calligraphy */}
            <div className="absolute top-20 left-10 w-32 h-32 opacity-10">
              <svg viewBox="0 0 200 200" className="w-full h-full text-green-600">
                <path d="M50 100 Q100 50 150 100 Q100 150 50 100" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M30 120 Q100 80 170 120" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            
            {/* Book Pages */}
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2 w-24 h-32 opacity-20">
              <div className="w-full h-full bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-sm shadow-lg transform rotate-12" />
              <div className="absolute top-2 left-2 w-full h-full bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-sm transform rotate-6" />
            </div>
            
            {/* Floating Arabic Text */}
            <div className="absolute inset-0">
              {['بسم الله', 'الحمد لله', 'الله أكبر'].map((text, i) => (
                <div
                  key={i}
                  className="absolute text-2xl font-arabic text-green-500 opacity-20 arabic-text"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${30 + i * 20}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        )
        
      case 'mosque':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {/* Mosque Silhouette */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-48 opacity-20">
              <svg viewBox="0 0 300 200" className="w-full h-full text-green-600">
                <path d="M150 20 L280 80 L280 180 L20 180 L20 80 Z" fill="currentColor" />
                <circle cx="150" cy="50" r="15" fill="currentColor" />
                <rect x="140" y="60" width="20" height="40" fill="currentColor" />
              </svg>
            </div>
            
            {/* Minarets */}
            <div className="absolute bottom-0 left-1/4 w-8 h-32 opacity-15">
              <div className="w-full h-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-full" />
            </div>
            <div className="absolute bottom-0 right-1/4 w-8 h-32 opacity-15">
              <div className="w-full h-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-full" />
            </div>
            
            {/* Stars */}
            <div className="absolute inset-0">
              {Array.from({ length: 20 }).map((_, i) => {
                // Use consistent values for SSR, random for client
                const left = isClient ? Math.random() * 100 : (i * 5) % 100
                const top = isClient ? Math.random() * 50 : (i * 2.5) % 50
                const duration = isClient ? 2 + Math.random() * 3 : 2 + (i * 0.1) % 3
                const delay = isClient ? Math.random() * 2 : (i * 0.1) % 2
                
                return (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-secondary rounded-full"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      animationName: 'float',
                      animationDuration: `${duration}s`,
                      animationTimingFunction: 'ease-in-out',
                      animationIterationCount: 'infinite',
                      animationDelay: `${delay}s`
                    }}
                  />
                )
              })}
            </div>
          </div>
        )
        
      case 'gradient':
        return (
          <div className="absolute inset-0 islamic-gradient opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yellow-200/20 to-transparent rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-200/20 to-transparent rounded-full" />
          </div>
        )
        
      default:
        return (
          <div className="absolute inset-0 overflow-hidden">
            {/* Geometric Islamic Pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg viewBox="0 0 100 100" className="w-full h-full text-green-600">
                <defs>
                  <pattern id="islamic-geometric" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="currentColor" />
                    <path d="M5 5 L15 5 L10 15 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#islamic-geometric)" />
              </svg>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-20 right-20 w-12 h-12 islamic-glow">
              <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-full" />
            </div>
            <div className="absolute bottom-20 left-20 w-8 h-8 islamic-glow">
              <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full" />
            </div>
            
            {/* Subtle Lines */}
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-300/30 to-transparent" />
            <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent" />
          </div>
        )
    }
  }

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {getBackgroundContent()}
    </div>
  )
}
