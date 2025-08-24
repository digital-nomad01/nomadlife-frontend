import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface SimilarEventsProps {
  location: string
}

export function SimilarEvents({ location }: SimilarEventsProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">More Events in {location}</h2>
      <div className="text-center py-8 text-gray-600">
        <p>More events coming soon...</p>
        <Button variant="outline" className="mt-4">
          <ExternalLink className="h-4 w-4 mr-2" />
          List Your Event
        </Button>
      </div>
    </div>
  )
}
