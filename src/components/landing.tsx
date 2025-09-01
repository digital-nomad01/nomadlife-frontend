import Header from "./header"
import HeroSection from "./hero-section"
import EssentialServices from "./essential-services"
import EventsSection from "./events-section"
import PracticalInfo from "./practical-info"
import Footer from "./footer"
import FeaturedWorkspaces from "./featured-workspaces"
import { FeedbackSection } from "./feedback-section"
import { Suspense } from "react"
import PageTracker from "./page-tracker"
  
  export default function NomadLifeLanding() {
    
    return (
      <div className="min-h-screen bg-white">
      <PageTracker pageType="homepage" />
      <Header />
      <HeroSection />
      <FeaturedWorkspaces />
      {/* <ExploreNearby /> */}
      <EssentialServices />
      <EventsSection />
      <Suspense fallback={<div>Loading...</div>}>
        <PracticalInfo />

      </Suspense>
      <FeedbackSection />
      {/* <NomadTools /> */}
      <Footer />
      </div>
    )
  }
