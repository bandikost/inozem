'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface ProgramSliderProps {
  blocks: {
    title: string | undefined
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
      <div className="flex items-center justify-between mb-6 gap-4 mt-20">
        <button onClick={prevSlide} className="px-4 py-2 rounded-md !text-blue-600 !text-lg hover:opacity-80 hover:underline cursor-pointer">
          <span className='flex items-center gap-2'><ArrowLeft size={16}/>Вернуться</span>
        </button>

        <h1 className="text-prpl text-center ">{blocks[current].title}</h1>
    
        <button onClick={nextSlide} className="px-4 py-2 rounded-md !text-blue-600 !text-lg hover:opacity-80 hover:underline cursor-pointer">
          <span className='flex items-center gap-2'>Дальше <ArrowRight size={16}/></span>
        </button>
      </div>

      
      <div className="relative">
  <div className="flex items-center justify-between mb-6 gap-4 mt-20">
    ...
  </div>

  <div className="text-lg text-center font-normal text-blue my-4">
    Блок {current + 1} из {blocks.length}
  </div>

  <div className="relative mt-10">
    
    {/* КНОПКИ */}
    <div className="absolute left-0 top-0 w-80 flex flex-col gap-2">
      {blocks.map((block, index) => (
        <button
          key={index}
          onClick={() => setCurrent(index)}
          className={`w-full px-3 text-lg rounded-md border ${
            current === index ? 'button-more' : 'button-more-bulge'
          }`}
        >
          {block.title}
        </button>
      ))}
    </div>

    {/* КОНТЕНТ */}
    <div className="pl-84 flex flex-col w-full min-h-[400px] bg-white">
      {blocks[current].component}
    </div>

  </div>
</div>


    </div>
  )
}