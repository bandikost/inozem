import { getPromo } from "@/lib/promo"

export const revalidate = 3600

export const metadata = {
  title: 'Акции | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}


export default async function PromoPage() {
  const promo = await getPromo()

  return (
    <section className="min-h-screen">
    <div className="container mx-auto px-4 my-27">
       <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-6">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Акции
        </span>
      
      </nav>
      <h1 className='font-normal mt-27 text-prpl text-center'>Акции</h1>

      {promo.length === 0 ? (
        <p className="p-4 text-center text-zinc-500">Акции временно недоступны</p>
      ) : (
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8 mt-8 px-4">
          {promo.map(p => (
            <div key={p.id} className="border-2 border-dotted border-zinc-300 rounded shadow-2xl bg-white p-6 relative">
              <h2 className="text-blue text-2xl">{p.name}</h2>
              <p className="text-xl text-prpl mt-4">{p.promoname}</p>
              <p className="text-default py-4">Условия предоставления:</p>
              <ul className="flex flex-col gap-4 text-default pb-8 !text-lg">
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
      </div>
    </section>
  )
}
