import LoadingLink from "@/components/Load/LoadingLink";
import { getTestsCreatedBySlug } from "@/lib/tests_creator/tests";
import { ChevronRight } from "lucide-react";
import TestEditor from "../../edit/[slug]/components/TestEditor";
import DeleteTestButton from "./components/DeleteTestButton";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface TestAnswer {
  id: number;
  text: string;
  correct: boolean;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const test = await getTestsCreatedBySlug(slug);

  if (!test || test.length === 0) {
    return (
      <section className="flex flex-col mt-27 px-6">
        <h1 className="text-prpl text-center">
          Тест не найден
        </h1>
      </section>
    );
  }

  const questions = test
    .filter((item) => item.content_id !== null)
    .map((item) => ({
      question_number: item.question_number ?? 1,
      question: item.question ?? "",
      answers: item.answers
        ? (JSON.parse(item.answers) as TestAnswer[])
        : [],
    }));

  return (
    <section className="flex flex-col mt-27 px-6 mb-10">

      <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">

        <LoadingLink
          href="/dashboard/manager"
          className="shrink-0 hover:text-blue transition hover:underline"
        >
          Главная страница Админки
        </LoadingLink>

        <ChevronRight size={14} />

        <LoadingLink
          href="/dashboard/test_creator"
          className="shrink-0 hover:text-blue transition hover:underline"
        >
          Тесты
        </LoadingLink>

        <ChevronRight size={14} />

        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          {test[0].title}
        </span>

      </nav>

      <h1 className="text-prpl text-center text-3xl font-semibold">
        Редактирование: {test[0].title}
      </h1>

      <DeleteTestButton slug={slug} />

      <TestEditor
        testId={test[0].id}
        initialQuestions={questions}
      />

    </section>
  );
}