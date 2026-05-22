import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const [rows]: any = await db.query(
    `SELECT data FROM program_structure WHERE slug = ?`,
    [params.slug]
  )

  return Response.json(rows?.[0]?.data || [])
}



export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const body = await req.json()

  await db.query(
    `
    INSERT INTO program_structure (program_id, slug, data)
    VALUES (
      (SELECT id FROM programms WHERE slug = ?),
      ?,
      ?
    )
    ON DUPLICATE KEY UPDATE data = ?
    `,
    [params.slug, params.slug, JSON.stringify(body), JSON.stringify(body)]
  )

  return Response.json({ ok: true })
}