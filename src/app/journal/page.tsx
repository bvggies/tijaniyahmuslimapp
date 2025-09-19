'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BookmarkIcon, 
  PlusIcon,
  EditIcon,
  TrashIcon,
  CalendarIcon,
  HeartIcon,
  StarIcon,
  SearchIcon,
  FilterIcon,
  SaveIcon,
  XIcon,
  EyeIcon,
  EyeOffIcon
} from 'lucide-react'

interface JournalEntry {
  id: string
  title: string
  content: string
  date: Date
  mood: 'grateful' | 'reflective' | 'struggling' | 'peaceful' | 'inspired'
  category: 'prayer' | 'quran' | 'dhikr' | 'charity' | 'learning' | 'reflection' | 'gratitude'
  isPrivate: boolean
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

const moodOptions = [
  { value: 'grateful', label: 'Grateful', emoji: '🙏', color: 'text-green-500' },
  { value: 'reflective', label: 'Reflective', emoji: '🤔', color: 'text-blue-500' },
  { value: 'struggling', label: 'Struggling', emoji: '😔', color: 'text-red-500' },
  { value: 'peaceful', label: 'Peaceful', emoji: '😌', color: 'text-purple-500' },
  { value: 'inspired', label: 'Inspired', emoji: '✨', color: 'text-yellow-500' }
]

const categories = [
  { value: 'prayer', label: 'Prayer', icon: '🕌' },
  { value: 'quran', label: 'Quran', icon: '📖' },
  { value: 'dhikr', label: 'Dhikr', icon: '📿' },
  { value: 'charity', label: 'Charity', icon: '🤲' },
  { value: 'learning', label: 'Learning', icon: '🎓' },
  { value: 'reflection', label: 'Reflection', icon: '💭' },
  { value: 'gratitude', label: 'Gratitude', icon: '🙏' }
]

const prompts = [
  "What am I grateful for today?",
  "How did I feel during my prayers today?",
  "What did I learn from the Quran today?",
  "What challenges did I face in my faith today?",
  "How did I help someone today?",
  "What dua did I make today?",
  "What made me feel closer to Allah today?",
  "What do I want to improve in my spiritual journey?",
  "How did I practice patience today?",
  "What blessing am I most thankful for today?"
]

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedMood, setSelectedMood] = useState('All')
  const [showPrivate, setShowPrivate] = useState(true)
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 'grateful' as const,
    category: 'reflection' as const,
    isPrivate: false,
    tags: [] as string[]
  })

  // Load data from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('islamic-journal')
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries).map((entry: any) => ({
        ...entry,
        date: new Date(entry.date),
        createdAt: new Date(entry.createdAt),
        updatedAt: new Date(entry.updatedAt)
      }))
      setEntries(parsedEntries)
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('islamic-journal', JSON.stringify(entries))
  }, [entries])

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All' || entry.category === selectedCategory
    const matchesMood = selectedMood === 'All' || entry.mood === selectedMood
    const matchesPrivacy = showPrivate || !entry.isPrivate
    
    return matchesSearch && matchesCategory && matchesMood && matchesPrivacy
  })

  const addEntry = () => {
    if (newEntry.title.trim() && newEntry.content.trim()) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        title: newEntry.title,
        content: newEntry.content,
        date: new Date(),
        mood: newEntry.mood,
        category: newEntry.category,
        isPrivate: newEntry.isPrivate,
        tags: newEntry.tags,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      setEntries([entry, ...entries])
      setNewEntry({
        title: '',
        content: '',
        mood: 'grateful',
        category: 'reflection',
        isPrivate: false,
        tags: []
      })
      setShowAddForm(false)
    }
  }

  const editEntry = (entry: JournalEntry) => {
    setEditingEntry(entry)
    setNewEntry({
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
      category: entry.category,
      isPrivate: entry.isPrivate,
      tags: entry.tags
    })
    setShowAddForm(true)
  }

  const updateEntry = () => {
    if (editingEntry && newEntry.title.trim() && newEntry.content.trim()) {
      setEntries(prevEntries => 
        prevEntries.map(entry => 
          entry.id === editingEntry.id 
            ? { ...entry, ...newEntry, updatedAt: new Date() }
            : entry
        )
      )
      setEditingEntry(null)
      setNewEntry({
        title: '',
        content: '',
        mood: 'grateful',
        category: 'reflection',
        isPrivate: false,
        tags: []
      })
      setShowAddForm(false)
    }
  }

  const deleteEntry = (entryId: string) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== entryId))
  }

  const addTag = (tag: string) => {
    if (tag.trim() && !newEntry.tags.includes(tag.trim())) {
      setNewEntry(prev => ({ ...prev, tags: [...prev.tags, tag.trim()] }))
    }
  }

  const removeTag = (tagToRemove: string) => {
    setNewEntry(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }))
  }

  const getMoodInfo = (mood: string) => {
    return moodOptions.find(option => option.value === mood) || moodOptions[0]
  }

  const getCategoryInfo = (category: string) => {
    return categories.find(cat => cat.value === category) || categories[0]
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getRandomPrompt = () => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]
    setNewEntry(prev => ({ ...prev, content: randomPrompt + '\n\n' }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4">
            Islamic Journal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Reflect on your spiritual journey and document your growth in faith
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{entries.length}</div>
              <div className="text-muted-foreground">Total Entries</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {entries.filter(entry => entry.date.toDateString() === new Date().toDateString()).length}
              </div>
              <div className="text-muted-foreground">Today's Entries</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {entries.filter(entry => entry.mood === 'grateful').length}
              </div>
              <div className="text-muted-foreground">Grateful Entries</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {entries.filter(entry => entry.isPrivate).length}
              </div>
              <div className="text-muted-foreground">Private Entries</div>
            </CardContent>
          </Card>
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
                    placeholder="Search entries by title, content, or tags..."
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
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="p-2 border border-input rounded-lg"
                    >
                      <option value="All">All Categories</option>
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.icon} {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedMood}
                      onChange={(e) => setSelectedMood(e.target.value)}
                      className="p-2 border border-input rounded-lg"
                    >
                      <option value="All">All Moods</option>
                      {moodOptions.map(mood => (
                        <option key={mood.value} value={mood.value}>
                          {mood.emoji} {mood.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={showPrivate ? "islamic" : "outline"}
                      size="sm"
                      onClick={() => setShowPrivate(!showPrivate)}
                    >
                      {showPrivate ? <EyeIcon className="h-4 w-4 mr-2" /> : <EyeOffIcon className="h-4 w-4 mr-2" />}
                      {showPrivate ? 'Show Private' : 'Hide Private'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editingEntry ? 'Edit Entry' : 'New Journal Entry'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                    className="w-full p-3 border border-input rounded-lg"
                    placeholder="Enter entry title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <textarea
                    value={newEntry.content}
                    onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                    className="w-full p-3 border border-input rounded-lg h-32"
                    placeholder="Write your thoughts, reflections, or experiences..."
                  />
                  <div className="flex justify-between items-center mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={getRandomPrompt}
                    >
                      Get Writing Prompt
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      {newEntry.content.length} characters
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Mood</label>
                    <select
                      value={newEntry.mood}
                      onChange={(e) => setNewEntry({...newEntry, mood: e.target.value as any})}
                      className="w-full p-3 border border-input rounded-lg"
                    >
                      {moodOptions.map(mood => (
                        <option key={mood.value} value={mood.value}>
                          {mood.emoji} {mood.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={newEntry.category}
                      onChange={(e) => setNewEntry({...newEntry, category: e.target.value as any})}
                      className="w-full p-3 border border-input rounded-lg"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.icon} {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newEntry.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full flex items-center gap-1"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-red-500"
                        >
                          <XIcon className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add a tag and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addTag(e.currentTarget.value)
                        e.currentTarget.value = ''
                      }
                    }}
                    className="w-full p-3 border border-input rounded-lg"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPrivate"
                    checked={newEntry.isPrivate}
                    onChange={(e) => setNewEntry({...newEntry, isPrivate: e.target.checked})}
                    className="rounded"
                  />
                  <label htmlFor="isPrivate" className="text-sm">
                    Keep this entry private
                  </label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false)
                      setEditingEntry(null)
                      setNewEntry({
                        title: '',
                        content: '',
                        mood: 'grateful',
                        category: 'reflection',
                        isPrivate: false,
                        tags: []
                      })
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="islamic"
                    onClick={editingEntry ? updateEntry : addEntry}
                  >
                    <SaveIcon className="h-4 w-4 mr-2" />
                    {editingEntry ? 'Update' : 'Save'} Entry
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add Entry Button */}
        {!showAddForm && (
          <div className="text-center mb-8">
            <Button
              variant="islamic"
              size="lg"
              onClick={() => setShowAddForm(true)}
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              New Journal Entry
            </Button>
          </div>
        )}

        {/* Entries List */}
        <div className="space-y-6">
          {filteredEntries.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <BookmarkIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  No entries found
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || selectedCategory !== 'All' || selectedMood !== 'All' || !showPrivate
                    ? 'Try adjusting your search or filters'
                    : 'Start your spiritual journaling journey'
                  }
                </p>
                <Button
                  variant="islamic"
                  onClick={() => setShowAddForm(true)}
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Write First Entry
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredEntries.map((entry) => {
              const moodInfo = getMoodInfo(entry.mood)
              const categoryInfo = getCategoryInfo(entry.category)
              
              return (
                <Card key={entry.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{entry.title}</h3>
                          {entry.isPrivate && (
                            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                              Private
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4" />
                            {formatDate(entry.date)}
                          </div>
                          <div className={`flex items-center gap-1 ${moodInfo.color}`}>
                            <span>{moodInfo.emoji}</span>
                            {moodInfo.label}
                          </div>
                          <div className="flex items-center gap-1">
                            <span>{categoryInfo.icon}</span>
                            {categoryInfo.label}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editEntry(entry)}
                        >
                          <EditIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteEntry(entry.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="prose max-w-none">
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {entry.content}
                      </p>
                    </div>
                    
                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {entry.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
