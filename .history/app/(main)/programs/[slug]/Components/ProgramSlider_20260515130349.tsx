'use client'

import { useState } from 'react'

interface ProgramSliderProps {
  blocks: {
    title: string
    component: React.ReactNode
  }[]
}

export default function ProgramSlider({ blocks }: ProgramSliderProps) {
  const [current, setCurrent] = useState(0)

  if (!blocks.length) return null

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % blocks.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + blocks.length) % blocks.length)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4">
        <button
          onClick={prevSlide}
          className="border px-4 py-2 rounded-md"
        >
          Назад
        </button>

        <button onClick={nextSlide} className="border px-4 py-2 rounded-md">
          Следующий блок
        </button>
      </div>

      <div className=" p-4 min-h-[300px]">
        <h3 className="mb-4 !text-2xl text-prpl text-center">
          {blocks[current].title}
        </h3>

        {blocks[current].component}
      </div>

        <div className="text-lg font-semibold">
          Блок {current + 1} из {blocks.length}
        </div>

      <div className="flex gap-2 mt-4 flex-wrap">
        {blocks.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-10 h-10 rounded-md border ${
              current === index ? 'bg-black text-white' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}