"use client";

import HeadlineList from "./HeadlineList";

export type BlockType = "video" | "main" | "second" | "third" | "four";

export type Block = {
  title: string;
  type: BlockType;
  headlines: string[];
};

export default function BlockEditor({ block, onChange }) {
  const update = (field, value) => {
    onChange({ ...block, [field]: value });
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
      <input
        placeholder="Block title"
        value={block.title}
        onChange={(e) => update("title", e.target.value)}
      />

      <select
        value={block.type}
        onChange={(e) => update("type", e.target.value)}
      >
        <option value="video">video</option>
        <option value="main">main</option>
        <option value="second">second</option>
        <option value="third">third</option>
        <option value="four">four</option>
      </select>

      {block.type === "main" && (
        <HeadlineList
          headlines={block.headlines}
          onChange={(h) => update("headlines", h)}
        />
      )}
    </div>
  );
}