import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const specialty = searchParams.get("specialty")
    const year = searchParams.get("year")

    if (!specialty || !year) {
      return NextResponse.json([])
    }

    const [rows] = await db.execute(`
  SELECT 
    a.id,
    a.stage,
    a.specialty,
    a.date,
    a.timestart,
    r.id as result_id,
    r.title as result_title,
    r.file_url
  FROM accred a
  LEFT JOIN accred_results r ON a.id = r.accred_id
  WHERE a.specialty = ?
  AND YEAR(a.date) = ?
  ORDER BY a.date ASC
`, [specialty, year])

const grouped = rows.reduce((acc: any, row: any) => {
  if (!acc[row.id]) {
    acc[row.id] = {
      id: row.id,
      stage: row.stage,
      specialty: row.specialty,
      date: row.date,
      timestart: row.timestart,
      results: []
    }
  }

  if (row.result_id) {
    acc[row.id].results.push({
      id: row.result_id,
      title: row.result_title,
      file_url: row.file_url
    })
  }

  return acc
}, {})

return NextResponse.json(Object.values(grouped))


  } catch {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    )
  }
}
