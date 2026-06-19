import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";




export default async function Page() {
    const cookieStore = await cookies()
          const manager = cookieStore.get("manager")
        
          if (!manager) redirect("/dashboard")

    return (
        <section>
            <Link href="/dashboard/accred/schedule">Формирование расписания</Link>
        </section>
    )
}