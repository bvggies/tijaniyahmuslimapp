// PWA Service Worker Registration
export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js')
        console.log('Service Worker registered successfully:', registration.scope)
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, show update notification
                if (confirm('New version available! Reload to update?')) {
                  window.location.reload()
                }
              }
            })
          }
        })
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

// PWA Background Sync
export function setupBackgroundSync() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      // Register for background sync only if supported
      if ('sync' in registration) {
        return registration.sync.register('prayer-times-sync')
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
