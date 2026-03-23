'use client'
import { useState } from "react";



export default function AddProgramForm() {
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [dates, setDates] = useState("");
    const [education, setEducation] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [slug, setSlug] = useState("");

const handleSubmit = async (e: React.FormEvent) => {

  const res = await fetch("/api/postPrograms", {
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
      slug,
    }),
  })

res.json()

};
        


    return (
        <section className="flex flex-col items-center mt-30">

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md border border-gray-400 p-4 rounded min-w-[630px]">
      <input placeholder="Название" required value={name} onChange={e => setName(e.target.value)} className="!text-xl border border-gray-400 p-2 rounded mt-2" />
      <input placeholder="Время (акад. часы)" value={time} onChange={e => setTime(e.target.value)} className="!text-xl border border-gray-400 p-2 rounded " />
      <input placeholder="Даты" value={dates} onChange={e => setDates(e.target.value)} className="!text-xl border border-gray-400 p-2 rounded " />
      <input placeholder="Образование" value={education} onChange={e => setEducation(e.target.value)} className="!text-xl border border-gray-400 p-2 rounded " />
      <input placeholder="Специальность" value={specialization} onChange={e => setSpecialization(e.target.value)} className="!text-xl border border-gray-400 p-2 rounded " />
      <label className="flex items-center gap-2 !text-xl">
        <input type="checkbox" checked={isFavorite} onChange={e => setIsFavorite(e.target.checked)}  />
        В избранное
      </label>
      <textarea placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} className="!text-xl border border-gray-400 p-2 rounded " />
      <input placeholder="Цена" value={price} onChange={e => setPrice(e.target.value)} className="!text-xl border border-gray-400 p-2 rounded " />
      <input placeholder="Slug для URL" required value={slug} onChange={e => setSlug(e.target.value)} className="!text-xl border border-gray-400 p-2 rounded " />
      <button disabled={loading} type="submit" className="button-more mt-4 w-full"> {loading ? "Добавить программу..." : "Добавить программу"}</button>
      
    </form>
        </section>
    )
}