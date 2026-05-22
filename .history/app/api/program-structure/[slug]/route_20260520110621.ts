import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug

  // 1. PROGRAM
  const programResult: any = await db.query(
    `SELECT * FROM program_structure WHERE slug = ? LIMIT 1`,
    [slug]
  )

  const programRows = programResult?.[0]
  const program = programRows?.[0]

  if (!program) {
    return Response.json(null)
  }

  // 2. BLOCKS
  const blocksResult: any = await db.query(
    `SELECT * FROM blocks WHERE program_structure_id = ? ORDER BY position`,
    [program.id]
  )

  const blocks = blocksResult?.[0] || []

  const blockIds = blocks.map((b: any) => b.id)

  if (blockIds.length === 0) {
    return Response.json({ ...program, blocks: [] })
  }

  // 3. HEADLINES
  const headlinesResult: any = await db.query(
    `SELECT * FROM block_headlines WHERE block_id IN (?) ORDER BY position`,
    [blockIds]
  )

  const headlines = headlinesResult?.[0] || []

  // 4. SOURCES
  const sourcesResult: any = await db.query(
    `SELECT * FROM block_sources WHERE block_id IN (?)`,
    [blockIds]
  )

  const sources = sourcesResult?.[0] || []

  const sourceIds = sources.map((s: any) => s.id)

  // 5. LINKS
  let links: any[] = []

  if (sourceIds.length > 0) {
    const linksResult: any = await db.query(
      `SELECT * FROM block_links WHERE source_id IN (?)`,
      [sourceIds]
    )

    links = linksResult?.[0] || []
  }

  // 6. ASSEMBLE TREE
  const resultBlocks = blocks.map((b: any) => {
    return {
      ...b,
      headlines: headlines.filter((h: any) => h.block_id === b.id),
      sources: sources
        .filter((s: any) => s.block_id === b.id)
        .map((s: any) => ({
          ...s,
          links: links.filter((l: any) => l.source_id === s.id),
        })),
    }
  })

  return Response.json({
    ...program,
    blocks: resultBlocks,
  })
}