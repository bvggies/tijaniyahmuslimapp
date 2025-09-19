'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  GraduationCapIcon, 
  SearchIcon,
  FilterIcon,
  PlayIcon,
  BookOpenIcon,
  GlobeIcon,
  StarIcon,
  UsersIcon,
  CalendarIcon,
  ExternalLinkIcon,
  HeartIcon,
  AwardIcon
} from 'lucide-react'

interface Scholar {
  id: string
  name: string
  title: string
  specialization: string[]
  country: string
  language: string[]
  description: string
  image: string
  website?: string
  youtube?: string
  twitter?: string
  instagram?: string
  isFavorite: boolean
  rating: number
  lectures: Lecture[]
}

interface Lecture {
  id: string
  title: string
  duration: string
  description: string
  url: string
  views: number
  date: Date
  category: string
}

const scholars: Scholar[] = [
  {
    id: '1',
    name: 'Sheikh Abdul Nasir Jangda',
    title: 'Imam and Islamic Scholar',
    specialization: ['Quran', 'Hadith', 'Fiqh', 'Tafsir'],
    country: 'United States',
    language: ['English', 'Arabic', 'Urdu'],
    description: 'Renowned scholar known for his deep understanding of Quranic sciences and contemporary Islamic issues.',
    image: '/api/placeholder/150/150',
    website: 'https://quranacademy.io',
    youtube: 'https://youtube.com/@QuranAcademy',
    twitter: '@QuranAcademy',
    rating: 4.9,
    isFavorite: false,
    lectures: [
      {
        id: '1',
        title: 'Understanding the Quran in Modern Times',
        duration: '45 min',
        description: 'A comprehensive lecture on how to understand and apply Quranic teachings in contemporary life.',
        url: 'https://youtube.com/watch?v=example1',
        views: 125000,
        date: new Date('2024-01-15'),
        category: 'Quran'
      },
      {
        id: '2',
        title: 'The Importance of Prayer in Islam',
        duration: '30 min',
        description: 'Deep dive into the significance and proper performance of daily prayers.',
        url: 'https://youtube.com/watch?v=example2',
        views: 89000,
        date: new Date('2024-01-10'),
        category: 'Prayer'
      }
    ]
  },
  {
    id: '2',
    name: 'Dr. Yasir Qadhi',
    title: 'Islamic Scholar and Author',
    specialization: ['Hadith', 'Seerah', 'Aqeedah', 'History'],
    country: 'United States',
    language: ['English', 'Arabic'],
    description: 'Prominent scholar specializing in Islamic history, theology, and contemporary issues.',
    image: '/api/placeholder/150/150',
    website: 'https://yasirqadhi.com',
    youtube: 'https://youtube.com/@YasirQadhi',
    twitter: '@YasirQadhi',
    rating: 4.8,
    isFavorite: false,
    lectures: [
      {
        id: '3',
        title: 'The Life of Prophet Muhammad (PBUH)',
        duration: '60 min',
        description: 'Detailed biography of the Prophet covering his early life, mission, and legacy.',
        url: 'https://youtube.com/watch?v=example3',
        views: 200000,
        date: new Date('2024-01-20'),
        category: 'Seerah'
      }
    ]
  },
  {
    id: '3',
    name: 'Sheikh Omar Suleiman',
    title: 'Imam and Islamic Scholar',
    specialization: ['Spirituality', 'Social Justice', 'Youth Issues', 'Community Building'],
    country: 'United States',
    language: ['English', 'Arabic'],
    description: 'Dynamic scholar focused on spiritual development and social justice in Islam.',
    image: '/api/placeholder/150/150',
    website: 'https://yaqeeninstitute.org',
    youtube: 'https://youtube.com/@YaqeenInstitute',
    twitter: '@omarsuleiman504',
    rating: 4.9,
    isFavorite: false,
    lectures: [
      {
        id: '4',
        title: 'Building a Strong Muslim Community',
        duration: '40 min',
        description: 'Guidance on fostering unity and strength within Muslim communities.',
        url: 'https://youtube.com/watch?v=example4',
        views: 150000,
        date: new Date('2024-01-18'),
        category: 'Community'
      }
    ]
  },
  {
    id: '4',
    name: 'Dr. Shabir Ally',
    title: 'Islamic Scholar and Interfaith Activist',
    specialization: ['Interfaith Dialogue', 'Quran', 'Comparative Religion', 'Apologetics'],
    country: 'Canada',
    language: ['English', 'Arabic', 'French'],
    description: 'Scholar known for his work in interfaith dialogue and Islamic apologetics.',
    image: '/api/placeholder/150/150',
    website: 'https://letmeturnthetables.com',
    youtube: 'https://youtube.com/@LetMeTurnTheTables',
    twitter: '@ShabirAlly',
    rating: 4.7,
    isFavorite: false,
    lectures: [
      {
        id: '5',
        title: 'Islam and Other Religions',
        duration: '50 min',
        description: 'Understanding Islam\'s relationship with other faiths and promoting dialogue.',
        url: 'https://youtube.com/watch?v=example5',
        views: 95000,
        date: new Date('2024-01-12'),
        category: 'Interfaith'
      }
    ]
  },
  {
    id: '5',
    name: 'Sheikh Hamza Yusuf',
    title: 'Islamic Scholar and Founder of Zaytuna College',
    specialization: ['Classical Islamic Sciences', 'Philosophy', 'Spirituality', 'Education'],
    country: 'United States',
    language: ['English', 'Arabic', 'Spanish'],
    description: 'Renowned scholar and founder of Zaytuna College, specializing in classical Islamic education.',
    image: '/api/placeholder/150/150',
    website: 'https://zaytuna.edu',
    youtube: 'https://youtube.com/@ZaytunaCollege',
    twitter: '@HamzaYusuf',
    rating: 4.9,
    isFavorite: false,
    lectures: [
      {
        id: '6',
        title: 'The Crisis of Modern Education',
        duration: '55 min',
        description: 'Analysis of contemporary educational challenges and Islamic solutions.',
        url: 'https://youtube.com/watch?v=example6',
        views: 180000,
        date: new Date('2024-01-08'),
        category: 'Education'
      }
    ]
  }
]

