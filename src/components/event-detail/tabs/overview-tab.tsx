import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tag } from "lucide-react"
import { Event } from "@/types/event"
import { RichTextContent } from "../components/rich-text-content"

interface OverviewTabProps {
  event: Event
}

export function OverviewTab({ event }: OverviewTabProps) {
  return (
    <>
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">About This Event</h3>
        <div className="prose prose-gray max-w-none">
          <RichTextContent 
            content={event.content} 
            fallback={event.description} 
          />
        </div>
      </Card>

      {event.tags.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </>
  )
}