'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart3Icon,
  TrendingUpIcon,
  TrendingDownIcon,
  UsersIcon,
  EyeIcon,
  HeartIcon,
  BookmarkIcon,
  ClockIcon,
  GlobeIcon,
  CalendarIcon,
  DownloadIcon,
  RefreshCwIcon,
  FilterIcon,
  ActivityIcon,
  StarIcon,
  MessageCircleIcon,
  MapPinIcon
} from 'lucide-react'

interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  newUsers: number
  userGrowth: number
  totalSessions: number
  averageSessionTime: number
  bounceRate: number
  totalPrayers: number
  totalDuas: number
  totalPosts: number
  totalBookmarks: number
  totalMosques: number
  topCountries: { country: string; users: number; percentage: number }[]
  topCities: { city: string; users: number; percentage: number }[]
  deviceBreakdown: { device: string; users: number; percentage: number }[]
  browserBreakdown: { browser: string; users: number; percentage: number }[]
  dailyActiveUsers: { date: string; users: number }[]
  weeklyActiveUsers: { week: string; users: number }[]
  monthlyActiveUsers: { month: string; users: number }[]
  featureUsage: { feature: string; users: number; percentage: number }[]
  contentEngagement: { content: string; views: number; likes: number; bookmarks: number }[]
}

const mockAnalytics: AnalyticsData = {
  totalUsers: 12543,
  activeUsers: 8921,
  newUsers: 234,
  userGrowth: 12.5,
  totalSessions: 98765,
  averageSessionTime: 24.5,
  bounceRate: 35.2,
  totalPrayers: 456789,
  totalDuas: 234567,
  totalPosts: 5678,
  totalBookmarks: 34567,
  totalMosques: 1234,
  topCountries: [
    { country: 'United States', users: 3245, percentage: 25.9 },
    { country: 'United Kingdom', users: 1890, percentage: 15.1 },
    { country: 'Canada', users: 1567, percentage: 12.5 },
    { country: 'Australia', users: 1234, percentage: 9.8 },
    { country: 'Germany', users: 987, percentage: 7.9 }
  ],
  topCities: [
    { city: 'New York', users: 1234, percentage: 9.8 },
    { city: 'London', users: 987, percentage: 7.9 },
    { city: 'Toronto', users: 765, percentage: 6.1 },
    { city: 'Sydney', users: 654, percentage: 5.2 },
    { city: 'Dubai', users: 543, percentage: 4.3 }
  ],
  deviceBreakdown: [
    { device: 'Mobile', users: 8765, percentage: 69.8 },
    { device: 'Desktop', users: 3123, percentage: 24.9 },
    { device: 'Tablet', users: 655, percentage: 5.2 }
  ],
  browserBreakdown: [
    { browser: 'Chrome', users: 6789, percentage: 54.1 },
    { browser: 'Safari', users: 2345, percentage: 18.7 },
    { browser: 'Firefox', users: 1234, percentage: 9.8 },
    { browser: 'Edge', users: 987, percentage: 7.9 },
    { browser: 'Other', users: 1188, percentage: 9.5 }
  ],
  dailyActiveUsers: [
    { date: '2024-01-14', users: 2100 },
    { date: '2024-01-15', users: 2300 },
    { date: '2024-01-16', users: 2500 },
    { date: '2024-01-17', users: 2400 },
    { date: '2024-01-18', users: 2600 },
    { date: '2024-01-19', users: 2800 },
    { date: '2024-01-20', users: 3000 }
  ],
  weeklyActiveUsers: [
    { week: 'Week 1', users: 15000 },
    { week: 'Week 2', users: 16500 },
    { week: 'Week 3', users: 17200 },
    { week: 'Week 4', users: 18900 }
  ],
  monthlyActiveUsers: [
    { month: 'Oct 2023', users: 45000 },
    { month: 'Nov 2023', users: 52000 },
    { month: 'Dec 2023', users: 58000 },
    { month: 'Jan 2024', users: 65000 }
  ],
  featureUsage: [
    { feature: 'Prayer Times', users: 8765, percentage: 69.8 },
    { feature: 'Qibla Compass', users: 6789, percentage: 54.1 },
    { feature: 'Duas & Supplications', users: 5432, percentage: 43.3 },
    { feature: 'Digital Tasbih', users: 4567, percentage: 36.4 },
    { feature: 'Community', users: 3456, percentage: 27.6 },
    { feature: 'Quran Reader', users: 2345, percentage: 18.7 },
    { feature: 'Mosque Locator', users: 1234, percentage: 9.8 }
  ],
  contentEngagement: [
    { content: 'Morning Dua', views: 12345, likes: 890, bookmarks: 456 },
    { content: 'Durood Sharif', views: 9876, likes: 567, bookmarks: 234 },
    { content: 'Ayatul Kursi', views: 8765, likes: 678, bookmarks: 345 },
    { content: 'Istighfar', views: 7654, likes: 456, bookmarks: 123 },
    { content: 'Surah Al-Fatiha', views: 6543, likes: 345, bookmarks: 234 }
  ]
}

