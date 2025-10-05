export interface GymContact {
  website?: string
  phone?: string
  email?: string
  support?: string
  address?: string
}

export interface Gym {
  id: string
  name: string
  image: string
  description: string
  contact: GymContact
  amenities?: string[]
  pricing?: {
    daily?: string
    weekly?: string
    monthly?: string
  }
}


