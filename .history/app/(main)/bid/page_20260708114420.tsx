import FormApplication from "@/components/forms/FormApplication"
import LoadingLink from "@/components/Load/LoadingLink"
import { getProfile } from "@/lib/getProfile"
import { ChevronRight } from "lucide-react"
import { cookies } from "next/headers"

export const revalidate = 3600


export const metadata = {
    title: "Заявка на обучение | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»"
}


export default async function Page() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    let user = null
    if (token) user = await getProfile(token)

    return (
        <section className='flex flex-col justify-center pb-20 px-4'>
            <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-6">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Заявка на обучение
        </span>
      
      </nav>
            <h1 className='mt-27 text-prpl text-center'>Подача заявки на обучение</h1>
            <div className="max-w-[400px] mx-auto mt-20">
                <FormApplication user={user} />
            </div>
        </section>
    )
}