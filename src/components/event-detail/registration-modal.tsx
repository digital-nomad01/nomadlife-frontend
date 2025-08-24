"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X, Loader2, CheckCircle } from "lucide-react"
import { registerForEvent } from "@/app/actions"

interface RegistrationModalProps {
  eventId: string
  eventTitle: string
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  countryFrom: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  countryFrom?: string
  general?: string
}

export function RegistrationModal({ 
  eventId, 
  eventTitle, 
  isOpen, 
  onClose, 
  onSuccess 
}: RegistrationModalProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryFrom: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    }
    if (!formData.countryFrom.trim()) {
      newErrors.countryFrom = 'Country is required'
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
      const result = await registerForEvent({
        eventId,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phoneNumber: formData.phoneNumber.trim(),
        countryFrom: formData.countryFrom.trim()
      })

      if (result.success) {
        setIsSuccess(true)
        setTimeout(() => {
          onSuccess()
          handleClose()
        }, 2000)
      } else {
        setErrors({ general: result.error || 'Registration failed. Please try again.' })
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      countryFrom: ''
    })
    setErrors({})
    setIsSubmitting(false)
    setIsSuccess(false)
    onClose()
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          disabled={isSubmitting}
        >
          <X className="h-5 w-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Registration Successful!
            </h3>
            <p className="text-gray-600">
              You've successfully registered for {eventTitle}. Check your email for confirmation details.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Register for Event
            </h3>
            <p className="text-gray-600 mb-6">{eventTitle}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={errors.firstName ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={errors.lastName ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <Input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className={errors.phoneNumber ? 'border-red-500' : ''}
                  disabled={isSubmitting}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country From *
                </label>
                <Input
                  type="text"
                  value={formData.countryFrom}
                  onChange={(e) => handleInputChange('countryFrom', e.target.value)}
                  className={errors.countryFrom ? 'border-red-500' : ''}
                  disabled={isSubmitting}
                  placeholder="e.g., United States, Nepal, etc."
                />
                {errors.countryFrom && (
                  <p className="text-red-500 text-xs mt-1">{errors.countryFrom}</p>
                )}
              </div>

              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">{errors.general}</p>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1"
                >
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
                      Registering...
                    </>
                  ) : (
                    'Register'
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </Card>
    </div>
  )
}