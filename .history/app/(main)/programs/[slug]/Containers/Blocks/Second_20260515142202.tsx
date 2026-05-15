import { title } from "@/lib/programs/titles";

interface Props {
    program: any
}
     
export default function Second({program} : Props){

   
    const currentTitle = title.find((item) => 
     program.specialization.startsWith(item.specialization)
    )

return (
    <section className="relative">
        <div className="border border-gray-300 rounded-md shadow-2xl p-6">
            <h4 className="!text-2xl text-prpl">{title?.blocks[3]}</h4>
        </div>
    </section>
    )
}    
     
     
     