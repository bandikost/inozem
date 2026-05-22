"use client";

type HeadlineListProps = {
  headlines: string[];
  onChange: (value: string[]) => void;
};

export default function HeadlineList({ headlines, onChange } : HeadlineListProps) {
  const add = (): void => {
  onChange([...headlines, ""]);
}

const update = (index: number, value: string): void => {
  const copy = [...headlines];
  copy[index] = value;
  onChange(copy);
}

  return (
    <div>
      {headlines.map((h, i) => (
        <input
          className="border border-gray-500 p-2 rounded-md text-lg shadow-md"
          key={i}
          value={h}
          onChange={(e) => update(i, e.target.value)}
          placeholder="Заголовок"
        />
      ))}

      <button onClick={add} className="button-more">+ заголовок</button>
    </div>
  );
}