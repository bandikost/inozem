import { getAccredShedule } from "@/lib/accred"



export default async function Page() {

    const schedule = await getAccredShedule()

    return (
        <section className="max-w-6xl mx-auto px-6 mt-34">
            {schedule.map(s => 
                <li key={s.id}>
                    {s.specialization}
                </li>
            )}
        </section>
    )
}