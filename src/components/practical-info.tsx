import { Wifi, Thermometer, Clock, Phone, LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface PracticalInfoProps {
  className?: string
}

interface InfoCard {
  icon: LucideIcon
  title: string
  value: string
  color: string
}

const infoCards: InfoCard[] = [
  { icon: Wifi, title: "Avg. WiFi Speed", value: "120 Mbps", color: "text-green-500" },
  { icon: Thermometer, title: "Temperature", value: "28°C", color: "text-orange-500" },
  { icon: Clock, title: "Time Zone", value: "UTC+8", color: "text-blue-500" },
  { icon: Phone, title: "Emergency", value: "100", color: "text-purple-500" },
]

export default function PracticalInfo({ className = "" }: PracticalInfoProps) {
  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Know Before You Go</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoCards.map((info, index) => {
            const IconComponent = info.icon
            return (
              <Card key={index} className="p-6 text-center">
                <IconComponent className={`h-8 w-8 mx-auto mb-3 ${info.color}`} />
                <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{info.value}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
