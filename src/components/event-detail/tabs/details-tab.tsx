import { Card } from "@/components/ui/card"
import { Calendar, DollarSign, Users, Globe } from "lucide-react"
import { Event } from "@/types/event"
import { formatDate, formatTime, formatPrice } from "../utils/event-utils"

interface DetailsTabProps {
  event: Event
}

export function DetailsTab({ event }: DetailsTabProps) {
  const eventDate = new Date(event.start_date)
  const endDate = event.end_date ? new Date(event.end_date) : null
  const isMultiDay = endDate && endDate.toDateString() !== eventDate.toDateString()

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Event Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3">
          <Calendar className="h-5 w-5 text-gray-500" />
          <div>
            <div className="font-medium">Date & Time</div>
            <div className="text-sm text-gray-600">
              {formatDate(event.start_date)}
              <br />
              {formatTime(event.start_date)}
              {event.end_date && !isMultiDay && (
                <span> - {formatTime(event.end_date)}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <DollarSign className="h-5 w-5 text-gray-500" />
          <div>
            <div className="font-medium">Price</div>
            <div className="text-sm text-gray-600">{formatPrice(event.price)}</div>
          </div>
        </div>

        {event.capacity && (
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-gray-500" />
            <div>
              <div className="font-medium">Capacity</div>
              <div className="text-sm text-gray-600">{event.capacity} attendees</div>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-3">
          <Globe className="h-5 w-5 text-gray-500" />
          <div>
            <div className="font-medium">Format</div>
            <div className="text-sm text-gray-600">
              {event.is_online ? 'Online Event' : 'In-Person Event'}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}


