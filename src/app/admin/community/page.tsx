'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  MessageCircleIcon,
  SearchIcon,
  FilterIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  FlagIcon,
  AlertTriangleIcon,
  UsersIcon,
  HeartIcon,
  BookmarkIcon,
  ReplyIcon,
  ShareIcon,
  CalendarIcon,
  ClockIcon
} from 'lucide-react'

interface Post {
  id: string
  author: {
    name: string
    username: string
    avatar?: string
    isVerified: boolean
  }
  content: string
  image?: string
  category: string
  likes: number
  comments: number
  shares: number
  bookmarks: number
  status: 'published' | 'pending' | 'flagged' | 'hidden' | 'deleted'
  createdAt: Date
  updatedAt: Date
  flags: number
  lastFlagged?: Date
  isPinned: boolean
  tags: string[]
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Ahmad Hassan',
      username: 'ahmad_hassan',
      isVerified: true
    },
    content: 'Assalamu Alaikum everyone! Just wanted to share how beautiful today\'s Fajr prayer was. The peace and tranquility I felt during the early morning prayer reminded me of Allah\'s infinite mercy. May Allah bless us all with consistent prayers. Ameen.',
    category: 'Prayer',
    likes: 24,
    comments: 8,
    shares: 3,
    bookmarks: 5,
    status: 'published',
    createdAt: new Date('2024-01-20T08:30:00'),
    updatedAt: new Date('2024-01-20T08:30:00'),
    flags: 0,
    isPinned: false,
    tags: ['prayer', 'fajr', 'blessing']
  },
  {
    id: '2',
    author: {
      name: 'Fatima Al-Zahra',
      username: 'fatima_z',
      isVerified: true
    },
    content: 'Reading Surah Al-Rahman today and reflecting on Allah\'s countless blessings. Every verse is a reminder of His mercy and love for us. The verse "Which of the favors of your Lord would you deny?" really hit me today. We have so much to be grateful for.',
    category: 'Quran',
    likes: 31,
    comments: 12,
    shares: 7,
    bookmarks: 8,
    status: 'published',
    createdAt: new Date('2024-01-20T14:15:00'),
    updatedAt: new Date('2024-01-20T14:15:00'),
    flags: 0,
    isPinned: true,
    tags: ['quran', 'gratitude', 'reflection']
  },
  {
    id: '3',
    author: {
      name: 'Omar Abdullah',
      username: 'omar_a',
      isVerified: false
    },
    content: 'Quick question for the community: What are some effective ways to memorize Quran? I\'m trying to memorize Surah Al-Baqarah and finding it challenging. Any tips or techniques that worked for you? JazakAllah khair in advance!',
    category: 'Questions',
    likes: 18,
    comments: 15,
    shares: 2,
    bookmarks: 3,
    status: 'published',
    createdAt: new Date('2024-01-20T16:45:00'),
    updatedAt: new Date('2024-01-20T16:45:00'),
    flags: 0,
    isPinned: false,
    tags: ['quran', 'memorization', 'help']
  },
  {
    id: '4',
    author: {
      name: 'Aisha Rahman',
      username: 'aisha_r',
      isVerified: true
    },
    content: 'Alhamdulillah! Our local mosque just completed a charity drive and we were able to help 50 families in need. The community came together beautifully, and it reminded me of the importance of giving back. May Allah accept our efforts and bless those in need.',
    category: 'Charity',
    likes: 42,
    comments: 9,
    shares: 12,
    bookmarks: 15,
    status: 'published',
    createdAt: new Date('2024-01-19T20:30:00'),
    updatedAt: new Date('2024-01-19T20:30:00'),
    flags: 0,
    isPinned: false,
    tags: ['charity', 'community', 'blessing']
  },
  {
    id: '5',
    author: {
      name: 'Yusuf Ibrahim',
      username: 'yusuf_i',
      isVerified: false
    },
    content: 'This is inappropriate content that should be flagged and removed. It contains offensive language and goes against our community guidelines.',
    category: 'General',
    likes: 0,
    comments: 0,
    shares: 0,
    bookmarks: 0,
    status: 'flagged',
    createdAt: new Date('2024-01-19T10:20:00'),
    updatedAt: new Date('2024-01-19T10:20:00'),
    flags: 3,
    lastFlagged: new Date('2024-01-19T15:30:00'),
    isPinned: false,
    tags: ['inappropriate']
  }
]

const statusOptions = ['All', 'Published', 'Pending', 'Flagged', 'Hidden', 'Deleted']
const categoryOptions = ['All', 'Prayer', 'Quran', 'Charity', 'Questions', 'General', 'Inspiration', 'Learning']

