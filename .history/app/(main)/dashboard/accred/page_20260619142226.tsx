import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";




export default async function Page() {
    const cookieStore = await cookies()
          const manager = cookieStore.get("manager")
        
          if (!manager) redirect("/dashboard")

    return (
        <section className="max-w-6xl mx-auto px-6 mt-30">
            <Link href="/dashboard/accred/schedule">Формирование расписания</Link>
             <Link href="/dashboard/accred/results">Формирование расписания</Link>
        </section>
    )
}