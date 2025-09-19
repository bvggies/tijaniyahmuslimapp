'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IslamicDate {
  hijri: {
    day: number
    month: number
    year: number
    monthName: string
    monthNameEn: string
    dayName: string
    dayNameEn: string
  }
  gregorian: {
    day: number
    month: number
    year: number
    monthName: string
    dayName: string
  }
}

const hijriMonths = [
  { arabic: 'محرم', english: 'Muharram' },
  { arabic: 'صفر', english: 'Safar' },
  { arabic: 'ربيع الأول', english: 'Rabi\' al-awwal' },
  { arabic: 'ربيع الثاني', english: 'Rabi\' al-thani' },
  { arabic: 'جمادى الأولى', english: 'Jumada al-awwal' },
  { arabic: 'جمادى الثانية', english: 'Jumada al-thani' },
  { arabic: 'رجب', english: 'Rajab' },
  { arabic: 'شعبان', english: 'Sha\'ban' },
  { arabic: 'رمضان', english: 'Ramadan' },
  { arabic: 'شوال', english: 'Shawwal' },
  { arabic: 'ذو القعدة', english: 'Dhu al-Qi\'dah' },
  { arabic: 'ذو الحجة', english: 'Dhu al-Hijjah' }
]

const hijriDays = [
  { arabic: 'الأحد', english: 'Sunday' },
  { arabic: 'الاثنين', english: 'Monday' },
  { arabic: 'الثلاثاء', english: 'Tuesday' },
  { arabic: 'الأربعاء', english: 'Wednesday' },
  { arabic: 'الخميس', english: 'Thursday' },
  { arabic: 'الجمعة', english: 'Friday' },
  { arabic: 'السبت', english: 'Saturday' }
]

export function IslamicCalendar() {
  const [currentDate, setCurrentDate] = useState<IslamicDate | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to get Islamic date
    const fetchIslamicDate = async () => {
      try {
        // Mock Islamic date calculation
        const today = new Date()
        const hijriYear = 1446 // Approximate current Hijri year
        const hijriMonth = Math.floor(Math.random() * 12) + 1
        const hijriDay = Math.floor(Math.random() * 30) + 1
        
        const monthInfo = hijriMonths[hijriMonth - 1]
        const dayOfWeek = today.getDay()
        const dayInfo = hijriDays[dayOfWeek]

        const islamicDate: IslamicDate = {
          hijri: {
            day: hijriDay,
            month: hijriMonth,
            year: hijriYear,
            monthName: monthInfo.arabic,
            monthNameEn: monthInfo.english,
            dayName: dayInfo.arabic,
            dayNameEn: dayInfo.english
          },
          gregorian: {
            day: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear(),
            monthName: today.toLocaleDateString('en', { month: 'long' }),
            dayName: today.toLocaleDateString('en', { weekday: 'long' })
          }
        }

        setCurrentDate(islamicDate)
      } catch (error) {
        console.error('Error fetching Islamic date:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchIslamicDate()
  }, [])

  if (isLoading) {
    return (
      <Card className="muslim-card-enhanced">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!currentDate) {
    return null
  }

  return (
    <Card className="muslim-card-enhanced">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary text-lg">
          <CalendarIcon className="h-5 w-5" />
          Islamic Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {/* Single Row with 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1: Arabic Date */}
          <div className="text-center border-r border-border pr-4">
            <h4 className="font-semibold text-sm text-primary mb-2">Arabic Date</h4>
            <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
              {currentDate.hijri.day}
            </div>
            <div className="text-sm sm:text-base text-muted-foreground">
              {currentDate.hijri.monthName}
            </div>
            <div className="text-base sm:text-lg font-bold text-secondary mt-1">
              {currentDate.hijri.year} هـ
            </div>
          </div>

          {/* Column 2: English Date */}
          <div className="text-center border-r border-border pr-4">
            <h4 className="font-semibold text-sm text-primary mb-2">English Date</h4>
            <div className="text-base font-bold text-primary mb-1">
              {currentDate.gregorian.day} {currentDate.gregorian.monthName}
            </div>
            <div className="text-sm font-bold text-primary mb-1">
              {currentDate.gregorian.year}
            </div>
            <div className="text-xs text-muted-foreground">
              {currentDate.hijri.dayName} / {currentDate.hijri.dayNameEn}
            </div>
          </div>

          {/* Column 3: Special Months & Events */}
          <div className="text-center">
            <h4 className="font-semibold text-sm text-primary mb-2">Special Months & Events</h4>
            <div className="space-y-1">
              <div className="flex flex-wrap gap-1 justify-center text-xs">
                <div className={cn(
                  "px-2 py-1 rounded-full text-center",
                  currentDate.hijri.month === 9 ? "bg-primary/20 text-primary border border-primary/30" : "bg-muted/50"
                )}>
                  <span className="text-xs">رمضان</span>
                </div>
                <div className={cn(
                  "px-2 py-1 rounded-full text-center",
                  currentDate.hijri.month === 12 ? "bg-primary/20 text-primary border border-primary/30" : "bg-muted/50"
                )}>
                  <span className="text-xs">ذو الحجة</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 justify-center text-xs mt-1">
                <div className="px-2 py-1 bg-muted/30 rounded-full">
                  <span className="text-xs">Laylat al-Qadr</span>
                </div>
                <div className="px-2 py-1 bg-muted/30 rounded-full">
                  <span className="text-xs">Eid al-Fitr</span>
                </div>
                <div className="px-2 py-1 bg-muted/30 rounded-full">
                  <span className="text-xs">Hajj</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
