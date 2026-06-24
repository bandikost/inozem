import Link from "next/link"
import { Metadata } from "next"
import { db } from "@/lib/db"
import { RowDataPacket } from "mysql2"

export const revalidate = 60

type NewsRow = RowDataPacket & {
  id: number
  slug: string
  header: string
  descript: string
  text: string
  date: string
}

async function getNews(): Promise<NewsRow[]> {
  const [rows] = await db.query<NewsRow[]>(
    `SELECT id, slug, header, descript, text, date
     FROM news
     ORDER BY date DESC`
  )

  return rows
}

export const metadata: Metadata = {
  title: "Новости",
  description: "Последние новости сайта",
}

export default async function NewsListPage() {
  const news = await getNews()

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-10">Новости</h1>

      <div className="grid gap-6">
        {news.map((n) => (
          <Link
            key={n.id}
            href={`/blog/${n.slug}`}
            className="border rounded-xl p-4 hover:shadow transition"
          >
            <h2 className="text-xl font-semibold">{n.header}</h2>
            <p className="text-gray-500 mt-2">
              {n.descript?.slice(0, 120)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}