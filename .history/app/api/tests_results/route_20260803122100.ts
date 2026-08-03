import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2/promise";


export async function POST(req: Request) {

  try {

    const { 
      user_id,
      name_test,
      name,
      patronymic,
      last_name,
      education_level,
      age,
      gender,
      result,
      exp,
    } = await req.json();


   const [rows] = await db.query<ResultSetHeader>(
  `
    INSERT INTO tests_results (
      user_id,
      name_test,
      name,
      patronymic,
      last_name,
      education_level,
      age,
      gender,
      result,
      exp
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  [
    user_id,
    name_test,
    name,
    patronymic,
    last_name,
    education_level,
    age,
    gender,
    result,
    exp,
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