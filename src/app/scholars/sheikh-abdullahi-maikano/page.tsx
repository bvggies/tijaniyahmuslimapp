'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  BookOpenIcon,
  HeartIcon,
  StarIcon,
  ArrowLeftIcon,
  ExternalLinkIcon,
  AwardIcon,
  GlobeIcon,
  ClockIcon,
  GraduationCapIcon,
  SparklesIcon,
  QuoteIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SheikhAbdullahiMaikanoPage() {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)

  // Load favorite status from localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('scholar-favorites') || '[]')
    setIsFavorite(favorites.includes('6'))
  }, [])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('scholar-favorites') || '[]')
    const newFavorites = favorites.includes('6')
      ? favorites.filter((id: string) => id !== '6')
      : [...favorites, '6']
    
    localStorage.setItem('scholar-favorites', JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
  }

  const timelineEvents = [
    {
      year: '1926',
      title: 'Birth',
      description: 'Born on July 16th in Aborso-Ghana',
      icon: '👶'
    },
    {
      year: '1946',
      title: 'Spreading Tijaniyya',
      description: 'Started spreading the wings of Tariqatu Tijaniyya in Ghana',
      icon: '🕌'
    },
    {
      year: '1948',
      title: 'First Visit to Kaolack',
      description: 'Visited Maulana Sheikh Ibrahim Niasse (RA) in Kaolack with the "Big Nine"',
      icon: '✈️'
    },
    {
      year: '2005',
      title: 'Passing',
      description: 'Passed away on September 12th in Aborso-Ghana (Aged 77)',
      icon: '🕊️'
    }
  ]

  const children = [
    'Sheikh Ahmad Abdul Faide (Khalifa)',
    'Sheikh Muhammad Nasurullah',
    'Sheikh Aliu Kalaamullah',
    'Sheikh Ibrahim Niasse',
    'Sheikh Ahmad Tijani',
    'Sheikh Ridwaanullah',
    'Sheikh Muhammad Amaanullah',
    'Sayyada Naamau',
    'Sayyada Ayaa',
    'Sayyada Maryam',
    'Sayyada Hikimatullah',
    'Sayyada Najat',
    'Sayyada Rukayya',
    'Sayyada Nadratu'
  ]

  const bigNine = [
    'Sheikh Abdullahi Ahmad Maikano Prang',
    'Imam Muhammad Chiroma Kumasi',
    'Sheikh Haruna Kumasi',
    'Mallam Muhammad Maysona Salaga',
    'Mallam Yusif Laa Kumasi',
    'Imam Gariba Hakim Kumasi',
    'Mallam Rabi\'u Kumasi',
    'Mallam Baba Waziri Kumasi',
    'Mallam Awudun-Kaaka Kumasi'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Scholars
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
              <img
                src="https://drive.google.com/uc?export=view&id=1XBGxf5ypoABMNk2-fX07UVsJeTMXsUve"
                alt="Sheikh Alhaji Abdullahi Ahmad Maikano (R.A)"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <StarIcon className="h-4 w-4 text-white fill-current" />
            </div>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4">
            Sheikh Alhaji Abdullahi Ahmad Maikano
          </h1>
          <p className="text-2xl text-secondary font-semibold mb-2">
            Baba Jalloo (R.A)
          </p>
          <p className="text-xl text-muted-foreground mb-6">
            Tijaniyya Scholar and Khalifa • 1926 - 2005
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant={isFavorite ? "default" : "outline"}
              onClick={toggleFavorite}
              className="flex items-center gap-2"
            >
              <HeartIcon className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Favorited' : 'Add to Favorites'}
            </Button>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <StarIcon className="h-4 w-4 mr-1" />
              5.0 Rating
            </Badge>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Biography */}
          <div className="lg:col-span-2 space-y-8">
            {/* Introduction Card */}
            <Card className="border-primary/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <BookOpenIcon className="h-6 w-6 text-primary" />
                  Biography
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Sheikh Alhaji Abdullahi Ahmad Maikano (Baba Jalloo) (R.A) is a true and faithful scholar whose interest lay mainly in prayers (solat, both obligatory and supererogatory), remembrance of Allah (Azkar), repentance and seeking for forgiveness from the Almighty Allah (istigfar), habitual reading of the Holy Quran, saying numerous "Durood" upon the holy Prophet Muhammad (S.A.W) and making research. All these habitual deeds are Quranic and traditionally prophetic.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Sheikh Alhaji Abdullahi Ahmad Maikano Baba Jalloo (RA), was born on the 16th of July, 1926, in Aborso-Ghana. He passed away on the 12th of September, 2005, in Aborso-Ghana. (Aged 77). He is well known in the Islamic Community Ghana, West Africa and elsewhere for his extreme bravery and dedication to Islam. He devoted his whole life in the service of Allah, preaching and calling people to the path of Allah (SWT).
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Family Background */}
            <Card className="border-secondary/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-secondary/5 to-accent/5">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <UsersIcon className="h-6 w-6 text-secondary" />
                  Family Background
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    He inherited all this from his parents and grandparents, who were immigrants from Futa Djallo. His father was Sheikh Ahmad Badawi (RA), and Sayyada Zainab being the name of his mother. His grandparents were Sheikh Abdul Mumin (RA) and Sayyada Amamatu (Naana Maulla).
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">Father</h4>
                      <p className="text-muted-foreground">Sheikh Ahmad Badawi (RA)</p>
                    </div>
                    <div className="bg-secondary/5 p-4 rounded-lg">
                      <h4 className="font-semibold text-secondary mb-2">Mother</h4>
                      <p className="text-muted-foreground">Sayyada Zainab</p>
                    </div>
                    <div className="bg-accent/5 p-4 rounded-lg">
                      <h4 className="font-semibold text-accent mb-2">Grandfather</h4>
                      <p className="text-muted-foreground">Sheikh Abdul Mumin (RA)</p>
                    </div>
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">Grandmother</h4>
                      <p className="text-muted-foreground">Sayyada Amamatu (Naana Maulla)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Children */}
            <Card className="border-accent/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-accent/5 to-primary/5">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <GraduationCapIcon className="h-6 w-6 text-accent" />
                  Children
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Maulana Abdullahi Maikano was a good and sincere family man with four wives. The following are some of the names of his children:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {children.map((child, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm font-medium">{child}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tijaniyya Work */}
            <Card className="border-primary/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <SparklesIcon className="h-6 w-6 text-primary" />
                  1946 - Spreading the Wings of Tariqatu Tijaniyya
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Sheikh Abdullahi Ahmad Maikano (RA) started spreading the wings of Tariqa Tijaniyya long before he visited Maulana Sheikh Ibrahim Niasse (RA) in Kaolack. Which means Sheikh Abdullahi Maikano (RA) knew, accepted, and believed in him even before Sheikhul Islam (RA) became widely recognized in Africa as a whole and Senegal in particular.
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Maulana Maikano (RA), suffered greatly for the establishment and spread of Tijaniyya in our various localities. Wherever you go in Africa or the world, the Tijaniyya Muslim Ummah there have records of the contributions that Sheikh Alhaji Abdullahi Ahmad Maikano (RA) made towards the establishment and spread of Tijaniyya in their localities.
                  </p>
                  
                  <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                    <p className="text-muted-foreground italic">
                      "Kumasi, Tamale and Yendi are some of the main cities in Ghana where Sheikh Alhaji Abdullahi Ahmad Maikano (RA) suffered greatly for the establishment, growth and spread of Tijanniyya."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* First Visit to Kaolack */}
            <Card className="border-secondary/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-secondary/5 to-accent/5">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <GlobeIcon className="h-6 w-6 text-secondary" />
                  1948 - The First Visit to Kaolack
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    The trip of Maulana Maikano (RA) to Kaolack was triggered after he read a book written by Sheikhul Islam. The book was entitled 'Kashiful Bars'. His father got him a copy of this book from Sheikh Muhammad Hadi. After reading the book, he stood up and said "I have no time to waste but to visit the author of this book."
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    The trip was sponsored by the grandfather of Sheikh Maikano, Alhaji Abdul Mumin and Alhaji Ababakar, a family member.
                  </p>
                  
                  <div className="bg-secondary/5 p-4 rounded-lg">
                    <h4 className="font-semibold text-secondary mb-3">The "Big Nine" Entourage</h4>
                    <p className="text-muted-foreground mb-3">The entourage who went to Kaolack to visit Maulana Sheikh Ibrahim Niasse (RA):</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {bigNine.map((member, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-background/50 rounded">
                          <span className="text-primary font-bold">{index + 1}.</span>
                          <span className="text-sm">{member}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-accent/5 p-4 rounded-lg mt-4 border-l-4 border-accent">
                    <p className="text-muted-foreground italic">
                      "After their return from Kaolack, Sheikh Alhaji Abdullahi Ahmad Maikano (RA) and his entourage testified to Ghanaian Muslim Community that Sheikh Ibrahim Niasse (RA) was truly the Khalipha of Sheikh Ahmad Tijani (RA)."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Timeline and Info */}
          <div className="space-y-6">
            {/* Timeline */}
            <Card className="border-primary/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-primary" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                        {event.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-primary">{event.year}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="font-medium">{event.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Information */}
            <Card className="border-secondary/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-secondary/5 to-accent/5">
                <CardTitle className="flex items-center gap-2">
                  <AwardIcon className="h-5 w-5 text-secondary" />
                  Key Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Born</p>
                    <p className="text-xs text-muted-foreground">July 16, 1926</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Passed Away</p>
                    <p className="text-xs text-muted-foreground">September 12, 2005 (Aged 77)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-xs text-muted-foreground">Aborso-Ghana</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Family</p>
                    <p className="text-xs text-muted-foreground">4 wives, 14+ children</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specializations */}
            <Card className="border-accent/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-accent/5 to-primary/5">
                <CardTitle className="flex items-center gap-2">
                  <BookOpenIcon className="h-5 w-5 text-accent" />
                  Specializations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {['Tijaniyya Tariqa', 'Prayer', 'Dhikr', 'Quran', 'Spirituality', 'Tasawwuf'].map((spec, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quote */}
            <Card className="border-primary/20 shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-6">
                <QuoteIcon className="h-8 w-8 text-primary/50 mb-4" />
                <blockquote className="text-lg italic text-muted-foreground leading-relaxed">
                  "I have no time to waste but to visit the author of this book."
                </blockquote>
                <cite className="text-sm text-primary font-medium mt-2 block">
                  — After reading 'Kashiful Bars' by Sheikhul Islam
                </cite>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
