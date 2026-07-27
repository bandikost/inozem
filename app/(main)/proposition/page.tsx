import FormProposition from "@/components/forms/FormProposition";
import { getProfile } from "@/lib/getProfile";
import { cookies } from "next/headers";
import LoadingLink from "@/components/Load/LoadingLink";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title:
    "Предложения и проблемы | ЧОУ ДПО «Академия медицинского образования им. Ф.И. Иноземцева»",
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
       <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Предложения и проблемы
        </span>
      
      </nav>
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <h1 className="text-5xl font-bold text-prpl">
          Предложения и проблемы
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-500">
            Есть предложения, как сделать наши услуги удобнее и лучше? Поделитесь ими с нами - мы внимательно прислушиваемся к каждому мнению.
            <br />
            Столкнулись с проблемой или заметили ошибку? Сообщите нам - мы обязательно разберёмся и постараемся её исправить.
        </p>
      </div>

  
      <div className="grid gap-12">

        <aside className="lg:sticky lg:top-28">
          <FormProposition user={user} />
        </aside>

      </div>
      </div>
    </section>
  );
}