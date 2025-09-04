"use client"

import { useState, useEffect } from 'react'
import { eventRegistrationStorage, eventFavoritesStorage } from '@/lib/event-storage'

export function useEventRegistration(eventId: string) {
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    setIsRegistered(eventRegistrationStorage.isRegistered(eventId))
  }, [eventId])

  const register = (eventTitle: string) => {
    eventRegistrationStorage.register(eventId, eventTitle)
    setIsRegistered(true)
  }

  const unregister = () => {
    eventRegistrationStorage.unregister(eventId)
    setIsRegistered(false)
  }

  return { isRegistered, register, unregister }
}

export function useEventFavorite(eventId: string) {
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    setIsFavorited(eventFavoritesStorage.isFavorited(eventId))
  }, [eventId])

  const addFavorite = (eventTitle: string) => {
    eventFavoritesStorage.addFavorite(eventId, eventTitle)
    setIsFavorited(true)
  }

  const removeFavorite = () => {
    eventFavoritesStorage.removeFavorite(eventId)
    setIsFavorited(false)
  }

  const toggleFavorite = (eventTitle: string) => {
    if (isFavorited) {
      removeFavorite()
    } else {
      addFavorite(eventTitle)
    }
  }

  return { isFavorited, addFavorite, removeFavorite, toggleFavorite }
}

export function useAllEventStorage() {
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([])
  const [favoritedEvents, setFavoritedEvents] = useState<string[]>([])

  useEffect(() => {
    setRegisteredEvents(eventRegistrationStorage.getRegisteredEvents())
    setFavoritedEvents(eventFavoritesStorage.getFavoritedEvents())
  }, [])

  return { registeredEvents, favoritedEvents }
}