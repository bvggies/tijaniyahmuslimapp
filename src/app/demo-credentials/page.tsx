'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  UserIcon,
  ShieldIcon,
  CopyIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  LogInIcon
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DemoCredentialsPage() {
  const router = useRouter()
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const adminAccounts = [
    {
      username: 'admin',
      password: 'admin123',
      name: 'System Administrator',
      role: 'Admin',
      description: 'Full access to all admin features'
    },
    {
      username: 'superadmin',
      password: 'super123',
      name: 'Super Administrator',
      role: 'Super Admin',
      description: 'Complete system control and settings'
    },
    {
      username: 'content',
      password: 'content123',
      name: 'Content Manager',
      role: 'Content Manager',
      description: 'Manage duas, wazifas, and Islamic content'
    },
    {
      username: 'moderator',
      password: 'mod123',
      name: 'Community Moderator',
      role: 'Moderator',
      description: 'Moderate community posts and users'
    }
  ]

  const userAccounts = [
    {
      email: 'user@example.com',
      password: 'user123',
      name: 'Ahmad Hassan',
      username: 'ahmad_hassan',
      description: 'Regular user account'
    },
    {
      email: 'fatima@example.com',
      password: 'fatima123',
      name: 'Fatima Al-Zahra',
      username: 'fatima_z',
      description: 'Community active user'
    },
    {
      email: 'omar@example.com',
      password: 'omar123',
      name: 'Omar Abdullah',
      username: 'omar_a',
      description: 'New user account'
    },
    {
      email: 'aisha@example.com',
      password: 'aisha123',
      name: 'Aisha Rahman',
      username: 'aisha_r',
      description: 'Verified community member'
    },
    {
      email: 'yusuf@example.com',
      password: 'yusuf123',
      name: 'Yusuf Ibrahim',
      username: 'yusuf_i',
      description: 'Regular user account'
    }
  ]

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(item)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary">Demo Credentials</h1>
            <p className="text-muted-foreground">Test accounts for the Tijaniyah Muslim App</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Admin Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldIcon className="h-6 w-6 text-primary" />
                Admin Accounts
              </CardTitle>
              <CardDescription>
                Administrative accounts with different permission levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adminAccounts.map((account, index) => (
                  <div key={index} className="p-4 border border-input rounded-lg hover:bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{account.name}</h4>
                        <p className="text-sm text-muted-foreground">{account.description}</p>
                      </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {account.role}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium w-20">Username:</span>
                        <code className="flex-1 bg-muted px-2 py-1 rounded text-sm">
                          {account.username}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(account.username, `admin-username-${index}`)}
                        >
                          {copiedItem === `admin-username-${index}` ? (
                            <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          ) : (
                            <CopyIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium w-20">Password:</span>
                        <code className="flex-1 bg-muted px-2 py-1 rounded text-sm">
                          {account.password}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(account.password, `admin-password-${index}`)}
                        >
                          {copiedItem === `admin-password-${index}` ? (
                            <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          ) : (
                            <CopyIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <Link href="/admin/login">
                        <Button variant="outline" size="sm" className="w-full">
                          <LogInIcon className="h-4 w-4 mr-2" />
                          Login as {account.name}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-6 w-6 text-primary" />
                User Accounts
              </CardTitle>
              <CardDescription>
                Regular user accounts for testing app features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userAccounts.map((account, index) => (
                  <div key={index} className="p-4 border border-input rounded-lg hover:bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{account.name}</h4>
                        <p className="text-sm text-muted-foreground">@{account.username}</p>
                        <p className="text-xs text-muted-foreground">{account.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium w-16">Email:</span>
                        <code className="flex-1 bg-muted px-2 py-1 rounded text-sm">
                          {account.email}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(account.email, `user-email-${index}`)}
                        >
                          {copiedItem === `user-email-${index}` ? (
                            <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          ) : (
                            <CopyIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium w-16">Password:</span>
                        <code className="flex-1 bg-muted px-2 py-1 rounded text-sm">
                          {account.password}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(account.password, `user-password-${index}`)}
                        >
                          {copiedItem === `user-password-${index}` ? (
                            <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          ) : (
                            <CopyIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <Link href="/login">
                        <Button variant="outline" size="sm" className="w-full">
                          <LogInIcon className="h-4 w-4 mr-2" />
                          Login as {account.name}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>
              Direct links to login pages and main features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/admin/login">
                <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2">
                  <ShieldIcon className="h-6 w-6" />
                  <span className="font-semibold">Admin Login</span>
                  <span className="text-sm text-muted-foreground">Access admin dashboard</span>
                </Button>
              </Link>
              
              <Link href="/login">
                <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2">
                  <UserIcon className="h-6 w-6" />
                  <span className="font-semibold">User Login</span>
                  <span className="text-sm text-muted-foreground">Access user features</span>
                </Button>
              </Link>
              
              <Link href="/">
                <Button variant="islamic" className="w-full h-auto p-4 flex flex-col items-center gap-2">
                  <span className="text-lg">🏠</span>
                  <span className="font-semibold">Home Page</span>
                  <span className="text-sm text-primary-foreground/80">Back to main app</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
