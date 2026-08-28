import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"



export async function POST(req: NextRequest) {

    const {name, title, suptitle, description, admin_answer, rules} = await req.json()

    try {

        await db.query("Insert into notify (name, title, suptitle, description, admin_answer, rules) values (?,?,?,?,?,?)", [name, title, suptitle, description, admin_answer, rules])

        return NextResponse.json({ message: "Уведомление создано" })
     }

    catch(err) {
        return NextResponse.json({ message: "Ошибка сервера" })
    } 

}