import ProgramsButtons from "@/components/ui/Buttons/ProgramsButtons";
import SidesButtons from "@/components/ui/Buttons/SidesButtons";
import InputPrograms from "@/components/ui/inputPrograms";
import { getPrograms } from "@/lib/programm";


export default async function Page() {
  const programs = await getPrograms()


  return (
    <>
    <section className="flex flex-col justify-center px-4 px-6 mt-27 relative">
       <div className="!fixed !left-0 !top-1/2 -translate-y-1/2 z-50 bg-white border border-gray-300 p-2">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
      <h1 className="text-3xl font-semibold text-prpl text-center">
        Программы обучения
      </h1>
       
        <SidesButtons  />
  
        <InputPrograms programs={programs} />

      

    </section>
    </>
    
  )
}