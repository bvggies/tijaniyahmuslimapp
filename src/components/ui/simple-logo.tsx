'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface SimpleLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  className?: string
  showText?: boolean
}

const sizeClasses = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-20 w-20',
  xl: 'h-28 w-28'
}

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-4xl'
}

export function SimpleLogo({ 
  size = 'md', 
  animated = true, 
  className,
  showText = true 
}: SimpleLogoProps) {
  return (
    <div className={cn(
      "flex items-center gap-3",
      className
    )}>
      {/* Logo Icon */}
      <div className={cn(
        "relative flex items-center justify-center",
        sizeClasses[size],
        animated && "animate-pulse"
      )}>
        {/* White Background Circle */}
        <div className="absolute inset-0 bg-white rounded-full shadow-lg" />
        
        {/* Islamic Symbol Container */}
        <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-2 border-primary/30 shadow-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <div className="text-white text-4xl font-bold">
            🕌
          </div>
        </div>
        
        {/* Crescent Moon Overlay */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-secondary rounded-full flex items-center justify-center shadow-lg">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
        
        {/* Glow Effect */}
        {animated && (
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        )}
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={cn(
            "font-display font-bold muslim-text-gradient",
            textSizeClasses[size]
          )}>
            Tijaniyah
          </span>
          <span className={cn(
            "text-muted-foreground font-medium -mt-1",
            size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : size === 'lg' ? 'text-base' : 'text-lg'
          )}>
            Muslim App
          </span>
        </div>
      )}
    </div>
  )
}
