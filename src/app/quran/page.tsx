'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpenIcon,
  SearchIcon,
  FilterIcon,
  PlayIcon,
  PauseIcon,
  Volume2Icon,
  VolumeXIcon,
  BookmarkIcon,
  ShareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ListIcon,
  GridIcon,
  MoonIcon,
  SunIcon,
  HeartIcon,
  StarIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Ayah {
  number: number
  text: string
  translation: string
  transliteration: string
}

interface Surah {
  number: number
  name: string
  englishName: string
  arabicName: string
  revelationType: 'Meccan' | 'Medinan'
  numberOfAyahs: number
  ayahs: Ayah[]
  meaning: string
  description: string
}

// Sample Quran data - In a real app, this would come from an API
const quranData: Surah[] = [
  {
    number: 1,
    name: 'Al-Fatihah',
    englishName: 'The Opening',
    arabicName: 'الفاتحة',
    revelationType: 'Meccan',
    numberOfAyahs: 7,
    meaning: 'The Opening',
    description: 'The first chapter of the Quran, recited in every prayer.',
    ayahs: [
      {
        number: 1,
        text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        transliteration: 'Bismillahi ar-rahman ar-raheem'
      },
      {
        number: 2,
        text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        translation: 'All praise is due to Allah, Lord of all the worlds.',
        transliteration: 'Al-hamdu lillahi rabbi al-alameen'
      },
      {
        number: 3,
        text: 'الرَّحْمَٰنِ الرَّحِيمِ',
        translation: 'The Entirely Merciful, the Especially Merciful.',
        transliteration: 'Ar-rahman ar-raheem'
      },
      {
        number: 4,
        text: 'مَالِكِ يَوْمِ الدِّينِ',
        translation: 'Sovereign of the Day of Recompense.',
        transliteration: 'Maliki yawmi ad-deen'
      },
      {
        number: 5,
        text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        translation: 'It is You we worship and You we ask for help.',
        transliteration: 'Iyyaka na\'budu wa iyyaka nasta\'een'
      },
      {
        number: 6,
        text: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        translation: 'Guide us to the straight path.',
        transliteration: 'Ihdina as-sirata al-mustaqeem'
      },
      {
        number: 7,
        text: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        translation: 'The path of those upon whom You have bestowed favor, not of those who have evoked anger or of those who are astray.',
        transliteration: 'Sirata alladhina an\'amta \'alayhim ghayri al-maghdubi \'alayhim wa la ad-dalleen'
      }
    ]
  },
  {
    number: 2,
    name: 'Al-Baqarah',
    englishName: 'The Cow',
    arabicName: 'البقرة',
    revelationType: 'Medinan',
    numberOfAyahs: 286,
    meaning: 'The Cow',
    description: 'The longest chapter of the Quran, containing many important laws and guidance.',
    ayahs: [
      {
        number: 1,
        text: 'الم',
        translation: 'Alif, Lam, Meem.',
        transliteration: 'Alif Lam Meem'
      },
      {
        number: 2,
        text: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
        translation: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah.',
        transliteration: 'Thalika al-kitabu la rayba feehi hudan lil-muttaqeen'
      },
      {
        number: 3,
        text: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ',
        translation: 'Who believe in the unseen, establish prayer, and spend out of what We have provided for them.',
        transliteration: 'Alladhina yu\'minoona bil-ghaybi wa yuqeemoona as-salata wa mimma razaqnahum yunfiqoon'
      }
    ]
  },
  {
    number: 3,
    name: 'Ali Imran',
    englishName: 'Family of Imran',
    arabicName: 'آل عمران',
    revelationType: 'Medinan',
    numberOfAyahs: 200,
    meaning: 'Family of Imran',
    description: 'Discusses the family of Imran and the story of Maryam (Mary).',
    ayahs: [
      {
        number: 1,
        text: 'الم',
        translation: 'Alif, Lam, Meem.',
        transliteration: 'Alif Lam Meem'
      },
      {
        number: 2,
        text: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
        translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.',
        transliteration: 'Allahu la ilaha illa huwa al-hayyu al-qayyoom'
      }
    ]
  },
  {
    number: 4,
    name: 'An-Nisa',
    englishName: 'The Women',
    arabicName: 'النساء',
    revelationType: 'Medinan',
    numberOfAyahs: 176,
    meaning: 'The Women',
    description: 'Contains many laws regarding women, marriage, and inheritance.',
    ayahs: [
      {
        number: 1,
        text: 'يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَاءً ۚ وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ ۚ إِنَّ اللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا',
        translation: 'O mankind, fear your Lord, who created you from one soul and created from it its mate and dispersed from both of them many men and women. And fear Allah, through whom you ask one another, and the wombs. Indeed Allah is ever, over you, an Observer.',
        transliteration: 'Ya ayyuha an-nasu ittaqoo rabbakumu alladhi khalaqakum min nafsin wahidatin wa khalaqa minha zawjaha wa baththa minhuma rijalan katheeran wa nisa\'an wa ittaqoo allaha alladhi tasaa\'aloona bihi wal-arhama inna allaha kana \'alaykum raqeeba'
      }
    ]
  },
  {
    number: 5,
    name: 'Al-Maidah',
    englishName: 'The Table Spread',
    arabicName: 'المائدة',
    revelationType: 'Medinan',
    numberOfAyahs: 120,
    meaning: 'The Table Spread',
    description: 'Contains laws about food, drink, and social conduct.',
    ayahs: [
      {
        number: 1,
        text: 'يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ ۚ أُحِلَّتْ لَكُم بَهِيمَةُ الْأَنْعَامِ إِلَّا مَا يُتْلَىٰ عَلَيْكُمْ غَيْرَ مُحِلِّي الصَّيْدِ وَأَنتُمْ حُرُمٌ ۗ إِنَّ اللَّهَ يَحْكُمُ مَا يُرِيدُ',
        translation: 'O you who have believed, fulfill your contracts. Lawful for you are the animals of grazing livestock except for that which is recited to you - hunting not being permitted while you are in the state of ihram. Indeed, Allah ordains what He intends.',
        transliteration: 'Ya ayyuha alladhina amanoo awfoo bil-\'uqoodi uhillat lakum baheematu al-an\'ami illa ma yutla \'alaykum ghayra muhilli as-saydi wa antum hurumun inna allaha yahkumu ma yureed'
      }
    ]
  }
]

