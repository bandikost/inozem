import LoadingLink from "@/components/Load/LoadingLink";
import { ChevronRight } from "lucide-react";
import ActivityTable from "./components/ActivityTable";
import TestsTable from "./components/TestsTable";
import PaymentsTable from "./components/PaymentsTable";
import Link from "next/link";
import QuestionTable from "./components/QuestionsTable";
import LearningTable from "./components/LearningTable";

export const metadata = {
  title: 'Информация с базы | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}

interface Props {
  searchParams: Promise<{
    tab?: string;
  }>;
}

export default async function Page({ searchParams }: Props) {
  const { tab = "activity" } = await searchParams;

  return (
    <section className="mt-27 flex flex-col px-6">

      <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">
        <LoadingLink
          href="/dashboard/manager"
          className="hover:text-blue hover:underline"
        >
          Главная страница админки
        </LoadingLink>

        <ChevronRight size={14} />

        <span className="text-zinc-800 opacity-70">
          Информация из базы данных
        </span>
      </nav>

      <h1 className="text-3xl font-semibold text-prpl">
        📊 Информация из базы данных
      </h1>

      <p className="mt-2 text-gray-500">
        Выберите таблицу для просмотра.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link
          href="?tab=activity"
          className={`rounded-xl px-5 py-3 transition ${
            tab === "activity"
              ? "bg-prpl !text-white"
              : "bg-gray-100 border border-gray-300 hover:bg-gray-200"
          }`}
        >
          📋 Мероприятия
        </Link>

        <Link
          href="?tab=tests"
          className={`rounded-xl px-5 py-3 transition ${
            tab === "tests"
              ? "bg-prpl !text-white"
              : "bg-gray-100 border border-gray-300 hover:bg-gray-200"
          }`}
        >
          🧠 Тесты
        </Link>

        <Link
          href="?tab=payments"
          className={`rounded-xl px-5 py-3 transition ${
            tab === "payments"
              ? "bg-prpl !text-white"
              : "bg-gray-100 border border-gray-300 hover:bg-gray-200"
          }`}
        >
          💳 Платежи
        </Link>
        <Link
          href="?tab=question"
          className={`rounded-xl px-5 py-3 transition ${
            tab === "question"
              ? "bg-prpl !text-white"
              : "bg-gray-100 border border-gray-300 hover:bg-gray-200"
          }`}
        >
          ❓ Вопросы
        </Link>
        <Link
          href="?tab=learning"
          className={`rounded-xl px-5 py-3 transition ${
            tab === "learning"
              ? "bg-prpl !text-white"
              : "bg-gray-100 border border-gray-300 hover:bg-gray-200"
          }`}
        >
          🎓 Обучение
        </Link>
      </div>

      <div className="my-8">
        {tab === "activity" && <ActivityTable /> }
        {tab === "tests" && <TestsTable />}
        {tab === "payments" && <PaymentsTable />}
        {tab === "question" && <QuestionTable />}
        {tab === "learning" && <LearningTable />}
      </div>

    </section>
  );
}