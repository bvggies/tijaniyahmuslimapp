import { NextResponse } from 'next/server'

export async function GET() {
  const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY
  
  return NextResponse.json({
    googleMapsKey: googleMapsKey ? `${googleMapsKey.substring(0, 10)}...` : 'Not set',
    openaiKey: openaiKey ? `${openaiKey.substring(0, 10)}...` : 'Not set',
    hasGoogleMaps: !!googleMapsKey,
    hasOpenAI: !!openaiKey
  })
}
