

export default async function AccredResult() {




  return (
    <div className="max-w-4xl mx-auto my-10">
        <select className="border border-gray-300 rounded-md p-1">
          <option>Выберите год</option>
          {accred.map(a => 
            <option key={a.id}>{a.year}</option>
          )}
        </select>

    </div>
  )
}
