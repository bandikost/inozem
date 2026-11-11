"use client"

import { LearningModule } from "@/app/interface/learningModule"
import { ChevronRight, BookOpen } from "lucide-react"


type Props = {
  module: LearningModule
  onClick: () => void
}

export default function ModuleCard({ module, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        group w-full text-left
        rounded-xl border border-gray-200
        bg-white p-5
        transition-all duration-200
        hover:border-prpl hover:shadow-md
      "
    >
      <div className="flex items-start gap-4">
        <div className="
          flex h-12 w-12 shrink-0 items-center justify-center
          rounded-xl bg-prpl/10 text-prpl
        ">
          <BookOpen size={23} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900">
            {module.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            {module.description}
          </p>
        </div>

        <ChevronRight
          className="mt-2 shrink-0 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-prpl"
          size={20}
        />
      </div>
    </button>
  )
}