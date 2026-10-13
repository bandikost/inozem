import { UserRow } from "@/app/interface/user";
import LoadingLink from "@/components/Load/LoadingLink";
import TokenCheck from "@/components/token/token";
import { getProfile } from "@/lib/getProfile";
import { getLeaderboardTests } from "@/lib/leaderboard";
import { ArrowUpRight, BookOpen, ChevronRight } from "lucide-react";
import { redirect } from "next/navigation";



export default async function Page() {
     const token = await TokenCheck()
    
      let user: UserRow
    
      try {
        user = await getProfile(token)
      } catch {
        redirect("/login")
      }
    
      
    const leaderboard = await getLeaderboardTests(user.id)

    return (
        <section className="min-h-screen">

      <div className="container mx-auto px-2 my-27">

        <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">

          <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
            Главная
          </LoadingLink>

          <ChevronRight size={14} />

          <LoadingLink href="/programs" className="shrink-0 hover:text-blue transition hover:underline">
            Образование
          </LoadingLink>

          <ChevronRight size={14} />

          <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
            Таблица результатов
          </span>

        </nav>
        <div className="mt-12">
  <div className="mb-5 flex items-end justify-between gap-4">
    <div>
      <p className="text-sm font-medium text-violet-700">Мои результаты</p>
      <h1 className="mt-1 text-2xl font-semibold text-zinc-900">
        Пройденные тесты
      </h1>
    </div>

    <span className="text-sm text-zinc-500">
      {leaderboard.length}{" "}
      {leaderboard.length === 1 ? "тест" : "тестов"}
    </span>
  </div>

  {leaderboard.length > 0 ? (
    <ul className="divide-y divide-zinc-200 border-y border-zinc-200">
      {leaderboard.map((test) => {
        const score = Number(test.result);

        return (
          <li key={test.id}>
            <LoadingLink
              href={`/tests/${encodeURIComponent(test.name_test)}`}
              className="group flex items-center gap-4 py-5 transition hover:bg-zinc-50 px-2"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
                <BookOpen size={20} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-zinc-900 group-hover:text-violet-800">
                  {test.name_test}
                </span>
                <span className="mt-1 block text-sm text-zinc-500">
                  {test.exp} баллов опыта
                  {test.created_at &&
                    ` · ${new Date(test.created_at).toLocaleDateString("ru-RU")}`}
                </span>
              </span>

              <span className="shrink-0 text-right">
                <span
                  className={`block text-lg font-semibold ${
                    score >= 70 ? "text-emerald-700" : "text-zinc-700"
                  }`}
                >
                  {score}%
                </span>
                <span className="text-xs text-zinc-500">результат</span>
              </span>

              <ArrowUpRight
                size={18}
                className="shrink-0 text-zinc-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-700"
              />
            </LoadingLink>
          </li>
        );
      })}
    </ul>
  ) : (
    <div className="border-y border-zinc-200 py-12 text-center">
      <BookOpen className="mx-auto text-zinc-400" size={28} />
      <p className="mt-3 font-medium text-zinc-800">Результатов пока нет</p>
      <p className="mt-1 text-sm text-zinc-500">
        Пройди тест, и он появится здесь.
      </p>
    </div>
  )}
</div>
        </div>
        </section>

    )
}