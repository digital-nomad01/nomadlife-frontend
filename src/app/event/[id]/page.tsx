import { notFound } from "next/navigation"
import EventDetail from "@/components/event-detail/event-detail"
import { getEventById } from "@/app/actions"

interface EventPageProps {
  params: Promise<{ id: string }>
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params
  const { event, error } = await getEventById(id)

  if (error || !event) {
    notFound()
  }

  return <EventDetail event={event} />
}
