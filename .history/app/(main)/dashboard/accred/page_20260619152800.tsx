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
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-prpl">
                Панель аккредитации
                </h1>

                <p className="text-gray-500 mt-3 text-lg">
                    Управление расписанием и протоколов
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <Link href="/dashboard/accred/schedule" className="group text-xl !font-normal bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                    <div className="text-4xl mb-4">📅</div>

                    <h2 className="text-2xl font-semibold text-prpl">
                        Предстоящие
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Расписание экзаменов.
                    </p>
                </Link>

                <Link href="/dashboard/accred/results" className="group text-xl !font-normal bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                    <div className="text-4xl mb-4">📄</div>

                    <h2 className="text-2xl font-semibold text-prpl">
                        Прощедшие
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Выгрузка протоколов.
                    </p>
                </Link>
            </div>  
        </section>
    )
}