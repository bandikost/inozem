import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug

  const [rows]: any = await db.query(
    `SELECT * FROM program_structure WHERE slug = ? LIMIT 1`,
    [slug]
  )

  const program = rows?.[0]

  if (!program) {
    return Response.json(null)
  }

  const [blocks]: any = await db.query(
    `SELECT * FROM blocks WHERE program_structure_id = ? ORDER BY position`,
    [program.id]
  )

  const blockIds = blocks.map((b: any) => b.id)

  if (!blockIds.length) {
    return Response.json({ ...program, blocks: [] })
  }

  const [headlines]: any = await db.query(
    `SELECT * FROM block_headlines WHERE block_id IN (?)`,
    [blockIds]
  )

  const [sources]: any = await db.query(
    `SELECT * FROM block_sources WHERE block_id IN (?)`,
    [blockIds]
  )

  const sourceIds = sources.map((s: any) => s.id)

  let links: any[] = []

  if (sourceIds.length) {
    const [linkRows]: any = await db.query(
      `SELECT * FROM block_links WHERE source_id IN (?)`,
      [sourceIds]
    )

    links = linkRows
  }

  const resultBlocks = blocks.map((b: any) => ({
    ...b,
    headlines: headlines.filter((h: any) => h.block_id === b.id),
    sources: sources
      .filter((s: any) => s.block_id === b.id)
      .map((s: any) => ({
        ...s,
        links: links.filter((l: any) => l.source_id === s.id),
      })),
  }))

  return Response.json({
    ...program,
    blocks: resultBlocks,
  })
}