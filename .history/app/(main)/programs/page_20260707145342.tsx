import LoadingLink from "@/components/Load/LoadingLink";
import InputPrograms from "@/components/ui/Programs/inputPrograms";
import { getPrograms } from "@/lib/programm";
import { MoveLeft } from "lucide-react";

export const revalidate = 3600

export const metadata = {
  title: 'Программы обучения | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}


export default async function Page() {
  const programs = await getPrograms()
  return  (
    <section className="flex flex-col justify-center px-1 sm:px-4 mt-27 relative">
      <LoadingLink href="/" className="flex"><MoveLeft size={20} />Назад</LoadingLink>
        <InputPrograms programs={programs} />
    </section>
  )
 
}