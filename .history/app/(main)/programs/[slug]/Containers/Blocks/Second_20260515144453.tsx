import { ProgramRow } from "@/lib/programm";
import Vakcina from "../../VideoComponents/Vakcina";

interface Props {
    program: ProgramRow
}
     
export default function Second({program}: Props){
    


return (
    <section className="relative">
        <div className="border border-gray-300 rounded-md shadow-2xl p-6">
            {program.specialization.startsWith("Сестринское дело") && <Vakcina />}
        </div>
    </section>
    )
}    
     
     
     