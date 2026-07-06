
import LoadingLink from "@/components/Load/LoadingLink"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function ManagerPage() {
  const cookieStore = await cookies()
  const manager = cookieStore.get("manager")

  if (!manager) redirect("/dashboard")

  return (
     <section className="max-w-6xl mx-auto px-6 mt-30">
  <div className="text-center mb-12">
    <h1 className="text-5xl font-bold text-prpl">
      Панель администратора
    </h1>

    <p className="text-gray-500 mt-3 text-lg">
      Управление пользователями, программами и документами
    </p>
  </div>

  <div className="grid md:grid-cols-2 gap-6">
 
    <LoadingLink
      href="/dashboard/users"
      className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
    >
      <div className="text-4xl mb-4">👤</div>

      <h2 className="text-2xl font-semibold text-prpl">
        Пользователи
      </h2>

      <p className="text-gray-500 mt-2">
        Выдача доступа и управление личными кабинетами.
      </p>
    </LoadingLink>

    <LoadingLink
      href="/dashboard/accred"
      className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
    >
      <div className="text-4xl mb-4">📄</div>

      <h2 className="text-2xl font-semibold text-prpl">
        Аккредитация
      </h2>

      <p className="text-gray-500 mt-2">
        Выгрузка протоколов и документов.
      </p>
    </LoadingLink>

    <LoadingLink
      href="/dashboard/programs"
      className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
    >
      <div className="text-4xl mb-4">🎓</div>

      <h2 className="text-2xl font-semibold text-prpl">
        Программы
      </h2>

      <p className="text-gray-500 mt-2">
        Управление программами обучения.
      </p>
    </LoadingLink>

    <LoadingLink
      href="/dashboard/admin"
      className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
    >
      <div className="text-4xl mb-4">⚙️</div>

      <h2 className="text-2xl font-semibold text-prpl">
        Редактор программ
      </h2>

      <p className="text-gray-500 mt-2">
        Наполнение и редактирование материалов.
      </p>
    </LoadingLink>

     <LoadingLink href="/dashboard/admin" className="group bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
      <div className="text-4xl mb-4">⚙️</div>

      <h2 className="text-2xl font-semibold text-prpl">
        Мероприятия
      </h2>

      <p className="text-gray-500 mt-2">
        Создание и редактирование мероприятий
      </p>
    </LoadingLink>
  </div>
</section>
  )
}