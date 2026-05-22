'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { BlockItem, SpecializationItem } from "@/lib/programs/structure"


export default function ProgramAdminPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [data, setData] = useState<SpecializationItem | null>(null)
  const [loading, setLoading] = useState(true)

  // LOAD
  useEffect(() => {
    if (!slug) return

    ;(async () => {
      setLoading(true)

      const res = await fetch(`/api/program-structure/${slug}`)
      const json = await res.json()

      setData(
        json ?? {
          specialization: slug,
          blocks: [],
        }
      )

      setLoading(false)
    })()
  }, [slug])

  // SAVE
  async function save() {
    if (!data) return

    await fetch(`/api/program-structure/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    alert("Saved")
  }

  // SPECIALIZATION
  function updateSpecialization(value: string) {
    setData(prev =>
      prev ? { ...prev, specialization: value } : prev
    )
  }

  // ADD BLOCK
  function addBlock(type: BlockItem["type"]) {
    setData(prev => {
      if (!prev) return prev

      const base = {
        title: "Новый блок",
        type,
        headlines: [],
      }

      const newBlock: BlockItem =
        type === "main"
          ? { ...base, type: "main", sources: [] }
          : type === "four"
          ? { ...base, type: "four", sources: [] }
          : (base as BlockItem)

      return {
        ...prev,
        blocks: [...prev.blocks, newBlock],
      }
    })
  }

  // UPDATE TITLE
  function updateBlockTitle(index: number, value: string) {
    setData(prev => {
      if (!prev) return prev

      return {
        ...prev,
        blocks: prev.blocks.map((b, i) =>
          i === index ? { ...b, title: value } : b
        ),
      }
    })
  }

  // REMOVE BLOCK
  function removeBlock(index: number) {
    setData(prev => {
      if (!prev) return prev

      return {
        ...prev,
        blocks: prev.blocks.filter((_, i) => i !== index),
      }
    })
  }

  // HEADLINE UPDATE
  function updateHeadline(blockIndex: number, i: number, value: string) {
    setData(prev => {
      if (!prev) return prev

      const blocks = [...prev.blocks]
      const block = { ...blocks[blockIndex] }

      block.headlines = [...(block.headlines ?? [])]
      block.headlines[i] = value

      blocks[blockIndex] = block

      return { ...prev, blocks }
    })
  }

  function addHeadline(blockIndex: number) {
    setData(prev => {
      if (!prev) return prev

      const blocks = [...prev.blocks]
      const block = { ...blocks[blockIndex] }

      block.headlines = [...(block.headlines ?? []), "Новый заголовок"]

      blocks[blockIndex] = block

      return { ...prev, blocks }
    })
  }

  if (loading) return <div className="p-10">Loading...</div>
  if (!data) return <div className="p-10">No data</div>

  return (
    <div className="p-10 mt-20">

      <div className="flex gap-2 mb-4">
        <button onClick={() => addBlock("main")}>main</button>
        <button onClick={() => addBlock("four")}>four</button>
        <button onClick={() => addBlock("video")}>video</button>

        <button onClick={save} className="bg-green-600 text-white px-3">
          save
        </button>
      </div>

      <input
        className="border p-2 w-full mb-4"
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

          <button onClick={() => removeBlock(i)}>
            delete
          </button>

          {(block.headlines ?? []).map((h, j) => (
            <input
              key={j}
              className="border p-2 w-full mt-2"
              value={h}
              onChange={(e) => updateHeadline(i, j, e.target.value)}
            />
          ))}

          <button onClick={() => addHeadline(i)}>
            + headline
          </button>

          {block.type === "main" && (
            <div className="mt-2">
              MAIN SOURCES: {block.sources.length}
            </div>
          )}

          {block.type === "four" && (
            <div className="mt-2">
              FOUR SOURCES: {block.sources.length}
            </div>
          )}

        </div>
      ))}
    </div>
  )
}