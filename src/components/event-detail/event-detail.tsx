"use client"

import { useState } from "react"
import { Event } from "@/types/event"
import { EventHeader } from "./event-header"
import { EventHero } from "./event-hero"
import { EventInfo } from "./event-info"
import { EventTabs } from "./event-tabs"
import { SimilarEvents } from "./similar-events"
import { RichTextStyles } from "./rich-text-styles"

interface EventDetailProps {
  event: Event & { registration_count?: number }
}

export default function EventDetail({ event }: EventDetailProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [registrationCount, setRegistrationCount] = useState(event.registration_count || 0)

  const handleRegistrationSuccess = () => {
    setIsRegistered(true)
    setRegistrationCount(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-white">
      <EventHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EventHero 
          event={event}
          isFavorited={isFavorited}
          setIsFavorited={setIsFavorited}
          isRegistered={isRegistered}
          registrationCount={registrationCount}
          onRegistrationSuccess={handleRegistrationSuccess}
        />
        
        <EventInfo event={event} />
        
        <EventTabs event={event} />
        
        <SimilarEvents location={event.location} />
      </div>

      <RichTextStyles />
    </div>
  )
}