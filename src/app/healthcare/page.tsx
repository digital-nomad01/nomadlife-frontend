import { healthcareProviders } from "@/data/healthcare"
import HealthcareServices from "@/components/healthcare/healthcare"

export default function HealthcarePage() {
  return <HealthcareServices providers={healthcareProviders} />
}
 