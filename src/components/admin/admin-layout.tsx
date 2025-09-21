'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  LogOutIcon,
  ShieldIcon,
  HomeIcon,
  UsersIcon,
  DollarSignIcon,
  BarChart3Icon,
  SettingsIcon,
  FileTextIcon,
  MessageSquareIcon,
  CalendarIcon,
  MapPinIcon,
  MenuIcon,
  XIcon,
  StarIcon,
  BookOpenIcon,
  PlayIcon
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: HomeIcon,
    description: 'Overview and analytics'
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: UsersIcon,
    description: 'Manage user accounts'
  },
  {
    title: 'Donations',
    href: '/admin/donations',
    icon: DollarSignIcon,
    description: 'Verify and manage donations'
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3Icon,
    description: 'App usage statistics'
  },
  {
    title: 'Prayers',
    href: '/admin/prayers',
    icon: CalendarIcon,
    description: 'Prayer times management'
  },
  {
    title: 'Mosques',
    href: '/admin/mosques',
    icon: MapPinIcon,
    description: 'Mosque directory management'
  },
  {
    title: 'Reviews',
    href: '/admin/reviews',
    icon: StarIcon,
    description: 'User reviews and feedback'
  },
  {
    title: 'Content',
    href: '/admin/content',
    icon: BookOpenIcon,
    description: 'Manage app content'
  },
  {
    title: 'Live Streams',
    href: '/admin/live-streams',
    icon: PlayIcon,
    description: 'Makkah live streams'
  },
  {
    title: 'Community',
    href: '/admin/community',
    icon: MessageSquareIcon,
    description: 'Community posts and discussions'
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: SettingsIcon,
    description: 'App configuration'
  }
]

export function AdminLayout({ children }: AdminLayoutProps) {
  const [adminUser, setAdminUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check admin authentication
    const token = localStorage.getItem('admin-token')
    const user = localStorage.getItem('admin-user')
    
    if (!token || !user) {
      router.push('/admin/login')
      return
    }

    setAdminUser(JSON.parse(user))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin-token')
    localStorage.removeItem('admin-user')
    router.push('/admin/login')
  }

  const handleMenuClick = (href: string) => {
    router.push(href)
  }

  if (!adminUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-background/95 via-background/98 to-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg">
        <div className="flex items-center justify-between p-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <ShieldIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Admin Panel</h1>
                <p className="text-sm text-muted-foreground">Tijaniyah Muslim App</p>
              </div>
            </div>
          </div>

          {/* User Info and Logout */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {adminUser.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm text-foreground">{adminUser.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{adminUser.role}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 hover:bg-red-50/50"
            >
              <LogOutIcon className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Horizontal Navigation Menu */}
        <div className="px-4 pb-4">
          <nav className="flex space-x-1 overflow-x-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <button
                  key={item.href}
                  onClick={() => handleMenuClick(item.href)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{item.title}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gradient-to-br from-background via-background to-muted/20">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Loading...</h3>
              <p className="text-muted-foreground">Please wait while we prepare your content</p>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
