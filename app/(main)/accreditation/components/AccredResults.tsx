import AccredResult from "../AccredResult";

interface AccredResultsProps {
  accred: any;
}

export default function AccredResults({
  accred,
}: AccredResultsProps) {
  return (
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
  );
}