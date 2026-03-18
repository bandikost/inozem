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
  const [visibleItems, setVisbileItems] = useState(8)

  const handleShowMore = () => {
    setVisbileItems(prev => prev + 8)
  }

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
    <section className="px-6 mb-20">
      <h1 className="text-3xl mt-27">Пользователи</h1>

      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Поиск..."
        className="border px-2 py-1 mt-4"
      />

    <div className='grid grid-cols-2 gap-6'>
      {processedUsers.slice(0, visibleItems).map(u => (
        <div key={u.id} className='border border-gray-300 mt-8 rounded shadow-2xl bg-white py-3 px-6'>
          <p></p>{u.last_name} {u.name}
          <button>Добавить программу</button>
        </div>
      ))}
    </div>
    <button className='button-more mt-10' onClick={handleShowMore}>Показать еще</button>

    </section>
  )
}