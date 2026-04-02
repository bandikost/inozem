'use client'
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
    <div className="fixed left-10 top-1/2 -translate-y-1/2 z-50 bg-white border border-gray-300 shadow-2xl rounded-md">
      <ul className='flex flex-col text-xl'>
        <li><button className='p-4 !text-[#212127] hover:bg-prpl cursor-pointer hover:!text-white w-full'>Все программы</button></li>
        <hr className='border border-gray-300 p-0 m-0' />
        <li><button className='p-4 !text-[#212127] hover:bg-prpl cursor-pointer hover:!text-white'>Форма, Анкеты, Заявления</button></li>
        <hr className='border border-gray-300' />
        <li><button className='p-4 !text-[#212127] hover:bg-prpl cursor-pointer hover:!text-white'>Все программы</button></li>
        <hr className='border border-gray-300' />
        <li><button className='p-4 !text-[#212127] hover:bg-prpl cursor-pointer hover:!text-white'>Все программы</button></li>
      </ul>
    </div>,
    container
  );
}