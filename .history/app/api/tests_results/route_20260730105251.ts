import { Tests } from "@/app/interface/tests";
import { db } from "@/lib/db";
import { ResultSetHeader } from 'mysql2/promise';

export async function POST() {

    const [rows] = await db.query<ResultSetHeader[]>()


    return rows[0]
}