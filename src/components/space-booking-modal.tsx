"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X, Loader2, CheckCircle, Calendar, Users } from "lucide-react"
import { submitSpaceInquiry } from "@/app/actions"
import { SpaceOffer } from "@/types/space"

interface SpaceBookingModalProps {
  spaceId: string
  spaceName: string
  offers: SpaceOffer[]
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

interface BookingFormData {
  contactName: string
  contactEmail: string
  contactPhone: string
  checkInDate: string
  checkOutDate: string
  offerId: string
  message: string
}

interface FormErrors {
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  checkInDate?: string
  checkOutDate?: string
  offerId?: string
  general?: string
}

export function SpaceBookingModal({ 
  spaceId, 
  spaceName, 
  offers,
  isOpen, 
  onClose, 
  onSuccess 
}: SpaceBookingModalProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    checkInDate: '',
    checkOutDate: '',
    offerId: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Name is required'
    }
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email'
    }
    if (!formData.checkInDate) {
      newErrors.checkInDate = 'Check-in date is required'
    }
    if (!formData.checkOutDate) {
      newErrors.checkOutDate = 'Check-out date is required'
    } else if (formData.checkInDate && formData.checkOutDate <= formData.checkInDate) {
      newErrors.checkOutDate = 'Check-out date must be after check-in date'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      const result = await submitSpaceInquiry({
        spaceId,
        contactName: formData.contactName.trim(),
        contactEmail: formData.contactEmail.trim().toLowerCase(),
        contactPhone: formData.contactPhone.trim(),
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        offerId: formData.offerId || undefined,
        message: formData.message.trim()
      })

      if (result.success) {
        setIsSuccess(true)
        setTimeout(() => {
          onSuccess()
          handleClose()
        }, 2000)
      } else {
        setErrors({ general: result.error || 'Booking request failed. Please try again.' })
      }
    } catch (error) {
        setErrors({ general: 'An unexpected error occurred. Please try again.' })
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      checkInDate: '',
      checkOutDate: '',
      offerId: '',
      message: ''
    })
    setErrors({})
    setIsSubmitting(false)
    setIsSuccess(false)
    onClose()
  }

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const selectedOffer = offers.find(offer => offer.id === formData.offerId)
  const formatPrice = (price?: number) => price ? `$${price}` : 'Contact for pricing'

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {isSuccess ? (
          <div className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Request Sent!</h2>
            <p className="text-gray-600">
              Thank you for your interest in {spaceName}. We'll get back to you within 24 hours to confirm your booking.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Book {spaceName}</h2>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{errors.general}</p>
                </div>
              )}

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      className={errors.contactName ? 'border-red-500' : ''}
                      placeholder="Enter your full name"
                    />
                    {errors.contactName && (
                      <p className="text-sm text-red-600 mt-1">{errors.contactName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      className={errors.contactEmail ? 'border-red-500' : ''}
                      placeholder="Enter your email"
                    />
                    {errors.contactEmail && (
                      <p className="text-sm text-red-600 mt-1">{errors.contactEmail}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    className={errors.contactPhone ? 'border-red-500' : ''}
                    placeholder="Enter your phone number"
                  />
                  {errors.contactPhone && (
                    <p className="text-sm text-red-600 mt-1">{errors.contactPhone}</p>
                  )}
                </div>
              </div>

              {/* Booking Dates */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Booking Dates
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in Date *
                    </label>
                    <Input
                      type="date"
                      value={formData.checkInDate}
                      onChange={(e) => handleInputChange('checkInDate', e.target.value)}
                      className={errors.checkInDate ? 'border-red-500' : ''}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.checkInDate && (
                      <p className="text-sm text-red-600 mt-1">{errors.checkInDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out Date *
                    </label>
                    <Input
                      type="date"
                      value={formData.checkOutDate}
                      onChange={(e) => handleInputChange('checkOutDate', e.target.value)}
                      className={errors.checkOutDate ? 'border-red-500' : ''}
                      min={formData.checkInDate || new Date().toISOString().split('T')[0]}
                    />
                    {errors.checkOutDate && (
                      <p className="text-sm text-red-600 mt-1">{errors.checkOutDate}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Offer Selection */}
              {offers.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Select an Option</h3>
                  <div className="grid gap-3">
                    {offers.map((offer) => (
                      <label
                        key={offer.id}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.offerId === offer.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        } ${!offer.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <input
                          type="radio"
                          name="offerId"
                          value={offer.id}
                          checked={formData.offerId === offer.id}
                          onChange={(e) => handleInputChange('offerId', e.target.value)}
                          disabled={!offer.available}
                          className="mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{offer.name}</h4>
                              {offer.description && (
                                <p className="text-sm text-gray-600">{offer.description}</p>
                              )}
                              {offer.capacity && (
                                <p className="text-xs text-gray-500 flex items-center mt-1">
                                  <Users className="h-3 w-3 mr-1" />
                                  Up to {offer.capacity} people
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg">
                                {formatPrice(offer.price)} {offer.currency}
                              </div>
                              {!offer.available && (
                                <span className="text-xs text-red-600">Unavailable</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Any special requests or questions?"
                />
              </div>

              {/* Summary */}
              {selectedOffer && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Booking Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Option:</span>
                      <span>{selectedOffer.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className="font-semibold">
                        {formatPrice(selectedOffer.price)} {selectedOffer.currency}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-4 pt-4">
                <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 bg-coral-500 hover:bg-coral-600 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Booking Request'
                  )}
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                This is a booking request. The space owner will contact you to confirm availability and payment details.
              </p>
            </form>
          </>
        )}
      </Card>
    </div>
  )
}


