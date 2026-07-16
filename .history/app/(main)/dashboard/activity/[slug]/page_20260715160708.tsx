import { getActivityBySlug } from "@/lib/activity";
import ActivityEditor from "./AcitivityComponent";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params
    const activity = await getActivityBySlug(slug)

  return <ActivityEditor activity={activity} initialSlug={slug} />;
}