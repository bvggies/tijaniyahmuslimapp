'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  HomeIcon, 
  ClockIcon, 
  CompassIcon, 
  HeartIcon, 
  BookOpenIcon,
  CircleDotIcon,
  StarIcon,
  CalendarIcon,
  UsersIcon,
  BookmarkIcon,
  GraduationCapIcon,
  MessageCircleIcon,
  MapPinIcon,
  VideoIcon,
  BotIcon,
  SettingsIcon,
  MenuIcon,
  XIcon,
  HeartHandshakeIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SearchBar } from '@/components/ui/search-bar'
import { Logo } from '@/components/ui/logo'
import { BackToHome } from '@/components/ui/back-to-home'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const navigation = [
  { name: 'Prayer Times', href: '/prayer-times', icon: ClockIcon },
  { name: 'Qibla', href: '/qibla', icon: CompassIcon },
  { name: 'Quran', href: '/quran', icon: BookOpenIcon },
  { name: 'Duas', href: '/duas', icon: HeartIcon },
  { name: 'Tasbih', href: '/tasbih', icon: CircleDotIcon },
  { name: 'Wazifa', href: '/wazifa', icon: StarIcon },
  { name: 'Lazim', href: '/lazim', icon: CalendarIcon },
  { name: 'Scholars', href: '/scholars', icon: GraduationCapIcon },
  { name: 'Community', href: '/community', icon: MessageCircleIcon },
  { name: 'Mosques', href: '/mosques', icon: MapPinIcon },
  { name: 'Makkah Live', href: '/makkah-live', icon: VideoIcon },
  { name: 'AI Noor', href: '/ai-noor', icon: BotIcon },
  { name: 'Donate', href: '/donate', icon: HeartHandshakeIcon, special: true },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-14 items-center justify-between px-3">
        {/* Logo - Mobile Optimized */}
        <Link href="/" className="flex items-center">
          <Logo size="sm" animated={false} showText={false} />
          <span className="ml-2 text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Tijaniyah
          </span>
        </Link>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden lg:block flex-1 max-w-md mx-4">
          <SearchBar placeholder="Search anything..." />
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center space-x-1">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Back to Home Button - Only show when not on homepage */}
          {pathname !== '/' && (
            <BackToHome variant="minimal" className="mr-2" />
          )}
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href} prefetch={true}>
                <Button
                  variant={isActive ? "islamic" : item.special ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "flex items-center space-x-1 px-2",
                    isActive && "text-primary-foreground",
                    item.special && "bg-gradient-to-r from-primary to-accent text-white hover:from-primary/90 hover:to-accent/90 shadow-lg"
                  )}
                  title={item.name}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden xl:inline text-xs">{item.name}</span>
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="h-8 w-8"
          >
            {isMobileMenuOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <Logo size="sm" animated={false} showText={false} />
                <span className="ml-2 text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Tijaniyah
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="h-8 w-8"
              >
                <XIcon className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Mobile Search */}
            <div className="p-4 border-b">
              <SearchBar placeholder="Search anything..." />
            </div>
            
            {/* Mobile Back to Home Button - Only show when not on homepage */}
            {pathname !== '/' && (
              <div className="p-4 border-b">
                <BackToHome variant="minimal" />
              </div>
            )}
            
            {/* Mobile Navigation Grid */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.name} href={item.href} prefetch={true}>
                      <Button
                        variant={isActive ? "islamic" : item.special ? "default" : "ghost"}
                        size="lg"
                        className={cn(
                          "flex flex-col items-center space-y-2 h-16 px-3",
                          isActive && "text-primary-foreground",
                          item.special && "bg-gradient-to-r from-primary to-accent text-white hover:from-primary/90 hover:to-accent/90 shadow-lg"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-xs font-medium text-center leading-tight">{item.name}</span>
                      </Button>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
