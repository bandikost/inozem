import MediaGallery from "@/components/ui/LazyLoad/ImageGallery"

type LinkGroup = {
  title: string
  items: {
    name: string
    href: string
  }[]
}

type VideoItem = {
  type: "video"
  src: string
  preview: string
  subtitles: string[]
}

type VideoGroup = {
  title: string
  headlineId: string
  items: VideoItem[]
}

interface Props {
  sources?: VideoGroup[] | VideoItem[]
  links?: LinkGroup[]
}

function normalizeSources(sources: VideoGroup[] | VideoItem[] = []): VideoGroup[] {
  if (!sources.length) return []

  const first = sources[0] as VideoGroup | VideoItem

  if ("items" in first) return sources as VideoGroup[]

  return [
    {
      title: "",
      headlineId: "",
      items: sources as VideoItem[],
    },
  ]
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-200 to-transparent" />
      <h2 className="text-center text-xl font-semibold tracking-tight text-slate-900 md:text-3xl">{title}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-200 to-transparent" />
    </div>
  )
}

export default function Main({ sources = [], links = [] }: Props) {
  const normalizedSources = normalizeSources(sources)
  const hasVideos = normalizedSources.length > 0
  const hasLinks = links.length > 0

  if (!hasVideos && !hasLinks) return null

  return (
    <section className="relative py-6">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
          <div className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500" />

          <div className="space-y-12 p-5 md:p-8">
            {hasLinks &&
              links.map((group, i) => (
                <div key={`${group.title}-${i}`} className="rounded-2xl bg-slate-50/80 p-5 ring-1 ring-slate-200/70 md:p-6">
                  {group.title?.trim() && <SectionTitle title={group.title} />}

                  <div className="grid gap-3 md:grid-cols-2">
                    {group.items.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex itwms-start xs:items-center justify-between flex-col xs:flex-row rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base text-slate-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md md:text-lg"
                      >
                        <span className="pr-4 leading-snug">{link.name}</span>
                        <span className="shrink-0 rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 transition-colors group-hover:bg-violet-100 mt-4 xs:mt-0">
                          открыть
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}

            {hasVideos &&
              normalizedSources.map((group, i) => (
                <div key={`${group.title}-${i}`}>
                  {group.title?.trim() && <SectionTitle title={group.title} />}

                  <MediaGallery cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" items={group.items} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}