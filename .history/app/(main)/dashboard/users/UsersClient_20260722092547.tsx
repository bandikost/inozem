"use client"


import { UserRow } from '@/app/interface/user'
import LoadingLink from '@/components/Load/LoadingLink'
import { ProgramRow } from '@/lib/programm'
import { ChevronRight, MoveLeft } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

interface UsersClientProps {
  users: UserRow[]
  programs: ProgramRow[]
}

export default function UsersClient({ users, programs }: UsersClientProps) {

  const [ascending, ] = useState(true)
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
    window.location.reload()
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

  if (!programs) return null

  return (
    <section className="px-6 mb-20 mt-27">
     <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">
      
                <LoadingLink href="/dashboard/manager" className="shrink-0 hover:text-blue transition hover:underline">
                    Главная страница Админки
                </LoadingLink>
            
                <ChevronRight size={14} className="shrink-0" />
            
                <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
                    Пользователи
                </span>
            
            </nav>
      <h1 className="text-3xl  text-prpl">Пользователи</h1>
      <p className='text-gray-500 my-2'><sup>*</sup>Поиск работает только по фамилии</p>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Поиск пользователя..."
        className="border border-gray-400 px-2 py-2 mt-4 rounded-md w-full text-lg"
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

        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center '>
          <ul className='flex flex-col '>
            <li className='!text-lg'>{u.last_name} {u.name} {u.patronymic}</li>
            <li className='text-gray-600 mt-2'><strong className='text-zinc-900'>Почта: </strong>{u.email}</li>
            <li className='text-gray-600 mt-2'><strong className='text-zinc-900'>Телефон: </strong>{u.phone ? `+` + u.phone : ""}</li>
            <li className='text-gray-600 mt-2'><strong className='text-zinc-900'>Образование: </strong>{u.education_level}</li>
            <li className='text-gray-600 mt-2'><strong className='text-zinc-900'>Специальность: </strong>{u.specialization}</li>  
            <li className='mt-2'><strong className='text-zinc-900 '>{u.program_name ? `Подключенные программы:` : ""}</strong></li>

            <div className='flex flex-col gap-1 '>
              {u.program_name?.split(',').map(name => {

                const program = programs.find(p => p.name.trim().toLowerCase() === name.trim().toLowerCase())

                if (!program) return null

                return (
                  <Link key={program.id} href={program ? `/programs/${program.slug}` : "#"} className="text-sm text-blue-600 hover:underline">
                    {program.name}
                  </Link>
                )
              })}
            </div>
          </ul>

          

          <form className='flex flex-col mt-5 sm:mt-0'>
            <select className='border border-gray-400 rounded p-1 mb-2 max-w-[220px] w-full truncate' 
            value={selectedPrograms[u.id] ?? ''} onChange={e => handleSelectProgram(u.id, Number(e.target.value))}>
              <option value="">-- Выберите программу --</option>

              {availablePrograms.map(programm => (
                <option key={programm.id} value={programm.id}>
                  {programm.name} - {programm.time} - {programm.category}
                </option>
              ))}

            </select>

            <button type="button" className='button-more' onClick={() => handleAssign(u.id)}>
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