'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function ProgramAdminPage() {
  const { slug } = useParams()

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/program/${slug}`)
      .then(r => r.json())
      .then(setData)
  }, [slug])

  async function save() {
    await fetch(`/api/program-structure/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    alert("saved")
  }

  if (!data) return <div>loading...</div>

  return (
    <div className="p-6">

      <button onClick={save}>SAVE</button>

      {data.blocks.map((b: any, i: number) => (
        <div key={i} className="border p-4 mt-4">

          <input
            value={b.title}
            onChange={(e) => {
              const copy = { ...data }
              copy.blocks[i].title = e.target.value
              setData(copy)
            }}
          />

          <div>
            {b.headlines?.map((h: any, j: number) => (
              <input
                key={j}
                value={h.text || h}
                onChange={(e) => {
                  const copy = { ...data }
                  copy.blocks[i].headlines[j] = e.target.value
                  setData(copy)
                }}
              />
            ))}
          </div>

        </div>
      ))}

    </div>
  )
}