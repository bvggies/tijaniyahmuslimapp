'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BookOpenIcon,
  SearchIcon,
  FilterIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  CopyIcon,
  StarIcon,
  HeartIcon,
  CalendarIcon,
  TagIcon,
  GlobeIcon
} from 'lucide-react'

interface ContentItem {
  id: string
  type: 'dua' | 'wazifa' | 'zikr' | 'quran' | 'hadith'
  title: string
  arabic: string
  transliteration: string
  translation: string
  category: string
  tags: string[]
  status: 'published' | 'draft' | 'archived'
  author: string
  createdAt: Date
  updatedAt: Date
  views: number
  likes: number
  bookmarks: number
  isFeatured: boolean
  language: string
  audioUrl?: string
  reference?: string
}

const mockContent: ContentItem[] = [
  {
    id: '1',
    type: 'dua',
    title: 'Dua for Starting the Day',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: 'Asbahna wa asbahal mulku lillah, walhamdulillah, la ilaha illallah wahdahu la sharika lah',
    translation: 'We have entered the morning and the kingdom belongs to Allah, and all praise is due to Allah. There is no deity but Allah alone, without any partner.',
    category: 'Morning',
    tags: ['morning', 'praise', 'daily'],
    status: 'published',
    author: 'System Admin',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    views: 1234,
    likes: 89,
    bookmarks: 45,
    isFeatured: true,
    language: 'Arabic',
    reference: 'Muslim'
  },
  {
    id: '2',
    type: 'wazifa',
    title: 'Morning Wazifa',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ',
    transliteration: 'Subhan Allah wa bihamdihi, Subhan Allahil azeem',
    translation: 'Glory be to Allah and praise be to Him, Glory be to Allah the Great',
    category: 'Daily',
    tags: ['morning', 'wazifa', 'dhikr'],
    status: 'published',
    author: 'System Admin',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    views: 2341,
    likes: 156,
    bookmarks: 78,
    isFeatured: false,
    language: 'Arabic',
    reference: 'Bukhari'
  },
  {
    id: '3',
    type: 'zikr',
    title: 'Durood Sharif',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
    transliteration: 'Allahumma salli ala Muhammadin wa ala ali Muhammad',
    translation: 'O Allah, send blessings upon Muhammad and the family of Muhammad',
    category: 'Blessings',
    tags: ['durood', 'blessings', 'prophet'],
    status: 'draft',
    author: 'Content Manager',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19'),
    views: 0,
    likes: 0,
    bookmarks: 0,
    isFeatured: false,
    language: 'Arabic',
    reference: 'Tirmidhi'
  },
  {
    id: '4',
    type: 'quran',
    title: 'Surah Al-Fatiha',
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
    transliteration: 'Bismillahir rahmanir raheem',
    translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful',
    category: 'Quran',
    tags: ['quran', 'opening', 'essential'],
    status: 'published',
    author: 'System Admin',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-20'),
    views: 5678,
    likes: 234,
    bookmarks: 123,
    isFeatured: true,
    language: 'Arabic',
    reference: 'Quran 1:1'
  }
]

const contentTypes = ['All', 'Dua', 'Wazifa', 'Zikr', 'Quran', 'Hadith']
const statusOptions = ['All', 'Published', 'Draft', 'Archived']
const categories = ['All', 'Morning', 'Evening', 'Daily', 'Blessings', 'Quran', 'Protection', 'Forgiveness']

