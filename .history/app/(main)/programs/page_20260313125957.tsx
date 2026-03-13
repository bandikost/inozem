import SidesButtons from "@/components/ui/Buttons/SidesButtons";
import InputPrograms from "@/components/ui/inputPrograms";
import { getPrograms } from "@/lib/programm";


export default async function Page() {
  const programs = await getPrograms()


  return (
    <section className="flex flex-col justify-center  px-4 px-6 mt-27 ">

      <h1 className="text-3xl font-semibold text-prpl text-center">
        Программы обучения
      </h1>
   
        <SidesButtons  />
  
        <InputPrograms programs={programs} />

      

    </section>
  )
}