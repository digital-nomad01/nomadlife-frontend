// Site-wide settings for the Pokhara relaunch.

export type CityId = "pokhara" | "kathmandu"

export interface City {
  id: CityId
  name: string
  shortName: string
  /** Label shown in the destination chooser */
  label: string
  /** Query passed to the weather API */
  weatherQuery: string
}

export const ALL_CITIES: City[] = [
  {
    id: "pokhara",
    name: "Pokhara",
    shortName: "Pokhara",
    label: "🏔️ Pokhara - Lake City",
    weatherQuery: "Pokhara,NP",
  },
  {
    id: "kathmandu",
    name: "Kathmandu",
    shortName: "Ktm",
    label: "🏛️ Kathmandu - Capital",
    weatherQuery: "Kathmandu,NP",
  },
]

// Cities visitors can see and pick. Relaunch is Pokhara-only;
// add "kathmandu" back here to turn Kathmandu on again everywhere.
export const ENABLED_CITY_IDS: CityId[] = ["pokhara"]

export const ENABLED_CITIES: City[] = ALL_CITIES.filter((city) =>
  ENABLED_CITY_IDS.includes(city.id)
)

export const CONTACT_EMAIL = "hello@nomadlife.live"

export const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/DxLiGbhfHS8L9Bw8KUPzBm"

const LIST_YOUR_SPACE_SUBJECT = "List my space on NomadLife"
const LIST_YOUR_SPACE_BODY = [
  "Hi NomadLife team,",
  "",
  "I'd like to list my space.",
  "",
  "Space name:",
  "Type (coworking / cafe / coliving):",
  "Area / address:",
  "Wi-Fi speed:",
  "Price (day / week / month):",
  "Website or Instagram:",
  "Contact phone / WhatsApp:",
].join("\n")

export const LIST_YOUR_SPACE_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  LIST_YOUR_SPACE_SUBJECT
)}&body=${encodeURIComponent(LIST_YOUR_SPACE_BODY)}`
