import { db } from "./db"

export async function getApplication(){

    const [rows] = await db.query(`SELECT * FROM application`)
    return rows as any[]

}