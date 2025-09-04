'use client'
import { BikeRental } from "./type"
import BikeRentalCard from "./bike-rental-card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import PageTracker from "@/components/page-tracker"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BikeRentalsProps {
  rentals: BikeRental[]
}

export default function BikeRentals({ rentals }: BikeRentalsProps) {
  return (
    <div className="min-h-screen bg-white">
      <PageTracker pageType="bike-rental" pageData={{ category: 'bike-rental' }} />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="text-2xl font-bold text-coral-500">NomadLife</div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700">
                List Your Service
              </Button>
              <Button className="bg-coral-500 hover:bg-coral-600 text-white">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bike Rentals in Pokhara
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore Pokhara's stunning landscapes on two wheels. From mountain bikes for trail adventures 
            to scooters for city cruising, find the perfect ride for your nomadic journey.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-coral-500 mb-2">{rentals.length}+</div>
            <div className="text-gray-600">Rental Services</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-coral-500 mb-2">24/7</div>
            <div className="text-gray-600">Available Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-coral-500 mb-2">100%</div>
            <div className="text-gray-600">Verified Services</div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Available Rental Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {rentals.map((rental) => (
              <BikeRentalCard key={rental.id} rental={rental} />
            ))}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-gray-50 rounded-xl p-8 mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Bike Rentals in Pokhara?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🏔️ Scenic Routes</h4>
              <p className="text-gray-600 text-sm">Experience breathtaking views of the Annapurna range while exploring Pokhara's beautiful landscapes.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🚴 Eco-Friendly</h4>
              <p className="text-gray-600 text-sm">Reduce your carbon footprint while discovering the city's hidden gems and local culture.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">💰 Affordable</h4>
              <p className="text-gray-600 text-sm">Cost-effective transportation with flexible daily, weekly, and monthly rental options.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🛡️ Safe & Reliable</h4>
              <p className="text-gray-600 text-sm">Well-maintained bikes and scooters with safety gear included and insurance options available.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}