import LoadingLink from "@/components/Load/LoadingLink";
import { ChevronRight } from "lucide-react";
import CreateTestForm from "../components/CreateTestForm";

export default function Page() {
  return (
    <section className="flex flex-col mt-27 px-6">

      <nav className="mb-8 flex items-center gap-2 text-zinc-500">

        <LoadingLink
          href="/dashboard/manager"
          className="hover:text-blue hover:underline"
        >
          Главная страница Админки
        </LoadingLink>

        <ChevronRight size={14} />

        <LoadingLink
          href="/dashboard/test_creator"
          className="hover:text-blue hover:underline"
        >
          Тесты
        </LoadingLink>

        <ChevronRight size={14} />

        <span className="text-zinc-800">
          Создание теста
        </span>

      </nav>

      <h1 className="text-prpl text-center text-3xl font-semibold">
        Создание теста
      </h1>

      <CreateTestForm />

    </section>
  );
}