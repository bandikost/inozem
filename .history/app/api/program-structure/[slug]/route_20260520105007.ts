import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug

  // 1. program
  const [programRows]: any = await db.query(
    `SELECT * FROM program_structure WHERE slug = ?`,
    [slug]
  )

  if (!programRows.length) {
    return Response.json(null)
  }

  const program = programRows[0]

  // 2. blocks
  const [blocks]: any = await db.query(
    `SELECT * FROM blocks WHERE program_structure_id = ? ORDER BY position`,
    [program.id]
  )

  const blockIds = blocks.map((b: any) => b.id)

  if (!blockIds.length) {
    return Response.json({ ...program, blocks: [] })
  }

  // 3. headlines
  const [headlines]: any = await db.query(
    `SELECT * FROM block_headlines WHERE block_id IN (?)`,
    [blockIds]
  )

  // 4. sources
  const [sources]: any = await db.query(
    `SELECT * FROM block_sources WHERE block_id IN (?)`,
    [blockIds]
  )

  const sourceIds = sources.map((s: any) => s.id)

  // 5. links
  let links: any[] = []
  if (sourceIds.length) {
    const [rows]: any = await db.query(
      `SELECT * FROM block_links WHERE source_id IN (?)`,
      [sourceIds]
    )
    links = rows
  }

  // ===== assemble tree =====

  const resultBlocks = blocks.map((b: any) => {
    const blockHeadlines = headlines
      .filter((h: any) => h.block_id === b.id)
      .sort((a: any, c: any) => a.position - c.position)

    const blockSources = sources
      .filter((s: any) => s.block_id === b.id)
      .map((s: any) => ({
        ...s,
        links: links.filter((l: any) => l.source_id === s.id),
      }))

    return {
      ...b,
      headlines: blockHeadlines,
      sources: blockSources,
    }
  })

  return Response.json({
    ...program,
    blocks: resultBlocks,
  })
}