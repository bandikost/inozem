"use client"
import axios from "axios"
import { useEffect, useState } from "react"


type User = { // Для того, чтобы не возникло ошибок инициализации, вдруг я случайно запущу user.age, а его нет в базе.
    id: number,
    name: string,
}

export default function UserList() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("/api/users")
        .then(res => {
            setUsers(res.data)
            setLoading(false)
    })
}, [])

    if (loading) return <p>Загрузка пользователей...</p>


    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    <p>{user.name}</p>
                  
                </div>
            ))}
            
        </div>
    )
}