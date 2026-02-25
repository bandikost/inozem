

export default function AccredResult({ specialties }: { specialties: string[] }) {

    return (
         <div className="grid grid-cols-2 gap-6 mt-10">
            <select name="education_level" required className="border border-zinc-400 p-2 rounded text-zinc-700 ">
              <option value="">-- выберите образование --</option>
              <option value="Среднее">Среднее</option>
              <option value="Высшее">Высшее</option>
              <option value="без образования">Без мед.образования</option>
          </select>

          <select name="education_level" required className="border border-zinc-400 p-2 rounded text-zinc-700 ">
              <option value="">-- выберите образование --</option>
              <option value="Среднее">Среднее</option>
              <option value="Высшее">Высшее</option>
              <option value="без образования">Без мед.образования</option>
          </select>
          </div>
    )
}