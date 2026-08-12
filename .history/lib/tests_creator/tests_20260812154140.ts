
import { TestsCreated } from "@/app/interface/tests_creator";
import { db } from "../db";
import { RowDataPacket } from "mysql2";

export async function getTestsCreated(): Promise<TestsCreated[]> {
    const rows = await db.query<(TestsCreated & RowDataPacket)[]>(
        "SELECT id, slug, title, created_at FROM tests_creator"
    );

    return rows;
}