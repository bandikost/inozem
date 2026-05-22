"use client"

import { useEffect, useState } from "react"

type Block = {
  type: string
  title: string
  headlines?: string[]
  sources?: any[]
}

export default function ContentEditor({ params }: any) {
  const programId = params.id

  const [blocks, setBlocks] = useState<Block[]>([])
  const [loading, setLoading] = useState(true)

  // GET
  useEffect(() => {
    fetch(`/api/admin/program-structure?programId=${programId}`)
      .then(res => res.json())
      .then(data => {
        setBlocks(data.blocks || [])
        setLoading(false)
      })
  }, [programId])

  // add block
  const addBlock = (type: string) => {
    const base: any = { type, title: "Новый блок" }

    if (type === "main") base.headlines = []
    if (type === "four") {
      base.headlines = []
      base.sources = []
    }

    setBlocks([...blocks, base])
  }

  // update title
  const updateTitle = (i: number, value: string) => {
    const copy = [...blocks]
    copy[i].title = value
    setBlocks(copy)
  }

  // delete block
  const removeBlock = (i: number) => {
    setBlocks(blocks.filter((_, index) => index !== i))
  }

  // save
  const save = async () => {
    await fetch("/api/admin/program-structure", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        programId,
        blocks
      })
    })

    alert("Сохранено")
  }

  if (loading) return <div>Loading...</div>

  return (
    <div style={{ padding: 20 }}>
      <h1>Редактор структуры #{programId}</h1>

      {/* toolbar */}
      <div style={{ display: "flex", gap: 10 }}>
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
              marginBottom: 10
            }}
          >
            <div>type: {b.type}</div>

            <input
              value={b.title}
              onChange={(e) => updateTitle(i, e.target.value)}
              placeholder="title"
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