'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export type LinkItem = {
  name: string
  href: string
}

export type MainSource = {
  key: string
  headlineIndex: number
}

export type FourSource = {
  headlines: number
  links: LinkItem[]
}

export type BlockType = "main" | "four" | "video" | "second" | "third"

export type BaseBlock = {
  title: string
  type: BlockType
  headlines: string[]
}

export type MainBlock = BaseBlock & {
  type: "main"
  sources: MainSource[]
}

export type FourBlock = BaseBlock & {
  type: "four"
  sources: FourSource[]
}

export type SimpleBlock = BaseBlock & {
  type: "video" | "second" | "third"
  sources?: never
}

export type BlockItem = MainBlock | FourBlock | SimpleBlock

export type SpecializationItem = {
  specialization: string
  blocks: BlockItem[]
}

export default function ProgramAdminPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [data, setData] = useState<SpecializationItem | null>(null)
  const [loading, setLoading] = useState(true)

  // ---------------- LOAD ----------------
  useEffect(() => {
    if (!slug) return

    ;(async () => {
      setLoading(true)

      const res = await fetch(`/api/program-structure/${slug}`)
      const json = await res.json()

      setData(
        json?.specialization
          ? json
          : {
              specialization: slug,
              blocks: [],
            }
      )

      setLoading(false)
    })()
  }, [slug])

  // ---------------- SAVE ----------------
  async function save() {
    if (!data) return

    await fetch(`/api/program-structure/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    alert("Сохранено")
  }

  // ---------------- SPECIALIZATION ----------------
  function updateSpecialization(value: string) {
    if (!data) return
    setData({ ...data, specialization: value })
  }

  // ---------------- BLOCKS ----------------
  function addBlock(type: BlockItem["type"]) {
    if (!data) return

    const base: BaseBlock = {
      title: "Новый блок",
      type,
      headlines: [],
    }

    let newBlock: BlockItem

    if (type === "main") {
      newBlock = { ...base, type: "main", sources: [] }
    } else if (type === "four") {
      newBlock = { ...base, type: "four", sources: [] }
    } else {
      newBlock = base as SimpleBlock
    }

    setData({
      ...data,
      blocks: [...data.blocks, newBlock],
    })
  }

  function updateBlockTitle(index: number, value: string) {
    if (!data) return

    const blocks = [...data.blocks]
    blocks[index].title = value

    setData({ ...data, blocks })
  }

  function removeBlock(index: number) {
    if (!data) return

    const blocks = [...data.blocks]
    blocks.splice(index, 1)

    setData({ ...data, blocks })
  }

  // ---------------- HEADLINES ----------------
  function updateHeadline(blockIndex: number, i: number, value: string) {
    if (!data) return

    const blocks = [...data.blocks]
    const b = blocks[blockIndex]

    if (!b.headlines) b.headlines = []
    b.headlines[i] = value

    setData({ ...data, blocks })
  }

  function addHeadline(blockIndex: number) {
    if (!data) return

    const blocks = [...data.blocks]
    const b = blocks[blockIndex]

    if (!b.headlines) b.headlines = []
    b.headlines.push("Новый заголовок")

    setData({ ...data, blocks })
  }

  // ---------------- SAFE TYPE GUARDS ----------------
  const isMain = (b: BlockItem): b is MainBlock => b.type === "main"
  const isFour = (b: BlockItem): b is FourBlock => b.type === "four"

  // ---------------- UI ----------------
  if (loading) return <div className="p-10">Загрузка...</div>
  if (!data) return <div className="p-10">Нет данных</div>

  return (
    <div className="p-10 mt-27">

      <div className="flex gap-4 mb-6">
        <button onClick={() => addBlock("main")}>main</button>
        <button onClick={() => addBlock("four")}>four</button>
        <button onClick={() => addBlock("video")}>video</button>

        <button onClick={save} className="bg-green-600 text-white px-4 py-2">
          Save
        </button>
      </div>

      <input
        className="border p-2 w-full mb-6"
        value={data.specialization}
        onChange={(e) => updateSpecialization(e.target.value)}
      />

      {data.blocks.map((block, i) => (
        <div key={i} className="border p-4 mb-4">

          <input
            className="border p-2 w-full mb-2"
            value={block.title}
            onChange={(e) => updateBlockTitle(i, e.target.value)}
          />

          <button onClick={() => removeBlock(i)}>delete</button>

          {/* HEADLINES */}
          {(block.headlines ?? []).map((h, j) => (
            <input
              key={j}
              className="border p-2 w-full mt-2"
              value={h}
              onChange={(e) => updateHeadline(i, j, e.target.value)}
            />
          ))}

          <button onClick={() => addHeadline(i)} className="text-blue-600">
            + headline
          </button>

          {/* MAIN */}
          {isMain(block) && (
            <div className="mt-3">
              MAIN SOURCES: {block.sources.length}
            </div>
          )}

          {/* FOUR */}
          {isFour(block) && (
            <div className="mt-3">
              FOUR SOURCES: {block.sources.length}
            </div>
          )}

        </div>
      ))}
    </div>
  )
}