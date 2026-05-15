import { ProgramRow } from "@/lib/programm";
import { title } from "@/lib/programs/titles";

interface Props {
    program: ProgramRow
}
     
export default function Second({program}: Props){

    const array = title.find((item) =>
        program.specialization.startsWith(item.specialization)
    )


return (
    <section className="relative">
        <div className="border border-gray-300 rounded-md shadow-2xl p-6">
            {program.specialization.startsWith("Сестринское дело") && 

            <ul>
                {array.map()}<li><a href="" target="_blank"></a></li>
            </ul>

            }
        </div>
    </section>
    )
}    
     
     
     