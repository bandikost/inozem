import { getAccred } from "@/lib/accred"


export default async function AccredResult() {

  const accred = await getAccred()


  return (
    <div className="max-w-4xl mx-auto my-10">
        <select className="border border-gray-300 rounded-md p-1">
          <option>Выберите год</option>

        </select>

    </div>
  )
}
