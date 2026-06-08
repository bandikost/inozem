import { Accred } from "@/app/interface/accred";
import { db } from "./db";
import { RowDataPacket } from "mysql2";


export async function getAccred(): Promise<Accred[]> {
    const [rows] = await db.query<Accred[] & RowDataPacket[]>(`
        select id, year, month, education, specializtion, stage, name, link, created_at from accredidation`)

    return rows
}