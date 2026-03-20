'use client'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { useState } from "react";



export default async function Page() {
    const cookieStore = await cookies()
    const manager = cookieStore.get("manager")
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [dates, setDates] = useState("");
    const [education, setEducation] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/programms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        time: Number(time),
        dates,
        education,
        specialization,
        isFavorite: isFavorite ? 1 : 0,
        description,
        price: Number(price),
      }),
    });

    const data = await res.json();
    console.log("Программа добавлена:", data);


    if (!manager) redirect("/dashboard")

        


    return (
        <section className="flex flex-col items-center mt-30">
        <h1 className="text-prpl">Программы обучения | Админ</h1>
        </section>
    )
}