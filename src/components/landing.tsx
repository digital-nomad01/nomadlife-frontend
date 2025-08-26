import Header from "./header"
import HeroSection from "./hero-section"
import EssentialServices from "./essential-services"
import EventsSection from "./events-section"
import PracticalInfo from "./practical-info"
import Footer from "./footer"
import FeaturedWorkspaces from "./featured-workspaces"
import { FeedbackSection } from "./feedback-section"
  
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
      <FeedbackSection />
      {/* <NomadTools /> */}
      <Footer />
      </div>
    )
  }
