'use client'
import { Bike, Dumbbell, Shirt, Monitor, LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface EssentialServicesProps {
  className?: string
}

interface Service {
  icon: LucideIcon
  title: string
  description: string
}

const services: Service[] = [
  { icon: Bike, title: "Bike Rentals", description: "Explore the city" },
  { icon: Dumbbell, title: "Gyms", description: "Stay fit anywhere" },
  { icon: Shirt, title: "Laundry", description: "Clean clothes, easy" },
  { icon: Monitor, title: "IT Support", description: "Tech when you need it" },
]

export default function EssentialServices({ className = "" }: EssentialServicesProps) {
  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Essential Services</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card 
                key={index} 
                className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  if(service.title === "Bike Rentals") {
                    window.open("/bike-rental", '_blank')
                  } else if(service.title === "Gyms") {
                    window.open("/gyms", '_blank')
                  } else if(service.title === "Laundry") {
                    window.open("/laundry", '_blank')
                  } else if(service.title === "IT Support") {
                    window.open("/it-support", '_blank')
                  }
                }}
              >
                <IconComponent className="h-12 w-12 text-coral-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
