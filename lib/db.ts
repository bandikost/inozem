import mysql from "mysql2/promise";

const globalForMysql = globalThis as {
  pool?: mysql.Pool;
};

export const db =
  globalForMysql.pool ??
  mysql.createPool({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    connectionLimit: 30,
    waitForConnections: true,
  });

if (process.env.NODE_ENV !== "production") {
  globalForMysql.pool = db;
}