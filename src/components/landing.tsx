import {
    Search,
    MapPin,
    Wifi,
    Thermometer,
    Clock,
    Phone,
    Star,
    Users,
    Bike,
    Dumbbell,
    Shirt,
    Monitor,
    ChevronRight,
    Heart,
    Calendar,
    Coffee,
    Zap,
    Shield,
    DollarSign,
    Globe,
  } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import { Card, CardContent } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
import ImageCarousel from "./image-carousel"
  
  export default function NomadLifeLanding() {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <div className="text-2xl font-bold text-coral-500">NomadLife</div>
                <nav className="hidden md:flex space-x-6">
                  <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                    Explore
                  </a>
                  <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                    Events
                  </a>
                  <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                    Tools
                  </a>
                  <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                    Community
                  </a>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" className="text-gray-700">
                  Sign In
                </Button>
                <Button className="bg-coral-500 hover:bg-coral-600 text-white">Sign Up</Button>
              </div>
            </div>
          </div>
        </header>
  
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Work. Explore. Live Anywhere.</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the perfect coworking spaces, cafés, and co-living options for your nomadic lifestyle
              </p>
            </div>
  
            {/* Enhanced Search Interface */}
            <div className="max-w-5xl mx-auto">
              {/* Category Tabs */}
              <div className="flex justify-center mb-8">
                <div className="flex bg-white rounded-full p-1 shadow-lg">
                  <button className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gray-900 text-white font-medium">
                    <Monitor className="h-5 w-5" />
                    <span>Workspaces</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 rounded-full text-gray-700 hover:bg-gray-100 font-medium">
                    <Users className="h-5 w-5" />
                    <span>Co-living</span>
                    <Badge variant="secondary" className="ml-1 text-xs">
                      NEW
                    </Badge>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 rounded-full text-gray-700 hover:bg-gray-100 font-medium">
                    <Calendar className="h-5 w-5" />
                    <span>Events</span>
                    <Badge variant="secondary" className="ml-1 text-xs">
                      NEW
                    </Badge>
                  </button>
                </div>
              </div>
  
              {/* Main Search Bar */}
              <Card className="p-2 shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                  {/* Where */}
                  <div className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer border-r border-gray-200">
                    <label className="block text-xs font-semibold text-gray-900 mb-1">Where</label>
                    <input
                      type="text"
                      placeholder="Search destinations"
                      className="w-full text-sm text-gray-600 bg-transparent border-none outline-none placeholder-gray-400"
                    />
                  </div>
  
                  {/* Check in */}
                  <div className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer border-r border-gray-200">
                    <label className="block text-xs font-semibold text-gray-900 mb-1">Check in</label>
                    <input
                      type="text"
                      placeholder="Add dates"
                      className="w-full text-sm text-gray-600 bg-transparent border-none outline-none placeholder-gray-400"
                    />
                  </div>
  
                  {/* Check out */}
                  <div className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer border-r border-gray-200">
                    <label className="block text-xs font-semibold text-gray-900 mb-1">Check out</label>
                    <input
                      type="text"
                      placeholder="Add dates"
                      className="w-full text-sm text-gray-600 bg-transparent border-none outline-none placeholder-gray-400"
                    />
                  </div>
  
                  {/* Type & Amenities */}
                  <div className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer border-r border-gray-200">
                    <label className="block text-xs font-semibold text-gray-900 mb-1">Type</label>
                    <input
                      type="text"
                      placeholder="Coworking, Café, etc."
                      className="w-full text-sm text-gray-600 bg-transparent border-none outline-none placeholder-gray-400"
                    />
                  </div>
  
                  {/* Search Button */}
                  <div className="flex items-center justify-center p-2">
                    <Button className="bg-coral-500 hover:bg-coral-600 text-white rounded-full h-12 w-12 p-0">
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
  
              {/* Advanced Filters */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Wifi className="h-4 w-4 mr-2" />
                  High-speed WiFi (100+ Mbps)
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Coffee className="h-4 w-4 mr-2" />
                  24/7 Access
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Power Outlets
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Safe Neighborhood
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Budget Friendly
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Globe className="h-4 w-4 mr-2" />
                  English Speaking
                </Button>
              </div>
            </div>
          </div>
        </section>
  
        {/* Explore Nearby */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore Nearby</h2>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Featured Destinations */}
              {[
                {
                  id: 1,
                  images: ["https://images.unsplash.com/photo-1532186651327-6ac23687d189?q=80&w=3719&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1562095241-8c6714fd4178?q=80&w=2909&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1478185043339-d6c27ccac616?q=80&w=3548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
                  location: "Canggu, Bali",
                  country: "Indonesia",
                  wifi: "150",
                  temperature: "28°",
                  aqi: "45",
                  price: "1,250",
                  rating: "4.9",
                  slug: "canggu-bali",
                  type: "Coworking Hub",
                },
                {
                  id: 2,
                  images: ["https://images.unsplash.com/photo-1478185043339-d6c27ccac616?q=80&w=3548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
                  location: "Lisbon",
                  country: "Portugal",
                  wifi: "120",
                  temperature: "22°",
                  aqi: "35",
                  price: "1,800",
                  rating: "4.8",
                  slug: "lisbon",
                  type: "Co-living Space",
                },
                {
                  id: 3,
                  images: ["https://images.unsplash.com/photo-1562095241-8c6714fd4178?q=80&w=2909&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
                  location: "Mexico City",
                  country: "Mexico",
                  wifi: "95",
                  temperature: "24°",
                  aqi: "65",
                  price: "950",
                  rating: "4.7",
                  type: "Café Network",
                },
                {
                  id: 4,
                  images: ["https://plus.unsplash.com/premium_photo-1697729914552-368899dc4757?q=80&w=3512&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
                  location: "Dubai",
                  country: "United Arab Emirates",
                  wifi: "200",
                  temperature: "35°",
                  aqi: "55",
                  price: "3,195",
                  rating: "4.6",
                  slug: "dubai",
                  type: "Business District",
                },
                {
                  id: 5,
                  images: ["https://plus.unsplash.com/premium_photo-1670011073201-e26ac8b56a6c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
                  location: "Medellín",
                  country: "Colombia",
                  wifi: "85",
                  temperature: "26°",
                  aqi: "40",
                  price: "750",
                  rating: "4.8",
                  slug: "medellin",
                  type: "Digital Hub",
                },
                {
                  id: 6,
                  images: ["https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
                  location: "Chiang Mai",
                  country: "Thailand",
                  wifi: "110",
                  temperature: "32°",
                  aqi: "50",
                  price: "650",
                  slug: "chiang-mai",
                  rating: "4.9",
                  type: "Nomad Village",
                },
              ].map((destination) => (
                <Card
                  key={destination.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group py-0"
                >

                  <div className="relative aspect-[4/5] bg-gray-200">
                  <ImageCarousel images={destination.images} alt={destination.location} className="w-full h-full" />

                    {/* <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.location}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
   */}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
  
                    {/* Top Right - WiFi Speed */}
                    <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                      <Wifi className="h-4 w-4 text-white" />
                      <span className="text-white text-sm font-medium">{destination.wifi}</span>
                      <span className="text-white/80 text-xs">Mbps</span>
                    </div>
  
                    {/* Top Left - Rating */}
                    <div className="absolute top-4 left-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-medium">{destination.rating}</span>
                    </div>
  
                    {/* Heart Icon */}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-4 right-16 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-full h-8 w-8 p-0"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
  
                    {/* Bottom Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="mb-3">
                        <h3 className="text-xl font-bold mb-1">{destination.location}</h3>
                        <p className="text-white/90 text-sm">{destination.country}</p>
                        <p className="text-white/70 text-xs mt-1">{destination.type}</p>
                      </div>
  
                      {/* Bottom Stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* Temperature */}
                          <div className="flex items-center space-x-1">
                            <div className="w-4 h-4 rounded-full bg-orange-400 flex items-center justify-center">
                              <span className="text-xs">☀</span>
                            </div>
                            <span className="text-sm font-medium">{destination.temperature}</span>
                          </div>
  
                          {/* AQI */}
                          <div className="flex items-center space-x-1">
                            <div className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center">
                              <span className="text-xs">🍃</span>
                            </div>
                            <span className="text-sm font-medium">{destination.aqi}</span>
                          </div>
                        </div>
  
                        {/* Price */}
                        <div className="text-right">
                          <div className="text-lg font-bold">${destination.price} / mo</div>
                          <div className="text-xs text-white/80">FOR A NOMAD</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
  
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-coral-500 mb-2">247</div>
                <div className="text-gray-600">Coworking Spaces</div>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-coral-500 mb-2">89</div>
                <div className="text-gray-600">Co-living Options</div>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-coral-500 mb-2">156</div>
                <div className="text-gray-600">Nomad-friendly Cafés</div>
              </Card>
            </div>
          </div>
        </section>
  
        {/* Featured Utilities */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Essential Services</h2>
  
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Bike, title: "Bike Rentals", desc: "Explore the city" },
                { icon: Dumbbell, title: "Gyms", desc: "Stay fit anywhere" },
                { icon: Shirt, title: "Laundry", desc: "Clean clothes, easy" },
                { icon: Monitor, title: "IT Support", desc: "Tech when you need it" },
              ].map((service, i) => (
                <Card key={i} className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <service.icon className="h-12 w-12 text-coral-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
  
        {/* Events Near You */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Events Near You</h2>
              <Button variant="outline">View All</Button>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Digital Nomad Meetup", date: "Dec 15", location: "Canggu Beach Club", attendees: 24 },
                { title: "Yoga & Networking", date: "Dec 18", location: "Ubud Wellness Center", attendees: 16 },
                { title: "Startup Pitch Night", date: "Dec 20", location: "Hub Bali", attendees: 32 },
              ].map((event, i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400"></div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{event.date}</Badge>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        {event.attendees}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{event.location}</p>
                    <Button size="sm" className="w-full">
                      RSVP
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
  
        {/* Practical Info */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Know Before You Go</h2>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <Wifi className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Avg. WiFi Speed</h3>
                <p className="text-2xl font-bold text-gray-900">120 Mbps</p>
              </Card>
  
              <Card className="p-6 text-center">
                <Thermometer className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Temperature</h3>
                <p className="text-2xl font-bold text-gray-900">28°C</p>
              </Card>
  
              <Card className="p-6 text-center">
                <Clock className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Time Zone</h3>
                <p className="text-2xl font-bold text-gray-900">UTC+8</p>
              </Card>
  
              <Card className="p-6 text-center">
                <Phone className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Emergency</h3>
                <p className="text-2xl font-bold text-gray-900">112</p>
              </Card>
            </div>
          </div>
        </section>
  
        {/* Nomad Tools */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Nomad Tools & Features</h2>
  
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Interactive Nomad Map</h3>
                <p className="text-gray-600 mb-6">
                  Discover nomad-friendly zones, visa requirements, and community hotspots worldwide.
                </p>
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-gray-400" />
                </div>
                <Button className="w-full">Explore Map</Button>
              </Card>
  
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Nomad Pass</h3>
                      <p className="text-sm text-gray-600">Monthly bundle deals for coworking + co-living</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Card>
  
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Community Reviews</h3>
                      <p className="text-sm text-gray-600">Real feedback from fellow nomads</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Card>
  
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Safety Ratings</h3>
                      <p className="text-sm text-gray-600">Local safety info and regulations</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
  
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="text-2xl font-bold text-coral-500 mb-4">NomadLife</div>
                <p className="text-gray-400">Empowering digital nomads to work and live anywhere.</p>
              </div>
  
              <div>
                <h3 className="font-semibold mb-4">Explore</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Coworking Spaces
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Cafés
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Co-living
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Events
                    </a>
                  </li>
                </ul>
              </div>
  
              <div>
                <h3 className="font-semibold mb-4">Tools</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Nomad Map
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Nomad Pass
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Reviews
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Safety Guide
                    </a>
                  </li>
                </ul>
              </div>
  
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Community
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
            </div>
  
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 NomadLife. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    )
  }
  