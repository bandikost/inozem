import { getAccredShedule } from "@/lib/accred";
import ScheduleEditor from "./components/ScheduleEditor";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Page() {
  const schedule = await getAccredShedule();

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-prpl mb-8">Редактирование расписания</h1>
      <Link href="/dashboard/manager" className="!text-lg !font-normal hover:underline flex items-center gap-1"><MoveLeft size={20} /> Вернуться в меню</Link>

      <ScheduleEditor schedule={schedule} />
    </section>
  );
}