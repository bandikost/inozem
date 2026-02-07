import { BadgePercent, Newspaper } from "lucide-react";
import Link from "next/link";

type News = { // явно типизируем приходящие данные с бд
  id: number
  title: string
  created_at: string
}


export default async function SecondBlock() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
    next: { revalidate: 60 }, // delay 1 min
  })

  if (!res.ok) throw new Error('Failed to fetch news') // обработчик ошибки

  const news: News[] = await res.json()

    return (
        <section className="grid grid-cols-2 justify-center gap-8 relative mt-10">
            <div className="border border-dotted border-zinc-300 rounded shadow-2xl">
                <div className="flex flex-col">
                    <h1 className="text-white bg-prpl text-3xl font-light px-8 py-4 rounded-t flex items-center  gap-2">
                        <Newspaper className="relative top-0.5"/>
                        Новые статьи в Блоге 
                    </h1>
                    <hr className="border-zinc-300" />
                    <ul className="w-full max-w-[580px] grid grid-cols-1 ">
                        {news
                        .slice(0, 3)
                        .map((n, idx) => (
                            <div key={n.id}>
                                <Link href={`/blog/${n.id}`} className="flex flex-col gap-1 py-4 rounded-t text-default hover:text-white hover:bg-prpl transition-colors hover:underline">
                                    <h2 className=" text-lg px-6">{idx + 1}. {n.title.slice(0, 50)}{n.title.length > 50 ? '...' : ''}</h2>
                                    <small className="text-xs px-6 relative -top-1">{new Date(n.created_at).toLocaleDateString('ru-RU')}</small>
                                </Link>
                                <hr className="border-zinc-300" />
                            </div>
                            
                        ))}
                    </ul>
                </div>
            </div>
            <div className="border-2 border-dotted border-zinc-300 rounded shadow-2xl">
                <h1 className="text-blue text-3xl font-light px-8 py-4 rounded-t flex items-center justify-center gap-2">
                    <BadgePercent className="relative top-0.5"/> 
                    Акции и скидки! 
                </h1>
                <hr className="border-zinc-300" />
                <div className="flex flex-col items-center">
                    <p className="text-default text-center mt-6 text-md">Специально для вас мы подготовили раздел акций и скидок, приуроченных к важным медицинским и не только событиям. Не пропустите!
                    <Link href="/" className="ml-2 underline text-blue">Ознакомиться со всеми акциями</Link></p>
                </div>
            </div>
        </section>
    )
}