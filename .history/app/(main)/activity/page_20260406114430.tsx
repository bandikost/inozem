import { getActivity } from "@/lib/activity"
import Link from "next/link"



export default async function Page() {

    const activity = await getActivity()


    return (
        <section className='flex flex-col justify-center pb-20 px-4'>
            <h1 className='mt-27 text-prpl text-center'>Образовательные мероприятия</h1>

            <h2 className="text-prpl my-10">Предстоящие мероприятия </h2>
                <div className="grid grid-cols-2 gap-4">
                    {activity.map(act => (
                        <div key={act.id} className="border border-gray-300 shadow-2xl rounded-md p-4">
                            <h3 className="text-prpl">{act.name}</h3>
                            <div className="flex items-center mt-2 gap-4">
                                <div className="" dangerouslySetInnerHTML={{ __html: act.dates }}/>
                                <Link className="hover:underline !text-lg" href={`/activity/${act.slug}`}>Подробнее</Link>
                            </div>
                        </div>
                    ))}
                </div>

                <h2 className="text-prpl mt-10">Прошедшие мероприятия</h2>
        </section>
    )
} 