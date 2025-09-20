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

const navigation = [
  { name: 'Prayer Times', href: '/prayer-times', icon: ClockIcon },
  { name: 'Qibla', href: '/qibla', icon: CompassIcon },
  { name: 'Quran', href: '/quran', icon: BookOpenIcon },
  { name: 'Duas', href: '/duas', icon: HeartIcon },
  { name: 'Tasbih', href: '/tasbih', icon: CircleDotIcon },
  { name: 'Community', href: '/community', icon: MessageCircleIcon },
  { name: 'Donate', href: '/donate', icon: HeartHandshakeIcon, special: true },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo size="sm" animated={false} showText={true} />
        </Link>

        {/* Search Bar */}
        <div className="hidden md:block">
          <SearchBar placeholder="Search anything..." />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
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
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-sm">
          <nav className="container py-3">
            {/* Mobile Search */}
            <div className="mb-4">
              <SearchBar placeholder="Search anything..." />
            </div>
            
            {/* Mobile Back to Home Button - Only show when not on homepage */}
            {pathname !== '/' && (
              <div className="mb-4">
                <BackToHome variant="minimal" />
              </div>
            )}
            
            <div className="flex flex-wrap gap-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href} prefetch={true}>
                    <Button
                      variant={isActive ? "islamic" : item.special ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "flex items-center space-x-1 px-3 py-2 text-xs",
                        isActive && "text-primary-foreground",
                        item.special && "bg-gradient-to-r from-primary to-accent text-white hover:from-primary/90 hover:to-accent/90 shadow-lg"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="h-3 w-3" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
