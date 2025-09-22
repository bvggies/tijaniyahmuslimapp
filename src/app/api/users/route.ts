import { NextRequest, NextResponse } from 'next/server'
import { readUsers, addUser, findUserByEmail, updateUser } from '@/lib/storage'

// GET - Fetch all users
export async function GET() {
  try {
    console.log('Users API called - GET request')
    const users = readUsers()
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
    const existingUser = findUserByEmail(body.email)
    
    if (existingUser) {
      console.log('User already exists:', existingUser.email)
      return NextResponse.json(
        { success: false, error: 'User with this email or username already exists' },
        { status: 400 }
      )
    }
    
    const newUser = addUser({
      name: body.name,
      email: body.email,
      username: body.username,
      password: body.password, // In production, hash this password
      role: 'user'
    })
    
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
    
    const updatedUser = updateUser(id, updateData)
    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    )
  }
}
