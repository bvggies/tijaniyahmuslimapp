'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ClockIcon,
  SearchIcon,
  FilterIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  RefreshCwIcon,
  GlobeIcon,
  MapPinIcon,
  CalendarIcon,
  SettingsIcon,
  DownloadIcon,
  UploadIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon
} from 'lucide-react'

interface PrayerTime {
  id: string
  mosqueId: string
  mosqueName: string
  city: string
  country: string
  latitude: number
  longitude: number
  date: string
  fajr: string
  sunrise: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
  calculationMethod: string
  asrMethod: string
  highLatitudeMethod: string
  fajrAngle: number
  ishaAngle: number
  timezone: string
  dstOffset: number
  lastUpdated: Date
  isActive: boolean
}

const mockPrayerTimes: PrayerTime[] = [
  {
    id: '1',
    mosqueId: '1',
    mosqueName: 'Islamic Center of New York',
    city: 'New York',
    country: 'United States',
    latitude: 40.7128,
    longitude: -74.0060,
    date: '2024-01-20',
    fajr: '05:30',
    sunrise: '07:15',
    dhuhr: '12:15',
    asr: '15:45',
    maghrib: '18:20',
    isha: '19:45',
    calculationMethod: 'ISNA',
    asrMethod: 'Hanafi',
    highLatitudeMethod: 'Angle-based',
    fajrAngle: 15,
    ishaAngle: 15,
    timezone: 'America/New_York',
    dstOffset: 0,
    lastUpdated: new Date('2024-01-20T10:30:00'),
    isActive: true
  },
  {
    id: '2',
    mosqueId: '2',
    mosqueName: 'Masjid Al-Noor',
    city: 'Los Angeles',
    country: 'United States',
    latitude: 34.0522,
    longitude: -118.2437,
    date: '2024-01-20',
    fajr: '05:25',
    sunrise: '07:10',
    dhuhr: '12:10',
    asr: '15:40',
    maghrib: '18:15',
    isha: '19:40',
    calculationMethod: 'ISNA',
    asrMethod: 'Hanafi',
    highLatitudeMethod: 'Angle-based',
    fajrAngle: 15,
    ishaAngle: 15,
    timezone: 'America/Los_Angeles',
    dstOffset: 0,
    lastUpdated: new Date('2024-01-20T10:30:00'),
    isActive: true
  },
  {
    id: '3',
    mosqueId: '3',
    mosqueName: 'Islamic Society of Toronto',
    city: 'Toronto',
    country: 'Canada',
    latitude: 43.6532,
    longitude: -79.3832,
    date: '2024-01-20',
    fajr: '05:35',
    sunrise: '07:20',
    dhuhr: '12:20',
    asr: '15:50',
    maghrib: '18:25',
    isha: '19:50',
    calculationMethod: 'ISNA',
    asrMethod: 'Hanafi',
    highLatitudeMethod: 'Angle-based',
    fajrAngle: 15,
    ishaAngle: 15,
    timezone: 'America/Toronto',
    dstOffset: 0,
    lastUpdated: new Date('2024-01-20T10:30:00'),
    isActive: true
  },
  {
    id: '4',
    mosqueId: '4',
    mosqueName: 'London Central Mosque',
    city: 'London',
    country: 'United Kingdom',
    latitude: 51.5074,
    longitude: -0.1278,
    date: '2024-01-20',
    fajr: '05:40',
    sunrise: '07:25',
    dhuhr: '12:25',
    asr: '15:55',
    maghrib: '18:30',
    isha: '19:55',
    calculationMethod: 'MWL',
    asrMethod: 'Shafi',
    highLatitudeMethod: 'Angle-based',
    fajrAngle: 18,
    ishaAngle: 17,
    timezone: 'Europe/London',
    dstOffset: 0,
    lastUpdated: new Date('2024-01-20T10:30:00'),
    isActive: true
  }
]

const calculationMethods = ['ISNA', 'MWL', 'Egypt', 'Karachi', 'Umm al-Qura', 'Dubai', 'Qatar', 'Kuwait', 'Moonsighting Committee', 'Turkey', 'Russia', 'Singapore', 'Tehran', 'Jafari']
const asrMethods = ['Hanafi', 'Shafi']
const highLatitudeMethods = ['None', 'Night Middle', 'One Seventh', 'Angle-based']
const timezones = ['UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Asia/Dubai', 'Asia/Karachi', 'Asia/Jakarta', 'Australia/Sydney']

