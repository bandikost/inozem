import { mainsestrinskoe, postermedical, primarymedical } from "@/lib/urlspp";
import PrimaryMedicalVideo from "../../VideoComponents/PrimaryMedical";

export default function Sestrinskoedelo() {

    return (
    <section className="relative">
        <div className="flex">
            <div className="border border-gray-300 rounded-md shadow-2xl p-6">
              
                    <h4 className="!text-2xl text-prpl">Лекции</h4>
                    <hr className="border border-gray-100 mt-2" />
                    <ul className="grid gap-1 mt-4">
                        {primarymedical.map(medic => (
                            <li key={medic.id} className="hover:underline hover:opacity-80 text-lg"><a href={medic.url} target="_blank">{medic.name}</a></li>
                        ))}
                    </ul>
                    <PrimaryMedicalVideo />
              
                <div className="mt-10">
                    <h4 className="!text-2xl text-prpl">Постеры Национального совета по реанимации</h4>
                    <hr className="border border-gray-100 mt-2" />
                    <ul className="grid gap-1 mt-4">
                        {postermedical.map(medic => (
                            <li key={medic.id} className="hover:underline hover:opacity-80 text-lg"><a href={medic.url} target="_blank">{medic.name}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
           
        </div>
       
    </section>
    )
}