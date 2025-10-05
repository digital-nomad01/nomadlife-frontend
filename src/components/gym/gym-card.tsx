'use client'
import { Phone, Globe, MapPin, MessageCircle, Dumbbell } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gym } from "./type"
import Image from "next/image"

interface GymCardProps {
  gym: Gym
  className?: string
}

export default function GymCard({ gym, className }: GymCardProps) {
  const handlePhoneClick = (phone: string) => {
    window.open(`tel:${phone}`, '_self')
  }

  const handleWebsiteClick = (website: string) => {
    window.open(website, '_blank', 'noopener,noreferrer')
  }

  const handleSupportClick = (support: string) => {
    if (support.includes('app') || support.includes('App')) {
      alert('Please download the app for support')
    } else {
      window.open(support, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${className}`}>
      <div className="relative aspect-video bg-gray-200">
        <Image
          src={gym.image}
          alt={gym.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        {/* Featured Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-coral-500 text-white border-none">
            <Dumbbell className="h-3 w-3 mr-1" />
            Fitness Center
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{gym.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{gym.description}</p>
        </div>

        {/* Amenities */}
        {gym.amenities && gym.amenities.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Amenities</h4>
            <div className="flex flex-wrap gap-1">
              {gym.amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {gym.amenities.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{gym.amenities.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Pricing */}
        {gym.pricing && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Pricing</h4>
            <div className="flex space-x-4 text-sm">
              {gym.pricing.daily && (
                <div className="text-center">
                  <div className="font-medium text-coral-600">{gym.pricing.daily}</div>
                  <div className="text-gray-500">Daily</div>
                </div>
              )}
              {gym.pricing.weekly && (
                <div className="text-center">
                  <div className="font-medium text-coral-600">{gym.pricing.weekly}</div>
                  <div className="text-gray-500">Weekly</div>
                </div>
              )}
              {gym.pricing.monthly && (
                <div className="text-center">
                  <div className="font-medium text-coral-600">{gym.pricing.monthly}</div>
                  <div className="text-gray-500">Monthly</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="space-y-3 mb-6">
          {gym.contact.phone && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-coral-500" />
                <span className="text-sm text-gray-600">Phone</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePhoneClick(gym.contact.phone!)}
                className="text-coral-600 hover:text-coral-700 p-0 h-auto font-medium"
              >
                {gym.contact.phone}
              </Button>
            </div>
          )}

          {gym.contact.website && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-coral-500" />
                <span className="text-sm text-gray-600">Website</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleWebsiteClick(gym.contact.website!)}
                className="text-coral-600 hover:text-coral-700 p-0 h-auto font-medium"
              >
                Visit Site
              </Button>
            </div>
          )}

          {gym.contact.address && (
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-coral-500 mt-0.5" />
                <span className="text-sm text-gray-600">Address</span>
              </div>
              <div className="text-sm text-gray-700 text-right max-w-[60%]">
                {gym.contact.address}
              </div>
            </div>
          )}

          {gym.contact.support && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-coral-500" />
                <span className="text-sm text-gray-600">Support</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSupportClick(gym.contact.support!)}
                className="text-coral-600 hover:text-coral-700 p-0 h-auto font-medium text-right max-w-[60%]"
              >
                <span className="text-xs">{gym.contact.support}</span>
              </Button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {gym.contact.phone && (
            <Button 
              className="flex-1 bg-coral-500 hover:bg-coral-600 text-white"
              onClick={() => handlePhoneClick(gym.contact.phone!)}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
          )}
          {gym.contact.website && (
            <Button 
              variant="outline" 
              className="flex-1 border-coral-500 text-coral-600 hover:bg-coral-50"
              onClick={() => handleWebsiteClick(gym.contact.website!)}
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

