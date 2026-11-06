"use client"
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  CONTACT_EMAIL,
  LIST_YOUR_SPACE_MAILTO,
  WHATSAPP_GROUP_URL,
} from "@/config/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
          <h3 className="font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#workspaces" className="hover:text-white">
                Browse Workspaces
              </a>
            </li>
            <li>
              <a href="#events" className="hover:text-white">
                Events
              </a>
            </li>
            <li>
              <a href={LIST_YOUR_SPACE_MAILTO} className="hover:text-white">
                List Your Space
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Community</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center space-x-2">
              <span className="hover:text-white cursor-not-allowed opacity-60">
                Blog
              </span>
              <Badge variant="outline" className="text-xs bg-blue-900 text-blue-300 border-blue-700">
                Coming Soon
              </Badge>
            </li>
            <li>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white p-0"
                onClick={() =>
                  window.open(WHATSAPP_GROUP_URL, "_blank")
                }
              >
                Join WhatsApp Group
              </Button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              📧{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>📱 +977-9754994807</li>
            <li>📍 Pokhara, Nepal</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        {/* Year is computed at render; suppress the warning if a static page is hydrated in a new year */}
        <p suppressHydrationWarning>
          &copy; {year} NomadLife. Proudly supporting Nepal&apos;s digital nomad
          community.
        </p>
      </div>
    </div>
  </footer>
  )
}
