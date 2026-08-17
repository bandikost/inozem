'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface ProgramSliderProps {
  blocks: {
    title: string | undefined
    component: React.ReactNode
  }[]
  name: string
  suptitle: string
}

export default function ProgramSlider({
  blocks,
  name,
  suptitle,
}: ProgramSliderProps) {
  const [current, setCurrent] = useState(0)

  if (!blocks.length) return null

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % blocks.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + blocks.length) % blocks.length)
  }

  const currentBlock = blocks[current]

  return (
    <section className="mt-10">
      {/* Заголовок */}
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="!text-3xl font-semibold tracking-tight text-prpl md:!text-4xl">
          {name}
        </h1>

        {suptitle && (
          <p className="mx-auto mt-3 max-w-3xl !text-base !font-normal leading-relaxed text-default/70 md:!text-lg">
            {suptitle}
          </p>
        )}
      </div>


      <div className="mt-10">
        <div className=" pb-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {blocks.map((block, index) => {
            const active = current === index

            return (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`
                  shrink-0 rounded-full border px-4 py-2.5
                  !text-lg font-medium transition-all duration-200
                  md:!text-base
                  ${
                    active
                      ? 'border-prpl bg-prpl text-white shadow-md shadow-purple-200'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-prpl/40 hover:bg-purple-50 hover:text-prpl cursor-pointer'
                  }
                `}
              >
                {String(index + 1).padStart(2, '0')}
                <span className="ml-2">
                  {block.title || `Блок ${index + 1}`}
                </span>
              </button>
            )
          })}
        </div>
      </div>


      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)]">
        <div className="border-b border-slate-100 bg-gradient-to-r from-purple-50/80 via-white to-white px-5 py-5 md:px-8 md:py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-prpl/70">
                Блок {String(current + 1).padStart(2, '0')}
              </p>

              <h2 className="mt-1 !text-xl font-semibold text-slate-900 md:!text-2xl">
                {currentBlock.title}
              </h2>
            </div>

            <div className="hidden shrink-0 text-sm font-medium text-slate-400 md:block">
              {String(current + 1).padStart(2, '0')} /{' '}
              {String(blocks.length).padStart(2, '0')}
            </div>
          </div>
        </div>

        <div className="px-5 py-7 md:px-8 md:py-10">
          {currentBlock.component}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-4 py-4 md:px-8">
          <button
            onClick={prevSlide}
            className="
              group flex items-center gap-2 rounded-xl px-3 py-2
              !text-sm font-medium text-slate-500
              transition-colors hover:bg-white hover:text-prpl
              md:!text-base cursor-pointer
            "
          >
            <ArrowLeft
              size={17}
              className="transition-transform group-hover:-translate-x-1"
            />

            <span className="hidden sm:inline">
              {current === 0 ? 'Предыдущий блок' : 'Назад'}
            </span>

            <span className="sm:hidden">
              Назад
            </span>
          </button>

          <div className="flex gap-1.5 md:hidden">
            {blocks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Перейти к блоку ${index + 1}`}
                className={`
                  h-1.5 rounded-full transition-all
                  ${
                    current === index
                      ? 'w-6 bg-prpl'
                      : 'w-1.5 bg-slate-300'
                  }
                `}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="
              group flex items-center gap-2 rounded-xl px-3 py-2
              !text-sm font-medium text-prpl
              transition-colors hover:bg-white
              md:!text-base cursor-pointer
            "
          >
            <span>
              {current === blocks.length - 1 ? 'Начать сначала' : 'Дальше'}
            </span>

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  )
}