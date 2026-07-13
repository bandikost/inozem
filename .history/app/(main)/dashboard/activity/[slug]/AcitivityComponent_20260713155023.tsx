"use client";

import ActivityForm, { ActivityFormData } from "../ActivityForm";


interface ActivityEditorProps {
  activity: any;
}

export default function ActivityEditor({
  activity,
}: ActivityEditorProps) {

  async function handleSave(data: ActivityFormData) {

    const res = await fetch(
      `/api/activity/${activity.slug}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          year: data.year
            ? Number(data.year)
            : null,
        }),
      }
    );

    if (!res.ok) {
      alert("Ошибка сохранения");
      return;
    }

    alert("Изменения сохранены");
  }

  return (
    <ActivityForm
      mode="edit"
      initialData={{
        name: activity.name ?? "",
        slug: activity.slug ?? "",
        title: activity.title ?? "",
        dates: activity.dates ?? "",
        year: activity.year?.toString() ?? "",
        paylink: activity.paylink ?? "",
        description: activity.description ?? "",
        teacher: activity.teacher ?? "",
        purpose: activity.purpose ?? "",
        audience: activity.audience ?? "",
        conditions: activity.conditions ?? "",
      }}
      onSubmit={handleSave}
    />
  );
}