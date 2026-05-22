import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug

  const [rows]: any = await db.query(
    `SELECT * FROM program_structure WHERE slug = ?`,
    [slug]
  )

  // 🔥 ДИАГНОСТИКА
  return Response.json({
    input: slug,
    rows
  })
}