import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getProgram, hasUserProgram, ProgramContent } from "@/lib/programm"
import PayButton from "@/components/ui/Buttons/PayButton"

interface ProgramsPageProps { params: { id: string } }

async function getProfile(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {
    headers: { Cookie: `token=${token}` },
    cache: "no-store",
  })

  if (!res.ok) throw new Error("auth")

  return res.json()
}

export default async function Page({ params }: ProgramsPageProps) {
  const { id } = await params
  const cookieStore = await cookies()
  const token =  cookieStore.get("token")?.value

  if (!token) redirect("/login")

  let user

  try {
    user = await getProfile(token)
  } catch {
    redirect("/login")
  }

  const hasAccess = await hasUserProgram(user.id, Number(id))
  const program = await getProgram(Number(id))
  const programmcontent = await ProgramContent(user.id, Number(id))

  if (!program) {
    return <div className="mt-20 text-center">Программа не найдена</div>
  }

  if (!hasAccess) {
    return (
      <div className="prose mx-auto p-4 mt-27">
        <h2 className="text-2xl font-semibold text-red-600 underline">Программа не подключена</h2>
        <p className="mt-3 text-gray-500 !font-semibold">{program.name}</p>
        <div className="mt-6 program-description" dangerouslySetInnerHTML={{ __html: program.description }}/>
        <div className="flex items-center mt-6">
        <div className="flex items-center">
        <p className="pr-4 ">Итоговая цена: {program.price}₽</p>
        <PayButton price={program.price} programId={program.id} userId={user.id} name={program.name}/>
</div>
      </div>
      </div>
    )
  }

  return (
    <section className="prose mx-auto p-4 mt-27">
      <h1 className="text-3xl font-semibold">{program.name}</h1>

      <div className="mt-6 program-description" dangerouslySetInnerHTML={{ __html: program.description }}/>

      <div className="mt-6">
  {programmcontent.map((section: any) => (
    <div key={section.id} className="mb-8">
      <h2 className="text-xl font-semibold">{section.title}</h2>

      <div className="mt-3 space-y-2">
        {section.items.map((item: any) => (
          <div key={item.id}>
            <p>{item.title}</p>

            {item.type === "video" && (
              <iframe src={item.content} className="w-full h-64" />
            )}

            {item.type === "file" && (
              <a href={item.content} target="_blank">
                📄 Скачать
              </a>
            )}

            {item.type === "text" && (
              <p className="text-gray-600">{item.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

      <time className="text-sm mt-4 block mb-10">
        <strong>Даты проведения:</strong> {program.dates}
      </time>


      

    </section>
  )
}