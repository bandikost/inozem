'use client'

import { Files, ScrollText, Search, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from "react-dom";

interface ProgramsButtonsProps {
  setActiveId: (id: number) => void;
  activeId: number;
}

export default function ProgramsButtons({ setActiveId, activeId }: ProgramsButtonsProps) {
  const [mounted, setMounted] = useState(false)
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    setMounted(true)
    setContainer(document.body)
  }, []);

  if (!mounted || !container) return null

  const ButtonItem = ({ id, icon: Icon, text }: any) => (
    <button
      className={`p-4 cursor-pointer w-full text-left flex items-center gap-2 ${
        activeId === id ? 'bg-prpl !text-white' : '!text-[#212127] hover:bg-prpl hover:!text-white'}`} onClick={() => {setActiveId(id); setMenuOpen(false)}}>
      <Icon size={18} />
      {text}
    </button>
  )

  const handleClose = () => {
  setClosing(true)
  setTimeout(() => {
    setMenuOpen(false)
    setClosing(false)
  }, 100)
}

  return createPortal(
    <>
      <button onClick={() => setMenuOpen(true)} className="fixed -left-2 top-1/6 z-50 flex items-center gap-2 bg-prpl text-white px-4 py-2 rounded-md shadow-lg 2xl:hidden">
        <Menu size={18} />
      </button>

      {(menuOpen || closing) && (
        <div className="!fixed inset-0 z-50 2xl:hidden">
          <div className={`absolute inset-0 transition-opacity duration-300 ${closing ? 'opacity-0' : 'opacity-100'} bg-black/40`} onClick={handleClose}/>
        
          <div className={`fixed -left-1 top-10 h-full w-72 bg-white shadow-xl p-4 rounded-md ${closing ? 'animate-slideOut' : 'animate-slideIn'}`}>
            <div className="flex flex-col border border-gray-300 rounded-md text-base">
              <li className='!text-[#212127] hover:bg-prpl hover:!text-white list-none rounded-md !text-lg'><ButtonItem id={1} icon={Files} text="Форма, Анкеты, Заявления" /></li>
              <hr className='border border-gray-300' />
              <li className='!text-[#212127] hover:bg-prpl hover:!text-white list-none rounded-md !text-lg'><ButtonItem id={2} icon={ScrollText} text="Прейскурант" /></li>
              <hr className='border border-gray-300' />
              <li className='!text-[#212127] hover:bg-prpl hover:!text-white list-none rounded-md !text-lg'><ButtonItem id={3} icon={Search} text="Поиск по критериям" /></li>
            </div>
          </div>
        </div>
      )}

      <div className="hidden 2xl:block fixed -left-1 top-1/3 -translate-y-2/3 z-50 bg-white border border-gray-300 shadow-2xl rounded-md">
        <ul className='flex flex-col text-xl'>
          <li><ButtonItem id={1} icon={Files} text="Форма, Анкеты, Заявления" /></li>
          <hr className='border border-gray-300' />
          <li><ButtonItem id={2} icon={ScrollText} text="Прейскурант" /></li>
          <hr className='border border-gray-300' />
          <li><ButtonItem id={3} icon={Search} text="Поиск по критериям" /></li>
        </ul>
      </div>
    </>,
    container
  );
}