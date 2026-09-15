
export default function Mik() {
  return (
    <section className="w-full px-4 py-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-prpl px-6 py-8 text-white shadow-lg md:px-10 md:py-10">
        <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">

          <div>
            <div className="mb-2 text-sm font-medium uppercase tracking-wider text-white/70">
              13–14 октября 2026 · Санкт-Петербург
            </div>

            <h2 className="text-2xl font-bold leading-tight md:text-3xl">
              «Медицина и качество» - главная конференция
              о качестве и безопасности медицинской помощи
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/80 md:text-base">
              8 000+ участников, эксперты из 72 регионов и актуальные
              практические решения для специалистов здравоохранения.
              Участие бесплатно - очно в «Экспофоруме» или онлайн.
            </p>
          </div>

          <a
            href="/mik"
            className="shrink-0 rounded-2xl bg-white px-7 py-3.5 font-semibold text-prpl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            Стать участником
          </a>

        </div>
      </div>
    </section>
  )
}
