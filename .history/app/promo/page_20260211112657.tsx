
type Promo = {
    id: number
    name: string
    promoname: string
    procent: number     
    title: string
    suptitle: string
    text: string
    clarification: string
    created_at: string
}


export default async function Page() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/promo`)
    if (!res.ok) throw new Error('Failed to fetch promotions')

    const promo: Promo[] = await res.json()

    return (
    <section className='flex flex-col justify-center pb-20'>
        <h1 className='text-3xl font-normal mt-12 text-prpl'>Акции</h1>

        <div className="grid grid-cols-2 gap-8 mt-8">
            {promo.map(promotion => (
            <div key={promotion.id} className="border-2 border-dotted border-zinc-300 rounded shadow-2xl bg-white p-6">
                <h2 className="text-blue text-2xl">{promotion.name}</h2>
                <p className="text-xl text-prpl mt-4">{promotion.promoname}</p>
                <p className="text-default py-4">Условия предоставления:</p>
                <ul className="flex flex-col gap-4 text-default pb-4">
                    <li >{promotion.title}</li>
                    <li>{promotion.suptitle}</li>
                    <li>{promotion.text}</li>
                    <li>{promotion.clarification}</li>
                </ul>
                <small className="text-default text-sm mt-8">{new Date(promotion.created_at).toLocaleDateString('ru-RU')}</small>
            </div>
            ))}
        </div>
    </section>
    )
}