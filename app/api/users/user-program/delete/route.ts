import { db } from "@/lib/db";

export async function DELETE(req: Request) {
  try {
    const { userId, programId } = await req.json();

    if (!userId || !programId) {
      return Response.json(
        { error: "Не указан пользователь или программа" },
        { status: 400 }
      );
    }

    await db.query(
      `
      DELETE FROM user_programs
      WHERE user_id = ? AND programm_id = ?
      `,
      [userId, programId]
    );

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("Ошибка удаления программы:", error);

    return Response.json(
      {
        error: "Не удалось удалить программу",
      },
      { status: 500 }
    );
  }
}