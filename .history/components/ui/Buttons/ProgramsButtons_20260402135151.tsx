'use client'
import { Files, ScrollText, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from "react-dom";

interface ProgramsButtonsProps {
  setActiveId: (id: number) => void;
  activeId: number;
}

export default function ProgramsButtons({ setActiveId, activeId }: ProgramsButtonsProps) {
  const [mounted, setMounted] = useState(false)
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    setMounted(true)
    setContainer(document.body)
  }, []);

  if (!mounted || !container) return null

  return createPortal(
    <div className="fixed left-7 top-1/3 -translate-y-1/3 z-50 bg-white border border-gray-300 shadow-2xl rounded-md">
      <ul className='flex flex-col text-xl'>
        <li>
          <button
            className={`p-4 cursor-pointer w-full text-left flex items-center gap-1 ${
              activeId === 1 ? 'bg-prpl text-white' : '!text-[#212127] hover:bg-prpl hover:!text-white'}`} onClick={() => setActiveId(1)}>
            <Files size={18} />Форма, Анкеты, Заявления
          </button>
        </li>
        <hr className='border border-gray-300' />
        <li>
          <button className={`p-4 cursor-pointer w-full text-left flex items-center gap-1 ${
            activeId === 2 ? 'bg-prpl text-white' : '!text-[#212127] hover:bg-prpl hover:!text-white'}`} onClick={() => setActiveId(2)}>
            <ScrollText size={18} />Прейскурант
          </button>
        </li>
        <hr className='border border-gray-300' />
        <li>
          <button className={`p-4 cursor-pointer w-full text-left flex items-center gap-1 ${
              activeId === 3 ? 'bg-prpl text-white' : '!text-[#212127] hover:bg-prpl hover:!text-white'}`} onClick={() => setActiveId(3)}>
            <Search size={18} />Поиск по критериям
          </button>
        </li>
      </ul>
    </div>,
    container
  );
}