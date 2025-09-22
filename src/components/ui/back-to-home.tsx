'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { HomeIcon, ArrowLeftIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BackToHomeProps {
  className?: string
  variant?: 'default' | 'floating' | 'minimal'
}

export function BackToHome({ className, variant = 'default' }: BackToHomeProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  // Don't show on homepage
  if (pathname === '/') {
    return null
  }

  const handleBackToHome = () => {
    router.push('/')
  }

  if (variant === 'floating') {
    return (
      <Button
        onClick={handleBackToHome}
        size="sm"
        variant="islamic"
        className={cn(
          "fixed bottom-6 right-6 z-[100] rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "w-12 h-12 p-0",
          "mobile-safe-area",
          className
        )}
        title="Back to Home"
      >
        <HomeIcon className="h-5 w-5" />
      </Button>
    )
  }

  if (variant === 'minimal') {
    return (
      <Button
        onClick={handleBackToHome}
        variant="ghost"
        size="sm"
        className={cn(
          "text-muted-foreground hover:text-primary transition-colors",
          "flex items-center gap-2",
          className
        )}
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span className="text-sm">Back to Home</span>
      </Button>
    )
  }

  return (
    <Button
      onClick={handleBackToHome}
      variant="outline"
      size="sm"
      className={cn(
        "muslim-card card-hover",
        "flex items-center gap-2",
        "border-primary/20 hover:border-primary/40",
        "bg-background/50 backdrop-blur-sm",
        className
      )}
    >
      <HomeIcon className="h-4 w-4" />
      <span>Back to Home</span>
    </Button>
  )
}
