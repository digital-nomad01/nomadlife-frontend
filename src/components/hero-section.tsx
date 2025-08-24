import {  Mountain, Search } from "lucide-react"
import { Badge } from "./ui/badge"
import { Card } from "./ui/card"
import { Button } from "./ui/button"

export default function HeroSection() {
  return (
   
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Mountain className="h-8 w-8 text-coral-500 mr-3" />
          <Badge variant="secondary" className="text-sm">
            🇳🇵 Now in Nepal
          </Badge>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Work from the Himalayas
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Discover Nepal&apos;s best coworking spaces in Pokhara and Kathmandu.
          Experience breathtaking mountain views while building your remote
          career.
        </p>

        {/* Simple Search */}
        <div className="max-w-md mx-auto">
          <Card className="p-2 shadow-xl">
            <div className="flex items-center">
              <div className="flex-1 p-4">
                <select className="w-full text-sm text-gray-600 bg-transparent border-none outline-none">
                  <option value="">Choose your destination</option>
                  <option value="pokhara">Pokhara - Lake City</option>
                  <option value="kathmandu">Kathmandu - Capital</option>
                </select>
              </div>
              <Button className="bg-coral-500 hover:bg-coral-600 text-white rounded-full h-12 w-12 p-0 mr-2">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-2xl font-bold text-coral-500">5</div>
          <div className="text-sm text-gray-600">Workspaces</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-coral-500">2</div>
          <div className="text-sm text-gray-600">Cities</div>
        </div>
    
        <div className="text-center">
          <div className="text-2xl font-bold text-coral-500">50+</div>
          <div className="text-sm text-gray-600">Nomads</div>
        </div>
      </div>
    </div>
  </section>
  )
}
