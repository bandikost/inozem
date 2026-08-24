import { db } from "./db"

export async function getComments(programmId: number) {
    const [rows] = await db.query(
        `
        SELECT
            id,
            programm_id,
            name,
            last_name,
            patronymic,
            comment,
            DATE_FORMAT(created_at, '%d.%m.%Y') AS comment_date,
            DATE_FORMAT(created_at, '%H:%i') AS comment_time
        FROM comments
        WHERE programm_id = ?
        ORDER BY created_at DESC
        `,
        [programmId]
    )

    return rows as any[]
}