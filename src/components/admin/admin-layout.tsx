'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  LogOutIcon,
  ShieldIcon
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}


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

  if (!adminUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-gradient-to-r from-background/95 via-background/98 to-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <ShieldIcon className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Admin Panel</h1>
                <p className="text-sm text-muted-foreground font-medium">Tijaniyah Muslim App</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">
                  {adminUser.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm text-foreground">{adminUser.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{adminUser.role}</p>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 hover:bg-red-50/50"
            >
              <LogOutIcon className="h-4 w-4 mr-2" />
              Logout
            </Button>

            {isLoading && (
              <div className="flex items-center gap-2 text-primary">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="p-8 bg-gradient-to-br from-background via-background to-muted/20 min-h-screen">
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
