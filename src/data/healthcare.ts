import { Healthcare } from "@/components/healthcare/type"

export const caremarkHospital: Healthcare = {
  id: "caremark-hospital",
  name: "Caremark Hospital",
  image: "https://caremarkhospitals.com/wp-content/uploads/2024/03/photo-24-03-24-1.jpg",
  description: "Your premier healthcare destination in Pokhara. State-of-the-art facility providing compassionate healthcare of international standards with 24/7 emergency services.",
  contact: {
    website: "https://caremarkhospitals.com/",
    phone: "+977 61591441",
    email: "info@caremarkhospitals.com",
    emergency: "+977 61591441",
    ambulance: "+977 9851353499",
    heli: "+977 9851171975",
    address: "Lakeside Road – 06, Pokhara 33700, Nepal"
  },
  services: [
    { name: "Emergency Services", description: "24/7 emergency care with specialized medical team" },
    { name: "Preventive Health Care", description: "Comprehensive health checkups and preventive care" },
    { name: "Ground & Air Evacuation", description: "Emergency transport services" },
    { name: "Inpatient Services", description: "Comprehensive medical care and observation" },
    { name: "Clinical Services", description: "Wide range of clinical treatments" },
    { name: "International Patients Care", description: "Specialized care for international patients" },
    { name: "Laboratory Services", description: "Advanced diagnostic testing" },
    { name: "Vaccines & Immunization", description: "Comprehensive vaccination services" },
    { name: "Training", description: "Medical training and education programs" }
  ],
  specialties: [
    "Radiology",
    "Orthopedic Surgery", 
    "Obstetrics & Gynecology",
    "Internal Medicine",
    "ENT Surgery",
    "General Surgery"
  ],
  emergency_available: true,
  international_patients: true,
  pricing: {
    consultation: "Contact for pricing",
    emergency: "24/7 Available",
    packages: "Various packages available"
  }
}

export const healthcareProviders: Healthcare[] = [
  caremarkHospital,
  // Add more healthcare providers as needed
]
