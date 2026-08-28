import { BookOpen } from "lucide-react";

export default function AccredIntro() {
  return (
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
          Первичная специализированная аккредитация (ПСА) – это процедура
          оценки профессиональных навыков фармацевтических или медицинских
          работников. Ее проходят выпускники интернатуры, ординатуры, а также
          врачи и специалисты со средним профессиональным образованием после
          завершения дополнительного профессионального образования по
          программам профессиональной переподготовки.
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
  );
}