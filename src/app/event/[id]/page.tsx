import { notFound } from "next/navigation"
import EventDetail from "@/components/event-detail/event-detail"
import { getEventById } from "@/app/actions"

export default async function EventPage({ params }: any) {
  const { event, error } = await getEventById(params.id)

  if (error || !event) {
    notFound()
  }

  return <EventDetail event={event} />
}
