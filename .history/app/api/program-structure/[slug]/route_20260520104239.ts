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

  if (!rows.length) {
    return Response.json(null)
  }

  return Response.json(JSON.parse(rows[0].data))
}


// PUT (FIXED)
export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const body = await req.json()

  // 1. получаем program_id
  const [program]: any = await db.query(
    `SELECT id FROM programms WHERE slug = ?`,
    [params.slug]
  )

  if (!program.length) {
    return Response.json(
      { error: "Program not found" },
      { status: 404 }
    )
  }

  const programId = program[0].id

  // 2. upsert через UPDATE/INSERT (стабильный вариант)
  const [existing]: any = await db.query(
    `SELECT id FROM program_structure WHERE slug = ?`,
    [params.slug]
  )

  if (existing.length === 0) {
    await db.query(
      `INSERT INTO program_structure (program_id, slug, data)
       VALUES (?, ?, ?)`,
      [programId, params.slug, JSON.stringify(body)]
    )
  } else {
    await db.query(
      `UPDATE program_structure SET data = ? WHERE slug = ?`,
      [JSON.stringify(body), params.slug]
    )
  }

  return Response.json({ ok: true })
}