"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  Phone, 
  Wifi,
  Star,
  Clock,
  Users,
  MapPin,
  BookOpen
} from "lucide-react"
import { Space } from "@/types/space"
import { SpaceBookingModal } from "./space-booking-modal"
import { ShareButton } from "./share-button"

interface SpaceBookingCardProps {
  space: Space
  isFavorited: boolean
  setIsFavorited: (favorited: boolean) => void
  onContactDirectly?: () => void
}

export function SpaceBookingCard({ 
  space, 
  isFavorited, 
  setIsFavorited,
  onContactDirectly
}: SpaceBookingCardProps) {
  const [showBookingModal, setShowBookingModal] = useState(false)

  const formatPrice = (price?: number) => price ? `$${price}` : 'Contact for pricing'

  const handleBookingClick = () => {
    if (space.allow_booking) {
      setShowBookingModal(true)
    }
  }

  const handleContactDirectly = () => {
    if (onContactDirectly) {
      onContactDirectly()
    } else {
      // Fallback contact logic
      if (space.contact_phone) {
        window.open(`tel:${space.contact_phone}`, '_self')
      } else if (space.contact_email) {
        window.open(`mailto:${space.contact_email}`, '_self')
      } else if (space.whatsapp) {
        window.open(`https://wa.me/${space.whatsapp}`, '_blank')
      }
    }
  }

  const onBookingSuccess = () => {
    console.log('Booking request submitted successfully!')
  }

  return (
    <>
      <Card className="sticky top-24 p-6">
        {/* Price and Actions */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(space.price_from)}
            </div>
            {space.price_from && (
              <div className="text-sm text-gray-600">per day</div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFavorited(!isFavorited)}
              className={isFavorited ? "text-red-500" : "text-gray-500"}
            >
              <Heart className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`} />
            </Button>
            
            <ShareButton
              spaceId={space.id}
              spaceName={space.name}
              location={space.location}
              variant="ghost"
              size="sm"
            />
          </div>
        </div>

        {/* Quick Info */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-3">
            {space.wifi_speed_mbps && (
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Wifi className="h-5 w-5 text-green-500 mx-auto mb-1" />
                <div className="text-sm font-bold">{space.wifi_speed_mbps} Mbps</div>
              </div>
            )}
            {space.average_rating && space.average_rating > 0 && (
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                <div className="text-sm font-bold">
                  {space.average_rating.toFixed(1)} ({space.review_count || 0})
                </div>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="space-y-2 text-sm">
            {space.opening_time && space.closing_time && (
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{space.opening_time} - {space.closing_time}</span>
              </div>
            )}
            {space.capacity && (
              <div className="flex items-center text-gray-600">
                <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>Up to {space.capacity} people</span>
              </div>
            )}
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{space.location}</span>
            </div>
          </div>

          {/* Space Type Badge */}
          <div className="flex items-center justify-center">
            <Badge variant="outline" className="capitalize">
              {space.space_type.replace('_', ' ')}
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-coral-500 hover:bg-coral-600 text-white"
            size="lg"
            onClick={handleBookingClick}
            disabled={!space.allow_booking}
          >
            {space.allow_booking ? (
              <>
                <BookOpen className="h-4 w-4 mr-2" />
                Book Now
              </>
            ) : (
              <>
                <Phone className="h-4 w-4 mr-2" />
                Contact Only
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            size="lg"
            onClick={handleContactDirectly}
            disabled={!space.contact_phone && !space.contact_email && !space.whatsapp}
          >
            <Phone className="h-4 w-4 mr-2" />
            Contact Directly
          </Button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          {space.allow_booking 
            ? 'Instant booking request • Quick response guaranteed' 
            : 'Contact for availability and pricing'
          }
        </div>
      </Card>

      <SpaceBookingModal
        spaceId={space.id}
        spaceName={space.name}
        offers={space.offers || []}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onSuccess={onBookingSuccess}
      />
    </>
  )
}