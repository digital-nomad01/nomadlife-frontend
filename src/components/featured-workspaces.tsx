import WorkspaceCard from "./workspace-card"
import { workspaces } from "@/data/workspaces"

interface FeaturedWorkspacesProps {
  className?: string
}

export default function FeaturedWorkspaces({ className = "" }: FeaturedWorkspacesProps) {
  return (
    <section id="workspaces" className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Workspaces
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked coworking spaces with reliable internet, stunning
            views, and vibrant communities
          </p>
        </div>

        {/* Workspaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {workspaces.map((workspace) => (
            <WorkspaceCard key={workspace.id} workspace={workspace} />
          ))}
        </div>

      
      </div>
    </section>
  )
}