'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  UsersIcon,
  SearchIcon,
  FilterIcon,
  MoreVerticalIcon,
  EditIcon,
  TrashIcon,
  BanIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  MailIcon,
  CalendarIcon,
  MapPinIcon,
  ActivityIcon,
  StarIcon,
  AlertTriangleIcon,
  DownloadIcon
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  username: string
  avatar?: string
  location: string
  joinDate: Date
  lastActive: Date
  status: 'active' | 'inactive' | 'banned' | 'pending'
  role: 'user' | 'moderator' | 'admin'
  totalPrayers: number
  totalPosts: number
  totalBookmarks: number
  isVerified: boolean
  preferences: {
    language: string
    timezone: string
    notifications: boolean
  }
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmad Hassan',
    email: 'ahmad.hassan@email.com',
    username: 'ahmad_hassan',
    location: 'New York, USA',
    joinDate: new Date('2023-01-15'),
    lastActive: new Date('2024-01-20T10:30:00'),
    status: 'active',
    role: 'user',
    totalPrayers: 1245,
    totalPosts: 23,
    totalBookmarks: 67,
    isVerified: true,
    preferences: {
      language: 'English',
      timezone: 'America/New_York',
      notifications: true
    }
  },
  {
    id: '2',
    name: 'Fatima Al-Zahra',
    email: 'fatima.alzahra@email.com',
    username: 'fatima_z',
    location: 'London, UK',
    joinDate: new Date('2023-03-22'),
    lastActive: new Date('2024-01-20T09:45:00'),
    status: 'active',
    role: 'moderator',
    totalPrayers: 2341,
    totalPosts: 156,
    totalBookmarks: 234,
    isVerified: true,
    preferences: {
      language: 'English',
      timezone: 'Europe/London',
      notifications: true
    }
  },
  {
    id: '3',
    name: 'Omar Abdullah',
    email: 'omar.abdullah@email.com',
    username: 'omar_a',
    location: 'Toronto, Canada',
    joinDate: new Date('2023-06-10'),
    lastActive: new Date('2024-01-19T15:30:00'),
    status: 'inactive',
    role: 'user',
    totalPrayers: 567,
    totalPosts: 12,
    totalBookmarks: 45,
    isVerified: false,
    preferences: {
      language: 'English',
      timezone: 'America/Toronto',
      notifications: false
    }
  },
  {
    id: '4',
    name: 'Aisha Rahman',
    email: 'aisha.rahman@email.com',
    username: 'aisha_r',
    location: 'Sydney, Australia',
    joinDate: new Date('2023-02-28'),
    lastActive: new Date('2024-01-20T08:15:00'),
    status: 'active',
    role: 'user',
    totalPrayers: 1890,
    totalPosts: 89,
    totalBookmarks: 123,
    isVerified: true,
    preferences: {
      language: 'English',
      timezone: 'Australia/Sydney',
      notifications: true
    }
  },
  {
    id: '5',
    name: 'Yusuf Ibrahim',
    email: 'yusuf.ibrahim@email.com',
    username: 'yusuf_i',
    location: 'Dubai, UAE',
    joinDate: new Date('2023-04-05'),
    lastActive: new Date('2024-01-18T20:45:00'),
    status: 'banned',
    role: 'user',
    totalPrayers: 234,
    totalPosts: 5,
    totalBookmarks: 12,
    isVerified: false,
    preferences: {
      language: 'Arabic',
      timezone: 'Asia/Dubai',
      notifications: true
    }
  }
]

