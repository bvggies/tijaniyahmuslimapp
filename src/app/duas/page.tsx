'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  HeartIcon, 
  SearchIcon,
  BookOpenIcon,
  StarIcon,
  CopyIcon,
  ShareIcon,
  BookmarkIcon,
  FilterIcon,
  ChevronDownIcon
} from 'lucide-react'

interface Dua {
  id: string
  title: string
  arabic: string
  transliteration: string
  translation: string
  category: string
  reference?: string
  isFavorite?: boolean
}

const duas: Dua[] = [
  {
    id: '1',
    title: 'Dua for Starting the Day',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: 'Asbahna wa asbahal mulku lillah, walhamdulillah, la ilaha illallah wahdahu la sharika lah',
    translation: 'We have entered the morning and the kingdom belongs to Allah, and all praise is due to Allah. There is no deity but Allah alone, without any partner.',
    category: 'Morning',
    reference: 'Muslim'
  },
  {
    id: '2',
    title: 'Dua for Protection',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    transliteration: 'A\'udhu bi kalimatillahit tammati min sharri ma khalaq',
    translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
    category: 'Protection',
    reference: 'Muslim'
  },
  {
    id: '3',
    title: 'Dua for Forgiveness',
    arabic: 'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ',
    transliteration: 'Rabbighfir li wa tub \'alayya innaka antat tawwabur raheem',
    translation: 'My Lord, forgive me and accept my repentance, for You are the Accepter of Repentance, the Most Merciful.',
    category: 'Forgiveness',
    reference: 'Tirmidhi'
  },
  {
    id: '4',
    title: 'Dua for Guidance',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: 'Rabbana atina fid dunya hasanatan wa fil akhirati hasanatan wa qina \'adhaban nar',
    translation: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',
    category: 'Guidance',
    reference: 'Quran 2:201'
  },
  {
    id: '5',
    title: 'Dua for Patience',
    arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    transliteration: 'Rabbana afrigh \'alayna sabran wa thabbit aqdamana wansurna \'alal qawmil kafirin',
    translation: 'Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.',
    category: 'Patience',
    reference: 'Quran 2:250'
  },
  {
    id: '6',
    title: 'Dua for Knowledge',
    arabic: 'رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا',
    transliteration: 'Rabbi zidni \'ilman warzuqni fahman',
    translation: 'My Lord, increase me in knowledge and grant me understanding.',
    category: 'Knowledge',
    reference: 'Tirmidhi'
  },
  {
    id: '7',
    title: 'Dua for Health',
    arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي',
    transliteration: 'Allahumma \'afini fi badani, Allahumma \'afini fi sam\'i, Allahumma \'afini fi basari',
    translation: 'O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight.',
    category: 'Health',
    reference: 'Tirmidhi'
  },
  {
    id: '8',
    title: 'Dua for Family',
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    transliteration: 'Rabbana hab lana min azwajina wa dhurriyyatina qurrata a\'yunin waj\'alna lil muttaqina imama',
    translation: 'Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.',
    category: 'Family',
    reference: 'Quran 25:74'
  },
  {
    id: '9',
    title: 'Dua for Travel',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    transliteration: 'Subhanalladhi sakhkhara lana hadha wa ma kunna lahu muqrinin wa inna ila rabbina lamunqalibun',
    translation: 'Glory to Him who has subjected this to us, and we could not have done it by ourselves. And indeed, to our Lord we will return.',
    category: 'Travel',
    reference: 'Quran 43:13'
  },
  {
    id: '10',
    title: 'Dua for Sleep',
    arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
    transliteration: 'Bismika rabbi wada\'tu janbi wa bika arfa\'uhu, fa in amsakta nafsi farhamha, wa in arsaltaha fahfazha bima tahfazu bihi \'ibadakas salihin',
    translation: 'In Your name, my Lord, I lie down and in Your name I rise. If You should take my soul then have mercy upon it, and if You should return my soul then protect it in the manner You do so with Your righteous servants.',
    category: 'Sleep',
    reference: 'Bukhari'
  }
]

const categories = [
  'All',
  'Morning',
  'Evening',
  'Protection',
  'Forgiveness',
  'Guidance',
  'Patience',
  'Knowledge',
  'Health',
  'Family',
  'Travel',
  'Sleep'
]

export default function DuasPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [favorites, setFavorites] = useState<string[]>([])
  const [copiedDua, setCopiedDua] = useState<string | null>(null)

  const filteredDuas = duas.filter(dua => {
    const matchesSearch = dua.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dua.arabic.includes(searchTerm) ||
                         dua.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dua.translation.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'All' || dua.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (duaId: string) => {
    setFavorites(prev => 
      prev.includes(duaId) 
        ? prev.filter(id => id !== duaId)
        : [...prev, duaId]
    )
  }

  const copyToClipboard = async (text: string, duaId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedDua(duaId)
      setTimeout(() => setCopiedDua(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4">
            Duas & Supplications
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive collection of Islamic prayers and supplications for every occasion
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SearchIcon className="h-6 w-6" />
                Search & Filter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search duas by title, Arabic, transliteration, or translation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "islamic" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Duas Grid */}
        <div className="space-y-6">
          {filteredDuas.length === 0 ? (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="text-center py-12">
                <BookOpenIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  No duas found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or category filter
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredDuas.map((dua) => (
              <Card key={dua.id} className="max-w-4xl mx-auto">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{dua.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
                          {dua.category}
                        </span>
                        {dua.reference && (
                          <span className="px-2 py-1 bg-gold-500/10 text-gold-600 text-sm rounded-full">
                            {dua.reference}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(dua.id)}
                      >
                        <BookmarkIcon 
                          className={`h-4 w-4 ${
                            favorites.includes(dua.id) 
                              ? 'fill-primary text-primary' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Arabic Text */}
                    <div className="text-right">
                      <div className="text-2xl font-arabic leading-relaxed text-primary">
                        {dua.arabic}
                      </div>
                    </div>

                    {/* Transliteration */}
                    <div className="text-center">
                      <div className="text-lg text-muted-foreground italic">
                        {dua.transliteration}
                      </div>
                    </div>

                    {/* Translation */}
                    <div className="text-center">
                      <div className="text-lg text-foreground">
                        {dua.translation}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-2 pt-4 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(dua.arabic, dua.id)}
                      >
                        <CopyIcon className="h-4 w-4 mr-2" />
                        {copiedDua === dua.id ? 'Copied!' : 'Copy Arabic'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(dua.translation, dua.id)}
                      >
                        <CopyIcon className="h-4 w-4 mr-2" />
                        Copy Translation
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(`${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation}`, dua.id)}
                      >
                        <ShareIcon className="h-4 w-4 mr-2" />
                        Share All
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="mt-12">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StarIcon className="h-6 w-6 text-gold-500" />
                  Your Favorites ({favorites.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favorites.map(duaId => {
                    const dua = duas.find(d => d.id === duaId)
                    if (!dua) return null
                    
                    return (
                      <Card key={duaId} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-sm">{dua.title}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(duaId)}
                          >
                            <BookmarkIcon className="h-4 w-4 fill-primary text-primary" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {dua.translation}
                        </p>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
