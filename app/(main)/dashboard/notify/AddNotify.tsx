"use client"

import { useToast } from "@/components/ui/Toast/ToastProvider"
import { redirect, useRouter } from "next/navigation"
import { useState } from "react"

export default function AddNotify() {
    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const [suptitle, setSuptitle] = useState("")
    const [description, setDescription] = useState("")
    const [adminAnswer, setAdminAnswer] = useState("")
    const [rules, setRules] = useState(false)
    const toast = useToast()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {

            await fetch("/api/notify/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                title,
                suptitle,
                description,
                admin_answer: adminAnswer,
                rules,
            }),
        })

            toast.success("Уведомление успешно создано!")
            router.push("/dashboard/manager")
        }

        
        catch {
            toast.error("Ошибка создания уведомления")
        }
    
    }

    return (
        <div className="my-12 flex flex-col justify-center items-center">

       
        <form onSubmit={handleSubmit} className="w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-zinc-900"> Создание уведомления </h2>

                <p className="mt-1 text-md text-zinc-500">
                    Заполните информацию об уведомлении
                </p>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="mb-2 block text-md font-medium text-zinc-700">
                        Название
                    </label>

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Название уведомления"
                        className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-md text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue focus:ring-2 focus:ring-blue/10"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-md font-medium text-zinc-700">
                        Заголовок
                    </label>

                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Заголовок уведомления"
                        className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-md text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue focus:ring-2 focus:ring-blue/10"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-md font-medium text-zinc-700">
                        Подзаголовок
                    </label>

                    <input
                        value={suptitle}
                        onChange={(e) => setSuptitle(e.target.value)}
                        placeholder="Подзаголовок"
                        className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-md text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue focus:ring-2 focus:ring-blue/10"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 block text-md font-medium text-zinc-700">
                        Описание
                    </label>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Описание уведомления"
                        rows={5}
                        maxLength={10000}
                        className="w-full resize-none rounded-xl border border-zinc-200 px-4 py-3 text-md text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue focus:ring-2 focus:ring-blue/10"
                    />
                    <p className="flex justify-end !text-sm text-gray-400">{description.length} / 10000</p>
                </div>

                <div>
                    <label className="mb-2 block text-md font-medium text-zinc-700">
                        Ответ администратора
                    </label>

                    <textarea
                        value={adminAnswer}
                        onChange={(e) => setAdminAnswer(e.target.value)}
                        placeholder="Ответ администратора"
                        rows={4}
                        className="w-full resize-none rounded-xl border border-zinc-200 px-4 py-3 text-md text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-blue focus:ring-2 focus:ring-blue/10"
                    />
                </div>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 px-4 py-3 transition hover:bg-zinc-50">
                    <input
                        type="checkbox"
                        checked={rules}
                        onChange={(e) => setRules(e.target.checked)}
                        className="h-4 w-4 accent-blue"
                    />

                    <span className="text-md text-zinc-700">
                        Показывать только администраторам
                    </span>
                </label>
            </div>

            <div className="mt-6 flex justify-end">
                <button type="submit" className="rounded-xl bg-blue px-6 py-3 text-md font-medium text-white transition hover:opacity-80 cursor-pointer">
                    Создать уведомление
                </button>
            </div>
        </form>
         </div>
    )
}