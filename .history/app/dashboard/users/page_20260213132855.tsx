'use client'

import { useState, useMemo } from 'react'

type User = {
  id: number
  name: string
  last_name: string
  patronymic: string
  phone: string
  email: string
}

interface Props {
  users: User[]
}

export default function UsersList({ users }: Props) {
  const [ascending, setAscending] = useState(true)

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const result = a.last_name.localeCompare(b.last_name, 'ru')
      return ascending ? result : -result
    })
  }, [users, ascending])

  return (
    <section className="flex flex-col items-center">
      <div className="flex gap-4 items-center mt-8">
        <h1 className="text-3xl font-normal">Пользователи</h1>

        <button
          onClick={() => setAscending(prev => !prev)}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Сортировка: {ascending ? 'А → Я' : 'Я → А'}
        </button>
      </div>

      <div className="border-2 border-dotted border-zinc-300 pb-8 mt-8 rounded shadow-2xl bg-white">
        <ul className="grid gap-4 grid-cols-1 mt-6 px-6">
          {sortedUsers.map(user => (
            <li key={user.id}>
              {user.last_name} {user.name} {user.patronymic}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
