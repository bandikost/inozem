import { primarymedical } from "@/lib/urlspp";
import PrimaryMedicalVideo from "../VideoComponents/PrimaryMedical";



export default function PrimaryMedical() {

    return (
        <div className="mt-20 border border-gray-300 rounded-md shadow-2xl p-6">
            <h3 className="!text-2xl text-prpl">Первичная доврачебная МСП при неотложных и экстремальных ситуациях</h3>
            <div className="mt-10">
                <h4 className="!text-2xl text-prpl">Лекции</h4>
                <hr className="border border-gray-200 h-2" />
                <ul className="grid gap-1 mt-4">
                    {primarymedical.map(medic => (
                        <li key={medic.id} className="hover:underline hover:opacity-80 text-lg"><a href={medic.url} target="_blank">{medic.name}</a></li>
                    ))}
                </ul>
                <PrimaryMedicalVideo />
            </div>
          </div>
    )
}