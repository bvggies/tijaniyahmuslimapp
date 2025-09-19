'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { SplashScreen } from '@/components/ui/splash-screen'

interface SplashContextType {
  showSplash: boolean
  hideSplash: () => void
}

const SplashContext = createContext<SplashContextType | undefined>(undefined)

export function useSplash() {
  const context = useContext(SplashContext)
  if (context === undefined) {
    throw new Error('useSplash must be used within a SplashProvider')
  }
  return context
}

interface SplashProviderProps {
  children: React.ReactNode
}

export function SplashProvider({ children }: SplashProviderProps) {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Always show splash screen on app load
    setShowSplash(true)
  }, [])

  const hideSplash = () => {
    setShowSplash(false)
    localStorage.setItem('hasSeenSplash', 'true')
  }

  return (
    <SplashContext.Provider value={{ showSplash, hideSplash }}>
      {showSplash && (
        <SplashScreen 
          onComplete={hideSplash}
          duration={4000}
        />
      )}
      {children}
    </SplashContext.Provider>
  )
}
