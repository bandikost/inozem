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