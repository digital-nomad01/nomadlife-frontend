"use client"
import { useEffect, useState } from 'react'
import { Card } from './ui/card'
import { Wifi, Thermometer, Clock, Phone } from 'lucide-react'
import { getWeatherByCity } from '@/lib/weather'
import { useSearchParams } from 'next/navigation'

interface InfoCard {
  icon: any
  title: string
  value: string
  color: string
}

interface WeatherInfo {
  pokhara: string
  kathmandu: string
}

interface PracticalInfoProps {
  className?: string
}

export default function PracticalInfo({ className = "" }: PracticalInfoProps) {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>({
    pokhara: "Loading...",
    kathmandu: "Loading..."
  })
  
  const searchParams = useSearchParams()
  const city = searchParams.get('city')?.toLowerCase() // Get city from URL params

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Fetch weather for both cities
        const [pokharaWeather, kathmanduWeather] = await Promise.all([
          getWeatherByCity('Pokhara,NP'),
          getWeatherByCity('Kathmandu,NP')
        ])

        setWeatherInfo({
          pokhara: pokharaWeather ? `${pokharaWeather.temperature}°C` : "N/A",
          kathmandu: kathmanduWeather ? `${kathmanduWeather.temperature}°C` : "N/A"
        })
      } catch (error) {
        console.error('Error fetching weather:', error)
        setWeatherInfo({
          pokhara: "N/A",
          kathmandu: "N/A"
        })
      }
    }

    fetchWeather()
    // Refresh weather data every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const infoCards: InfoCard[] = [
    { 
      icon: Wifi, 
      title: "Avg. WiFi Speed", 
      value: "120 Mbps", 
      color: "text-green-500" 
    },
    { 
      icon: Thermometer, 
      title: city ? `${city.charAt(0).toUpperCase() + city.slice(1)} Temperature` : "Temperature",
      value: city ? 
        (city === 'pokhara' ? weatherInfo.pokhara : 
         city === 'kathmandu' ? weatherInfo.kathmandu : 
         `Pokhara: ${weatherInfo.pokhara} | Ktm: ${weatherInfo.kathmandu}`) :
        `Pokhara: ${weatherInfo.pokhara} | Ktm: ${weatherInfo.kathmandu}`,
      color: "text-orange-500" 
    },
    { 
      icon: Clock, 
      title: "Time Zone", 
      value: "UTC+5:45", 
      color: "text-blue-500" 
    },
    { 
      icon: Phone, 
      title: "Emergency", 
      value: "100", 
      color: "text-purple-500" 
    },
  ]

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
