
import { db } from "@/lib/db"
import Link from "next/link"

export default async function ContentPage() {
  const [rows]: any = await db.query(
    `SELECT id, name, slug FROM programms ORDER BY id DESC`
  )

  return (
    <div style={{ padding: 20 }}>
      <h1>Content Dashboard</h1>

      <div style={{ marginTop: 20 }}>
        {rows.map((p: any) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div>
              <div><b>{p.name}</b></div>
              <div style={{ opacity: 0.6 }}>{p.slug}</div>
            </div>

            <Link href={`/dashboard/content/${p.id}`}>
              <button>Редактировать структуру</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}