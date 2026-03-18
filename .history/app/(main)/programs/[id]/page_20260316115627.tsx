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
  const { id } = params
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) redirect("/login")

  let user
  try {
    user = await getProfile(token)
  } catch {
    redirect("/login")
  }

  const programId = parseInt(id, 10)
  if (isNaN(programId)) {
    return <div className="mt-32 text-center text-red-600">Некорректный ID программы</div>
  }

  // Получаем программу
  const program = await getProgram(programId)

  // Если программы нет в базе
  if (!program) {
    return (
      <div className="mt-32 text-center text-gray-700">
        <h2 className="text-2xl font-semibold">Программа не найдена</h2>
        <p className="mt-2">{`Описание: программа с таким ID не существует.`}</p>
      </div>
    )
  }

  // Проверяем, подключена ли программа пользователю
  const isConnected = await hasUserProgram(user.id, programId)

  return (
    <section className="prose mx-auto p-4 mt-12">
      <h1 className="text-3xl font-semibold">{program.name}</h1>
      <div
        className="mt-6 program-description"
        dangerouslySetInnerHTML={{ __html: program.description }}
      />

      <div className="mt-6 p-4 border rounded bg-gray-50 text-center">
        {isConnected ? (
          <span className="text-green-600 font-semibold">
            Вы подключены! Ожидайте начала программы
          </span>
        ) : (
          <span className="text-blue-600 font-semibold">
            Программа доступна для подключения
          </span>
        )}
      </div>

      <div className="flex items-center mt-6">
        <button className="button-more">Оплатить обучение</button>
        <p className="ml-4">
          Итоговая цена:
          <span className="font-semibold underline ml-1">{program.price} ₽</span>
        </p>
      </div>

      <time className="text-sm mt-8 block mb-10">
        <strong>Даты проведения:</strong> {program.dates}
      </time>
    </section>
  )
}