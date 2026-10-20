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

const [rows] = await db.query(`SELECT * FROM tests_results WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH) order by created_at DESC`)


return rows as any[]

}