import { getProgramBySlug } from "@/lib/programm"
import ProgramEditor from "./ProgramEditor"

export default async function ContentEditor({ params }: any) {
  const program = await getProgramBySlug(params.slug)

  if (!program) return <div>Program not found</div>

  return <ProgramEditor program={program} />
}