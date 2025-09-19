'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  MapPinIcon,
  SearchIcon,
  FilterIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PhoneIcon,
  GlobeIcon,
  UsersIcon,
  StarIcon,
  AlertTriangleIcon,
  CalendarIcon,
  PlusIcon
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
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  submittedBy: string
  submittedAt: Date
  reviewedBy?: string
  reviewedAt?: Date
  capacity?: number
  languages: string[]
  services: string[]
  rating: number
  totalReviews: number
  isVerified: boolean
  image?: string
}

const mockMosques: Mosque[] = [
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
    status: 'approved',
    submittedBy: 'Ahmad Hassan',
    submittedAt: new Date('2024-01-15'),
    reviewedBy: 'Admin User',
    reviewedAt: new Date('2024-01-16'),
    capacity: 500,
    languages: ['English', 'Arabic', 'Urdu'],
    services: ['Daily Prayers', 'Friday Prayer', 'Quran Classes', 'Islamic Education', 'Marriage Services', 'Funeral Services'],
    rating: 4.8,
    totalReviews: 45,
    isVerified: true
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
    status: 'approved',
    submittedBy: 'Fatima Al-Zahra',
    submittedAt: new Date('2024-01-10'),
    reviewedBy: 'Admin User',
    reviewedAt: new Date('2024-01-12'),
    capacity: 300,
    languages: ['English', 'Arabic', 'Spanish'],
    services: ['Daily Prayers', 'Friday Prayer', 'Quran Classes', 'Youth Programs', 'Community Events'],
    rating: 4.6,
    totalReviews: 23,
    isVerified: true
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
    status: 'pending',
    submittedBy: 'Omar Abdullah',
    submittedAt: new Date('2024-01-18'),
    capacity: 1000,
    languages: ['English', 'Arabic', 'Urdu', 'French'],
    services: ['Daily Prayers', 'Friday Prayer', 'Quran Classes', 'Islamic Education', 'Marriage Services', 'Funeral Services', 'Youth Programs', 'Community Events', 'Food Bank'],
    rating: 0,
    totalReviews: 0,
    isVerified: false
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
    status: 'approved',
    submittedBy: 'Aisha Rahman',
    submittedAt: new Date('2024-01-05'),
    reviewedBy: 'Admin User',
    reviewedAt: new Date('2024-01-06'),
    capacity: 400,
    languages: ['English', 'Arabic', 'Urdu', 'Bengali'],
    services: ['Daily Prayers', 'Friday Prayer', 'Quran Classes', 'Islamic Education', 'Marriage Services', 'Funeral Services', 'Community Events'],
    rating: 4.7,
    totalReviews: 67,
    isVerified: true
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
    status: 'rejected',
    submittedBy: 'Yusuf Ibrahim',
    submittedAt: new Date('2024-01-12'),
    reviewedBy: 'Admin User',
    reviewedAt: new Date('2024-01-13'),
    capacity: 600,
    languages: ['English', 'Arabic', 'Urdu', 'Indonesian'],
    services: ['Daily Prayers', 'Friday Prayer', 'Quran Classes', 'Islamic Education', 'Youth Programs', 'Community Events'],
    rating: 0,
    totalReviews: 0,
    isVerified: false
  }
]

const statusOptions = ['All', 'Pending', 'Approved', 'Rejected', 'Suspended']
const countryOptions = ['All', 'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France']

