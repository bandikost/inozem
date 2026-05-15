import { primarymedical } from "@/lib/urlspp";



export default function PrimaryMedical() {

    return (
        <div className="mt-20 border border-gray-300 rounded-md shadow-2xl p-4">
            <h3 className="!text-2xl text-prpl">Первичная доврачебная МСП при неотложных и экстремальных ситуациях</h3>
            <div className="mt-10">
                <h4 className="!text-2xl text-prpl px-6">Лекции</h4>

                <ul>
                    {primarymedical.map(medic => (
                        <li key={medic.id} className="px-6"><a href={medic.url} target="_blank">{medic.name}</a></li>
                    ))}
                </ul>

            </div>
          </div>
    )
}