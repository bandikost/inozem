'use client'

import { putPrograms } from "@/lib/programm";
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await putPrograms({
            name,
            time: Number(time),
            dates,
            education,
            specialization,
            isFavorite: isFavorite ? 1 : 0,
            description,
            price: Number(price)
        });

        console.log("Добавлено:", result);

        // сброс формы
        setName("");
        setTime("");
        setDates("");
        setEducation("");
        setSpecialization("");
        setIsFavorite(false);
        setDescription("");
        setPrice("");
    };

    return (
        <section className="flex flex-col items-center mt-30">
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