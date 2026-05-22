import { LinksEditor } from "./LinksEditor";

export default function FourEditor({ data, onChange }) {
  const updateSource = (i, patch) => {
    const copy = [...(data.sources || [])];
    copy[i] = { ...copy[i], ...patch };
    onChange({ ...data, sources: copy });
  };

  const addSource = () => {
    onChange({
      ...data,
      sources: [
        ...(data.sources || []),
        {
          headlineIndex: 0,
          links: [],
        },
      ],
    });
  };

  return (
    <div>
      <button onClick={addSource}>+ Add source</button>

      {(data.sources || []).map((s, i) => (
        <div key={i} className="border p-2 mt-2">
          <input
            type="number"
            value={s.headlineIndex}
            onChange={(e) =>
              updateSource(i, {
                headlineIndex: Number(e.target.value),
              })
            }
          />

          <LinksEditor
            links={s.links}
            onChange={(links) => updateSource(i, { links })}
          />
        </div>
      ))}
    </div>
  );
}