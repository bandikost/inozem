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

  // 🔹 add block
  const addBlock = (type: string) => {
    const base: Block = {
      type,
      title: "Новый блок",
    }

    if (type === "main" || type === "four") {
      base.headlines = []
      base.sources = []
    }

    setBlocks((prev) => [...prev, base])
  }

  // 🔹 update title
  const updateTitle = (i: number, value: string) => {
    setBlocks((prev) => {
      const copy = [...prev]
      copy[i] = { ...copy[i], title: value }
      return copy
    })
  }

  // 🔹 delete block
  const removeBlock = (i: number) => {
    setBlocks((prev) => prev.filter((_, index) => index !== i))
  }

  // 🔥 HEADLINES LOGIC
  const addHeadline = (blockIndex: number) => {
    setBlocks((prev) => {
      const copy = [...prev]
      const block = { ...copy[blockIndex] }

      if (!block.headlines) block.headlines = []
      block.headlines = [...block.headlines, ""]

      copy[blockIndex] = block
      return copy
    })
  }

  const updateHeadline = (
    blockIndex: number,
    headlineIndex: number,
    value: string
  ) => {
    setBlocks((prev) => {
      const copy = [...prev]
      const block = { ...copy[blockIndex] }

      if (!block.headlines) block.headlines = []

      const headlines = [...block.headlines]
      headlines[headlineIndex] = value

      block.headlines = headlines
      copy[blockIndex] = block

      return copy
    })
  }

  // 🔹 save
  const save = async () => {
  await fetch("/api/admin/program-structure", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ programId, blocks }),
  })

  const res = await fetch(`/api/admin/program-structure?programId=${programId}`)
  const data = await res.json()

  setBlocks(data.blocks)

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

            {/* 🔥 HEADLINES UI */}
            {b.headlines && (
              <div style={{ marginTop: 10 }}>
                <b>Headlines:</b>

                {b.headlines.map((h, hi) => (
                  <input
                    key={hi}
                    value={h}
                    onChange={(e) =>
                      updateHeadline(i, hi, e.target.value)
                    }
                    style={{
                      width: "100%",
                      marginTop: 5,
                      fontSize: 12,
                    }}
                  />
                ))}

                <button
                  style={{ marginTop: 5 }}
                  onClick={() => addHeadline(i)}
                >
                  + headline
                </button>
              </div>
            )}

            <button onClick={() => removeBlock(i)} style={{ marginTop: 10 }}>
              delete
            </button>
          </div>
        ))}
      </div>

      <button onClick={save} style={{ marginTop: 20 }}>
        Сохранить
      </button>
    </div>
  )
}