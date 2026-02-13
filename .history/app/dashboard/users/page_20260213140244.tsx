'use client'

import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type User = {
  id: number
  name: string
  last_name: string
  patronymic: string
  phone: string
  email: string
  created_at: string
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([])
  const [ascending, setAscending] = useState(true)
  const [value, setValue] = useState('')

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('/api/users')
      if (!res.ok) throw new Error('Failed to fetch users')
      const data: User[] = await res.json()
      setUsers(data)
    }

    fetchUsers()
  }, [])

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
    <section className="flex flex-col items-center">
      <div className="flex gap-4 items-center mt-12">
        <h1 className="text-3xl font-normal">Пользователи</h1>

        <button
          onClick={() => setAscending(prev => !prev)}
          className="px-4 py-2 bg-purple-600 text-white rounded flex"
        >
          Сортировка: {ascending ? <ArrowDownNarrowWide className='w-5' /> : <ArrowUpNarrowWide className='w-5' /> }
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

      <div className="border-2 border-dotted border-zinc-300 pb-8 mt-8 rounded shadow-2xl bg-white w-full max-w-2xl">
        <div className="grid gap-4 mt-6 px-6">
          {processedUsers.map((user, idx) => (
            <div key={user.id}>
                <div className='grid grid-cols-2 items-center'> 

                <div className='flex flex-col'> 
                    <p className="text-xl">
                        {idx + 1}. {user.last_name} {user.name} {user.patronymic}
                    </p>

                    <div className="flex items-center">
                        <p className="text-sm text-zinc-500">{user.phone}</p>
                        <small className="text-sm text-zinc-500 ml-6">{new Date(user.created_at).toLocaleDateString('ru-RU')}</small>
                    </div>   
                </div>

                <button className='px-2 py-2 bg-purple-600 text-white rounded text-center ml-12'>добавить в программу</button>

                </div>
            </div>
          ))}
            
          {processedUsers.length === 0 && (
            <p className="text-zinc-500">Ничего не найдено</p>
          )}
        </div>
      </div>
    </section>
  )
}
