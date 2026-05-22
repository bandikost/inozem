export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY:", body);

    return Response.json({ ok: true });
  } catch (err: any) {
    console.error("API ERROR:", err);

    return Response.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}