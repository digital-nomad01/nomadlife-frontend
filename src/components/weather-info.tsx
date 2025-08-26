'use client'

import { useEffect, useState } from 'react'
import { Thermometer, Droplets } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { getWeatherByCoordinates, getWeatherByCity } from '@/lib/weather'

interface WeatherInfoProps {
  latitude?: number
  longitude?: number
  location: string
  className?: string
}

interface WeatherData {
  temperature: number
  condition: string
  humidity: number
  description: string
  icon: string
}

const weatherIcons: { [key: string]: string } = {
  'Clear': '☀️',
  'Clouds': '☁️',
  'Rain': '🌧️',
  'Drizzle': '🌦️',
  'Thunderstorm': '⛈️',
  'Snow': '❄️',
  'Mist': '🌫️',
  'Fog': '🌫️',
  'Haze': '🌫️'
}

export default function WeatherInfo({ 
  latitude, 
  longitude, 
  location, 
  className = "" 
}: WeatherInfoProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true)
      let weatherData = null

      // Try coordinates first, then fallback to city name
      if (latitude && longitude) {
        weatherData = await getWeatherByCoordinates(latitude, longitude)
      }
      
      if (!weatherData) {
        weatherData = await getWeatherByCity(location)
      }

      setWeather(weatherData)
      setLoading(false)
    }

    fetchWeather()
  }, [latitude, longitude, location])

  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4 text-center animate-pulse">
            <div className="h-8 w-8 bg-gray-200 rounded mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-1"></div>
            <div className="h-6 bg-gray-200 rounded"></div>
          </Card>
        ))}
      </div>
    )
  }

  if (!weather) {
    return (
      <div className={className}>
        <Card className="p-4 text-center">
          <p className="text-gray-600">Weather info unavailable</p>
        </Card>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {/* Temperature */}
      <Card className="p-4 text-center">
        <Thermometer className="h-8 w-8 mx-auto mb-2 text-orange-500" />
        <h3 className="font-semibold text-gray-900 mb-1">Temperature</h3>
        <p className="text-2xl font-bold text-gray-900">{weather.temperature}°C</p>
      </Card>

      {/* Weather Condition */}
      <Card className="p-4 text-center">
        <div className="text-3xl mb-2">
          {weatherIcons[weather.condition] || '🌤️'}
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">Condition</h3>
        <p className="text-lg font-bold text-gray-900 capitalize">
          {weather.description}
        </p>
      </Card>

      {/* Humidity */}
      <Card className="p-4 text-center">
        <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-500" />
        <h3 className="font-semibold text-gray-900 mb-1">Humidity</h3>
        <p className="text-2xl font-bold text-gray-900">{weather.humidity}%</p>
      </Card>
    </div>
  )
}
