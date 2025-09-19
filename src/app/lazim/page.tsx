'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  CalendarIcon, 
  CheckCircleIcon,
  CircleIcon,
  ClockIcon,
  TargetIcon,
  TrophyIcon,
  StarIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  BarChart3Icon,
  FlameIcon
} from 'lucide-react'

interface Lazim {
  id: string
  name: string
  description: string
  frequency: 'daily' | 'weekly' | 'monthly'
  target: number
  current: number
  isCompleted: boolean
  completedAt?: Date
  streak: number
  category: string
  priority: 'high' | 'medium' | 'low'
}

const defaultLazims: Lazim[] = [
  {
    id: '1',
    name: 'Fajr Prayer',
    description: 'Perform Fajr prayer on time',
    frequency: 'daily',
    target: 1,
    current: 0,
    isCompleted: false,
    streak: 0,
    category: 'Prayer',
    priority: 'high'
  },
  {
    id: '2',
    name: 'Dhuhr Prayer',
    description: 'Perform Dhuhr prayer on time',
    frequency: 'daily',
    target: 1,
    current: 0,
    isCompleted: false,
    streak: 0,
    category: 'Prayer',
    priority: 'high'
  },
  {
    id: '3',
    name: 'Asr Prayer',
    description: 'Perform Asr prayer on time',
    frequency: 'daily',
    target: 1,
    current: 0,
    isCompleted: false,
    streak: 0,
    category: 'Prayer',
    priority: 'high'
  },
  {
    id: '4',
    name: 'Maghrib Prayer',
    description: 'Perform Maghrib prayer on time',
    frequency: 'daily',
    target: 1,
    current: 0,
    isCompleted: false,
    streak: 0,
    category: 'Prayer',
    priority: 'high'
  },
  {
    id: '5',
    name: 'Isha Prayer',
    description: 'Perform Isha prayer on time',
    frequency: 'daily',
    target: 1,
    current: 0,
    isCompleted: false,
    streak: 0,
    category: 'Prayer',
    priority: 'high'
  },
  {
    id: '6',
    name: 'Quran Reading',
    description: 'Read at least 1 page of Quran daily',
    frequency: 'daily',
    target: 1,
    current: 0,
    isCompleted: false,
    streak: 0,
    category: 'Quran',
    priority: 'high'
  },
  {
    id: '7',
    name: 'Dhikr',
    description: 'Perform daily dhikr and remembrance',
    frequency: 'daily',
    target: 1,
    current: 0,
    isCompleted: false,
    streak: 0,
    category: 'Dhikr',
    priority: 'medium'
  },
  {
    id: '8',
    name: 'Charity',
    description: 'Give charity or help someone in need',
    frequency: 'daily',
    target: 1,
    current: 0,
    isCompleted: false,
    streak: 0,
    category: 'Charity',
    priority: 'medium'
  }
]

const categories = ['All', 'Prayer', 'Quran', 'Dhikr', 'Charity', 'Learning', 'Health']

