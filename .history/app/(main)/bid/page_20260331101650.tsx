import TokenCheck from "@/components/token/token"
import { getProfile } from "@/lib/getProfile"
import { redirect } from "next/navigation"


export default async function Page() {
    const token = await TokenCheck()

    let user = null
        
    if (token) user = await getProfile(token)
    if (!user)  redirect("/login") 

    

    return (
        <section className='flex flex-col justify-center pb-20 px-4'>
            <h1 className='mt-27 text-prpl text-center'>Подача заявки на обучение</h1>

            <div className="max-w-[400px] mx-auto mt-28">
                <form className="border border-gray-300 py-4 px-6 rounded-md flex flex-col gap-4">
                    <input className="border py-1 px-2 border-gray-300 rounded-md w-[300px] text-default !font-normal" defaultValue={user.last_name} placeholder="Ваша фамилия"  />
                    <input className="border py-1 px-2 border-gray-300 rounded-md w-[300px] text-default !font-normal" defaultValue={user.name} placeholder="Ваше имя"  />
                    <input className="border py-1 px-2 border-gray-300 rounded-md w-[300px] text-default !font-normal" defaultValue={user.patronymic} placeholder="Ваше отчество" />                
                    <input className="border py-1 px-2 border-gray-300 rounded-md w-[300px] text-default !font-normal" defaultValue={`+${user.phone}`} placeholder="Ваш телефон" />
                    <input className="border py-1 px-2 border-gray-300 rounded-md w-[300px] text-default !font-normal" defaultValue={user.email} placeholder="Ваша почта" />
                    <select className="border border-gray-300 rounded-md">
                        <option>1</option>
                    </select>
                </form>
            </div>

        </section>
    )
}