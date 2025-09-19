'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  VideoIcon, 
  PlusIcon, 
  EditIcon, 
  TrashIcon, 
  SaveIcon, 
  XIcon,
  PlayIcon,
  EyeIcon
} from 'lucide-react'

interface LiveStream {
  id: string
  title: string
  description: string
  url: string
  thumbnail: string
  viewers: number
  isLive: boolean
  startTime: Date
  duration?: string
  quality: string[]
  currentQuality: string
}

export default function AdminLiveStreamsPage() {
  const [streams, setStreams] = useState<LiveStream[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    thumbnail: '',
    viewers: 0,
    isLive: true,
    duration: '24/7',
    quality: ['720p', '1080p'],
    currentQuality: '1080p'
  })

  useEffect(() => {
    // Load streams from localStorage or API
    const savedStreams = localStorage.getItem('adminLiveStreams')
    if (savedStreams) {
      setStreams(JSON.parse(savedStreams))
    }
  }, [])

  const saveStreams = (newStreams: LiveStream[]) => {
    setStreams(newStreams)
    localStorage.setItem('adminLiveStreams', JSON.stringify(newStreams))
  }

  const handleAdd = () => {
    setIsAdding(true)
    setFormData({
      title: '',
      description: '',
      url: '',
      thumbnail: '',
      viewers: 0,
      isLive: true,
      duration: '24/7',
      quality: ['720p', '1080p'],
      currentQuality: '1080p'
    })
  }

  const handleEdit = (stream: LiveStream) => {
    setEditingId(stream.id)
    setFormData({
      title: stream.title,
      description: stream.description,
      url: stream.url,
      thumbnail: stream.thumbnail,
      viewers: stream.viewers,
      isLive: stream.isLive,
      duration: stream.duration || '24/7',
      quality: stream.quality,
      currentQuality: stream.currentQuality
    })
  }

  const handleSave = () => {
    if (!formData.title || !formData.url) return

    const newStream: LiveStream = {
      id: editingId || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      url: formData.url,
      thumbnail: formData.thumbnail || `https://img.youtube.com/vi/${extractVideoId(formData.url)}/maxresdefault.jpg`,
      viewers: formData.viewers,
      isLive: formData.isLive,
      startTime: new Date(),
      duration: formData.duration,
      quality: formData.quality,
      currentQuality: formData.currentQuality
    }

    if (editingId) {
      const updatedStreams = streams.map(s => s.id === editingId ? newStream : s)
      saveStreams(updatedStreams)
      setEditingId(null)
    } else {
      saveStreams([...streams, newStream])
      setIsAdding(false)
    }

    setFormData({
      title: '',
      description: '',
      url: '',
      thumbnail: '',
      viewers: 0,
      isLive: true,
      duration: '24/7',
      quality: ['720p', '1080p'],
      currentQuality: '1080p'
    })
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this stream?')) {
      const updatedStreams = streams.filter(s => s.id !== id)
      saveStreams(updatedStreams)
    }
  }

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
    return match ? match[1] : ''
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({
      title: '',
      description: '',
      url: '',
      thumbnail: '',
      viewers: 0,
      isLive: true,
      duration: '24/7',
      quality: ['720p', '1080p'],
      currentQuality: '1080p'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Manage Live Streams</h1>
          <p className="text-muted-foreground">Add, edit, and manage live streams for the Makkah Live page</p>
        </div>

        {/* Add New Stream Button */}
        <div className="mb-6">
          <Button onClick={handleAdd} className="muslim-gradient">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add New Stream
          </Button>
        </div>

        {/* Add/Edit Form */}
        {(isAdding || editingId) && (
          <Card className="mb-6 muslim-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <VideoIcon className="h-5 w-5" />
                {editingId ? 'Edit Stream' : 'Add New Stream'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Stream title"
                  />
                </div>
                <div>
                  <Label htmlFor="url">YouTube URL</Label>
                  <Input
                    id="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Stream description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="viewers">Viewers Count</Label>
                  <Input
                    id="viewers"
                    type="number"
                    value={formData.viewers}
                    onChange={(e) => setFormData({ ...formData, viewers: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="24/7"
                  />
                </div>
                <div>
                  <Label htmlFor="thumbnail">Thumbnail URL (optional)</Label>
                  <Input
                    id="thumbnail"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    placeholder="Custom thumbnail URL"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isLive}
                    onChange={(e) => setFormData({ ...formData, isLive: e.target.checked })}
                  />
                  <span className="text-sm">Live Stream</span>
                </label>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} className="muslim-gradient">
                  <SaveIcon className="h-4 w-4 mr-2" />
                  {editingId ? 'Update Stream' : 'Add Stream'}
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <XIcon className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Streams List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {streams.map((stream) => (
            <Card key={stream.id} className="muslim-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{stream.title}</CardTitle>
                    <CardDescription className="mt-1 line-clamp-2">
                      {stream.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(stream)}
                    >
                      <EditIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(stream.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <EyeIcon className="h-4 w-4" />
                    <span>{stream.viewers.toLocaleString()} viewers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <PlayIcon className="h-4 w-4" />
                    <span>{stream.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${stream.isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
                    <span className={stream.isLive ? 'text-red-500' : 'text-muted-foreground'}>
                      {stream.isLive ? 'Live' : 'Offline'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {streams.length === 0 && (
          <Card className="muslim-card">
            <CardContent className="text-center py-12">
              <VideoIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary mb-2">No Live Streams</h3>
              <p className="text-muted-foreground mb-4">Add your first live stream to get started</p>
              <Button onClick={handleAdd} className="muslim-gradient">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Stream
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
