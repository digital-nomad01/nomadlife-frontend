// Utility for managing event registration status in local storage

const STORAGE_KEYS = {
  REGISTERED_EVENTS: 'nomad_registered_events',
  FAVORITED_EVENTS: 'nomad_favorited_events',
} as const

export interface EventRegistrationData {
  eventId: string
  registeredAt: string
  eventTitle: string
}

export interface EventFavoriteData {
  eventId: string
  favoritedAt: string
  eventTitle: string
}

// Event Registration Storage
export const eventRegistrationStorage = {
  // Get all registered event IDs
  getRegisteredEvents(): string[] {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REGISTERED_EVENTS)
      return stored ? JSON.parse(stored).map((item: EventRegistrationData) => item.eventId) : []
    } catch {
      return []
    }
  },

  // Get detailed registration data
  getRegistrationData(): EventRegistrationData[] {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REGISTERED_EVENTS)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  },

  // Check if user is registered for a specific event
  isRegistered(eventId: string): boolean {
    return this.getRegisteredEvents().includes(eventId)
  },

  // Register for an event
  register(eventId: string, eventTitle: string): void {
    if (typeof window === 'undefined') return
    try {
      const existing = this.getRegistrationData()
      const newRegistration: EventRegistrationData = {
        eventId,
        registeredAt: new Date().toISOString(),
        eventTitle,
      }
      
      // Remove existing registration if it exists, then add new one
      const updated = existing.filter(item => item.eventId !== eventId)
      updated.push(newRegistration)
      
      localStorage.setItem(STORAGE_KEYS.REGISTERED_EVENTS, JSON.stringify(updated))
    } catch (error) {
      console.error('Failed to save registration:', error)
    }
  },

  // Unregister from an event
  unregister(eventId: string): void {
    if (typeof window === 'undefined') return
    try {
      const existing = this.getRegistrationData()
      const updated = existing.filter(item => item.eventId !== eventId)
      localStorage.setItem(STORAGE_KEYS.REGISTERED_EVENTS, JSON.stringify(updated))
    } catch (error) {
      console.error('Failed to remove registration:', error)
    }
  },

  // Clear all registrations
  clearAll(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEYS.REGISTERED_EVENTS)
  }
}

// Event Favorites Storage
export const eventFavoritesStorage = {
  // Get all favorited event IDs
  getFavoritedEvents(): string[] {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAVORITED_EVENTS)
      return stored ? JSON.parse(stored).map((item: EventFavoriteData) => item.eventId) : []
    } catch {
      return []
    }
  },

  // Check if event is favorited
  isFavorited(eventId: string): boolean {
    return this.getFavoritedEvents().includes(eventId)
  },

  // Add to favorites
  addFavorite(eventId: string, eventTitle: string): void {
    if (typeof window === 'undefined') return
    try {
      const existing = this.getFavoriteData()
      const newFavorite: EventFavoriteData = {
        eventId,
        favoritedAt: new Date().toISOString(),
        eventTitle,
      }
      
      // Remove existing favorite if it exists, then add new one
      const updated = existing.filter(item => item.eventId !== eventId)
      updated.push(newFavorite)
      
      localStorage.setItem(STORAGE_KEYS.FAVORITED_EVENTS, JSON.stringify(updated))
    } catch (error) {
      console.error('Failed to save favorite:', error)
    }
  },

  // Remove from favorites
  removeFavorite(eventId: string): void {
    if (typeof window === 'undefined') return
    try {
      const existing = this.getFavoriteData()
      const updated = existing.filter(item => item.eventId !== eventId)
      localStorage.setItem(STORAGE_KEYS.FAVORITED_EVENTS, JSON.stringify(updated))
    } catch (error) {
      console.error('Failed to remove favorite:', error)
    }
  },

  // Get detailed favorite data
  getFavoriteData(): EventFavoriteData[] {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAVORITED_EVENTS)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  },

  // Clear all favorites
  clearAll(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEYS.FAVORITED_EVENTS)
  }
}


