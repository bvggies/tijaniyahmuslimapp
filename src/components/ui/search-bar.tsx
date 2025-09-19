'use client'

import React, { useState, useEffect, useRef } from 'react'
import { SearchIcon, XIcon, SparklesIcon, LoaderIcon, ArrowRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

interface SearchSuggestion {
  id: string
  title: string
  description: string
  type: 'prayer' | 'dua' | 'quran' | 'feature' | 'page'
  href: string
  icon?: string
}

interface SearchBarProps {
  className?: string
  placeholder?: string
  showSuggestions?: boolean
}

const searchSuggestions: SearchSuggestion[] = [
  // Prayer Times
  { id: '1', title: 'Prayer Times', description: 'Check today\'s prayer times', type: 'prayer', href: '/prayer-times', icon: '🕐' },
  { id: '2', title: 'Fajr Prayer', description: 'Dawn prayer time', type: 'prayer', href: '/prayer-times', icon: '🌅' },
  { id: '3', title: 'Dhuhr Prayer', description: 'Midday prayer time', type: 'prayer', href: '/prayer-times', icon: '☀️' },
  { id: '4', title: 'Asr Prayer', description: 'Afternoon prayer time', type: 'prayer', href: '/prayer-times', icon: '🌤️' },
  { id: '5', title: 'Maghrib Prayer', description: 'Sunset prayer time', type: 'prayer', href: '/prayer-times', icon: '🌅' },
  { id: '6', title: 'Isha Prayer', description: 'Night prayer time', type: 'prayer', href: '/prayer-times', icon: '🌙' },
  
  // Qibla
  { id: '7', title: 'Qibla Direction', description: 'Find direction to Kaaba', type: 'feature', href: '/qibla', icon: '🧭' },
  { id: '8', title: 'Compass', description: 'Islamic compass for Qibla', type: 'feature', href: '/qibla', icon: '🧭' },
  
  // Quran
  { id: '9', title: 'Quran Reader', description: 'Read the Holy Quran', type: 'quran', href: '/quran', icon: '📖' },
  { id: '10', title: 'Surah Al-Fatiha', description: 'The Opening chapter', type: 'quran', href: '/quran', icon: '📖' },
  { id: '11', title: 'Surah Al-Baqarah', description: 'The Cow chapter', type: 'quran', href: '/quran', icon: '📖' },
  { id: '12', title: 'Surah Al-Ikhlas', description: 'The Sincerity chapter', type: 'quran', href: '/quran', icon: '📖' },
  
  // Duas
  { id: '13', title: 'Duas & Supplications', description: 'Islamic prayers and supplications', type: 'dua', href: '/duas', icon: '🤲' },
  { id: '14', title: 'Morning Dua', description: 'Duas for the morning', type: 'dua', href: '/duas', icon: '🌅' },
  { id: '15', title: 'Evening Dua', description: 'Duas for the evening', type: 'dua', href: '/duas', icon: '🌙' },
  { id: '16', title: 'Before Sleep Dua', description: 'Duas before sleeping', type: 'dua', href: '/duas', icon: '😴' },
  
  // Features
  { id: '17', title: 'Digital Tasbih', description: 'Count your dhikr', type: 'feature', href: '/tasbih', icon: '📿' },
  { id: '18', title: 'Wazifa', description: 'Daily Islamic practices', type: 'feature', href: '/wazifa', icon: '⭐' },
  { id: '19', title: 'Community', description: 'Connect with other Muslims', type: 'feature', href: '/community', icon: '👥' },
  { id: '20', title: 'Donate', description: 'Support the app', type: 'page', href: '/donate', icon: '❤️' },
]

export function SearchBar({ 
  className = '', 
  placeholder = 'Search anything...',
  showSuggestions = true 
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([])
  const [showAINoor, setShowAINoor] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (query.length > 0) {
      setIsSearching(true)
      const timer = setTimeout(() => {
        const filtered = searchSuggestions.filter(suggestion =>
          suggestion.title.toLowerCase().includes(query.toLowerCase()) ||
          suggestion.description.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredSuggestions(filtered)
        setShowAINoor(filtered.length === 0)
        setIsSearching(false)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setFilteredSuggestions([])
      setShowAINoor(false)
      setIsSearching(false)
    }
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen) {
        e.preventDefault()
        setIsOpen(true)
        inputRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    router.push(suggestion.href)
    setIsOpen(false)
    setQuery('')
    setSelectedIndex(-1)
  }

  const handleAINoorSearch = () => {
    router.push(`/ai-noor?query=${encodeURIComponent(query)}`)
    setIsOpen(false)
    setQuery('')
    setSelectedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0 && selectedIndex < filteredSuggestions.length) {
        handleSuggestionClick(filteredSuggestions[selectedIndex])
      } else if (showAINoor) {
        handleAINoorSearch()
      }
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Search Button */}
      {!isOpen && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 hover:shadow-lg bg-background"
        >
          <SearchIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-muted rounded">
            /
          </kbd>
        </Button>
      )}

      {/* Search Input */}
      {isOpen && (
        <div className="absolute top-0 left-0 right-0 z-50">
          <div className="relative">
            <div className="flex items-center bg-background border border-border rounded-lg shadow-lg overflow-hidden search-shine search-glow" style={{ backgroundColor: 'var(--background)', opacity: 1 }}>
              <div className="flex items-center px-3 py-2 flex-1 search-input-container">
                <SearchIcon className="h-4 w-4 text-muted-foreground mr-2" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  className="flex-1 bg-transparent border-0 outline-none text-sm"
                  style={{ 
                    color: '#ffffff',
                    backgroundColor: 'transparent'
                  }}
                  autoFocus
                />
                {isSearching && (
                  <LoaderIcon className="h-4 w-4 text-primary animate-spin mr-2" />
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsOpen(false)
                  setQuery('')
                  setSelectedIndex(-1)
                }}
                className="px-3"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (filteredSuggestions.length > 0 || showAINoor) && (
              <Card className="mt-2 shadow-xl border border-border bg-background search-suggestions" style={{ backgroundColor: 'var(--background)', opacity: 1 }}>
                <CardContent className="p-2">
                  {filteredSuggestions.length > 0 && (
                    <div className="space-y-1">
                      {filteredSuggestions.map((suggestion, index) => (
                        <div
                          key={suggestion.id}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                            index === selectedIndex
                              ? 'bg-primary/10 border border-primary/20'
                              : 'hover:bg-muted/50'
                          }`}
                        >
                          <div className="text-lg">{suggestion.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">
                              {suggestion.title}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {suggestion.description}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {suggestion.type}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {showAINoor && (
                    <div
                      onClick={handleAINoorSearch}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedIndex === filteredSuggestions.length
                          ? 'bg-primary/10 border border-primary/20'
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="text-lg">🤖</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm flex items-center gap-2">
                          <SparklesIcon className="h-4 w-4 text-primary" />
                          Ask AI Noor
                        </div>
                        <div className="text-xs text-muted-foreground">
                          "{query}" - Get AI-powered answers
                        </div>
                      </div>
                      <ArrowRightIcon className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
          onClick={() => {
            setIsOpen(false)
            setQuery('')
            setSelectedIndex(-1)
          }}
        />
      )}
    </div>
  )
}
