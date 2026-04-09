import InputPrograms from "@/components/ui/Programs/inputPrograms";
import { getPrograms } from "@/lib/programm";

export const metadata = {
  title: 'Программы обучения | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}


export default async function Page() {
  const programs = await getPrograms()
  return  (
    <section className="flex flex-col justify-center px-4 mt-27 relative">
        <InputPrograms programs={programs} />
    </section>
  )
 
}