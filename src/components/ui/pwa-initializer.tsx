'use client'

import { useEffect } from 'react'
import { registerServiceWorker, setupInstallPrompt, setupBackgroundSync } from '@/lib/pwa'

export function PWAInitializer() {
  useEffect(() => {
    try {
      // Initialize PWA features with error handling
      registerServiceWorker()
      setupInstallPrompt()
      setupBackgroundSync()
    } catch (error) {
      console.warn('PWA initialization failed:', error)
    }
  }, [])

  return null
}
