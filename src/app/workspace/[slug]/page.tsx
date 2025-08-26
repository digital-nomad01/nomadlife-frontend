import { notFound } from "next/navigation"
import WorkspaceDetail from "@/components/workspace-detail"

// Mock data - in real app this would come from database
const workspaces = {
  "lakeside-digital-hub": {
    id: 1,
    slug: "pokhara-digital-hub",
    name: "Pokhara Coworking Hub",
    location: "Pokhara",
    type: "Coworking Space",
    // images: ["https://images.unsplash.com/photo-1532186651327-6ac23687d189?q=80&w=3719&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1562095241-8c6714fd4178?q=80&w=2909&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1478185043339-d6c27ccac616?q=80&w=3548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    images: [
      "/1.jpg",
      "/2.jpg",
      "/3.jpg",
      "/4.jpg",
      "/5.jpg",
      "/6.jpg",
      "/7.jpg",
      "/8.jpg",
    ],
    wifi: "100",
    price: "10",
    rating: "4.8",
    reviews: 24,
    features: ["Lake View", "24/7 Access", "High-Speed WiFi", "Meeting Rooms", "Terrace"],
    description:
      "Work with stunning views of Phewa Lake and the Annapurna range. Our modern coworking space offers everything digital nomads need for productive work in paradise.",
    fullDescription: `Lakeside Digital Hub is Pokhara's premier coworking destination, perfectly positioned on the shores of Phewa Lake with unobstructed views of the Annapurna mountain range. 

    Our space combines modern amenities with Nepal's natural beauty, creating an inspiring environment for digital nomads, entrepreneurs, and remote workers. Whether you're coding with a view of snow-capped peaks or taking client calls from our soundproof booths, every moment here is designed to enhance your productivity and well-being.

    The space features ergonomic workstations, high-speed fiber internet, and a variety of work environments from quiet focus areas to collaborative spaces. Our rooftop terrace is perfect for breaks, networking, or simply soaking in the incredible Himalayan scenery.`,
    amenities: [
      { name: "High-Speed WiFi", description: "100+ Mbps fiber internet", icon: "Wifi" },
      { name: "24/7 Access", description: "Work anytime with secure keycard access", icon: "Clock" },
      { name: "Lake Views", description: "Stunning Phewa Lake panoramas", icon: "Mountain" },
      { name: "Meeting Rooms", description: "Private spaces for calls and meetings", icon: "Users" },
      { name: "Printing & Scanning", description: "Full office services available", icon: "Printer" },
      { name: "Coffee & Tea", description: "Unlimited beverages included", icon: "Coffee" },
      { name: "Rooftop Terrace", description: "Outdoor workspace with mountain views", icon: "Sun" },
      { name: "Secure Storage", description: "Personal lockers for your belongings", icon: "Shield" },
    ],
    pricing: [
      { type: "Day Pass", price: 15, description: "Full day access with all amenities" },
      { type: "Weekly Pass", price: 90, description: "7 days of unlimited access" },
      { type: "Monthly Pass", price: 300, description: "30 days + meeting room credits" },
    ],
    hours: "24/7 Access",
    contact: {
      phone: "+977-61-123456",
      email: "hello@lakesidehub.com",
      website: "www.lakesidehub.com",
      address: "Lakeside Road, Pokhara-6, Kaski, Nepal",
    },
    coordinates: { lat: 28.2096, lng: 83.9856 },
    nearbyAttractions: [
      "Phewa Lake (0.1km)",
      "World Peace Pagoda (2km)",
      "Sarangkot Viewpoint (8km)",
      "International Mountain Museum (3km)",
    ],
  },
  "mountain-view-cafe": {
    id: 2,
    slug: "mountain-view-cafe",
    name: "Mountain View Café",
    location: "Pokhara",
    type: "Café + Workspace",
    images: [
      "/placeholder.svg?height=600&width=800&text=Mountain+View+Cafe+Main",
      "/placeholder.svg?height=600&width=800&text=Outdoor+Terrace",
      "/placeholder.svg?height=600&width=800&text=Cozy+Interior",
      "/placeholder.svg?height=600&width=800&text=Coffee+Bar",
      "/placeholder.svg?height=600&width=800&text=Garden+Seating",
    ],
    wifi: "80",
    price: "8",
    rating: "4.6",
    reviews: 18,
    features: ["Great Coffee", "Outdoor Seating", "Mountain Views", "Garden", "Local Food"],
    description:
      "Perfect blend of café culture and productive workspace with incredible mountain views and locally sourced coffee.",
    fullDescription: `Mountain View Café offers the perfect blend of Nepal's renowned coffee culture and a productive workspace environment. Located in the heart of Pokhara's café district, we serve exceptional locally-sourced coffee while providing a comfortable space for digital nomads to work.

    Our café features both indoor and outdoor seating areas, with our garden terrace offering spectacular views of the Annapurna range. The atmosphere is relaxed yet focused, making it ideal for creative work, casual meetings, or simply enjoying great coffee while getting things done.

    We pride ourselves on supporting local coffee farmers and serving authentic Nepali cuisine alongside international favorites. Our community of regular nomads creates a welcoming environment for newcomers to Nepal.`,
    amenities: [
      { name: "Specialty Coffee", description: "Locally sourced Nepali coffee beans", icon: "Coffee" },
      { name: "Garden Terrace", description: "Outdoor seating with mountain views", icon: "Sun" },
      { name: "Local Cuisine", description: "Authentic Nepali and international food", icon: "Utensils" },
      { name: "Free WiFi", description: "80 Mbps reliable internet", icon: "Wifi" },
      { name: "Power Outlets", description: "Charging stations at every table", icon: "Zap" },
      { name: "Quiet Zones", description: "Designated areas for focused work", icon: "Volume" },
    ],
    pricing: [
      { type: "Coffee + WiFi", price: 5, description: "Minimum order for workspace access" },
      { type: "Day Pass", price: 8, description: "All-day access with one drink" },
      { type: "Weekly Pass", price: 45, description: "7 days unlimited access" },
    ],
    hours: "6:00 AM - 10:00 PM",
    contact: {
      phone: "+977-61-654321",
      email: "info@mountainviewcafe.com",
      website: "www.mountainviewcafe.com",
      address: "Lakeside-6, Pokhara, Kaski, Nepal",
    },
    coordinates: { lat: 28.2089, lng: 83.9853 },
    nearbyAttractions: [
      "Phewa Lake (0.2km)",
      "Barahi Temple (0.5km)",
      "Lakeside Market (0.1km)",
      "Boat Rental (0.3km)",
    ],
  },
  // Add other workspaces...
}

export default function WorkspacePage({ params }: any) {
  const workspace = workspaces[params.slug as keyof typeof workspaces]

  if (!workspace) {
    notFound()
  }

  return <WorkspaceDetail workspace={workspace} />
}

export function generateStaticParams() {
  return Object.keys(workspaces).map((slug) => ({
    slug,
  }))
}
