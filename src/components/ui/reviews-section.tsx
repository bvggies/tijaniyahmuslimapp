'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  StarIcon, 
  SendIcon, 
  HeartIcon, 
  MessageCircleIcon,
  UserIcon,
  CalendarIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
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

interface ReviewsSectionProps {
  isLoggedIn: boolean
  userId?: string
  userName?: string
}

export function ReviewsSection({ isLoggedIn, userId, userName }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hoveredStar, setHoveredStar] = useState(0)

  // Load reviews from localStorage
  useEffect(() => {
    const savedReviews = localStorage.getItem('app-reviews')
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews))
    }
  }, [])

  // Save reviews to localStorage
  useEffect(() => {
    localStorage.setItem('app-reviews', JSON.stringify(reviews))
  }, [reviews])

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isLoggedIn) {
      toast.error('Please log in to submit a review')
      return
    }

    if (newReview.rating === 0) {
      toast.error('Please select a rating')
      return
    }

    if (!newReview.comment.trim()) {
      toast.error('Please write a comment')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const review: Review = {
        id: Date.now().toString(),
        userId: userId || 'anonymous',
        userName: userName || 'Anonymous User',
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString(),
        isApproved: false // Admin needs to approve
      }

      setReviews(prev => [review, ...prev])
      setNewReview({ rating: 0, comment: '' })
      setIsSubmitting(false)
      toast.success('Review submitted! It will be visible after admin approval.')
    }, 1000)
  }

  const handleStarClick = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }))
  }

  const handleStarHover = (rating: number) => {
    setHoveredStar(rating)
  }

  const handleStarLeave = () => {
    setHoveredStar(0)
  }

  const approvedReviews = reviews.filter(review => review.isApproved)
  const averageRating = approvedReviews.length > 0 
    ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) / approvedReviews.length 
    : 0

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <Card className="muslim-card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircleIcon className="h-5 w-5 text-primary" />
            User Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={cn(
                      "h-4 w-4",
                      star <= averageRating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                {approvedReviews.length} reviews
              </div>
            </div>
            <div className="flex-1">
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = approvedReviews.filter(r => r.rating === rating).length
                  const percentage = approvedReviews.length > 0 ? (count / approvedReviews.length) * 100 : 0
                  
                  return (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-sm w-2">{rating}</span>
                      <StarIcon className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Review Form */}
      {isLoggedIn && (
        <Card className="muslim-card-enhanced">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartIcon className="h-5 w-5 text-primary" />
              Share Your Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Rate the App
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={handleStarLeave}
                      className="p-1 rounded hover:bg-muted/50 transition-colors"
                    >
                      <StarIcon
                        className={cn(
                          "h-6 w-6 transition-colors",
                          star <= (hoveredStar || newReview.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-muted-foreground hover:text-yellow-400"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Review
                </label>
                <Textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your thoughts about the Tijaniyah Muslim App..."
                  className="min-h-[100px]"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || newReview.rating === 0 || !newReview.comment.trim()}
                className="w-full muslim-gradient"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <SendIcon className="h-4 w-4" />
                    Submit Review
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      {approvedReviews.length > 0 && (
        <Card className="muslim-card-enhanced">
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {approvedReviews.slice(0, 5).map((review) => (
                <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{review.userName}</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              className={cn(
                                "h-3 w-3",
                                star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!isLoggedIn && (
        <Card className="muslim-card-enhanced">
          <CardContent className="p-6 text-center">
            <MessageCircleIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Share Your Experience
            </h3>
            <p className="text-muted-foreground mb-4">
              Log in to share your thoughts about the Tijaniyah Muslim App
            </p>
            <Button className="muslim-gradient">
              Log In to Review
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
