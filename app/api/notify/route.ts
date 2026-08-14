import { getNotify } from "@/lib/notify";
import { getProfile } from "@/lib/getProfile";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = Math.min(
      Number(searchParams.get("limit")) || 2,
      10
    );

    const offset = Math.max(
      Number(searchParams.get("offset")) || 0,
      0
    );

    const rules = searchParams.get("rules") === "1";

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (rules) {
      if (!token) {
        return Response.json(
          { error: "Необходима авторизация" },
          { status: 401 }
        );
      }

      const user = await getProfile(token);

      if (!user?.isAdmin) {
        return Response.json(
          { error: "Недостаточно прав" },
          { status: 403 }
        );
      }
    }

    const notify = await getNotify(limit, offset, rules);

    return Response.json({
      notify,
      hasMore: notify.length === limit,
    });
  } catch (error) {
    console.error("Ошибка получения новостей:", error);

    return Response.json(
      { error: "Не удалось получить новости" },
      { status: 500 }
    );
  }
}