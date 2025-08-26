import { Search, Monitor, Users, Calendar, Wifi, Coffee, Zap, Shield, DollarSign, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SearchBarProps {
  className?: string
}

const categoryTabs = [
  {
    id: "workspaces",
    label: "Workspaces",
    icon: Monitor,
    active: true
  },
  {
    id: "coliving",
    label: "Co-living",
    icon: Users,
    badge: "NEW"
  },
  {
    id: "events",
    label: "Events",
    icon: Calendar,
    badge: "NEW"
  }
]

const quickFilters = [
  { icon: Wifi, label: "High-speed WiFi (100+ Mbps)" },
  { icon: Coffee, label: "24/7 Access" },
  { icon: Zap, label: "Power Outlets" },
  { icon: Shield, label: "Safe Neighborhood" },
  { icon: DollarSign, label: "Budget Friendly" },
  { icon: Globe, label: "English Speaking" }
]

export default function SearchBar({ className = "" }: SearchBarProps) {
  return (
    <div className={`max-w-5xl mx-auto ${className}`}>
      {/* Category Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-white rounded-full p-1 shadow-lg">
          {categoryTabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-colors ${
                  tab.active
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <IconComponent className="h-5 w-5" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {tab.badge}
                  </Badge>
                )}
              </button>
            )
          })}
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
        {quickFilters.map((filter, index) => {
          const IconComponent = filter.icon
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              <IconComponent className="h-4 w-4 mr-2" />
              {filter.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
