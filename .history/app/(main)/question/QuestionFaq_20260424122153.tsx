'use client'

import { FAQ } from "@/data/faq";
import { useState } from "react";

export default function QuestionFaq() {
    const [visibleAnswer, setVisibleAnswer] = useState<number | null>(null)
    const handleSwitchVisible = (id: number) => {
    setVisibleAnswer(prev => prev === id ? null : id)
    }

    return (
        <div className="grid">
            <div className="border border-gray-300 rounded-md shadow-xl p-4">
                <h2 className="text-blue">Часто задаваемые вопросы <br /><span className="!text-xl text-default">- Теоретическая часть</span></h2>
                {FAQ
                .slice(0, 5)
                .map(f => (
                        <ul key={f.id} className="px-2 mt-3">
                            <button className="!text-zinc-800 cursor-pointer text-lg" onClick={() => handleSwitchVisible(f.id)}>{f.id}. {f.question} <span className="text-blue">- Нажмите для ответа</span></button>
                            {visibleAnswer === f.id && (
                                <li className="mt-1 text-blue !font-medium border border-gray-300 rounded-md px-2 py-1 bg-gray-100">{f.answer}</li>
                            )}
                        </ul>
                    ))}
            </div>
            <div className="mt-10 border border-gray-300 rounded-md shadow-xl p-4">
                <h2 className="text-blue">Часто задаваемые вопросы <br /><span className="!text-xl text-default">- Техническая часть</span></h2>
                    {FAQ
                    .slice(5, 10)
                    .map(f => (
                        <ul key={f.id} className="px-2 mt-3">
                            <button className="!text-zinc-800 cursor-pointer text-lg" onClick={() => handleSwitchVisible(f.id)}>{f.id}. {f.question} <span className="text-blue">- Нажмите для ответа</span></button>
                            {visibleAnswer === f.id && (
                                <li className="mt-1 text-blue !font-medium border border-gray-300 rounded-md px-2 py-1 bg-gray-100">{f.answer}</li>
                            )}
                        </ul>
                    ))}
                    
            </div>
        </div>
    )
}