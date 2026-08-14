import { TestsCreated } from "@/app/interface/tests_creator";
import LoadingLink from "@/components/Load/LoadingLink";
import {
  ArrowRight,
  ClipboardCheck,
  Pencil,
  Plus,
} from "lucide-react";

interface Props {
  testlist: TestsCreated[];
}

export default function TestList({ testlist }: Props) {
  return (
    <div className="mt-10">
      {/* Заголовок + кнопка создания */}
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900">
            Доступные тесты
          </h2>

          <p className="mt-2 text-zinc-500">
            Создание и редактирование тестов с вариантами ответов.
          </p>
        </div>

        <LoadingLink
          href="/dashboard/test_creator/create"
          className="
            button-more
            inline-flex
            items-center
            justify-center
            gap-2
          "
        >
          <Plus size={18} />
          Создать тест
        </LoadingLink>
      </div>

      {/* Список тестов */}
      <div className="grid gap-5">
        {testlist.map((test) => (
          <LoadingLink
            key={test.id}
            href={`/dashboard/test_creator/test/${test.slug}`}
            className="
              group
              rounded-3xl
              border
              border-zinc-200
              bg-white
              p-6
              shadow-sm
              transition
              hover:-translate-y-1
              hover:border-zinc-300
              hover:shadow-xl
            "
          >
            <div
              className="
                flex
                flex-col
                gap-6
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              {/* Информация */}
              <div className="min-w-0">
                <div className="flex items-start gap-4">
                  <div
                    className="
                      flex
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-zinc-100
                      p-3
                      transition
                      group-hover:bg-black
                      group-hover:text-white
                    "
                  >
                    <ClipboardCheck size={22} />
                  </div>

                  <div className="min-w-0">
                    <h2
                      className="
                        break-words
                        text-2xl
                        font-bold
                        text-zinc-900
                      "
                    >
                      {test.title}
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <div
                        className="
                          max-w-full
                          truncate
                          rounded-xl
                          bg-zinc-100
                          px-3
                          py-2
                          text-sm
                          text-zinc-500
                        "
                      >
                        /{test.slug}
                      </div>

                      <div
                        className="
                          rounded-xl
                          bg-zinc-100
                          px-3
                          py-2
                          text-sm
                          text-zinc-700
                        "
                      >
                        ID: {test.id}
                      </div>

                      <div
                        className="
                          rounded-xl
                          bg-zinc-100
                          px-3
                          py-2
                          text-sm
                          text-zinc-700
                        "
                      >
                        {new Date(test.created_at).toLocaleDateString(
                          "ru-RU"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Иконки справа */}
              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    rounded-2xl
                    bg-zinc-100
                    p-3
                    transition
                    group-hover:bg-black
                    group-hover:text-white
                  "
                >
                  <Pencil size={20} />
                </div>

                <ArrowRight
                  size={20}
                  className="
                    transition
                    group-hover:translate-x-1
                  "
                />
              </div>
            </div>
          </LoadingLink>
        ))}
      </div>

      {/* Если тестов нет */}
      {testlist.length === 0 && (
        <div
          className="
            rounded-3xl
            border
            border-dashed
            border-zinc-300
            bg-zinc-50
            py-20
            text-center
          "
        >
          <ClipboardCheck
            size={42}
            className="mx-auto text-zinc-400"
          />

          <h2 className="mt-5 text-2xl font-semibold">
            Пока нет тестов
          </h2>

          <p className="mt-3 text-zinc-500">
            Создайте первый тест, чтобы начать работу.
          </p>

          <LoadingLink
            href="/dashboard/test_creator/create"
            className="
              button-more
              mt-6
              inline-flex
              items-center
              gap-2
            "
          >
            <Plus size={18} />
            Создать тест
          </LoadingLink>
        </div>
      )}
    </div>
  );
}