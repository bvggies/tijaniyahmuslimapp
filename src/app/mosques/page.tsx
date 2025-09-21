'use client'

import React, { useState, useEffect, useRef } from 'react'

// Google Maps type declarations
declare global {
  interface Window {
    google: any
  }
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { 
  MapPinIcon, 
  SearchIcon,
  FilterIcon,
  NavigationIcon,
  ClockIcon,
  PhoneIcon,
  GlobeIcon,
  StarIcon,
  HeartIcon,
  ShareIcon,
  ArrowRightIcon,
  UsersIcon,
  CalendarIcon,
  WifiIcon,
  CarIcon,
  AccessibilityIcon,
  MapIcon,
  LocateIcon,
  SettingsIcon,
  RefreshCwIcon,
  LoaderIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ExternalLinkIcon,
  MessageCircleIcon,
  BookOpenIcon,
  GraduationCapIcon,
  CoffeeIcon,
  ShoppingBagIcon,
  CameraIcon,
  VideoIcon,
  MicIcon,
  HandIcon,
  BabyIcon,
  WifiOffIcon,
  Clock3Icon,
  Clock4Icon,
  Clock5Icon,
  Clock6Icon,
  Clock7Icon,
  Clock8Icon,
  Clock9Icon,
  Clock10Icon,
  Clock11Icon,
  Clock12Icon,
  Clock1Icon,
  Clock2Icon
} from 'lucide-react'

interface PrayerTime {
  fajr: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
  nextPrayer?: string
  nextPrayerTime?: string
}

interface Event {
  id: string
  title: string
  date: string
  time: string
  description: string
  type: 'lecture' | 'class' | 'event' | 'prayer' | 'community'
  registrationRequired?: boolean
  maxAttendees?: number
  currentAttendees?: number
}

interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
  helpful: number
}

interface Mosque {
  id: string
  place_id: string
  name: string
  address: string
  city: string
  description: string
  latitude: number
  longitude: number
  rating: number
  user_ratings_total: number
  distance?: number
  isFavorite?: boolean
  phone?: string
  website?: string
  email?: string
  capacity?: number
  facilities: string[]
  services: string[]
  prayerTimes: PrayerTime
  events: Event[]
  reviews: Review[]
  photos?: string[]
  openingHours?: {
    open_now: boolean
    weekday_text: string[]
  }
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
    youtube?: string
  }
  imam?: {
    name: string
    bio: string
    photo?: string
  }
  accessibility?: {
    wheelchair_accessible: boolean
    parking: boolean
    wudu_facilities: boolean
    women_prayer_area: boolean
    children_facilities: boolean
  }
}

// Google Places API types
interface GooglePlaceResult {
  place_id: string
  name: string
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  rating?: number
  user_ratings_total?: number
  price_level?: number
  photos?: Array<{
    photo_reference: string
    height: number
    width: number
  }>
  opening_hours?: {
    open_now: boolean
    weekday_text: string[]
  }
  vicinity?: string
  types: string[]
}

