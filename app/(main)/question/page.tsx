import FormQuestion from "@/components/forms/FormQuestion";
import { getProfile } from "@/lib/getProfile";
import { cookies } from "next/headers";
import QuestionFaq from "./QuestionFaq";

export const metadata = {
    title: "Задать вопрос | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»"
}

export default async function Page() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    let user = null
    if (token) user = await getProfile(token)

return (
    <section className='flex flex-col justify-center items-center pb-20 px-4'>
      <h1 className='mt-27 text-prpl text-center'>Задать вопрос</h1>

      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-12 items-center justify-items-center tablet:items-start mt-10">
        <QuestionFaq />
        <FormQuestion user={user} />
      </div>
        
      </section>
    )
}