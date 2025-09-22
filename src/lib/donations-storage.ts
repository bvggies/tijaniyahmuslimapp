import fs from 'fs'
import path from 'path'

// File path for storing donation data
const DONATIONS_FILE = path.join(process.cwd(), 'data', 'donations.json')

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read donations from file
export const readDonations = (): any[] => {
  try {
    ensureDataDir()
    if (!fs.existsSync(DONATIONS_FILE)) {
      // Initialize with empty array if file doesn't exist
      writeDonations([])
      return []
    }
    
    const data = fs.readFileSync(DONATIONS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading donations:', error)
    return []
  }
}

// Write donations to file
export const writeDonations = (donations: any[]): void => {
  try {
    ensureDataDir()
    fs.writeFileSync(DONATIONS_FILE, JSON.stringify(donations, null, 2))
  } catch (error) {
    console.error('Error writing donations:', error)
  }
}

// Add a new donation
export const addDonation = (donation: any): any => {
  const donations = readDonations()
  const newDonation = {
    ...donation,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: 'pending'
  }
  donations.push(newDonation)
  writeDonations(donations)
  return newDonation
}

// Update donation
export const updateDonation = (id: string, updates: any): any => {
  const donations = readDonations()
  const donationIndex = donations.findIndex(donation => donation.id === id)
  if (donationIndex !== -1) {
    donations[donationIndex] = { 
      ...donations[donationIndex], 
      ...updates,
      verifiedAt: updates.status !== 'pending' ? new Date().toISOString() : donations[donationIndex].verifiedAt
    }
    writeDonations(donations)
    return donations[donationIndex]
  }
  return null
}