export default function MosquesPage() {
  const [mosques, setMosques] = useState<Mosque[]>([])
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [radius, setRadius] = useState([5]) // in kilometers
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [showMap, setShowMap] = useState(false)
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'name'>('distance')
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [expandedMosque, setExpandedMosque] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  // Filter options
  const facilities = [
    'Parking', 'Wifi', 'Wudu Area', 'Women Prayer Area', 'Children Facilities',
    'Wheelchair Accessible', 'Library', 'Bookshop', 'Cafe', 'Conference Room',
    'Air Conditioning', 'Sound System', 'Projector', 'Security', 'ATM'
  ]

  const services = [
    'Daily Prayers', 'Friday Prayer', 'Quran Classes', 'Arabic Classes',
    'Islamic Studies', 'Youth Programs', 'Marriage Services', 'Funeral Services',
    'Community Events', 'Lectures', 'Taraweeh', 'Eid Prayers', 'Ramadan Iftar',
    'Charity Work', 'Counseling', 'Educational Programs'
  ]

  // Mock data for demonstration
  const mockMosques: Mosque[] = [
    {
      id: '1',
      place_id: 'mosque_1',
      name: 'Masjid Al-Noor',
      address: '123 Islamic Street, Downtown',
      city: 'New York',
      description: 'A beautiful mosque in the heart of downtown with excellent facilities and community programs.',
      latitude: 40.7128,
      longitude: -74.0060,
      rating: 4.8,
      user_ratings_total: 156,
      phone: '+1 (555) 123-4567',
      website: 'https://masjidalnoor.org',
      email: 'info@masjidalnoor.org',
      capacity: 500,
      facilities: ['Parking', 'Wifi', 'Wudu Area', 'Women Prayer Area', 'Children Facilities', 'Library', 'Cafe'],
      services: ['Daily Prayers', 'Friday Prayer', 'Quran Classes', 'Arabic Classes', 'Islamic Studies', 'Youth Programs'],
      prayerTimes: {
        fajr: '05:30',
        dhuhr: '12:15',
        asr: '15:45',
        maghrib: '18:20',
        isha: '19:45',
        nextPrayer: 'Dhuhr',
        nextPrayerTime: '12:15'
      },
      events: [
        {
          id: '1',
          title: 'Friday Khutbah by Imam Ahmed',
          date: '2024-01-15',
          time: '12:30 PM',
          description: 'Weekly Friday sermon focusing on community unity',
          type: 'lecture',
          registrationRequired: false
        },
        {
          id: '2',
          title: 'Quran Memorization Class',
          date: '2024-01-16',
          time: '6:00 PM',
          description: 'Beginner to advanced Quran memorization classes',
          type: 'class',
          registrationRequired: true,
          maxAttendees: 30,
          currentAttendees: 25
        }
      ],
      reviews: [
        {
          id: '1',
          userId: 'user1',
          userName: 'Ahmad Hassan',
          rating: 5,
          comment: 'Excellent facilities and very welcoming community. The imam is knowledgeable and the Friday prayers are well organized.',
          date: '2024-01-10',
          helpful: 12
        },
        {
          id: '2',
          userId: 'user2',
          userName: 'Fatima Ali',
          rating: 4,
          comment: 'Great mosque with good parking facilities. The women\'s prayer area is spacious and well-maintained.',
          date: '2024-01-08',
          helpful: 8
        }
      ],
      photos: ['/images/mosque1.jpg', '/images/mosque1-2.jpg'],
      openingHours: {
        open_now: true,
        weekday_text: [
          'Monday: 5:00 AM – 10:00 PM',
          'Tuesday: 5:00 AM – 10:00 PM',
          'Wednesday: 5:00 AM – 10:00 PM',
          'Thursday: 5:00 AM – 10:00 PM',
          'Friday: 5:00 AM – 10:00 PM',
          'Saturday: 5:00 AM – 10:00 PM',
          'Sunday: 5:00 AM – 10:00 PM'
        ]
      },
      socialMedia: {
        facebook: 'https://facebook.com/masjidalnoor',
        instagram: 'https://instagram.com/masjidalnoor',
        twitter: 'https://twitter.com/masjidalnoor'
      },
      imam: {
        name: 'Imam Ahmed Hassan',
        bio: 'Imam Ahmed has been serving the community for over 15 years with expertise in Islamic jurisprudence and community development.',
        photo: '/images/imam-ahmed.jpg'
      },
      accessibility: {
        wheelchair_accessible: true,
        parking: true,
        wudu_facilities: true,
        women_prayer_area: true,
        children_facilities: true
      }
    },
    {
      id: '2',
      place_id: 'mosque_2',
      name: 'Islamic Center of Brooklyn',
      address: '456 Brooklyn Avenue, Brooklyn',
      city: 'Brooklyn',
      description: 'A vibrant Islamic center serving the Brooklyn community with educational programs and social services.',
      latitude: 40.6782,
      longitude: -73.9442,
      rating: 4.6,
      user_ratings_total: 89,
      phone: '+1 (555) 987-6543',
      website: 'https://icbrooklyn.org',
      email: 'contact@icbrooklyn.org',
      capacity: 300,
      facilities: ['Parking', 'Wifi', 'Wudu Area', 'Women Prayer Area', 'Library', 'Conference Room'],
      services: ['Daily Prayers', 'Friday Prayer', 'Quran Classes', 'Islamic Studies', 'Community Events', 'Charity Work'],
      prayerTimes: {
        fajr: '05:35',
        dhuhr: '12:20',
        asr: '15:50',
        maghrib: '18:25',
        isha: '19:50',
        nextPrayer: 'Dhuhr',
        nextPrayerTime: '12:20'
      },
      events: [
        {
          id: '3',
          title: 'Community Iftar',
          date: '2024-01-20',
          time: '6:00 PM',
          description: 'Monthly community iftar dinner for all families',
          type: 'community',
          registrationRequired: true,
          maxAttendees: 200,
          currentAttendees: 150
        }
      ],
      reviews: [
        {
          id: '3',
          userId: 'user3',
          userName: 'Omar Khan',
          rating: 5,
          comment: 'Wonderful community center with excellent programs for children and adults.',
          date: '2024-01-12',
          helpful: 15
        }
      ],
      photos: ['/images/mosque2.jpg'],
      openingHours: {
        open_now: true,
        weekday_text: [
          'Monday: 5:00 AM – 9:00 PM',
          'Tuesday: 5:00 AM – 9:00 PM',
          'Wednesday: 5:00 AM – 9:00 PM',
          'Thursday: 5:00 AM – 9:00 PM',
          'Friday: 5:00 AM – 9:00 PM',
          'Saturday: 5:00 AM – 9:00 PM',
          'Sunday: 5:00 AM – 9:00 PM'
        ]
      },
      accessibility: {
        wheelchair_accessible: true,
        parking: true,
        wudu_facilities: true,
        women_prayer_area: true,
        children_facilities: true
      }
    },
    {
      id: '3',
      place_id: 'mosque_3',
      name: 'Masjid Al-Iman',
      address: '789 Queens Boulevard, Queens',
      city: 'Queens',
      description: 'A peaceful mosque with traditional architecture and modern amenities, perfect for spiritual reflection.',
      latitude: 40.7282,
      longitude: -73.7949,
      rating: 4.4,
      user_ratings_total: 67,
      phone: '+1 (555) 456-7890',
      website: 'https://masjidaliman.org',
      capacity: 200,
      facilities: ['Parking', 'Wudu Area', 'Women Prayer Area', 'Library', 'Air Conditioning'],
      services: ['Daily Prayers', 'Friday Prayer', 'Quran Classes', 'Islamic Studies', 'Lectures'],
      prayerTimes: {
        fajr: '05:40',
        dhuhr: '12:25',
        asr: '15:55',
        maghrib: '18:30',
        isha: '19:55',
        nextPrayer: 'Dhuhr',
        nextPrayerTime: '12:25'
      },
      events: [],
      reviews: [
        {
          id: '4',
          userId: 'user4',
          userName: 'Sarah Johnson',
          rating: 4,
          comment: 'Beautiful mosque with a peaceful atmosphere. The architecture is stunning.',
          date: '2024-01-05',
          helpful: 6
        }
      ],
      photos: ['/images/mosque3.jpg'],
      openingHours: {
        open_now: true,
        weekday_text: [
          'Monday: 5:00 AM – 8:00 PM',
          'Tuesday: 5:00 AM – 8:00 PM',
          'Wednesday: 5:00 AM – 8:00 PM',
          'Thursday: 5:00 AM – 8:00 PM',
          'Friday: 5:00 AM – 8:00 PM',
          'Saturday: 5:00 AM – 8:00 PM',
          'Sunday: 5:00 AM – 8:00 PM'
        ]
      },
      accessibility: {
        wheelchair_accessible: false,
        parking: true,
        wudu_facilities: true,
        women_prayer_area: true,
        children_facilities: false
      }
    }
  ]

  // Initialize with mock data and search for real mosques
  useEffect(() => {
    setMosques(mockMosques)
    
    // Search for real mosques when user location is available
    if (userLocation) {
      searchNearbyMosques(userLocation.latitude, userLocation.longitude, radius[0])
    }
  }, [userLocation, radius])

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('mosque-favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('mosque-favorites', JSON.stringify(favorites))
  }, [favorites])

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
          // Set default location (New York) if geolocation fails
          setUserLocation({
            latitude: 40.7128,
            longitude: -74.0060
          })
        }
      )
    } else {
      // Set default location if geolocation is not supported
      setUserLocation({
        latitude: 40.7128,
        longitude: -74.0060
      })
    }
  }, [])

  // Calculate distances
  useEffect(() => {
    if (userLocation) {
      setMosques(prevMosques => 
        prevMosques.map(mosque => ({
          ...mosque,
          distance: calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            mosque.latitude,
            mosque.longitude
          )
        }))
      )
    }
  }, [userLocation])

  // Load Google Maps
  useEffect(() => {
    const loadGoogleMaps = () => {
      if ((window as any).google && (window as any).google.maps) {
        setMapLoaded(true)
        return
      }

      // Check if API key is available
      let apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      // Fallback to hardcoded key for testing (remove this in production)
      if (!apiKey) {
        apiKey = 'AIzaSyA33uqq6GbVibMLrfMkCqizA5lzpphDplo'
        console.warn('Using fallback API key. Please configure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in Vercel.')
      }
      
      console.log('Google Maps API Key:', apiKey ? 'Present' : 'Missing')
      console.log('API Key value:', apiKey ? `${apiKey.substring(0, 10)}...` : 'undefined')
      
      if (!apiKey) {
        console.warn('Google Maps API key not found. Map functionality will be limited.')
        setError('Google Maps API key not configured. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your Vercel environment variables.')
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => {
        console.log('Google Maps loaded successfully')
        setMapLoaded(true)
      }
      script.onerror = (error) => {
        console.error('Google Maps failed to load:', error)
        setError(`Failed to load Google Maps. API Key: ${apiKey ? 'Present' : 'Missing'}. Please check your Vercel environment variables.`)
      }
      document.head.appendChild(script)
    }

    loadGoogleMaps()
  }, [])

  // Initialize map when component mounts and map is loaded
  useEffect(() => {
    if (mapLoaded && mapRef.current && !mapInstanceRef.current && userLocation) {
      try {
        const google = (window as any).google
        if (!google || !google.maps) {
          setError('Google Maps is not available')
          return
        }

        const map = new google.maps.Map(mapRef.current, {
          center: { lat: userLocation.latitude, lng: userLocation.longitude },
          zoom: 12,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        })
        mapInstanceRef.current = map

        // Add user location marker
        new google.maps.Marker({
          position: { lat: userLocation.latitude, lng: userLocation.longitude },
          map: map,
          title: 'Your Location',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="white" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" fill="white"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(24, 24)
          }
        })
      } catch (err) {
        console.error('Error initializing map:', err)
        setError('Failed to initialize map')
      }
    }
  }, [mapLoaded, userLocation])

  // Update map markers when mosques change
  useEffect(() => {
    if (mapInstanceRef.current && mosques.length > 0) {
      try {
        const google = (window as any).google
        if (!google || !google.maps) return

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null))
        markersRef.current = []

        // Add mosque markers
        mosques.forEach(mosque => {
          const marker = new google.maps.Marker({
            position: { lat: mosque.latitude, lng: mosque.longitude },
            map: mapInstanceRef.current,
            title: mosque.name,
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="14" fill="#10B981" stroke="white" stroke-width="2"/>
                  <path d="M16 8L20 12H18V20H14V12H12L16 8Z" fill="white"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(32, 32)
            }
          })

          marker.addListener('click', () => {
            setSelectedMosque(mosque)
          })

          markersRef.current.push(marker)
        })
      } catch (err) {
        console.error('Error updating map markers:', err)
      }
    }
  }, [mosques])

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Search for nearby mosques using Google Places API
  const searchNearbyMosques = async (lat: number, lng: number, radiusKm: number) => {
    if (!(window as any).google || !(window as any).google.maps) {
      console.log('Google Maps not loaded yet')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const google = (window as any).google
      const service = new google.maps.places.PlacesService(document.createElement('div'))
      
      const request = {
        location: new google.maps.LatLng(lat, lng),
        radius: radiusKm * 1000, // Convert km to meters
        type: 'place_of_worship',
        keyword: 'mosque masjid islamic center'
      }

      service.nearbySearch(request, (results: any[], status: any) => {
        setIsLoading(false)
        
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          console.log('Found mosques:', results.length)
          
          // Convert Google Places results to our Mosque format
          const foundMosques: Mosque[] = results.map((place, index) => ({
            id: `google_${place.place_id || index}`,
            place_id: place.place_id || `place_${index}`,
            name: place.name || 'Mosque',
            address: place.vicinity || place.formatted_address || 'Address not available',
            city: place.vicinity || 'Unknown',
            description: 'Islamic place of worship',
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
            rating: place.rating || 0,
            user_ratings_total: place.user_ratings_total || 0,
            distance: calculateDistance(lat, lng, place.geometry.location.lat(), place.geometry.location.lng()),
            facilities: ['Prayer Area', 'Wudu Area'],
            services: ['Daily Prayers', 'Friday Prayer'],
            prayerTimes: {
              fajr: '05:30',
              dhuhr: '12:15',
              asr: '15:45',
              maghrib: '18:20',
              isha: '19:45',
              nextPrayer: 'Dhuhr',
              nextPrayerTime: '12:15'
            },
            events: [],
            reviews: [],
            accessibility: {
              wheelchair_accessible: false,
              parking: true,
              wudu_facilities: true,
              women_prayer_area: true,
              children_facilities: false
            }
          }))

          // Combine with mock data and update
          setMosques(prevMosques => {
            const combined = [...prevMosques, ...foundMosques]
            // Remove duplicates based on place_id
            const unique = combined.filter((mosque, index, self) => 
              index === self.findIndex(m => m.place_id === mosque.place_id)
            )
            return unique
          })
        } else {
          console.log('No mosques found or error:', status)
          setError('No mosques found in your area. Try increasing the search radius.')
        }
      })
    } catch (error) {
      console.error('Error searching for mosques:', error)
      setIsLoading(false)
      setError('Failed to search for mosques. Please try again.')
    }
  }

  const filteredMosques = mosques.filter(mosque => {
    const matchesSearch = mosque.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mosque.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mosque.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mosque.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFacilities = selectedFacilities.length === 0 || 
                             selectedFacilities.every(facility => mosque.facilities.includes(facility))
    
    const matchesServices = selectedServices.length === 0 || 
                           selectedServices.every(service => mosque.services.includes(service))
    
    const withinRadius = !userLocation || !mosque.distance || mosque.distance <= radius[0]
    
    return matchesSearch && matchesFacilities && matchesServices && withinRadius
  }).sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return (a.distance || 0) - (b.distance || 0)
      case 'rating':
        return b.rating - a.rating
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const toggleFavorite = (mosqueId: string) => {
    setFavorites(prev => 
      prev.includes(mosqueId) 
        ? prev.filter(id => id !== mosqueId)
        : [...prev, mosqueId]
    )
  }

  const getDirections = (mosque: Mosque) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${mosque.latitude},${mosque.longitude}`
    window.open(url, '_blank')
  }

  const formatDistance = (distance?: number) => {
    if (!distance) return 'Distance unknown'
    if (distance < 1) return `${Math.round(distance * 1000)}m`
    return `${distance.toFixed(1)}km`
  }

  const getPrayerTimeIcon = (prayer: string) => {
    const prayerIcons: { [key: string]: any } = {
      fajr: Clock3Icon,
      dhuhr: Clock12Icon,
      asr: Clock3Icon,
      maghrib: Clock6Icon,
      isha: Clock9Icon
    }
    return prayerIcons[prayer] || ClockIcon
  }

  const getEventTypeIcon = (type: string) => {
    const eventIcons: { [key: string]: any } = {
      lecture: MicIcon,
      class: GraduationCapIcon,
      event: CalendarIcon,
      prayer: ClockIcon,
      community: UsersIcon
    }
    return eventIcons[type] || CalendarIcon
  }

  const getFacilityIcon = (facility: string) => {
    const facilityIcons: { [key: string]: any } = {
      'Parking': CarIcon,
      'Wifi': WifiIcon,
      'Wudu Area': HandIcon,
      'Women Prayer Area': UsersIcon,
      'Children Facilities': BabyIcon,
      'Wheelchair Accessible': AccessibilityIcon,
      'Library': BookOpenIcon,
      'Bookshop': ShoppingBagIcon,
      'Cafe': CoffeeIcon,
      'Conference Room': VideoIcon,
      'Air Conditioning': SettingsIcon,
      'Sound System': MicIcon,
      'Projector': CameraIcon,
      'Security': SettingsIcon,
      'ATM': SettingsIcon
    }
    return facilityIcons[facility] || SettingsIcon
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4">
            Mosque Locator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find nearby mosques and prayer facilities in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <SearchIcon className="h-6 w-6" />
                  Search & Filter
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FilterIcon className="h-4 w-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search mosques by name, address, or city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Radius Slider */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Search Radius: {radius[0]} km
                  </label>
                  <Slider
                    value={radius}
                    onValueChange={setRadius}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Sort By */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="p-2 border border-input rounded-lg"
                  >
                    <option value="distance">Distance</option>
                    <option value="rating">Rating</option>
                    <option value="name">Name</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 flex-wrap">
                  <Button
                    variant={showMap ? "islamic" : "outline"}
                    onClick={() => setShowMap(!showMap)}
                    className="flex items-center gap-2"
                  >
                    <MapIcon className="h-4 w-4" />
                    {showMap ? 'Hide Map' : 'Show Map'}
                  </Button>
                  
                  {userLocation && (
                    <>
                      <Button
                        variant="islamic"
                        size="sm"
                        onClick={() => {
                          searchNearbyMosques(userLocation.latitude, userLocation.longitude, radius[0])
                        }}
                        disabled={isLoading}
                        className="flex items-center gap-2"
                      >
                        {isLoading ? (
                          <LoaderIcon className="h-4 w-4 animate-spin" />
                        ) : (
                          <SearchIcon className="h-4 w-4" />
                        )}
                        {isLoading ? 'Searching...' : 'Search Mosques'}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (mapInstanceRef.current) {
                            mapInstanceRef.current.setCenter({
                              lat: userLocation.latitude,
                              lng: userLocation.longitude
                            })
                            mapInstanceRef.current.setZoom(12)
                          }
                        }}
                      >
                        <LocateIcon className="h-4 w-4 mr-2" />
                        My Location
                      </Button>
                    </>
                  )}
                </div>

                {/* Filters */}
                {showFilters && (
                  <div className="space-y-4 pt-4 border-t">
                    {/* Facilities Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Facilities</label>
                      <div className="flex flex-wrap gap-2">
                        {facilities.map((facility) => {
                          const IconComponent = getFacilityIcon(facility)
                          return (
                            <Button
                              key={facility}
                              variant={selectedFacilities.includes(facility) ? "islamic" : "outline"}
                              size="sm"
                              onClick={() => {
                                setSelectedFacilities(prev => 
                                  prev.includes(facility)
                                    ? prev.filter(f => f !== facility)
                                    : [...prev, facility]
                                )
                              }}
                              className="flex items-center gap-1"
                            >
                              <IconComponent className="h-3 w-3" />
                              {facility}
                            </Button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Services Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Services</label>
                      <div className="flex flex-wrap gap-2">
                        {services.map((service) => (
                          <Button
                            key={service}
                            variant={selectedServices.includes(service) ? "islamic" : "outline"}
                            size="sm"
                            onClick={() => {
                              setSelectedServices(prev => 
                                prev.includes(service)
                                  ? prev.filter(s => s !== service)
                                  : [...prev, service]
                              )
                            }}
                          >
                            {service}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-red-700">
                  <SettingsIcon className="h-5 w-5" />
                  <p className="font-medium">Map Error</p>
                </div>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setError(null)}
                  className="mt-2"
                >
                  Dismiss
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Map View */}
        {showMap && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapIcon className="h-6 w-6" />
                  Interactive Map
                  {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Demo Mode
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
                  <div className="flex items-center justify-center h-96 bg-muted/50 rounded-lg">
                    <div className="text-center">
                      <MapIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                        Map Not Available
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Google Maps API key is not configured. The map will show mock data only.
                      </p>
                      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                        {mosques.slice(0, 4).map((mosque) => (
                          <div key={mosque.id} className="p-3 bg-white rounded border">
                            <h4 className="font-medium text-sm">{mosque.name}</h4>
                            <p className="text-xs text-muted-foreground">{mosque.address}</p>
                            <p className="text-xs text-primary">{formatDistance(mosque.distance)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div 
                      ref={mapRef} 
                      className="w-full h-96 rounded-lg border"
                      style={{ minHeight: '400px' }}
                    />
                    {!mapLoaded && (
                      <div className="flex items-center justify-center h-96 bg-muted/50 rounded-lg">
                        <div className="text-center">
                          <LoaderIcon className="h-8 w-8 animate-spin mx-auto mb-2" />
                          <p className="text-muted-foreground">Loading map...</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <Card>
            <CardContent className="text-center py-12">
              <LoaderIcon className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Searching for Mosques</h3>
              <p className="text-muted-foreground">Finding nearby Islamic places of worship...</p>
            </CardContent>
          </Card>
        )}

        {/* Mosques List */}
        <div className="space-y-6">
          {!isLoading && filteredMosques.map((mosque) => (
            <Card key={mosque.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{mosque.name}</h3>
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{mosque.rating}</span>
                          <span className="text-xs text-muted-foreground">({mosque.user_ratings_total})</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="h-4 w-4" />
                          <span>{mosque.address}, {mosque.city}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <NavigationIcon className="h-4 w-4" />
                          <span>{formatDistance(mosque.distance)}</span>
                        </div>
                        {mosque.capacity && (
                          <div className="flex items-center gap-1">
                            <UsersIcon className="h-4 w-4" />
                            <span>Capacity: {mosque.capacity}</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground text-sm">{mosque.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(mosque.id)}
                      >
                        <HeartIcon 
                          className={`h-4 w-4 ${
                            favorites.includes(mosque.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => getDirections(mosque)}
                      >
                        <ArrowRightIcon className="h-4 w-4 mr-2" />
                        Directions
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedMosque(expandedMosque === mosque.id ? null : mosque.id)}
                      >
                        {expandedMosque === mosque.id ? (
                          <ChevronUpIcon className="h-4 w-4" />
                        ) : (
                          <ChevronDownIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Prayer Times */}
                  <div className="grid grid-cols-5 gap-2">
                    {Object.entries(mosque.prayerTimes).map(([prayer, time]) => {
                      const IconComponent = getPrayerTimeIcon(prayer)
                      const isNextPrayer = prayer === mosque.prayerTimes.nextPrayer?.toLowerCase()
                      return (
                        <div 
                          key={prayer} 
                          className={`text-center p-2 rounded ${
                            isNextPrayer 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-primary/5'
                          }`}
                        >
                          <IconComponent className={`h-4 w-4 mx-auto mb-1 ${
                            isNextPrayer ? 'text-primary-foreground' : 'text-primary'
                          }`} />
                          <div className="text-xs font-medium capitalize">{prayer}</div>
                          <div className={`text-sm font-semibold ${
                            isNextPrayer ? 'text-primary-foreground' : 'text-primary'
                          }`}>{time}</div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Facilities */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Facilities</h4>
                    <div className="flex flex-wrap gap-1">
                      {mosque.facilities.map((facility) => {
                        const IconComponent = getFacilityIcon(facility)
                        return (
                          <span
                            key={facility}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full flex items-center gap-1"
                          >
                            <IconComponent className="h-3 w-3" />
                            {facility}
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="flex items-center gap-4 text-sm">
                    {mosque.phone && (
                      <div className="flex items-center gap-1">
                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${mosque.phone}`} className="text-primary hover:underline">
                          {mosque.phone}
                        </a>
                      </div>
                    )}
                    {mosque.website && (
                      <div className="flex items-center gap-1">
                        <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                        <a href={mosque.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Website
                        </a>
                      </div>
                    )}
                    {mosque.email && (
                      <div className="flex items-center gap-1">
                        <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${mosque.email}`} className="text-primary hover:underline">
                          Email
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {expandedMosque === mosque.id && (
                    <div className="space-y-4 pt-4 border-t">
                      {/* Imam Information */}
                      {mosque.imam && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Imam</h4>
                          <div className="flex items-start gap-3">
                            {mosque.imam.photo && (
                              <img 
                                src={mosque.imam.photo} 
                                alt={mosque.imam.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            )}
                            <div>
                              <p className="font-medium">{mosque.imam.name}</p>
                              <p className="text-sm text-muted-foreground">{mosque.imam.bio}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Events */}
                      {mosque.events.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Upcoming Events</h4>
                          <div className="space-y-2">
                            {mosque.events.slice(0, 3).map((event) => {
                              const EventIcon = getEventTypeIcon(event.type)
                              return (
                                <div key={event.id} className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                                  <EventIcon className="h-4 w-4 text-primary mt-0.5" />
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">{event.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {event.date} at {event.time}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{event.description}</p>
                                    {event.registrationRequired && (
                                      <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                                        Registration Required
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {/* Reviews */}
                      {mosque.reviews.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Recent Reviews</h4>
                          <div className="space-y-2">
                            {mosque.reviews.slice(0, 2).map((review) => (
                              <div key={review.id} className="p-3 bg-muted/50 rounded">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="text-sm font-medium">{review.userName}</p>
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <StarIcon 
                                        key={i} 
                                        className={`h-3 w-3 ${
                                          i < review.rating ? 'text-yellow-500 fill-current' : 'text-muted-foreground'
                                        }`} 
                                      />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{review.comment}</p>
                                <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Social Media */}
                      {mosque.socialMedia && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Social Media</h4>
                          <div className="flex gap-2">
                            {mosque.socialMedia.facebook && (
                              <a 
                                href={mosque.socialMedia.facebook} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                              >
                                <GlobeIcon className="h-4 w-4" />
                              </a>
                            )}
                            {mosque.socialMedia.instagram && (
                              <a 
                                href={mosque.socialMedia.instagram} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 bg-pink-100 text-pink-600 rounded hover:bg-pink-200"
                              >
                                <GlobeIcon className="h-4 w-4" />
                              </a>
                            )}
                            {mosque.socialMedia.twitter && (
                              <a 
                                href={mosque.socialMedia.twitter} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                              >
                                <GlobeIcon className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Opening Hours */}
                      {mosque.openingHours && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Opening Hours</h4>
                          <div className="text-sm text-muted-foreground">
                            {mosque.openingHours.weekday_text.map((day, index) => (
                              <p key={index}>{day}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && filteredMosques.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MapPinIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                No mosques found
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedFacilities.length > 0 || selectedServices.length > 0
                  ? 'Try adjusting your search or filters'
                  : userLocation 
                    ? 'No mosques found in your area. Try increasing the search radius or click "Search Mosques" to find nearby places.'
                    : 'Please allow location access to find nearby mosques'
                }
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="islamic"
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedFacilities([])
                    setSelectedServices([])
                    setRadius([5])
                  }}
                >
                  Clear Filters
                </Button>
                {userLocation && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      searchNearbyMosques(userLocation.latitude, userLocation.longitude, radius[0])
                    }}
                  >
                    Search Again
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HeartIcon className="h-6 w-6 text-red-500" />
                  Your Favorite Mosques ({favorites.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favorites.map(mosqueId => {
                    const mosque = mosques.find(m => m.id === mosqueId)
                    if (!mosque) return null
                    
                    return (
                      <Card key={mosqueId} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-sm">{mosque.name}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(mosqueId)}
                          >
                            <HeartIcon className="h-4 w-4 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{mosque.address}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <StarIcon className="h-3 w-3 text-yellow-500" />
                          <span>{mosque.rating}</span>
                          <span>•</span>
                          <span>{formatDistance(mosque.distance)}</span>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
