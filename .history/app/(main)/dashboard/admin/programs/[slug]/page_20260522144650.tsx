

import { getProgramBlocks, getProgramBySlug } from "@/lib/programm";
import ProgramEditor from "../../components/ProgramEditor";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";


interface ProgramsPageProps { 
   params: { slug: string } // типизируем что хотм получить slug из url
}

export default async function AdminProgramsPage({params} : ProgramsPageProps) {
    const {slug} = await params
    const program = await getProgramBySlug(slug)
    if (!program) return null

    const blocks = await getProgramBlocks(program.id)


  return (
    <div style={{ padding: 20 }}>
      <Link href="/dashboard/admin" className="text-blue-400 hover:opacity-80 cursor-pointer text-lg fixed top-28 flex">
        <ArrowLeft/> Назад
      </Link>
      <h1 className="mt-35 text-prpl">Программа | {program.name}</h1>
      
      {program && (
        <ProgramEditor initialProgram={{...program, blocks}}
        />
      )}
    </div>
  );
}