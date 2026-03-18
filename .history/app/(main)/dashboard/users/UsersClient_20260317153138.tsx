"use client"

import { useMemo, useState } from 'react'

type User = {
  id: number
  name: string
  last_name: string
  patronymic: string
  phone?: string
  email?: string
  created_at?: string
}

interface UsersClientProps {
  users: User[]
}

export default function UsersClient({ users }: UsersClientProps) {

  const [ascending, setAscending] = useState(true)
  const [value, setValue] = useState('')

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
      <h1 className="text-3xl mt-20">Пользователи</h1>

      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Поиск..."
        className="border px-2 py-1 mt-4"
      />

      {processedUsers.map(u => (
        <div key={u.id} className='border border-gray-300 mt-8 rounded shadow-2xl bg-white py-3'>
          {u.last_name} {u.name}
        </div>
      ))}
    </section>
  )
}