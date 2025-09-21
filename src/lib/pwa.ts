// PWA Service Worker Registration with instant updates
export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js')
        console.log('Service Worker registered successfully:', registration.scope)
        
        // Handle updates with instant refresh
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New content is available, force immediate update
                  console.log('New version available, updating immediately...')
                  newWorker.postMessage({ type: 'SKIP_WAITING' })
                  
                  // Listen for the new service worker to take control
                  newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'activated') {
                      // Force reload to get the new version
                      window.location.reload()
                    }
                  })
                } else {
                  // First time installation
                  console.log('PWA installed successfully')
                }
              }
            })
          }
        })

        // Listen for messages from service worker
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'RELOAD') {
            window.location.reload()
          }
        })

        // Check for updates every 30 seconds
        setInterval(() => {
          registration.update()
        }, 30000)

      } catch (error) {
        console.error('Service Worker registration failed:', error)
      }
    })
  }
}

// PWA Install Prompt
export function setupInstallPrompt() {
  if (typeof window !== 'undefined') {
    let deferredPrompt: any = null

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt = e
      
      // Store the event for later use
      window.dispatchEvent(new CustomEvent('pwa-install-available', { detail: e }))
    })

    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed')
      deferredPrompt = null
      window.dispatchEvent(new CustomEvent('pwa-installed'))
    })
  }
}

// PWA Update Check
export function checkForUpdates() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration) {
        registration.update()
      }
    })
  }
}

// Force cache invalidation and reload
export function forceUpdate() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration && registration.active) {
        // Send message to service worker to clear cache
        registration.active.postMessage({ type: 'CACHE_INVALIDATE' })
      } else {
        // Fallback: hard reload
        window.location.reload()
      }
    })
  } else {
    // Fallback: hard reload
    window.location.reload()
  }
}

// Check for updates on page visibility change
export function setupVisibilityUpdateCheck() {
  if (typeof window !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        // Page became visible, check for updates
        checkForUpdates()
      }
    })
  }
}

// PWA Background Sync
export function setupBackgroundSync() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      // Register for background sync only if supported
      if ('sync' in registration) {
        return (registration as any).sync.register('prayer-times-sync')
      }
    }).catch((error) => {
      console.warn('Background sync not supported or failed:', error)
    })
  }
}

// PWA Push Notifications
export async function requestNotificationPermission() {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }
  return false
}

export async function showNotification(title: string, options: NotificationOptions) {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready
    await registration.showNotification(title, options)
  }
}
