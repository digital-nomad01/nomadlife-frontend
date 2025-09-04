'use client'
import { Phone, Globe, MapPin, MessageCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BikeRental } from "./type"
import Image from "next/image"

interface BikeRentalCardProps {
  rental: BikeRental
  className?: string
}

export default function BikeRentalCard({ rental, className }: BikeRentalCardProps) {
  const handlePhoneClick = (phone: string) => {
    window.open(`tel:${phone}`, '_self')
  }

  const handleWebsiteClick = (website: string) => {
    window.open(website, '_blank', 'noopener,noreferrer')
  }

  const handleSupportClick = (support: string) => {
    if (support.includes('app') || support.includes('App')) {
      // For app-based support, show info or redirect to app store
      alert('Please download the EasyRenty mobile app for support')
    } else {
      // For other support methods
      window.open(support, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${className}`}>
      <div className="relative aspect-video bg-gray-200">
        <Image
          src={rental.image}
          alt={rental.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        {/* Featured Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-coral-500 text-white border-none">
            Bike Rental
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{rental.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{rental.description}</p>
        </div>

        {/* Contact Information */}
        <div className="space-y-3 mb-6">
          {rental.contact.phone && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-coral-500" />
                <span className="text-sm text-gray-600">Phone</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePhoneClick(rental.contact.phone!)}
                className="text-coral-600 hover:text-coral-700 p-0 h-auto font-medium"
              >
                {rental.contact.phone}
              </Button>
            </div>
          )}

          {rental.contact.website && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-coral-500" />
                <span className="text-sm text-gray-600">Website</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleWebsiteClick(rental.contact.website!)}
                className="text-coral-600 hover:text-coral-700 p-0 h-auto font-medium"
              >
                Visit Site
              </Button>
            </div>
          )}

          {rental.contact.address && (
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-coral-500 mt-0.5" />
                <span className="text-sm text-gray-600">Address</span>
              </div>
              <div className="text-sm text-gray-700 text-right max-w-[60%]">
                {rental.contact.address}
              </div>
            </div>
          )}

          {rental.contact.support && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-coral-500" />
                <span className="text-sm text-gray-600">Support</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSupportClick(rental.contact.support!)}
                className="text-coral-600 hover:text-coral-700 p-0 h-auto font-medium text-right max-w-[60%]"
              >
                <span className="text-xs">{rental.contact.support}</span>
              </Button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {rental.contact.phone && (
            <Button 
              className="flex-1 bg-coral-500 hover:bg-coral-600 text-white"
              onClick={() => handlePhoneClick(rental.contact.phone!)}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
          )}
          {rental.contact.website && (
            <Button 
              variant="outline" 
              className="flex-1 border-coral-500 text-coral-600 hover:bg-coral-50"
              onClick={() => handleWebsiteClick(rental.contact.website!)}
            >
              <Globe className="h-4 w-4 mr-2" />
              Visit Website
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}