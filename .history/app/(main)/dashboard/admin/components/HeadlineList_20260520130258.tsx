"use client";

export default function HeadlineList({ headlines = [], onChange }) {
  const add = () => {
    onChange([...headlines, ""]);
  };

  const update = (index, value) => {
    const copy = [...headlines];
    copy[index] = value;
    onChange(copy);
  };

  return (
    <div>
      {headlines.map((h, i) => (
        <input
          key={i}
          value={h}
          onChange={(e) => update(i, e.target.value)}
          placeholder="headline"
        />
      ))}

      <button onClick={add}>+ headline</button>
    </div>
  );
}