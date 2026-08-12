import { TestsCreated } from "@/app/interface/tests_creator";
import { db } from "../db";
import { RowDataPacket } from "mysql2";

export async function getTestsCreated(): Promise<TestsCreated[]> {
    const [rows] = await db.query<(TestsCreated & RowDataPacket)[]>(
        "SELECT id, slug, title, created_at FROM tests_creator"
    );

    return rows;
}

export async function getTestsCreatedBySlug(slug: string) { 
  const [rows] = await db.execute(`SELECT * FROM tests_creator_content WHERE slug = ? LIMIT 1 `, [slug] 

  ) 
  return (rows as any[])[0] ?? null
}