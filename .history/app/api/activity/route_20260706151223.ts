import { db } from "@/lib/db"

export async function POST(req: Request) {
  const body = await req.json()

  await db.execute(
    `INSERT INTO activities (name, slug, title, dates, content)
     VALUES (?, ?, ?, ?, ?)`,
    [
      body.name,
      body.slug,
      body.title,
      body.dates,
      JSON.stringify(body.content)
    ]
  )

  return Response.json({ ok: true })
}