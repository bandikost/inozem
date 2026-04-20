'use client'

import FormActivity from "@/components/forms/FormActivity"
import { getProfile } from "@/lib/getProfile"
import { cookies } from "next/headers"
import { useSearchParams } from "next/navigation"


export const metadata = {
    title: "Заявка на мероприятие | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»"
}


export default async function Page() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    let user = null
    if (token) user = await getProfile(token)
  
    const params = useSearchParams()
    const activity = params.get('name')

    return (
        <section className='flex flex-col justify-center pb-20 px-4'>
            <h1 className='mt-27 text-prpl text-center'>Подача заявки на мероприятие</h1>
            <div className="max-w-[400px] mx-auto mt-20">
                <FormActivity user={user} activity={activity} />
            </div>
        </section>
    )
}