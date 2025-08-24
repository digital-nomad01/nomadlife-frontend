import { notFound } from "next/navigation"
import EventDetail from "@/components/event-detail"
import { getEventById } from "@/app/actions"

interface EventPageProps {
  params: {
    id: string
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { event, error } = await getEventById(params.id)

  if (error || !event) {
    notFound()
  }

  return <EventDetail event={event} />
}
