'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  MessageCircleIcon, 
  StarIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  EyeIcon,
  UserIcon,
  CalendarIcon,
  FilterIcon,
  SearchIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'

interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
  isApproved: boolean
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending'>('all')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin-token')
    if (!token) {
      router.push('/admin/login')
    }
  }, [router])

  useEffect(() => {
    // Load reviews from localStorage
    const savedReviews = localStorage.getItem('app-reviews')
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews))
    }
  }, [])

  const handleApproveReview = (reviewId: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setReviews(prev =>
        prev.map(review =>
          review.id === reviewId ? { ...review, isApproved: true } : review
        )
      )
      // Update localStorage
      const updatedReviews = reviews.map(review =>
        review.id === reviewId ? { ...review, isApproved: true } : review
      )
      localStorage.setItem('app-reviews', JSON.stringify(updatedReviews))
      toast.success('Review approved successfully')
      setIsLoading(false)
    }, 500)
  }

  const handleRejectReview = (reviewId: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setReviews(prev => prev.filter(review => review.id !== reviewId))
      // Update localStorage
      const updatedReviews = reviews.filter(review => review.id !== reviewId)
      localStorage.setItem('app-reviews', JSON.stringify(updatedReviews))
      toast.success('Review rejected and removed')
      setIsLoading(false)
    }, 500)
  }

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filterStatus === 'approved') return matchesSearch && review.isApproved
    if (filterStatus === 'pending') return matchesSearch && !review.isApproved
    return matchesSearch
  })

  const pendingCount = reviews.filter(r => !r.isApproved).length
  const approvedCount = reviews.filter(r => r.isApproved).length
  const averageRating = approvedCount > 0 
    ? reviews.filter(r => r.isApproved).reduce((sum, r) => sum + r.rating, 0) / approvedCount 
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <div className="bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Reviews Management</h1>
              <p className="text-muted-foreground">Manage user reviews and ratings</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                {pendingCount} Pending
              </Badge>
              <Badge variant="outline" className="text-sm">
                {approvedCount} Approved
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="muslim-card-enhanced">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <MessageCircleIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{reviews.length}</div>
                  <div className="text-sm text-muted-foreground">Total Reviews</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="muslim-card-enhanced">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                  <StarIcon className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{averageRating.toFixed(1)}</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="muslim-card-enhanced">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-400/20 rounded-full flex items-center justify-center">
                  <XCircleIcon className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{pendingCount}</div>
                  <div className="text-sm text-muted-foreground">Pending Approval</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="muslim-card-enhanced mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                >
                  All ({reviews.length})
                </Button>
                <Button
                  variant={filterStatus === 'pending' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('pending')}
                >
                  Pending ({pendingCount})
                </Button>
                <Button
                  variant={filterStatus === 'approved' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('approved')}
                >
                  Approved ({approvedCount})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews Table */}
        <Card className="muslim-card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircleIcon className="h-5 w-5" />
              Reviews
            </CardTitle>
            <CardDescription>
              Manage and moderate user reviews
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <UserIcon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{review.userName}</div>
                            <div className="text-xs text-muted-foreground">{review.userId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating 
                                  ? 'text-yellow-400 fill-yellow-400' 
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm font-medium">{review.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="text-sm line-clamp-2">{review.comment}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <CalendarIcon className="h-4 w-4" />
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={review.isApproved ? 'default' : 'secondary'}
                          className={review.isApproved ? 'bg-green-500' : 'bg-orange-500'}
                        >
                          {review.isApproved ? 'Approved' : 'Pending'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {!review.isApproved && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleApproveReview(review.id)}
                                disabled={isLoading}
                                className="text-green-600 hover:text-green-700"
                              >
                                <CheckCircleIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectReview(review.id)}
                                disabled={isLoading}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircleIcon className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredReviews.length === 0 && (
              <div className="text-center py-8">
                <MessageCircleIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No reviews found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? 'Try adjusting your search terms' : 'No reviews match the current filter'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
