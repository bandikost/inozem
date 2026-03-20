import { db } from "@/lib/db";

export async function POST(program?: {
  name: string;
  time: number;
  dates: string;
  education: string;
  specialization: string;
  isFavorite: number;
  description: string;
  price: number;
}) {
  if (program) {
    const { name, time, dates, education, specialization, isFavorite, description, price } = program;
    const [result] = await db.query(
      `INSERT INTO programms 
        (name, time, dates, education, specialization, isFavorite, description, price)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, time, dates, education, specialization, isFavorite, description, price]
    );
    return result;
  }

  const [rows] = await db.query(
    'SELECT id, name, time, dates, education, specialization, isFavorite, description, price FROM programms'
  );
  return rows;
}