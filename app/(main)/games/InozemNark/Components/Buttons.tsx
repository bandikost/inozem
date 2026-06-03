"use client"

type Props = {
    current: number
    setCurrent: (index: number) => void
}

export default function Buttons({ current, setCurrent }: Props) {
    return (
        <div className="h-[100px] flex items-center justify-center gap-2 overflow-x-auto">
            <button className={`px-3 py-2 text-xl text-[#202027] rounded-md border whitespace-nowrap ${ current === 0 ? 'button-more' : 'button-more-bulge opacity-80' }`} onClick={() => setCurrent(0)}>Обучение</button>
            <button className={`px-3 py-2 text-xl text-[#202027] rounded-md border whitespace-nowrap ${ current === 1 ? 'button-more' : 'button-more-bulge opacity-80' }`} onClick={() => setCurrent(1)}>Достижения</button>
            <button className={`px-3 py-2 text-xl text-[#202027] rounded-md border whitespace-nowrap ${ current === 2 ? 'button-more' : 'button-more-bulge opacity-80' }`} onClick={() => setCurrent(2)}>Таблица лидеров</button>
            <button className={`px-3 py-2 text-xl text-[#202027] rounded-md border whitespace-nowrap ${ current === 3 ? 'button-more' : 'button-more-bulge opacity-80' }`} onClick={() => setCurrent(3)}>Мой прогресс</button>
        </div>
    )
}