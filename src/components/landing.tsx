import Header from "./header"
import HeroSection from "./hero-section"
import EssentialServices from "./essential-services"
import EventsSection from "./events-section"
import PracticalInfo from "./practical-info"
import NomadTools from "./nomad-tools"
import Footer from "./footer"
import FeaturedWorkspaces from "./featured-workspaces"
  
  export default function NomadLifeLanding() {
    return (
      <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturedWorkspaces />
      {/* <ExploreNearby /> */}
      <EssentialServices />
      <EventsSection />
      <PracticalInfo />
      <NomadTools />
      <Footer />
      </div>
    )
  }
