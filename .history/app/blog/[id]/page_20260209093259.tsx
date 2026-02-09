export const dynamic = 'force-dynamic'


import { notFound } from "next/navigation"
import { Metadata } from "next"

type News = {
  id: number
  title: string
  text: string
  created_at: string
};

// Динамическая генерация metadata для страницы новости
interface NewsPageProps {
  params: { id: string } | Promise<{ id: string }>
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  // Разворачиваем Promise, если params приходит как Promise
  const resolvedParams = await params
  const id = resolvedParams.id

  // Делаем fetch новости по ID
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`, {
    next: { revalidate: 300 }, // Кэш 5 минут
  });

 
  if (!res.ok) return { title: "Новость не найдена" }  // Если не нашли — возвращаем пустой metadata

  const news: News = await res.json()

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
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const resolvedParams = await params
  const id = resolvedParams.id

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`);

  if (!res.ok) notFound()

  const news: News = await res.json();

  return (
    <section className="prose mx-auto p-4">
      <h1 className="text-zinc-800 text-3xl font-semibold">{news.title}</h1>
      <hr className="max-w-48" />
      <p className="mt-6">{news.text}</p>
      <small className="text-zinc-600 text-sm mt-8">{new Date(news.created_at).toLocaleDateString('ru-RU')}</small>
    </section>
  );
}