export default function AdminMosquesPage() {
  const [mosques, setMosques] = useState<Mosque[]>(mockMosques)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null)
  const [showMosqueDetails, setShowMosqueDetails] = useState(false)

  const filteredMosques = mosques.filter(mosque => {
    const matchesSearch = mosque.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mosque.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mosque.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mosque.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'All' || 
                         mosque.status === selectedStatus.toLowerCase()
    
    const matchesCountry = selectedCountry === 'All' || 
                          mosque.country === selectedCountry
    
    return matchesSearch && matchesStatus && matchesCountry
  })

  const updateMosqueStatus = (mosqueId: string, newStatus: Mosque['status'], reviewedBy: string) => {
    setMosques(prevMosques => 
      prevMosques.map(mosque => 
        mosque.id === mosqueId 
          ? { 
              ...mosque, 
              status: newStatus, 
              reviewedBy,
              reviewedAt: new Date()
            }
          : mosque
      )
    )
  }

  const toggleVerification = (mosqueId: string) => {
    setMosques(prevMosques => 
      prevMosques.map(mosque => 
        mosque.id === mosqueId 
          ? { ...mosque, isVerified: !mosque.isVerified }
          : mosque
      )
    )
  }

  const deleteMosque = (mosqueId: string) => {
    if (confirm('Are you sure you want to delete this mosque? This action cannot be undone.')) {
      setMosques(prevMosques => prevMosques.filter(mosque => mosque.id !== mosqueId))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'rejected':
        return 'text-red-600 bg-red-100'
      case 'suspended':
        return 'text-orange-600 bg-orange-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return formatDate(date)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Mosque Management</h1>
            <p className="text-muted-foreground">Manage mosque listings and approvals</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <AlertTriangleIcon className="h-4 w-4 mr-2" />
              Pending Review ({mosques.filter(m => m.status === 'pending').length})
            </Button>
            <Button variant="islamic">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Mosque
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Mosques</p>
                  <p className="text-3xl font-bold text-primary">{mosques.length}</p>
                </div>
                <MapPinIcon className="h-8 w-8 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-3xl font-bold text-green-600">
                    {mosques.filter(m => m.status === 'approved').length}
                  </p>
                </div>
                <CheckCircleIcon className="h-8 w-8 text-green-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {mosques.filter(m => m.status === 'pending').length}
                  </p>
                </div>
                <ClockIcon className="h-8 w-8 text-yellow-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Verified</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {mosques.filter(m => m.isVerified).length}
                  </p>
                </div>
                <StarIcon className="h-8 w-8 text-purple-500/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
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
                  placeholder="Search mosques by name, address, city, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <FilterIcon className="h-4 w-4" />
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="p-2 border border-input rounded-lg"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="p-2 border border-input rounded-lg"
                  >
                    {countryOptions.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mosques List */}
        <Card>
          <CardHeader>
            <CardTitle>Mosques ({filteredMosques.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMosques.map((mosque) => (
                <div key={mosque.id} className="flex items-start justify-between p-4 border border-input rounded-lg hover:bg-muted/50">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPinIcon className="h-6 w-6 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{mosque.name}</h3>
                        {mosque.isVerified && (
                          <StarIcon className="h-4 w-4 text-purple-500" />
                        )}
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(mosque.status)}`}>
                          {mosque.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="h-3 w-3" />
                          <span>{mosque.address}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <UsersIcon className="h-3 w-3" />
                          <span>{mosque.city}, {mosque.country}</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                        {mosque.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          <span>Submitted {formatDate(mosque.submittedAt)}</span>
                        </div>
                        {mosque.reviewedAt && (
                          <div className="flex items-center gap-1">
                            <ClockIcon className="h-3 w-3" />
                            <span>Reviewed {formatTimeAgo(mosque.reviewedAt)}</span>
                          </div>
                        )}
                        <span>Capacity: {mosque.capacity || 'N/A'}</span>
                        <span>Rating: {mosque.rating > 0 ? mosque.rating.toFixed(1) : 'N/A'}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {mosque.facilities.slice(0, 3).map(facility => (
                          <span
                            key={facility}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {facility}
                          </span>
                        ))}
                        {mosque.facilities.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{mosque.facilities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedMosque(mosque)
                        setShowMosqueDetails(true)
                      }}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleVerification(mosque.id)}
                    >
                      <StarIcon className={`h-4 w-4 ${mosque.isVerified ? 'text-purple-500' : 'text-muted-foreground'}`} />
                    </Button>
                    
                    {mosque.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateMosqueStatus(mosque.id, 'approved', 'Current Admin')}
                          className="text-green-500 hover:text-green-700"
                        >
                          <CheckCircleIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateMosqueStatus(mosque.id, 'rejected', 'Current Admin')}
                          className="text-red-500 hover:text-red-700"
                        >
                          <XCircleIcon className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMosque(mosque.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mosque Details Modal */}
        {showMosqueDetails && selectedMosque && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Mosque Details</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMosqueDetails(false)}
                  >
                    <XCircleIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h4 className="font-semibold mb-3">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Name</label>
                        <p className="text-sm">{selectedMosque.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedMosque.status)}`}>
                          {selectedMosque.status}
                        </span>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Address</label>
                        <p className="text-sm">{selectedMosque.address}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Location</label>
                        <p className="text-sm">{selectedMosque.city}, {selectedMosque.country}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Phone</label>
                        <p className="text-sm">{selectedMosque.phone || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Website</label>
                        <p className="text-sm">{selectedMosque.website || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-semibold mb-3">Description</h4>
                    <p className="text-sm text-muted-foreground">{selectedMosque.description}</p>
                  </div>

                  {/* Prayer Times */}
                  <div>
                    <h4 className="font-semibold mb-3">Prayer Times</h4>
                    <div className="grid grid-cols-5 gap-2">
                      {Object.entries(selectedMosque.prayerTimes).map(([prayer, time]) => (
                        <div key={prayer} className="text-center p-2 bg-primary/5 rounded">
                          <div className="text-xs font-medium text-muted-foreground capitalize">{prayer}</div>
                          <div className="text-sm font-semibold text-primary">{time}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Facilities */}
                  <div>
                    <h4 className="font-semibold mb-3">Facilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMosque.facilities.map(facility => (
                        <span
                          key={facility}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <h4 className="font-semibold mb-3">Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMosque.services.map(service => (
                        <span
                          key={service}
                          className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Submission Info */}
                  <div>
                    <h4 className="font-semibold mb-3">Submission Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Submitted By</label>
                        <p className="text-sm">{selectedMosque.submittedBy}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Submitted At</label>
                        <p className="text-sm">{formatDate(selectedMosque.submittedAt)}</p>
                      </div>
                      {selectedMosque.reviewedBy && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Reviewed By</label>
                          <p className="text-sm">{selectedMosque.reviewedBy}</p>
                        </div>
                      )}
                      {selectedMosque.reviewedAt && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Reviewed At</label>
                          <p className="text-sm">{formatDate(selectedMosque.reviewedAt)}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setShowMosqueDetails(false)}
                    >
                      Close
                    </Button>
                    {selectedMosque.status === 'pending' && (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => {
                            updateMosqueStatus(selectedMosque.id, 'rejected', 'Current Admin')
                            setShowMosqueDetails(false)
                          }}
                        >
                          Reject
                        </Button>
                        <Button
                          variant="islamic"
                          onClick={() => {
                            updateMosqueStatus(selectedMosque.id, 'approved', 'Current Admin')
                            setShowMosqueDetails(false)
                          }}
                        >
                          Approve
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
