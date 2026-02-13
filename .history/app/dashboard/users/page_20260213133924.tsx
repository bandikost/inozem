'use client'

import { useEffect, useMemo, useState } from 'react'

type User = {
  id: number
  name: string
  last_name: string
  patronymic: string
  phone: string
  email: string
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([])
  const [ascending, setAscending] = useState(true)
  const [value, setValue] = useState("")

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('/api/users')
      if (!res.ok) throw new Error('Failed to fetch users')
      const data: User[] = await res.json()
      setUsers(data)
    }

    fetchUsers()
  }, [])

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      const result = a.last_name.localeCompare(b.last_name, 'ru')
      return ascending ? result : -result
    })
  }, [users, ascending])


  const handleFind = () => {

  }

  return (
    <section className="flex flex-col items-center">
      <div className="flex gap-4 items-center mt-12">
        <h1 className="text-3xl font-normal">Пользователи</h1>

        <button
          onClick={() => setAscending(prev => !prev)}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Сортировка: {ascending ? 'А → Я' : 'Я → А'}
        </button>
      </div>
    <div className='flex items-center'> 
        <input value={value} onChange={(e:any) => setValue(e.target.value)} className='border mt-8' />
        <button>Найти</button>
    </div>
        

      <div className="border-2 border-dotted border-zinc-300 pb-8 mt-8 rounded shadow-2xl bg-white">
        <div className="grid gap-4 grid-cols-1 mt-6 px-6">
            
          {sortedUsers.map((user, idx) => (
            <div key={user.id}>
                <p className='text-xl text-default !font-base'>{idx + 1}. {user.last_name} {user.name} {user.patronymic}</p> 
                <div className='grid grid-cols-2'>
                    <p className='text-sm text-zinc-500'>{user.email}</p>
                    <p className='text-sm text-zinc-500'>{user.phone}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
