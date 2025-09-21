import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for users (in production, use a database)
let users: any[] = [
  // Demo users
  {
    id: '1',
    name: 'Ahmad Hassan',
    email: 'user@example.com',
    username: 'ahmad_hassan',
    password: 'user123',
    role: 'user',
    createdAt: '2024-01-01T00:00:00Z',
    isVerified: true,
    preferences: {
      language: 'English',
      timezone: 'UTC',
      notifications: true
    }
  },
  {
    id: '2',
    name: 'Fatima Al-Zahra',
    email: 'fatima@example.com',
    username: 'fatima_z',
    password: 'fatima123',
    role: 'user',
    createdAt: '2024-01-01T00:00:00Z',
    isVerified: true,
    preferences: {
      language: 'English',
      timezone: 'UTC',
      notifications: true
    }
  },
  {
    id: '3',
    name: 'Omar Abdullah',
    email: 'omar@example.com',
    username: 'omar_a',
    password: 'omar123',
    role: 'user',
    createdAt: '2024-01-01T00:00:00Z',
    isVerified: true,
    preferences: {
      language: 'English',
      timezone: 'UTC',
      notifications: true
    }
  },
  {
    id: '4',
    name: 'Aisha Rahman',
    email: 'aisha@example.com',
    username: 'aisha_r',
    password: 'aisha123',
    role: 'user',
    createdAt: '2024-01-01T00:00:00Z',
    isVerified: true,
    preferences: {
      language: 'English',
      timezone: 'UTC',
      notifications: true
    }
  },
  {
    id: '5',
    name: 'Yusuf Ibrahim',
    email: 'yusuf@example.com',
    username: 'yusuf_i',
    password: 'yusuf123',
    role: 'user',
    createdAt: '2024-01-01T00:00:00Z',
    isVerified: true,
    preferences: {
      language: 'English',
      timezone: 'UTC',
      notifications: true
    }
  }
]

// GET - Fetch all users
export async function GET() {
  try {
    console.log('Users API called - GET request')
    return NextResponse.json({
      success: true,
      data: users,
      message: 'Users fetched successfully'
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST - Create new user
export async function POST(request: NextRequest) {
  try {
    console.log('Users API called - POST request')
    const body = await request.json()
    console.log('Registration data:', body)
    
    // Check if user already exists
    const existingUser = users.find(user => 
      user.email === body.email || user.username === body.username
    )
    
    if (existingUser) {
      console.log('User already exists:', existingUser.email)
      return NextResponse.json(
        { success: false, error: 'User with this email or username already exists' },
        { status: 400 }
      )
    }
    
    const newUser = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      username: body.username,
      password: body.password, // In production, hash this password
      role: 'user',
      createdAt: new Date().toISOString(),
      isVerified: false,
      preferences: {
        language: 'English',
        timezone: 'UTC',
        notifications: true
      }
    }
    
    users.push(newUser)
    console.log('New user created:', newUser)
    
    return NextResponse.json({
      success: true,
      data: newUser,
      message: 'User registered successfully'
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to register user' },
      { status: 500 }
    )
  }
}

// PUT - Update user
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }
    
    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    
    return NextResponse.json({
      success: true,
      data: users[userIndex],
      message: 'User updated successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    )
  }
}
