"use client"

import { useState } from "react"

const items = [
    {id: 1, name: "", text: "1"},
    {id: 2, name: "", text: "2"},
    {id: 3, name: "", text: "3"},

]

export default function Page() {
     const [sortType, setSortType] = useState('asc');

   const sortedItems = [...items].sort((a, b) => {
    if (sortType === 'asc') {
      return a.name.localeCompare(b.name)
    } else {
      return b.name.localeCompare(a.name)
    }
  });

  const toggleSort = () => {
    setSortType(sortType === 'asc' ? 'desc' : 'asc');
  };

return (
    <section className="flex flex-col">
      <h1 className="text-prpl font-semibold mt-27 text-3xl text-center">Первичная специализированная аккредитация</h1>

        <div className="flex justify-between">

            <div className="flex flex-col mt-8 mr-4 gap-4">
                <button className="px-2 py-2 bg-prpl text-white text-center rounded-md cursor-pointer hover:bg-purple-500">Нормативная база аккредитации</button>
                <button className="px-2 py-2 bg-prpl text-white text-center rounded-md cursor-pointer hover:bg-purple-500">Документы для первичной специализированной аккредитации</button>
                <button className="px-2 py-2 bg-prpl text-white text-center rounded-md cursor-pointer hover:bg-purple-500">Правила поведения аккредитаци</button>
            </div>  

            <div className="w-full border-2 border-dotted border-zinc-300  mt-8 rounded shadow-2xl bg-white px-6 py-3">
                <ul>
        {sortedItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
            </div>

        </div>
        
        
        
    </section> 
    )
}