"use client"

import Link from 'next/link'
import { useMemo, useState } from 'react'

type User = {
  id: number
  name: string
  last_name: string
  patronymic: string
  phone?: string
  email?: string
  program_name: string | null
  
}

type Programs = {
  id: number
  name: string
}

interface UsersClientProps {
  users: User[]
  programs: Programs[]
}

export default function UsersClient({ users, programs }: UsersClientProps) {

  const [ascending, setAscending] = useState(true)
  const [value, setValue] = useState('')
  const [visibleItems, setVisbileItems] = useState(8)
  const [selectedPrograms, setSelectedPrograms] = useState<Record<number, number>>({})

  const handleShowMore = () => {
    setVisbileItems(prev => prev + 8)
  }

  const handleSelectProgram = (userId: number, programId: number) => {
  setSelectedPrograms(prev => ({
    ...prev,
    [userId]: programId
  }))
}

const handleAssign = async (userId: number) => {
  const programId = selectedPrograms[userId]

  if (!programId) {
    alert("Выберите программу")
    return
  }

  try {
    const res = await fetch("/api/user-program", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        programId
      })
    })

    if (!res.ok) {
      throw new Error("Ошибка назначения")
    }

    alert("Программа назначена ✅")
  } catch (e) {
    console.error(e)
    alert("Ошибка сервера")
  }
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
      <p className='text-gray-500 my-2'><sup>*</sup>Поиск работает только по фамилии</p>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Поиск пользователя..."
        className="border border-gray-400 px-2 py-1 mt-4 rounded-md"
      />

    <div className='grid gap-2'>
      {processedUsers.slice(0, visibleItems).map(u => {

    const userPrograms = u.program_name
      ? u.program_name.split(',').map(p => p.trim())
      : []

    const availablePrograms = programs.filter(
      programm => !userPrograms.includes(programm.name)
    )

    

    return (
      <div key={u.id} className='border border-gray-300 mt-8 rounded shadow-2xl bg-white py-3 px-6 '>

        <div className='flex justify-between items-center'>
          <div className='flex flex-col '>
            <p className='!text-lg'>{u.last_name} {u.name} {u.patronymic}</p>
            <p className='text-gray-600 mt-2'><strong className='text-zinc-900'>Почта: </strong>{u.email}</p>
            <p className='text-gray-600 mt-2'><strong className='text-zinc-900'>Телефон: </strong>{u.phone ? `+` + u.phone : ""}</p>

            <p className='mt-2'><strong className='text-zinc-900 '>{u.program_name ? `Подключенные программы:` : ""}</strong></p>
            <div className='flex flex-col gap-1 mt-1'>
  {u.program_name?.split(',').map(name => {

    const program = programs.find(p => p.name === name.trim())

    if (!program) return null

    return (
      <Link
        key={program.id}
        href={`/program/${program.id}`}
        className="text-sm text-blue-600 hover:underline"
      >
        {program.name}
      </Link>
    )
  })}
</div>
          </div>

          <form className='flex flex-col '>
            <select
              className='border border-gray-400 rounded p-1 mb-2 max-w-[220px] w-full truncate'
              value={selectedPrograms[u.id] ?? ''}
              onChange={e => handleSelectProgram(u.id, Number(e.target.value))}
            >
              <option value="">-- Выберите программу --</option>

              {availablePrograms.map(programm => (
                <option key={programm.id} value={programm.id}>
                  {programm.name}
                </option>
              ))}

            </select>

            <button
              type="button"
              className='button-more'
              onClick={() => handleAssign(u.id)}
            >
              Добавить программу
            </button>

          </form>
        </div>
      </div>
    )
  })}
</div>

    {visibleItems < processedUsers.length && (
        <button className='button-more mt-10' onClick={handleShowMore}>
          Показать еще
        </button>
      )}

    </section>
  )
}