import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  let question = ''
  
  try {
    const body = await request.json()
    question = body.question || ''

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 })
    }

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY
    
    if (!apiKey) {
      // Fallback to enhanced mock responses if no API key
      return NextResponse.json({
        answer: await getEnhancedMockResponse(question),
        sources: ['Tijaniyah Muslim App Knowledge Base'],
        suggestions: getSuggestions(question)
      })
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are AI Noor, an Islamic AI assistant for the Tijaniyah Muslim App. You provide helpful, accurate, and respectful answers about Islam, Islamic practices, and general topics. Always maintain an Islamic perspective when relevant and be respectful of all faiths. Keep responses concise but informative, and suggest related Islamic topics when appropriate.`
          },
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    const answer = data.choices[0]?.message?.content || 'I apologize, but I could not generate a response at this time.'

    return NextResponse.json({
      answer,
      sources: ['AI Noor - Powered by OpenAI'],
      suggestions: getSuggestions(question)
    })

  } catch (error) {
    console.error('AI Noor API error:', error)
    
    // Fallback response
    return NextResponse.json({
      answer: await getEnhancedMockResponse(question || 'general question'),
      sources: ['Tijaniyah Muslim App Knowledge Base'],
      suggestions: getSuggestions(question || 'general question')
    })
  }
}

async function getEnhancedMockResponse(question: string): Promise<string> {
  const lowerQuestion = question.toLowerCase()
  
  // Enhanced Islamic responses
  if (lowerQuestion.includes('islam') || lowerQuestion.includes('muslim')) {
    return `Islam is a monotheistic religion founded in the 7th century CE by Prophet Muhammad (PBUH) in Arabia. It's based on the teachings of the Quran and the Sunnah (traditions of the Prophet). The five pillars of Islam are: Shahada (declaration of faith), Salah (prayer), Zakat (charity), Sawm (fasting during Ramadan), and Hajj (pilgrimage to Mecca). Islam emphasizes peace, justice, compassion, and submission to Allah (God).`
  }
  
  if (lowerQuestion.includes('quran') || lowerQuestion.includes('qur\'an')) {
    return `The Quran is the holy book of Islam, believed by Muslims to be the literal word of Allah as revealed to Prophet Muhammad (PBUH) through the Angel Gabriel over 23 years. It contains 114 chapters (Surahs) and over 6,000 verses covering guidance on faith, worship, morality, law, and daily life. The Quran is written in Arabic and is considered the final revelation from Allah.`
  }
  
  if (lowerQuestion.includes('prayer') || lowerQuestion.includes('salah')) {
    return `Salah (prayer) is one of the five pillars of Islam and is performed five times daily: Fajr (dawn), Dhuhr (midday), Asr (afternoon), Maghrib (sunset), and Isha (night). Each prayer consists of specific movements and recitations while facing the Qibla (direction of Mecca). Prayer serves as a direct connection between the believer and Allah, providing spiritual discipline and mindfulness.`
  }
  
  if (lowerQuestion.includes('ramadan') || lowerQuestion.includes('fasting')) {
    return `Ramadan is the ninth month of the Islamic lunar calendar, during which Muslims fast from dawn to sunset. Fasting (Sawm) is one of the five pillars of Islam and involves abstaining from food, drink, and other physical needs during daylight hours. It's a time for spiritual reflection, increased prayer, charity, and self-discipline.`
  }
  
  if (lowerQuestion.includes('hajj') || lowerQuestion.includes('pilgrimage')) {
    return `Hajj is the annual Islamic pilgrimage to Mecca, Saudi Arabia, and is one of the five pillars of Islam. Every able-bodied Muslim who can afford it is required to perform Hajj at least once in their lifetime. The pilgrimage takes place during the Islamic month of Dhu al-Hijjah and involves specific rituals performed over several days.`
  }
  
  if (lowerQuestion.includes('allah') || lowerQuestion.includes('god')) {
    return `Allah is the Arabic word for God in Islam. Muslims believe Allah is the one and only God, the creator and sustainer of the universe. Allah is described in the Quran as having 99 beautiful names (Asma al-Husna) that describe His attributes, such as Ar-Rahman (The Most Merciful) and Ar-Rahim (The Most Compassionate).`
  }
  
  // General knowledge responses
  if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi')) {
    return `Assalamu Alaikum! Welcome to AI Noor. I'm here to help you with questions about Islam, Islamic practices, and general topics. How can I assist you today?`
  }
  
  if (lowerQuestion.includes('thank') || lowerQuestion.includes('thanks')) {
    return `You're welcome! May Allah bless you. Feel free to ask me anything else about Islam or any other topic.`
  }
  
  // Default response for any question
  return `I understand you're asking about "${question}". While I can provide general information, for the most accurate and detailed answers about Islamic topics, I recommend consulting with knowledgeable scholars or Islamic resources. For general questions, I can offer basic guidance. Could you please be more specific about what you'd like to know?`
}

function getSuggestions(question: string): string[] {
  const lowerQuestion = question.toLowerCase()
  
  if (lowerQuestion.includes('islam') || lowerQuestion.includes('muslim')) {
    return ['What are the five pillars of Islam?', 'Tell me about Prophet Muhammad', 'What is the Quran?']
  }
  
  if (lowerQuestion.includes('prayer') || lowerQuestion.includes('salah')) {
    return ['How to perform wudu?', 'Prayer times', 'Qibla direction']
  }
  
  if (lowerQuestion.includes('quran')) {
    return ['Surah Al-Fatiha', 'Quran translations', 'How to memorize Quran']
  }
  
  return ['Prayer times', 'Qibla direction', 'Islamic calendar', 'Duas and supplications']
}
