import { db } from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await params;

    const programId = Number(id);

    if (!programId) {
      return Response.json(
        { error: "Invalid id" },
        { status: 400 }
      );
    }

    const body = await req.json();

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

    // UPDATE PROGRAM

    await db.query(
      `UPDATE programms
       SET
        specialization = ?,
        name = ?,
        slug = ?,
        price = ?,
        education = ?,
        category = ?,
        diplom = ?,
        time = ?
       WHERE id = ?`,
      [
        specialization,
        name,
        slug,
        price,
        education,
        category,
        diplom,
        time,
        programId,
      ]
    );

    // DELETE OLD BLOCKS

    await db.query(
      `DELETE FROM blocks WHERE program_id = ?`,
      [programId]
    );

    // INSERT NEW BLOCKS

    for (const block of blocks) {

      await db.query(
        `INSERT INTO blocks
        (program_id, title, type, data)
        VALUES (?, ?, ?, ?)`,
        [
          programId,
          block.title,
          block.type,
          JSON.stringify({
            headlines: block.data?.headlines ?? [],
            sources: block.data?.sources ?? [],
            links: block.data?.links ?? [],
          }),
        ]
      );

    }

    return Response.json({
      ok: true,
    });

  } catch (err: any) {

    console.error(err);

    return Response.json(
      {
        error: err.message,
      },
      { status: 500 }
    );

  }
}