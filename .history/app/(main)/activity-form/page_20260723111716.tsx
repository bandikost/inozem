import FormActivity from "@/components/forms/FormActivity"
import { getProfile } from "@/lib/getProfile"
import { cookies } from "next/headers"
import LoadingLink from "@/components/Load/LoadingLink"
import { ChevronRight } from "lucide-react"

export const metadata = {
  title:
    "Заявка на мероприятие | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»",
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  let user = null

  if (token) {
    user = await getProfile(token)
  }

  const params = await searchParams
  const activity = params.title || ""

  return (
    <section className="min-h-screen">
      <div className="container mx-auto my-27 px-4">

        <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">

          <LoadingLink
            href="/"
            className="shrink-0 transition hover:text-blue hover:underline"
          >
            Главная
          </LoadingLink>

          <ChevronRight size={14} className="shrink-0" />

          <LoadingLink
            href="/activity"
            className="shrink-0 transition hover:text-blue hover:underline"
          >
            Образовательные мероприятия
          </LoadingLink>

          <ChevronRight size={14} className="shrink-0" />

          <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
            Подача заявки
          </span>

        </nav>

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <h1 className="text-5xl font-bold text-prpl">
            Подача заявки на мероприятие
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-500">
            Заполните форму, чтобы подать заявку на участие в образовательном
            мероприятии.
          </p>

        </div>

        <FormActivity
          user={user}
          activity={activity}
        />

      </div>
    </section>
  )
}