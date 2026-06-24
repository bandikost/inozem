import { getAccred, getAccredShedule } from "@/lib/accred";
import AccredResult from "./AccredResult";
import SideButtons from "./components/SideButtons";
import AccredTable from "./AccredTable";

export const dynamic = "force-dynamic";

export const metadata = {
  title:
    "Аккредитация | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»",
};

export default async function Page() {
  const accred = await getAccred();
  const schedule = await getAccredShedule();

  return (
    <section className="min-h-screen px-4 py-16 mt-27">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">
            Первичная специализированная аккредитация
          </h1>

          <p className="mt-3 text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            Процедура оценки профессиональных навыков медицинских и фармацевтических специалистов
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mb-10">
          <SideButtons />
        </div>

        {/* SCHEDULE CARD */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Расписание аккредитации
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Актуальные даты предстоящих мероприятий
            </p>
          </div>

          <div className="p-6">
            <AccredTable schedule={schedule} />
          </div>
        </div>

        {/* RESULTS CARD */}
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Результаты аккредитации
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Архив опубликованных протоколов и итогов
            </p>
          </div>

          <div className="p-6">
            <AccredResult accred={accred} />
          </div>
        </div>

        {/* TEXT BLOCK */}
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
    </section>
  );
}