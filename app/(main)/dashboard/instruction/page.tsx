
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt from "jsonwebtoken"
import LoadingLink from "@/components/Load/LoadingLink"
import { instructions } from "@/data/insruction"
import { ChevronRight } from "lucide-react"

export const metadata = {
  title:
    "Инструкции | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»",
}



export default async function InstructionPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    redirect("/login")
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!)
  } catch {
    redirect("/login")
  }

  const categories = [
    "Все инструкции",
    ...new Set(instructions.map((item) => item.category)),
  ]

  return (
    <section className="flex flex-col mt-27 px-6"> 
    <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 text-left">
      
                <LoadingLink href="/dashboard/manager" className="shrink-0 hover:text-blue transition hover:underline">
                    Главная страница Админки
                </LoadingLink>
            
                <ChevronRight size={14} className="shrink-0" />
            
                <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
                    Инструкции
                </span>
            
            </nav>
           

    
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-5 md:p-6 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-3xl">💡</span>
          <div>
            <h2 className="font-semibold text-gray-800 text-lg">
              Как пользоваться инструкциями?
            </h2>
            <p className="text-gray-600 mt-1 leading-relaxed">
              Выберите нужную тему и откройте PDF-файл.
              В инструкциях собраны пошаговые действия,
              которые помогут разобраться с функциями
              административной панели.
            </p>
          </div>
        </div>
      </div>


      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category, index) => (
          <span
            key={category}
            className={`px-4 py-2 rounded-xl text-sm font-medium border ${
              index === 0
                ? "bg-prpl text-white border-prpl"
                : "bg-white text-gray-600 border-gray-200"
            }`}
          >
            {category}
          </span>
        ))}
      </div>


      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Все материалы
          </h2>
          <p className="text-gray-500 mt-1">
            Выберите документ для просмотра или скачивания.
          </p>
        </div>

        <span className="text-sm text-gray-400 whitespace-nowrap">
          {instructions.length} документа
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {instructions.map((item) => (
          <article
            key={item.id}
            className="group bg-white rounded-2xl border border-gray-200 p-6 md:p-7 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            <div className="flex items-start justify-between gap-3 mb-5">
              <div className="w-14 h-16 rounded-xl bg-red-50 border border-red-100 flex flex-col items-center justify-center text-red-500 shrink-0">
                <span className="text-2xl">📄</span>
                <span className="text-[10px] font-bold tracking-wider">
                  PDF
                </span>
              </div>

              <span className="text-xs font-semibold text-prpl bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-lg">
                {item.category}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-800 group-hover:text-prpl transition-colors">
              {item.title}
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed mt-3 mb-6 flex-1">
              {item.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-gray-100">
              <a
                href={item.file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-prpl !text-white rounded-xl px-4 py-3 font-medium text-sm hover:opacity-90 transition"
              >
                Открыть инструкцию ↗
              </a>

              <a
                href={item.file}
                download
                title="Скачать PDF"
                aria-label={`Скачать ${item.title}`}
                className="flex items-center justify-center w-12 h-12 rounded-xl border border-gray-200 text-gray-600 hover:bg-purple-50 hover:text-prpl hover:border-purple-200 transition text-xl"
              >
                ↓
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-5">
        <span className="text-2xl">📌</span>
        <div>
          <h3 className="font-semibold text-gray-800">
            Не нашли нужную инструкцию?
          </h3>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            Обратитесь к ответственному за админку,
            чтобы добавить руководство по нужному разделу.
          </p>
        </div>
      </div>
    </section>
  )
}
