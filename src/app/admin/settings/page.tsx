'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  SettingsIcon,
  SaveIcon,
  RefreshCwIcon,
  GlobeIcon,
  BellIcon,
  ShieldIcon,
  DatabaseIcon,
  MailIcon,
  KeyIcon,
  ServerIcon,
  UsersIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon
} from 'lucide-react'

interface SystemSettings {
  general: {
    appName: string
    appVersion: string
    defaultLanguage: string
    timezone: string
    maintenanceMode: boolean
    registrationEnabled: boolean
    emailVerificationRequired: boolean
  }
  prayer: {
    calculationMethod: string
    asrMethod: string
    highLatitudeMethod: string
    fajrAngle: number
    ishaAngle: number
    timezone: string
    dstEnabled: boolean
  }
  email: {
    smtpHost: string
    smtpPort: number
    smtpUsername: string
    smtpPassword: string
    fromEmail: string
    fromName: string
    enabled: boolean
  }
  security: {
    sessionTimeout: number
    maxLoginAttempts: number
    passwordMinLength: number
    requireStrongPassword: boolean
    twoFactorEnabled: boolean
    ipWhitelist: string[]
  }
  notifications: {
    emailNotifications: boolean
    pushNotifications: boolean
    prayerReminders: boolean
    communityUpdates: boolean
    systemAlerts: boolean
  }
  backup: {
    autoBackup: boolean
    backupFrequency: string
    retentionDays: number
    cloudBackup: boolean
    lastBackup: string
  }
}

const defaultSettings: SystemSettings = {
  general: {
    appName: 'Tijaniyah Muslim App',
    appVersion: '1.0.0',
    defaultLanguage: 'English',
    timezone: 'UTC',
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true
  },
  prayer: {
    calculationMethod: 'ISNA',
    asrMethod: 'Hanafi',
    highLatitudeMethod: 'Angle-based',
    fajrAngle: 15,
    ishaAngle: 15,
    timezone: 'UTC',
    dstEnabled: true
  },
  email: {
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    fromEmail: 'noreply@tijaniyahapp.com',
    fromName: 'Tijaniyah Muslim App',
    enabled: false
  },
  security: {
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireStrongPassword: true,
    twoFactorEnabled: false,
    ipWhitelist: []
  },
  backup: {
    autoBackup: true,
    backupFrequency: 'daily',
    retentionDays: 30,
    cloudBackup: false,
    lastBackup: '2024-01-20 10:30:00'
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    prayerReminders: true,
    communityUpdates: true,
    systemAlerts: true
  }
}

