import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { specialization, blocks = [] } = body;

    const [programResult] = await db.query(
      "INSERT INTO programs (specialization) VALUES (?)",
      [specialization]
    );

    const programId = (programResult as any).insertId;

    for (const block of blocks) {
      const [blockResult] = await db.query(
        "INSERT INTO blocks (program_id, title, type) VALUES (?, ?, ?)",
        [programId, block.title, block.type]
      );

      const blockId = (blockResult as any).insertId;

      if (block.type === "main") {
        for (const h of block.headlines || []) {
          await db.query(
            "INSERT INTO headlines (block_id, text) VALUES (?, ?)",
            [blockId, h]
          );
        }
      }
    }

    return Response.json({ success: true });
  } catch (err: any) {
    console.error("API ERROR:", err);
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}