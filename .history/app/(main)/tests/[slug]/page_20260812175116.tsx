import LoadingLink from "@/components/Load/LoadingLink";
import { getTestsCreatedBySlug } from "@/lib/tests_creator/tests";
import { ChevronRight } from "lucide-react";
import TestRunner from "./components/TestRunner";
import { getProfile } from "@/lib/getProfile";
import { UserRow } from "@/app/interface/user";
import TokenCheck from "@/components/token/token";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const metadata = {
  title:
    "Тестирование | ЧОУ ДПО «Академия медицинского образования им. Ф.И. Иноземцева»",
};


export default async function Page({ params }: PageProps) {
  const { slug } = await params;
    const token = await TokenCheck()
    
    let user: UserRow
    user = await getProfile(token)
    const test = await getTestsCreatedBySlug(slug);

  if (!test.length) {
    return (
      <section className="min-h-screen">
        <div className="container mx-auto px-2 my-27">
          <h1 className="text-center text-prpl text-2xl">
            Тест не найден
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen">

      <div className="container mx-auto px-2 my-27">

        <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">

          <LoadingLink
            href="/"
            className="shrink-0 hover:text-blue transition hover:underline"
          >
            Главная
          </LoadingLink>

          <ChevronRight size={14} />

          <LoadingLink
            href="/programs"
            className="shrink-0 hover:text-blue transition hover:underline"
          >
            Образование
          </LoadingLink>

          <ChevronRight size={14} />

          <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
            Тестирование {test[0].title}
          </span>

        </nav>

        <h1 className="text-prpl text-center text-3xl font-semibold">
          {test[0].title}
        </h1>

        <TestRunner
  questions={test}
  nameTest={test[0].slug}
  userId={user.id}
/>

      </div>

    </section>
  );
}