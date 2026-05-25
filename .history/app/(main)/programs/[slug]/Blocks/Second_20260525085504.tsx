import Vakcina from "../VideoComponents/Vakcina";

interface Props {
    specialization: string

}
     
export default function Second({specialization}: Props){
    


return (
    <section className="relative">
        <div className="border border-gray-300 rounded-md shadow-2xl p-6">
            {specialization.startsWith("Сестринское дело") && <Vakcina />}
        </div>
        ывоыв
    </section>
    )
}    
     
     
     