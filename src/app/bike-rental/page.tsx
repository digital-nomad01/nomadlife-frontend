import BikeRentals from "@/components/bike-rental/bike-rental"
import { BikeRental } from "@/components/bike-rental/type"

const bikeRentalsData: BikeRental[] = [
  {
    id: "1",
    name: "EasyRenty",
    image: "https://plus.unsplash.com/premium_photo-1723478472459-453bde6d018e?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Rent bicycles and scooters with easy app-based booking, user-friendly registration, free delivery, and payment after vehicle inspection in Pokhara.",
    contact: {
      website: "https://easyrenty.com/pokhara/",
      support: "Via EasyRenty Mobile App (in-app chat available)"
    }
  },
  {
    id: "2",
    name: "Rental Pokhara Pvt Ltd",
    image: "https://plus.unsplash.com/premium_photo-1748191472214-757549cdfa65?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Offers reliable bike and scooter rentals at affordable prices; various options for daily, weekly, and monthly rentals around Pokhara Lakeside.",
    contact: {
      website: "https://rentalpokhara.com/scooter-bike-rent/",
      phone: "+977-9846819199"
    }
  },
  {
    id: "3",
    name: "Nepal MTB Adventures Pvt. Ltd.",
    image: "https://plus.unsplash.com/premium_photo-1722686654215-cfcdcf504b51?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Mountain bike tours and rentals with guides, best for Annapurna trails and Pokhara valley exploration. Located at Halan Chowk, Lakeside.",
    contact: {
      address: "Baidam, Hallan Chowk, Lakeside, Pokhara 33700",
      phone: "+977 9804134788",
      website: "https://nepalmountainbike.com"
    }
  },
  {
    id: "4",
    name: "City Motorbike",
    image: "https://lh3.googleusercontent.com/p/AF1QipNrA-jYEc0xgzJKOxPHIz_HZgU0DumrQqOfRdgC=s1360-w1360-h1020-rw",
    description: "Scooter and motorcycle rentals with helmet included, hotel delivery service, and a wide selection of new bikes. Guided tours also available.",
    contact: {
      website: "https://citymotorbike.com/motorbike-hire-rates-in-nepal/",
      phone: "+977 9843360610, +977 9841205828, +977 014260211"
    }
  }
]

export default function BikeRentalsPage() {
  return <BikeRentals rentals={bikeRentalsData} />
}