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
  const [sidebarOpen, setSidebarOpen] = useState(false)
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
    setSidebarOpen(false)
  }

  if (!adminUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <ShieldIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Admin</h1>
                <p className="text-xs text-muted-foreground">Tijaniyah App</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <button
                  key={item.href}
                  onClick={() => handleMenuClick(item.href)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                  </div>
                </button>
              )
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">
                  {adminUser.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{adminUser.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{adminUser.role}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full text-red-500 border-red-500/30 hover:bg-red-500/10"
            >
              <LogOutIcon className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-gradient-to-r from-background/95 via-background/98 to-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {menuItems.find(item => item.href === pathname)?.title || 'Admin Panel'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {menuItems.find(item => item.href === pathname)?.description || 'Manage your application'}
                </p>
              </div>
            </div>

            {isLoading && (
              <div className="flex items-center gap-2 text-primary">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium">Loading...</span>
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
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
    </div>
  )
}
