'use client'
import { useEffect, useState } from 'react';

export default function ProgramsButtons() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-white border border-gray-300 p-2">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
  );
}