const specializations = ['All', 'Quran', 'Hadith', 'Fiqh', 'Tafsir', 'Seerah', 'Aqeedah', 'History', 'Spirituality', 'Social Justice', 'Interfaith Dialogue', 'Education']

const categories = ['All', 'Quran', 'Prayer', 'Seerah', 'Community', 'Interfaith', 'Education', 'Spirituality']

export default function ScholarsPage() {
  const [scholarsList, setScholarsList] = useState<Scholar[]>(scholars)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialization, setSelectedSpecialization] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedScholar, setSelectedScholar] = useState<Scholar | null>(null)

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('scholar-favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('scholar-favorites', JSON.stringify(favorites))
  }, [favorites])

  const filteredScholars = scholarsList.filter(scholar => {
    const matchesSearch = scholar.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholar.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         scholar.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSpecialization = selectedSpecialization === 'All' || 
                                 scholar.specialization.includes(selectedSpecialization)
    
    return matchesSearch && matchesSpecialization
  })

  const filteredLectures = selectedScholar?.lectures.filter(lecture => 
    selectedCategory === 'All' || lecture.category === selectedCategory
  ) || []

  const toggleFavorite = (scholarId: string) => {
    setFavorites(prev => 
      prev.includes(scholarId) 
        ? prev.filter(id => id !== scholarId)
        : [...prev, scholarId]
    )
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    }
    return views.toString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4">
            Islamic Scholars
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn from renowned Islamic scholars and teachers from around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SearchIcon className="h-6 w-6" />
                Search & Filter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search scholars by name, specialization, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <FilterIcon className="h-4 w-4" />
                    <select
                      value={selectedSpecialization}
                      onChange={(e) => setSelectedSpecialization(e.target.value)}
                      className="p-2 border border-input rounded-lg"
                    >
                      <option value="All">All Specializations</option>
                      {specializations.slice(1).map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scholars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredScholars.map((scholar) => (
            <Card key={scholar.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedScholar(scholar)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <GraduationCapIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{scholar.name}</CardTitle>
                      <CardDescription>{scholar.title}</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(scholar.id)
                    }}
                  >
                    <HeartIcon 
                      className={`h-4 w-4 ${
                        favorites.includes(scholar.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-muted-foreground'
                      }`} 
                    />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {scholar.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{scholar.country}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <StarIcon className="h-4 w-4 text-yellow-500" />
                      <span>{scholar.rating}/5.0</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <UsersIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{scholar.lectures.length} lectures</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {scholar.specialization.slice(0, 3).map((spec, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                    {scholar.specialization.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{scholar.specialization.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {scholar.website && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={scholar.website} target="_blank" rel="noopener noreferrer">
                          <GlobeIcon className="h-4 w-4 mr-2" />
                          Website
                        </a>
                      </Button>
                    )}
                    {scholar.youtube && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={scholar.youtube} target="_blank" rel="noopener noreferrer">
                          <PlayIcon className="h-4 w-4 mr-2" />
                          YouTube
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Scholar Details */}
        {selectedScholar && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedScholar.name}</CardTitle>
                  <CardDescription className="text-lg">{selectedScholar.title}</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedScholar(null)}
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">About</h4>
                    <p className="text-muted-foreground">{selectedScholar.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Specializations</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedScholar.specialization.map((spec, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <GlobeIcon className="h-5 w-5 text-muted-foreground" />
                    <span>{selectedScholar.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarIcon className="h-5 w-5 text-yellow-500" />
                    <span>{selectedScholar.rating}/5.0 Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-5 w-5 text-muted-foreground" />
                    <span>{selectedScholar.lectures.length} Lectures</span>
                  </div>
                </div>

                {/* Lectures */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Lectures</h4>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="p-2 border border-input rounded-lg"
                    >
                      <option value="All">All Categories</option>
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-3">
                    {filteredLectures.map((lecture) => (
                      <div key={lecture.id} className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                        <div className="flex-1">
                          <h5 className="font-medium">{lecture.title}</h5>
                          <p className="text-sm text-muted-foreground mt-1">{lecture.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>{lecture.duration}</span>
                            <span>•</span>
                            <span>{formatViews(lecture.views)} views</span>
                            <span>•</span>
                            <span>{formatDate(lecture.date)}</span>
                            <span>•</span>
                            <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                              {lecture.category}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={lecture.url} target="_blank" rel="noopener noreferrer">
                            <PlayIcon className="h-4 w-4 mr-2" />
                            Watch
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HeartIcon className="h-6 w-6 text-red-500" />
                  Your Favorite Scholars ({favorites.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favorites.map(scholarId => {
                    const scholar = scholars.find(s => s.id === scholarId)
                    if (!scholar) return null
                    
                    return (
                      <Card key={scholarId} className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <GraduationCapIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{scholar.name}</h4>
                            <p className="text-xs text-muted-foreground">{scholar.title}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(scholarId)}
                          >
                            <HeartIcon className="h-4 w-4 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
