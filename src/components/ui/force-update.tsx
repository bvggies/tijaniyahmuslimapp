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
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2">
          <Button
            onClick={handleCheckUpdates}
            variant="outline"
            size="sm"
            disabled={isChecking}
            className="flex items-center gap-1"
          >
            <RefreshCwIcon className={`h-3 w-3 ${isChecking ? 'animate-spin' : ''}`} />
            Check
          </Button>
          
          <Button
            onClick={handleForceUpdate}
            variant="default"
            size="sm"
            disabled={isChecking}
            className="muslim-gradient text-white hover:opacity-90 flex items-center gap-1"
          >
            <DownloadIcon className="h-3 w-3" />
            Update
          </Button>
        </div>
        
        {lastChecked && (
          <p className="text-xs text-muted-foreground mt-1">
            Last checked: {lastChecked.toLocaleTimeString()}
          </p>
        )}
        
        <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <AlertCircleIcon className="h-3 w-3" />
            <span>Updates are checked automatically</span>
          </div>
        </div>
      </div>
    </div>
  )
}
