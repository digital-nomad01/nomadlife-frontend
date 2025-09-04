"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getEvents } from "@/app/actions"
import Image from "next/image"
import Link from "next/link"
import { eventRegistrationStorage } from "@/lib/event-storage"

interface EventsSectionProps {
  className?: string
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
  })
}

function formatPrice(price?: number): string {
  if (!price || price === 0) return 'Free'
  return `$${price.toFixed(0)}`
}

function getImageUrl(imagePath?: string): string {
  if (!imagePath) return ''
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/events/${imagePath}`
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export default function EventsSection({ className = "" }: EventsSectionProps) {
  const [events, setEvents] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([])

  useEffect(() => {
    // Load events and registration status
    const loadEvents = async () => {
      try {
        const { events: fetchedEvents, error: fetchError } = await getEvents()
        if (fetchError) {
          setError(fetchError)
        } else {
          setEvents(fetchedEvents || [])
        }
      } catch (err) {
        setError('Failed to load events'+err)
      } finally {
        setLoading(false)
      }
    }

    // Load registered events from localStorage
    setRegisteredEventIds(eventRegistrationStorage.getRegisteredEvents())
    
    loadEvents()
  }, [])

  if (loading) {
    return (
      <section className={`py-8 sm:py-12 lg:py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <p className="text-gray-600">Loading events...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={`py-8 sm:py-12 lg:py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Responsive Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Events Near You</h2>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-600">Unable to load events at this time.</p>
          </div>
        </div>
      </section>
    )
  }

  if (!events || events.length === 0) {
    return (
      <section className={`py-8 sm:py-12 lg:py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Responsive Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Events Near You</h2>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-600">No events available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="events" className={`py-8 sm:py-12 lg:py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Responsive Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Events Near You</h2>
          <Button variant="outline" className="self-start sm:self-auto">
            View All
          </Button>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {events.slice(0, 6).map((event) => {
            const registrationCount = (event as any).registration_count || 0
            const availableSpots = event.capacity ? event.capacity - registrationCount : null
            const isFull = event.capacity && registrationCount >= event.capacity
            const isUserRegistered = registeredEventIds.includes(event.id)

            return (
              <Link key={event.id} href={`/event/${event.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  {/* Image Section */}
                  <div className="aspect-video relative bg-gradient-to-br from-purple-400 to-pink-400">
                    {event.image && (
                      <Image
                        src={getImageUrl(event.image)}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    {/* Status Badges */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      {event.is_online && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                          Online
                        </Badge>
                      )}
                      {isFull && (
                        <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                          Full
                        </Badge>
                      )}
                      {isUserRegistered && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Registered
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <CardContent className="p-3 sm:p-4 flex flex-col h-full">
                    {/* Date and Price Row */}
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                        <Calendar className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{formatDate(event.start_date)}</span>
                      </Badge>
                      <div className="flex items-center text-sm text-gray-600 font-medium">
                        {formatPrice(event.price)}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2" title={event.title}>
                      {truncateText(event.title, 50)}
                    </h3>
                    
                    {/* Location */}
                    <div className="flex items-start text-sm text-gray-600 mb-2 gap-1" title={event.venue ? `${event.venue}, ${event.location}` : event.location}>
                      <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span className="truncate text-xs sm:text-sm">
                        {event.venue ? `${event.venue}, ${event.location}` : event.location}
                      </span>
                    </div>

                    {/* Registration count */}
                    <div className="flex items-center text-sm text-gray-600 mb-3 gap-1">
                      <Users className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">
                        {registrationCount} registered
                        {event.capacity && (
                          <span className="text-gray-500">
                            {' '}• {availableSpots} spots left
                          </span>
                        )}
                      </span>
                    </div>

                    {/* Tags */}
                    {event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {event.tags.slice(0, 2).map((tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {event.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{event.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Action Button - pushed to bottom */}
                    <div className="mt-auto">
                      <Button 
                        size="sm" 
                        className={`w-full text-xs sm:text-sm ${
                          isUserRegistered 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : isFull 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : ''
                        }`}
                        disabled={!!isFull && !isUserRegistered}
                      >
                        {isUserRegistered 
                          ? 'Registered ✓'
                          : isFull 
                            ? 'Event Full' 
                            : event.price && event.price > 0 
                              ? 'Buy Ticket' 
                              : 'RSVP'
                        }
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}