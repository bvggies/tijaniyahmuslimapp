'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  MenuIcon, 
  XIcon, 
  HomeIcon,
  UsersIcon,
  BookOpenIcon,
  MessageCircleIcon,
  MapPinIcon,
  VideoIcon,
  HeartHandshakeIcon,
  BarChart3Icon,
  SettingsIcon,
  LogOutIcon,
  ChevronRightIcon,
  ShieldIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminLayoutProps {
  children: React.ReactNode
}

interface MenuItem {
  id: string
  title: string
  icon: React.ComponentType<any>
  href: string
  description?: string
  badge?: string
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: HomeIcon,
    href: '/admin/dashboard',
    description: 'Overview and analytics'
  },
  {
    id: 'users',
    title: 'Users',
    icon: UsersIcon,
    href: '/admin/users',
    description: 'Manage user accounts',
    badge: '12'
  },
  {
    id: 'content',
    title: 'Content',
    icon: BookOpenIcon,
    href: '/admin/content',
    description: 'Manage app content'
  },
  {
    id: 'community',
    title: 'Community',
    icon: MessageCircleIcon,
    href: '/admin/community',
    description: 'Moderate discussions',
    badge: '3'
  },
  {
    id: 'mosques',
    title: 'Mosques',
    icon: MapPinIcon,
    href: '/admin/mosques',
    description: 'Mosque management'
  },
  {
    id: 'live-streams',
    title: 'Live Streams',
    icon: VideoIcon,
    href: '/admin/live-streams',
    description: 'Manage live broadcasts'
  },
  {
    id: 'donations',
    title: 'Donations',
    icon: HeartHandshakeIcon,
    href: '/admin/donations',
    description: 'Track donations',
    badge: '5'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: BarChart3Icon,
    href: '/admin/analytics',
    description: 'View detailed reports'
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: SettingsIcon,
    href: '/admin/settings',
    description: 'System configuration'
  }
]

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string>('')
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
    
    // Set active item based on current path
    const currentItem = menuItems.find(item => item.href === pathname)
    if (currentItem) {
      setActiveItem(currentItem.id)
    }
  }, [pathname, router])

  const handleMenuClick = (item: MenuItem) => {
    setActiveItem(item.id)
    setIsLoading(true)
    
    // Quick navigation with loading state
    setTimeout(() => {
      router.push(item.href)
      setIsLoading(false)
    }, 100)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin-token')
    localStorage.removeItem('admin-user')
    router.push('/admin/login')
  }

  if (!adminUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Mobile Menu Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-80 bg-background/95 backdrop-blur-md border-r border-border transform transition-transform duration-300 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0 md:static md:inset-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <ShieldIcon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary">Admin Panel</h1>
                <p className="text-xs text-muted-foreground">Tijaniyah Muslim App</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {adminUser.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary">{adminUser.name}</h3>
                <p className="text-sm text-muted-foreground">{adminUser.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.id
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "islamic" : "ghost"}
                  className={cn(
                    "w-full justify-start h-auto p-4 text-left",
                    isActive && "text-primary-foreground shadow-lg"
                  )}
                  onClick={() => handleMenuClick(item)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{item.title}</span>
                        {item.badge && (
                          <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full ml-2">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
                  </div>
                </Button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOutIcon className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-80">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
            
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-primary">
                {menuItems.find(item => item.id === activeItem)?.title || 'Dashboard'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {isLoading && (
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading...</p>
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
