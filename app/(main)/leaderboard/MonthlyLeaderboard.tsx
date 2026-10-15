"use client";

import { useEffect, useState } from "react";
import {
  Trophy,
  Medal,
  Crown,
  ChevronDown,
  CalendarDays,
  LoaderCircle,
  Users,
} from "lucide-react";

interface TestResult {
  user_id: number;
  name: string;
  patronymic: string | null;
  last_name: string;
  result: number | string;
  exp: number;
  created_at: string;
}

interface Props {
  userId: number;
}

export default function MonthlyLeaderboard({ userId }: Props) {
  const [tests, setTests] = useState<string[]>([]);
  const [selectedTest, setSelectedTest] = useState("");
  const [results, setResults] = useState<TestResult[]>([]);
  const [loadingTests, setLoadingTests] = useState(true);
  const [loadingResults, setLoadingResults] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTests() {
      try {
        const response = await fetch("/api/leaderboard/monthly");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Ошибка загрузки тестов");
        }

        setTests(data.tests);

        if (data.tests.length > 0) {
          setSelectedTest(data.tests[0]);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Не удалось загрузить тесты"
        );
      } finally {
        setLoadingTests(false);
      }
    }

    loadTests();
  }, []);

  useEffect(() => {
    if (!selectedTest) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    async function loadResults() {
      setLoadingResults(true);
      setError("");

      try {
        const response = await fetch(
          `/api/leaderboard/monthly?test=${encodeURIComponent(selectedTest)}`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Ошибка загрузки рейтинга"
          );
        }

        setResults(data.results);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Не удалось загрузить рейтинг"
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoadingResults(false);
        }
      }
    }

    loadResults();

    return () => controller.abort();
  }, [selectedTest]);

  let previousScore: number | null = null;
  let previousRank = 0;

  const rankedResults = results.map((item, index) => {
    const score = Number(item.result);

    const rank =
      previousScore !== null && score === previousScore
        ? previousRank
        : index + 1;

    previousScore = score;
    previousRank = rank;

    return { ...item, score, rank };
  });

  const currentUser = rankedResults.find(
    (item) => item.user_id === userId
  );

  const topScore = rankedResults[0]?.score ?? 0;

  return (
    <section className="mt-14">
      <div className="mb-6">
        <p className="text-sm font-medium text-violet-700">
          Соревнование
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          Лучшие за месяц
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Выбери тест и посмотри, кто показал лучший результат
          за последние 30 дней.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm shadow-zinc-900/[0.03]">
        <div className="border-b border-zinc-100 bg-gradient-to-r from-purple-50/80 via-white to-violet-50/60 p-5 sm:p-7">
          <label
            htmlFor="monthly-test"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            Выбери тест
          </label>

          <div className="relative max-w-xl">
            <select
              id="monthly-test"
              value={selectedTest}
              onChange={(event) => setSelectedTest(event.target.value)}
              disabled={loadingTests || tests.length === 0}
              className="w-full appearance-none rounded-xl border border-zinc-200 bg-white px-4 py-3.5 pr-11 text-sm font-medium text-zinc-800 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingTests ? (
                <option value="">Загрузка тестов...</option>
              ) : tests.length === 0 ? (
                <option value="">Нет доступных тестов</option>
              ) : (
                tests.map((test) => (
                  <option key={test} value={test}>
                    {test}
                  </option>
                ))
              )}
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} />
              Последние 30 дней
            </span>

            <span className="flex items-center gap-1.5">
              <Users size={14} />
              {results.length}{" "}
              {results.length === 1
                ? "участник"
                : results.length >= 2 && results.length <= 4
                  ? "участника"
                  : "участников"}
            </span>
          </div>
        </div>

        {error ? (
          <div className="p-8 text-center">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        ) : loadingTests || loadingResults ? (
          <div className="flex flex-col items-center justify-center py-16 text-zinc-500">
            <LoaderCircle
              size={30}
              className="animate-spin text-violet-600"
            />
            <p className="mt-3 text-sm">Загружаем результаты...</p>
          </div>
        ) : rankedResults.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
              <Trophy size={26} />
            </div>
            <h3 className="mt-4 font-semibold text-zinc-900">
              Пока нет результатов
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              За последние 30 дней этот тест ещё никто не прошёл.
            </p>
          </div>
        ) : (
          <>
            {currentUser && (
              <div className="border-b border-violet-100 bg-violet-50/60 p-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-violet-700 shadow-sm">
                    <Trophy size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-violet-700">
                      Твой результат
                    </p>
                    <p className="mt-0.5 truncate font-semibold text-zinc-900">
                      {currentUser.rank === 1
                        ? "Ты на первом месте!"
                        : `Твоё место: ${currentUser.rank}`}
                    </p>
                  </div>

                  <p className="shrink-0 text-2xl font-semibold text-violet-800">
                    {currentUser.score}%
                  </p>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50/70 text-xs uppercase tracking-wider text-zinc-400">
                    <th className="w-20 px-5 py-4 font-medium sm:px-7">
                      Место
                    </th>
                    <th className="px-4 py-4 font-medium">
                      Участник
                    </th>
                    <th className="px-4 py-4 text-right font-medium">
                      Опыт
                    </th>
                    <th className="px-5 py-4 text-right font-medium sm:px-7">
                      Результат
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-100">
                  {rankedResults.map((item) => {
                    const isCurrentUser = item.user_id === userId;
                    const isFirst = item.rank === 1;

                    return (
                      <tr
                        key={`${item.user_id}-${item.created_at}`}
                        className={`transition ${
                          isCurrentUser
                            ? "bg-violet-50/70"
                            : "hover:bg-zinc-50/80"
                        }`}
                      >
                        <td className="px-5 py-4 sm:px-7">
                          {isFirst ? (
                            <div className="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                              <Crown size={19} />
                            </div>
                          ) : item.rank === 2 ? (
                            <div className="flex size-9 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500">
                              <Medal size={19} />
                            </div>
                          ) : item.rank === 3 ? (
                            <div className="flex size-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                              <Medal size={19} />
                            </div>
                          ) : (
                            <span className="flex size-9 items-center justify-center rounded-xl bg-zinc-50 text-sm font-semibold text-zinc-500">
                              {item.rank}
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                                isCurrentUser
                                  ? "bg-violet-200 text-violet-800"
                                  : "bg-zinc-100 text-zinc-600"
                              }`}
                            >
                              {item.name?.charAt(0)?.toUpperCase() || "?"}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-zinc-900">
                                {item.last_name} {item.name}
                                {item.patronymic
                                  ? ` ${item.patronymic}`
                                  : ""}
                              </p>
                              {isCurrentUser && (
                                <span className="text-xs font-medium text-violet-700">
                                  Это ты
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-right text-sm text-zinc-500">
                          {item.exp}
                        </td>

                        <td className="px-5 py-4 text-right sm:px-7">
                          <span
                            className={`inline-flex rounded-lg px-3 py-1.5 text-sm font-semibold ${
                              isFirst
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-zinc-100 text-zinc-700"
                            }`}
                          >
                            {item.score}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-100 bg-zinc-50/50 px-5 py-4 text-xs text-zinc-500 sm:px-7">
              <span>Рейтинг формируется по проценту правильных ответов</span>
              <span>
                Лучший результат:{" "}
                <strong className="text-zinc-800">{topScore}%</strong>
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}