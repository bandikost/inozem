import { getActivity } from "@/lib/activity"



export default async function Page() {

    const activity = await getActivity()


    return (
        <section className='flex flex-col justify-center pb-20 px-4'>
            <h1 className='mt-27 text-prpl text-center'>Образовательные мероприятия</h1>

            <h2 className="text-prpl mb-10">Предстоящие мероприятия </h2>
                <div className="grid grid-cols-2 gap-4">
                    {activity.map(act => (
                        <div key={act.id} className="border border-gray-300 shadow-2xl rounded-md p-4">
                            <h3 className="text-prpl">{act.name}</h3>
                            <div dangerouslySetInnerHTML={{ __html: act.dates }}/>
                        </div>
                    ))}
                </div>

                <h2 className="text-prpl mt-10">Прошедшие мероприятия</h2>
        </section>
    )
} 