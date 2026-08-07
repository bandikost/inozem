import { db } from "./db"



export async function getPayments() {
  const [rows] = await db.query(`
    SELECT 
      payments.*,
      users.email,
      users.phone,
      users.name,
      users.last_name,
      users.patronymic
    FROM payments
    LEFT JOIN users 
      ON users.id = payments.user_id
    ORDER BY payments.created_at DESC
  `);

  return rows as any[];
}