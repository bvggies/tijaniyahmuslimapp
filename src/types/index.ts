export interface PrayerTime {
  fajr: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
}

export interface Location {
  latitude: number
  longitude: number
  city: string
  country: string
}

export interface QiblaInfo {
  direction: number
  distance: number
  city: string
  country: string
}

export interface Dua {
  id: string
  title: string
  arabic: string
  transliteration: string
  translation: string
  category: string
  reference?: string
}

export interface QuranVerse {
  id: string
  surah: number
  ayah: number
  arabic: string
  translation: string
  transliteration?: string
}

export interface TasbihCount {
  count: number
  total: number
  session: number
}

export interface Wazifa {
  id: string
  title: string
  description: string
  arabic: string
  transliteration: string
  translation: string
  times: string
  benefits: string[]
  category: string
}

export interface Lazim {
  id: string
  title: string
  description: string
  arabic: string
  transliteration: string
  translation: string
  frequency: 'daily' | 'weekly' | 'monthly'
  completed: boolean
  completedAt?: Date
}

export interface ZikrJumma {
  id: string
  title: string
  arabic: string
  transliteration: string
  translation: string
  times: number
  benefits: string[]
}

export interface JournalEntry {
  id: string
  title: string
  content: string
  date: Date
  category: 'reflection' | 'gratitude' | 'prayer' | 'learning' | 'other'
  mood: 'happy' | 'grateful' | 'peaceful' | 'contemplative' | 'other'
  tags: string[]
}

export interface Scholar {
  id: string
  name: string
  title: string
  bio: string
  image: string
  specialties: string[]
  country: string
  language: string[]
  website?: string
  socialMedia?: {
    twitter?: string
    youtube?: string
    facebook?: string
  }
}

export interface CommunityPost {
  id: string
  author: string
  title: string
  content: string
  category: 'discussion' | 'question' | 'sharing' | 'announcement'
  likes: number
  comments: number
  createdAt: Date
  tags: string[]
}

export interface Mosque {
  id: string
  name: string
  address: string
  city: string
  country: string
  latitude: number
  longitude: number
  phone?: string
  website?: string
  facilities: string[]
  prayerTimes: PrayerTime
  distance?: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  location?: Location
  preferences: {
    language: string
    prayerMethod: string
    theme: 'light' | 'dark' | 'auto'
    notifications: boolean
  }
  stats: {
    prayersCompleted: number
    tasbihCount: number
    journalEntries: number
    communityPosts: number
  }
}

export interface AdminStats {
  totalUsers: number
  totalPrayers: number
  totalTasbih: number
  totalJournalEntries: number
  totalCommunityPosts: number
  activeUsers: number
  newUsersToday: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PrayerTimesApiResponse {
  code: number
  status: string
  data: {
    timings: PrayerTime
    date: {
      readable: string
      timestamp: string
      hijri: {
        date: string
        format: string
        day: string
        month: {
          number: number
          en: string
          ar: string
        }
        year: string
      }
      gregorian: {
        date: string
        format: string
        day: string
        month: {
          number: number
          en: string
        }
        year: string
      }
    }
    meta: {
      latitude: number
      longitude: number
      timezone: string
      method: {
        id: number
        name: string
        params: {
          Fajr: number
          Isha: number
        }
      }
      latitudeAdjustmentMethod: string
      midnightMode: string
      school: string
      offset: {
        Imsak: number
        Fajr: number
        Sunrise: number
        Dhuhr: number
        Asr: number
        Maghrib: number
        Sunset: number
        Isha: number
        Midnight: number
      }
    }
  }
}
