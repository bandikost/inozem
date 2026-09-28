
"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx"

type ActivityExportProps = {
  activities: string[];
};

export default function ActivityExport({
  activities,
}: ActivityExportProps) {
  const [selectedActivity, setSelectedActivity] = useState("")

  const DownloadButton = async () => { 
    const response = await fetch("/api/activity-users/export", { 
        method: "POST", 
        headers: { "Content-Type": "application/json", }, 
        body: JSON.stringify({ activityName: selectedActivity, }), 
    }) 
    
    if (!response.ok)  {
        console.error("Ошибка получения данных")
        return
    } 
    const users = await response.json()
    const excelData = users.map((user: any) => ({ Мероприятие: user.activity_name, Фамилия: user.last_name, Имя: user.name, Отчество: user.patronymic, Email: user.email, Телефон: user.phone, Город: user.city, "Дата заявки": new Date(user.created_at).toLocaleDateString("ru-RU"), }))
    const worksheet = XLSX.utils.json_to_sheet(excelData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet( workbook, worksheet, "Заявки" )
    XLSX.writeFile( workbook, `${selectedActivity}.xlsx` )
}

  return (
    <div className="flex flex-wrap items-center gap-3 my-12">
  <select
    value={selectedActivity}
    onChange={(e) => setSelectedActivity(e.target.value)}
    className="min-w-[280px] rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
  >
    <option value="">Выберите мероприятие</option>

    {activities.map((activity) => (
      <option key={activity} value={activity}>
        {activity}
      </option>
    ))}
  </select>

  <button
    type="button"
    onClick={DownloadButton}
    disabled={!selectedActivity}
    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-blue-600"
  >
    <Download size={17} />
    Скачать Excel
  </button>
</div>
  )
}
