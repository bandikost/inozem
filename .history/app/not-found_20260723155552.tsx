import Link from "next/link";
import {
  ArrowLeft,
  Activity,
  ClipboardPlus,
  Search,
  Stethoscope,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">

      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative w-full max-w-3xl text-center">

 
        <div className="relative mx-auto mb-5 w-fit">
          <span className="text-[clamp(7rem,20vw,13rem)] font-black leading-none tracking-[-0.08em] text-slate-100">
            404
          </span>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600 shadow-sm">
              <Activity size={16} className="text-slate-500" />
              Страница не обнаружена
            </div>
          </div>
        </div>

   
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Похоже, этот адрес требует уточнения
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-500">
          Мы провели поиск, но не нашли нужную страницу. Возможно, ссылка
          устарела, адрес был введён с ошибкой или нужный раздел сейчас
          находится в другом месте.
        </p>

        <div className="mx-auto mt-8 flex max-w-md items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
            <ClipboardPlus size={20} className="text-slate-600" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Рекомендация
            </p>

            <p className="mt-1 text-sm leading-5 text-slate-500">
              Вернитесь на главную и продолжите обучение.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            <ArrowLeft size={17} />
            На главную
          </Link>

          <Link
            href="/programs"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Search size={17} />
            Найти программу
          </Link>
        </div>
      </div>
    </main>
  );
}