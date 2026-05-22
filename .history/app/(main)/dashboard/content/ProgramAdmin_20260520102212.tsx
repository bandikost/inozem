'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

type LinkItem = {
  name: string
  href: string
}

type MainSource = {
  key: string
  headlineIndex: number
}

type FourSource = {
  headlines: number
  links: LinkItem[]
}

type BaseBlock = {
  title: string
  type: string
  headlines?: string[]
}

type MainBlock = BaseBlock & {
  type: "main"
  sources: MainSource[]
}

type FourBlock = BaseBlock & {
  type: "four"
  sources: FourSource[]
}

type SimpleBlock = BaseBlock & {
  type: "video" | "second" | "third"
}

type BlockItem = MainBlock | FourBlock | SimpleBlock

type SpecializationItem = {
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

    async function load() {
      setLoading(true)

      const res = await fetch(`/api/program-structure/${slug}`)
      const json = await res.json()

      if (!json) {
        setData({
          specialization: slug,
          blocks: []
        })
      } else {
        setData(json)
      }

      setLoading(false)
    }

    load()
  }, [slug])

  // ---------------- SAVE ----------------
  async function save() {
    if (!data) return

    await fetch(`/api/program-structure/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    alert("Сохранено")
  }

  // ---------------- UPDATE ----------------
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
      newBlock = {
        ...base,
        type: "main",
        sources: [],
      }
    } else if (type === "four") {
      newBlock = {
        ...base,
        type: "four",
        sources: [],
      }
    } else {
      newBlock = base as BlockItem
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

    if (!blocks[blockIndex].headlines) {
      blocks[blockIndex].headlines = []
    }

    blocks[blockIndex].headlines![i] = value

    setData({ ...data, blocks })
  }

  function addHeadline(blockIndex: number) {
    if (!data) return

    const blocks = [...data.blocks]

    if (!blocks[blockIndex].headlines) {
      blocks[blockIndex].headlines = []
    }

    blocks[blockIndex].headlines!.push("Новый заголовок")

    setData({ ...data, blocks })
  }

  // ---------------- UI ----------------
  if (loading) return <div className="p-10">Загрузка...</div>
  if (!data) return <div className="p-10">Нет данных</div>

  return (
    <div className="p-10">

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

    {/* TITLE */}
    <input
      className="border p-2 w-full mb-2"
      value={block.title}
      onChange={(e) => updateBlockTitle(i, e.target.value)}
    />

    <button onClick={() => removeBlock(i)} className="text-red-500">
      delete block
    </button>

    {/* HEADLINES */}
    <div className="mt-3">
      <div className="font-bold">Headlines</div>

      {(block.headlines ?? []).map((h, j) => (
        <input
          key={j}
          className="border p-2 w-full mt-1"
          value={h}
          onChange={(e) => updateHeadline(i, j, e.target.value)}
        />
      ))}

      <button onClick={() => addHeadline(i)} className="text-blue-600">
        + headline
      </button>
    </div>

    {/* MAIN SOURCES */}
    {block.type === "main" && (
      <div className="mt-4">
        <div className="font-bold">Sources</div>

        {(block.sources ?? []).map((s: any, sIndex: number) => (
          <div key={sIndex} className="border p-2 mt-2">

            <input
              placeholder="key"
              value={s.key}
              onChange={(e) => {
                const copy = [...data.blocks]
                copy[i].sources[sIndex].key = e.target.value
                setData({ ...data, blocks: copy })
              }}
            />

            <input
              placeholder="headlineIndex"
              value={s.headlineIndex}
              onChange={(e) => {
                const copy = [...data.blocks]
                copy[i].sources[sIndex].headlineIndex = Number(e.target.value)
                setData({ ...data, blocks: copy })
              }}
            />

          </div>
        ))}
      </div>
    )}

    {/* FOUR SOURCES */}
    {block.type === "four" && (
      <div className="mt-4">
        <div className="font-bold">Sources</div>

        {(block.sources ?? []).map((s: any, sIndex: number) => (
          <div key={sIndex} className="border p-2 mt-2">

            <div className="font-semibold">Links</div>

            {(s.links ?? []).map((l: any, lIndex: number) => (
              <div key={lIndex} className="flex gap-2 mb-2">

                <input
                  placeholder="name"
                  value={l.name}
                  onChange={(e) => {
                    const copy = [...data.blocks]
                    copy[i].sources[sIndex].links[lIndex].name = e.target.value
                    setData({ ...data, blocks: copy })
                  }}
                />

                <input
                  placeholder="href"
                  value={l.href}
                  onChange={(e) => {
                    const copy = [...data.blocks]
                    copy[i].sources[sIndex].links[lIndex].href = e.target.value
                    setData({ ...data, blocks: copy })
                  }}
                />

              </div>
            ))}

            <button
              onClick={() => {
                const copy = [...data.blocks]
                copy[i].sources[sIndex].links.push({
                  name: "",
                  href: "",
                })
                setData({ ...data, blocks: copy })
              }}
              className="text-blue-600"
            >
              + link
            </button>

          </div>
        ))}

        <button
          onClick={() => {
            const copy = [...data.blocks]
            copy[i].sources.push({
              headlines: 0,
              links: [],
            })
            setData({ ...data, blocks: copy })
          }}
          className="bg-black text-white px-3 py-1 mt-2"
        >
          + source
        </button>
      </div>
    )}
  </div>
))}
    </div>
  )
}