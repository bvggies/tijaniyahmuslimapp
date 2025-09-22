import React from 'react'
import Link from 'next/link'
import { 
  HeartIcon, 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon,
  FacebookIcon,
  TwitterIcon,
  YoutubeIcon,
  InstagramIcon
} from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-3 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* App Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500">
                <span className="text-lg font-bold text-gold-950">🕌</span>
              </div>
              <span className="font-display text-xl font-bold">
                Tijaniyah Muslim App
              </span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Your comprehensive Islamic companion for prayer, reflection, and spiritual growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <YoutubeIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/prayer-times" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Prayer Times
                </Link>
              </li>
              <li>
                <Link href="/qibla" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Qibla Compass
                </Link>
              </li>
              <li>
                <Link href="/quran" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Quran Reader
                </Link>
              </li>
              <li>
                <Link href="/duas" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Duas & Supplications
                </Link>
              </li>
              <li>
                <Link href="/tasbih" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Digital Tasbih
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/wazifa" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Wazifa
                </Link>
              </li>
              <li>
                <Link href="/lazim" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Lazim Tracker
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Islamic Journal
                </Link>
              </li>
              <li>
                <Link href="/scholars" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Scholars
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MailIcon className="h-4 w-4 text-gold-400" />
                <span className="text-sm text-primary-foreground/80">
                  info@tijaniyahmuslimapp.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-4 w-4 text-gold-400" />
                <span className="text-sm text-primary-foreground/80">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-4 w-4 text-gold-400" />
                <span className="text-sm text-primary-foreground/80">
                  Global Islamic Community
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-primary-foreground/60">
              © 2024 Tijaniyah Muslim App. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-sm text-primary-foreground/60">
              <span>Made with</span>
              <HeartIcon className="h-4 w-4 text-red-400" />
              <span>for the Muslim community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
