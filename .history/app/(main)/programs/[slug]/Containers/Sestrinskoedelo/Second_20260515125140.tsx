import { mainsestrinskoe } from "@/lib/urlspp";

     
     
export default function Second(){

    return (
        <div className="mt-20 border border-gray-300 rounded-md shadow-2xl p-6">
            <h3 className="!text-2xl text-prpl">Лекции. Основы сестринского дела</h3>
            <ul className="grid gap-1 mt-4">
                {mainsestrinskoe.map(medic => (
                    <li key={medic.id} className="hover:underline hover:opacity-80 text-lg"><a href={medic.url} target="_blank">{medic.name}</a></li>
                ))}
            </ul>
        </div>
    )
}    
     
     
     