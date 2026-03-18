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
          .startsWith(value.toLowerCase())
      )
      .sort((a, b) => {
        const result = a.last_name.localeCompare(b.last_name, 'ru')
        return ascending ? result : -result
      })
  }, [users, ascending, value])

  return (
    <section className="px-6 mb-20">
      <h1 className="text-3xl mt-27 text-prpl">Пользователи</h1>
      <p>Поиск работает только по фамилии</p>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Поиск пользователя..."
        className="border border-gray-400 px-2 py-1 mt-4 rounded-md"
      />

    <div className='grid grid-cols-2 gap-6'>
      {processedUsers.slice(0, visibleItems).map(u => (
        <div key={u.id} className='border border-gray-300 mt-8 rounded shadow-2xl bg-white py-3 px-6 '>
          <div className='flex justify-between items-center'>
            <p>{u.last_name} {u.name}</p>
            <button className='button-more'>Добавить программу</button>
          </div>
          <p>{u?.email}</p>
        </div>
      ))}
    </div>
    {visibleItems < 8 ?  <button className='button-more mt-10' onClick={handleShowMore}>Показать еще</button>  : " "}

    </section>
  )
}