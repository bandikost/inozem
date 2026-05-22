import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY:", body);

    const { specialization, blocks = [] } = body;

    const [result]: any = await db.query(
      "INSERT INTO programs (specialization) VALUES (?)",
      [specialization]
    );

    const programId = result.insertId;

    for (const block of blocks) {
      const [b]: any = await db.query(
        "INSERT INTO blocks (program_id, title, type) VALUES (?, ?, ?)",
        [programId, block.title, block.type]
      );

      const blockId = b.insertId;

      if (block.type === "main") {
        for (const h of block.headlines || []) {
          await db.query(
            "INSERT INTO headlines (block_id, text) VALUES (?, ?)",
            [blockId, h]
          );
        }
      }
    }

    return Response.json({ ok: true });
  } catch (err: any) {
    console.error("API CRASH:", err);

    return Response.json(
      {
        error: err.message,
        stack: err.stack,
      },
      { status: 500 }
    );
  }
}