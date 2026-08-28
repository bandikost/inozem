import { ShieldCheck } from "lucide-react";

export default function AccredHero() {
  return (
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
  );
}