"use client"

import { useState } from "react"
import Buttons from "./Buttons"
import { Game } from "@/app/interface/games"
import { AchievementKey, achievementsMap } from "@/lib/games/achievements"


type Props = {
  leaderboard: Game[]
  userRank: number | null
  achievements: Game[]
}

export default function TabsWrapper({ leaderboard, userRank, achievements }: Props) {
    const [current, setCurrent] = useState(2)

    const keys: AchievementKey[] = JSON.parse(
    achievements[0]?.achievements || "[]"
  )


    return (
        <>
            <Buttons current={current} setCurrent={setCurrent} />

            {current === 0 && <div className="flex items-center justify-center text-lg mt-10 text-center">Тут нужно разместить контент обучения</div>}
            {current === 1 && <div className="flex flex-col gap-4 mt-10" >
                        {keys.map((key) => {
                            const item = achievementsMap[key]

                            if (!item) return null

                            const Icon = item.icon

                            return (
                            <div  key={key} style={{
                                border: `1px solid ${item.borderColor}`,
                                background: item.bgColor,
                                padding: 10,
                                borderRadius: 10,
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                }} 
                            className="flex  items-center justify-start gap-4 border border-gray-300 rounded-md ">
                                <div className="flex flex-col sm:flex-row items-center gap-4 p-2">
                                    <Icon size={40} color={item.color}/>
                                    <div className="flex flex-col gap-2 sm:gap-0">
                                        <span style={{ color: item.color }} className="text-default text-2xl font-medium text-center sm:text-left">{item.name}</span>
                                    <span className="text-gray-500 font-base">{item.suptitle}</span>
                                    <span className="!text-sm font-bold text-green-600">Получено опыта: {item.exp}</span>
                                   </div> 
                                </div>
                            </div>
                            )
                        })}
                        </div>
            }
            {current === 2 && (
                <div className="flex flex-col items-center justify-center">
                    <div className="mt-10 mb-6 text-center">
       
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Топ 10 самых активных участников
                        </h2>

                        <div className="mt-2 h-[2px] w-36 bg-gray-200 mx-auto" />
                        </div>

                        {userRank && (
                        <div className="mb-6 flex justify-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 shadow-sm">
                            

                            <span className="text-lg flex flex-row gap-2 items-center">
                                <span className="text-purple-500">📊</span>
                                <p className="flex ">Вы на {userRank}-м месте</p>
                                <p className="font-bold">· опыт:{" "} {leaderboard[userRank - 1]?.experience || 0}</p>
                            </span>
                            </div>
                        </div>
                        )}
                    
                    <div className="mt-6 w-full max-w-3xl mx-auto rounded-xl border border-gray-300 bg-white shadow-xl overflow-hidden">
                 
                    <div className="grid grid-cols-12 bg-gray-50 text-lg font-semibold text-gray-600 gap-4 px-4 py-3">
                        <div className="col-span-2">Место</div>
                        <div className="col-span-7 text-center sm:text-left">Участник</div>
                        <div className="col-span-3 text-right">Опыт</div>
                    </div>

               
                    <div className="divide-y divide-gray-200 ">
                        {leaderboard.map((l, index) => (
                            <div key={l.id} className={`group grid grid-cols-12 items-center px-4 py-3 hover:bg-gray-100 transition ${ userRank === index + 1 ? 'bg-prpl' : ''}`}>
                                <div className={`col-span-2 font-bold text-gray-700 ${ userRank === index + 1 ? 'text-white group-hover:text-gray-700' : '' }`}>
                                    #{index + 1}
                                </div>

                                <div className="col-span-7 flex flex-col">
                                <span className={`font-medium text-default text-lg ${ userRank === index + 1 ? '!text-white group-hover:!text-gray-700' : '' }`}>
                                    {l.last_name} {l.name} {l.patronymic}
                                </span>
                                </div>
                                <div className="col-span-3 text-right">
                                <span className="inline-flex items-center text-center gap-1 px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 font-semibold text-sm">
                                    ⭐ {l.experience}
                                </span>
                                </div>
                            </div>
                            ))}
                    </div>
                    </div>
                </div>
            )}
            
        </>
    )
}