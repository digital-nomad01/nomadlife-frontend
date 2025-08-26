export interface SpaceOffer {
  id: string
  space_id: string
  name: string
  description?: string
  price?: number
  currency: string
  capacity?: number
  available: boolean
  created_at: string
  updated_at: string
}

export interface SpaceImage {
  id: string
  space_id: string
  path: string
  alt?: string
  position?: number
  created_at: string
}

export interface SpaceReview {
  id: string
  space_id: string
  author_name?: string
  rating: number
  title?: string
  content?: string
  created_at: string
}

export interface SpaceRating {
  space_id: string
  average_rating: number
  review_count: number
}

export interface SpaceAttraction {
  id: string
  space_id: string
  name: string
  description?: string
  distance_km?: number
  category?: string
  latitude?: number
  longitude?: number
  website?: string
  created_at: string
}

export type SpaceType = 'coworking_space' | 'coworking_cafe' | 'coliving_space'
export type SpaceStatus = 'draft' | 'published' | 'archived'

export interface Space {
  id: string
  name: string
  space_type: SpaceType
  short_description: string
  content?: string
  
  location: string
  address?: string
  latitude?: number
  longitude?: number
  
  amenities: string[]
  options: string[]
  
  opening_time?: string
  closing_time?: string
  capacity?: number
  price_from?: number
  allow_booking: boolean
  
  wifi_speed_mbps?: number
  weather_condition?: string
  
  contact_email?: string
  contact_phone?: string
  website?: string
  instagram?: string
  facebook?: string
  whatsapp?: string
  
  status: SpaceStatus
  tags: string[]
  image?: string
  
  created_at: string
  updated_at: string
  
  // Related data (populated via joins)
  offers?: SpaceOffer[]
  images?: SpaceImage[]
  reviews?: SpaceReview[]
  attractions?: SpaceAttraction[]
  rating?: SpaceRating
  
  // Computed fields
  average_rating?: number
  review_count?: number
}

// Space inquiry interface
export interface SpaceInquiry {
  id: string
  space_id: string
  contact_name: string
  contact_email: string
  contact_phone?: string
  check_in_date?: string
  check_out_date?: string
  offer_id?: string
  message?: string
  status: 'pending' | 'responded' | 'booked' | 'cancelled'
  created_at: string
  updated_at: string
}