export default function LazimPage() {
  const [lazims, setLazims] = useState<Lazim[]>(defaultLazims)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingLazim, setEditingLazim] = useState<Lazim | null>(null)
  const [newLazim, setNewLazim] = useState({
    name: '',
    description: '',
    frequency: 'daily' as const,
    target: 1,
    category: 'Prayer',
    priority: 'medium' as const
  })

  // Load data from localStorage
  useEffect(() => {
    const savedLazims = localStorage.getItem('lazim-tracker')
    if (savedLazims) {
      setLazims(JSON.parse(savedLazims))
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('lazim-tracker', JSON.stringify(lazims))
  }, [lazims])

  // Reset daily lazims at midnight
  useEffect(() => {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime()
    
    const timer = setTimeout(() => {
      resetDailyLazims()
    }, timeUntilMidnight)

    return () => clearTimeout(timer)
  }, [])

  const resetDailyLazims = () => {
    setLazims(prevLazims => 
      prevLazims.map(lazim => 
        lazim.frequency === 'daily' 
          ? { ...lazim, current: 0, isCompleted: false, completedAt: undefined }
          : lazim
      )
    )
  }

  const filteredLazims = lazims.filter(lazim => 
    selectedCategory === 'All' || lazim.category === selectedCategory
  )

  const toggleLazim = (lazimId: string) => {
    setLazims(prevLazims => 
      prevLazims.map(lazim => {
        if (lazim.id === lazimId) {
          const isCompleted = !lazim.isCompleted
          const newCurrent = isCompleted ? lazim.target : Math.max(0, lazim.current - 1)
          const newStreak = isCompleted 
            ? lazim.streak + 1 
            : Math.max(0, lazim.streak - 1)
          
          return {
            ...lazim,
            isCompleted,
            current: newCurrent,
            completedAt: isCompleted ? new Date() : undefined,
            streak: newStreak
          }
        }
        return lazim
      })
    )
  }

  const addLazim = () => {
    if (newLazim.name.trim()) {
      const lazim: Lazim = {
        id: Date.now().toString(),
        name: newLazim.name,
        description: newLazim.description,
        frequency: newLazim.frequency,
        target: newLazim.target,
        current: 0,
        isCompleted: false,
        streak: 0,
        category: newLazim.category,
        priority: newLazim.priority
      }
      
      setLazims([...lazims, lazim])
      setNewLazim({
        name: '',
        description: '',
        frequency: 'daily',
        target: 1,
        category: 'Prayer',
        priority: 'medium'
      })
      setShowAddForm(false)
    }
  }

  const editLazim = (lazim: Lazim) => {
    setEditingLazim(lazim)
    setNewLazim({
      name: lazim.name,
      description: lazim.description,
      frequency: lazim.frequency,
      target: lazim.target,
      category: lazim.category,
      priority: lazim.priority
    })
    setShowAddForm(true)
  }

  const updateLazim = () => {
    if (editingLazim && newLazim.name.trim()) {
      setLazims(prevLazims => 
        prevLazims.map(lazim => 
          lazim.id === editingLazim.id 
            ? { ...lazim, ...newLazim }
            : lazim
        )
      )
      setEditingLazim(null)
      setNewLazim({
        name: '',
        description: '',
        frequency: 'daily',
        target: 1,
        category: 'Prayer',
        priority: 'medium'
      })
      setShowAddForm(false)
    }
  }

  const deleteLazim = (lazimId: string) => {
    setLazims(prevLazims => prevLazims.filter(lazim => lazim.id !== lazimId))
  }

  const getCompletionRate = () => {
    const completed = lazims.filter(lazim => lazim.isCompleted).length
    return lazims.length > 0 ? Math.round((completed / lazims.length) * 100) : 0
  }

  const getTotalStreak = () => {
    return lazims.reduce((total, lazim) => total + lazim.streak, 0)
  }

  const getLongestStreak = () => {
    return Math.max(...lazims.map(lazim => lazim.streak), 0)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500'
      case 'medium':
        return 'text-yellow-500'
      case 'low':
        return 'text-green-500'
      default:
        return 'text-gray-500'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <FlameIcon className="h-4 w-4" />
      case 'medium':
        return <StarIcon className="h-4 w-4" />
      case 'low':
        return <CircleIcon className="h-4 w-4" />
      default:
        return <CircleIcon className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4">
            Lazim Tracker
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your daily Islamic commitments and build consistent spiritual habits
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{getCompletionRate()}%</div>
              <div className="text-muted-foreground">Completion Rate</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{lazims.length}</div>
              <div className="text-muted-foreground">Total Lazims</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{getTotalStreak()}</div>
              <div className="text-muted-foreground">Total Streak</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{getLongestStreak()}</div>
              <div className="text-muted-foreground">Longest Streak</div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter and Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
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
          
          <Button
            variant="islamic"
            onClick={() => {
              setShowAddForm(true)
              setEditingLazim(null)
              setNewLazim({
                name: '',
                description: '',
                frequency: 'daily',
                target: 1,
                category: 'Prayer',
                priority: 'medium'
              })
            }}
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Lazim
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editingLazim ? 'Edit Lazim' : 'Add New Lazim'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={newLazim.name}
                    onChange={(e) => setNewLazim({...newLazim, name: e.target.value})}
                    className="w-full p-2 border border-input rounded-lg"
                    placeholder="Enter lazim name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={newLazim.category}
                    onChange={(e) => setNewLazim({...newLazim, category: e.target.value})}
                    className="w-full p-2 border border-input rounded-lg"
                  >
                    <option value="Prayer">Prayer</option>
                    <option value="Quran">Quran</option>
                    <option value="Dhikr">Dhikr</option>
                    <option value="Charity">Charity</option>
                    <option value="Learning">Learning</option>
                    <option value="Health">Health</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <input
                    type="text"
                    value={newLazim.description}
                    onChange={(e) => setNewLazim({...newLazim, description: e.target.value})}
                    className="w-full p-2 border border-input rounded-lg"
                    placeholder="Enter description"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Frequency</label>
                  <select
                    value={newLazim.frequency}
                    onChange={(e) => setNewLazim({...newLazim, frequency: e.target.value as any})}
                    className="w-full p-2 border border-input rounded-lg"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Target</label>
                  <input
                    type="number"
                    value={newLazim.target}
                    onChange={(e) => setNewLazim({...newLazim, target: parseInt(e.target.value) || 1})}
                    className="w-full p-2 border border-input rounded-lg"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    value={newLazim.priority}
                    onChange={(e) => setNewLazim({...newLazim, priority: e.target.value as any})}
                    className="w-full p-2 border border-input rounded-lg"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingLazim(null)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="islamic"
                  onClick={editingLazim ? updateLazim : addLazim}
                >
                  {editingLazim ? 'Update' : 'Add'} Lazim
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lazims List */}
        <div className="space-y-4">
          {filteredLazims.map((lazim) => (
            <Card key={lazim.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => toggleLazim(lazim.id)}
                      className="flex-shrink-0"
                    >
                      {lazim.isCompleted ? (
                        <CheckCircleIcon className="h-6 w-6 text-green-500" />
                      ) : (
                        <CircleIcon className="h-6 w-6 text-muted-foreground" />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${lazim.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                          {lazim.name}
                        </h3>
                        <div className={`flex items-center gap-1 ${getPriorityColor(lazim.priority)}`}>
                          {getPriorityIcon(lazim.priority)}
                        </div>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {lazim.category}
                        </span>
                      </div>
                      
                      {lazim.description && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {lazim.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Target: {lazim.target}</span>
                        <span>•</span>
                        <span>Streak: {lazim.streak}</span>
                        <span>•</span>
                        <span className="capitalize">{lazim.frequency}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editLazim(lazim)}
                    >
                      <EditIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteLazim(lazim.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredLazims.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <TargetIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                No lazims found
              </h3>
              <p className="text-muted-foreground mb-4">
                {selectedCategory === 'All' 
                  ? 'Add your first lazim to get started'
                  : `No lazims found in the ${selectedCategory} category`
                }
              </p>
              <Button
                variant="islamic"
                onClick={() => setShowAddForm(true)}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Lazim
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
