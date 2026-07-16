import { updateActivityBySlug } from "../route";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await req.json()

  await updateActivityBySlug(slug, body)

  return Response.json({ success: true })
}