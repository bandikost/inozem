import { getProgramBySlug } from "@/lib/programm"
import ProgramEditor from "./ProgramEditor"


interface ProgramsPageProps { 
   params: { slug: string } // типизируем что хотм получить slug из url
}

export default async function ContentEditor({ params }: ProgramsPageProps) {
  const program = await getProgramBySlug(params.slug)
 console.log("PROGRAM RESULT:", program)
  if (!program) return <div>Program not found</div>

  return <ProgramEditor program={program} />
}