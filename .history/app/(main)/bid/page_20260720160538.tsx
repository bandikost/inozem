import FormApplication from "@/components/forms/FormApplication"
import LoadingLink from "@/components/Load/LoadingLink"
import { getProfile } from "@/lib/getProfile"
import { getPrograms } from "@/lib/programm"
import { ChevronRight } from "lucide-react"
import { cookies } from "next/headers"

export const revalidate = 3600

export const metadata = {
  title:
    "Заявка на обучение | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»",
}

export default async function Page() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  const programs = await getPrograms()

  let user = null

  if (token) {
    user = await getProfile(token)
  }

  return (
    <section className="min-h-screen">
    <div className="container mx-auto px-4 my-27">
      <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 px-6 text-md text-zinc-500">
        <LoadingLink
          href="/"
          className="shrink-0 transition hover:text-blue hover:underline"
        >
          Главная
        </LoadingLink>

        <ChevronRight size={14} className="shrink-0" />

        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Заявка на обучение
        </span>
      </nav>

      <h1 className="mt-27 text-center text-prpl">
        Подача заявки на обучение
      </h1>

      <div className="mx-auto mt-14 w-full max-w-3xl">
        <FormApplication user={user} />
      </div>
      </div>
    </section>
  )
}