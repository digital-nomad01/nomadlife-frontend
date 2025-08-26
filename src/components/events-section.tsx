import { Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getEvents } from "@/app/actions"
import Image from "next/image"
import Link from "next/link"

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

export default async function EventsSection({ className = "" }: EventsSectionProps) {
  const { events, error } = await getEvents()

  if (error) {
    return (
      <section className={`py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Events Near You</h2>
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
      <section className={`py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Events Near You</h2>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-600">No events available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Events Near You</h2>
          <Button variant="outline">View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 6).map((event) => {
            const registrationCount = (event as any).registration_count || 0
            const availableSpots = event.capacity ? event.capacity - registrationCount : null
            const isFull = event.capacity && registrationCount >= event.capacity

            return (
              <Link key={event.id} href={`/event/${event.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video relative bg-gradient-to-br from-purple-400 to-pink-400">
                    {event.image && (
                      <Image
                        src={getImageUrl(event.image)}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute top-2 right-2 flex gap-2">
                      {event.is_online && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          Online
                        </Badge>
                      )}
                      {isFull && (
                        <Badge variant="secondary" className="bg-red-100 text-red-800">
                          Full
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(event.start_date)}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-600">
                        {formatPrice(event.price)}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-1" title={event.title}>
                      {truncateText(event.title, 50)}
                    </h3>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2" title={event.venue ? `${event.venue}, ${event.location}` : event.location}>
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="truncate">
                        {event.venue ? `${event.venue}, ${event.location}` : event.location}
                      </span>
                    </div>

                    {/* Registration count */}
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Users className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span>
                        {registrationCount} registered
                        {event.capacity && (
                          <span className="text-gray-500">
                            {' '}• {availableSpots} spots left
                          </span>
                        )}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-3" title={event.description}>
                      {truncateText(event.description, 80)}
                    </p>

                    {event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {event.tags.slice(0, 2).map((tag, index) => (
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

                    <Button 
                      size="sm" 
                      className={`w-full ${isFull ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                      disabled={!!isFull}
                    >
                      {isFull 
                        ? 'Event Full' 
                        : event.price && event.price > 0 
                          ? 'Buy Ticket' 
                          : 'RSVP'
                      }
                    </Button>
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