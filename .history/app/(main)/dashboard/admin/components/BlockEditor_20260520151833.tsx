import MainEditor from "./editors/MainEditor";
import FourEditor from "./editors/FourEditor";

export default function BlockEditor({ block, onChange }) {
  const update = (patch: any) => {
    onChange({ ...block, ...patch });
  };

  return (
    <div className="border p-3">
      <input
        value={block.title}
        onChange={(e) => update({ title: e.target.value })}
      />

      <select
        value={block.type}
        onChange={(e) => update({ type: e.target.value })}
      >
        <option value="video">video</option>
        <option value="main">main</option>
        <option value="four">four</option>
      </select>

      {/* DATA EDITORS */}
      {block.type === "main" && (
        <MainEditor data={block.data} onChange={(d) => update({ data: d })} />
      )}

      {block.type === "four" && (
        <FourEditor data={block.data} onChange={(d) => update({ data: d })} />
      )}
    </div>
  );
}