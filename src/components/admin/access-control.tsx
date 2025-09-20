'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ShieldIcon, 
  LockIcon, 
  UserIcon, 
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  StarIcon,
  HeartIcon,
  BookOpenIcon,
  MessageCircleIcon,
  MapPinIcon,
  VideoIcon,
  BarChart3Icon,
  SettingsIcon
} from 'lucide-react'

interface AccessControlProps {
  children: React.ReactNode
  requiredRole?: string[]
  fallback?: React.ReactNode
  feature?: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  isActive: boolean
  lastLogin?: Date
  permissions: string[]
}

interface Feature {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  requiredRole: string[]
  isPro: boolean
  isNew: boolean
  category: string
}

const features: Feature[] = [
  {
    id: 'prayer-times',
    name: 'Prayer Times',
    description: 'View and manage prayer schedules',
    icon: ClockIcon,
    requiredRole: ['user', 'admin', 'super-admin'],
    isPro: false,
    isNew: false,
    category: 'basic'
  },
  {
    id: 'quran',
    name: 'Quran Reading',
    description: 'Read and listen to the Holy Quran',
    icon: BookOpenIcon,
    requiredRole: ['user', 'admin', 'super-admin'],
    isPro: false,
    isNew: false,
    category: 'basic'
  },
  {
    id: 'duas',
    name: 'Duas & Supplications',
    description: 'Collection of Islamic prayers and supplications',
    icon: HeartIcon,
    requiredRole: ['user', 'admin', 'super-admin'],
    isPro: false,
    isNew: false,
    category: 'basic'
  },
  {
    id: 'community',
    name: 'Community',
    description: 'Connect with other Muslims and share experiences',
    icon: MessageCircleIcon,
    requiredRole: ['user', 'admin', 'super-admin'],
    isPro: false,
    isNew: true,
    category: 'social'
  },
  {
    id: 'mosques',
    name: 'Mosque Finder',
    description: 'Find nearby mosques and prayer times',
    icon: MapPinIcon,
    requiredRole: ['user', 'admin', 'super-admin'],
    isPro: false,
    isNew: false,
    category: 'location'
  },
  {
    id: 'live-streams',
    name: 'Live Streams',
    description: 'Watch live Islamic broadcasts and events',
    icon: VideoIcon,
    requiredRole: ['user', 'admin', 'super-admin'],
    isPro: true,
    isNew: false,
    category: 'media'
  },
  {
    id: 'analytics',
    name: 'Personal Analytics',
    description: 'Track your spiritual journey and progress',
    icon: BarChart3Icon,
    requiredRole: ['user', 'admin', 'super-admin'],
    isPro: true,
    isNew: true,
    category: 'advanced'
  },
  {
    id: 'admin',
    name: 'Admin Panel',
    description: 'Manage the application and users',
    icon: SettingsIcon,
    requiredRole: ['admin', 'super-admin'],
    isPro: false,
    isNew: false,
    category: 'admin'
  }
]

export function AccessControl({ 
  children, 
  requiredRole = ['user'], 
  fallback,
  feature 
}: AccessControlProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAccess = () => {
      const token = localStorage.getItem('user-token')
      const userData = localStorage.getItem('user')
      
      if (!token || !userData) {
        setUser(null)
        setHasAccess(false)
        setIsLoading(false)
        return
      }

      try {
        const userObj = JSON.parse(userData)
        setUser(userObj)
        
        // Check if user has required role
        const userRole = userObj.role || 'user'
        const hasRequiredRole = requiredRole.includes(userRole)
        setHasAccess(hasRequiredRole)
      } catch (error) {
        console.error('Error parsing user data:', error)
        setUser(null)
        setHasAccess(false)
      }
      
      setIsLoading(false)
    }

    checkAccess()
  }, [requiredRole])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Checking access...</p>
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md muslim-card">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldIcon className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Access Required</CardTitle>
            <CardDescription>
              {user ? 
                'You need additional permissions to access this feature.' : 
                'Please log in to access this feature.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!user ? (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Sign in to unlock all features of the Tijaniyah Muslim App
                  </p>
                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      onClick={() => router.push('/login')}
                    >
                      Sign In
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => router.push('/register')}
                    >
                      Create Account
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Your current role: <Badge variant="secondary">{user.role}</Badge>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Required roles: {requiredRole.map(role => (
                      <Badge key={role} variant="outline" className="ml-1">{role}</Badge>
                    ))}
                  </p>
                </div>
              </div>
            )}

            {/* Feature Preview */}
            {feature && (
              <div className="border-t pt-4">
                <h3 className="font-semibold text-sm mb-3">Available Features</h3>
                <div className="space-y-2">
                  {features
                    .filter(f => requiredRole.some(role => f.requiredRole.includes(role)))
                    .slice(0, 3)
                    .map(feature => {
                      const Icon = feature.icon
                      return (
                        <div key={feature.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                          <Icon className="h-4 w-4 text-primary" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{feature.name}</span>
                              {feature.isPro && (
                                <Badge variant="secondary" className="text-xs">Pro</Badge>
                              )}
                              {feature.isNew && (
                                <Badge variant="default" className="text-xs">New</Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            )}

            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={() => router.back()}
                className="text-muted-foreground"
              >
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

export function FeatureGate({ 
  children, 
  feature, 
  requiredRole = ['user'] 
}: { 
  children: React.ReactNode
  feature: string
  requiredRole?: string[]
}) {
  return (
    <AccessControl 
      requiredRole={requiredRole} 
      feature={feature}
      fallback={
        <div className="p-4 text-center">
          <LockIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            This feature requires {requiredRole.join(' or ')} access
          </p>
        </div>
      }
    >
      {children}
    </AccessControl>
  )
}
