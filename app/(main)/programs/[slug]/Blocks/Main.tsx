import { mainsestrinskoe, postermedical, primarymedical } from "@/lib/urlspp";
import PrimaryMedicalVideo from "../VideoComponents/PrimaryMedical";


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
  category,
  education,
  specialization,
  headline,
  sources = []
}: Props) {

  return (
    <section className="relative">

      <div className="border border-gray-300 rounded-md shadow-2xl p-6">

        {sources.map((src) => {
          const data = dataSources[src.key]

          return (
            <div key={src.key} className="mb-10">

              <h4 className="!text-2xl text-prpl">{headline?.[src.headlineIndex]}</h4>

              <hr className="border border-gray-100 mt-2" />

              <ul className="grid gap-2 mt-4">
                {data.map((medic) => (
                  <li key={medic.id} className="hover:underline hover:opacity-80 text-lg">
                    <a href={medic.url} target="_blank">
                      {medic.name}
                    </a>
                  </li>
                ))}
              </ul>

            </div>
          )
        })}

        {education === "Среднее" && category === "Профессиональная переподготовка" && ( <PrimaryMedicalVideo /> )}

      </div>

    </section>
  )
}