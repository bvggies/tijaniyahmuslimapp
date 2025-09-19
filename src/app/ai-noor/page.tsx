'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IslamicBackground } from '@/components/ui/islamic-background'
import { 
  BotIcon, 
  SparklesIcon, 
  SendIcon, 
  LoaderIcon, 
  RefreshCwIcon,
  LightbulbIcon,
  BookOpenIcon,
  HeartIcon,
  ClockIcon,
  CompassIcon
} from 'lucide-react'

interface AIResponse {
  answer: string
  sources?: string[]
  suggestions?: string[]
}

const mockAIResponses: Record<string, AIResponse> = {
  'prayer times': {
    answer: 'Prayer times are calculated based on your location and the position of the sun. You can find today\'s prayer times in our Prayer Times section, which includes Fajr (dawn), Dhuhr (midday), Asr (afternoon), Maghrib (sunset), and Isha (night) prayers.',
    sources: ['Prayer Times Calculator', 'Islamic Calendar'],
    suggestions: ['How to calculate prayer times', 'Qibla direction', 'Islamic calendar']
  },
  'qibla direction': {
    answer: 'Qibla is the direction Muslims face during prayer, pointing towards the Kaaba in Mecca. Use our Qibla Compass feature to find the exact direction from your current location. The compass uses your device\'s GPS and magnetometer to provide accurate direction.',
    sources: ['Qibla Compass', 'GPS Technology'],
    suggestions: ['How to use Qibla compass', 'Prayer times', 'Islamic geography']
  },
  'quran': {
    answer: 'The Quran is the holy book of Islam, revealed to Prophet Muhammad (PBUH) over 23 years. Our Quran Reader provides access to the complete text with translations, audio recitations, and commentary. You can search by chapter, verse, or keyword.',
    sources: ['Quran Reader', 'Islamic Studies'],
    suggestions: ['Surah Al-Fatiha', 'Quran translations', 'Audio recitations']
  },
  'duas': {
    answer: 'Duas are supplications and prayers in Islam. Our Duas & Supplications section contains a comprehensive collection of authentic duas for various occasions including morning, evening, before sleep, and specific situations like traveling or eating.',
    sources: ['Duas Collection', 'Islamic Supplications'],
    suggestions: ['Morning duas', 'Evening duas', 'Travel duas']
  },
  'tasbih': {
    answer: 'Tasbih is the practice of counting dhikr (remembrance of Allah) using prayer beads or digital counters. Our Digital Tasbih feature allows you to count your dhikr electronically with various counter options and beautiful Islamic designs.',
    sources: ['Digital Tasbih', 'Dhikr Practices'],
    suggestions: ['How to use tasbih', 'Dhikr benefits', 'Islamic remembrance']
  },
  'wazifa': {
    answer: 'Wazifa refers to daily Islamic practices and routines that help strengthen your faith. Our Wazifa section provides structured daily practices including specific prayers, recitations, and spiritual exercises to enhance your connection with Allah.',
    sources: ['Wazifa Guide', 'Daily Practices'],
    suggestions: ['Daily wazifa routine', 'Spiritual practices', 'Islamic discipline']
  }
}

export default function AINoorPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState<AIResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const searchQuery = searchParams.get('query')
    if (searchQuery) {
      setQuery(searchQuery)
      handleSearch(searchQuery)
    }
  }, [searchParams])

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setIsTyping(true)

    // Simulate AI processing time
    setTimeout(() => {
      const lowerQuery = searchQuery.toLowerCase()
      let aiResponse: AIResponse | null = null

      // Find matching response
      for (const [key, value] of Object.entries(mockAIResponses)) {
        if (lowerQuery.includes(key)) {
          aiResponse = value
          break
        }
      }

      // If no specific match, provide a general response
      if (!aiResponse) {
        aiResponse = {
          answer: `I understand you're asking about "${searchQuery}". While I don't have specific information about this topic in my current knowledge base, I can help you with Islamic topics like prayer times, Quran, duas, tasbih, Qibla direction, and more. Please try searching for these topics or ask me about Islamic practices and beliefs.`,
          sources: ['AI Noor Knowledge Base'],
          suggestions: ['Prayer times', 'Quran', 'Duas', 'Qibla direction', 'Tasbih']
        }
      }

      setResponse(aiResponse)
      setIsLoading(false)
      setIsTyping(false)
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    handleSearch(suggestion)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <IslamicBackground variant="quran" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 muslim-gradient rounded-full flex items-center justify-center search-glow">
                <BotIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold muslim-text-gradient">
                  AI Noor
                </h1>
                <p className="text-muted-foreground">Your Islamic AI Assistant</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ask me anything about Islam, prayer times, Quran, duas, or any Islamic topic. I'm here to help guide you on your spiritual journey.
            </p>
          </div>

          {/* Search Form */}
          <Card className="muslim-card mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Ask AI Noor anything about Islam..."
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary search-shine"
                      disabled={isLoading}
                    />
                    {isLoading && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <LoaderIcon className="h-5 w-5 text-primary animate-spin" />
                      </div>
                    )}
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading || !query.trim()}
                    className="muslim-gradient text-white px-6 py-3"
                  >
                    {isLoading ? (
                      <LoaderIcon className="h-4 w-4 animate-spin" />
                    ) : (
                      <SendIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* AI Response */}
          {response && (
            <Card className="muslim-card search-suggestions">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SparklesIcon className="h-5 w-5 text-primary" />
                  AI Noor's Response
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Answer */}
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground leading-relaxed">
                    {isTyping ? (
                      <span className="inline-flex items-center gap-1">
                        <span className="animate-pulse">Thinking</span>
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                      </span>
                    ) : (
                      response.answer
                    )}
                  </p>
                </div>

                {/* Sources */}
                {response.sources && response.sources.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Sources:</h4>
                    <div className="flex flex-wrap gap-2">
                      {response.sources.map((source, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {response.suggestions && response.suggestions.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-3">You might also be interested in:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {response.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="justify-start text-left h-auto p-3 hover:bg-primary/10"
                        >
                          <LightbulbIcon className="h-4 w-4 mr-2 text-primary" />
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => handleSearch(query)}
                    className="flex items-center gap-2"
                  >
                    <RefreshCwIcon className="h-4 w-4" />
                    Ask Again
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setQuery('')}
                    className="flex items-center gap-2"
                  >
                    <SendIcon className="h-4 w-4" />
                    New Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Topics */}
          {!response && (
            <Card className="muslim-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpenIcon className="h-5 w-5 text-primary" />
                  Popular Topics
                </CardTitle>
                <CardDescription>
                  Click on any topic to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { icon: ClockIcon, title: 'Prayer Times', desc: 'Learn about Islamic prayer times' },
                    { icon: CompassIcon, title: 'Qibla Direction', desc: 'Find direction to Kaaba' },
                    { icon: BookOpenIcon, title: 'Quran', desc: 'Read and understand the Quran' },
                    { icon: HeartIcon, title: 'Duas', desc: 'Islamic supplications and prayers' },
                  ].map((topic, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleSuggestionClick(topic.title)}
                      className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-primary/10"
                    >
                      <topic.icon className="h-5 w-5 text-primary" />
                      <div className="text-left">
                        <div className="font-semibold">{topic.title}</div>
                        <div className="text-xs text-muted-foreground">{topic.desc}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}