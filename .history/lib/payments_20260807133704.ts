import { db } from "./db"



export async function getPayments(){

const [rows] = await db.query(`SELECT * FROM payments`)


return rows as any[]

}