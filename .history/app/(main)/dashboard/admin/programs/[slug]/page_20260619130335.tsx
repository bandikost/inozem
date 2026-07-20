

import { getProgramBlocks, getProgramBySlug } from "@/lib/programm";
import ProgramEditor from "../../components/ProgramEditor";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


interface ProgramsPageProps { 
   params: { slug: string } // типизируем что хотм получить slug из url
}

export const metadata = {
  title: 'Редактор программы | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}

export default async function AdminProgramsPage({params} : ProgramsPageProps) {
    const cookieStore = await cookies()
    const manager = cookieStore.get("manager")
      
    if (!manager) redirect("/dashboard")

    const {slug} = await params
    const program = await getProgramBySlug(slug)
    if (!program) return null

    const blocks = await getProgramBlocks(program.id)
    

  return (
    <div style={{ padding: 20 }}>
      <Link href="/dashboard/admin" className="text-blue-500 hover:opacity-80 cursor-pointer text-lg fixed top-28 flex items-center">
        <ArrowLeft size={17}/> Назад
      </Link>
      <h1 className="mt-35 text-prpl">Программа | {program.name}</h1>
      
      {program && (
        <ProgramEditor initialProgram={{...program, blocks}}
        />
      )}
    </div>
  );
}