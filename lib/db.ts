import mysql from "mysql2/promise";

const globalForDb = global as unknown as {
  db?: mysql.Pool;
};

export const db =
  globalForDb.db ??
  mysql.createPool({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    waitForConnections: true,
    connectionLimit: 5,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}