

import { getProgramBlocks, getProgramBySlug } from "@/lib/programm";
import ProgramEditor from "../../components/ProgramEditor";


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
      <h1 className="mt-27 text-prpl">Программа | {program.name}</h1>
      <div style={{ marginBottom: 20 }}>
        <h3>Programs</h3>

        
      </div>

      
      {program && (
        <ProgramEditor initialProgram={{...program, blocks}}
        />
      )}
    </div>
  );
}