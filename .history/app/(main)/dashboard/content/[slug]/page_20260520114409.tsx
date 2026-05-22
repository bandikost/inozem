

import { getProgramBySlug } from "@/lib/programm"
import ProgramEditor from "./ProgramEditor"

export default async function ContentEditor({ params }: any) {
  const program = await getProgramBySlug(params.slug)

  return (
    <div>
      <ProgramEditor program={program} />
    </div>
  )
}