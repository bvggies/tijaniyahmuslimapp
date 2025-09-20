'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AdminLayout } from '@/components/admin/admin-layout'
import { 
  BarChart3Icon,
  UsersIcon,
  BookOpenIcon,
  MessageCircleIcon,
  MapPinIcon,
  VideoIcon,
  HeartHandshakeIcon,
  TrendingUpIcon,
  ActivityIcon,
  ClockIcon,
  StarIcon,
  HeartIcon,
  EyeIcon,
  DownloadIcon,
  RefreshCwIcon,
  SettingsIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  BellIcon,
  ShieldIcon,
  CalendarIcon,
  GlobeIcon,
  SmartphoneIcon,
  MonitorIcon,
  TabletIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalPrayers: number
  totalPosts: number
  totalDuas: number
  totalMosques: number
  totalBookmarks: number
  averageSessionTime: number
  weeklyGrowth: number
  dailyActiveUsers: number
  monthlyGrowth: number
  totalDonations: number
  totalReviews: number
  pendingReviews: number
  totalLiveStreams: number
  activeLiveStreams: number
}

interface RecentActivity {
  id: string
  type: 'user' | 'prayer' | 'post' | 'mosque' | 'dua' | 'donation' | 'review' | 'stream'
  action: string
  user: string
  timestamp: Date
  details?: string
  status?: 'success' | 'warning' | 'error' | 'info'
}

interface QuickAction {
  title: string
  description: string
  icon: React.ComponentType<any>
  href: string
  color: string
  count?: number
}

const mockStats: DashboardStats = {
  totalUsers: 12543,
  activeUsers: 8921,
  totalPrayers: 456789,
  totalPosts: 1234,
  totalDuas: 567,
  totalMosques: 89,
  totalBookmarks: 2345,
  averageSessionTime: 12,
  weeklyGrowth: 15.2,
  dailyActiveUsers: 120,
  monthlyGrowth: 8.5,
  totalDonations: 234,
  totalReviews: 156,
  pendingReviews: 12,
  totalLiveStreams: 8,
  activeLiveStreams: 3
}

const mockActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'user',
    action: 'New user registered',
    user: 'Ahmad Hassan',
    timestamp: new Date('2024-01-20T10:00:00'),
    details: 'Email: ahmad.hassan@example.com',
    status: 'success'
  },
  {
    id: '2',
    type: 'donation',
    action: 'New donation received',
    user: 'Fatima Ali',
    timestamp: new Date('2024-01-20T11:30:00'),
    details: 'Amount: $50.00 - Mobile Money',
    status: 'success'
  },
  {
    id: '3',
    type: 'review',
    action: 'New review submitted',
    user: 'Omar Khan',
    timestamp: new Date('2024-01-20T14:00:00'),
    details: 'Rating: 5 stars - "Excellent app!"',
    status: 'info'
  },
  {
    id: '4',
    type: 'mosque',
    action: 'Mosque added',
    user: 'Admin User',
    timestamp: new Date('2024-01-20T08:00:00'),
    details: 'Added Al-Noor Mosque, London',
    status: 'success'
  },
  {
    id: '5',
    type: 'stream',
    action: 'Live stream started',
    user: 'System',
    timestamp: new Date('2024-01-20T09:15:00'),
    details: 'Madina Live Stream - 2,450 viewers',
    status: 'success'
  },
  {
    id: '6',
    type: 'user',
    action: 'User account suspended',
    user: 'Admin User',
    timestamp: new Date('2024-01-20T07:30:00'),
    details: 'Reason: Inappropriate content',
    status: 'warning'
  }
]

