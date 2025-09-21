import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for users (same as users API)
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

// POST - User login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body
    
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }
    
    // Find user by email
    const user = users.find(u => u.email === email)
    
    if (!user || user.password !== password) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user
    
    return NextResponse.json({
      success: true,
      data: {
        ...userWithoutPassword,
        lastLogin: new Date().toISOString()
      },
      message: 'Login successful'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    )
  }
}
