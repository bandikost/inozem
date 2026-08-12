import { TestsCreated } from "@/app/interface/tests_creator";
import { db } from "../db";
import { RowDataPacket } from "mysql2";



export async function getTestsCreated() {

    const rows = await db.query<TestsCreated[]  & RowDataPacket[]>("select * from tests_creator")

    return rows
}