'use client'

import { useEffect, useState } from "react"

// ---------------- TYPES ----------------

type LinkItem = {
  name: string
  href: string
}

type Source = {
  headlines: number
  links: LinkItem[]
}

type Block = {
  title: string
  type: string
  headlines: string[]
  sources: Source[]
}

type Spec = {
  specialization: string
  blocks: Block[]
}

// ---------------- COMPONENT ----------------

export default function AdminPage() {

  const [data, setData] = useState<Spec[]>([])
  const [loading, setLoading] = useState(true)

  // ---------------- LOAD FROM API ----------------

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/programs')
      const json = await res.json()
      setData(json || [])
      setLoading(false)
    }

    load()
  }, [])

  // ---------------- AUTO SYNC (REAL TIME) ----------------

  useEffect(() => {
    if (loading) return

    const timeout = setTimeout(() => {
      fetch('/api/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    }, 500)

    return () => clearTimeout(timeout)
  }, [data, loading])

  // ---------------- ACTIONS ----------------

  function updateSpec(i: number, value: string) {
    const copy = [...data]
    copy[i].specialization = value
    setData(copy)
  }

  function addSpec() {
    setData([
      ...data,
      { specialization: 'Новая', blocks: [] }
    ])
  }

  function addBlock(specIndex: number) {
    const copy = [...data]

    copy[specIndex].blocks.push({
      title: 'Новый блок',
      type: 'four',
      headlines: [],
      sources: [],
    })

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

  function addHeadline(specIndex: number, blockIndex: number) {
    const copy = [...data]
    const block = copy[specIndex].blocks[blockIndex]

    block.headlines.push('Новый headline')
    setData(copy)
  }

  function updateHeadline(
    specIndex: number,
    blockIndex: number,
    hIndex: number,
    value: string
  ) {
    const copy = [...data]
    copy[specIndex].blocks[blockIndex].headlines[hIndex] = value
    setData(copy)
  }

  function addSource(specIndex: number, blockIndex: number) {
    const copy = [...data]

    copy[specIndex].blocks[blockIndex].sources.push({
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

    copy[specIndex]
      .blocks[blockIndex]
      .sources[sourceIndex]
      .links.push({ name: '', href: '' })

    setData(copy)
  }

  function updateLink(
    specIndex: number,
    blockIndex: number,
    sourceIndex: number,
    linkIndex: number,
    field: 'name' | 'href',
    value: string
  ) {
    const copy = [...data]

    copy[specIndex]
      .blocks[blockIndex]
      .sources[sourceIndex]
      .links[linkIndex][field] = value

    setData(copy)
  }

  // ---------------- UI ----------------

  if (loading) return <div className="p-10">Loading...</div>

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <div className="flex justify-between mb-10">

        <h1 className="text-3xl font-bold">CMS Admin</h1>

        <button
          onClick={addSpec}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Специальность
        </button>

      </div>

      {data.map((spec, si) => (
        <div key={si} className="bg-white p-6 rounded-xl mb-8">

          <input
            className="border w-full p-2 mb-4"
            value={spec.specialization}
            onChange={(e) => updateSpec(si, e.target.value)}
          />

          {spec.blocks.map((block, bi) => (
            <div key={bi} className="bg-gray-50 p-4 mb-4 rounded">

              <input
                className="border w-full p-2 mb-2"
                value={block.title}
                onChange={(e) =>
                  updateBlockTitle(si, bi, e.target.value)
                }
              />

              <button
                onClick={() => addHeadline(si, bi)}
                className="text-sm text-blue-600 mb-2"
              >
                + headline
              </button>

              {block.headlines.map((h, hi) => (
                <input
                  key={hi}
                  className="border w-full p-2 mb-2"
                  value={h}
                  onChange={(e) =>
                    updateHeadline(si, bi, hi, e.target.value)
                  }
                />
              ))}

              <button
                onClick={() => addSource(si, bi)}
                className="text-sm text-green-600"
              >
                + source
              </button>

              {block.sources.map((s, si2) => (
                <div key={si2} className="mt-2 border p-2">

                  <button
                    onClick={() => addLink(si, bi, si2)}
                    className="text-blue-600 text-sm"
                  >
                    + link
                  </button>

                  {s.links.map((l, li) => (
                    <div key={li} className="grid grid-cols-2 gap-2">
                      <input
                        value={l.name}
                        onChange={(e) =>
                          updateLink(si, bi, si2, li, 'name', e.target.value)
                        }
                        placeholder="name"
                        className="border p-1"
                      />

                      <input
                        value={l.href}
                        onChange={(e) =>
                          updateLink(si, bi, si2, li, 'href', e.target.value)
                        }
                        placeholder="url"
                        className="border p-1"
                      />
                    </div>
                  ))}

                </div>
              ))}

              <button
                onClick={() => addBlock(si)}
                className="mt-3 text-sm text-purple-600"
              >
                + block
              </button>

            </div>
          ))}

        </div>
      ))}

      {/* DEBUG JSON */}
      <pre className="bg-black text-green-400 p-4 mt-10">
        {JSON.stringify(data, null, 2)}
      </pre>

    </div>
  )
}