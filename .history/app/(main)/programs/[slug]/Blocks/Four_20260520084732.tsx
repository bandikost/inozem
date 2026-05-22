
interface Props {
  category: string
  education: string
  specialization: string
  headline?: string[]
  sources?: {
    headlineIndex: number
    links: {
      name: string
      href: string
    }[]
  }[]
}

export default function Four({
  headline,
  sources = []
}: Props) {

  return (
    <section className="relative">

      <div className="border border-gray-300 rounded-md shadow-2xl p-6">

        {sources.map((src, index) => (
          <div key={index} className="mb-10"

            <hr className="border border-gray-100 mt-2" />

            <ul className="grid gap-2 mt-4">

              {src.links.map((link, i) => (
                <li key={i} className="hover:underline hover:opacity-80 text-lg">
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </li>
              ))}

            </ul>

          </div>
        ))}

      </div>

    </section>
  )
}