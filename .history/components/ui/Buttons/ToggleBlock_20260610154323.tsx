'use client'

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  title: string;
  children: React.ReactNode;
}

export function ToggleBlock({
  title,
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
      rounded-2xl
      border
      border-slate-200
      overflow-hidden
      "
    >
      <button
        onClick={() => setOpen(!open)}
        className="
        w-full
        flex
        justify-between
        items-center
        px-5
        py-4
        bg-slate-50
        hover:bg-slate-100
        transition-all
        "
      >
        <span className="font-medium text-slate-800">
          {title}
        </span>

        <ChevronDown
          className={`
            transition-transform
            duration-300
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {open && (
        <div className="p-5 border-t border-slate-200 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}