import FormApplication from "@/components/forms/FormApplication"
import { getProfile } from "@/lib/getProfile"
import { getPrograms } from "@/lib/programm"
import { cookies } from "next/headers"


export const metadata = {
    title: "Заявка на мероприятие | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»"
}


export default async function Page() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    let user = null
    if (token) user = await getProfile(token)
    const programs = await getPrograms()

    return (
        <section className='flex flex-col justify-center pb-20 px-4'>
            <h1 className='mt-27 text-prpl text-center'>Подача заявки на мероприятие</h1>
            <div className="max-w-[400px] mx-auto mt-20">
                <FormApplication user={user} programs={programs} />
            </div>
        </section>
    )
}