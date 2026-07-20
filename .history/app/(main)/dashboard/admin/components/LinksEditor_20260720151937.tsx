type LinkItem = {
  name: string
  href: string
}

type LinkGroup = {
  headlineId: string
  title: string
  items: LinkItem[]
}

type LinksEditorProps = {
  links: LinkGroup[]
  onChange: (links: LinkGroup[]) => void
}

export default function LinksEditor({
  links,
  onChange,
}: LinksEditorProps) {

  const addGroup = () => {
    onChange([
      ...links,
      {
        title: "",
        headlineId: "",
        items: [],
      },
    ])
  }

  const updateGroup = (
    groupIndex: number,
    field: keyof LinkGroup,
    value: string
  ) => {
    const copy = [...links]

    copy[groupIndex] = {
      ...copy[groupIndex],
      [field]: value,
    }

    onChange(copy)
  }

  const removeGroup = (groupIndex: number) => {
    onChange(
      links.filter((_, i) => i !== groupIndex)
    )
  }

  const addItem = (groupIndex: number) => {
    const copy = [...links]

    copy[groupIndex].items.push({
      name: "",
      href: "",
    })

    onChange(copy)
  }

  const updateItem = (
    groupIndex: number,
    itemIndex: number,
    field: keyof LinkItem,
    value: string
  ) => {
    const copy = [...links]

    copy[groupIndex].items[itemIndex][field] = value

    onChange(copy)
  }

  const removeItem = (
    groupIndex: number,
    itemIndex: number
  ) => {
    const copy = [...links]

    copy[groupIndex].items =
      copy[groupIndex].items.filter(
        (_, i) => i !== itemIndex
      )

    onChange(copy)
  }

  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50/50 p-5">

      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between gap-4">

        <div>

          <h3 className="text-lg font-semibold text-gray-900">
            Ссылки
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Организуйте ссылки по тематическим группам
          </p>

        </div>

        <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-500 ring-1 ring-gray-200">
          {links.length}{" "}
          {links.length === 1
            ? "группа"
            : "групп"}
        </span>

      </div>


      {/* GROUPS */}

      <div className="flex flex-col gap-5">

        {links.length === 0 && (

          <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center">

            <p className="font-medium text-gray-600">
              Групп ссылок пока нет
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Добавьте первую группу ссылок
            </p>

          </div>

        )}


        {links.map((group, groupIndex) => (

          <div
            key={groupIndex}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >

            {/* GROUP HEADER */}

            <div className="flex items-center justify-between gap-4 border-b border-gray-100 bg-white px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-sm font-semibold text-blue">
                  {String(groupIndex + 1).padStart(2, "0")}
                </div>

                <div>

                  <p className="text-sm font-semibold text-gray-900">
                    Группа ссылок {groupIndex + 1}
                  </p>

                  <p className="mt-0.5 text-xs text-gray-400">
                    {group.items.length}{" "}
                    {group.items.length === 1
                      ? "ссылка"
                      : "ссылок"}
                  </p>

                </div>

              </div>


              <button
                type="button"
                onClick={() => removeGroup(groupIndex)}
                className="rounded-lg px-3 py-2 text-sm text-red-500 transition hover:bg-red-50"
              >
                Удалить группу
              </button>

            </div>


            {/* GROUP CONTENT */}

            <div className="p-5">

              <div className="mb-5">

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Название группы
                </label>

                <input
                  type="text"
                  placeholder="Например: Нормативные документы"
                  value={group.title}
                  onChange={(e) =>
                    updateGroup(
                      groupIndex,
                      "title",
                      e.target.value
                    )
                  }
                  className="input-main"
                />

              </div>


              {/* LINKS */}

              <div className="flex flex-col gap-3">

                {group.items.map(
                  (item, itemIndex) => (

                    <div
                      key={itemIndex}
                      className="rounded-xl border border-gray-200 bg-gray-50/70 p-4"
                    >

                      <div className="mb-3 flex items-center justify-between">

                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Ссылка {itemIndex + 1}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            removeItem(
                              groupIndex,
                              itemIndex
                            )
                          }
                          className="text-xs font-medium text-red-500 transition hover:text-red-700"
                        >
                          Удалить
                        </button>

                      </div>


                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

                        <input
                          placeholder="Название ссылки"
                          value={item.name}
                          onChange={(e) =>
                            updateItem(
                              groupIndex,
                              itemIndex,
                              "name",
                              e.target.value
                            )
                          }
                          className="input-main"
                        />

                        <input
                          placeholder="Полная ссылка, например https://..."
                          value={item.href}
                          onChange={(e) =>
                            updateItem(
                              groupIndex,
                              itemIndex,
                              "href",
                              e.target.value
                            )
                          }
                          className="input-main text-blue-600"
                        />

                      </div>

                    </div>

                  )
                )}

              </div>


              {/* ADD LINK */}

              <button
                type="button"
                onClick={() => addItem(groupIndex)}
                className="mt-4 inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition hover:border-blue hover:text-blue"
              >
                + Добавить ссылку
              </button>

            </div>

          </div>

        ))}

      </div>


      {/* ADD GROUP */}

      <button
        type="button"
        onClick={addGroup}
        className="mt-6 inline-flex items-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue hover:text-blue"
      >
        + Добавить группу ссылок
      </button>


      <style jsx>{`

        .input-main {
          width: 100%;
          border: 1px solid rgb(229 231 235);
          border-radius: 0.75rem;
          background: white;
          padding: 0.75rem 0.875rem;
          font-size: 0.9rem;
          color: rgb(17 24 39);
          outline: none;
          transition: all 0.2s ease;
        }

        .input-main::placeholder {
          color: rgb(156 163 175);
        }

        .input-main:focus {
          border-color: rgb(37 99 235);
          box-shadow: 0 0 0 3px rgb(37 99 235 / 0.1);
        }

      `}</style>

    </div>
  )
}