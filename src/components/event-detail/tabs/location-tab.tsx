import { Card } from "@/components/ui/card"
import { Globe } from "lucide-react"
import { Event } from "@/types/event"

interface LocationTabProps {
  event: Event
}

export function LocationTab({ event }: LocationTabProps) {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Event Location</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Address</h4>
          <p className="text-gray-700">
            {event.venue && <span className="font-medium">{event.venue}<br /></span>}
            {event.location}
          </p>
        </div>

        {event.is_online && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-900">Online Event</span>
            </div>
            <p className="text-sm text-blue-700">
              This is an online event. Connection details will be provided after registration.
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}