const timeRanges = ['7 days', '30 days', '90 days', '1 year']
const chartTypes = ['Line', 'Bar', 'Pie', 'Area']

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>(mockAnalytics)
  const [selectedTimeRange, setSelectedTimeRange] = useState('30 days')
  const [selectedChartType, setSelectedChartType] = useState('Line')
  const [isLoading, setIsLoading] = useState(false)

  const refreshAnalytics = () => {
    setIsLoading(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const exportAnalytics = () => {
    // Simulate export functionality
    console.log('Exporting analytics data...')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive insights into app usage and user behavior</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={exportAnalytics}>
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button 
              variant="outline" 
              onClick={refreshAnalytics}
              disabled={isLoading}
            >
              <RefreshCwIcon className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Time Range Selector */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <FilterIcon className="h-5 w-5" />
              <span className="font-medium">Time Range:</span>
              <div className="flex gap-2">
                {timeRanges.map((range) => (
                  <Button
                    key={range}
                    variant={selectedTimeRange === range ? "islamic" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeRange(range)}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-primary">{analytics.totalUsers.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUpIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600">+{analytics.userGrowth}%</span>
                  </div>
                </div>
                <UsersIcon className="h-8 w-8 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-3xl font-bold text-primary">{analytics.activeUsers.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ActivityIcon className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-blue-600">+{analytics.newUsers} new</span>
                  </div>
                </div>
                <ActivityIcon className="h-8 w-8 text-blue-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Session Time</p>
                  <p className="text-3xl font-bold text-primary">{analytics.averageSessionTime}m</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ClockIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600">+2.3m</span>
                  </div>
                </div>
                <ClockIcon className="h-8 w-8 text-green-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bounce Rate</p>
                  <p className="text-3xl font-bold text-primary">{analytics.bounceRate}%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingDownIcon className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-600">-1.2%</span>
                  </div>
                </div>
                <BarChart3Icon className="h-8 w-8 text-red-500/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Prayer Sessions</p>
                  <p className="text-2xl font-bold text-primary">{analytics.totalPrayers.toLocaleString()}</p>
                </div>
                <ClockIcon className="h-6 w-6 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Duas Read</p>
                  <p className="text-2xl font-bold text-primary">{analytics.totalDuas.toLocaleString()}</p>
                </div>
                <HeartIcon className="h-6 w-6 text-pink-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Community Posts</p>
                  <p className="text-2xl font-bold text-primary">{analytics.totalPosts.toLocaleString()}</p>
                </div>
                <MessageCircleIcon className="h-6 w-6 text-purple-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bookmarks</p>
                  <p className="text-2xl font-bold text-primary">{analytics.totalBookmarks.toLocaleString()}</p>
                </div>
                <BookmarkIcon className="h-6 w-6 text-yellow-500/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Countries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GlobeIcon className="h-5 w-5" />
                Top Countries
              </CardTitle>
              <CardDescription>
                User distribution by country
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topCountries.map((country, index) => (
                  <div key={country.country} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium">{country.country}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{country.users.toLocaleString()}</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${country.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{country.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3Icon className="h-5 w-5" />
                Device Breakdown
              </CardTitle>
              <CardDescription>
                User devices and platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.deviceBreakdown.map((device) => (
                  <div key={device.device} className="flex items-center justify-between">
                    <span className="font-medium">{device.device}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{device.users.toLocaleString()}</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{device.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Usage */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <StarIcon className="h-5 w-5" />
              Feature Usage
            </CardTitle>
            <CardDescription>
              Most popular features and their usage rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.featureUsage.map((feature) => (
                <div key={feature.feature} className="flex items-center justify-between">
                  <span className="font-medium">{feature.feature}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{feature.users.toLocaleString()}</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${feature.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{feature.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Engagement */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <EyeIcon className="h-5 w-5" />
              Content Engagement
            </CardTitle>
            <CardDescription>
              Top performing content by engagement metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.contentEngagement.map((content) => (
                <div key={content.content} className="flex items-center justify-between p-4 border border-input rounded-lg">
                  <div>
                    <h4 className="font-semibold">{content.content}</h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <EyeIcon className="h-3 w-3" />
                        <span>{content.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <HeartIcon className="h-3 w-3" />
                        <span>{content.likes.toLocaleString()} likes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookmarkIcon className="h-3 w-3" />
                        <span>{content.bookmarks.toLocaleString()} bookmarks</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary">
                      {Math.round((content.likes + content.bookmarks) / content.views * 100)}% engagement
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Active Users Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUpIcon className="h-5 w-5" />
              Daily Active Users
            </CardTitle>
            <CardDescription>
              User activity over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Chart visualization would be implemented here</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Using libraries like Chart.js, Recharts, or D3.js
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
