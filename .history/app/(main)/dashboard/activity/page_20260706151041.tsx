'use client'

import { useState } from "react"

type Block =
  | { type: "title"; value: string }
  | { type: "text"; value: string }
  | { type: "list"; items: string[] }

export default function CreateActivityPage() {
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [title, setTitle] = useState("")
  const [dates, setDates] = useState("")

  const [blocks, setBlocks] = useState<Block[]>([])

  function addBlock(type: Block["type"]) {
    if (type === "title") {
      setBlocks([...blocks, { type: "title", value: "" }])
    }

    if (type === "text") {
      setBlocks([...blocks, { type: "text", value: "" }])
    }

    if (type === "list") {
      setBlocks([...blocks, { type: "list", items: [""] }])
    }
  }

  function updateBlock(index: number, newBlock: Block) {
    const copy = [...blocks]
    copy[index] = newBlock
    setBlocks(copy)
  }

  function addListItem(blockIndex: number) {
    const copy = [...blocks] as any
    copy[blockIndex].items.push("")
    setBlocks(copy)
  }

  async function handleSubmit() {
    await fetch("/api/activities/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        slug,
        title,
        dates,
        content: blocks
      })
    })

    alert("Создано")
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">Создание мероприятия</h1>

      {/* базовые поля */}
      <div className="space-y-3 mb-6">
        <input
          className="border p-2 w-full"
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Даты"
          value={dates}
          onChange={(e) => setDates(e.target.value)}
        />
      </div>

      {/* кнопки добавления блоков */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => addBlock("title")} className="px-3 py-1 border">
          + Заголовок
        </button>

        <button onClick={() => addBlock("text")} className="px-3 py-1 border">
          + Текст
        </button>

        <button onClick={() => addBlock("list")} className="px-3 py-1 border">
          + Список
        </button>
      </div>

      {/* блоки */}
      <div className="space-y-4">
        {blocks.map((block, i) => (
          <div key={i} className="border p-3 rounded">

            {block.type === "title" && (
              <input
                className="border p-2 w-full"
                placeholder="Заголовок"
                value={block.value}
                onChange={(e) =>
                  updateBlock(i, { type: "title", value: e.target.value })
                }
              />
            )}

            {block.type === "text" && (
              <textarea
                className="border p-2 w-full"
                placeholder="Текст"
                value={block.value}
                onChange={(e) =>
                  updateBlock(i, { type: "text", value: e.target.value })
                }
              />
            )}

            {block.type === "list" && (
              <div>
                {block.items.map((item, idx) => (
                  <input
                    key={idx}
                    className="border p-2 w-full mb-2"
                    placeholder="Пункт"
                    value={item}
                    onChange={(e) => {
                      const copy = [...blocks] as any
                      copy[i].items[idx] = e.target.value
                      setBlocks(copy)
                    }}
                  />
                ))}

                <button
                  onClick={() => addListItem(i)}
                  className="text-sm text-blue-500"
                >
                  + добавить пункт
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* submit */}
      <button
        onClick={handleSubmit}
        className="mt-6 bg-black text-white px-4 py-2 rounded"
      >
        Создать мероприятие
      </button>
    </div>
  )
}