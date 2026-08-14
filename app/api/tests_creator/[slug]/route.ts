import { deleteTest } from "@/lib/tests_creator/tests";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    await deleteTest(slug);

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("Ошибка удаления теста:", error);

    return Response.json(
      {
        success: false,
        error: "Не удалось удалить тест",
      },
      { status: 500 }
    );
  }
}