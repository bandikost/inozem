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
    setBlocks((prev) => {
      if (type === "title") return [...prev, { type, value: "" }]
      if (type === "text") return [...prev, { type, value: "" }]
      return [...prev, { type, items: [""] }]
    })
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
    await fetch("/api/activity", {
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

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm " +
    "outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"

  return (
    <div className="min-h-screen mt-20 py-10 px-4">
      <div className="mx-auto max-w-3xl space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Создание мероприятия
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Заполни базовую информацию и добавь контент-блоки
          </p>
        </div>

        {/* MAIN FORM */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border space-y-4">

          <input className={inputClass} placeholder="Название" value={name}
            onChange={(e) => setName(e.target.value)} />

          <input className={inputClass} placeholder="Slug" value={slug}
            onChange={(e) => setSlug(e.target.value)} />

          <input className={inputClass} placeholder="Заголовок" value={title}
            onChange={(e) => setTitle(e.target.value)} />

          <input className={inputClass} placeholder="Даты" value={dates}
            onChange={(e) => setDates(e.target.value)} />

        </div>

        {/* BLOCK CONTROLS */}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => addBlock("title")}
            className="px-3 py-1.5 rounded-full border bg-white hover:bg-gray-100 text-sm">
            + Заголовок
          </button>

          <button onClick={() => addBlock("text")}
            className="px-3 py-1.5 rounded-full border bg-white hover:bg-gray-100 text-sm">
            + Текст
          </button>

          <button onClick={() => addBlock("list")}
            className="px-3 py-1.5 rounded-full border bg-white hover:bg-gray-100 text-sm">
            + Список
          </button>
        </div>

        {/* BLOCKS */}
        <div className="space-y-4">
          {blocks.map((block, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-white p-4 shadow-sm space-y-3"
            >

              {/* TITLE BLOCK */}
              {block.type === "title" && (
                <input
                  className={inputClass}
                  placeholder="Заголовок блока"
                  value={block.value}
                  onChange={(e) =>
                    updateBlock(i, { type: "title", value: e.target.value })
                  }
                />
              )}

              {/* TEXT BLOCK */}
              {block.type === "text" && (
                <textarea
                  className={inputClass + " min-h-[120px] resize-none"}
                  placeholder="Текст"
                  value={block.value}
                  onChange={(e) =>
                    updateBlock(i, { type: "text", value: e.target.value })
                  }
                />
              )}

              {/* LIST BLOCK */}
              {block.type === "list" && (
                <div className="space-y-2">
                  {block.items.map((item, idx) => (
                    <input
                      key={idx}
                      className={inputClass}
                      placeholder={`Пункт ${idx + 1}`}
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
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    + добавить пункт
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="rounded-xl bg-black px-6 py-2 text-white text-sm hover:bg-gray-800 transition"
          >
            Создать мероприятие
          </button>
        </div>

      </div>
    </div>
  )
}