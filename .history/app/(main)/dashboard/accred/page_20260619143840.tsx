import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";




export default async function Page() {
    const cookieStore = await cookies()
          const manager = cookieStore.get("manager")
        
          if (!manager) redirect("/dashboard")

    return (
        <section className="max-w-6xl mx-auto px-6 mt-30">
            <div className="grid md:grid-cols-2 gap-6">
                <Link href="/dashboard/accred/schedule" className="group text-xl !font-normal bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">Формирование расписания</Link>
                <Link href="/dashboard/accred/results" className="group text-xl !font-normal bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">Протоколы</Link>
            </div>  
        </section>
    )
}