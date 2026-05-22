"use client"

import { useEffect, useState } from "react"

type Block =
  | { type: "video"; title: string }
  | { type: "main"; title: string; headlines: string[] }
  | { type: "second"; title: string }
  | { type: "third"; title: string }
  | { type: "four"; title: string; headlines?: string[]; sources?: any[] }

export default function StructurePage({ params }: any) {
  const programId = params.id

  const [blocks, setBlocks] = useState<Block[]>([])
  const [loading, setLoading] = useState(true)

  // 1. загрузка
  useEffect(() => {
    fetch(`/api/admin/program-structure?programId=${programId}`)
      .then(r => r.json())
      .then(data => {
        setBlocks(data.blocks || [])
        setLoading(false)
      })
  }, [programId])

  // 2. добавить блок
  const addBlock = (type: Block["type"]) => {
    const newBlock: any = {
      type,
      title: "Новый блок",
    }

    if (type === "main") newBlock.headlines = []
    if (type === "four") {
      newBlock.headlines = []
      newBlock.sources = []
    }

    setBlocks([...blocks, newBlock])
  }

  // 3. изменение title
  const updateTitle = (index: number, value: string) => {
    const copy = [...blocks]
    copy[index].title = value
    setBlocks(copy)
  }

  // 4. сохранить
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
      <h1>Структура программы #{programId}</h1>

      {/* КНОПКИ ДОБАВЛЕНИЯ */}
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => addBlock("video")}>Video</button>
        <button onClick={() => addBlock("main")}>Main</button>
        <button onClick={() => addBlock("second")}>Second</button>
        <button onClick={() => addBlock("third")}>Third</button>
        <button onClick={() => addBlock("four")}>Four</button>
      </div>

      {/* СПИСОК БЛОКОВ */}
      <div style={{ marginTop: 20 }}>
        {blocks.map((block, i) => (
          <div key={i} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
            <div>Тип: {block.type}</div>

            <input
              value={block.title}
              onChange={(e) => updateTitle(i, e.target.value)}
              placeholder="title"
            />
          </div>
        ))}
      </div>

      <button onClick={save} style={{ marginTop: 20 }}>
        Сохранить
      </button>
    </div>
  )
}