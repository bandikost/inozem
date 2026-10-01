"use client"

import { useEffect, useState } from "react"

type ActivityStats = {
  currentWeek: number
  previousWeek: number
}

export default function AdminActivityStats() {
  const [stats, setStats] = useState<ActivityStats | null>(null)

  useEffect(() => {
    fetch("/api/admin/activity_info")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((error) => {
        console.error("Failed to load activity stats:", error)
      })
  }, [])

  if (!stats) {
    return null
  }

  const difference = stats.currentWeek - stats.previousWeek

  const getDaysWord = (days: number) => {
    if (days === 1) return "день"
    if (days >= 2 && days <= 4) return "дня"
    return "дней"
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
     
        <div className="border-b border-gray-100 px-6 py-5">
          <p className="text-sm font-medium text-gray-500">
            Активность в админке
          </p>

          <h3 className="mt-1 text-lg font-semibold text-gray-900">
            Рабочие дни
          </h3>
        </div>

  
        <div className="grid grid-cols-2">
    
          <div className="relative p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-prpl" />
              <span className="text-sm font-medium text-gray-500">
                Эта неделя
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tight text-gray-900">
                {stats.currentWeek}
              </span>

              <span className="text-sm text-gray-500">
                {getDaysWord(stats.currentWeek)}
              </span>
            </div>
          </div>

          <div className="border-l border-gray-100 bg-gray-50/60 p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
              <span className="text-sm font-medium text-gray-500">
                Прошлая неделя
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tight text-gray-700">
                {stats.previousWeek}
              </span>

              <span className="text-sm text-gray-500">
                {getDaysWord(stats.previousWeek)}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 px-6 py-4">
          {difference > 0 ? (
            <p className="text-sm text-emerald-600">
              ↑ На {difference} {getDaysWord(difference)} больше, чем на прошлой неделе
            </p>
          ) : difference < 0 ? (
            <p className="text-sm text-orange-600">
              ↓ На {Math.abs(difference)}{" "}
              {getDaysWord(Math.abs(difference))} меньше, чем на прошлой неделе
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              → Столько же, сколько и на прошлой неделе
            </p>
          )}
        </div>
      </div>
    </div>
  )
}