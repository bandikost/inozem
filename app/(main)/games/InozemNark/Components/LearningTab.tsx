"use client"

import { useState } from "react"
import { ArrowLeft, BookOpen } from "lucide-react"


import ModuleCard from "./ModuleCard"
import ModuleContent from "./ModuleContent"
import { learningModules } from "@/data/nark-modules"

export default function LearningTab() {
  const [activeModule, setActiveModule] = useState<number | null>(null)

  const selectedModule = learningModules.find(
    module => module.id === activeModule
  )

  if (selectedModule) {
    return (
      <div className="w-full">
        <button
          onClick={() => setActiveModule(null)}
          className="
            mb-6 inline-flex items-center gap-2
            text-sm font-medium text-prpl
            transition-opacity hover:opacity-70
          "
        >
          <ArrowLeft size={18} />
          Все тематические модули
        </button>

        <div className="mb-7">
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
            <BookOpen size={17} />
            Тематический модуль {selectedModule.id}
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            {selectedModule.title}
          </h2>

          <p className="mt-2 text-gray-500">
            {selectedModule.description}
          </p>
        </div>

        <ModuleContent moduleId={selectedModule.id} />
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-gray-900">
          Тематические модули
        </h2>

        <p className="mt-2 text-gray-500">
          Изучайте учебные материалы по каждому тематическому направлению.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {learningModules.map(module => (
          <ModuleCard
            key={module.id}
            module={module}
            onClick={() => setActiveModule(module.id)}
          />
        ))}
      </div>
    </div>
  )
}