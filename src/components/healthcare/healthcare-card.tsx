'use client'
import { Healthcare } from "./type"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Globe, Mail, MapPin, Clock, Heart } from "lucide-react"

interface HealthcareCardProps {
  healthcare: Healthcare
}

export default function HealthcareCard({ healthcare }: HealthcareCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={healthcare.image} 
          alt={healthcare.name}
          className="w-full h-full object-cover"
        />
        {healthcare.emergency_available && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <Heart className="w-4 h-4 mr-1" />
            24/7 Emergency
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{healthcare.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{healthcare.description}</p>
        
        {/* Services */}
        {healthcare.services && healthcare.services.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Key Services:</h4>
            <div className="flex flex-wrap gap-2">
              {healthcare.services.slice(0, 3).map((service, index) => (
                <span key={index} className="bg-coral-100 text-coral-800 px-2 py-1 rounded text-xs">
                  {service.name}
                </span>
              ))}
              {healthcare.services.length > 3 && (
                <span className="text-coral-500 text-xs">+{healthcare.services.length - 3} more</span>
              )}
            </div>
          </div>
        )}
        
        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          {healthcare.contact.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2 text-coral-500" />
              {healthcare.contact.phone}
            </div>
          )}
          {healthcare.contact.address && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-coral-500" />
              {healthcare.contact.address}
            </div>
          )}
        </div>
        
        {/* Emergency Contacts */}
        {(healthcare.contact.emergency || healthcare.contact.ambulance) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <h4 className="font-semibold text-red-800 text-sm mb-2">Emergency Contacts:</h4>
            {healthcare.contact.emergency && (
              <div className="flex items-center text-sm text-red-700 mb-1">
                <Phone className="w-3 h-3 mr-2" />
                Emergency: {healthcare.contact.emergency}
              </div>
            )}
            {healthcare.contact.ambulance && (
              <div className="flex items-center text-sm text-red-700">
                <Phone className="w-3 h-3 mr-2" />
                Ambulance: {healthcare.contact.ambulance}
              </div>
            )}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-coral-500 hover:bg-coral-600"
            onClick={() => {
              if (healthcare.contact.phone) {
                window.open(`tel:${healthcare.contact.phone}`, '_self');
              }
            }}
          >
            Call Now
          </Button>
          {healthcare.contact.website && (
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                window.open(healthcare.contact.website, '_blank');
              }}
            >
              Visit Website
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
