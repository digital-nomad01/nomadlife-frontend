import { notFound } from "next/navigation"
import { getSpaceById } from "@/app/actions"
import SpaceDetail from "@/components/space-detail"

interface SpacePageProps {
  params: {
    id: string
  }
}

export default async function SpacePage({ params }: SpacePageProps) {
  const { space, error } = await getSpaceById(params.id)

  if (error || !space) {
    notFound()
  }

  return <SpaceDetail space={space} />
}

export async function generateMetadata({ params }: SpacePageProps) {
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
