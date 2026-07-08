import FormQuestion from "@/components/forms/FormQuestion";
import { getProfile } from "@/lib/getProfile";
import { cookies } from "next/headers";
import QuestionFaq from "./QuestionFaq";

export const metadata = {
  title:
    "Задать вопрос | ЧОУ ДПО «Академия медицинского образования им. Ф.И. Иноземцева»",
};

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let user = null;

  if (token) {
    user = await getProfile(token);
  }

  return (
   <section className="min-h-screen">
    <div className="container mx-auto px-4 my-27">
       <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-6">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Акции
        </span>
      
      </nav>
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <h1 className="text-5xl font-bold text-prpl">
          Задать вопрос
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-500">
          Не нашли ответ на интересующий вопрос? Ознакомьтесь с разделом
          часто задаваемых вопросов или отправьте обращение через форму.
          Мы рассмотрим ваше сообщение и ответим в ближайшее время.
        </p>
      </div>

  
      <div className="grid gap-12 lg:grid-cols-[1.35fr_0.9fr] items-start">

        <aside className="lg:sticky lg:top-28">
          <FormQuestion user={user} />
        </aside>

        <div>
          <QuestionFaq />
        </div>

      </div>
      </div>
    </section>
  );
}