import fs from 'fs'
import path from 'path'

// File path for storing user data
const USERS_FILE = path.join(process.cwd(), 'data', 'users.json')

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read users from file
export const readUsers = (): any[] => {
  try {
    ensureDataDir()
    if (!fs.existsSync(USERS_FILE)) {
      // Initialize with demo users if file doesn't exist
      const demoUsers = [
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
      writeUsers(demoUsers)
      return demoUsers
    }
    
    const data = fs.readFileSync(USERS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading users:', error)
    return []
  }
}

// Write users to file
export const writeUsers = (users: any[]): void => {
  try {
    ensureDataDir()
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Error writing users:', error)
  }
}

// Add a new user
export const addUser = (user: any): any => {
  const users = readUsers()
  const newUser = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    isVerified: false,
    preferences: {
      language: 'English',
      timezone: 'UTC',
      notifications: true
    }
  }
  users.push(newUser)
  writeUsers(users)
  return newUser
}

// Find user by email
export const findUserByEmail = (email: string): any => {
  const users = readUsers()
  return users.find(user => user.email === email)
}

// Update user
export const updateUser = (id: string, updates: any): any => {
  const users = readUsers()
  const userIndex = users.findIndex(user => user.id === id)
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updates, updatedAt: new Date().toISOString() }
    writeUsers(users)
    return users[userIndex]
  }
  return null
}
