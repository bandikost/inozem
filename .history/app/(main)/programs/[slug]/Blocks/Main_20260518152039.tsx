import { mainsestrinskoe, postermedical, primarymedical } from "@/lib/urlspp";
import PrimaryMedicalVideo from "../VideoComponents/PrimaryMedical";

const dataMap = {
    postermedical,
    mainsestrinskoe,
    primarymedical,
}

type HeadlineItem = {
  name: string
  dataKey: keyof typeof dataMap
}

interface Props {
  category: string
  education: string
  headline?: HeadlineItem[]
}

export default function Main({ category, education, headline }: Props) {
  return (
    <section className="relative">
      <div className="border border-gray-300 rounded-md shadow-2xl p-6">
        <ul className="grid gap-1 mt-4">
          {primarymedical.map((medic) => (
            <li key={medic.id} className="hover:underline hover:opacity-80 text-lg">
              <a href={medic.url} target="_blank">{medic.name}</a>
            </li>
          ))}
        </ul>

        {education === "Среднее" &&
          category === "Профессиональная переподготовка" && (
            <PrimaryMedicalVideo />
          )}

        {headline?.map((item) => {
          const data = dataMap[item.dataKey]

          return (
            <div key={item.dataKey} className="mt-10">
              <h4 className="!text-2xl text-prpl">{item.name}</h4>
              <hr className="border border-gray-100 mt-2" />

              <ul className="grid gap-1 mt-4">
                {data.map((medic) => (
                  <li key={medic.id} className="hover:underline hover:opacity-80 text-lg">
                    <a href={medic.url} target="_blank">{medic.name}</a>
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