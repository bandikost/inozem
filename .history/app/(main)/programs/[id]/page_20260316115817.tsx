import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getProgram, hasUserProgram } from "@/lib/programm"

interface ProgramsPageProps {
  params: { id: string }
}

async function getProfile(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {
    headers: { Cookie: `token=${token}` },
    cache: "no-store",
  })

  if (!res.ok) throw new Error("auth")

  return res.json()
}

export default async function Page({ params }: ProgramsPageProps) {

  const {id} = params

  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) redirect("/login")

  let user

  try {
    user = await getProfile(token)
  } catch {
    redirect("/login")
  }

  const hasAccess = await hasUserProgram(user.id, Number(id))

  if (!hasAccess) {
    return (
      <div className="mt-32 text-center">
        <h2 className="text-2xl font-semibold text-red-600">
          Программа не подключена
        </h2>
        <p className="mt-3 text-gray-600">
          Вы не записаны на данный курс
        </p>
      </div>
    )
  }

  const program = await getProgram(Number(id))

  if (!program) {
    return <div className="mt-20 text-center">Программа не найдена</div>
  }

  return (
    <section className="prose mx-auto p-4 mt-27">
      <h1 className="text-3xl font-semibold">{program.name}</h1>

      <div
        className="mt-6 program-description"
        dangerouslySetInnerHTML={{ __html: program.description }}
      />

      <div className="flex items-center mt-6">
        <button className="button-more">Оплатить обучение</button>
        <p className="ml-4">
          Итоговая цена:
          <span className="font-semibold underline ml-1">
            {program.price} ₽
          </span>
        </p>
      </div>

      <time className="text-sm mt-8 block mb-10">
        <strong>Даты проведения:</strong> {program.dates}
      </time>
    </section>
  )
}