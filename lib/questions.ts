import { db } from "./db"

export async function getQuestions(){

    const [rows] = await db.query(`SELECT * FROM question`)
    return rows as any[]

}