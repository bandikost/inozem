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
      blocks = [],
    } = body;

    if (!specialization) {
      throw new Error("specialization is empty");
    }

    // 1. INSERT PROGRAM
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
        time,
      ]
    );

    const programId = result.insertId;

    // 2. INSERT BLOCKS
    for (const block of blocks) {
      if (!block.title || !block.type) {
        throw new Error("Invalid block");
      }

      // 🔥 ВАЖНО: нормализуем data
      const data = block.data ?? {
        headlines: [],
        sources: [],
        links: [],
      };

      const [b]: any = await db.query(
        `INSERT INTO blocks (program_id, title, type, data)
         VALUES (?, ?, ?, ?)`,
        [
          programId,
          block.title,
          block.type,
          JSON.stringify(data), // 🔥 ВОТ ЭТО ТЫ ПРОПУСКАЛ
        ]
      );

      const blockId = b.insertId;

      // 3. OPTIONAL: legacy headlines table (если ещё используешь)
      if (block.type === "main" && Array.isArray(data.headlines)) {
        for (const h of data.headlines) {
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