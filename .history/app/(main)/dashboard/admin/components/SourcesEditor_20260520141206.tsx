"use client";

type SourceItem = {
  key: string;
  headlineIndex: number;
};

type SourcesEditorProps = {
  sources: SourceItem[];
  onChange: (sources: SourceItem[]) => void;
};

const SOURCE_KEYS = [
  "primarymedical",
  "postermedical",
  "mainsestrinskoe",
];

export default function SourcesEditor({
  sources,
  onChange,
}: SourcesEditorProps) {

  const addSource = () => {
    onChange([
      ...sources,
      {
        key: "primarymedical",
        headlineIndex: 0,
      },
    ]);
  };

  const updateSource = (
    index: number,
    field: keyof SourceItem,
    value: string | number
  ) => {
    const copy = [...sources];

    copy[index] = {
      ...copy[index],
      [field]: value,
    };

    onChange(copy);
  };

  const removeSource = (index: number) => {
    onChange(
      sources.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="mt-6 border rounded-md p-4">

      <h3 className="font-semibold text-lg mb-4">
        Sources
      </h3>

      <div className="flex flex-col gap-4">

        {sources.map((source, index) => (
          <div
            key={index}
            className="border rounded-md p-3 flex flex-col gap-3"
          >

            {/* SOURCE KEY */}

            <select
              value={source.key}
              onChange={(e) =>
                updateSource(
                  index,
                  "key",
                  e.target.value
                )
              }
              className="border p-2 rounded-md"
            >
              {SOURCE_KEYS.map((key) => (
                <option
                  key={key}
                  value={key}
                >
                  {key}
                </option>
              ))}
            </select>

            {/* HEADLINE INDEX */}

            <input
              type="number"
              placeholder="headlineIndex"
              value={source.headlineIndex}
              onChange={(e) =>
                updateSource(
                  index,
                  "headlineIndex",
                  Number(e.target.value)
                )
              }
              className="border p-2 rounded-md"
            />

            {/* REMOVE */}

            <button
              onClick={() => removeSource(index)}
              className="border px-3 py-2 rounded-md button-more"
            >
              Remove source
            </button>

          </div>
        ))}

      </div>

      <button
        onClick={addSource}
        className="mt-4 border px-4 py-2 rounded-md button-more"
      >
        + Add source
      </button>
    </div>
  );
}