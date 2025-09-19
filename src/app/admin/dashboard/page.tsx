'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
  SettingsIcon
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
  dailyActiveUsers: 2341,
  monthlyGrowth: 8.7
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>(mockStats)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Dashboard Overview</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your app.</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCwIcon className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="muslim-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+{stats.weeklyGrowth}% this week</p>
                </div>
                <UsersIcon className="h-8 w-8 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="muslim-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-3xl font-bold text-primary">{stats.activeUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+{stats.dailyActiveUsers} today</p>
                </div>
                <ActivityIcon className="h-8 w-8 text-green-500/20" />
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
                <ClockIcon className="h-8 w-8 text-blue-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="muslim-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Community Posts</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalPosts.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+{stats.monthlyGrowth}% this month</p>
                </div>
                <MessageCircleIcon className="h-8 w-8 text-purple-500/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="muslim-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Duas & Supplications</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalDuas.toLocaleString()}</p>
                </div>
                <BookOpenIcon className="h-6 w-6 text-pink-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="muslim-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mosques</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalMosques.toLocaleString()}</p>
                </div>
                <MapPinIcon className="h-6 w-6 text-orange-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="muslim-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bookmarks</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalBookmarks.toLocaleString()}</p>
                </div>
                <HeartIcon className="h-6 w-6 text-red-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="muslim-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Session</p>
                  <p className="text-2xl font-bold text-primary">{stats.averageSessionTime}m</p>
                </div>
                <TrendingUpIcon className="h-6 w-6 text-green-500/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="muslim-card">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => router.push('/admin/users')}
              >
                <UsersIcon className="h-6 w-6" />
                <span className="text-sm">Manage Users</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => router.push('/admin/content')}
              >
                <BookOpenIcon className="h-6 w-6" />
                <span className="text-sm">Content Management</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => router.push('/admin/live-streams')}
              >
                <VideoIcon className="h-6 w-6" />
                <span className="text-sm">Live Streams</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => router.push('/admin/donations')}
              >
                <HeartHandshakeIcon className="h-6 w-6" />
                <span className="text-sm">Donations</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}