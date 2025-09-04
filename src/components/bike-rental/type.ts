export interface BikeRentalContact {
    website?: string
    phone?: string
    email?: string
    support?: string
    address?: string
  }
  
  export interface BikeRental {
    id: string
    name: string
    image: string
    description: string
    contact: BikeRentalContact
  }