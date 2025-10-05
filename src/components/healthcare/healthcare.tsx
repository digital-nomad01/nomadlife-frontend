'use client'
import { Healthcare } from "./type"
import HealthcareCard from "./healthcare-card"
import Footer from "@/components/footer"
import PageTracker from "@/components/page-tracker"
import { ChevronLeft, Heart, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HealthcareProps {
  providers: Healthcare[]
}

export default function HealthcareServices({ providers }: HealthcareProps) {
  return (
    <div className="min-h-screen bg-white">
      <PageTracker pageType="healthcare" pageData={{ category: 'medical' }} />
      
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
                Emergency: +977 61591441
              </Button>
              <Button className="bg-coral-500 hover:bg-coral-600 text-white">Get Help</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://plus.unsplash.com/premium_photo-1672760403439-bf51a26c1ae6?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        />
        
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-coral-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-xl">
            <Heart className="mr-2 h-4 w-4" />
            Healthcare Services in Pokhara
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Your Health
            <span className="block text-coral-400">Our Priority</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            Access quality healthcare services while traveling. From emergency care to routine checkups,
            we've got you covered in Pokhara.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-semibold shadow-xl"
              onClick={() => window.open('tel:+977 61591441', '_self')}
            >
              Emergency Call
            </Button>
            <Button 
              size="lg" 
              className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-4 text-lg font-semibold shadow-xl"
              onClick={() => document.getElementById('healthcare-providers')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Find Healthcare
            </Button>
          </div>

          {/* Emergency Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Phone className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-lg font-bold text-white mb-1">24/7 Emergency</div>
              <div className="text-sm text-white/80">+977 61591441</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Heart className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-lg font-bold text-white mb-1">Ambulance</div>
              <div className="text-sm text-white/80">+977 9851353499</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Clock className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-lg font-bold text-white mb-1">Heli Rescue</div>
              <div className="text-sm text-white/80">+977 9851171975</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Healthcare Providers */}
        <div id="healthcare-providers" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Healthcare Providers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {providers.map((provider) => (
              <HealthcareCard key={provider.id} healthcare={provider} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
