'use client'
import { BikeRental } from "./type"
import BikeRentalCard from "./bike-rental-card"
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

      {/* Clean Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1502744688674-c619d1586c9e?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3')`,
            }}
          />
          
          {/* Clean Overlay */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Simple Badge */}
            <div className="inline-flex items-center bg-coral-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-xl">
              <span className="mr-2">🚴</span>
              Bike Rentals in Pokhara
            </div>
            
            {/* Clean Typography */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Explore Pokhara
              <span className="block text-coral-400">on Two Wheels</span>
            </h1>
            
            {/* Simple Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              From mountain bikes for trail adventures to scooters for city cruising.
              Find the perfect ride for your nomadic journey.
            </p>

            {/* Consistent Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg" 
                className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-200"
                onClick={() => document.getElementById('rental-services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse Rentals
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold backdrop-blur-sm bg-white/10 transition-all duration-200"
                onClick={() => document.getElementById('popular-routes')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Routes
              </Button>
            </div>

            {/* Clean Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{rentals.length}+</div>
                <div className="text-sm text-white/80 font-medium">Rental Services</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-sm text-white/80 font-medium">Support</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-sm text-white/80 font-medium">Verified</div>
              </div>
            </div>
          </div>

          {/* Simple Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center bg-white/10">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </div>
        </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Routes Section */}
        <div id="popular-routes" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Cycling Routes in Pokhara</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-coral-500 text-2xl mb-4">🏔️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lakeside Loop</h3>
              <p className="text-gray-600 mb-4 text-sm">A scenic 8km route around Phewa Lake with stunning mountain views and lakeside cafés. Perfect for leisure cycling.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">8 km • Easy</span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    const mapsUrl = "https://www.google.com/maps/dir/Phewa+Lake,+Pokhara/Lakeside,+Pokhara/@28.2096,83.9556,15z";
                    window.open(mapsUrl, '_blank');
                  }}
                >
                  View Route
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-coral-500 text-2xl mb-4">🚵</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sarangkot Trail</h3>
              <p className="text-gray-600 mb-4 text-sm">Challenging 15km climb to Sarangkot viewpoint. Reward yourself with panoramic Himalayan views and sunrise spots.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">15 km • Hard</span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    const mapsUrl = "https://www.google.com/maps/dir/Lakeside,+Pokhara/Sarangkot,+Pokhara/@28.2396,83.9456,14z";
                    window.open(mapsUrl, '_blank');
                  }}
                >
                  View Route
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-coral-500 text-2xl mb-4">🌾</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Village Circuit</h3>
              <p className="text-gray-600 mb-4 text-sm">A 12km route through traditional villages and rice terraces. Experience local culture and rural landscapes.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">12 km • Medium</span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    const mapsUrl = "https://www.google.com/maps/search/village+cycling+routes+pokhara/@28.1996,83.9656,13z";
                    window.open(mapsUrl, '_blank');
                  }}
                >
                  View Route
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div id="rental-services" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Available Rental Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {rentals.map((rental) => (
              <BikeRentalCard key={rental.id} rental={rental} />
            ))}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-gray-50 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose Bike Rentals in Pokhara?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏔️</div>
              <h4 className="font-semibold text-gray-900 mb-2">Scenic Routes</h4>
              <p className="text-gray-600 text-sm">Experience breathtaking views of the Annapurna range while exploring Pokhara's beautiful landscapes.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚴</div>
              <h4 className="font-semibold text-gray-900 mb-2">Eco-Friendly</h4>
              <p className="text-gray-600 text-sm">Reduce your carbon footprint while discovering the city's hidden gems and local culture.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💰</div>
              <h4 className="font-semibold text-gray-900 mb-2">Affordable</h4>
              <p className="text-gray-600 text-sm">Cost-effective transportation with flexible daily, weekly, and monthly rental options.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🛡️</div>
              <h4 className="font-semibold text-gray-900 mb-2">Safe & Reliable</h4>
              <p className="text-gray-600 text-sm">Well-maintained bikes and scooters with safety gear included and insurance options available.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}