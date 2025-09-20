'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ShieldIcon, 
  EyeIcon,
  EyeOffIcon,
  AlertCircleIcon,
  LockIcon,
  UserIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SimpleLogo } from '@/components/ui/simple-logo'

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate admin authentication
    setTimeout(() => {
      const validCredentials = {
        'admin': { password: 'admin123', name: 'System Administrator', role: 'admin' },
        'superadmin': { password: 'super123', name: 'Super Administrator', role: 'super-admin' },
        'content': { password: 'content123', name: 'Content Manager', role: 'content-manager' },
        'moderator': { password: 'mod123', name: 'Community Moderator', role: 'moderator' }
      }

      const user = validCredentials[credentials.username as keyof typeof validCredentials]
      
      if (user && user.password === credentials.password) {
        localStorage.setItem('admin-token', 'admin-token-' + Date.now())
        localStorage.setItem('admin-user', JSON.stringify({
          username: credentials.username,
          name: user.name,
          role: user.role,
          lastLogin: new Date().toISOString()
        }))
        router.push('/admin/dashboard')
      } else {
        setError('Invalid username or password')
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <SimpleLogo size="lg" animated={true} showText={true} />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Access the Tijaniyah Muslim App administration panel
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                <AlertCircleIcon className="h-4 w-4" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              variant="islamic"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-semibold mb-2">Demo Credentials:</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Username: <code className="bg-background px-1 rounded">admin</code></div>
              <div>Password: <code className="bg-background px-1 rounded">admin123</code></div>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <h5 className="text-sm font-semibold mb-2">Additional Test Accounts:</h5>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Super Admin: <code className="bg-background px-1 rounded">superadmin</code> / <code className="bg-background px-1 rounded">super123</code></div>
                <div>Content Manager: <code className="bg-background px-1 rounded">content</code> / <code className="bg-background px-1 rounded">content123</code></div>
                <div>Moderator: <code className="bg-background px-1 rounded">moderator</code> / <code className="bg-background px-1 rounded">mod123</code></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
