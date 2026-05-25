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
  headlines = [],
  sources = [],
}: any) {

  return (
    <div>

      {sources.map((src: any, i: number) => {

        const title =
          headlines.find((h: any) => h.id === src.headlineId)?.text;

        return (
          <div key={i}>

            {title && <h3>{title}</h3>}

            <ul>
              {src.links?.map((l: any) => (
                <li key={l.href}>
                  <a href={l.href}>{l.name}</a>
                </li>
              ))}
            </ul>

          </div>
        )
      })}

    </div>
  );
}