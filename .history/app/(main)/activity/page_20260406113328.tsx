import { getActivity } from "@/lib/activity"



export default async function Page() {

    const activity = await getActivity()


    return (
        <section className='flex flex-col justify-center pb-20 px-4'>
            <h1 className='mt-27 text-prpl text-center'>Образовательные мероприятия</h1>

            <h2 className="text-prpl mb-10">Предстоящие мероприятия </h2>
                <div className="grid grid-cols-2 gap-4">
                    {activity.map(act => (
                        <div key={act.id} className="list-none">
                            <h3>{act.name}</h3>
                        </div>
                    ))}
                </div>

                <h2 className="text-prpl">Прошедшие мероприятия</h2>
        </section>
    )
} 