const calculationMethods = ['ISNA', 'MWL', 'Egypt', 'Karachi', 'Umm al-Qura', 'Dubai', 'Qatar', 'Kuwait', 'Moonsighting Committee', 'Turkey', 'Russia', 'Singapore', 'Tehran', 'Jafari']
const asrMethods = ['Hanafi', 'Shafi']
const highLatitudeMethods = ['None', 'Night Middle', 'One Seventh', 'Angle-based']
const languages = ['English', 'Arabic', 'Urdu', 'French', 'Spanish', 'German', 'Turkish', 'Indonesian', 'Malay']
const timezones = ['UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Asia/Dubai', 'Asia/Karachi', 'Asia/Jakarta', 'Australia/Sydney']
const backupFrequencies = ['hourly', 'daily', 'weekly', 'monthly']

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings)
  const [activeTab, setActiveTab] = useState('general')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Load settings from localStorage or API
    const savedSettings = localStorage.getItem('admin-settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const saveSettings = async () => {
    setIsSaving(true)
    setSaveStatus('idle')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Save to localStorage
      localStorage.setItem('admin-settings', JSON.stringify(settings))
      
      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch (error) {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const resetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      setSettings(defaultSettings)
    }
  }

  const testEmailConnection = async () => {
    setIsLoading(true)
    try {
      // Simulate email test
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Email connection test successful!')
    } catch (error) {
      alert('Email connection test failed. Please check your settings.')
    } finally {
      setIsLoading(false)
    }
  }

  const performBackup = async () => {
    setIsLoading(true)
    try {
      // Simulate backup process
      await new Promise(resolve => setTimeout(resolve, 3000))
      alert('Backup completed successfully!')
    } catch (error) {
      alert('Backup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'prayer', label: 'Prayer Times', icon: GlobeIcon },
    { id: 'email', label: 'Email', icon: MailIcon },
    { id: 'security', label: 'Security', icon: ShieldIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'backup', label: 'Backup', icon: DatabaseIcon }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50/30 to-secondary-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">System Settings</h1>
            <p className="text-muted-foreground">Configure app settings and preferences</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={resetSettings}>
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              Reset to Default
            </Button>
            <Button 
              variant="islamic" 
              onClick={saveSettings}
              disabled={isSaving}
            >
              <SaveIcon className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </div>

        {/* Save Status */}
        {saveStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-600">
            <CheckCircleIcon className="h-5 w-5" />
            Settings saved successfully!
          </div>
        )}

        {saveStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
            <AlertTriangleIcon className="h-5 w-5" />
            Failed to save settings. Please try again.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors ${
                          activeTab === tab.id ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-muted-foreground'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {tab.label}
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            {/* General Settings */}
            {activeTab === 'general' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="h-5 w-5" />
                    General Settings
                  </CardTitle>
                  <CardDescription>
                    Basic app configuration and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">App Name</label>
                        <input
                          type="text"
                          value={settings.general.appName}
                          onChange={(e) => setSettings({
                            ...settings,
                            general: { ...settings.general, appName: e.target.value }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">App Version</label>
                        <input
                          type="text"
                          value={settings.general.appVersion}
                          onChange={(e) => setSettings({
                            ...settings,
                            general: { ...settings.general, appVersion: e.target.value }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Default Language</label>
                        <select
                          value={settings.general.defaultLanguage}
                          onChange={(e) => setSettings({
                            ...settings,
                            general: { ...settings.general, defaultLanguage: e.target.value }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                        >
                          {languages.map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Timezone</label>
                        <select
                          value={settings.general.timezone}
                          onChange={(e) => setSettings({
                            ...settings,
                            general: { ...settings.general, timezone: e.target.value }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                        >
                          {timezones.map(tz => (
                            <option key={tz} value={tz}>{tz}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Maintenance Mode</label>
                          <p className="text-xs text-muted-foreground">Disable app access for maintenance</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.general.maintenanceMode}
                          onChange={(e) => setSettings({
                            ...settings,
                            general: { ...settings.general, maintenanceMode: e.target.checked }
                          })}
                          className="w-4 h-4"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Registration Enabled</label>
                          <p className="text-xs text-muted-foreground">Allow new user registrations</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.general.registrationEnabled}
                          onChange={(e) => setSettings({
                            ...settings,
                            general: { ...settings.general, registrationEnabled: e.target.checked }
                          })}
                          className="w-4 h-4"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Email Verification Required</label>
                          <p className="text-xs text-muted-foreground">Require email verification for new accounts</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.general.emailVerificationRequired}
                          onChange={(e) => setSettings({
                            ...settings,
                            general: { ...settings.general, emailVerificationRequired: e.target.checked }
                          })}
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Prayer Times Settings */}
            {activeTab === 'prayer' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GlobeIcon className="h-5 w-5" />
                    Prayer Times Settings
                  </CardTitle>
                  <CardDescription>
                    Configure prayer time calculations and methods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Calculation Method</label>
                        <select
                          value={settings.prayer.calculationMethod}
                          onChange={(e) => setSettings({
                            ...settings,
                            prayer: { ...settings.prayer, calculationMethod: e.target.value }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                        >
                          {calculationMethods.map(method => (
                            <option key={method} value={method}>{method}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Asr Method</label>
                        <select
                          value={settings.prayer.asrMethod}
                          onChange={(e) => setSettings({
                            ...settings,
                            prayer: { ...settings.prayer, asrMethod: e.target.value }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                        >
                          {asrMethods.map(method => (
                            <option key={method} value={method}>{method}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">High Latitude Method</label>
                        <select
                          value={settings.prayer.highLatitudeMethod}
                          onChange={(e) => setSettings({
                            ...settings,
                            prayer: { ...settings.prayer, highLatitudeMethod: e.target.value }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                        >
                          {highLatitudeMethods.map(method => (
                            <option key={method} value={method}>{method}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Timezone</label>
                        <select
                          value={settings.prayer.timezone}
                          onChange={(e) => setSettings({
                            ...settings,
                            prayer: { ...settings.prayer, timezone: e.target.value }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                        >
                          {timezones.map(tz => (
                            <option key={tz} value={tz}>{tz}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Fajr Angle</label>
                        <input
                          type="number"
                          value={settings.prayer.fajrAngle}
                          onChange={(e) => setSettings({
                            ...settings,
                            prayer: { ...settings.prayer, fajrAngle: parseInt(e.target.value) }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                          min="0"
                          max="30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Isha Angle</label>
                        <input
                          type="number"
                          value={settings.prayer.ishaAngle}
                          onChange={(e) => setSettings({
                            ...settings,
                            prayer: { ...settings.prayer, ishaAngle: parseInt(e.target.value) }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                          min="0"
                          max="30"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Daylight Saving Time</label>
                        <p className="text-xs text-muted-foreground">Enable automatic DST adjustment</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.prayer.dstEnabled}
                        onChange={(e) => setSettings({
                          ...settings,
                          prayer: { ...settings.prayer, dstEnabled: e.target.checked }
                        })}
                        className="w-4 h-4"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Email Settings */}
            {activeTab === 'email' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MailIcon className="h-5 w-5" />
                    Email Settings
                  </CardTitle>
                  <CardDescription>
                    Configure email server and notification settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Email Enabled</label>
                        <p className="text-xs text-muted-foreground">Enable email notifications and features</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.email.enabled}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: { ...settings.email, enabled: e.target.checked }
                        })}
                        className="w-4 h-4"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">SMTP Host</label>
                        <input
                          type="text"
                          value={settings.email.smtpHost}
                          onChange={(e) => setSettings({
                            ...settings,
                            email: { ...settings.email, smtpHost: e.target.value }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                          placeholder="smtp.gmail.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">SMTP Port</label>
                        <input
                          type="number"
                          value={settings.email.smtpPort}
                          onChange={(e) => setSettings({
                            ...settings,
                            email: { ...settings.email, smtpPort: parseInt(e.target.value) }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                          placeholder="587"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">SMTP Username</label>
                        <input
                          type="text"
                          value={settings.email.smtpUsername}
                          onChange={(e) => setSettings({
                            ...settings,
                            email: { ...settings.email, smtpUsername: e.target.value }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                          placeholder="your-email@gmail.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">SMTP Password</label>
                        <input
                          type="password"
                          value={settings.email.smtpPassword}
                          onChange={(e) => setSettings({
                            ...settings,
                            email: { ...settings.email, smtpPassword: e.target.value }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">From Email</label>
                        <input
                          type="email"
                          value={settings.email.fromEmail}
                          onChange={(e) => setSettings({
                            ...settings,
                            email: { ...settings.email, fromEmail: e.target.value }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                          placeholder="noreply@yourapp.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">From Name</label>
                        <input
                          type="text"
                          value={settings.email.fromName}
                          onChange={(e) => setSettings({
                            ...settings,
                            email: { ...settings.email, fromName: e.target.value }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                          placeholder="Your App Name"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        onClick={testEmailConnection}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Testing...' : 'Test Connection'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldIcon className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Configure security policies and authentication
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Session Timeout (minutes)</label>
                        <input
                          type="number"
                          value={settings.security.sessionTimeout}
                          onChange={(e) => setSettings({
                            ...settings,
                            security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                          min="5"
                          max="1440"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Max Login Attempts</label>
                        <input
                          type="number"
                          value={settings.security.maxLoginAttempts}
                          onChange={(e) => setSettings({
                            ...settings,
                            security: { ...settings.security, maxLoginAttempts: parseInt(e.target.value) }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                          min="3"
                          max="10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Password Min Length</label>
                        <input
                          type="number"
                          value={settings.security.passwordMinLength}
                          onChange={(e) => setSettings({
                            ...settings,
                            security: { ...settings.security, passwordMinLength: parseInt(e.target.value) }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                          min="6"
                          max="32"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Require Strong Password</label>
                          <p className="text-xs text-muted-foreground">Enforce complex password requirements</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.security.requireStrongPassword}
                          onChange={(e) => setSettings({
                            ...settings,
                            security: { ...settings.security, requireStrongPassword: e.target.checked }
                          })}
                          className="w-4 h-4"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Two-Factor Authentication</label>
                          <p className="text-xs text-muted-foreground">Enable 2FA for admin accounts</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.security.twoFactorEnabled}
                          onChange={(e) => setSettings({
                            ...settings,
                            security: { ...settings.security, twoFactorEnabled: e.target.checked }
                          })}
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BellIcon className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Configure notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Email Notifications</label>
                        <p className="text-xs text-muted-foreground">Send notifications via email</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailNotifications}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, emailNotifications: e.target.checked }
                        })}
                        className="w-4 h-4"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Push Notifications</label>
                        <p className="text-xs text-muted-foreground">Send push notifications to devices</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.pushNotifications}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, pushNotifications: e.target.checked }
                        })}
                        className="w-4 h-4"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Prayer Reminders</label>
                        <p className="text-xs text-muted-foreground">Send prayer time reminders</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.prayerReminders}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, prayerReminders: e.target.checked }
                        })}
                        className="w-4 h-4"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Community Updates</label>
                        <p className="text-xs text-muted-foreground">Notify about community activities</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.communityUpdates}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, communityUpdates: e.target.checked }
                        })}
                        className="w-4 h-4"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">System Alerts</label>
                        <p className="text-xs text-muted-foreground">Send system maintenance and security alerts</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifications.systemAlerts}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, systemAlerts: e.target.checked }
                        })}
                        className="w-4 h-4"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Backup Settings */}
            {activeTab === 'backup' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DatabaseIcon className="h-5 w-5" />
                    Backup Settings
                  </CardTitle>
                  <CardDescription>
                    Configure data backup and recovery
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Auto Backup</label>
                        <p className="text-xs text-muted-foreground">Enable automatic data backups</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.backup.autoBackup}
                        onChange={(e) => setSettings({
                          ...settings,
                          backup: { ...settings.backup, autoBackup: e.target.checked }
                        })}
                        className="w-4 h-4"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Backup Frequency</label>
                        <select
                          value={settings.backup.backupFrequency}
                          onChange={(e) => setSettings({
                            ...settings,
                            backup: { ...settings.backup, backupFrequency: e.target.value }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                        >
                          {backupFrequencies.map(freq => (
                            <option key={freq} value={freq}>{freq}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Retention Days</label>
                        <input
                          type="number"
                          value={settings.backup.retentionDays}
                          onChange={(e) => setSettings({
                            ...settings,
                            backup: { ...settings.backup, retentionDays: parseInt(e.target.value) }
                          })}
                          className="w-full p-3 border border-input rounded-lg"
                          min="1"
                          max="365"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium">Cloud Backup</label>
                        <p className="text-xs text-muted-foreground">Store backups in cloud storage</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.backup.cloudBackup}
                        onChange={(e) => setSettings({
                          ...settings,
                          backup: { ...settings.backup, cloudBackup: e.target.checked }
                        })}
                        className="w-4 h-4"
                      />
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Last Backup</p>
                          <p className="text-xs text-muted-foreground">{settings.backup.lastBackup}</p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={performBackup}
                          disabled={isLoading}
                        >
                          {isLoading ? 'Backing up...' : 'Backup Now'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
