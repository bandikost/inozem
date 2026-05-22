'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

/* ---------------- TYPES ---------------- */

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
  type: "main" | "four" | "video" | "second" | "third"
  headlines: string[]
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

/* ---------------- SAFE HELPERS ---------------- */

function isMain(block: BlockItem): block is MainBlock {
  return block.type === "main"
}

function isFour(block: BlockItem): block is FourBlock {
  return block.type === "four"
}

/* ---------------- COMPONENT ---------------- */

export default function ProgramAdminPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [data, setData] = useState<SpecializationItem | null>(null)
  const [loading, setLoading] = useState(true)

  /* ---------------- LOAD ---------------- */

  useEffect(() => {
    if (!slug) return

    async function load() {
      setLoading(true)

      const res = await fetch(`/api/program-structure/${slug}`)
      const json = await res.json()

      setData(
        json?.specialization
          ? json
          : {
              specialization: slug,
              blocks: []
            }
      )

      setLoading(false)
    }

    load()
  }, [slug])

  /* ---------------- SAVE ---------------- */

  async function save() {
    if (!data) return

    await fetch(`/api/program-structure/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    alert("Сохранено")
  }

  /* ---------------- UPDATE SPECIALIZATION ---------------- */

  function updateSpecialization(value: string) {
    if (!data) return
    setData({ ...data, specialization: value })
  }

  /* ---------------- BLOCKS ---------------- */

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
      newBlock = base as SimpleBlock
    }

    setData({
      ...data,
      blocks: [...data.blocks, newBlock],
    })
  }

  function updateBlockTitle(index: number, value: string) {
    if (!data) return

    const blocks = [...data.blocks]
    blocks[index] = { ...blocks[index], title: value }

    setData({ ...data, blocks })
  }

  function removeBlock(index: number) {
    if (!data) return

    const blocks = [...data.blocks]
    blocks.splice(index, 1)

    setData({ ...data, blocks })
  }

  /* ---------------- HEADLINES ---------------- */

  function updateHeadline(blockIndex: number, i: number, value: string) {
    if (!data) return

    const blocks = [...data.blocks]
    const block = blocks[blockIndex]

    const headlines = [...(block.headlines ?? [])]
    headlines[i] = value

    blocks[blockIndex] = { ...block, headlines }

    setData({ ...data, blocks })
  }

  function addHeadline(blockIndex: number) {
    if (!data) return

    const blocks = [...data.blocks]
    const block = blocks[blockIndex]

    const headlines = [...(block.headlines ?? [])]
    headlines.push("Новый заголовок")

    blocks[blockIndex] = { ...block, headlines }

    setData({ ...data, blocks })
  }

  /* ---------------- FOUR HELPERS ---------------- */

  function updateFourSourceKey(bi: number, si: number, value: string) {
    if (!data) return
    if (!isFour(data.blocks[bi])) return

    const blocks = [...data.blocks]
    const block = blocks[bi]

    const sources = [...block.sources]
    sources[si] = { ...sources[si], headlines: sources[si].headlines }

    setData({
      ...data,
      blocks: blocks.map((b, i) =>
        i === bi ? { ...block, sources } : b
      ),
    })
  }

  function updateLink(
    bi: number,
    si: number,
    li: number,
    field: "name" | "href",
    value: string
  ) {
    if (!data) return
    if (!isFour(data.blocks[bi])) return

    const blocks = [...data.blocks]
    const block = blocks[bi]

    const sources = [...block.sources]
    const links = [...sources[si].links]

    links[li] = { ...links[li], [field]: value }
    sources[si] = { ...sources[si], links }

    blocks[bi] = { ...block, sources }

    setData({ ...data, blocks })
  }

  function addSource(bi: number) {
    if (!data) return
    if (!isFour(data.blocks[bi])) return

    const blocks = [...data.blocks]
    const block = blocks[bi]

    const sources = [
      ...block.sources,
      { headlines: 0, links: [] },
    ]

    blocks[bi] = { ...block, sources }

    setData({ ...data, blocks })
  }

  function addLink(bi: number, si: number) {
    if (!data) return
    if (!isFour(data.blocks[bi])) return

    const blocks = [...data.blocks]
    const block = blocks[bi]

    const sources = [...block.sources]
    const links = [...sources[si].links]

    links.push({ name: "", href: "" })

    sources[si] = { ...sources[si], links }
    blocks[bi] = { ...block, sources }

    setData({ ...data, blocks })
  }

  /* ---------------- UI ---------------- */

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

          <input
            className="border p-2 w-full mb-2"
            value={block.title}
            onChange={(e) => updateBlockTitle(i, e.target.value)}
          />

          <button onClick={() => removeBlock(i)} className="text-red-500">
            delete
          </button>

          {/* HEADLINES */}
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

          {/* FOUR */}
          {isFour(block) && (
            <div className="mt-4">

              <button onClick={() => addSource(i)}>
                + source
              </button>

              {block.sources.map((s, si) => (
                <div key={si} className="border p-2 mt-2">

                  <button onClick={() => addLink(i, si)}>
                    + link
                  </button>

                  {s.links.map((l, li) => (
                    <div key={li} className="flex gap-2 mt-2">

                      <input
                        value={l.name}
                        onChange={(e) =>
                          updateLink(i, si, li, "name", e.target.value)
                        }
                      />

                      <input
                        value={l.href}
                        onChange={(e) =>
                          updateLink(i, si, li, "href", e.target.value)
                        }
                      />

                    </div>
                  ))}

                </div>
              ))}
            </div>
          )}

        </div>
      ))}
    </div>
  )
}