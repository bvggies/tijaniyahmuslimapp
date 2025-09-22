import { NextRequest, NextResponse } from 'next/server'
import { readDonations, addDonation, updateDonation } from '@/lib/donations-storage'

// Mock donations for demo purposes
const mockDonations: any[] = [
  {
    id: '1',
    donorName: 'Ahmad Hassan',
    donorEmail: 'ahmad@example.com',
    donorPhone: '+233 24 123 4567',
    amount: 50,
    currency: 'GHS',
    message: 'May Allah bless this app and its developers',
    receiptUrl: '/receipts/donation-1.pdf',
    status: 'verified',
    submittedAt: '2024-01-20T10:30:00Z',
    verifiedAt: '2024-01-20T11:15:00Z',
    verifiedBy: 'admin'
  },
  {
    id: '2',
    donorName: 'Fatima Al-Zahra',
    donorEmail: 'fatima@example.com',
    donorPhone: '+233 55 987 6543',
    amount: 25,
    currency: 'GHS',
    receiptUrl: '/receipts/donation-2.jpg',
    status: 'pending',
    submittedAt: '2024-01-21T14:20:00Z'
  }
]

// GET - Fetch all donations
export async function GET() {
  try {
    const donations = readDonations()
    // If no donations exist, return mock data
    const data = donations.length > 0 ? donations : mockDonations
    return NextResponse.json({
      success: true,
      data: data
    })
  } catch (error) {
    console.error('Error fetching donations:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch donations' },
      { status: 500 }
    )
  }
}

// POST - Create new donation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newDonation = addDonation({
      donorName: body.donorName,
      donorEmail: body.donorEmail,
      donorPhone: body.donorPhone || '',
      amount: parseFloat(body.amount),
      currency: 'GHS',
      message: body.message || '',
      receiptUrl: body.receiptUrl || '/receipts/default.pdf'
    })
    
    return NextResponse.json({
      success: true,
      data: newDonation,
      message: 'Donation submitted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to submit donation' },
      { status: 500 }
    )
  }
}

// PUT - Update donation status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, verifiedBy } = body
    
    const updatedDonation = updateDonation(id, {
      status,
      verifiedBy: verifiedBy || 'admin'
    })
    
    if (!updatedDonation) {
      return NextResponse.json(
        { success: false, error: 'Donation not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: updatedDonation,
      message: 'Donation status updated successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update donation' },
      { status: 500 }
    )
  }
}
