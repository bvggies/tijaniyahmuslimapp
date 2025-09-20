'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { DownloadIcon, XIcon, SmartphoneIcon } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check if PWA is supported
    const checkSupport = () => {
      return 'serviceWorker' in navigator && 'PushManager' in window
    }

    if (!checkSupport()) {
      setIsSupported(false)
      return
    }

    setIsSupported(true)

    // Check if app is already installed
    const checkInstalled = () => {
      return window.matchMedia('(display-mode: standalone)').matches ||
             (window.navigator as any).standalone === true ||
             document.referrer.includes('android-app://')
    }

    if (checkInstalled()) {
      setIsInstalled(true)
      return
    }

    // Check if user has dismissed the prompt
    const dismissed = sessionStorage.getItem('pwa-install-dismissed')
    if (dismissed === 'true') {
      setIsDismissed(true)
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

    // Show install prompt after 5 seconds if not already shown
    const timer = setTimeout(() => {
      if (!isInstalled && !showInstallPrompt && !isDismissed) {
        setShowInstallPrompt(true)
      }
    }, 5000)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      clearTimeout(timer)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback for browsers that don't support beforeinstallprompt
      showManualInstallInstructions()
      return
    }

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt')
        setShowInstallPrompt(false)
      } else {
        console.log('User dismissed the install prompt')
      }
      
      setDeferredPrompt(null)
    } catch (error) {
      console.error('Error installing PWA:', error)
      showManualInstallInstructions()
    }
  }

  const showManualInstallInstructions = () => {
    // Show manual install instructions
    alert(`To install this app:
    
For Chrome/Edge:
1. Click the menu (⋮) in your browser
2. Select "Install Tijaniyah Muslim App"

For Safari (iOS):
1. Tap the Share button
2. Scroll down and tap "Add to Home Screen"

For Firefox:
1. Click the menu (☰) in your browser
2. Select "Install"`)
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    setIsDismissed(true)
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true')
  }

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null
  }

  // Don't show if not supported, already installed, dismissed, or not showing
  if (!isSupported || isInstalled || isDismissed || !showInstallPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50">
      <div className="bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-xl p-4 islamic-glow">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 islamic-gradient rounded-full flex items-center justify-center flex-shrink-0">
            <SmartphoneIcon className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-primary text-sm mb-1">
              Install Tijaniyah App
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              {deferredPrompt 
                ? "Get quick access to prayer times, Quran, and more on your home screen"
                : "Add this app to your home screen for easy access"
              }
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleInstallClick}
                className="text-xs px-3 py-1 islamic-gradient text-white hover:opacity-90"
              >
                {deferredPrompt ? (
                  <>
                    <DownloadIcon className="h-3 w-3 mr-1" />
                    Install
                  </>
                ) : (
                  <>
                    <SmartphoneIcon className="h-3 w-3 mr-1" />
                    Add to Home Screen
                  </>
                )}
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
