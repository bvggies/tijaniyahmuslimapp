'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  UserIcon,
  EyeIcon,
  EyeOffIcon,
  AlertCircleIcon,
  LockIcon,
  MailIcon,
  LogInIcon,
  ArrowLeftIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SimpleLogo } from '@/components/ui/simple-logo'

export default function UserLoginPage() {
  const [credentials, setCredentials] = useState({
    email: '',
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

    // Simulate user authentication
    setTimeout(() => {
      // Check hardcoded demo users first
      const demoCredentials = {
        'user@example.com': { password: 'user123', name: 'Ahmad Hassan', username: 'ahmad_hassan', role: 'user' },
        'fatima@example.com': { password: 'fatima123', name: 'Fatima Al-Zahra', username: 'fatima_z', role: 'user' },
        'omar@example.com': { password: 'omar123', name: 'Omar Abdullah', username: 'omar_a', role: 'user' },
        'aisha@example.com': { password: 'aisha123', name: 'Aisha Rahman', username: 'aisha_r', role: 'user' },
        'yusuf@example.com': { password: 'yusuf123', name: 'Yusuf Ibrahim', username: 'yusuf_i', role: 'user' }
      }

      let user = demoCredentials[credentials.email as keyof typeof demoCredentials]
      
      // If not found in demo users, check registered users
      if (!user) {
        const registeredUsers = JSON.parse(localStorage.getItem('registered-users') || '[]')
        const registeredUser = registeredUsers.find((u: any) => u.email === credentials.email)
        
        if (registeredUser && registeredUser.password === credentials.password) {
          user = {
            password: registeredUser.password,
            name: registeredUser.name,
            username: registeredUser.username,
            role: registeredUser.role || 'user'
          }
        }
      }
      
      if (user && user.password === credentials.password) {
        localStorage.setItem('user-token', 'user-token-' + Date.now())
        localStorage.setItem('user-data', JSON.stringify({
          email: credentials.email,
          name: user.name,
          username: user.username,
          role: user.role,
          lastLogin: new Date().toISOString(),
          isVerified: true,
          preferences: {
            language: 'English',
            timezone: 'UTC',
            notifications: true
          }
        }))
        router.push('/')
      } else {
        setError('Invalid email or password')
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
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your Tijaniyah Muslim App account
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
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="w-4 h-4" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              variant="islamic"
              disabled={isLoading}
            >
              <LogInIcon className="h-4 w-4 mr-2" />
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-semibold mb-2">Demo User Accounts:</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Email: <code className="bg-background px-1 rounded">user@example.com</code></div>
              <div>Password: <code className="bg-background px-1 rounded">user123</code></div>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <h5 className="text-sm font-semibold mb-2">Additional Test Users:</h5>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Fatima: <code className="bg-background px-1 rounded">fatima@example.com</code> / <code className="bg-background px-1 rounded">fatima123</code></div>
                <div>Omar: <code className="bg-background px-1 rounded">omar@example.com</code> / <code className="bg-background px-1 rounded">omar123</code></div>
                <div>Aisha: <code className="bg-background px-1 rounded">aisha@example.com</code> / <code className="bg-background px-1 rounded">aisha123</code></div>
                <div>Yusuf: <code className="bg-background px-1 rounded">yusuf@example.com</code> / <code className="bg-background px-1 rounded">yusuf123</code></div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
