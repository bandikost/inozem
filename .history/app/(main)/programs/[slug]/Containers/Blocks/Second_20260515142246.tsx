import { ProgramRow } from "@/lib/programm";
import { title } from "@/lib/programs/titles";


     
export default function Second({program} : ProgramRow){

   
    const currentTitle = title.find((item) => 
     program.specialization.startsWith(item.specialization)
    )

return (
    <section className="relative">
        <div className="border border-gray-300 rounded-md shadow-2xl p-6">
            
        </div>
    </section>
    )
}    
     
     
     