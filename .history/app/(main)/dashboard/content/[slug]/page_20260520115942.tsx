import { getProgramBySlug } from "@/lib/programm"
import ProgramEditor from "./ProgramEditor"


interface ProgramsPageProps { 
   params: { slug: string } // типизируем что хотм получить slug из url
}

export default async function ContentEditor({ params }: ProgramsPageProps) {
  const { slug } = await params 
  const program = await getProgramBySlug(slug)

  if (!program) return <div>Program not found</div>

  return <ProgramEditor program={program} />
}