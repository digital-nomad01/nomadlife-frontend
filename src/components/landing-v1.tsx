"use client";
import {
  Search,
  Wifi,
  Thermometer,
  Clock,
  Phone,
  Star,
  Users,
  Heart,
  Coffee,
  DollarSign,
  Mountain,
  Plane,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import ImageCarousel from "@/components/image-carousel";

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
                <a
                  href="#workspaces"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Workspaces
                </a>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  About Nepal
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Contact
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700">
                List Your Space
              </Button>
              <Button className="bg-coral-500 hover:bg-coral-600 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Nepal Focused */}
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
            {/* <div className="text-center">
                <div className="text-2xl font-bold text-coral-500">$200</div>
                <div className="text-sm text-gray-600">Avg/Month</div>
              </div> */}
            <div className="text-center">
              <div className="text-2xl font-bold text-coral-500">50+</div>
              <div className="text-sm text-gray-600">Nomads</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Workspaces */}
      <section id="workspaces" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Workspaces
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked coworking spaces with reliable internet, stunning
              views, and vibrant communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Pokhara Workspaces */}
            {[
              {
                id: 1,
                // images: [
                //   "https://images.unsplash.com/photo-1532186651327-6ac23687d189?q=80&w=3719&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                //   "https://images.unsplash.com/photo-1562095241-8c6714fd4178?q=80&w=2909&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                //   "https://images.unsplash.com/photo-1478185043339-d6c27ccac616?q=80&w=3548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                // ],

                images:[
                  "1.jpg",
                  "2.jpg",
                  "3.jpg",
                  "4.jpg",
                  "5.jpg",
                  "6.jpg",
                  "7.jpg",
                  "8.jpg",
                ],

                name: "Lakeside Digital Hub",
                location: "Pokhara",
                type: "Coworking Space",
                wifi: "100",
                price: "15",
                slug: "lakeside-digital-hub",
                rating: "4.8",
                features: ["Lake View", "24/7 Access", "High-Speed WiFi"],
                description:
                  "Work with stunning views of Phewa Lake and the Annapurna range",
              },
              {
                id: 2,
                images: [
                  "https://images.unsplash.com/photo-1562095241-8c6714fd4178?q=80&w=2909&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                ],

                name: "Mountain View Café",
                location: "Pokhara",
                type: "Café + Workspace",
                wifi: "80",
                price: "8",
                slug: "mountain-view-cafe",
                rating: "4.6",
                features: ["Great Coffee", "Outdoor Seating", "Mountain Views"],
                description:
                  "Perfect blend of café culture and productive workspace",
              },
              {
                id: 3,
                images: [
                  "https://plus.unsplash.com/premium_photo-1697729914552-368899dc4757?q=80&w=3512&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                ],

                name: "Thamel Tech Hub",
                location: "Kathmandu",
                type: "Coworking Space",
                wifi: "120",
                price: "20",
                slug: "thamel-tech-hub",
                rating: "4.7",
                features: ["City Center", "Meeting Rooms", "Events"],
                description:
                  "Modern workspace in the heart of Kathmandu&apos;s tourist district",
              },
              {
                id: 4,
                images: [
                  "https://plus.unsplash.com/premium_photo-1670011073201-e26ac8b56a6c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                ],

                name: "Heritage Workspace",
                location: "Kathmandu",
                type: "Heritage Café",
                wifi: "90",
                price: "12",
                slug: "heritage-workspace",
                rating: "4.5",
                features: ["Cultural Ambiance", "Garden", "Local Art"],
                description:
                  "Work surrounded by Nepal&apos;s rich cultural heritage",
              },
              {
                id: 5,
                images: [
                  "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                ],

                name: "Himalayan Heights",
                location: "Pokhara",
                type: "Rooftop Workspace",
                wifi: "110",
                price: "18",
                slug: "himalayan-heights",
                rating: "4.9",
                features: ["Himalayan Views", "Rooftop", "Premium"],
                description:
                  "Exclusive rooftop workspace with panoramic Himalayan views",
              },
            ].map((workspace) => (
              <Card
                key={workspace.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group py-0"
              >
                <Link href={`/workspace/${workspace.slug}`} key={workspace.id}>
                  <div className="relative aspect-[4/5] bg-gray-200">
                    <ImageCarousel
                      images={workspace.images}
                      alt={workspace.name}
                      className="w-full h-full"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Top Right - WiFi Speed */}
                    <div className="absolute bottom-4 left-2 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 z-10">
                      <Wifi className="h-4 w-4 text-white" />
                      <span className="text-white text-sm font-medium">
                        {workspace.wifi}
                      </span>
                      <span className="text-white/80 text-xs">Mbps</span>
                    </div>

                    {/* Top Left - Rating */}
                    <div className="absolute top-4 left-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 z-10">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-medium">
                        {workspace.rating}
                      </span>
                    </div>

                    {/* Heart Icon */}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute bottom-16 right-4 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-full h-8 w-8 p-0 z-10"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>

                    {/* Bottom Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold mb-1">
                          {workspace.name}
                        </h3>
                        <p className="text-white/90 text-sm">
                          {workspace.location}, Nepal
                        </p>
                        <p className="text-white/70 text-xs mt-1">
                          {workspace.type}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {workspace.features.slice(0, 2).map((feature, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-xs bg-white/20 text-white border-white/30"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          ${workspace.price} / day
                        </div>
                        <div className="text-xs text-white/80">
                          Starting from
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          {/* Coming Soon Section */}
          <Card className="p-8 text-center bg-gradient-to-r from-gray-50 to-blue-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              More Cities Coming Soon
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;re expanding across Nepal and beyond. Be the first to know when
              we launch in new destinations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {["Chitwan", "Lumbini", "Bandipur", "Bhaktapur", "Nagarkot"].map(
                (city) => (
                  <Badge key={city} variant="outline" className="px-3 py-1">
                    {city}
                  </Badge>
                )
              )}
            </div>
            <Button variant="outline">
              <Plane className="h-4 w-4 mr-2" />
              Get Notified
            </Button>
          </Card>
        </div>
      </section>

      {/* Why Nepal Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Nepal?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover what makes Nepal the perfect destination for digital
              nomads seeking adventure and productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Affordable Living",
                description:
                  "Live comfortably for $300-500/month including accommodation, food, and workspace",
                color: "text-green-500",
              },
              {
                icon: Mountain,
                title: "Stunning Scenery",
                description:
                  "Work with views of the Himalayas, pristine lakes, and ancient temples",
                color: "text-blue-500",
              },
              {
                icon: Users,
                title: "Welcoming Culture",
                description:
                  "Experience the warmth of Nepali hospitality and connect with local communities",
                color: "text-purple-500",
              },
              {
                icon: Wifi,
                title: "Reliable Internet",
                description:
                  "Growing infrastructure with fiber internet in major cities and tourist areas",
                color: "text-coral-500",
              },
              {
                icon: Plane,
                title: "Easy Visa",
                description:
                  "Tourist visa on arrival for most countries, extendable up to 150 days per year",
                color: "text-orange-500",
              },
              {
                icon: Coffee,
                title: "Growing Scene",
                description:
                  "Emerging nomad community with increasing coworking spaces and cafés",
                color: "text-amber-500",
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-shadow"
              >
                <benefit.icon
                  className={`h-12 w-12 ${benefit.color} mx-auto mb-4`}
                />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Info for Nepal */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Essential Nepal Info
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <Clock className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Timezone</h3>
              <p className="text-2xl font-bold text-gray-900">UTC+5:45</p>
              <p className="text-sm text-gray-600">Nepal Time</p>
            </Card>

            <Card className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Currency</h3>
              <p className="text-2xl font-bold text-gray-900">NPR</p>
              <p className="text-sm text-gray-600">Nepali Rupee</p>
            </Card>

            <Card className="p-6 text-center">
              <Thermometer className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Climate</h3>
              <p className="text-2xl font-bold text-gray-900">15-25°C</p>
              <p className="text-sm text-gray-600">Year-round</p>
            </Card>

            <Card className="p-6 text-center">
              <Phone className="h-8 w-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Emergency</h3>
              <p className="text-2xl font-bold text-gray-900">100</p>
              <p className="text-sm text-gray-600">Police</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-red-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 border-2 border-white rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="flex items-center mb-4">
                <Mountain className="h-8 w-8 mr-3" />
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  🏔️ Adventure Awaits
                </Badge>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Ready to Start Your
                <span className="block text-yellow-300">Nepal Adventure?</span>
              </h2>
              <p className="text-xl text-coral-100 mb-8 leading-relaxed">
                Join the growing community of nomads discovering the magic of
                working from the Himalayas. Experience breathtaking views, rich
                culture, and affordable living while building your remote
                career.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">$300</div>
                  <div className="text-sm text-coral-100">Monthly Living</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">50+</div>
                  <div className="text-sm text-coral-100">Active Nomads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">150</div>
                  <div className="text-sm text-coral-100">Days Max Visa</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-black hover:text-red-500 font-semibold"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Explore Workspaces
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-black hover:text-red-500 font-semibold"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Join Community
                </Button>
              </div>
            </div>

            {/* Right Content - Testimonial Card */}
            <div className="relative">
              <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    S
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">
                      Sarah Chen
                    </div>
                    <div className="text-sm text-gray-600">
                      Digital Marketing Consultant
                    </div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 italic">
                  &ldquo;Working from Pokhara has been life-changing. The mountain
                  views from my workspace inspire me daily, and the cost of
                  living allows me to save while experiencing incredible
                  culture. The nomad community here is amazing!&rdquo;
                </blockquote>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  Currently in Pokhara
                </div>
              </Card>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold text-coral-500 mb-4">
                NomadLife
              </div>
              <p className="text-gray-400 mb-4">
                Connecting digital nomads with amazing workspaces in Nepal and
                beyond.
              </p>
              <div className="flex space-x-4">
                <Badge
                  variant="outline"
                  className="text-gray-400 border-gray-600"
                >
                  🇳🇵 Made in Nepal
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#workspaces" className="hover:text-white">
                    Browse Workspaces
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    List Your Space
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white">
                    About Nepal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Nomad Guide
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Get in Touch</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📧 hello@nomadlife.live</li>
                <li>📱 +977-9754994807</li>
                <li>📍 Pokhara, Nepal</li>
                <li>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white p-0"
                    onClick={() =>
                      window.open(
                        "https://chat.whatsapp.com/DxLiGbhfHS8L9Bw8KUPzBm",
                        "_blank"
                      )
                    }
                  >
                    Join our WhatsApp group
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 NomadLife. Proudly supporting Nepal&apos;s digital nomad
              community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