export default function QuranPage() {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'Meccan' | 'Medinan'>('all')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [bookmarkedSurahs, setBookmarkedSurahs] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAyah, setCurrentAyah] = useState(0)

  const filteredSurahs = quranData.filter(surah => {
    const matchesSearch = surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         surah.arabicName.includes(searchQuery) ||
                         surah.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || surah.revelationType === filterType
    return matchesSearch && matchesFilter
  })

  const toggleBookmark = (surahNumber: number) => {
    setBookmarkedSurahs(prev => 
      prev.includes(surahNumber) 
        ? prev.filter(num => num !== surahNumber)
        : [...prev, surahNumber]
    )
  }

  const playRecitation = (surah: Surah) => {
    setSelectedSurah(surah)
    setIsPlaying(true)
    setCurrentAyah(0)
  }

  const pauseRecitation = () => {
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
            <BookOpenIcon className="h-10 w-10" />
            The Holy Quran
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Read, listen, and reflect upon the words of Allah. The Quran contains 114 chapters (Surahs) revealed to Prophet Muhammad (peace be upon him).
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="muslim-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search Surahs by name or meaning..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterType === 'all' ? 'islamic' : 'outline'}
                  onClick={() => setFilterType('all')}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={filterType === 'Meccan' ? 'islamic' : 'outline'}
                  onClick={() => setFilterType('Meccan')}
                  size="sm"
                >
                  Meccan
                </Button>
                <Button
                  variant={filterType === 'Medinan' ? 'islamic' : 'outline'}
                  onClick={() => setFilterType('Medinan')}
                  size="sm"
                >
                  Medinan
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'list' ? 'islamic' : 'outline'}
                  onClick={() => setViewMode('list')}
                  size="sm"
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'islamic' : 'outline'}
                  onClick={() => setViewMode('grid')}
                  size="sm"
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Surahs List */}
        <div className={cn(
          "grid gap-4 mb-8",
          viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}>
          {filteredSurahs.map((surah) => (
            <Card key={surah.number} className="muslim-card card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {surah.number}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{surah.englishName}</CardTitle>
                        <p className="text-sm text-muted-foreground">{surah.arabicName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={surah.revelationType === 'Meccan' ? 'default' : 'secondary'}>
                        {surah.revelationType}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {surah.numberOfAyahs} verses
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{surah.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmark(surah.number)}
                    className={cn(
                      "text-muted-foreground hover:text-yellow-500",
                      bookmarkedSurahs.includes(surah.number) && "text-yellow-500"
                    )}
                  >
                    <BookmarkIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex gap-2">
                  <Button
                    variant="islamic"
                    size="sm"
                    onClick={() => setSelectedSurah(surah)}
                    className="flex-1"
                  >
                    <BookOpenIcon className="h-4 w-4 mr-2" />
                    Read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => playRecitation(surah)}
                  >
                    <PlayIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <ShareIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Surah Modal */}
        {selectedSurah && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{selectedSurah.englishName}</CardTitle>
                    <p className="text-lg opacity-90">{selectedSurah.arabicName}</p>
                    <p className="text-sm opacity-75">
                      {selectedSurah.revelationType} • {selectedSurah.numberOfAyahs} verses
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedSurah(null)}
                    className="text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-6">
                  {selectedSurah.ayahs.map((ayah) => (
                    <div key={ayah.number} className="border-b border-border pb-4 last:border-b-0">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {ayah.number}
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="text-right text-2xl font-arabic leading-relaxed">
                            {ayah.text}
                          </div>
                          <div className="text-sm text-muted-foreground italic">
                            {ayah.transliteration}
                          </div>
                          <div className="text-foreground">
                            {ayah.translation}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Audio Player */}
        {isPlaying && selectedSurah && (
          <div className="fixed bottom-4 left-4 right-4 z-40">
            <Card className="muslim-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={pauseRecitation}
                  >
                    {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                  </Button>
                  <div className="flex-1">
                    <p className="font-medium">{selectedSurah.englishName}</p>
                    <p className="text-sm text-muted-foreground">
                      Ayah {currentAyah + 1} of {selectedSurah.ayahs.length}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPlaying(false)}
                  >
                    ✕
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}