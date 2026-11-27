
import LoadingLink from "@/components/Load/LoadingLink"
import { getPromo } from "@/lib/promo"
import { ChevronRight, ArrowUpRight, CalendarDays, Tag } from "lucide-react"

export const metadata = {
  title: 'Акции | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}

export default async function PromoPage() {
  const promo = await getPromo()

  return (
    <section className="min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">

        <nav className="mb-10 flex items-center gap-2 text-sm text-zinc-400">
          <LoadingLink
            href="/"
            className="transition hover:text-blue"
          >
            Главная
          </LoadingLink>

          <ChevronRight size={15} />

          <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Акции
        </span>
        </nav>

        {/* Заголовок */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-prpl/10 px-4 py-2 text-sm font-medium text-prpl mb-5">
            <Tag size={15} />
            Специальные предложения
          </span>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900">
            Акции и специальные предложения
          </h1>

          <p className="mt-5 text-base md:text-lg leading-relaxed text-zinc-500">
            Выгодные условия обучения и специальные предложения
            от Академии медицинского образования им. Ф.И. Иноземцева.
          </p>
        </div>

        {promo.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center">
            <Tag size={32} className="mx-auto text-zinc-300 mb-4" />
            <p className="text-zinc-500">
              Акции временно недоступны
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
            {promo.map((p) => (
              <article
                key={p.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-7 md:p-9 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/60"
              >
                {/* Декоративный элемент */}
                <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-prpl/[0.04] transition-all duration-300 group-hover:bg-prpl/[0.08]" />

                <div className="relative flex items-center justify-between gap-3 mb-7">
                  <span className="rounded-full bg-blue/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue">
                    Специальное предложение
                  </span>

                  <CalendarDays size={18} className="text-zinc-400" />
                </div>

                <div className="relative">
                  <h2 className="text-2xl md:text-3xl font-semibold leading-tight text-zinc-900">
                    {p.name}
                  </h2>

                  <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-prpl/10 px-4 py-3">
                    <Tag size={17} className="text-prpl" />

                    <span className="text-lg font-bold tracking-wide text-prpl">
                      {p.promoname}
                    </span>
                  </div>
                </div>

                <div className="my-7 h-px bg-zinc-100" />

                <div className="flex-1">
                  <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                    Условия предоставления
                  </h3>

                  <ul className="space-y-4 text-base leading-relaxed text-zinc-600">
                    {[p.title, p.suptitle, p.text, p.clarification]
                      .filter(Boolean)
                      .map((item, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-prpl" />
                          <span>{item}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-5">
                  <span className="text-sm text-zinc-400">
                    Опубликовано
                  </span>

                  <time className="text-sm font-medium text-zinc-500">
                    {new Date(p.created_at).toLocaleDateString('ru-RU')}
                  </time>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
