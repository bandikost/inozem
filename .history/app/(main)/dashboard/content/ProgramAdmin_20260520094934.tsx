'use client'

import { useState } from "react"
import { title as initialTitle } from "@/lib/programs/titles"

// ---------------- TYPES ----------------

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
  headlines: string[]
  sources: any[]
}

type BlockItem = BaseBlock

type SpecializationItem = {
  specialization: string
  blocks: BlockItem[]
}

// ---------------- NORMALIZE ----------------

function normalize(data: any): SpecializationItem[] {
  return (data ?? []).map((spec: any) => ({
    specialization: spec.specialization ?? '',
    blocks: (spec.blocks ?? []).map((b: any) => ({
      title: b.title ?? '',
      type: b.type ?? 'video',
      headlines: b.headlines ?? [],
      sources: b.sources ?? [],
    })),
  }))
}

// ---------------- COMPONENT ----------------

export default function ProgramAdminPage() {

  const [data, setData] = useState<SpecializationItem[]>(() => {
    if (typeof window === 'undefined') return normalize(initialTitle)

    const saved = localStorage.getItem('programs-json')
    return normalize(saved ? JSON.parse(saved) : initialTitle)
  })

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
        specialization: 'Новая специализация',
        blocks: [],
      },
    ])
  }

  // ---------------- BLOCKS ----------------

  function addBlock(specIndex: number, type: string) {
    const copy = [...data]

    const base = {
      title: 'Новый блок',
      type,
      headlines: [],
      sources: [],
    }

    copy[specIndex].blocks.push(base)
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
    headlineIndex: number,
    value: string
  ) {
    const copy = [...data]
    const block = copy[specIndex].blocks[blockIndex]

    if (!block.headlines) block.headlines = []

    block.headlines[headlineIndex] = value
    setData(copy)
  }

  function addHeadline(specIndex: number, blockIndex: number) {
    const copy = [...data]
    const block = copy[specIndex].blocks[blockIndex]

    if (!block.headlines) block.headlines = []

    block.headlines.push('Новый заголовок')
    setData(copy)
  }

  // ---------------- SOURCES (FOUR ONLY) ----------------

  function addSource(specIndex: number, blockIndex: number) {
    const copy = [...data]
    const block = copy[specIndex].blocks[blockIndex]

    if (!block.sources) block.sources = []

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

    const source = block.sources?.[sourceIndex]
    if (!source) return

    source.links = [
      ...(source.links ?? []),
      { name: '', href: '' }
    ]

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
    const block = copy[specIndex].blocks[blockIndex]

    const source = block.sources?.[sourceIndex]
    if (!source) return

    source.links[linkIndex][field] = value
    setData(copy)
  }

  // ---------------- SAVE ----------------

  function save() {
    localStorage.setItem('programs-json', JSON.stringify(data))
    console.log('SAVED:', data)
    alert('Сохранено')
  }

  // ---------------- UI ----------------

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between mb-10">

          <div>
            <h1 className="text-4xl font-bold">Админка программ</h1>
          </div>

          <div className="flex gap-3">

            <button
              onClick={addSpecialization}
              className="bg-black text-white px-5 py-3 rounded-xl"
            >
              + Специальность
            </button>

            <button
              onClick={save}
              className="bg-green-600 text-white px-5 py-3 rounded-xl"
            >
              Сохранить
            </button>

          </div>

        </div>

        {/* DATA */}
        <div className="space-y-10">

          {data.map((spec, specIndex) => (

            <div key={specIndex} className="bg-white p-8 rounded-3xl border">

              <input
                className="w-full border px-4 py-3 rounded-xl mb-6"
                value={spec.specialization}
                onChange={(e) =>
                  updateSpecialization(specIndex, e.target.value)
                }
              />

              {spec.blocks.map((block, blockIndex) => (

                <div key={blockIndex} className="bg-gray-50 p-6 rounded-2xl mb-6">

                  <input
                    className="w-full border px-4 py-3 rounded-xl mb-3"
                    value={block.title}
                    onChange={(e) =>
                      updateBlockTitle(specIndex, blockIndex, e.target.value)
                    }
                  />

                  <button
                    onClick={() => removeBlock(specIndex, blockIndex)}
                    className="bg-red-500 text-white px-3 py-1 rounded mb-4"
                  >
                    удалить блок
                  </button>

                  {/* HEADLINES */}
                  {(block.type === 'main' || block.type === 'four') && (
                    <div className="mb-4">

                      <button
                        onClick={() => addHeadline(specIndex, blockIndex)}
                        className="border px-3 py-1 rounded mb-2"
                      >
                        + headline
                      </button>

                      {(block.headlines ?? []).map((h, i) => (
                        <input
                          key={i}
                          className="w-full border px-3 py-2 mb-2 rounded"
                          value={h}
                          onChange={(e) =>
                            updateHeadline(specIndex, blockIndex, i, e.target.value)
                          }
                        />
                      ))}

                    </div>
                  )}

                  {/* SOURCES */}
                  {block.type === 'four' && (
                    <div>

                      <button
                        onClick={() => addSource(specIndex, blockIndex)}
                        className="bg-black text-white px-3 py-1 rounded mb-4"
                      >
                        + source
                      </button>

                      {(block.sources ?? []).map((s, sIndex) => (
                        <div key={sIndex} className="border p-4 bg-white rounded mb-4">

                          {(s.links ?? []).map((l, lIndex) => (
                            <div key={lIndex} className="grid grid-cols-2 gap-2 mb-2">

                              <input
                                placeholder="name"
                                value={l.name}
                                onChange={(e) =>
                                  updateLink(specIndex, blockIndex, sIndex, lIndex, 'name', e.target.value)
                                }
                              />

                              <input
                                placeholder="url"
                                value={l.href}
                                onChange={(e) =>
                                  updateLink(specIndex, blockIndex, sIndex, lIndex, 'href', e.target.value)
                                }
                              />

                            </div>
                          ))}

                          <button
                            onClick={() => addLink(specIndex, blockIndex, sIndex)}
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

              <div className="flex gap-2">
                <button onClick={() => addBlock(specIndex, 'main')} className="bg-blue-600 text-white px-3 py-2 rounded">
                  main
                </button>

                <button onClick={() => addBlock(specIndex, 'four')} className="bg-purple-600 text-white px-3 py-2 rounded">
                  four
                </button>

                <button onClick={() => addBlock(specIndex, 'video')} className="bg-gray-600 text-white px-3 py-2 rounded">
                  video
                </button>
              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  )
}