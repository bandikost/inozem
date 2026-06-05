

import mysql from "mysql2/promise";

declare global {
  var _mysqlPool: mysql.Pool | undefined;
}

const db = mysql.createPool ({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  charset: "utf8mb4",
  decimalNumbers: true,
  timezone: "+00:00",
  waitForConnections: true,
  connectionLimit: 30, 
  queueLimit: 0
})

const conn = await db.getConnection();
await conn.query("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
conn.release();

export { db };