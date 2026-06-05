"use client"

import { useState } from "react"
import Buttons from "./Buttons"
import Achievements from "./Tabs/Achievements"


export default function TabsWrapper({ leaderboard, userRank }: { leaderboard: any[], userRank: number | null}) {
    const [current, setCurrent] = useState(2)

    return (
        <>
            <Buttons current={current} setCurrent={setCurrent} />

            {current === 0 && <div>Обучение</div>}
            {current === 1 && <Achievements />}
            {current === 2 && (
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold mb-4 mt-10">Топ 10 самых активных участников</h2>
                    {userRank  && (
                        <div className="mt-4 text-center text-xl text-prpl">
                            Вы на {userRank}-м месте. Ваше количество опыта: {leaderboard.find(l => l.id === userRank)?.experience || 0}
                        </div>
                    )}
                    
                    <table className="mt-6 w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left">Место</th>
                            <th className="border border-gray-300 p-2 text-left">Участник</th>
                            <th className="border border-gray-300 p-2 text-left">Опыт</th>
                            </tr>
                        </thead>

                        <tbody>
                            {leaderboard.map((l, index) => (
                            <tr key={l.id}>
                                <td className="border border-gray-300 p-2">
                                {index + 1}
                                </td>

                                <td className="border border-gray-300 p-2">
                                {l.last_name} {l.name} {l.patronymic}
                                </td>

                                <td className="border border-gray-300 p-2 text-yellow-500 font-semibold">
                                {l.experience}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table> 
                </div>
            )}
            
            {current === 3 && <div>Мой прогресс</div>}
        </>
    )
}