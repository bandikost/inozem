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
      <LoadingLink href="/" className="flex gap-1 items-center mb-2 hover:underline hover:opacity-90"><MoveLeft size={20} />Вернуться на главную страницу</LoadingLink>
        <InputPrograms programs={programs} />
    </section>
  )
 
}