"use client"

import { getAllUsers } from '@/lib/users'
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react'
import { useMemo, useState } from 'react'


export default async function UsersClient() {

  const [ascending, setAscending] = useState(true)
  const [value, setValue] = useState('')

    const users = await getAllUsers()

  const processedUsers = useMemo(() => {
    return users
      .filter(user =>
        `${user.last_name} ${user.name} ${user.patronymic}`
          .toLowerCase()
          .includes(value.toLowerCase())
      )
      .sort((a, b) => {
        const result = a.last_name.localeCompare(b.last_name, 'ru')
        return ascending ? result : -result
      })
  }, [users, ascending, value])



  return (
    <section className="flex flex-col items-center ">
      <div className="flex items-center mt-27">
        <h1 className="text-3xl font-normal">Пользователи</h1>

        <button
          onClick={() => setAscending(prev => !prev)}
          className="px-4 py-2 bg-purple-600 text-white rounded ml-2"
        >
          Сортировка {ascending ? <ArrowDownNarrowWide className='w-5' /> : <ArrowUpNarrowWide className='w-5' /> }
        </button>
      </div>

      <div className="flex items-center mt-8">
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Введите ФИО..."
          className="border px-2 py-1"
        />
      </div>

      <div className="mt-8 w-full border border-gray-300 mt-8 rounded shadow-2xl bg-white px-6 py-3 grid grid-cols-2">
        {processedUsers.map((user, idx) => (
          <div key={user.id}>
            {idx + 1}. {user.last_name} {user.name}
          </div>
        ))}
      </div>
    </section>
  )
}