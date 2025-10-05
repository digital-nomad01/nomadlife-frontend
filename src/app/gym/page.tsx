import Gyms from "@/components/gym/gym"
import { Gym } from "@/components/gym/type"

const gymsData: Gym[] = [
  {
    id: "1",
    name: "Fitness Zone Pokhara",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    description: "Modern fitness center with state-of-the-art equipment, personal trainers, and group classes. Located in the heart of Lakeside with mountain views.",
    contact: {
      phone: "+977-9851234567",
      address: "Lakeside Road 6, Pokhara 33700",
      website: "https://fitnesszone-pokhara.com"
    },
    amenities: ["Weight Training", "Cardio Equipment", "Personal Trainer", "Group Classes", "Locker Rooms"],
    pricing: {
      daily: "NPR 500",
      weekly: "NPR 2,500",
      monthly: "NPR 8,000"
    }
  },
  {
    id: "2",
    name: "Mountain View Gym",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    description: "24/7 fitness center with panoramic mountain views. Features modern equipment, yoga studio, and outdoor training area perfect for nomads.",
    contact: {
      phone: "+977-9841234567",
      address: "Baidam, Pokhara 33700",
      website: "https://mountainviewgym.com.np"
    },
    amenities: ["24/7 Access", "Yoga Studio", "Outdoor Training", "Sauna", "Nutritionist"],
    pricing: {
      daily: "NPR 600",
      weekly: "NPR 3,000",
      monthly: "NPR 10,000"
    }
  },
  {
    id: "3",
    name: "Annapurna Fitness Center",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    description: "Complete fitness facility with swimming pool, spa services, and specialized programs for travelers. Includes healthy meal options and recovery zones.",
    contact: {
      phone: "+977-9856789012",
      address: "New Road, Pokhara 33700",
      support: "Via WhatsApp: +977-9856789012"
    },
    amenities: ["Swimming Pool", "Spa Services", "Meal Plans", "Recovery Zone", "Crossfit Area"],
    pricing: {
      daily: "NPR 800",
      weekly: "NPR 4,000",
      monthly: "NPR 12,000"
    }
  },
  {
    id: "4",
    name: "Himalayan Strength & Conditioning",
    image: "https://images.unsplash.com/photo-1571388208497-71bedc76e1e1?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3",
    description: "Specialized training facility focusing on functional fitness and outdoor preparation. Perfect for trekkers and adventure enthusiasts preparing for mountain activities.",
    contact: {
      phone: "+977-9823456789",
      address: "Mahendrapul, Pokhara 33700",
      website: "https://himalayanstrength.np"
    },
    amenities: ["Functional Training", "Rock Climbing Wall", "Altitude Training", "Physiotherapy", "Gear Rental"],
    pricing: {
      daily: "NPR 700",
      weekly: "NPR 3,500",
      monthly: "NPR 9,500"
    }
  }
]

export default function GymPage() {
  return <Gyms gyms={gymsData} />
}
