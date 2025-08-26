export interface WorkspaceCategory {
  id: string
  name: string
  description?: string
  icon?: string
  created_at: string
}

export interface Location {
  id: string
  name: string
  country: string
  country_code: string
  latitude?: number
  longitude?: number
  timezone?: string
  currency?: string
  description?: string
  image_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface WorkspaceImage {
  id: string
  workspace_id: string
  image_url: string
  alt_text?: string
  display_order: number
  is_primary: boolean
  created_at: string
}

export interface Amenity {
  id: string
  name: string
  icon?: string
  category?: string
  created_at: string
}

export interface Review {
  id: string
  workspace_id: string
  user_id?: string
  rating: number
  comment?: string
  reviewer_name?: string
  reviewer_email?: string
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface Inquiry {
  id: string
  workspace_id: string
  user_id?: string
  contact_name: string
  contact_email: string
  contact_phone?: string
  check_in_date?: string
  check_out_date?: string
  message?: string
  status: 'pending' | 'responded' | 'booked' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface Workspace {
  id: string
  name: string
  slug: string
  location_id: string
  category_id?: string
  main_image_url?: string
  price_per_day?: number
  rating: number
  total_reviews: number
  wifi_speed?: number
  short_description?: string
  long_description?: string
  address?: string
  phone?: string
  email?: string
  website?: string
  is_active: boolean
  is_featured: boolean
  verified_at?: string
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
  
  // Related data (populated via joins)
  location?: Location
  category?: WorkspaceCategory
  images?: WorkspaceImage[]
  amenities?: Amenity[]
  reviews?: Review[]
  
  // Computed fields
  inquiry_count?: number
  average_rating?: number
}

// For backward compatibility with existing components
export interface LegacyWorkspace {
  id: number
  images: string[]
  name: string
  location: string
  type: string
  wifi: string
  price: string
  slug: string
  rating: string
  features: string[]
  description: string
}
