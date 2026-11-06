"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, Users, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { eventRegistrationStorage } from "@/lib/event-storage"
import { Event } from "@/types/event"

type EventWithCount = Event & { registration_count?: number }

interface EventsGridProps {
  events: EventWithCount[]
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

// Check if an event is expired
function isEventExpired(event: { start_date: string; end_date?: string }): boolean {
  const now = new Date()
  const eventEndDate = event.end_date ? new Date(event.end_date) : new Date(event.start_date)
  return eventEndDate < now
}

// Event cards. Data is fetched on the server (see events-section.tsx);
// this client part only adds the "Registered" badges from localStorage.
export default function EventsGrid({ events }: EventsGridProps) {
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([])

  useEffect(() => {
    setRegisteredEventIds(eventRegistrationStorage.getRegisteredEvents())
  }, [])

  return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {events.slice(0, 6).map((event) => {
            const registrationCount = event.registration_count || 0
            const tags = event.tags ?? []
            const availableSpots = event.capacity ? event.capacity - registrationCount : null
            const isFull = event.capacity && registrationCount >= event.capacity
            const isUserRegistered = registeredEventIds.includes(event.id)
            const isExpired = isEventExpired(event)

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
                      {isExpired && (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800 text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          Expired
                        </Badge>
                      )}
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
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {tags.slice(0, 2).map((tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Action Button - pushed to bottom */}
                    <div className="mt-auto">
                      <Button 
                        size="sm" 
                        className={`w-full text-xs sm:text-sm ${
                          isExpired
                            ? 'bg-gray-400 cursor-not-allowed'
                            : isUserRegistered 
                              ? 'bg-green-500 hover:bg-green-600' 
                              : isFull 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : ''
                        }`}
                        disabled={!!(isFull && !isUserRegistered) || isExpired}
                      >
                        {isExpired
                          ? 'Event Expired'
                          : isUserRegistered 
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
  )
}