"use client"
import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

interface FeedbackFormData {
  name: string
  country: string
  message: string
}

export function FeedbackSection() {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    country: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const { error } = await supabase
        .from('feedback')
        .insert([
          {
            name: formData.name,
            country: formData.country,
            message: formData.message
          }
        ])

      if (error) throw error

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your feedback! '
      })
      
      // Reset form after successful submission
      setFormData({ name: '', country: '', message: '' })
    } catch (error) {
      console.error('Error submitting feedback:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit feedback. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="feedback" className="w-full py-12 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Share Your Feedback</h2>
          <p className="text-muted-foreground">
            We value your thoughts and suggestions to improve our services or any feature requests that you think we should add.
          </p>
        </div>

        {submitStatus.type && (
          <div 
            className={cn(
              "p-4 mb-6 rounded-md",
              submitStatus.type === 'success' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            )}
          >
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
               Full  Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="country" className="text-sm font-medium">
                Country
              </label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="Enter your country"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Share your thoughts with us..."
              className={cn(
                "min-h-[120px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
              )}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-center">
            <Button 
              type="submit" 
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
