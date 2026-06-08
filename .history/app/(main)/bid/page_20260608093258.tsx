import FormApplication from "@/components/forms/FormApplication"
import { getProfile } from "@/lib/getProfile"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic";


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
            <h1 className='mt-27 text-prpl text-center'>Подача заявки на обучение</h1>
            <div className="max-w-[400px] mx-auto mt-20">
                <FormApplication user={user} />
            </div>
        </section>
    )
}