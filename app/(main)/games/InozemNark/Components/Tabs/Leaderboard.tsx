import { getLeaderboard } from "@/lib/games/games"


export default async function Leaderboard() {

    const leaderboard = await getLeaderboard()

    return (
    <div>
        {leaderboard.map(l => (
            <li key={l.id}>{l.experience}</li>
        ))}
    </div>
    )
}