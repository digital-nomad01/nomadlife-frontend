import { getEvents } from "@/app/actions"
import { WHATSAPP_GROUP_URL } from "@/config/site"
import { Button } from "@/components/ui/button"
import EventsGrid from "./events-grid"

interface EventsSectionProps {
  className?: string
}

// An event is upcoming until its end (or start, if it has no end) has passed.
function isUpcoming(event: { start_date: string; end_date?: string }, now: Date): boolean {
  return new Date(event.end_date || event.start_date) >= now
}

// Server component: events are loaded while the page renders, so the section
// never waits on the browser and always ends in one of three states:
// a list of events, an empty state, or an error message.
export default async function EventsSection({ className = "" }: EventsSectionProps) {
  const { events, error } = await getEvents()
  const upcoming = (events ?? []).filter((event) => isUpcoming(event, new Date()))

  return (
    <section id="events" className={`py-8 sm:py-12 lg:py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Events Near You</h2>
        </div>

        {error ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              We couldn&apos;t load events right now. Our WhatsApp group has the latest meetups.
            </p>
            <Button asChild variant="outline">
              <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer">
                Join our WhatsApp group
              </a>
            </Button>
          </div>
        ) : upcoming.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              No upcoming events right now. Join our WhatsApp group to hear about the next meetup.
            </p>
            <Button asChild variant="outline">
              <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer">
                Join our WhatsApp group
              </a>
            </Button>
          </div>
        ) : (
          <EventsGrid events={upcoming} />
        )}
      </div>
    </section>
  )
}
