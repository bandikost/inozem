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
    <section className="relative bg-gradient-to-b from-white via-zinc-50 to-white min-h-screen pt-32 pb-20">
    <div className="mx-auto max-w-5xl px-6">

      <div className="mb-8 text-sm text-zinc-500">
        Главная / Новости
      </div>

      
      <article className="rounded-3xl border border-zinc-200 bg-white shadow-sm overflow-hidden">

   
        <div className="border-b border-zinc-100 px-10 py-8">

          <p className="text-sm text-violet-600 font-medium uppercase tracking-widest">
            Новости
          </p>

          <h1 className="mt-4 text-4xl font-bold text-zinc-900 leading-tight">
            {news.title}
          </h1>

          <div className="mt-6 flex items-center gap-6 text-sm text-zinc-500">

            <div className="flex items-center gap-2">
              📅
              {new Date(news.created_at).toLocaleDateString("ru-RU")}
            </div>

            <div className="flex items-center gap-2">
              ⏱ 3 минуты чтения
            </div>

          </div>

        </div>

      
        <div className="px-10 py-10">

          <div className="prose prose-zinc max-w-none prose-headings:text-zinc-900 prose-p:text-zinc-700 prose-p:leading-8">

            {news.text.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

          </div>

        </div>

      </article>

    </div>
  </section>
  )
}
