'use client'

import { useEffect, useState } from "react"

type LinkItem = {
  name: string
  href: string
}

type FourSource = {
  headlines: number
  links: LinkItem[]
}

type BlockItem = {
  title: string
  type: string
  headlines?: string[]
  sources?: any[]
}

type SpecializationItem = {
  specialization: string
  blocks: BlockItem[]
}

export default function ProgramAdminPage({ params }: any) {
  const slug = params.slug

  const [data, setData] = useState<SpecializationItem | null>(null)
  const [loading, setLoading] = useState(true)

  // ---------------- LOAD FROM API ----------------
  useEffect(() => {
    async function load() {
      setLoading(true)

      const res = await fetch(`/api/program-structure/${slug}`)
      const json = await res.json()

      // если пусто — дефолтная структура
      if (!json || json.length === 0) {
        setData({
          specialization: slug,
          blocks: [],
        })
      } else {
        setData(json)
      }

      setLoading(false)
    }

    load()
  }, [slug])

  // ---------------- SAVE TO API ----------------
  async function save() {
    await fetch(`/api/program-structure/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    alert("Сохранено в MySQL")
  }

  // ---------------- UPDATE ----------------
  function updateSpecialization(value: string) {
    if (!data) return
    setData({ ...data, specialization: value })
  }

  function addBlock() {
    if (!data) return

    setData({
      ...data,
      blocks: [
        ...data.blocks,
        {
          title: "Новый блок",
          type: "main",
          headlines: [],
          sources: []
        }
      ]
    })
  }

  function updateBlockTitle(index: number, value: string) {
    if (!data) return

    const blocks = [...data.blocks]
    blocks[index].title = value

    setData({ ...data, blocks })
  }

  // ---------------- UI ----------------
  if (loading) return <div className="p-10">Загрузка...</div>
  if (!data) return <div className="p-10">Нет данных</div>

  return (
    <div className="p-10">

      <div className="flex gap-4 mb-6">
        <button
          onClick={addBlock}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Block
        </button>

        <button
          onClick={save}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save to DB
        </button>
      </div>

      <input
        className="border p-2 mb-6 w-full"
        value={data.specialization}
        onChange={(e) => updateSpecialization(e.target.value)}
      />

      {data.blocks.map((block, i) => (
        <div key={i} className="border p-4 mb-4">

          <input
            className="border p-2 w-full"
            value={block.title}
            onChange={(e) => updateBlockTitle(i, e.target.value)}
          />

          <p className="text-sm text-gray-500">
            type: {block.type}
          </p>

        </div>
      ))}

    </div>
  )
}