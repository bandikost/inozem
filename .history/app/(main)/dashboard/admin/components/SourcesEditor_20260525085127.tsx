"use client";

type SourceItem = {
  key: string;
  headlineId: string;
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
        headlineId: "",
      },
    ]);
  };

  const updateSource = (
    index: number,
    field: keyof SourceItem,
    value: string
  ) => {
    const copy = [...sources];

    copy[index] = {
      ...copy[index],
      [field]: value,
    };

    onChange(copy);
  };

  const removeSource = (index: number) => {
    onChange(sources.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-6 border rounded-md p-4">

      <h3 className="font-semibold text-lg mb-4">
        Готовые ресурсы
      </h3>

      <div className="flex flex-col gap-4">

        {sources.map((source, index) => (
          <div key={index} className="border rounded-md p-3 flex flex-col gap-3">

            <select
              value={source.key}
              onChange={(e) =>
                updateSource(index, "key", e.target.value)
              }
              className="border p-2 rounded-md"
            >
              {SOURCE_KEYS.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>

          
            <input
              type="text"
              placeholder="headlineId"
              value={source.headlineId}
              onChange={(e) =>
                updateSource(index, "headlineId", e.target.value)
              }
              className="border p-2 rounded-md"
            />

            <button
              onClick={() => removeSource(index)}
              className="border px-3 py-2 rounded-md button-more"
            >
              Удалить ресурс
            </button>

          </div>
        ))}

      </div>

      <button
        onClick={addSource}
        className="mt-4 border px-4 py-2 rounded-md button-more"
      >
        + Добавить ресурс
      </button>
    </div>
  );
}