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
                    {userRank  && (
                        <div className="mt-4 text-center text-xl text-prpl">
                            Вы на {userRank}-м месте
                        </div>
                    )}
                    <ul className="mt-6 flex flex-col items-start justify-center ">
                        {leaderboard.map((l, index) => (
                            <li key={l.id} className="border border-gray-300 p-2">
                                {index + 1}. {l.last_name} {l.name} {l.patronymic} - 
                                <span className="text-yellow-400"> {l.experience}</span> Очков опыта
                            </li>
                        ))}
                    </ul>

                    
                </div>
            )}
            
            {current === 3 && <div>Мой прогресс</div>}
        </>
    )
}