import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY:", body);

    const {
      specialization,
      name,
      slug,
      price,
      education,
      category,
      diplom,
      time,
      blocks = []
    } = body;

    if (!specialization) {
      throw new Error("specialization is empty");
    }

    const [result]: any = await db.query(
      `INSERT INTO programms 
      (specialization, name, slug, price, education, category, diplom, time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        specialization,
        name,
        slug,
        price,
        education,
        category,
        diplom,
        time
      ]
    );

    const programId = result.insertId;

    for (const block of blocks) {
      if (!block.title || !block.type) {
        throw new Error("Invalid block");
      }

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

    return Response.json({ ok: true, programId });
  } catch (err: any) {
    console.error("🔥 API ERROR FULL:", err);

    return Response.json(
      {
        error: err.message,
        stack: err.stack,
      },
      { status: 500 }
    );
  }
}