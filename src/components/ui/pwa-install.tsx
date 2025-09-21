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
    <div className="fixed bottom-20 right-4 z-50">
      <Button
        onClick={handleInstallClick}
        className="w-12 h-12 rounded-full islamic-gradient text-white hover:opacity-90 shadow-lg flex items-center justify-center"
        title={deferredPrompt ? "Install App" : "Add to Home Screen"}
      >
        {deferredPrompt ? (
          <DownloadIcon className="h-5 w-5" />
        ) : (
          <SmartphoneIcon className="h-5 w-5" />
        )}
      </Button>
    </div>
  )
}
