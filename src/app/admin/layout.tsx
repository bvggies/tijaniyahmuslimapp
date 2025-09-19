'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  BarChart3Icon,
  UsersIcon,
  BookOpenIcon,
  MessageCircleIcon,
  MapPinIcon,
  SettingsIcon,
  ShieldIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  HomeIcon
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Users', href: '/admin/users', icon: UsersIcon },
  { name: 'Content', href: '/admin/content', icon: BookOpenIcon },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3Icon },
  { name: 'Community', href: '/admin/community', icon: MessageCircleIcon },
  { name: 'Mosques', href: '/admin/mosques', icon: MapPinIcon },
  { name: 'Settings', href: '/admin/settings', icon: SettingsIcon }
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [adminUser, setAdminUser] = useState<any>(null)
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

  // Don't render layout for login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (!adminUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <ShieldIcon className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">Admin</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {adminUser.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{adminUser.name}</p>
                <p className="text-xs text-gray-500">{adminUser.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <LogOutIcon className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center gap-2 px-4">
            <ShieldIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">Admin Panel</span>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {adminUser.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{adminUser.name}</p>
                <p className="text-xs text-gray-500">{adminUser.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <LogOutIcon className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Admin Dashboard
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
