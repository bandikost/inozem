import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,

  charset: "utf8mb4",
  decimalNumbers: true,
  timezone: "+00:00",

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query(sql: string, params?: any[]) {
  const conn = await db.getConnection();

  try {
    await conn.query("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
    return await conn.query(sql, params);
  } finally {
    conn.release();
  }
}