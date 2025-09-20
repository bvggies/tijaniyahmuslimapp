'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AccessControl } from '@/components/admin/access-control'
import { 
  MessageCircleIcon, 
  UsersIcon,
  HeartIcon,
  StarIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  GlobeIcon,
  CalendarIcon,
  ThumbsUpIcon,
  ReplyIcon,
  ShareIcon,
  FlagIcon,
  BookmarkIcon
} from 'lucide-react'

interface Post {
  id: string
  author: {
    name: string
    avatar: string
    location: string
    joinDate: Date
  }
  content: string
  image?: string
  category: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  isBookmarked: boolean
  createdAt: Date
  tags: string[]
}

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  likes: number
  isLiked: boolean
  createdAt: Date
}

const categories = ['All', 'General', 'Prayer', 'Quran', 'Ramadan', 'Charity', 'Learning', 'Inspiration', 'Questions']

const samplePosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Ahmad Hassan',
      avatar: '/api/placeholder/40/40',
      location: 'New York, USA',
      joinDate: new Date('2023-01-15')
    },
    content: 'Assalamu Alaikum everyone! Just wanted to share how beautiful today\'s Fajr prayer was. The peace and tranquility I felt during the early morning prayer reminded me of Allah\'s infinite mercy. May Allah bless us all with consistent prayers. Ameen.',
    category: 'Prayer',
    likes: 24,
    comments: 8,
    shares: 3,
    isLiked: false,
    isBookmarked: false,
    createdAt: new Date('2024-01-20T08:30:00'),
    tags: ['prayer', 'fajr', 'blessing']
  },
  {
    id: '2',
    author: {
      name: 'Fatima Al-Zahra',
      avatar: '/api/placeholder/40/40',
      location: 'London, UK',
      joinDate: new Date('2023-03-22')
    },
    content: 'Reading Surah Al-Rahman today and reflecting on Allah\'s countless blessings. Every verse is a reminder of His mercy and love for us. The verse "Which of the favors of your Lord would you deny?" really hit me today. We have so much to be grateful for.',
    category: 'Quran',
    likes: 31,
    comments: 12,
    shares: 7,
    isLiked: true,
    isBookmarked: true,
    createdAt: new Date('2024-01-20T14:15:00'),
    tags: ['quran', 'gratitude', 'reflection']
  },
  {
    id: '3',
    author: {
      name: 'Omar Abdullah',
      avatar: '/api/placeholder/40/40',
      location: 'Toronto, Canada',
      joinDate: new Date('2023-06-10')
    },
    content: 'Quick question for the community: What are some effective ways to memorize Quran? I\'m trying to memorize Surah Al-Baqarah and finding it challenging. Any tips or techniques that worked for you? JazakAllah khair in advance!',
    category: 'Questions',
    likes: 18,
    comments: 15,
    shares: 2,
    isLiked: false,
    isBookmarked: false,
    createdAt: new Date('2024-01-20T16:45:00'),
    tags: ['quran', 'memorization', 'help']
  },
  {
    id: '4',
    author: {
      name: 'Aisha Rahman',
      avatar: '/api/placeholder/40/40',
      location: 'Sydney, Australia',
      joinDate: new Date('2023-02-28')
    },
    content: 'Alhamdulillah! Our local mosque just completed a charity drive and we were able to help 50 families in need. The community came together beautifully, and it reminded me of the importance of giving back. May Allah accept our efforts and bless those in need.',
    category: 'Charity',
    likes: 42,
    comments: 9,
    shares: 12,
    isLiked: true,
    isBookmarked: false,
    createdAt: new Date('2024-01-19T20:30:00'),
    tags: ['charity', 'community', 'blessing']
  },
  {
    id: '5',
    author: {
      name: 'Yusuf Ibrahim',
      avatar: '/api/placeholder/40/40',
      location: 'Dubai, UAE',
      joinDate: new Date('2023-04-05')
    },
    content: 'Ramadan is approaching! I\'m starting to prepare mentally and spiritually. What are your Ramadan goals this year? I\'m planning to: 1) Complete the Quran, 2) Increase my charity, 3) Improve my prayers, 4) Learn more about Islam. What about you?',
    category: 'Ramadan',
    likes: 28,
    comments: 22,
    shares: 8,
    isLiked: false,
    isBookmarked: true,
    createdAt: new Date('2024-01-19T10:20:00'),
    tags: ['ramadan', 'goals', 'preparation']
  }
]

