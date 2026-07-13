import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";

import { getActivityBySlug } from "@/lib/activity";
import ActivityEditor from "@/components/activity/ActivityEditor";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({
  params,
}: PageProps) {
  const cookieStore = await cookies();

  if (!cookieStore.get("manager")) {
    redirect("/dashboard");
  }

  const { slug } = await params;

  const activity = await getActivityBySlug(slug);

  if (!activity) {
    notFound();
  }

  return (
    <ActivityEditor
      activity={activity}
    />
  );
}