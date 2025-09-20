'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { DownloadIcon, XIcon } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallPrompt(true)
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // Show install prompt after 10 seconds if not already shown
    const timer = setTimeout(() => {
      if (!isInstalled && !showInstallPrompt) {
        setShowInstallPrompt(true)
      }
    }, 10000)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      clearTimeout(timer)
    }
  }, [isInstalled, showInstallPrompt])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
      
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    } catch (error) {
      console.error('Error installing PWA:', error)
    }
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true')
  }

  // Don't show if already installed or dismissed
  if (isInstalled || !showInstallPrompt || sessionStorage.getItem('pwa-install-dismissed')) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50">
      <div className="bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-xl p-4 islamic-glow">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 islamic-gradient rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">🕌</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-primary text-sm mb-1">
              Install Tijaniyah App
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Get quick access to prayer times, Quran, and more on your home screen
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleInstallClick}
                className="text-xs px-3 py-1 islamic-gradient text-white hover:opacity-90"
              >
                <DownloadIcon className="h-3 w-3 mr-1" />
                Install
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDismiss}
                className="text-xs px-3 py-1 border-border text-foreground hover:bg-muted"
              >
                <XIcon className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
