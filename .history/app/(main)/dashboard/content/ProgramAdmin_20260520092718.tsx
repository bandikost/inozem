'use client'

import { useState } from "react"
import { title } from "@/lib/programs/titles"

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

type BlockItem = {
  title: string
  type: string
  headlines?: string[]
  sources?: MainSource[] | FourSource[]
}

type SpecializationItem = {
  specialization: string
  blocks: BlockItem[]
}

export default function ProgramAdminPage() {

  const [data, setData] = useState<SpecializationItem[]>(title)

  function updateSpecialization(
    index: number,
    value: string
  ) {
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

  function updateBlockTitle(
    specIndex: number,
    blockIndex: number,
    value: string
  ) {
    const copy = [...data]

    copy[specIndex].blocks[blockIndex].title = value

    setData(copy)
  }

  function updateHeadline(
    specIndex: number,
    blockIndex: number,
    headlineIndex: number,
    value: string
  ) {
    const copy = [...data]

    const headlines =
      copy[specIndex].blocks[blockIndex].headlines

    if (!headlines) return

    headlines[headlineIndex] = value

    setData(copy)
  }

  function addHeadline(
    specIndex: number,
    blockIndex: number
  ) {
    const copy = [...data]

    if (!copy[specIndex].blocks[blockIndex].headlines) {
      copy[specIndex].blocks[blockIndex].headlines = []
    }

    copy[specIndex]
      .blocks[blockIndex]
      .headlines?.push('Новый заголовок')

    setData(copy)
  }

  function addBlock(
    specIndex: number,
    type: string
  ) {
    const copy = [...data]

    if (type === 'four') {
      copy[specIndex].blocks.push({
        title: 'Новый four блок',
        type: 'four',
        headlines: [],
        sources: [],
      })
    }

    if (type === 'main') {
      copy[specIndex].blocks.push({
        title: 'Новый main блок',
        type: 'main',
        headlines: [],
        sources: [],
      })
    }

    if (type === 'video') {
      copy[specIndex].blocks.push({
        title: 'Новый video блок',
        type: 'video',
      })
    }

    if (type === 'second') {
      copy[specIndex].blocks.push({
        title: 'Новый second блок',
        type: 'second',
      })
    }

    if (type === 'third') {
      copy[specIndex].blocks.push({
        title: 'Новый third блок',
        type: 'third',
      })
    }

    setData(copy)
  }

  function addFourSource(
    specIndex: number,
    blockIndex: number
  ) {
    const copy = [...data]

    const block = copy[specIndex].blocks[blockIndex]

    if (!block.sources) {
      block.sources = []
    }

    ;(block.sources as FourSource[]).push({
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

    const source =
      copy[specIndex]
        .blocks[blockIndex]
        .sources?.[sourceIndex]

    if (!source) return

    if ('links' in source) {
      source.links.push({
        name: '',
        href: '',
      })
    }

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

    const source =
      copy[specIndex]
        .blocks[blockIndex]
        .sources?.[sourceIndex]

    if (!source) return

    if ('links' in source) {
      source.links[linkIndex][field] = value
    }

    setData(copy)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10 ьи-20">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-4xl font-bold">
              Админка программ
            </h1>

            <p className="text-gray-500 mt-2">
              Редактор JSON структуры
            </p>
          </div>

          <button
            onClick={addSpecialization}
            className="bg-black text-white px-6 py-3 rounded-2xl hover:opacity-70 cursor-pointer"
          >
            Добавить специальность
          </button>

        </div>

        <div className="space-y-10">

          {data.map((specialization, specIndex) => (

            <div
              key={specIndex}
              className="bg-white rounded-3xl shadow-sm border p-8"
            >

              <div className="mb-8">

                <label className="block text-sm font-medium mb-2">
                  Специальность
                </label>

                <input
                  value={specialization.specialization}
                  onChange={(e) =>
                    updateSpecialization(
                      specIndex,
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />

              </div>

              <div className="space-y-8">

                {specialization.blocks.map((block, blockIndex) => (

                  <div key={blockIndex} className="bg-gray-50 border rounded-2xl p-6">

                    <div className="grid gap-4">

                        <p className="text-sm text-gray-500">
                            Тип: {block.type} | {blockIndex} блок
                        </p>

                        <input
                          value={block.title}
                          onChange={(e) =>
                            updateBlockTitle(
                              specIndex,
                              blockIndex,
                              e.target.value
                            )
                          }
                          className="w-full border rounded-xl px-4 py-3 bg-white"
                        />


                      <div>

                       

                      </div>

                    </div>

                    {(block.type === 'main' || block.type === 'four') && (

                      <div className="mt-8">

                        <div className="flex justify-between items-center mb-4">

                          <h3 className="text-xl font-semibold">
                            Подзаголовки лекций
                          </h3>

                          <button
                            onClick={() =>
                              addHeadline(
                                specIndex,
                                blockIndex
                              )
                            }
                            className="border px-4 py-2 rounded-xl"
                          >
                            Добавить подзаголовки
                          </button>

                        </div>

                        <div className="grid gap-4">

                          {block.headlines?.map((headline, headlineIndex) => (

                            <input
                              key={headlineIndex}
                              value={headline}
                              onChange={(e) =>
                                updateHeadline(
                                  specIndex,
                                  blockIndex,
                                  headlineIndex,
                                  e.target.value
                                )
                              }
                              className="border rounded-xl px-4 py-3 bg-white"
                            />

                          ))}

                        </div>

                      </div>

                    )}

                    {block.type === 'four' && (

                      <div className="mt-10">

                        <div className="flex justify-between items-center mb-6">

                          <h3 className="text-2xl font-bold">
                            Four Sources
                          </h3>

                          <button
                            onClick={() =>
                              addFourSource(
                                specIndex,
                                blockIndex
                              )
                            }
                            className="bg-black text-white px-4 py-2 rounded-xl"
                          >
                            Добавить source
                          </button>

                        </div>

                        {block.sources?.map((source, sourceIndex) => (

                          <div
                            key={sourceIndex}
                            className="border bg-white rounded-2xl p-6 mb-6"
                          >

                            {'links' in source && (

                              <>

                                <p className="text-sm text-gray-500 mb-6">
                                  headlines: {source.headlines}
                                </p>

                                <div className="flex justify-end mb-6">

                                  <button
                                    onClick={() =>
                                      addLink(
                                        specIndex,
                                        blockIndex,
                                        sourceIndex
                                      )
                                    }
                                    className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                                  >
                                    Добавить ссылку
                                  </button>

                                </div>

                                <div className="space-y-4">

                                  {source.links.map((link, linkIndex) => (

                                    <div
                                      key={linkIndex}
                                      className="grid grid-cols-1 lg:grid-cols-2 gap-4"
                                    >

                                      <input
                                        placeholder="Название"
                                        value={link.name}
                                        onChange={(e) =>
                                          updateLink(
                                            specIndex,
                                            blockIndex,
                                            sourceIndex,
                                            linkIndex,
                                            'name',
                                            e.target.value
                                          )
                                        }
                                        className="border rounded-xl px-4 py-3"
                                      />

                                      <input
                                        placeholder="https://"
                                        value={link.href}
                                        onChange={(e) =>
                                          updateLink(
                                            specIndex,
                                            blockIndex,
                                            sourceIndex,
                                            linkIndex,
                                            'href',
                                            e.target.value
                                          )
                                        }
                                        className="border rounded-xl px-4 py-3"
                                      />

                                    </div>

                                  ))}

                                </div>

                              </>

                            )}

                          </div>

                        ))}

                      </div>

                    )}



                  </div>

                ))}

              </div>

              <div className="flex flex-wrap gap-4 mt-8">

                <button
                  onClick={() =>
                    addBlock(specIndex, 'video')
                  }
                  className="bg-gray-700 text-white px-4 py-2 rounded-xl cursor-pointer hover:opacity-80"
                >
                  Добавить {specIndex} блок
                </button>

                <button
                  onClick={() =>
                    addBlock(specIndex, 'main')
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:opacity-80"
                >
                  Добавить {specIndex} блок
                </button>

                <button
                  onClick={() =>
                    addBlock(specIndex, 'second')
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:opacity-80"
                >
                  Добавить {specIndex} блок
                </button>

                <button
                  onClick={() =>
                    addBlock(specIndex, 'third')
                  }
                  className="bg-orange-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:opacity-80"
                >
                  Добавить {specIndex} блок
                </button>

                <button
                  onClick={() =>
                    addBlock(specIndex, 'four')
                  }
                  className="bg-purple-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:opacity-80"
                >
                  Добавить {specIndex} блок
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}