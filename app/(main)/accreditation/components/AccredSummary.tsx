export default function AccredSummary() {
  return (
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
  );
}