import TokenCheck from "@/components/token/token"
import { getProfile } from "@/lib/getProfile"
import { getPrograms } from "@/lib/programm"
import { redirect } from "next/navigation"


export default async function Page() {
    const token = await TokenCheck()
    let user = null
        
    if (token) user = await getProfile(token)
    if (!user)  redirect("/login") 

    const programs = await getPrograms()    
    

    return (
        <section className='flex flex-col justify-center pb-20 px-4'>
            <h1 className='mt-27 text-prpl text-center'>Подача заявки на обучение</h1>

            <div className="max-w-[400px] mx-auto mt-28">
                <form className="border border-gray-300 py-4 px-6 rounded-md flex flex-col gap-3">
                    <h2>Форма подачи заявки</h2>
                    <input className="border py-1 px-2 border-gray-300 rounded-md w-[300px] text-default !font-normal text-lg" defaultValue={user.last_name} placeholder="Ваша фамилия"  />
                    <input className="border py-1 px-2 border-gray-300 rounded-md w-[300px] text-default !font-normal text-lg" defaultValue={user.name} placeholder="Ваше имя"  />
                    <input className="border py-1 px-2 border-gray-300 rounded-md w-[300px] text-default !font-normal text-lg" defaultValue={user.patronymic} placeholder="Ваше отчество" />                
                    <input className="border py-1 px-2 border-gray-300 rounded-md w-[300px] text-default !font-normal text-lg" defaultValue={`+${user.phone}`} placeholder="Ваш телефон" />
                    <input className="border py-1 px-2 border-gray-300 rounded-md w-[300px] text-default !font-normal text-lg" defaultValue={user.email} placeholder="Ваша почта" />
                    <select className="border py-1 px-2 border-gray-300 rounded-md max-w-[300px]">
                        {programs.map((p, index) => (
                            <option key={index}>{p.name}</option>
                        ))}
                    </select>
                    <button className="button-more">Отправить заявку</button>
                </form>
            </div>

        </section>
    )
}