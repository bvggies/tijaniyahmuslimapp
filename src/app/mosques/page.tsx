'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
  AccessibilityIcon
} from 'lucide-react'

interface Mosque {
  id: string
  name: string
  address: string
  city: string
  country: string
  latitude: number
  longitude: number
  phone?: string
  website?: string
  email?: string
  description: string
  facilities: string[]
  prayerTimes: {
    fajr: string
    dhuhr: string
    asr: string
    maghrib: string
    isha: string
  }
  jummahTimes: string[]
  distance?: number
  rating: number
  isFavorite: boolean
  image?: string
  capacity?: number
  languages: string[]
  services: string[]
}

const sampleMosques: Mosque[] = [
  {
    id: '1',
    name: 'Islamic Center of New York',
    address: '123 Main Street, New York, NY 10001',
    city: 'New York',
    country: 'United States',
    latitude: 40.7128,
    longitude: -74.0060,
    phone: '+1 (555) 123-4567',
    website: 'https://icny.org',
    email: 'info@icny.org',
    description: 'A vibrant Islamic center serving the Muslim community in New York with daily prayers, educational programs, and community services.',
    facilities: ['Parking', 'Wheelchair Access', 'WiFi', 'Library', 'Cafeteria', 'Childcare'],
    prayerTimes: {
      fajr: '05:30',
      dhuhr: '12:15',
      asr: '15:45',
      maghrib: '18:20',
      isha: '19:45'
    },
    jummahTimes: ['12:30 PM', '1:30 PM'],
    rating: 4.8,
    isFavorite: false,
    capacity: 500,
    languages: ['English', 'Arabic', 'Urdu'],
    services: ['Daily Prayers', 'Friday Prayer', 'Quran Classes', 'Islamic Education', 'Marriage Services', 'Funeral Services']
  },
  {
    id: '2',
    name: 'Masjid Al-Noor',
    address: '456 Oak Avenue, Los Angeles, CA 90210',
    city: 'Los Angeles',
    country: 'United States',
    latitude: 34.0522,
    longitude: -118.2437,
    phone: '+1 (555) 987-6543',
    website: 'https://masjidalnoor.org',
    description: 'A beautiful mosque with modern facilities and a welcoming community. Offers various educational and social programs.',
    facilities: ['Parking', 'Wheelchair Access', 'WiFi', 'Library', 'Gym'],
    prayerTimes: {
      fajr: '05:25',
      dhuhr: '12:10',
      asr: '15:40',
      maghrib: '18:15',
      isha: '19:40'
    },
    jummahTimes: ['12:15 PM', '1:15 PM'],
    rating: 4.6,
    isFavorite: false,
    capacity: 300,
    languages: ['English', 'Arabic', 'Spanish'],
    services: ['Daily Prayers', 'Friday Prayer', 'Quran Classes', 'Youth Programs', 'Community Events']
  },
  {
    id: '3',
    name: 'Islamic Society of Toronto',
    address: '789 Maple Street, Toronto, ON M5V 3A8',
    city: 'Toronto',
    country: 'Canada',
    latitude: 43.6532,
    longitude: -79.3832,
    phone: '+1 (416) 555-0123',
    website: 'https://ist.ca',
    description: 'One of the largest Islamic centers in Canada, providing comprehensive religious and community services.',
    facilities: ['Parking', 'Wheelchair Access', 'WiFi', 'Library', 'Cafeteria', 'Childcare', 'Gym', 'Bookstore'],
    prayerTimes: {
      fajr: '05:35',
      dhuhr: '12:20',
      asr: '15:50',
      maghrib: '18:25',
      isha: '19:50'
    },
    jummahTimes: ['12:30 PM', '1:30 PM', '2:30 PM'],
    rating: 4.9,
    isFavorite: false,
    capacity: 1000,
    languages: ['English', 'Arabic', 'Urdu', 'French'],
    services: ['Daily Prayers', 'Friday Prayer', 'Quran Classes', 'Islamic Education', 'Marriage Services', 'Funeral Services', 'Youth Programs', 'Community Events', 'Food Bank']
  },
  {
    id: '4',
    name: 'London Central Mosque',
    address: '146 Park Road, London NW8 7RG, UK',
    city: 'London',
    country: 'United Kingdom',
    latitude: 51.5074,
    longitude: -0.1278,
    phone: '+44 20 7724 3363',
    website: 'https://iccuk.org',
    description: 'A historic mosque in the heart of London, serving the Muslim community for over 50 years.',
    facilities: ['Parking', 'Wheelchair Access', 'WiFi', 'Library', 'Cafeteria', 'Bookstore'],
    prayerTimes: {
      fajr: '05:40',
      dhuhr: '12:25',
      asr: '15:55',
      maghrib: '18:30',
      isha: '19:55'
    },
    jummahTimes: ['12:30 PM', '1:30 PM'],
    rating: 4.7,
    isFavorite: false,
    capacity: 400,
    languages: ['English', 'Arabic', 'Urdu', 'Bengali'],
    services: ['Daily Prayers', 'Friday Prayer', 'Quran Classes', 'Islamic Education', 'Marriage Services', 'Funeral Services', 'Community Events']
  },
  {
    id: '5',
    name: 'Sydney Islamic Centre',
    address: '321 George Street, Sydney NSW 2000, Australia',
    city: 'Sydney',
    country: 'Australia',
    latitude: -33.8688,
    longitude: 151.2093,
    phone: '+61 2 5555 0123',
    website: 'https://sic.org.au',
    description: 'A modern Islamic center in Sydney offering comprehensive religious and community services.',
    facilities: ['Parking', 'Wheelchair Access', 'WiFi', 'Library', 'Cafeteria', 'Childcare', 'Gym'],
    prayerTimes: {
      fajr: '05:20',
      dhuhr: '12:05',
      asr: '15:35',
      maghrib: '18:10',
      isha: '19:35'
    },
    jummahTimes: ['12:15 PM', '1:15 PM'],
    rating: 4.5,
    isFavorite: false,
    capacity: 600,
    languages: ['English', 'Arabic', 'Urdu', 'Indonesian'],
    services: ['Daily Prayers', 'Friday Prayer', 'Quran Classes', 'Islamic Education', 'Youth Programs', 'Community Events']
  }
]

