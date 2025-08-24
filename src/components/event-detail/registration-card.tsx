import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Share,
  Calendar,
  MapPin,
  Users,
  UserPlus,
  Ticket,
  Phone,
  Globe,
} from "lucide-react"
import { Event } from "@/types/event"
import { formatDate, formatTime, formatPrice } from "./utils/event-utils"

interface RegistrationCardProps {
  event: Event
  isFavorited: boolean
  setIsFavorited: (value: boolean) => void
  isRegistered: boolean
  setIsRegistered: (value: boolean) => void
}

export function RegistrationCard({
  event,
  isFavorited,
  setIsFavorited,
  isRegistered,
  setIsRegistered,
}: RegistrationCardProps) {
  const eventDate = new Date(event.start_date)
  const endDate = event.end_date ? new Date(event.end_date) : null
  const isMultiDay = endDate && endDate.toDateString() !== eventDate.toDateString()

  return (
    <Card className="sticky top-24 p-6">
      {/* Price and Actions */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl font-bold text-gray-900">{formatPrice(event.price)}</div>
          {event.price && event.price > 0 && (
            <div className="text-sm text-gray-600">per ticket</div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFavorited(!isFavorited)}
            className={isFavorited ? "text-red-500" : "text-gray-500"}
          >
            <Heart className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`} />
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-4 mb-6">
        <div className="p-3 border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Event Date</span>
            <Calendar className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-sm text-gray-600">
            {formatDate(event.start_date)}
            {isMultiDay && endDate && (
              <span> - {formatDate(event.end_date!)}</span>
            )}
          </div>
          <div className="text-sm text-gray-600">
            {formatTime(event.start_date)}
            {event.end_date && !isMultiDay && (
              <span> - {formatTime(event.end_date)}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <MapPin className="h-5 w-5 text-blue-500 mx-auto mb-1" />
            <div className="text-xs font-bold">
              {event.is_online ? 'Online' : 'In-Person'}
            </div>
          </div>
          {event.capacity && (
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Users className="h-5 w-5 text-green-500 mx-auto mb-1" />
              <div className="text-xs font-bold">
                {event.capacity} spots
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          className="w-full bg-coral-500 hover:bg-coral-600 text-white" 
          size="lg"
          onClick={() => setIsRegistered(!isRegistered)}
        >
          {isRegistered ? (
            <>
              <UserPlus className="h-4 w-4 mr-2" />
              Registered
            </>
          ) : (
            <>
              <Ticket className="h-4 w-4 mr-2" />
              {event.price && event.price > 0 ? 'Buy Ticket' : 'RSVP Now'}
            </>
          )}
        </Button>
        <Button variant="outline" className="w-full" size="lg">
          <Phone className="h-4 w-4 mr-2" />
          Contact Organizer
        </Button>
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        {event.price && event.price > 0 
          ? 'Secure payment • Instant confirmation' 
          : 'Free registration • No payment required'
        }
      </div>
    </Card>
  )
}


