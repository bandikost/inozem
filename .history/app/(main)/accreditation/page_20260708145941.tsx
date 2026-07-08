import { getAccred, getAccredShedule } from "@/lib/accred";
import AccredResult from "./AccredResult";
import SideButtons from "./components/SideButtons";
import AccredTable from "./AccredTable";
import LoadingLink from "@/components/Load/LoadingLink";
import { ChevronRight, ShieldCheck } from "lucide-react";

export const revalidate = 3600

export const metadata = {
  title:
    "Аккредитация | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»",
};

export default async function Page() {
  const accred = await getAccred();
  const schedule = await getAccredShedule();

  return (
    <section className="min-h-screen">
    <div className="container mx-auto px-4 my-27">
      <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-6">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Аккредитация
        </span>
      
      </nav>
      <div className="mx-auto max-w-6xl">

       
        <div className="rounded-3xl bg-green px-6 py-12 md:px-12 shadow-xl mb-12 flex flex-col items-start ">
          <div className="max-w-3xl">

            <div className="flex items-center gap-3 text-white/90 mb-5 flex-row-reverse md:flex-row">

              <ShieldCheck size={32}/>

              <span className="text-xl">Аккредитация специалистов</span>
            </div>
        </div>

        <h1 className="text-white !text-xl sm:!text-3xl md:text-5xl font-semibold leading-tight">Первичная специализированная аккредитация</h1>

      </div>

    
        <div className="mb-10">
          <SideButtons />
        </div>

     
       <div className="space-y-10">


{/* Предстоящая аккредитация */}

<section className="
    rounded-3xl
    bg-white
    border
    border-zinc-200
    shadow-sm
    overflow-hidden
">

    <div className="
        bg-gradient-to-r
        from-green/10
        to-transparent
        px-6
        py-6
        border-b
        border-zinc-100
    ">

        <div className="flex items-center gap-3">

                <h2 className="
                    text-xl
                    md:text-2xl
                    font-semibold
                    text-zinc-900
                ">
                    Расписание аккредитации
                </h2>

                <p className="mt-2 text-sm text-white rounded-xl bg-blue p-2">Ближайшие даты проведения аккредитационных мероприятий</p>

    </div>
</div>

    <div className="p-6">

        <AccredTable schedule={schedule}/>

    </div>


</section>


<section className="
    rounded-3xl
    bg-white
    border
    border-zinc-200
    shadow-sm
    overflow-hidden
">


    <div className="
        bg-gradient-to-r
        from-blue/10
        to-transparent
        px-6
        py-6
        border-b
        border-zinc-100
    ">


        <div className="flex flex-col items-start gap-3">

                <h2 className="
                    text-xl
                    md:text-2xl
                    font-semibold
                    text-zinc-900
                ">
                    Результаты аккредитации
                </h2>


                <p className="mt-2 text-sm text-white rounded-xl bg-blue p-2">Архив опубликованных протоколов и итоговых документов</p>


        </div>


    </div>



    <div className="p-6">

        <AccredResult accred={accred}/>

    </div>


</section>


</div>

       
        <div className="mt-12 space-y-5 text-sm leading-7 text-gray-600">
          <p>
            Первичная специализированная аккредитация (ПСА) — это процедура оценки
            профессиональных навыков фармацевтических и медицинских работников.
            Её проходят выпускники интернатуры, ординатуры, а также специалисты
            после программ профессиональной переподготовки.
          </p>

          <p>
            С 2022 года сведения о прохождении аккредитации вносятся в федеральный
            регистр медицинских работников ЕГИСЗ, доступ к которому имеет работодатель.
            Отдельные бумажные подтверждения больше не требуются.
          </p>
        </div>

      </div>
      </div>
    </section>
  );
}