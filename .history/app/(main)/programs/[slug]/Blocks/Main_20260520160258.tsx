import { mainsestrinskoe, postermedical, primarymedical } from "@/lib/urlspp";

export const dataSources = {
  primarymedical,
  postermedical,
  mainsestrinskoe,
} as const;

interface Props {
    category: string
    education: string 
    specialization: string
    headline?: string[]
    sources?: {
    key: keyof typeof dataSources
    headlineIndex: number
  }[]
}

export default function Main({
  headline = [],
  sources = [],
}: any) {

  return (
    <section>

      {sources.map((src: any, i: any) => {

        const title =
          headline.find((h: any) => h.id === src.headlineId)?.text;

        return (
          <div key={i}>

            <h4>{title}</h4>

            <ul>
              {src.links.map((l: any) => (
                <li key={l.href}>
                  <a href={l.href}>{l.name}</a>
                </li>
              ))}
            </ul>

          </div>
        );
      })}

    </section>
  );
}