import { db } from "@/lib/db"

export async function GET(req: Request, { params }: any) {
  const slug = params.slug

  const result = await db.query(
    `SELECT * FROM program_structure WHERE slug = ?`,
    [slug]
  )

  console.log("RAW DB RESULT:", result)

  return Response.json({
    debug: result,
    slug
  })
}