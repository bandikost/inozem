export async function GET(_: Request, { params }: any) {
  const [program] = await db.query(
    `SELECT * FROM programms WHERE id = ?`,
    [params.id]
  );

  const [blocks] = await db.query(
    `SELECT * FROM blocks WHERE program_id = ?`,
    [params.id]
  );

  return Response.json({
    ...program[0],
    blocks: blocks.map((b: any) => ({
      ...b,
      data: JSON.parse(b.data || "{}")
    }))
  });
}