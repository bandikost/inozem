import { db } from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug

  // ===== PROGRAM =====
  const [programRows]: any = await db.query(
    `SELECT * FROM program_structure WHERE slug = ? LIMIT 1`,
    [slug]
  )

  const program = programRows?.[0]

  if (!program) {
    return Response.json(null)
  }

  // ===== BLOCKS =====
  const [blocks]: any = await db.query(
    `SELECT * FROM blocks WHERE program_structure_id = ? ORDER BY position`,
    [program.id]
  )

  const blockList = blocks || []

  const blockIds = blockList.map((b: any) => b.id)

  // если блоков нет — сразу возвращаем
  if (blockIds.length === 0) {
    return Response.json({ ...program, blocks: [] })
  }

  // ===== HEADLINES =====
  const [headlines]: any = await db.query(
    `SELECT * FROM block_headlines WHERE block_id IN (?)`,
    [blockIds]
  )

  const headlineList = headlines || []

  // ===== SOURCES =====
  const [sources]: any = await db.query(
    `SELECT * FROM block_sources WHERE block_id IN (?)`,
    [blockIds]
  )

  const sourceList = sources || []

  const sourceIds = sourceList.map((s: any) => s.id)

  // ===== LINKS =====
  let linkList: any[] = []

  if (sourceIds.length > 0) {
    const [links]: any = await db.query(
      `SELECT * FROM block_links WHERE source_id IN (?)`,
      [sourceIds]
    )

    linkList = links || []
  }

  // ===== ASSEMBLY =====
  const resultBlocks = blockList.map((b: any) => ({
    ...b,
    headlines: headlineList.filter((h: any) => h.block_id === b.id),
    sources: sourceList
      .filter((s: any) => s.block_id === b.id)
      .map((s: any) => ({
        ...s,
        links: linkList.filter((l: any) => l.source_id === s.id),
      })),
  }))

  return Response.json({
    ...program,
    blocks: resultBlocks,
  })
}