import { notFound } from "next/navigation"
import { getSpaceById } from "@/app/actions"
import SpaceDetail from "@/components/space-detail"
import PageTracker from "@/components/page-tracker"


export default async function SpacePage({ params }: any) {
  const { space, error } = await getSpaceById(params.id)

  if (error || !space) {
    notFound()
  }

  return <><PageTracker pageType="space" pageData={{ id: space.id.toString(), name: space.name, location: space.location, category: space.space_type, slug: space.name }} /><SpaceDetail space={space} /></>
}

export async function generateMetadata({ params }: any) {
  const { space } = await getSpaceById(params.id)
  
  if (!space) {
    return {
      title: 'Space Not Found',
    }
  }

  return {
    title: `${space.name} - NomadLife`,
    description: space.short_description,
  }
}
