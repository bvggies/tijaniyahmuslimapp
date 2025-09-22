'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
    name: 'Sheikh Alhaji Abdullahi Ahmad Maikano (R.A)',
    title: 'Baba Jalloo - Tijaniyya Scholar and Khalifa',
    specialization: ['Tijaniyya Tariqa', 'Prayer', 'Dhikr', 'Quran', 'Spirituality', 'Tasawwuf'],
    country: 'Ghana',
    language: ['Arabic', 'Hausa', 'English'],
    description: 'A true and faithful scholar whose interest lay mainly in prayers, remembrance of Allah, repentance, and seeking forgiveness. He devoted his whole life to the service of Allah and spreading Tariqatu Tijaniyya.',
    image: 'https://drive.google.com/uc?export=view&id=1XBGxf5ypoABMNk2-fX07UVsJeTMXsUve',
    rating: 5.0,
    isFavorite: false,
    lectures: [
      {
        id: '1',
        title: 'The Importance of Dhikr in Tijaniyya',
        duration: '45 min',
        description: 'Deep insights into the practice of remembrance of Allah in the Tijaniyya tradition.',
        url: 'https://youtube.com/watch?v=example1',
        views: 250000,
        date: new Date('2004-06-15'),
        category: 'Spirituality'
      },
      {
        id: '2',
        title: 'The Path of Tijaniyya Tariqa',
        duration: '50 min',
        description: 'Understanding the spiritual path and practices of the Tijaniyya order.',
        url: 'https://youtube.com/watch?v=example2',
        views: 180000,
        date: new Date('2004-05-20'),
        category: 'Tasawwuf'
      },
      {
        id: '3',
        title: 'Prayer and Its Spiritual Significance',
        duration: '35 min',
        description: 'The deeper meaning and spiritual benefits of regular prayer in Islamic practice.',
        url: 'https://youtube.com/watch?v=example3',
        views: 220000,
        date: new Date('2004-04-10'),
        category: 'Prayer'
      },
      {
        id: '4',
        title: 'The Beauty of Repentance and Forgiveness',
        duration: '40 min',
        description: 'Guidance on seeking forgiveness and the transformative power of sincere repentance.',
        url: 'https://youtube.com/watch?v=example4',
        views: 195000,
        date: new Date('2004-03-15'),
        category: 'Spirituality'
      },
      {
        id: '5',
        title: 'Quranic Recitation and Its Spiritual Impact',
        duration: '55 min',
        description: 'The spiritual benefits and proper methods of Quranic recitation in daily practice.',
        url: 'https://youtube.com/watch?v=example5',
        views: 210000,
        date: new Date('2004-02-20'),
        category: 'Quran'
      },
      {
        id: '6',
        title: 'Spreading Tariqatu Tijaniyya in West Africa',
        duration: '60 min',
        description: 'Historical account of the establishment and growth of Tijaniyya in Ghana and West Africa.',
        url: 'https://youtube.com/watch?v=example6',
        views: 180000,
        date: new Date('2003-09-20'),
        category: 'History'
      },
      {
        id: '7',
        title: 'The Spiritual Journey of a Tijaniyya Disciple',
        duration: '48 min',
        description: 'Guidance on the spiritual development and progression within the Tijaniyya tradition.',
        url: 'https://youtube.com/watch?v=example7',
        views: 165000,
        date: new Date('2003-08-15'),
        category: 'Tasawwuf'
      },
      {
        id: '8',
        title: 'The Power of Morning and Evening Adhkar',
        duration: '42 min',
        description: 'Understanding the significance and benefits of morning and evening remembrance of Allah.',
        url: 'https://youtube.com/watch?v=example8',
        views: 200000,
        date: new Date('2003-07-10'),
        category: 'Dhikr'
      }
    ]
  }
]

const specializations = ['All', 'Tijaniyya Tariqa', 'Prayer', 'Dhikr', 'Quran', 'Spirituality', 'Tasawwuf']

const categories = ['All', 'Spirituality', 'Prayer', 'Quran', 'Tasawwuf', 'Dhikr', 'History']

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
            <Card key={scholar.id} className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => {
              if (scholar.id === '1') {
                window.location.href = '/scholars/sheikh-abdullahi-maikano'
              } else {
                setSelectedScholar(scholar)
              }
            }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                      {scholar.id === '1' ? (
                        <img
                          src={scholar.image}
                          alt={scholar.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/api/placeholder/48/48';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 rounded-full flex items-center justify-center">
                          <GraduationCapIcon className="h-6 w-6 text-primary" />
                        </div>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{scholar.name}</CardTitle>
                      <CardDescription>{scholar.title}</CardDescription>
                      {scholar.id === '1' && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          <BookOpenIcon className="h-3 w-3 mr-1" />
                          Detailed Biography
                        </Badge>
                      )}
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
