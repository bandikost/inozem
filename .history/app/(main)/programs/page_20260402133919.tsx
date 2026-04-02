import ProgramsButtons from "@/components/ui/Buttons/ProgramsButtons";
import SidesButtons from "@/components/ui/Buttons/SidesButtons";
import InputPrograms from "@/components/ui/inputPrograms";
import Content from "@/components/ui/Programs/Content";
import { getPrograms } from "@/lib/programm";



export default async function Page() {
  const programs = await getPrograms()


  return (
    <>
    <Content programs={programs} />
    </>
    
  )
}