export default function AdminCommunityPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showPostDetails, setShowPostDetails] = useState(false)

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = selectedStatus === 'All' || 
                         post.status === selectedStatus.toLowerCase()
    
    const matchesCategory = selectedCategory === 'All' || 
                           post.category === selectedCategory
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const updatePostStatus = (postId: string, newStatus: Post['status']) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, status: newStatus, updatedAt: new Date() }
          : post
      )
    )
  }

  const togglePinned = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, isPinned: !post.isPinned, updatedAt: new Date() }
          : post
      )
    )
  }

  const deletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, status: 'deleted', updatedAt: new Date() }
            : post
        )
      )
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'flagged':
        return 'text-red-600 bg-red-100'
      case 'hidden':
        return 'text-gray-600 bg-gray-100'
      case 'deleted':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return formatDate(date)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Community Moderation</h1>
            <p className="text-muted-foreground">Manage community posts and moderate content</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <FlagIcon className="h-4 w-4 mr-2" />
              Flagged Posts ({posts.filter(p => p.status === 'flagged').length})
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                  <p className="text-3xl font-bold text-primary">{posts.length}</p>
                </div>
                <MessageCircleIcon className="h-8 w-8 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Published</p>
                  <p className="text-3xl font-bold text-green-600">
                    {posts.filter(p => p.status === 'published').length}
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
                  <p className="text-sm font-medium text-muted-foreground">Flagged</p>
                  <p className="text-3xl font-bold text-red-600">
                    {posts.filter(p => p.status === 'flagged').length}
                  </p>
                </div>
                <FlagIcon className="h-8 w-8 text-red-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pinned</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {posts.filter(p => p.isPinned).length}
                  </p>
                </div>
                <BookmarkIcon className="h-8 w-8 text-purple-500/20" />
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
                  placeholder="Search posts by content, author, or tags..."
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
                    {categoryOptions.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts List */}
        <Card>
          <CardHeader>
            <CardTitle>Community Posts ({filteredPosts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="flex items-start justify-between p-4 border border-input rounded-lg hover:bg-muted/50">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <UsersIcon className="h-5 w-5 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{post.author.name}</h3>
                        {post.author.isVerified && (
                          <CheckCircleIcon className="h-4 w-4 text-blue-500" />
                        )}
                        <span className="text-sm text-muted-foreground">@{post.author.username}</span>
                        {post.isPinned && (
                          <BookmarkIcon className="h-4 w-4 text-purple-500" />
                        )}
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(post.status)}`}>
                          {post.status}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {post.category}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground mb-2 line-clamp-3">
                        {post.content}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <HeartIcon className="h-3 w-3" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ReplyIcon className="h-3 w-3" />
                          <span>{post.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ShareIcon className="h-3 w-3" />
                          <span>{post.shares}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookmarkIcon className="h-3 w-3" />
                          <span>{post.bookmarks}</span>
                        </div>
                        {post.flags > 0 && (
                          <div className="flex items-center gap-1 text-red-500">
                            <FlagIcon className="h-3 w-3" />
                            <span>{post.flags} flags</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-3 w-3" />
                          <span>{formatTimeAgo(post.updatedAt)}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.tags.map(tag => (
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
                        setSelectedPost(post)
                        setShowPostDetails(true)
                      }}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePinned(post.id)}
                    >
                      <BookmarkIcon className={`h-4 w-4 ${post.isPinned ? 'text-purple-500' : 'text-muted-foreground'}`} />
                    </Button>
                    
                    {post.status === 'published' ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updatePostStatus(post.id, 'hidden')}
                        className="text-orange-500 hover:text-orange-700"
                      >
                        <XCircleIcon className="h-4 w-4" />
                      </Button>
                    ) : post.status === 'flagged' ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updatePostStatus(post.id, 'published')}
                        className="text-green-500 hover:text-green-700"
                      >
                        <CheckCircleIcon className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updatePostStatus(post.id, 'published')}
                        className="text-green-500 hover:text-green-700"
                      >
                        <CheckCircleIcon className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deletePost(post.id)}
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

        {/* Post Details Modal */}
        {showPostDetails && selectedPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Post Details</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPostDetails(false)}
                  >
                    <XCircleIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <UsersIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{selectedPost.author.name}</h4>
                        {selectedPost.author.isVerified && (
                          <CheckCircleIcon className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">@{selectedPost.author.username}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div>
                    <h4 className="font-semibold mb-2">Content</h4>
                    <p className="text-muted-foreground whitespace-pre-wrap">{selectedPost.content}</p>
                  </div>

                  {/* Post Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <p className="text-2xl font-bold text-primary">{selectedPost.likes}</p>
                      <p className="text-sm text-muted-foreground">Likes</p>
                    </div>
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <p className="text-2xl font-bold text-primary">{selectedPost.comments}</p>
                      <p className="text-sm text-muted-foreground">Comments</p>
                    </div>
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <p className="text-2xl font-bold text-primary">{selectedPost.shares}</p>
                      <p className="text-sm text-muted-foreground">Shares</p>
                    </div>
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <p className="text-2xl font-bold text-primary">{selectedPost.bookmarks}</p>
                      <p className="text-sm text-muted-foreground">Bookmarks</p>
                    </div>
                  </div>

                  {/* Post Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Status</label>
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(selectedPost.status)}`}>
                        {selectedPost.status}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Category</label>
                      <p className="text-sm">{selectedPost.category}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Created</label>
                      <p className="text-sm">{formatDate(selectedPost.createdAt)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                      <p className="text-sm">{formatTimeAgo(selectedPost.updatedAt)}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setShowPostDetails(false)}
                    >
                      Close
                    </Button>
                    <Button
                      variant="islamic"
                      onClick={() => {
                        // Handle post actions
                        setShowPostDetails(false)
                      }}
                    >
                      Manage Post
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
