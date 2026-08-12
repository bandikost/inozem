import LoadingLink from "@/components/Load/LoadingLink";
import { getTestsCreatedBySlug } from "@/lib/tests_creator/tests";
import { ChevronRight } from "lucide-react";

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

  return (
    <section className="flex flex-col mt-27 px-6">

      <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 text-left">

        <LoadingLink
          href="/dashboard/manager"
          className="shrink-0 hover:text-blue transition hover:underline"
        >
          Главная страница Админки
        </LoadingLink>

        <ChevronRight size={14} className="shrink-0" />

        <LoadingLink
          href="/dashboard/test_creator"
          className="shrink-0 hover:text-blue transition hover:underline"
        >
          Тесты
        </LoadingLink>

        <ChevronRight size={14} className="shrink-0" />

        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          {test[0].title}
        </span>

      </nav>

      <h1 className="text-prpl text-center text-3xl font-semibold">
        {test[0].title}
      </h1>

      <div className="mt-10 flex flex-col gap-6">

        {test.map((item) => {

          const answers: TestAnswer[] = JSON.parse(item.answers);

          return (
            <div
              key={item.content_id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >

              <h2 className="text-xl font-semibold text-prpl">
                Вопрос №{item.question_number}
              </h2>

              <p className="mt-3 text-lg text-gray-700">
                {item.question}
              </p>

              <div className="mt-5 flex flex-col gap-3">

                {answers.map((answer) => (
                  <div
                    key={answer.id}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 p-3"
                  >

                    <span className="text-xl">
                      {answer.correct ? "✓" : "○"}
                    </span>

                    <span>
                      {answer.text}
                    </span>

                  </div>
                ))}

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}