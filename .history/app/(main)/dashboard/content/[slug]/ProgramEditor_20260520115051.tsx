"use client"

import { useEffect, useState } from "react"

type Block = {
  type: string
  title: string
  headlines?: string[]
  sources?: any[]
}

interface Props {
  program: any
}

export default function ProgramEditor({ program }: Props) {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [loading, setLoading] = useState(true)

  // 🔴 защита от undefined
  const programId = program?.id

  useEffect(() => {
    if (!programId) return

    const load = async () => {
      const res = await fetch(
        `/api/admin/program-structure?programId=${programId}`
      )

      const data = await res.json()

      setBlocks(Array.isArray(data.blocks) ? data.blocks : [])
      setLoading(false)
    }

    load()
  }, [programId])

  const addBlock = (type: string) => {
    const base: any = {
      type,
      title: "Новый блок",
    }

    if (type === "main") base.headlines = []
    if (type === "four") {
      base.headlines = []
      base.sources = []
    }

    setBlocks((prev) => [...prev, base])
  }

  const updateTitle = (i: number, value: string) => {
    setBlocks((prev) => {
      const copy = [...prev]
      copy[i].title = value
      return copy
    })
  }

  const removeBlock = (i: number) => {
    setBlocks((prev) => prev.filter((_, index) => index !== i))
  }

  const save = async () => {
    await fetch("/api/admin/program-structure", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        programId,
        blocks,
      }),
    })

    alert("Сохранено")
  }

  if (!programId) return <div>Invalid program</div>
  if (loading) return <div>Loading...</div>

  return (
    <div style={{ padding: 20 }}>
      <h1>Редактор: {program.name}</h1>
      <p style={{ opacity: 0.6 }}>{program.slug}</p>

      {/* toolbar */}
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button onClick={() => addBlock("video")}>video</button>
        <button onClick={() => addBlock("main")}>main</button>
        <button onClick={() => addBlock("second")}>second</button>
        <button onClick={() => addBlock("third")}>third</button>
        <button onClick={() => addBlock("four")}>four</button>
      </div>

      {/* blocks */}
      <div style={{ marginTop: 20 }}>
        {blocks.map((b, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              type: {b.type}
            </div>

            <input
              value={b.title}
              onChange={(e) => updateTitle(i, e.target.value)}
              style={{ width: "100%", marginTop: 5 }}
            />

            <button onClick={() => removeBlock(i)}>delete</button>
          </div>
        ))}
      </div>

      <button onClick={save} style={{ marginTop: 20 }}>
        Сохранить
      </button>
    </div>
  )
}