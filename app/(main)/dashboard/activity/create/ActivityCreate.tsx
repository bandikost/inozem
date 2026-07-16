"use client";

import { useRouter } from "next/navigation";
import ActivityForm, {ActivityFormData} from "../ActivityForm";


export default function ActivityCreate() {
  const router = useRouter();

  async function handleCreate(data: ActivityFormData) {
    const res = await fetch("/api/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        year: data.year ? Number(data.year) : null,
      }),
    });

    if (!res.ok) {
      alert("Ошибка создания мероприятия");
      return;
    }

    alert("Мероприятие успешно создано");

    router.push(`/dashboard/activity/${data.slug}`);
  }

  return (
    <ActivityForm
      mode="create"
      initialData={{
        name: "",
        slug: "",
        title: "",
        dates: "",
        year: "",
        paylink: "",
        description: "",
        teacher: "",
        purpose: "",
        audience: "",
        conditions: "",
      }}
      onSubmit={handleCreate}
    />
  );
}