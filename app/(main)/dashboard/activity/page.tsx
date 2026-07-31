import LoadingLink from "@/components/Load/LoadingLink";
import { getActivity } from "@/lib/activity";
import {
  ChevronRight,
  CalendarDays,
  Pencil,
  Plus,
  ArrowRight,
} from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
  const cookieStore = await cookies();
  const manager = cookieStore.get("manager");

  if (!manager) {
    redirect("/dashboard");
  }

  const activity = await getActivity();

  return (
    <section className="mx-auto mt-27 max-w-7xl px-6 pb-16">

      <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">

        <LoadingLink
          href="/dashboard/manager"
          className="
            shrink-0
            transition
            hover:text-blue
            hover:underline
          "
        >
          Главная страница Админки
        </LoadingLink>

        <ChevronRight
          size={14}
          className="shrink-0"
        />

        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Мероприятия
        </span>

      </nav>


      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Мероприятия
          </h1>

          <p className="mt-2 text-zinc-500">
            Создание и редактирование образовательных мероприятий.
          </p>

        </div>


        <LoadingLink
          href="/dashboard/activity/create"
          className="
            button-more
            inline-flex
            items-center
            justify-center
            gap-2
          "
        >
          <Plus size={18} />
          Создать мероприятие
        </LoadingLink>

      </div>

      <div className="grid gap-5">

        {activity.map((item) => (

          <LoadingLink
            key={item.id}
            href={`/dashboard/activity/${item.slug}`}
            className="
              group
              rounded-3xl
              border
              border-zinc-200
              bg-white
              p-6
              shadow-sm
              transition
              hover:-translate-y-1
              hover:border-zinc-300
              hover:shadow-xl
            "
          >

            <div className="
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-center
              lg:justify-between
            ">


              <div className="min-w-0">

                <h2 className="
                  break-words
                  text-2xl
                  font-bold
                  text-zinc-900
                ">
                  {item.name}
                </h2>


                {item.title && (

                  <p className="
                    mt-2
                    break-words
                    text-zinc-500
                  ">
                    {item.title}
                  </p>

                )}


                <div className="mt-5 flex flex-wrap gap-3">

                  <div className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-zinc-100
                    px-3
                    py-2
                    text-sm
                    text-zinc-700
                  ">

                    <CalendarDays size={16} />

                    {item.dates || "Дата не указана"}

                  </div>

                  <div className="
                    rounded-xl
                    bg-zinc-100
                    px-3
                    py-2
                    text-sm
                    text-zinc-700
                  ">

                    {item.year ?? "Без года"}

                  </div>

                  <div className="
                    max-w-full
                    truncate
                    rounded-xl
                    bg-zinc-100
                    px-3
                    py-2
                    text-sm
                    text-zinc-500
                  ">

                    /{item.slug}

                  </div>

                </div>

              </div>

              <div className="
                flex
                shrink-0
                items-center
                gap-3
              ">

                <div className="
                  rounded-2xl
                  bg-zinc-100
                  p-3
                  transition
                  group-hover:bg-black
                  group-hover:text-white
                ">

                  <Pencil size={20} />

                </div>

                <ArrowRight
                  className="
                    transition
                    group-hover:translate-x-1
                  "
                  size={20}
                />

              </div>

            </div>

          </LoadingLink>

        ))}

      </div>




      {activity.length === 0 && (

        <div className="
          rounded-3xl
          border
          border-dashed
          border-zinc-300
          bg-zinc-50
          py-20
          text-center
        ">

          <h2 className="text-2xl font-semibold">
            Пока нет мероприятий
          </h2>

          <p className="mt-3 text-zinc-500">
            Создайте первое мероприятие, чтобы начать работу.
          </p>

          <LoadingLink
            href="/dashboard/activity/create"
            className="
              button-more
              mt-6
              inline-flex
              items-center
              gap-2
            "
          >
            <Plus size={18} />
            Создать мероприятие
          </LoadingLink>

        </div>

      )}

    </section>
  );
}