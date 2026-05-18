import { mainsestrinskoe, postermedical, primarymedical } from "@/lib/urlspp";
import PrimaryMedicalVideo from "../VideoComponents/PrimaryMedical";

const dataMap: Record<string, any[]> = {
  "Постеры Национального совета по реанимации": postermedical,
  "Основы сестринского дела": mainsestrinskoe,
}

interface Props {
    category: string
    education: string 
    headlines?: string
}

export default function Main({category, education, headlines} : Props) {
    const data = dataMap[headlines ?? ""] ?? []

    return (
    <section className="relative">
        
            <div className="border border-gray-300 rounded-md shadow-2xl p-6">
                <ul className="grid gap-1 mt-4">
                    {data.map(medic => (
                        <li key={medic.id} className="hover:underline hover:opacity-80 text-lg"><a href={medic.url} target="_blank">{medic.name}</a></li>
                    ))}
                </ul>
                {education === "Среднее" && category === "Профессиональная переподготовка" && <PrimaryMedicalVideo />}
              
                <div className="mt-10">
                  <h4 className="!text-2xl text-prpl">{headlines}</h4>
                    <hr className="border border-gray-100 mt-2" />
                    <ul className="grid gap-1 mt-4">
                        {postermedical.map(medic => (
                            <li key={medic.id} className="hover:underline hover:opacity-80 text-lg"><a href={medic.url} target="_blank">{medic.name}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
           <div className="mt-20 border border-gray-300 rounded-md shadow-2xl p-6">
            <h3 className="!text-2xl text-prpl">{headlines}</h3>
            <ul className="grid gap-1 mt-4">
                {data.map(medic => (
                    <li key={medic.id} className="hover:underline hover:opacity-80 text-lg"><a href={medic.url} target="_blank">{medic.name}</a></li>
                ))}
            </ul>
        </div>
     
       
    </section>
    )
}