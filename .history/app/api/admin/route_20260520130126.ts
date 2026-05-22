import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { specialization, blocks } = body;

  const [programRes]: any = await db.query(
    "INSERT INTO programs (specialization) VALUES (?)",
    [specialization]
  );

  const programId = programRes.insertId;

  for (const block of blocks) {
    const [blockRes]: any = await db.query(
      "INSERT INTO blocks (program_id, title, type) VALUES (?, ?, ?)",
      [programId, block.title, block.type]
    );

    const blockId = blockRes.insertId;

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
}