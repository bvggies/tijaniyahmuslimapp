import { NextRequest, NextResponse } from 'next/server'
import { findUserByEmail } from '@/lib/storage'

// POST - User login
export async function POST(request: NextRequest) {
  try {
    console.log('Login API called - POST request')
    const body = await request.json()
    const { email, password } = body
    console.log('Login attempt for:', email)
    
    if (!email || !password) {
      console.log('Missing email or password')
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }
    
    // Find user by email
    const user = findUserByEmail(email)
    console.log('User found:', user ? 'Yes' : 'No')
    
    if (!user || user.password !== password) {
      console.log('Invalid credentials')
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user
    console.log('Login successful for:', user.email)
    
    return NextResponse.json({
      success: true,
      data: {
        ...userWithoutPassword,
        lastLogin: new Date().toISOString()
      },
      message: 'Login successful'
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    )
  }
}
