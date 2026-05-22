import { db } from "@/lib/db"
import Link from "next/link"

export default async function Page() {
  const [rows]: any = await db.query(`
    SELECT name, slug FROM programms
  `)

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        Админка программ
      </h1>

      <div className="space-y-3">
        {rows.map((p: any) => (
          <Link
            key={p.slug}
            href={`/dashboard/content/${p.slug}`}
            className="block p-3 border rounded"
          >
            {p.name}
          </Link>
        ))}
      </div>
    </div>
  )
}