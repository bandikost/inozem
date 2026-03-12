import InputPrograms from "@/components/ui/inputPrograms";
import { ToggleBlock } from "@/components/ui/ToggleBlock";
import { getPrograms } from "@/lib/programm"
import Link from "next/link"



export default async function Page() {
  const programs = await getPrograms()

  return (
    <section className="flex flex-col px-4 px-6 mt-27">

      <h1 className="text-3xl font-semibold text-prpl mb-10 text-center">
        Программы обучения
      </h1>
      <div className="grid grid-cols-3 gap-2 my-10">
          <ToggleBlock title="Инструкция создания профиля" classText="!text-xl !font-normal text-center">
        <div className="border border-zinc-200 rounded-xl p-6 bg-white shadow-xl transition">
          <Link href={"/"} className="hover:underline">Просмотреть файл</Link> 
        </div>
        
      </ToggleBlock>
      <ToggleBlock title="Формы, анкеты, заявления" classText="!text-xl !font-normal text-center">
        <div className=" border border-zinc-200 rounded-xl p-6 bg-white shadow-xl transition">
          <Link href={"/"} className="hover:underline">Просмотреть файл</Link> 
        </div>
        
      </ToggleBlock>
      <ToggleBlock title="Программы и прейскурант" classText="!text-xl !font-normal text-center">
        <div className=" border border-zinc-200 rounded-xl p-6 bg-white shadow-xl transition">
          <Link href={"/"} className="hover:underline">Просмотреть файл</Link> 
        </div>
        
      </ToggleBlock>
      </div>
   
      <InputPrograms programs={programs} />

      

    </section>
  )
}