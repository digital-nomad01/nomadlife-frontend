"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import WeatherInfo from "./weather-info"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Wifi,
  Clock,
  Users,
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  Instagram,
  Facebook,
  ChevronLeft,
  Navigation,
  ExternalLink,
  Copy
} from "lucide-react"
import { Space } from "@/types/space"
import AmenityList from "./amenity-list"
import { SpaceBookingCard } from "./space-booking-card"

interface SpaceDetailProps {
  space: Space
}

function getImageUrl(imagePath?: string): string {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/spaces/${imagePath}`
}

// function formatSpaceType(type: string): string {
//   switch (type) {
//     case 'coworking_space':
//       return 'Coworking Space'
//     case 'coworking_cafe':
//       return 'Coworking Café'
//     case 'coliving_space':
//       return 'Coliving Space'
//     default:
//       return type
//   }
// }

function formatPrice(price?: number): string {
  if (!price) return 'Contact for pricing'
  return `$${price}`
}

export default function SpaceDetail({ space }: SpaceDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  
  const allImages = [
    ...(space.image ? [{ path: space.image, alt: space.name }] : []),
    ...(space.images || [])
  ]

  console.log(space)

  const primaryImage = allImages[selectedImageIndex] || allImages[0]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Spaces
                </Button>
              </Link>
              <div className="text-2xl font-bold text-coral-500">NomadLife</div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700">
                List Your Space
              </Button>
              <Button className="bg-coral-500 hover:bg-coral-600 text-white">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Images */}
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500">
              {primaryImage && (
                <Image
                  src={getImageUrl(primaryImage.path)}
                  alt={primaryImage.alt || space.name}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            {/* Image Gallery */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-video rounded-lg overflow-hidden ${
                      selectedImageIndex === index ? 'ring-2 ring-coral-500' : ''
                    }`}
                  >
                    <Image
                      src={getImageUrl(image.path)}
                      alt={image.alt || `${space.name} ${index + 1}`}
                      width={200}
                      height={113}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <SpaceBookingCard 
              space={space}
              isFavorited={isFavorited}
              setIsFavorited={setIsFavorited}
            />
          </div>
        </div>

        {/* Space Info */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{space.name}</h1>
              <div className="flex items-center space-x-4 text-gray-600 mb-3">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{space.location}</span>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {space.space_type.replace('_', ' ')}
                </Badge>
                {/* Add star rating here if available */}
              </div>
              
              {/* Tags right here - prominent but not overwhelming */}
              {space.tags && space.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {space.tags.slice(0, 4).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {space.tags.length > 4 && (
                    <Badge variant="outline" className="text-xs text-gray-500">
                      +{space.tags.length - 4} more
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">{space.short_description}</p>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">About This Space</h3>
              <div className="prose prose-gray max-w-none">
                {space.content ? (
                  <div dangerouslySetInnerHTML={{ __html: space.content }} />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{space.short_description}</p>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Current Weather</h3>
              <WeatherInfo 
                latitude={space.latitude}
                longitude={space.longitude}
                location={space.location}
              />
            </Card>

         


<Card className="p-6">
  <h3 className="text-xl font-semibold mb-4">Quick Info</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Hours */}
    <div className="flex items-center space-x-3">
      <Clock className="h-5 w-5 text-gray-500" />
      <div>
        <div className="font-medium">Hours</div>
        <div className="text-sm text-gray-600">
          {space.opening_time && space.closing_time 
            ? `${space.opening_time} - ${space.closing_time}`
            : '24/7 Access'
          }
        </div>
      </div>
    </div>

    {/* WiFi Speed */}
    {space.wifi_speed_mbps && (
      <div className="flex items-center space-x-3">
        <Wifi className="h-5 w-5 text-gray-500" />
        <div>
          <div className="font-medium">WiFi Speed</div>
          <div className="text-sm text-gray-600">{space.wifi_speed_mbps} Mbps</div>
        </div>
      </div>
    )}

    {/* Capacity */}
    {space.capacity && (
      <div className="flex items-center space-x-3">
        <Users className="h-5 w-5 text-gray-500" />
        <div>
          <div className="font-medium">Capacity</div>
          <div className="text-sm text-gray-600">Up to {space.capacity} people</div>
        </div>
      </div>
    )}

    {/* Starting Price */}
    {space.price_from && (
      <div className="flex items-center space-x-3">
        <div className="h-5 w-5 flex items-center justify-center">
          <span className="text-gray-500 font-bold">$</span>
        </div>
        <div>
          <div className="font-medium">Starting Price</div>
          <div className="text-sm text-gray-600">${space.price_from}/day</div>
        </div>
      </div>
    )}
  </div>
</Card>
          </TabsContent>

          {/* Amenities Tab */}
          <TabsContent value="amenities" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Amenities</h3>
              <AmenityList 
                amenities={space.amenities || []} 
                showDescription={true} 
                layout="cards"
              />
            </Card>

            {space.options && space.options.length > 0 && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Additional Options</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {space.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{option}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Offers Tab */}
          <TabsContent value="offers" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Available Offers</h3>
              {space.offers && space.offers.length > 0 ? (
                <div className="space-y-4">
                  {space.offers.map((offer) => (
                    <div key={offer.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{offer.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">
                            {formatPrice(offer.price)} {offer.currency}
                          </span>
                          {!offer.available && (
                            <Badge variant="secondary" className="bg-red-100 text-red-800">
                              Unavailable
                            </Badge>
                          )}
                        </div>
                      </div>
                      {offer.description && (
                        <p className="text-gray-600 text-sm mb-2">{offer.description}</p>
                      )}
                      {offer.capacity && (
                        <p className="text-gray-500 text-xs">Capacity: {offer.capacity} people</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No specific offers available. Contact for pricing.</p>
              )}
            </Card>
          </TabsContent>

          {/* Location Tab */}
          <TabsContent value="location" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Location & Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                    Address
                  </h4>
                  {space.address ? (
                    <div className="mb-4">
                      <p className="text-gray-700 mb-2">{space.address}</p>
                      <p className="text-gray-600">{space.location}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const address = `${space.address}, ${space.location}`
                            navigator.clipboard.writeText(address)
                          }}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Address
                        </Button>
                        {space.latitude && space.longitude && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const mapsUrl = `https://www.google.com/maps?q=${space.latitude},${space.longitude}`
                              window.open(mapsUrl, '_blank')
                            }}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View on Maps
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 mb-4">{space.location}</p>
                  )}

                  <h4 className="font-semibold mb-3">Contact Information</h4>
                  <div className="space-y-3">
                    {space.contact_phone && (
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <a 
                          href={`tel:${space.contact_phone}`} 
                          className="text-coral-500 hover:underline"
                        >
                          {space.contact_phone}
                        </a>
                      </div>
                    )}
                    {space.contact_email && (
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a 
                          href={`mailto:${space.contact_email}`} 
                          className="text-coral-500 hover:underline"
                        >
                          {space.contact_email}
                        </a>
                      </div>
                    )}
                    {space.website && (
                      <div className="flex items-center space-x-3">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <a 
                          href={space.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-coral-500 hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Social Media Links */}
                  {(space.whatsapp || space.instagram || space.facebook) && (
                    <>
                      <h4 className="font-semibold mb-3 mt-6">Social Media</h4>
                      <div className="space-y-3">
                        {space.whatsapp && (
                          <div className="flex items-center space-x-3">
                            <MessageCircle className="h-4 w-4 text-gray-500" />
                            <a 
                              href={`https://wa.me/${space.whatsapp}`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-coral-500 hover:underline"
                            >
                              WhatsApp
                            </a>
                          </div>
                        )}
                        {space.instagram && (
                          <div className="flex items-center space-x-3">
                            <Instagram className="h-4 w-4 text-gray-500" />
                            <a 
                              href={space.instagram} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-coral-500 hover:underline"
                            >
                              Instagram
                            </a>
                          </div>
                        )}
                        {space.facebook && (
                          <div className="flex items-center space-x-3">
                            <Facebook className="h-4 w-4 text-gray-500" />
                            <a 
                              href={space.facebook} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-coral-500 hover:underline"
                            >
                              Facebook
                            </a>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div>
                  {/* Map placeholder or additional location info */}
                  <h4 className="font-semibold mb-3">Map & Directions</h4>
                  {space.latitude && space.longitude ? (
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 text-sm">Interactive map coming soon</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            const mapsUrl = `https://www.google.com/maps?q=${space.latitude},${space.longitude}`
                            window.open(mapsUrl, '_blank')
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open in Google Maps
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 text-sm">Location details available</p>
                        <p className="text-gray-500 text-xs">Contact for exact coordinates</p>
                      </div>
                    </div>
                  )}

                  {/* Additional Location Info */}
                  <div className="space-y-3">
                    <h5 className="font-medium">Getting There</h5>
                    <div className="text-sm text-gray-600">
                      <p>Located in {space.location}</p>
                      {space.opening_time && space.closing_time && (
                        <p className="flex items-center mt-1">
                          <Clock className="h-4 w-4 mr-2" />
                          Open {space.opening_time} - {space.closing_time}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Nearby Attractions if available */}
                  {space.attractions && space.attractions.length > 0 && (
                    <div className="mt-6">
                      <h5 className="font-medium mb-3">Nearby Attractions</h5>
                      <div className="space-y-2">
                        {space.attractions.slice(0, 5).map((attraction, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Navigation className="h-3 w-3 text-gray-400" />
                            <span className="text-sm text-gray-600">{attraction.name}</span>
                            {attraction.distance_km && (
                              <span className="text-xs text-gray-500">
                                ({attraction.distance_km}km)
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Reviews</h3>
              {space.reviews && space.reviews.length > 0 ? (
                <div className="space-y-4">
                  {space.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">
                            {review.author_name || 'Anonymous'}
                          </span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {review.title && (
                        <h5 className="font-medium text-gray-900 mb-1">{review.title}</h5>
                      )}
                      {review.content && (
                        <p className="text-gray-700 text-sm">{review.content}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No reviews yet. Be the first to review!</p>
              )}
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Information */}
        {/* {(space.contact_email || space.contact_phone || space.website || space.instagram || space.facebook || space.whatsapp) && (
          <Card className="p-6 mt-8">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {space.contact_email && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <a href={`mailto:${space.contact_email}`} className="text-coral-500 hover:underline">
                    {space.contact_email}
                  </a>
                </div>
              )}
              {space.contact_phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <a href={`tel:${space.contact_phone}`} className="text-coral-500 hover:underline">
                    {space.contact_phone}
                  </a>
                </div>
              )}
              {space.website && (
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-gray-500" />
                  <a href={space.website} target="_blank" rel="noopener noreferrer" className="text-coral-500 hover:underline">
                    Website
                  </a>
                </div>
              )}
              {space.whatsapp && (
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-gray-500" />
                  <a href={`https://wa.me/${space.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-coral-500 hover:underline">
                    WhatsApp
                  </a>
                </div>
              )}
              {space.instagram && (
                <div className="flex items-center space-x-3">
                  <Instagram className="h-5 w-5 text-gray-500" />
                  <a href={space.instagram} target="_blank" rel="noopener noreferrer" className="text-coral-500 hover:underline">
                    Instagram
                  </a>
                </div>
              )}
              {space.facebook && (
                <div className="flex items-center space-x-3">
                  <Facebook className="h-5 w-5 text-gray-500" />
                  <a href={space.facebook} target="_blank" rel="noopener noreferrer" className="text-coral-500 hover:underline">
                    Facebook
                  </a>
                </div>
              )}
            </div>
          </Card>
        )} */}
      </div>
    </div>
  )
}
