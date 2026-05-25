import { mainsestrinskoe, postermedical, primarymedical } from "@/lib/urlspp";

export const dataSources = {
  primarymedical,
  postermedical,
  mainsestrinskoe,
} as const;


export default function Main({
  headline = [],
  links = [],
}: any) {

  return (
    <section className="relative">
        <div className="border border-gray-300 rounded-md shadow-2xl p-6">

      {links.map((group: any, i: number) => {

        const title = headline.find((h: any) => h.text === group.headlineId)?.text || group.headlineId

        return (
          <div key={i}>
            <h2 className="text-prpl mb-4">{title}</h2>

            <ul>
              {group.items.map((l: any) => (
                <li key={l.href}>
                  <a href={l.href}>{l.name}</a>
                </li>
              ))}
            </ul>
фывфыв
          </div>
        )
      })}
  </div>
  </section>
  )
}