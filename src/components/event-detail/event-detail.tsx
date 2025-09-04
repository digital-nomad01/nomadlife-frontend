"use client"

import { useState, useEffect } from "react"
import { Event } from "@/types/event"
import { EventHeader } from "./event-header"
import { EventHero } from "./event-hero"
import { EventInfo } from "./event-info"
import { EventTabs } from "./event-tabs"
import { SimilarEvents } from "./similar-events"
import { RichTextStyles } from "./rich-text-styles"
import { eventRegistrationStorage, eventFavoritesStorage } from "@/lib/event-storage"

interface EventDetailProps {
  event: Event & { registration_count?: number }
}

export default function EventDetail({ event }: EventDetailProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [registrationCount, setRegistrationCount] = useState(event.registration_count || 0)

  // Load initial state from localStorage
  useEffect(() => {
    setIsFavorited(eventFavoritesStorage.isFavorited(event.id))
    setIsRegistered(eventRegistrationStorage.isRegistered(event.id))
  }, [event.id])

  const handleRegistrationSuccess = () => {
    setIsRegistered(true)
    setRegistrationCount(prev => prev + 1)
    // Save to localStorage
    eventRegistrationStorage.register(event.id, event.title)
  }

  const handleFavoriteToggle = (newFavoriteState: boolean) => {
    setIsFavorited(newFavoriteState)
    // Save to localStorage
    if (newFavoriteState) {
      eventFavoritesStorage.addFavorite(event.id, event.title)
    } else {
      eventFavoritesStorage.removeFavorite(event.id)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <EventHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <EventHero 
          event={event}
          isFavorited={isFavorited}
          setIsFavorited={handleFavoriteToggle}
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