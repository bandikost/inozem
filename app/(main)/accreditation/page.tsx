import { getAccred } from "@/lib/accred";
import AccredResult from "./AccredResult";
import SideButtons from "./components/SideButtons";
import LoadingLink from "@/components/Load/LoadingLink";
import { ChevronRight, ShieldCheck, BookOpen, ClipboardCheck } from "lucide-react";
import { higherEducation, secondaryEducation } from "@/data/accred";


export const metadata = {
  title:
    "Аккредитация | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»",
};



export default async function Page() {
  const accred = await getAccred()

  return (
    <section className="min-h-screen">
      <div className="container mx-auto px-4 my-27">
        <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-2 md:px-6">

          <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">Главная</LoadingLink>

          <ChevronRight size={14} className="shrink-0" />

          <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
            Аккредитация
          </span>

        </nav>


        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-green px-6 py-10 md:px-12 md:py-12 shadow-xl mb-12">

            <div className="flex items-center gap-3 text-white/90 mb-5">

              <ShieldCheck size={32} />

              <span className="text-lg md:text-xl">
                Аккредитация специалистов
              </span>

            </div>

            <h1 className="text-white !text-xl sm:!text-3xl md:!text-5xl font-semibold leading-tight">
              Первичная специализированная аккредитация
            </h1>

            <p className="mt-5 max-w-3xl text-sm md:text-base leading-7 text-white/85">
              Информация о порядке проведения первичной специализированной
              аккредитации, расписании, необходимых документах и результатах
              аккредитации специалистов.
            </p>

          </div>


          <div className="space-y-10">
            <section className="rounded-3xl bg-white border border-zinc-200 shadow-sm overflow-hidden">

              <div className="bg-blue px-6 py-6">

                <div className="flex items-center gap-3">

                  <BookOpen
                    size={26}
                    className="text-white"
                  />

                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-white">
                      Первичная специализированная аккредитация
                    </h2>

                    <p className="mt-1 text-sm text-white/80">
                      Информация для аккредитуемых
                    </p>
                  </div>

                </div>

              </div>


              <div className="p-6 md:p-8 space-y-5 text-sm md:text-base leading-7 text-zinc-600">

                <p>
                  Первичная специализированная аккредитация (ПСА) — процедура
                  оценки профессиональной подготовленности специалиста.
                </p>

                <p>
                  Первичную специализированную аккредитацию проходят лица,
                  имеющие высшее или среднее медицинское и фармацевтическое
                  образование после освоения соответствующих программ
                  профессиональной подготовки и переподготовки.
                </p>

                <p>
                  На базе Академии медицинского образования им. Ф.И. Иноземцева
                  проводится первичная специализированная аккредитация
                  специалистов по направлениям, представленным ниже.
                </p>


                <div className="rounded-2xl border border-blue/20 bg-blue/5 px-5 py-4">

                  <p className="font-semibold text-zinc-800">
                    Важно
                  </p>

                  <p className="mt-1 text-zinc-600">
                    Перед прохождением аккредитации рекомендуем ознакомиться
                    с порядком проведения процедуры, перечнем необходимых
                    документов и правилами поведения в аккредитационном центре.
                  </p>

                </div>

              </div>

            </section>

            <section className="rounded-3xl bg-white border border-zinc-200 shadow-sm overflow-hidden">

              <div className="bg-green px-6 py-6">

                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  Специальности
                </h2>

                <p className="mt-2 text-sm text-white/80">
                  Направления, по которым проводится первичная
                  специализированная аккредитация
                </p>

              </div>


              <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="rounded-2xl border border-zinc-200 p-5">

                  <h3 className="text-lg font-semibold text-zinc-800 mb-4">
                    Высшее образование
                  </h3>

                  <div className="space-y-2">

                    {higherEducation.map((item) => (

                      <div
                        key={item}
                        className="rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3 text-zinc-700"
                      >
                        {item}
                      </div>

                    ))}

                  </div>

                </div>

                <div className="rounded-2xl border border-zinc-200 p-5">

                  <h3 className="text-lg font-semibold text-zinc-800 mb-4">
                    Среднее профессиональное образование
                  </h3>

                  <div className="space-y-2">

                    {secondaryEducation.map((item) => (

                      <div
                        key={item}
                        className="rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3 text-zinc-700"
                      >
                        {item}
                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </section>

            <section className="rounded-3xl bg-white border border-zinc-200 shadow-sm overflow-hidden">

              <div className="bg-blue px-6 py-6">

                <div className="flex items-center gap-3">

                  <ClipboardCheck
                    size={26}
                    className="text-white"
                  />

                  <div>

                    <h2 className="text-xl md:text-2xl font-semibold text-white">
                      Порядок проведения ПСА
                    </h2>

                    <p className="mt-1 text-sm text-white/80">
                      Основные этапы прохождения аккредитации
                    </p>

                  </div>

                </div>

              </div>


              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-2xl border border-zinc-200 p-6">

                  <div className="text-4xl font-semibold text-green mb-4">
                    01
                  </div>

                  <h3 className="text-xl font-semibold text-zinc-800">
                    Тестирование
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    Для каждого аккредитуемого программным обеспечением
                    формируется индивидуальный набор тестовых заданий
                    из Единой базы оценочных средств.
                  </p>

                  <div className="mt-5 rounded-xl bg-zinc-50 px-4 py-3">

                    <span className="font-semibold text-zinc-800">
                      80 заданий
                    </span>

                    <span className="text-zinc-500">
                      {" "}· 1 час
                    </span>

                  </div>

                </div>

                <div className="rounded-2xl border border-zinc-200 p-6">

                  <div className="text-4xl font-semibold text-green mb-4">
                    02
                  </div>

                  <h3 className="text-xl font-semibold text-zinc-800">
                    Практические навыки
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    Оценка практических навыков проводится в симулированных
                    условиях и/или предусматривает решение ситуационных задач.
                  </p>

                  <div className="mt-5 rounded-xl bg-zinc-50 px-4 py-3 text-sm">

                    <span className="font-semibold text-zinc-800">
                      Практико-ориентированный этап
                    </span>

                  </div>

                </div>
                <div className="rounded-2xl border border-zinc-200 p-6">

                  <div className="text-4xl font-semibold text-green mb-4">
                    03
                  </div>

                  <h3 className="text-xl font-semibold text-zinc-800">
                    Подведение итогов
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    Результаты прохождения этапов аккредитации оформляются
                    протоколами заседаний аккредитационной подкомиссии.
                  </p>

                  <div className="mt-5 rounded-xl bg-zinc-50 px-4 py-3 text-sm">

                    <span className="font-semibold text-zinc-800">
                      Результаты публикуются
                    </span>

                  </div>

                </div>

              </div>


              <div className="px-6 pb-8 md:px-8">

                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">

                  <p className="text-sm leading-6 text-zinc-600">
                    На сайте Методического центра аккредитации специалистов
                    открыт доступ к репетиционному экзамену для подготовки
                    к прохождению первого этапа первичной специализированной
                    аккредитации. Количество попыток не ограничено.
                  </p>

                  <div className="mt-4 flex flex-col sm:flex-row gap-3">

                    <a
                      href="https://fmza.ru/fos_primary_specialized/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-blue px-5 py-3 text-center text-sm font-medium !text-white transition hover:opacity-90"
                    >
                      Репетиционный экзамен ВО
                    </a>

                    <a
                      href="https://fmza.ru/fos_periodic/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-green px-5 py-3 text-center text-sm font-medium !text-white transition hover:opacity-90"
                    >
                      Репетиционный экзамен СПО
                    </a>

                  </div>

                </div>

              </div>

            </section>

          {/*   <section className="rounded-3xl bg-white border border-zinc-200 shadow-sm overflow-hidden">

              <div className="bg-blue px-6 py-6">

                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  Расписание аккредитации
                </h2>

                <p className="mt-2 text-sm text-white/80">
                  Ближайшие даты проведения аккредитационных мероприятий
                </p>

              </div>

              <div className="p-6">

                <AccredTable schedule={schedule} />

              </div>

            </section>*/}

            <div>

              <SideButtons />

            </div>


            <section className="rounded-3xl bg-white border border-zinc-200 shadow-sm overflow-hidden">

              <div className="bg-green px-6 py-6">

                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  Результаты аккредитации
                </h2>

                <p className="mt-2 text-sm text-white/80">
                  Архив опубликованных протоколов и итоговых документов
                </p>

              </div>

              <div className="p-6">

                <AccredResult accred={accred} />

              </div>

            </section>

            <section className="rounded-3xl bg-white border border-zinc-200 shadow-sm overflow-hidden">

              <div className="bg-blue px-6 py-6">

                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  Итоги прохождения аккредитации
                </h2>

              </div>


              <div className="p-6 md:p-8 space-y-5 text-sm md:text-base leading-7 text-zinc-600">

                <p>
                  Оценка результатов прохождения этапов аккредитации специалиста
                  оформляется протоколами заседаний аккредитационной подкомиссии.
                  Протоколы размещаются не позднее двух рабочих дней со дня
                  их подписания на официальном сайте и информационных стендах
                  аккредитационного центра.
                </p>

                <p>
                  Сведения о лицах, признанных прошедшими аккредитацию специалиста,
                  вносятся Министерством здравоохранения Российской Федерации
                  в единую государственную информационную систему в сфере
                  здравоохранения.
                </p>

              </div>

            </section>


          </div>

        </div>

      </div>
    </section>
  );
}