const statusOptions = ['All', 'Active', 'Inactive', 'Banned', 'Pending']
const roleOptions = ['All', 'User', 'Moderator', 'Admin']

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedRole, setSelectedRole] = useState('All')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserDetails, setShowUserDetails] = useState(false)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'All' || 
                         user.status === selectedStatus.toLowerCase()
    
    const matchesRole = selectedRole === 'All' || 
                       user.role === selectedRole.toLowerCase()
    
    return matchesSearch && matchesStatus && matchesRole
  })

  const updateUserStatus = (userId: string, newStatus: User['status']) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, status: newStatus }
          : user
      )
    )
  }

  const updateUserRole = (userId: string, newRole: User['role']) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, role: newRole }
          : user
      )
    )
  }

  const deleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'inactive':
        return 'text-yellow-600 bg-yellow-100'
      case 'banned':
        return 'text-red-600 bg-red-100'
      case 'pending':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-purple-600 bg-purple-100'
      case 'moderator':
        return 'text-blue-600 bg-blue-100'
      case 'user':
        return 'text-gray-600 bg-gray-100'
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
            <h1 className="text-3xl font-bold text-primary">User Management</h1>
            <p className="text-muted-foreground">Manage users, roles, and permissions</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export Users
            </Button>
            <Button variant="islamic">
              <UsersIcon className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-primary">{users.length}</p>
                </div>
                <UsersIcon className="h-8 w-8 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-3xl font-bold text-green-600">
                    {users.filter(u => u.status === 'active').length}
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
                  <p className="text-sm font-medium text-muted-foreground">Moderators</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {users.filter(u => u.role === 'moderator').length}
                  </p>
                </div>
                <StarIcon className="h-8 w-8 text-blue-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Banned Users</p>
                  <p className="text-3xl font-bold text-red-600">
                    {users.filter(u => u.status === 'banned').length}
                  </p>
                </div>
                <BanIcon className="h-8 w-8 text-red-500/20" />
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
                  placeholder="Search users by name, email, username, or location..."
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
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="p-2 border border-input rounded-lg"
                  >
                    {roleOptions.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border border-input rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <UsersIcon className="h-6 w-6 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{user.name}</h3>
                        {user.isVerified && (
                          <CheckCircleIcon className="h-4 w-4 text-blue-500" />
                        )}
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{user.email}</span>
                        <span>•</span>
                        <span>@{user.username}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="h-3 w-3" />
                          <span>{user.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          <span>Joined {formatDate(user.joinDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ActivityIcon className="h-3 w-3" />
                          <span>Last active {formatTimeAgo(user.lastActive)}</span>
                        </div>
                        <span>{user.totalPrayers} prayers</span>
                        <span>{user.totalPosts} posts</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user)
                        setShowUserDetails(true)
                      }}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user)
                        setShowUserDetails(true)
                      }}
                    >
                      <EditIcon className="h-4 w-4" />
                    </Button>
                    
                    {user.status === 'active' ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateUserStatus(user.id, 'banned')}
                        className="text-red-500 hover:text-red-700"
                      >
                        <BanIcon className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateUserStatus(user.id, 'active')}
                        className="text-green-500 hover:text-green-700"
                      >
                        <CheckCircleIcon className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteUser(user.id)}
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

        {/* User Details Modal */}
        {showUserDetails && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Details</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowUserDetails(false)}
                  >
                    <XCircleIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h4 className="font-semibold mb-3">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Name</label>
                        <p className="text-sm">{selectedUser.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p className="text-sm">{selectedUser.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Username</label>
                        <p className="text-sm">@{selectedUser.username}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Location</label>
                        <p className="text-sm">{selectedUser.location}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedUser.status)}`}>
                          {selectedUser.status}
                        </span>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Role</label>
                        <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(selectedUser.role)}`}>
                          {selectedUser.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Activity Stats */}
                  <div>
                    <h4 className="font-semibold mb-3">Activity Statistics</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <p className="text-2xl font-bold text-primary">{selectedUser.totalPrayers}</p>
                        <p className="text-sm text-muted-foreground">Prayers</p>
                      </div>
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <p className="text-2xl font-bold text-primary">{selectedUser.totalPosts}</p>
                        <p className="text-sm text-muted-foreground">Posts</p>
                      </div>
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <p className="text-2xl font-bold text-primary">{selectedUser.totalBookmarks}</p>
                        <p className="text-sm text-muted-foreground">Bookmarks</p>
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div>
                    <h4 className="font-semibold mb-3">Preferences</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Language</label>
                        <p className="text-sm">{selectedUser.preferences.language}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Timezone</label>
                        <p className="text-sm">{selectedUser.preferences.timezone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Notifications</label>
                        <p className="text-sm">{selectedUser.preferences.notifications ? 'Enabled' : 'Disabled'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setShowUserDetails(false)}
                    >
                      Close
                    </Button>
                    <Button
                      variant="islamic"
                      onClick={() => {
                        // Handle edit user
                        setShowUserDetails(false)
                      }}
                    >
                      Edit User
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
