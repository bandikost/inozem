import { db } from "@/lib/db"

export async function POST(req: Request) {
  const body = await req.json()

  await db.execute(
  `INSERT INTO activity
  (
  name,
  slug,
  title,
  description,
  teacher,
  purpose,
  audience,
  conditions,
  dates,
  year,
  paylink,
  teacher_img,
  title_bg
  )
  VALUES
  (?,?,?,?,?,?,?,?,?,?,?,?,?)
  `,
  [
  body.name,
  body.slug,
  body.title,
  body.description,
  body.teacher,
  body.purpose,
  body.audience,
  body.conditions,
  body.dates,
  body.year,
  body.paylink,
  body.teacher_img,
  body.title_bg,
  body.teacher_img ?? null,
  body.title_bg ?? null,
  ]
  )

  return Response.json({ ok: true })
}