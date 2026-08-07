import { db } from "./db"


export async function getUserTests(user_id:number){

const [rows] = await db.query(
`
SELECT *
FROM tests
WHERE user_id = ?
ORDER BY created_at DESC
`,
[user_id]
)


return rows as any[]

}


export async function getTests(){

const [rows] = await db.query(`SELECT * FROM tests`)


return rows as any[]

}