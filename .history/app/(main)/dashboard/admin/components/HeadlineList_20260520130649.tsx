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