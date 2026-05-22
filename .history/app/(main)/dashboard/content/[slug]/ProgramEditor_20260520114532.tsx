'use client'

import { useEffect, useState } from "react"

type Block = {
  type: string
  title: string
  headlines?: string[]
  sources?: any[]
}

interface Props = {
    program: string
}

export default function ProgramEditor({ params, program }: Props) {
  const slug = params.slug

  const [program, setProgram] = useState<any>(null)
  const [blocks, setBlocks] = useState<Block[]>([])
  const [loading, setLoading] = useState(true)

  // 1. load program + structure
  useEffect(() => {
    const load = async () => {
      const programRes = await getProgramBySlug(slug)

      if (!programRes) {
        setLoading(false)
        return
      }

      setProgram(programRes)

      const res = await fetch(
        `/api/admin/program-structure?programId=${programRes.id}`
      )

      const data = await res.json()
      setBlocks(data.blocks || [])

      setLoading(false)
    }

    load()
  }, [slug])

  // add block
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
        programId: program.id,
        blocks,
      }),
    })

    alert("Сохранено")
  }

  if (loading) return <div>Loading...</div>
  if (!program) return <div>Program not found</div>

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
              placeholder="title"
              style={{ width: "100%", marginTop: 5 }}
            />

            <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
              <button onClick={() => removeBlock(i)}>delete</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={save} style={{ marginTop: 20 }}>
        Сохранить
      </button>
    </div>
  )
}
