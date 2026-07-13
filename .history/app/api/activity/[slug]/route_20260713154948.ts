import { db } from "@/lib/db";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  req: Request,
  { params }: Props
) {
  const { slug } = await params;

  const [rows] = await db.execute(
    `
    SELECT *
    FROM activity
    WHERE slug = ?
    LIMIT 1
    `,
    [slug]
  );

  const activity = (rows as any[])[0];

  if (!activity) {
    return Response.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  return Response.json(activity);
}