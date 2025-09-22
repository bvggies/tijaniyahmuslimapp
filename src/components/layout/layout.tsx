'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Header } from './header'
import { Footer } from './footer'
import { LocationDisplay } from '@/components/ui/location-display'
import { BackToHome } from '@/components/ui/back-to-home'
import { Toaster } from 'react-hot-toast'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  // Don't render main layout for admin pages
  if (isAdminPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
            },
          }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Header />
      <main className="relative pb-20">
        {/* Location Bar - Mobile Optimized */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50 py-1.5">
          <div className="container mx-auto px-3">
            <div className="flex items-center justify-center">
              <LocationDisplay variant="compact" className="text-xs" />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6">
          {children}
        </div>
      </main>
      <Footer />
      <BackToHome variant="floating" />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--primary)',
            color: 'var(--primary-foreground)',
            borderRadius: '12px',
            fontSize: '14px',
            padding: '12px 16px',
          },
        }}
      />
    </div>
  )
}
