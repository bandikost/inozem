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
    <div className="fixed left-10 top-1/2 -translate-y-1/2 z-50 bg-white border border-gray-300 p-4 rounded-md">
      <ul className='text-lg'>
        <li><button className='!text-default'>Все программы</button></li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>,
    container
  );
}