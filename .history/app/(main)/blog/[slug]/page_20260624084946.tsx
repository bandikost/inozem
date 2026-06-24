import { NewsRow } from "@/app/interface/news"
import { safeFetch } from "@/lib/safeFetch"
import { Metadata } from "next"
import { notFound } from "next/navigation"

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const news = await safeFetch<NewsRow>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${params.slug}`,
    {
      id: 0,
      slug: "",
      header: "",
      descript: "",
      text: "",
      date: new Date().toISOString(),
    },
    60
  )

  if (!news.id) {
    return { title: "Новость не найдена" }
  }

  return {
    title: news.header,
    description: news.descript || news.text.slice(0, 160),

    openGraph: {
      title: news.header,
      description: news.descript || news.text.slice(0, 160),
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${news.slug}`,
      type: "article",
      publishedTime: news.date,
    },

    twitter: {
      title: news.header,
      description: news.descript || news.text.slice(0, 160),
      card: "summary_large_image",
    },
  }
}

export default async function Page({ params }: PageProps) {
  const news = await safeFetch<NewsRow>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${params.slug}`,
    {
      id: 0,
      slug: "",
      header: "",
      descript: "",
      text: "",
      date: new Date().toISOString(),
    },
    60
  )

  if (!news.id) notFound()

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
              {news.header}
            </h1>

            <div className="mt-6 flex items-center gap-6 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                📅 {new Date(news.date).toLocaleDateString("ru-RU")}
              </div>

              <div className="flex items-center gap-2">
                ⏱ 3 минуты чтения
              </div>
            </div>

          </div>

          <div className="px-10 py-10">
            <div className="prose prose-zinc max-w-none">
              {news.text.split("\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

        </article>
      </div>
    </section>
  )
}