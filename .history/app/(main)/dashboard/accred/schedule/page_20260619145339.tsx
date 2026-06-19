import { getAccredShedule } from "@/lib/accred"



export default async function Page() {

    const schedule = await getAccredShedule()

    return (
        <section className="max-w-6xl mx-auto px-6 mt-34">
            {schedule.map(s => 
                <div key={s.id} className="grid md:grid-cols-2 gap-6">
                    <p className="group text-xl !font-normal bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">{s.specialization}</p>
                </div>
            )}
        </section>
    )
}