const quickActions: QuickAction[] = [
  {
    title: 'Add New User',
    description: 'Create a new user account',
    icon: PlusIcon,
    href: '/admin/users',
    color: 'bg-blue-500',
    count: mockStats.totalUsers
  },
  {
    title: 'Moderate Reviews',
    description: 'Review pending submissions',
    icon: MessageCircleIcon,
    href: '/admin/reviews',
    color: 'bg-orange-500',
    count: mockStats.pendingReviews
  },
  {
    title: 'Manage Live Streams',
    description: 'Add or edit live broadcasts',
    icon: VideoIcon,
    href: '/admin/live-streams',
    color: 'bg-red-500',
    count: mockStats.activeLiveStreams
  },
  {
    title: 'View Donations',
    description: 'Track financial contributions',
    icon: HeartHandshakeIcon,
    href: '/admin/donations',
    color: 'bg-green-500',
    count: mockStats.totalDonations
  },
  {
    title: 'System Settings',
    description: 'Configure app settings',
    icon: SettingsIcon,
    href: '/admin/settings',
    color: 'bg-purple-500'
  },
  {
    title: 'View Analytics',
    description: 'Detailed performance reports',
    icon: BarChart3Icon,
    href: '/admin/analytics',
    color: 'bg-indigo-500'
  }
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>(mockStats)
  const [activities, setActivities] = useState<RecentActivity[]>(mockActivities)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d'>('7d')
  const router = useRouter()

  const refreshData = () => {
    setIsLoading(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <UsersIcon className="h-4 w-4" />
      case 'prayer':
        return <ClockIcon className="h-4 w-4" />
      case 'post':
        return <MessageCircleIcon className="h-4 w-4" />
      case 'mosque':
        return <MapPinIcon className="h-4 w-4" />
      case 'dua':
        return <BookOpenIcon className="h-4 w-4" />
      case 'donation':
        return <HeartHandshakeIcon className="h-4 w-4" />
      case 'review':
        return <StarIcon className="h-4 w-4" />
      case 'stream':
        return <VideoIcon className="h-4 w-4" />
      default:
        return <ActivityIcon className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user':
        return 'text-blue-500'
      case 'prayer':
        return 'text-green-500'
      case 'post':
        return 'text-purple-500'
      case 'mosque':
        return 'text-orange-500'
      case 'dua':
        return 'text-pink-500'
      case 'donation':
        return 'text-green-600'
      case 'review':
        return 'text-yellow-500'
      case 'stream':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-500'
      case 'warning':
        return 'text-yellow-500'
      case 'error':
        return 'text-red-500'
      case 'info':
        return 'text-blue-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's what's happening with your app today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant={selectedTimeRange === '7d' ? 'islamic' : 'outline'}
                size="sm"
                onClick={() => setSelectedTimeRange('7d')}
              >
                7 Days
              </Button>
              <Button
                variant={selectedTimeRange === '30d' ? 'islamic' : 'outline'}
                size="sm"
                onClick={() => setSelectedTimeRange('30d')}
              >
                30 Days
              </Button>
              <Button
                variant={selectedTimeRange === '90d' ? 'islamic' : 'outline'}
                size="sm"
                onClick={() => setSelectedTimeRange('90d')}
              >
                90 Days
              </Button>
            </div>
            <Button variant="outline" onClick={refreshData} disabled={isLoading}>
              {isLoading ? <RefreshCwIcon className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCwIcon className="h-4 w-4 mr-2" />}
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="muslim-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUpIcon className="h-3 w-3 mr-1" />
                    +{stats.weeklyGrowth}% this week
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <UsersIcon className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="muslim-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-3xl font-bold text-primary">{stats.activeUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <ActivityIcon className="h-3 w-3 mr-1" />
                    +{stats.dailyActiveUsers} today
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <ActivityIcon className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="muslim-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Prayer Sessions</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalPrayers.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">All time</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <ClockIcon className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="muslim-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Donations</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalDonations.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUpIcon className="h-3 w-3 mr-1" />
                    +{stats.monthlyGrowth}% this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <HeartHandshakeIcon className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="muslim-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reviews</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalReviews}</p>
                  <p className="text-xs text-orange-600">
                    {stats.pendingReviews} pending
                  </p>
                </div>
                <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <StarIcon className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="muslim-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Live Streams</p>
                  <p className="text-2xl font-bold text-primary">{stats.activeLiveStreams}/{stats.totalLiveStreams}</p>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <VideoIcon className="h-5 w-5 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="muslim-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mosques</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalMosques}</p>
                  <p className="text-xs text-muted-foreground">Registered</p>
                </div>
                <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <MapPinIcon className="h-5 w-5 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="muslim-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Session</p>
                  <p className="text-2xl font-bold text-primary">{stats.averageSessionTime}m</p>
                  <p className="text-xs text-muted-foreground">Per user</p>
                </div>
                <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                  <ClockIcon className="h-5 w-5 text-indigo-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ActivityIcon className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest user and system actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`p-2 rounded-full bg-muted ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{activity.action}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                        {activity.status && (
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(activity.status)}`} />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">{activity.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start h-auto p-4 hover:bg-muted/50"
                      onClick={() => router.push(action.href)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{action.title}</span>
                            {action.count !== undefined && (
                              <Badge variant="secondary" className="text-xs">
                                {action.count}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldIcon className="h-5 w-5" />
              System Status
            </CardTitle>
            <CardDescription>
              Current system health and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">Database</p>
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">API Services</p>
                  <p className="text-xs text-muted-foreground">Response time: 120ms</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">Live Streams</p>
                  <p className="text-xs text-muted-foreground">3 active streams</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}