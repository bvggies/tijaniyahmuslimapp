'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCwIcon, DownloadIcon, AlertCircleIcon } from 'lucide-react'
import { forceUpdate, checkForUpdates } from '@/lib/pwa'

export function ForceUpdate() {
  const [isChecking, setIsChecking] = useState(false)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const handleForceUpdate = async () => {
    setIsChecking(true)
    try {
      // First check for updates
      await checkForUpdates()
      
      // Wait a moment for the service worker to detect changes
      setTimeout(() => {
        // Force update
        forceUpdate()
      }, 1000)
    } catch (error) {
      console.error('Force update failed:', error)
      // Fallback: hard reload
      window.location.reload()
    } finally {
      setIsChecking(false)
    }
  }

  const handleCheckUpdates = async () => {
    setIsChecking(true)
    try {
      await checkForUpdates()
      setLastChecked(new Date())
    } catch (error) {
      console.error('Check updates failed:', error)
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    // Check for updates on component mount
    handleCheckUpdates()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <Button
        onClick={handleCheckUpdates}
        variant="outline"
        size="sm"
        disabled={isChecking}
        className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
        title="Check for Updates"
      >
        <RefreshCwIcon className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
      </Button>
      
      <Button
        onClick={handleForceUpdate}
        variant="default"
        size="sm"
        disabled={isChecking}
        className="w-12 h-12 rounded-full muslim-gradient text-white hover:opacity-90 shadow-lg flex items-center justify-center"
        title="Force Update"
      >
        <DownloadIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
