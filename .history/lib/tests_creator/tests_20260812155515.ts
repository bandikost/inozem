import { TestsCreated } from "@/app/interface/tests_creator";
import { db } from "../db";
import { RowDataPacket } from "mysql2/promise";

export async function getTestsCreated(): Promise<TestsCreated[]> {
  const [rows] = await db.query<(TestsCreated & RowDataPacket)[]>(
    `
      SELECT 
        id,
        slug,
        title,
        created_at
      FROM tests_creator
      ORDER BY created_at DESC
    `
  );

  return rows;
}


export async function getTestsCreatedBySlug(slug: string) {
  const [rows] = await db.execute(
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


export async function getTestsCreatedInfoContent(): Promise<TestsCreated[]> {
  const [rows] = await db.query<(TestsCreated & RowDataPacket)[]>(
    `
      SELECT 
        id,
        test_id,
        question_number,
        question,
        answers,
        created_at
      FROM tests_creator_content
    `
  );

  return rows;
}