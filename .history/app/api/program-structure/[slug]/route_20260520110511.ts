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

  const program = Array.isArray(rows) ? rows[0] : null

  if (!program) {
    return Response.json(null)
  }

  const [blocksRows]: any = await db.query(
    `SELECT * FROM blocks WHERE program_structure_id = ? ORDER BY position`,
    [program.id]
  )

  const blocks = Array.isArray(blocksRows) ? blocksRows : []

  const blockIds = blocks.map((b: any) => b.id)

  if (blockIds.length === 0) {
    return Response.json({ ...program, blocks: [] })
  }

  const [headlinesRows]: any = await db.query(
    `SELECT * FROM block_headlines WHERE block_id IN (?)`,
    [blockIds]
  )

  const [sourcesRows]: any = await db.query(
    `SELECT * FROM block_sources WHERE block_id IN (?)`,
    [blockIds]
  )

  const sources = Array.isArray(sourcesRows) ? sourcesRows : []

  const sourceIds = sources.map((s: any) => s.id)

  let linksRows: any[] = []

  if (sourceIds.length > 0) {
    const [rows]: any = await db.query(
      `SELECT * FROM block_links WHERE source_id IN (?)`,
      [sourceIds]
    )
    linksRows = Array.isArray(rows) ? rows : []
  }

  const resultBlocks = blocks.map((b: any) => {
    const blockHeadlines = (headlinesRows || [])
      .filter((h: any) => h.block_id === b.id)
      .sort((a: any, c: any) => a.position - c.position)

    const blockSources = sources
      .filter((s: any) => s.block_id === b.id)
      .map((s: any) => ({
        ...s,
        links: linksRows.filter((l: any) => l.source_id === s.id),
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