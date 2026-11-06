import  Landing from "@/components/landing"

// The homepage reads spaces, events and stats from Supabase on the server.
// Re-render it at most every 5 minutes so new data shows up without a redeploy.
export const revalidate = 300

export default function Home() {
  return <Landing />
}
