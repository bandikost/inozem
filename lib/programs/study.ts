import { db } from "../db"


export async function getStudyByProgramId(programId: number) {
  const [rows] = await db.query(
    `
      SELECT
        id,
        program_id,
        price,
        title,
        description,
        teacher,
        teacher_description,
        teacher_img,
        purpose,
        conditions,
        audience,
        dates,
        paylink,
        title_bg,
        content,
        attendance_control,
        location,
        planned_results,
        created_at
      FROM study
      WHERE program_id = ?
      LIMIT 1
    `,
    [programId]
  )

  const result = rows as any[]

  return result[0] || null
}