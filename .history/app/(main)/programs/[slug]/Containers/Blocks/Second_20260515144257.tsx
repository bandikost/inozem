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
                {array?.second_content.map((a) => (

              <li key={a.id}>

                <a
                  href={a.url}
                  target="_blank"
                  className="text-blue underline"
                >
                  {a.name}
                </a>

              </li>

            ))}
            </ul>

            }
        </div>
    </section>
    )
}    
     
     
     