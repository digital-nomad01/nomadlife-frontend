"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Wifi,
  Clock,
  Users,
  Coffee,
  Shield,
  Heart,
  Share,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  ChevronLeft,
  ExternalLink,
  Zap,
  Printer,
  Sun,
  Mountain,
  Utensils,
  DollarSign,
  Navigation,
} from "lucide-react"
import ImageCarousel from "./image-carousel"
import Link from "next/link"
import PageTracker from "./page-tracker"

interface Workspace {
  id: number
  slug: string
  name: string
  location: string
  type: string
  images: string[]
  wifi: string
  price: string
  rating: string
  reviews: number
  features: string[]
  description: string
  fullDescription: string
  amenities: Array<{
    name: string
    description: string
    icon: string
  }>
  pricing: Array<{
    type: string
    price: number
    description: string
  }>
  hours: string
  contact: {
    phone: string
    email: string
    website: string
    address: string
  }
  coordinates: {
    lat: number
    lng: number
  }
  nearbyAttractions: string[]
}

interface WorkspaceDetailProps {
  workspace: Workspace
}

const iconMap: { [key: string]: any } = {
  Wifi,
  Clock,
  Users,
  Coffee,
  Shield,
  Zap,
  Printer,
  Sun,
  Mountain,
  Utensils,
}

export default function WorkspaceDetail({ workspace }: WorkspaceDetailProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <PageTracker pageType="workspace" pageData={{ id: workspace.id.toString(), name: workspace.name, location: workspace.location, category: workspace.type, slug: workspace.slug }} />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Search
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
          {/* Image Gallery */}
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden">
              <ImageCarousel images={workspace.images} alt={workspace.name} className="w-full h-full" />
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-gray-900">${workspace.price}</div>
                  <div className="text-sm text-gray-600">per day</div>
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
                  <Button variant="ghost" size="sm">
                    <Share className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm font-medium">Check availability</span>
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Wifi className="h-5 w-5 text-green-500 mx-auto mb-1" />
                    <div className="text-sm font-bold">{workspace.wifi} Mbps</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                    <div className="text-sm font-bold">
                      {workspace.rating} ({workspace.reviews})
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white" size="lg">
                  Book Now
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Directly
                </Button>
              </div>

              <div className="mt-4 text-center text-sm text-gray-600">Free cancellation • No booking fees</div>
            </Card>
          </div>
        </div>

        {/* Workspace Info */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{workspace.name}</h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{workspace.location}, Nepal</span>
                </div>
                <Badge variant="secondary">{workspace.type}</Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-semibold">{workspace.rating}</span>
                  <span className="text-gray-500 ml-1">({workspace.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">{workspace.description}</p>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-2">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">About This Workspace</h3>
              <div className="prose prose-gray max-w-none">
                {workspace.fullDescription.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Hours</div>
                    <div className="text-sm text-gray-600">{workspace.hours}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Wifi className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium">WiFi Speed</div>
                    <div className="text-sm text-gray-600">{workspace.wifi} Mbps</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Capacity</div>
                    <div className="text-sm text-gray-600">Up to 30 people</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Starting Price</div>
                    <div className="text-sm text-gray-600">${workspace.price}/day</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Amenities Tab */}
          <TabsContent value="amenities" className="space-y-6 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workspace.amenities.map((amenity, index) => {
                const IconComponent = iconMap[amenity.icon] || Coffee
                return (
                  <Card key={index} className="p-4">
                    <div className="flex items-start space-x-3">
                      <IconComponent className="h-6 w-6 text-coral-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{amenity.name}</h4>
                        <p className="text-sm text-gray-600">{amenity.description}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {workspace.pricing.map((plan, index) => (
                <Card key={index} className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">{plan.type}</h3>
                  <div className="text-3xl font-bold text-coral-500 mb-2">${plan.price}</div>
                  <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                  <Button className="w-full">Select Plan</Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Location Tab */}
          <TabsContent value="location" className="space-y-6 mt-2">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Location & Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Address</h4>
                  <p className="text-gray-700 mb-4">{workspace.contact.address}</p>

                  <h4 className="font-semibold mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{workspace.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{workspace.contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{workspace.contact.website}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Nearby Attractions</h4>
                  <div className="space-y-2">
                    {workspace.nearbyAttractions.map((attraction, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Navigation className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{attraction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sample reviews */}
              {[
                {
                  name: "Alex Johnson",
                  rating: 5,
                  date: "2 weeks ago",
                  comment:
                    "Amazing workspace with incredible lake views. The WiFi is super fast and the community here is fantastic. Highly recommend for any nomad visiting Pokhara!",
                },
                {
                  name: "Maria Santos",
                  rating: 4,
                  date: "1 month ago",
                  comment:
                    "Great location and facilities. The mountain views are breathtaking and really help with productivity. Coffee could be better but overall excellent experience.",
                },
              ].map((review, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold">{review.name}</div>
                        <div className="text-sm text-gray-600">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Similar Workspaces */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Workspaces in {workspace.location}</h2>
          <div className="text-center py-8 text-gray-600">
            <p>More workspaces coming soon...</p>
            <Button variant="outline" className="mt-4">
              <ExternalLink className="h-4 w-4 mr-2" />
              List Your Space
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
