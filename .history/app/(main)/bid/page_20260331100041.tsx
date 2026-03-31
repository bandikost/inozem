import TokenCheck from "@/components/token/token"
import { redirect } from "next/navigation"


export default async function Page() {

    const token = await TokenCheck()
    if (!token) redirect("/login")

    return (
        <section className='flex flex-col justify-center pb-20 px-4'>
            <h1 className='mt-27 text-prpl text-center'>Подача заявки на обучение</h1>

            <div className="max-w-[400px] mx-auto mt-28">
                <form className="border border-gray-300 p-4">
                    <input placeholder="a" />
                </form>
            </div>

        </section>
    )
}