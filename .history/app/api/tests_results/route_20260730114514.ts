import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2/promise";


export async function POST(req: Request) {

  try {

    const { 
      name_test, 
      name, 
      patronymic, 
      last_name, 
      result, 
      exp 
    } = await req.json();


    const [rows] = await db.query<ResultSetHeader>(
      `
      INSERT INTO tests 
      (user_id, name_test, name, patronymic, last_name, result, exp)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name_test,
        name,
        patronymic || null,
        last_name,
        result,
        exp
      ]
    );


    return NextResponse.json(
      { id: rows.insertId },
      { status: 201 }
    );


  } catch(error:any) {

    console.error("TEST INSERT ERROR:", error);

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status:500
      }
    );

  }
}