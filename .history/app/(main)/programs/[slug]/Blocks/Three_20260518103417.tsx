import Meddocs from "../Docs/meddocs"



interface Props {
    specialization: string
}
     
export default function Three({specialization}: Props){
    


return (
    <section className="relative">
        <div className="border border-gray-300 rounded-md shadow-2xl p-6">
            {specialization.startsWith("Сестринское дело") && <Meddocs />}
        </div>
    </section>
    )
}    
     
     
     