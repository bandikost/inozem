import { notFound } from "next/navigation"
import { Metadata } from "next"
import { safeFetch } from "@/lib/safeFetch"

type News = {
  id: number
  title: string
  text: string
  created_at: string
}

interface NewsPageProps {
  params: { id: string } | Promise<{ id: string }>
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { id } = await params
  const news = await safeFetch<News>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`, 
    { id: 0, title: 'Новость недоступна', text: '', created_at: new Date().toISOString() }, 60
  )

  if (news.id === 0) return { title: "Новость не найдена" }

  return {
    title: news.title,
    description: news.text.slice(0, 160),
    openGraph: {
      title: news.title,
      description: news.text.slice(0, 160),
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/news/${id}`,
      type: "article",
      publishedTime: news.created_at,
    },
    twitter: {
      title: news.title,
      description: news.text.slice(0, 160),
      card: "summary_large_image",
    },
  }
}

export default async function Page({ params }: NewsPageProps) {
  const { id } = await params
 const news = await safeFetch<News>(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`,
  {
    id: 0,
    title: "Новость недоступна",
    text: "",
    created_at: new Date().toISOString(),
  },
  60
)



  if (news.id === 0) notFound()

  return (
    <section className="prose mx-auto p-4 mt-27">
      <h1 className="text-zinc-800 text-3xl font-semibold">{news.title}</h1>
      <hr className="max-w-48" />
      <p className="mt-6">{news.text}</p>
      <small className="text-zinc-600 text-sm mt-8">
        {new Date(news.created_at).toLocaleDateString('ru-RU')}
      </small>
    </section>
  )
}
