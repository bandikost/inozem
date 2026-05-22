const slug = params.slug

const [rows]: any = await db.query(
  `SELECT id, slug, LENGTH(slug) as len FROM program_structure`
)

return Response.json({
  input: slug,
  rows
})