import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { hasUserProgram } from "@/lib/programm"

async function getProfile(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {
    headers: { Cookie: `token=${token}` },
    cache: "no-store",
  })

  if (!res.ok) throw new Error("auth")

  return res.json()
}

interface Props {
  searchParams: {
    programId?: string
  }
}

export default async function SuccessPage({ searchParams }: Props) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) redirect("/login")

  const user = await getProfile(token)

  const programId = Number(searchParams.programId)

  if (!programId) {
    return <div className="mt-20 text-center">Оплата выполнена. Ожидаем подтверждение…</div>
  }

  const hasAccess = await hasUserProgram(user.id, programId)

  if (hasAccess) {
    redirect(`/program/${programId}`)
  }

  return (
    <div className="mt-20 text-center">
      <h2 className="text-xl font-semibold">Оплата прошла ✅</h2>
      <p className="mt-3 text-gray-500">
        Подтверждаем платёж… это может занять до 30 секунд.
      </p>
    </div>
  )
}