import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, ExternalLink } from "lucide-react"
import { Event } from "@/types/event"

interface OrganizerTabProps {
  event: Event
}

export function OrganizerTab({ event }: OrganizerTabProps) {


  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Event Organizer</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-coral-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            N
          </div>
          <div>
            <div className="font-semibold text-gray-900">NomadLife Events</div>
            <div className="text-sm text-gray-600">Event Organizer</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{event.organizer_email ?? "ashish@nomadlife.live"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{event.organizer_phone ?? "+977-9754994807"}</span>
          </div>
        </div>

        <Button variant="outline" className="w-full">
          <ExternalLink className="h-4 w-4 mr-2" />
          Contact Organizer
        </Button>
      </div>
    </Card>
  )
}