export default function AdminPrayersPage() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>(mockPrayerTimes)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [selectedMethod, setSelectedMethod] = useState('All')
  const [selectedPrayerTime, setSelectedPrayerTime] = useState<PrayerTime | null>(null)
  const [showPrayerTimeDetails, setShowPrayerTimeDetails] = useState(false)
  const [showBulkUpdate, setShowBulkUpdate] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const countries = ['All', 'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'UAE', 'Saudi Arabia']
  const methods = ['All', 'ISNA', 'MWL', 'Egypt', 'Karachi', 'Umm al-Qura', 'Dubai', 'Qatar', 'Kuwait']

  const filteredPrayerTimes = prayerTimes.filter(prayerTime => {
    const matchesSearch = prayerTime.mosqueName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prayerTime.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prayerTime.country.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCountry = selectedCountry === 'All' || 
                          prayerTime.country === selectedCountry
    
    const matchesMethod = selectedMethod === 'All' || 
                         prayerTime.calculationMethod === selectedMethod
    
    return matchesSearch && matchesCountry && matchesMethod
  })

  const updatePrayerTime = (prayerTimeId: string, updates: Partial<PrayerTime>) => {
    setPrayerTimes(prevPrayerTimes => 
      prevPrayerTimes.map(prayerTime => 
        prayerTime.id === prayerTimeId 
          ? { ...prayerTime, ...updates, lastUpdated: new Date() }
          : prayerTime
      )
    )
  }

  const recalculatePrayerTimes = async () => {
    setIsUpdating(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update all prayer times
    setPrayerTimes(prevPrayerTimes => 
      prevPrayerTimes.map(prayerTime => ({
        ...prayerTime,
        lastUpdated: new Date()
      }))
    )
    
    setIsUpdating(false)
  }

  const bulkUpdateMethod = async (method: string) => {
    setIsUpdating(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setPrayerTimes(prevPrayerTimes => 
      prevPrayerTimes.map(prayerTime => ({
        ...prayerTime,
        calculationMethod: method,
        lastUpdated: new Date()
      }))
    )
    
    setIsUpdating(false)
  }

  const exportPrayerTimes = () => {
    // Simulate export functionality
    console.log('Exporting prayer times...')
  }

  const importPrayerTimes = () => {
    // Simulate import functionality
    console.log('Importing prayer times...')
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Prayer Times Management</h1>
            <p className="text-muted-foreground">Manage prayer times for all mosques</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={importPrayerTimes}>
              <UploadIcon className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" onClick={exportPrayerTimes}>
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button 
              variant="outline" 
              onClick={recalculatePrayerTimes}
              disabled={isUpdating}
            >
              <RefreshCwIcon className={`h-4 w-4 mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
              {isUpdating ? 'Updating...' : 'Recalculate All'}
            </Button>
            <Button 
              variant="islamic"
              onClick={() => setShowBulkUpdate(true)}
            >
              <SettingsIcon className="h-4 w-4 mr-2" />
              Bulk Update
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
                  <p className="text-3xl font-bold text-primary">{prayerTimes.length}</p>
                </div>
                <MapPinIcon className="h-8 w-8 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active</p>
                  <p className="text-3xl font-bold text-green-600">
                    {prayerTimes.filter(p => p.isActive).length}
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
                  <p className="text-sm font-medium text-muted-foreground">Countries</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {new Set(prayerTimes.map(p => p.country)).size}
                  </p>
                </div>
                <GlobeIcon className="h-8 w-8 text-blue-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                  <p className="text-sm font-bold text-primary">
                    {formatDate(new Date(Math.max(...prayerTimes.map(p => p.lastUpdated.getTime()))))}
                  </p>
                </div>
                <ClockIcon className="h-8 w-8 text-purple-500/20" />
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
                  placeholder="Search mosques by name, city, or country..."
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
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="p-2 border border-input rounded-lg"
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="p-2 border border-input rounded-lg"
                  >
                    {methods.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prayer Times List */}
        <Card>
          <CardHeader>
            <CardTitle>Prayer Times ({filteredPrayerTimes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPrayerTimes.map((prayerTime) => (
                <div key={prayerTime.id} className="flex items-center justify-between p-4 border border-input rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <ClockIcon className="h-6 w-6 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{prayerTime.mosqueName}</h3>
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {prayerTime.calculationMethod}
                        </span>
                        {prayerTime.isActive ? (
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangleIcon className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="h-3 w-3" />
                          <span>{prayerTime.city}, {prayerTime.country}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{prayerTime.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-3 w-3" />
                          <span>Updated {formatDate(prayerTime.lastUpdated)}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-6 gap-2 text-sm">
                        <div className="text-center p-2 bg-primary/5 rounded">
                          <div className="text-xs text-muted-foreground">Fajr</div>
                          <div className="font-semibold text-primary">{prayerTime.fajr}</div>
                        </div>
                        <div className="text-center p-2 bg-primary/5 rounded">
                          <div className="text-xs text-muted-foreground">Sunrise</div>
                          <div className="font-semibold text-primary">{prayerTime.sunrise}</div>
                        </div>
                        <div className="text-center p-2 bg-primary/5 rounded">
                          <div className="text-xs text-muted-foreground">Dhuhr</div>
                          <div className="font-semibold text-primary">{prayerTime.dhuhr}</div>
                        </div>
                        <div className="text-center p-2 bg-primary/5 rounded">
                          <div className="text-xs text-muted-foreground">Asr</div>
                          <div className="font-semibold text-primary">{prayerTime.asr}</div>
                        </div>
                        <div className="text-center p-2 bg-primary/5 rounded">
                          <div className="text-xs text-muted-foreground">Maghrib</div>
                          <div className="font-semibold text-primary">{prayerTime.maghrib}</div>
                        </div>
                        <div className="text-center p-2 bg-primary/5 rounded">
                          <div className="text-xs text-muted-foreground">Isha</div>
                          <div className="font-semibold text-primary">{prayerTime.isha}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedPrayerTime(prayerTime)
                        setShowPrayerTimeDetails(true)
                      }}
                    >
                      <EditIcon className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updatePrayerTime(prayerTime.id, { isActive: !prayerTime.isActive })}
                    >
                      {prayerTime.isActive ? (
                        <AlertTriangleIcon className="h-4 w-4 text-red-500" />
                      ) : (
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bulk Update Modal */}
        {showBulkUpdate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Bulk Update Prayer Times</CardTitle>
                <CardDescription>
                  Update calculation method for all mosques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Calculation Method</label>
                    <select
                      className="w-full p-3 border border-input rounded-lg"
                      onChange={(e) => {
                        if (e.target.value) {
                          bulkUpdateMethod(e.target.value)
                          setShowBulkUpdate(false)
                        }
                      }}
                    >
                      <option value="">Select method...</option>
                      {calculationMethods.map(method => (
                        <option key={method} value={method}>{method}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowBulkUpdate(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Prayer Time Details Modal */}
        {showPrayerTimeDetails && selectedPrayerTime && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Prayer Time Details</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPrayerTimeDetails(false)}
                  >
                    <XCircleIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h4 className="font-semibold mb-3">Mosque Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Mosque Name</label>
                        <p className="text-sm">{selectedPrayerTime.mosqueName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Location</label>
                        <p className="text-sm">{selectedPrayerTime.city}, {selectedPrayerTime.country}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Date</label>
                        <p className="text-sm">{selectedPrayerTime.date}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Timezone</label>
                        <p className="text-sm">{selectedPrayerTime.timezone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Prayer Times */}
                  <div>
                    <h4 className="font-semibold mb-3">Prayer Times</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-primary/5 rounded">
                        <div className="text-sm text-muted-foreground">Fajr</div>
                        <div className="text-lg font-semibold text-primary">{selectedPrayerTime.fajr}</div>
                      </div>
                      <div className="text-center p-3 bg-primary/5 rounded">
                        <div className="text-sm text-muted-foreground">Sunrise</div>
                        <div className="text-lg font-semibold text-primary">{selectedPrayerTime.sunrise}</div>
                      </div>
                      <div className="text-center p-3 bg-primary/5 rounded">
                        <div className="text-sm text-muted-foreground">Dhuhr</div>
                        <div className="text-lg font-semibold text-primary">{selectedPrayerTime.dhuhr}</div>
                      </div>
                      <div className="text-center p-3 bg-primary/5 rounded">
                        <div className="text-sm text-muted-foreground">Asr</div>
                        <div className="text-lg font-semibold text-primary">{selectedPrayerTime.asr}</div>
                      </div>
                      <div className="text-center p-3 bg-primary/5 rounded">
                        <div className="text-sm text-muted-foreground">Maghrib</div>
                        <div className="text-lg font-semibold text-primary">{selectedPrayerTime.maghrib}</div>
                      </div>
                      <div className="text-center p-3 bg-primary/5 rounded">
                        <div className="text-sm text-muted-foreground">Isha</div>
                        <div className="text-lg font-semibold text-primary">{selectedPrayerTime.isha}</div>
                      </div>
                    </div>
                  </div>

                  {/* Calculation Settings */}
                  <div>
                    <h4 className="font-semibold mb-3">Calculation Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Calculation Method</label>
                        <p className="text-sm">{selectedPrayerTime.calculationMethod}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Asr Method</label>
                        <p className="text-sm">{selectedPrayerTime.asrMethod}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">High Latitude Method</label>
                        <p className="text-sm">{selectedPrayerTime.highLatitudeMethod}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Fajr Angle</label>
                        <p className="text-sm">{selectedPrayerTime.fajrAngle}°</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Isha Angle</label>
                        <p className="text-sm">{selectedPrayerTime.ishaAngle}°</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">DST Offset</label>
                        <p className="text-sm">{selectedPrayerTime.dstOffset} hours</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setShowPrayerTimeDetails(false)}
                    >
                      Close
                    </Button>
                    <Button
                      variant="islamic"
                      onClick={() => {
                        // Handle edit prayer time
                        setShowPrayerTimeDetails(false)
                      }}
                    >
                      Edit Prayer Times
                    </Button>
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
