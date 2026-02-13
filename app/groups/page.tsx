'use client'

import { useEffect, useState } from 'react'

interface Program {
  id: number
  name: string
}

interface Group {
  id: number
  name: string
}

interface User {
  group_user_id: number
  group_name: string
  user_id: number
  first_name: string
  last_name: string
  email: string | null
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(null)
  const [groups, setGroups] = useState<Group[]>([])
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('/api/programs')
      .then(res => res.json())
      .then(data => setPrograms(data))
  }, [])

  useEffect(() => {
    if (!selectedProgramId) {
      setGroups([])
      setSelectedGroupId(null)
      return
    }
    fetch(`/api/programs/${selectedProgramId}/groups`)
      .then(res => res.json())
      .then(data => setGroups(data))
  }, [selectedProgramId])

  useEffect(() => {
    if (!selectedGroupId) {
      setUsers([])
      return
    }
    fetch(`/api/groups/${selectedGroupId}/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [selectedGroupId])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Программы и группы</h1>

      <div className="mb-4">
        <label className="block mb-1">Выберите программу:</label>
        <select
          className="border p-2 w-full"
          value={selectedProgramId ?? ''}
          onChange={e => setSelectedProgramId(Number(e.target.value))}
        >
          <option value="">-- выберите программу --</option>
          {programs.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {groups.length > 0 && (
        <div className="mb-4">
          <label className="block mb-1">Выберите группу:</label>
          <select
            className="border p-2 w-full"
            value={selectedGroupId ?? ''}
            onChange={e => setSelectedGroupId(Number(e.target.value))}
          >
            <option value="">-- выберите группу --</option>
            {groups.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>
      )}

      {users.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Участники:</h2>
          <ul>
            {users.map(u => (
              <li key={u.user_id}>{u.first_name} {u.last_name} ({u.email ?? 'нет email'})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
