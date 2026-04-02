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

  return createPortal(
    <>
      <button
        onClick={() => setMenuOpen(true)}
        className="fixed left-4 top-4 z-50 flex items-center gap-2 bg-prpl text-white px-4 py-2 rounded-md shadow-lg lg:hidden"
      >
        <Menu size={18} />
        Меню
      </button>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)}/>

          <div className="fixed left-0 !top-2/3 !translate-y-2/3 h-full w-72 bg-white shadow-xl p-4 animate-slideIn">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold">Меню</p>
              <button onClick={() => setMenuOpen(false)}>
                <X />
              </button>
            </div>

            <div className="flex flex-col">
              <ButtonItem id={1} icon={Files} text="Форма, Анкеты, Заявления" />
              <ButtonItem id={2} icon={ScrollText} text="Прейскурант" />
              <ButtonItem id={3} icon={Search} text="Поиск по критериям" />
            </div>
          </div>
        </div>
      )}

      <div className="hidden lg:block fixed left-7 top-2/3 -translate-y-2/3 z-50 bg-white border border-gray-300 shadow-2xl rounded-md">
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