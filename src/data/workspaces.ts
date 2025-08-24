import { Workspace } from "@/types/workspace"

export const workspaces: Workspace[] = [
  {
    id: 1,
    images: [
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
    description: "Work with stunning views of Phewa Lake and the Annapurna range",
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
    description: "Perfect blend of café culture and productive workspace",
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
    description: "Modern workspace in the heart of Kathmandu's tourist district",
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
    description: "Work surrounded by Nepal's rich cultural heritage",
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
    description: "Exclusive rooftop workspace with panoramic Himalayan views",
  },
]

export const comingSoonCities = [
  "Chitwan",
  "Lumbini", 
  "Bandipur",
  "Bhaktapur",
  "Nagarkot"
]
