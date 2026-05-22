'use client'

import { useState } from "react"
import { title as initialTitle } from "@/lib/programs/titles"

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

  const [data, setData] = useState<SpecializationItem[]>(initialTitle as SpecializationItem[])

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

  function addBlock(specIndex: number, type: BlockItem['type']) {
    const copy = [...data]

    const base = {
      title: 'Новый блок',
      type,
      headlines: [],
    }

    let newBlock: BlockItem

    if (type === 'main') {
      newBlock = {
        ...base,
        type: 'main',
        sources: [],
      }
    } else if (type === 'four') {
      newBlock = {
        ...base,
        type: 'four',
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

  // ---------------- FOUR SOURCES ----------------

  function addFourSource(specIndex: number, blockIndex: number) {
    const copy = [...data]
    const block = copy[specIndex].blocks[blockIndex]

    if (block.type !== 'four') return
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

    if (block.type !== 'four') return

    block.sources[sourceIndex].links.push({
      name: '',
      href: '',
    })

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

    if (block.type !== 'four') return

    block.sources[sourceIndex].links[linkIndex][field] = value
    setData(copy)
  }

  // ---------------- SAVE ----------------

  function save() {
    localStorage.setItem('programs-json', JSON.stringify(data))
    alert('Сохранено в localStorage')
  }

  // ---------------- UI ----------------

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-4xl font-bold">Админка программ</h1>
            <p className="text-gray-500 mt-2">Редактор JSON структуры</p>
          </div>

          <div className="flex gap-4">

            <button
              onClick={addSpecialization}
              className="bg-black text-white px-6 py-3 rounded-xl"
            >
              + Специальность
            </button>

            <button
              onClick={save}
              className="bg-green-600 text-white px-6 py-3 rounded-xl"
            >
              Сохранить
            </button>

          </div>

        </div>

        {/* DATA */}
        <div className="space-y-10">

          {data.map((spec, specIndex) => (

            <div key={specIndex} className="bg-white p-8 rounded-3xl border">

              {/* SPECIALIZATION */}
              <input
                className="w-full border px-4 py-3 rounded-xl mb-6"
                value={spec.specialization}
                onChange={(e) =>
                  updateSpecialization(specIndex, e.target.value)
                }
              />

              {/* BLOCKS */}
              {spec.blocks.map((block, blockIndex) => (

                <div key={blockIndex} className="bg-gray-50 p-6 rounded-2xl mb-6">

                  <div className="flex justify-between mb-4">

                    <input
                      className="w-full border px-4 py-3 rounded-xl"
                      value={block.title}
                      onChange={(e) =>
                        updateBlockTitle(specIndex, blockIndex, e.target.value)
                      }
                    />

                    <button
                      onClick={() => removeBlock(specIndex, blockIndex)}
                      className="ml-4 bg-red-500 text-white px-3 rounded-xl"
                    >
                      X
                    </button>

                  </div>

                  {/* HEADLINES */}
                  {(block.type === 'main' || block.type === 'four') && (
                    <div className="mb-6">

                      <button
                        onClick={() => addHeadline(specIndex, blockIndex)}
                        className="mb-3 border px-3 py-1 rounded"
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

                  {/* FOUR SOURCES */}
                  {block.type === 'four' && (
                    <div>

                      <button
                        onClick={() => addFourSource(specIndex, blockIndex)}
                        className="bg-black text-white px-3 py-1 rounded mb-4"
                      >
                        + source
                      </button>

                      {(block.sources ?? []).map((s, sIndex) => (

                        <div key={sIndex} className="bg-white p-4 border rounded mb-4">

                          {s.links.map((l, lIndex) => (

                            <div key={lIndex} className="grid grid-cols-2 gap-2 mb-2">

                              <input
                                placeholder="name"
                                value={l.name}
                                onChange={(e) =>
                                  updateLink(
                                    specIndex,
                                    blockIndex,
                                    sIndex,
                                    lIndex,
                                    'name',
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
                                    'href',
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