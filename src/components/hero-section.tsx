import { Mountain, Search } from "lucide-react"
import { Badge } from "./ui/badge"
import { Card } from "./ui/card"
import { Button } from "./ui/button"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg.jpg')",
        }}
      />
      
      {/* Much stronger dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Additional gradient overlay for even better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Mountain className="h-8 w-8 text-white mr-3 drop-shadow-2xl" />
            <Badge variant="secondary" className="text-sm bg-white text-gray-900 shadow-lg">
              🇳🇵 Now in Nepal
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            Work from the
            <span className="block text-coral-500 drop-shadow-2xl">
              Himalayas
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-10 drop-shadow-xl leading-relaxed font-medium">
            Discover Nepal's best coworking spaces in Pokhara and Kathmandu.
            Experience breathtaking mountain views while building your remote career.
          </p>

          {/* Enhanced Search Card */}
          <div className="max-w-lg mx-auto mb-12">
            <Card className="p-3 shadow-2xl bg-white border-0">
              <div className="flex items-center">
                <div className="flex-1 p-4">
                  <select className="w-full text-base text-gray-700 bg-transparent border-none outline-none font-medium">
                    <option value="">Choose your destination</option>
                    <option value="pokhara">🏔️ Pokhara - Lake City</option>
                    <option value="kathmandu">🏛️ Kathmandu - Capital</option>
                  </select>
                </div>
                <Button className="bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white rounded-full h-14 w-14 p-0 mr-2 shadow-lg hover:shadow-xl transition-all duration-200">
                  <Search className="h-6 w-6" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Enhanced Stats with solid background for better visibility */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/30 shadow-xl">
              <div className="text-3xl font-bold text-white drop-shadow-xl">5</div>
              <div className="text-sm text-white font-medium drop-shadow-lg">Workspaces</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/30 shadow-xl">
              <div className="text-3xl font-bold text-white drop-shadow-xl">2</div>
              <div className="text-sm text-white font-medium drop-shadow-lg">Cities</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/30 shadow-xl md:col-span-1 col-span-2">
              <div className="text-3xl font-bold text-white drop-shadow-xl">50+</div>
              <div className="text-sm text-white font-medium drop-shadow-lg">Nomads</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center shadow-lg">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
