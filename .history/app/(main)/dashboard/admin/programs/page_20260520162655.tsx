
import ProgramEditor from "../components/ProgramEditor";
import { getProgramBySlug } from "@/lib/programm";


interface ProgramsPageProps { 
   params: { slug: string } // типизируем что хотм получить slug из url
}

export default async function AdminProgramsPage({params} : ProgramsPageProps) {
    const {slug} = await params
    const program = await getProgramBySlug(slug)
  


  return (
    <div style={{ padding: 20 }}>
      <h1 className="mt-27">Programs Admin</h1>
      <div style={{ marginBottom: 20 }}>
        <h3>Programs</h3>

        
      </div>

      
      {program && (
        <ProgramEditor initialProgram={program}
        />
      )}
    </div>
  );
}