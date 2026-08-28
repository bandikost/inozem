import { ClipboardCheck } from "lucide-react";

const stages = [
  {
    number: "01",
    title: "Тестирование",
    description:
      "Для каждого аккредитуемого программным обеспечением формируется индивидуальный набор тестовых заданий из Единой базы оценочных средств.",
    info: (
      <>
        <span className="font-semibold text-zinc-800">
          80 заданий
        </span>

        <span className="text-zinc-500">
          {" "}· 1 час
        </span>
      </>
    ),
  },
  {
    number: "02",
    title: "Практические навыки",
    description:
      "Оценка практических навыков проводится в симулированных условиях и/или предусматривает решение ситуационных задач.",
    info: (
      <span className="font-semibold text-zinc-800">
        Практико-ориентированный этап
      </span>
    ),
  },
  {
    number: "03",
    title: "Подведение итогов",
    description:
      "Результаты прохождения этапов аккредитации оформляются протоколами заседаний аккредитационной подкомиссии.",
    info: (
      <span className="font-semibold text-zinc-800">
        Результаты публикуются
      </span>
    ),
  },
];

export default function AccredStages() {
  return (
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

        {stages.map((stage) => (
          <div
            key={stage.number}
            className="rounded-2xl border border-zinc-200 p-6"
          >

            <div className="text-4xl font-semibold text-green mb-4">
              {stage.number}
            </div>

            <h3 className="text-xl font-semibold text-zinc-800">
              {stage.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              {stage.description}
            </p>

            <div className="mt-5 rounded-xl bg-zinc-50 px-4 py-3 text-sm">
              {stage.info}
            </div>

          </div>
        ))}

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
  );
}