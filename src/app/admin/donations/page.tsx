'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DownloadIcon, 
  EyeIcon, 
  CheckIcon, 
  XIcon, 
  FilterIcon,
  SearchIcon,
  CalendarIcon,
  DollarSignIcon,
  UserIcon,
  FileTextIcon
} from 'lucide-react'

interface Donation {
  id: string
  donorName: string
  donorEmail: string
  donorPhone?: string
  amount: number
  currency: string
  message?: string
  receiptUrl: string
  status: 'pending' | 'verified' | 'rejected'
  submittedAt: string
  verifiedAt?: string
  verifiedBy?: string
}

const mockDonations: Donation[] = [
  {
    id: '1',
    donorName: 'Ahmad Hassan',
    donorEmail: 'ahmad@example.com',
    donorPhone: '+233 24 123 4567',
    amount: 50,
    currency: 'GHS',
    message: 'May Allah bless this app and its developers',
    receiptUrl: '/receipts/donation-1.pdf',
    status: 'verified',
    submittedAt: '2024-01-20T10:30:00Z',
    verifiedAt: '2024-01-20T11:15:00Z',
    verifiedBy: 'admin'
  },
  {
    id: '2',
    donorName: 'Fatima Al-Zahra',
    donorEmail: 'fatima@example.com',
    donorPhone: '+233 55 987 6543',
    amount: 25,
    currency: 'GHS',
    receiptUrl: '/receipts/donation-2.jpg',
    status: 'pending',
    submittedAt: '2024-01-21T14:20:00Z'
  },
  {
    id: '3',
    donorName: 'Omar Abdullah',
    donorEmail: 'omar@example.com',
    amount: 100,
    currency: 'GHS',
    message: 'Keep up the great work!',
    receiptUrl: '/receipts/donation-3.png',
    status: 'verified',
    submittedAt: '2024-01-21T16:45:00Z',
    verifiedAt: '2024-01-21T17:30:00Z',
    verifiedBy: 'admin'
  }
]

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [adminUser, setAdminUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null)

  useEffect(() => {
    // Check admin authentication
    const token = localStorage.getItem('admin-token')
    const user = localStorage.getItem('admin-user')
    
    if (!token || !user) {
      window.location.href = '/admin/login'
      return
    }
    
    setAdminUser(JSON.parse(user))
    fetchDonations()
  }, [])

  const fetchDonations = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/donations')
      const data = await response.json()
      
      if (data.success) {
        setDonations(data.data)
      } else {
        console.error('Failed to fetch donations:', data.error)
        // Fallback to mock data
        setDonations(mockDonations)
      }
    } catch (error) {
      console.error('Error fetching donations:', error)
      // Fallback to mock data
      setDonations(mockDonations)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredDonations = donations.filter(donation => {
    const matchesFilter = filter === 'all' || donation.status === filter
    const matchesSearch = donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.donorEmail.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleStatusChange = async (id: string, status: 'verified' | 'rejected') => {
    try {
      const response = await fetch('/api/donations', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          status,
          verifiedBy: adminUser?.username || 'admin'
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Update local state
          setDonations(prev => prev.map(donation => 
            donation.id === id 
              ? { 
                  ...donation, 
                  status, 
                  verifiedAt: new Date().toISOString(),
                  verifiedBy: adminUser?.username || 'admin'
                }
              : donation
          ))
        } else {
          console.error('Failed to update donation status:', data.error)
        }
      } else {
        console.error('Failed to update donation status')
      }
    } catch (error) {
      console.error('Error updating donation status:', error)
    }
  }

  const handleViewReceipt = (receiptUrl: string) => {
    if (receiptUrl.startsWith('data:')) {
      // It's a base64 data URL, show in modal
      setSelectedReceipt(receiptUrl)
    } else {
      // It's a regular URL, open in new tab
      window.open(receiptUrl, '_blank')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Verified</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Pending</Badge>
      case 'rejected':
        return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0)
  const verifiedDonations = donations.filter(d => d.status === 'verified').length
  const pendingDonations = donations.filter(d => d.status === 'pending').length

  if (!adminUser) {
    return <div>Loading...</div>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Loading Donations...</h3>
          <p className="text-muted-foreground">Please wait while we fetch the latest donations</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="muslim-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Donations</p>
                <p className="text-2xl font-bold text-primary">{donations.length}</p>
              </div>
              <DollarSignIcon className="h-8 w-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="muslim-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold text-primary">{totalDonations} GHS</p>
              </div>
              <DollarSignIcon className="h-8 w-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="muslim-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold text-green-500">{verifiedDonations}</p>
              </div>
              <CheckIcon className="h-8 w-8 text-green-500/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="muslim-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-500">{pendingDonations}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-yellow-500/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search donations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'verified', 'rejected'].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "islamic" : "outline"}
              size="sm"
              onClick={() => setFilter(status as any)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Donations List */}
      <div className="space-y-4">
        {filteredDonations.map((donation) => (
          <Card key={donation.id} className="muslim-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{donation.donorName}</h3>
                    <p className="text-sm text-muted-foreground">{donation.donorEmail}</p>
                    {donation.donorPhone && (
                      <p className="text-xs text-muted-foreground">{donation.donorPhone}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{donation.amount} {donation.currency}</div>
                  {getStatusBadge(donation.status)}
                </div>
              </div>

              {donation.message && (
                <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">"{donation.message}"</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Submitted: {new Date(donation.submittedAt).toLocaleDateString()}</span>
                  </div>
                  {donation.verifiedAt && (
                    <div className="flex items-center gap-1">
                      <CheckIcon className="h-4 w-4" />
                      <span>Verified: {new Date(donation.verifiedAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewReceipt(donation.receiptUrl)}
                  >
                    <EyeIcon className="h-4 w-4 mr-1" />
                    View Receipt
                  </Button>
                  
                  {donation.status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(donation.id, 'verified')}
                        className="text-green-600 border-green-600/30 hover:bg-green-600/10"
                      >
                        <CheckIcon className="h-4 w-4 mr-1" />
                        Verify
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(donation.id, 'rejected')}
                        className="text-red-600 border-red-600/30 hover:bg-red-600/10"
                      >
                        <XIcon className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDonations.length === 0 && (
        <Card className="muslim-card">
          <CardContent className="p-12 text-center">
            <FileTextIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No donations found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Try adjusting your search terms' : 'No donations match the current filter'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Receipt Viewer Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-4xl max-h-[90vh] w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Payment Receipt</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedReceipt(null)}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 overflow-auto max-h-[70vh]">
              <img
                src={selectedReceipt}
                alt="Payment Receipt"
                className="max-w-full h-auto rounded-lg border"
                onError={(e) => {
                  console.error('Error loading receipt image:', e)
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextElementSibling?.classList.remove('hidden')
                }}
              />
              <div className="hidden text-center text-muted-foreground mt-4">
                <p>Unable to load receipt image</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(selectedReceipt, '_blank')}
                  className="mt-2"
                >
                  Open in New Tab
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
