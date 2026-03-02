import { getPromo } from "@/lib/promo"

export default async function PromoPage() {
  const promo = await getPromo()

  return (
    <section className='flex flex-col justify-center pb-20'>
      <h1 className='text-3xl font-normal mt-12 text-prpl'>Акции</h1>

      {promo.length === 0 ? (
        <p className="p-4 text-center text-zinc-500">Акции временно недоступны</p>
      ) : (
        <div className="grid grid-cols-2 gap-8 mt-8">
          {promo.map(p => (
            <div key={p.id} className="border-2 border-dotted border-zinc-300 rounded shadow-2xl bg-white p-6 relative">
              <h2 className="text-blue text-2xl">{p.name}</h2>
              <p className="text-xl text-prpl mt-4">{p.promoname}</p>
              <p className="text-default py-4">Условия предоставления:</p>
              <ul className="flex flex-col gap-4 text-default pb-8">
                <li>{p.title}</li>
                <li>{p.suptitle}</li>
                <li>{p.text}</li>
                <li>{p.clarification}</li>
              </ul>
              <small className="text-zinc-500 text-sm mt-8 absolute bottom-5 left-5">
                {new Date(p.created_at).toLocaleDateString('ru-RU')}
              </small>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
