'use client'
import { useState } from "react";



export default async function Page() {
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

  }
        


    return (
        <section className="flex flex-col items-center mt-30">
        <h1 className="text-prpl">Программы обучения | Админ</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
      <input placeholder="Название" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Время (акад. часы)" value={time} onChange={e => setTime(e.target.value)} />
      <input placeholder="Даты" value={dates} onChange={e => setDates(e.target.value)} />
      <input placeholder="Образование" value={education} onChange={e => setEducation(e.target.value)} />
      <input placeholder="Специальность" value={specialization} onChange={e => setSpecialization(e.target.value)} />
      <label>
        <input type="checkbox" checked={isFavorite} onChange={e => setIsFavorite(e.target.checked)} />
        В избранное
      </label>
      <textarea placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} />
      <input placeholder="Цена" value={price} onChange={e => setPrice(e.target.value)} />

      <button type="submit" className="button-more mt-4">Добавить программу</button>
    </form>
        </section>
    )
}