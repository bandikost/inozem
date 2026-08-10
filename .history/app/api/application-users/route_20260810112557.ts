import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2/promise";
import { sendApplicationEmail } from "@/lib/mails/application";

export async function POST(req: NextRequest) {
  try {
    const {
      last_name,
      patronymic,
      name,
      phone,
      email,
      education_level,
      specialization,
      programm_name,
    } = await req.json();

    const created_at = new Date();

    if (
      !last_name ||
      !patronymic ||
      !name ||
      !phone ||
      !email ||
      !education_level ||
      !programm_name
    ) {
      return NextResponse.json(
        { error: "Все поля обязательны" },
        { status: 400 }
      );
    }

    if (
      education_level !== "без образования" &&
      !specialization
    ) {
      return NextResponse.json(
        { error: "Выберите специальность" },
        { status: 400 }
      );
    }

    console.log("APPLICATION DATA:", {
      last_name,
      patronymic,
      name,
      phone,
      email,
      education_level,
      specialization,
      programm_name,
      created_at,
    });

    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO application (
        last_name,
        patronymic,
        name,
        phone,
        email,
        education_level,
        specialization,
        programm_name,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        last_name,
        patronymic,
        name,
        phone,
        email,
        education_level,
        specialization || null,
        programm_name,
        created_at,
      ]
    );

    console.log(
      "APPLICATION INSERTED:",
      result.insertId
    );

    try {
      await sendApplicationEmail(
        last_name,
        patronymic,
        name,
        phone,
        email,
        education_level,
        specialization || "",
        programm_name,
        created_at
      );

      console.log("APPLICATION EMAILS SENT");
    } catch (emailError) {
      console.error(
        "APPLICATION EMAIL ERROR:",
        emailError
      );
    }

    return NextResponse.json(
      {
        id: result.insertId,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "APPLICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    );
  }
}