export default function CommunityPage() {
  return (
    <AccessControl requiredRole={['user', 'admin', 'super-admin']} feature="community">
      <CommunityContent />
    </AccessControl>
  )
}

function CommunityContent() {
  const [posts, setPosts] = useState<Post[]>(samplePosts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [newPost, setNewPost] = useState({
    content: '',
    category: 'General',
    tags: [] as string[]
  })
  const [bookmarks, setBookmarks] = useState<string[]>([])

  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('community-bookmarks')
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks))
    }
  }, [])

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('community-bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const toggleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    )
  }

  const toggleBookmark = (postId: string) => {
    setBookmarks(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const createPost = () => {
    if (newPost.content.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: {
          name: 'You',
          avatar: '/api/placeholder/40/40',
          location: 'Your Location',
          joinDate: new Date()
        },
        content: newPost.content,
        category: newPost.category,
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        isBookmarked: false,
        createdAt: new Date(),
        tags: newPost.tags
      }
      
      setPosts([post, ...posts])
      setNewPost({ content: '', category: 'General', tags: [] })
      setShowCreatePost(false)
    }
  }

  const addTag = (tag: string) => {
    if (tag.trim() && !newPost.tags.includes(tag.trim())) {
      setNewPost(prev => ({ ...prev, tags: [...prev.tags, tag.trim()] }))
    }
  }

  const removeTag = (tagToRemove: string) => {
    setNewPost(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }))
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4">
            Community
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow Muslims worldwide, share experiences, and grow together in faith
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{posts.length}</div>
              <div className="text-muted-foreground">Total Posts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {posts.reduce((total, post) => total + post.comments, 0)}
              </div>
              <div className="text-muted-foreground">Total Comments</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {posts.reduce((total, post) => total + post.likes, 0)}
              </div>
              <div className="text-muted-foreground">Total Likes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{bookmarks.length}</div>
              <div className="text-muted-foreground">Bookmarks</div>
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
                    placeholder="Search posts, users, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "islamic" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Post */}
        {showCreatePost && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">What's on your mind?</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    className="w-full p-3 border border-input rounded-lg h-32"
                    placeholder="Share your thoughts, experiences, or questions with the community..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                      className="w-full p-3 border border-input rounded-lg"
                    >
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tags</label>
                    <input
                      type="text"
                      placeholder="Add tags (press Enter to add)"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addTag(e.currentTarget.value)
                          e.currentTarget.value = ''
                        }
                      }}
                      className="w-full p-3 border border-input rounded-lg"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newPost.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full flex items-center gap-1"
                        >
                          #{tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-red-500"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreatePost(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="islamic"
                    onClick={createPost}
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create Post Button */}
        {!showCreatePost && (
          <div className="text-center mb-8">
            <Button
              variant="islamic"
              size="lg"
              onClick={() => setShowCreatePost(true)}
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create New Post
            </Button>
          </div>
        )}

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <UsersIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{post.author.name}</h4>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{post.author.location}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(post.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="prose max-w-none">
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {post.content}
                    </p>
                  </div>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleLike(post.id)}
                        className={post.isLiked ? 'text-red-500' : ''}
                      >
                        <ThumbsUpIcon className={`h-4 w-4 mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
                        {post.likes}
                      </Button>
                      
                      <Button variant="ghost" size="sm">
                        <ReplyIcon className="h-4 w-4 mr-2" />
                        {post.comments}
                      </Button>
                      
                      <Button variant="ghost" size="sm">
                        <ShareIcon className="h-4 w-4 mr-2" />
                        {post.shares}
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(post.id)}
                        className={bookmarks.includes(post.id) ? 'text-yellow-500' : ''}
                      >
                        <BookmarkIcon className={`h-4 w-4 ${bookmarks.includes(post.id) ? 'fill-current' : ''}`} />
                      </Button>
                      
                      <Button variant="ghost" size="sm">
                        <FlagIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MessageCircleIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                No posts found
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedCategory !== 'All'
                  ? 'Try adjusting your search or filters'
                  : 'Be the first to start a conversation!'
                }
              </p>
              <Button
                variant="islamic"
                onClick={() => setShowCreatePost(true)}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Create First Post
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
