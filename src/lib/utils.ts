import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatHijriDate(date: Date): string {
  // This is a simplified hijri date formatter
  // In a real app, you'd use a proper hijri calendar library
  const hijriMonths = [
    'Muharram', 'Safar', 'Rabi\' al-awwal', 'Rabi\' al-thani',
    'Jumada al-awwal', 'Jumada al-thani', 'Rajab', 'Sha\'ban',
    'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
  ]
  
  // This is a rough approximation - use a proper hijri library in production
  const hijriYear = 1445 + Math.floor((date.getFullYear() - 2023) * 0.97)
  const hijriMonth = hijriMonths[Math.floor(Math.random() * 12)]
  const hijriDay = Math.floor(Math.random() * 29) + 1
  
  return `${hijriDay} ${hijriMonth} ${hijriYear} AH`
}

export function calculateQiblaDirection(lat: number, lng: number): number {
  // Kaaba coordinates
  const kaabaLat = 21.4225
  const kaabaLng = 39.8262
  
  const dLng = (kaabaLng - lng) * Math.PI / 180
  const lat1 = lat * Math.PI / 180
  const lat2 = kaabaLat * Math.PI / 180
  
  const y = Math.sin(dLng) * Math.cos(lat2)
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng)
  
  let bearing = Math.atan2(y, x) * 180 / Math.PI
  bearing = (bearing + 360) % 360
  
  return bearing
}

export function getDistanceFromKaaba(lat: number, lng: number): number {
  const kaabaLat = 21.4225
  const kaabaLng = 39.8262
  
  const R = 6371 // Earth's radius in kilometers
  const dLat = (kaabaLat - lat) * Math.PI / 180
  const dLng = (kaabaLng - lng) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat * Math.PI / 180) * Math.cos(kaabaLat * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  
  return R * c
}

export function getNextPrayerTime(prayerTimes: Record<string, string>): { name: string; time: string; remaining: string } | null {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()
  
  const prayers = [
    { name: 'Fajr', time: prayerTimes.fajr },
    { name: 'Dhuhr', time: prayerTimes.dhuhr },
    { name: 'Asr', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isha', time: prayerTimes.isha }
  ]
  
  for (const prayer of prayers) {
    const [hours, minutes] = prayer.time.split(':')
    const prayerTime = parseInt(hours) * 60 + parseInt(minutes)
    
    if (prayerTime > currentTime) {
      const remaining = prayerTime - currentTime
      const remainingHours = Math.floor(remaining / 60)
      const remainingMinutes = remaining % 60
      
      return {
        name: prayer.name,
        time: prayer.time,
        remaining: `${remainingHours}h ${remainingMinutes}m`
      }
    }
  }
  
  // If no prayer time found for today, return tomorrow's Fajr
  const [hours, minutes] = prayerTimes.fajr.split(':')
  const fajrTime = parseInt(hours) * 60 + parseInt(minutes)
  const remaining = (24 * 60) - currentTime + fajrTime
  const remainingHours = Math.floor(remaining / 60)
  const remainingMinutes = remaining % 60
  
  return {
    name: 'Fajr (Tomorrow)',
    time: prayerTimes.fajr,
    remaining: `${remainingHours}h ${remainingMinutes}m`
  }
}

export function generateTasbihCount(count: number): string {
  if (count < 33) return count.toString()
  if (count < 66) return `${Math.floor(count / 33)} × 33 + ${count % 33}`
  if (count < 99) return `${Math.floor(count / 33)} × 33 + ${count % 33}`
  return `${Math.floor(count / 33)} × 33 + ${count % 33}`
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
