import { ProgramRow } from "@/lib/programm";

interface Props {
    program: any
}
     
export default function Second({program}: Props){


return (
    <section className="relative">
        <div className="border border-gray-300 rounded-md shadow-2xl p-6">
            {program.specialization.startsWith("Сестринское дело") && <>  asdhaskd </>}
        </div>
    </section>
    )
}    
     
     
     