'use client'
import { Files, List, ScrollText, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from "react-dom";

export default function ProgramsButtons() {
    const [mounted, setMounted] = useState(false)
    const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setMounted(true)
    setContainer(document.body)
  }, []);

  if (!mounted || !container) return null

  return createPortal(
    <div className="fixed left-10 top-1/3 -translate-y-1/3 z-50 bg-white border border-gray-300 shadow-2xl rounded-md">
      <ul className='flex flex-col text-xl'>
        <li><button className='p-4 !text-[#212127] hover:bg-prpl cursor-pointer hover:!text-white w-full text-left flex items-center gap-1'><List size={18} />Все программы</button></li>
        <hr className='border border-gray-300 p-0 m-0' />
        <li><button className='p-4 !text-[#212127] hover:bg-prpl cursor-pointer hover:!text-white w-full text-left flex items-center gap-1'><Files size={18} />Форма, Анкеты, Заявления</button></li>
        <hr className='border border-gray-300' />
        <li><button className='p-4 !text-[#212127] hover:bg-prpl cursor-pointer hover:!text-white w-full text-left flex items-center gap-1'><ScrollText size={18} />Прейскурант</button></li>
        <hr className='border border-gray-300' />
        <li><button className='p-4 !text-[#212127] hover:bg-prpl cursor-pointer hover:!text-white w-full text-left flex items-center gap-1'><Search size={18} />Поиск по критериям</button></li>
      </ul>
    </div>,
    container
  );
}