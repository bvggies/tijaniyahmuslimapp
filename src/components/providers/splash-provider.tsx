'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { SplashScreen } from '@/components/ui/splash-screen'
import { LogoPreloader } from '@/components/ui/logo-preloader'

interface SplashContextType {
  showSplash: boolean
  hideSplash: () => void
  showPreloader: boolean
  hidePreloader: () => void
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
  const [showSplash, setShowSplash] = useState(false)
  const [showPreloader, setShowPreloader] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Check if this is the first visit to the homepage
    const hasSeenSplash = localStorage.getItem('hasSeenSplash')
    const isHomepage = pathname === '/'
    
    if (isHomepage && !hasSeenSplash && isInitialLoad) {
      // Show full splash screen only on homepage for first-time visitors
      setShowSplash(true)
      setIsInitialLoad(false)
    } else if (!isHomepage && isInitialLoad) {
      // Show logo preloader for other pages
      setShowPreloader(true)
      setIsInitialLoad(false)
      
      // Hide preloader after a short delay
      setTimeout(() => {
        setShowPreloader(false)
      }, 1500)
    } else {
      setIsInitialLoad(false)
    }
  }, [pathname, isInitialLoad])

  const hideSplash = () => {
    setShowSplash(false)
    localStorage.setItem('hasSeenSplash', 'true')
  }

  const hidePreloader = () => {
    setShowPreloader(false)
  }

  return (
    <SplashContext.Provider value={{ showSplash, hideSplash, showPreloader, hidePreloader }}>
      {showSplash && (
        <SplashScreen 
          onComplete={hideSplash}
          duration={4000}
        />
      )}
      {showPreloader && (
        <LogoPreloader 
          onComplete={hidePreloader}
          duration={1500}
        />
      )}
      {children}
    </SplashContext.Provider>
  )
}
