"use client";

type LinkItem = {
  name: string;
  href: string;
};

type LinkGroup = {
  headlineId: string;
  items: LinkItem[];
};

type LinksEditorProps = {
  links: LinkGroup[];
  onChange: (links: LinkGroup[]) => void;
};

export default function LinksEditor({
  links,
  onChange,
}: LinksEditorProps) {

  // =========================
  // GROUPS
  // =========================

  const addGroup = () => {
    onChange([
      ...links,
      {
        headlineId: 0,
        items: [],
      },
    ]);
  };

  const updateGroup = (
    groupIndex: number,
    field: keyof LinkGroup,
    value: any
  ) => {
    const copy = [...links];

    copy[groupIndex] = {
      ...copy[groupIndex],
      [field]: value,
    };

    onChange(copy);
  };

  const removeGroup = (groupIndex: number) => {
    onChange(
      links.filter((_, i) => i !== groupIndex)
    );
  };

  // =========================
  // ITEMS
  // =========================

  const addItem = (groupIndex: number) => {
    const copy = [...links];

    copy[groupIndex].items.push({
      name: "",
      href: "",
    });

    onChange(copy);
  };

  const updateItem = (
    groupIndex: number,
    itemIndex: number,
    field: keyof LinkItem,
    value: string
  ) => {
    const copy = [...links];

    copy[groupIndex].items[itemIndex] = {
      ...copy[groupIndex].items[itemIndex],
      [field]: value,
    };

    onChange(copy);
  };

  const removeItem = (
    groupIndex: number,
    itemIndex: number
  ) => {
    const copy = [...links];

    copy[groupIndex].items =
      copy[groupIndex].items.filter(
        (_, i) => i !== itemIndex
      );

    onChange(copy);
  };

  return (
    <div className="mt-6 border rounded-md p-4">

      <h3 className="font-semibold text-lg mb-4">
        Links
      </h3>

      <div className="flex flex-col gap-6">

        {links.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="border rounded-md p-4"
          >

            {/* HEADLINE INDEX */}

            <input
              type="text"
              placeholder="headlineId"
              value={group.headlineId}
              onChange={(e) =>
                updateGroup(
                  groupIndex,
                  "headlineId",
                  String(e.target.value)
                )
              }
              className="border p-2 rounded-md w-full"
            />

            {/* ITEMS */}

            <div className="mt-4 flex flex-col gap-4">

              {group.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="border rounded-md p-3 flex flex-col gap-3"
                >

                  <input
                    placeholder="Link name"
                    value={item.name}
                    onChange={(e) =>
                      updateItem(
                        groupIndex,
                        itemIndex,
                        "name",
                        e.target.value
                      )
                    }
                    className="border p-2 rounded-md"
                  />

                  <input
                    placeholder="https://..."
                    value={item.href}
                    onChange={(e) =>
                      updateItem(
                        groupIndex,
                        itemIndex,
                        "href",
                        e.target.value
                      )
                    }
                    className="border p-2 rounded-md"
                  />

                  <button
                    onClick={() =>
                      removeItem(
                        groupIndex,
                        itemIndex
                      )
                    }
                    className="border px-3 py-2 rounded-md button-more"
                  >
                    Remove link
                  </button>

                </div>
              ))}

            </div>

            {/* ADD LINK */}

            <button
              onClick={() => addItem(groupIndex)}
              className="mt-4 border px-3 py-2 rounded-md button-more"
            >
              + Add link
            </button>

            {/* REMOVE GROUP */}

            <button
              onClick={() =>
                removeGroup(groupIndex)
              }
              className="mt-4 ml-4 border px-3 py-2 rounded-md button-more"
            >
              Remove group
            </button>

          </div>
        ))}

      </div>

      {/* ADD GROUP */}

      <button
        onClick={addGroup}
        className="mt-6 border px-4 py-2 rounded-md button-more"
      >
        + Add links group
      </button>

    </div>
  );
}