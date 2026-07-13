import { MoveLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";


export default async function Page() {
    const cookieStore = await cookies()
    const manager = cookieStore.get("manager")  
    if (!manager) redirect("/dashboard")

    return (
        <section className="max-w-6xl mx-auto px-6 mt-34">
            <Link href="/dashboard/manager" className="!text-lg !font-normal hover:underline flex items-center gap-1"><MoveLeft size={20} /> Вернуться в меню</Link>
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-prpl">
                Панель аккредитации
                </h1>
                

               
            </div>  
        </section>
    )
}