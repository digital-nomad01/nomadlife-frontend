import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Globe } from "lucide-react"
import { Event } from "@/types/event"
import { formatTime } from "./utils/event-utils"

interface EventInfoProps {
  event: Event
}

export function EventInfo({ event }: EventInfoProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{event.venue ? `${event.venue}, ${event.location}` : event.location}</span>
            </div>
            {event.is_online && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Globe className="h-3 w-3 mr-1" />
                Online Event
              </Badge>
            )}
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{formatTime(event.start_date)}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>
    </div>
  )
}