const facilities = ['Parking', 'Wheelchair Access', 'WiFi', 'Library', 'Cafeteria', 'Childcare', 'Gym', 'Bookstore']
const services = ['Daily Prayers', 'Friday Prayer', 'Quran Classes', 'Islamic Education', 'Marriage Services', 'Funeral Services', 'Youth Programs', 'Community Events']

export default function MosquesPage() {
  const [mosques, setMosques] = useState<Mosque[]>(sampleMosques)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'name'>('distance')
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null)

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
        }
      )
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

  const filteredMosques = mosques.filter(mosque => {
    const matchesSearch = mosque.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mosque.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mosque.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mosque.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFacilities = selectedFacilities.length === 0 || 
                             selectedFacilities.every(facility => mosque.facilities.includes(facility))
    
    const matchesServices = selectedServices.length === 0 || 
                           selectedServices.every(service => mosque.services.includes(service))
    
    return matchesSearch && matchesFacilities && matchesServices
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
              <CardTitle className="flex items-center gap-2">
                <SearchIcon className="h-6 w-6" />
                Search & Filter
              </CardTitle>
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

                {/* Facilities Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Facilities</label>
                  <div className="flex flex-wrap gap-2">
                    {facilities.map((facility) => (
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
                      >
                        {facility}
                      </Button>
                    ))}
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
            </CardContent>
          </Card>
        </div>

        {/* Mosques List */}
        <div className="space-y-6">
          {filteredMosques.map((mosque) => (
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
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="h-4 w-4" />
                          <span>{mosque.address}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <NavigationIcon className="h-4 w-4" />
                          <span>{formatDistance(mosque.distance)}</span>
                        </div>
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
                    </div>
                  </div>

                  {/* Prayer Times */}
                  <div className="grid grid-cols-5 gap-2">
                    {Object.entries(mosque.prayerTimes).map(([prayer, time]) => (
                      <div key={prayer} className="text-center p-2 bg-primary/5 rounded">
                        <div className="text-xs font-medium text-muted-foreground capitalize">{prayer}</div>
                        <div className="text-sm font-semibold text-primary">{time}</div>
                      </div>
                    ))}
                  </div>

                  {/* Facilities */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Facilities</h4>
                    <div className="flex flex-wrap gap-1">
                      {mosque.facilities.map((facility) => (
                        <span
                          key={facility}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="flex items-center gap-4 text-sm">
                    {mosque.phone && (
                      <div className="flex items-center gap-1">
                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{mosque.phone}</span>
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
                    {mosque.capacity && (
                      <div className="flex items-center gap-1">
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                        <span>Capacity: {mosque.capacity}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredMosques.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MapPinIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                No mosques found
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedFacilities.length > 0 || selectedServices.length > 0
                  ? 'Try adjusting your search or filters'
                  : 'No mosques available in your area'
                }
              </p>
              <Button
                variant="islamic"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedFacilities([])
                  setSelectedServices([])
                }}
              >
                Clear Filters
              </Button>
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
