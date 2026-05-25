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
      


        <h1 className="text-prpl text-center ">{blocks[current].title}</h1>
    
        
     
    <div className="mt-10 flex flex-col gap-6">

      <div className="h-[100px] flex items-center gap-2 overflow-x-auto">
        {blocks.map((block, index) => (
          <button key={index} onClick={() => setCurrent(index)} className={`px-3 py-2 text-xl text-[#202027] rounded-md border whitespace-nowrap ${ current === index ? 'button-more' : 'button-more-bulge opacity-80' }`}>
            {block.title}
          </button>
        ))}
      </div>
 
      <div className="min-h-[500px] bg-white flex flex-col">
        {blocks[current].component}
      </div>

<div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 mt-20">
        <button onClick={prevSlide} className="px-4 py-2 rounded-md !text-blue-600 !text-lg hover:opacity-80 hover:underline cursor-pointer">
          <span className='flex items-center gap-2'><ArrowLeft size={16}/>Вернуться</span>
        </button>
        <button onClick={nextSlide} className="px-4 py-2 rounded-md !text-blue-600 !text-lg hover:opacity-80 hover:underline cursor-pointer">
          <span className='flex items-center gap-2'>Дальше <ArrowRight size={16}/></span>
        </button>
      </div>
    </div>


    </div>
  )
}