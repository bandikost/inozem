import { db } from "../db";



export async function getTestsCreated() {

    const rows = await db.query("select * from tests_creator")

    return rows
}