import {
  NextRequest,
  NextResponse,
} from "next/server"

import { db } from "@/lib/db"

export async function PUT(
  request: NextRequest
) {
  try {
    const body = await request.json()

    const {
      user_id,

      position,

      subjects,

      education,

      academic_degree,

      academic_title,

      advanced_training,

      professional_retraining,

      professional_experience,

      educational_programs,
    } = body

    if (!user_id) {
      return NextResponse.json(
        {
          error:
            "Не указан пользователь",
        },
        {
          status: 400,
        }
      )
    }

    const [
      existingRows,
    ] = await db.query(
      `
      SELECT id
      FROM teacher_details
      WHERE user_id = ?
      LIMIT 1
      `,
      [user_id]
    )

    const existing =
      existingRows as {
        id: number
      }[]

    if (existing.length > 0) {

      await db.query(
        `
        UPDATE teacher_details
        SET
          position = ?,
          subjects = ?,
          education = ?,
          academic_degree = ?,
          academic_title = ?,
          advanced_training = ?,
          professional_retraining = ?,
          professional_experience = ?,
          educational_programs = ?
        WHERE user_id = ?
        `,
        [
          position || null,

          subjects || null,

          education || null,

          academic_degree || null,

          academic_title || null,

          advanced_training || null,

          professional_retraining || null,

          professional_experience ?? null,

          educational_programs || null,

          user_id,
        ]
      )

    } else {

      await db.query(
        `
        INSERT INTO teacher_details (
          user_id,

          position,

          subjects,

          education,

          academic_degree,

          academic_title,

          advanced_training,

          professional_retraining,

          professional_experience,

          educational_programs
        )
        VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
        `,
        [
          user_id,

          position || null,

          subjects || null,

          education || null,

          academic_degree || null,

          academic_title || null,

          advanced_training || null,

          professional_retraining || null,

          professional_experience ?? null,

          educational_programs || null,
        ]
      )
    }

    return NextResponse.json(
      {
        success: true,

        message:
          "Информация сохранена",
      },
      {
        status: 200,
      }
    )

  } catch (error) {

    console.error(
      "Ошибка сохранения данных преподавателя:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Не удалось сохранить информацию",
      },
      {
        status: 500,
      }
    )
  }
}