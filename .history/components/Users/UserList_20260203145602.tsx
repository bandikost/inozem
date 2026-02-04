"use client"
import axios from "axios"
import { useEffect, useState } from "react"


type User = { // Для того, чтобы не возникло ошибок инициализации, вдруг я случайно запущу user.age, а его нет в базе.
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: number
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
        <section className="flex">
            {users.map(user => (
                <div key={user.id}>
                    <p>{user.first_name} {user.last_name}</p>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                </div>
            ))}
            
        </section>
    )
}