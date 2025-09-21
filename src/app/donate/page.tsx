'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { IslamicBackground } from '@/components/ui/islamic-background'
import { 
  HeartIcon, 
  UploadIcon, 
  CheckIcon, 
  PhoneIcon, 
  MessageCircleIcon,
  CreditCardIcon,
  ShieldIcon,
  StarIcon
} from 'lucide-react'

const paymentMethods = [
  {
    network: 'MTN',
    number: '0558415813',
    name: 'AISHA',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20'
  },
  {
    network: 'Vodafone',
    number: '0558415813',
    name: 'AISHA',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20'
  },
  {
    network: 'Airtel/Tigo',
    number: '0558415813',
    name: 'AISHA',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  }
]

export default function DonatePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [donorPhone, setDonorPhone] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Convert file to base64 for submission
      let receiptUrl = '/receipts/default.pdf'
      
      if (selectedFile) {
        // Convert file to base64
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = () => reject(new Error('Failed to read file'))
          reader.readAsDataURL(selectedFile)
        })
        receiptUrl = base64
      }
      
      // Submit donation
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donorName,
          donorEmail,
          donorPhone,
          amount: parseFloat(amount),
          message,
          receiptUrl
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Donation submitted successfully:', data)
        setIsSubmitted(true)
        setIsSubmitting(false)
        // Reset form
        setSelectedFile(null)
        setDonorName('')
        setDonorEmail('')
        setDonorPhone('')
        setAmount('')
        setMessage('')
      } else {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        throw new Error(errorData.error || 'Failed to submit donation')
      }
    } catch (error) {
      console.error('Error submitting donation:', error)
      setIsSubmitting(false)
      alert(`Failed to submit donation: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <IslamicBackground variant="quran" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="muslim-card muslim-pro-glow">
              <CardContent className="p-12">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckIcon className="h-10 w-10 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-primary mb-4">Thank You for Your Donation!</h1>
                <p className="text-muted-foreground mb-6">
                  Your receipt has been submitted successfully. We will verify your payment and send you a confirmation email.
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  className="muslim-gradient text-white px-8 py-3"
                >
                  Make Another Donation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <IslamicBackground variant="quran" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold muslim-text-gradient mb-4">
              Support Our Mission
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Help us keep the Tijaniyah Muslim App running and continue providing free Islamic resources to the community
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Methods */}
            <div className="space-y-6">
              <Card className="muslim-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <CreditCardIcon className="h-6 w-6" />
                    Donate via Mobile Money (Ghana)
                  </CardTitle>
                  <CardDescription>
                    Make payment below to help sustain the app and keep it running
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map((method, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border ${method.bgColor} ${method.borderColor} hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{method.network}</h3>
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${method.color}`}></div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Number:</p>
                        <p className="font-mono text-lg font-bold text-primary">{method.number}</p>
                        <p className="text-sm text-muted-foreground">Name: {method.name}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm font-medium text-primary mb-2">Reference:</p>
                    <p className="font-mono text-sm">AI NOOR SUPPORT</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="muslim-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <MessageCircleIcon className="h-6 w-6" />
                    Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">WhatsApp us:</p>
                        <p className="font-semibold">+233 558415813</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      After payment, upload your receipt (PDF/JPG) or contact us via WhatsApp
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Receipt Upload Form */}
            <div>
              <Card className="muslim-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <UploadIcon className="h-6 w-6" />
                    Submit Payment Receipt
                  </CardTitle>
                  <CardDescription>
                    Upload your payment receipt to help us track your donation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="Enter your full name"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={donorPhone}
                          onChange={(e) => setDonorPhone(e.target.value)}
                          placeholder="Enter your phone number"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="amount">Amount Donated (GHS) *</Label>
                        <Input
                          id="amount"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Enter amount"
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="receipt">Payment Receipt *</Label>
                      <div className="mt-1">
                        <Input
                          id="receipt"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          required
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Accepted formats: PDF, JPG, PNG (Max 10MB)
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Any message for us..."
                        rows={3}
                        className="mt-1"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full muslim-gradient text-white py-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Submitting...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <HeartIcon className="h-4 w-4" />
                          Submit Receipt
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <Card className="muslim-card mt-6">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <ShieldIcon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Secure & Private</h4>
                      <p className="text-xs text-muted-foreground">
                        Your payment information is secure and will only be used to verify your donation. 
                        We never store sensitive financial data.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
