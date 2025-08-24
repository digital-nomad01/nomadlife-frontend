"use client"
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface FooterProps {
  className?: string
}

interface FooterSection {
  title: string
  links: Array<{ label: string; href: string }>
}

const footerSections: FooterSection[] = [
  {
    title: "Explore",
    links: [
      { label: "Coworking Spaces", href: "#" },
      { label: "Cafés", href: "#" },
      { label: "Co-living", href: "#" },
      { label: "Events", href: "#" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Nomad Map", href: "#" },
      { label: "Nomad Pass", href: "#" },
      { label: "Reviews", href: "#" },
      { label: "Safety Guide", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Community", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
]

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="text-2xl font-bold text-coral-500 mb-4">
            NomadLife
          </div>
          <p className="text-gray-400 mb-4">
            Connecting digital nomads with amazing workspaces in Nepal and
            beyond.
          </p>
          <div className="flex space-x-4">
            <Badge
              variant="outline"
              className="text-gray-400 border-gray-600"
            >
              🇳🇵 Made in Nepal
            </Badge>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#workspaces" className="hover:text-white">
                Browse Workspaces
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                List Your Space
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                About Nepal
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Nomad Guide
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-2 text-gray-400">
            <li>📧 hello@nomadlife.live</li>
            <li>📱 +977-9754994807</li>
            <li>📍 Pokhara, Nepal</li>
            <li>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white p-0"
                onClick={() =>
                  window.open(
                    "https://chat.whatsapp.com/DxLiGbhfHS8L9Bw8KUPzBm",
                    "_blank"
                  )
                }
              >
                Join our WhatsApp group
              </Button>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>
          &copy; 2024 NomadLife. Proudly supporting Nepal&apos;s digital nomad
          community.
        </p>
      </div>
    </div>
  </footer>
  )
}
