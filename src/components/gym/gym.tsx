'use client'
import { Gym } from "./type"
import GymCard from "./gym-card"
import Footer from "@/components/footer"
import PageTracker from "@/components/page-tracker"
import { ChevronLeft, Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface GymsProps {
  gyms: Gym[]
}

export default function Gyms({ gyms }: GymsProps) {
  return (
    <div className="min-h-screen bg-white">
      <PageTracker pageType="gym" pageData={{ category: 'fitness' }} />
      
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
                List Your Gym
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
              backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3')`,
            }}
          />
          
          {/* Clean Overlay */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Simple Badge */}
            <div className="inline-flex items-center bg-coral-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-xl">
              <Dumbbell className="mr-2 h-4 w-4" />
              Fitness Centers in Pokhara
            </div>
            
            {/* Clean Typography */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Stay Fit
              <span className="block text-coral-400">While You Travel</span>
            </h1>
            
            {/* Simple Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              From state-of-the-art fitness centers to outdoor training spots.
              Maintain your fitness routine during your nomadic journey in Pokhara.
            </p>

            {/* Consistent Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg" 
                className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-200"
                onClick={() => document.getElementById('fitness-centers')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse Gyms
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold backdrop-blur-sm bg-white/10 transition-all duration-200"
                onClick={() => document.getElementById('workout-spots')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Outdoor Spots
              </Button>
            </div>

            {/* Clean Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{gyms.length}+</div>
                <div className="text-sm text-white/80 font-medium">Fitness Centers</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-sm text-white/80 font-medium">Access Available</div>
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
        {/* Workout Spots Section */}
        <div id="workout-spots" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Workout Spots in Pokhara</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-coral-500 text-2xl mb-4">🏔️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lakeside Jogging Path</h3>
              <p className="text-gray-600 mb-4 text-sm">A scenic 5km running route around Phewa Lake with beautiful mountain views. Perfect for morning jogs and outdoor workouts.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">5 km • Free</span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    const mapsUrl = "https://www.google.com/maps/search/phewa+lake+jogging+path+pokhara/@28.2096,83.9556,15z";
                    window.open(mapsUrl, '_blank');
                  }}
                >
                  View Location
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-coral-500 text-2xl mb-4">🧘</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">World Peace Pagoda</h3>
              <p className="text-gray-600 mb-4 text-sm">Hike up to the Peace Pagoda for a challenging workout with panoramic views. Great for meditation and yoga sessions.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">2 km hike • Free</span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    const mapsUrl = "https://www.google.com/maps/search/world+peace+pagoda+pokhara/@28.2096,83.9456,14z";
                    window.open(mapsUrl, '_blank');
                  }}
                >
                  View Location
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-coral-500 text-2xl mb-4">🏃</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sarangkot Hill Run</h3>
              <p className="text-gray-600 mb-4 text-sm">Intense hill run to Sarangkot viewpoint. Perfect for advanced runners looking for a challenging cardiovascular workout.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">8 km • Challenging</span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    const mapsUrl = "https://www.google.com/maps/search/sarangkot+hill+run+pokhara/@28.2396,83.9456,14z";
                    window.open(mapsUrl, '_blank');
                  }}
                >
                  View Location
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Fitness Centers Grid */}
        <div id="fitness-centers" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Available Fitness Centers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {gyms.map((gym) => (
              <GymCard key={gym.id} gym={gym} />
            ))}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-gray-50 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Stay Fit in Pokhara?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏔️</div>
              <h4 className="font-semibold text-gray-900 mb-2">Mountain Air</h4>
              <p className="text-gray-600 text-sm">Train at altitude with fresh Himalayan air, improving your endurance and overall fitness performance.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💪</div>
              <h4 className="font-semibold text-gray-900 mb-2">Modern Equipment</h4>
              <p className="text-gray-600 text-sm">Access state-of-the-art fitness equipment and professional trainers to maintain your routine.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🧘</div>
              <h4 className="font-semibold text-gray-900 mb-2">Mind & Body</h4>
              <p className="text-gray-600 text-sm">Combine fitness with meditation and yoga in one of the world's most serene environments.</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🌅</div>
              <h4 className="font-semibold text-gray-900 mb-2">Outdoor Adventures</h4>
              <p className="text-gray-600 text-sm">Mix indoor workouts with hiking, trekking, and outdoor activities for a complete fitness experience.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

