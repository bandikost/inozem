import mysql from "mysql2/promise";

declare global {
  var _mysqlPool: mysql.Pool | undefined;
}

const pool: mysql.Pool = global._mysqlPool ?? mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  charset: "utf8mb4",
  decimalNumbers: true,
  timezone: "+00:00",
  waitForConnections: true,
  connectionLimit: 20, 
  queueLimit: 0,
  connectTimeout: 10000
});

if (!global._mysqlPool) {
  global._mysqlPool = pool;

  pool.on("connection", async (conn) => {
    await conn.query("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
  });
  pool.on("error", (err) => {
  console.error("MySQL Pool Error:", err);
});
}

export const db = pool;