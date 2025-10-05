export interface HealthcareContact {
  website?: string
  phone?: string
  email?: string
  emergency?: string
  ambulance?: string
  heli?: string
  address?: string
}

export interface HealthcareService {
  name: string
  description: string
  icon?: string
}

export interface Healthcare {
  id: string
  name: string
  image: string
  description: string
  contact: HealthcareContact
  services?: HealthcareService[]
  specialties?: string[]
  emergency_available?: boolean
  international_patients?: boolean
  pricing?: {
    consultation?: string
    emergency?: string
    packages?: string
  }
}
