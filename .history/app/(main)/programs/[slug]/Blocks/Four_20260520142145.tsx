interface Props {
  category: string
  education: string
  specialization: string

  headlines?: string[]

  sources?: {
    headlineIndex: number
    links: {
      name: string
      href: string
    }[]
  }[]
}

export default function Four({
  sources = [],
  headlines = [],
}: Props) {
  return (
    <section className="relative">
      <div className="border border-gray-300 rounded-md shadow-2xl p-6">

        {sources.map((src, idx) => {
          const title = headlines[src.headlineIndex]

          return (
            <div key={idx} className="mb-8">

              {/* HEADLINE */}
              {title && (
                <h4 className="text-2xl text-prpl mb-3">
                  {title}
                </h4>
              )}

              {/* LINKS */}
              <ul className="grid gap-2">
                {src.links?.map((link, i) => (
                  <li
                    key={i}
                    className="hover:underline hover:opacity-80 text-lg"
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

            </div>
          )
        })}

      </div>
    </section>
  )
}