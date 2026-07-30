import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ResultSetHeader } from 'mysql2/promise';

export async function POST() {
    const { name_test, name, patronymic, last_name, result, exp, created_at } = await req.json()

    const [rows] = await db.query<ResultSetHeader[]>("insert into name_test, name, patronymic, last_name, result, exp, created_at where user_id = ?", 
        [name_test, name, patronymic, last_name, result, exp, created_at]
    )


    return NextResponse.json({ id: rows.insertId }, { status: 201 })
}