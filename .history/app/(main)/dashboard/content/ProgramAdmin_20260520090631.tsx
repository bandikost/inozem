'use client'

import { useState } from "react"

type LinkItem = {
  name: string
  href: string
}

type SourceItem = {
  headlines: number
  links: LinkItem[]
}

type BlockItem = {
  title: string
  type: string
  headlines: string[]
  sources: SourceItem[]
}

type SpecializationItem = {
  specialization: string
  blocks: BlockItem[]
}

export default function ProgramAdminPage() {
  const initialData = [
    {
      specialization: 'Сестринское дело',
      blocks: [
        {
          title: 'Практические навыки',
          type: 'four',
          headlines: ['Раздел 1'],
          sources: [
            {
              headlines: 0,
              links: [
                {
                  name: 'Google',
                  href: 'https://google.com',
                },
              ],
            },
          ],
        },
      ],
    },
  ]

  const [data, setData] = useState(initialData)

  function updateSpecialization(index: number, value: string) {
    const copy = [...data]
    copy[index].specialization = value
    setData(copy)
  }

  function updateBlockTitle(specIndex: number,
  blockIndex: number,
  value: string) {
    const copy = [...data]
    copy[specIndex].blocks[blockIndex].title = value
    setData(copy)
  }

  function updateHeadline(specIndex, blockIndex, headlineIndex, value) {
    const copy = [...data]
    copy[specIndex].blocks[blockIndex].headlines[headlineIndex] = value
    setData(copy)
  }

  function addHeadline(specIndex, blockIndex) {
    const copy = [...data]

    copy[specIndex].blocks[blockIndex].headlines.push('Новый заголовок')

    setData(copy)
  }

  function addLink(specIndex, blockIndex, sourceIndex) {
    const copy = [...data]

    copy[specIndex].blocks[blockIndex].sources[sourceIndex].links.push({
      name: '',
      href: '',
    })

    setData(copy)
  }

  function updateLink(specIndex, blockIndex, sourceIndex, linkIndex, field, value) {
    const copy = [...data]

    copy[specIndex]
      .blocks[blockIndex]
      .sources[sourceIndex]
      .links[linkIndex][field] = value

    setData(copy)
  }

  function addBlock(specIndex) {
    const copy = [...data]

    copy[specIndex].blocks.push({
      title: 'Новый блок',
      type: 'four',
      headlines: ['Новый раздел'],
      sources: [
        {
          headlines: 0,
          links: [],
        },
      ],
    })

    setData(copy)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">Админка программ</h1>
            <p className="text-gray-500 mt-2">
              Редактирование блоков, заголовков и ссылок
            </p>
          </div>

          <button
            className="bg-black text-white px-6 py-3 rounded-xl"
            onClick={() => {
              console.log(JSON.stringify(data, null, 2))
            }}
          >
            Вывести JSON
          </button>
        </div>

        <div className="space-y-10">
          {data.map((specialization, specIndex) => (
            <div
              key={specIndex}
              className="bg-white border rounded-3xl shadow-sm p-8"
            >
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">
                  Специализация
                </label>

                <input
                  value={specialization.specialization}
                  onChange={(e) =>
                    updateSpecialization(specIndex, e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>

              <div className="space-y-8">
                {specialization.blocks.map((block, blockIndex) => (
                  <div
                    key={blockIndex}
                    className="border rounded-2xl p-6 bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-full">
                        <label className="block text-sm font-medium mb-2">
                          Название блока
                        </label>

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
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold">
                            Headlines
                          </h3>

                          <button
                            onClick={() => addHeadline(specIndex, blockIndex)}
                            className="border px-4 py-2 rounded-xl"
                          >
                            Добавить headline
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

                      {block.sources?.map((source, sourceIndex) => (
                        <div
                          key={sourceIndex}
                          className="border bg-white rounded-2xl p-6"
                        >
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <h3 className="text-xl font-semibold">
                                Ссылки
                              </h3>

                              <p className="text-sm text-gray-500 mt-1">
                                Headline index: {source.headlines}
                              </p>
                            </div>

                            <button
                              onClick={() =>
                                addLink(specIndex, blockIndex, sourceIndex)
                              }
                              className="bg-black text-white px-4 py-2 rounded-xl"
                            >
                              Добавить ссылку
                            </button>
                          </div>

                          <div className="space-y-4">
                            {source.links?.map((link, linkIndex) => (
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
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addBlock(specIndex)}
                className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-2xl"
              >
                Добавить блок
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Текущий JSON</h2>

          <pre className="bg-black text-green-400 p-6 rounded-3xl overflow-auto text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
