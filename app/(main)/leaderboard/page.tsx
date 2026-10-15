import { UserRow } from "@/app/interface/user";
import LoadingLink from "@/components/Load/LoadingLink";
import TokenCheck from "@/components/token/token";
import { getProfile } from "@/lib/getProfile";
import { getLeaderboardTests } from "@/lib/leaderboard";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Trophy,
  Target,
  Sparkles,
} from "lucide-react";
import { redirect } from "next/navigation";
import MonthlyLeaderboard from "./MonthlyLeaderboard";

export default async function Page() {
  const token = await TokenCheck();

  let user: UserRow;

  try {
    user = await getProfile(token);
  } catch {
    redirect("/login");
  }

  const leaderboard = await getLeaderboardTests(user.id)
  const totalTests = leaderboard.length
  const averageScore = totalTests > 0 ? Math.round(leaderboard.reduce((sum, test) => sum + Number(test.result), 0) / totalTests) : 0
  const bestScore = totalTests > 0 ? Math.max(...leaderboard.map((test) => Number(test.result))) : 0

  return (
    <section className="min-h-screen pb-10">
       <div className="container max-w-6xl px-2 my-27">
              <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-6">
         
               <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
                 Главная
               </LoadingLink>
         
               <ChevronRight size={14} className="shrink-0" />

               <LoadingLink href="/profile" className="shrink-0 hover:text-blue transition hover:underline">
                Личный кабинет
               </LoadingLink>

                <ChevronRight size={14} className="shrink-0" />
         
           <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
             Таблица результатов
           </span>
         
         </nav>

        <div className="relative mb-10 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#392044] via-[#63366f] to-[#87559a] p-7 text-white shadow-xl shadow-purple-950/10 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-2 -top-12 h-52 w-52 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-white/[0.04] blur-2xl" />

          <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-sm text-purple-100 backdrop-blur-sm">
                <Sparkles size={15} />
                Твоя образовательная статистика
              </div>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Мои результаты
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-6 text-purple-100/80 sm:text-base sm:leading-7">
                Здесь собраны результаты твоих тестирований.
                Следи за прогрессом, возвращайся к пройденным
                материалам и улучшай свои показатели.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-sm">
              <div className="flex size-12 items-center justify-center rounded-xl bg-white/10">
                <Trophy size={24} className="text-amber-300" />
              </div>

              <div>
                <p className="text-2xl font-semibold">
                  {totalTests}
                </p>
                <p className="text-sm text-purple-100/75">
                  {totalTests === 1
                    ? "Пройденный тест"
                    : totalTests >= 2 && totalTests <= 4
                      ? "Пройденных теста"
                      : "Пройденных тестов"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm shadow-zinc-900/[0.02] transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                <BookOpen size={21} />
              </div>
              <span className="text-xs font-medium text-zinc-400">
                ВСЕГО
              </span>
            </div>

            <p className="mt-5 text-3xl font-semibold tracking-tight text-zinc-900">
              {totalTests}
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              Пройдено тестов
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm shadow-zinc-900/[0.02] transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Target size={21} />
              </div>
              <span className="text-xs font-medium text-zinc-400">
                СРЕДНИЙ БАЛЛ
              </span>
            </div>

            <p className="mt-5 text-3xl font-semibold tracking-tight text-zinc-900">
              {averageScore}%
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              Средний результат
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm shadow-zinc-900/[0.02] transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <Trophy size={21} />
              </div>
              <span className="text-xs font-medium text-zinc-400">
                ЛУЧШИЙ
              </span>
            </div>

            <p className="mt-5 text-3xl font-semibold tracking-tight text-zinc-900">
              {bestScore}%
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              Максимальный результат
            </p>
          </div>
        </div>

       <MonthlyLeaderboard userId={user.id} />
        <div>
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mt-20">
            <div>
              <p className="text-sm font-medium text-violet-700">
                История обучения
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900">
                Пройденные тесты
              </h2>
            </div>

            <p className="text-sm text-zinc-500">
              Твои сохранённые результаты
            </p>
          </div>

          {leaderboard.length > 0 ? (
            <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {leaderboard.map((test) => {
                const score = Number(test.result);

                const scoreColor =
                  score >= 80
                    ? "text-emerald-700"
                    : score >= 60
                      ? "text-violet-700"
                      : "text-amber-700";

                const progressColor =
                  score >= 80
                    ? "bg-emerald-500"
                    : score >= 60
                      ? "bg-violet-600"
                      : "bg-amber-500";

                const status =
                  score >= 80
                    ? "Отличный результат"
                    : score >= 60
                      ? "Хороший результат"
                      : "Есть куда расти";

                return (
                  <li key={test.id}>
                    <LoadingLink
                      href={`/tests/${encodeURIComponent(test.name_test)}`}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm shadow-zinc-900/[0.02] transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-950/[0.06] sm:p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-50 to-violet-100 text-violet-700 transition group-hover:from-violet-100 group-hover:to-purple-200">
                          <BookOpen size={22} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-2 font-semibold leading-6 text-zinc-900 transition group-hover:text-violet-800">
                            {test.name_test}
                          </h3>

                          <p className="mt-1.5 text-sm text-zinc-500">
                            {test.created_at
                              ? new Date(test.created_at).toLocaleDateString(
                                  "ru-RU",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )
                              : "Дата не указана"}
                          </p>
                        </div>

                        <ArrowUpRight
                          size={19}
                          className="shrink-0 text-zinc-300 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-700"
                        />
                      </div>

                      <div className="mt-7 flex items-end justify-between gap-3">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                            Результат
                          </p>
                          <p
                            className={`mt-1 text-3xl font-semibold tracking-tight ${scoreColor}`}
                          >
                            {score}%
                          </p>
                        </div>

                        <div className="text-right">
                          <div className="mb-1.5 flex items-center justify-end gap-1.5 text-xs text-zinc-500">
                            <CheckCircle2 size={14} />
                            {status}
                          </div>
                          <p className="text-sm font-medium text-zinc-700">
                            +{test.exp} опыта
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                          style={{
                            width: `${Math.max(0, Math.min(100, score))}%`,
                          }}
                        />
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 text-sm">
                        <span className="text-zinc-500">
                          Посмотреть тест
                        </span>

                        <span className="flex items-center gap-1 font-medium text-violet-700 transition group-hover:gap-2">
                          Подробнее
                          <ArrowRight size={15} />
                        </span>
                      </div>
                    </LoadingLink>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
                <BookOpen size={30} strokeWidth={1.7} />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-zinc-900">
                Здесь пока пусто
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-500">
                Пройди свой первый тест, и здесь появятся твои
                результаты, набранные баллы и история обучения.
              </p>

              <LoadingLink
                href="/programs"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-prpl px-5 py-3 text-sm font-medium !text-white transition hover:opacity-90"
              >
                Перейти к обучению
                <ArrowRight size={17} />
              </LoadingLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}