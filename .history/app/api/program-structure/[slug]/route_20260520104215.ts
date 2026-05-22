import { db } from "@/lib/db"

// GET
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const [rows]: any = await db.query(
    `SELECT data FROM program_structure WHERE slug = ?`,
    [params.slug]
  )

  if (!rows?.[0]?.data) {
    return Response.json(null)
  }

  return Response.json(JSON.parse(rows[0].data))
}


// PUT
export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const body = await req.json()

  await db.query(
    `
   INSERT INTO program_structure (program_id, slug, data)
VALUES (?, ?, ?)
ON DUPLICATE KEY UPDATE data = VALUES(data)`,
    [
      params.slug,
      params.slug,
      JSON.stringify(body),
      JSON.stringify(body),
    ]
  )

  return Response.json({ ok: true })
}