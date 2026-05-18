import { mainsestrinskoe, postermedical, primarymedical } from "@/lib/urlspp";
import PrimaryMedicalVideo from "../VideoComponents/PrimaryMedical";

const dataMap: Record<string, any[]> = {
  "Постеры Национального совета по реанимации": postermedical,
  "Основы сестринского дела": mainsestrinskoe,
}

interface Props {
    category: string
    education: string 
    headline?: string[]
}

export default function Main({category, education, headline } : Props) {


    return (
    <section className="relative">
        
            <div className="border border-gray-300 rounded-md shadow-2xl p-6">
                <ul className="grid gap-1 mt-4">
                    {postermedical.map(medic => (
                        <li key={medic.id} className="hover:underline hover:opacity-80 text-lg"><a href={medic.url} target="_blank">{medic.name}</a></li>
                    ))}
                </ul>
                {education === "Среднее" && category === "Профессиональная переподготовка" && <PrimaryMedicalVideo />}
              
                <div className="mt-10">
                  <h4 className="!text-2xl text-prpl">{headline?.[0]}</h4>
                    <hr className="border border-gray-100 mt-2" />
                    <ul className="grid gap-1 mt-4">
                        {postermedical.map(medic => (
                            <li key={medic.id} className="hover:underline hover:opacity-80 text-lg"><a href={medic.url} target="_blank">{medic.name}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
           <div className="mt-20 border border-gray-300 rounded-md shadow-2xl p-6">
            <h3 className="!text-2xl text-prpl">{headline?.[1]}</h3>
            <ul className="grid gap-1 mt-4">
                {mainsestrinskoe.map(medic => (
                    <li key={medic.id} className="hover:underline hover:opacity-80 text-lg"><a href={medic.url} target="_blank">{medic.name}</a></li>
                ))}
            </ul>
        </div>
     
       
    </section>
    )
}