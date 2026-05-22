import { db } from "@/lib/db";

export async function getProgramBlocks(programId: number) {
  const [rows]: any = await db.query(
    "SELECT * FROM blocks WHERE program_id = ? ORDER BY id ASC",
    [programId]
  );

  return rows.map((block: any) => ({
    ...block,
    data: block.data
      ? JSON.parse(block.data)
      : {},
  }));
}