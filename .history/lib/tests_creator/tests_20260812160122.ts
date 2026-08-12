import { RowDataPacket } from "mysql2/promise";
import { db } from "../db";

export interface TestCreatedWithContent extends RowDataPacket {
  id: number;
  slug: string;
  title: string;
  created_at: Date | string;

  content_id: number | null;
  question_number: number | null;
  question: string | null;
  answers: string | null;
}

export async function getTestsCreatedBySlug(
  slug: string
): Promise<TestCreatedWithContent[]> {
  const [rows] = await db.execute<TestCreatedWithContent[]>(
    `
      SELECT 
        tc.id,
        tc.slug,
        tc.title,
        tc.created_at,
        tcc.id AS content_id,
        tcc.question_number,
        tcc.question,
        tcc.answers
      FROM tests_creator tc
      LEFT JOIN tests_creator_content tcc
        ON tcc.test_id = tc.id
      WHERE tc.slug = ?
      ORDER BY tcc.question_number ASC
    `,
    [slug]
  );

  return rows;
}