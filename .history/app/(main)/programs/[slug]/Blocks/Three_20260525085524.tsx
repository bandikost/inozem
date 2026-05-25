import Meddocs from "../Docs/meddocs"



interface Props {
    specialization: string
    category: string
}
     
export default function Three({specialization, category}: Props){
    


return (
    <section className="relative">
        <div className="border border-gray-300 rounded-md shadow-2xl p-6">
            {specialization.startsWith("Сестринское дело") && <Meddocs />}
        </div>
        ырлваыывода
    </section>
    )
}    
     
     
     