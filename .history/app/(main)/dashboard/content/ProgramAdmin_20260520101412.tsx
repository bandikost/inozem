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
  type: 'main'
  sources: MainSource[]
}

type FourBlock = BaseBlock & {
  type: 'four'
  sources: FourSource[]
}

type SimpleBlock = BaseBlock & {
  type: 'video' | 'second' | 'third'
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
    async function load() {
      const res = await fetch(`/api/program-structure/${slug}`)
      const json = await res.json()

      setData(json || [])
      setLoading(false)
    }

    if (slug) load()
  }, [slug])

  // ---------------- SAVE ----------------
  async function save() {
    await fetch(`/api/program-structure/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    alert("Сохранено в MySQL")
  }

  // ---------------- SPECIALIZATION ----------------
  function updateSpecialization(index: number, value: string) {
    const copy = [...data]
    copy[index].specialization = value
    setData(copy)
  }

  function addSpecialization() {
    setData([
      ...data,
      {
        specialization: "Новая специализация",
        blocks: [],
      },
    ])
  }

  // ---------------- BLOCKS ----------------
  function addBlock(specIndex: number, type: BlockItem["type"]) {
    const copy = [...data]

    const base = {
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

    copy[specIndex].blocks.push(newBlock)
    setData(copy)
  }

  function removeBlock(specIndex: number, blockIndex: number) {
    const copy = [...data]
    copy[specIndex].blocks.splice(blockIndex, 1)
    setData(copy)
  }

  function updateBlockTitle(
    specIndex: number,
    blockIndex: number,
    value: string
  ) {
    const copy = [...data]
    copy[specIndex].blocks[blockIndex].title = value
    setData(copy)
  }

  // ---------------- HEADLINES ----------------
  function updateHeadline(
    specIndex: number,
    blockIndex: number,
    i: number,
    value: string
  ) {
    const copy = [...data]
    const block = copy[specIndex].blocks[blockIndex]

    if (!block.headlines) block.headlines = []

    block.headlines[i] = value
    setData(copy)
  }

  function addHeadline(specIndex: number, blockIndex: number) {
    const copy = [...data]
    const block = copy[specIndex].blocks[blockIndex]

    if (!block.headlines) block.headlines = []

    block.headlines.push("Новый заголовок")
    setData(copy)
  }

  // ---------------- FOUR SOURCES ----------------
  function addFourSource(specIndex: number, blockIndex: number) {
    const copy = [...data]
    const block = copy[specIndex].blocks[blockIndex]

    if (block.type !== "four") return

    block.sources.push({
      headlines: 0,
      links: [],
    })

    setData(copy)
  }

  function addLink(
    specIndex: number,
    blockIndex: number,
    sourceIndex: number
  ) {
    const copy = [...data]
    const block = copy[specIndex].blocks[blockIndex]

    if (block.type !== "four") return

    block.sources[sourceIndex].links.push({
      name: "",
      href: "",
    })

    setData(copy)
  }

  function updateLink(
    specIndex: number,
    blockIndex: number,
    sourceIndex: number,
    linkIndex: number,
    field: "name" | "href",
    value: string
  ) {
    const copy = [...data]
    const block = copy[specIndex].blocks[blockIndex]

    if (block.type !== "four") return

    block.sources[sourceIndex].links[linkIndex][field] = value
    setData(copy)
  }

  // ---------------- UI ----------------
  if (loading) return <div className="p-10">Загрузка...</div>

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* HEADER */}
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold">
          Админка: {slug}
        </h1>

        <div className="flex gap-3">
          <button
            onClick={addSpecialization}
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Специализация
          </button>

          <button
            onClick={save}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Сохранить
          </button>
        </div>
      </div>

      {/* DATA */}
      {data.map((spec, specIndex) => (
        <div key={specIndex} className="bg-white p-6 mb-6 rounded-xl">

          <input
            className="border p-2 w-full mb-4"
            value={spec.specialization}
            onChange={(e) =>
              updateSpecialization(specIndex, e.target.value)
            }
          />

          {/* BLOCKS */}
          {spec.blocks.map((block, blockIndex) => (
            <div key={blockIndex} className="border p-4 mb-4">

              <input
                className="border p-2 w-full mb-2"
                value={block.title}
                onChange={(e) =>
                  updateBlockTitle(specIndex, blockIndex, e.target.value)
                }
              />

              <button
                onClick={() => removeBlock(specIndex, blockIndex)}
                className="text-red-500 mb-3"
              >
                удалить блок
              </button>

              {/* HEADLINES */}
              {(block.headlines ?? []).map((h, i) => (
                <input
                  key={i}
                  className="border p-2 w-full mb-2"
                  value={h}
                  onChange={(e) =>
                    updateHeadline(specIndex, blockIndex, i, e.target.value)
                  }
                />
              ))}

              <button
                onClick={() => addHeadline(specIndex, blockIndex)}
                className="text-blue-500"
              >
                + headline
              </button>

              {/* FOUR */}
              {block.type === "four" && (
                <div className="mt-4">
                  <button
                    onClick={() => addFourSource(specIndex, blockIndex)}
                    className="bg-black text-white px-3 py-1 rounded"
                  >
                    + source
                  </button>

                  {block.sources.map((s, sIndex) => (
                    <div key={sIndex} className="border p-3 mt-2">

                      {s.links.map((l, lIndex) => (
                        <div key={lIndex} className="flex gap-2 mb-2">

                          <input
                            placeholder="name"
                            value={l.name}
                            onChange={(e) =>
                              updateLink(
                                specIndex,
                                blockIndex,
                                sIndex,
                                lIndex,
                                "name",
                                e.target.value
                              )
                            }
                          />

                          <input
                            placeholder="url"
                            value={l.href}
                            onChange={(e) =>
                              updateLink(
                                specIndex,
                                blockIndex,
                                sIndex,
                                lIndex,
                                "href",
                                e.target.value
                              )
                            }
                          />

                        </div>
                      ))}

                      <button
                        onClick={() =>
                          addLink(specIndex, blockIndex, sIndex)
                        }
                        className="text-blue-600"
                      >
                        + link
                      </button>

                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}

          {/* ADD BLOCKS */}
          <div className="flex gap-2 mt-4">
            <button onClick={() => addBlock(specIndex, "main")}>main</button>
            <button onClick={() => addBlock(specIndex, "four")}>four</button>
            <button onClick={() => addBlock(specIndex, "video")}>video</button>
          </div>

        </div>
      ))}

    </div>
  )
}