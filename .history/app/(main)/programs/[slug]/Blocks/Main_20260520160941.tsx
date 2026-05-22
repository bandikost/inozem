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
  links = [],
}: any) {

  return (
    <section>

      {links.map((group: any, i: number) => {

        const title =
          headline.find((h: any) => h.text === group.headlineId)?.text
          || group.headlineId;

        return (
          <div key={i}>

            <h4>{title}</h4>

            <ul>
              {group.items.map((l: any) => (
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