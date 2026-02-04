import { notFound } from 'next/navigation'

type News = { // явно типизируем приходящие данные с бд
  id: number
  title: string
  text: string
  created_at: string
}

    // NEWS НЕ ОБЯЗАТЕЛЕН ПОСЛЕ РАЗРАБОТКИ, ОН ТУТ НУЖЕН ДЛЯ ПРЕДОТВРАЩЕНИЯ ОШИБОК

export default async function NewsPage({params}: {params: { id: string } | Promise<{ id: string }>}) {
  const resolvedParams = await params // Params приходит promise и его нужно развернуть в строку
  const id = resolvedParams.id  // Делаем id строкой

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`, {
    next: { revalidate: 300 }, // Обновление каждые 5 минут из кэша
  }) // localhost:3000 из файла .env.local - потом поменять на актульный

  if (!res.ok) notFound() // Если статуc err - вернет notFound

  const news: News = await res.json() // Передаем json в переменную

  return (
    <div>
      <h1>{news.title}</h1>
      <p>{news.text}</p>
      <small>{new Date(news.created_at).toLocaleString()}</small>
    </div>
  )
}
