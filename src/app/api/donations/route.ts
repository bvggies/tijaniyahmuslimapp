import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for donations (in production, use a database)
let donations: any[] = [
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
    return NextResponse.json({
      success: true,
      data: donations
    })
  } catch (error) {
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
    
    const newDonation = {
      id: Date.now().toString(),
      donorName: body.donorName,
      donorEmail: body.donorEmail,
      donorPhone: body.donorPhone || '',
      amount: parseFloat(body.amount),
      currency: 'GHS',
      message: body.message || '',
      receiptUrl: body.receiptUrl || '/receipts/default.pdf',
      status: 'pending',
      submittedAt: new Date().toISOString()
    }
    
    donations.push(newDonation)
    
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
    
    const donationIndex = donations.findIndex(d => d.id === id)
    if (donationIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Donation not found' },
        { status: 404 }
      )
    }
    
    donations[donationIndex] = {
      ...donations[donationIndex],
      status,
      verifiedAt: new Date().toISOString(),
      verifiedBy: verifiedBy || 'admin'
    }
    
    return NextResponse.json({
      success: true,
      data: donations[donationIndex],
      message: 'Donation status updated successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update donation' },
      { status: 500 }
    )
  }
}
