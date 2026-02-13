'use client'

import { useState, useEffect } from 'react';

interface Group {
  id: number;
  name: string;
}

interface User {
  group_user_id: number;
  group_name: string;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string | null;
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/groups')
      .then(res => res.json())
      .then(data => setGroups(data));
  }, []);

  useEffect(() => {
    if (!selectedGroupId) return;
    fetch(`/api/groups/${selectedGroupId}/users`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [selectedGroupId]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Группы</h1>

      <select
        className="border p-2 mb-4"
        value={selectedGroupId ?? ''}
        onChange={e => setSelectedGroupId(Number(e.target.value))}
      >
        <option value="">Выберите группу</option>
        {groups.map(group => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>

      {users.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold">Участники:</h2>
          <ul>
            {users.map(u => (
              <li key={u.user_id}>{u.first_name} {u.last_name} ({u.email ?? 'нет email'})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
