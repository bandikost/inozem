import { UserRow } from "@/app/interface/user"
import TokenCheck from "@/components/token/token"
import { getProfile } from "@/lib/getProfile"
import { getProgramBySlug, hasUserProgram } from "@/lib/programm"
import { redirect } from "next/navigation"
import { getLeaderboard } from "@/lib/games/games"
import TabsWrapper from "./Components/TabsWrapper"


export const metadata = {
    title: 'Виртуальное обучение | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»',
}


export default async function Page() {
    const leaderboard = await getLeaderboard()
    
    const program = await getProgramBySlug("org-sestrinskoe-delo-pp")
    if (!program) return <div className="mt-20 text-center">Программа не найдена</div>

    const token = await TokenCheck()
      let user: UserRow
      let hasAccess = false

      try {
        user = await getProfile(token)
        hasAccess = await hasUserProgram(user.id, program.id)
        
      } catch {
        redirect("/login")
      }

      if (!hasAccess) {
        redirect("/programs/org-sestrinskoe-delo-pp")
      }
  
     const userIndex = leaderboard.findIndex(l => l.user_id === user.id)
    const userRank = userIndex >= 0 ? userIndex + 1 : null

  return (
    <>
    {hasAccess && (
    <section className='flex flex-col justify-center pb-20 px-4'>
        
      <h1 className='mt-27 text-prpl text-center'>Виртуальное обучение</h1>

        <TabsWrapper leaderboard={leaderboard.slice(0, 10)} userRank={userRank} />

        
        
      </section>
  )}
  </>
  )
}   