export default function AdminContentPage() {
  const [content, setContent] = useState<ContentItem[]>(mockContent)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [showItemDetails, setShowItemDetails] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState({
    type: 'dua' as const,
    title: '',
    arabic: '',
    transliteration: '',
    translation: '',
    category: 'Daily',
    tags: [] as string[],
    language: 'Arabic',
    reference: ''
  })

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.arabic.includes(searchTerm) ||
                         item.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesType = selectedType === 'All' || 
                       item.type === selectedType.toLowerCase()
    
    const matchesStatus = selectedStatus === 'All' || 
                         item.status === selectedStatus.toLowerCase()
    
    const matchesCategory = selectedCategory === 'All' || 
                           item.category === selectedCategory
    
    return matchesSearch && matchesType && matchesStatus && matchesCategory
  })

  const updateItemStatus = (itemId: string, newStatus: ContentItem['status']) => {
    setContent(prevContent => 
      prevContent.map(item => 
        item.id === itemId 
          ? { ...item, status: newStatus, updatedAt: new Date() }
          : item
      )
    )
  }

  const toggleFeatured = (itemId: string) => {
    setContent(prevContent => 
      prevContent.map(item => 
        item.id === itemId 
          ? { ...item, isFeatured: !item.isFeatured, updatedAt: new Date() }
          : item
      )
    )
  }

  const deleteItem = (itemId: string) => {
    if (confirm('Are you sure you want to delete this content item? This action cannot be undone.')) {
      setContent(prevContent => prevContent.filter(item => item.id !== itemId))
    }
  }

  const addItem = () => {
    if (newItem.title.trim() && newItem.arabic.trim() && newItem.translation.trim()) {
      const item: ContentItem = {
        id: Date.now().toString(),
        ...newItem,
        status: 'draft',
        author: 'Current Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        views: 0,
        likes: 0,
        bookmarks: 0,
        isFeatured: false
      }
      
      setContent([item, ...content])
      setNewItem({
        type: 'dua',
        title: '',
        arabic: '',
        transliteration: '',
        translation: '',
        category: 'Daily',
        tags: [],
        language: 'Arabic',
        reference: ''
      })
      setShowAddForm(false)
    }
  }

  const addTag = (tag: string) => {
    if (tag.trim() && !newItem.tags.includes(tag.trim())) {
      setNewItem(prev => ({ ...prev, tags: [...prev.tags, tag.trim()] }))
    }
  }

  const removeTag = (tagToRemove: string) => {
    setNewItem(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'text-green-600 bg-green-100'
      case 'draft':
        return 'text-yellow-600 bg-yellow-100'
      case 'archived':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dua':
        return <HeartIcon className="h-4 w-4" />
      case 'wazifa':
        return <StarIcon className="h-4 w-4" />
      case 'zikr':
        return <BookOpenIcon className="h-4 w-4" />
      case 'quran':
        return <GlobeIcon className="h-4 w-4" />
      case 'hadith':
        return <BookOpenIcon className="h-4 w-4" />
      default:
        return <BookOpenIcon className="h-4 w-4" />
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Content Management</h1>
            <p className="text-muted-foreground">Manage duas, wazifas, and other Islamic content</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <CopyIcon className="h-4 w-4 mr-2" />
              Export Content
            </Button>
            <Button 
              variant="islamic"
              onClick={() => setShowAddForm(true)}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Content
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Content</p>
                  <p className="text-3xl font-bold text-primary">{content.length}</p>
                </div>
                <BookOpenIcon className="h-8 w-8 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Published</p>
                  <p className="text-3xl font-bold text-green-600">
                    {content.filter(c => c.status === 'published').length}
                  </p>
                </div>
                <CheckCircleIcon className="h-8 w-8 text-green-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {content.filter(c => c.status === 'draft').length}
                  </p>
                </div>
                <AlertTriangleIcon className="h-8 w-8 text-yellow-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Featured</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {content.filter(c => c.isFeatured).length}
                  </p>
                </div>
                <StarIcon className="h-8 w-8 text-purple-500/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
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
                  placeholder="Search content by title, Arabic text, translation, or tags..."
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
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="p-2 border border-input rounded-lg"
                  >
                    {contentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="p-2 border border-input rounded-lg"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-2 border border-input rounded-lg"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Content Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Type</label>
                    <select
                      value={newItem.type}
                      onChange={(e) => setNewItem({...newItem, type: e.target.value as any})}
                      className="w-full p-3 border border-input rounded-lg"
                    >
                      <option value="dua">Dua</option>
                      <option value="wazifa">Wazifa</option>
                      <option value="zikr">Zikr</option>
                      <option value="quran">Quran</option>
                      <option value="hadith">Hadith</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      className="w-full p-3 border border-input rounded-lg"
                    >
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    className="w-full p-3 border border-input rounded-lg"
                    placeholder="Enter content title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Arabic Text</label>
                  <textarea
                    value={newItem.arabic}
                    onChange={(e) => setNewItem({...newItem, arabic: e.target.value})}
                    className="w-full p-3 border border-input rounded-lg h-20 text-right"
                    placeholder="Enter Arabic text"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Transliteration</label>
                  <input
                    type="text"
                    value={newItem.transliteration}
                    onChange={(e) => setNewItem({...newItem, transliteration: e.target.value})}
                    className="w-full p-3 border border-input rounded-lg"
                    placeholder="Enter transliteration"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Translation</label>
                  <textarea
                    value={newItem.translation}
                    onChange={(e) => setNewItem({...newItem, translation: e.target.value})}
                    className="w-full p-3 border border-input rounded-lg h-20"
                    placeholder="Enter translation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newItem.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full flex items-center gap-1"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Language</label>
                    <select
                      value={newItem.language}
                      onChange={(e) => setNewItem({...newItem, language: e.target.value})}
                      className="w-full p-3 border border-input rounded-lg"
                    >
                      <option value="Arabic">Arabic</option>
                      <option value="English">English</option>
                      <option value="Urdu">Urdu</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Reference</label>
                    <input
                      type="text"
                      value={newItem.reference}
                      onChange={(e) => setNewItem({...newItem, reference: e.target.value})}
                      className="w-full p-3 border border-input rounded-lg"
                      placeholder="e.g., Bukhari, Muslim, Quran 2:255"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="islamic"
                    onClick={addItem}
                  >
                    Add Content
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Content List */}
        <Card>
          <CardHeader>
            <CardTitle>Content Items ({filteredContent.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredContent.map((item) => (
                <div key={item.id} className="flex items-start justify-between p-4 border border-input rounded-lg hover:bg-muted/50">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      {getTypeIcon(item.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold truncate">{item.title}</h3>
                        {item.isFeatured && (
                          <StarIcon className="h-4 w-4 text-yellow-500" />
                        )}
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {item.type}
                        </span>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-2">
                        <div className="text-right font-arabic text-lg text-primary mb-1">
                          {item.arabic}
                        </div>
                        <div className="text-center italic">
                          {item.transliteration}
                        </div>
                        <div className="text-center">
                          {item.translation}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Category: {item.category}</span>
                        <span>•</span>
                        <span>Language: {item.language}</span>
                        <span>•</span>
                        <span>Views: {item.views}</span>
                        <span>•</span>
                        <span>Likes: {item.likes}</span>
                        <span>•</span>
                        <span>Bookmarks: {item.bookmarks}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedItem(item)
                        setShowItemDetails(true)
                      }}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedItem(item)
                        setShowItemDetails(true)
                      }}
                    >
                      <EditIcon className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFeatured(item.id)}
                    >
                      <StarIcon className={`h-4 w-4 ${item.isFeatured ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                    </Button>
                    
                    {item.status === 'published' ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateItemStatus(item.id, 'archived')}
                        className="text-orange-500 hover:text-orange-700"
                      >
                        <XCircleIcon className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateItemStatus(item.id, 'published')}
                        className="text-green-500 hover:text-green-700"
                      >
                        <CheckCircleIcon className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
