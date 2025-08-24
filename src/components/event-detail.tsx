"use client"

import { useState } from "react"
import { Event } from "@/types/event"
import { EventHero } from "./event-detail/event-hero"
import { EventInfo } from "./event-detail/event-info"
import { EventTabs } from "./event-detail/event-tabs"
import { SimilarEvents } from "./event-detail/similar-events"
import { RichTextStyles } from "./event-detail/rich-text-styles"
import { EventHeader } from "./event-detail/event-header"

interface EventDetailProps {
  event: Event
}

export default function EventDetail({ event }: EventDetailProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <EventHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EventHero 
          event={event}
          isFavorited={isFavorited}
          setIsFavorited={setIsFavorited}
          isRegistered={isRegistered}
          setIsRegistered={setIsRegistered}
        />
        
        <EventInfo event={event} />
        
        <EventTabs event={event} />
        
        <SimilarEvents location={event.location} />
      </div>

      <RichTextStyles />
    </div>
  )
}
