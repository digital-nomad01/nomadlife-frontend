import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Event } from "@/types/event"
import { OverviewTab } from "./tabs/overview-tab"
import { DetailsTab } from "./tabs/details-tab"
import { LocationTab } from "./tabs/location-tab"
import { OrganizerTab } from "./tabs/organizer-tab"

interface EventTabsProps {
  event: Event
}

export function EventTabs({ event }: EventTabsProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="location">Location</TabsTrigger>
        <TabsTrigger value="organizer">Organizer</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6 mt-2">
        <OverviewTab event={event} />
      </TabsContent>

      <TabsContent value="details" className="space-y-6 mt-2">
        <DetailsTab event={event} />
      </TabsContent>

      <TabsContent value="location" className="space-y-6 mt-2">
        <LocationTab event={event} />
      </TabsContent>

      <TabsContent value="organizer" className="space-y-6 mt-2">
        <OrganizerTab />
      </TabsContent>
    </Tabs>
  )
}


